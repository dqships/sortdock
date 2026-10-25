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

Signing is optional for the workflow to run, but strongly recommended before
sharing installers widely.

| Secret | Used for |
| --- | --- |
| `MAC_CERTIFICATE_P12_BASE64` | Developer ID Application certificate, base64-encoded `.p12` |
| `MAC_CERTIFICATE_PASSWORD` | Password for that `.p12` |
| `APPLE_ID` | Apple ID used to notarize |
| `APPLE_APP_SPECIFIC_PASSWORD` | App-specific password for that Apple ID |
| `APPLE_TEAM_ID` | Apple Developer team ID |
| `WINDOWS_CERTIFICATE_PFX_BASE64` | Windows code-signing certificate, base64-encoded `.pfx` |
| `WINDOWS_CERTIFICATE_PASSWORD` | Password for that `.pfx` |

Without the Mac secrets the app is not signed or notarized, and macOS will
refuse to open it normally after download. Without the Windows secrets,
Windows SmartScreen shows an "unrecognized app" warning before installing.

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
