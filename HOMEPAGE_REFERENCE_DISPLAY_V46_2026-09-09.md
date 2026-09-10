# Afyra Digital — Homepage Reference Display V46

Date: 2026-09-09

## Requested changes completed

### 1) Homepage FAQ light vault
- Rebuilt the simple FAQ top arc into a reference-style luminous vault.
- Added a bright curved teal/mint core line, wide underside light bloom, central beam and 18 visible sparkles.
- Sparkles now receive both a GSAP entrance sequence and continuous subtle twinkle motion.
- The FAQ content remains above the effect and the treatment is responsive on mobile/tablet.
- Afyra palette is preserved: #00BBA0, #00443E, #DEF1F0 with one restrained #FF960D accent.

### 2) Homepage Approach / Built for Real Business Outcomes
- Removed the four static photo displays from these cards.
- Replaced them with native HTML/CSS/SVG animated UI displays inspired by the Saasking reference mechanics:
  - Visibility That Compounds: animated analytics lines, metric chips and floating visibility marker.
  - Trust Built Before First Contact: tilted communication board, staggered content tiles, particles and floating Afyra hub.
  - Qualified Inquiries, Not Just Reach: animated journey donut, connected flow panel, line drawing and hub pulse.
  - Fully Managed: connected operating-system network, animated paths, nodes and central Afyra hub.
- Kept the approved Afyra copy; no fake statistics, testimonials or results were introduced.
- Added staged GSAP reveal timelines, line drawing, node/card stagger and controlled perpetual micro-motion.
- Retained hover lift/glow behavior and refined the bento proportions to match the reference layout more closely.

### 3) Legacy photo reinsertion prevention
- Removed the homepage feature-photo injection logic from `sitewide-visual-fix.js`, so the new animated displays cannot be overwritten by the older compatibility script.

## Main changed files
- `src/client/components/Features.tsx`
- `src/client/components/Faqs.tsx`
- `src/client/lib/useGsapAnimations.ts`
- `public/static/home-reference-display-v46.css` (new)
- `public/static/sitewide-visual-fix.js`
- `src/renderer.tsx`
- `src/index.tsx`

## Validation performed
- Targeted TypeScript/TSX compile check: PASS.
- `sitewide-visual-fix.js` Node syntax check: PASS.
- CSS brace/parenthesis structural check: PASS.
- Confirmed `Features.tsx` contains no `<img>` tags.
- Confirmed V46 CSS loads after V45 in both renderer paths.

A full Vite production build was not run in this sandbox because the project dependency environment is not installed here. The targeted changed TypeScript files compile against the React/GSAP type packages used by the project.
