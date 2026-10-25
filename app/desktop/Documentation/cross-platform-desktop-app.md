# Cross-Platform Desktop App

Last updated: 2026-10-25

## What It Does

SortDock can be downloaded straight from the website for Mac or Windows. The
downloaded app does everything the Mac App Store version does:

- Watch one folder, such as Downloads.
- Route new files by keyword rules first, then file-type rules, then an
  optional "Other files" folder.
- Ask first or move automatically, after a delay the person chooses.
- Ask Later with a snooze time, Leave, Move, or Choose Folder for each file.
- Keep running in the Mac menu bar or the Windows system tray after the window
  closes, with Pause, History, Run Setup Again, and Quit there.
- Show the next waiting file in the tray menu and as a system notification.
- Light, Dark, and System appearance; run at login.
- A short history with Move, Leave, Choose, and Go to File actions.
- Never replace an existing file. Name clashes become `example (1).pdf`.

## Plan

| Step | Decision |
| --- | --- |
| Runtime | Electron. One codebase for Mac and Windows, and it uses the same TypeScript, React, and Vite tools as the website. |
| Where code runs | All file work happens in Electron's background ("main") process so sorting continues with the window closed. The window only displays state and sends requests. |
| Port strategy | `SortDockStore.swift` was ported line by line into `src/main/state/SortDockStore.ts`, keeping the same messages, statuses, and rules. |
| Folder access | The downloaded app is not sandboxed, so it stores plain folder paths instead of security-scoped bookmarks. Mac still asks once for Downloads access using the `NS*FolderUsageDescription` text in `electron-builder.yml`. |
| Prompts | Prompts appear in the window, in the tray menu, and as a notification. They are the same queue the Swift app shows in its menu bar popover. |
| Packaging | `electron-builder` makes a universal `.dmg` for Mac and an `.exe` installer for Windows. |
| Distribution | GitHub Releases host the installers. The website's `/download/mac` and `/download/windows` links always point at the newest ones. |
| Updates | The app checks the latest GitHub release at launch and at most hourly after that. When a newer installer exists for this computer it shows an update notice that opens the website download link. |
| App Store app | The SwiftUI app is retired to `legacy/mac-swiftui` as a read-only archive. The desktop app uses a different app ID, so it can sit beside an App Store copy someone already installed. |

## How It Works

1. `src/main/index.ts` starts one copy of the app, builds `SortDockStore`, the
   tray, and the window controller, and wires store changes to both.
2. `SortDockStore` loads saved settings through `SettingsPersistence`
   (a JSON file in the app's user-data folder) and starts `FolderWatcher` once
   setup is finished.
3. A change in the watched folder schedules a scan after the chosen delay.
   Scans run one at a time. Files that already existed when watching started are
   ignored, as are hidden files, unfinished downloads (`.crdownload`, `.part`,
   `.partial`, `.download`, `.tmp`, and others), and Windows system files.
4. Each new file is routed with `resolveDestinationId` (keywords, then file
   types, then the default folder). Auto Move moves it right away; Ask First
   records a waiting history item and queues a prompt.
5. `moveFileSafely` first reserves the target name with an exclusive create and
   then moves the file onto that empty placeholder, so an existing file can
   never be replaced. Moves across drives copy and then delete the original.
6. Every change persists the configuration and pushes a fresh
   `SortDockSnapshot` to the window and the tray menu.
7. The window calls store actions through `window.sortdock.actions`, exposed by
   the preload script. The background process only runs names in
   `sortDockActionNames` and re-checks every value it receives.

### Launch behavior

- First launch, or while setup is unfinished: the window opens.
- Mac after setup: starts quietly in the menu bar, matching the App Store
  version. Clicking the Dock icon or launching it again opens the window.
- Windows after setup: the window opens, except when started at sign-in
  (`--hidden`), when it stays in the tray.
- Closing the window keeps SortDock running. Quit from the tray menu.

## Security

- The window runs with `contextIsolation`, `sandbox`, no Node access, a strict
  Content Security Policy, and no navigation or pop-ups.
- Only SortDock's own window may call the background process.
- Saved settings are decoded defensively, so a damaged file falls back to
  defaults instead of crashing.

## Use Cases

- A Windows user sends invoices to a Finance folder and installers to Apps.
- A Mac user moving from the App Store version sets up the same rules.
- Someone pauses sorting from the tray while downloading many files.

## Tests

`npm run check` typechecks and runs Vitest. The store tests drive real folder
watching in temporary folders: automatic moves, numbered names instead of
overwrites, Ask First with Move, Leave, Ask Later, and Choose Folder, keyword
priority, ignored unfinished downloads, pausing, and input validation.

## File Tree

```text
app/desktop/
  electron-builder.yml          installer settings for Mac and Windows
  electron.vite.config.ts       builds main, preload, and window code
  resources/                    tray icons (Mac template, Windows .ico)
  src/shared/                   code used by both processes
    models/                     data types (settings, rules, history, snapshot)
    options/                    delay, snooze, behavior, theme choices
    labels/                     short user-facing text helpers
    rules/                      keyword and file-type routing, input cleanup
    ipc/                        the action list and bridge types
  src/main/                     background process
    index.ts                    app start, lifecycle, wiring
    state/                      SortDockStore and the prompt queue
    services/                   watching, safe moves, persistence, updates
    decoding/                   defensive reading of saved settings
    tray/                       menu bar and system tray menu
    windows/                    the single main window
    ipc/                        request handling from the window
  src/preload/index.ts          exposes window.sortdock to the window
  src/renderer/                 the window (React)
    src/state/                  snapshot subscription and actions
    src/styles/                 Blue Dock Utility tokens and layout
    src/views/                  Main, Sheets, Onboarding, Components, Icons
```

## Source References

- `project-brief.md`, `design-app.md`, `coding-guidelines.md`
- `legacy/mac-swiftui/SortDock/SortDock/State/SortDockStore.swift` (behavior source)
- `legacy/mac-swiftui/SortDock/Documentation/*` (feature behavior the port matches)
- `web/Documentation/github-release-download.md` (website download links)
- `app/desktop/Documentation/desktop-release-pipeline.md`
