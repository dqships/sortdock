# SortDock for Mac and Windows

The `app/desktop` folder holds the SortDock app people download from the
website. It runs on Mac and Windows from one TypeScript codebase built with
Electron and React.

The native SwiftUI app in `app/mac/SortDock` is still the Mac App Store
version. Both apps share the same product rules: see
[Documentation/cross-platform-desktop-app.md](Documentation/cross-platform-desktop-app.md).

## Run it

```sh
cd app/desktop
npm ci
npm run dev
```

## Check it

```sh
npm run check   # typecheck and tests
npm run build   # compile the app into out/
```

## Make installers

```sh
npm run dist:mac   # on a Mac: dist/SortDock-<version>-mac.dmg
npm run dist:win   # on Windows: dist/SortDock-<version>-windows-setup.exe
```

Releases are built and published by GitHub Actions when a `v*` tag is pushed.
See [Documentation/desktop-release-pipeline.md](Documentation/desktop-release-pipeline.md).
