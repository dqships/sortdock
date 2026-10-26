# Dock And Window Lifecycle

## What It Does

SortDock keeps running from the menu bar after the main window closes. When the user closes the main window, the app hides its Dock icon. Opening SortDock from the menu bar brings back the Dock icon and shows the same main window instead of creating another one.

## Behavior

- Closing the main window does not quit SortDock.
- Folder watching continues while the main window is closed.
- The Dock icon is hidden while the app is running only from the menu bar.
- `Open SortDock` restores the Dock icon, opens the main window if needed, and brings it forward.
- The main app scene uses a single `Window`, so repeated menu bar clicks focus the existing window instead of creating duplicates.

## Implementation

- `SortDockApp` uses `Window("SortDock", id: "main")` for a single main window.
- `SortDockAppDelegate` owns the shared `SortDockStore`, starts watching only after setup, and observes the one main-window close event.
- `AppPresentationCoordinator` is the single source of truth for `.onboarding`, `.menuBarOnly`, `.fullApp`, and temporary system-panel presentation states.
- `MenuBarPopoverView` restores the Dock icon before calling `openWindow(id: "main")`.

## Source References

- `project-brief.md`: SortDock includes a menu bar control surface.
- `design-app.md`: the menu bar popover should stay small and control status.
- `coding-guidelines.md`: lifecycle behavior is kept in a focused service file.
