# Onboarding And Menu-Bar Prompts

## What It Does

First launch keeps SortDock visible while the user selects a watched folder, chooses or creates a destination in Finder, adds a keyword rule, chooses how moves are handled, and confirms the summary. Sorting and the login item do not begin before that finish action.

After setup, SortDock works as a menu-bar utility. Files that need a decision are shown one at a time in the compact menu-bar surface. The user can move, leave, ask later, or choose another folder without a blocking app dialog.

## Implementation

- `SortDockSettings` stores versioned, resumable onboarding state and decodes previous settings safely.
- `OnboardingView` reuses `SortDockStore` destination, bookmark, keyword-rule, and settings paths rather than a second persistence model. Its first-destination action opens the native Finder folder picker, which also lets the user create a new folder.
- `AppPresentationCoordinator` owns Dock activation policy transitions.
- `PendingMovePrompt` and `PendingMovePromptQueue` provide FIFO, exact-once prompt handling.
- `PendingMovePromptView` stays in the SwiftUI menu-bar surface and keeps personal paths out of the prompt copy.

## Safety

Folder access is obtained through the existing security-scoped bookmark services. Rule precedence and conflict-safe naming stay in the existing routing and move services. Rerunning setup resumes setup choices without deleting current destinations, rules, or history.

## Source References

- `project-brief.md`
- `design-app.md`
- `Download Sort Prompt Documentation.md`
