# Afyra Digital — SaaSking-Inspired GSAP Motion Upgrade QA

Date: 2026-09-05
Reference: https://themexriver.com/wp/saasking/

## Implemented

1. **Sitewide six-card moving-light treatment**
   - Shared hook: `src/client/lib/useSaasKingEffects.ts`
   - Automatically detects direct six-card groups using the existing Afyra stagger containers.
   - Adds continuous GSAP-driven moving border light.
   - Adds continuous GSAP-driven light ring to compatible icon/number markers.
   - Adds pointer/focus hover lift and light-intensity response.
   - Enabled on Home, marketing pages, all service pages, consultation page and card-detail pages.
   - Existing native card `::before` artwork is preserved; the new light border uses `::after`.

2. **Homepage logo → light beam → pricing-card impact**
   - The Afyra logo mark brightens as the Programs section enters the viewport.
   - A GSAP scrubbed beam travels downward from the logo.
   - The beam impact brightens the upper edge/border of the pricing wrapper.
   - Responsive beam dimensions and spacing are provided for desktop, tablet and mobile.

3. **Pricing capability image orbit**
   - Replaced the icon-only orbit with real existing Afyra generated visual assets.
   - Ten image boxes rotate around the “One Managed Growth System” center.
   - GSAP rotates the orbit and counter-rotates the image cards for controlled motion.
   - Responsive orbit radius/card sizing across desktop, tablet and mobile.

4. **Responsive GSAP behavior**
   - Shared light effects run across screen sizes.
   - Pricing beam and orbit have breakpoint-specific geometry.
   - Hero uses the full scattered-card scrubbed assembly on desktop and a compact GSAP entrance on smaller screens to avoid overlap/overflow.
   - `prefers-reduced-motion` is respected for accessibility.

5. **Hero scattered-card location and speed correction**
   - Desktop scatter offsets were moved away from the hero copy so cards do not sit over the main text/CTA area.
   - All hero modules converge together (no staggered “one card still needs more scrolling” behavior).
   - Pin distance was reduced to a short ~300–400 px range.
   - Scrub smoothing was tightened and `fastScrollEnd` enabled.
   - Final state remains mathematically exact: each module ends at `x:0, y:0, rotation:0, scale:1` inside the shared docking grid.

## Key modified files

- `src/client/lib/useSaasKingEffects.ts` (new)
- `public/static/saasking-motion.css` (new)
- `src/client/components/Programs.tsx`
- `src/client/components/HeroParallaxDashboard.tsx`
- `src/client/lib/useGsapAnimations.ts`
- `src/client/lib/useMarketingAnimations.ts`
- `src/client/App.tsx`
- `src/client/pages/MarketingPage.tsx`
- `src/client/pages/ServicePage.tsx`
- `src/client/pages/RequestConsultationPage.tsx`
- `src/client/pages/CardDetailPage.tsx`
- `src/index.tsx`
- `src/renderer.tsx`
- `public/static/requested-fixes-2026-09-05.js`

## Static validation completed

- TypeScript/TSX syntactic transpilation check: **0 syntax errors** across all modified source files.
- New motion CSS parsed successfully with `tinycss2`: **0 stylesheet parse errors**.
- All ten pricing-orbit image assets referenced by `Programs.tsx` exist in `public/generated/cards/`.
- No unsupported multiplication syntax remains inside CSS `calc()` expressions.

## Local run / browser QA

Use the normal project workflow after extracting:

```bash
npm install
npm run dev
```

Then verify at minimum: 1920×1080, 1440×900, 1024×768, 768×1024, 390×844 and 360×800. Also test reverse scrolling through the hero and pricing beam, keyboard focus on six-card groups, and reduced-motion OS/browser preference.

A full Vite/browser runtime build was not executed inside the delivery sandbox because the npm registry was not reachable from that environment; the source and stylesheet syntax checks above passed.
