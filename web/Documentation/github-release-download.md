# GitHub Release Download State

Last updated: 2026-09-05

## Purpose

SortDock is live on the Mac App Store. The marketing page uses
`src/lib/release/appStoreRelease.ts` as its download source, linking to
https://apps.apple.com/us/app/my-file-manager-sortdock/id6804060639.

## Current behavior

- Navigation says `App Store`; hero and final actions say `Download on the App Store`.
- All three actions open the same public listing.
- The footer says `Available on the Mac App Store`.
- The home page does not call GitHub, so missing installers or GitHub outages
  cannot return the live site to `Coming soon`.
- To change the listing, update the single URL in `appStoreRelease.ts` and deploy.

## Optional GitHub installer flow

The existing `getReleaseState` helper and its tests are retained for future
direct distribution. It checks the latest published GitHub release for a secure
`.dmg`, `.pkg`, or `.zip` asset, caches responses for 15 minutes, and returns
`coming-soon` if no installer is available or the request fails. Drafts and
prereleases are excluded. This helper is no longer used by the home page.

## Configuration

The default repository is `dqships/sortdock`. It can be changed with:

```text
SORTDOCK_GITHUB_REPOSITORY=owner/repository
```

Public GitHub API access requires no secret. If rate limits become a problem,
set `GITHUB_RELEASE_TOKEN` to a fine-grained, read-only token in Vercel. The token
is server-only and must never use a `NEXT_PUBLIC_` prefix.

## Relevant Code

```text
web/src/lib/release/appStoreRelease.ts
web/src/lib/release/ReleaseState.ts
web/src/lib/release/MacReleaseAsset.ts
web/src/lib/release/isRecord.ts
web/src/lib/release/selectMacReleaseAsset.ts
web/src/lib/release/readReleaseVersion.ts
web/src/lib/release/getGitHubReleaseApiUrl.ts
web/src/lib/release/getReleaseState.ts
web/src/app/_components/marketing/ReleaseAction.tsx
web/src/app/page.tsx
```

## Release Steps

1. Build, sign, and notarize the Mac app.
2. Create a non-draft GitHub release in `dqships/sortdock`.
3. Attach the distributable `.dmg`, `.pkg`, or `.zip` file to that release.
4. Publish the release.
5. If direct downloads are desired, explicitly wire the home page back to
   `getReleaseState` and deploy. Publishing a GitHub release alone no longer
   changes the App Store actions.

GitHub's automatically generated source archives do not appear in the release
asset list and therefore cannot accidentally activate the download action.

## Verification

Vitest checks the App Store URL and labels in all three action placements,
alongside the retained GitHub helper cases for missing releases, unsupported
assets, malformed data, unsafe URLs, and network failure.
