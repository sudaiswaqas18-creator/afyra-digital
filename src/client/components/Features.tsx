import { features } from '../data/content'
import { SectionHead } from './ui'

type FeatureItem = (typeof features.items)[number]

function VisibilityDisplay() {
  return (
    <div className="af-fv af-fv--chart af-fv--reference" data-af-feature-visual="visibility" aria-hidden="true">
      <div className="af-fv__metric-strip">
        <span><b>Search</b><small>Discovery</small></span>
        <span><b>Local</b><small>Visibility</small></span>
        <span><b>Social</b><small>Presence</small></span>
      </div>
      <div className="af-fv__chart-stage">
        <svg viewBox="0 0 560 210" preserveAspectRatio="none" className="af-fv__area">
          <g className="af-fv__grid" aria-hidden="true">
            <path d="M30 30H535M30 77H535M30 124H535M30 171H535" />
            <path d="M72 20V188M168 20V188M264 20V188M360 20V188M456 20V188" />
          </g>
          <path className="af-fv__line af-fv__line--alt" d="M34 156 C78 147 91 157 125 142 S183 111 221 124 S279 154 318 139 S386 103 424 116 S482 134 529 90" />
          <path className="af-fv__line af-fv__line--main" d="M34 168 C74 176 100 126 136 138 S190 113 226 104 S289 116 326 83 S385 91 427 61 S487 71 529 38" />
          <g className="af-fv__points">
            <circle cx="136" cy="138" r="4" />
            <circle cx="226" cy="104" r="4" />
            <circle cx="326" cy="83" r="4" />
            <circle cx="427" cy="61" r="4" />
            <circle cx="529" cy="38" r="5" />
          </g>
        </svg>
        <div className="af-fv__chart-marker">
          <span>Visibility</span>
          <i />
        </div>
      </div>
    </div>
  )
}

function TrustDisplay() {
  return (
    <div className="af-fv af-fv--trust af-fv--reference" data-af-feature-visual="trust" aria-hidden="true">
      <div className="af-fv__trust-particles">
        {Array.from({ length: 12 }, (_, i) => <i key={i} />)}
      </div>
      <div className="af-fv__trust-board">
        <div className="af-fv__board-top"><span /><span /><span /><b>Brand communication</b></div>
        <div className="af-fv__board-cols">
          <div className="af-fv__board-col">
            <strong>Education</strong>
            <span className="af-fv__board-card"><i />Patient guidance</span>
            <span className="af-fv__board-card"><i />Clear answers</span>
          </div>
          <div className="af-fv__board-col">
            <strong>Positioning</strong>
            <span className="af-fv__board-card is-active"><i />Professional voice</span>
            <span className="af-fv__board-card"><i />Consistent identity</span>
          </div>
          <div className="af-fv__board-col">
            <strong>Trust</strong>
            <span className="af-fv__board-card"><i />Credibility</span>
            <span className="af-fv__board-card"><i />Authority</span>
          </div>
        </div>
      </div>
      <div className="af-fv__trust-hub"><span>a</span><i /></div>
    </div>
  )
}

function InquiryDisplay() {
  return (
    <div className="af-fv af-fv--inquiry af-fv--reference" data-af-feature-visual="inquiries" aria-hidden="true">
      <svg className="af-fv__inquiry-links" viewBox="0 0 760 260" preserveAspectRatio="none">
        <path d="M210 130H292" />
        <path d="M468 130H548" />
      </svg>
      <div className="af-fv__donut-card">
        <span className="af-fv__display-label">Journey</span>
        <div className="af-fv__donut"><span>Inquiry</span></div>
        <div className="af-fv__donut-key"><i />Discover <i />Trust <i />Contact</div>
      </div>
      <div className="af-fv__inquiry-hub"><span>a</span><i /></div>
      <div className="af-fv__flow-card">
        <div className="af-fv__flow-head"><span>Connected journey</span><b>Live</b></div>
        <div className="af-fv__flow-row"><em>01</em><span>Discover</span><i /></div>
        <div className="af-fv__flow-row"><em>02</em><span>Build trust</span><i /></div>
        <div className="af-fv__flow-row is-hot"><em>03</em><span>Start inquiry</span><i /></div>
        <div className="af-fv__flow-row"><em>04</em><span>Appointment path</span><i /></div>
      </div>
    </div>
  )
}

function ManagedDisplay() {
  const nodes = [
    ['Strategy', 'ST'], ['Content', 'CT'], ['Local', 'LV'],
    ['Campaigns', 'CP'], ['Community', 'CM'], ['Reporting', 'RP']
  ]
  return (
    <div className="af-fv af-fv--managed af-fv--reference" data-af-feature-visual="managed" aria-hidden="true">
      <svg className="af-fv__managed-links" viewBox="0 0 540 300" preserveAspectRatio="none">
        <path d="M270 150H190Q166 150 166 126V68H103" />
        <path d="M270 150H190Q166 150 166 150H103" />
        <path d="M270 150H190Q166 150 166 174V232H103" />
        <path d="M270 150H350Q374 150 374 126V68H437" />
        <path d="M270 150H350Q374 150 374 150H437" />
        <path d="M270 150H350Q374 150 374 174V232H437" />
      </svg>
      <div className="af-fv__managed-hub"><span>a</span><i /></div>
      {nodes.map(([label, initials], i) => (
        <div className={`af-fv__managed-node af-fv__managed-node--${i + 1}`} key={label}>
          <b>{initials}</b><span>{label}</span>
        </div>
      ))}
      <span className="af-fv__managed-cone" />
    </div>
  )
}

function FeatureVisual({ item }: { item: FeatureItem }) {
  switch (item.id) {
    case 'visibility': return <VisibilityDisplay />
    case 'trust': return <TrustDisplay />
    case 'inquiries': return <InquiryDisplay />
    case 'managed': return <ManagedDisplay />
    default: return null
  }
}

export default function Features() {
  const [a, b, c, d] = features.items

  const Card = ({ item, className }: { item: FeatureItem; className: string }) => (
    <article className={`af-feat ${className}`} data-af-stagger-item data-af-feature-kind={item.id}>
      <div className="af-feat__glow" aria-hidden="true" />
      <div className="af-feat__body">
        <h4 className="af-h4 af-feat__title">{item.title}</h4>
        <p className="af-p af-p--sm af-feat__disc">{item.description}</p>
      </div>
      <div className="af-feat__visual af-feat__visual--motion">
        <FeatureVisual item={item} />
      </div>
    </article>
  )

  return (
    <section id="solutions" className="af-section af-features">
      <div className="af-features__bg" aria-hidden="true" />
      <div className="af-container">
        <SectionHead
          eyebrow={features.eyebrow}
          title={features.title}
          description={features.description}
        />

        <div className="af-features__wrap" data-af-stagger data-af-feature-reference>
          <div className="af-features__row af-features__row--1">
            <Card item={a} className="af-feat--a" />
            <Card item={b} className="af-feat--b" />
          </div>
          <div className="af-features__row af-features__row--2">
            <Card item={c} className="af-feat--c" />
            <Card item={d} className="af-feat--d" />
          </div>
        </div>
      </div>
    </section>
  )
}
