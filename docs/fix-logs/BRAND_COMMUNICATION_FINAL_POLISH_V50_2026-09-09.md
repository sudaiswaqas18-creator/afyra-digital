# Brand & Creative Communication Final Polish V50 — 2026-09-09

Route: `/solutions/brand-creative-communication`

## Root cause fixed
The Features section was still inheriting the historical `premium-pages.css` rule that turns `.sv-brand-features .af-container` into a two-column grid (`280–330px + 1fr`). The rebuilt feature story is a single child, so the entire feature stage was being constrained to the first narrow column. That is why the heading and paragraph wrapped vertically and the section appeared stuck on the left.

## V50 changes

1. **Features layout repaired at the source of the regression**
   - Neutralizes the legacy two-column container only on Brand & Creative Communication.
   - Restores a full-width centered sticky canvas.
   - Explicitly clears historical feature-grid width/height/translate/scale rules.
   - Keeps the 2-card top row + 3-card bottom row composition.

2. **Feature reveal animation polished**
   - Intro fades out more gradually.
   - Feature grid fades in before the intro fully disappears, preventing blank frames.
   - Card reveal uses a softer stagger and longer easing window.
   - Existing internal orbit, hub, message, browser, timeline and sheet motion remains intact.

3. **Strategic Solution arc rebuilt for reference behavior**
   - Clean white round arc is visible before animation.
   - Old straight-border/pseudo-line fallbacks are suppressed.
   - A teal glow band plus bright tracer travels along the same curved SVG path on scroll.
   - Animation remains scrubbed and reversible through GSAP ScrollTrigger.

4. **How It Works wide-screen centering**
   - Section uses a viewport-wide centering context.
   - Heading is explicitly visible and protected from transform/opacity clipping.
   - Sticky stage and shell remain centered on large and ultrawide screens.
   - All four active cards resolve to the geometric center instead of drifting toward guide edges.
   - Existing 01 → 02 → 03 → 04 scrub mechanics and tab behavior remain intact.

5. **Footer social icons restored**
   - WhatsApp/consultation icon remains clickable using the existing verified internal consultation route.
   - Instagram and Facebook icons are restored visually at the right-side footer cluster.
   - Because verified profile URLs are not present in project source, Instagram/Facebook are intentionally non-clickable rather than inventing external links.

## Files changed

- `webapp/src/client/lib/useServiceAnimations.ts`
- `webapp/src/client/components/Footer.tsx`
- `webapp/src/index.tsx`
- `webapp/src/renderer.tsx`
- `webapp/public/static/brand-communication-final-polish-v50.css` (new)

## Validation

- V50 CSS brace balance: PASS.
- Changed TS/TSX files transpile successfully with the TypeScript compiler syntax pass.
- V50 stylesheet is loaded after V49 in both server HTML shells.
- No unverified social profile URL was invented.
