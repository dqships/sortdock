# SortDock Web Marketing Design

Last updated: 2026-05-27

## Purpose

The SortDock website is a marketing page for the macOS app. Its job is to make the value obvious fast:

`Your Downloads folder cleans itself up, but you stay in control.`

The page should persuade visitors to download the app without making SortDock feel larger or more complex than it is.

## Design Direction Summary

**Aesthetic name:** Blue Dock Utility

**Dominant tone:** Editorial / Magazine

**Secondary tone:** Industrial / Utilitarian

**Conceptual inspiration:** macOS Finder, clean download trays, glossy app icons, soft blue folder labels, white/light-gray dock surfaces, and graphite dark-mode product pages.

**DFII score:** 14 / 15

| Dimension | Score | Rationale |
| --- | ---: | --- |
| Aesthetic Impact | 5 | A full-bleed product hero, blue dock icon, and routing-strip motif make the page visually specific. |
| Context Fit | 5 | The Finder-blue dock metaphor maps directly to downloads being sorted into folders and matches the icon. |
| Implementation Feasibility | 5 | The page can be built as a static marketing site with CSS, product screenshots, and light animation. |
| Performance Safety | 4 | Imagery must be optimized, but the page avoids heavy 3D or video. |
| Consistency Risk | 5 | The same blue rail, folder, and dock motifs can repeat across sections without becoming noisy. |

## Design Thinking

### Primary action

Get a Mac user to download SortDock or understand enough to trust it.

### Interface type

Persuasive, with product proof visible immediately.

### Differentiation anchor

If the logo were removed, the page should still be recognizable by the **download landing strip**: a product screenshot and soft-blue folder system where file extensions slide toward destination folders along a glowing blue rail.

### Generic UI avoidance

This avoids generic UI by leading with a full-bleed product environment and blue dock visual system instead of a centered SaaS headline, purple gradient background, and floating feature cards.

## Design System Snapshot

### Typography

Use the same family as the app so the product and site feel connected.

- **Display:** `Fraunces`
  - Use for hero headline, section titles, and large pull statements.
  - The slightly editorial shape keeps the page memorable without making the app feel playful.
- **Body:** `IBM Plex Sans`
  - Use for paragraphs, buttons, navigation, captions, and product UI callouts.
  - Keep body copy plain and human.

Do not use Inter, Roboto, Arial, or default system stacks as the primary visual identity.

### CSS Color Variables

Use CSS variables exclusively.

```css
:root {
  --window: #f7faff;
  --panel: #ffffff;
  --panel-raised: #f1f6ff;

  --ink: #142033;
  --ink-muted: #6b7a90;

  --line: #dce8f7;
  --line-strong: #bfd8ff;

  --accent: #2f7bff;
  --accent-deep: #1554e8;
  --accent-soft: #eaf3ff;
  --accent-glow: #4e9efa;

  --routing-rail: #2f7bff;
  --routing-rail-soft: #bfd8ff;
  --routing-rail-dark: #1554e8;

  --tag-bg: #eaf3ff;
  --tag-border: #bfd8ff;
  --tag-text: #1554e8;

  --button-primary-start: #4e9efa;
  --button-primary-end: #2f6ded;
  --button-primary-pressed: #1554e8;

  --dock: #e8edf3;
  --dock-shadow: rgba(34, 78, 145, 0.16);

  --active: #2ebe73;
  --warning: #f2b84b;
  --danger: #ef5350;
  --focus: #4e9efa;
}

[data-theme="dark"] {
  --window: #050718;
  --panel: #0d1324;
  --panel-raised: #151d33;

  --ink: #eaf3ff;
  --ink-muted: #8fa4c1;

  --line: #25314a;
  --line-strong: #344669;

  --accent: #2f6ded;
  --accent-deep: #0733ba;
  --accent-soft: #132c66;
  --accent-glow: #4e9efa;

  --routing-rail: #2f6ded;
  --routing-rail-soft: #4e9efa;
  --routing-rail-dark: #0733ba;

  --tag-bg: #132c66;
  --tag-border: #344669;
  --tag-text: #eaf3ff;

  --button-primary-start: #4e9efa;
  --button-primary-end: #2f6ded;
  --button-primary-pressed: #0733ba;

  --dock: #101522;
  --dock-shadow: rgba(0, 0, 0, 0.42);

  --active: #35d486;
  --warning: #f2b84b;
  --danger: #ff6262;
  --focus: #4e9efa;
}
```

