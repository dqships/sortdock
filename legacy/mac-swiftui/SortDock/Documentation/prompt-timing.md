# Prompt Timing

## What It Does

SortDock waits for the selected delay before it prompts or moves a new file. If the watched folder keeps changing during a download, SortDock resets the pending scan and waits again so the user sees one prompt after the file is ready.

Ask Later uses its own snooze timer. When that timer ends, SortDock brings its prompt forward again so the user can choose what to do.

## Behavior

- New files are scanned only after the configured `Wait` duration.
- Repeated folder events cancel the old pending scan without processing immediately.
- Ask First prompts enter a first-in-first-out queue in the menu-bar surface; moving, leaving, and asking later do not open the Dock app.
- If the main window is closed, pending prompts remain available because the watcher is owned by the app lifecycle, not the window.
- A missing source file is recorded accurately instead of being moved later.

## Implementation

- `SortDockStore.scheduleScan()` returns immediately when a pending scan task is canceled.
- `SortDockStore.scheduleSnoozeTask()` keeps Ask Later work alive while the app continues running.
- `PendingMovePromptQueue` has one active prompt and resolves each queued item exactly once.
- `SortDockStore` records a waiting activity before enqueueing a prompt and requeues Ask Later work through its existing snooze task.
- `SortDockAppDelegate` starts `SortDockStore` only after onboarding, so watching continues after the main window closes without starting before folder permission.

## Source References

- `project-brief.md`: the app waits for the configured delay before prompting or moving files.
- `design-app.md`: the menu bar popover should stay small and control status.
- `coding-guidelines.md`: timing and lifecycle changes are documented with the relevant implementation files.
