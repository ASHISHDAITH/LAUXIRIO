# Lauxirio

A luxury, unisex salon website concept built with Next.js 16, React 19, TypeScript, Tailwind CSS 4 and React Three Fiber. The UI is intentionally transparent where verified business details and licensed campaign assets have not yet been supplied.

## Routes

- `/` — editorial homepage
- `/about`, `/services`, `/gallery`, `/artists`, `/experience`, `/journal`
- `/journal/[slug]` — editorial preview detail with related stories
- `/booking` — appointment request with configured live availability
- `/contact` — verified contact details will be added when supplied
- `/privacy` — booking data summary
- `/admin` — token-protected salon request management
- `/api/appointments` — appointment options, availability and submissions
- `/api/admin/appointments` — authenticated request management API

## Development

Requirements: Node.js 20.9+ and a PostgreSQL-compatible database.

```powershell
Copy-Item .env.example .env
npm install
npm run db:migrate
npm run dev
```

Configure `.env` before migrating. Use a PostgreSQL provider/database you control; no vendor is selected by this project. Hosting prices, connection limits, backups, data residency and free-tier terms depend on that provider. A local PostgreSQL instance may be used for development.

Required environment variables:

- `DATABASE_URL` — server-only Postgres connection string
- `SALON_LOCATIONS_JSON` — verified location IDs and public labels
- `SALON_STYLISTS_JSON` — verified stylist IDs and public labels
- `SALON_WEEKLY_AVAILABILITY_JSON` — actual weekly appointment start times keyed by ISO weekday (`1` Monday through `7` Sunday); values use 24-hour `HH:mm`
- `SALON_SERVICE_DURATION_MINUTES_JSON` — verified service durations in minutes, keyed by every configured service ID
- `SALON_TIME_ZONE` — verified IANA timezone for the salon's date and opening schedule
- `ADMIN_API_TOKEN` — random secret of at least 32 characters for `/admin`

Optional:

- `NEXT_PUBLIC_SITE_URL` — canonical production origin, set before building for sitemap and metadata URLs
- `RESEND_API_KEY`, `SALON_NOTIFICATION_EMAIL`, `EMAIL_FROM` — all three are required to send salon-side email notifications

Example configuration **format only** (do not copy unverified location, staff or opening hours into production):

```dotenv
SALON_LOCATIONS_JSON=[{"id":"verified-location-id","label":"Verified public location"}]
SALON_STYLISTS_JSON=[{"id":"verified-stylist-id","label":"Verified stylist name"}]
SALON_WEEKLY_AVAILABILITY_JSON={"1":["09:30","11:00"],"2":["09:30","11:00"]}
SALON_SERVICE_DURATION_MINUTES_JSON={"signature-cut":60,"dimensional-colour":90,"hair-scalp-ritual":60,"grooming-ritual":45,"bridal-beauty":120,"consultation":30}
SALON_TIME_ZONE=Area/City
```

The duration values above are format examples only; replace them with verified service durations. Availability checks and admin confirmation prevent overlapping confirmed appointments using those configured durations.

Generate a strong admin token locally:

```powershell
node -e "console.log(require('node:crypto').randomBytes(32).toString('hex'))"
```

Never commit `.env` or paste secret values into source files. Admin access uses a bearer token held only in the current `/admin` page session; the API compares it server-side.

## Appointment workflow

1. Booking options come only from the salon's configured locations and stylist roster.
2. Available times are derived from configured weekly openings in the salon's configured IANA timezone minus confirmed database appointments. No demo times are presented as live availability.
3. The server validates the chosen date, time, location, stylist and service and persists a pending request in PostgreSQL.
4. The salon reviews requests at `/admin` and can confirm or cancel them. Confirmations are serialized per stylist, checked against existing appointment durations across locations, and protected against duplicate exact slots by a database unique index. The customer is told that a request is pending, not booked.
5. Idempotency keys and an active-customer/slot constraint guard retries and duplicate requests.

Apply schema changes with `npm run db:migrate`. The migration is safe to rerun; if upgrading a database with appointments created before service durations were stored, set a verified duration for each existing row before rerunning. Database backups, access control, encryption in transit/at rest and legally appropriate retention/deletion policies must be configured with the chosen database provider. This code does not automatically delete personal data.

Email is optional and uses the Resend REST API only when all three email variables are present. The integration sends new-request notifications to the salon, not appointment confirmations to customers. The pricing page currently lists a Free tier ($0, up to 3,000 transactional emails/month and 100/day) and Pro at $20/month for 50,000; verify current terms before adoption: [Resend pricing](https://resend.com/pricing) (checked 2026-11-24). Email delivery is not required for database persistence.

## Media and content readiness

Seven Pexels images are locally optimized and licensed for commercial use as illustrative stock references only; they do not represent LAUXIRIO staff, clients, results, campaign work or premises. Fifteen other placements remain unverified placeholders. Image metadata and explicit approval status are centralized in `src/config/media.ts`; page copy remains in `src/config/content.ts`. The source/license register is [ASSET_REGISTER.md](./ASSET_REGISTER.md), the requested deliverables are in [docs/MEDIA_SHOT_LIST.md](./docs/MEDIA_SHOT_LIST.md), and the creative guidance is in [docs/MEDIA_ART_DIRECTION.md](./docs/MEDIA_ART_DIRECTION.md). Run `npm run audit:media` to check local paths, metadata and video configuration; the current report is [docs/MEDIA_AUDIT.md](./docs/MEDIA_AUDIT.md). No LAUXIRIO-owned campaign, staff, client-result, or actual studio media has been supplied, and the optional hero video remains unconfigured. Placeholder notices remain until approved replacements exist and load correctly.

Salon address, telephone, email, public hours, staff identities, service durations/prices and production domain were not provided. They are intentionally not invented or emitted as HairSalon structured data. Set verified operational configuration before launch. The repository has no `LICENSE`; choose a license before reusing or distributing its code.

## Commands

```powershell
npm run lint
npm run build
npm run start
npm run db:migrate
npm run audit:media
```

`npm run audit:media` writes `docs/MEDIA_AUDIT.md`. It exits with code 1 while unverified placeholders or structural errors remain; this is an intentional production-readiness gate, not a claim that the current placeholders are licensed.


## Homepage hero update

The homepage uses a cinematic editorial composition: a full-bleed, locally optimized Pexels craft-detail photo with a visible illustrative-stock disclosure, dark photographic grading, refined headline and clear appointment/menu actions, plus a framed secondary studio concept placeholder. The oversized decorative 3D product bottle has been removed from the first screen so the salon and editorial imagery remain the focus. Replace the stock poster and secondary placeholder with owner-approved LAUXIRIO campaign/studio photography before launch.

## Phase 2 content and experience

The services, lookbook, artist profiles and journal use shared data/configuration. Service links use only the six IDs already supported by the appointment API; the site does not invent service prices, durations, staff identities or publication dates. The lookbook lightbox supports keyboard controls, focus management and touch swipes. Journal pieces are original draft previews pending owner review. Replace the illustrative media and approve editorial copy before launch.

## Hero campaign video (optional)

The homepage hero supports an optional silent MP4 or WebM campaign loop. Keep `NEXT_PUBLIC_LAUXIRIO_HERO_VIDEO_SRC` unset to use the poster image only. For setup, recommended export settings, reduced-motion behavior and licensing records, see [docs/HERO_MEDIA.md](./docs/HERO_MEDIA.md). The video must be owned by Lauxirio or cleared for commercial website use; do not publish stock previews or watermarked footage.
