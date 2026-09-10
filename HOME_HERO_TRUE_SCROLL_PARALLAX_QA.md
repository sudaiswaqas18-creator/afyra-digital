# Afyra Digital — Home Hero True ScrollTrigger Parallax Fix

Date: 2026-09-05

## Problem corrected

The previous hero pass wrapped a complete Dashboard (which already contained KPI cards and activity rows) and then rendered another set of the same KPI/activity content above it. That created duplicated content and collision risk.

## New composition

The hero now contains exactly one visual instance of each requested dashboard element:

1. Main Patient Inquiries dashboard/chart panel
2. New Inquiries
3. Today's Schedule
4. Qualified Inquiries
5. Appointments
6. Profile Views
7. Local Visibility
8. Google Business Profile optimized
9. Campaign live — Aesthetic consultations

The three KPI elements and two activity rows are not duplicated inside the dashboard core.

## True ScrollTrigger parallax

Desktop (> 960px) uses independent `gsap.to()` ScrollTriggers with continuous scroll-linked transforms:

- Main dashboard: `yPercent: -5`
- Today's Schedule: `-15`
- New Inquiries: `-18`
- Appointments: `-20`
- Qualified Inquiries: `-24`
- Local Visibility: `-26`
- Profile Views: `-30`
- Google Business Profile row: `-32`
- Campaign live row: `-35`

All use the hero section as their trigger:

- `start: "top top"`
- `end: "bottom top"`
- `scrub: 1`
- `ease: "none"`
- `invalidateOnRefresh: true`

Two glow layers use their own slower scroll-linked `yPercent`, `xPercent`, and scale values.

## Collision prevention

The desktop layout was re-spaced so peripheral cards sit outside or below the main dashboard footprint. The movement is intentionally vertical-only on content cards; x/rotation drift from the prior implementation was removed because it could create collisions.

A conservative rectangle check at 0%, 25%, 50%, 75%, and 100% parallax progress found zero pairwise content-card intersections for the desktop reference geometry.

## Responsive behavior

- Above 960px: full ScrollTrigger parallax.
- 621–960px: static layered composition with entrance animation only; no scrubbed movement.
- 620px and below: safe one-column dashboard/card flow; no absolute-position collisions.
- `prefers-reduced-motion`: transforms disabled.

## Source/runtime compatibility

- Fresh Vite builds use `HeroParallaxDashboard.tsx` + `useGsapAnimations.ts`.
- The packaged legacy production client is corrected by `public/static/home-hero-parallax-2026-09-05.js`.
- That compatibility script moves the original KPI/activity DOM nodes; it does not clone them.
- If a fresh React build already renders the new source component, the compatibility script detects it and does not mount a second animation.

## Validation

- `HeroParallaxDashboard.tsx`: TypeScript transpile syntax PASS
- `useGsapAnimations.ts`: TypeScript transpile syntax PASS
- Runtime compatibility JS: `node --check` PASS
- `sections.css`: brace/integrity check PASS
- Duplicate KPI/activity rendering in source hero: removed
- Runtime DOM cloning: none
