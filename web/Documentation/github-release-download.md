# Mac And Windows Downloads

Last updated: 2026-10-25

## Purpose

People can download SortDock for Mac or Windows straight from the website. The
installers are built from `app/desktop` and hosted on GitHub Releases; the
website finds the newest ones and gives them stable links.

## Current Behavior

- The hero and final sections show two download buttons. The visitor's own
  computer (detected in the browser) comes first and gets the primary style.
  Mac comes first while the computer is unknown, such as on the server or a
  phone.
- `Download for Mac` and `Download for Windows` link to `/download/mac` and
  `/download/windows`. Those routes redirect to the matching installer on the
  latest published GitHub release.
- Until a release has a Mac installer, the Mac button says
  `Download on the App Store` and opens the Mac App Store listing, and
  `/download/mac` redirects there too.
- Until a release has a Windows installer, the page shows
  `Windows coming soon` and `/download/windows` redirects to `/#download`.
- The nav `Download` link jumps to the download section.
- The footer shows the release and its computers, such as
  `v1.0.0 for Mac and Windows`, or `Available on the Mac App Store` before the
  first direct release.
- Unknown platforms such as `/download/linux` return 404.

## How It Works

- `fetchLatestRelease` reads `releases/latest` from the GitHub API with a
  15-minute cache. Drafts and prereleases are never returned by that endpoint.
  Errors and missing releases return `null` instead of throwing.
- `selectReleaseAsset` picks the first `https` asset whose name ends in
  `.dmg`/`.pkg` (Mac) or `.exe`/`.msi` (Windows). Checksums, blockmaps, and
  GitHub's source archives are never selected.
- `buildDesktopDownloads` turns the release into one `DownloadOption` per
  computer for the page. The home page revalidates every 15 minutes, and the
  `Desktop release` workflow can trigger a Vercel deploy hook to rebuild it
  right after a release (see `app/desktop/Documentation/desktop-release-pipeline.md`).
- `resolveDownloadTarget` gives the redirect target for the download route.
- `DownloadActions` is the only client component. It reads the browser's
  platform after hydration to reorder the buttons, so the server-rendered page
  still works without JavaScript.

## Configuration

The default repository is `dqships/sortdock`. It can be changed with:

```text
SORTDOCK_GITHUB_REPOSITORY=owner/repository
```

Public GitHub API access requires no secret. If rate limits become a problem,
set `GITHUB_RELEASE_TOKEN` to a fine-grained, read-only token in Vercel. The
token is server-only and must never use a `NEXT_PUBLIC_` prefix.

## Release Steps

Publishing is automated. Bump `app/desktop/package.json`, push a matching
`v<version>` tag, and the `Desktop release` workflow builds and publishes both
installers. See `app/desktop/Documentation/desktop-release-pipeline.md`.

## Relevant Code

```text
web/src/app/download/[platform]/route.ts
web/src/app/page.tsx
web/src/app/_components/marketing/DownloadActions.tsx
web/src/app/_components/marketing/DownloadButton.tsx
web/src/app/_components/marketing/MarketingFooter.tsx
web/src/lib/platform/detectDesktopPlatform.ts
web/src/lib/platform/orderPlatforms.ts
web/src/lib/platform/useVisitorPlatform.ts
web/src/lib/release/appStoreUrl.ts
web/src/lib/release/buildDesktopDownloads.ts
web/src/lib/release/DesktopDownloads.ts
web/src/lib/release/DesktopPlatform.ts
web/src/lib/release/desktopPlatforms.ts
web/src/lib/release/downloadAvailabilityLabel.ts
web/src/lib/release/downloadPath.ts
web/src/lib/release/DownloadOption.ts
web/src/lib/release/fetchLatestRelease.ts
web/src/lib/release/getDesktopDownloads.ts
web/src/lib/release/getGitHubReleaseApiUrl.ts
web/src/lib/release/installerPatterns.ts
web/src/lib/release/isDesktopPlatform.ts
web/src/lib/release/isRecord.ts
web/src/lib/release/platformNames.ts
web/src/lib/release/readReleaseVersion.ts
web/src/lib/release/ReleaseAsset.ts
web/src/lib/release/resolveDownloadTarget.ts
web/src/lib/release/selectReleaseAsset.ts
```

## Verification

Vitest covers asset selection for each computer, unsafe URLs and malformed
data, GitHub errors and outages, the App Store and coming-soon fallbacks, the
footer label, browser platform detection, button order and styling, and the
download route's redirects and 404.
