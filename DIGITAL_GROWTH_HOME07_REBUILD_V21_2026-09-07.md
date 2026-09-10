# Digital Growth & Marketing Strategy — Home 07 Rebuild v21

Route: `/solutions/digital-growth-marketing-strategy`
Reference language: SaaS King Home 07 (FinTech)

## Implemented

1. Dedicated Home-07 hero for layout `07` with generated Afyra growth-dashboard phone-in-hand visual, right-side metric cards, entrance motion and scroll-linked settle/parallax.
2. Rebuilt Growth System as a large connected visual theater using the existing Afyra growth system artwork plus floating strategy/channel pills and metric panels.
3. Added a scroll-scrubbed large statement whose words progressively transition from muted to Afyra dark green, with inline branded icon pills.
4. Added pinned Start Quickly sequence with three overlapping stages and progress bars that fill as the scroll advances. Mobile/tablet falls back to readable stacked cards rather than a fragile pin.
5. Rebuilt Growth Roadmap around a long S-curve SVG with progressive stroke draw and step-by-step reveals.
6. Rebuilt Current Programs presentation while preserving the canonical plan names, PKR prices, inclusions and terms. The reference-style “Annually billed” controls are visual/disabled because annual prices are not part of the approved Afyra program data.
7. Rebuilt Connected Touchpoints as a curved wave with alternating nodes, sequential line draw and pulsing spark accents.
8. Rebuilt System Experience as a wide integration field with Afyra logo core, semantic strategy/channel icons, dashed connector paths and bottom-to-top GSAP reveal.
9. Rebuilt FAQ as a two-column support + accordion section with GSAP expand/collapse and hover state.
10. Preserved the pre-existing Trust & Proof section and final CTA because neither was requested for removal.

## Files changed

- `src/client/components/ReferenceSolutionExperience.tsx`
- `src/client/lib/useReferenceSolutionAnimations.ts`
- `src/renderer.tsx`
- `src/index.tsx`
- `public/static/digital-growth-home07-v21.css`
- `public/static/ref-solutions/growth-strategy-phone-hand.webp`

## Verification performed

- TypeScript/TSX syntax transpilation check passed for all modified TS/TSX files using the installed global TypeScript compiler API.
- New CSS brace balance verified: 276 opening / 276 closing braces.
- Layout `07` now renders only through the dedicated `GrowthStrategyReferencePage`; other solution layouts retain their existing components.
- Existing canonical `programs.plans` and program terms were not edited.
- Full Vite/browser build could not be executed in this packaged archive because the included `node_modules` snapshot does not contain executable Vite/React package payloads. The original packaged `node_modules` snapshot was restored after the attempted dependency check so the delivered project does not contain a partially modified dependency tree.
