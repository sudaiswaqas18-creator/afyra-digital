# Web Development Interaction Fixes — v17

Scope: `/solutions/website-development` only.

## Implemented
1. Hero editor mockup now starts in a stronger 3D perspective state with visible corner anchors and straightens to flat with GSAP ScrollTrigger scrub.
2. Website Directions category pills are real interactive tabs; selecting a category updates/reorders the 2x2 preview grid with an entrance transition.
3. How It Works dome now has an in-view continuous moving teal/amber color sweep plus the existing subtle breathing motion.
4. Current Programs was rebuilt as a dark three-card SaaS-style pricing layout using the approved Afyra plans and current PKR monthly prices. The billing toggle is interactive. No unapproved yearly prices or discounts were invented; yearly selection clearly states that annual pricing is not published.
5. Trust & Proof border tracer was strengthened and its GSAP loop made more visible, with each row using its own existing accent family.

## Files changed
- `webapp/src/client/components/ReferenceSolutionExperience.tsx`
- `webapp/src/client/lib/useReferenceSolutionAnimations.ts`
- `webapp/src/renderer.tsx`
- `webapp/src/index.tsx`
- `webapp/public/static/web-development-v17.css` (new)

## Verification
- Target TS/TSX files: 0 TypeScript transpile/syntax diagnostics.
- Full project typecheck/build remains unavailable from the supplied dependency tree because React type packages/Vite executable are not present in the included `node_modules` snapshot.
