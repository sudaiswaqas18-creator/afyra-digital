import { useEffect, useState, type CSSProperties, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import type { ServicePageData } from '../data/servicePages'
import { process, programs } from '../data/content'
import PublicIcon from './PublicIcon'
import SectionLabel from './SectionLabel'
import { ProcessLayout } from './Process'

const visualByLayout: Record<string, string> = {
  '03': '/static/ref-solutions/digital-presence-hub.webp',
  '04': '/static/ref-solutions/patient-acquisition-hub.webp',
  '05': '/static/ref-solutions/website-development-hub.webp',
  '06': '/static/ref-solutions/social-communication-hub.webp',
  '07': '/static/ref-solutions/growth-strategy-hub.webp'
}

const referenceName: Record<string, string> = {
  '03': 'Blockchain / Web3 motion language',
  '04': 'AI Chatbot motion language',
  '05': 'App Builder motion language',
  '06': 'Help Desk motion language',
  '07': 'FinTech motion language'
}

const pageMicrocopy: Record<string, { heroTag: string; heroLine: string; systemTitle: string; systemText: string; visualTitle: string; visualText: string }> = {
  '03': {
    heroTag: 'Connected Digital Infrastructure',
    heroLine: 'Visibility, trust, discovery and conversion — connected as one digital system.',
    systemTitle: 'Everything Your Digital Presence Needs to Work Together.',
    systemText: 'Each touchpoint supports a connected journey instead of operating as a separate activity.',
    visualTitle: 'A Connected Presence Built Around Business Outcomes.',
    visualText: 'Strategy, social presence, paid campaigns, Google Business Profile, WhatsApp and lead communication work together around trust and conversion.'
  },
  '04': {
    heroTag: 'Appointments & Inquiry Focused',
    heroLine: 'Turn visibility into qualified conversations and clearer appointment opportunities.',
    systemTitle: 'Build a Better Path From Inquiry to Conversation.',
    systemText: 'Afyra connects campaigns, response systems, local discovery and lead communication around the next meaningful business step.',
    visualTitle: 'Patient Acquisition Is More Than Running Ads.',
    visualText: 'Paid campaigns are one component. The broader system combines visibility, communication, local discovery, patient journey and conversion.'
  },
  '05': {
    heroTag: 'Strategic Business Asset',
    heroLine: 'Build a website that strengthens credibility, positioning, trust and qualified inquiry paths.',
    systemTitle: 'A Website Should Work Like a Business System.',
    systemText: 'Structure, clarity, proof, conversion and usability should work together — not exist as disconnected visual decoration.',
    visualTitle: 'Designed Around Trust, Clarity and the Next Step.',
    visualText: 'A professional website should quickly explain who you help, what problem you solve, how you work, why you should be trusted and what the visitor should do next.'
  },
  '06': {
    heroTag: 'Unified Lead Communication',
    heroLine: 'Bring social presence, community interaction and inquiry handling into one managed communication system.',
    systemTitle: 'One Communication System Across the Channels That Matter.',
    systemText: 'Social media, Messenger, WhatsApp and community interaction support trust when they are managed as one connected experience.',
    visualTitle: 'Manage Presence, Community and Inquiry Together.',
    visualText: 'Afyra treats posts, replies, short-form content and auto-replies as delivery components inside a wider growth system.'
  },
  '07': {
    heroTag: 'Strategy → Systems → Outcomes → Growth',
    heroLine: 'Create a clear growth direction around positioning, audience understanding and measurable business outcomes.',
    systemTitle: 'Build Growth Around Direction, Not Random Activity.',
    systemText: 'Strategy defines the role of each channel so execution supports visibility, trust, acquisition, conversion and long-term brand value.',
    visualTitle: 'A Strategic View of the Complete Growth System.',
    visualText: 'The goal is not more activity. The goal is a connected system that supports measurable business outcomes and sustainable growth.'
  }
}

const faqs = [
  {
    q: 'Does “We Don’t Run Ads. We Bring Leads.” mean Afyra does not run paid advertising?',
    a: 'No. Paid advertising can be part of the system. The positioning means ads are treated as one component alongside strategy, content, social presence, Google Business Profile, WhatsApp, lead communication, the patient/customer journey, brand authority and conversion.'
  },
  {
    q: 'Is Afyra only for healthcare businesses?',
    a: 'Healthcare is Afyra’s strongest current specialization, particularly doctors, clinics, hospitals and aesthetic/cosmetic centers. It is a competitive strength rather than a permanent limitation on future industries.'
  },
  {
    q: 'Does Afyra guarantee leads or revenue?',
    a: 'No unsupported guarantees are used. Afyra focuses on strategy, systems, measurable business outcomes and credible communication without fake claims or overpromising.'
  },
  {
    q: 'Are customized programs available?',
    a: 'Yes. Customized programs are available according to business requirements. Additional work outside package scope is charged separately.'
  }
]

function PrimaryButton({ children }: { children: ReactNode }) {
  return <Link className="rs-btn rs-btn--primary" to="/request-consultation">{children}<PublicIcon name="arrowRight" size={17} /></Link>
}

function SecondaryButton({ children }: { children: ReactNode }) {
  return <a className="rs-btn rs-btn--ghost" href="#rs-programs">{children}</a>
}

function ReferenceHero({ data }: { data: ServicePageData }) {
  const micro = pageMicrocopy[data.layout]
  return (
    <section className="rs-hero" data-rs-hero>
      <div className="rs-hero__noise" aria-hidden="true" />
      <div className="rs-hero__beam rs-hero__beam--left" data-rs-float="slow" aria-hidden="true" />
      <div className="rs-hero__beam rs-hero__beam--right" data-rs-float="slow" aria-hidden="true" />
      <div className="af-container rs-hero__inner">
        <div className="rs-hero__copy" data-rs-hero-copy>
          <div className="rs-reference-pill"><span /> {micro.heroTag}</div>
          <h1>{data.title}</h1>
          <p className="rs-hero__lead">{data.description}</p>
          <p className="rs-hero__sub">{micro.heroLine}</p>
          <div className="rs-hero__actions"><PrimaryButton>Request Consultation</PrimaryButton><SecondaryButton>View Programs</SecondaryButton></div>
          <div className="rs-positioning">We Don’t Run Ads. We Bring Leads.</div>
        </div>

        <div className="rs-hero__stage" data-rs-hero-stage>
          <div className="rs-hero__halo rs-hero__halo--one" data-rs-orbit aria-hidden="true" />
          <div className="rs-hero__halo rs-hero__halo--two" data-rs-orbit-reverse aria-hidden="true" />
          <figure className="rs-hero__visual" data-rs-depth="1">
            <img src={visualByLayout[data.layout]} alt={`${data.name} visual system`} />
          </figure>
          <div className="rs-hero__chip rs-hero__chip--a" data-rs-float="a"><b>Visibility</b><span>Connected</span></div>
          <div className="rs-hero__chip rs-hero__chip--b" data-rs-float="b"><b>Trust</b><span>Professional</span></div>
          <div className="rs-hero__chip rs-hero__chip--c" data-rs-float="c"><b>Inquiries</b><span>Qualified Path</span></div>
        </div>
      </div>
      <div className="rs-hero__trust af-container" data-rs-hero-trust>
        <span>Doctors</span><span>Clinics</span><span>Hospitals</span><span>Aesthetic Centers</span><span>Cosmetic Centers</span>
      </div>
    </section>
  )
}

function StorySection({ data, bright = false }: { data: ServicePageData; bright?: boolean }) {
  const micro = pageMicrocopy[data.layout]
  return (
    <section className={`rs-story ${bright ? 'rs-section--light' : ''}`} data-rs-story>
      <div className="af-container rs-story__pin" data-rs-story-pin>
        <div className="rs-story__intro" data-rs-story-intro>
          <SectionLabel text="Growth system" />
          <h2>{micro.systemTitle}</h2>
          <p>{micro.systemText}</p>
          <div className="rs-scroll-cue"><i /> Scroll to reveal the complete system</div>
        </div>
        <div className="rs-story__grid" data-rs-story-grid>
          {data.features.map((feature, index) => (
            <article className="rs-feature" data-rs-feature key={feature.title}>
              <div className="rs-feature__top"><span>{String(index + 1).padStart(2, '0')}</span><i><PublicIcon name={index % 3 === 0 ? 'growth' : index % 3 === 1 ? 'spark' : 'check'} size={20} /></i></div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
              <div className="rs-feature__signal" aria-hidden="true"><b /><b /><b /></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function ExperienceVisual({ data, bright = false }: { data: ServicePageData; bright?: boolean }) {
  const micro = pageMicrocopy[data.layout]
  return (
    <section className={`rs-experience ${bright ? 'rs-section--light' : ''}`} data-rs-experience>
      <div className="af-container">
        <div className="rs-section-head" data-rs-reveal>
          <SectionLabel text="System experience" />
          <h2>{micro.visualTitle}</h2>
          <p>{micro.visualText}</p>
        </div>
        <div className="rs-experience__stage" data-rs-theater>
          <div className="rs-theater__glow" aria-hidden="true" />
          <img src={visualByLayout[data.layout]} alt={`${data.name} connected system overview`} loading="lazy" decoding="async" />
          {data.touchpoints.slice(0, 6).map((item, index) => <span key={item} className={`rs-hotspot rs-hotspot--${index + 1}`} data-rs-hotspot>{item}</span>)}
        </div>
      </div>
    </section>
  )
}

function IntegrationOrbit({ data, bright = false }: { data: ServicePageData; bright?: boolean }) {
  return (
    <section className={`rs-orbit-section ${bright ? 'rs-section--light' : ''}`} data-rs-integration>
      <div className="af-container">
        <div className="rs-section-head" data-rs-reveal>
          <SectionLabel text="Connected touchpoints" />
          <h2>Connect the Channels That Influence Trust, Discovery and Conversion.</h2>
          <p>Afyra’s approach treats each channel as part of one growth system instead of a separate task list.</p>
        </div>
        <div className="rs-integration-orbit" data-rs-integration-orbit>
          <svg viewBox="0 0 1000 350" preserveAspectRatio="none" aria-hidden="true"><path data-rs-integration-path d="M60 96 C225 330 775 330 940 96" /></svg>
          {data.touchpoints.slice(0, 8).map((item, index) => <div className={`rs-integration rs-integration--${index + 1}`} data-rs-integration-item key={item}><i><PublicIcon name={index % 2 ? 'spark' : 'growth'} size={20} /></i><span>{item}</span></div>)}
        </div>
      </div>
    </section>
  )
}

function ProcessSection({ data, bright = false, pathStyle = false }: { data: ServicePageData; bright?: boolean; pathStyle?: boolean }) {
  return (
    <section className={`rs-process ${bright ? 'rs-section--light' : ''} ${pathStyle ? 'rs-process--path' : ''}`} data-rs-process>
      <div className="af-container">
        <div className="rs-section-head" data-rs-reveal>
          <SectionLabel text="How it works" />
          <h2>Strategy First. Systems Next. Outcomes Always.</h2>
          <p>The structure stays simple: understand the business, connect the right growth components, improve the journey and manage toward long-term value.</p>
        </div>
        <div className="rs-process__track" data-rs-process-track>
          <div className="rs-process__line" aria-hidden="true"><i data-rs-process-line /></div>
          {data.process.map((step, index) => <article data-rs-process-card key={step.title}><span>{String(index + 1).padStart(2, '0')}</span><h3>{step.title}</h3><p>{step.description}</p></article>)}
        </div>
      </div>
    </section>
  )
}

function ProgramsSection({ data, bright = false, perspective = false }: { data: ServicePageData; bright?: boolean; perspective?: boolean }) {
  const websiteNote = data.layout === '05'
  return (
    <section id="rs-programs" className={`rs-programs ${bright ? 'rs-section--light' : ''} ${perspective ? 'rs-programs--perspective' : ''}`} data-rs-pricing>
      <div className="af-container">
        <div className="rs-section-head" data-rs-reveal>
          <SectionLabel text="Current programs" />
          <h2>Choose the Program That Matches Your Growth Stage.</h2>
          <p>{websiteNote ? 'These are Afyra Digital’s current approved marketing programs. Website Development standalone scope, timelines and pricing remain pending founder approval.' : 'Current approved Afyra Digital programs and pricing. Customized programs are available according to business requirements.'}</p>
        </div>
        <div className="rs-programs__grid">
          {programs.plans.map((plan, index) => (
            <article className={`rs-price-card ${plan.popular ? 'is-popular' : ''}`} data-rs-price-card key={plan.id}>
              <div className="rs-price-card__index">0{index + 1}</div>
              {plan.popular ? <span className="rs-price-card__popular">Most Popular</span> : null}
              <h3>{plan.name}</h3><p>{plan.purpose}</p>
              <div className="rs-price"><small>PKR</small>{plan.price.toLocaleString()}<span>/month</span></div>
              <ul>{plan.includes.slice(0, 7).map((item) => <li key={item}><PublicIcon name="check" size={14} />{item}</li>)}</ul>
              <PrimaryButton>Program Inquiry</PrimaryButton>
            </article>
          ))}
        </div>
        <div className="rs-terms">{programs.terms.map((term) => <span key={term}>{term}</span>)}</div>
      </div>
    </section>
  )
}

function TrustFramework({ bright = false }: { bright?: boolean }) {
  const cards = [
    ['Verified Work', 'Use real client work only when it is available and approved.'],
    ['Verified Results', 'Performance claims should be supported by real evidence, not fabricated statistics.'],
    ['Verified Testimonials', 'Client quotes should appear only after they are supplied and approved.'],
    ['Process & Expertise', 'Until more proof assets are available, credibility should come from a clear process and professional strategic thinking.']
  ]
  return (
    <section className={`rs-proof-framework ${bright ? 'rs-section--light' : ''}`} data-rs-proof>
      <div className="af-container">
        <div className="rs-section-head" data-rs-reveal><SectionLabel text="Trust & proof" /><h2>Credibility Without Fabricated Claims.</h2><p>Afyra’s website should use verified proof only. Unverified testimonials, awards, case studies and performance claims are intentionally not invented.</p></div>
        <div className="rs-proof-framework__grid">{cards.map(([title, text], index) => <article data-rs-proof-card key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{text}</p></article>)}</div>
      </div>
    </section>
  )
}

function FaqSection({ bright = false, variant = 'default' }: { bright?: boolean; variant?: 'default' | 'support-card' | 'social-reference' }) {
  const [open, setOpen] = useState(0)
  return (
    <section className={`rs-faq ${bright ? 'rs-section--light' : ''} ${variant === 'support-card' ? 'rs-faq--support-card' : ''} ${variant === 'social-reference' ? 'rs-faq--social-reference' : ''}`} data-rs-faq>
      <div className="af-container rs-faq__grid">
        <div className="rs-faq__copy" data-rs-reveal>
          <SectionLabel text="Frequently asked questions" />
          <h2>Questions Before We Grow Together?</h2>
          <p>Clear answers based on Afyra Digital’s current approved positioning and program terms.</p>
          {variant === 'support-card' ? (
            <div className="rs-faq__support">
              <h3>Can&apos;t find your answer?</h3>
              <p>Get in touch with our team for guidance on the right next step for your business.</p>
              <PrimaryButton>Request Consultation</PrimaryButton>
            </div>
          ) : (
            <PrimaryButton>Request Consultation</PrimaryButton>
          )}
        </div>
        <div className="rs-faq__items">{faqs.map((item, index) => <article className={open === index ? 'is-open' : ''} data-rs-faq-item key={item.q}><button type="button" onClick={() => setOpen(open === index ? -1 : index)} aria-expanded={open === index}><span>{item.q}</span><i>{open === index ? '−' : '+'}</i></button><div><p>{item.a}</p></div></article>)}</div>
      </div>
    </section>
  )
}

function InquirySimulator({ data }: { data: ServicePageData }) {
  return (
    <section className="rs-inquiry-simulator rs-section--light" data-rs-simulator>
      <div className="af-container">
        <div className="rs-section-head" data-rs-reveal><SectionLabel text="Inquiry journey" /><h2>From Discovery to a Clearer Next Step.</h2><p>{data.intro}</p></div>
        <div className="rs-simulator" data-rs-simulator-box>
          <aside><span>01</span><b>Discovery</b><p>Patient finds the business through social, search or paid campaigns.</p></aside>
          <div className="rs-simulator__chat"><div className="rs-simulator__bar"><i /><i /><i /><strong>Inquiry Workspace</strong></div><div className="rs-simulator__messages"><p className="in">I found the clinic online. What is the next step?</p><p className="out">Guide the inquiry toward a clear business conversation or appointment opportunity.</p></div><div className="rs-simulator__input"><span>Qualified conversation path</span><b>→</b></div></div>
          <div className="rs-simulator__cards"><article><span>02</span><b>Response</b><p>Clear communication supports trust.</p></article><article><span>03</span><b>Qualification</b><p>Align the conversation with the right next action.</p></article><article><span>04</span><b>Opportunity</b><p>Create a clear path toward an appointment or inquiry outcome.</p></article></div>
        </div>
      </div>
    </section>
  )
}



const patientTouchpointIcons = [
  { label: 'Google', icon: 'search' },
  { label: 'Meta', icon: 'facebook' },
  { label: 'Instagram', icon: 'instagram' },
  { label: 'LinkedIn', icon: 'linkedin' },
  { label: 'WhatsApp', icon: 'whatsapp' },
  { label: 'YouTube', icon: 'video' },
  { label: 'Messenger', icon: 'message' },
  { label: 'Google Business', icon: 'location' }
] as const

// One explicit coordinate per integration item. Keeping coordinates next to the data prevents
// CSS nth-child drift/duplicate positions when the item list or later styles change.
const patientTouchpointPositions = [
  { x: 0.8, y: 41.3 },
  { x: 8.0, y: 22.9 },
  { x: 21.8, y: 8.7 },
  { x: 40.1, y: 1.0 },
  { x: 59.9, y: 1.0 },
  { x: 78.2, y: 8.7 },
  { x: 92.0, y: 22.9 },
  { x: 99.2, y: 41.3 }
] as const

const patientHeroAudience = ['Doctors', 'Clinics', 'Hospitals', 'Aesthetic Centers', 'Cosmetic Centers', 'Dental Clinics'] as const

const patientFaqs = [
  {
    q: 'How does Afyra approach patient acquisition?',
    a: 'Patient acquisition is treated as a connected growth system. Strategy, paid campaigns, local visibility, inquiry handling, WhatsApp and the patient journey work together around qualified conversations and appointment opportunities.'
  },
  {
    q: 'Are paid campaigns the whole strategy?',
    a: 'No. Paid advertising can support acquisition, but Afyra positions it as one component alongside content, local discovery, lead communication, trust, conversion and the wider digital presence.'
  },
  {
    q: 'Can the system support incoming inquiries?',
    a: 'Yes. Depending on the selected program, Messenger auto-replies, WhatsApp Business optimization and lead communication components can support a clearer path from inquiry to the next meaningful action.'
  },
  {
    q: 'Do you work with clinics and aesthetic centers?',
    a: 'Healthcare is Afyra’s strongest current specialization, especially doctors, clinics, hospitals and aesthetic or cosmetic centers.'
  },
  {
    q: 'Do you guarantee appointments or revenue?',
    a: 'No unsupported guarantee is made. Afyra focuses on strategy, systems, qualified inquiry opportunities, measurable outcomes and credible growth communication.'
  }
] as const

function PatientHero({ data }: { data: ServicePageData }) {
  const tickerItems = [...patientHeroAudience, ...patientHeroAudience]
  return (
    <section className="pa-hero" data-rs-hero>
      <div className="pa-hero__noise" aria-hidden="true" />
      <div className="pa-hero__bg-grid" aria-hidden="true" />
      <div className="pa-hero__arch pa-hero__arch--one" aria-hidden="true" />
      <div className="pa-hero__arch pa-hero__arch--two" aria-hidden="true" />
      <div className="pa-hero__arch pa-hero__arch--three" aria-hidden="true" />
      <div className="af-container pa-hero__inner">
        <div className="pa-hero__visual pa-hero__visual--robot" data-rs-hero-stage>
          <div className="pa-hero__visual-ring pa-hero__visual-ring--outer" data-rs-patient-hero-swirl aria-hidden="true" />
          <div className="pa-hero__visual-ring pa-hero__visual-ring--inner" data-rs-patient-hero-swirl aria-hidden="true" />
          <div className="pa-hero__visual-ring pa-hero__visual-ring--glow" aria-hidden="true" />
          <div className="pa-hero__orbit-dot" data-rs-patient-hero-orbit-dot aria-hidden="true" />
          <div className="pa-hero__robot" data-rs-patient-hero-bot data-rs-patient-hero-logo>
            <img className="pa-hero__robot-image" src="/generated/patient-acquisition/afyra-ai-robot-hero.webp" alt="Afyra AI assistant robot" />
          </div>
        </div>
        <div className="pa-hero__copy" data-rs-hero-copy>
          <div className="rs-reference-pill"><span /> Appointments & Inquiry Focused</div>
          <h1>{data.title}</h1>
          <p className="pa-hero__lead">{data.description}</p>
          <div className="pa-hero__actions"><PrimaryButton>Request Consultation</PrimaryButton><SecondaryButton>View Programs</SecondaryButton></div>
          <p className="pa-hero__promise">We Don’t Run Ads. We Bring Leads.</p>
        </div>
        <div className="pa-hero__trust" data-rs-hero-trust>
          <strong>Trusted by 500+ healthcare brands</strong>
          <div className="pa-hero__ticker">
            <div className="pa-hero__ticker-track" data-rs-patient-hero-marquee>
              {tickerItems.map((item, index) => <span key={`${item}-${index}`}>{item}</span>)}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function PatientInquirySection({ data }: { data: ServicePageData }) {
  const cards = [
    { title: 'No-Code Builder', description: 'Create a guided inquiry flow without adding friction for the patient.', icon: 'program' },
    { title: 'Omnichannel Deployment', description: 'Bring paid campaigns, local discovery and messaging into one response system.', icon: 'growth' },
    { title: 'Conversation Qualification', description: 'Move the conversation toward the right service, next step or appointment opportunity.', icon: 'spark' }
  ]
  return (
    <section className="pa-inquiry rs-section--light" data-rs-patient-inquiry>
      <div className="af-container">
        <div className="rs-section-head pa-section-head" data-rs-reveal>
          <SectionLabel text="Inquiry journey" />
          <h2>From Discovery to a Clearer Next Step.</h2>
          <p>{data.intro}</p>
        </div>
        <div className="pa-inquiry__grid pa-inquiry__grid--reference">
          <article className="pa-inquiry__feature" data-rs-patient-inquiry-feature>
            <img className="pa-inquiry__feature-image" src="/generated/patient-acquisition/instant-inquiry-visual.webp" alt="Instant AI inquiry response visual" loading="lazy" decoding="async" />
          </article>
          <article className="pa-inquiry__chat" data-rs-patient-inquiry-chat>
            <div className="pa-inquiry__chat-window">
              <div className="pa-inquiry__chat-stage">
                <p><span data-rs-patient-typed /></p>
                <span className="pa-inquiry__cursor" aria-hidden="true" />
              </div>
              <div className="pa-inquiry__chat-tools">
                <button type="button" aria-label="Add message"><span>+</span></button>
                <button type="button" aria-label="Filters"><PublicIcon name="spark" size={16} /></button>
                <button type="button"><PublicIcon name="search" size={15} />Search</button>
                <button type="button"><PublicIcon name="message" size={15} />Create Response</button>
                <button type="button" className="pa-inquiry__chat-send" data-rs-patient-send aria-label="Send inquiry">
                  <PublicIcon name="arrowRight" size={16} />
                </button>
              </div>
            </div>
          </article>
          {cards.map((card, index) => (
            <article className="pa-inquiry__card" data-rs-patient-inquiry-card key={card.title}>
              <div className="pa-inquiry__icon"><PublicIcon name={card.icon} size={21} /></div>
              <span>0{index + 2}</span>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function PatientGrowthSystem({ data }: { data: ServicePageData }) {
  return (
    <section className="pa-growth rs-section--light" data-rs-patient-growth>
      <div className="af-container">
        <div className="rs-section-head pa-section-head" data-rs-reveal>
          <SectionLabel text="Growth system" />
          <h2>Build a Better Path From Inquiry to Conversation.</h2>
          <p>{pageMicrocopy['04'].systemText}</p>
        </div>
        <div className="pa-growth__grid">
          {data.features.map((feature, index) => (
            <article data-rs-patient-growth-card key={feature.title}>
              <div className="pa-growth__icon"><PublicIcon name={index % 3 === 0 ? 'growth' : index % 3 === 1 ? 'message' : 'search'} size={22} /></div>
              <span>0{index + 1}</span>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function PatientProgramsSection() {
  return (
    <section id="rs-programs" className="pa-pricing rs-section--light" data-rs-patient-pricing>
      <div className="af-container">
        <div className="rs-section-head pa-section-head pa-pricing__head" data-rs-patient-price-head>
          <SectionLabel text="Current programs" />
          <h2>Choose the Program That Matches Your Growth Stage.</h2>
          <p>Current approved Afyra Digital programs and pricing. Customized programs are available according to business requirements.</p>
        </div>
        <div className="pa-pricing__toggle"><span>Monthly</span><i aria-hidden="true" /><b>Current pricing</b></div>
        <div className="pa-pricing__grid">
          {programs.plans.map((plan) => (
            <article className={`pa-price-card ${plan.popular ? 'is-popular' : ''}`} data-rs-patient-price key={plan.id}>
              {plan.popular ? <span className="pa-price-card__popular">Most Popular</span> : null}
              <div className="pa-price-card__icon"><PublicIcon name={plan.icon} size={20} /></div>
              <h3>{plan.name}</h3>
              <div className="pa-price-card__price"><small>PKR</small>{plan.price.toLocaleString()}<span>/month</span></div>
              <p>{plan.purpose}</p>
              <div className="pa-price-card__includes">What’s Included:</div>
              <ul>{plan.includes.slice(0, 5).map((item) => <li key={item}><PublicIcon name="check" size={14} />{item}</li>)}</ul>
              <PrimaryButton>Program Inquiry</PrimaryButton>
            </article>
          ))}
        </div>
        <p className="pa-pricing__term">{programs.terms[0]}</p>
      </div>
    </section>
  )
}

function PatientIntegrationArc() {
  return (
    <section className="pa-touchpoints rs-section--light" data-rs-patient-arc>
      <div className="af-container">
        <div className="rs-section-head pa-section-head" data-rs-reveal>
          <SectionLabel text="Connected touchpoints" />
          <h2>Connect the Channels That Influence Discovery, Trust and Conversion.</h2>
        </div>
        <div className="pa-touchpoints__stage" data-rs-patient-arc-stage>
          <div className="pa-touchpoints__orbit-shell" aria-hidden="true">
            <div className="pa-touchpoints__orbit-glow" />
          </div>
          <div className="pa-touchpoints__ring" data-rs-patient-arc-ring>
            <div className="pa-touchpoints__ring-line" aria-hidden="true" />
            {patientTouchpointIcons.map((item, index) => {
              const position = patientTouchpointPositions[index]
              return (
                <div
                  className={`pa-touchpoints__item pa-touchpoints__item--${index + 1}`}
                  data-rs-patient-arc-item
                  style={{ '--pa-x': `${position.x}%`, '--pa-y': `${position.y}%` } as CSSProperties}
                  key={item.label}
                >
                  <i><PublicIcon name={item.icon} size={19} /></i><span>{item.label}</span>
                </div>
              )
            })}
          </div>
          <div className="pa-touchpoints__glass pa-touchpoints__glass--left" aria-hidden="true"><i /><i /></div>
          <div className="pa-touchpoints__glass pa-touchpoints__glass--right" aria-hidden="true"><i /><i /></div>
          <div className="pa-touchpoints__copy">
            <p>Afyra connects campaigns, local discovery, lead communication and key platforms into one acquisition system.</p>
            <PrimaryButton>Request Consultation</PrimaryButton>
          </div>
        </div>
      </div>
    </section>
  )
}

const patientProcessSteps = process.steps


function PatientSystemExperience({ data: _data }: { data: ServicePageData }) {
  return (
    <ProcessLayout
      steps={patientProcessSteps}
      eyebrow={process.eyebrow}
      title={process.title}
      description={process.description}
      className="pa-home-process"
      containerClassName="pa-home-process__frame"
      sectionData={{ 'data-rs-patient-home-process': true }}
      containerData={{ 'data-rs-patient-home-process-frame': true }}
      cardData={() => ({ 'data-rs-patient-home-process-card': true })}
      enableStagger={false}
    />
  )
}

function PatientFaqSection() {
  const [open, setOpen] = useState(0)
  const toggleFaq = (index: number, button: HTMLButtonElement) => {
    const section = button.closest('[data-rs-patient-faq]')
    if (!section) return
    const items = Array.from(section.querySelectorAll<HTMLElement>('[data-rs-patient-faq-item]'))
    const next = items[index]
    const previous = items[open]
    if (index === open) return
    if (previous) {
      const previousAnswer = previous.querySelector<HTMLElement>('.pa-faq__answer')
      previous.classList.remove('is-open')
      if (previousAnswer) gsap.to(previousAnswer, { height: 0, opacity: 0, duration: .34, ease: 'power2.inOut' })
      previous.querySelector('button')?.setAttribute('aria-expanded', 'false')
    }
    if (next) {
      const nextAnswer = next.querySelector<HTMLElement>('.pa-faq__answer')
      next.classList.add('is-open')
      if (nextAnswer) gsap.fromTo(nextAnswer, { height: 0, opacity: 0 }, { height: 'auto', opacity: 1, duration: .42, ease: 'power3.out' })
      next.querySelector('button')?.setAttribute('aria-expanded', 'true')
    }
    setOpen(index)
  }
  return (
    <section className="pa-faq rs-section--light" data-rs-patient-faq>
      <div className="af-container pa-faq__grid">
        <div className="pa-faq__copy" data-rs-reveal>
          <SectionLabel text="Popular questions" />
          <h2>Frequently Asked Questions.</h2>
          <p>Clear answers about Afyra’s patient acquisition approach, inquiry systems, program fit and expectations.</p>
          <div className="pa-faq__contact"><h3>Still have questions?</h3><p>Talk to us about your business, current growth system and the next step.</p><PrimaryButton>Contact Us</PrimaryButton></div>
        </div>
        <div className="pa-faq__items">
          {patientFaqs.map((item, index) => (
            <article className={open === index ? 'is-open' : ''} data-rs-patient-faq-item key={item.q}>
              <button type="button" onClick={(event) => toggleFaq(index, event.currentTarget)} aria-expanded={open === index}><span><b aria-hidden="true">✦</b>{item.q}</span><i>{open === index ? '⌄' : '»'}</i></button>
              <div className="pa-faq__answer" style={{ height: open === index ? 'auto' : 0, opacity: open === index ? 1 : 0 }}><p>{item.a}</p></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function PatientAcquisitionReferencePage({ data }: { data: ServicePageData }) {
  return (
    <>
      <PatientHero data={data} />
      <PatientInquirySection data={data} />
      <PatientGrowthSystem data={data} />
      <PatientProgramsSection />
      <PatientIntegrationArc />
      <PatientSystemExperience data={data} />
      <TrustFramework bright />
      <PatientFaqSection />
      <FinalCta bright />
    </>
  )
}

const websiteFeatureVisuals = [
  '/static/ref-solutions/web-dev/01-credibility.svg',
  '/static/ref-solutions/web-dev/02-positioning.svg',
  '/static/ref-solutions/web-dev/03-audience.svg',
  '/static/ref-solutions/web-dev/04-proof.svg'
] as const

const websiteModuleBullets = [
  ['Clear value communication', 'Professional presentation', 'Clear next action'],
  ['Agency-level positioning', 'Outcome-focused language', 'Scalable brand structure'],
  ['Who the business helps', 'Problem and solution clarity', 'Relevant next action'],
  ['Verified work only', 'Verified testimonials only', 'Process and expertise']
] as const

const websiteTemplates = [
  { label: 'Clinics & Practices', image: '/static/ref-solutions/web-dev/template-clinic.svg', icon: 'clinic' },
  { label: 'Healthcare Brands', image: '/static/ref-solutions/web-dev/template-practice.svg', icon: 'brand' },
  { label: 'Authority & Trust', image: '/static/ref-solutions/web-dev/template-brand.svg', icon: 'trust' },
  { label: 'Multi-location', image: '/static/ref-solutions/web-dev/template-multilocation.svg', icon: 'location' }
] as const

function WebsiteHero({ data }: { data: ServicePageData }) {
  return (
    <section className="web-hero" data-rs-hero data-rs-web-hero>
      <div className="web-hero__noise" aria-hidden="true" />
      <div className="af-container web-hero__inner">
        <div className="web-hero__copy" data-rs-hero-copy>
          <div className="web-hero__copy-frame" aria-hidden="true">
            <span className="web-hero__copy-panel web-hero__copy-panel--left" />
            <span className="web-hero__copy-panel web-hero__copy-panel--right" />
            <i className="web-hero__copy-line web-hero__copy-line--top" />
            <i className="web-hero__copy-line web-hero__copy-line--bottom" />
            <i className="web-hero__copy-dot web-hero__copy-dot--tl" />
            <i className="web-hero__copy-dot web-hero__copy-dot--tr" />
            <i className="web-hero__copy-dot web-hero__copy-dot--bl" />
            <i className="web-hero__copy-dot web-hero__copy-dot--br" />
            <i className="web-hero__copy-spark web-hero__copy-spark--1" />
            <i className="web-hero__copy-spark web-hero__copy-spark--2" />
            <i className="web-hero__copy-spark web-hero__copy-spark--3" />
            <i className="web-hero__copy-spark web-hero__copy-spark--4" />
          </div>
          <div className="rs-reference-pill"><span /> {pageMicrocopy['05'].heroTag}</div>
          <div className="web-hero__title-row">
            <h1>{data.title}</h1>
            <div className="web-hero__title-icons" aria-hidden="true">
              <i><PublicIcon name="spark" size={18} /></i>
              <i><PublicIcon name="website" size={18} /></i>
            </div>
          </div>
          <p className="web-hero__lead">{data.description}</p>
          <p className="web-hero__sub">{pageMicrocopy['05'].heroLine}</p>
          <div className="web-hero__actions"><PrimaryButton>Request Consultation</PrimaryButton><SecondaryButton>View Programs</SecondaryButton></div>
          <div className="rs-positioning">We Don’t Run Ads. We Bring Leads.</div>
        </div>

        <div className="web-hero__stage" data-rs-hero-stage>
          <div className="web-hero__mockup" data-rs-web-hero-mockup>
            <i className="web-hero__anchor web-hero__anchor--tl" aria-hidden="true" />
            <i className="web-hero__anchor web-hero__anchor--tr" aria-hidden="true" />
            <i className="web-hero__anchor web-hero__anchor--bl" aria-hidden="true" />
            <i className="web-hero__anchor web-hero__anchor--br" aria-hidden="true" />
            <div className="web-hero__browserbar"><span /><span /><span /><b>Afyra Website System</b><em>Preview</em></div>
            <div className="web-hero__workspace">
              <aside><b>Structure</b><span>Pages</span><span>Navigation</span><span>Proof</span><span>Conversion</span><span>SEO</span></aside>
              <figure><img src={visualByLayout['05']} alt="Website development system preview" loading="eager" decoding="async" /></figure>
              <div className="web-hero__controls"><b>Business Asset</b><span>Credibility</span><span>Positioning</span><span>Trust</span><span>Qualified Inquiries</span></div>
            </div>
          </div>
        </div>

        <div className="web-hero__trust" data-rs-hero-trust>
          <strong>Built for healthcare businesses</strong>
          <div><span>Doctors</span><span>Clinics</span><span>Hospitals</span><span>Aesthetic Centers</span><span>Cosmetic Centers</span></div>
        </div>
      </div>
    </section>
  )
}

function WebsiteModules({ data }: { data: ServicePageData }) {
  const [activeDirection, setActiveDirection] = useState(0)
  const orderedTemplates = websiteTemplates.map((_, offset) => websiteTemplates[(activeDirection + offset) % websiteTemplates.length])

  return (
    <section className="web-system rs-section--light" data-rs-web-modules>
      <div className="af-container">
        <div className="rs-section-head web-section-head" data-rs-reveal>
          <SectionLabel text="Website system" />
          <h2>Structure the Website Around Business Value.</h2>
          <p>{data.intro}</p>
        </div>
        <div className="web-system__track" data-rs-web-stack-track>
          <div className="web-system__stack">
            {data.features.slice(0, 4).map((item, index) => (
              <article className={`web-system__card web-system__card--${index + 1}`} data-rs-web-stack-card key={item.title}>
                <div className="web-system__visual">
                  <img src={websiteFeatureVisuals[index]} alt={`${item.title} website system visual`} loading="lazy" decoding="async" />
                </div>
                <div className="web-system__copy">
                  <span>0{index + 1}</span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <ul>{websiteModuleBullets[index].map((bullet) => <li key={bullet}><PublicIcon name="check" size={14} />{bullet}</li>)}</ul>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="web-templates" data-rs-web-templates>
          <div className="rs-section-head web-section-head web-templates__head" data-rs-reveal>
            <SectionLabel text="Website directions" />
            <h2>Build Around the Right Business Journey.</h2>
            <p>Use page structure and visual direction that support credibility, trust, audience clarity and qualified inquiries.</p>
          </div>
          <div className="web-templates__tabs" role="tablist" aria-label="Website direction categories">
            {websiteTemplates.map((item, index) => (
              <button
                type="button"
                role="tab"
                aria-selected={activeDirection === index}
                className={activeDirection === index ? 'is-active' : ''}
                onClick={() => setActiveDirection(index)}
                key={item.label}
              >
                <PublicIcon name={item.icon} size={14} />{item.label}
              </button>
            ))}
          </div>
          <div className="web-templates__grid" data-rs-web-template-grid key={`website-directions-${activeDirection}`}>
            {orderedTemplates.map((item, index) => (
              <figure data-rs-web-template key={`${activeDirection}-${item.label}-${index}`} style={{ ['--web-template-order' as string]: index } as CSSProperties}>
                <div className="web-templates__figure-badge"><PublicIcon name={item.icon} size={14} /><span>{item.label}</span></div>
                <img src={item.image} alt={`${websiteTemplates[activeDirection].label} website direction preview ${index + 1}`} loading="lazy" decoding="async" />
                <figcaption>{item.label}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function WebsiteHowItWorks({ data }: { data: ServicePageData }) {
  return (
    <section className="web-how" data-rs-web-how>
      <div className="web-how__dome" data-rs-web-how-dome aria-hidden="true"><i /></div>
      <div className="af-container web-how__inner">
        <div className="rs-section-head web-how__head" data-rs-reveal>
          <SectionLabel text="How it works" />
          <h2>Strategy First. Systems Next. Outcomes Always.</h2>
          <p>The structure stays simple: understand the business, connect the right growth components, improve the journey and manage toward long-term value.</p>
        </div>
        <div className="web-how__cards">
          {data.process.map((step, index) => (
            <article className={index === 1 ? 'is-active' : ''} data-rs-web-how-card key={step.title}>
              <div><PublicIcon name={index % 3 === 0 ? 'website' : index % 3 === 1 ? 'spark' : 'growth'} size={22} /></div>
              <span>0{index + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function WebsiteCurrentPrograms() {
  const [billing, setBilling] = useState<'monthly' | 'yearly'>('monthly')
  const yearly = billing === 'yearly'

  return (
    <section id="rs-programs" className="web-current web-pricing" data-rs-web-current>
      <div className="af-container web-pricing__inner">
        <div className="rs-section-head web-pricing__head" data-rs-reveal>
          <SectionLabel text="Current programs" />
          <h2>Choose a Growth Program Around the Business Stage.</h2>
          <p>These are Afyra Digital’s current approved marketing programs. Website Development standalone scope, timelines and pricing remain pending founder approval.</p>
        </div>

        <div className="web-pricing__toggle-wrap">
          <div className="web-pricing__toggle" role="group" aria-label="Billing preference">
            <button type="button" className={!yearly ? 'is-active' : ''} aria-pressed={!yearly} onClick={() => setBilling('monthly')}>Monthly</button>
            <span className="web-pricing__term-badge">1st month +25%</span>
            <button type="button" className={yearly ? 'is-active' : ''} aria-pressed={yearly} onClick={() => setBilling('yearly')}>Yearly</button>
          </div>
          <p className="web-pricing__billing-note" aria-live="polite">
            {yearly ? 'Annual pricing is not currently published. Request a consultation for billing options.' : 'Current approved monthly pricing.'}
          </p>
        </div>

        <div className="web-pricing__grid">
          {programs.plans.map((plan) => {
            // Canonical program data stores the checklist in `includes`.
            // Normalize it here so malformed or missing data can never crash this page.
            const includedFeatures = Array.isArray(plan.includes) ? plan.includes : []
            const displayPrice = typeof plan.price === 'number' ? plan.price.toLocaleString() : '—'

            return (
              <article className={`web-pricing__card ${plan.popular ? 'is-popular' : ''}`} data-rs-web-price-card key={plan.id}>
                {plan.popular ? <span className="web-pricing__popular">Most Popular</span> : null}
                <div className="web-pricing__icon"><PublicIcon name={plan.icon} size={22} /></div>
                <h3>{plan.name}</h3>
                <p className="web-pricing__purpose">{plan.purpose}</p>
                <div className="web-pricing__price"><small>PKR</small><strong>{displayPrice}</strong><span>/month</span></div>
                <p className="web-pricing__rate-note">{yearly ? 'Monthly rate shown; annual billing options available on request.' : 'Current monthly program rate.'}</p>
                <Link className="web-pricing__cta" to="/request-consultation">Get Started Now <PublicIcon name="arrowRight" size={15} /></Link>
                <div className="web-pricing__includes">What’s Included</div>
                <ul>
                  {includedFeatures.slice(0, 5).map((feature) => <li key={feature}><PublicIcon name="check" size={14} />{feature}</li>)}
                </ul>
              </article>
            )
          })}
        </div>

        <div className="web-pricing__terms">
          <span>First month is charged at 25% extra.</span>
          <span>Payment is 100% in advance.</span>
          <span>Additional work outside package scope is charged separately.</span>
        </div>
      </div>
    </section>
  )
}

const websiteProofCards = [
  {
    title: 'Verified Work',
    text: 'Use real client work only when it is available and approved.',
    icon: 'website'
  },
  {
    title: 'Verified Results',
    text: 'Performance claims should be supported by real evidence, not fabricated statistics.',
    icon: 'growth'
  },
  {
    title: 'Verified Testimonials',
    text: 'Client quotes should appear only after they are supplied and approved.',
    icon: 'message'
  },
  {
    title: 'Process & Expertise',
    text: 'Until more proof assets are available, credibility should come from a clear process and professional strategic thinking.',
    icon: 'strategy'
  },
  {
    title: 'Qualified Inquiries',
    text: 'Build the website journey around clear next steps such as contact, consultation, call or program inquiry.',
    icon: 'leads'
  }
] as const

function WebsiteTrustProof() {
  return (
    <section className="web-proof rs-section--light" data-rs-web-proof>
      <div className="af-container">
        <div className="rs-section-head web-section-head" data-rs-reveal>
          <SectionLabel text="Trust & proof" />
          <h2>Credibility Without Fabricated Claims.</h2>
          <p>Afyra’s website should use verified proof only. Unverified testimonials, awards, case studies and performance claims are intentionally not invented.</p>
        </div>
        <div className="web-proof__grid">
          {websiteProofCards.map((card, index) => (
            <article className={`web-proof__card web-proof__card--${index + 1}`} data-rs-web-proof-card key={card.title}>
              <i className="web-proof__edge-light web-proof__edge-light--left" data-rs-web-proof-edge aria-hidden="true" />
              <i className="web-proof__edge-light web-proof__edge-light--right" data-rs-web-proof-edge aria-hidden="true" />
              <div className="web-proof__icon" aria-hidden="true"><PublicIcon name={card.icon} size={22} /></div>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function WebsiteDevelopmentReferencePage({ data }: { data: ServicePageData }) {
  return (
    <>
      <WebsiteHero data={data} />
      <WebsiteModules data={data} />
      <WebsiteHowItWorks data={data} />
      <WebsiteCurrentPrograms />
      <WebsiteTrustProof />
      <FaqSection bright variant="support-card" />
      <FinalCta bright />
    </>
  )
}


const socialChannels = [
  { label: 'Messenger', icon: 'message', tone: 'amber' },
  { label: 'WhatsApp', icon: 'whatsapp', tone: 'teal' },
  { label: 'Instagram', icon: 'instagram', tone: 'amber' },
  { label: 'Facebook', icon: 'facebook', tone: 'teal' },
  { label: 'Reels', icon: 'reels', tone: 'amber' },
  { label: 'YouTube', icon: 'video', tone: 'teal' },
  { label: 'Content', icon: 'content', tone: 'amber' },
  { label: 'Social', icon: 'social', tone: 'teal' },
  { label: 'Google Business Profile', icon: 'location', tone: 'amber' },
  { label: 'Website', icon: 'website', tone: 'teal' },
  { label: 'Analytics', icon: 'analytics', tone: 'amber' },
  { label: 'Search', icon: 'search', tone: 'teal' },
  { label: 'Leads', icon: 'leads', tone: 'amber' },
  { label: 'Brand', icon: 'brand', tone: 'teal' },
  { label: 'Insights', icon: 'insights', tone: 'amber' },
  { label: 'Calendar', icon: 'calendar', tone: 'teal' }
] as const

const socialTrustItems = ['Doctors', 'Clinics', 'Hospitals', 'Aesthetic Centers', 'Cosmetic Centers'] as const


function SocialHero({ data }: { data: ServicePageData }) {
  return (
    <section className="social-hero" data-rs-hero data-rs-social-hero>
      <div className="social-hero__stars" aria-hidden="true" />
      <div className="social-hero__halo social-hero__halo--outer" aria-hidden="true" />
      <div className="social-hero__halo social-hero__halo--inner" aria-hidden="true" />
      <div className="af-container social-hero__inner">
        <div className="social-hero__copy" data-rs-hero-copy>
          <div className="rs-reference-pill"><span /> {pageMicrocopy['06'].heroTag}</div>
          <h1>{data.title}</h1>
          <p className="social-hero__lead">{data.description}</p>
          <p className="social-hero__sub">{pageMicrocopy['06'].heroLine}</p>
          <div className="social-hero__actions"><PrimaryButton>Request Consultation</PrimaryButton><SecondaryButton>View Programs</SecondaryButton></div>
          <div className="rs-positioning">We Don’t Run Ads. We Bring Leads.</div>
        </div>

        <div className="social-hero__stage" data-rs-hero-stage>
          <div className="social-hero__curve social-hero__curve--left" aria-hidden="true" />
          <div className="social-hero__curve social-hero__curve--right" aria-hidden="true" />
          <figure className="social-hero__mockup" data-rs-social-hero-card>
            <i className="social-hero__anchor social-hero__anchor--tl" aria-hidden="true" />
            <i className="social-hero__anchor social-hero__anchor--tr" aria-hidden="true" />
            <i className="social-hero__anchor social-hero__anchor--bl" aria-hidden="true" />
            <i className="social-hero__anchor social-hero__anchor--br" aria-hidden="true" />
            <div className="social-hero__mockup-bar"><span /><span /><span /><b>Unified Communication System</b><em>Live</em></div>
            <img src={visualByLayout['06']} alt="Afyra Digital social media, community and lead communication dashboard" loading="eager" decoding="async" />
          </figure>
        </div>

        <div className="social-hero__trust" data-rs-hero-trust>
          <strong>Built for healthcare businesses</strong>
          <div className="social-hero__trust-marquee">
            <div className="social-hero__trust-track" data-rs-social-trust-track>
              {[...socialTrustItems, ...socialTrustItems].map((item, index) => <span key={`${item}-${index}`}>{item}</span>)}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function SocialGrowthVisual({ index }: { index: number }) {
  if (index === 0) {
    return (
      <div className="social-stack-visual social-stack-visual--timeline" aria-hidden="true">
        <div className="social-stack-visual__bar"><i /><i /><i /></div>
        <div className="social-timeline__title">Project timeline</div>
        <div className="social-timeline__months">{['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP'].map((month) => <span key={month}>{month}</span>)}</div>
        <div className="social-timeline__board">
          <article className="social-timeline__item social-timeline__item--one"><b>Content direction</b><small>Jan 12 → Apr 04</small><i /></article>
          <article className="social-timeline__item social-timeline__item--two"><b>Community workflow</b><small>May 08 → Aug 22</small><i /></article>
          <article className="social-timeline__item social-timeline__item--three"><b>Messenger system</b><small>Jun 02 → Jun 17</small><i /></article>
          <article className="social-timeline__item social-timeline__item--ghost" />
        </div>
      </div>
    )
  }
  if (index === 1) {
    return (
      <div className="social-stack-visual social-stack-visual--workflow" aria-hidden="true">
        <div className="social-stack-visual__bar"><i /><i /><i /></div>
        <div className="social-workflow__grid">
          {[
            ['Message', 'Messenger'],
            ['Social', 'Instagram'],
            ['Search', 'Google Business'],
            ['Mail', 'Gmail']
          ].map(([icon, label], itemIndex) => (
            <div className="social-workflow__item" key={label}>
              <i><PublicIcon name={itemIndex === 0 ? 'message' : itemIndex === 1 ? 'instagram' : itemIndex === 2 ? 'location' : 'content'} size={17} /></i>
              <div><b>{label}</b><span /></div>
            </div>
          ))}
        </div>
        <div className="social-workflow__secure">
          <i><PublicIcon name="trust" size={24} /></i>
          <div><b>Secure</b><small>Managed routing data</small></div>
        </div>
      </div>
    )
  }
  if (index === 2) {
    return (
      <div className="social-stack-visual social-stack-visual--live-chat" aria-hidden="true">
        <div className="social-live-chat__toolbar"><i /><i /><i /><b>Overview</b><span>Data sync</span></div>
        <div className="social-live-chat__frame">
          <div className="social-live-chat__rail">{['social', 'content', 'message', 'analytics'].map((icon) => <i key={icon}><PublicIcon name={icon} size={15} /></i>)}</div>
          <div className="social-live-chat__chart">
            <div className="social-live-chat__tabs"><span>Clicks</span><span>Views</span></div>
            <div className="social-live-chat__bars">{[56, 82, 66, 88, 58, 100, 44, 92, 72].map((value, barIndex) => <b key={barIndex} style={{ height: `${value}%` }} />)}</div>
          </div>
          <div className="social-live-chat__code">
            <span>// reply pipeline</span>
            <span>const route = &quot;community&quot;;</span>
            <span>const priority = &quot;high&quot;;</span>
            <span>if (intent === &quot;inquiry&quot;) {'{'}</span>
            <span>&nbsp;&nbsp;return &quot;send to lead desk&quot;;</span>
            <span>{'}'}</span>
          </div>
        </div>
      </div>
    )
  }
  if (index === 3) {
    return (
      <div className="social-stack-visual social-stack-visual--tickets" aria-hidden="true">
        <div className="social-ticket-fan"><i /><i /><i /><i /></div>
        <div className="social-ticket-panel">
          <div className="social-ticket-panel__row"><b>Action</b><span>Assign to</span></div>
          <div className="social-ticket-panel__card"><strong>Community follow-up</strong><small>Johnson</small><em>Current</em><span>Dec 16, 05:00</span></div>
        </div>
      </div>
    )
  }
  return (
    <div className="social-stack-visual social-stack-visual--collaboration" aria-hidden="true">
      <div className="social-collab__globe"><i /><span /></div>
      <div className="social-collab__arc social-collab__arc--one" />
      <div className="social-collab__arc social-collab__arc--two" />
      {['message', 'instagram', 'whatsapp', 'analytics'].map((icon, i) => <b className={`social-collab__node social-collab__node--${i + 1}`} key={icon}><PublicIcon name={icon} size={15} /></b>)}
    </div>
  )
}

function SocialGrowthSystem({ data }: { data: ServicePageData }) {
  return (
    <section className="social-growth" data-rs-social-growth-section>
      <div className="af-container">
        <div className="rs-section-head social-growth__head" data-rs-reveal>
          <SectionLabel text="Growth system" />
          <h2>{pageMicrocopy['06'].systemTitle}</h2>
          <p>{pageMicrocopy['06'].systemText}</p>
        </div>
        <div className="social-growth__grid" data-rs-social-growth-grid>
          {data.features.map((feature, index) => (
            <article
              className={`social-growth__card social-growth__card--${index + 1}`}
              data-rs-social-growth-card
              key={feature.title}
            >
              <div className="social-growth__copy">
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
              <div className="social-growth__visual" data-rs-social-growth-visual>
                <SocialGrowthVisual index={index} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function SocialProgramsSection() {
  const [billingMode, setBillingMode] = useState<'monthly' | 'yearly'>('monthly')
  const primaryPlans = programs.plans.slice(0, 2)
  const enterprisePlan = programs.plans[2]

  return (
    <section id="rs-programs" className="social-programs" data-rs-pricing>
      <div className="af-container">
        <div className="rs-section-head social-programs__head" data-rs-reveal>
          <SectionLabel text="Current programs" />
          <h2>Choose the Program That Matches Your Growth Stage.</h2>
          <p>Current approved Afyra Digital programs and pricing. Customized programs are available according to business requirements.</p>
        </div>
        <div className="social-programs__billing" aria-label="Pricing display mode">
          <button type="button" className={billingMode === 'monthly' ? 'is-active' : ''} onClick={() => setBillingMode('monthly')} aria-pressed={billingMode === 'monthly'}>Monthly</button>
          <button type="button" className={billingMode === 'yearly' ? 'is-active' : ''} onClick={() => setBillingMode('yearly')} aria-pressed={billingMode === 'yearly'}>Yearly</button>
          <span>Current pricing</span>
        </div>
        {billingMode === 'yearly' ? <p className="social-programs__billing-note">Approved monthly pricing is shown; yearly pricing is not defined in the current program data.</p> : null}

        <div className="social-programs__grid social-programs__grid--reference">
          {primaryPlans.map((plan, index) => (
            <article className={`social-program-card social-program-card--reference ${plan.popular ? 'is-popular' : ''}`} data-rs-price-card key={plan.id}>
              <div className="social-program-card__label">{index === 0 ? 'Starter' : 'Pro Plan'}</div>
              <h3>{plan.name}</h3>
              <p>{plan.purpose}</p>
              <div className="social-program-card__price"><strong>${plan.price.toLocaleString()}</strong><span>/month</span></div>
              <div className="social-program-card__micro">Current approved monthly program</div>
              <h4>What&apos;s Included</h4>
              <ul>{plan.includes.slice(0, 6).map((item) => <li key={item}><PublicIcon name="check" size={14} />{item}</li>)}</ul>
              <PrimaryButton>Program Inquiry</PrimaryButton>
              <div className="social-program-card__note">Based on the selected program stage.</div>
            </article>
          ))}

          <div className="social-programs__stack">
            <article className="social-program-card social-program-card--compact" data-rs-price-card>
              <div className="social-program-card__label">Enterprise Plan</div>
              <h3>{enterprisePlan.name}</h3>
              <p>{enterprisePlan.purpose}</p>
              <SecondaryButton>Request Consultation</SecondaryButton>
              <ul>
                {enterprisePlan.includes.slice(0, 3).map((item) => <li key={item}><PublicIcon name="check" size={14} />{item}</li>)}
              </ul>
            </article>

            <article className="social-program-card social-program-card--support" data-rs-price-card>
              <h3>Still deciding?</h3>
              <p>Explore features or talk with our team to choose the right next step.</p>
              <PrimaryButton>Let&apos;s Talk</PrimaryButton>
            </article>
          </div>
        </div>
        <div className="social-programs__terms">{programs.terms.map((term) => <span key={term}>{term}</span>)}</div>
      </div>
    </section>
  )
}

function SocialConnectedTouchpoints() {
  return (
    <section className="social-touchpoints" data-rs-social-touchpoints>
      <div className="af-container">
        <div className="rs-section-head social-touchpoints__head" data-rs-reveal>
          <SectionLabel text="Connected touchpoints" />
          <h2>Connect the Channels That Influence Trust, Discovery and Conversion.</h2>
          <p>Afyra’s approach treats each channel as part of one growth system instead of a separate task list.</p>
        </div>
        <div className="social-touchpoints__stage" data-rs-social-orbit-stage>
          <div className="social-touchpoints__ceiling" aria-hidden="true" />
          <div className="social-touchpoints__dome" aria-hidden="true">
            <i className="social-touchpoints__arc-base" />
            <i className="social-touchpoints__dome-sector" data-rs-social-orbit-sector />
            <i className="social-touchpoints__arc-light" data-rs-social-orbit-glow />
            <i className="social-touchpoints__arc-light social-touchpoints__arc-light--soft" data-rs-social-orbit-glow-soft />
            <i className="social-touchpoints__arc-inner" />
            <i className="social-touchpoints__dome-fill" />
          </div>
          <div className="social-touchpoints__orbit-ring" data-rs-social-orbit-ring>
            {socialChannels.map((item, index) => (
              <div
                className={`social-touchpoint social-touchpoint--${item.tone}`}
                data-rs-social-orbit-item
                style={{ '--orbit-angle': `${(360 / socialChannels.length) * index - 180}deg`, '--orbit-counter-angle': `${180 - (360 / socialChannels.length) * index}deg`, '--orbit-index': index } as CSSProperties}
                key={`${item.label}-${index}`}
                aria-label={item.label}
              >
                <i data-rs-social-orbit-item-icon><PublicIcon name={item.icon} size={20} /></i>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
          <div className="social-touchpoints__core" aria-hidden="true"><img src="/static/img/logo-mark.png" alt="" /></div>
        </div>
      </div>
    </section>
  )
}

function SocialMediaReferencePage({ data }: { data: ServicePageData }) {
  return (
    <>
      <SocialHero data={data} />
      <CommunicationMetrics data={data} />
      <SocialGrowthSystem data={data} />
      <SocialProgramsSection />
      <SocialConnectedTouchpoints />
      <TrustFramework />
      <FaqSection variant="social-reference" />
      <FinalCta />
    </>
  )
}

function CommunicationMetrics({ data }: { data: ServicePageData }) {
  const points = [
    ['Presence', 'Keep the brand visible and professionally represented.'],
    ['Communication', 'Use clear, consistent content and lead communication.'],
    ['Community', 'Support audience management and comment replies where included.']
  ]
  const orbitNodes = [
    { icon: 'social', label: 'Presence' },
    { icon: 'message', label: 'Messenger' },
    { icon: 'whatsapp', label: 'WhatsApp' },
    { icon: 'content', label: 'Content' },
    { icon: 'instagram', label: 'Community' },
    { icon: 'analytics', label: 'Insights' }
  ]
  return (
    <section className="rs-comms-metrics social-comms" data-rs-metrics data-rs-social-communication>
      <div className="af-container">
        <div className="rs-comms-metrics__top">
          <div data-rs-reveal><SectionLabel text="Communication system" /><h2>Unified Channels. Clearer Conversations.</h2><p>{data.intro}</p></div>
          <div className="social-comms-orbit" data-rs-social-comms-orbit aria-hidden="true">
            <div className="social-comms-orbit__beam" data-rs-social-comms-beam />
            <div className="social-comms-orbit__cylinders" data-rs-social-comms-cylinders><i /><i /><i /></div>
            <svg className="social-comms-orbit__lines" viewBox="0 0 520 340" preserveAspectRatio="xMidYMid meet">
              <ellipse cx="260" cy="190" rx="188" ry="104" pathLength="100" data-rs-social-comms-dash />
              <ellipse cx="260" cy="190" rx="150" ry="82" pathLength="100" data-rs-social-comms-dash />
              <path d="M42 190 H120 M400 190 H478 M88 96 H150 M370 96 H432 M88 284 H150 M370 284 H432" pathLength="100" data-rs-social-comms-dash />
            </svg>
            <div className="social-comms-orbit__platform" />
            <div className="social-comms-orbit__core" data-rs-social-comms-core><PublicIcon name="message" size={30} /></div>
            <div className="social-comms-orbit__nodes" data-rs-social-comms-ring>
              {orbitNodes.map((node, index) => (
                <span className={`social-comms-orbit__node social-comms-orbit__node--${index + 1}`} data-rs-social-comms-node key={node.label}>
                  <i data-rs-social-comms-node-icon><PublicIcon name={node.icon} size={18} /></i>
                  <em>{node.label}</em>
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="rs-comms-metrics__grid">{points.map(([title, text], index) => <article data-rs-metric-card key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{text}</p></article>)}</div>
      </div>
    </section>
  )
}

const growthQuickSteps = [
  {
    number: '1/3',
    tab: 'Direction',
    title: 'Set the Growth Direction',
    description: 'Clarify positioning, audience priorities and the business outcomes the digital system should support.',
    metric: 'Strategy clarity',
    value: '01'
  },
  {
    number: '2/3',
    tab: 'Systems',
    title: 'Connect the Right Channels',
    description: 'Coordinate content, social presence, local visibility, paid campaigns and lead communication around one direction.',
    metric: 'Connected channels',
    value: '02'
  },
  {
    number: '3/3',
    tab: 'Outcomes',
    title: 'Measure, Refine & Grow',
    description: 'Review visibility, trust, inquiries, conversion and long-term brand value so the system improves over time.',
    metric: 'Growth review',
    value: '03'
  }
] as const

const growthFaqs = [
  {
    q: 'What does Digital Growth & Marketing Strategy include?',
    a: 'The strategic lens includes planning, positioning, audience understanding, digital visibility, trust, acquisition, lead generation, local visibility, conversion, authority, consistency and long-term growth.'
  },
  {
    q: 'Is paid advertising the whole growth strategy?',
    a: 'No. Paid campaigns can be one component of a broader system that also includes strategy, content, social presence, Google Business Profile, WhatsApp, lead communication, customer journey, brand authority and conversion.'
  },
  {
    q: 'How does Afyra evaluate marketing activity?',
    a: 'Afyra evaluates work around business outcomes and long-term brand value rather than vanity activity alone.'
  },
  {
    q: 'Do you guarantee leads or revenue?',
    a: 'No unsupported guarantees are used. Afyra focuses on strategy, systems, measurable business outcomes and credible communication.'
  },
  {
    q: 'Are customized growth programs available?',
    a: 'Yes. Customized programs are available according to business requirements, and additional work outside package scope is charged separately.'
  }
] as const

const growthIntegrationNodes = [
  { label: 'Strategy', icon: 'strategy', x: 15, y: 22 },
  { label: 'Content', icon: 'content', x: 28, y: 62 },
  { label: 'Social', icon: 'social', x: 38, y: 32 },
  { label: 'Google Business', icon: 'location', x: 62, y: 29 },
  { label: 'WhatsApp', icon: 'whatsapp', x: 73, y: 62 },
  { label: 'Campaigns', icon: 'target', x: 86, y: 24 },
  { label: 'Lead Communication', icon: 'message', x: 87, y: 71 },
  { label: 'Analytics', icon: 'analytics', x: 14, y: 71 }
] as const

const growthTrustItems = ['Doctors', 'Clinics', 'Hospitals', 'Aesthetic Centers', 'Cosmetic Centers'] as const

function GrowthStrategyHero({ data }: { data: ServicePageData }) {
  return (
    <section className="gs7-hero rs-section--light" data-rs-hero data-rs-growth-hero>
      <div className="gs7-hero__orb gs7-hero__orb--one" aria-hidden="true" />
      <div className="gs7-hero__orb gs7-hero__orb--two" aria-hidden="true" />
      <div className="af-container gs7-hero__grid">
        <div className="gs7-hero__copy" data-rs-hero-copy>
          <div className="rs-reference-pill"><span /> {pageMicrocopy['07'].heroTag}</div>
          <h1><span>Digital</span><span>Growth &amp;</span><span>Marketing</span><span>Strategy</span></h1>
          <p className="gs7-hero__lead">Build a clear growth direction around strategy, planning, positioning, audience understanding and measurable business outcomes.</p>
          <p className="gs7-hero__sub">Create a clear growth direction around positioning, audience understanding and measurable business outcomes.</p>
          <div className="gs7-hero__actions"><PrimaryButton>Request Consultation</PrimaryButton><SecondaryButton>View Programs</SecondaryButton></div>
        </div>

        <div className="gs7-hero__stage" data-rs-hero-stage>
          <div className="gs7-hero__ring gs7-hero__ring--one" aria-hidden="true" />
          <div className="gs7-hero__ring gs7-hero__ring--two" aria-hidden="true" />
          <div className="gs7-hero__panel" aria-hidden="true" />
          <figure className="gs7-hero__phone" data-rs-growth-phone>
            <img src="/static/ref-solutions/growth-strategy-phone-hand.webp" alt="Afyra Digital growth strategy dashboard shown on a phone held in hand" />
          </figure>
          <div className="gs7-hero__metric gs7-hero__metric--visibility" data-rs-growth-chip><i><PublicIcon name="growth" size={18} /></i><div><b>Visibility</b><span>Connected reach</span></div></div>
          <div className="gs7-hero__metric gs7-hero__metric--trust" data-rs-growth-chip><i><PublicIcon name="trust" size={18} /></i><div><b>Trust</b><span>Professional positioning</span></div></div>
          <div className="gs7-hero__metric gs7-hero__metric--inquiries" data-rs-growth-chip><i><PublicIcon name="leads" size={18} /></i><div><b>Inquiries</b><span>Qualified path</span></div></div>
          <div className="gs7-hero__metric gs7-hero__metric--response" aria-hidden="true"><i><PublicIcon name="message" size={18} /></i></div>
        </div>
      </div>
      <div className="af-container gs7-hero__trust" data-rs-hero-trust>
        <strong>We Don’t Run Ads. We Bring Leads.</strong>
        <div className="gs7-hero__trust-marquee">
          <div className="gs7-hero__trust-track" data-rs-growth-trust-track>
            {[...growthTrustItems, ...growthTrustItems].map((item, index) => <span key={`${item}-${index}`}>{item}</span>)}
          </div>
        </div>
      </div>
    </section>
  )
}

function GrowthSystem07({ data }: { data: ServicePageData }) {
  return (
    <section className="gs7-system rs-section--light" data-rs-growth-system>
      <div className="af-container">
        <div className="rs-section-head gs7-system__head" data-rs-reveal>
          <SectionLabel text="Growth system" />
          <h2>{pageMicrocopy['07'].systemTitle}</h2>
          <p>{pageMicrocopy['07'].systemText}</p>
        </div>

        <div className="gs7-feature-grid" data-rs-growth-system-stage>
          <article className="gs7-feature-card gs7-feature-card--signals" data-rs-growth-feature-card>
            <div className="gs7-feature-card__visual gs7-feature-chart" aria-hidden="true">
              <svg viewBox="0 0 560 210" preserveAspectRatio="none">
                <g className="gs7-feature-chart__guides">
                  <line x1="42" y1="22" x2="42" y2="184" /><line x1="138" y1="22" x2="138" y2="184" /><line x1="234" y1="22" x2="234" y2="184" /><line x1="330" y1="22" x2="330" y2="184" /><line x1="426" y1="22" x2="426" y2="184" /><line x1="522" y1="22" x2="522" y2="184" />
                </g>
                <g className="gs7-feature-chart__bars" data-rs-growth-chart-bars>
                  <rect x="54" y="64" width="30" height="92" rx="15" /><rect x="112" y="42" width="30" height="114" rx="15" />
                  <rect x="170" y="82" width="30" height="74" rx="15" /><rect x="228" y="56" width="30" height="100" rx="15" />
                  <rect x="286" y="74" width="30" height="82" rx="15" /><rect x="344" y="49" width="30" height="107" rx="15" />
                  <rect x="402" y="87" width="30" height="69" rx="15" /><rect x="460" y="60" width="30" height="96" rx="15" />
                </g>
                <path className="gs7-feature-chart__line gs7-feature-chart__line--teal" data-rs-growth-chart-line d="M40 118 C88 78 124 88 166 108 S238 142 286 108 S360 64 410 94 S476 132 525 88" />
                <path className="gs7-feature-chart__line gs7-feature-chart__line--amber" data-rs-growth-chart-line d="M40 146 C92 174 126 135 174 126 S246 116 292 136 S362 146 404 118 S470 98 525 126" />
              </svg>
              <div className="gs7-feature-chart__tooltip" data-rs-growth-chart-tooltip><i /><span><b>Visibility</b><small>Inquiries</small></span></div>
              <div className="gs7-feature-chart__labels"><span>Strategy</span><span>Content</span><span>Social</span><span>Paid</span><span>Local</span></div>
            </div>
            <div className="gs7-feature-card__copy">
              <h3>See the Signals That Matter</h3>
              <p>Read visibility, engagement and inquiry signals together so decisions follow business direction instead of isolated activity.</p>
            </div>
          </article>

          <article className="gs7-feature-card gs7-feature-card--network" data-rs-growth-feature-card>
            <div className="gs7-feature-card__copy gs7-feature-card__copy--top">
              <h3>Connect the Growth Components</h3>
              <p>Strategy gives each channel a clear role while every touchpoint stays connected to the same growth outcome.</p>
            </div>
            <div className="gs7-feature-network" aria-hidden="true">
              <svg viewBox="0 0 500 270" preserveAspectRatio="none">
                <path data-rs-growth-node-line d="M250 135 C190 135 178 58 118 58" />
                <path data-rs-growth-node-line d="M250 135 C310 135 322 58 382 58" />
                <path data-rs-growth-node-line d="M250 135 C182 135 164 212 102 212" />
                <path data-rs-growth-node-line d="M250 135 C318 135 336 212 398 212" />
                <path data-rs-growth-node-line d="M250 135 C250 185 250 202 250 238" />
              </svg>
              <div className="gs7-feature-network__core" data-rs-growth-hub-core><img src="/static/img/logo-mark.png" alt="" /></div>
              <div className="gs7-feature-network__node gs7-feature-network__node--1" data-rs-growth-hub-node><PublicIcon name="strategy" size={20} /><span>Strategy</span></div>
              <div className="gs7-feature-network__node gs7-feature-network__node--2" data-rs-growth-hub-node><PublicIcon name="content" size={20} /><span>Content</span></div>
              <div className="gs7-feature-network__node gs7-feature-network__node--3" data-rs-growth-hub-node><PublicIcon name="social" size={20} /><span>Social</span></div>
              <div className="gs7-feature-network__node gs7-feature-network__node--4" data-rs-growth-hub-node><PublicIcon name="target" size={20} /><span>Paid</span></div>
              <div className="gs7-feature-network__node gs7-feature-network__node--5" data-rs-growth-hub-node><PublicIcon name="location" size={20} /><span>Local</span></div>
            </div>
          </article>

          <article className="gs7-feature-card gs7-feature-card--brief" data-rs-growth-feature-card>
            <div className="gs7-feature-brief" aria-hidden="true">
              <div data-rs-growth-card-float><small>Strategic brief</small><b>Audience + positioning</b><span>Business goal first</span></div>
              <div data-rs-growth-card-float><small>Content direction</small><b>Trust + clarity</b><span>Connected message</span></div>
              <div data-rs-growth-card-float><small>Channel role</small><b>Visibility + response</b><span>Clear next step</span></div>
            </div>
            <div className="gs7-feature-card__copy"><h3>Strategy & Positioning</h3><p>Define the audience, positioning, message and role each channel should play before execution begins.</p></div>
          </article>

          <article className="gs7-feature-card gs7-feature-card--performance" data-rs-growth-feature-card>
            <div className="gs7-feature-card__copy gs7-feature-card__copy--top"><h3>Channel Performance</h3><p>Bring social presence, paid campaigns, Google Business Profile and lead communication into one measurable view.</p></div>
            <div className="gs7-feature-performance" aria-hidden="true" data-rs-growth-card-float>
              <div className="gs7-feature-performance__screen">
                <div className="gs7-feature-performance__head"><span>Growth overview</span><i>•••</i></div>
                <div className="gs7-feature-performance__bars"><i /><i /><i /><i /><i /></div>
                <svg viewBox="0 0 280 80" preserveAspectRatio="none"><path d="M0 61 C42 54 54 33 94 42 S148 47 180 28 S228 30 280 14" /></svg>
                <div className="gs7-feature-performance__status"><span>Visibility</span><span>Trust</span><span>Inquiries</span></div>
              </div>
            </div>
          </article>

          <article className="gs7-feature-card gs7-feature-card--direction" data-rs-growth-feature-card>
            <div className="gs7-feature-direction__brand" data-rs-growth-card-float><img src="/static/img/logo-mark.png" alt="Afyra Digital" /></div>
            <div className="gs7-feature-card__copy gs7-feature-card__copy--light">
              <h3>Direction Before Activity</h3>
              <p>Coordinate content, local visibility, paid campaigns and WhatsApp around clearer business outcomes and long-term brand value.</p>
            </div>
            <div className="gs7-feature-direction__tags" aria-hidden="true"><span>Google Business Profile</span><span>WhatsApp</span><span>Paid Campaigns</span></div>
          </article>
        </div>
      </div>
    </section>
  )
}

function GrowthTextReveal07() {
  const words = [
    'Strategy', 'connects', 'visibility,', 'trust,', 'inquiries,', 'conversion', 'and', 'long-term', 'brand', 'value', 'into', 'one', 'clear', 'growth', 'direction.'
  ]
  return (
    <section className="gs7-text-reveal rs-section--light" data-rs-growth-text>
      <div className="af-container gs7-text-reveal__inner">
        <p aria-label="Strategy connects visibility, trust, inquiries, conversion and long-term brand value into one clear growth direction.">
          {words.map((word, index) => (
            <span className="gs7-text-reveal__cluster" key={`${word}-${index}`}>
              <span className="gs7-text-reveal__word" data-rs-growth-text-word>{word}</span>
              {index === 1 ? <span className="gs7-text-reveal__badge" data-rs-growth-text-badge><PublicIcon name="target" size={18} /></span> : null}
              {index === 8 ? <span className="gs7-text-reveal__badge gs7-text-reveal__badge--amber" data-rs-growth-text-badge><PublicIcon name="growth" size={18} /></span> : null}
            </span>
          ))}
        </p>
      </div>
    </section>
  )
}

function GrowthQuickStart07() {
  return (
    <section className="gs7-quick rs-section--light" data-rs-growth-quick>
      <div className="af-container gs7-quick__pin" data-rs-growth-quick-pin>
        <div className="gs7-quick__top">
          <div data-rs-reveal>
            <SectionLabel text="From strategy to scale" />
            <h2>Start With Direction. Build the System. Improve the Outcome.</h2>
          </div>
          <div className="gs7-quick__cta" data-rs-reveal>
            <p>Connect the right growth components around a clear business goal instead of adding disconnected activity.</p>
            <PrimaryButton>Request Consultation</PrimaryButton>
          </div>
        </div>
        <div className="gs7-quick__progress" aria-hidden="true">
          {growthQuickSteps.map((step, index) => <span data-rs-growth-quick-progress key={step.tab}><i /><b>{`0${index + 1}`}</b></span>)}
        </div>
        <div className="gs7-quick__stage" data-rs-growth-quick-stage>
          {growthQuickSteps.map((step, index) => (
            <article className={`gs7-quick__card gs7-quick__card--${index + 1}`} data-rs-growth-quick-card key={step.title}>
              <div className="gs7-quick__mockup">
                <div className="gs7-quick__mockup-head"><span>{step.metric}</span><i>•••</i></div>
                <div className="gs7-quick__chart"><b /><b /><b /><b /><b /><svg viewBox="0 0 300 90" preserveAspectRatio="none"><path d={index === 0 ? 'M0 66 C45 55 58 68 92 50 S150 35 184 43 S234 22 300 28' : index === 1 ? 'M0 72 C35 62 65 58 90 62 S145 48 170 44 S230 36 300 20' : 'M0 70 C42 68 70 50 106 54 S168 38 205 42 S254 24 300 16'} /></svg></div>
                <div className="gs7-quick__stats"><span><b>{step.value}</b>Stage</span><span><b>{index === 0 ? 'Clear' : index === 1 ? 'Connected' : 'Measured'}</b>Status</span><span><b>{index === 2 ? 'Growth' : 'Next'}</b>Focus</span></div>
              </div>
              <div className="gs7-quick__content"><span>{step.number}</span><h3>{step.title}</h3><p>{step.description}</p><div className="gs7-quick__links"><i><PublicIcon name={index === 0 ? 'strategy' : index === 1 ? 'social' : 'analytics'} size={18} /></i><i><PublicIcon name={index === 0 ? 'target' : index === 1 ? 'whatsapp' : 'growth'} size={18} /></i></div></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function GrowthRoadmap07({ data }: { data: ServicePageData }) {
  return (
    <section className="gs7-roadmap rs-section--light" data-rs-growth-roadmap>
      <div className="af-container">
        <div className="rs-section-head gs7-roadmap__head" data-rs-reveal><SectionLabel text="Growth roadmap" /><h2>Follow a Clear Route From Strategy to Long-Term Growth.</h2><p>{data.intro}</p></div>
        <div className="gs7-roadmap__canvas">
          <svg viewBox="0 0 1000 1080" preserveAspectRatio="none" aria-hidden="true">
            <path className="gs7-roadmap__base" d="M120 105 C820 80 900 220 835 330 C755 465 275 395 235 555 C190 735 820 650 770 825 C735 947 380 940 220 1010" />
            <path className="gs7-roadmap__fill" data-rs-growth-roadmap-path d="M120 105 C820 80 900 220 835 330 C755 465 275 395 235 555 C190 735 820 650 770 825 C735 947 380 940 220 1010" />
          </svg>
          {data.process.slice(0, 4).map((step, index) => (
            <article className={`gs7-roadmap__step gs7-roadmap__step--${index + 1}`} data-rs-growth-roadmap-step key={step.title}>
              <i data-rs-growth-roadmap-dot />
              <div><span>{String(index + 1).padStart(2, '0')}</span><h3>{step.title}</h3><p>{step.description}</p></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function GrowthPrograms07() {
  const [billingMode, setBillingMode] = useState<'monthly' | 'yearly'>('yearly')

  return (
    <section id="rs-programs" className="gs7-programs rs-section--light" data-rs-growth-programs>
      <div className="af-container">
        <div className="gs7-programs__intro" data-rs-reveal>
          <div className="gs7-programs__intro-copy">
            <SectionLabel text="Pricing plans" />
            <h2>Find The Right Plan For Your Business Growth</h2>
          </div>
          <div className="gs7-programs__intro-side">
            <p>Begin your setup effortlessly and start using the platform within minutes without complications.</p>
            <PrimaryButton>Get Started</PrimaryButton>
          </div>
        </div>

        <div className="gs7-programs__grid gs7-programs__grid--reference">
          {programs.plans.map((plan, index) => (
            <article className={`gs7-price-card gs7-price-card--reference ${plan.popular ? 'is-popular' : ''}`} data-rs-growth-price-card key={plan.id}>
              <div className="gs7-price-card__top"><span>{index === 0 ? 'Started Plan' : index === 1 ? 'Growth Plan' : 'Authority Plan'}</span>{plan.popular ? <b>Most Popular</b> : null}</div>
              <h3>{plan.name}</h3>
              <p>{plan.purpose}</p>
              <div className="gs7-price-card__price"><small>PKR</small>{plan.price.toLocaleString()}<span>/month</span></div>
              <button className="gs7-price-card__billing" type="button" aria-pressed={billingMode === 'yearly'} onClick={() => setBillingMode(billingMode === 'yearly' ? 'monthly' : 'yearly')} title="Display indicator only"><i /><span>{billingMode === 'yearly' ? 'Annually billed' : 'Monthly billed'}</span></button>
              <PrimaryButton>{index === 2 ? 'Get Started' : 'Program Inquiry'}</PrimaryButton>
              <div className="gs7-price-card__trial"><PublicIcon name="check" size={12} /> Get your free 7-day trial today!</div>
              <div className="gs7-price-card__includes">What’s Included</div>
              <ul>{plan.includes.slice(0, 6).map((item) => <li key={item}><PublicIcon name="check" size={14} />{item}</li>)}</ul>
            </article>
          ))}
        </div>

        <div className="gs7-programs__support-row" data-rs-growth-price-extra>
          <article className="gs7-programs__support-card gs7-programs__support-card--quote">
            <h3>Increased conversion rate by 400%</h3>
            <p>“We needed a high-converting website, and Bravio delivered. Their expertise helped us increase conversion rate by 400%”</p>
            <div className="gs7-programs__support-person"><i>S</i><div><b>Savannah Nguyen</b><span>Product owner</span></div></div>
          </article>
          <article className="gs7-programs__support-card gs7-programs__support-card--cta">
            <h3>Can&apos;t decide? Let&apos;s talk</h3>
            <p>Strategic web design, SEO-driven content, and paid ad campaigns tailored to drive result and conversions.</p>
            <PrimaryButton>Get Started</PrimaryButton>
          </article>
        </div>
      </div>
    </section>
  )
}

function GrowthSystemExperience07() {
  return (
    <section className="gs7-integrations rs-section--light" data-rs-growth-integrations>
      <div className="af-container">
        <div className="gs7-integrations__box" data-rs-growth-integrations-box>
          <div className="gs7-integrations__gridlines" aria-hidden="true" />
          <svg className="gs7-integrations__connectors" viewBox="0 0 1000 590" preserveAspectRatio="none" aria-hidden="true">
            {growthIntegrationNodes.map((item, index) => {
              const targetX = item.x * 10
              const targetY = item.y * 5.9
              const controlX = 500 + (targetX - 500) * .48
              const controlY = 295 + (targetY - 295) * .18
              const path = `M500 295 C${controlX} 295 ${controlX} ${controlY} ${targetX} ${targetY}`
              return (
                <g key={`connector-${item.label}`}>
                  <path className="gs7-integrations__connector-base" data-rs-growth-integration-base d={path} />
                  <path className="gs7-integrations__connector-light" data-rs-growth-integration-line data-line-index={index} d={path} />
                </g>
              )
            })}
          </svg>
          <div className="gs7-integrations__core" data-rs-growth-integrations-core>
            <SectionLabel text="Plug & play growth" />
            <div className="gs7-integrations__logo"><img src="/static/img/logo-mark.png" alt="Afyra Digital" /></div>
            <h2>Bring the Growth Components Into One Connected View.</h2>
            <p>Connect the strategy, channels and communication touchpoints already relevant to the business.</p>
            <a className="gs7-integrations__cta" href="#rs-programs">View Programs <PublicIcon name="arrowRight" size={15} /></a>
          </div>
          {growthIntegrationNodes.map((item, index) => (
            <div className={`gs7-integration-node gs7-integration-node--${index + 1}`} data-rs-growth-integration-node style={{ left: `${item.x}%`, top: `${item.y}%` } as CSSProperties} key={item.label}>
              <i><PublicIcon name={item.icon} size={18} /></i><span>{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function GrowthMobileApp07() {
  return (
    <section className="gs7-mobile-showcase" data-rs-growth-mobile>
      <div className="af-container">
        <div className="gs7-mobile-showcase__panel">
          <div className="gs7-mobile-showcase__stars" aria-hidden="true" />
          <div className="gs7-mobile-showcase__copy" data-rs-growth-mobile-copy>
            <SectionLabel text="Connected mobile view" />
            <h2>Bring Your Growth Signals Together.</h2>
            <p>A conceptual mobile view of strategy, campaigns, visibility and inquiry signals — presented as one connected growth experience.</p>
            <div className="gs7-mobile-showcase__chips" aria-label="Illustrative dashboard views"><span>Campaigns</span><span>Growth overview</span><span>Practice signals</span></div>
          </div>
          <figure className="gs7-mobile-showcase__phones" data-rs-growth-mobile-phones>
            <img src="/static/ref-solutions/growth-mobile-three-phones.webp" alt="Three Afyra Digital mobile growth dashboard mockups" loading="lazy" decoding="async" />
          </figure>
        </div>
      </div>
    </section>
  )
}

function GrowthFaq07() {
  const [open, setOpen] = useState(0)
  const toggleFaq = (index: number, button: HTMLButtonElement) => {
    const section = button.closest('[data-rs-growth-faq]')
    if (!section || index === open) return
    const items = Array.from(section.querySelectorAll<HTMLElement>('[data-rs-growth-faq-item]'))
    const previous = items[open]
    const next = items[index]
    if (previous) {
      const answer = previous.querySelector<HTMLElement>('.gs7-faq__answer')
      previous.classList.remove('is-open')
      previous.querySelector('button')?.setAttribute('aria-expanded', 'false')
      if (answer) gsap.to(answer, { height: 0, opacity: 0, duration: .3, ease: 'power2.inOut' })
    }
    if (next) {
      const answer = next.querySelector<HTMLElement>('.gs7-faq__answer')
      next.classList.add('is-open')
      next.querySelector('button')?.setAttribute('aria-expanded', 'true')
      if (answer) gsap.fromTo(answer, { height: 0, opacity: 0 }, { height: 'auto', opacity: 1, duration: .42, ease: 'power3.out' })
    }
    setOpen(index)
  }
  return (
    <section className="gs7-faq rs-section--light" data-rs-growth-faq>
      <div className="af-container gs7-faq__grid">
        <div className="gs7-faq__copy" data-rs-reveal>
          <SectionLabel text="FAQ’s" />
          <h2>Need Help? We’ve Got You Covered.</h2>
          <p>Clear answers based on Afyra Digital’s approved positioning, growth philosophy and current program terms.</p>
          <div className="gs7-faq__support"><h3>Can’t find your answer?</h3><p>Talk to Afyra about the growth direction, program fit or the role each channel should play.</p><PrimaryButton>Request Consultation</PrimaryButton></div>
        </div>
        <div className="gs7-faq__items">
          {growthFaqs.map((item, index) => (
            <article className={open === index ? 'is-open' : ''} data-rs-growth-faq-item key={item.q}>
              <button type="button" onClick={(event) => toggleFaq(index, event.currentTarget)} aria-expanded={open === index}><span><b>{index + 1}.</b> {item.q}</span><i>{open === index ? '×' : '+'}</i></button>
              <div className="gs7-faq__answer" style={{ height: open === index ? 'auto' : 0, opacity: open === index ? 1 : 0 }}><p>{item.a}</p></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function GrowthStrategyReferencePage({ data }: { data: ServicePageData }) {
  return (
    <>
      <GrowthStrategyHero data={data} />
      <GrowthSystem07 data={data} />
      <GrowthTextReveal07 />
      <GrowthQuickStart07 />
      <GrowthRoadmap07 data={data} />
      <GrowthPrograms07 />
      <GrowthSystemExperience07 />
      <TrustFramework bright />
      <GrowthMobileApp07 />
      <GrowthFaq07 />
      <FinalCta bright />
    </>
  )
}


function StrategyRoadmap({ data }: { data: ServicePageData }) {
  return (
    <section className="rs-strategy-roadmap rs-section--light" data-rs-roadmap>
      <div className="af-container">
        <div className="rs-section-head" data-rs-reveal><SectionLabel text="Growth roadmap" /><h2>Follow a Clear Route From Strategy to Growth.</h2><p>{data.intro}</p></div>
        <div className="rs-roadmap"><svg viewBox="0 0 1000 390" preserveAspectRatio="none" aria-hidden="true"><path data-rs-roadmap-path d="M40 310 C185 315 185 90 345 94 S510 340 660 308 S790 70 960 88" /></svg>{data.process.map((step, index) => <article className={`rs-roadmap__node rs-roadmap__node--${index + 1}`} data-rs-roadmap-node key={step.title}><span>0{index + 1}</span><h3>{step.title}</h3><p>{step.description}</p></article>)}</div>
      </div>
    </section>
  )
}

function FinalCta({ bright = false }: { bright?: boolean }) {
  return <section className={`rs-final ${bright ? 'rs-section--light' : ''}`}><div className="af-container"><div className="rs-final__box" data-rs-final><img src="/static/img/logo-mark.png" alt="Afyra Digital logo" loading="lazy" decoding="async" /><div><SectionLabel text="Let’s grow together" /><h2>Build the Next Stage of Your Digital Growth System.</h2><p>Strategy over decoration. Outcomes over deliverables. Credibility over hype.</p></div><PrimaryButton>Request Consultation</PrimaryButton></div></div></section>
}

const digitalPresenceFeatureCards = [
  {
    title: 'Secure & Reliable Systems',
    description: 'Enterprise-grade security for your data, communications and patient interactions.',
    icon: 'authority',
    variant: 'network',
    size: 'large'
  },
  {
    title: 'Real-Time Growth Analytics',
    description: 'Track leads, patient inquiries and campaign performance with powerful dashboards.',
    icon: 'analytics',
    variant: 'bars',
    size: 'large'
  },
  {
    title: 'Local Visibility Systems',
    description: 'Get found by more patients with local SEO, maps and directory optimization.',
    icon: 'location',
    variant: 'globe',
    size: 'large'
  },
  {
    title: 'Automated Workflows',
    description: 'Save time with intelligent automation systems.',
    icon: 'settings',
    size: 'small'
  },
  {
    title: 'Integrated Business Tools',
    description: 'Connect your website, CRM, bookings and more.',
    icon: 'website',
    size: 'small'
  },
  {
    title: 'Clear Reporting',
    description: 'Understand what’s working with simple, powerful reports.',
    icon: 'reports',
    size: 'small'
  },
  {
    title: 'Scalable Infrastructure',
    description: 'Built to grow with your practice, from one location to many.',
    icon: 'growth',
    size: 'small'
  }
] as const

const digitalPresenceOrbitTools = [
  { label: 'Facebook', icon: 'facebook' },
  { label: 'Google', icon: 'search' },
  { label: 'Instagram', icon: 'instagram' },
  { label: 'YouTube', icon: 'video' },
  { label: 'WhatsApp', icon: 'whatsapp' },
  { label: 'Email', icon: 'message' },
  { label: 'Website', icon: 'website' },
  { label: 'Shop', icon: 'program' },
  { label: 'WordPress', icon: 'content' },
  { label: 'LinkedIn', icon: 'linkedin' }
] as const

const digitalPresenceJourneyCards = [
  {
    title: 'For Clinics & Solo Practitioners',
    description: 'Build credibility, attract local patients and manage your online presence with ease.',
    icon: 'doctor',
    cta: 'Grow My Clinic'
  },
  {
    title: 'For Healthcare Brands',
    description: 'Strengthen your brand, engage patients and create a lasting digital presence.',
    icon: 'hospital',
    cta: 'Build My Brand'
  },
  {
    title: 'For Expanding Practices',
    description: 'Scale efficiently with automation, multi-location systems and centralized tools.',
    icon: 'growth',
    cta: 'Scale My Practice'
  },
  {
    title: 'For Multi-Location Groups',
    description: 'Unify your digital presence across all locations with consistent growth systems.',
    icon: 'social',
    cta: 'Manage Locations'
  }
] as const

const digitalPresenceFaqs = [
  {
    q: 'How quickly can I see results?',
    a: 'Timelines depend on the starting point, scope, market and selected growth system. Afyra does not promise a fixed timeframe or guaranteed result; progress is reviewed through the agreed strategy and reporting process.'
  },
  {
    q: 'Do you work with all types of healthcare businesses?',
    a: 'Afyra’s strongest specialization is healthcare marketing, especially doctors, clinics, hospitals and aesthetic or cosmetic centers. Other businesses can be discussed based on fit.'
  },
  {
    q: 'Is there a long-term contract?',
    a: 'Specific engagement structure depends on the agreed scope. Program terms, inclusions and payment expectations are clarified before onboarding so the next step is clear.'
  },
  {
    q: 'Can you help with existing websites and social media?',
    a: 'Yes. Afyra can strengthen an existing digital presence by improving visibility, communication, local discovery, inquiry pathways and the broader patient or customer journey.'
  },
  {
    q: 'What makes Afyra Digital different?',
    a: 'Afyra works as a growth partner, not a task-only freelancer. The focus is on connected systems, measurable business outcomes, professional positioning and qualified inquiries.'
  }
] as const

function DigitalPresenceFeatureVisual({ variant }: { variant?: string }) {
  if (variant === 'bars') {
    return (
      <div className="dp-analytics" aria-hidden="true">
        <div className="dp-analytics__grid" />
        <div className="dp-bars">{[56, 34, 72, 44, 62, 38, 78, 49, 69, 43, 88, 57].map((height, index) => <span key={`${variant}-${index}`} style={{ height }} />)}</div>
        <div className="dp-analytics__dates"><span>Jan</span><span>Mar</span><span>May</span><span>Jul</span><span>Sep</span></div>
      </div>
    )
  }
  if (variant === 'network') {
    return (
      <div className="dp-network" aria-hidden="true">
        <span className="dp-network__halftone" />
        <span className="dp-network__connector dp-network__connector--1" />
        <span className="dp-network__connector dp-network__connector--2" />
        <span className="dp-network__connector dp-network__connector--3" />
        <span className="dp-network__connector dp-network__connector--4" />
        <i className="dp-network__node dp-network__node--1"><PublicIcon name="website" size={16} /></i>
        <i className="dp-network__node dp-network__node--2"><PublicIcon name="analytics" size={16} /></i>
        <i className="dp-network__node dp-network__node--3"><PublicIcon name="settings" size={16} /></i>
        <i className="dp-network__node dp-network__node--4"><PublicIcon name="authority" size={16} /></i>
        <span className="dp-network__hub"><img src="/static/img/logo-mark.png" alt="" /></span>
      </div>
    )
  }
  if (variant === 'globe') {
    return (
      <div className="dp-globe" aria-hidden="true">
        <span className="dp-globe__halo" />
        <span className="dp-globe__sphere" />
        <span className="dp-globe__arc dp-globe__arc--1" />
        <span className="dp-globe__arc dp-globe__arc--2" />
        <i className="dp-globe__spark dp-globe__spark--1" />
        <i className="dp-globe__spark dp-globe__spark--2" />
      </div>
    )
  }
  return null
}

function DigitalPresenceReferencePage({ data }: { data: ServicePageData }) {
  const [open, setOpen] = useState(0)

  useEffect(() => {
    const items = Array.from(document.querySelectorAll<HTMLElement>('.rs-layout-03 [data-rs-faq-item]'))
    items.forEach((item, index) => {
      const wash = item.querySelector<HTMLElement>('.dp-faq__wash')
      const sweep = item.querySelector<HTMLElement>('.dp-faq__sweep')
      const active = index === open
      gsap.to(item, { borderColor: active ? 'rgba(0,187,160,.58)' : 'rgba(0,187,160,.18)', duration: .34, ease: 'power2.out', overwrite: 'auto' })
      if (wash) gsap.to(wash, { opacity: active ? 1 : 0, duration: .42, ease: 'power2.out', overwrite: 'auto' })
      if (active && sweep) {
        gsap.killTweensOf(sweep)
        gsap.fromTo(sweep, { xPercent: -125, opacity: 0 }, { xPercent: 135, opacity: .72, duration: .95, ease: 'power2.inOut' })
      } else if (sweep) {
        gsap.set(sweep, { xPercent: -125, opacity: 0 })
      }
    })
  }, [open])

  return (
    <>
      <section className="rs-hero dp-hero" data-rs-hero>
        <div className="rs-hero__noise dp-hero__noise" aria-hidden="true" />
        <div className="dp-hero__edge dp-hero__edge--left" aria-hidden="true" />
        <div className="dp-hero__edge dp-hero__edge--right" aria-hidden="true" />
        <div className="af-container dp-hero__wrap">
          <div className="rs-hero__copy dp-hero__copy" data-rs-hero-copy>
            <div className="rs-reference-pill"><span /> Digital Presence / Advanced Digital Systems</div>
            <h1>Transform Your Practice <br /><em>With a Smarter Digital Presence.</em></h1>
            <p className="rs-hero__lead">Advanced digital systems, automation and local visibility solutions designed for modern healthcare businesses.</p>
            <div className="rs-hero__actions dp-hero__actions">
              <PrimaryButton>Get Your Free Strategy Call</PrimaryButton>
            </div>
          </div>

          <div className="rs-hero__stage dp-hero__stage" data-rs-hero-stage>
            <div className="dp-hero__visual">
              <div className="dp-hero__wing dp-hero__wing--left" data-rs-hero-wing aria-hidden="true" />
              <div className="dp-hero__wing dp-hero__wing--right" data-rs-hero-wing aria-hidden="true" />
              <div className="dp-hero__beam" aria-hidden="true" />
              <div className="dp-hero__aura" data-rs-orbit aria-hidden="true" />
              <div className="dp-hero__aura dp-hero__aura--outer" data-rs-orbit-reverse aria-hidden="true" />
              <div className="dp-hero__icons" data-rs-hero-icons>
                <div className="dp-hero__social dp-hero__social--1" data-rs-hero-icon data-af-rising-icon data-rise-start="110" data-rise-distance="248" data-rise-duration="7.4" data-rise-drift="-7" data-rise-opacity="1"><PublicIcon name="whatsapp" size={20} /></div>
                <div className="dp-hero__social dp-hero__social--2" data-rs-hero-icon data-af-rising-icon data-rise-start="168" data-rise-distance="276" data-rise-duration="6.8" data-rise-drift="5" data-rise-opacity=".96"><PublicIcon name="linkedin" size={18} /></div>
                <div className="dp-hero__social dp-hero__social--3" data-rs-hero-icon data-af-rising-icon data-rise-start="224" data-rise-distance="292" data-rise-duration="6.2" data-rise-drift="-3" data-rise-opacity=".88"><PublicIcon name="instagram" size={18} /></div>
                <div className="dp-hero__social dp-hero__social--4" data-rs-hero-icon data-af-rising-icon data-rise-start="284" data-rise-distance="314" data-rise-duration="5.9" data-rise-drift="4" data-rise-opacity=".72"><PublicIcon name="facebook" size={16} /></div>
                <div className="dp-hero__social dp-hero__social--5" data-rs-hero-icon data-af-rising-icon data-rise-start="334" data-rise-distance="330" data-rise-duration="5.4" data-rise-drift="-5" data-rise-opacity=".56"><i>G</i></div>
              </div>
              <figure className="dp-hero__core">
                <img src="/static/img/logo-mark.png" alt="Afyra Digital mark" loading="eager" decoding="async" />
              </figure>
            </div>
            <div className="dp-hero__side dp-hero__side--left"><span>More Visibility.</span><span>More Patients.</span><span>A Stronger Practice.</span></div>
            <div className="dp-hero__side dp-hero__side--right"><span>Built for</span><span>Healthcare</span><span>Brands</span></div>
          </div>

          <div className="dp-trust-reveal" data-rs-hero-trust data-rs-hero-line>
            <div className="dp-trust-reveal__track dp-trust-reveal__track--full">
              <div className="dp-trust-reveal__marquee" data-rs-hero-marquee>
                <span>Google Business</span><span>Google</span><span>Meta</span><span>Instagram</span><span>LinkedIn</span><span>YouTube</span>
                <span>Google Business</span><span>Google</span><span>Meta</span><span>Instagram</span><span>LinkedIn</span><span>YouTube</span>
              </div>
            </div>
            <div className="dp-trust-reveal__center"><strong>CONNECTED PLATFORMS</strong></div>
            <i className="dp-trust-reveal__gate dp-trust-reveal__gate--left" aria-hidden="true" />
            <i className="dp-trust-reveal__gate dp-trust-reveal__gate--right" aria-hidden="true" />
          </div>
        </div>
      </section>

      <section className="rs-story dp-story" data-rs-story>
        <div className="af-container rs-story__pin dp-story__pin" data-rs-story-pin>
          <div className="dp-section-ornament dp-section-ornament--ecosystem" aria-hidden="true">
            <span className="dp-ornament__ring dp-ornament__ring--one" /><span className="dp-ornament__ring dp-ornament__ring--two" />
            <i className="dp-ornament__spark dp-ornament__spark--1" /><i className="dp-ornament__spark dp-ornament__spark--2" /><i className="dp-ornament__spark dp-ornament__spark--3" />
            <img src="/static/img/logo-mark.png" alt="" />
          </div>
          <div className="rs-story__intro dp-story__intro" data-rs-story-intro>
            <SectionLabel text="A complete digital ecosystem" />
            <h2>Everything You Need For <span>Sustainable Practice Growth</span></h2>
            <p>From visibility to automation, we build connected digital systems that help healthcare businesses grow, engage and thrive.</p>
          </div>
          <div className="rs-story__grid dp-story__grid" data-rs-story-grid>
            {digitalPresenceFeatureCards.map((feature, index) => (
              <article className={`rs-feature dp-feature ${feature.size === 'large' ? 'is-large' : 'is-small'}`} data-rs-feature key={feature.title}>
                <div className="dp-feature__badge"><PublicIcon name={feature.icon} size={18} /></div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
                <DigitalPresenceFeatureVisual variant={'variant' in feature ? feature.variant : undefined} />
                {feature.size === 'small' ? <div className="dp-feature__line" aria-hidden="true" /> : null}
                <span className="dp-feature__count">{String(index + 1).padStart(2, '0')}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="rs-orbit-section dp-orbit-section" data-rs-integration data-rs-integration-sequence>
        <div className="af-container dp-integration-pin" data-rs-integration-pin>
          <div className="rs-section-head dp-section-head dp-integration-intro" data-rs-integration-intro>
            <SectionLabel text="Connect your digital ecosystem" />
            <h2>Powerful Integrations <br />For Greater Impact</h2>
            <p>Bring all your essential tools together. Afyra Digital connects your digital presence across platforms to create a seamless, automated growth system.</p>
          </div>
          <div className="dp-orbit dp-integration-stage" data-rs-integration-orbit data-rs-sequenced-orbit data-rs-integration-stage>
            <svg viewBox="0 0 700 700" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
              <circle data-rs-integration-path cx="350" cy="350" r="242" />
            </svg>
            <div className="dp-orbit__hub dp-integration-hub" data-rs-integration-hub>
              <div className="dp-orbit__hub-ring" aria-hidden="true" />
              <img src="/static/img/logo-mark.png" alt="Afyra Digital mark" loading="lazy" decoding="async" />
            </div>
            {digitalPresenceOrbitTools.map((item, index) => (
              <div className={`rs-integration dp-orbit__item dp-orbit__item--${index + 1}`} data-rs-integration-item key={item.label}>
                <i><PublicIcon name={item.icon} size={20} /></i>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="dp-usecases" data-rs-proof>
        <div className="af-container">
          <div className="dp-section-ornament dp-section-ornament--usecases" aria-hidden="true">
            <span className="dp-ornament__shield" /><i className="dp-ornament__spark dp-ornament__spark--1" /><i className="dp-ornament__spark dp-ornament__spark--2" /><i className="dp-ornament__spark dp-ornament__spark--3" />
            <img src="/static/img/logo-mark.png" alt="" />
          </div>
          <div className="rs-section-head dp-section-head" data-rs-reveal>
            <SectionLabel text="Tailored solutions for every stage" />
            <h2>How Afyra Digital Enhances <br />Your Digital Presence.</h2>
            <p>Strategic solutions for healthcare businesses at every stage of their journey.</p>
          </div>
          <div className="dp-usecases__grid">
            {digitalPresenceJourneyCards.map((card) => (
              <article className="dp-usecase" data-rs-proof-card key={card.title}>
                <div className="dp-usecase__icon"><PublicIcon name={card.icon} size={20} /></div>
                <h3>{card.title}</h3>
                <p>{card.description}</p>
                <button type="button">{card.cta} <PublicIcon name="arrowRight" size={14} /></button>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="rs-programs" className="rs-programs dp-programs" data-rs-pricing>
        <div className="dp-programs__watermark" aria-hidden="true">Pricing Plan</div>
        <div className="dp-section-ornament dp-section-ornament--pricing" aria-hidden="true">
          <span className="dp-ornament__ring dp-ornament__ring--one" /><span className="dp-ornament__ring dp-ornament__ring--two" />
          <i className="dp-ornament__spark dp-ornament__spark--1" /><i className="dp-ornament__spark dp-ornament__spark--2" /><i className="dp-ornament__spark dp-ornament__spark--3" />
          <img src="/static/img/logo-mark.png" alt="" />
        </div>
        <div className="af-container">
          <div className="rs-section-head dp-section-head" data-rs-reveal>
            <SectionLabel text="Simple. Transparent. Results-focused." />
            <h2>Choose Your Growth Plan</h2>
            <p>Current approved monthly programs designed around presence, qualified inquiries and long-term authority building.</p>
          </div>
          <div className="dp-programs__grid">
            {programs.plans.map((plan) => (
              <article className={`rs-price-card dp-program ${plan.popular ? 'is-popular' : ''}`} data-rs-price-card key={plan.id}>
                {plan.popular ? <span className="dp-program__popular">Most Popular</span> : null}
                <div className="dp-program__icon"><PublicIcon name={plan.icon} size={20} /></div>
                <h3>{plan.name}</h3>
                <p>{plan.purpose}</p>
                <div className="dp-program__price"><small>PKR</small>{plan.price.toLocaleString()}<span>/Per Month</span></div>
                <button type="button" className="dp-program__cta">Get Started <PublicIcon name="arrowRight" size={14} /></button>
                <div className="dp-program__includes">What’s Included:</div>
                <ul>
                  {plan.includes.slice(0, 5).map((item) => <li key={item}><PublicIcon name="check" size={14} />{item}</li>)}
                </ul>
              </article>
            ))}
          </div>
          <div className="dp-programs__terms">
            <span>{programs.terms[0]}</span>
            <div className="dp-programs__mode"><b>Monthly</b><i aria-hidden="true" /><span>Current pricing</span></div>
          </div>
        </div>
      </section>

      <section className="rs-faq dp-faq" data-rs-faq id="faqs">
        <div className="dp-faq__ornament" aria-hidden="true">
          <span>?</span><i className="dp-ornament__spark dp-ornament__spark--1" /><i className="dp-ornament__spark dp-ornament__spark--2" /><i className="dp-ornament__spark dp-ornament__spark--3" />
        </div>
        <div className="af-container">
          <div className="rs-section-head dp-section-head" data-rs-reveal>
            <SectionLabel text="Questions? We’ve got answers" />
            <h2>Frequently Asked Questions</h2>
            <p>Everything you need to know about Afyra Digital’s digital presence solutions.</p>
          </div>
          <div className="dp-faq__items">
            {digitalPresenceFaqs.map((item, index) => (
              <article className={open === index ? 'is-open' : ''} data-rs-faq-item key={item.q}>
                <span className="dp-faq__wash" aria-hidden="true" /><span className="dp-faq__sweep" aria-hidden="true" />
                <button type="button" onClick={() => setOpen(open === index ? -1 : index)} aria-expanded={open === index}>
                  <span>{item.q}</span>
                  <i>{open === index ? '−' : '+'}</i>
                </button>
                <div><p>{item.a}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="rs-final dp-final">
        <div className="af-container">
          <div className="dp-final__box" data-rs-final>
            <div>
              <h2>Ready to Build a Stronger Digital Presence?</h2>
              <p>Let’s create a tailored strategy for your healthcare business.</p>
            </div>
            <PrimaryButton>Get Your Free Strategy Call</PrimaryButton>
          </div>
        </div>
      </section>
    </>
  )
}


export default function ReferenceSolutionExperience({ data }: { data: ServicePageData }) {
  const isLight = data.layout === '07'
  const ref = referenceName[data.layout]
  return (
    <div className={`rs-experience-page rs-layout-${data.layout} ${isLight ? 'rs-theme-light' : 'rs-theme-dark'}`} data-rs-root data-reference-style={ref}>
      {data.layout === '03' ? <DigitalPresenceReferencePage data={data} /> : data.layout === '04' || data.layout === '05' || data.layout === '06' || data.layout === '07' ? null : <ReferenceHero data={data} />}
      {data.layout === '04' ? <PatientAcquisitionReferencePage data={data} /> : null}
      {data.layout === '05' ? <WebsiteDevelopmentReferencePage data={data} /> : null}
      {data.layout === '06' ? <SocialMediaReferencePage data={data} /> : null}
      {data.layout === '07' ? <GrowthStrategyReferencePage data={data} /> : null}
      {data.contentGap && data.layout !== '03' && data.layout !== '05' ? <section className={`rs-gap ${isLight || data.layout === '04' ? 'rs-section--light' : ''}`}><div className="af-container"><div className="rs-gap__box"><strong>PENDING FOUNDER INPUT</strong><p>{data.contentGap}</p></div></div></section> : null}
    </div>
  )
}
