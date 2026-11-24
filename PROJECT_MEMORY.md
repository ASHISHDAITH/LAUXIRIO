# Project memory

- Keep the existing Lauxirio brand and Next.js 16 App Router; do not replace the project with a starter template.
- Use server components by default; isolate only the 3D scene, booking, nav, gallery and filters as client UI.
- Never invent salon identity, staff, address, phone, email, opening hours, prices, domain or live slots.
- The booking workflow requires PostgreSQL plus `SALON_LOCATIONS_JSON`, `SALON_STYLISTS_JSON`, `SALON_WEEKLY_AVAILABILITY_JSON`, and `SALON_SERVICE_DURATION_MINUTES_JSON`. Apply `docs/database.sql` with `npm run db:migrate`.
- `/admin` needs a strong `ADMIN_API_TOKEN`; optional salon email requires Resend configuration.
- Current Unsplash images are placeholders, not cleared brand assets. Refer to `ASSET_REGISTER.md`.
- Image sources and metadata belong in `src/config/media.ts`; page service/editorial content belongs in `src/config/content.ts`. Keep placeholder disclosures until assets are licensed/approved.
- Keep generic artist roles only until identities and biographies are confirmed; journal drafts must not imply publication dates or expert credentials.
- Service UI must continue using the six IDs in `src/lib/booking-config.ts`; do not change booking/backend behavior without a separate request.
- New public route prefixes must be allowed explicitly by `src/proxy.ts`; `/journal/*` is enabled for generated article previews.
- Read `AGENTS.md` and the installed Next.js docs before framework/API changes.
- Keep quality claims aligned with actual lint/build/browser/database test evidence in `docs/QUALITY_REPORT.md`.
