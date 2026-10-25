# SortDock macOS App Implementation

SortDock now lives in the Xcode project at `legacy/mac-swiftui/SortDock`.

## What It Does

The app watches a user-selected folder, waits for new files to finish downloading, then routes each file by ordered keyword rules or file-type rules. It can ask before moving or move automatically.

## Main Code

- `SortDockApp.swift` starts the SwiftUI window and menu bar extra.
- `Services/SortDockAppDelegate.swift` owns the shared store and starts watching at app launch, so sorting continues after the main window closes.
- `State/SortDockStore.swift` owns settings, rules, activity, folder watching, prompts, and move flow.
- `Models/` contains focused Codable models for settings, destinations, rules, and activity.
- `Services/` contains folder access, file watching, moving, conflict handling, login item control, and persistence.
- `Views/` contains one focused SwiftUI component per file.

## Main Window Layout

The main window keeps the status strip and latest activity line fixed. The two-column control area scrolls vertically, so routing rules, behavior controls, and appearance controls remain reachable when the window is compact or when the user has many folders and rules.

## Folder Access

The app is sandboxed. When the user picks a watch folder or an external destination, SortDock stores a security-scoped app bookmark so that folder remains available across launches. Missing or inaccessible destinations are marked in the destination list and can be reconnected from their menu.

## File Moving

Named destinations are created inside the watched folder. Users can also pick existing folders anywhere macOS grants access. Existing files are never overwritten; SortDock chooses a safe name such as `example (1).pdf`.

Keyword rules are checked from top to bottom before file-type rules. Matching ignores capitalization and checks the filename without its extension. Full behavior and the relevant file map are documented in `keyword-routing-and-custom-destinations.md`.

## Build

Build from the repo root:

```sh
xcodebuild -project legacy/mac-swiftui/SortDock/SortDock.xcodeproj -scheme SortDock -configuration Debug -destination 'platform=macOS' build
```
