import { readFile, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const mediaConfigPath = path.join(root, "src", "config", "media.ts");
const reportPath = path.join(root, "docs", "MEDIA_AUDIT.md");
const acceptedStatuses = new Set([
  "approved-owned",
  "approved-licensed",
  "licensed-review-pending",
  "unverified-placeholder",
]);
const approvedStatuses = new Set(["approved-owned", "approved-licensed"]);
const rightsReviewPendingStatuses = new Set(["licensed-review-pending"]);
const localMediaStatuses = new Set([...approvedStatuses, ...rightsReviewPendingStatuses]);
const requiredMetadata = [
  ["creator", "creator"],
  ["sourceUrl", "source page"],
  ["licenseUrl", "license record"],
  ["acquisitionDate", "acquisition date"],
];
const errors = [];
const warnings = [];
const assets = [];
const counters = {
  missingCreator: 0,
  missingSource: 0,
  missingLicense: 0,
  missingAcquisitionDate: 0,
  missingAlt: 0,
  missingWidth: 0,
  missingHeight: 0,
  missingPlacement: 0,
  brokenLocalFiles: 0,
};

function isMissing(value) {
  return value == null || (typeof value === "string" && value.trim() === "");
}

function hasThirdPartyRightsEvidence(asset) {
  return (
    Array.isArray(asset.thirdPartyRightsEvidence) &&
    asset.thirdPartyRightsEvidence.some((entry) => typeof entry === "string" && !isMissing(entry))
  );
}

function recordSourceReference(duplicateSources, key, location, assetId) {
  const occurrences = duplicateSources.get(key) ?? [];
  occurrences.push({ location, assetId });
  duplicateSources.set(key, occurrences);
}

function collectAssets(value, location = "media") {
  if (!value || typeof value !== "object") return;
  const isMediaRecord =
    "src" in value ||
    ("alt" in value && ("id" in value || "width" in value || "height" in value));
  if (isMediaRecord) {
    assets.push({ location, asset: value });
    return;
  }
  for (const [key, child] of Object.entries(value)) {
    collectAssets(child, Array.isArray(value) ? `${location}[${key}]` : `${location}.${key}`);
  }
}

function publicFilePath(src) {
  if (!src.startsWith("/media/")) return null;
  const relativePath = src.split(/[?#]/, 1)[0].slice(1);
  const publicRoot = path.resolve(root, "public");
  const filePath = path.resolve(publicRoot, ...relativePath.split("/"));
  if (!filePath.startsWith(`${publicRoot}${path.sep}`)) {
    errors.push(`Local media path escapes public/: ${src}`);
    return null;
  }
  return filePath;
}

function validateHttpsUrl(field, value, assetId) {
  if (isMissing(value)) return;
  try {
    if (new URL(value).protocol !== "https:") {
      errors.push(`${assetId}: ${field} must use HTTPS.`);
    }
  } catch {
    errors.push(`${assetId}: ${field} is not a valid URL.`);
  }
}

async function fileExists(filePath) {
  try {
    const details = await stat(filePath);
    return details.isFile() && details.size > 0;
  } catch (error) {
    if (error?.code === "ENOENT") return false;
    throw error;
  }
}

async function loadMediaConfig() {
  const source = await readFile(mediaConfigPath, "utf8");
  const result = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.ES2022,
      target: ts.ScriptTarget.ES2022,
    },
    reportDiagnostics: true,
  });
  const transpileErrors = (result.diagnostics ?? []).filter(
    (diagnostic) => diagnostic.category === ts.DiagnosticCategory.Error,
  );
  if (transpileErrors.length) {
    throw new Error(
      ts.formatDiagnosticsWithColorAndContext(transpileErrors, {
        getCurrentDirectory: () => root,
        getCanonicalFileName: (fileName) => fileName,
        getNewLine: () => "\n",
      }),
    );
  }
  const moduleUrl = `data:text/javascript;base64,${Buffer.from(result.outputText).toString("base64")}`;
  return import(moduleUrl);
}

async function configuredHeroVideoSource() {
  const variable = "NEXT_PUBLIC_LAUXIRIO_HERO_VIDEO_SRC";
  if (!isMissing(process.env[variable])) return process.env[variable].trim();

  for (const fileName of [".env.production.local", ".env.local", ".env.production", ".env"]) {
    const filePath = path.join(root, fileName);
    let contents;
    try {
      contents = await readFile(filePath, "utf8");
    } catch (error) {
      if (error?.code === "ENOENT") continue;
      throw error;
    }
    const line = contents
      .split(/\r?\n/)
      .find((entry) => /^\s*NEXT_PUBLIC_LAUXIRIO_HERO_VIDEO_SRC\s*=/.test(entry));
    if (!line) continue;

    let value = line.replace(/^\s*NEXT_PUBLIC_LAUXIRIO_HERO_VIDEO_SRC\s*=\s*/, "").trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    } else {
      value = value.replace(/\s+#.*$/, "").trim();
    }
    if (!isMissing(value)) return value;
  }
  return null;
}

