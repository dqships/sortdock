# SortDock Marketing Page

Last updated: 2026-08-13

## Purpose

The web marketing page presents SortDock as a compact Mac and Windows utility for keeping Downloads clean. The page is static, fast to scan, and focused on one idea: new files can move to the right folders while the user stays in control.

## Source References

- `design-web.md`
- `project-brief.md`
- `coding-guidelines.md`
- `AGENTS.md`
- `app/mac/SortDock/Documentation/keyword-routing-and-custom-destinations.md`

## Implementation

The marketing page replaces the default Create T3 App home page at `web/src/app/page.tsx`. It stays in the Next.js App Router and uses server components by default. The page does not call tRPC because the current marketing experience has no dynamic data needs.

The layout metadata lives in `web/src/lib/site/siteMetadata.ts`. Display text uses a Mac-first editorial serif stack and body text uses the native system stack, keeping the site connected to macOS without a remote font request.

Brand icons are served from:

- `web/public/brand/icon.png`
- `web/public/brand/icon-dark.png`
- `web/public/brand/icon-glass.png`

Design tokens and base motion live in `web/src/styles/globals.css`. All page colors are expressed through CSS variables so light and dark appearances can share the same component markup.

## File Tree

```text
web/src/app/page.tsx
web/src/app/layout.tsx
web/src/app/opengraph-image.tsx
web/src/app/robots.ts
web/src/app/sitemap.ts
web/src/styles/globals.css
web/src/app/_components/marketing/MarketingPage.tsx
web/src/app/_components/marketing/MarketingNav.tsx
web/src/app/_components/marketing/HeroSection.tsx
web/src/app/_components/marketing/HeroProductImage.tsx
web/src/app/_components/marketing/DownloadRail.tsx
web/src/app/_components/marketing/KeywordRoutingExample.tsx
web/src/app/_components/marketing/LandingStripSection.tsx
web/src/app/_components/marketing/BehaviorComparison.tsx
web/src/app/_components/marketing/RulesSection.tsx
web/src/app/_components/marketing/PrivacyProofSection.tsx
web/src/app/_components/marketing/DesktopFitSection.tsx
web/src/app/_components/marketing/FinalCtaSection.tsx
web/src/app/_components/marketing/MarketingFooter.tsx
web/src/app/_components/marketing/ProductSlice.tsx
web/src/app/_components/marketing/ProofPointRow.tsx
web/src/app/_components/marketing/DownloadActions.tsx
web/src/app/_components/marketing/DownloadButton.tsx
```

## Behavior

- The hero leads with the SortDock name, direct value copy, and an image-led product environment.
- The hero and final section show Mac and Windows downloads, with the visitor's own computer first. The nav links to the download section. The footer says which computers can download SortDock. See `github-release-download.md`.
- The routing rail appears in the hero and landing strip. The rules section uses a compact ordered keyword example to show how a filename match takes priority over the file-type fallback.
- On narrow screens, routing examples stay in one compact three-lane row instead of turning into tall stacked cards.
- Product examples introduce their purpose before the visual on phones and tablets, then return to the visual-first card layout on wider screens.
- The hero uses separate phone, tablet, and desktop positioning so the copy and product window never collide or leave the viewport.
- Keyword matching, first-match priority, file-type fallback, custom destination folders, Ask First, Auto Move, delay, Ask Later, local preferences, no accounts, no cloud sync, and conflict-safe naming are all represented in plain copy.
- Search and share metadata describe both file-type and filename-based routing.
- Below-fold product slices use lightweight HTML and CSS mockups instead of a heavy animation or screenshot library.
- Motion is limited to the routing interaction and respects `prefers-reduced-motion`. Content is visible without waiting for an entrance animation.

## Maintenance Notes

Release behavior and publishing steps are documented in `github-release-download.md`.
Responsive layout behavior and its verification matrix are documented in `responsive-marketing-layout.md`.

Run from `web/` after page changes:

```sh
npm run typecheck
npm run test
npm run build
```
