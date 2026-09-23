# Afyra Digital — Brand & Creative Communication Home-02 Last Pass QA

## Scope
Final refinement focused on the user-reported Brand & Creative Communication issues:

1. Hero right-side dashboard composition and 3D flip layout.
2. Features scroll-story stability and stationary card stage.
3. How-It-Works scroll pacing, especially the delay after the fourth card.
4. Responsive behavior across desktop, laptop, tablet, mobile, and short-height landscape screens.

## Implemented

### Hero right side
- Increased the dashboard composition area so the generated Afyra dashboard faces read as the primary visual.
- Corrected the two faces for vertical `rotationX` flipping.
- Forced both generated SVG dashboard faces to fill the card consistently with stable aspect ratio.
- Repositioned Educational / Strategic mini cards inside the right-side visual boundary rather than letting them create overflow.
- Added earlier one-column responsive breakpoint before the two-column hero can become too narrow.

### Features section
- Replaced GSAP pinning of the entire feature story with a CSS sticky stage.
- Added a dedicated `.sv-brand-feature-stage` wrapper.
- The stage remains stationary while scroll progress changes only:
  - intro visibility,
  - first row cards,
  - second row cards,
  - internal card visuals.
- Shortened the story distance and reduced dead hold time.
- Preserved rich card detail points and internal motion.
- Tablet/mobile fall back to clean normal-flow cards with GSAP reveal rather than fragile pinning.

### How It Works
- Removed snap behavior that could create a perceived scroll stop.
- Reduced the scroll runway.
- Fourth card now activates close to the end of the runway so there is very little empty wait after it appears.
- Outer shell remains CSS-sticky; ScrollTrigger only switches inner cards.
- Mobile navigation is horizontal and compact so the sticky shell still fits typical phone viewports.
- Short-height landscape screens automatically disable sticky layouts to avoid viewport clipping.

### Responsive hardening
- New last-loaded route-specific stylesheet: `public/static/brand-home2-last-pass.css`.
- Added to both SSR renderer and index HTML after all previous repair layers.
- Breakpoints cover 1120, 1099, 760, 619, 420px plus short-height landscape.
- Horizontal overflow guards remain active for the complete Brand page.

## Files changed
- `src/client/pages/ServicePage.tsx`
- `src/client/lib/useServiceAnimations.ts`
- `src/index.tsx`
- `src/renderer.tsx`
- `public/static/brand-home2-last-pass.css` (new)

## Source-level QA
- New CSS brace/integrity check: PASS.
- Existing route repair CSS brace checks: PASS.
- TypeScript parser check: no TS syntax/parse errors found in edited files. The isolated check only reports expected missing-module errors because dependencies are not installed in this sandbox copy.

## Local visual QA recommended
Run normal project setup on the developer machine:

```bash
npm install
npm run dev
```

Then verify the Brand & Creative Communication route at desktop, 1366/1440 laptop, tablet, mobile portrait, and mobile landscape sizes.
