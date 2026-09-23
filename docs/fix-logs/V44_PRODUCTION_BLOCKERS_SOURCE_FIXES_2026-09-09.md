# Afyra Digital — V44 Production Blockers Source Fixes

This revision contains the seven source-level corrections requested after the V43 Chromium regression.

1. Removed production loading of legacy JS compatibility runtimes that depended on minified `client.js` aliases. React/GSAP source now owns animations.
2. Reworked Website Development → Website System to a CSS-sticky stage plus one scrubbed GSAP timeline: 01 stays in the stage, 02 lands over 01, 03 over 02, 04 over 03, then a final hold and natural release.
3. `/contact` now redirects/routes to `/request-consultation`.
4. Added the four missing homepage-approach detail WebP assets at their exact production paths and registered them in `scripts/card-visual-keys.json`.
5. `/api/inquiry` now validates input and POSTs JSON to the Cloudflare binding `INQUIRY_WEBHOOK_URL`. Missing config returns 503; non-2xx webhook responses return 502; only successful delivery returns `delivered: true`.
6. Removed unverified Facebook, Instagram and LinkedIn `#` links. The footer retains only the verified consultation/WhatsApp action until real profile URLs are supplied.
7. Removed the obsolete `digital-presence-flow.mp4` and its video markup. Digital Presence uses the split static wing assets.

Build hardening: client Vite base is `/static/`, and the clean script removes stale generated `client*.js/css/map` chunks before each build.

## Webhook
Configure a real Make.com Custom Webhook URL as the production environment binding `INQUIRY_WEBHOOK_URL`. Do not commit the secret URL into source.
