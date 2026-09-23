import { useState, useEffect, type CSSProperties } from 'react'
import { programs as fallbackPrograms } from '../data/content'
import { apiGetPrograms } from '../lib/api'
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
  const programs = fallbackPrograms
  const [active, setActive] = useState(1) // Patient Growth Plan (Most Popular)
  const [plans, setPlans] = useState<any[]>(fallbackPrograms.plans)
  const [terms, setTerms] = useState<string[]>(fallbackPrograms.terms)

  useEffect(() => {
    apiGetPrograms('home')
      .then((res) => {
        if (res?.ok && Array.isArray(res?.data?.plans)) {
          const mappedPlans = res.data.plans.map((p: any) => ({
            ...p,
            icon: p.icon || 'seed',
            popular: Boolean(p.is_popular !== undefined ? p.is_popular : p.popular),
            bestFor: p.bestFor || [],
            includes: p.includes || []
          }))
          setPlans(mappedPlans)
          setActive((current) => mappedPlans.length === 0 ? 0 : Math.min(current, mappedPlans.length - 1))
        }
        if (res?.ok && Array.isArray(res?.data?.terms)) {
          setTerms(res.data.terms.map((term: any) => typeof term === 'string' ? term : term.label).filter(Boolean))
        }
      })
      .catch((error) => console.warn('[Afyra API] Programs unavailable; using bundled fallback.', error))
  }, [])

  const plan = plans[active] || plans[0]
  const PlanIcon = plan ? ((Icon as any)[plan.icon] || Icon.seed) : Icon.seed

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
        {Icon.spark({ size: 30 })}
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
                      className="af-price__orbit-item"
                      data-af-orbit-index={i}
                      style={{ '--af-angle': `${i * 36}deg` } as CSSProperties}
                      key={capability.label}
                    >
                      <span
                        className={`af-price__ring-card af-price__ring-card--${capability.tone}`}
                        data-af-pricing-orbit-card
                        aria-hidden="true"
                      >
                        <span className="af-price__ring-card-glow" aria-hidden="true" />
                        <span className="af-price__ring-icon">{OrbitIcon ? OrbitIcon({ size: 34 }) : null}</span>
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
              {terms.map((t) => (
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
              {plans.map((p, i) => (
                <button
                  key={p.id || p.slug}
                  role="tab"
                  aria-selected={i === active}
                  className={`af-price__switch-btn ${i === active ? 'is-active' : ''}`}
                  onClick={() => setActive(i)}
                >
                  {p.name.split(' ')[0]}
                </button>
              ))}
            </div>

            {plan ? <div className="af-price__card" data-af-price-card>
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
                  {plan.includes.map((f: string) => (
                    <li key={f}>
                      <span className="af-price__feat-ico">{Icon.check({ size: 14 })}</span>
                      {f}
                    </li>
                  ))}
                </ul>

                <div className="af-price__best">
                  <p className="af-price__best-title">Best for</p>
                  <div className="af-price__best-list">
                    {plan.bestFor.map((b: string) => (
                      <span key={b}>{b}</span>
                    ))}
                  </div>
                </div>

                <Button href="#contact" label="Request This Program" variant="primary" block />
              </div>
            </div> : <div className="af-price__card"><p className="af-p">No published programs are currently available.</p></div>}
          </div>
        </div>
      </div>
    </section>
  )
}
