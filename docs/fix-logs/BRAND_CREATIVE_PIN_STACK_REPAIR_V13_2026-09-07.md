# Brand & Creative Communication — Pin Stack Repair V13

Route: `/solutions/brand-creative-communication`

## Fixed

### Features
- Rebuilt the pinned story as a true single-viewport grid stack.
- Intro and bento grid now occupy the same visual cell instead of separate document-flow positions.
- Only intro/cards opacity and scale animate; the visual stage itself never leaves the pinned frame.
- ScrollTrigger now pins using transform-based pinning so legacy `position: relative !important` rules cannot break fixed pin behavior.
- Pin releases only after all five bento cards are fully visible and held in place.

### Integrations
- Added a dedicated single-viewport pinned wrapper containing both heading and icon-path graphic.
- Removed the extra rising/duplicate icon cluster from the center.
- Retained only one intentional Afyra center hub/logo plus the nine platform icons on the connecting path.
- Path draw + sequential icon reveal now occurs while the entire composition stays inside the pinned viewport.

### How It Works
- Rebuilt as a single pinned viewport composition with heading, tabs and stage contained together.
- All four step cards now use the exact same centered stage position.
- Steps cross-fade/scale in sequence instead of translating out of the viewport.
- Active tab state remains synchronized with step 01 → 02 → 03 → 04.
- Pin releases only after step 04 has been fully shown and held.
- Transform-based ScrollTrigger pinning is used to avoid the CSS/fixed-pin conflict that caused blank frames.

## Files changed
- `src/client/pages/ServicePage.tsx`
- `src/client/lib/useServiceAnimations.ts`
- `src/index.tsx`
- `src/renderer.tsx`
- `public/static/brand-home2-pin-stack-v13.css` (new; loaded last)

## Validation
- Modified TypeScript/TSX files passed TypeScript `transpileModule` syntax parsing.
- Full Vite build is not available in this archive because the supplied local `node_modules` is incomplete (Vite executable and React packages are missing).
