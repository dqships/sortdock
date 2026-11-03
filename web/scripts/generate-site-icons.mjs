// Generates the website's PNG icons in public/icons from the brand art in public/brand.
// Run from web/: `node scripts/generate-site-icons.mjs`, then commit public/icons.
// Uses sharp, which Next.js installs for image optimization. public/favicon.ico (16, 32
// and 48 px) is kept as it is: it is the icon search engines already show.
import { mkdir } from "node:fs/promises";

import sharp from "sharp";

const outputs = [
  // Light icon: browser tabs, search results, home screens.
  { source: "icon.png", name: "sortdock", sizes: [48, 96, 180, 192, 512] },
  // Dark icon: tabs and home screens in dark mode.
  { source: "icon-dark.png", name: "sortdock-dark", sizes: [96, 180, 192] },
  // Glass icon: the manifest's maskable icon.
  { source: "icon-glass.png", name: "sortdock-glass", sizes: [192, 512] },
];

await mkdir("public/icons", { recursive: true });

for (const { source, name, sizes } of outputs) {
  for (const size of sizes) {
    const file = `public/icons/${name}-${size}.png`;
    await sharp(`public/brand/${source}`)
      .resize(size, size, { fit: "cover", kernel: "lanczos3" })
      .png({ compressionLevel: 9 })
      .toFile(file);
    console.log(`Wrote ${file}`);
  }
}
