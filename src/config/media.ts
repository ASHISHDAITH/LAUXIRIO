export type MediaStatus =
  | "approved-owned"
  | "approved-licensed"
  | "unverified-placeholder";

export type MediaImage = {
  id: string;
  src: string;
  alt: string;
  width: number | null;
  height: number | null;
  creator: string | null;
  sourceUrl: string | null;
  licenseUrl: string | null;
  acquisitionDate: string | null;
  intendedPlacement: string[];
  status: MediaStatus;
};

const PEXELS_LICENSE_URL = "https://www.pexels.com/license/";
const MEDIA_ACQUISITION_DATE = "2026-11-25";

function placeholderImage(
  photoId: string,
  width: number,
  height: number,
  description: string,
  intendedPlacement: string[],
  quality = 85,
): MediaImage {
  return {
    id: `${photoId}-${intendedPlacement[0].toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
    src: `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=${width}&h=${height}&q=${quality}`,
    alt: `${description} - unverified concept placeholder, not official Lauxirio work.`,
    width,
    height,
    creator: null,
    sourceUrl: null,
    licenseUrl: null,
    acquisitionDate: null,
    intendedPlacement,
    status: "unverified-placeholder",
  };
}

function licensedPexelsImage(
  photoId: string,
  fileName: string,
  width: number,
  height: number,
  alt: string,
  creator: string,
  sourceUrl: string,
  intendedPlacement: string[],
): MediaImage {
  return {
    id: `pexels-${photoId}-${intendedPlacement[0].toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
    src: `/media/${fileName}`,
    alt,
    width,
    height,
    creator,
    sourceUrl,
    licenseUrl: PEXELS_LICENSE_URL,
    acquisitionDate: MEDIA_ACQUISITION_DATE,
    intendedPlacement,
    status: "approved-licensed",
  };
}

export const media = {
  hero: {
    poster: licensedPexelsImage(
      "6487888",
      "hero/hero-stylist-detail.webp",
      2400,
      1600,
      "A stylist's hands combing dark hair during a close-up salon service; illustrative stock image.",
      "Matheus Wladeka",
      "https://www.pexels.com/photo/close-up-of-the-hands-of-a-hairdresser-at-work-6487888/",
      ["Homepage hero poster"],
    ),
    inset: placeholderImage(
      "photo-1521590832167-7bcbfaa6381f",
      1100,
      1400,
      "Studio interior",
      ["Homepage secondary editorial image"],
      88,
    ),
  },
  story: placeholderImage(
    "photo-1560869713-7d0a29430803",
    1400,
    1100,
    "Salon interior concept",
    ["Homepage philosophy section"],
  ),
  services: {
    signatureCut: licensedPexelsImage(
      "6503332",
      "services/signature-cut-process.webp",
      1200,
      900,
      "A stylist combing a section of long light hair; illustrative stock image.",
      "Nadezhda Moryak",
      "https://www.pexels.com/photo/close-up-photo-of-person-combing-a-hair-6503332/",
      ["Service menu: signature cut"],
    ),
    dimensionalColour: licensedPexelsImage(
      "6391646",
      "services/dimensional-colour-curls.webp",
      1200,
      900,
      "Back view of long curls with warm ombre colour; illustrative stock image, not a Lauxirio result.",
      "Lyn [Lynbot] Michelle",
      "https://www.pexels.com/photo/a-back-view-of-a-woman-in-denim-jacket-with-a-curly-hair-6391646/",
      ["Service menu: dimensional colour"],
    ),
    hairScalpRitual: licensedPexelsImage(
      "23349912",
      "services/hair-scalp-care-detail.webp",
      1200,
      900,
      "Close-up of a comb being drawn through damp hair by a stylist; illustrative stock image.",
      "Oleskandra Biliak",
      "https://www.pexels.com/photo/a-hairdresser-combing-clients-hair-23349912/",
      ["Service menu: hair and scalp care"],
    ),
    grooming: placeholderImage(
      "photo-1503951914875-452162b0f3f1",
      1200,
      900,
      "Grooming concept",
      ["Service menu: grooming"],
    ),
    bridal: licensedPexelsImage(
      "15507425",
      "services/bridal-updo-detail.webp",
      1200,
      900,
      "Close-up of a blonde bridal updo with decorative hairpins; illustrative stock image.",
      "Alina Skazka",
      "https://www.pexels.com/photo/close-up-shot-of-woman-s-hair-15507425/",
      ["Service menu: bridal and occasion"],
    ),
    consultation: licensedPexelsImage(
      "28868043",
      "services/consultation-colour-swatches.webp",
      1200,
      900,
      "A hand compares hair-colour swatches on a chart; illustrative stock image.",
      "Jonathan Borba",
      "https://www.pexels.com/photo/person-choosing-hair-color-from-sample-palette-28868043/",
      ["Service menu: consultation"],
    ),
  },
  gallery: [
    {
      id: "editorial-cut",
      title: "Editorial cut",
      label: "Haircuts",
      categories: ["Haircuts", "Styling", "Editorial"],
      orientation: "portrait",
      image: placeholderImage(
        "photo-1562322140-8baeececf3df",
        1000,
        1250,
        "Haircut editorial concept",
        ["Lookbook: haircuts and styling", "Journal: precision cut preview"],
      ),
    },
    {
      id: "soft-dimension",
      title: "Soft dimension",
      label: "Colour",
      categories: ["Colour", "Texture", "Editorial"],
      orientation: "portrait",
      image: placeholderImage(
        "photo-1524504388940-b1c1722653e1",
        1000,
        1250,
        "Hair colour editorial concept",
        ["Lookbook: colour", "Journal: dimensional colour preview"],
      ),
    },
    {
      id: "occasion-beauty",
      title: "Occasion beauty",
      label: "Bridal",
      categories: ["Bridal", "Styling", "Editorial"],
      orientation: "portrait",
      image: placeholderImage(
        "photo-1488426862026-3ee34a7d66df",
        1000,
        1250,
        "Occasion beauty editorial concept",
        ["Lookbook: bridal and occasion styling"],
      ),
    },
    {
      id: "modern-grooming",
      title: "Modern grooming",
      label: "Grooming",
      categories: ["Grooming", "Haircuts"],
      orientation: "landscape",
      image: placeholderImage(
        "photo-1503951914875-452162b0f3f1",
        1200,
        850,
        "Grooming editorial concept",
        ["Lookbook: grooming"],
      ),
    },
    {
      id: "texture-study",
      title: "Texture study",
      label: "Texture",
      categories: ["Texture", "Styling", "Editorial"],
      orientation: "portrait",
      image: licensedPexelsImage(
        "23349887",
        "gallery/wet-hair-texture-study.webp",
        1000,
        1250,
        "A hand holding damp hair above a wash basin; illustrative stock image.",
        "Oleskandra Biliak",
        "https://www.pexels.com/photo/a-hand-holding-wet-hair-23349887/",
        ["Lookbook: texture"],
      ),
    },
    {
      id: "styling-study",
      title: "Styling study",
      label: "Styling",
      categories: ["Styling", "Editorial"],
      orientation: "landscape",
      image: placeholderImage(
        "photo-1526047932273-341f2a7631f9",
        1200,
        850,
        "Styling editorial concept",
        ["Lookbook: editorial styling"],
      ),
    },
    {
      id: "beauty-portrait",
      title: "Beauty portrait",
      label: "Editorial",
      categories: ["Editorial", "Bridal"],
      orientation: "portrait",
      image: placeholderImage(
        "photo-1487412947147-5cebf100ffc2",
        1000,
        1250,
        "Beauty editorial concept",
        ["Lookbook: beauty editorial"],
      ),
    },
    {
      id: "colour-study",
      title: "Colour study",
      label: "Colour",
      categories: ["Colour", "Styling"],
      orientation: "portrait",
      image: placeholderImage(
        "photo-1522337360788-8b13dee7a37e",
        1000,
        1250,
        "Hair colour concept",
        ["Lookbook: colour study"],
      ),
    },
  ],
  artists: [
    {
      id: "hair-artist",
      image: placeholderImage(
        "photo-1494790108377-be9c29b29330",
        900,
        1200,
        "Illustrative portrait for a proposed hair artist profile",
        ["Artists: hair artist placeholder"],
      ),
    },
    {
      id: "colour-artist",
      image: placeholderImage(
        "photo-1500648767791-00dcc994a43e",
        900,
        1200,
        "Illustrative portrait for a proposed colour artist profile",
        ["Artists: colour artist placeholder"],
      ),
    },
    {
      id: "beauty-artist",
      image: placeholderImage(
        "photo-1534528741775-53994a69daeb",
        900,
        1200,
        "Illustrative portrait for a proposed beauty artist profile",
        ["Artists: beauty and grooming placeholder"],
      ),
    },
  ],
  studio: {
    interior: placeholderImage(
      "photo-1521590832167-7bcbfaa6381f",
      1600,
      1100,
      "Studio interior concept",
      ["Studio: interior concept"],
    ),
    detail: placeholderImage(
      "photo-1560869713-7d0a29430803",
      1200,
      1400,
      "Salon detail concept",
      ["Studio: detail concept"],
    ),
  },
} as const;

export const galleryFilters = [
  "All",
  "Haircuts",
  "Styling",
  "Colour",
  "Texture",
  "Grooming",
  "Bridal",
  "Editorial",
] as const;
