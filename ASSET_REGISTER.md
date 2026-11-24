# Media asset register

## Readiness

There are no approved-owned or approved-licensed campaign assets in this repository. The website currently references 22 Unsplash CDN image placements, all explicitly marked `unverified-placeholder`. They are concept references only; do not imply that they depict LAUXIRIO, its premises, staff or customers. No asset has been individually selected, downloaded, attributed, or cleared for this campaign, and no paid asset or subscription has been acquired.

The canonical per-placement metadata is in [`src/config/media.ts`](./src/config/media.ts). Run `npm run audit:media` to regenerate [`docs/MEDIA_AUDIT.md`](./docs/MEDIA_AUDIT.md). The audit currently reports 22 placeholders, zero approved assets, 22 missing creator/source/license/acquisition records, six repeated source images, no broken local media paths, and no configured campaign video.

## Current remote placeholders

The 22 records below are placement entries, not 22 distinct photographs. Their full IDs, dimensions, alt descriptions and intended placements are in the media configuration and generated audit report.

| Unsplash photo ID | Current status | Notes |
|---|---|---|
| `photo-1560066984-138dadb4c035` | `unverified-placeholder` | Homepage hero and signature-cut service |
| `photo-1521590832167-7bcbfaa6381f` | `unverified-placeholder` | Homepage inset and studio interior |
| `photo-1560869713-7d0a29430803` | `unverified-placeholder` | Philosophy section and studio detail |
| `photo-1522337360788-8b13dee7a37e` | `unverified-placeholder` | Dimensional colour and lookbook |
| `photo-1527799820374-dcf8d9d4a388` | `unverified-placeholder` | Hair and scalp service |
| `photo-1503951914875-452162b0f3f1` | `unverified-placeholder` | Grooming service and lookbook |
| `photo-1519741497674-611481863552` | `unverified-placeholder` | Bridal and occasion service |
| `photo-1487412947147-5cebf100ffc2` | `unverified-placeholder` | Consultation service and beauty lookbook |
| `photo-1562322140-8baeececf3df` | `unverified-placeholder` | Lookbook haircut and journal preview |
| `photo-1524504388940-b1c1722653e1` | `unverified-placeholder` | Lookbook colour and journal preview |
| `photo-1488426862026-3ee34a7d66df` | `unverified-placeholder` | Lookbook bridal and occasion |
| `photo-1633681926022-84c23e8cb2d6` | `unverified-placeholder` | Lookbook texture and journal preview |
| `photo-1526047932273-341f2a7631f9` | `unverified-placeholder` | Lookbook editorial styling |
| `photo-1494790108377-be9c29b29330` | `unverified-placeholder` | Illustrative artist portrait; not a LAUXIRIO stylist |
| `photo-1500648767791-00dcc994a43e` | `unverified-placeholder` | Illustrative artist portrait; not a LAUXIRIO stylist |
| `photo-1534528741775-53994a69daeb` | `unverified-placeholder` | Illustrative artist portrait; not a LAUXIRIO stylist |

These are direct CDN references. The creator, original asset page, asset-specific license/release details and acquisition date are not recorded; the CDN URL and a general platform license are not a substitute for that evidence.

## Candidate source terms research

Official pages checked 2026-11-25. This is a sourcing checklist, not legal advice or an approval of any asset:

| Source | Official information reviewed | What still requires asset-level review |
|---|---|---|
| [Adobe Stock licensing](https://stock.adobe.com/license-terms) | Multiple license types and restrictions apply; editorial-only content is not a general commercial campaign asset. | Chosen license tier, creator, releases, permitted website use and applicable restrictions. |
| [Artgrid licensing](https://artgrid.io/license) | The official page returned a JavaScript loading shell in this research environment; its terms could not be verified. | Read current terms and confirm subscription, project and commercial use directly before selecting anything. |
| [Motion Array licensing](https://motionarray.com/license/) | Its official overview describes member-project coverage and flags editorial-use-only material as restricted for commercial use. | Asset restrictions, active-subscription/project conditions, releases and retained proof of license. |
| [Envato Elements license](https://help.elements.envato.com/hc/en-us/articles/360000628966-Envato-Elements-License) | Items are licensed for a specified project/end product; the license record must be registered for each use. | Project registration, subscription/terms at acquisition, creator, releases and permitted commercial use. |
| [Unsplash License](https://unsplash.com/license) | The platform publishes a general license; use of a CDN image does not identify its original page or resolve model, property, trademark or endorsement concerns. | Original photo page, contributor, current terms, commercial context and any necessary releases. |
| [Pexels License](https://www.pexels.com/license/) | Its official page allows free commercial use without required attribution, with restrictions including no implied endorsement and limits involving identifiable people/brands. | Original asset page, creator, consent/releases, trademarks, context and accurate attribution records for internal audit. |

No asset from these sources was selected or downloaded. Free availability is not the same as clearance for a particular campaign or model/property release.

## Registering approved files

For each approved item:

1. Retain the original asset page, creator name, license terms/receipt, acquisition date, model/property release evidence where relevant, and owner approval.
2. Record `src`, accurate alt text, intrinsic width/height, `creator`, `sourceUrl`, `licenseUrl`, `acquisitionDate`, all `intendedPlacement` values and an explicit approved status in `src/config/media.ts`.
3. Use `approved-owned` only for LAUXIRIO-owned work with ownership/consent documented; use `approved-licensed` only after the actual asset's applicable license and releases are verified.
4. Put optimized approved images under `public/media/{hero,studio,services,artists,gallery}/`; put approved MP4/WebM files under `public/media/video/`.
5. Run `npm run audit:media`; investigate every error and review the local image on desktop and mobile before removing its placeholder disclosure.

Do not scrape competitor sites, reuse competitor campaigns, use watermarked previews, bypass paywalls, imply that stock models are employees/customers, or buy assets/start paid subscriptions without owner approval.

## Hero video slot

No campaign video is present or configured. Keep `NEXT_PUBLIC_LAUXIRIO_HERO_VIDEO_SRC` unset until an actual licensed/owned file exists under `public/media/video/` and its provenance is registered. See [`docs/HERO_MEDIA.md`](./docs/HERO_MEDIA.md).
