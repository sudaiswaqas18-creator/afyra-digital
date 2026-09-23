import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { ServicePageData } from '../data/servicePages'
import { process, brand as socialBrand } from '../data/content'
import { apiSubmitInquiry } from '../lib/api'
import { useLiveProgramsData } from '../lib/useLiveProgramsData'
import { useScopedFaqs } from '../lib/useScopedFaqs'
import PublicIcon from './PublicIcon'
import SectionLabel from './SectionLabel'
import BillingToggle from './BillingToggle'
import TestimonialsSection from './TestimonialsSection'
import PatientRobotTestimonials from './PatientRobotTestimonials'
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
  const programs = useLiveProgramsData()
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
  const scopedFaqs = useScopedFaqs(faqs)
  return (
    <section className={`rs-faq ${bright ? 'rs-section--light' : ''} ${variant === 'support-card' ? 'rs-faq--support-card' : ''} ${variant === 'social-reference' ? 'rs-faq--social-reference' : ''}`} data-rs-faq>
      <div className="af-container rs-faq__grid">
        <div className="rs-faq__copy" data-rs-reveal>
          <SectionLabel text="Frequently asked questions" />
          <h2 className={variant === 'social-reference' ? 'social-faq-heading' : undefined}>{variant === 'social-reference' ? 'Everything You Need to Know' : 'Questions Before We Grow Together?'}</h2>
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
        <div className="rs-faq__items">{scopedFaqs.map((item, index) => <article className={open === index ? 'is-open' : ''} data-rs-faq-item key={item.q}><button type="button" onClick={() => setOpen(open === index ? -1 : index)} aria-expanded={open === index}><span>{variant === 'social-reference' ? `${index + 1}. ` : ''}{item.q}</span><i>{open === index ? '−' : '+'}</i></button><div><p>{item.a}</p></div></article>)}</div>
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
          <svg className="pa-hero__spiral" viewBox="0 0 500 500" aria-hidden="true">{Array.from({length:36},(_,i)=><ellipse key={i} cx="250" cy="250" rx="120" ry="228" transform={`rotate(${i*5} 250 250)`} />)}</svg>
          <div className="pa-hero__visual-ring pa-hero__visual-ring--inner" data-rs-patient-hero-swirl aria-hidden="true" />
          <div className="pa-hero__visual-ring pa-hero__visual-ring--glow" aria-hidden="true" />
          <div className="pa-hero__orbit-dot" data-rs-patient-hero-orbit-dot aria-hidden="true" />
          <div className="pa-hero__robot" data-rs-patient-hero-bot data-rs-patient-hero-logo>
            <img className="pa-hero__robot-image" src="/static/reference-v86/patient-hero.webp" alt="Afyra AI assistant robot" />
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
            <div className="pa-response-copy"><h3>Instant AI<br/>Responses</h3><p>Deliver accurate, human-like answers in seconds with intelligent inquiry support.</p></div><img className="pa-response-robot" src="/static/reference-v92/inquiry-robot.png" alt="AI assistant for inquiry responses" loading="lazy" />
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
  const programs = useLiveProgramsData()
  const pricingRef = useRef<HTMLElement>(null)
  const [billingMode, setBillingMode] = useState<'monthly' | 'yearly'>('monthly')
  const isYearly = billingMode === 'yearly'
  const pricingKey = programs.plans.map(plan => plan.id).join('|')
  useEffect(() => {
    const root = pricingRef.current
    if (!root || !pricingKey) return
    gsap.registerPlugin(ScrollTrigger)
    const media = gsap.matchMedia()
    media.add('(min-width: 761px) and (prefers-reduced-motion: no-preference)', () => {
      const cards = Array.from(root.querySelectorAll<HTMLElement>('[data-rs-patient-price]'))
      const grid = root.querySelector('.pa-pricing__grid')
      if (!grid || !cards.length) return
      const timeline = gsap.timeline({scrollTrigger: {trigger: grid, start: 'top 65%', end: '+=300', scrub: .65, invalidateOnRefresh: true}})
      cards.forEach((card, index) => {
        gsap.set(card, {zIndex: index === 1 ? 3 : 1, transformOrigin: '50% 100%'})
        timeline.fromTo(card, {'--price-rotate': `${index === 0 ? -12 : index === 2 ? 12 : 0}deg`, '--price-x': `${index === 0 ? 18 : index === 2 ? -18 : 0}%`, '--price-y': `${index === 1 ? 0 : 35}px`}, {'--price-rotate':'0deg','--price-x':'0%','--price-y':'0px',ease:'none',duration:1}, 0)
      })
    }, root)
    const refresh = () => ScrollTrigger.refresh()
    const observer = new ResizeObserver(refresh)
    observer.observe(root)
    document.fonts.ready.then(refresh)
    return () => { observer.disconnect(); media.revert() }
  }, [pricingKey])
  return (
    <section ref={pricingRef} id="rs-programs" className="pa-pricing rs-section--light" data-rs-patient-pricing>
      <div className="af-container">
        <div className="rs-section-head pa-section-head pa-pricing__head" data-rs-patient-price-head>
          <SectionLabel text="Current programs" />
          <h2>Choose the Program That Matches Your Growth Stage.</h2>
          <p>Current approved Afyra Digital programs and pricing. Customized programs are available according to business requirements.</p>
        </div>
        <BillingToggle value={billingMode} onChange={setBillingMode} />
        <div className="pa-pricing__grid">
          {programs.plans.map((plan) => {
            const price = isYearly ? Math.round(plan.price * 0.8) : plan.price
            return (
              <article className={`pa-price-card ${plan.popular ? 'is-popular' : ''}`} data-rs-patient-price key={plan.id}>
                {plan.popular ? <span className="pa-price-card__popular">Most Popular</span> : null}
                <div className="pa-price-card__icon"><PublicIcon name={plan.icon} size={20} /></div>
                <h3>{plan.name}</h3>
                <div className="pa-price-card__price"><small>PKR</small>{price.toLocaleString()}<span>{isYearly ? '/mo (annual)' : '/month'}</span></div>
                <p>{plan.purpose}</p>
                <div className="pa-price-card__includes">What’s Included:</div>
                <ul>{plan.includes.slice(0, 5).map((item) => <li key={item}><PublicIcon name="check" size={14} />{item}</li>)}</ul>
                <PrimaryButton>Program Inquiry</PrimaryButton>
              </article>
            )
          })}
        </div>
        <p className="pa-pricing__term">{isYearly ? 'Annual plans include 20% discount. First month is charged at 25% extra for setup.' : programs.terms[0]}</p>
      </div>
    </section>
  )
}

