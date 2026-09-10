const IMAGE_MAP = {
  'Digital Growth & Marketing Strategy': '/generated/cards/solutions-service-digital-growth-marketing-strategy.webp',
  'Social Media & Brand Management': '/generated/cards/solutions-service-social-media-community-lead-communication.webp',
  'Patient Acquisition & Lead Generation': '/generated/cards/solutions-service-patient-acquisition-lead-generation.webp',
  'Search & Local Visibility': '/generated/cards/healthcare-need-local-discovery.webp',
  'Brand & Digital Presence': '/generated/cards/solutions-service-digital-presence-advanced-systems.webp',
  'Content & Creative Communication': '/generated/cards/brand-creative-communication-showcase-creative-assets.webp',
  'Afyra connected growth solutions': '/generated/cards/solutions-outcome-long-term-growth.webp',
  'Healthcare patient trust and visibility system': '/generated/cards/healthcare-need-patient-trust.webp',
  'Afyra marketing programs and growth stages': '/generated/cards/programs-plan-growth.webp',
  'Afyra Digital agency vision and growth system': '/generated/cards/about-vision-strong-agency-positioning.webp',
  'Digital growth strategy insights': '/generated/cards/insights-note-make-the-next-step-clear.webp',
  'Long-term Afyra Digital vision': '/generated/cards/about-vision-long-term-brand-equity.webp'
}


const PATHS = {
  menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
  close: '<path d="M6 6l12 12M18 6 6 18"/>',
  cross: '<path d="M6 6l12 12M18 6 6 18"/>',
  chevron: '<path d="m8 10 4 4 4-4"/>',
  arrowRight: '<path d="M5 12h14"/><path d="m13 6 6 6-6 6"/>',
  check: '<path d="m5 12.5 4.2 4.2L19 7.5"/>',
  strategy: '<path d="M4 18 9 13l4 3 7-9"/><path d="M15 7h5v5"/><circle cx="6" cy="7" r="2"/><circle cx="10" cy="11" r="2"/>',
  growth: '<path d="M4 19h16"/><path d="M7 19v-5M12 19V9M17 19v-8"/><path d="m5 11 4-4 4 2 6-5"/>',
  brand: '<circle cx="12" cy="12" r="8"/><path d="M9 16 12 8l3 8M10.2 13h3.6"/>',
  content: '<path d="M5 4h10l4 4v12H5V4Z"/><path d="M15 4v5h5M8 12h8M8 16h5"/>',
  social: '<circle cx="8" cy="8" r="2.5"/><circle cx="16" cy="8" r="2.5"/><path d="M3.8 18c.7-3 2.1-4.5 4.2-4.5s3.5 1.5 4.2 4.5M11.8 18c.7-3 2.1-4.5 4.2-4.5s3.5 1.5 4.2 4.5"/>',
  leads: '<circle cx="8" cy="7.5" r="2.5"/><path d="M4 16c.7-2.8 2-4.2 4-4.2s3.3 1.4 4 4.2"/><path d="M15 8h6M18 5v6M14 17h7M18 14l3 3-3 3"/>',
  search: '<circle cx="10.5" cy="10.5" r="5.5"/><path d="m14.5 14.5 5 5"/>',
  website: '<rect x="3" y="4" width="18" height="14" rx="2"/><path d="M3 8h18M8 21h8M12 18v3"/>',
  seed: '<path d="M12 20c-4.5-1.2-7-4-7-7.5C8.6 11 11 8.7 12 5c1 3.7 3.4 6 7 7.5 0 3.5-2.5 6.3-7 7.5Z"/><path d="M12 20V9"/>',
  authority: '<path d="m12 3 7 3v5c0 4.5-2.8 7.8-7 10-4.2-2.2-7-5.5-7-10V6l7-3Z"/><path d="m9 12 2 2 4-5"/>',
  trust: '<path d="m12 3 7 3v5c0 4.5-2.8 7.8-7 10-4.2-2.2-7-5.5-7-10V6l7-3Z"/><path d="m9 12 2 2 4-5"/>',
  doctor: '<path d="M8 4v4a4 4 0 0 0 8 0V4"/><path d="M12 12v2a5 5 0 0 0 5 5h1"/><circle cx="19" cy="19" r="2"/>',
  clinic: '<rect x="4" y="5" width="16" height="15" rx="2"/><path d="M12 8v6M9 11h6M8 20v-4h8v4"/>',
  hospital: '<path d="M5 21V5h14v16M9 8h6M12 5v6M9 11h6M8 21v-5h8v5"/>',
  aesthetic: '<path d="m12 3 1.7 4.3L18 9l-4.3 1.7L12 15l-1.7-4.3L6 9l4.3-1.7L12 3Z"/><path d="M7 15c.7 2.8 2.4 4.6 5 6"/>',
  cosmetic: '<path d="M12 4c2.7 3.1 4.5 5.8 4.5 8.4a4.5 4.5 0 1 1-9 0C7.5 9.8 9.3 7.1 12 4Z"/><path d="m18 15 .8 2 2.2 1-2.2 1-.8 2-.8-2-2.2-1 2.2-1 .8-2Z"/>',
  facebook: '<path d="M14.5 6.5h-1.8a2.2 2.2 0 0 0-2.2 2.2V11H8v2.8h2.5V20h2.8v-6.2h2.4L16 11h-2.7V9c0-.4.3-.7.7-.7h1.5Z"/>',
  instagram: '<rect x="5" y="5" width="14" height="14" rx="4"/><circle cx="12" cy="12" r="3.2"/><circle cx="16.8" cy="7.5" r=".8" fill="currentColor" stroke="none"/>',
  linkedin: '<rect x="5" y="5" width="14" height="14" rx="2.5"/><path d="M8.3 10.5V16M11.5 16v-3.3c0-1.4.8-2.3 2-2.3s2 .8 2 2.3V16M8.3 8.2h.01"/>',
  whatsapp: '<path d="M12 4.5a7.5 7.5 0 0 0-6.6 11l-1.1 4 4-1A7.5 7.5 0 1 0 12 4.5Z"/><path d="M9.3 9.1c.3 2.7 2.1 4.8 5 5.8l1.2-1.1 1.7.8c-.2 1.1-1 1.8-2.1 2-3.7-.7-6.4-3.1-7.5-6.7.2-.9.8-1.5 1.7-1.8Z"/>',
  spark: '<path d="m12 3 1.5 4.2L18 9l-4.5 1.8L12 15l-1.5-4.2L6 9l4.5-1.8L12 3Z"/>'
}

