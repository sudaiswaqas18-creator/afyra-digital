# Digital Presence Hero Video Parity V39 — 2026-09-08

Scope: `/solutions/digital-presence-advanced-systems` hero only.

Implemented:
- Preserved the approved central Afyra logo/rings and rising app-icon motion.
- Re-graded the existing `digital-presence-flow.mp4` in place using Afyra’s teal/amber palette while preserving the original motion.
- Kept two identical video instances, one per side.
- Rebuilt both video containers so their inner tips converge behind the central logo circle instead of floating as separate blocks.
- Corrected tilt direction to match the supplied reference: outer edges sit higher, inner ends descend into the center.
- Replaced the opaque green overlay/slab treatment with transparent curved SVG alpha masks and a very light center glow.
- Mirrored the right video for symmetrical flow.
- Removed only the oversized global hero pseudo-rings that were visually crossing the streams; existing background/noise/edge-dot styling remains.
- Disabled the old layout-03 wing-container wobble; motion now comes cleanly from the looping video itself. Existing rising app-icon animation is untouched.
- Added responsive wing geometry for desktop, tablet and mobile.

Files added:
- `public/static/digital-presence-hero-reference-v39.css`
- `public/static/ref-solutions/digital-presence-wing-left-v39.svg`
- `public/static/ref-solutions/digital-presence-wing-right-v39.svg`

Files modified:
- `src/client/components/ReferenceSolutionExperience.tsx`
- `src/client/lib/useReferenceSolutionAnimations.ts`
- `src/index.tsx`
