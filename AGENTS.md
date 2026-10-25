# Agent Instructions

## Project
- SortDock is a small Mac and Windows utility that watches a folder and routes new files into user-managed destination folders.
- `app/desktop` is the Electron + React + TypeScript app downloaded from the website for Mac and Windows.
- `app/mac/SortDock` is the SwiftUI app for the Mac App Store. Keep behavior in both apps aligned.
- Product rule: KISS. Keep the app compact, native-feeling, and understandable within seconds.
- Source references: `project-brief.md`, `coding-guidelines.md`, `design-app.md`, and `Download Sort Prompt Documentation.md`.

## Build
- Desktop app (`app/desktop`): run `npm run check` and `npm run build` after changes.
- Mac App Store app: use the Xcode project at `app/mac/SortDock/SortDock.xcodeproj`.
- Build after Swift or asset changes:
```sh
xcodebuild -project app/mac/SortDock/SortDock.xcodeproj -scheme SortDock -configuration Debug -destination 'platform=macOS' build
```
- Website (`web`): run `npm run check` and `npm run build` after changes.

## Structure
- Desktop app source lives in `app/desktop/src`: `shared/` (models, options, labels, rules, ipc), `main/` (background process: state, services, decoding, tray, windows, ipc), `preload/`, and `renderer/` (React window: state, styles, views).
- Mac App Store app source lives in `app/mac/SortDock/SortDock`.
- Keep files in the nearest focused folder: `Models/`, `Services/`, `State/`, `Views/Components/`, `Views/Main/`, `Views/MenuBar/`, or `Views/Sheets/`.
- Do not add implementation files at the repository root.
- The Xcode project uses a file-system synchronized source group; prefer adding Swift files under the source tree without unnecessary `.pbxproj` churn.
- Keep generated Xcode user state, build products, and local caches out of commits.

## Architecture
- Follow strict Atomic Code Splitting: one file, one clear purpose.
- One SwiftUI component per file; one model, service, helper, or focused type per file unless a type is exclusively coupled to that file's single export.
- Reuse focused abstractions instead of creating duplicate variants for each screen or use case.
- `SortDockStore` (Swift and the TypeScript port in `app/desktop/src/main/state`) owns app state, settings, watching, prompts, activity, and move flow; extract behavior into focused services when it grows.
- In the desktop app, all file work stays in the main process; the window only renders snapshots and calls allowlisted actions.
- Preserve sandbox-aware folder access through security-scoped bookmarks in the Mac App Store app.
- Never overwrite user files; route moves through conflict-safe naming.

## UI And Copy
- Follow `design-app.md`: Blue Dock Utility, compact two-column utility layout, routing rail as the signature visual.
- Prefer native macOS controls and normal macOS appearance behavior for Light, Dark, and System modes.
- User-facing copy must be plain, human, short, and non-technical.
- Green is only for the tiny active status signal; blue is the routing and primary action color.

## Documentation
- Add a focused `.md` file for every new feature or capability.
- Update existing feature docs when behavior changes; keep docs aligned with code.

## Commit Attribution
AI commits MUST include:
```text
Co-Authored-By: (the agent model's name and attribution byline)
```
