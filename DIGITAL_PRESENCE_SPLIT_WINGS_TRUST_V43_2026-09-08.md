# Digital Presence split wings + trust strip V43 — 2026-09-08

## Scope
Digital Presence / Advanced Digital Systems only.

## Hero repair
- Retired the V41 one-piece full-width hero wing background.
- Added two independent transparent wing assets:
  - `/static/ref-solutions/digital-presence-wing-left-v43.png`
  - `/static/ref-solutions/digital-presence-wing-right-v43.png`
- Each wing is a narrow side strip, tilted toward the existing Afyra core circle.
- Existing Afyra core circle, aura and rising social/app icon loop are preserved.
- Existing video elements remain markup-compatible but are hidden visually.
- V43 CSS is loaded after V42 so older hero overrides cannot recreate the doubled background.

## Connected Platforms repair
- No image is used for the lower strip.
- The strip is closed at the center before entering view.
- On scroll, the visible track expands from the center outward.
- The two illuminated brackets travel left/right from the center as the strip opens.
- The platform marquee continues moving underneath the reveal mask.
- V41 runtime is retired from the page shell; V43 runtime owns this interaction.

## Trust wording
- Replaced the unsupported `500+ healthcare brands` claim with neutral copy:
  `Connected platforms supporting stronger digital systems`.

## Files
- `public/static/digital-presence-split-wings-trust-v43.css`
- `public/static/digital-presence-v43-runtime.js`
- `public/static/ref-solutions/digital-presence-wing-left-v43.png`
- `public/static/ref-solutions/digital-presence-wing-right-v43.png`
- `src/index.tsx`
- `src/renderer.tsx`
- `src/client/components/ReferenceSolutionExperience.tsx`
