# Implementation status

## Completed in this enhancement branch

- Created `enhance/lauxirio-production-readiness` from the clean pushed `main` baseline.
- Removed fabricated New York phone/address/hours and placeholder `.example` canonical URLs from metadata and structured data.
- Removed invented artist names, prices and durations; concept imagery is labeled as placeholder.
- Converted primary content photos to Next Image with an explicit Unsplash host allowlist.
- Replaced demo USD prices, hours and US contact details with consultation/verified-configuration states.
- Split the homepage into a Server Component and small client islands for navigation, filters/lightbox, preloader, booking and hero scene.
- Added mobile/reduced-motion/WebGL 3D fallback and lowered canvas DPR/transmission work.
- Replaced local JSON appointment persistence with PostgreSQL schema, validated API, configured schedules and service durations, idempotency, overlap-safe confirmation, optional salon-side email and admin API/UI.
- Added sitemap/robots behavior using only a configured production URL.
- Added media folders and maintained media register.
- Added architecture, design, quality and project memory documentation.

## Phase 2 experience enhancements

- Centralized image sources, intrinsic dimensions, alt text and placeholder status in `src/config/media.ts`.
- Centralized service, artist-role and editorial-preview content in `src/config/content.ts`; appointment IDs remain aligned with the existing API.
- Reused the service explorer across home and services, and the keyboard/touch accessible lookbook across home and gallery.
- Added artist and studio concept layouts with explicit placeholder disclosures, plus draft journal previews, reading-time estimates and article detail pages.
- Updated the navigation hierarchy to include Lookbook and Journal; retained the booking flow and API unchanged.

## Still blocked on owner-provided information or operations

- Real public domain, business address, phone, email, timezone and opening hours.
- Approved staff identities/roster and service descriptions, durations and prices.
- A PostgreSQL database URL, selected provider, production migration and backup/retention policies.
- A strong `ADMIN_API_TOKEN` and staff access/distribution process.
- The salon's verified IANA timezone and configured real weekly start-time schedule.
- Optional Resend account, verified sender/domain and notification recipient.
- Owned/licensed campaign and employee photography/video with creator/license records.
- Owner-approved artist biographies, service descriptions and journal publication dates/content.
- Project license choice; none was added because the owner has not chosen one.

## Not claimed as complete

- No appointment was made against real availability in the absence of a configured database.
- No production mail was sent.
- No stock image has been individually cleared as official Lauxirio media.
- No deployment has been run.
