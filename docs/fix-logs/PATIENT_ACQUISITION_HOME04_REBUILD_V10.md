# Patient Acquisition & Lead Generation — Home 04 Rebuild V10

Updated the `Patient Acquisition & Lead Generation` solution page to follow the requested SaaS King Home-04 layout and GSAP motion mechanics while preserving Afyra Digital branding/content.

## Implemented
1. Centered hero composition with layered Afyra arch glow, visual, badge, heading, CTAs and healthcare trust row.
2. Inquiry section rebuilt as one large feature panel + three supporting cards with a shared GSAP hover color-progress chain across all cards.
3. Growth System rebuilt as a normal static/stagger-reveal feature grid with no pin/scroll lock.
4. Pricing cards now start in a tilted/fanned perspective state and straighten into alignment with scroll-scrubbed GSAP motion.
5. Connected Touchpoints rebuilt as a semi-circular arc with platform icons and two translucent side glass panels; icons move continuously along the shared arc.
6. System Experience rebuilt with a central Afyra visual and four patient-acquisition steps using a pinned sequential scroll reveal.
7. FAQ rebuilt as a two-column layout with contact block and GSAP animated accordion open/close behavior.

## Files changed
- `src/client/components/ReferenceSolutionExperience.tsx`
- `src/client/lib/useReferenceSolutionAnimations.ts`
- `public/static/saasking-reference-solutions.css`

## QA
- TS/TSX syntax transpilation check passed for both changed TypeScript files.
- Full project `tsc --noEmit` remains unavailable as a clean validation signal in this sandbox because the extracted project is missing its React/router/Hono type dependencies.
