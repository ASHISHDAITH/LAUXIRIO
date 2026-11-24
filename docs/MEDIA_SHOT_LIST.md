# LAUXIRIO media shot list

Phase 4B added seven optimized Pexels references, bringing the catalog to 14 `licensed-review-pending` stock images and eight unverified placeholders across 22 placements. Source pages and platform-license records are present, but no separate model/property releases or third-party rights evidence have been verified; none is approved for final production use or LAUXIRIO campaign work, studio photography, staff, or client results. No paid assets were acquired. Use the existing `public/media/` directories and record provenance in `src/config/media.ts` and `ASSET_REGISTER.md`.

| Area | Required shot | Direction / required evidence | Status |
|---|---|---|---|
| Hero | Main cinematic salon photograph | Wide landscape of the actual studio or approved campaign set; negative space for headline; natural hair detail; safe center crop. | Pexels craft-detail stock is an interim poster; owner campaign photo still required |
| Hero | Secondary editorial image | Vertical complementary frame with natural hair texture; must not imply it depicts the LAUXIRIO premises or staff. | Face-free Pexels texture crop is an illustrative stock reference; actual studio/campaign photo still required |
| Homepage | Philosophy image | Close craft detail or an owner-approved campaign frame; no implication that stock shows actual LAUXIRIO work. | Pexels haircut detail is an illustrative reference; owner campaign photo still required |
| Hero | Hair-movement portrait | Editorial portrait showing realistic movement and texture; model consent and commercial release required. | Owner campaign media required |
| Hero | Optional campaign video | 8-15 second seamless silent loop with real stylist work, hair movement and studio detail; retain license/release and optimized poster. | Not acquired; video stays disabled |
| Hero | Mobile poster crop | Portrait/mobile-safe hero still with subject and text-safe area composed for a narrow screen; may be a separate approved crop of the hero shoot. | Current hero stock uses responsive crops; owner-composed mobile campaign still required |
| Services | Precision haircut | Close process or finished cut showing clean shape and natural texture; model consent if identifiable. | Pexels process detail is illustrative; genuine LAUXIRIO work required |
| Services | Hair colour | Accurate colour work in neutral light; no misleading before/after or altered result. | Pexels curl/colour reference is illustrative; genuine LAUXIRIO results required |
| Services | Balayage | Hair length and transition clearly visible; include natural detail and appropriate crop. | Owner campaign media required |
| Services | Hair and scalp care | Professional care process, clean tools and consented client/model; no unsupported treatment claims. | Pexels damp-hair combing reference is illustrative; actual treatment work required |
| Services | Grooming | Unisex grooming detail and finished style; avoid assuming the service is only for one gender. | Pexels short-hair process image is illustrative and pending rights review; genuine LAUXIRIO work still required |
| Services | Bridal styling | Finished occasion style with approved model/client use and any needed venue/wardrobe permissions. | Pexels updo reference is illustrative; actual campaign/client work required |
| Services | Personal consultation | Stylist-client conversation, consent and privacy respected; do not show identifiable client records. | Pexels colour-swatch reference is illustrative; real consultation photography required |
| Lookbook | Men's hairstyles | Varied lengths and finishes; genuine work or correctly licensed model; no gender-exclusive service implication. | One face-free Pexels grooming crop is illustrative and pending rights review; genuine LAUXIRIO work still required |
| Lookbook | Women's hairstyles | Varied lengths and finishes; natural texture and accurate styling representation. | Pexels haircut process reference is illustrative and pending rights review; genuine LAUXIRIO work still required |
| Lookbook | Short hair | Multiple short cuts and profiles; clear silhouette and detail. | One Pexels grooming crop is illustrative and pending rights review; genuine LAUXIRIO results still required |
| Lookbook | Long hair | Shape, movement and finish visible, with uncluttered backgrounds. | One Pexels haircut process reference is illustrative and pending rights review; genuine LAUXIRIO results still required |
| Lookbook | Curly hair | Natural curl definition and volume; no smoothing that obscures texture. | Owner campaign media required |
| Lookbook | Textured hair | Respectful, high-detail representation across relevant hair textures and styles. | One Pexels texture reference is illustrative; owner-approved campaign results required |
| Lookbook | Colour | Accurate, consistent colour rendering and visible dimension. | Pexels foil-process reference is illustrative, not a finished result, and pending rights review; genuine LAUXIRIO results still required |
| Lookbook | Grooming | Finished grooming work with a consistent editorial treatment. | Pexels haircut reference is illustrative and pending rights review; genuine LAUXIRIO results still required |
| Lookbook | Bridal | Bridal/occasion styling with the correct model, venue and wardrobe permissions. | Pexels rear-view updo is illustrative and pending rights review; genuine LAUXIRIO results still required |
| Lookbook | Editorial looks | Distinct campaign frames; no duplicate source images used to fill the grid. | Owner campaign media required |
| Lookbook | Beauty editorial | Face-free beauty detail or owner-approved portrait with appropriate releases. | Placeholder retained; face-dominant candidates were rejected and suitable imagery was not verified |
| Lookbook | Colour study | Natural colour dimension without an implied client result. | Placeholder retained; remaining candidates did not meet the visual or release-evidence threshold |
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

Do not use stock artist portraits as actual employees, label stock interiors as the salon, use competitor campaign media, or purchase assets/subscriptions without owner approval. The three artist portraits and two actual-studio images remain owner-provided photography requirements; the three remaining lookbook placeholders remain unverified rather than being filled with unsuitable or face-dominant stock.
