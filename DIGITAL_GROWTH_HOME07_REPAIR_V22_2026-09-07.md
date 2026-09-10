# Digital Growth & Marketing Strategy — Home 07 Repair v22

Date: 2026-09-07
Target route: `/solutions/digital-growth-marketing-strategy`
Reference mechanics: SaaS King Home-07 supplied by the user.

## Completed fixes

1. **Duplicate hero removed**
   - Layout 07 is explicitly excluded from the generic `ReferenceHero` render branch.
   - Only `GrowthStrategyHero` remains for the Digital Growth & Marketing Strategy page.
   - The retained hero keeps the generated phone-in-hand visual and the Visibility / Trust / Inquiries floating metrics.

2. **Growth System layout rebuilt and isolated**
   - The six pill tags and two metric/info panels are placed in dedicated orbit positions around the central visual.
   - Desktop/tablet/mobile overrides prevent card collision and restore all labels, including the two labels that the old mobile CSS hid.
   - Each floating item now owns its own GSAP entrance motion and only begins its ambient drift after its entrance finishes, avoiding animation conflicts.

3. **From Strategy to Scale sequence completed**
   - Desktop uses one pinned viewport card frame with a full 1/3 → 2/3 → 3/3 GSAP scrub timeline.
   - Card 1 exits before Card 2 settles; Card 2 then exits before Card 3 settles.
   - All three progress bars fill in sequence and the final card receives an end hold before pin release.
   - Tablet/mobile use a stable responsive fallback where each card’s internal visual/content reveals as it reaches the viewport rather than forcing a desktop pin into a small screen.

4. **Growth Roadmap timing synchronized to the path**
   - The roadmap line and step reveals now share one scrubbed timeline instead of independent ScrollTriggers.
   - Step reveal fractions are tied to the actual cubic path segment endpoints: approximately 0.018 / 0.309 / 0.548 / 0.786.
   - Desktop marker geometry was realigned to the SVG path anchors so the dot and line physically meet.
   - Tablet/mobile use per-step viewport reveals without the desktop path geometry.

5. **Connected Touchpoints removed; Plug & Play retained**
   - `GrowthTouchpoints07` and its source data were removed from the page implementation.
   - Obsolete touchpoint GSAP code was also removed.
   - The Plug & Play/System Experience section remains.
   - New center-to-node SVG connector paths were added with continuously traveling teal light segments over subtle dashed base lines.

6. **Mobile showcase added after Trust & Proof**
   - New dark, starfield-style section placed directly after `TrustFramework`.
   - Uses a generated Afyra-relevant three-phone growth dashboard composition.
   - Phones enter bottom-to-top on scroll; copy receives a coordinated entrance.
   - Messaging is deliberately framed as a conceptual connected mobile growth view so the page does not falsely claim a shipped Afyra mobile product.

## Responsive / stability work

- Added layout-specific `growthCompact` breakpoint at 850px so Home-07 GSAP behavior matches the Home-07 CSS breakpoint instead of conflicting with it.
- Added force3D/backface/contain protections to the pinned quick-start cards.
- Removed pre-trigger ambient drift conflicts from Growth System and integration nodes.
- Added mobile/tablet animation fallbacks for quick-start and roadmap content.
- Added responsive sizing/positioning for Growth System orbit cards and the dark mobile showcase.

## Files changed

- `src/client/components/ReferenceSolutionExperience.tsx`
- `src/client/lib/useReferenceSolutionAnimations.ts`
- `src/index.tsx`
- `src/renderer.tsx`
- `public/static/digital-growth-home07-v22.css`
- `public/static/ref-solutions/growth-mobile-three-phones.webp`

## Validation performed

- TypeScript `transpileModule` syntax validation: PASS for both modified TS/TSX implementation files.
- CSS brace-balance validation: PASS.
- Render-path audit: layout 07 has one hero only.
- Section-order audit: Plug & Play → Trust & Proof → Mobile Showcase → FAQ.
- Connected Touchpoints render/data implementation: removed.
- New mobile visual asset: present in packaged public assets.
- New v22 stylesheet is referenced by both client and renderer entry points.

## Runtime build limitation in this package

A full Vite/browser build could not be executed in this container because the packaged project snapshot does not include the Vite executable/runtime dependencies (`node_modules/.bin/vite` is absent). Source-level syntax, structure, selector wiring and asset checks were completed instead. A normal local `npm install` / `npm ci` with registry access should restore dependencies for live browser QA.
