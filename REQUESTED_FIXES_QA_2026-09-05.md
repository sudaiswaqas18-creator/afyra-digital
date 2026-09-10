# Afyra Digital — Requested Fixes QA (2026-09-05)

## Scope implemented

### 1. One Managed Growth System orbit
- Replaced plain text-only orbit pills with icon-led capability chips.
- Added semantic SVG icons for Strategy, Content, Reels, Ads, GBP, WhatsApp, SEO, Reports, Branding and Support.
- Kept the existing circular/orbit concept and center message.
- Added consistent chip sizing, icon containers, contrast, subtle borders/glow and responsive orbit radii.

### 2. Solutions hero GSAP systems
All six Solutions layouts retain unique service-specific artwork and now have explicit GSAP choreography:
- Home 02 / Brand & Creative Communication: brand system construction, content lines, meter, tags and supporting communication cards.
- Home 03 / Digital Presence & Advanced Systems: multi-ring connected presence system with visibility, trust, local discovery, lead communication and conversion nodes.
- Home 04 / Patient Acquisition & Lead Generation: live inquiry sequence, inbound/outbound message flow, typing state, qualification stages and appointment path.
- Home 05 / Website Development: browser/UI construction, trust/visibility/inquiry blocks and consultation CTA reveal.
- Home 06 / Social Media, Community & Lead Communication: channel activation, managed conversation status and routed communication cards.
- Home 07 / Digital Growth & Marketing Strategy: route construction from strategy through systems, outcomes and growth.

### 3. Healthcare / Programs / About / Insights
- Added source-grounded supporting summaries to cards that previously consisted mainly of image + title + detail link.
- Normalized desktop, tablet and mobile grid sizing/alignment.
- Reduced dead space in small cards and retained readable full-content program cards.
- About vision cards use a balanced two-column editorial system on desktop with the final card spanning the row.
- Added GSAP entrance and hover polish to top-level editorial cards in addition to the existing text/scroll animations.

### 4. Homepage Request Consultation navigation
- Homepage header Request Consultation now points to `/request-consultation`.
- Homepage hero consultation CTA also points to `/request-consultation`.
- Runtime compatibility code applies the same correction to the packaged client bundle before a fresh rebuild.

### 5. Footer contact information — source limitation
The supplied `AFYRA DIGITAL — MASTER KNOWLEDGE BASE.docx` was inspected across all document paragraphs and underlying DOCX XML. It does **not** contain a phone/contact number or an email address.

Per the Knowledge Base rule **“Never invent facts. If factual information is missing: PENDING FOUNDER INPUT”**, the package does not fabricate contact information. The footer contact fields are therefore explicitly marked:
- Phone: PENDING FOUNDER INPUT
- Email: PENDING FOUNDER INPUT

These two values should be replaced only when founder-approved contact details are supplied.

## Compatibility / verification
- Modified TS/TSX files: syntax transpilation PASS.
- New runtime JS: `node --check` PASS.
- New CSS: brace/integrity check PASS.
- Responsive rules included for desktop, <=1120px, <=980px, <=760px and <=430px.
- Reduced-motion fallback included for the orbit.
- Existing layout/color/content outside the requested scopes was not intentionally changed.

## Build environment note
A fresh npm dependency installation/build could not be completed in this sandbox because npm registry access did not respond within the available check window. For this reason the package includes both:
1. updated React/GSAP source, and
2. a small runtime compatibility layer (`requested-fixes-2026-09-05.css/js`) that improves the currently packaged static client without requiring an immediate rebuild.
