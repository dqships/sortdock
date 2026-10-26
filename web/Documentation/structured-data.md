# Structured Data

Last updated: 2026-10-26

## Purpose

Every page carries one Schema.org JSON-LD block so search engines and AI
assistants can tell that SortDock is a Mac and Windows utility, not just a page
about one.

## What Ships

- `WebSite`: the site name, canonical URL, and the default meta description.
- `SoftwareApplication`: SortDock as a `UtilitiesApplication` for macOS and
  Windows, with the download section and the Mac App Store listing.
- `Organization`: FollowUs AI, the publisher, with its logo, support email,
  Michigan address, and GitHub and X profiles. Its `@id` matches the one on
  followusai.com so search engines treat them as the same company.

## Where It Lives

- `src/lib/site/siteJsonLd.ts` builds the graph from `siteUrl`,
  `siteMetadata`, and `appStoreUrl`, so it follows the canonical domain.
- `src/app/_components/SiteJsonLd.tsx` renders it once from the root layout.

Keep the description in `siteMetadata.ts`; the JSON-LD reads it from there.