The dominant color story comes from the icon: electric blue, soft icy blue, white, light gray, graphite, and dark navy. Green is only a tiny active-state signal, not a brand color.

### Brand Assets

Use the repository icon set as a visible brand anchor:

- `assets/brand/icon/icon.png` for light hero treatments.
- `assets/brand/icon/icon-dark.png` for dark hero treatments.
- `assets/brand/icon/icon-glass.png` for high-polish product moments.

The page should look like the marketing surface for that icon: blue folder forms, clean white dock surfaces, light-gray trays, graphite dark-mode panels, and a blue file-path rail.

### Color Application Rules

- The routing rail and primary CTA are blue.
- Secondary CTAs stay white/light-gray in light mode and graphite in dark mode.
- Extension pills use soft blue rather than neutral tag colors or category colors.
- Folder icons stay blue across all file categories.
- Green appears only as a tiny active-state signal in product screenshots.
- Dark mode leans into graphite, dark navy, blue glow, and the dark icon asset.

### Spacing rhythm

- Base unit: `4px`.
- Page gutters: `20px` mobile, `40px` tablet, `72px` desktop.
- Max content width: `1180px`.
- Section spacing: `88px` desktop, `56px` mobile.
- Button height: `44px`.
- Card radius: `8px` maximum, used only for product UI slices and repeated proof items.

### Motion philosophy

Use one memorable sequence, then keep the rest calm.

- Hero entrance: product screenshot appears first, then the rail draws in, then headline and CTA fade up.
- Feature hover: extension tags move `6px` toward their destination, then return.
- CTA hover: blue underline expands left to right.
- No looping background motion.
- Respect `prefers-reduced-motion`.

### Texture and imagery

The page needs real visual assets.

Preferred assets after the app exists:

- High-resolution screenshot of the SortDock main window.
- Screenshot of the menu bar popover.
- Screenshot of an ask-before-moving prompt.

Acceptable temporary asset before the app exists:

- A generated bitmap mockup of a Mac desktop with the SortDock window open and a Downloads folder nearby.

Do not use an SVG hero illustration, abstract gradient hero, or dark blurred stock photo.

## Page Structure

### Global nav

Keep the nav short.

Left:

- `SortDock`

Right:

- `How it works`
- `Privacy`
- `Download`

The nav should sit over the hero image with a subtle white, icy-blue, or graphite strip only when needed for contrast.

### Hero

The hero must be the first viewport signal for SortDock.

Hero rule:

- Full-bleed product environment as the background.
- Hero text sits directly over the image, not inside a card.
- The next section must peek into view on desktop and mobile.
- H1 is the brand name: `SortDock`.

Hero copy:

```text
SortDock
Keep Downloads clean without babysitting every file.
```

Supporting copy:

```text
Choose a folder, set a few rules, and let new downloads land where they belong. Ask first or move automatically.
```

Primary CTA:

`Download for Mac`

Secondary CTA:

`See how it sorts`

Hero visual:

- SortDock main window open over a Downloads folder.
- The blue folder and dock icon visible near the product, using the light or dark asset that matches the hero.
- A few visible file labels, such as `.pdf`, `.png`, `.dmg`, moving toward `PDFs`, `Images`, and `Apps`.
- Blue routing rail visible.
- Keep the screenshot clear enough to inspect; do not blur it for mood.

### Section 1: The Download Landing Strip

Purpose: show the product idea in one glance.

Layout:

- Asymmetric two-column section.
- Left side has a large product UI crop showing the routing rail.
- Right side has three short proof points.

Heading:

`New files get a place to land.`

Proof points:

- `PDFs go to PDFs. Screenshots go to Images. Installers go to Apps.`
- `Unknown files can stay put or go to a default folder.`
- `SortDock waits before moving so unfinished downloads are not touched.`

### Section 2: Control The Moment

Purpose: explain Ask First versus Auto Move.

Layout:

- Horizontal comparison with two compact product slices.
- No large cards nested inside a larger card.

Ask First copy:

`Ask before moving`

`SortDock checks with you when a new file arrives. Move it, choose another folder, leave it, or ask later.`

Auto Move copy:

`Move automatically`

`Once your rules feel right, SortDock can clean up quietly in the background.`

