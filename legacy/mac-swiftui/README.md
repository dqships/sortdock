# Legacy: SortDock for Mac (SwiftUI)

This folder is an archive. It holds the original native SwiftUI version of
SortDock that shipped on the Mac App Store
([listing](https://apps.apple.com/us/app/my-file-manager-sortdock/id6804060639)).

SortDock is now built from `app/desktop`, one app for Mac and Windows that
people download from the website. New features and fixes go there, not here.

## Why it is kept

- It is the behavior reference the desktop app was ported from
  (`SortDock/SortDock/State/SortDockStore.swift` maps to
  `app/desktop/src/main/state/SortDockStore.ts`).
- Its `Documentation/` folder explains each feature's original design.
- `AppStore/` holds the App Store metadata, screenshots, and submission notes in
  case the listing needs another update.

## Status

- Not built or tested by CI. It is not part of normal checks.
- Paths inside this folder were updated when it moved from `app/mac/SortDock`.
  If you ever need to build it, open
  `legacy/mac-swiftui/SortDock/SortDock.xcodeproj` in Xcode, or run:

```sh
xcodebuild -project legacy/mac-swiftui/SortDock/SortDock.xcodeproj -scheme SortDock -configuration Debug -destination 'platform=macOS' build
```

- The App Store listing still exists until it is removed in App Store Connect.
  The website links to it for Mac only until a Mac installer is published on
  GitHub Releases.
