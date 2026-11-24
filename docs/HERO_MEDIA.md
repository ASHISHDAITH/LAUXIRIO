# LAUXIRIO hero media guide

## Current behavior

The homepage hero always renders its still-image poster. A video is optional and is enabled only when `NEXT_PUBLIC_LAUXIRIO_HERO_VIDEO_SRC` is configured. The video is muted, loops inline and fades in only after playback starts. If playback fails, the still image remains. It does not attempt autoplay when the visitor requests reduced motion or the browser reports data saver / 2G.

## Enable a licensed campaign video

1. Obtain a Lauxirio-owned film or purchase a stock asset whose current license covers commercial use on the salon website.
2. Download the actual licensed file, not a preview or watermarked version.
3. Export a short, seamless, silent loop. Prefer MP4 (H.264) for broad compatibility; WebM may be used when tested on target browsers.
4. Put the file in `public/media/video/`, for example `public/media/video/lauxirio-hero.mp4`.
5. Copy the commented example variable from `.env.example` into `.env.local` or the hosting provider's environment configuration:
   `NEXT_PUBLIC_LAUXIRIO_HERO_VIDEO_SRC=/media/video/lauxirio-hero.mp4`
6. Rebuild/redeploy the site. Check desktop, mobile, slow connections, browser autoplay restrictions and reduced-motion settings.
7. Add the source, creator, license/receipt reference, download date and intended use to `ASSET_REGISTER.md`.

## Creative and export guidance

- Subject: real hair movement, skilled hands at work, considered salon interiors and detail shots.
- Art direction: low-key cinematic lighting, natural skin and hair texture, controlled highlights, warm neutral grade and deliberate negative space for headline legibility.
- Framing: 16:9 landscape, subject composition that survives center-cropping on phones.
- Duration: approximately 8–15 seconds with a clean loop.
- Audio: remove audio; the video is muted by design.
- Encoding: H.264 MP4 or tested WebM; target a small file (ideally below 5 MB when visual quality allows) and avoid needlessly high bitrates.
- Poster: retain a sharp, optimized still image because it is always the first frame/fallback and is used when motion/data settings require it.

These are practical production targets, not a substitute for testing actual encoded media on target devices.

## Licensing safeguards

Do not scrape competitor websites, remove watermarks or use preview assets. Keep the license receipt and source page with the project records. Confirm that the selected license covers the intended commercial website use and any restrictions involving identifiable people, trademarks, music or redistribution.
