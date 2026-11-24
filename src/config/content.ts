import { media } from "@/config/media";

export const serviceFilters = [
  "All",
  "Haircuts",
  "Styling",
  "Colour",
  "Texture",
  "Treatments",
  "Grooming",
  "Bridal",
] as const;

export type ServiceFilter = (typeof serviceFilters)[number];

export const services = [
  {
    id: "signature-cut",
    number: "01",
    title: "Signature cut",
    category: "Haircuts",
    filters: ["Haircuts", "Styling", "Texture"],
    description:
      "A consultation-led cut and finish shaped around your preferences and everyday routine.",
    image: media.services.signatureCut,
  },
  {
    id: "dimensional-colour",
    number: "02",
    title: "Dimensional colour",
    category: "Colour",
    filters: ["Colour", "Styling"],
    description:
      "Discuss tone, placement and upkeep with an artist before choosing a colour service.",
    image: media.services.dimensionalColour,
  },
  {
    id: "hair-scalp-ritual",
    number: "03",
    title: "Hair & scalp ritual",
    category: "Treatments",
    filters: ["Treatments", "Texture"],
    description:
      "A focused hair and scalp care appointment, with the service plan agreed in consultation.",
    image: media.services.hairScalpRitual,
  },
  {
    id: "grooming-ritual",
    number: "04",
    title: "Grooming ritual",
    category: "Grooming",
    filters: ["Grooming", "Haircuts"],
    description:
      "A considered grooming appointment with the requested shape and finish discussed first.",
    image: media.services.grooming,
  },
  {
    id: "bridal-beauty",
    number: "05",
    title: "Bridal & occasion beauty",
    category: "Bridal",
    filters: ["Bridal", "Styling"],
    description:
      "Plan an occasion look with the artist; availability, scope and timing are confirmed directly.",
    image: media.services.bridal,
  },
  {
    id: "consultation",
    number: "06",
    title: "Personal consultation",
    category: "Styling",
    filters: ["Styling", "Colour", "Texture"],
    description:
      "A conversation to clarify your goals and identify a suitable service before booking.",
    image: media.services.consultation,
  },
] satisfies Array<{
  id: string;
  number: string;
  title: string;
  category: Exclude<ServiceFilter, "All">;
  filters: Exclude<ServiceFilter, "All">[];
  description: string;
  image: (typeof media.services)[keyof typeof media.services];
}>;

export const artistProfiles = [
  {
    id: "hair-artist",
    role: "Hair artist",
    specialties: "Cutting · Styling · Texture",
    image: media.artists[0].image,
  },
  {
    id: "colour-artist",
    role: "Colour artist",
    specialties: "Colour direction · Glossing",
    image: media.artists[1].image,
  },
  {
    id: "beauty-artist",
    role: "Beauty artist",
    specialties: "Bridal · Occasion · Grooming",
    image: media.artists[2].image,
  },
] as const;

export const journalArticles = [
  {
    slug: "a-guide-to-dimensional-colour",
    title: "A guide to dimensional colour",
    category: "Colour",
    excerpt:
      "A useful starting point for discussing tone, placement and the upkeep you are comfortable with.",
    image: media.gallery[1].image,
    sections: [
      {
        heading: "Begin with the brief",
        paragraphs: [
          "Before choosing a colour service, collect a few references that help explain the mood you have in mind. Include what you like about each one, as well as anything you would prefer to avoid.",
          "A consultation is the place to discuss your current hair, your routine and the options available. The final service, timing and price should be confirmed by the salon before an appointment is arranged.",
        ],
      },
      {
        heading: "Make upkeep part of the decision",
        paragraphs: [
          "Ask how the proposed result may fit into your regular routine. A clear conversation about maintenance helps you choose a direction that feels realistic for you.",
        ],
      },
    ],
  },
  {
    slug: "make-a-precision-cut-your-own",
    title: "Make a precision cut your own",
    category: "Haircuts",
    excerpt:
      "A few prompts to help turn references and everyday preferences into a more personal consultation.",
    image: media.gallery[0].image,
    sections: [
      {
        heading: "Bring context, not only a picture",
        paragraphs: [
          "Reference images can start a conversation, but your preferred length, styling habits and the amount of time you want to spend getting ready matter too. Share what works for you on an ordinary day.",
          "If there are details you want to keep or change, say so at the start. Your artist can discuss what is possible and agree the plan with you before beginning.",
        ],
      },
      {
        heading: "Leave with a clear routine",
        paragraphs: [
          "Before you go, ask the artist to walk through the finish and any suggested upkeep. The aim is to leave with a result and routine you understand.",
        ],
      },
    ],
  },
  {
    slug: "a-considered-approach-to-texture",
    title: "A considered approach to texture",
    category: "Texture",
    excerpt:
      "How to share the way your hair moves, the finish you enjoy and the routine you want to maintain.",
    image: media.gallery[4].image,
    sections: [
      {
        heading: "Describe your usual routine",
        paragraphs: [
          "The way you wear your hair day to day is useful context for a service conversation. Explain how you usually style it, what you enjoy about its natural movement and what you would like to feel different.",
          "Photos taken on different days can help show the range of finishes you wear. They are conversation starters rather than a promise of an identical result.",
        ],
      },
      {
        heading: "Agree the finish together",
        paragraphs: [
          "Ask which options fit your preferences and how each one may be maintained. Your artist should confirm the proposed service and any practical details with you before proceeding.",
        ],
      },
    ],
  },
] as const;

export type JournalArticle = (typeof journalArticles)[number];

export function getJournalReadingTime(article: JournalArticle): number {
  const text = [
    article.title,
    article.excerpt,
    ...article.sections.flatMap((section) => [section.heading, ...section.paragraphs]),
  ].join(" ");
  const wordCount = text.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(wordCount / 200));
}
