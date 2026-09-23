# Digital Presence Static Wings + Trust Reveal V41

Scope: `/solutions/digital-presence-advanced-systems`

## Hero
- Retires the visible twin video slabs for the Digital Presence hero only.
- Keeps the existing center Afyra logo circle and the existing rising app-icon loop untouched.
- Adds a newly generated Afyra-palette static wing artwork built around `#DEF1F0`, `#00BBA0`, `#00443E`, and `#FF960D`.
- The generated artwork is converted into a transparent wing-only layer so generated text, logo and app icons do not duplicate the real website elements.
- V39 video elements remain in source for compatibility but are hidden by the V41 final override.

## Connected platforms strip
- Reworks the strip into the requested closed-bracket -> open-bracket sequence.
- Platform labels remain visible in the strip while the two illuminated center gates open outward as the user scrolls.
- The center label fades/scales in as the gates open.
- Curved teal/amber energy rails expand with scroll progress.
- Existing continuous platform marquee movement remains intact.

## Files
- `public/static/ref-solutions/digital-presence-wings-afyra-v41.png`
- `public/static/digital-presence-static-wings-trust-v41.css`
- `public/static/digital-presence-v41-runtime.js`
- `src/client/lib/useReferenceSolutionAnimations.ts`
- `src/index.tsx`
- `src/renderer.tsx`

## Compatibility
A lightweight V41 runtime is included so the new trust opening behavior is available from the packaged static assets even before a local client rebuild.
