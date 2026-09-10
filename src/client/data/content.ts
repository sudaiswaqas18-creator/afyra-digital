/**
 * All site copy is derived from the Afyra Digital Master Knowledge Base.
 * No invented statistics, testimonials, awards or case studies are used —
 * per the brand guide's "Never invent facts" rule.
 */

export const brand = {
  name: 'Afyra Digital',
  tagline: "Let's Grow Together",
  positioning: "We Don't Run Ads. We Bring Leads.",
  phone: '#03111-3111-91',
  phoneHref: 'tel:03111311191',
  email: 'afyradigital@gmail.com',
  whatsapp: 'PENDING FOUNDER INPUT'
}

export const nav = [
  { label: 'Home', href: '#home' },
  { label: 'Solutions', href: '#solutions' },
  { label: 'Why Afyra', href: '#why-afyra' },
  { label: 'Programs', href: '#programs' },
  { label: 'Process', href: '#process' },
  { label: 'FAQs', href: '#faqs' }
]

export const hero = {
  eyebrow: { tag: 'Healthcare', text: "Let's Grow Together" },
  title: 'We Build Growth Systems, Not Just Marketing.',
  description:
    'Afyra Digital is a digital growth and marketing agency helping doctors, clinics, hospitals and aesthetic centers build trust, stay visible and generate qualified patient inquiries.',
  primaryCta: { label: 'Book a Consultation', href: '/request-consultation' },
  secondaryCta: { label: 'View Programs', href: '#programs' }
}

/* Marquee row — the disciplines Afyra operates across (not fake client logos) */
export const capabilities = [
  'Growth Strategy',
  'Patient Acquisition',
  'Brand Positioning',
  'Google Business Profile',
  'Content Systems',
  'Paid Campaigns',
  'Local Visibility',
  'WhatsApp Journeys',
  'Social Management',
  'Lead Systems'
]

/* ---------------- Features (bento grid) ---------------- */
export const features = {
  eyebrow: { tag: 'Approach', text: 'Built for Real Business Outcomes' },
  title: 'A Digital System Designed Around Your Growth.',
  description:
    'We combine strategy, content, visibility and conversion into one managed system — so your digital presence works as a business asset, not a set of isolated tasks.',
  items: [
    {
      id: 'visibility',
      title: 'Visibility That Compounds',
      description:
        'Consistent presence across search, social and local discovery, so the right people find you at the moment they are looking.',
      kind: 'chart'
    },
    {
      id: 'trust',
      title: 'Trust Built Before First Contact',
      description:
        'Professional brand communication and educational content that positions you as the credible choice long before a patient calls.',
      kind: 'profile'
    },
    {
      id: 'inquiries',
      title: 'Qualified Inquiries, Not Just Reach',
      description:
        'Campaigns and inquiry systems engineered around appointments and real conversations, with clear tracking on what actually converts.',
      kind: 'funnel'
    },
    {
      id: 'managed',
      title: 'Fully Managed',
      description:
        'Planning, production, publishing and reporting handled end to end by one accountable team.',
      kind: 'team'
    }
  ]
}

/* ---------------- Benefits / solution pillars ---------------- */
export const solutions = {
  eyebrow: { tag: 'Solutions', text: 'Strategic Pillars, Not Task Lists' },
  title: 'Six Pillars That Drive Sustainable Growth',
  items: [
    {
      icon: 'strategy',
      title: 'Digital Growth & Marketing Strategy',
      href: '/solutions/digital-growth-marketing-strategy',
      description:
        'Strategy, planning, positioning, audience understanding and clear growth direction for your business.'
    },
    {
      icon: 'social',
      title: 'Social Media, Community & Lead Communication',
      href: '/solutions/social-media-community-lead-communication',
      description:
        'A professional social presence with consistent content direction, community interaction and connected lead communication.'
    },
    {
      icon: 'leads',
      title: 'Patient Acquisition & Lead Generation',
      href: '/solutions/patient-acquisition-lead-generation',
      description:
        'Campaigns, inquiry systems, lead generation and appointment-focused marketing built around conversion.'
    },
    {
      icon: 'website',
      title: 'Website Development',
      href: '/solutions/website-development',
      description:
        'A strategic website built around credibility, professional positioning, trust, usability and qualified inquiries.'
    },
    {
      icon: 'brand',
      title: 'Digital Presence / Advanced Digital Systems',
      href: '/solutions/digital-presence-advanced-systems',
      description:
        'A connected digital presence around visibility, local discovery, lead communication, authority and conversion.'
    },
    {
      icon: 'content',
      title: 'Brand & Creative Communication',
      href: '/solutions/brand-creative-communication',
      description:
        'Strategic content, short-form video, educational communication and creative assets that strengthen trust and authority.'
    }
  ]
}


