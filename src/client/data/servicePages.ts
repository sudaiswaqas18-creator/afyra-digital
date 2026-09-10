export type ServiceLayout = '02' | '03' | '04' | '05' | '06' | '07'

export type ServicePageData = {
  slug: string
  name: string
  layout: ServiceLayout
  title: string
  description: string
  eyebrow: string
  intro: string
  features: { title: string; description: string }[]
  touchpoints: string[]
  process: { title: string; description: string }[]
  proofNote: string
  seo: { title: string; description: string }
  contentGap?: string
}

const commonProof =
  'Verified client work, case studies, testimonials and real results should be shown only when they are available and approved. PENDING FOUNDER INPUT.'

export const servicePages: ServicePageData[] = [
  {
    slug: 'brand-creative-communication',
    name: 'Brand & Creative Communication',
    layout: '02',
    title: 'Brand & Creative Communication',
    eyebrow: 'Content & Creative Communication',
    description:
      'Build a professional brand presence with strategic content, educational communication, short-form video and creative assets designed to strengthen trust and authority.',
    intro:
      'Afyra treats design and content as delivery components inside a larger growth system. The goal is consistent communication, stronger positioning and a professional digital presence—not isolated creative tasks.',
    features: [
      { title: 'Professional Brand Identity', description: 'Create a credible brand and digital presence with consistent communication across touchpoints.' },
      { title: 'Strategic Content Direction', description: 'Use content direction that supports visibility, trust, education and long-term brand authority.' },
      { title: 'Educational Communication', description: 'Communicate clearly in business language that helps audiences understand value without unnecessary jargon.' },
      { title: 'Short-Form Video', description: 'Use short-form video as a communication component inside the wider growth system.' },
      { title: 'Creative Assets', description: 'Support the brand with creative assets that strengthen consistency and professional positioning.' },
      { title: 'Brand Consistency', description: 'Keep communication aligned across social presence, content and the wider digital journey.' }
    ],
    touchpoints: ['Strategy', 'Content', 'Social Presence', 'Brand Authority', 'Google Business Profile', 'WhatsApp'],
    process: [
      { title: 'Strategy', description: 'Align communication with business positioning, audience understanding and growth direction.' },
      { title: 'Systems', description: 'Build a consistent digital presence rather than selling isolated design or content activity.' },
      { title: 'Outcomes', description: 'Focus communication on visibility, trust, inquiries, authority and long-term business value.' },
      { title: 'Growth', description: 'Maintain consistency so the brand continues to support sustainable growth.' }
    ],
    proofNote: commonProof,
    seo: {
      title: 'Brand & Creative Communication | Afyra Digital',
      description: 'Afyra Digital builds brand presence, strategic content and creative communication systems designed to strengthen trust, visibility and authority.'
    }
  },
  {
    slug: 'digital-presence-advanced-systems',
    name: 'Digital Presence / Advanced Digital Systems',
    layout: '03',
    title: 'Digital Presence / Advanced Digital Systems',
    eyebrow: 'Brand & Digital Presence',
    description:
      'Build a connected digital presence around visibility, trust, local discovery, lead communication and conversion—so your online ecosystem works as a business asset.',
    intro:
      'Afyra’s broader growth approach can connect strategy, content, social presence, paid campaigns, Google Business Profile, WhatsApp, lead communication, the patient/customer journey, brand authority and conversion.',
    features: [
      { title: 'Digital Visibility', description: 'Strengthen how consistently the business is seen across relevant digital touchpoints.' },
      { title: 'Brand Positioning', description: 'Present the business professionally and consistently to strengthen trust and reputation.' },
      { title: 'Local Visibility', description: 'Support local discovery through Google Business Profile and reputation-building.' },
      { title: 'Lead Communication', description: 'Create clearer communication pathways for inquiries and appointment opportunities.' },
      { title: 'Patient / Customer Journey', description: 'Treat digital touchpoints as one connected journey rather than unrelated channels.' },
      { title: 'Conversion Focus', description: 'Align visibility and communication with inquiries, appointments and measurable business outcomes.' }
    ],
    touchpoints: ['Social Presence', 'Paid Campaigns', 'Google Business Profile', 'WhatsApp', 'Lead Communication', 'Conversion'],
    process: [
      { title: 'Positioning', description: 'Start with clear business positioning and the audience the digital presence needs to serve.' },
      { title: 'Visibility', description: 'Build consistency across the channels that influence trust, discovery and reputation.' },
      { title: 'Communication', description: 'Connect inquiries and lead communication into the wider customer or patient journey.' },
      { title: 'Growth', description: 'Manage the system around measurable business outcomes and long-term growth.' }
    ],
    proofNote: commonProof,
    contentGap:
      'The Master Knowledge Base does not define technical “Advanced Digital Systems” products or software capabilities. This page therefore limits that phrase to connected digital-growth systems until founder-approved technical service details are provided.',
    seo: {
      title: 'Digital Presence & Growth Systems | Afyra Digital',
      description: 'Afyra Digital builds connected digital presence systems around visibility, local discovery, lead communication, brand authority and conversion.'
    }
  },
  {
    slug: 'patient-acquisition-lead-generation',
    name: 'Patient Acquisition & Lead Generation',
    layout: '04',
    title: 'Patient Acquisition & Lead Generation',
    eyebrow: 'Appointments & Inquiry Focused',
    description:
      'Connect campaigns, inquiry systems, lead generation and appointment-focused marketing into a broader growth system built around qualified conversations.',
    intro:
      'Afyra’s positioning is simple: advertising is one component of a larger system. Strategy, content, paid campaigns, Google Business Profile, WhatsApp, lead communication, patient journey, brand authority and conversion work together.',
    features: [
      { title: 'Lead Generation', description: 'Build campaigns and inquiry systems around qualified inquiries rather than activity alone.' },
      { title: 'Appointment-Focused Marketing', description: 'Align marketing with appointment opportunities and real business conversations.' },
      { title: 'Paid Campaigns', description: 'Use paid advertising as one component of the wider growth system—not the entire strategy.' },
      { title: 'Messenger Auto-Replies', description: 'Support inquiry handling with advanced or pro Messenger auto-replies where included in the selected program.' },
      { title: 'Google Business Profile', description: 'Strengthen local visibility and discovery with advanced or pro management where included.' },
      { title: 'WhatsApp Communication', description: 'Support lead communication with WhatsApp Business optimization and auto-replies where included.' }
    ],
    touchpoints: ['Strategy', 'Paid Campaigns', 'Google Business Profile', 'Messenger', 'WhatsApp', 'Conversion'],
    process: [
      { title: 'Strategy', description: 'Define positioning, audience understanding and the growth direction behind acquisition activity.' },
      { title: 'Campaigns', description: 'Use paid campaigns where appropriate as part of the larger growth system.' },
      { title: 'Inquiry System', description: 'Support the path from visibility to lead communication and appointment opportunities.' },
      { title: 'Outcomes', description: 'Evaluate the system around qualified inquiries, conversion and measurable business outcomes.' }
    ],
    proofNote: commonProof,
    seo: {
      title: 'Patient Acquisition & Lead Generation | Afyra Digital',
      description: 'Afyra Digital connects campaigns, inquiry systems and appointment-focused marketing for doctors, clinics, hospitals and aesthetic centers.'
    }
  },
  {
    slug: 'website-development',
    name: 'Website Development',
    layout: '05',
    title: 'Website Development',
    eyebrow: 'Strategic Business Asset',
    description:
      'A website should establish credibility, position the company professionally, explain the approach, build trust, support sales conversations and generate qualified inquiries.',
    intro:
      'Afyra’s Master Knowledge Base defines the website as a strategic business asset—not simply an online brochure. The site should communicate who Afyra helps, what problem is solved, how the approach works, why the company should be trusted and what the visitor should do next.',
    features: [
      { title: 'Credibility', description: 'Structure the website to establish professional credibility from the first interaction.' },
      { title: 'Agency Positioning', description: 'Present the company as a strategic agency and growth partner rather than a freelancer listing tasks.' },
      { title: 'Audience Clarity', description: 'Make it easy for visitors to understand who the business helps and why the solution is relevant.' },
      { title: 'Trust & Proof', description: 'Use only real client work, case studies, testimonials, results, process and expertise when verified.' },
      { title: 'Qualified Inquiries', description: 'Build the journey around clear next steps such as contact, consultation, call or program inquiry.' },
      { title: 'SEO & Usability', description: 'Consider search intent, site architecture, metadata, internal linking, mobile usability and performance from the beginning.' }
    ],
    touchpoints: ['Credibility', 'Positioning', 'Trust', 'Conversion', 'SEO', 'Mobile Usability'],
    process: [
      { title: 'Business Value', description: 'Prioritize the role the website needs to play in credibility, conversion and long-term brand value.' },
      { title: 'Brand Value', description: 'Use the site to strengthen professional positioning and scalable brand equity.' },
      { title: 'User Experience', description: 'Choose clarity over complexity and use interaction only where it improves storytelling and usability.' },
      { title: 'Technical Practicality', description: 'Balance performance, mobile usability, SEO and practical implementation before decoration.' }
    ],
    proofNote: commonProof,
    contentGap:
      'PENDING FOUNDER INPUT: the Master Knowledge Base does not currently define Website Development deliverables, technical stack, delivery process, timelines, standalone pricing, hosting, maintenance or revision terms. This page intentionally avoids inventing them.',
    seo: {
      title: 'Website Development | Afyra Digital',
      description: 'Afyra Digital approaches websites as strategic business assets built around credibility, positioning, trust, qualified inquiries, SEO and mobile usability.'
    }
  },
  {
    slug: 'social-media-community-lead-communication',
    name: 'Social Media, Community & Lead Communication',
    layout: '06',
    title: 'Social Media, Community & Lead Communication',
    eyebrow: 'Professional Digital Presence',
    description:
      'Manage a consistent social presence, content direction, community interaction and lead communication as one connected system around trust, visibility and inquiries.',
    intro:
      'Afyra does not position social media as a list of posts and reels. Social presence, content, community management, Messenger and WhatsApp are delivery components inside a managed growth system.',
    features: [
      { title: 'Social Presence', description: 'Maintain a professional and consistent digital presence across relevant social platforms.' },
      { title: 'Content Direction', description: 'Use strategic content direction to support education, trust, visibility and brand consistency.' },
      { title: 'Community Management', description: 'Manage community interaction and comment replies where included in the selected program.' },
      { title: 'Messenger Auto-Replies', description: 'Support incoming conversations with advanced or pro Messenger auto-replies where included.' },
      { title: 'WhatsApp Business', description: 'Support WhatsApp Business optimization, auto-replies and catalogue design where included.' }
    ],
    touchpoints: ['Facebook', 'Instagram', 'TikTok', 'YouTube', 'WhatsApp', 'Messenger', 'Google Business Profile'],
    process: [
      { title: 'Presence', description: 'Keep the brand visible and professionally represented across the channels that matter.' },
      { title: 'Communication', description: 'Use clear, consistent content and lead communication to strengthen trust.' },
      { title: 'Community', description: 'Support audience management and comment replies where the selected program includes them.' },
      { title: 'Inquiries', description: 'Connect social interaction to inquiry handling and appointment opportunities.' }
    ],
    proofNote: commonProof,
    seo: {
      title: 'Social Media, Community & Lead Communication | Afyra Digital',
      description: 'Afyra Digital connects social presence, content direction, community interaction, Messenger and WhatsApp lead communication into one growth system.'
    }
  },
  {
    slug: 'digital-growth-marketing-strategy',
    name: 'Digital Growth & Marketing Strategy',
    layout: '07',
    title: 'Digital Growth & Marketing Strategy',
    eyebrow: 'Strategy → Systems → Outcomes → Growth',
    description:
      'Build a clear growth direction around strategy, planning, positioning, audience understanding and measurable business outcomes.',
    intro:
      'Afyra focuses on growth systems rather than marketing activity. The strategic lens includes digital visibility, brand positioning, trust, acquisition, lead generation, local visibility, conversion, authority, consistency and long-term growth.',
    features: [
      { title: 'Strategy & Planning', description: 'Create a clear direction for how the digital system should support the business.' },
      { title: 'Positioning', description: 'Clarify how the brand should be perceived and why the audience should trust it.' },
      { title: 'Audience Understanding', description: 'Keep communication grounded in what customers care about: trust, reputation, visibility, inquiries, growth, ROI and convenience.' },
      { title: 'Growth Direction', description: 'Coordinate channels and activity around sustainable growth rather than isolated outputs.' },
      { title: 'Measurable Outcomes', description: 'Evaluate work around business outcomes instead of vanity activity alone.' },
      { title: 'Long-Term Brand Value', description: 'Make decisions that support scalability, recurring relationships and long-term brand equity.' }
    ],
    touchpoints: ['Strategy', 'Content', 'Social Presence', 'Paid Campaigns', 'Google Business Profile', 'WhatsApp', 'Lead Communication', 'Conversion'],
    process: [
      { title: 'Strategy', description: 'Set direction through planning, positioning and audience understanding.' },
      { title: 'Systems', description: 'Connect the channels and delivery components required for consistent execution.' },
      { title: 'Outcomes', description: 'Focus on visibility, trust, inquiries, conversion, authority and measurable business value.' },
      { title: 'Growth', description: 'Build toward sustainable growth, scalability and long-term brand equity.' }
    ],
    proofNote: commonProof,
    seo: {
      title: 'Digital Growth & Marketing Strategy | Afyra Digital',
      description: 'Afyra Digital builds growth strategy around planning, positioning, audience understanding, connected systems, measurable outcomes and long-term brand value.'
    }
  }
]

export const serviceBySlug = Object.fromEntries(servicePages.map((page) => [page.slug, page])) as Record<string, ServicePageData>

export const serviceNav = servicePages.map(({ slug, name }) => ({ name, href: `/solutions/${slug}` }))
