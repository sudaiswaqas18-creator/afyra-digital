# Afyra Digital — Brand & Creative Communication / Home-02 Final Responsive GSAP Repair

## Implemented

### 1. How It Works scroll story
- Removed GSAP pinning from the outer shell.
- The outer white How-It-Works shell now uses CSS sticky positioning on supported screens.
- ScrollTrigger now changes only the active inner step card.
- Inactive cards cross-fade in the exact same position; the shell itself does not translate/scale.
- Snap points are kept for desktop/tablet so a short scroll settles on the next step.
- Small screens retain functional step switching without forcing an oversized pinned viewport.

### 2. Hero layout + proper card image faces
- Rebuilt the right hero visual as two generated SVG dashboard image assets:
  - `/public/static/img/brand-communication-dashboard-front.svg`
  - `/public/static/img/brand-communication-dashboard-back.svg`
- GSAP now performs a vertical/up-down 3D flip using `rotationX`.
- Hero copy and visual columns are constrained with `minmax(0, ...)` and fixed max widths to eliminate horizontal overflow.
- Dynamic text box is stacked safely under “For Stronger” instead of forcing an over-wide single row.
- Pen movement is calculated from the actual text-box width so it follows the collapsing/expanding edge.

### 3. Features storytelling animation
- Added a dedicated `sv-brand-feature-story` stage.
- On large desktop screens the story is pinned:
  1. centered statement is shown first,
  2. statement fades/moves out as the user scrolls,
  3. five detailed cards rise into the same stage,
  4. cards remain visible for a short hold before the stage releases.
- Feature cards use approved Brand & Creative Communication source content from `servicePages.ts`.
- Internal card micro-animations remain active (rings, pills, bars and stacked-card motion).
- Tablet/mobile use a non-pinned progressive reveal to avoid viewport overflow.

### 4. Responsive / layout hardening
- Added a final route-specific CSS layer loaded after legacy styles:
  - `/public/static/brand-home2-final-repair.css`
- Horizontal overflow is clipped at route/main/section level.
- Hero, feature mosaic, integrations, strategic cards, How-It-Works and pricing are responsive across desktop/tablet/mobile breakpoints.
- Pricing becomes 2 columns on tablet and 1 column on mobile.
- Integrations switch from the arc to a compact grid on narrower screens.
- Feature story disables pinning below the desktop breakpoint.

## Modified files
- `src/client/pages/ServicePage.tsx`
- `src/client/lib/useServiceAnimations.ts`
- `src/index.tsx`
- `src/renderer.tsx`
- `public/static/brand-home2-final-repair.css` (new)
- `public/static/img/brand-communication-dashboard-front.svg` (new)
- `public/static/img/brand-communication-dashboard-back.svg` (new)

## Validation performed
- TypeScript/TSX parse check: no TS1xxx syntax diagnostics in the edited TS/TSX files.
- SVG XML validation: both generated hero SVG assets parse successfully.
- CSS brace validation: final repair stylesheet is balanced.

## Browser QA note
The supplied project ZIP does not include a complete runnable `node_modules` tree in this sandbox, so a full Vite browser build could not be executed here. Run the normal install/dev workflow locally for the final pixel-level check.