/* ---------------- Programs (pricing) ---------------- */
export const programs = {
  eyebrow: { tag: 'Programs', text: 'Growth, structured by stage' },
  title: 'Choose the Program That Matches Your Stage.',
  description:
    'Each program is a managed growth system. Customized programs are available according to your business requirements.',
  currency: 'PKR',
  plans: [
    {
      id: 'starter',
      name: 'Starter Presence',
      price: 38000,
      purpose: 'Online Presence & Trust Building',
      icon: 'seed',
      popular: false,
      bestFor: [
        'Businesses starting their digital presence',
        'Weak or inactive social presence',
        'Businesses needing foundational trust',
        'Businesses needing a professional online presence'
      ],
      platforms: 'Facebook + Instagram',
      includes: [
        '14 Static Posts',
        '4 Animated Posts',
        '3 Video Edits / Shorts / Reels',
        'Account Creation & Optimization',
        'Content Creation',
        'Weekly Performance Report',
        'Regular Uploading',
        'Monthly Content Planner',
        'Researched Hashtags',
        'Calendar Maintenance where required'
      ]
    },
    {
      id: 'growth',
      name: 'Patient Growth Plan',
      price: 66500,
      purpose: 'Appointments & Inquiry Focused',
      icon: 'growth',
      popular: true,
      bestFor: [
        'Clinics focused on appointments',
        'Practices needing consistent inquiries',
        'Businesses ready for paid campaigns',
        'Doctors expanding patient reach'
      ],
      platforms: 'Facebook + Instagram + TikTok',
      includes: [
        '19 Static Posts',
        '8 Animated Posts',
        '6 Video Edits / Shorts / Reels',
        'Paid Ad Campaigns',
        'Advanced Messenger Auto-Replies',
        'Monthly Strategy Plan',
        'Instagram Highlights Setup + Covers',
        'Theme Selection / Branding',
        'Advanced Google Business Profile Management',
        'Monthly Zoom Growth Meeting'
      ]
    },
    {
      id: 'authority',
      name: 'Authority Building Plan',
      price: 128500,
      purpose: 'Long-Term Authority & Strong Positioning',
      icon: 'authority',
      popular: false,
      bestFor: [
        'Aesthetic / Cosmetic Centers',
        'Established Clinics',
        'Hospitals',
        'Doctors strengthening patient trust',
        'Businesses requiring multi-platform authority'
      ],
      platforms: 'Facebook + Instagram + TikTok + YouTube + WhatsApp',
      includes: [
        '30 Static Posts',
        '16 Animated Posts',
        '14 Video Edits / Shorts / Reels',
        'Paid Ad Campaigns',
        'Pro Messenger Auto-Replies',
        'Monthly Strategy Plan',
        'Instagram Highlights Setup + Covers',
        'Theme Selection / Branding',
        'Pro Google Business Profile Management',
        'Monthly Zoom Growth Meeting',
        'Brand Kit Creation',
        'YouTube SEO — up to 5 videos',
        'WhatsApp Business Optimization',
        'WhatsApp Auto-Replies Setup',
        'WhatsApp Business Catalogue Design',
        'Community Management & Comment Replies',
        'Dedicated Support'
      ]
    }
  ],
  terms: [
    'First month is charged at 25% extra.',
    'Additional work outside package scope is charged separately.',
    'Payment is 100% in advance.',
    'Customized programs are available according to business requirements.'
  ]
}

/* ---------------- Who we help ---------------- */
export const audience = {
  title: 'Who We Help',
  description:
    'Our strongest specialization is healthcare marketing — where patient trust, professional reputation and local discovery decide growth.',
  items: [
    { label: 'Doctors', icon: 'doctor' },
    { label: 'Clinics', icon: 'clinic' },
    { label: 'Hospitals', icon: 'hospital' },
    { label: 'Aesthetic Centers', icon: 'aesthetic' },
    { label: 'Cosmetic Centers', icon: 'cosmetic' }
  ]
}

/* ---------------- Why Afyra (differentiators) ---------------- */
export const whyAfyra = {
  eyebrow: { tag: 'Why Afyra', text: 'Agency, not freelancer' },
  title: 'A Strategic Growth Partner — Built to Scale With You',
  columns: [
    {
      heading: 'What we focus on',
      tone: 'positive',
      items: [
        'Solutions, strategy and systems',
        'Measurable business outcomes',
        'Patient trust and professional reputation',
        'Local visibility and discovery',
        'Recurring, long-term partnership',
        'Clear reporting and accountability'
      ]
    },
    {
      heading: 'What we avoid',
      tone: 'negative',
      items: [
        'Selling isolated design tasks',
        'Fake guarantees and inflated claims',
        'Vanity metrics with no business value',
        'Aggressive sales pressure',
        'Generic template marketing',
        'Pressing “Boost” and calling it strategy'
      ]
    }
  ]
}

