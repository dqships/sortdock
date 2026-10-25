# Optional App Store update notices

## What it does

SortDock starts file sorting immediately, then checks Apple’s public App Store lookup service in the background at launch and whenever the app becomes active. If Apple has a public listing for SortDock and reports a newer version, the app shows an update notice in both the main window and menu bar.

The notice is optional: sorting and every other part of the app remain available. Selecting **Update SortDock** opens the exact App Store listing URL returned by Apple. The App Store, not SortDock, installs the update.

## Before SortDock is published

The lookup is based on the app bundle ID. Before Apple has a public App Store listing, the lookup returns no result and no notice is shown. No App Store URL is needed in the app configuration.

## Relevant code

- `Services/AppStoreUpdateChecker.swift`: makes the short, best-effort lookup and opens Apple’s returned listing URL.
- `Services/AppStoreVersionComparator.swift`: compares dotted version numbers numerically.
- `Models/AppStoreLookupResponse.swift`: decodes Apple’s lookup response.
- `Models/AppStoreUpdate.swift`: carries a discovered version and listing URL to the interface.
- `Views/Main/MainWindowUpdateNoticeView.swift`: main-window notice.
- `Views/MenuBar/MenuBarUpdateNoticeView.swift`: compact menu-bar notice.
- `Services/SortDockAppDelegate.swift`: triggers checks at launch and when the app becomes active.

## Reliability and privacy

The lookup uses HTTPS and a short timeout. Failed requests, no network connection, and invalid responses never block app startup or file sorting, and they leave a previously found update notice in place. A valid response with no newer version clears the notice. The app sandbox includes only the standard outgoing network-client entitlement needed for this lookup. No user folders, file names, or personal data are sent with the request.
