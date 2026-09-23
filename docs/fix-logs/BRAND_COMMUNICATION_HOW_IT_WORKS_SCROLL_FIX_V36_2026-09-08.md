# Brand Communication — How It Works Scroll Fix V36

Scope: **Brand & Creative Communication → How it works** only.

## Requested behavior

- Step 01 is visible immediately when the section reaches the viewport.
- Scrolling reveals step 02, then 03, then 04 in order.
- Step 04 remains visible briefly, then the sticky section releases directly into the next section.
- The previous long blank/dead scroll area is removed.
- No ScrollTrigger pin or pin spacer is used; the visual frame is CSS `position: sticky` and GSAP only scrubs card state.

## Implementation

- Replaced the legacy timeline whose duration/phase distribution produced excessive dead travel with a normalized 0→1 timeline.
- Transitions are centered around 20%, 45% and 70% scroll progress with hold regions between them.
- Navigation tabs stay synchronized with the visible card and still support click-to-step.
- Replaced the old `400svh` / `440svh` section runway with a finite responsive runway sized only for the three card transitions and final hold.
- Preserved the existing heading, tabs, card design, guide columns, brand colors, and all other page animations.

## Files changed

- `src/client/lib/useServiceAnimations.ts`
- `src/index.tsx`
- `src/renderer.tsx`
- `public/static/brand-how-it-works-scroll-fix-v36.css` (new)
