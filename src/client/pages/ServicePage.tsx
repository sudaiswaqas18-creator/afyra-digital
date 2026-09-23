import { useEffect, useState, type ReactNode } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ScrollTop from '../components/ScrollTop'
import CardVisual from '../components/CardVisual'
import CardDetailLink from '../components/CardDetailLink'
import PublicIcon from '../components/PublicIcon'
import SemanticCardIcon from '../components/SemanticCardIcon'
import SectionLabel from '../components/SectionLabel'
import { serviceBySlug, type ServicePageData } from '../data/servicePages'
import { cardKey, serviceVariantItems } from '../data/cardDetails'
import { usePageSeo } from '../lib/usePageSeo'
import { useServiceAnimations } from '../lib/useServiceAnimations'
import { useReferenceSolutionAnimations } from '../lib/useReferenceSolutionAnimations'
import ReferenceSolutionExperience from '../components/ReferenceSolutionExperience'
import TestimonialsSection from '../components/TestimonialsSection'
import { useSaasKingEffects } from '../lib/useSaasKingEffects'
import { apiGetSolutionBySlug } from '../lib/api'
import { useLiveProgramsData } from '../lib/useLiveProgramsData'
import { useLiveSolutionsNav } from '../lib/useLiveSolutionsNav'
import { useScopedFaqs } from '../lib/useScopedFaqs'

