# SortDock Mac App Store Screenshot Editor

This is a focused, macOS-only editor for making SortDock’s Mac App Store screenshots. It designs and exports the one required 2880 × 1800, 16:10 PNG size.

## Run it

```bash
bun install
bun run dev
```

Open the local URL Next.js prints. Every edit is saved to `app-store-screenshots.json`, so the five-slide SortDock deck is easy to resume or commit.

## Starter deck

The English-only deck uses the real SortDock capture at:

`public/screenshots/apple/mac/en/01-main.jpeg`

The checked-in capture uses generic development fixture text instead of a personal path or filename. The deck starts with five grounded messages:

1. Your downloads, sorted your way
2. See every route at a glance
3. Ask first. Move when ready.
4. Automatic when you want it.
5. Pause sorting anytime.

The editor frames captures with `MacWindowFrame`, a compact macOS title bar around the uploaded app image. It does not invent or simulate SortDock UI.

## What stays editable

- Drag, resize, rotate, layer, and add images
- Edit the caption and headline in place
- Choose a restrained SortDock navy, ice, or night theme
- Autosave, undo, redo, duplicate, reorder, and reset slides
- Upload replacement screenshots and fonts
- Export all five screens in a ZIP of 2880 × 1800 PNGs

There are intentionally no iOS, Android, tablet, orientation, or multi-device decks. The project state has exactly one `mac` deck and one `en` locale.
