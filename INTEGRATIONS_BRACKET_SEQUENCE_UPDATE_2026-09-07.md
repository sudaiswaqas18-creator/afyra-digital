# Digital Presence — Integrations Sequence + Connected Platforms Fix

Updated the `Digital Presence / Advanced Digital Systems` page to match the supplied Home-03 interaction sequence more closely.

## Integrations section
- Rebuilt as a two-phase, scroll-scrubbed GSAP sequence.
- Phase 1: heading + description only.
- Phase 2: intro fades out, center orb reveals, then platform icons arrive one-by-one into a calculated circular/elliptical orbit.
- Section is pinned only for the duration of the sequence, then releases normally.
- Responsive orbit radii are recalculated for desktop/tablet/mobile.
- Generic integration reveal animation is excluded for this sequenced section to avoid conflicts.

## Connected Platforms strip
- Marquee now runs continuously on both sides without reserving a large empty center column.
- Center label is overlaid instead of taking layout width.
- Both bracket lines start at the exact center (closed state).
- GSAP ScrollTrigger moves them outward to reveal the centered `CONNECTED PLATFORMS` label.
- Bracket caps and label are vertically aligned and compact.

## Spacing
- Tightened the transition from the platforms strip into the next pinned section so the next heading no longer sits far down inside a blank viewport.

## Files changed
- `src/client/components/ReferenceSolutionExperience.tsx`
- `src/client/lib/useReferenceSolutionAnimations.ts`
- `public/static/saasking-reference-solutions.css`