function escapeTable(value) {
  return String(value ?? "").replaceAll("|", "\\|").replaceAll("\n", " ");
}

async function inspectAssets() {
  const config = await loadMediaConfig();
  collectAssets(config.media);
  if (!assets.length) errors.push("No image media entries were found in src/config/media.ts.");

  const duplicateSources = new Map();
  const approvedAssets = [];
  const rightsReviewPendingAssets = [];
  const placeholders = [];
  const missingThirdPartyRightsEvidenceAssets = [];
  const metadataGaps = new Map();

  for (const { location, asset } of assets) {
    const assetId = asset.id || location;
    const src = typeof asset.src === "string" ? asset.src : "";
    const missing = requiredMetadata
      .filter(([key]) => isMissing(asset[key]))
      .map(([, label]) => label);
    if (isMissing(asset.creator)) counters.missingCreator += 1;
    if (isMissing(asset.sourceUrl)) counters.missingSource += 1;
    if (isMissing(asset.licenseUrl)) counters.missingLicense += 1;
    if (isMissing(asset.acquisitionDate)) counters.missingAcquisitionDate += 1;

    if (isMissing(asset.id)) errors.push(`${assetId}: asset ID is missing.`);
    if (!acceptedStatuses.has(asset.status)) {
      errors.push(`${assetId}: unsupported status "${asset.status}".`);
    }
    if (isMissing(asset.src)) {
      errors.push(`${assetId}: media source is missing.`);
    }
    if (isMissing(asset.alt)) {
      errors.push(`${assetId}: alt description is missing.`);
      counters.missingAlt += 1;
    }
    if (!Number.isInteger(asset.width) || asset.width <= 0) {
      errors.push(`${assetId}: valid image width is missing.`);
      counters.missingWidth += 1;
    }
    if (!Number.isInteger(asset.height) || asset.height <= 0) {
      errors.push(`${assetId}: valid image height is missing.`);
      counters.missingHeight += 1;
    }
    if (!Array.isArray(asset.intendedPlacement) || asset.intendedPlacement.length === 0) {
      errors.push(`${assetId}: intended placement is missing.`);
      counters.missingPlacement += 1;
    }
    if (asset.thirdPartyRightsEvidence !== null && !Array.isArray(asset.thirdPartyRightsEvidence)) {
      errors.push(`${assetId}: third-party rights evidence must be an array or null.`);
    } else if (
      Array.isArray(asset.thirdPartyRightsEvidence) &&
      asset.thirdPartyRightsEvidence.some((entry) => typeof entry !== "string" || isMissing(entry))
    ) {
      errors.push(`${assetId}: third-party rights evidence entries must be non-empty strings.`);
    }

    validateHttpsUrl("sourceUrl", asset.sourceUrl, assetId);
    validateHttpsUrl("licenseUrl", asset.licenseUrl, assetId);

    const localPath = publicFilePath(src);
    if (src.startsWith("/media/")) {
      if (!localPath || !(await fileExists(localPath))) {
        errors.push(`${assetId}: local file is missing or empty (${src}).`);
        counters.brokenLocalFiles += 1;
      }
      recordSourceReference(duplicateSources, `local:${src}`, location, assetId);
    } else {
      let source;
      try {
        source = new URL(src);
      } catch {
        errors.push(`${assetId}: source must be a local /media/ path or a valid HTTPS URL.`);
      }
      if (source && source.protocol !== "https:") {
        errors.push(`${assetId}: external media must use HTTPS.`);
      }
      if (localMediaStatuses.has(asset.status)) {
        errors.push(`${assetId}: licensed or approved media must use a local /media/ path.`);
      }
      if (source) {
        recordSourceReference(duplicateSources, `${source.host}${source.pathname}`, location, assetId);
      }
    }

    const hasRightsEvidence = hasThirdPartyRightsEvidence(asset);
    if (localMediaStatuses.has(asset.status) && !hasRightsEvidence) {
      missingThirdPartyRightsEvidenceAssets.push({ location, asset });
    }

    if (asset.status === "unverified-placeholder") {
      placeholders.push({ location, asset });
      if (missing.length) metadataGaps.set(assetId, missing);
    } else if (rightsReviewPendingStatuses.has(asset.status)) {
      rightsReviewPendingAssets.push({ location, asset });
      if (missing.length) {
        errors.push(`${assetId}: rights-review-pending media is missing ${missing.join(", ")}.`);
      }
      if (!/^\d{4}-\d{2}-\d{2}$/.test(asset.acquisitionDate ?? "")) {
        errors.push(`${assetId}: acquisitionDate must be YYYY-MM-DD.`);
      }
    } else if (approvedStatuses.has(asset.status)) {
      approvedAssets.push({ location, asset });
      if (missing.length) errors.push(`${assetId}: approved asset is missing ${missing.join(", ")}.`);
      if (!hasRightsEvidence) {
        errors.push(`${assetId}: approved asset is missing third-party rights evidence.`);
      }
      if (!/^\d{4}-\d{2}-\d{2}$/.test(asset.acquisitionDate ?? "")) {
        errors.push(`${assetId}: acquisitionDate must be YYYY-MM-DD.`);
      }
    }
  }

  for (const [source, occurrences] of duplicateSources) {
    if (occurrences.length < 2) continue;
    warnings.push(
      `Repeated remote source ${source} is referenced by ${occurrences.map((entry) => entry.assetId).join(", ")}.`,
    );
  }

  return {
    approvedAssets,
    rightsReviewPendingAssets,
    placeholders,
    missingThirdPartyRightsEvidenceAssets,
    metadataGaps,
    duplicateSources,
    counters,
  };
}

