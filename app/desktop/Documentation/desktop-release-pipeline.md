# Desktop Release Pipeline

Last updated: 2026-10-25

## What It Does

Pushing a version tag builds SortDock for Mac and Windows on GitHub's own Mac
and Windows machines and publishes both installers to one GitHub release. The
website then offers them within 15 minutes.

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
   - creates the `v<version>` GitHub release, or adds to it if it exists.
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
2. The account holder creates a **Developer ID Application** certificate in
   Certificates, Identifiers & Profiles (or Xcode > Settings > Accounts >
   Manage Certificates). This is a different certificate from the
   "Apple Distribution" one used for App Store uploads.
3. Export it from Keychain Access as a `.p12` with a password, then base64 it:
   `base64 -i DeveloperID.p12 | pbcopy`.
4. Create an app-specific password for the Apple ID at account.apple.com.
5. Add these repository secrets:

| Secret | Value |
| --- | --- |
| `MAC_CERTIFICATE_P12_BASE64` | The base64 text of the `.p12` |
| `MAC_CERTIFICATE_PASSWORD` | The `.p12` password |
| `APPLE_ID` | The Apple ID email |
| `APPLE_APP_SPECIFIC_PASSWORD` | The app-specific password |
| `APPLE_TEAM_ID` | The 10-character team ID from the membership page |

With these set, `electron-builder` signs the app with the hardened runtime and
sends it to Apple for notarization. Notarization is included in the membership.

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
app/desktop/package.json
web/src/lib/release/installerPatterns.ts
```

The website recognizes `.dmg`/`.pkg` as Mac installers and `.exe`/`.msi` as
Windows installers, so keep the artifact names in `electron-builder.yml` ending
that way.
