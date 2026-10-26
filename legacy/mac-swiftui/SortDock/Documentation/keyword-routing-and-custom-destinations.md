# Keyword Routing and Custom Destinations

## What This Adds

SortDock can route a file by words in its filename and can send sorted files to any folder the user chooses. Existing file-type rules continue to work for users who do not add keyword rules.

## Rule Priority

Each new file is checked in this order:

1. Enabled keyword rules, from top to bottom.
2. Existing file-type rules.
3. The optional `Other files` destination.
4. Leave the file in place when none of those provides a destination.

The first matching keyword rule wins. SortDock does not continue to a later keyword or file-type rule after a keyword rule matches. This makes the order shown in the app the source of truth for overlapping rules.

Example: if `invoice` routes to `Invoices` and PDFs normally route to `PDFs`, `client invoice.pdf` goes to `Invoices`.

Disabled keyword rules are skipped. Moving a keyword rule earlier or later changes its precedence immediately.

## Keyword Matching

`KeywordNormalizer` accepts keywords separated by commas, semicolons, tabs, or new lines. It trims surrounding spaces, stores lowercase values, removes duplicates, and preserves spaces inside phrases such as `client receipt`.

`KeywordRuleMatcher` compares each keyword with the filename:

- Matching is case-insensitive.
- The extension is removed before matching.
- Matching checks whether the filename contains the full keyword or phrase.
- A rule matches when any one of its keywords matches.

For example, `Invoice`, `invoice`, and `INVOICE` all match `Client Invoice.PDF`. A keyword of `pdf` does not match a file only because its extension is `.pdf`.

## Custom Folder Access

The add menu in `Destinations` offers two choices:

- `Choose or Create Folder...` opens the native macOS folder picker and creates a bookmark-backed destination.
- `New Folder in <watched folder>...` keeps the existing behavior and creates a named destination inside the watched folder when first needed.

For a picked folder, `DestinationFolder` stores its display name, path, and security-scoped bookmark. The bookmark is encoded with the rest of the app configuration. `DestinationFolderAccessResolver` resolves the bookmark when the app needs to check or use the destination.

SortDock starts security-scoped access only while checking or moving to a destination and stops it immediately afterward. If macOS marks a bookmark as stale, the app replaces it with a fresh bookmark after resolving it successfully for a move.

The destination list shows `Folder is missing` or `Missing or unavailable` when a custom destination can no longer be used. `Choose Folder...` in every destination's menu opens Finder to change or reconnect it, including destinations that originally lived inside the watched folder. Destination pickers also mark unavailable folders.

When the chosen route has a missing or inaccessible destination, SortDock leaves the file in the watched folder and records a plain-language failure. It does not fall through to a lower-priority rule.

## Persistence and Compatibility

`SortDockConfiguration` stores ordered keyword rules beside existing file-type rules. Its decoder defaults `keywordRules` to an empty array, so saved configurations from versions without keyword routing continue to load.

The new destination path and bookmark fields are optional. Existing named destinations therefore decode as watched-folder-relative destinations without migration.

## Safe Moves

All moves still pass through `FileMover` and `FileConflictResolver`. SortDock creates a watched-folder-relative destination when needed, but it never recreates a missing external destination. Existing filenames are preserved and conflicts receive names such as `invoice (1).pdf`.

## Relevant Files

```text
SortDock/
├── Models/
│   ├── DestinationAvailability.swift
│   ├── DestinationFolder.swift
│   ├── KeywordRule.swift
│   └── SortDockConfiguration.swift
├── Services/
│   ├── DestinationFolderAccessResolver.swift
│   ├── FileRoutingResolver.swift
│   ├── FolderPicker.swift
│   ├── KeywordNormalizer.swift
│   ├── KeywordRuleMatcher.swift
│   └── SecurityScopedBookmarkFactory.swift
├── State/
│   └── SortDockStore.swift
└── Views/
    ├── Components/
    │   ├── DestinationAddMenu.swift
    │   ├── DestinationAvailabilityLabel.swift
    │   └── DestinationPickerLabel.swift
    ├── Main/
    │   ├── DestinationListView.swift
    │   ├── DestinationRowView.swift
    │   ├── KeywordRuleRowView.swift
    │   └── KeywordRulesView.swift
    └── Sheets/
        ├── KeywordRuleEditorPresentation.swift
        └── KeywordRuleEditorSheet.swift
```

## Verification

The routing logic is structured in focused Foundation-only services so it can be exercised without the UI. Verification covers:

- Case-insensitive filename matching.
- Excluding the extension from keyword matching.
- Keyword precedence over PDF/file-type routing.
- First-match behavior for overlapping keyword rules.
- Reordering overlapping rules.
- Disabled keyword fallback.
- Default routing and no-route behavior.
- Backward-compatible destination decoding.
- Conflict-safe filename generation.

The app itself is built with the project command in `AGENTS.md` after Swift changes.

## Source References

- `project-brief.md`
- `design-app.md`
- `coding-guidelines.md`
- `Download Sort Prompt Documentation.md`
