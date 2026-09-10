import { useEffect, type ReactNode } from 'react'
import { Link, Navigate, useLocation } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ScrollTop from '../components/ScrollTop'
import GeneratedVisual from '../components/GeneratedVisual'
import CardVisual from '../components/CardVisual'
import CardDetailLink from '../components/CardDetailLink'
import PublicIcon from '../components/PublicIcon'
import SemanticCardIcon from '../components/SemanticCardIcon'
import SectionLabel from '../components/SectionLabel'
import Marquee from '../components/Marquee'
import { audience, brand, capabilities, cta, faqs, process, programs, solutions, whyAfyra } from '../data/content'
import { servicePages } from '../data/servicePages'
import { sitePageSeo, type SitePageKey } from '../data/sitePages'
import { cardBySlug, cardKey, insightCards, insightDecisions } from '../data/cardDetails'
import { usePageSeo } from '../lib/usePageSeo'
import { useMarketingAnimations } from '../lib/useMarketingAnimations'
import { useSaasKingEffects } from '../lib/useSaasKingEffects'

type Tone = 'mint' | 'deep' | 'teal' | 'warm'
type MarketingPageKey = Exclude<SitePageKey, 'requestConsultation'>

type LinkButtonProps = { to: string; children: ReactNode; ghost?: boolean }
function LinkButton({ to, children, ghost = false }: LinkButtonProps) {
  const cls = `px-btn ${ghost ? 'px-btn--ghost' : 'px-btn--primary'}`
  if (to.startsWith('/#')) return <a className={cls} href={to}><span>{children}</span><PublicIcon name="arrowRight" size={17} /></a>
  return <Link className={cls} to={to}><span>{children}</span><PublicIcon name="arrowRight" size={17} /></Link>
}

const heroContext: Record<MarketingPageKey, Array<{ label: string; key: string }>> = {
  solutions: [
    { label: 'Strategy', key: 'growth-strategy' },
    { label: 'Connected Systems', key: 'digital-systems' },
    { label: 'Growth Outcomes', key: 'growth-outcomes' }
  ],
  healthcare: [
    { label: 'Patient Trust', key: 'patient-trust' },
    { label: 'Local Discovery', key: 'local-visibility' },
    { label: 'Inquiry Path', key: 'patient-inquiry' }
  ],
  programs: [
    { label: 'Starter Presence', key: 'starter-presence' },
    { label: 'Patient Growth', key: 'patient-growth-plan' },
    { label: 'Authority Building', key: 'authority-building' }
  ],
  about: [
    { label: 'Agency Positioning', key: 'agency-positioning' },
    { label: 'Scalable Systems', key: 'scalable-systems' },
    { label: 'Long-Term Value', key: 'long-term-value' }
  ],
  insights: [
    { label: 'Business Value', key: 'business-value' },
    { label: 'Credibility', key: 'credibility' },
    { label: 'Conversion', key: 'conversion' }
  ]
}