function PatientIntegrationArc() {
 const apps=['Google','Google Ads','Google Translate','HubSpot','Integrations','Collaboration','Zendesk','OpenAI','Notion','Zapier','Intercom','Automation'];
 return (<section className="pa-touchpoints rs-section--light" data-rs-patient-arc><div className="af-container">
 <div className="rs-section-head pa-section-head" data-rs-reveal><SectionLabel text="Connected touchpoints"/><h2>Connect the Channels That Influence Discovery, Trust and Conversion.</h2></div>
 <div className="pa-orbit-stage"><div className="pa-orbit-disc" aria-hidden="true"/><div className="pa-orbit-ring" data-rs-patient-arc-ring>{apps.map((name,i)=>{const angle=(i*30-105)*Math.PI/180;return <div className="pa-orbit-app" data-rs-patient-arc-item key={name} style={{left:(50+46*Math.cos(angle))+'%',top:(50+46*Math.sin(angle))+'%'}}><img src={'/static/reference-v86/app-'+i+'.webp'} alt={name} loading="lazy"/></div>})}</div>
 <svg width="0" height="0" aria-hidden="true" style={{position:'absolute'}}><defs><clipPath id="pa-glass-left" clipPathUnits="objectBoundingBox"><path d="M.042 .30 A.5 .5 0 0 1 .197 .102 L.249 .17 A.414 .414 0 0 0 .121 .334 Z"/></clipPath><clipPath id="pa-glass-right" clipPathUnits="objectBoundingBox"><path d="M.803 .102 A.5 .5 0 0 1 .958 .30 L.879 .334 A.414 .414 0 0 0 .751 .17 Z"/></clipPath></defs></svg>
 <div className="pa-orbit-glass is-left" aria-hidden="true"/><div className="pa-orbit-glass is-right" aria-hidden="true"/>
 <div className="pa-orbit-copy"><p>Afyra connects campaigns, local discovery, lead communication and key platforms into one acquisition system.</p><PrimaryButton>Request Consultation</PrimaryButton></div></div></div></section>
 )
}

const patientProcessSteps = process.steps


function PatientSystemExperience({ data }: { data: ServicePageData }) {
 return <section className="pa-reference-process" data-rs-patient-process><div className="af-container"><div className="rs-section-head" data-rs-reveal><SectionLabel text="How it works"/><h2>A Connected System for Better Patient Journeys.</h2><p>Bring discovery, communication and continuous improvement together.</p></div><div className="pa-reference-process__stage"><svg className="pa-process-lines" viewBox="0 0 1200 560" preserveAspectRatio="none" aria-hidden="true"><path d="M330 115 H410 Q432 115 443 145 L600 450 M330 345 H425 Q450 345 465 365 L600 450 M870 115 H790 Q768 115 757 145 L600 450 M870 345 H775 Q750 345 735 365 L600 450"/></svg><img className="pa-reference-process__robot" src="/static/reference-v86/patient-process.webp" alt="Afyra patient communication assistant"/><img className="pa-reference-process__platform" src="/static/reference-v86/patient-platform.webp" alt=""/>{data.process.slice(0,4).map((step,i)=><article key={step.title} className={`pa-process-step pa-process-step--${i+1}`} data-rs-process-card><span>{i+1}</span><div><PublicIcon name={i%2?'growth':'message'} size={24}/><h3>{step.title}</h3><p>{step.description}</p></div></article>)}</div></div></section>
}

