# Submission report

Status: the previous 1.0 review submission is removed; build 1.0 (5) is validated, uploaded, and processing; no new review submission was created.

## Source and product

- Branch: `main`; starting HEAD for this release fix: `d9674aa2f42214ba9a256dbfb707f76c963e1383`.
- Destination setup now uses the native macOS folder panel during onboarding and from destination menus.
- The folder panel allows creating folders, and reconnecting a destination saves its new path and security-scoped bookmark together.
- Security-scoped bookmarks, keyword precedence, file-type fallback, and conflict-safe naming remain in place.

## Testing

- Debug build: passed.
- Unit tests: passed, 4 tests.
- Release analyze: passed.
- Metadata, screenshot, and icon validation: passed.
- Xcode Organizer validation: passed all App Store Connect checks for 1.0 (5).
- The archive contains Intel and Apple Silicon executables.
- UI automation does not drive the system folder panel. Native panel behavior was verified through the AppKit configuration and the focused destination flow review.

## Release configuration

- Bundle ID: `com.followusai.SortDock` (registered in Apple Developer on 2026-08-21)
- Team: `525ZD896G4`; version/build: `1.0 (5)`; deployment: macOS 14.0
- Architectures: Intel and Apple Silicon
- Sandbox: enabled with app-scope bookmarks and user-selected read/write folders
- Privacy manifest: bundled; UserDefaults reason `CA92.1`; tracking false
- Export compliance: `ITSAppUsesNonExemptEncryption=NO`
- Copyright: `© 2026 FollowUs AI LLC`
- App icon: Icon Composer source with Default, Dark, and tintable Mono/glass appearances; legacy Mac sizes remain populated for earlier supported systems.

## Website

- Production: `https://sortdock.vercel.app`
- Support: `https://sortdock.vercel.app/support`
- Privacy: `https://sortdock.vercel.app/privacy`
- Terms: `https://sortdock.vercel.app/terms`
- Acknowledgements: `https://sortdock.vercel.app/acknowledgements`
- All were verified in Safari over HTTPS on 2026-08-21.

## App Store Connect

- Apple App ID: `6804060639`; macOS version 1.0 currently shows Developer Rejected after the previous submission was removed.
- Name: `SortDock: Downloads Organizer`; subtitle/category/copyright/content rights saved.
- Age questionnaire completed; Apple calculated 4+.
- Privacy-policy URL saved; “Data Not Collected” response published.
- Version metadata, review contact, and review notes saved.
- Build 1.0 (5) uploaded successfully through Xcode Organizer just after midnight on 2026-08-26 and is processing.
- Screenshots: five stylized Mac screenshots from the earlier upload are currently present. No screenshot was added, replaced, reordered, or deleted after the owner chose to manage them manually. Pricing and territories were not changed.

## Screenshots

- Count: 5
- Dimensions: 2880 x 1800 each
- Format: JPEG
- Alpha: none
- Source: actual development UI composed in `AppStore/screenshot-editor`, the app-store-screenshots skill editor adapted to Mac-only use
- Final path: `legacy/mac-swiftui/SortDock/AppStore/screenshots/final/2880x1800`
- App Store Connect: 5 of 10 screenshots currently present; five matching validated files are ready locally for the owner to keep or replace manually

## Archive and upload

- Archive: `/Users/starship/Library/Developer/Xcode/Archives/2026-08-25/SortDock 8-25-26, 11.58 PM.xcarchive`
- Created 2026-08-25 23:58 America/Detroit; Intel and Apple Silicon; version 1.0 build 5.
- Xcode validation passed all checks. App Store Connect upload succeeded just after midnight; Organizer shows `Uploaded to Apple`.

## Remaining blockers

1. Wait for build 1.0 (5) to finish processing and select it for the next submission.
2. The owner must decide price and territory availability; no value was guessed.
3. The owner may keep or replace the five screenshots currently present using `AppStore/screenshots/final/2880x1800`.

The previous submission was removed. `Add for Review`, `Submit for Review`, and release controls were not used for build 1.0 (5).
