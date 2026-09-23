# Afyra Digital — Final Loading / Footer / Cards / Hero / Consultation QA

## Scope of this pass

This pass implements the requested fixes while treating the **input package homepage as locked**. The homepage-specific component and core homepage CSS files were compared against the input ZIP and remain byte-for-byte identical in this pass.

## 1. Branded loading transition

- Added a server-visible Afyra boot loader for refresh/direct loads on every route.
- Added a React route transition overlay for every pathname/search navigation.
- Uses the official Afyra logo asset (`/static/img/logo-wide.png`).
- The overlay has a minimum visible duration so it reads as an intentional branded transition rather than a flash.
- Route lifecycle still resets scroll and ScrollTrigger state before the incoming page settles.

## 2. Footer visibility and social controls

Non-home footer overrides now:

- keep the logo/name fully visible,
- prevent branding from being visually cropped,
- show the large footer wordmark as `Afyra Digital`,
- enlarge social controls to 50 × 50 px on desktop,
- use 23 px semantic SVG marks inside the social controls,
- retain responsive scaling on tablet/mobile.

## 3. Card whitespace

Across top-level pages, service pages and shared detail-page/card systems:

- artificial fixed/minimum card heights are removed where they create empty wells,
- grid items align from the top,
- detail links use intentional spacing rather than being pushed to the bottom by empty height,
- long-list pricing/program cards retain their content-driven structure,
- special service-card internal layouts are preserved instead of being flattened into one generic layout.

## 4. Non-home hero repair and page-relevant animation

### Text safety

Non-home hero titles now use responsive clamp sizing, balanced wrapping, no hyphenation, and no mid-word breaks. Split-text wrappers keep each word intact.

### Brand & Creative Communication — layout 02

- Floating badge collisions removed by using a clean two-row art grid.
- Main strategy/content card reveals first.
- Supporting badges enter from opposite directions.
- Content bars draw in and tags stagger into place.

### Digital Presence / Advanced Digital Systems — layout 03

- Oversized dead space reduced.
- Orbit visual is compacted and centered.
- Rings rotate in opposite directions and the core settles into position.

### Patient Acquisition & Lead Generation — layout 04

- Inquiry bubbles enter from their conversation direction.
- Visibility → Inquiry → Appointment connectors draw in sequence.

### Website Development — layout 05

- Browser frame settles from perspective.
- Browser chrome indicators pop in.
- Website content layers build into place in sequence.

### Social Media, Community & Lead Communication — layout 06

- Channel controls stagger into place.
- Lead/support tickets enter from the communication side.
- Supporting feature movement is scroll-linked rather than generic bouncing.

### Digital Growth & Marketing Strategy — layout 07

- Route segments draw progressively.
- Strategic nodes pop in after their connecting path.
- Process cards settle from alternating 3D angles.

### Top-level pages

Solutions, Healthcare, Programs, About and Insights now each have a distinct hero-context animation and a non-overlapping contextual rail under the branded visual.

## 5. CSS / animation lifecycle

- Removed generic continuous drifting from ordinary card images.
- Card imagery now reveals once and remains stable.
- GSAP contexts clean up on unmount/navigation.
- ScrollTrigger route cleanup remains scoped to route changes.
- Final override stylesheet has balanced braces and is loaded last so repairs win over older page-specific fixed-height rules.

## 6. Request Consultation page

`/request-consultation` is a complete route with:

- full hero/intro,
- branded visual + consultation context badges,
- scrolling text marquee,
- complete inquiry form posting to `/api/inquiry`,
- service/interest selector,
- success/error states,
- consultation benefits,
- four-step Afyra process,
- approved program/pricing context,
- FAQs,
- final CTA,
- route SEO,
- Header / Footer / ScrollTop,
- GSAP scroll reveals and hero-specific entrance choreography,
- responsive desktop/tablet/mobile layouts.

## 7. Button hover consistency

Non-home primary/ghost buttons and consultation controls now use a shared premium fill / glow / scale / icon-motion treatment aligned with the homepage hero button interaction language without changing homepage button code.

## Responsive QA coverage

Final override rules include explicit checks/repairs at:

- desktop/default,
- ≤1100 px,
- ≤980 px,
- ≤720 px,
- ≤420 px,
- `prefers-reduced-motion`.

## Verification performed

- Updated compiled React client bundle and route chunks are present in `public/static/`.
- `client.js` includes the branded transition and Request Consultation route chunk.
- All packaged `client*.js` and `sitewide-visual-fix.js` files pass `node --check` syntax validation.
- `final-polish.css` brace count is balanced.
- 430 generated card/detail image assets remain present.
- Homepage-specific files were compared against the **input package for this pass**: **16/16 match exactly**.
- No `node_modules` is included in the final delivery ZIP.

## Environment limitation

The managed Chromium environment blocks local/private navigation with `ERR_BLOCKED_BY_ADMINISTRATOR`, so a true pixel screenshot pass could not be completed here. A full worker rebuild was also not completed in this environment because the restored dependency cache does not contain `react-router-dom` and registry installation timed out. The React client build stage had already emitted the updated client/chunk assets before that worker-stage dependency failure. The final project includes the source changes and updated client static assets; a normal environment should run `npm install` followed by `npm run build` before deployment.