const supportedFaqs = [
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

const brandHeroWords = [
  { label: 'Trust', hint: 'Professional communication that makes the brand feel credible.' },
  { label: 'Visibility', hint: 'Sharper positioning so the right audience notices you earlier.' },
  { label: 'Authority', hint: 'Educational content that strengthens confidence and recall.' },
  { label: 'Consistency', hint: 'A connected workflow for content, design and communication.' }
]

const brandSolutionCards = [
  { title: 'Weekly Communication Framework', category: 'Brand Foundation', description: 'Create a consistent communication rhythm that strengthens professional presence across touchpoints.', featured: true },
  { title: 'Educational Content Direction', category: 'Education Content', description: 'Turn expertise into clear educational messaging that improves audience understanding and trust.', featured: false },
  { title: 'Short-Form Video Concepts', category: 'Video & Creative', description: 'Use short-form video ideas as part of the communication system instead of isolated creative output.', featured: true },
  { title: 'Social Presence Consistency', category: 'Social Presence', description: 'Keep social content aligned with positioning, authority and the wider digital journey.', featured: false },
  { title: 'Authority Building Assets', category: 'Trust & Authority', description: 'Support visibility with branded assets that make the business look reliable and established.', featured: true },
  { title: 'Lead-Focused Messaging Blocks', category: 'Brand Foundation', description: 'Clarify the next step so viewers understand what to do after they engage with the content.', featured: false }
]

const brandReferenceStripItems = ['Positioning', 'Education Content', 'Creative Direction', 'Trust Signals', 'Authority Building']

const brandDisplayCards = [
  { title: 'Professional Brand Identity', description: 'Create a credible brand and digital presence with consistent communication across touchpoints.', type: 'orbit' },
  { title: 'Strategic Content Direction', description: 'Use content direction that supports visibility, trust, education and long-term brand authority.', type: 'hub' },
  { title: 'Educational Communication', description: 'Communicate clearly in business language that helps audiences understand value without unnecessary jargon.', type: 'message' },
  { title: 'Short-Form Video', description: 'Use short-form video as a communication component inside the wider growth system.', type: 'timeline' },
  { title: 'Creative Assets', description: 'Support the brand with creative assets that strengthen consistency and professional positioning.', type: 'sheet' }
]

const brandProcessSteps = [
  {
    title: 'Choose Service',
    short: 'Choose Service',
    icon: 'spark',
    description: 'Start with the communication outcome that matters most—positioning, visibility, education or trust.',
    detail: 'We first frame the brand objective so every later asset supports one connected growth direction.'
  },
  {
    title: 'Add Positioning & Guidelines',
    short: 'Input & Guidelines',
    icon: 'palette',
    description: 'Define tone, positioning, audience understanding and the communication rules that protect consistency.',
    detail: 'This step keeps the brand system aligned before content, creative direction and short-form media are produced.'
  },
  {
    title: 'Generate Assets',
    short: 'Generate Assets',
    icon: 'content',
    description: 'Create the brand communication assets—content direction, educational messaging, visuals and video concepts.',
    detail: 'Every draft is shaped to strengthen trust and authority instead of functioning like random isolated posts.'
  },
  {
    title: 'Refine & Publish',
    short: 'Refine & Publish',
    icon: 'growth',
    description: 'Refine execution, publish consistently and connect the communication system back to business outcomes.',
    detail: 'The system stays focused on visibility, trust, inquiries and long-term authority growth.'
  }
]

const brandFaqs = [
  ...supportedFaqs,
  {
    q: 'Can Afyra manage both strategic content and visual creative work together?',
    a: 'Yes. The Brand & Creative Communication service combines strategic content direction, educational communication, short-form video and creative assets inside one coordinated system.'
  },
  {
    q: 'Is short-form video treated as a separate service or part of the system?',
    a: 'It is treated as one communication component inside the wider growth system. The goal is stronger positioning, trust and authority—not standalone video output without context.'
  }
]

function PageButton({ to, children, secondary = false }: { to: string; children: ReactNode; secondary?: boolean }) {
  const className = `sv-btn ${secondary ? 'sv-btn--ghost' : 'sv-btn--primary'}`
  const content = <><span>{children}</span><PublicIcon name="arrowRight" size={17} /></>
  return to.startsWith('/#') ? <a className={className} href={to}>{content}</a> : <Link className={className} to={to}>{content}</Link>
}

function LogoCloud({ items }: { items: string[] }) {
  return (
    <div className="sv-logo-cloud" data-sv-stagger>
      {items.map((item) => (
        <div className="sv-logo-pill" data-sv-item key={item}>
          <span className="sv-logo-dot" />
          {item}
        </div>
      ))}
    </div>
  )
}

function TrustStrip() {
  const audiences = ['Doctors', 'Clinics', 'Hospitals', 'Aesthetic Centers', 'Cosmetic Centers', 'Healthcare Marketing']
  return (
    <section className="sv-trust-strip" aria-label="Afyra Digital healthcare specialization">
      <div className="af-container">
        <p data-sv-reveal="up">Current specialization and audience focus</p>
        <div className="sv-trust-strip__track" data-sv-stagger>
          {audiences.map((audience) => <span data-sv-item key={audience}>{audience}</span>)}
        </div>
      </div>
    </section>
  )
}

function BrandReferenceStrip() {
  return (
    <section className="sv-brand-reference-strip" aria-label="Brand communication reference strip">
      <div className="af-container">
        <p className="sv-brand-reference-strip__title">Trusted communication layers that move together inside one system</p>
        <div className="sv-brand-reference-strip__rail" data-brand-strip>
          <span className="sv-brand-reference-strip__point sv-brand-reference-strip__point--tl" aria-hidden="true" />
          <span className="sv-brand-reference-strip__point sv-brand-reference-strip__point--tr" aria-hidden="true" />
          <span className="sv-brand-reference-strip__point sv-brand-reference-strip__point--bl" aria-hidden="true" />
          <span className="sv-brand-reference-strip__point sv-brand-reference-strip__point--br" aria-hidden="true" />
          <div className="sv-brand-reference-strip__window"><div className="sv-brand-reference-strip__track">
            {[0, 1].map(group => <div className="sv-brand-reference-strip__group" key={group} aria-hidden={group === 1 ? true : undefined}>
              {brandReferenceStripItems.map((item, index) => (
                <span className="sv-brand-reference-strip__item" key={item}>
                  <PublicIcon name={['palette', 'content', 'spark', 'video', 'growth'][index]} size={32} />
                  <b>{item}</b>
                </span>
              ))}
            </div>)}
          </div></div>
        </div>
      </div>
    </section>
  )
}

function BrandHeroTypeBox() {
  return (
    <span className="sv-hero-typebox" aria-live="polite" data-brand-typebox>
      <span className="sv-hero-typebox__panel" data-brand-typebox-panel>
        <span className="sv-hero-typebox__words" data-brand-typebox-words>
          {brandHeroWords.map((item, index) => (
            <span className={`sv-hero-typebox__word ${index === 0 ? 'is-active' : ''}`} data-brand-typebox-word data-hint={item.hint} key={item.label}>{item.label}</span>
          ))}
        </span>
      </span>
      <i className="sv-typebox-corner sv-typebox-corner--tl" aria-hidden="true" /><i className="sv-typebox-corner sv-typebox-corner--tr" aria-hidden="true" />
      <i className="sv-typebox-corner sv-typebox-corner--bl" aria-hidden="true" /><i className="sv-typebox-corner sv-typebox-corner--br" aria-hidden="true" />
      <svg className="sv-hero-typebox__pen" viewBox="0 0 58 68" fill="none" aria-hidden="true">
        <path d="M24 51 42 9l7 3-17 43-8 5zM41 12l10 4-5 12M43 9l2-5 5 2-2 6M26 49l7 3M24 60c-9-17-10 11-18 2-5-5 3-12 6-6" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  )
}

function BrandHeroFlipCard() {
  return (
    <div className="sv-copy-card-stack sv-copy-card-stack--reference" data-brand-flip-stack>
      <div className="sv-copy-flip" data-brand-flip>
        <figure className="sv-copy-flip__face sv-copy-flip__face--front">
          <img src="/static/brand-reference-v78/h2-img-2.webp" alt="Afyra Digital brand communication dashboard reference visual" />
        </figure>
        <figure className="sv-copy-flip__face sv-copy-flip__face--back">
          <img src="/static/brand-reference-v78/h2-img-1.webp" alt="Afyra Digital communication workflow dashboard reference visual" />
        </figure>
      </div>
      <span className="sv-copy-card-stack__shadow" aria-hidden="true" />
    </div>
  )
}

function HeroArt({ layout, data }: { layout: ServicePageData['layout']; data: ServicePageData }) {
  if (layout === '02') {
    return (
      <div className="sv-hero__art sv-copy-art" aria-label="Brand communication system illustration">
        <BrandHeroFlipCard />
      </div>
    )
  }
  if (layout === '03') {
    return (
      <div className="sv-hero__art sv-orbit" aria-label="Connected digital presence illustration">
        <div className="sv-orbit__ring sv-orbit__ring--one"><span className="sv-orbit__node">Visibility</span><span className="sv-orbit__node sv-orbit__node--secondary">Local Discovery</span></div>
        <div className="sv-orbit__ring sv-orbit__ring--two"><span className="sv-orbit__node">Trust</span><span className="sv-orbit__node sv-orbit__node--secondary">Lead Communication</span></div>
        <div className="sv-orbit__ring sv-orbit__ring--three"><span className="sv-orbit__node">Conversion</span></div>
        <div className="sv-orbit__core"><img src="/static/img/logo-mark.png" alt="Afyra Digital logo" /><small>Connected</small></div>
        <div className="sv-orbit__caption">Visibility → Trust → Communication → Conversion</div>
      </div>
    )
  }
  if (layout === '04') {
    return (
      <div className="sv-hero__art sv-chat" aria-label="Patient inquiry and lead communication illustration">
        <div className="sv-chat__top"><span className="sv-status" /> Patient inquiry flow <em>Live</em></div>
        <div className="sv-chat__bubble sv-chat__bubble--in"><small>New inquiry</small>I found the clinic online. How can I inquire?<span className="sv-chat__typing" aria-hidden="true"><i/><i/><i/></span></div>
        <div className="sv-chat__bubble sv-chat__bubble--out"><small>Guided response</small>Clear communication should guide the next step toward a real conversation.<span className="sv-chat__sent">Delivered ✓</span></div>
        <div className="sv-chat__activity"><span><b>01</b> Discovered</span><span><b>02</b> Qualified</span><span><b>03</b> Appointment path</span></div>
        <div className="sv-chat__flow"><span>Visibility</span><i /> <span>Inquiry</span><i /> <span>Appointment Opportunity</span></div>
      </div>
    )
  }
  if (layout === '05') {
    return (
      <div className="sv-hero__art sv-browser" aria-label="Strategic website experience illustration">
        <div className="sv-browser__chrome"><i/><i/><i/><span>afyradigital.com</span></div>
        <div className="sv-browser__canvas">
          <div className="sv-browser__layer sv-browser__layer--hero"><small>Professional positioning</small><strong>Credibility. Trust. Clear Next Steps.</strong><span className="sv-browser__cta">Request Consultation</span></div>
          <div className="sv-browser__grid"><div className="sv-browser__layer"><small>Trust</small><b /></div><div className="sv-browser__layer"><small>Visibility</small><b /></div><div className="sv-browser__layer"><small>Inquiry Path</small><b /></div></div>
        </div>
      </div>
    )
  }
  if (layout === '06') {
    return (
      <div className="sv-hero__art sv-support" aria-label="Social media community and lead communication dashboard illustration">
        <div className="sv-support__rail"><span className="sv-channel">FB<i /></span><span className="sv-channel">IG<i /></span><span className="sv-channel">WA<i /></span><span className="sv-channel">YT<i /></span></div>
        <div className="sv-support__main"><small>Unified communication</small><h3>Presence → Community → Inquiry</h3><div className="sv-support__pulse"><span>Active conversations</span><b>Managed</b></div><div className="sv-ticket"><b>Lead communication</b><span>Keep the path clear and professional.</span><em>Response path</em></div><div className="sv-ticket"><b>Community management</b><span>Support trust through consistent interaction.</span><em>Trust signal</em></div></div>
      </div>
    )
  }
  return (
    <div className="sv-hero__art sv-growth-map" aria-label="Digital growth strategy illustration">
      <div className="sv-growth-route" aria-hidden="true">
        <i className="sv-growth-route__segment sv-growth-route__segment--1" />
        <i className="sv-growth-route__segment sv-growth-route__segment--2" />
        <i className="sv-growth-route__segment sv-growth-route__segment--3" />
        <i className="sv-growth-route__segment sv-growth-route__segment--4" />
        <b className="sv-growth-route__node sv-growth-route__node--1" />
        <b className="sv-growth-route__node sv-growth-route__node--2" />
        <b className="sv-growth-route__node sv-growth-route__node--3" />
        <b className="sv-growth-route__node sv-growth-route__node--4" />
      </div>
      <span className="sv-growth-label sv-growth-label--1"><small>01</small> Strategy</span><span className="sv-growth-label sv-growth-label--2"><small>02</small> Systems</span><span className="sv-growth-label sv-growth-label--3"><small>03</small> Outcomes</span><span className="sv-growth-label sv-growth-label--4"><small>04</small> Growth</span>
      <div className="sv-growth-status"><span>Audience</span><span>Positioning</span><span>Measurement</span></div>
    </div>
  )
}

function ServiceHero({ data }: { data: ServicePageData }) {
  const isBrandLayout = data.layout === '02'
  if (isBrandLayout) {
    return (
      <section className="sv-hero af-section sv-hero--brand-reference" id="service-top">
        <div className="sv-hero__glow sv-hero__glow--a" data-sv-parallax="70" />
        <div className="sv-hero__glow sv-hero__glow--b" data-sv-parallax="-60" />
        <div className="af-container sv-brand-hero-v78">
          <div className="sv-hero__copy">
            <div className="sv-rating-pill sv-rating-pill--brand" data-sv-reveal="up">
              <div className="sv-rating-pill__avatars" aria-hidden="true"><span /><span /><span /><span /><span /></div>
              <div className="sv-rating-pill__copy"><strong>Brand Communication</strong><span>Strategy • Content • Creative</span></div>
            </div>
            <h1 className="sv-display sv-display--brand">
              <span className="sv-display__line"><span className="sv-hero-sparkles" aria-hidden="true">✦<small>✦</small></span>Brand &amp; Creative Communication</span>
              <span className="sv-display__line sv-display__line--dynamic">For Stronger <BrandHeroTypeBox /></span>
            </h1>
            <p className="sv-lead" data-sv-reveal="up">{data.description}</p>
            <div className="sv-actions" data-sv-reveal="up"><PageButton to="/request-consultation">Request Consultation</PageButton><PageButton to="/solutions#programs" secondary>View Programs</PageButton></div>
            <p className="sv-positioning" data-sv-reveal="up">We Don’t Run Ads. We Bring Leads.</p>
          </div>
          <HeroArt layout={data.layout} data={data} />
        </div>
      </section>
    )
  }
  return (
    <section className="sv-hero af-section" id="service-top">
      <div className="sv-hero__glow sv-hero__glow--a" data-sv-parallax="70" />
      <div className="sv-hero__glow sv-hero__glow--b" data-sv-parallax="-60" />
      <div className="af-container sv-hero__grid">
        <div className="sv-hero__copy">
          <div className="sv-kicker" data-sv-reveal="up"><span>{data.eyebrow}</span></div>
          <h1 className="sv-display sv-split">{data.title}</h1>
          <p className="sv-lead" data-sv-reveal="up">{data.description}</p>
          <div className="sv-actions" data-sv-reveal="up"><PageButton to="/request-consultation">Request Consultation</PageButton><PageButton to="/solutions#programs" secondary>View Programs</PageButton></div>
          <p className="sv-positioning" data-sv-reveal="up">We Don’t Run Ads. We Bring Leads.</p>
        </div>
        <HeroArt layout={data.layout} data={data} />
      </div>
    </section>
  )
}

function ServiceEditorialVisual({ data }: { data: ServicePageData }) {
  return (
    <section className="sv-service-editorial">
      <div className="af-container sv-service-editorial__grid">
        <div data-sv-reveal="left">
          <SectionLabel text="Service detail" />
          <h2 className="sv-title">A Clearer View of the Complete {data.name} System.</h2>
          <p>{data.intro}</p>
          <p>{data.description}</p>
        </div>
        <div data-sv-reveal="right">
          <CardVisual assetKey={cardKey('solutions','service',data.slug,'detail')} label={`${data.name} service detail`} />
        </div>
      </div>
    </section>
  )
}

function FeatureSection({ data }: { data: ServicePageData }) {
  return (
    <section className={`sv-features sv-features--${data.layout}`}>
      <div className="af-container">
        <div className="sv-section-head"><SectionLabel text="Strategic solution" /><h2 className="sv-title sv-split">Built Around Business Outcomes, Not Isolated Tasks.</h2><p data-sv-reveal="up">{data.intro}</p></div>
        <div className="sv-feature-grid" data-sv-stagger>
          {data.features.map((f, i) => (
            <article className={`sv-feature-card sv-feature-card--${(i % 6) + 1}`} data-sv-item key={f.title}>
              <div className="sv-feature-card__num">{String(i + 1).padStart(2, '0')}</div>
              <CardVisual assetKey={cardKey(data.slug,'feature',f.title)} label={`${data.name}: ${f.title}`} compact />
              <div className="sv-feature-card__icon"><SemanticCardIcon assetKey={cardKey(data.slug, 'feature', f.title)} size={26} /></div>
              <h3>{f.title}</h3><p>{f.description}</p><CardDetailLink slug={cardKey(data.slug,'feature',f.title)} />
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function ConnectedSection({ data }: { data: ServicePageData }) {
  return (
    <section className={`sv-connected sv-connected--${data.layout}`}>
      <div className="af-container sv-connected__grid">
        <div className="sv-connected__copy" data-sv-reveal="left"><SectionLabel text="Connected system" /><h2 className="sv-title">One Growth System. Multiple Touchpoints.</h2><p>Afyra’s broader approach connects the components that influence visibility, trust, inquiry opportunities, authority and conversion.</p><PageButton to="/solutions/digital-growth-marketing-strategy">Explore Growth Strategy</PageButton></div>
        <div className="sv-connected__visual" data-sv-reveal="right"><LogoCloud items={data.touchpoints} /></div>
      </div>
    </section>
  )
}

function ProcessSection({ data }: { data: ServicePageData }) {
  return (
    <section className={`sv-process sv-process--${data.layout}`}>
      <div className="af-container">
        <div className="sv-section-head"><SectionLabel text="How the system is framed" /><h2 className="sv-title sv-split">Strategy → Systems → Outcomes → Growth</h2></div>
        <div className="sv-process-track" data-sv-stagger>
          {data.process.map((p, i) => <article data-sv-item key={p.title}><div className="sv-process-num">{String(i + 1).padStart(2,'0')}</div><CardVisual assetKey={cardKey(data.slug,'process',p.title)} label={`${data.name}: ${p.title}`} compact /><h3>{p.title}</h3><p>{p.description}</p><CardDetailLink slug={cardKey(data.slug,'process',p.title)} /></article>)}
        </div>
      </div>
    </section>
  )
}

function ProgramsSection({ data }: { data: ServicePageData }) {
  const livePrograms = useLiveProgramsData()
  const isWebsite = data.slug === 'website-development'
  return (
    <section className={`sv-pricing sv-pricing--${data.layout}`} id="service-programs">
      <div className="af-container">
        <div className="sv-section-head"><SectionLabel text="Programs & pricing" /><h2 className="sv-title sv-split">{isWebsite ? 'Website Development Pricing — Pending Founder Input' : 'Current Afyra Marketing Programs'}</h2><p data-sv-reveal="up">{isWebsite ? 'The Master Knowledge Base does not specify standalone Website Development pricing or scope. The cards below show Afyra’s current marketing programs for context only; they are not presented as website-development packages.' : 'Current approved programs and pricing from the Afyra Digital Master Knowledge Base.'}</p></div>
        <div className="sv-price-grid" data-sv-stagger>
          {livePrograms.plans.map((plan) => (
            <article className={`sv-price-card ${plan.popular ? 'is-popular' : ''}`} data-sv-item key={plan.id}>
              {plan.popular ? <div className="sv-popular">Most Popular</div> : null}
              <CardVisual assetKey={cardKey(data.slug,'program',String(plan.id))} label={`${data.name}: ${plan.name}`} compact />
              <h3>{plan.name}</h3><p>{plan.purpose}</p><div className="sv-price"><span>PKR</span>{plan.price.toLocaleString()}<small>/month</small></div>
              <ul>{plan.includes.slice(0, 6).map((item) => <li key={item}><PublicIcon name="check" size={16} /><span>{item}</span></li>)}</ul>
              <PageButton to="/request-consultation">Program Inquiry</PageButton><CardDetailLink slug={cardKey(data.slug,'program',String(plan.id))} label="Full program details" />
            </article>
          ))}
        </div>
        <p className="sv-terms" data-sv-reveal="up">{livePrograms.terms.join(' ')}</p>
      </div>
    </section>
  )
}

function ProofSection({ data }: { data: ServicePageData }) {
  return (
    <section className={`sv-proof sv-proof--${data.layout}`}>
      <div className="af-container sv-proof__grid">
        <div data-sv-reveal="left"><SectionLabel text="Trust & proof" /><h2 className="sv-title">Credibility Over Hype.</h2><p>{data.proofNote}</p></div>
        <div className="sv-proof-card" data-sv-reveal="right"><CardVisual assetKey={cardKey(data.slug,'proof','verified-trust')} label={`${data.name}: verified trust and proof`} compact /><img src="/static/img/logo-mark.png" alt="Afyra Digital logo"/><strong>Only verified proof is presented as fact.</strong><span>Client work • Case studies • Testimonials • Real results • Process • Expertise</span><em>PENDING FOUNDER INPUT</em><CardDetailLink slug={cardKey(data.slug,'proof','verified-trust')} /></div>
      </div>
    </section>
  )
}

function FaqSection() {
  const scopedFaqs = useScopedFaqs(supportedFaqs)
  return (
    <section className="sv-faq">
      <div className="af-container sv-faq__grid"><div className="sv-faq__head" data-sv-reveal="left"><SectionLabel text="Popular questions" /><h2 className="sv-title">Clear Answers, Without Overpromising.</h2></div><div className="sv-faq__items" data-sv-stagger>{scopedFaqs.map((faq) => <details data-sv-item key={faq.q}><summary>{faq.q}<span>+</span></summary><p>{faq.a}</p></details>)}</div></div>
    </section>
  )
}

function VariantShowcase({ data }: { data: ServicePageData }) {
  const variant = serviceVariantItems[data.layout]
  return (
    <section className={`sv-showcase sv-showcase--${data.layout}`}>
      <div className="af-container">
        <div className="sv-section-head"><SectionLabel text={variant.kicker} /><h2 className="sv-title sv-split">{variant.title}</h2></div>
        <div className="sv-showcase__grid" data-sv-stagger>
          {variant.items.map((item, i) => (
            <article data-sv-item key={item.title}><span>{String(i + 1).padStart(2, '0')}</span><CardVisual assetKey={cardKey(data.slug,'showcase',item.title)} label={`${data.name}: ${item.title}`} compact /><h3>{item.title}</h3><p>{item.description}</p><CardDetailLink slug={cardKey(data.slug,'showcase',item.title)} /></article>
          ))}
        </div>
      </div>
    </section>
  )
}

function InsightsPlaceholder({ data }: { data: ServicePageData }) {
  return (
    <section className="sv-insights" aria-labelledby="sv-insights-title">
      <div className="af-container">
        <div className="sv-section-head">
          <SectionLabel text="Insights & updates" />
          <h2 className="sv-title sv-split" id="sv-insights-title">Approved Website Insights — Pending Founder Input</h2>
          <p data-sv-reveal="up">The reference Home 05 layout includes an articles section. The Master Knowledge Base does not provide approved article titles or article copy, so this section preserves the layout slot without inventing content.</p>
        </div>
        <div className="sv-insights__grid" data-sv-stagger>
          {[1, 2, 3].map((item) => (
            <article className="sv-insight-card" data-sv-item key={item}>
              <span>CONTENT SLOT {String(item).padStart(2, '0')}</span>
              <CardVisual assetKey={cardKey('website-development','insight-placeholder',String(item))} label={`Website development insight placeholder ${item}`} compact />
              <h3>PENDING FOUNDER INPUT</h3>
              <p>Approved website-development insight or article content has not been supplied in the source document.</p><CardDetailLink slug={cardKey('website-development','insight-placeholder',String(item))} />
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function BrandFeatureCardVisual({ type }: { type: string }) {
  if (type === 'orbit') {
    return (
      <div className="sv-brand-display-visual sv-brand-display-visual--orbit" aria-hidden="true">
        <svg className="brand-orbit-arcs" viewBox="0 0 500 260" aria-hidden="true">
          <defs><radialGradient id="brand-orbit-wash"><stop stopColor="#00bba0" stopOpacity=".26"/><stop offset="1" stopColor="#fff" stopOpacity=".6"/></radialGradient></defs>
          <circle cx="250" cy="275" r="225" fill="url(#brand-orbit-wash)"/>
          {[225,170,110].map((r,i)=><g key={r}><circle cx="250" cy="275" r={r} fill="none" stroke="#00bba044" strokeDasharray="2 4"/><circle className="brand-orbit-tracer" cx="250" cy="275" r={r} fill="none" stroke="#00bba0" strokeWidth="2.5" strokeLinecap="round" strokeDasharray={`${22+i*7} ${2*Math.PI*r-22-i*7}`}/></g>)}
        </svg>
        <i className="sv-orbit-core"><img src="/static/img/logo-mark.png" alt="" /></i>
        <b className="sv-orbit-node sv-orbit-node--1"><PublicIcon name="palette" size={18} /></b>
        <b className="sv-orbit-node sv-orbit-node--2"><PublicIcon name="content" size={18} /></b>
        <b className="sv-orbit-node sv-orbit-node--3"><PublicIcon name="video" size={18} /></b>
        <b className="sv-orbit-node sv-orbit-node--4"><PublicIcon name="spark" size={18} /></b>
        <b className="sv-orbit-node sv-orbit-node--5"><PublicIcon name="growth" size={18} /></b>
        <em>Brand Foundation</em>
      </div>
    )
  }
  if (type === 'hub') {
    return (
      <div className="sv-brand-display-visual sv-brand-display-visual--hub" aria-hidden="true">
        <svg className="sv-brand-hub-lines" viewBox="0 0 640 220" preserveAspectRatio="none">
          <path d="M320 110H118L76 58H16" />
          <path d="M320 110H118L76 162H16" />
          <path d="M320 110H522L564 58H624" />
          <path d="M320 110H522L564 162H624" />
          <path d="M320 110H92" />
          <path d="M320 110H548" />
        </svg>
        <svg className="sv-brand-hub-flow" viewBox="0 0 640 220" preserveAspectRatio="none">{['M320 110H118L76 58H16','M320 110H118L76 162H16','M320 110H522L564 58H624','M320 110H522L564 162H624'].map(path=><path d={path} key={path}/>)}</svg><i className="center"><img src="/static/img/logo-mark.png" alt="" /></i>
        <span>Positioning</span><span>Education</span><span>Video</span><span>Authority</span><span>Consistency</span><span>Trust</span>
      </div>
    )
  }
  if (type === 'message') {
    return (
      <div className="sv-brand-display-visual sv-brand-display-visual--message" aria-hidden="true">
        <div className="sv-message-avatar"><PublicIcon name="spark" size={18} /></div>
        <strong>Educational Communication</strong>
        <p>Clear, useful messaging that helps people understand value.</p>
        <div className="sv-message-chat sv-message-chat--one">Explain the idea simply.</div>
        <div className="sv-message-chat sv-message-chat--two">Keep it credible and useful.</div>
        <b /><b /><b />
      </div>
    )
  }
  if (type === 'timeline') {
    return (
      <div className="sv-brand-display-visual sv-brand-display-visual--timeline" aria-hidden="true">
        <div className="sv-mini-browser">
          <div className="sv-mini-browser__bar"><i /><i /><i /><span>Content workflow</span></div>
          <div className="sv-mini-browser__canvas"><span>Brand message</span><b /><b /><b /><em>Ready</em></div>
        </div>
        <div className="sv-brand-feature-chart">
          <span>Creative momentum</span>
          <svg viewBox="0 0 180 90" fill="none">
            <path d="M4 76C22 90 26 25 44 39S66 70 82 42S107 64 122 30S147 40 175 8" stroke="white" strokeWidth="3" />
            <circle cx="175" cy="8" r="4" fill="white" />
          </svg>
        </div>
        <span className="sv-badge">Short-Form Video</span>
        <div className="sv-lines"><i /><i /><i /></div>
        <div className="sv-pointer" />
      </div>
    )
  }
  return (
    <div className="sv-brand-display-visual sv-brand-display-visual--sheet" aria-hidden="true">
      <div className="sv-sheet-network"><span /><span /><span /><i /></div>
      <div className="sv-sheet"><strong>Creative Assets</strong><b /><b /><b /></div>
    </div>
  )
}

function BrandFeatureMosaic({ data }: { data: ServicePageData }) {
  return (
    <section className="sv-brand-features" id="brand-features" data-brand-feature-section>
      <div className="af-container">
        <div className="sv-brand-feature-story" data-brand-feature-story>
          <div className="sv-brand-feature-pin" data-brand-feature-pin>
            <div className="sv-brand-feature-stage" data-brand-feature-stage>
              <div className="sv-brand-features__intro" data-brand-feature-intro>
                <div className="sv-brand-features__intro-inner">
                  <SectionLabel text="Features" />
                  <h2 className="sv-title">Boost Your Brand Communication Quality Through Strategy.</h2>
                  <p>Build the communication system around positioning, trust, educational clarity and creative consistency—then connect every creative layer to a clearer business purpose.</p>
                </div>
              </div>
              <div className="sv-brand-feature-grid" data-brand-feature-grid aria-label={`${data.name} feature system`}>
                {brandDisplayCards.map((card, index) => (
                  <article
                    className={`sv-brand-display-card sv-brand-display-card--${card.type} ${index === 2 ? 'is-accent' : ''}`}
                    data-brand-feature-card
                    key={card.title}
                  >
                    <div className="sv-brand-display-card__copy">
                      <h3>{card.title}</h3>
                      <p>{card.description}</p>
                    </div>
                    <div className="sv-brand-display-card__visual">
                      <BrandFeatureCardVisual type={card.type} />
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function BrandIntegrationsSection() {
  const items = [
    { label: 'Intercom', image: 'Group.png' },
    { label: 'Notion', image: 'b11.png' },
    { label: 'OpenAI', image: 'b10.png' },
    { label: 'Zendesk', image: 'b9.png' },
    { label: 'Creative workflow', image: 'b8.png' },
    { label: 'Connected tools', image: 'b7.png' },
    { label: 'HubSpot', image: 'b6.png' },
    { label: 'Translation', image: 'b5.png' },
    { label: 'Automation', image: '4.png' },
    { label: 'Advertising', image: 'b3.png' },
    { label: 'Growth tools', image: 'b2.png' }
  ]
  return (
    <section className="sv-brand-integrations" data-brand-integrations>
      <div className="af-container">
        <div className="sv-brand-integrations__pin" data-brand-integrations-pin>
          <div className="sv-brand-centerhead" data-brand-integrations-head>
            <SectionLabel text="Integrations" />
            <h2 className="sv-title">Connect the Communication System Across Every Important Touchpoint.</h2>
            <p>Bring strategy, creative production, publishing and lead communication into a connected workflow without turning the brand into a collection of isolated tasks.</p>
          </div>
          <div className="sv-brand-integrations__arc" data-brand-integrations-arc>
            <img className="sv-brand-integrations__asset-curve" src="/static/brand-reference-v78/a1-bg-shape.webp" alt="" aria-hidden="true" />
            <svg className="sv-brand-integrations__curve" viewBox="0 0 1384 516" preserveAspectRatio="none" aria-hidden="true">
              <path className="sv-brand-integrations__curve-base" data-brand-integrations-path d="M80 70 C122 352 412 486 692 486 C972 486 1262 352 1304 70" />
              <path className="sv-brand-integrations__curve-tracer" data-brand-integrations-tracer d="M80 70 C122 352 412 486 692 486 C972 486 1262 352 1304 70" />
            </svg>
            {items.map((item, index) => (
              <div className={`sv-brand-integrations__item sv-brand-integrations__item--${index + 1}`} data-brand-integration-item data-index={index} key={item.label}>
                <span><img src={`/static/brand-reference-v78/${encodeURIComponent(item.image)}`} alt="" /></span><small>{item.label}</small>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function BrandVideoSection() {
  const [playing, setPlaying] = useState(false)

  return (
    <section className="sv-brand-video" data-brand-video>
      <div className="af-container">
        <div className="sv-brand-centerhead sv-brand-video__head" data-brand-video-head>
          <SectionLabel text="System walkthrough" />
          <h2 className="sv-title">See How the Communication System Comes Together.</h2>
          <p>Use this walkthrough area to demonstrate how positioning, content direction, creative communication and publishing connect in one coordinated workflow.</p>
        </div>
        <div className="sv-brand-video__frame" data-brand-video-frame>
          <span className="sv-brand-video__dot sv-brand-video__dot--1" aria-hidden="true" />
          <span className="sv-brand-video__dot sv-brand-video__dot--2" aria-hidden="true" />
          <span className="sv-brand-video__dot sv-brand-video__dot--3" aria-hidden="true" />
          <span className="sv-brand-video__dot sv-brand-video__dot--4" aria-hidden="true" />
          <div className="sv-brand-video__player">
            {!playing ? (
              <button type="button" className="sv-brand-video__poster" onClick={() => setPlaying(true)} aria-label="Play placeholder video">
                <img src="/static/img/brand-communication-dashboard-front-v2.svg" alt="Brand communication workflow video poster" />
                <span className="sv-brand-video__play"><PublicIcon name="play" size={30} /></span>
              </button>
            ) : (
              <video className="sv-brand-video__media" controls autoPlay playsInline preload="metadata" aria-label="Placeholder video for the brand communication walkthrough">
                <source src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" type="video/mp4" />
                Your browser does not support HTML5 video.
              </video>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

function BrandStrategicSolutionsSection() {
  const [activeCategory, setActiveCategory] = useState('All')
  const categories = ['All', 'Brand Foundation', 'Education Content', 'Social Presence', 'Video & Creative', 'Trust & Authority']
  const items = activeCategory === 'All' ? brandSolutionCards : brandSolutionCards.filter((item) => item.category === activeCategory)

  return (
    <section className="sv-brand-library-section" data-brand-solutions-section>
      <div className="sv-brand-library-section__arc" data-brand-strategic-arc aria-hidden="true">
        <svg viewBox="0 0 1000 380" preserveAspectRatio="none">
          <path className="sv-brand-strategic-arc__base" d="M20 365 Q500 -330 980 365" />
          <path className="sv-brand-strategic-arc__progress" data-brand-strategic-progress d="M20 365 Q500 -330 980 365" />
          <path className="sv-brand-strategic-arc__tracer" data-brand-strategic-tracer d="M20 365 Q500 -330 980 365" />
        </svg>
        <span className="sv-brand-strategic-arc__spark" data-brand-strategic-spark />
      </div>
      <div className="af-container">
        <div className="sv-brand-centerhead" data-brand-solutions-head>
          <SectionLabel text="Strategic solution" />
          <h2 className="sv-title">Flexible Communication Templates with Full Personalization.</h2>
          <p>Create tailored brand communication effortlessly using strategic solution blocks that adapt to positioning, messaging needs and creative preferences.</p>
        </div>
        <div className="sv-brand-filter" data-brand-solutions-filter>
          {categories.map((category) => (
            <button type="button" key={category} className={activeCategory === category ? 'is-active' : ''} onClick={() => setActiveCategory(category)}>{category}</button>
          ))}
        </div>
        <div className="sv-brand-library-grid" data-brand-solutions-grid>
          {items.map((item, index) => (
            <article className="sv-brand-library-card" data-brand-solution-card key={item.title}>
              <div className="sv-brand-library-card__badges"><span>New</span>{item.featured ? <span>Popular</span> : null}</div>
              <div className="sv-brand-library-card__index">{String(index + 1).padStart(2, '0')}</div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <div className="sv-brand-library-card__foot"><strong>{item.category}</strong><Link className="sv-brand-inline-link" to="/request-consultation">Discuss this solution <PublicIcon name="arrowRight" size={16} /></Link></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function BrandHowItWorksSection() {
  return (
    <section className="sv-brand-steps" id="brand-growth-system" data-brand-steps-section>
      <div className="af-container">
        <div className="sv-brand-step-pin" data-brand-step-pin>
          <div className="sv-brand-centerhead" data-brand-steps-head>
            <SectionLabel text="How it works" />
            <h2 className="sv-title">See Exactly How the Strategy Growth System Moves.</h2>
          </div>
          <div className="sv-brand-steps__wrap" data-brand-step-scroll>
            <div className="sv-brand-steps__shell" data-brand-step-shell>
              <div className="sv-brand-steps__nav">
                {brandProcessSteps.map((step, index) => <button type="button" className={index === 0 ? 'is-active' : ''} aria-pressed={index === 0} data-step-index={index} aria-label={`Show step ${index + 1}: ${step.title}`} key={step.title}>{step.short}</button>)}
              </div>
              <div className="sv-brand-steps__stage">
                <div className="sv-brand-steps__columns" aria-hidden="true">
                  {brandProcessSteps.map((_, index) => <i data-step-guide data-step-index={index} key={index} />)}
                </div>
                <div className="sv-brand-steps__cards">
                  {brandProcessSteps.map((step, index) => (
                    <article className="sv-brand-step-card" data-step-index={index} key={step.title}>
                      <div className="sv-brand-step-card__icon"><PublicIcon name={step.icon} size={26} /></div>
                      <div className="sv-brand-step-card__num">{String(index + 1).padStart(2, '0')}</div>
                      <h3>{step.title}</h3>
                      <p>{step.description}</p>
                      <span>{step.detail}</span>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function BrandProgramsSection({ data }: { data: ServicePageData }) {
  const livePrograms = useLiveProgramsData()
  return (
    <section className="sv-brand-pricing" id="service-programs" data-brand-pricing>
      <div className="sv-brand-pricing__watermark" aria-hidden="true">Pricing Plan</div>
      <div className="af-container">
        <div className="sv-brand-centerhead" data-brand-pricing-head>
          <SectionLabel text="Pricing plan" />
          <h2 className="sv-title">Choose the Program That Matches Your Communication Stage.</h2>
          <p>Choose from Afyra Digital’s current marketing programs, presented in a clear comparison layout designed to make the next step easier.</p>
        </div>
        <div className="sv-brand-pricing__frame" data-brand-pricing-frame>
          <span className="sv-brand-pricing__dot sv-brand-pricing__dot--1" aria-hidden="true" />
          <span className="sv-brand-pricing__dot sv-brand-pricing__dot--2" aria-hidden="true" />
          <span className="sv-brand-pricing__dot sv-brand-pricing__dot--3" aria-hidden="true" />
          <span className="sv-brand-pricing__dot sv-brand-pricing__dot--4" aria-hidden="true" />
        <div className="sv-brand-pricing__grid" data-brand-pricing-grid>
          {livePrograms.plans.map((plan) => (
            <article className={`sv-brand-price-card ${plan.popular ? 'is-popular' : ''}`} data-brand-price-card key={plan.id}>
              {plan.popular ? <span className="sv-brand-price-card__popular">Most Popular</span> : null}
              <div className="sv-brand-price-card__head">
                <h3>{plan.name}</h3>
                <p>{plan.purpose}</p>
              </div>
              <div className="sv-brand-price-card__value"><span>PKR</span>{plan.price.toLocaleString()}<small>/month</small></div>
              <div className="sv-brand-price-card__package" data-brand-price-package>
              <div className="sv-brand-price-card__includes">
                <strong>Package includes:</strong>
                <ul>
                  {plan.includes.slice(0, 6).map((item) => <li key={item}><PublicIcon name="check" size={16} /><span>{item}</span></li>)}
                </ul>
              </div>
              <PageButton to="/request-consultation">Get Started Now</PageButton>
              <CardDetailLink slug={cardKey(data.slug,'program',String(plan.id))} label="Full program details" />
              </div>
            </article>
          ))}
        </div>
          <p className="sv-brand-pricing__terms">{livePrograms.terms.join(' ')}</p>
        </div>
      </div>
    </section>
  )
}

function BrandFaqSection() {
  const scopedFaqs = useScopedFaqs(brandFaqs)
  return (
    <section className="sv-brand-faq" data-brand-faq>
      <div className="af-container sv-brand-faq__grid">
        <div className="sv-brand-faq__head" data-brand-faq-head>
          <SectionLabel text="Popular question" />
          <h2 className="sv-title">Questions on Your Mind? We’re Here to Help.</h2>
          <p>Find clear, helpful answers to important brand communication questions so you can move forward with confidence.</p>
          <div className="sv-brand-faq__contact">
            <div className="sv-brand-faq__avatars" aria-hidden="true"><span /><span /><span /><span /><span /></div>
            <p><strong>Contact Us!</strong> We’ll be happy to help you.</p>
          </div>
        </div>
        <div className="sv-brand-faq__items" data-brand-faq-items>
          {scopedFaqs.map((faq, index) => (
            <details data-brand-faq-item key={faq.q} open={index === 0}>
              <summary>{faq.q}<span>+</span></summary>
              <p>{faq.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

function ReferenceSections({ data }: { data: ServicePageData }) {
  if (data.layout === '04') return <><VariantShowcase data={data} /><FeatureSection data={data} /><ProgramsSection data={data} /><ConnectedSection data={data} /><ProcessSection data={data} /><FaqSection /><ProofSection data={data} /></>
  if (data.layout === '05') return <><FeatureSection data={data} /><ProcessSection data={data} /><VariantShowcase data={data} /><ProgramsSection data={data} /><ConnectedSection data={data} /><ProofSection data={data} /><InsightsPlaceholder data={data} /><FaqSection /></>
  if (data.layout === '06') return <><VariantShowcase data={data} /><FeatureSection data={data} /><ProgramsSection data={data} /><ConnectedSection data={data} /><ProofSection data={data} /><FaqSection /></>
  if (data.layout === '07') return <><FeatureSection data={data} /><VariantShowcase data={data} /><ProcessSection data={data} /><ProgramsSection data={data} /><ProofSection data={data} /><ConnectedSection data={data} /><FaqSection /></>
  if (data.layout === '03') return <><FeatureSection data={data} /><ConnectedSection data={data} /><VariantShowcase data={data} /><ProcessSection data={data} /><ProgramsSection data={data} /><ProofSection data={data} /><FaqSection /></>
  if (data.layout === '02') return <><BrandFeatureMosaic data={data} /><BrandIntegrationsSection /><BrandStrategicSolutionsSection /><BrandHowItWorksSection /><BrandProgramsSection data={data} /><TestimonialsSection pageSlug={`solution:${data.slug}`} variant="brand" /><BrandFaqSection /></>
  return <><FeatureSection data={data} /><ConnectedSection data={data} /><VariantShowcase data={data} /><ProcessSection data={data} /><ProgramsSection data={data} /><ProofSection data={data} /><FaqSection /></>
}

function ServiceCrossLinks({ current }: { current: string }) {
  const serviceNav = useLiveSolutionsNav()
  return (
    <section className="sv-crosslinks"><div className="af-container"><div className="sv-section-head"><SectionLabel text="Explore solutions" /><h2 className="sv-title">Connected Services Across the Growth System</h2></div><div className="sv-crosslinks__grid">{serviceNav.filter((s) => s.href !== `/solutions/${current}`).map((s) => { const target = s.href.split('/').pop() || s.name; const visualKey = cardKey(current, 'crosslink', target); return <Link to={s.href} key={s.href}><CardVisual assetKey={visualKey} label={`${s.name} connected solution`} compact /><span className="sv-crosslinks__label">{s.name}</span><PublicIcon name="arrowRight" size={18} /></Link> })}</div></div></section>
  )
}

function ServicePageContent({ data }: { data: ServicePageData }) {
  usePageSeo(data.seo.title, data.seo.description, `/solutions/${data.slug}`)
  useServiceAnimations(data.layout)
  useReferenceSolutionAnimations(data.layout, data)
  useSaasKingEffects()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [data.slug])

  return (
    <div className={`sv-page sv-layout-${data.layout}`}>
      <Header fromServicePage />
      <main>
        {data.layout === '02' ? (
          <>
            <ServiceHero data={data} />
            <BrandReferenceStrip />
            <ReferenceSections data={data} />
            {data.contentGap ? <section className="sv-gap"><div className="af-container"><div className="sv-gap__notice"><strong>PENDING FOUNDER INPUT</strong><p>{data.contentGap}</p></div></div></section> : null}
            <ServiceCrossLinks current={data.slug} />
            <section className="sv-final-cta"><div className="af-container"><div className="sv-final-cta__box" data-sv-reveal="up"><img src="/static/img/logo-mark.png" alt="Afyra Digital logo"/><h2>Let’s Grow Together.</h2><p>Afyra Digital builds strategy, systems and digital growth around visibility, trust, inquiries and long-term business value.</p><PageButton to="/request-consultation">Request Consultation</PageButton></div></div></section>
          </>
        ) : <ReferenceSolutionExperience data={data} />}
      </main>
      <Footer fromServicePage />
      <ScrollTop />
    </div>
  )
}

export default function ServicePage() {
  const { slug = '' } = useParams()
  const fallback = serviceBySlug[slug]
  const [data, setData] = useState<ServicePageData | undefined>(fallback)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    setLoading(true)
    apiGetSolutionBySlug(slug, `solution:${slug}`)
      .then((res) => {
        if (!mounted || !res?.ok || !res.data) return
        const row = res.data
        const base = fallback || serviceBySlug['digital-growth-marketing-strategy']
        setData({
          ...base,
          slug: row.slug,
          name: row.name,
          layout: row.layout,
          title: row.title || row.name,
          eyebrow: row.eyebrow || '',
          description: row.description || '',
          intro: row.intro || '',
          features: Array.isArray(row.features) ? row.features : [],
          touchpoints: Array.isArray(row.touchpoints) ? row.touchpoints.map((item: any) => typeof item === 'string' ? item : item.label) : [],
          process: Array.isArray(row.process) ? row.process : [],
          proofNote: row.proof_note || base.proofNote,
          contentGap: row.content_gap || undefined,
          seo: {
            title: row.seo_title || `${row.name} | Afyra Digital`,
            description: row.seo_description || row.description || ''
          }
        })
      })
      .catch((error) => {
        console.warn(`[Afyra API] Solution "${slug}" unavailable; using bundled fallback when available.`, error)
      })
      .finally(() => { if (mounted) setLoading(false) })
    return () => { mounted = false }
  }, [slug])

  if (!data && loading) return null
  return data ? <ServicePageContent data={data} /> : <Navigate to="/solutions" replace />
}
