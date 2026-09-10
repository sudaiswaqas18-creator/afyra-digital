# Afyra Digital — Six Service Pages

## Setup

The project now declares `react-router-dom` in `package.json`. Because the build environment could not reach the npm registry reliably, the stale pre-change lockfile was removed instead of shipping a lockfile that omits the new routing dependency.

On a normal development machine:

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
```

This creates the React client bundle in `public/static/client.js` and the Cloudflare Pages worker/static output in `dist/`.

## Routes

- `/solutions/brand-creative-communication`
- `/solutions/digital-presence-advanced-systems`
- `/solutions/patient-acquisition-lead-generation`
- `/solutions/website-development`
- `/solutions/social-media-community-lead-communication`
- `/solutions/digital-growth-marketing-strategy`

See `REFERENCE_IMPLEMENTATION.md` for the Home 02–07 mapping and `IMPLEMENTATION_QA.md` for build/content/SEO verification.
