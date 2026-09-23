# Afyra Digital — Brand & Creative Communication Home-02 Layout / GSAP Repair

Reference reviewed: ThemeXriver Saasking Home 02.

## Implemented

- Rebuilt the Brand & Creative Communication hero layout for stable desktop/tablet/mobile sizing.
- Reworked the changing hero phrase into a GSAP-driven close/open text panel; the pen travels with the closing/opening motion.
- Reworked the right hero UI into a two-sided 3D GSAP auto-flip card with complete front/back content.
- Rebuilt the Features area so the center statement appears first and fades as the feature grid enters on scroll.
- Added per-card internal motion for rings, idea pills, progress lines and layered template sheets.
- Rebuilt the Integrations section with a stable semicircle SVG path and app-style icon badges placed along that path.
- Rebuilt Strategic Solutions as a professional 3x2 template-card layout with scroll-linked GSAP entrances.
- Fixed the How It Works system to use one active card at a time, a short pinned scroll range and snapping between the four stages.
- Rebuilt pricing cards for equal height, consistent spacing, Most Popular state and responsive behavior.
- Added a route-specific final CSS layer loaded after the older runtime/audit styles so legacy CSS no longer breaks this page.
- Added responsive rules for desktop, tablet, mobile and narrow mobile.

## Files changed

- `src/client/pages/ServicePage.tsx`
- `src/client/lib/useServiceAnimations.ts`
- `src/index.tsx`
- `src/renderer.tsx`
- `public/static/brand-home2-fixes.css` (new)

## QA performed

- TypeScript/TSX parse/transpile diagnostics: 0 errors for all edited TS/TSX files.
- New CSS brace balance: valid (opening/closing braces match).
- New CSS parenthesis balance: valid.

## Local visual QA

Run the normal project flow on the development machine:

1. `npm install`
2. `npm run dev`
3. Open `/solutions/brand-creative-communication`
4. Check 1440px, 1024px, 768px and 390px widths.

The container used for this patch does not have the project's npm packages installed, so browser rendering/build execution was not available here. Source-level syntax QA was completed.
