# Site Icons

Last updated: 2026-11-03

## Purpose

Browsers, search engines and apps that show a site's icon (Google's favicon
service, bookmarks, home screens) all find SortDock's icon from the website.

## Files

| File | Use |
| --- | --- |
| `public/favicon.ico` | 16, 32 and 48 px icon at the site root. Linked with `sizes="48x48"`. |
| `public/icons/sortdock-48.png`, `-96.png`, `-192.png` | Square PNGs. The 96 and 192 px files are linked in the page head. |
| `public/icons/sortdock-180.png` | Apple touch icon. |
| `public/icons/sortdock-512.png` | Web app manifest icon, with the 192 px file. |
| `public/icons/sortdock-dark-96.png`, `-180.png`, `-192.png` | Dark mode versions, linked with `media="(prefers-color-scheme: dark)"`. |
| `public/icons/sortdock-glass-192.png`, `-512.png` | Maskable icons in the web app manifest. |

The links live in `src/lib/site/siteMetadata.ts` and `src/app/manifest.ts`.
`src/lib/site/siteIcons.test.ts` fails if a linked icon is missing from
`public/`.

## Regenerating

The PNGs are made from the brand art in `public/brand` (`icon.png`,
`icon-dark.png`, `icon-glass.png`). After changing that art, run from `web/`:

```sh
node scripts/generate-site-icons.mjs
```

Commit the files it writes to `public/icons`. `favicon.ico` is not regenerated;
replace it by hand only if the icon itself changes.

## Serving

Files with an extension skip `src/proxy.ts`, and `robots.txt` allows every
path, so the icons and the home page are open to browsers and crawlers.