function iconNameForText(text='') {
  const v = text.toLowerCase()
  if (/search|local|visibility|google|seo|discovery/.test(v)) return 'search'
  if (/website|digital presence|advanced system|mobile|usability/.test(v)) return 'website'
  if (/patient|lead|inquir|appointment|acquisition|conversion/.test(v)) return 'leads'
  if (/social|community|audience|engagement/.test(v)) return 'social'
  if (/trust|reputation|authority|credib|proof/.test(v)) return 'trust'
  if (/brand|creative|identity/.test(v)) return 'brand'
  if (/content|education|story|video/.test(v)) return 'content'
  if (/doctor/.test(v)) return 'doctor'
  if (/hospital/.test(v)) return 'hospital'
  if (/clinic/.test(v)) return 'clinic'
  if (/aesthetic/.test(v)) return 'aesthetic'
  if (/cosmetic/.test(v)) return 'cosmetic'
  if (/growth|strategy|planning|position|scale|system|outcome/.test(v)) return 'strategy'
  return 'spark'
}

function svg(name) {
  return `<svg viewBox="0 0 24 24" width="100%" height="100%" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">${PATHS[name] || PATHS.spark}</svg>`
}

function replaceGeneratedVisuals(root=document) {
  root.querySelectorAll('figure.af-ai-visual').forEach((figure) => {
    if (figure.querySelector('img')) return
    const label = figure.querySelector('figcaption')?.textContent?.trim() || figure.getAttribute('aria-label')?.replace(/ custom visual illustration$/,'') || ''
    const src = IMAGE_MAP[label]
    if (!src) return
    const old = figure.querySelector('svg')
    if (!old) return
    const img = document.createElement('img')
    img.src = src
    img.alt = `${label} — Afyra Digital contextual visual`
    img.loading = 'lazy'
    img.decoding = 'async'
    img.width = 960
    img.height = 600
    img.style.cssText = 'width:100%;height:100%;object-fit:cover;display:block;'
    old.replaceWith(img)
    figure.classList.add('af-ai-visual--photo')
  })
}


function replaceNamedIcons(root=document) {
  root.querySelectorAll('[class*="af-inline-svg-icon--"]').forEach((node) => {
    const cls = [...node.classList].find((c) => c.startsWith('af-inline-svg-icon--') && c !== 'af-inline-svg-icon--wrap')
    if (!cls) return
    const name = cls.replace('af-inline-svg-icon--','')
    if (!PATHS[name]) return
    node.innerHTML = svg(name)
  })

  root.querySelectorAll('.sv-feature-card').forEach((card) => {
    const title = card.querySelector('h3,h4')?.textContent || card.textContent || ''
    const target = card.querySelector('.sv-feature-card__icon .af-inline-svg-icon')
    if (target) target.innerHTML = svg(iconNameForText(title))
  })

  root.querySelectorAll('.px-card').forEach((card) => {
    const target = card.querySelector('.px-icon .af-inline-svg-icon')
    if (!target) return
    const title = card.querySelector('h3,h4')?.textContent || card.textContent || ''
    target.innerHTML = svg(iconNameForText(title))
  })

  root.querySelectorAll('.dt-highlight-row').forEach((row) => {
    const title = row.querySelector('strong')?.textContent || ''
    const target = row.querySelector('.af-inline-svg-icon')
    if (target) target.innerHTML = svg(iconNameForText(title))
  })

  root.querySelectorAll('.af-price__terms-ico .af-inline-svg-icon').forEach((target) => {
    target.innerHTML = svg('check')
  })
}

let raf = 0
function run() {
  cancelAnimationFrame(raf)
  raf = requestAnimationFrame(() => {
    replaceGeneratedVisuals()
    replaceNamedIcons()
  })
}

run()
new MutationObserver(run).observe(document.documentElement, { childList: true, subtree: true })
