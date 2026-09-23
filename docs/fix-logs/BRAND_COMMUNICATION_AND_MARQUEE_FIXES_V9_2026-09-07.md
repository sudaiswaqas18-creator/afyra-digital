# Brand Communication + Connected Platforms Fixes V9

## Connected Platforms
- Rebuilt the strip so one full-width marquee runs continuously behind the fixed center label.
- The `[ CONNECTED PLATFORMS ]` overlay no longer consumes layout width or clips the right-side marquee content.
- Brackets start closed at the center and open outward on ScrollTrigger while the marquee keeps moving underneath.

## Brand & Creative Communication — Features
- Reinforced a single viewport pinned composition.
- Intro appears first, fades out, then feature cards reveal one-by-one in the bento grid.
- Pin duration was extended so the section cannot release before all cards are visible.
- Added final CSS overrides loaded last to neutralize older sticky/mobile rules.

## Brand & Creative Communication — How It Works
- Reinforced one-card-at-a-time pinned sequence: 01 → 02 → 03 → 04.
- Cards occupy the same visual stage instead of normal document flow.
- Extended pin distance and final hold so the next section cannot enter until step 04 is fully visible.

## Brand Integrations floating icons
- Added a center Afyra hub and upward-floating WhatsApp, LinkedIn, Instagram and Facebook badges.
- Refactored the continuous rising-loop motion into a shared helper used by both the Digital Presence hero and Brand Communication integrations section, keeping motion behavior consistent site-wide.

## Files changed
- `src/client/components/ReferenceSolutionExperience.tsx`
- `src/client/pages/ServicePage.tsx`
- `src/client/lib/useReferenceSolutionAnimations.ts`
- `src/client/lib/useServiceAnimations.ts`
- `src/client/lib/setupRisingIconLoop.ts` (new)
- `public/static/final-solution-fixes-v9.css` (new, loaded last)
- `src/index.tsx`
- `src/renderer.tsx`

## Validation
- Changed TypeScript/TSX files were syntax-transpiled successfully using the TypeScript compiler API.
- A full Vite production build was not run in this sandbox because the project dependency install is incomplete in the current runtime.
