# Afyra Digital — Homepage Hero Precision Scroll Assembly QA

Date: 2026-09-05
Scope: Homepage hero only — scatter → scroll → exact dashboard assembly
Reference behavior: SaaSking-style scroll-linked assembly, implemented with Afyra's own dashboard content and brand system.

## Why the previous hero felt less precise

The previous implementation mixed two coordinate systems: moving cards were positioned against the overall hero root while the visual dashboard slots lived inside a nested board/shell. Even when a card's transform reached its programmed endpoint, the endpoint was only an approximation of the nested slot. The previous choreography also used unequal card timing, additional board motion, and nested/global paragraph reveals, which could make the composition feel less synchronized while scrolling.

## Precision fix implemented

### 1. One final docking coordinate system

All nine moving modules now live inside one `.af-hpd__dock` CSS Grid inside the dashboard board. Each card is physically laid out in its final slot before animation begins.

GSAP does not animate `left`, `top`, or approximate target percentages. It only removes a card's scatter transform:

- scattered state: custom X/Y + rotation + scale
- assembled state: `x: 0`, `y: 0`, `rotation: 0`, `scale: 1`

Therefore the completed scroll state is the real CSS layout itself, not a visually estimated landing point.

### 2. Synchronized scroll timeline

Desktop hero modules share one 0→1 ScrollTrigger interval with no card-by-card landing delay. Natural depth comes from different scatter distances, not different finish times.

Current desktop settings:

- trigger: hero stage
- start: `top 58%`
- end: viewport-aware 720–900 px range
- scrub: `0.85`
- ease: `none`
- `invalidateOnRefresh: true`
- `autoRound: false`
- GPU-backed transforms (`force3D`)

All cards reach the exact final state together at timeline completion.

### 3. Removed conflicting motion

- Removed moving-board translation from the assembly choreography.
- Removed final hero root micro-rotation.
- Removed the old fake/ghost slot grid.
- Prevented generic site-wide paragraph reveal animations from animating text inside moving hero modules.
- Added a production CSS guard so hero card copy cannot receive a second transform/opacity animation from the older packaged client.

### 4. Lower-cost moving layers

Moving hero cards no longer use `backdrop-filter` during the scrubbed animation. This reduces expensive per-frame compositing work while keeping the same dark premium visual direction.

### 5. Production compatibility fixed

The current packaged `public/static/client.js` contains the older homepage hero. `public/static/home-hero-parallax-2026-09-05.js` now:

- detects a fresh source-rendered precision hero and does nothing, avoiding double animation;
- otherwise hides the old packaged hero without cloning/reparenting React nodes;
- kills legacy hero tweens/ScrollTriggers;
- mounts one precision dashboard using the same docking grid and scatter values as source;
- applies the same scroll-linked assembly timeline;
- contains zero `cloneNode` usage.

## Responsive behavior

- > 960 px: full scroll-linked scatter → exact assembly.
- 621–960 px: fully docked responsive dashboard with a lighter entrance animation; heavy scrub disabled.
- ≤ 620 px: safe one-column flow; no absolute-card collision risk.
- `prefers-reduced-motion: reduce`: assembled state, no scrub transforms.

## Structural validation

- `HeroParallaxDashboard.tsx` TypeScript/TSX transpile syntax: PASS
- `useGsapAnimations.ts` TypeScript transpile syntax: PASS
- Production compatibility JS `node --check`: PASS
- CSS brace integrity: PASS (522 opening / 522 closing)
- Required source hero labels: exactly 1 occurrence each
- Production runtime `cloneNode`: 0 occurrences
- Shared source/runtime scatter values: matched

## Deterministic desktop geometry check

Reference calculation: 1440 px hero root, 1062 px board, production CSS docking grid.

Final non-overlapping areas:

- Qualified Inquiries: row 1 / col 1
- Appointments: row 1 / col 2
- Profile Views: row 1 / col 3
- Today's Schedule: row 1 / col 4
- Patient Inquiries: rows 2–3 / cols 1–3
- New Inquiries: row 2 / col 4
- Local Visibility: row 3 / col 4
- Google Business Profile optimized: row 4 / cols 1–2
- Campaign live: row 4 / cols 3–4

AABB collision sampling including interpolated scale/rotation was checked at scroll progress 0%, 25%, 50%, 75%, and 100%: **0 pairwise intersections at every sampled point**.

## Environment limitation

A full fresh Vite/npm production rebuild could not be executed in this sandbox because the project dependencies are not installed locally and external package installation is unavailable here. To compensate, both layers were updated:

1. the real React/GSAP source for the next normal build; and
2. the already-packaged production compatibility runtime used by the current project.

The source files were syntax-transpiled with the available TypeScript compiler, the runtime module passed Node syntax validation, CSS integrity was checked, and the final docking geometry was validated deterministically. A normal developer environment can run `npm install` followed by `npm run build` to regenerate the bundled client from the updated source.
