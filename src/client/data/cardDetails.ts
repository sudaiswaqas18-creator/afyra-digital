import { audience, brand, features, process, programs, whyAfyra } from './content'
import { servicePages, type ServiceLayout, type ServicePageData } from './servicePages'

export type CardDetail = {
  slug: string
  assetKey: string
  detailAssetKey: string
  title: string
  eyebrow: string
  summary: string
  parentTitle: string
  parentPath: string
  body: string[]
  highlights: string[]
  nextStepLabel: string
  nextStepPath: string
}

export const slugify = (value: string) => value
  .toLowerCase()
  .replace(/[’']/g, '')
  .replace(/&/g, ' and ')
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-+|-+$/g, '')
  .slice(0, 88)

export const cardKey = (...parts: string[]) => parts.map(slugify).filter(Boolean).join('-')

const details: CardDetail[] = []
const visualKeys = new Set<string>()

function add(detail: Omit<CardDetail, 'detailAssetKey'>) {
  const item: CardDetail = { ...detail, detailAssetKey: `${detail.assetKey}-detail` }
  details.push(item)
  visualKeys.add(item.assetKey)
  visualKeys.add(item.detailAssetKey)
  return item
}


features.items.forEach((feature) => add({
  slug: cardKey('home', 'approach', feature.id, feature.title),
  assetKey: cardKey('home', 'approach', feature.id, feature.title),
  title: feature.title,
  eyebrow: 'Afyra Digital approach',
  summary: feature.description,
  parentTitle: 'Afyra Digital Home',
  parentPath: '/',
  body: [
    feature.description,
    'This card belongs to Afyra Digital’s approved business-outcome approach: strategy, connected systems, visibility, trust, inquiries and long-term growth rather than isolated marketing activity.',
    'The detail stays within the current approved website context and does not add unsupported guarantees, results or deliverables.'
  ],
  highlights: features.items.map((item) => item.title),
  nextStepLabel: 'Back to Afyra Digital',
  nextStepPath: '/'
}))

servicePages.forEach((service) => add({
  slug: cardKey('solutions', 'service', service.slug),
  assetKey: cardKey('solutions', 'service', service.slug),
  title: service.name,
  eyebrow: 'Afyra Digital solution',
  summary: service.description,
  parentTitle: 'Digital Growth Solutions',
  parentPath: '/solutions',
  body: [service.description, service.intro, ...(service.contentGap ? [service.contentGap] : [])],
  highlights: service.features.map((item) => item.title),
  nextStepLabel: `Explore ${service.name}`,
  nextStepPath: `/solutions/${service.slug}`
}))

const systemOutcomes = [
  ['Visibility', 'Be present where the right audience discovers and evaluates the business.'],
  ['Trust', 'Strengthen professional reputation and confidence before the first conversation.'],
  ['Inquiries', 'Create clearer opportunities for qualified patient or customer inquiries.'],
  ['Conversion', 'Connect visibility and communication to useful business actions.'],
  ['Authority', 'Build a professional digital presence that supports long-term positioning.'],
  ['Long-Term Growth', 'Prioritize scalable systems and recurring business value over short-term activity.']
] as const

systemOutcomes.forEach(([title, summary]) => add({
  slug: cardKey('solutions', 'outcome', title), assetKey: cardKey('solutions', 'outcome', title), title,
  eyebrow: 'Growth outcome', summary, parentTitle: 'Digital Growth Solutions', parentPath: '/solutions',
  body: [
    summary,
    `Afyra Digital frames ${title.toLowerCase()} as part of a connected growth system rather than an isolated marketing task. The wider system can combine strategy, content, social presence, paid campaigns, Google Business Profile, WhatsApp, lead communication, brand authority and conversion.`,
    `The objective is to connect day-to-day execution to stronger visibility, trust, qualified inquiries, professional positioning and sustainable growth without relying on unsupported claims or vanity metrics.`
  ],
  highlights: ['Strategy before activity', 'Connected digital touchpoints', 'Business outcomes over deliverables', 'Credibility over hype'],
  nextStepLabel: 'Explore all solutions', nextStepPath: '/solutions'
}))

const principles = [
  ['Business value > Brand value', 'Business value is considered first, with brand value supporting the long-term commercial objective.'],
  ['User experience > visual decoration', 'User experience, clarity and conversion are prioritized before decorative complexity.'],
  ['Agency positioning over freelancer positioning', 'Afyra is presented as a strategic agency and growth partner, not an individual task provider.'],
  ['Credibility over hype', 'Verified proof and clear expectations are preferred over unsupported superlatives, guarantees or fabricated claims.'],
  ['Clarity over complexity', 'Business language and clear journeys are prioritized over unnecessary jargon and visual clutter.'],
  ['Long-term brand value over short-term trends', 'Decisions are evaluated for scalability, recurring relationships and long-term brand equity rather than short-lived trends.']
] as const

principles.forEach(([title, summary]) => add({
  slug: cardKey('solutions', 'principle', title), assetKey: cardKey('solutions', 'principle', title), title,
  eyebrow: 'Decision philosophy', summary, parentTitle: 'Digital Growth Solutions', parentPath: '/solutions',
  body: [summary, 'Afyra Digital evaluates website and marketing decisions through business value, brand value, user experience, conversion, technical practicality and long-term growth.', 'This keeps strategy, systems and outcomes at the center of the work while avoiding freelancer-style task selling, generic templates and unnecessary complexity.'],
  highlights: ['Strategy over decoration', 'Outcomes over deliverables', 'Practical implementation', 'Long-term brand equity'],
  nextStepLabel: 'See Afyra’s approach', nextStepPath: '/about'
}))

const healthcareNeeds = ['Patient trust','Professional reputation','Visibility','Education','Local discovery','Inquiries','Appointment opportunities','Long-term authority']
const journeySteps = ['Discovery','Trust','Inquiry','Communication','Appointment Opportunity','Authority']

const healthcareContext = 'Healthcare businesses have strong requirements around patient trust, professional reputation, visibility, education, local discovery, inquiries, appointment opportunities and long-term authority.'

audience.items.forEach((item) => add({
  slug: cardKey('healthcare', 'audience', item.label), assetKey: cardKey('healthcare', 'audience', item.label), title: item.label,
  eyebrow: 'Healthcare specialization', summary: `Afyra Digital currently builds strong healthcare marketing expertise for ${item.label.toLowerCase()}.`, parentTitle: 'Healthcare Marketing', parentPath: '/healthcare',
  body: [`Afyra’s strongest current specialization is healthcare marketing, including ${item.label.toLowerCase()}.`, healthcareContext, 'Healthcare remains a specialization and competitive strength rather than a permanent limitation on future industries.'],
  highlights: ['Patient trust', 'Professional reputation', 'Local discovery', 'Qualified inquiries'],
  nextStepLabel: 'Explore healthcare marketing', nextStepPath: '/healthcare'
}))

healthcareNeeds.forEach((title) => add({
  slug: cardKey('healthcare', 'need', title), assetKey: cardKey('healthcare', 'need', title), title,
  eyebrow: 'Healthcare growth requirement', summary: `${title} is one of the key requirements Afyra considers when building healthcare growth systems.`, parentTitle: 'Healthcare Marketing', parentPath: '/healthcare',
  body: [healthcareContext, `For ${title.toLowerCase()}, the digital experience should support confidence and make the business easier to discover, understand and contact.`, 'Afyra connects this requirement to the wider system of strategy, content, visibility, lead communication, brand authority and conversion.'],
  highlights: ['Trust-led communication', 'Professional positioning', 'Clear patient journey', 'Long-term authority'],
  nextStepLabel: 'View patient acquisition', nextStepPath: '/solutions/patient-acquisition-lead-generation'
}))

journeySteps.forEach((title, index) => add({
  slug: cardKey('healthcare', 'journey', title), assetKey: cardKey('healthcare', 'journey', title), title,
  eyebrow: 'Patient journey', summary: `${title} is connected to the wider path from digital visibility to a real inquiry or appointment opportunity.`, parentTitle: 'Healthcare Marketing', parentPath: '/healthcare',
  body: [`Afyra treats ${title.toLowerCase()} as one stage in a connected patient/customer journey.`, 'Paid advertising is only one component. Strategy, content, social presence, Google Business Profile, WhatsApp, lead communication, brand authority and conversion can work together across the journey.', `This stage sits ${index === 0 ? 'at the beginning of' : 'within'} the path from discovery and trust to inquiry, communication, appointment opportunity and long-term authority.`],
  highlights: ['Connected journey', 'Clear communication', 'Business-focused next steps', 'No isolated channel thinking'],
  nextStepLabel: 'Explore healthcare journey', nextStepPath: '/healthcare'
}))

programs.plans.forEach((plan) => {
  add({
    slug: cardKey('healthcare', 'program', plan.id), assetKey: cardKey('healthcare', 'program', plan.id), title: plan.name,
    eyebrow: 'Healthcare growth program', summary: `${plan.name}: ${plan.purpose}. PKR ${plan.price.toLocaleString()}/month.`, parentTitle: 'Healthcare Marketing', parentPath: '/healthcare',
    body: [`${plan.name} is one of Afyra Digital’s three current approved marketing programs. Its purpose is ${plan.purpose.toLowerCase()}.`, `Current approved price: PKR ${plan.price.toLocaleString()} per month.`, 'The first month is charged at 25% extra, payment is 100% in advance, additional work outside package scope is charged separately, and customized programs are available according to business requirements.'],
    highlights: [...plan.bestFor.slice(0, 4), `Platforms: ${plan.platforms}`], nextStepLabel: 'Compare programs', nextStepPath: '/programs'
  })
  add({
    slug: cardKey('programs', 'plan', plan.id), assetKey: cardKey('programs', 'plan', plan.id), title: plan.name,
    eyebrow: 'Approved Afyra program', summary: `${plan.name} — ${plan.purpose}. PKR ${plan.price.toLocaleString()}/month.`, parentTitle: 'Programs & Pricing', parentPath: '/programs',
    body: [`${plan.name} is an approved Afyra Digital marketing program designed for ${plan.purpose.toLowerCase()}.`, `The approved monthly price is PKR ${plan.price.toLocaleString()}. The program is managed as a growth system rather than a list of disconnected tasks.`, 'Program terms: the first month is charged at 25% extra; additional work outside package scope is charged separately; payment is 100% in advance; customized programs are available according to business requirements.'],
    highlights: [...plan.bestFor, ...plan.includes, `Platforms: ${plan.platforms}`], nextStepLabel: 'Back to programs', nextStepPath: '/programs'
  })
})

programs.terms.forEach((term, index) => add({
  slug: cardKey('programs', 'term', String(index + 1)), assetKey: cardKey('programs', 'term', String(index + 1)), title: term,
  eyebrow: 'Program term', summary: term, parentTitle: 'Programs & Pricing', parentPath: '/programs',
  body: [term, 'This is part of Afyra Digital’s current approved commercial terms and applies alongside the selected program scope.', 'Customized programs are available according to business requirements, while work outside an agreed package scope is charged separately.'],
  highlights: programs.terms, nextStepLabel: 'Review all programs', nextStepPath: '/programs'
}))

whyAfyra.columns.forEach((column) => add({
  slug: cardKey('about', 'positioning', column.heading), assetKey: cardKey('about', 'positioning', column.heading), title: column.heading,
  eyebrow: 'Agency positioning', summary: column.heading === 'What we focus on' ? 'Afyra focuses on solutions, strategy, systems and measurable business outcomes.' : 'Afyra avoids freelancer-style task selling, fake guarantees and generic marketing.', parentTitle: 'About Afyra Digital', parentPath: '/about',
  body: [column.heading === 'What we focus on' ? 'Afyra Digital should be perceived as an agency/company and strategic growth partner.' : 'Afyra Digital should never be positioned primarily as a freelancer, Canva designer, reel maker, ad runner or isolated task provider.', 'Design, content, ads, reels, captions and similar items are delivery components. They are not the company identity.', 'The client should feel that Afyra understands the business and can build or manage the digital system required for growth.'],
  highlights: column.items, nextStepLabel: 'Learn about Afyra', nextStepPath: '/about'
}))

const visionItems = ['Professional scalability','Strong agency positioning','Long-term brand equity','Systems rather than individual tasks','Recurring client relationships','Measurable business outcomes','Ability to expand services and industries']
visionItems.forEach((title) => add({
  slug: cardKey('about', 'vision', title), assetKey: cardKey('about', 'vision', title), title,
  eyebrow: 'Founder’s vision', summary: `${title} is part of Afyra Digital’s long-term company-building direction.`, parentTitle: 'About Afyra Digital', parentPath: '/about',
  body: ['Afyra Digital is being built with a long-term vision to develop into a professional, high-level digital agency and eventually expand toward a broader digital/software company.', `${title} is one of the factors that should guide branding, website, service and business decisions.`, 'The website and digital presence should represent where Afyra is going, not merely where it started.'],
  highlights: visionItems, nextStepLabel: 'Read Afyra’s vision', nextStepPath: '/about'
}))

const brandValues = ['Modern','Premium','Strategic','Confident','Intelligent','Clean','Trustworthy','Human','Results-Oriented']
brandValues.forEach((title) => add({
  slug: cardKey('about', 'brand-experience', title), assetKey: cardKey('about', 'brand-experience', title), title,
  eyebrow: 'Brand experience', summary: `${title} is part of the approved Afyra Digital website and brand personality.`, parentTitle: 'About Afyra Digital', parentPath: '/about',
  body: [`Afyra Digital’s desired website experience includes being ${title.toLowerCase()} while remaining clear, professional and usable.`, 'Design choices should prioritize hierarchy, readability, premium appearance, consistency, responsiveness and usability.', 'Afyra avoids cheap agency aesthetics, generic templates, excessive visual clutter, unsupported claims and unnecessary animation.'],
  highlights: brandValues, nextStepLabel: 'About the Afyra brand', nextStepPath: '/about'
}))

process.steps.forEach((step) => add({
  slug: cardKey('about', 'process', step.number, step.title), assetKey: cardKey('about', 'process', step.number, step.title), title: step.title,
  eyebrow: `Process step ${step.number}`, summary: step.description, parentTitle: 'About Afyra Digital', parentPath: '/about',
  body: [step.description, 'Afyra’s process is designed to keep strategy, positioning, systems, execution, reporting and long-term growth connected.', 'The objective is a structured engagement where the client understands what is happening, why it matters and what comes next.'],
  highlights: process.steps.map((item) => item.title), nextStepLabel: 'See the full process', nextStepPath: '/about'
}))

export const insightCards = [
  { tag: 'Positioning', title: 'Outcomes Over Deliverables', body: 'The number of posts or videos is not the main value proposition. The system should support visibility, trust, inquiries, authority, consistency and long-term growth.' },
  { tag: 'Healthcare', title: 'Trust Comes Before the Inquiry', body: 'Healthcare businesses have strong requirements around patient trust, professional reputation, visibility, education, local discovery and long-term authority.' },
  { tag: 'Paid Media', title: 'Ads Are One Component of the System', body: 'Advertising can work alongside strategy, content, social presence, Google Business Profile, WhatsApp, lead communication, brand authority and conversion.' },
  { tag: 'SEO', title: 'Search Should Support the Brand Experience', body: 'Consider search intent, site architecture, healthcare marketing topics, local SEO, metadata, internal linking, mobile usability and performance without sacrificing readability.' },
  { tag: 'Conversion', title: 'Make the Next Step Clear', body: 'Potential conversion channels include WhatsApp, contact form, consultation request, call request and program inquiry. CTA architecture should follow the complete user journey.' },
  { tag: 'Trust', title: 'Credibility Over Hype', body: 'Use real client work, case studies, testimonials, results, process, expertise and company information only when verified. Never fabricate proof.' }
]

insightCards.forEach((item) => add({
  slug: cardKey('insights', 'note', item.title), assetKey: cardKey('insights', 'note', item.title), title: item.title,
  eyebrow: item.tag, summary: item.body, parentTitle: 'Digital Growth Insights', parentPath: '/insights',
  body: [item.body, 'Afyra Digital applies this principle when evaluating website, marketing, conversion and growth decisions.', `The wider brand philosophy is ${brand.positioning} This means paid advertising can be part of the system while the focus remains on qualified inquiries and sustainable growth.`],
  highlights: ['Business value', 'Brand value', 'User experience', 'Conversion', 'Technical practicality', 'Long-term growth'], nextStepLabel: 'Explore insights', nextStepPath: '/insights'
}))

export const insightDecisions = ['Strategy over decoration','Outcomes over deliverables','Agency positioning over freelancer positioning','Credibility over hype','Clarity over complexity','Long-term brand value over short-term trends']
insightDecisions.forEach((title) => add({
  slug: cardKey('insights', 'decision', title), assetKey: cardKey('insights', 'decision', title), title,
  eyebrow: 'Decision philosophy', summary: `${title} is one of Afyra Digital’s approved decision filters for website, brand and growth work.`, parentTitle: 'Digital Growth Insights', parentPath: '/insights',
  body: [`Afyra Digital uses “${title}” as a practical decision principle.`, 'The broader evaluation order is business value, brand value, user experience, conversion, technical practicality and visual decoration.', 'This supports a serious long-term agency position and keeps the website focused on credibility, clarity and sustainable business value.'],
  highlights: insightDecisions, nextStepLabel: 'View all strategic principles', nextStepPath: '/insights'
}))

export const serviceVariantItems: Record<ServiceLayout, { kicker: string; title: string; items: { title: string; description: string }[] }> = {
  '02': { kicker: 'Flexible communication system', title: 'Communication That Supports Trust, Visibility and Authority.', items: [
    { title: 'Educational Communication', description: 'Use clear communication to help audiences understand the business and its value.' },
    { title: 'Content Direction', description: 'Keep content aligned with professional positioning, visibility and consistency.' },
    { title: 'Creative Assets', description: 'Use creative delivery components in service of the wider brand and growth system.' }
  ]},
  '03': { kicker: 'Healthcare specialization', title: 'Built With Healthcare Trust and Discovery in Mind.', items: [
    { title: 'Doctors & Clinics', description: 'Support professional reputation, patient trust, visibility and inquiry opportunities.' },
    { title: 'Hospitals', description: 'Strengthen digital presence and long-term authority with clear, professional communication.' },
    { title: 'Aesthetic & Cosmetic Centers', description: 'Build stronger visibility, trust and professional positioning across digital touchpoints.' }
  ]},
  '04': { kicker: 'Inquiry journey', title: 'From Visibility to a Qualified Conversation.', items: [
    { title: 'Discovery', description: 'Support visibility through social presence, campaigns and local discovery.' },
    { title: 'Inquiry', description: 'Use clearer lead communication through relevant digital touchpoints.' },
    { title: 'Appointment Opportunity', description: 'Align the system around qualified inquiries and appointment-focused marketing.' }
  ]},
  '05': { kicker: 'Website objective', title: 'A Strategic Business Asset, Not an Online Brochure.', items: [
    { title: 'Establish Credibility', description: 'Position the business professionally and make the value clear from the first interaction.' },
    { title: 'Build Trust', description: 'Use verified proof, clear structure and a professional experience to support confidence.' },
    { title: 'Generate Qualified Inquiries', description: 'Give visitors a clear path toward contact, consultation, call or program inquiry.' }
  ]},
  '06': { kicker: 'Outcome focus', title: 'Social Activity Connected to Business Value.', items: [
    { title: 'Visibility', description: 'Keep the brand consistently present across the channels that matter.' },
    { title: 'Trust & Reputation', description: 'Use professional communication and community interaction to support confidence.' },
    { title: 'Inquiries', description: 'Connect social and lead communication to real inquiry and appointment opportunities.' }
  ]},
  '07': { kicker: 'From setup to scale', title: 'Build the System for Long-Term Growth.', items: [
    { title: 'Positioning', description: 'Clarify the business, audience and growth direction before execution.' },
    { title: 'Connected Systems', description: 'Coordinate strategy, content, channels, campaigns and lead communication.' },
    { title: 'Long-Term Growth', description: 'Prioritize scalable systems, measurable outcomes and long-term brand equity.' }
  ]}
}

servicePages.forEach((service: ServicePageData) => {
  service.features.forEach((feature) => add({
    slug: cardKey(service.slug, 'feature', feature.title), assetKey: cardKey(service.slug, 'feature', feature.title), title: feature.title,
    eyebrow: service.name, summary: feature.description, parentTitle: service.name, parentPath: `/solutions/${service.slug}`,
    body: [feature.description, service.intro, `Within ${service.name}, this area is framed around business outcomes such as visibility, trust, qualified inquiries, conversion, authority and long-term growth rather than isolated activity.`],
    highlights: service.features.map((item) => item.title), nextStepLabel: `Back to ${service.name}`, nextStepPath: `/solutions/${service.slug}`
  }))

  service.process.forEach((step) => add({
    slug: cardKey(service.slug, 'process', step.title), assetKey: cardKey(service.slug, 'process', step.title), title: step.title,
    eyebrow: `${service.name} process`, summary: step.description, parentTitle: service.name, parentPath: `/solutions/${service.slug}`,
    body: [step.description, service.intro, 'Afyra frames the service through strategy, connected systems, business outcomes and sustainable growth.'],
    highlights: service.process.map((item) => item.title), nextStepLabel: `Back to ${service.name}`, nextStepPath: `/solutions/${service.slug}`
  }))

  programs.plans.forEach((plan) => add({
    slug: cardKey(service.slug, 'program', plan.id), assetKey: cardKey(service.slug, 'program', plan.id), title: `${plan.name} for ${service.name}`,
    eyebrow: 'Current Afyra marketing program', summary: `${plan.name}: ${plan.purpose}. PKR ${plan.price.toLocaleString()}/month.`, parentTitle: service.name, parentPath: `/solutions/${service.slug}`,
    body: [`${plan.name} is a current approved Afyra marketing program. On the ${service.name} page it is shown for program context rather than as a separate service-specific package.`, `Approved price: PKR ${plan.price.toLocaleString()} per month. ${plan.purpose}.`, 'The first month is charged at 25% extra, payment is 100% in advance, work outside package scope is charged separately, and customized programs are available according to business requirements.'],
    highlights: [...plan.includes, `Platforms: ${plan.platforms}`], nextStepLabel: 'Compare all programs', nextStepPath: '/programs'
  }))

  add({
    slug: cardKey(service.slug, 'proof', 'verified-trust'), assetKey: cardKey(service.slug, 'proof', 'verified-trust'), title: `Verified Trust & Proof for ${service.name}`,
    eyebrow: 'Credibility over hype', summary: service.proofNote, parentTitle: service.name, parentPath: `/solutions/${service.slug}`,
    body: [service.proofNote, 'Potential trust elements include client work, case studies, testimonials, real results, process, expertise and company or founder information.', 'Only verified information may be presented as fact. Fake testimonials, awards, certifications, statistics or results should never be fabricated.'],
    highlights: ['Client work', 'Case studies', 'Testimonials', 'Real results', 'Process', 'Expertise'], nextStepLabel: `Back to ${service.name}`, nextStepPath: `/solutions/${service.slug}`
  })

  serviceVariantItems[service.layout].items.forEach((item) => add({
    slug: cardKey(service.slug, 'showcase', item.title), assetKey: cardKey(service.slug, 'showcase', item.title), title: item.title,
    eyebrow: serviceVariantItems[service.layout].kicker, summary: item.description, parentTitle: service.name, parentPath: `/solutions/${service.slug}`,
    body: [item.description, service.intro, `This supports the wider ${service.name} system without turning the service into a freelancer-style list of isolated deliverables.`],
    highlights: service.touchpoints, nextStepLabel: `Explore ${service.name}`, nextStepPath: `/solutions/${service.slug}`
  }))
})

servicePages.forEach((service) => {
  servicePages.filter((target) => target.slug !== service.slug).forEach((target) => add({
    slug: cardKey(service.slug, 'crosslink', target.slug),
    assetKey: cardKey(service.slug, 'crosslink', target.slug),
    title: `${target.name} — Connected to ${service.name}`,
    eyebrow: 'Connected Afyra solution',
    summary: `${target.name} is a connected solution within Afyra Digital’s wider strategy, systems and growth approach.`,
    parentTitle: service.name,
    parentPath: `/solutions/${service.slug}`,
    body: [
      target.description,
      target.intro,
      `This connection shows how ${service.name} can work alongside ${target.name} without turning either solution into a list of disconnected tasks.`,
      ...(target.contentGap ? [target.contentGap] : [])
    ],
    highlights: target.features.map((item) => item.title),
    nextStepLabel: `Explore ${target.name}`,
    nextStepPath: `/solutions/${target.slug}`
  }))
})

;[1, 2, 3].forEach((item) => {
  const key = cardKey('website-development', 'insight-placeholder', String(item))
  add({
    slug: key, assetKey: key, title: `Website Development Insight ${String(item).padStart(2, '0')} — Pending Founder Input`,
    eyebrow: 'Approved content pending', summary: 'Approved website-development insight or article content has not been supplied in the current source material.', parentTitle: 'Website Development', parentPath: '/solutions/website-development',
    body: ['The current approved knowledge base does not provide standalone website-development article copy for this reference-layout slot.', 'This detail page intentionally keeps that limitation visible rather than inventing an article, claim, technical capability or result.', 'Founder-approved website-development insight content can replace this placeholder later without changing the route or page structure.'],
    highlights: ['No invented article copy', 'No unsupported technical claims', 'Founder approval required'], nextStepLabel: 'Back to Website Development', nextStepPath: '/solutions/website-development'
  })
})


export const cardDetails = details
export const cardBySlug = Object.fromEntries(details.map((item) => [item.slug, item])) as Record<string, CardDetail>
export const cardVisualKeys = Array.from(visualKeys)

const seoParentNames: Record<string, string> = {
  '/solutions': 'Solutions',
  '/healthcare': 'Healthcare',
  '/programs': 'Programs',
  '/about': 'About Afyra',
  '/insights': 'Insights',
  '/solutions/brand-creative-communication': 'Brand & Creative',
  '/solutions/digital-presence-advanced-systems': 'Digital Presence',
  '/solutions/patient-acquisition-lead-generation': 'Patient Acquisition',
  '/solutions/website-development': 'Website Development',
  '/solutions/social-media-community-lead-communication': 'Social & Lead Communication',
  '/solutions/digital-growth-marketing-strategy': 'Growth Strategy'
}

function compactText(value: string, max: number) {
  if (value.length <= max) return value
  const slice = value.slice(0, Math.max(1, max - 1))
  const boundary = slice.lastIndexOf(' ')
  return `${(boundary > max * .62 ? slice.slice(0, boundary) : slice).trim()}…`
}

function detailSectionLabel(slug: string) {
  if (slug.includes('-feature-')) return 'Feature'
  if (slug.includes('-showcase-')) return 'System'
  if (slug.includes('-process-')) return 'Process'
  if (slug.includes('-program-') || slug.startsWith('programs-plan-')) return 'Program'
  if (slug.includes('-proof-')) return 'Trust'
  if (slug.includes('insight-placeholder')) return 'Insight'
  if (slug.includes('-principle-') || slug.includes('-decision-')) return 'Principle'
  if (slug.includes('-journey-')) return 'Journey'
  if (slug.includes('-need-')) return 'Healthcare'
  if (slug.includes('-audience-')) return 'Audience'
  if (slug.includes('-vision-')) return 'Vision'
  if (slug.includes('-brand-experience-')) return 'Brand'
  if (slug.includes('-term-')) return 'Terms'
  if (slug.includes('-note-')) return 'Insight'
  if (slug.includes('-outcome-')) return 'Outcome'
  if (slug.includes('-positioning-')) return 'Positioning'
  return 'Detail'
}

export function cardSeoTitle(detail: CardDetail) {
  const parent = seoParentNames[detail.parentPath] ?? detail.parentTitle
  const section = detailSectionLabel(detail.slug)
  return `${compactText(detail.title, 32)} | ${section} | ${compactText(parent, 14)} | Afyra`
}

export function cardMetaDescription(detail: CardDetail) {
  const parent = seoParentNames[detail.parentPath] ?? detail.parentTitle
  return `${compactText(detail.title, 44)} in ${compactText(parent, 24)}. ${compactText(detail.summary, 80)}`
}
