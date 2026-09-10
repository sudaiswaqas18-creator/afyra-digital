# Homepage Reference Polish V45 — 2026-09-09

Scope: homepage only.

## 1. Hero opening scatter
- Repositioned the 10 moving dashboard child cards to reproduce the supplied SaaS King reference composition more closely at page load.
- Stronger corner/edge dispersion on desktop: KPI cards at upper corners, chart on the left, message card left-center, utility cards on the right, and the two activity rows crossing the main dashboard before docking.
- Raised the parent dashboard approximately 90px on wide desktop so its visual relationship to the hero title matches the supplied reference more closely.
- Existing scroll assembly remains source-owned by `useGsapAnimations.ts`: every card still resolves to its exact docked grid slot with x/y/rotation -> 0.
- Tablet/mobile behavior remains controlled by the existing responsive assembly logic.

## 2. Approach — Built for Real Business Outcomes
- Added a dedicated `data-af-feature-reference` animation path so this bento does not use the generic card stagger.
- Desktop reveal now uses directional entry, slight rotation, scale, clip-path opening and sequential timing modeled on the supplied reference card display.
- Added GSAP hover lift/scale + glow response.
- Kept Afyra content, imagery and brand colors.
- Refined card proportions to the supplied asymmetric 2x2 bento geometry.

## 3. FAQ arc
- Kept the existing curved arc, but added a stronger underside halo and controlled teal light bloom.
- Added ten individual sparkles with one restrained amber accent.
- Added GSAP entrance for line, halo and sparkles plus lightweight CSS twinkle after entrance.
- All colors stay inside Afyra palette: #DEF1F0, #00BBA0, #00443E, #FF960D.

## Files changed
- `src/client/components/HeroParallaxDashboard.tsx`
- `src/client/components/Features.tsx`
- `src/client/components/Faqs.tsx`
- `src/client/lib/useGsapAnimations.ts`
- `src/renderer.tsx`
- `public/static/home-reference-polish-v45.css` (new)

## Build note
This archive intentionally does not add `node_modules`. The sandbox cannot complete a full Vite build because the project dependency tree is not installed here. Run `npm install && npm run build` in the same Linux/dev environment used to verify V43/V44.
