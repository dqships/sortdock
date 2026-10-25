# Stylized App Store screenshots

SortDock's Mac App Store images use actual running app captures inside benefit-led marketing compositions. The visual direction follows the account's existing WebToMarkdown Mac listing: large readable copy, restrained dark and light surfaces, and the real product as the primary artifact.

The reusable editor lives at `AppStore/screenshot-editor`. It is the app-store-screenshots skill's editor adapted specifically for SortDock and the Mac App Store. It has one Mac canvas, one 2880 x 1800 export size, and no iPhone, iPad, Android, orientation, or device controls.

From the editor directory, run `bun install` once and `bun run dev` when editing. Open `http://localhost:3000`, adjust the five seeded screens, and use **Export PNG bundle**. Keep the actual app capture in `public/screenshots/apple/mac/en`. The checked-in capture replaces personal paths and activity text with generic development fixture text.

The current sequence covers the routing overview, route visibility, Ask First, optional automatic moving, and pausing. Submission-ready images are opaque 2880 x 1800 JPEGs under `AppStore/screenshots/final/2880x1800`.

Before upload, run `AppStore/scripts/validate-screenshots.sh` and visually inspect every image. The editor production build is checked with `bun run build`.
