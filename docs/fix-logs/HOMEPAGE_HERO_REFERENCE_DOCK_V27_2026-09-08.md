# Homepage Hero — Reference Dock V27
Date: 2026-09-08

## Scope
Final homepage hero correction based on the supplied SaaS King Task Management hero screenshots.

## Root causes corrected
1. The dashboard shell and animated cards did not share the same final docking coordinate box.
2. V25 used resting coordinates around the outside of the dashboard, so cards could never finish inside the dashboard like the reference.
3. Scatter offsets had been reduced to small values, losing the wide reference composition seen before scrolling.
4. Multiple production compatibility scripts could take ownership of the same hero ScrollTrigger and re-parent/re-animate the cards, creating competing transforms and unstable motion.

## Final structure
- One `.af-hpd__unified-box` owns the central dashboard shell and all nine animated cards.
- Cards are direct children of that same box.
- Card CSS coordinates are their actual final/docked dashboard positions.
- GSAP only controls temporary `x/y/rotation/scale` scatter transforms; it does not move cards between wrappers or recalculate their layout while scrolling.
- The central dashboard shell is a fixed anchor and is not scaled or shifted by the card assembly timeline.

## Reference-position mapping
Initial scatter was calibrated to reproduce the supplied reference composition:
- Qualified Inquiries: high left.
- Patient Inquiries chart: far left, angled outward.
- New Inquiries: left/center overlap.
- Appointments: high right.
- Today's Schedule: upper right.
- Profile Views: far right.
- Local Visibility: lower right.
- Google Business Profile / Campaign rows: lower supporting modules.

At the end of the scrub, every card has `x:0`, `y:0`, `rotation:0`, `scale:1` and sits upright inside the dashboard layout.

## Scroll behavior
Desktop:
- Trigger: hero section
- Start: `top top`
- Finish range: `+=240px`
- Scrub: `0.10`

Tablet:
- Finish range: `+=200px`
- Scrub: `0.14`

This intentionally creates the fast, synchronized settle requested, without pinning the hero and without the prior slow/disjointed drift.

## Responsive behavior
- Desktop: full reference scatter/dock composition.
- Tablet: the complete unified dashboard box scales as one object, preserving card-to-card geometry.
- Mobile <= 620px: complex scatter is disabled and the same unified parent switches to a readable static grid to prevent clipping/overlap.
- Reduced-motion users receive a fully assembled static state.

## Compatibility conflict removal
- `home-final-polish-v23.js` no longer animates fresh-source or precision-runtime hero assemblies.
- `home-hero-unified-v25.js` no longer touches those assemblies and is removed from the production compatibility chain.
- `home-hero-parallax-2026-09-05.js` was upgraded to the same V27 one-box architecture for older packaged `client.js` fallback builds.
- Fresh builds are owned only by `useGsapAnimations.ts`.

## Files changed
- `webapp/src/client/components/HeroParallaxDashboard.tsx`
- `webapp/src/client/lib/useGsapAnimations.ts`
- `webapp/public/static/home-hero-reference-dock-v27.css` (new)
- `webapp/public/static/home-hero-parallax-2026-09-05.js`
- `webapp/public/static/home-final-polish-v23.js`
- `webapp/public/static/home-hero-unified-v25.js`
- `webapp/src/index.tsx`
- `webapp/src/renderer.tsx`
- `webapp/scripts/fresh-install-preflight.mjs`

## Static QA completed
- JavaScript syntax check: PASS for changed compatibility scripts.
- CSS brace/integrity check: PASS.
- React source has no `.af-hpd__dock` split wrapper.
- Runtime fallback has no `.af-hpd__dock` split wrapper.
- V27 stylesheet is loaded last, after V26, so older hero positioning rules cannot override it.

## Build note
The sandbox copy did not include installed npm dependencies. `npm run build` could not complete because `vite` was unavailable and the environment could not finish downloading packages. This is an environment/dependency-install limitation rather than a source syntax failure. Run a normal `npm install` / `npm ci` followed by `npm run build` in the development machine or deployment environment.
