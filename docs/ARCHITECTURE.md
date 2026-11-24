# Architecture

## Runtime shape

- Next.js App Router with Server Components by default.
- The homepage is a Server Component. Filters/lightbox, navigation, preloader, booking form and WebGL scene are isolated client components.
- Next Image optimizes remote Unsplash concept images; `next.config.ts` allowlists only `images.unsplash.com`.
- PostgreSQL is the only persistent appointment store. `DATABASE_URL` is server-only.
- `docs/database.sql` is applied using `npm run db:migrate`; the request handler never writes to the deployment filesystem.
- `/api/appointments` reads salon configuration, calculates available start times using configured service durations, and accepts validated pending requests.
- `/api/admin/appointments` exposes a bearer-token-protected list/status API. `/admin` is a small internal console; staff must enter the token each page session.
- Optional Resend notification runs after persistence. Notification failure does not roll back a valid pending appointment; it is returned and logged without logging customer information.
- `NEXT_PUBLIC_SITE_URL` controls production metadata base, sitemap URLs and robots sitemap reference. No local-business schema is emitted until verified details exist.
- `SALON_TIME_ZONE` controls salon-local date validation and time display; no server or visitor timezone is silently assumed.

## Appointment data flow

```text
BookingForm -> GET /api/appointments (configured options)
            -> GET /api/appointments?date&locationId&stylistId&serviceId (open slots)
            -> POST /api/appointments + Idempotency-Key
               -> server-side config/field/date/schedule validation
               -> PostgreSQL pending request (unique constraints)
               -> optional salon email notification
Admin console -> bearer-authenticated GET/PATCH /api/admin/appointments
```

## Persistence and operations

PostgreSQL is provider-neutral; no database host has been selected. Admin token and database URL must be stored in deployment secret management. The schema indexes active duplicate customer requests and exact confirmed slots; admin confirmation is serialized per stylist and rejects duration-based overlap across locations. Backups, retention, privacy notices, migration rollout and data residency remain operator responsibilities.

## Deliberate content boundaries

Address, contact methods, schedule, stylist names, service prices and production URL are not asserted in code as real facts. Locations, stylists and weekly opening slots are supplied by server-only environment configuration. The site exposes no salon schema without verified facts.
