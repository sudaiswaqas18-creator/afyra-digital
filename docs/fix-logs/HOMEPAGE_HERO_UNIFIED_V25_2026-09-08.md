# Afyra Digital — Homepage Hero Unified V25
Date: 2026-09-08
Scope: Homepage hero only
Reference: SaaS King Task Management hero / supplied reference screenshot

## What was fixed

### 1. One unified hero coordinate system
- Rebuilt `HeroParallaxDashboard.tsx` so the central dashboard and all nine floating modules are direct children of one `af-hpd__canvas` positioning container.
- Removed the source-level `af-hpd__dock` floating-card wrapper from the hero.
- Added a production compatibility patch that flattens older packaged markup into the same one-canvas structure at runtime, without cloning/replacing the central dashboard.

### 2. Reference-style card placement
The final desktop composition now uses the same asymmetric hierarchy as the reference:
- Qualified Inquiries: small high-left card.
- Patient Inquiries: larger rotated chart beneath/left.
- New Inquiries: overlapping message card over the chart edge.
- Appointments: small high-right card.
- Today's Schedule: larger detail card beneath/right.
- Profile Views: angled outer-right metric card.
- Local Visibility: secondary angled right card.
- Google Business Profile optimized / Campaign live: supporting lower cards around the dashboard.

The central dashboard shell remains unchanged internally.

### 3. One synchronized GSAP settle motion
- All floating cards now settle through one GSAP tween at the same timeline position.
- Initial scatter values remain individual, but the return happens as one cohesive animation instead of multiple drift groups.
- Shortened the ScrollTrigger travel range and reduced scrub smoothing for a faster, reference-style snap/settle response.
- Resting rotations are preserved rather than forcing every card flat.
- Hover lift is quick; hover return is now deliberately faster (`0.16s`, `power3.out`).
- No hero pin was introduced, reducing refresh/layout-jitter risk.

### 4. Responsive handling
- Large desktop: full asymmetric reference-style composition.
- Tablet / small tablet: the *entire single canvas* scales as one object, preserving card-to-dashboard geometry.
- Mobile: the same unified parent switches to a readable one-column/two-column safe layout with no absolute overlap.
- Reduced-motion users receive stable non-scrubbed content.

## Files changed
- `webapp/src/client/components/HeroParallaxDashboard.tsx`
- `webapp/src/client/lib/useGsapAnimations.ts`
- `webapp/src/index.tsx`
- `webapp/src/renderer.tsx`

## Files added
- `webapp/public/static/home-hero-unified-v25.css`
- `webapp/public/static/home-hero-unified-v25.js`

## QA performed
- TypeScript/TSX syntax transpile validation: PASS for all modified TS/TSX files.
- Production compatibility JS `node --check`: PASS.
- CSS parse validation (`tinycss2`): PASS, zero parser errors.
- DOM structure assertion: source contains one unified canvas and nine direct floating parts; no source `af-hpd__dock` remains.
- Static browser layout render tests at 1536px, 1024px, 768px and 390px: no horizontal document overflow; unified card geometry remains contained/adaptive.
- Mobile render: central dashboard + all modules remain readable with no absolute-position overlap.

## Environment limitation
The supplied project snapshot still contains placeholder/empty dependency directories for packages such as Vite/React/GSAP, so a full `npm build` or live Vite runtime test cannot be completed from this archive without restoring dependencies (`npm ci` / `npm install`). The modified source, CSS and production compatibility JS were validated independently as described above.
