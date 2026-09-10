# Afyra Digital — Requested GSAP Refinements (Rev 2)

Implemented changes:

1. **Hero assembly improved**
   - Faster single-scroll docking for desktop/tablet.
   - Tablet/mobile support added so the animation also performs on smaller screens.
   - Reduced long-scroll feeling so all hero cards settle together more quickly.
   - Better responsive scatter scaling through `--af-scatter-mult`.

2. **Sitewide six-card light treatment**
   - Expanded selectors so more six-card layouts across homepage/service pages receive the SaaSking-style moving border + icon ring effects.
   - Existing hover lift effect preserved.

3. **Programs / pricing orbit updated**
   - Reworked the left orbit to use app-style icon tiles instead of image cards.
   - Continuous GSAP orbit retained and refined.
   - Entrance animation for orbit items preserved.
   - Beam / logo-to-card illumination kept.

Modified files:
- `src/client/lib/useGsapAnimations.ts`
- `src/client/lib/useSaasKingEffects.ts`
- `src/client/components/Programs.tsx`
- `public/static/sections.css`
- `public/static/saasking-motion.css`

Notes:
- This revision is source-level and ready for your normal install/build flow.
- Full visual QA in browser is still recommended on your machine for final pixel-perfect tuning.
