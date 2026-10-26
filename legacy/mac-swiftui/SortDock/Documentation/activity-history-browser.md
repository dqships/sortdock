# Activity History Browser

## What It Does

SortDock keeps the latest 20 file actions in a small history browser. The bottom activity strip now has a `History` button, and the menu bar popover has a matching `History` action that opens the main window and shows the sheet.

The sheet lets a user browse completed and waiting file actions without turning the app into a full activity dashboard.

## Behavior

- Moved files show their completed status and a `Go to File` action when the moved file still exists.
- Left files show their status and can be moved later if the file is still available.
- Failed files can be retried, sent to a chosen folder, or marked left.
- Ask Later items show the remaining snooze time and can be handled immediately with `Move`, `Choose...`, or `Leave`.
- Old plain-text history entries still load, but they do not show file actions because older records did not store file paths.
- `Clear History` removes the visible activity records only. It does not delete, move, or rename any files.

## Implementation

- `ActivityRecord` stores structured history details: status, file name, source path, current path, destination, and snooze deadline.
- `ActivityRecordStatus` defines the compact user-facing states.
- `SortDockStore` owns history actions, Finder reveal, retry moves, custom folder moves, leave updates, and Ask Later task rescheduling.
- `SortDockStore.clearHistory()` wipes the persisted activity list without touching file paths on disk.
- `HistorySheet` displays the two-column browser.
- `HistoryListRowView`, `HistoryDetailView`, `HistoryDetailRowView`, `HistoryActionBarView`, and `HistoryEmptyStateView` keep the sheet split into focused components.
- `ActivityStatusSymbolView` provides the shared status symbol used by history rows and details.

## Source References

- `project-brief.md`: activity history can stay simple and limited.
- `design-app.md`: main window should show only the latest action in the bottom strip, with an optional sheet for the last 20 actions.
- `coding-guidelines.md`: new capability has focused documentation and atomic SwiftUI components.
