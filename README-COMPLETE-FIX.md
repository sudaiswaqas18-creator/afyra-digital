# Afyra Digital — Complete Project Fix

This package contains the final React/Vite + Hono/Cloudflare Pages project with the Home page locked to its verified baseline.

## Run locally
```bash
npm ci
npm run dev
```

## Production build
```bash
npm run build
```

The full build now cleans `dist/` first so stale public assets cannot survive between builds.

## What changed outside Home
- deterministic scroll-to-top on every pathname navigation;
- stale GSAP/ScrollTrigger route state cleanup;
- route code splitting with a non-blank Header/Footer loading state;
- inline SVG-only UI icon system with no public SVG icon files;
- 430 unique generated card/detail images;
- 215 SEO detail pages;
- all 211 currently rendered editable cards link to their detail page;
- sitemap.xml and robots.txt;
- footer contrast, content visibility and responsive hardening.

See `COMPLETE_SITE_FIX_QA.md` for the complete verification record.
