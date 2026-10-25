# Agent Instructions

## Project
- SortDock is a small Mac and Windows utility that watches a folder and routes new files into user-managed destination folders.
- `app/desktop` is the Electron + React + TypeScript app downloaded from the website for Mac and Windows.
- `legacy/mac-swiftui` is the retired SwiftUI Mac App Store app. It is a read-only archive and behavior reference; do not add features there.
- Product rule: KISS. Keep the app compact, native-feeling, and understandable within seconds.
- Source references: `project-brief.md`, `coding-guidelines.md`, `design-app.md`, and `Download Sort Prompt Documentation.md`.

## Build
- Desktop app (`app/desktop`): run `npm run check` and `npm run build` after changes.
- Website (`web`): run `npm run check` and `npm run build` after changes.

## Structure
- Desktop app source lives in `app/desktop/src`: `shared/` (models, options, labels, rules, ipc), `main/` (background process: state, services, decoding, tray, windows, ipc), `preload/`, and `renderer/` (React window: state, styles, views).
- Keep files in the nearest focused folder that already exists.
- Do not add implementation files at the repository root.
- Keep build output (`out/`, `dist/`), `node_modules/`, and local caches out of commits.

## Architecture
- Follow strict Atomic Code Splitting: one file, one clear purpose.
- One React component per file; one model, service, helper, or focused type per file unless a type is exclusively coupled to that file's single export.
- Reuse focused abstractions instead of creating duplicate variants for each screen or use case.
- `SortDockStore` in `app/desktop/src/main/state` owns app state, settings, watching, prompts, activity, and move flow; extract behavior into focused services when it grows.
- All file work stays in the main process; the window only renders snapshots and calls allowlisted actions.
- Never overwrite user files; route moves through conflict-safe naming.

## UI And Copy
- Follow `design-app.md`: Blue Dock Utility, compact two-column utility layout, routing rail as the signature visual.
- Prefer native controls and follow the system appearance on Mac and Windows for Light, Dark, and System modes.
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