function PatientFaqSection() {
  const [open, setOpen] = useState(0)
  const scopedFaqs = useScopedFaqs(patientFaqs)
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
          {scopedFaqs.map((item, index) => (
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
      <PatientRobotTestimonials />
      <PatientFaqSection />
      <FinalCta bright />
    </>
  )
}

const websiteFeatureVisuals = [
  '/static/reference-v86/f5-img-1.webp',
  '/static/reference-v86/f5-img-2.webp',
  '/static/reference-v86/f5-img-3.webp',
  '/static/reference-v86/f5-img-4.webp'
] as const

const websiteModuleBullets = [
  ['Clear value communication', 'Professional presentation', 'Clear next action'],
  ['Agency-level positioning', 'Outcome-focused language', 'Scalable brand structure'],
  ['Who the business helps', 'Problem and solution clarity', 'Relevant next action'],
  ['Verified work only', 'Verified testimonials only', 'Process and expertise']
] as const

const websiteTemplates = [
  { label: 'Clinics & Practices', image: '/static/reference-v86/p5-img-1.webp', icon: 'clinic' },
  { label: 'Healthcare Brands', image: '/static/reference-v86/p5-img-2.webp', icon: 'brand' },
  { label: 'Authority & Trust', image: '/static/reference-v86/p5-img-3.webp', icon: 'trust' },
  { label: 'Multi-location', image: '/static/reference-v86/p5-img-4.webp', icon: 'location' }
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
            <img className="web-hero__reference-image" src="/static/reference-v86/h5-img-1.webp" alt="Visual website editor and responsive website preview" />
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

        <WebsiteHowItWorks data={data} />
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
                <span className="web-direction-icon"><PublicIcon name={item.icon} size={16} /></span>{item.label}
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
      <div className="web-how__dome" data-rs-web-how-dome aria-hidden="true"><div className="web-how__sweep" data-rs-web-how-sweep><svg viewBox="0 0 800 800" width="100%" height="100%"><defs><linearGradient id="web-sweep-color" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#00bba0" stopOpacity=".85"/><stop offset="1" stopColor="#006b5d" stopOpacity=".35"/></linearGradient></defs><path d="M400 400 L400 0 A400 400 0 0 1 746.41 600 Z" fill="url(#web-sweep-color)"/></svg></div></div>
      <div className="af-container web-how__inner">
        <div className="rs-section-head web-how__head" data-rs-reveal>
          <SectionLabel text="How it works" />
          <h2>Strategy First. Systems Next. Outcomes Always.</h2>
          <p>The structure stays simple: understand the business, connect the right growth components, improve the journey and manage toward long-term value.</p>
        </div>
        <div className="web-how__cards">
          {[data.process[0], data.process[1], { title: 'Launch & Improve', description: data.process.slice(2).map(step => step.description).join(' ') }].map((step, index) => (
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
  const programs = useLiveProgramsData()
  const [billing, setBilling] = useState<'monthly' | 'yearly'>('monthly')
  const yearly = billing === 'yearly'

  return (
    <section id="rs-programs" className="web-current web-pricing" data-rs-web-current>
      <video className="web-pricing__video" autoPlay muted loop playsInline preload="metadata" aria-hidden="true" tabIndex={-1}><source src="/static/reference-v86/Afyra-p5-video.mp4" type="video/mp4" /></video>
      <div className="af-container web-pricing__inner">
        <div className="rs-section-head web-pricing__head" data-rs-reveal>
          <SectionLabel text="Current programs" />
          <h2>Choose a Growth Program Around the Business Stage.</h2>
          <p>These are Afyra Digital’s current approved marketing programs. Website Development standalone scope, timelines and pricing remain pending founder approval.</p>
        </div>

        <div className="web-pricing__toggle-wrap">
          <BillingToggle value={billing} onChange={setBilling} />
          <p className="web-pricing__billing-note" aria-live="polite">
            {yearly ? 'Annual billing rate with 20% savings applied.' : 'Current approved monthly pricing.'}
          </p>
        </div>

        <div className="web-pricing__grid">
          {programs.plans.map((plan) => {
            // Canonical program data stores the checklist in `includes`.
            // Normalize it here so malformed or missing data can never crash this page.
            const includedFeatures = Array.isArray(plan.includes) ? plan.includes : []
            const price = typeof plan.price === 'number' ? (yearly ? Math.round(plan.price * 0.8) : plan.price) : '—'
            const displayPrice = typeof price === 'number' ? price.toLocaleString() : price

            return (
              <article className={`web-pricing__card ${plan.popular ? 'is-popular' : ''}`} data-rs-web-price-card key={plan.id}>
                {plan.popular ? <span className="web-pricing__popular">Most Popular</span> : null}
                <div className="web-pricing__icon"><PublicIcon name={plan.icon} size={22} /></div>
                <h3>{plan.name}</h3>
                <p className="web-pricing__purpose">{plan.purpose}</p>
                <div className="web-pricing__price"><small>PKR</small><strong>{displayPrice}</strong><span>{yearly ? '/mo (annual)' : '/month'}</span></div>
                <p className="web-pricing__rate-note">{yearly ? 'Annual billing rate (20% savings applied).' : 'Current monthly program rate.'}</p>
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

function WebsiteInsights(){return <section className="web-insights rs-section--light"><div className="af-container"><div className="rs-section-head" data-rs-reveal><SectionLabel text="Insights & resources"/><h2>Build a Stronger Digital Presence.</h2><p>Explore practical ideas for clearer websites and better customer journeys.</p></div><div className="web-insights__grid">{['Turn Your Website Into a Business Asset','Build Trust Through Clear Communication','Create a Better Path to Inquiry'].map((title,i)=><Link to="/insights" key={title}><img src={`/static/reference-v86/b5-img-${i+1}.webp`} alt="" loading="lazy"/><small>Afyra Digital · Website insights</small><h3>{title} ↗</h3></Link>)}</div></div></section>}

function WebsiteWhyChoose() {
  const benefits = [
    ['website', 'Build Faster, Launch Sooner', 'Move from a clear website strategy to a polished launch with a focused design and development process.'],
    ['growth', 'Scale Without Limits', 'Build a flexible foundation for new services, locations and content as your business grows.'],
    ['location', 'Reach the Right Audience', 'Create accessible, responsive experiences that help people discover your business across devices and locations.'],
    ['analytics', 'Support Conversions & Growth', 'Guide visitors through clear messages, useful content and meaningful next steps that support qualified inquiries.'],
    ['program', 'Focus on Business, Not Code', 'Keep your attention on your business while Afyra handles the website structure, performance and technical implementation.']
  ]
  return <section className="web-benefits rs-section--light"><div className="af-container">
    <div className="rs-section-head" data-rs-reveal><SectionLabel text="Why choose us?" /><h2>A Stronger Website.<br />Built Around Your Business.</h2><p>Thoughtful design and connected systems to support trust, clarity and long-term growth.</p></div>
    <div className="web-benefits__grid">{benefits.map(([icon, title, description]) => <article className="web-benefits__card" key={title} tabIndex={0}><div className="web-benefits__surface"><span className="web-benefits__icon"><PublicIcon name={icon} size={25} /></span><h3>{title}</h3><p>{description}</p></div></article>)}</div>
  </div></section>
}

function WebsiteDevelopmentReferencePage({ data }: { data: ServicePageData }) {
  return (
    <>
      <WebsiteHero data={data} />
      <WebsiteModules data={data} />
      <WebsiteWhyChoose />
      <WebsiteCurrentPrograms />
      <TestimonialsSection pageSlug="solution:website-development" variant="website" />
      <WebsiteInsights />
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


function SocialDashboard() {
  return <div className="social-dashboard"><img src="/static/reference-v90/Home-6/h6-dashboard.webp" alt="Communication analytics dashboard preview" /><div className="social-dashboard__bars" aria-hidden="true">{[38,65,25,84,57,72,41,94,67,88,49,98,28,64,52,91,40,77].map((height,i)=><i key={i} style={{height: `${height}%`, '--bar-delay': `${i*.08}s`} as CSSProperties}/>)}</div></div>
}

function SocialHero({ data }: { data: ServicePageData }) {
  return (
    <section className="social-hero" data-rs-hero data-rs-social-hero>
      <video className="social-hero__video" autoPlay muted loop playsInline preload="metadata" aria-hidden="true"><source src="/static/reference-v90/Home-6/h6-video-4.mp4" type="video/mp4" /></video><div className="social-hero__stars" aria-hidden="true" />
      <div className="social-hero__halo social-hero__halo--outer" aria-hidden="true" />
      <div className="social-hero__halo social-hero__halo--inner" aria-hidden="true" />
      <div className="af-container social-hero__inner">
        <div className="social-hero__copy" data-rs-hero-copy>
          <div className="social-hero__portraits" aria-hidden="true">{[1,2,3].map(i=><img key={i} src={`/Home-Public/t1-author-${i}-recolored.webp`} alt=""/>)}</div>
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
            <SocialDashboard />
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
  if (index === 2) return <div className="social-stack-visual social-stack-visual--live-chat"><SocialDashboard /></div>
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
      <div className="social-collab__globe"><img src="/static/reference-v90/Home-6/f6-d-img-5-earth.webp" alt="" /><i /><span /></div>
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
          {[...data.features.slice(0, 4), { title: "Team Collaboration", description: "Keep content, community management and lead communication connected across your team." }].map((feature, index) => (
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
        <div className="social-growth__bowl" aria-hidden="true"><div className="social-growth__bowl-effects"><span />{Array.from({length:30},(_,i)=><i key={i} style={{left:`${8+(i*29)%84}%`,bottom:`${25+(i*17)%65}px`,animationDelay:`${i*.12}s`}}/>)}</div><svg viewBox="0 0 1000 120" preserveAspectRatio="none"><defs><clipPath id="social-bowl-boundary" clipPathUnits="objectBoundingBox"><path d="M0 0H1V.166667Q.5 1.291667 0 .166667Z"/></clipPath></defs><path d="M0 20 Q500 155 1000 20" fill="none" stroke="#00bba0" strokeWidth="2" /></svg></div>
      </div>
    </section>
  )
}

function SocialProgramsSection() {
  const programs = useLiveProgramsData()
  const [billingMode, setBillingMode] = useState<'monthly' | 'yearly'>('monthly')
  const isYearly = billingMode === 'yearly'
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
        <div className="social-billing-tabs" role="group" aria-label="Billing period"><button type="button" aria-pressed={!isYearly} onClick={()=>setBillingMode('monthly')}>Monthly</button><button type="button" aria-pressed={isYearly} onClick={()=>setBillingMode('yearly')}>Yearly<span>Save 20%</span></button></div>


        <div className="social-programs__grid social-programs__grid--reference">
          {primaryPlans.map((plan, index) => {
            const price = typeof plan.price === 'number' ? (isYearly ? Math.round(plan.price * 0.8) : plan.price) : plan.price
            return (
              <article className={`social-program-card social-program-card--reference ${plan.popular ? 'is-popular' : ''}`} data-rs-price-card key={plan.id}>
                <div className="social-program-card__label">{index === 0 ? 'Starter' : 'Pro Plan'}</div>
                <h3>{plan.name}</h3>
                <p>{plan.purpose}</p>
                <div className="social-program-card__price"><strong><small>PKR </small>{typeof price === 'number' ? price.toLocaleString() : price}</strong><span>{isYearly ? '/month (annual)' : '/month'}</span></div>
                <div className="social-program-card__micro">{isYearly ? 'Annual billing rate with 20% savings' : 'Current approved monthly program'}</div>
                <h4>What&apos;s Included</h4>
                <ul>{plan.includes.slice(0, 6).map((item) => <li key={item}><PublicIcon name="check" size={14} />{item}</li>)}</ul>
                <PrimaryButton>Program Inquiry</PrimaryButton>
                <div className="social-program-card__note">Based on the selected program stage.</div>
              </article>
            )
          })}

          <div className="social-programs__stack">
            <article className="social-program-card social-program-card--compact" data-rs-price-card>
              <div className="social-program-card__label">Enterprise Plan</div>
              <h3>{enterprisePlan?.name || "Custom Program"}</h3>
              <p>{enterprisePlan?.purpose || "A tailored system for your business."}</p>
              <SecondaryButton>Request Consultation</SecondaryButton>
              <ul>
                {(enterprisePlan?.includes || []).slice(0, 3).map((item) => <li key={item}><PublicIcon name="check" size={14} />{item}</li>)}
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
  const icons = ['a6-logo-1-10.png', 'a6-logo-10-1.png', 'a6-logo-11.png', 'a6-logo-12-1.png', 'a6-logo-13-1.png', 'a6-logo-14-1.png', 'a6-logo-15-1.png', 'a6-logo-16-1.png', 'a6-logo-17-1.png', 'a6-logo-18-1.png', 'a6-logo-19-1.png', 'a6-logo-20-1.png', 'a6-logo-21-1.png', 'a6-logo-22-1.png', 'a6-logo-23-1.png', 'a6-logo-3-1.png', 'a6-logo-4-1.png', 'a6-logo-5-1.png', 'a6-logo-6-1.png', 'a6-logo-7-1.png', 'a6-logo-8-1.png', 'a6-logo-9-1.png']
  return <section className="social-v90-touchpoints"><div className="af-container"><div className="rs-section-head"><SectionLabel text="Connected touchpoints"/><h2>Connect the Channels That Influence Trust, Discovery and Conversion.</h2><p>Bring your communication tools together in one coordinated growth system.</p></div>
    <div className="social-v90-orbit"><div className="social-v90-orbit__color" />{[0,1].map(ring=><div className={`social-v90-orbit__ring ring-${ring}`} key={ring}>{icons.slice(ring*11,ring*11+11).map((file,i)=><div className="social-v90-orbit__position" key={file} style={{transform:`rotate(${i*360/11}deg)`}}><img src={`/static/reference-v90/Home-6/${file}`} alt="" loading="lazy" style={{'--counter':`${-i*360/11}deg`} as CSSProperties}/></div>)}</div>)}<div className="social-v90-orbit__core"><img src="/static/img/logo-mark.png" alt="Afyra Digital"/></div></div>
    </div><div className="social-v90-divider" aria-hidden="true" /></section>
}

function SocialContact() {
  const [status,setStatus]=useState('')
  const [busy,setBusy]=useState(false)
  return <section className="social-contact" id="social-contact"><div className="af-container social-contact__grid"><div><SectionLabel text="Let’s get in touch"/><h2>Need Help? Our Team Is Ready.</h2><p>Talk to us about your social presence, community and lead communication.</p><a className="social-contact__detail" href={`mailto:${socialBrand.email}`}><PublicIcon name="message" size={30}/><h3>Email Address</h3>{socialBrand.email}</a><a className="social-contact__detail" href={socialBrand.phoneHref}><PublicIcon name="social" size={30}/><h3>Contact Us</h3>{socialBrand.phone}</a></div>
  <form onSubmit={async event=>{event.preventDefault();const form=event.currentTarget;const fields=new FormData(form);setBusy(true);setStatus('');try{const result=await apiSubmitInquiry({name:`${fields.get('first')} ${fields.get('last')}`,business:'Social Media inquiry',contact:`${fields.get('email')} | ${fields.get('phone')}`,message:`${fields.get('subject')}: ${fields.get('message')}`,page_url:window.location.href});if(!result?.ok)throw new Error('Submission failed');setStatus('Thank you. Your inquiry has been sent.');form.reset()}catch{setStatus('Unable to send right now. Please try again or contact us by email.')}finally{setBusy(false)}}}>
  <div className="social-contact__fields">{[['first','First Name','text'],['last','Last Name','text'],['email','Email Address','email'],['phone','Phone Number','tel']].map(([name,label,type])=><label key={name}>{label}<input name={name} type={type} placeholder={label} data-social-placeholder={label} required maxLength={160}/></label>)}</div><label>Choose a subject<input name="subject" placeholder="Subject" data-social-placeholder="Choose a subject" required maxLength={200}/></label><label>Message<textarea name="message" placeholder="Write your message" data-social-placeholder="Write your message here" required rows={5} maxLength={5000}/></label><button type="submit" disabled={busy}>{busy?'Sending…':'Send Message'} <span className="af-diagonal-arrow">↗</span></button><p role="status">{status}</p></form></div></section>
}

function SocialMediaReferencePage({ data }: { data: ServicePageData }) {
  return (
    <div className="social-v90">
      <SocialHero data={data} />
      <CommunicationMetrics data={data} />
      <SocialGrowthSystem data={data} />
      <SocialProgramsSection />
      <SocialConnectedTouchpoints />
      <TestimonialsSection pageSlug="solution:social-media-community-lead-communication" variant="social" />
      <FaqSection variant="social-reference" />
      <SocialContact />
    </div>
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
        <div className="rs-comms-metrics__grid">{points.map(([title, text], index) => <article className="social-metric-clean" data-rs-metric-card key={title}><i className="social-metric-border" aria-hidden="true"/><span>0{index + 1}</span><h3>{title}</h3><p>{text}</p></article>)}</div>
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
          <h1>Grow Your Business<br/><span>With Intelligent <em>Digital</em></span><br/>Marketing Strategy</h1>
          <p className="gs7-hero__lead">Build a clear growth direction around strategy, planning, positioning, audience understanding and measurable business outcomes.</p>
          <p className="gs7-hero__sub">Create a clear growth direction around positioning, audience understanding and measurable business outcomes.</p>
          <div className="gs7-hero__actions"><PrimaryButton>Request Consultation</PrimaryButton><SecondaryButton>View Programs</SecondaryButton></div>
        </div>

        <div className="gs7-hero__stage" data-rs-hero-stage>
          <div className="gs7-hero__ring gs7-hero__ring--one" aria-hidden="true" />
          <div className="gs7-hero__ring gs7-hero__ring--two" aria-hidden="true" />
          <div className="gs7-hero__panel" aria-hidden="true" />
          <figure className="gs7-hero__phone" data-rs-growth-phone>
            <img src="/static/reference-v91/home-7/h7-img-1.webp" alt="Afyra Digital growth strategy dashboard shown on a phone held in hand" />
          </figure>
          <div className="gs7-hero__metric gs7-hero__metric--visibility" data-rs-growth-chip><i><PublicIcon name="growth" size={18} /></i><div><b>Visibility</b><span>Connected reach</span></div></div>
          <div className="gs7-hero__metric gs7-hero__metric--trust" data-rs-growth-chip><i><PublicIcon name="trust" size={18} /></i><div><b>Trust</b><span>Professional positioning</span></div></div>
          <div className="gs7-hero__metric gs7-hero__metric--inquiries" data-rs-growth-chip><i><PublicIcon name="leads" size={18} /></i><div><b>Inquiries</b><span>Qualified path</span></div></div>
          <div className="gs7-hero__metric gs7-hero__metric--response" aria-hidden="true"><i><PublicIcon name="message" size={18} /></i></div>
        </div>
      </div>
      <div className="af-container gs7-hero__trust" data-rs-hero-trust>
        <div className="gs7-v91-marquee" aria-hidden="true"><div>{[0,1].map(i=><span key={i}>GROWTH STRATEGY • DIGITAL MARKETING • </span>)}</div></div><strong>We Don’t Run Ads. We Bring Leads.</strong>
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
              <svg viewBox="0 0 500 270" preserveAspectRatio="none">{['M250 135H170Q155 135 155 120V65Q155 55 140 55H80','M250 135H80','M250 135H170Q155 135 155 150V215H80','M250 135H330Q345 135 345 120V65Q345 55 360 55H420','M250 135H420','M250 135H330Q345 135 345 150V215H420'].map(path=><g key={path}><path className="growth-network-base" d={path}/><path className="growth-network-light" d={path}/></g>)}</svg>
              <div className="gs7-feature-network__core" data-rs-growth-hub-core><img src="/static/img/logo-mark.png" alt=""/></div>
              {['cart','growth','card','globe','send','lock'].map((icon,index)=><div className={`gs7-feature-network__node gs7-feature-network__node--${index+1}`} key={icon}><PublicIcon name={icon} size={20}/></div>)}
            </div>
          </article>

          <article className="gs7-feature-card gs7-feature-card--brief" data-rs-growth-feature-card>
            <div className="gs7-feature-brief" aria-hidden="true"><img className="growth-v91-brief-image" src="/static/reference-v91/home-7/f7-3-1.webp" alt=""/>
              <div data-rs-growth-card-float><small>Strategic brief</small><b>Audience + positioning</b><span>Business goal first</span></div>
              <div data-rs-growth-card-float><small>Content direction</small><b>Trust + clarity</b><span>Connected message</span></div>
              <div data-rs-growth-card-float><small>Channel role</small><b>Visibility + response</b><span>Clear next step</span></div>
            </div>
            <div className="gs7-feature-card__copy"><h3>Strategy & Positioning</h3><p>Define the audience, positioning, message and role each channel should play before execution begins.</p></div>
          </article>

          <article className="gs7-feature-card gs7-feature-card--performance" data-rs-growth-feature-card>
            <div className="gs7-feature-card__copy gs7-feature-card__copy--top"><h3>Channel Performance</h3><p>Bring social presence, paid campaigns, Google Business Profile and lead communication into one measurable view.</p></div>
            <div className="gs7-feature-performance" aria-hidden="true" data-rs-growth-card-float><img className="growth-v91-phone-image" src="/static/reference-v91/home-7/phone-1.webp" alt=""/>
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
              <span className="gs7-text-reveal__word" data-rs-growth-text-word>{word}{' '}</span>
              {index === 1 ? <span className="gs7-text-reveal__badge" data-rs-growth-text-badge><img src="/static/reference-v91/home-7/hi-emoji.svg" alt="Waving hand" /></span> : null}
              {index === 8 ? <span className="gs7-text-reveal__badge gs7-text-reveal__badge--amber" data-rs-growth-text-badge><img src="/static/reference-v91/home-7/hi-emoji-2.svg" alt="Smiling face" /></span> : null}
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
              <div className="gs7-quick__mockup"><img src={`/static/reference-v91/home-7/c7-img-${index+1}.webp`} alt={`${step.title} dashboard illustration`} /></div>
              <div className="gs7-quick__content"><span>{step.number}</span><h3>{step.title}</h3><p>{step.description}</p><div className="gs7-quick__links"><i><PublicIcon name={index === 0 ? 'strategy' : index === 1 ? 'social' : 'analytics'} size={18} /></i><i><PublicIcon name={index === 0 ? 'target' : index === 1 ? 'whatsapp' : 'growth'} size={18} /></i></div></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function GrowthRoadmap07({ data }: { data: ServicePageData }) {
  const wrap = (text: string, limit: number) => {
    const lines: string[] = []
    text.split(/\s+/).forEach(word => {
      if (!lines.length || lines[lines.length - 1].length + word.length + 1 > limit) lines.push(word)
      else lines[lines.length - 1] += ' ' + word
    })
    return lines
  }
  return (
    <section className="gs7-roadmap roadmap-v93 rs-section--light" data-rs-growth-roadmap>
      <div className="af-container">
        <div className="rs-section-head gs7-roadmap__head">
          <SectionLabel text="Growth roadmap" />
          <h2>Follow a Clear Route From Strategy to Long-Term Growth.</h2>
        </div>
        <div className="gs7-roadmap__canvas">
          <svg viewBox="0 -100 1000 1000" preserveAspectRatio="xMidYMin meet" aria-hidden="true">
            <defs>
              <linearGradient id="growth-roadmap-end" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="white" />
                <stop offset=".78" stopColor="white" />
                <stop offset="1" stopColor="black" />
              </linearGradient>
              <mask id="growth-roadmap-fade">
                <rect width="1000" height="850" fill="url(#growth-roadmap-end)" />
              </mask>
              <linearGradient id="growth-roadmap-wash" x1="0" y1="0" x2="0" y2="1">
                <stop stopColor="#00bba0" stopOpacity=".3" />
                <stop offset="1" stopColor="#00bba0" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path className="gs7-roadmap__wash" d="M820 270 C820 370 570 420 390 565 C300 635 240 720 200 800 H820Z" fill="url(#growth-roadmap-wash)" />
            <path className="gs7-roadmap__base" d="M200 100 C480 95 820 130 820 270 C820 370 570 420 390 565 C300 635 240 720 200 800" />
            <path className="gs7-roadmap__fill" mask="url(#growth-roadmap-fade)" data-rs-growth-roadmap-path d="M200 100 C480 95 820 130 820 270 C820 370 570 420 390 565 C300 635 240 720 200 800" />
          </svg>
          <svg className="roadmap-annotations" viewBox="0 -100 1000 1000" preserveAspectRatio="xMidYMin meet" aria-label="Growth roadmap milestones">
            {data.process.slice(0, 4).map((step, index) => {
              const isLeft = index >= 2
              const lineD = "M0 -125V-12"
              return (
                <g
                  className={`roadmap-node ${index === 0 ? 'is-active' : ''}`}
                  data-rs-growth-roadmap-step
                  data-active={index === 0 ? 'true' : 'false'}
                  transform={`translate(${[200, 624, 691, 401][index]} ${[100, 133, 391, 556][index]})`}
                  key={step.title}
                >
                  <circle className="roadmap-dot-glow" r="13" fill="#00bba0" fillOpacity={index === 0 ? 0.3 : 0.12} />
                  <circle className="roadmap-dot" r="5.5" fill="#00bba0" />
                  <g
                    className="roadmap-caption"
                    data-step-index={index}
                    style={{ display: index === 0 ? 'inline' : 'none' }}
                  >
                    <path d={lineD} fill="none" stroke="#00bba0" strokeWidth="2.5" strokeOpacity=".75" strokeLinecap="round" strokeLinejoin="round" />
                    {isLeft ? (
                      <>
                        <text x="-300" y="-132" fill="#00443e" fontSize="22" fontFamily="Arial, sans-serif" fontWeight="600">
                          {step.title}
                        </text>
                        <text x="-24" y="-132" fill="#ff960d" fontSize="18" fontFamily="Arial, sans-serif" fontWeight="600" textAnchor="end">
                          0{index + 1}
                        </text>
                        <text x="0" y="-132" fill="#00bba0" fontSize="18" fontFamily="Arial, sans-serif" fontWeight="600" textAnchor="middle">
                          ✦
                        </text>
                        <text x="-300" y="-98" fill="#61776e" fontSize="15.5" fontFamily="Arial, sans-serif">
                          {wrap(step.description, 36).map((line, i) => (
                            <tspan x="-300" dy={i === 0 ? 0 : 23} key={i}>
                              {line}
                            </tspan>
                          ))}
                        </text>
                      </>
                    ) : (
                      <>
                        <text x="20" y="-132" fill="#00443e" fontSize="22" fontFamily="Arial, sans-serif" fontWeight="600">
                          <tspan fill="#00bba0" fontSize="18">✦ </tspan>{step.title}
                        </text>
                        <text x="300" y="-132" fill="#ff960d" fontSize="18" fontFamily="Arial, sans-serif" fontWeight="600" textAnchor="end">
                          0{index + 1}
                        </text>
                        <text x="20" y="-98" fill="#61776e" fontSize="15.5" fontFamily="Arial, sans-serif">
                          {wrap(step.description, 36).map((line, i) => (
                            <tspan x="20" dy={i === 0 ? 0 : 23} key={i}>
                              {line}
                            </tspan>
                          ))}
                        </text>
                      </>
                    )}
                  </g>
                </g>
              )
            })}
          </svg>
        </div>
      </div>
    </section>
  )
}

function GrowthPrograms07() {
  const programs = useLiveProgramsData()
  const [billingModes, setBillingModes] = useState<Record<string, 'monthly' | 'yearly'>>({})

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
          {programs.plans.map((plan, index) => {
            const billingMode = billingModes[String(plan.id)] || 'monthly'
            const isYearly = billingMode === 'yearly'
            const price = typeof plan.price === 'number' ? (isYearly ? Math.round(plan.price * 0.8) : plan.price) : plan.price
            return (
              <article className={`gs7-price-card gs7-price-card--reference ${plan.popular ? 'is-popular' : ''}`} data-rs-growth-price-card key={plan.id}>
                <div className="gs7-price-card__top"><span>{index === 0 ? 'Started Plan' : index === 1 ? 'Growth Plan' : 'Authority Plan'}</span>{plan.popular ? <b>Most Popular</b> : null}</div>
                <h3>{plan.name}</h3>
                <p>{plan.purpose}</p>
                <div className="gs7-price-card__price"><small>PKR</small>{typeof price === 'number' ? price.toLocaleString() : price}<span>{isYearly ? '/mo (annual)' : '/month'}</span></div>
                <BillingToggle value={billingMode} onChange={value => setBillingModes(previous => ({...previous, [String(plan.id)]: value}))} />
                <PrimaryButton>{index === 2 ? 'Get Started' : 'Program Inquiry'}</PrimaryButton>
                <div className="gs7-price-card__trial"><PublicIcon name="check" size={12} /> Discuss the right program for your business.</div>
                <div className="gs7-price-card__includes">What’s Included</div>
                <ul>{plan.includes.slice(0, 6).map((item) => <li key={item}><PublicIcon name="check" size={14} />{item}</li>)}</ul>
              </article>
            )
          })}
        </div>

        <div className="gs7-programs__support-row" data-rs-growth-price-extra>
          <article className="gs7-programs__support-card gs7-programs__support-card--quote">
            <h3>Strategy built around your business</h3>
            <p>Connect positioning, channels and lead communication through a clear plan for sustainable growth.</p>
            <div className="gs7-programs__support-person"><img src="/static/img/logo-mark.png" alt="" width="32"/><div><b>Afyra Digital</b><span>Strategy • Systems • Growth</span></div></div>
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
            {['M500 350 H390','M500 350 H610','M390 350 L270 230 V140 L160 30','M390 350 L270 230 H175 L35 90','M390 350 L275 350 L200 400 H0','M390 350 L330 290 V200 L300 180','M610 350 L730 230 V140 L840 30','M610 350 L730 230 H825 L965 90','M610 350 L725 350 L800 400 H1000','M610 350 L670 290 V200 L700 180'].map((path,index)=><g key={path}><path className="gs7-integrations__connector-base" data-rs-growth-integration-base d={path}/><path className="gs7-integrations__connector-light" data-rs-growth-integration-line d={path}/></g>)}
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
              <i><img src={`/static/reference-v91/home-7/a7-icon-${index+1}.svg`} alt="" /></i><span>{item.label}</span>
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
  const scopedFaqs = useScopedFaqs(growthFaqs)
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
          {scopedFaqs.map((item, index) => (
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
    <div className="growth-v91">
      <GrowthStrategyHero data={data} />
      <GrowthSystem07 data={data} />
      <GrowthTextReveal07 />
      <GrowthQuickStart07 />
      <GrowthRoadmap07 data={data} />
      <GrowthPrograms07 />
      <TestimonialsSection pageSlug="solution:digital-growth-marketing-strategy" variant="strategy" />
      <GrowthSystemExperience07 />
      <GrowthMobileApp07 />
      <GrowthFaq07 />
      <section className="growth-v91-cta"><h2>Ready? Let’s Talk!</h2><p>Build a clear strategy for your next stage of growth.</p><PrimaryButton>Request Consultation</PrimaryButton></section>
    </div>
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
  const programs = useLiveProgramsData()
  const [open, setOpen] = useState(0)
  const [pricingMode, setPricingMode] = useState<'monthly' | 'yearly'>('monthly')
  const yearlyPricing = pricingMode === 'yearly'
  const scopedFaqs = useScopedFaqs(digitalPresenceFaqs)

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
      <section className="rs-hero dp-hero dp-hero-v92" data-rs-hero>
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
              <svg width="0" height="0" aria-hidden="true" style={{position:'absolute'}}><defs><clipPath id="dp-wing-curve" clipPathUnits="objectBoundingBox"><path d="M0 0 H.36 C.55 .3 .8 .44 1 .64 V1 C.7 .72 .27 .6 0 0Z"/></clipPath></defs></svg>
              <div className="dp-video-wing dp-video-wing--left" aria-hidden="true"><video autoPlay muted loop playsInline preload="metadata" src="/static/digital-hero-v92/h3-video-1-afyra.mp4" /></div>
              <div className="dp-video-wing dp-video-wing--right" aria-hidden="true"><video autoPlay muted loop playsInline preload="metadata" src="/static/digital-hero-v92/h3-video-1-afyra.mp4" /></div>
              <svg className="dp-hero-streams" viewBox="0 0 1200 420" preserveAspectRatio="none" aria-hidden="true">
                {['M0 18 C160 215 340 170 600 350','M1200 18 C1040 215 860 170 600 350'].map(d=><g key={d}><path d={d} stroke="#00bba022"/><path className="dp-hero-stream" d={d} stroke="#00bba0"/></g>)}
              </svg>
              <div className="dp-v92-apps" aria-hidden="true">{[1,2,3,4,5,6,7,8,9,10,11,12].map((icon,i)=><img className="dp-v92-app" key={icon} src={`/static/digital-reference-v85/a3-icon-${icon}.svg`} alt="" style={{left:`${44+(i%3)*6}%`,top:`65%`}}/>)}</div>
              <figure className="dp-hero__core">
                <img src="/static/img/logo-mark.png" alt="Afyra Digital mark" loading="eager" decoding="async" />
              </figure>
            </div>
            <div className="dp-hero__side dp-hero__side--left"><span>More Visibility.</span><span>More Patients.</span><span>A Stronger Practice.</span></div>
            <div className="dp-hero__side dp-hero__side--right"><span>Built for</span><span>Healthcare</span><span>Brands</span></div>
          </div>

          <div className="dp-trust-reveal" data-rs-hero-trust data-rs-hero-line>
            <div className="dp-trust-reveal__track dp-trust-reveal__track--full dp-trust-reveal__track--left">
              <div className="dp-trust-reveal__marquee dp-trust-reveal__marquee--left" data-rs-hero-marquee>
                <span>Google Business</span><span>Google</span><span>Meta</span><span>Instagram</span><span>LinkedIn</span><span>YouTube</span>
                <span>Google Business</span><span>Google</span><span>Meta</span><span>Instagram</span><span>LinkedIn</span><span>YouTube</span>
              </div>
            </div>
            <div className="dp-trust-reveal__track dp-trust-reveal__track--full dp-trust-reveal__track--right">
              <div className="dp-trust-reveal__marquee dp-trust-reveal__marquee--right" data-rs-hero-marquee>
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
            {digitalPresenceFeatureCards.slice(0, 3).map((feature, index) => (
              <article className="rs-feature dp-feature is-large" data-rs-feature key={feature.title}>
                <div className="dp-feature__badge"><PublicIcon name={feature.icon} size={18} /></div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
                <DigitalPresenceFeatureVisual variant={'variant' in feature ? feature.variant : undefined} />
                <span className="dp-feature__count">{String(index + 1).padStart(2, '0')}</span>
              </article>
            ))}
            <div className="dp-feature-suite" data-rs-feature-suite>
              <div className="dp-feature-suite__rail" aria-hidden="true" />
              <div className="dp-feature-suite__grid dp-exact-suite"><svg className="dp-exact-outline" viewBox="0 0 1200 238" preserveAspectRatio="none" aria-hidden="true"><path d="M0 1 H280 Q300 1 300 21 V238 M300 21 Q300 1 320 1 H580 Q600 1 600 21 V238 M600 21 Q600 1 620 1 H880 Q900 1 900 21 V238 M900 21 Q900 1 920 1 H1200"/></svg>
                {digitalPresenceFeatureCards.slice(3).map((feature, index) => (
                  <article className={`rs-feature dp-feature is-small dp-feature--suite-${index + 1}`} data-rs-feature key={feature.title}>
                    <div className="dp-feature__badge dp-badge" data-af-badge>
                      <span className="dp-badge-glow" aria-hidden="true" />
                      <PublicIcon name={feature.icon} size={20} />
                    </div>
                    <h3>{feature.title}</h3>
                    <p>{feature.description}</p>
                    <div className="dp-feature__line" aria-hidden="true" />
                  </article>
                ))}
              </div>
              <div className="dp-feature-suite__action" data-rs-feature-action>
                <div className="dp-feature-suite__stem" aria-hidden="true" />
                <div className="dp-feature-suite__baseline">
                  <span className="dp-feature-suite__line dp-feature-suite__line--left" aria-hidden="true" />
                  <span className="dp-feature-suite__dot dp-feature-suite__dot--left" aria-hidden="true" />
                  <button type="button" className="dp-feature-suite__btn">View All Features</button>
                  <span className="dp-feature-suite__dot dp-feature-suite__dot--right" aria-hidden="true" />
                  <span className="dp-feature-suite__line dp-feature-suite__line--right" aria-hidden="true" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="dp-integration-scroll-rail">
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
            {Array.from({ length: 12 }, (_, index) => (
              <div className={`rs-integration dp-orbit__item dp-orbit__item--${index + 1}`} data-rs-integration-item key={index} aria-hidden="true">
                <i><img src={`/static/digital-reference-v85/a3-icon-${index + 1}.svg`} alt="" /></i>
              </div>
            ))}
          </div>
        </div>
      </section>
      </div>

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
          <div className="dp-usecases__grid dp-exact-journey"><svg className="dp-exact-outline" viewBox="0 0 1200 340" preserveAspectRatio="none" aria-hidden="true"><path d="M0 1 H266 Q300 1 300 35 V305 Q300 339 334 339 H566 Q600 339 600 305 V35 Q600 1 634 1 H866 Q900 1 900 35 V305 Q900 339 934 339 H1200"/></svg>
            {digitalPresenceJourneyCards.map((card, index) => (
              <article className={`dp-usecase dp-usecase--${index + 1}`} data-rs-proof-card key={card.title}>
                <div className="dp-usecase__badge dp-badge" data-af-badge>
                  <span className="dp-badge-glow" aria-hidden="true" />
                  <PublicIcon name={card.icon} size={22} />
                </div>
                <h3>{card.title}</h3>
                <p>{card.description}</p>
                <button type="button" className="dp-usecase__btn">{card.cta}</button>
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
            {programs.plans.map((plan) => {
              const price = yearlyPricing ? Math.round(plan.price * 0.8) : plan.price
              return (
                <article className={`rs-price-card dp-program ${plan.popular ? 'is-popular' : ''}`} data-rs-price-card key={plan.id}>
                  {plan.popular ? <span className="dp-program__popular">Most Popular</span> : null}
                  <div className="dp-program__icon"><PublicIcon name={plan.icon} size={20} /></div>
                  <h3>{plan.name}</h3>
                  <p>{plan.purpose}</p>
                  <div className="dp-program__price"><small>PKR</small>{price.toLocaleString()}<span>{yearlyPricing ? '/mo (annual)' : '/Per Month'}</span></div>
                  <Link to="/request-consultation" className="dp-program__cta">Get Started <PublicIcon name="arrowRight" size={14} /></Link>
                  <div className="dp-program__includes">What’s Included:</div>
                  <ul>
                    {plan.includes.slice(0, 5).map((item) => <li key={item}><PublicIcon name="check" size={14} />{item}</li>)}
                  </ul>
                </article>
              )
            })}
          </div>
          <div className="dp-programs__terms">
            <span>{yearlyPricing ? 'Annual billing options applied with 20% savings.' : programs.terms[0]}</span>
            <BillingToggle value={pricingMode} onChange={setPricingMode} />
          </div>
        </div>
      </section>

      <TestimonialsSection pageSlug="solution:digital-presence-advanced-systems" variant="digital" />

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
            {scopedFaqs.map((item, index) => (
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
            <div className="dp-final__planet" aria-hidden="true"><div className="dp-globe__sphere" /></div>
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