### Section 3: Rules Without Scripts

Purpose: make non-technical control feel approachable.

Heading:

`Rules you can read at a glance.`

Visual:

- A vertical list of extension tags connected to folder labels.
- The routing rail repeats here as a page motif.

Copy:

`No AppleScript. No folder-action setup. No hidden automation files. Just file types and folders.`

### Section 4: Small App, Small Promises

Purpose: reinforce trust by clearly stating boundaries.

Use four proof items:

- `Local preferences`
- `No accounts`
- `No cloud sync`
- `No overwrite surprises`

Each proof item is a simple label row with a small icon, not a feature card grid with long paragraphs.

### Section 5: Fits How Macs Work

Purpose: communicate menu bar, run at login, light/dark/system appearance.

Layout:

- Product screenshot strip with three crops:
  - Menu bar popover.
  - Main window.
  - Prompt dialog.

Copy:

`Open the window when you want to adjust rules. Use the menu bar when you only need to pause or resume sorting.`

### Final CTA

Heading:

`Clean up Downloads once. Keep it clean after that.`

Actions:

- `Download for Mac`
- `Read the setup guide`

Footer:

- Product name.
- Version or release status.
- Privacy note.
- Contact or GitHub link if available later.

## Responsive Behavior

### Mobile

- Hero remains image-led, but crop around the SortDock window so the product is still recognizable.
- H1 stays large but must not cover the product controls.
- CTA buttons stack only when needed.
- Routing rail becomes a horizontal strip where extension tags move left to right into folders.
- Navigation collapses to `Download` and a menu button.

### Tablet

- Keep two-column sections where possible.
- Product screenshots should remain legible; avoid tiny UI crops.

### Desktop

- Hero height: `min(760px, 92vh)`.
- Keep a visible hint of Section 1 below the hero.
- Use asymmetry: product visuals can overlap section boundaries, but text must never overlap controls or screenshots.

## Component Inventory

Future implementation should keep components atomic.

```text
MarketingPage.tsx
MarketingNav.tsx
HeroSection.tsx
HeroProductImage.tsx
DownloadRail.tsx
ProofPointRow.tsx
ProductSlice.tsx
BehaviorComparison.tsx
RulesSection.tsx
PrivacyProofSection.tsx
DesktopFitSection.tsx
FinalCtaSection.tsx
Footer.tsx
DesignTokens.css
```

Every component should have one clear purpose. Avoid putting several section components in one file.

## Copy Tone

Copy must be plain and relatable.

Use:

- `Keep Downloads clean.`
- `Ask first or move automatically.`
- `SortDock never overwrites your files.`
- `Pause sorting from the menu bar.`

Avoid:

- `Workflow orchestration`
- `Rules engine`
- `Background automation daemon`
- `AI-powered`
- `Optimize your file lifecycle`

## Accessibility

- All text over hero imagery must meet WCAG AA contrast. Add a subtle localized scrim only behind the text if needed.
- Buttons need visible focus states using `--focus`.
- Product screenshots need concise alt text.
- Motion must respect `prefers-reduced-motion`.
- Do not rely on blue/green color alone to communicate status.
- Ensure the longest button text fits at mobile widths.

## Performance

- Use responsive image sizes for hero and screenshots.
- Prefer AVIF or WebP with PNG fallback for product UI where crispness matters.
- Lazy-load below-fold screenshots.
- Do not ship heavy animation libraries for the first version.
- Keep the marketing page static unless app download/account logic later requires dynamic behavior.

## Implementation Notes

The marketing page can be implemented with static HTML/CSS, Astro, Next.js, or another lightweight frontend setup. The design does not require a component library.

Implementation requirements:

- CSS variables for all colors.
- Semantic HTML sections.
- Real buttons and links, not clickable divs.
- No ShadCN/Tailwind default visual language.
- No centered template hero with a gradient blob background.
- No nested cards.

## Acceptance Checklist

- The first viewport clearly shows SortDock and a product visual.
- The H1 is `SortDock`.
- The next section peeks into view on mobile and desktop.
- The page explains Ask First, Auto Move, Delay, Ask Later, and local control.
- The routing rail or download landing strip appears in at least two sections.
- Screenshots or generated product bitmaps are used instead of abstract hero art.
- Copy stays simple and non-technical.
- The page feels connected to the app design without becoming a settings screen.
