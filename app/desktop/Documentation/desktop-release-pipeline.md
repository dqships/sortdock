# Desktop Release Pipeline

Last updated: 2026-10-26

## What It Does

Pushing a version tag builds SortDock for Mac and Windows on GitHub's own Mac
and Windows machines and publishes both installers to one GitHub release. The
website then rebuilds right away when the Vercel deploy hook is set up, or
offers them within 15 minutes otherwise.

## Release Steps

1. Update `version` in `app/desktop/package.json` (for example `1.1.0`) and
   merge it.
2. Tag that commit with the same version and push the tag:

   ```sh
   git tag v1.1.0
   git push origin v1.1.0
   ```

3. The `Desktop release` workflow:
   - checks the tag matches `package.json`,
   - runs `npm run check` and `npm run build` on Mac and Windows,
   - packages `SortDock-<version>-mac.dmg` (Apple silicon and Intel) and
     `SortDock-<version>-windows-setup.exe`,
   - creates the `v<version>` GitHub release, or adds to it if it exists,
   - asks Vercel to rebuild the website (see "Website refresh" below).
4. Check the release page, then open `/download/mac` and `/download/windows` on
   the website.

The workflow can also be started by hand from the Actions tab to produce
installers as build artifacts without publishing a release.

## Signing

The workflow runs without signing secrets, but unsigned installers are not
ready for the public.

### Mac: required in practice

Apps downloaded outside the Mac App Store must be signed with a
**Developer ID Application** certificate and notarized by Apple. Without that,
macOS blocks the app on first open, usually saying it is "damaged" or cannot
be checked for malicious software. Most people will not get past that.

What is needed:

1. A paid Apple Developer Program membership (the one used for the App Store
   listing works).
2. The account holder creates a **Developer ID Application** certificate:
   Xcode > Settings > Accounts > select the team > Manage Certificates >
   + > Developer ID Application. This is a different certificate from the
   "Apple Distribution" one used for App Store uploads.
3. On that Mac, run the helper script from the repository root. Run it once
   to find the certificate and read the export steps, then again with the
   exported file:

   ```sh
   app/desktop/scripts/set-up-mac-signing.sh
   app/desktop/scripts/set-up-mac-signing.sh ~/Desktop/DeveloperID.p12
   ```

   The script reads the team ID from the certificate, asks for the `.p12`
   password, Apple ID, and an app-specific password (made at
   account.apple.com > Sign-In and Security > App-Specific Passwords), and
   stores them as repository secrets with the GitHub CLI (`brew install gh`,
   then `gh auth login`). Nothing secret is printed or saved.

The secrets it sets:

| Secret | Value |
| --- | --- |
| `MAC_CERTIFICATE_P12_BASE64` | The exported `.p12`, base64-encoded |
| `MAC_CERTIFICATE_PASSWORD` | The `.p12` password |
| `APPLE_ID` | The Apple ID email |
| `APPLE_APP_SPECIFIC_PASSWORD` | The app-specific password |
| `APPLE_TEAM_ID` | The 10-character team ID |

With these set, `electron-builder` signs the app with the hardened runtime,
notarizes it with Apple, and staples the result. The workflow then checks the
app with `codesign`, `spctl`, and `stapler` before uploading it. Notarization is
included in the membership. Already signed and notarized downloads keep
working if the membership later lapses; only new releases need it.

### What happens without the Mac secrets

The Mac build still runs, but it is uploaded only as an `unsigned-Mac` test
artifact on the workflow run and is **not** added to the GitHub release. The
website keeps sending Mac visitors to the App Store until a signed Mac
installer is published. Windows is published either way.

Each certificate is only passed to its own build, because electron-builder
falls back to `CSC_LINK` on Windows.

### Windows: recommended

Unsigned Windows installers still install. Windows SmartScreen shows "Windows
protected your PC" first, and people have to choose **More info** and then
**Run anyway**. Signing removes the "unknown publisher" label; the SmartScreen
warning fades as the signed app builds a download reputation.

Code-signing certificates issued today live on hardware or a cloud signing
service, so they usually cannot be exported as a `.pfx` file. The workflow's
`WINDOWS_CERTIFICATE_PFX_BASE64` and `WINDOWS_CERTIFICATE_PASSWORD` secrets
only help if you have an exportable certificate. For a new certificate, a cloud
signing service such as Azure Trusted Signing is the usual choice for GitHub
Actions and needs a small change to the `win` section of
`electron-builder.yml` and the workflow.

## Website Refresh

The home page caches GitHub's latest release for 15 minutes, so without help a
new release can take that long to show on the download buttons. The
`/download/mac` and `/download/windows` links are not affected.

To make the website rebuild as soon as the release is published:

1. In Vercel, open the `sortdock` project > Settings > Git > Deploy Hooks.
2. Create a hook named `Desktop release` for the `main` branch and copy its URL.
3. Store it as a repository secret:

   ```sh
   gh secret set VERCEL_DEPLOY_HOOK_URL --repo dqships/sortdock
   ```

   Paste the URL when asked. Treat it like a password: anyone with the URL can
   start a deployment.

The `Refresh the website` step posts to that URL after the release exists. When
the secret is missing, the step only prints a warning and the website catches
up on its own within 15 minutes.

## Local Builds

```sh
cd app/desktop
npm ci
npm run dist:mac   # on a Mac
npm run dist:win   # on Windows
npm run dist:dir   # unpacked app for the current computer, for quick testing
```

Installers are written to `app/desktop/dist/`, which is ignored by Git.

## CI Checks

`Desktop app checks` runs typecheck, tests, and build on every pull request
that touches `app/desktop`.

## Relevant Files

```text
.github/workflows/desktop-release.yml
.github/workflows/desktop-ci.yml
app/desktop/electron-builder.yml
app/desktop/scripts/set-up-mac-signing.sh
app/desktop/package.json
web/src/lib/release/installerPatterns.ts
```

The website recognizes `.dmg`/`.pkg` as Mac installers and `.exe`/`.msi` as
Windows installers, so keep the artifact names in `electron-builder.yml` ending
that way.
