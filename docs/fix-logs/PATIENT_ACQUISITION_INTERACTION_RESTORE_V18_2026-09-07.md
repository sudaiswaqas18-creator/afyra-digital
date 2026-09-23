# Patient Acquisition & Lead Generation — Interaction Restore v18

Date: 2026-09-07
Scope: `/solutions/patient-acquisition-lead-generation`

## Completed fixes

1. **Hero brand graphic**
   - Replaced the generic AI/dashboard circle with the Afyra Digital logo mark.
   - Preserved the circular glow/orbit treatment around the mark.

2. **Inquiry card continuous hover color chain**
   - Limited the shared hover-chain effect to the three small Inquiry cards: Discovery, Response, and Qualification.
   - The GSAP-driven color/angle state persists between cards, so moving from one card to another continues from the current animation phase instead of restarting.
   - Uses Afyra teal (`#00BBA0`) and amber (`#FF960D`).

3. **Pricing tilt-to-straight scroll animation**
   - Re-enabled the GSAP + ScrollTrigger scrub animation for all three program cards.
   - Left/right cards enter tilted and offset; the featured Patient Growth Plan starts elevated/forward; all settle to a straight aligned state as the section is scrolled.
   - Program names and approved monthly pricing remain unchanged.

4. **Integrations ring / glass orbit**
   - Rebuilt the platform visual around a visible circular ring.
   - Platform badges sit on the ring and continuously orbit with GSAP.
   - Side glass panels use backdrop blur so badges passing behind them appear frosted.
   - Ring/glow styling uses Afyra teal/amber.

5. **System Experience → homepage Process mechanics**
   - The Patient Acquisition System Experience uses the shared homepage Process layout/mechanics.
   - The exact same shared process-card hover helper is used by both homepage and Patient Acquisition.
   - The patient page keeps page-specific four-step content while preserving the homepage pin/sequential-reveal behavior.

## Main files changed

- `src/client/components/ReferenceSolutionExperience.tsx`
- `src/client/lib/useReferenceSolutionAnimations.ts`
- `src/client/lib/useGsapAnimations.ts`
- `src/client/lib/processCardMotion.ts`
- `public/static/patient-acquisition-v18.css`
- `src/index.tsx`
- `src/renderer.tsx`

## Validation

- TypeScript/TSX source syntax/transpile checks passed for all modified source files.
- CSS block structure check passed.
- Full production Vite build was not executable from the supplied package because its bundled `node_modules` is intentionally incomplete and does not include the Vite CLI runtime. No source syntax error was found in the modified files.
