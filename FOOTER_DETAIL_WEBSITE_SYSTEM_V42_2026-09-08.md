# Afyra Digital — Footer, Detail CTA & Website System V42

Date: 2026-09-08

## Scope

This pass is intentionally limited to the user-requested areas while preserving all approved V41/V40 work.

### 1. Sitewide footer
- Added the supplied phone: `#03111-3111-91` with a clickable `tel:` link.
- Added the supplied email: `afyradigital@gmail.com` with a clickable `mailto:` link.
- Expanded Company links to cover the current site journey: Home, About, Healthcare, Our Approach, Why Afyra, Process, Insights and Consultation.
- Expanded Solutions to all six current solution pages.
- Expanded Programs with the three approved current program names/prices plus Programs & Pricing, Customized Programs and Program Inquiry.
- Rebuilt the footer brand lockup so the Afyra mark and wordmark sit tightly together, are larger, and align on the same visual center.
- Rebalanced desktop/tablet/mobile footer grids without changing the approved dark-green footer identity.

### 2. Detail-page "Let's Grow Together" close
- Replaced the generic sparse close with detail-aware content.
- Every detail page now carries its own detail title/summary into the final CTA.
- Added a Relevant Context panel using the detail's approved parent context and first approved body paragraph.
- Added a What This Supports panel using the detail's own approved highlights.
- No new claims, results, guarantees or technical deliverables were invented.

### 3. Website Development → Website System
- Removed competing per-card sticky/scroll-trigger choreography.
- Uses one pinned stack stage and one scrubbed GSAP timeline on desktop/tablet.
- Card 02 lands directly over Card 01; Card 03 over Card 02; Card 04 over Card 03.
- The last card reaches the exact deck position and receives a deliberate settled hold before the section releases.
- Reverse scrolling reverses the same timeline naturally.
- Mobile remains normal-flow and readable.
- The previously removed System Experience section remains removed.

## Files changed
- `src/client/data/content.ts`
- `src/client/components/Footer.tsx`
- `src/client/pages/CardDetailPage.tsx`
- `src/client/lib/useReferenceSolutionAnimations.ts`
- `src/index.tsx`
- `src/renderer.tsx`
- `public/static/footer-detail-webstack-v42.css` (new)

## Verification
- Changed TS/TSX files passed TypeScript `transpileModule` syntax diagnostics.
- V42 stylesheet is loaded after V41/V40 overrides in both render entry points.
- System Experience removal from V40 is preserved.
- V41 Digital Presence work and prior homepage/card routing work are preserved.
