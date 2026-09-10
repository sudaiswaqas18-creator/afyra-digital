# Patient Acquisition — Pricing + Process Update V14

Updated `/solutions/patient-acquisition-lead-generation` based on the requested fixes.

## 1. Pricing scroll animation
- Pricing cards now have an explicit GSAP starting fan state before the ScrollTrigger begins.
- Left and right cards start rotated outward, lower and slightly smaller.
- The featured Patient Growth Plan starts elevated, slightly larger and forward in depth.
- Scroll scrubbing brings all three cards into the existing aligned final layout.

## 2. System Experience replaced with the homepage Process component
- The old broken `pa-system` layout is no longer rendered on the Patient Acquisition page.
- `Process.tsx` was refactored into a reusable `ProcessLayout` component while preserving the homepage default output.
- The Patient Acquisition page now renders that exact shared Process layout: two cards left, two cards right, center Afyra hub, connector lines, numbered background markers and the same process-card hover hooks.
- Only the four card texts are patient-acquisition specific.
- The Patient Acquisition instance uses a pinned sequential GSAP reveal so cards appear in order before the section releases.

## Files changed
- `src/client/components/Process.tsx`
- `src/client/components/ReferenceSolutionExperience.tsx`
- `src/client/lib/useReferenceSolutionAnimations.ts`
- `public/static/saasking-reference-solutions.css`
