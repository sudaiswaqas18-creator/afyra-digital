# Brand Communication Animation Polish V49 — 2026-09-09

Route: `/solutions/brand-creative-communication`

## What changed

1. Hero layout polish
   - Keeps all hero copy, CTA content and the animated changing-word box visible.
   - Preserves the existing changing-word animation.
   - Shortens the dashboard scroll flip to a compact 280px scroll range so the front-to-back turn completes within one deliberate scroll gesture.
   - Keeps the dashboard stable and centered; no auto-flip loop.

2. Features story rebuilt
   - The feature intro and the five feature cards now live in one centered sticky stage.
   - Intro starts fully visible in the center.
   - Scroll fades the intro while the five-card reference-style grid reveals before the intro has completely disappeared, preventing blank frames.
   - Desktop uses a 2-card top row + 3-card bottom row reference composition.
   - Mobile uses normal document flow to prevent tall blank scroll regions.
   - Historical `data-brand-feature-grid` transforms are explicitly neutralized so the stage cannot drift left.

3. Feature card UI motion
   - Static card images are not used.
   - All five cards use HTML/CSS/SVG interface visuals.
   - Added GSAP orbit motion, floating nodes, central-hub pulse, message/chat reveals, browser workflow motion, moving timeline pointer and template-sheet breathing lines.
   - Motion is transform/opacity based for smoother rendering.

4. Strategic Solution arc
   - Removed the unwanted straight green top line.
   - The base arc stays clean/white before the section is reached.
   - On scroll, a teal illuminated segment and tracer travel along the round arc.
   - The glow is synchronized to section entry with ScrollTrigger.

5. How It Works alignment
   - Existing 01 → 02 → 03 → 04 scroll behavior is preserved.
   - The heading, tabs and stage are now forced to the viewport center with route-scoped alignment rules.

## Files changed

- `src/client/pages/ServicePage.tsx`
- `src/client/lib/useServiceAnimations.ts`
- `src/index.tsx`
- `src/renderer.tsx`
- `public/static/brand-communication-polish-v49.css` (new)

No image generation was used for this revision.
