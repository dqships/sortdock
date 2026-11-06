# Tasks

## Done

- 2026-11-06: IndexNow for sortdock.followusai.com. The key file is `web/public/25379f8454d34c76a3edefe665e37a9b.txt`, and `.github/workflows/indexnow.yml` runs `web/scripts/indexnow.mjs` after every successful Vercel production deploy, sending every page in the live sitemap to Bing and the other IndexNow engines. Previews and local builds never send. Check Bing Webmaster Tools → IndexNow a day after the first production deploy.
- 2026-11-03: Website icons. Added the missing `web/public/icons` PNGs (48, 96, 180, 192 and 512 px, plus dark and glass versions) generated from the brand art by `web/scripts/generate-site-icons.mjs`. The page head now links `/favicon.ico` (48x48), the 96 and 192 px PNGs and the apple touch icon; the manifest's 192 and 512 px icons now exist. See `web/Documentation/site-icons.md`.
