# Afyra Digital — Fresh Install, Scroll & Mobile Stability QA

## Changes in this pass

### Fresh `npm install` + `npm run dev`
The blank-page root cause was isolated to the development asset path. The Hono server registered production-only `/static/*`, `/generated/*`, and `/Home-Public/*` handlers that require the Cloudflare Pages `ASSETS` binding. A normal Vite development session does not provide that production binding, so those handlers could return HTTP 503 for client/CSS assets.

The server shell now follows a dev/production split:
- development: Vite serves public assets and the page loads `/src/client/main.tsx` directly;
- production: the built page loads `/static/client.js` and Cloudflare Pages asset requests are forwarded through `ASSETS`.

Compatibility scripts are production-only so they do not double-run against the fresh React source in Vite development.

A `predev` setup check was added to verify required dependencies and critical client/static files after installation.

### Site-wide scrollbar
- Default desktop browser scrollbar is replaced by an Afyra-branded fixed scrollbar.
- Scroll position updates are `requestAnimationFrame`-batched and use transform/height writes only.
- Desktop scrollbar supports track click and thumb dragging.
- Touch devices retain native touch scrolling; the branded thumb remains a lightweight visual indicator.

### Small-screen stability
- `ScrollTrigger.config({ ignoreMobileResize: true, limitCallbacks: true })` reduces mobile address-bar resize churn.
- Expensive parallax, scrubbed text, clip-path reveals, and continuous hero motion are reduced/disabled at <=760px where appropriate.
- `content-visibility:auto` is disabled on small screens to prevent sections appearing blank while ScrollTrigger measurements are changing.
- Mobile drawer now uses `100dvh`, an independently scrolling menu region, explicit stacking, and forced link visibility.

### Social Media, Community & Lead Communication
- Long hero heading now wraps only at word boundaries.
- Hero communication dashboard collapses safely on small screens.
- “Built Around Business Outcomes…” feature cards no longer use the old scrubbed left/right transform sequence. They use one stable staggered reveal instead.
- Continuous box-shadow animation was replaced with cheaper transform-only motion on desktop and removed on compact layouts.

## Verification completed in this workspace
- All non-declaration TS/TSX files: syntax transpilation PASS.
- Runtime compatibility JS: `node --check` PASS.
- `site-runtime.css`: brace/integrity check PASS.
- Imported external packages are all declared in `package.json`.
- `package.json` dependencies and `package-lock.json` root dependencies match.
- `@studio-freight/lenis` was removed because it was unused and deprecated; it was not contributing to the rendered scroll experience.

## Fresh-install test limitation in this workspace
A real clean `npm ci` was attempted in a copied project with no `node_modules`. The install could not complete because this sandbox could not resolve `registry.npmjs.org` (`EAI_AGAIN`). This is an environment/network failure rather than a project dependency mismatch. Because installation could not finish, a truthful live `npm run dev` cycle could not be completed inside this workspace.

The dev-server implementation was updated to the supported Hono/Vite client pattern and source-level dependency/file checks pass. On a normal machine with npm registry access, the intended test sequence is:

```bash
npm install
npm run dev
```

No prebuilt client bundle is required for Vite development anymore; the dev shell loads `src/client/main.tsx` directly.
