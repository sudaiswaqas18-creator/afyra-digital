# Homepage Hero — Reference Dock V33
Date: 2026-09-08

## Scope
Homepage hero only. This pass fixes the two issues shown in the supplied screenshots: the opening scatter state placed modules over the hero copy / each other, and the scroll settle did not place every module into its exact dashboard slot.

## Structural fix
The hero now uses one real dashboard shell as the final layout owner.

- `.af-hpd__unified-box` remains the single parent dashboard container.
- The sidebar, topbar and **all nine moving cards** now live inside that same shell.
- A new `.af-hpd__dock-grid` is the actual final dashboard grid.
- GSAP no longer relies on manually calculated absolute final coordinates for each card.
- Every card's final transform is simply `x:0`, `y:0`, `rotation:0`, `scale:1`; its CSS grid cell is its exact docked location.

This removes the previous failure mode where a card could reach transform zero but still be positioned over the wrong part of the dashboard.

## Opening scatter composition
Desktop opening offsets were recalibrated against the supplied SaaS King screenshots:

- Qualified Inquiries: isolated upper-left.
- Patient Inquiries chart: far-left and below the headline region.
- New Inquiries: left-side support card, below the chart rather than over the hero copy.
- Appointments: isolated upper-right.
- Today's Schedule: upper-right detail card.
- Profile Views: outer-right stat card.
- Local Visibility: lower-right support card.
- GBP / Campaign rows: remain lower around the dashboard instead of crossing the CTA / heading.

The opening frame therefore keeps the center copy/CTAs clear and avoids card-to-card collisions.

## Final dashboard layout
The dock grid uses the reference hierarchy:

1. Top row: Qualified Inquiries / Appointments / Profile Views / Today's Schedule.
2. Main body: Patient Inquiries chart on the left; New Inquiries and Local Visibility stacked on the right.
3. Lower rows: Google Business Profile optimized and Campaign live.

Because these are real grid slots inside the shell, responsive resizing cannot make the cards miss their final target.

## GSAP behavior
- One synchronized timeline controls all nine cards.
- Desktop settle distance: `420px`.
- Tablet settle distance: `360px`.
- Scrub smoothing: `0.13` desktop / `0.16` tablet.
- The dashboard shell stays fixed while only card transforms animate.
- Overflow is kept visible during travel and switches to clipped only at the true docked end-state.
- Hover interaction is unchanged and only activates once assembly is effectively complete.

## Responsive behavior
- Desktop / large desktop: full scattered-to-docked sequence.
- Tablet: the single dashboard box scales as one object, preserving exact card geometry.
- Mobile <= 620px: scatter animation is disabled and the same card set becomes a readable static responsive grid.
- Reduced-motion: fully assembled static state.

## Files changed
- `src/client/components/HeroParallaxDashboard.tsx`
- `src/client/lib/useGsapAnimations.ts`
- `public/static/home-hero-reference-dock-v33.css` (new)
- `src/index.tsx`
- `src/renderer.tsx`
- `scripts/fresh-install-preflight.mjs`

## Static QA
- V33 stylesheet brace integrity: PASS.
- V33 stylesheet loads after V31, so previous V27 final-coordinate overrides cannot win the cascade.
- React source no longer uses the V27 data attribute.
- All moving modules are descendants of the one dashboard shell/grid.
- TypeScript parse reached only expected missing-dependency/type-resolution diagnostics in this sandbox; no syntax-class diagnostic was produced for the changed source.

A full local visual pass should be run with `npm ci` / `npm run dev` on the development machine because this sandbox cannot complete package installation/browser rendering.
