# LAUXIRIO media shot list

Phase 4 added seven optimized, free-source Pexels images as clearly disclosed illustrative references. Their source and platform-license records are present, but separate model/property release and third-party rights reviews are pending; they are not approved for final production use or LAUXIRIO campaign work, studio photography, staff, or client results. Fifteen of the 22 configured image placements remain unverified placeholders. No paid assets were acquired. Use the existing `public/media/` directories and record provenance in `src/config/media.ts` and `ASSET_REGISTER.md`.

| Area | Required shot | Direction / required evidence | Status |
|---|---|---|---|
| Hero | Main cinematic salon photograph | Wide landscape of the actual studio or approved campaign set; negative space for headline; natural hair detail; safe center crop. | Pexels craft-detail stock is an interim poster; owner campaign photo still required |
| Hero | Secondary editorial studio photograph | Vertical complementary frame, not a crop/reuse of the hero; actual studio or approved campaign setting. | Unverified concept placeholder; actual studio/campaign photo required |
| Hero | Hair-movement portrait | Editorial portrait showing realistic movement and texture; model consent and commercial release required. | Owner campaign media required |
| Hero | Optional campaign video | 8-15 second seamless silent loop with real stylist work, hair movement and studio detail; retain license/release and optimized poster. | Not acquired; video stays disabled |
| Hero | Mobile poster crop | Portrait/mobile-safe hero still with subject and text-safe area composed for a narrow screen; may be a separate approved crop of the hero shoot. | Current hero stock uses responsive crops; owner-composed mobile campaign still required |
| Services | Precision haircut | Close process or finished cut showing clean shape and natural texture; model consent if identifiable. | Pexels process detail is illustrative; genuine LAUXIRIO work required |
| Services | Hair colour | Accurate colour work in neutral light; no misleading before/after or altered result. | Pexels curl/colour reference is illustrative; genuine LAUXIRIO results required |
| Services | Balayage | Hair length and transition clearly visible; include natural detail and appropriate crop. | Owner campaign media required |
| Services | Hair and scalp care | Professional care process, clean tools and consented client/model; no unsupported treatment claims. | Pexels damp-hair combing reference is illustrative; actual treatment work required |
| Services | Grooming | Unisex grooming detail and finished style; avoid assuming the service is only for one gender. | Owner campaign media required |
| Services | Bridal styling | Finished occasion style with approved model/client use and any needed venue/wardrobe permissions. | Pexels updo reference is illustrative; actual campaign/client work required |
| Services | Personal consultation | Stylist-client conversation, consent and privacy respected; do not show identifiable client records. | Pexels colour-swatch reference is illustrative; real consultation photography required |
| Lookbook | Men's hairstyles | Varied lengths and finishes; genuine work or correctly licensed model; no gender-exclusive service implication. | Owner campaign media required |
| Lookbook | Women's hairstyles | Varied lengths and finishes; natural texture and accurate styling representation. | Owner campaign media required |
| Lookbook | Short hair | Multiple short cuts and profiles; clear silhouette and detail. | Owner campaign media required |
| Lookbook | Long hair | Shape, movement and finish visible, with uncluttered backgrounds. | Owner campaign media required |
| Lookbook | Curly hair | Natural curl definition and volume; no smoothing that obscures texture. | Owner campaign media required |
| Lookbook | Textured hair | Respectful, high-detail representation across relevant hair textures and styles. | One Pexels texture reference is illustrative; owner-approved campaign results required |
| Lookbook | Colour | Accurate, consistent colour rendering and visible dimension. | Owner campaign media required |
| Lookbook | Grooming | Finished grooming work with a consistent editorial treatment. | Owner campaign media required |
| Lookbook | Bridal | Bridal/occasion styling with the correct model, venue and wardrobe permissions. | Owner campaign media required |
| Lookbook | Editorial looks | Distinct campaign frames; no duplicate source images used to fill the grid. | Owner campaign media required |
| Artists | Hair stylist portrait | Genuine LAUXIRIO staff portrait, approved name/role/bio and written image consent. | Staff photography and owner details required |
| Artists | Colour specialist portrait | Genuine team member and approved role; do not infer expertise from a stock portrait. | Staff photography and owner details required |
| Artists | Beauty and grooming artist portrait | Genuine team member and approved role; obtain consent and approved biography. | Staff photography and owner details required |
| Artists | Working-process photography | Actual LAUXIRIO artist at work, with client consent and no private client details visible. | Owner campaign media required |
| Studio | Reception | Actual reception area, cleared of private information and third-party branding. | Owner studio photography required |
| Studio | Styling stations | Actual stations, composed consistently with campaign lighting. | Owner studio photography required |
| Studio | Mirrors | Actual mirror/station detail; remove unintended reflections or identifiable people without consent. | Owner studio photography required |
| Studio | Wash stations | Actual wash area, clean and ready; no unsupported service claims. | Owner studio photography required |
| Studio | Product display | Actual products with brand/trademark permissions and no implied sponsorship. | Owner studio photography required |
| Studio | Architectural details | Materials, lighting and spatial character of the real salon. | Owner studio photography required |
| Studio | Hospitality details | Real approved hospitality details; do not stage amenities the salon does not provide. | Owner studio photography required |

## Approval checklist for each delivery

1. Owner confirms the asset depicts the intended person, service or actual studio and approves the placement.
2. Record original source page, creator, license or ownership evidence, acquisition date and commercial-use permission; obtain model/property releases where relevant.
3. Check there is no editorial-only restriction, unlicensed trademark, implied endorsement or unresolved privacy issue.
4. Save the original outside `public/`; publish only optimized derivatives in the correct `public/media/` category.
5. Add accurate alt text, dimensions and the complete metadata/status in `src/config/media.ts`.
6. Run `npm run audit:media`; manually inspect desktop/mobile crop, image loading and contrast.

Do not use stock artist portraits as actual employees, label stock interiors as the salon, use competitor campaign media, or purchase assets/subscriptions without owner approval.
