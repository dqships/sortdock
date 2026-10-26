# App icon appearances

SortDock uses one icon family across the Mac app and website. The family has three supplied artworks:

- **Default** for the normal Mac and web appearance.
- **Dark** for dark website chrome and the macOS Dark icon appearance.
- **Glass** for maskable web installs and the macOS tintable Mono appearance used by clear and tinted icon styles.

## macOS wiring

`SortDock/AppIcon.icon` is the editable Icon Composer source. It contains three named image layers. Appearance-specific opacity keeps exactly one artwork visible in each system appearance:

- Default: `Default` layer at full opacity.
- Dark: `Dark` layer at full opacity.
- Mono/tintable: `Glass` layer at full opacity.

The app background uses `System Light` for Default and `System Dark` for Dark. Do not restore Icon Composer's blue automatic gradient: the group is translucent, so that gradient shows through the Default artwork as an unwanted blue cast. Mono/tintable owns its system-rendered background and cannot be edited in Icon Composer.

Xcode compiles the Icon Composer source into the app's asset catalog. The existing `Assets.xcassets/AppIcon.appiconset` remains populated with the standard 16, 32, 128, 256, 512, and 1024 pixel Mac renditions as the legacy fallback for supported macOS releases before adaptive icons.

The release build must contain `Contents/Resources/AppIcon.icns` and `Assets.car`. `assetutil --info Assets.car` should report `NSAppearanceNameAqua`, `NSAppearanceNameDarkAqua`, and `ISAppearanceTintable` entries for `AppIcon`.

## Web wiring

The generated PNGs live in `web/public/icons`. Default, dark, and glass variants are provided at 16, 32, 48, 180, 192, 256, 512, and 1024 pixels.

`siteMetadata.ts` supplies the standard favicon and Apple touch icon, plus dark favicons selected by `prefers-color-scheme`. `manifest.ts` supplies 192 and 512 pixel install icons and uses the glass artwork for the maskable install-icon purpose. The web platform does not define a macOS-style system icon appearance switch, so the glass web variant is intentionally wired as the standards-based maskable icon.

## Validation

Run:

```sh
legacy/mac-swiftui/SortDock/AppStore/scripts/validate-icons.sh
```

The validator checks every generated web and release-package PNG for its declared dimensions, PNG format, readability, and absence of an alpha channel. It also checks the legacy Mac icon slots and the Icon Composer source.