function PageHero({ variant, eyebrow, title, description, tone, visualLabel, children }: { variant: MarketingPageKey; eyebrow: string; title: string; description: string; tone: Tone; visualLabel: string; children?: ReactNode }) {
  return (
    <section className={`px-hero px-hero--${variant}`} data-px-hero={variant}>
      <div className="px-hero__orb px-hero__orb--one" data-px-parallax="80" aria-hidden="true" />
      <div className="px-hero__orb px-hero__orb--two" data-px-parallax="-60" aria-hidden="true" />
      <div className="af-container px-hero__grid">
        <div className="px-hero__copy">
          <span className="px-kicker" data-px-reveal>{eyebrow}</span>
          <h1 data-px-chars>{title}</h1>
          <p className="px-lead">{description}</p>
          <div className="px-actions" data-px-reveal>{children ?? <><LinkButton to="/request-consultation">Request Consultation</LinkButton><LinkButton to="/solutions" ghost>Explore Solutions</LinkButton></>}</div>
          <p className="px-positioning">{brand.positioning}</p>
        </div>
        <div className={`px-hero__visual px-hero__visual--${variant}`} data-px-hero-visual={variant}>
          <div className="px-hero__media" data-px-image-reveal><GeneratedVisual label={visualLabel} tone={tone} priority /></div>
          <div className="px-hero__context" data-px-hero-context>
            {heroContext[variant].map((item, index) => (
              <div className="px-hero__context-card" data-px-hero-context-card key={item.label}>
                <span>0{index + 1}</span>
                <SemanticCardIcon assetKey={item.key} size={20} />
                <strong>{item.label}</strong>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function SectionHead({ eyebrow, title, description, align = 'center' }: { eyebrow: string; title: string; description?: string; align?: 'center' | 'left' }) {
  return <div className={`px-section-head ${align === 'left' ? 'is-left' : ''}`}><SectionLabel text={eyebrow} /><h2>{title}</h2>{description ? <p>{description}</p> : null}</div>
}

function CommonCta() {
  return (
    <section className="px-final">
      <div className="af-container">
        <div className="px-final__box" data-px-image-reveal>
          <SectionLabel text={brand.tagline} />
          <h2>{cta.title}</h2>
          <p>{cta.description}</p>
          <p className="px-final__notice">{cta.notice}</p>
          <LinkButton to="/request-consultation">{cta.buttonLabel}</LinkButton>
        </div>
      </div>
    </section>
  )
}

function SolutionsPage() {
  return <>
    <PageHero variant="solutions" eyebrow="Solutions → Strategy → Systems → Outcomes" title="One Connected Growth System. Six Strategic Solution Areas." description="Afyra presents services as strategic solution pillars rather than a freelancer-style list of isolated marketing tasks." tone="mint" visualLabel="Afyra connected growth solutions" />
    <Marquee />

    <section className="px-section px-solutions-map">
      <div className="af-container">
        <SectionHead eyebrow="Core solutions" title="Choose the Growth Problem You Need to Solve." description="Each solution connects back to stronger visibility, trust, qualified inquiries, conversion, authority and long-term growth." />
        <div className="px-solution-grid" data-px-stagger>
          {servicePages.map((service, i) => (
            <Link className={`px-card px-solution-card px-solution-card--${i + 1}`} to={`/details/${cardKey('solutions','service',service.slug)}`} key={service.slug}>
              <CardVisual assetKey={cardKey('solutions','service',service.slug)} label={service.name} compact />
              <span className="px-card__num">0{i + 1}</span>
              <h3 data-px-heading>{service.name}</h3>
              <p>{service.description}</p>
              <span className="px-card__link">View full detail <PublicIcon name="arrowRight" size={18} /></span>
            </Link>
          ))}
        </div>
      </div>
    </section>

    <section className="px-section px-system-band" data-px-pin>
      <div className="af-container px-system-band__grid">
        <div className="px-system-band__sticky" data-px-pin-content>
          <SectionLabel text="Business philosophy" />
          <h2>Marketing Activity Is Not the Product. Growth Outcomes Are.</h2>
          <p>Afyra’s focus includes digital visibility, brand positioning, trust, patient/customer acquisition, lead generation, local visibility, conversion, authority, consistency and long-term growth.</p>
        </div>
        <div className="px-system-band__steps" data-px-stagger>
          {['Visibility','Trust','Inquiries','Conversion','Authority','Long-Term Growth'].map((item, i) => { const key = cardKey('solutions','outcome',item); return <article className="px-card" key={item}><CardVisual assetKey={key} label={item} compact /><span>0{i + 1}</span><h3 data-px-heading>{item}</h3><p>{[
            'Be present where the right audience discovers and evaluates the business.',
            'Strengthen professional reputation and confidence before the first conversation.',
            'Create clearer opportunities for qualified patient or customer inquiries.',
            'Connect visibility and communication to useful business actions.',
            'Build a professional digital presence that supports long-term positioning.',
            'Prioritize scalable systems and recurring business value over short-term activity.'
          ][i]}</p><CardDetailLink slug={key} /></article> })}
        </div>
      </div>
    </section>

    <section className="px-section px-capability-marquee">
      <div className="px-capability-track" data-px-scrub-text>{[...capabilities, ...capabilities].map((item, i) => <span key={`${item}-${i}`}>{item}</span>)}</div>
    </section>

    <section className="px-section px-principles">
      <div className="af-container">
        <SectionHead eyebrow="Decision philosophy" title="Strategy Over Decoration. Outcomes Over Deliverables." />
        <div className="px-principles__grid" data-px-stagger>
          {['Business value > Brand value','User experience > visual decoration','Agency positioning over freelancer positioning','Credibility over hype','Clarity over complexity','Long-term brand value over short-term trends'].map((item) => { const key = cardKey('solutions','principle',item); return <article className="px-card" key={item}><span className="px-icon"><SemanticCardIcon assetKey={key} size={22} /></span><h3 data-px-heading>{item}</h3><CardVisual assetKey={key} label={item} compact /><p className="px-card__summary">{cardBySlug[key]?.summary}</p><CardDetailLink slug={key} /></article> })}
        </div>
      </div>
    </section>
    <CommonCta />
  </>
}

function HealthcarePage() {
  const needs = ['Patient trust','Professional reputation','Visibility','Education','Local discovery','Inquiries','Appointment opportunities','Long-term authority']
  return <>
    <PageHero variant="healthcare" eyebrow="Healthcare marketing specialization" title="Digital Growth Built Around Patient Trust, Visibility and Inquiry Opportunities." description={audience.description} tone="deep" visualLabel="Healthcare patient trust and visibility system" />
    <Marquee />

    <section className="px-section px-health-audience">
      <div className="af-container">
        <SectionHead eyebrow="Who we help" title="Healthcare Businesses With High Trust and Reputation Requirements." />
        <div className="px-health-audience__grid" data-px-stagger>
          {audience.items.map((item) => { const key = cardKey('healthcare','audience',item.label); return <article className="px-card px-health-card" key={item.label}><CardVisual assetKey={key} label={item.label} compact /><span className="px-icon"><PublicIcon name={item.icon} size={24} /></span><h3 data-px-heading>{item.label}</h3><p className="px-card__summary">{cardBySlug[key]?.summary}</p><CardDetailLink slug={key} /></article> })}
        </div>
      </div>
    </section>

    <section className="px-section px-health-needs">
      <div className="af-container px-health-needs__grid">
        <div>
          <SectionHead align="left" eyebrow="Why healthcare is different" title="The Digital Experience Influences Confidence Before Contact." description="Healthcare businesses have strong requirements around trust, reputation, visibility, education, local discovery, inquiries, appointment opportunities and long-term authority." />
          <LinkButton to="/solutions/patient-acquisition-lead-generation">Explore Patient Acquisition</LinkButton>
        </div>
        <div className="px-health-needs__stack" data-px-stagger>{needs.map((need, i) => { const key = cardKey('healthcare','need',need); return <article className="px-card" key={need}><span>0{i+1}</span><h3 data-px-heading>{need}</h3><CardVisual assetKey={key} label={`Healthcare ${need}`} compact /><p className="px-card__summary">{cardBySlug[key]?.summary}</p><CardDetailLink slug={key} /></article> })}</div>
      </div>
    </section>

    <section className="px-section px-journey">
      <div className="af-container">
        <SectionHead eyebrow="Patient journey" title="Connect Discovery, Trust, Inquiry and Communication." description="Paid advertising is one component of a broader system that can involve strategy, content, social presence, Google Business Profile, WhatsApp, lead communication, patient/customer journey, brand authority and conversion." />
        <div className="px-journey__line" data-px-stagger>
          {['Discovery','Trust','Inquiry','Communication','Appointment Opportunity','Authority'].map((step, i) => { const key = cardKey('healthcare','journey',step); return <article className="px-card" key={step}><span className="px-journey__num">{String(i+1).padStart(2,'0')}</span><CardVisual assetKey={key} label={step} compact /><h3 data-px-heading>{step}</h3><p className="px-card__summary">{cardBySlug[key]?.summary}</p><CardDetailLink slug={key} /></article> })}
        </div>
      </div>
    </section>

    <section className="px-section px-health-programs">
      <div className="af-container">
        <SectionHead eyebrow="Current programs" title="A Managed Growth Program for Each Stage." description="Afyra’s current programs are structured around online presence, appointment and inquiry focus, and long-term authority." />
        <div className="px-program-mini" data-px-stagger>{programs.plans.map((plan) => { const key = cardKey('healthcare','program',plan.id); return <article className={`px-card ${plan.popular ? 'is-popular' : ''}`} key={plan.id}><CardVisual assetKey={key} label={plan.name} compact />{plan.popular ? <span className="px-badge">Most Popular</span> : null}<h3 data-px-heading>{plan.name}</h3><p>{plan.purpose}</p><strong>PKR {plan.price.toLocaleString()}<small>/month</small></strong><CardDetailLink slug={key} label="View program details" /></article> })}</div>
      </div>
    </section>
    <CommonCta />
  </>
}

function ProgramsPage() {
  const rows = ['Platforms','Static Posts','Animated Posts','Video Edits / Shorts / Reels','Paid Ad Campaigns','Monthly Strategy Plan','Google Business Profile Management','Monthly Zoom Growth Meeting','WhatsApp Business Optimization','Dedicated Support']
  const valueFor = (plan: typeof programs.plans[number], row: string) => {
    if (row === 'Platforms') return plan.platforms
    const hit = plan.includes.find((item) => item.toLowerCase().includes(row.toLowerCase().replace(' management','').replace(' / reels','')))
    if (hit) return hit
    if (row === 'Paid Ad Campaigns') return plan.includes.includes('Paid Ad Campaigns') ? 'Included' : '—'
    if (row === 'Monthly Strategy Plan') return plan.includes.includes('Monthly Strategy Plan') ? 'Included' : '—'
    if (row === 'Monthly Zoom Growth Meeting') return plan.includes.includes('Monthly Zoom Growth Meeting') ? 'Included' : '—'
    if (row === 'WhatsApp Business Optimization') return plan.includes.includes('WhatsApp Business Optimization') ? 'Included' : '—'
    if (row === 'Dedicated Support') return plan.includes.includes('Dedicated Support') ? 'Included' : '—'
    return '—'
  }
  return <>
    <PageHero variant="programs" eyebrow="Current approved marketing programs" title="Three Programs. Clear Stages. One Growth Philosophy." description={programs.description} tone="mint" visualLabel="Afyra marketing programs and growth stages"><LinkButton to="/request-consultation">Program Inquiry</LinkButton><LinkButton to="/healthcare" ghost>Healthcare Focus</LinkButton></PageHero>
    <Marquee />

    <section className="px-section px-programs-full">
      <div className="af-container">
        <SectionHead eyebrow="Programs & pricing" title={programs.title} />
        <div className="px-programs-full__grid" data-px-stagger>
          {programs.plans.map((plan, i) => <article className={`px-program-card px-card ${plan.popular ? 'is-popular' : ''}`} key={plan.id}>
            <CardVisual assetKey={cardKey('programs','plan',plan.id)} label={`${plan.name} program`} />
            {plan.popular ? <span className="px-badge">Most Popular</span> : null}
            <div className="px-program-card__head"><span className="px-kicker">{plan.purpose}</span><h2>{plan.name}</h2><div className="px-program-price"><small>PKR</small>{plan.price.toLocaleString()}<span>/month</span></div></div>
            <div className="px-program-card__best"><h3 data-px-heading>Best for</h3>{plan.bestFor.map((item) => <p key={item}><PublicIcon name="check" size={15} /><span>{item}</span></p>)}</div>
            <div className="px-program-card__includes"><h3 data-px-heading>Includes</h3><ul>{plan.includes.map((item) => <li key={item}><PublicIcon name="check" size={15} /><span>{item}</span></li>)}</ul></div>
            <p className="px-program-card__platforms"><strong>Platforms:</strong> {plan.platforms}</p>
            <LinkButton to="/request-consultation">Request This Program</LinkButton>
            <CardDetailLink slug={cardKey('programs','plan',plan.id)} label="Full program details" />
          </article>)}
        </div>
      </div>
    </section>

    <section className="px-section px-comparison">
      <div className="af-container">
        <SectionHead eyebrow="Compare" title="See How the Programs Scale With Your Stage." />
        <div className="px-table-wrap" data-px-image-reveal><table><thead><tr><th>Area</th>{programs.plans.map((p) => <th key={p.id}>{p.name}</th>)}</tr></thead><tbody>{rows.map((row) => <tr key={row}><td>{row}</td>{programs.plans.map((p) => <td key={`${p.id}-${row}`}>{valueFor(p,row)}</td>)}</tr>)}</tbody></table></div>
      </div>
    </section>

    <section className="px-section px-terms">
      <div className="af-container px-terms__grid">
        <div className="px-terms__intro">
          <SectionHead align="left" eyebrow="Program terms" title="Clear Commercial Terms From the Start." description="The approved terms set scope, payment and customization expectations before work begins." />
          <div className="px-terms__assurance" data-px-stagger aria-label="Program terms at a glance">
            <div><strong>First month</strong><span>25% extra</span></div>
            <div><strong>Outside scope</strong><span>Charged separately</span></div>
            <div><strong>Payment</strong><span>100% in advance</span></div>
            <div><strong>Customization</strong><span>Available by requirements</span></div>
          </div>
          <p className="px-terms__note">These terms apply across the current Afyra Digital marketing programs and keep the engagement commercially clear from the start.</p>
        </div>
        <div className="px-terms__cards" data-px-stagger>{programs.terms.map((term, i) => { const key = cardKey('programs','term',String(i+1)); return <article className="px-card" key={term}><CardVisual assetKey={key} label={term} compact /><span>0{i+1}</span><h3 data-px-heading>{term}</h3><p className="px-card__summary">{cardBySlug[key]?.summary}</p><CardDetailLink slug={key} /></article> })}</div>
      </div>
    </section>
    <CommonCta />
  </>
}

function AboutPage() {
  return <>
    <PageHero variant="about" eyebrow="Agency + Strategy + Systems + Growth + Results" title="Afyra Digital Is Being Built for Long-Term Brand and Business Value." description="Afyra Digital is a Digital Growth & Marketing Agency focused on helping businesses establish a strong digital presence, build trust, generate qualified inquiries and create sustainable growth systems." tone="teal" visualLabel="Afyra Digital agency vision and growth system"><LinkButton to="/solutions">Explore Our Solutions</LinkButton><LinkButton to="/healthcare" ghost>Healthcare Specialization</LinkButton></PageHero>
    <Marquee />

    <section className="px-section px-about-positioning">
      <div className="af-container px-about-positioning__grid">
        <div><SectionHead align="left" eyebrow="Positioning" title="A Strategic Growth Partner, Not a Collection of Isolated Tasks." description="Afyra should be perceived as an agency/company and strategic growth partner, not as an individual freelancer selling isolated marketing or design tasks." /></div>
        <div className="px-about-positioning__compare" data-px-stagger>{whyAfyra.columns.map((col, i) => { const key = cardKey('about','positioning',col.heading); return <article className={`px-card ${col.tone}`} key={col.heading}><CardVisual assetKey={key} label={col.heading} compact /><h3 data-px-heading>{col.heading}</h3><ul>{col.items.map((item) => <li key={item}><PublicIcon name={i ? 'cross' : 'check'} size={15} /><span>{item}</span></li>)}</ul><CardDetailLink slug={key} /></article> })}</div>
      </div>
    </section>

    <section className="px-section px-vision" data-px-pin>
      <div className="af-container px-vision__grid">
        <div className="px-vision__sticky" data-px-pin-content><SectionLabel text="Founder’s vision" /><h2>Build Something Bigger Than a Small Freelance Operation.</h2><p>The ambition is to develop Afyra into a professional, high-level digital agency and eventually expand toward a broader digital/software company.</p><GeneratedVisual label="Long-term Afyra Digital vision" tone="deep" /></div>
        <div className="px-vision__list" data-px-stagger>{['Professional scalability','Strong agency positioning','Long-term brand equity','Systems rather than individual tasks','Recurring client relationships','Measurable business outcomes','Ability to expand services and industries'].map((item, i) => { const key = cardKey('about','vision',item); return <article className="px-card" key={item}><span>0{i+1}</span><div className="px-card__content"><h3 data-px-heading>{item}</h3><p className="px-card__summary">{cardBySlug[key]?.summary}</p></div><CardVisual assetKey={key} label={item} compact /><CardDetailLink slug={key} /></article> })}</div>
      </div>
    </section>

    <section className="px-section px-values">
      <div className="af-container">
        <SectionHead eyebrow="Website & brand experience" title="Modern. Premium. Strategic. Confident. Human." description="The brand should feel intelligent, clean, trustworthy, results-oriented and scalable while avoiding cheap agency aesthetics, unsupported claims and generic template marketing." />
        <div className="px-values__grid" data-px-stagger>{['Modern','Premium','Strategic','Confident','Intelligent','Clean','Trustworthy','Human','Results-Oriented'].map((value) => { const key = cardKey('about','brand-experience',value); return <article className="px-card" key={value}><CardVisual assetKey={key} label={value} compact /><h3 data-px-heading>{value}</h3><p className="px-card__summary">{cardBySlug[key]?.summary}</p><CardDetailLink slug={key} /></article> })}</div>
      </div>
    </section>

    <section className="px-section px-process-page">
      <div className="af-container"><SectionHead eyebrow="How we work" title={process.title} description={process.description} /><div className="px-process-page__grid" data-px-stagger>{process.steps.map((step) => { const key = cardKey('about','process',step.number,step.title); return <article className="px-card" key={step.number}><CardVisual assetKey={key} label={step.title} compact /><span>{step.number}</span><h3 data-px-heading>{step.title}</h3><p>{step.description}</p><CardDetailLink slug={key} /></article> })}</div></div>
    </section>
    <CommonCta />
  </>
}

function InsightsPage() {
  return <>
    <PageHero variant="insights" eyebrow="Afyra Digital thinking" title="Insights for Building Stronger Digital Growth Systems." description="Afyra’s strategic principles focus on business value, brand value, user experience, conversion, technical practicality and long-term growth." tone="warm" visualLabel="Digital growth strategy insights"><LinkButton to="/solutions">Explore Solutions</LinkButton><LinkButton to="/about" ghost>About Afyra</LinkButton></PageHero>
    <Marquee />

    <section className="px-section px-insights-grid">
      <div className="af-container"><SectionHead eyebrow="Strategic notes" title="Principles We Use to Evaluate Digital Growth Decisions." description="These insights are drawn from Afyra’s current approved business, website, SEO, conversion and trust philosophy." /><div className="px-insights-grid__cards" data-px-stagger>{insightCards.map((item, i) => { const key = cardKey('insights','note',item.title); return <article className={`px-card px-insight px-insight--${i+1}`} key={item.title}><CardVisual assetKey={key} label={item.title} /><span className="px-kicker">{item.tag}</span><h3 data-px-heading>{item.title}</h3><p>{item.body}</p><CardDetailLink slug={key} /></article> })}</div></div>
    </section>

    <section className="px-section px-insight-quote">
      <div className="af-container"><blockquote data-px-scrub-text><span>{brand.positioning}</span><p>This line means advertising is treated as one component of a larger growth system—not that Afyra avoids paid advertising.</p></blockquote></div>
    </section>

    <section className="px-section px-decisions">
      <div className="af-container"><SectionHead eyebrow="Decision philosophy" title="A Simple Filter for Better Digital Decisions." /><div className="px-decisions__rail" data-px-stagger>{insightDecisions.map((item, i) => { const key = cardKey('insights','decision',item); return <article className="px-card" key={item}><span>{String(i+1).padStart(2,'0')}</span><CardVisual assetKey={key} label={item} compact /><h3 data-px-heading>{item}</h3><p className="px-card__summary">{cardBySlug[key]?.summary}</p><CardDetailLink slug={key} /></article> })}</div></div>
    </section>

    <section className="px-section px-faq-page">
      <div className="af-container px-faq-page__grid"><SectionHead align="left" eyebrow="Questions" title={faqs.title} description={faqs.description} /><div className="px-faq-page__items" data-px-stagger>{faqs.items.map((item) => <details className="px-faq-item" key={item.q}><summary>{item.q}<span>+</span></summary><p>{item.a}</p></details>)}</div></div>
    </section>
    <CommonCta />
  </>
}

const pageComponents: Record<MarketingPageKey, () => ReactNode> = {
  solutions: SolutionsPage,
  healthcare: HealthcarePage,
  programs: ProgramsPage,
  about: AboutPage,
  insights: InsightsPage
}

export default function MarketingPage() {
  const { pathname } = useLocation()
  const key = pathname.replace(/^\//, '').replace(/\/$/, '') as MarketingPageKey
  const Component = pageComponents[key]
  const seo = sitePageSeo[key]
  usePageSeo(seo?.title || '', seo?.description || '', seo?.path || '/')
  useMarketingAnimations(key)
  useSaasKingEffects()

  useEffect(() => { window.scrollTo({ top: 0, behavior: 'auto' }) }, [key])
  if (!Component || !seo) return <Navigate to="/" replace />

  const toneClass: Record<MarketingPageKey, string> = { solutions: 'px-theme-mint', healthcare: 'px-theme-deep', programs: 'px-theme-light', about: 'px-theme-teal', insights: 'px-theme-contrast' }
  return <div className={`px-page ${toneClass[key]}`}><Header fromServicePage /><main><Component /></main><Footer fromServicePage /><ScrollTop /></div>
}
