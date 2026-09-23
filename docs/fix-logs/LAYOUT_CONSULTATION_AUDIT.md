# Afyra Digital — Non-Home Layout Balance & Consultation Page Audit

## Scope

The homepage was treated as the layout-quality benchmark and was not rebuilt or restyled. The work in this pass is scoped to non-home route wrappers (`.px-page`, `.sv-page`, `.dt-page`, `.rq-page`) plus the new Request Consultation page.

## Homepage lock verification

The following homepage-specific files match the pre-audit package byte-for-byte: `App.tsx`, Hero, Marquee, Features, Solutions, WhyAfyra, Programs, Process, FAQs, CTA, the homepage GSAP hook, `style.css`, and `sections.css`.

Shared Header/Footer logic was adjusted only so non-home consultation links can open the dedicated consultation page. The homepage path still keeps its existing `#contact` behavior, so the homepage layout and in-page consultation experience remain unchanged.

## Page-by-page layout audit

### Solutions
- Hero normalized to balanced 50/50 content/visual columns.
- Six solution cards normalized to an even 3-column desktop grid instead of mixed 6/4 spans.
- Business-philosophy split normalized to equal columns.
- Principle cards retain equal-width rows and consistent card heights.

### Healthcare
- Healthcare audience cards keep equal widths with responsive 5 → 3 → 1 behavior.
- “Why healthcare is different” section normalized to balanced 50/50 columns.
- Journey cards normalized to a stable 3-column desktop rhythm instead of a long single row.
- Program cards use equal column heights and aligned actions.

### Programs
- All three pricing cards use equal-width/equal-height desktop columns.
- The “Most Popular” card no longer sits vertically offset from the others.
- Terms section uses a balanced 50/50 editorial split.
- Responsive behavior: 3 columns → 2 columns → 1 column.

### About
- Positioning comparison normalized to balanced halves.
- Founder vision / vision list normalized to equal-width columns.
- Brand-experience cards retain consistent 3-column rows.
- Process cards use a clean 4 → 2 → 1 responsive grid.

### Insights
- Strategic-note cards changed from asymmetric 8/4 masonry spans to equal 3-column cards.
- Decision cards retain equal thirds.
- FAQ editorial split normalized to balanced 50/50 columns.

### Six Solution / Service Pages
- All non-centered heroes normalized to balanced content/visual halves.
- Home-02-style floating cards are constrained inside their visual container to prevent clipping/overlap.
- Feature cards are normalized to equal 3-column desktop grids across all six layouts.
- Process cards use 4 equal columns on desktop.
- Showcase and program cards use equal 3-column grids.
- Connected-system, proof, editorial and FAQ sections use balanced 50/50 splits.
- Special staggered/offset cards are removed where they caused lopsided visual weight.

### Card Detail Pages
- Shared detail layout normalized to balanced 50/50 hero, editorial, highlight and framework sections.
- The shared fix applies automatically to the full detail-page registry.

## New Request Consultation Page

Route: `/request-consultation`

Built as a complete production page with:
- Balanced 50/50 hero with consultation/inquiry visual.
- Dedicated consultation request form posting to the existing `/api/inquiry` endpoint.
- Area-of-interest selection using Afyra’s approved service routes.
- Supporting “what the conversation is for” benefit cards.
- Full four-step Afyra process section.
- Current program context with approved program names and pricing.
- FAQ section using approved Afyra FAQ content.
- Final CTA back to the consultation form.
- Route-specific SEO title, meta description, canonical path and sitemap inclusion.
- Existing GSAP marketing animation system via `useMarketingAnimations`.
- Hover/focus transitions for cards, buttons, fields and accordion items.

## Responsive audit rules

Desktop:
- Primary editorial layouts use balanced 50/50 columns.
- Multi-card sections use equal-width 3- or 4-column grids.

Tablet:
- Multi-card grids collapse to 2 columns.
- Hero/editorial split sections collapse to a single centered column when required.

Mobile:
- Card grids collapse to one column.
- Form fields stack to one column.
- Floating service-hero cards are removed where necessary to prevent overlap.
- CTA buttons become full-width where appropriate.

## Files added/changed

- `src/client/pages/RequestConsultationPage.tsx`
- `src/client/main.tsx`
- `src/client/data/sitePages.ts`
- `src/client/pages/MarketingPage.tsx`
- `src/client/pages/ServicePage.tsx`
- `src/client/pages/CardDetailPage.tsx`
- `src/client/components/Header.tsx`
- `src/client/components/Footer.tsx`
- `src/index.tsx`
- `src/renderer.tsx`
- `public/static/layout-audit.css`

## Verification performed

- TypeScript/TSX source parse syntax: PASS.
- New layout CSS brace integrity: PASS.
- Homepage-specific locked files: PASS against the previous package.
- Request Consultation route is registered in React Router and route-aware SEO data.
- Sitemap generation automatically includes `/request-consultation` through `sitePageSeo`.
- Browser screenshot automation was attempted, but the sandbox Chromium process did not complete localhost navigation reliably; no pixel-level browser certification is claimed from this environment.
- A fresh dependency-based production build was not performed because the sandbox package registry is unavailable. The source changes are build-ready for the project’s existing Vite/React workflow once dependencies are installed.
