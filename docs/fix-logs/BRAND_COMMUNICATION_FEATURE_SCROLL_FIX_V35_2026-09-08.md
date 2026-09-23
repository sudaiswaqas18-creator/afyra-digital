# Brand Communication Feature Scroll Fix V35 — 2026-09-08

## Scope
Only the **Brand & Creative Communication** solution page (`layout-02`) feature section was changed.

## Fixed
- Removed the broken GSAP pin/pin-spacer behavior that could leave a blank scrolling region.
- Replaced the feature pin with a short, CSS-sticky visual runway on desktop/tablet.
- The intro now fades upward as soon as the feature-story scroll begins.
- Feature cards start revealing before the intro is fully gone, so the stage never becomes visually empty.
- Cards reveal in a compact stagger rather than after a long dead-scroll delay.
- Mobile remains normal document flow and reveals cards as they enter the viewport.
- Existing card visual micro-animations are preserved.

## Files
- `src/client/lib/useServiceAnimations.ts`
- `public/static/brand-feature-scroll-fix-v35.css` (new, loaded last)
- `src/index.tsx`
- `src/renderer.tsx`

## Why the old animation broke
A later route-specific stylesheet forced the ScrollTrigger pin target to `position: relative !important`. ScrollTrigger then created pin spacing, but could not reliably hold the element fixed, so the user could scroll through a large spacer while the feature content had already moved away. V35 removes that conflict by using CSS sticky for the visual hold and GSAP only for the reveal choreography.