/* ---------------- Process ---------------- */
export const process = {
  eyebrow: { tag: 'Process', text: 'How we work' },
  title: 'A Clear Path From Consultation to Growth.',
  description:
    'A structured engagement so you always know what is happening, why it matters and what comes next.',
  steps: [
    {
      number: '1',
      title: 'Discovery & Consultation',
      description:
        'We understand your practice, your patients, your competition and the growth outcome you actually need.'
    },
    {
      number: '2',
      title: 'Strategy & Positioning',
      description:
        'We define your positioning, audience, content direction and the growth system that fits your stage.'
    },
    {
      number: '3',
      title: 'Build & Launch',
      description:
        'We set up profiles, branding, content production, campaigns and inquiry systems, then take them live.'
    },
    {
      number: '4',
      title: 'Manage, Report & Scale',
      description:
        'We manage the system continuously, report on performance and refine it toward stronger results.'
    }
  ]
}

/* ---------------- FAQs ---------------- */
export const faqs = {
  eyebrow: { tag: 'Questions', text: 'Clarity before commitment' },
  title: 'Frequently Asked Questions',
  description:
    'Answers about how we work, what our programs include and how we approach growth for healthcare businesses.',
  items: [
    {
      q: 'What does “We Don\'t Run Ads. We Bring Leads.” actually mean?',
      a: 'It does not mean we avoid paid advertising. It means advertising is treated as one component of a larger growth system — alongside strategy, content, social presence, Google Business Profile, WhatsApp, lead communication and conversion. Our objective is qualified inquiries, not ad activity for its own sake.'
    },
    {
      q: 'Do you only work with healthcare businesses?',
      a: 'Healthcare marketing is our strongest current specialization — doctors, clinics, hospitals and aesthetic or cosmetic centers. It is a specialization and competitive strength rather than a permanent limitation, and we can discuss other industries based on fit.'
    },
    {
      q: 'How is Afyra different from hiring a freelancer?',
      a: 'A freelancer typically delivers isolated tasks such as posts, reels or ad boosting. Afyra operates as an agency and strategic growth partner: we build and manage the digital system required for growth, with strategy, consistency, reporting and accountability built in.'
    },
    {
      q: 'What do your programs include?',
      a: 'We offer three programs — Starter Presence, Patient Growth Plan and Authority Building Plan — each covering content, platform management, visibility and, from the Patient Growth Plan onward, paid campaigns and advanced growth systems. Full inclusions are listed in the Programs section.'
    },
    {
      q: 'How does payment work?',
      a: 'Payment is 100% in advance. The first month is charged at 25% extra. Any additional work outside the agreed package scope is charged separately.'
    },
    {
      q: 'Can a program be customized for my business?',
      a: 'Yes. Customized programs are available according to your business requirements. If none of the three programs fits your situation exactly, we can structure a program around your specific growth objective.'
    }
  ]
}

/* ---------------- CTA ---------------- */
export const cta = {
  title: 'Let\'s Build Your Growth System.',
  description:
    'Tell us about your practice and the growth outcome you want. We will walk you through the approach and the program that fits your stage.',
  notice: 'No obligation. No aggressive sales pitch — just a clear conversation about your growth.',
  buttonLabel: 'Request Consultation'
}

/* ---------------- Footer ---------------- */
export const footer = {
  description:
    'A professional digital growth and marketing agency building stronger visibility, patient trust, qualified inquiries and connected growth systems for healthcare businesses.',
  columns: [
    {
      title: 'Company',
      links: [
        { label: 'Home', href: '/' },
        { label: 'About Afyra', href: '/about' },
        { label: 'Healthcare Marketing', href: '/healthcare' },
        { label: 'Our Approach', href: '/#solutions' },
        { label: 'Why Afyra', href: '/#why-afyra' },
        { label: 'Process', href: '/#process' },
        { label: 'Insights', href: '/insights' },
        { label: 'Request Consultation', href: '/request-consultation' }
      ]
    },
    {
      title: 'Solutions',
      links: [
        { label: 'Digital Growth & Marketing Strategy', href: '/solutions/digital-growth-marketing-strategy' },
        { label: 'Patient Acquisition & Lead Generation', href: '/solutions/patient-acquisition-lead-generation' },
        { label: 'Digital Presence & Growth Systems', href: '/solutions/digital-presence-advanced-systems' },
        { label: 'Website Development', href: '/solutions/website-development' },
        { label: 'Brand & Creative Communication', href: '/solutions/brand-creative-communication' },
        { label: 'Social Media & Lead Communication', href: '/solutions/social-media-community-lead-communication' }
      ]
    },
    {
      title: 'Programs',
      links: [
        { label: 'Starter Presence — PKR 38,000/mo', href: '/programs' },
        { label: 'Patient Growth Plan — PKR 66,500/mo', href: '/programs' },
        { label: 'Authority Building Plan — PKR 128,500/mo', href: '/programs' },
        { label: 'Programs & Pricing', href: '/programs' },
        { label: 'Customized Programs', href: '/programs' },
        { label: 'Program Inquiry', href: '/request-consultation' }
      ]
    }
  ],
  social: [
    { label: 'WhatsApp / Consultation', icon: 'whatsapp', href: '/request-consultation' }
  ]
}
