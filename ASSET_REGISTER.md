# Media asset register

## Readiness

The media catalog contains seven `licensed-review-pending` Pexels stock references stored as optimized local WebP files and 15 `unverified-placeholder` placements. Their source pages and Pexels platform-license URL are recorded, but separate model/property releases and other third-party permissions have not been verified. These assets are not approved for final production use. They do not depict LAUXIRIO, constitute official campaign results, or imply endorsement. Do not repurpose them as staff, client results, or actual studio photography. No paid asset or subscription has been acquired.

The canonical per-placement metadata is in [`src/config/media.ts`](./src/config/media.ts). Run `npm run audit:media` to regenerate [`docs/MEDIA_AUDIT.md`](./docs/MEDIA_AUDIT.md). Fifteen placeholders remain, including the artist portraits, studio imagery, grooming, and most lookbook placements. No real LAUXIRIO campaign, team, client-result, or studio media has been supplied; the optional campaign video remains unconfigured.

## Selected free-source stock references

Each item is an illustrative reference only. Pexels' platform license is recorded for the free commercial-use terms; creator names are retained as provenance. Platform permission is distinct from full rights clearance. No separate model/property release documents or other third-party permission records are held, so keep the visible stock disclosures in place and do not imply endorsement.

| Pexels photo | Creator | Placement | Local optimized file | Original asset page |
|---|---|---|---|---|
| `6487888` | Matheus Wladeka | Homepage hero poster | `public/media/hero/hero-stylist-detail.webp` | [Pexels](https://www.pexels.com/photo/close-up-of-the-hands-of-a-hairdresser-at-work-6487888/) |
| `6503332` | Nadezhda Moryak | Signature cut service | `public/media/services/signature-cut-process.webp` | [Pexels](https://www.pexels.com/photo/close-up-photo-of-person-combing-a-hair-6503332/) |
| `6391646` | Lyn [Lynbot] Michelle | Dimensional colour service | `public/media/services/dimensional-colour-curls.webp` | [Pexels](https://www.pexels.com/photo/a-back-view-of-a-woman-in-denim-jacket-with-a-curly-hair-6391646/) |
| `23349912` | Oleskandra Biliak | Hair and scalp service | `public/media/services/hair-scalp-care-detail.webp` | [Pexels](https://www.pexels.com/photo/a-hairdresser-combing-clients-hair-23349912/) |
| `15507425` | Alina Skazka | Bridal and occasion service | `public/media/services/bridal-updo-detail.webp` | [Pexels](https://www.pexels.com/photo/close-up-shot-of-woman-s-hair-15507425/) |
| `28868043` | Jonathan Borba | Personal consultation service | `public/media/services/consultation-colour-swatches.webp` | [Pexels](https://www.pexels.com/photo/person-choosing-hair-color-from-sample-palette-28868043/) |
| `23349887` | Oleskandra Biliak | Lookbook texture reference | `public/media/gallery/wet-hair-texture-study.webp` | [Pexels](https://www.pexels.com/photo/a-hand-holding-wet-hair-23349887/) |

All seven records link to the [Pexels License](https://www.pexels.com/license/) and were acquired on 2026-11-25. The per-file metadata, exact dimensions, alt text and intended placements are in `src/config/media.ts`. The selected stock photographs are not verified LAUXIRIO work and must remain visibly disclosed as illustrative.

## Candidate source terms research

Official pages checked 2026-11-25. This is a sourcing checklist, not legal advice or an approval of any asset:

| Source | Official information reviewed | What still requires asset-level review |
|---|---|---|
| [Adobe Stock licensing](https://stock.adobe.com/license-terms) | Multiple license types and restrictions apply; editorial-only content is not a general commercial campaign asset. | Chosen license tier, creator, releases, permitted website use and applicable restrictions. |
| [Artgrid licensing](https://artgrid.io/license) | The official page returned a JavaScript loading shell in this research environment; its terms could not be verified. | Read current terms and confirm subscription, project and commercial use directly before selecting anything. |
| [Motion Array licensing](https://motionarray.com/license/) | Its official overview describes member-project coverage and flags editorial-use-only material as restricted for commercial use. | Asset restrictions, active-subscription/project conditions, releases and retained proof of license. |
| [Envato Elements license](https://help.elements.envato.com/hc/en-us/articles/360000628966-Envato-Elements-License) | Items are licensed for a specified project/end product; the license record must be registered for each use. | Project registration, subscription/terms at acquisition, creator, releases and permitted commercial use. |
| [Unsplash License](https://unsplash.com/license) | The platform publishes a general license; use of a CDN image does not identify its original page or resolve model, property, trademark or endorsement concerns. | Original photo page, contributor, current terms, commercial context and any necessary releases. |
| [Pexels License](https://www.pexels.com/license/) | Its official page allows free commercial use without required attribution, with restrictions including no implied endorsement and limits involving identifiable people/brands. | Original asset page, creator, consent/releases, trademarks, context and accurate attribution records for internal audit. |

Free availability is not the same as ownership, endorsement, or a separate model/property release. No stock artist portraits, campaign video, or actual-studio photographs have been selected.

## Registering approved files

For each approved item:

1. Retain the original asset page, creator name, license terms/receipt, acquisition date, model/property release evidence where relevant, and owner approval.
2. Record `src`, accurate alt text, intrinsic width/height, `creator`, `sourceUrl`, `licenseUrl`, `acquisitionDate`, all `intendedPlacement` values and an explicit approved status in `src/config/media.ts`.
3. Use `licensed-review-pending` when the source and platform-license record are present but model/property releases or other third-party permissions remain unverified. Use `approved-owned` or `approved-licensed` only after applicable ownership/license evidence and relevant releases/permissions are documented.
4. Put optimized approved images under `public/media/{hero,studio,services,artists,gallery}/`; put approved MP4/WebM files under `public/media/video/`.
5. Run `npm run audit:media`; investigate every error and review the local image on desktop and mobile before removing its placeholder disclosure.

Do not scrape competitor sites, reuse competitor campaigns, use watermarked previews, bypass paywalls, imply that stock models are employees/customers, or buy assets/start paid subscriptions without owner approval.

## Hero video slot

No campaign video is present or configured. Keep `NEXT_PUBLIC_LAUXIRIO_HERO_VIDEO_SRC` unset until an actual licensed/owned file exists under `public/media/video/` and its provenance is registered. See [`docs/HERO_MEDIA.md`](./docs/HERO_MEDIA.md).
