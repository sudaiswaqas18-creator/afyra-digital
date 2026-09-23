# Afyra Digital — Patient Acquisition Final Interaction Polish V28
Date: 2026-09-08
Scope: `/solutions/patient-acquisition-lead-generation`

## Implemented

### 1. Pricing fan → straight scroll animation
- Rebuilt the Patient Acquisition pricing animation around the actual pricing grid instead of the whole section so the tilted/fanned state remains visible when the cards first enter the viewport.
- Desktop starts as a three-card fan with the Patient Growth Plan elevated in front, then scrubs into a straight three-column layout.
- Tablet/mobile use smaller bounded rotations and offsets so the same motion language remains responsive without horizontal clipping.
- Added a short scrubbed hold before the straighten phase so the first state is visibly readable rather than being skipped.
- Added paint-time starting transforms in `patient-acquisition-v28.css` to prevent a brief flat-card flash before the GSAP effect attaches.
- `prefers-reduced-motion` falls back to the straight static layout.

### 2. Process / How We Work fully loaded immediately
- Removed the Patient Acquisition-only pinned/sequential opacity reveal that was leaving three cards faded until extra scrolling.
- The solution page now reuses the homepage Process content exactly:
  1. Discovery & Consultation
  2. Strategy & Positioning
  3. Build & Launch
  4. Manage, Report & Scale
- All four cards, the section description and center hub are forced into their complete visible state as soon as the section is present.
- Reuses the exact shared `setupProcessCardHover()` helper used by the homepage.
- Added the same slow breathing treatment to the center hub glow so the logo/glow reads like the homepage implementation.
- Added a late scoped CSS override so a previously retained `html.af-js .af-reveal` state cannot hide the hub/description after SPA navigation from the homepage.

### 3. Hero logo cursor micro-parallax
- Added a dedicated `data-rs-patient-hero-logo` hook to the real Afyra logo mark.
- On fine-pointer desktop devices, moving anywhere inside the hero produces a bounded GSAP nudge (max ~9px horizontal / ~7px vertical).
- The ring and glow stay stationary; only the logo mark moves.
- Pointer leave/cancel returns the mark smoothly to center.
- Touch/coarse-pointer devices remain static.

## Files changed
- `src/client/components/ReferenceSolutionExperience.tsx`
- `src/client/lib/useReferenceSolutionAnimations.ts`
- `src/renderer.tsx`
- `src/index.tsx`
- `public/static/patient-acquisition-v28.css` (new)

## QA performed
- TypeScript/TSX syntax transpilation check passed for every modified TS/TSX file using TypeScript 5.8.3.
- CSS brace/parsing check passed (`tinycss2`).
- Static source assertions confirm:
  - pricing uses responsive GSAP matchMedia fan poses and grid-based ScrollTrigger,
  - no Patient Acquisition Process pin/sequential reveal remains,
  - homepage Process hover helper is reused,
  - Process cards/hub/description have a scoped visibility override,
  - hero logo cursor behavior is fine-pointer-only,
  - V28 CSS is loaded after V27 in both render paths.

## Build/runtime note
The supplied archive did not include `node_modules`. A dependency install was attempted in the sandbox but could not complete within the available package-install environment, so a full Vite browser build/runtime pass could not be executed here. The source changes themselves passed syntax/static QA. Run the project normally with its dependencies installed to perform the final interactive browser pass at the requested breakpoints.
