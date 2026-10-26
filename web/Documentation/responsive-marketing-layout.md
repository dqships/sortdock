# Responsive Marketing Layout

Last updated: 2026-08-13

## Purpose

The marketing page must feel composed on a small phone, a tablet, and a resizable desktop window. Responsive behavior keeps the product story readable without hiding content, clipping controls, or forcing mobile visitors through oversized examples.

## How It Works

- `HeroSection.tsx` gives the first screen enough height for both the copy and product window. Phone, tablet, and desktop layouts use separate minimum heights and alignment rules.
- `HeroProductImage.tsx` keeps the compact product view inside phone and tablet gutters. The wider sidebar and dock icon appear only when a desktop window has room for them.
- `DownloadRail.tsx` preserves the three routing lanes in one row. Phone layouts use smaller cards and text while wider layouts restore the folder icons and roomier spacing.
- `KeywordRoutingExample.tsx` keeps rule order, keyword phrases, and destination names on a shared three-column grid that remains readable on narrow screens.
- `ProductSlice.tsx` puts the explanation before the visual on phones and tablets. Desktop cards keep the product visual first.
- Section grids switch to side-by-side layouts only when their content has enough room. Smaller windows stack the same content without changing its meaning.
- `MarketingFooter.tsx` uses a balanced two-column mobile layout and returns to a flexible row on wider screens.

## Supported Use Cases

- Narrow phones starting at 320 CSS pixels.
- Standard phones in portrait orientation.
- Tablets in portrait orientation.
- Small desktop windows around 1024 CSS pixels wide.
- Full desktop windows through 1920 CSS pixels wide.
- Light, dark, and reduced-motion system preferences.

## File Tree

```text
web/src/app/_components/marketing/HeroSection.tsx
web/src/app/_components/marketing/HeroProductImage.tsx
web/src/app/_components/marketing/DownloadRail.tsx
web/src/app/_components/marketing/KeywordRoutingExample.tsx
web/src/app/_components/marketing/ProductSlice.tsx
web/src/app/_components/marketing/LandingStripSection.tsx
web/src/app/_components/marketing/BehaviorComparison.tsx
web/src/app/_components/marketing/RulesSection.tsx
web/src/app/_components/marketing/PrivacyProofSection.tsx
web/src/app/_components/marketing/DesktopFitSection.tsx
web/src/app/_components/marketing/FinalCtaSection.tsx
web/src/app/_components/marketing/MarketingFooter.tsx
```

## Verification

After responsive changes, render the page at 320, 390, 768, 1024, 1440, and 1920 CSS pixels wide. Confirm that:

- the document has no horizontal overflow;
- the hero copy and product window do not overlap;
- the product window stays inside the viewport;
- text and controls are not clipped;
- links can be reached and activated by keyboard;
- content remains visible when reduced motion is enabled;
- both light and dark appearances retain readable contrast.

Run the automated project checks from `web/`:

```sh
npm run check
npm run build
```
