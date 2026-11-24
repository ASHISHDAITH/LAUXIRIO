# Media Asset Register

## Current references

The following are remotely loaded Unsplash CDN references already present in the concept website. They have **not** been downloaded, individually attributed or cleared as approved campaign/staff media. Direct CDN URLs do not identify creators. Until individually reviewed and replaced/approved, treat them as development placeholders and do not claim they depict Lauxirio, its premises or employees.

Image sources, alt text, dimensions and placeholder status are maintained in `src/config/media.ts`; page content and image placement metadata are shared rather than repeated in UI components. The site currently labels these references as illustrative concept media.

Source base for each reference: `https://images.unsplash.com/photo-{ID}?auto=format&fit=crop&w={SIZE}&q=85`
License reference: [Unsplash License](https://unsplash.com/license) — the license and any applicable restrictions have not been independently reviewed per image.
Acquisition date: Not acquired (remote URL reference). Code references were present in commit `a6fee2d` on 2026-11-24.

| Asset identifier | Creator | License status | Intended use |
|---|---|---|---|
| `photo-1560066984-138dadb4c035` | Unknown from CDN URL | Unverified; placeholder | Hero background poster, service list |
| `photo-1521590832167-7bcbfaa6381f` | Unknown from CDN URL | Unverified; placeholder | Hero editorial inset photograph |
| `photo-1522337360788-8b13dee7a37e` | Unknown from CDN URL | Unverified; placeholder | Service list |
| `photo-1487412947147-5cebf100ffc2` | Unknown from CDN URL | Unverified; placeholder | Service list |
| `photo-1527799820374-dcf8d9d4a388` | Unknown from CDN URL | Unverified; placeholder | Service list |
| `photo-1503951914875-452162b0f3f1` | Unknown from CDN URL | Unverified; placeholder | Grooming service and gallery |
| `photo-1519741497674-611481863552` | Unknown from CDN URL | Unverified; placeholder | Bridal service |
| `photo-1562322140-8baeececf3df` | Unknown from CDN URL | Unverified; placeholder | Gallery and lookbook |
| `photo-1526047932273-341f2a7631f9` | Unknown from CDN URL | Unverified; placeholder | Gallery and lookbook |
| `photo-1488426862026-3ee34a7d66df` | Unknown from CDN URL | Unverified; placeholder | Gallery and lookbook |
| `photo-1633681926022-84c23e8cb2d6` | Unknown from CDN URL | Unverified; placeholder | Gallery and lookbook |
| `photo-1524504388940-b1c1722653e1` | Unknown from CDN URL | Unverified; placeholder | Gallery and lookbook |
| `photo-1494790108377-be9c29b29330` | Unknown from CDN URL | Unverified; placeholder | Illustrative artist-directory portrait |
| `photo-1500648767791-00dcc994a43e` | Unknown from CDN URL | Unverified; placeholder | Illustrative artist-directory portrait |
| `photo-1534528741775-53994a69daeb` | Unknown from CDN URL | Unverified; placeholder | Illustrative artist-directory portrait |
| `photo-1560869713-7d0a29430803` | Unknown from CDN URL | Unverified; placeholder | Studio story |

## Replacement process

1. Obtain original Lauxirio-owned or properly licensed salon, service and staff photography/video.
2. Record the local filename, source page, creator, license/receipt, acquisition date and intended placements before publishing.
3. Store approved, optimized files under `public/media/hero/`, `studio/`, `services/`, `artists/`, `gallery/` or `video/`.
4. Update the image source in `src/config/media.ts` and this register.
5. Never use another salon's campaign, logo, lookbook or proprietary content. Do not remove watermarks or bypass paywalls.

No campaign video has been added. No paid asset has been acquired.

## Hero campaign video slot

No campaign video is currently configured or acquired. The hero video is opt-in through `NEXT_PUBLIC_LAUXIRIO_HERO_VIDEO_SRC`; leave it unset to retain the still-image fallback. When supplied, register its filename, creator, source page, license/receipt reference, acquisition date, allowed commercial use and intended placements here before enabling it.
