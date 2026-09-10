# Brand & Creative Communication — Final Last Fix (2026-09-06)

## Fixes applied

### 1. Hero right-side visual balance
- Right visual now sizes from the measured left hero content height using `--af-hero-copy-height`.
- The main flip dashboard fills the right-side visual area instead of staying undersized.
- No scroll-linked transform is applied to the hero card.
- Existing front/back flip remains automatic and independent of page scroll.
- Responsive overrides preserve a large visual on desktop, tablet, and mobile.

### 2. Features GSAP story
- Removed GSAP pinning from the Features outer stage.
- The Features stage now uses CSS `position: sticky` so the outer card/shell stays visually stationary.
- GSAP only animates the centered intro text out and the five inner feature cards in.
- Same scroll-linked intro → cards sequence is used at all viewport sizes.
- Mobile keeps the same 2-card top row / 3-card bottom row composition, with responsive typography and spacing.

### 3. How It Works GSAP story
- Removed GSAP pinning from the How It Works shell.
- The shell is held with CSS sticky positioning; only the inner active card changes.
- The active state starts at Step 01 before the section becomes active.
- While the section is active, scroll progress maps to Step 01 → 02 → 03 → 04.
- After Step 04, the sticky parent ends naturally and the next section follows without an additional artificial blank pin spacer.
- Responsive step distances are used for desktop/tablet/mobile.

## Validation
- No `pin:` remains in the Brand Communication layout-02 GSAP block for Features or How It Works.
- TypeScript parser check found no TS1xxx syntax errors in the edited TS/TSX files. Full project type/build validation is limited by missing local project dependencies in the supplied archive.
