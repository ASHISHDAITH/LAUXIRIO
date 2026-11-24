# Design system

## Direction

Original Lauxirio direction: dark editorial luxury, architectural restraint, warm ivory content surfaces, tactile typography and a single champagne accent. Reference sites inform general usability and hierarchy only; no competitor identity, copy or imagery is reproduced.

## Core tokens

| Token | Value | Use |
|---|---|---|
| Obsidian | `#0B0B0B` | Deep scene backdrop and contrast |
| Graphite | `#171717` | Primary dark surface and text |
| Warm ivory | `#F4F0E8` | Main page surface |
| Champagne | `#B79A72` | Accent, actions and fine rules |
| Muted stone | `#8C8982` | Supporting text |

The existing stylesheet retains additional contextual rose, sage and sand values for section variation; use them sparingly.

## Type and layout

- Cormorant Garamond for editorial display; DM Sans for interface and supporting copy.
- Large editorial headlines, compact tracked eyebrow labels and clear body line-height.
- Wide section gutters scale with viewport; content is reflowed at tablet and mobile breakpoints.
- Persistent desktop navigation becomes a solid surface after scrolling; mobile uses a keyboard-dismissable menu.
- Cards and imagery maintain restrained borders, overlays and hover motion.

## Interaction and accessibility

- Service and gallery filters are keyboard-operable buttons with `aria-pressed`.
- Gallery lightbox supports Escape and a labeled close action.
- The 3D canvas is decorative; it is not rendered on small screens or when reduced motion/WebGL limitations are detected. A CSS sculpture fallback is shown.
- Booking controls expose validation and server errors; live time options are never populated from static demo values.
- Respect `prefers-reduced-motion` CSS and use animation only for progressive enhancement.
