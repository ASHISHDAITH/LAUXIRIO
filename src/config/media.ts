export type MediaImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  licenseStatus: "unverified-placeholder";
};

function placeholderImage(
  photoId: string,
  width: number,
  height: number,
  description: string,
  quality = 85,
): MediaImage {
  return {
    src: `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=${width}&h=${height}&q=${quality}`,
    alt: `${description} — unverified concept placeholder, not official Lauxirio work.`,
    width,
    height,
    licenseStatus: "unverified-placeholder",
  };
}

export const media = {
  hero: {
    poster: placeholderImage(
      "photo-1560066984-138dadb4c035",
      2400,
      1600,
      "Salon editorial scene",
      90,
    ),
    inset: placeholderImage(
      "photo-1521590832167-7bcbfaa6381f",
      1100,
      1400,
      "Studio interior",
      88,
    ),
  },
  story: placeholderImage(
    "photo-1560869713-7d0a29430803",
    1400,
    1100,
    "Salon interior concept",
  ),
  services: {
    signatureCut: placeholderImage(
      "photo-1560066984-138dadb4c035",
      1200,
      900,
      "Haircut and styling concept",
    ),
    dimensionalColour: placeholderImage(
      "photo-1522337360788-8b13dee7a37e",
      1200,
      900,
      "Hair colour concept",
    ),
    hairScalpRitual: placeholderImage(
      "photo-1527799820374-dcf8d9d4a388",
      1200,
      900,
      "Hair and scalp care concept",
    ),
    grooming: placeholderImage(
      "photo-1503951914875-452162b0f3f1",
      1200,
      900,
      "Grooming concept",
    ),
    bridal: placeholderImage(
      "photo-1519741497674-611481863552",
      1200,
      900,
      "Occasion styling concept",
    ),
    consultation: placeholderImage(
      "photo-1487412947147-5cebf100ffc2",
      1200,
      900,
      "Beauty consultation concept",
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
      ),
    },
    {
      id: "texture-study",
      title: "Texture study",
      label: "Texture",
      categories: ["Texture", "Styling", "Editorial"],
      orientation: "portrait",
      image: placeholderImage(
        "photo-1633681926022-84c23e8cb2d6",
        1000,
        1250,
        "Hair texture editorial concept",
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
      ),
    },
    {
      id: "colour-artist",
      image: placeholderImage(
        "photo-1500648767791-00dcc994a43e",
        900,
        1200,
        "Illustrative portrait for a proposed colour artist profile",
      ),
    },
    {
      id: "beauty-artist",
      image: placeholderImage(
        "photo-1534528741775-53994a69daeb",
        900,
        1200,
        "Illustrative portrait for a proposed beauty artist profile",
      ),
    },
  ],
  studio: {
    interior: placeholderImage(
      "photo-1521590832167-7bcbfaa6381f",
      1600,
      1100,
      "Studio interior concept",
    ),
    detail: placeholderImage(
      "photo-1560869713-7d0a29430803",
      1200,
      1400,
      "Salon detail concept",
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
