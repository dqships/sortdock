# SortDock

SortDock is a small Mac and Windows app that keeps a chosen folder tidy. Set up where file types should go, then let SortDock ask before moving them or handle the sorting automatically.

## Project layout

- `app/desktop`: the Mac and Windows app people download from the website
  (Electron, React, TypeScript).
- `app/mac/SortDock`: the native macOS app sold on the Mac App Store.
- `web`: the SortDock website, including the Mac and Windows download links.
- `app/desktop/Documentation`, `app/mac/SortDock/Documentation`, and
  `web/Documentation`: product and implementation notes.

## Getting started

Run the Mac and Windows app:

```sh
cd app/desktop
npm ci
npm run dev
```

See [app/desktop/README.md](app/desktop/README.md) for checks and installers.

Build the Mac App Store app with Xcode or run:

```sh
xcodebuild -project app/mac/SortDock/SortDock.xcodeproj -scheme SortDock -configuration Debug -destination 'platform=macOS' build
```

To work on the website, see [web/README.md](web/README.md).

## Contributing

Read [CONTRIBUTING.md](CONTRIBUTING.md) before opening an issue or pull request.

## License

The SortDock source code is available under the [MIT License](LICENSE). The
SortDock name, logos, icons, and other brand assets are not covered by that
license. See [BRAND_ASSETS.md](BRAND_ASSETS.md).
