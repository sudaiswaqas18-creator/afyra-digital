# Brand & Creative Communication — Stability Fix V48

## Root cause fixed
The V47 route stylesheet was added to `src/renderer.tsx`, but the production app shell is generated directly by `src/index.tsx`. Therefore the intended V47 layout never loaded in the actual page. Older Home-02 CSS layers kept loading instead, which caused the collapsed hero dashboard, broken spacing, oversized visual/logo elements, and unstable responsive layout.

## V48 changes
- Added one final route-scoped stylesheet to the real production shell: `brand-communication-stability-v48.css`.
- Removed the historical Brand/Home-02 CSS cascade from both `src/index.tsx` and the unused renderer shell. Those legacy files remain in the repository for history but are no longer loaded.
- Preserved the current React/GSAP source as the animation owner.
- Kept hero word-changing animation and scroll-driven dashboard flip.
- Restored the centered hero/dashboard composition.
- Restored the reference strip with horizontal rules, corner nodes, and spaced communication items.
- Restored Features intro panel and the five animated HTML/CSS feature displays.
- Preserved click-to-play video frame, Strategic Solution arc reveal, How It Works 01→02→03→04 scroll sequence, approved Afyra program pricing, FAQ accordion, crosslinks, and final CTA.
- Added route-level overflow/size guards to prevent oversized images/SVGs from escaping their card containers.
- Responsive rules remain included for desktop, tablet, mobile, and reduced-motion users.

## Important
No new images were generated. V48 is a source/layout/animation stability correction only.
