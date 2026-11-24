# Quality report

## Verification

- `npm.cmd run lint` — passed.
- `npm.cmd run build` — passed, including TypeScript checks and static page generation.
- Production route smoke test — `/` and `/about` returned 200; appointment options returned the expected 503 without salon/database configuration; the admin API returned 401 without a token.
- Unknown one- and multi-segment routes — return HTTP 404 through the Next.js proxy and render the app's not-found page.
- Browser checks — at 375px the document has no horizontal overflow, hero poster images load, the optional video remains absent when unconfigured, reduced-motion disables hero entrance animation, and non-hero booking/link styles remain intact. Mobile navigation opens/closes with Escape; service and gallery filters work.
- Hero video failure handling — verified with a temporary missing-media URL: the request fails and the video element is removed while the poster remains. Successful playback and data-saver behavior remain unverified because no licensed video is available.
- Phase 2 `npm.cmd run lint` and `npm.cmd run build` — passed; the build generated all three journal detail routes.
- Phase 2 route smoke test — `/`, all content routes, and all three `/journal/[slug]` pages returned 200. Journal draft pages are marked noindex until owner approval.
- Responsive browser check — `/`, `/services`, `/gallery`, `/artists` and `/journal` had no horizontal overflow at 360, 390, 430, 768, 1024, 1440 and 1920 CSS-pixel viewport widths.
- Interaction checks — service and lookbook filters update the visible results; lightbox arrow keys advance, Escape closes and restores focus; mobile navigation opens, Escape closes and restores focus.
- Media check — all eight lookbook images loaded through Next Image in the browser. The references remain unverified placeholders; loading success is not a license or endorsement check.
- Database concurrency, duration-overlap and confirmation tests — not run; they require a configured PostgreSQL instance.
- Production email delivery — not run; it requires a verified Resend sender and credentials.

## Known limitations

- Booking routes return a configuration error until environment variables and the SQL migration are applied.
- Availability and overlap checks depend on accurate salon schedule and service-duration configuration.
- No automated retention/deletion job exists.
- Resend notification delivery is optional, salon-side only, and not a customer confirmation.
- External Unsplash photos remain unverified concept media pending approved replacements.
- Booking options remain unavailable in browser testing until the owner configures the database, locations, staff and schedule; the expected unconfigured API response is HTTP 503.
- Journal articles are draft previews, without publication dates or expert credentials, pending owner review.
- No application license has been selected.

## Phase 3 media audit

- `npm.cmd run audit:media` — ran successfully and generated `docs/MEDIA_AUDIT.md`; it exits with code 1 by design because production blockers remain.
- Audit result: 22 image placement entries; 0 approved assets; 22 unverified placeholders; creator, source page, license record and acquisition date missing for all 22 entries; 6 repeated remote source images; 0 broken local media paths; hero video not configured.
- Alt descriptions and declared image dimensions exist for all current entries. This audit checks declared dimensions and local file existence; it does not inspect intrinsic pixels, remote availability, visual crops, actual license terms or video playback.
- No asset purchase, download, video activation, or changes to booking APIs/forms were made.
- `npm.cmd run lint` — passed after the Phase 3 audit implementation.
- `npm.cmd run build` — passed with TypeScript checks and static page generation after the Phase 3 media-config changes.
- The audit's missing-video-path check was exercised with a temporary environment override and correctly reported a missing local file; the environment was restored and the generated report rerun.
- No Phase 3 browser visual QA was run because no approved media/video was added and no UI behavior changed. The previous responsive, image-loading and reduced-motion checks above are from the existing implementation, not evidence that future campaign files have been verified.

## Launch gate

Do not represent this concept website as an operating salon until operational business facts, approved media, database/security operations, legal privacy terms, email sender and production URL are configured and verified.
