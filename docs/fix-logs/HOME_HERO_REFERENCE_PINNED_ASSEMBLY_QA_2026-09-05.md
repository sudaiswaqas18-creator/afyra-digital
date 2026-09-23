# Afyra Homepage Hero — Reference-Style Pinned Assembly QA

Date: 2026-09-05

## Goal
Match the interaction described from the SaaSking homepage more closely: the dashboard modules begin high and scattered around the hero, converge smoothly while the visitor scrolls, dock exactly into one dashboard frame, and the dashboard must not scroll away before docking is complete.

## Changes

1. **Reference-like opening composition**
   - Scatter offsets were increased and redistributed so the KPI/cards begin around the upper/side edges of the hero rather than hovering close to the final dashboard.
   - The dashboard frame was moved upward inside the visual stage (`top: 28px`) so its upper edge is already visible near the lower part of the opening viewport, similar to the supplied reference screenshot.

2. **Two-phase scroll behavior**
   - Assembly begins from the top of the hero (`start: top top`).
   - The dashboard stage moves naturally with the page first.
   - When the stage reaches 82px from the viewport top, ScrollTrigger pins the stage.
   - The stage remains pinned for `clamp(820px, 1.08 × viewport height, 1160px)` of additional scrolling.

3. **Smoother scrub**
   - Scroll-linked animation uses `ease: none` and `scrub: 1.2`.
   - Moving modules remain GPU-transform-only (`x`, `y`, `rotation`, `scale`, `opacity`) with `force3D` and no moving backdrop-filter.

4. **Exact docking**
   - Cards still live in their real final CSS Grid positions.
   - GSAP never animates toward approximate left/top coordinates. It only removes the starting transform.
   - At docking: `x: 0`, `y: 0`, `rotation: 0`, `scale: 1`.

5. **Dashboard cannot disappear early**
   - Cards finish docking at 88% of the scroll timeline.
   - The remaining 12% is a deliberate pinned hold with the dashboard fully assembled before release.

6. **Final overflow protection**
   - At >=96.5% progress the root receives `af-hpd--docked`.
   - The final board switches to `overflow: hidden`, guaranteeing that the completed state cannot draw outside the dashboard frame.
   - Scattered states remain overflow-visible while they need to travel from outside the frame.

## Desktop geometry check (1728px viewport)
Board bounds: **x 333.0–1395.0, y 28.0–568.0** relative to the stage.

All nine final modules are contained inside those bounds: **PASS**.
Final module overlap pairs: **0**.

## Files changed
- `src/client/components/HeroParallaxDashboard.tsx`
- `src/client/lib/useGsapAnimations.ts`
- `public/static/sections.css`
- `public/static/home-hero-parallax-2026-09-05.js`

The production compatibility script was updated in parallel with the React source because the packaged `client.js` still contains the older homepage hero.

## Validation
- Production compatibility JS syntax: **PASS** (`node --check`)
- CSS brace balance: **PASS**
- Final desktop grid containment: **PASS**
- Final desktop overlap check: **PASS (0 overlaps)**
- Fresh TypeScript/Vite build: **not available in this container because project dependencies/node_modules are absent (`vite/client` types missing)**
- Automated local Chromium visual capture: **blocked by the managed Chromium URL policy in this environment**, so no false claim of browser-rendered visual QA is made.
