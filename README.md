# Lauxirio

Lauxirio is a responsive luxury unisex salon website built with Next.js, React, TypeScript and Tailwind CSS.

## Routes

- `/` — cinematic homepage
- `/about` — studio philosophy
- `/services` — complete service menu
- `/gallery` — editorial lookbook
- `/artists` — artist directory
- `/experience` — salon experience
- `/booking` — appointment request
- `/contact` — location and contact
- `/journal` — beauty editorial
- `/privacy` — privacy notice

## Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production

```bash
npm run build
npm run start
```

## Booking status

The appointment form submits a validated server-side request to `POST /api/appointments`. For local development, requests are stored in `.data/appointments.json`. This is not a production database or live availability provider. Submitted requests remain pending until confirmed by the salon. Before production, connect it to a supported booking provider or a validated server-side endpoint and configure slot availability, cancellation rules and confirmation emails.

## Content status

Business names, artist profiles, addresses, prices, hours and images are concept content and replaceable placeholders. They must be reviewed and replaced with approved salon information and licensed owned imagery before launch.
