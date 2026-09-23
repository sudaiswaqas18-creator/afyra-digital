# Brand & Creative Communication — Hero Card Stability Fix

Updated from `Afyra-Digital-Brand-Communication-User-Fixes-2026-09-06-v2.zip`.

## Fixes applied
- Removed the ResizeObserver-driven hero-card sizing that changed the right-side card height when the animated left text box changed.
- Removed continuous vertical bobbing from the hero's decorative cards so the hero visual no longer appears to scroll down by itself.
- Kept only the intended front/back vertical 3D flip animation on the main dashboard card.
- Disabled legacy CSS transform transitions on the main flip element so they do not fight GSAP frame updates.
- Added a final hero-specific stylesheet loaded last to neutralize conflicting historical hero overrides.
- Rebuilt the hero responsive sizing rules for desktop, laptop, tablet, and mobile.

## Important files
- `src/client/lib/useServiceAnimations.ts`
- `src/index.tsx`
- `src/renderer.tsx`
- `public/static/brand-hero-stability-fix.css`

## Local run
From `webapp`:

```bash
npm install
npm run dev
```

The archive intentionally does not include `node_modules`; dependencies should be installed locally using the supplied `package.json` / `package-lock.json`.
