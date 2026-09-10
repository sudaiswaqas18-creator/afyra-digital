import { useState, type CSSProperties } from 'react'
import { programs } from '../data/content'
import { Button, Eyebrow, Icon } from './ui'

type OrbitTone = 'teal' | 'mint' | 'violet' | 'warm' | 'olive' | 'deep'
type OrbitIconName =
  | 'facebook'
  | 'instagram'
  | 'whatsapp'
  | 'search'
  | 'website'
  | 'content'
  | 'reels'
  | 'reports'
  | 'strategy'
  | 'brand'

const capabilityOrbit: Array<{ label: string; icon: OrbitIconName; tone: OrbitTone }> = [
  { label: 'Facebook', icon: 'facebook', tone: 'teal' },
  { label: 'Instagram', icon: 'instagram', tone: 'violet' },
  { label: 'WhatsApp', icon: 'whatsapp', tone: 'mint' },
  { label: 'SEO', icon: 'search', tone: 'deep' },
  { label: 'Website', icon: 'website', tone: 'warm' },
  { label: 'Content', icon: 'content', tone: 'olive' },
  { label: 'Reels', icon: 'reels', tone: 'teal' },
  { label: 'Reports', icon: 'reports', tone: 'deep' },
  { label: 'Strategy', icon: 'strategy', tone: 'warm' },
  { label: 'Brand', icon: 'brand', tone: 'violet' }
]

export default function Programs() {
  const [active, setActive] = useState(1) // Patient Growth Plan (Most Popular)
  const plan = programs.plans[active]
  const PlanIcon = Icon[plan.icon]

  return (
    <section id="programs" className="af-section af-price">
      {/* top beam, mirroring the reference's light column */}
      <div className="af-price__beam" aria-hidden="true">
        <span className="af-price__beam-core" />
        <span className="af-price__beam-traveler" />
        <span className="af-price__beam-impact" />
        <span className="af-price__beam-glow" data-af-breathe />
      </div>
      <div className="af-price__mark" aria-hidden="true">
        <img src="/static/img/logo-mark-tight.png" alt="" />
      </div>

      <div className="af-container">
        <div className="af-price__wrap af-reveal">
          {/* ---------- left column ---------- */}
          <div className="af-price__left">
            <div className="af-price__head">
              <Eyebrow tag={programs.eyebrow.tag} text={programs.eyebrow.text} />
              <h2 className="af-h2">{programs.title}</h2>
              <p className="af-p af-price__disc">{programs.description}</p>
            </div>

            {/* SaaSking-style rotating app orbit */}
            <div className="af-price__ring" data-af-pricing-orbit>
              <div className="af-price__ring-track" data-af-pricing-orbit-track>
                {capabilityOrbit.map((capability, i) => {
                  const OrbitIcon = Icon[capability.icon]
                  return (
                    <span
                      className="af-price__ring-slot"
                      style={{ '--af-angle': `${i * 36}deg` } as CSSProperties}
                      key={capability.label}
                    >
                      <span
                        className={`af-price__ring-card af-price__ring-card--${capability.tone}`}
                        data-af-pricing-orbit-card
                        aria-hidden="true"
                      >
                        <span className="af-price__ring-card-glow" aria-hidden="true" />
                        <span className="af-price__ring-icon">{OrbitIcon ? OrbitIcon({ size: 28 }) : null}</span>
                      </span>
                    </span>
                  )
                })}
              </div>
              <div className="af-price__ring-center">
                <h3 className="af-h4">One Managed Growth System</h3>
                <p className="af-p af-p--sm">
                  Every program bundles strategy, production, publishing and reporting into a single
                  accountable engagement.
                </p>
              </div>
            </div>

            {/* program terms */}
            <ul className="af-price__terms">
              {programs.terms.map((t) => (
                <li key={t}>
                  <span className="af-price__terms-ico">{Icon.check({ size: 12 })}</span>
                  {t}
                </li>
              ))}
            </ul>
          </div>

          {/* ---------- right column ---------- */}
          <div className="af-price__right">
            <div className="af-price__switch" role="tablist" aria-label="Choose a program">
              {programs.plans.map((p, i) => (
                <button
                  key={p.id}
                  role="tab"
                  aria-selected={i === active}
                  className={`af-price__switch-btn ${i === active ? 'is-active' : ''}`}
                  onClick={() => setActive(i)}
                >
                  {p.name.split(' ')[0]}
                </button>
              ))}
            </div>

            <div className="af-price__card" key={plan.id}>
              <div className="af-price__card-head">
                <div className="af-price__card-left">
                  <p className="af-price__card-name">
                    <span className="af-price__card-ico">
                      {PlanIcon ? PlanIcon({ size: 19 }) : null}
                    </span>
                    {plan.name}
                  </p>
                  <h3 className="af-price__amount">
                    <span className="af-price__cur">{programs.currency}</span>
                    {plan.price.toLocaleString()}
                    <span className="af-price__per">/ month</span>
                  </h3>
                  <p className="af-price__purpose">{plan.purpose}</p>
                </div>
                {plan.popular ? <span className="af-price__tag">Most Popular</span> : null}
              </div>

              <div className="af-price__card-body">
                <span className="af-price__card-shape" aria-hidden="true" />
                <p className="af-price__platforms">
                  <span>Platforms</span>
                  {plan.platforms}
                </p>

                <ul className="af-price__features">
                  {plan.includes.map((f) => (
                    <li key={f}>
                      <span className="af-price__feat-ico">{Icon.check({ size: 14 })}</span>
                      {f}
                    </li>
                  ))}
                </ul>

                <div className="af-price__best">
                  <p className="af-price__best-title">Best for</p>
                  <div className="af-price__best-list">
                    {plan.bestFor.map((b) => (
                      <span key={b}>{b}</span>
                    ))}
                  </div>
                </div>

                <Button href="#contact" label="Request This Program" variant="primary" block />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