async function inspectHeroVideo() {
  const source = await configuredHeroVideoSource();
  if (!source) return { source: null, status: "Not configured; still-image poster only." };
  if (!source.startsWith("/media/video/")) {
    errors.push("Hero video must use a local /media/video/ path.");
    return { source, status: "Configured to a non-local path." };
  }

  const extension = path.posix.extname(source.split(/[?#]/, 1)[0]).toLowerCase();
  if (![".mp4", ".webm"].includes(extension)) {
    errors.push("Hero video must use an MP4 or WebM file.");
  }
  const filePath = publicFilePath(source);
  if (!filePath || !(await fileExists(filePath))) {
    errors.push(`Configured hero video file is missing or empty (${source}).`);
    return { source, status: "Configured file missing." };
  }
  return { source, status: "Configured local file exists; verify its license and playback separately." };
}

function createReport({
  approvedAssets,
  rightsReviewPendingAssets,
  placeholders,
  missingThirdPartyRightsEvidenceAssets,
  metadataGaps,
  duplicateSources,
  counters: auditCounters,
  heroVideo,
}) {
  const platformLicenseRecords = assets.filter(
    ({ asset }) => !isMissing(asset.sourceUrl) && !isMissing(asset.licenseUrl),
  ).length;
  const ready =
    errors.length === 0 &&
    placeholders.length === 0 &&
    rightsReviewPendingAssets.length === 0;
  const lines = [
    "# Media audit report",
    "",
    `Generated: ${new Date().toISOString()}`,
    "",
    `**Production media status: ${ready ? "READY" : "NOT READY"}**`,
    "",
    "This audit checks recorded source/license URLs and local files; it does not determine legal rights. Platform-license records and model/property rights review are reported separately.",
    "",
    "## Summary",
    "",
    `- Media entries inspected: ${assets.length}`,
    `- Approved assets: ${approvedAssets.length}`,
    `- Assets with source and platform-license URLs recorded: ${platformLicenseRecords}`,
    `- Assets pending model/property or other third-party rights review: ${rightsReviewPendingAssets.length}`,
    `- Assets missing third-party rights evidence: ${missingThirdPartyRightsEvidenceAssets.length}`,
    `- Unverified placeholders: ${placeholders.length}`,
    `- Missing creator: ${auditCounters.missingCreator}`,
    `- Missing source page: ${auditCounters.missingSource}`,
    `- Missing license record: ${auditCounters.missingLicense}`,
    `- Missing acquisition date: ${auditCounters.missingAcquisitionDate}`,
    `- Missing alt descriptions: ${auditCounters.missingAlt}`,
    `- Missing width values: ${auditCounters.missingWidth}`,
    `- Missing height values: ${auditCounters.missingHeight}`,
    `- Missing intended placements: ${auditCounters.missingPlacement}`,
    `- Broken or empty local image files: ${auditCounters.brokenLocalFiles}`,
    `- Repeated image source files: ${[...duplicateSources.values()].filter((items) => items.length > 1).length}`,
    `- Hero video: ${heroVideo.status}`,
    `- Structural audit errors: ${errors.length}`,
    "",
    "## Configured image entries",
    "",
    "| Asset ID | Status | Source | Dimensions | Alt | Creator | Source page | Platform license URL | Third-party rights evidence | Rights review | Acquired | Placement |",
    "|---|---|---|---|---|---|---|---|---|---|---|---|",
  ];

  for (const { location, asset } of assets) {
    const rightsReview = rightsReviewPendingStatuses.has(asset.status)
      ? "Pending"
      : approvedStatuses.has(asset.status)
        ? "Approved in record"
        : "Not reviewed";
    const thirdPartyRightsEvidence = asset.thirdPartyRightsEvidence === null
      ? "Not assessed"
      : hasThirdPartyRightsEvidence(asset)
        ? "Recorded"
        : "Missing";
    lines.push(
      `| ${escapeTable(asset.id || location)} | ${escapeTable(asset.status)} | ${escapeTable(asset.src)} | ${asset.width ?? "Missing"} x ${asset.height ?? "Missing"} | ${isMissing(asset.alt) ? "Missing" : "Present"} | ${escapeTable(asset.creator || "Missing")} | ${escapeTable(asset.sourceUrl || "Missing")} | ${escapeTable(asset.licenseUrl || "Missing")} | ${thirdPartyRightsEvidence} | ${rightsReview} | ${escapeTable(asset.acquisitionDate || "Missing")} | ${escapeTable((asset.intendedPlacement ?? []).join("; ") || "Missing")} |`,
    );
  }

  lines.push("", "## Pending rights-review records", "");
  if (rightsReviewPendingAssets.length === 0) {
    lines.push("None.");
  } else {
    lines.push(
      "The platform-license and source URLs are recorded; separate model/property releases and other third-party permissions have not been verified. These assets are not approved for final production use.",
      "",
      "| Asset ID | Platform license URL | Missing third-party evidence | Placement |",
      "|---|---|---|---|",
    );
    for (const { location, asset } of rightsReviewPendingAssets) {
      lines.push(
        `| ${escapeTable(asset.id || location)} | ${escapeTable(asset.licenseUrl || "Missing")} | No separate model/property release or third-party permission record is documented | ${escapeTable((asset.intendedPlacement ?? []).join("; "))} |`,
      );
    }
  }

  lines.push("", "## Unverified asset records", "");
  if (placeholders.length === 0) {
    lines.push("None.");
  } else {
    lines.push("| Asset ID | Current reference | Required metadata | Intended placement |", "|---|---|---|---|");
    for (const { location, asset } of placeholders) {
      const missing = metadataGaps.get(asset.id) ?? [];
      lines.push(
        `| ${escapeTable(asset.id || location)} | ${escapeTable(asset.src)} | ${escapeTable(missing.join(", ") || "None")} | ${escapeTable((asset.intendedPlacement ?? []).join("; "))} |`,
      );
    }
  }

  lines.push("", "## Repeated image source files", "");
  const repeated = [...duplicateSources.entries()].filter(([, occurrences]) => occurrences.length > 1);
  if (!repeated.length) {
    lines.push("No repeated local or remote source files detected.");
  } else {
    for (const [source, occurrences] of repeated) {
      lines.push(`- ${source}: ${occurrences.map((entry) => entry.assetId).join(", ")}`);
    }
  }

  lines.push("", "## Hero video", "", `- Status: ${heroVideo.status}`);
  if (heroVideo.source) lines.push(`- Configured source: ${heroVideo.source}`);
  if (!heroVideo.source) lines.push("- No video file is configured; the existing still-image fallback remains active.");

  lines.push("", "## Findings", "");
  if (
    !errors.length &&
    !warnings.length &&
    !placeholders.length &&
    !rightsReviewPendingAssets.length
  ) {
    lines.push("No audit findings.");
  } else {
    if (errors.length) {
      lines.push("### Errors", "", ...errors.map((error) => `- ${error}`), "");
    }
    if (placeholders.length || metadataGaps.size || rightsReviewPendingAssets.length) {
      lines.push(
        "### Production blockers",
        "",
        `- ${rightsReviewPendingAssets.length} licensed entries await separate model/property and third-party rights review.`,
        `- ${missingThirdPartyRightsEvidenceAssets.length} local licensed or approved entries have no documented third-party rights evidence.`,
        `- ${placeholders.length} placeholder entries have not been approved.`,
        `- ${metadataGaps.size} placeholder entries lack one or more creator, source-page, platform-license or acquisition-date fields.`,
        "",
      );
    }
    if (warnings.length) {
      lines.push("### Warnings", "", ...warnings.map((warning) => `- ${warning}`), "");
    }
  }

  lines.push(
    "",
    "The audit exits with code 1 while any placeholder, pending rights review, missing third-party rights evidence or structural error remains. Complete any separate rights clearance, update each status only when supported by evidence, and run `node scripts/audit-media.mjs` again.",
    "",
  );
  return lines.join("\n");
}

async function main() {
  const result = await inspectAssets();
  const heroVideo = await inspectHeroVideo();
  const report = createReport({ ...result, heroVideo });
  await writeFile(reportPath, report, "utf8");
  console.log(report);
  console.log(`\nWrote ${path.relative(root, reportPath)}.`);

  if (
    errors.length ||
    result.placeholders.length ||
    result.rightsReviewPendingAssets.length
  ) {
    process.exitCode = 1;
  }
}

await main();
