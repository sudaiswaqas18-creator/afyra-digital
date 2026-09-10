# Website Development — Current Programs Runtime Fix (v19)

Date: 2026-09-07

## Root cause

`WebsiteCurrentPrograms` in `src/client/components/ReferenceSolutionExperience.tsx` rendered the pricing checklist with:

```tsx
plan.features.slice(0, 5)
```

The canonical program data in `src/client/data/content.ts` does **not** use a `features` field. All three approved programs use the `includes` array instead. Therefore `plan.features` was `undefined`, and calling `.slice()` crashed the entire Website Development route.

## Fix

- Replaced the incorrect `plan.features` access with the canonical `plan.includes` data.
- Added an `Array.isArray(plan.includes)` normalization guard so missing/malformed checklist data renders an empty list instead of crashing the page.
- Added a defensive numeric guard around `plan.price` so malformed pricing data renders an em dash rather than throwing during `toLocaleString()`.
- No pricing, plan names, terms, layout, colors, or animation behavior were changed.

## Data verification

Verified all three canonical plans contain numeric prices and valid `includes` arrays:

- Starter Presence — PKR 38,000
- Patient Growth Plan — PKR 66,500
- Authority Building Plan — PKR 128,500

The first five checklist items for each plan can now be safely rendered by `WebsiteCurrentPrograms`.

## Scope / regression safety

`WebsiteCurrentPrograms` is used only inside `WebsiteDevelopmentReferencePage`, which is rendered only for solution layout `05` (Website Development). Other solution layouts are not routed through this component, so this patch does not alter their rendering paths.

## Responsive verification

Existing Website Development pricing CSS remains unchanged and already includes:

- desktop: 3-column pricing grid;
- <= 1050px: single-column responsive stack with automatic card height;
- <= 760px: reduced section/card padding, responsive heading/price sizing, wrapping billing toggle, and mobile spacing.

## Validation performed

- TypeScript/TSX transpile syntax check of `ReferenceSolutionExperience.tsx`: PASS.
- Runtime sanity check of the canonical `programs.plans` data: PASS for all 3 plans.
- Verified no remaining `plan.features` reference exists in `WebsiteCurrentPrograms`.
- Verified patch changes only the pricing-map rendering block in `ReferenceSolutionExperience.tsx` plus this QA note.

A full Vite browser build could not be executed in the packaged source because its bundled `node_modules` is intentionally incomplete (the Vite/React runtime package contents are not present). The source-level crash path itself is resolved and guarded.
