import { Link, Navigate, useParams, useSearchParams } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ScrollTop from '../components/ScrollTop'
import Marquee from '../components/Marquee'
import CardVisual from '../components/CardVisual'
import GeneratedVisual from '../components/GeneratedVisual'
import PublicIcon from '../components/PublicIcon'
import SemanticCardIcon from '../components/SemanticCardIcon'
import SectionLabel from '../components/SectionLabel'
import { cardBySlug, cardMetaDescription, cardSeoTitle, type CardDetail } from '../data/cardDetails'
import { brand } from '../data/content'
import { usePageSeo } from '../lib/usePageSeo'
import { useMarketingAnimations } from '../lib/useMarketingAnimations'
import { useSaasKingEffects } from '../lib/useSaasKingEffects'

export default function CardDetailPage() {
  const { slug = '' } = useParams()
  const [searchParams] = useSearchParams()
  const storedDetail = cardBySlug[slug]
  const fallbackTitle = (searchParams.get('title') || '').trim()
  const fallbackParentPathRaw = (searchParams.get('from') || '/solutions').trim()
  const fallbackParentPath = fallbackParentPathRaw.startsWith('/') && !fallbackParentPathRaw.startsWith('/details/') ? fallbackParentPathRaw : '/solutions'
  const fallbackParentTitle = (searchParams.get('parent') || 'Afyra Digital').trim()
  const fallbackSummary = (searchParams.get('summary') || '').trim()
  const fallbackDetail: CardDetail | null = !storedDetail && slug.startsWith('context-') && fallbackTitle ? {
    slug,
    assetKey: 'universal-context-card',
    detailAssetKey: 'universal-context-card-detail',
    title: fallbackTitle,
    eyebrow: 'Page detail',
    summary: fallbackSummary || `${fallbackTitle} is part of the approved ${fallbackParentTitle} page context.`,
    parentTitle: fallbackParentTitle,
    parentPath: fallbackParentPath,
    body: [
      fallbackSummary || `${fallbackTitle} is presented as part of the ${fallbackParentTitle} page.`,
      `This detail keeps the same approved context as the source card on ${fallbackParentTitle}. It does not add unsupported results, guarantees, deliverables or technical claims.`,
      'Afyra Digital frames website and marketing decisions through strategy, connected systems, business outcomes, credibility, clarity and long-term growth.'
    ],
    highlights: ['Strategy', 'Connected systems', 'Business outcomes', 'Credibility over hype'],
    nextStepLabel: `Back to ${fallbackParentTitle}`,
    nextStepPath: fallbackParentPath
  } : null
  const detail = storedDetail || fallbackDetail
  const isFallback = !storedDetail && !!fallbackDetail

  usePageSeo(
    detail ? cardSeoTitle(detail) : 'Afyra Digital',
    detail ? cardMetaDescription(detail) : 'Afyra Digital — strategy, systems and sustainable digital growth.',
    detail ? `/details/${detail.slug}` : '/solutions'
  )
  useMarketingAnimations(`detail-${slug}`)
  useSaasKingEffects()

  if (!detail) return <Navigate to="/solutions" replace />

  return (
    <div className="px-page dt-page">
      <Header fromServicePage />
      <main>
        <section className="dt-hero af-section">
          <div className="dt-hero__glow dt-hero__glow--one" data-px-parallax="70" aria-hidden="true" />
          <div className="dt-hero__glow dt-hero__glow--two" data-px-parallax="-55" aria-hidden="true" />
          <div className="af-container dt-hero__grid">
            <div className="dt-hero__copy">
              <nav className="dt-breadcrumb" aria-label="Breadcrumb" data-px-reveal>
                <Link to="/">Home</Link><span>/</span><Link to={detail.parentPath}>{detail.parentTitle}</Link><span>/</span><span aria-current="page">{detail.title}</span>
              </nav>
              <span className="px-kicker" data-px-reveal>{detail.eyebrow}</span>
              <h1 data-px-chars>{detail.title}</h1>
              <p className="dt-lead">{detail.summary}</p>
              <div className="dt-actions" data-px-reveal>
                <Link className="px-btn px-btn--primary" to={detail.parentPath}><span>{detail.nextStepLabel}</span><PublicIcon name="arrowRight" size={17} /></Link>
                <a className="px-btn px-btn--ghost" href="/request-consultation"><span>Request Consultation</span><PublicIcon name="arrowRight" size={17} /></a>
              </div>
            </div>
            <div className="dt-hero__visual" data-px-image-reveal>
              {isFallback ? <GeneratedVisual label={`${detail.title} detail`} tone="teal" /> : <CardVisual assetKey={detail.detailAssetKey} label={`${detail.title} detail`} priority />}
            </div>
          </div>
        </section>

        <Marquee />

        <section className="dt-section dt-section--light">
          <div className="af-container dt-reading-grid">
            <div className="dt-reading-grid__intro">
              <SectionLabel text="Why this matters" />
              <h2>{detail.title} in the Afyra Growth System.</h2>
            </div>
            <div className="dt-prose">
              {detail.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          </div>
        </section>

        <section className="dt-section dt-section--deep">
          <div className="af-container dt-balanced-grid">
            <div className="dt-balanced-grid__copy">
              <SectionLabel text="What it supports" />
              <h2>Clear Business Value, Connected to the Wider Journey.</h2>
              <p>Afyra does not sell activity for its own sake. The purpose of each component is to support visibility, trust, inquiries, professional positioning, conversion, authority or long-term growth.</p>
            </div>
            <div className="dt-highlight-list" data-px-stagger>
              {detail.highlights.map((item, index) => (
                <div className="dt-highlight-row" key={`${item}-${index}`}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <strong>{item}</strong>
                  <SemanticCardIcon assetKey={`${detail.assetKey}-${item}`} size={24} />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="dt-section dt-section--mint">
          <div className="af-container dt-system-flow">
            <div className="dt-system-flow__head">
              <SectionLabel text="Afyra framework" />
              <h2>Solutions → Strategy → Systems → Outcomes → Growth</h2>
              <p>Every detail remains part of a larger business system. This protects the agency positioning and keeps the client journey focused on outcomes instead of disconnected deliverables.</p>
            </div>
            <ol className="dt-system-flow__steps" data-px-stagger>
              {['Understand the business objective','Align positioning and audience','Connect the required digital touchpoints','Create a clear inquiry or conversion path','Manage for consistency and long-term value'].map((item, index) => <li key={item}><span>{index + 1}</span><strong>{item}</strong></li>)}
            </ol>
          </div>
        </section>

        <section className="dt-final">
          <div className="af-container dt-final__inner" data-px-image-reveal>
            <SectionLabel text={brand.tagline} />
            <h2>{detail.title}: Keep the Next Step Connected to Business Value.</h2>
            <p>{detail.summary}</p>
            <div className="dt-final__detail-grid" aria-label={`${detail.title} next-step context`}>
              <article>
                <span>Relevant context</span>
                <strong>{detail.parentTitle}</strong>
                <p>{detail.body[0]}</p>
              </article>
              <article>
                <span>What this supports</span>
                <ul>
                  {detail.highlights.slice(0, 4).map((item) => <li key={item}><PublicIcon name="check" size={14} />{item}</li>)}
                </ul>
              </article>
            </div>
            <p className="dt-final__support">Return to {detail.parentTitle} for the complete page context, or request a consultation to discuss how this area connects with your wider growth system.</p>
            <div className="dt-actions">
              <Link className="px-btn px-btn--primary" to={detail.parentPath}><span>{detail.nextStepLabel}</span><PublicIcon name="arrowRight" size={17} /></Link>
              <a className="px-btn px-btn--ghost" href="/request-consultation"><span>Request Consultation</span><PublicIcon name="arrowRight" size={17} /></a>
            </div>
          </div>
        </section>
      </main>
      <Footer fromServicePage />
      <ScrollTop />
    </div>
  )
}
