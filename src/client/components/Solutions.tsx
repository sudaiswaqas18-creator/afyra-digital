import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { solutions as fallbackSolutions, audience } from '../data/content'
import { Eyebrow, Icon } from './ui'
import GeneratedVisual from './GeneratedVisual'
import { apiGetSolutions } from '../lib/api'
import { useHomeSection } from '../lib/liveContent'

export default function Solutions() {
  const solutions = fallbackSolutions
  const [items, setItems] = useState(fallbackSolutions.items)
  const { section: audienceSection } = useHomeSection('audience')
  const liveAudience = audienceSection ? {
    title: audienceSection.title || audience.title,
    description: audienceSection.description || audience.description,
    items: (audienceSection.items || []).map((item, index) => ({
      label: item.title || item.label || '',
      icon: (item.icon || audience.items[index]?.icon || 'doctor') as keyof typeof Icon
    }))
  } : audience

  useEffect(() => {
    let isMounted = true
    apiGetSolutions('home')
      .then((res) => {
        if (isMounted && res?.ok && Array.isArray(res.data)) {
          const mapped = res.data.map((s: any) => {
            const fallback = fallbackSolutions.items.find((item) => item.href.endsWith(`/${s.slug}`))
            return {
              icon: fallback?.icon || 'star',
              title: s.title || s.name,
              href: `/solutions/${s.slug}`,
              description: s.description
            }
          })
          setItems(mapped)
        }
      })
      .catch((error) => console.warn('[Afyra API] Solutions unavailable; using bundled fallback.', error))
    return () => {
      isMounted = false
    }
  }, [])

  return (
    <section className="af-section af-pillars">
      <div className="af-pillars__shape af-pillars__shape--l" data-af-breathe aria-hidden="true" />
      <div className="af-pillars__shape af-pillars__shape--r" data-af-breathe aria-hidden="true" />

      <div className="af-container">
        <div className="af-sec-head af-text-center">
          <Eyebrow tag={solutions.eyebrow.tag} text={solutions.eyebrow.text} />
          <h2 className="af-h2 af-split">{solutions.title}</h2>
        </div>

        <div className="af-pillars__grid" data-af-stagger>
          {items.map((item, index) => {
            const Ico = Icon[item.icon as keyof typeof Icon] || Icon.star
            return (
              <Link
                className="af-pillar af-pillar--link"
                key={item.title}
                to={item.href}
                data-af-stagger-item
                aria-label={`Explore ${item.title}`}
              >
                <GeneratedVisual label={item.title} tone={(['deep','mint','teal','warm'][index % 4] as 'deep'|'mint'|'teal'|'warm')} compact className="af-pillar__ai" />
                <div className="af-pillar__icon">
                  <span className="af-pillar__icon-inner">{Ico ? Ico({ size: 24 }) : null}</span>
                  <span className="af-pillar__icon-glow" aria-hidden="true" />
                </div>
                <h4 className="af-h4 af-pillar__title"><span className="af-pillar__title-text">{item.title}</span></h4>
                <p className="af-p af-p--sm af-pillar__disc">{item.description}</p>
                <span className="af-pillar__corner af-pillar__corner--tl" aria-hidden="true" />
                <span className="af-pillar__corner af-pillar__corner--br" aria-hidden="true" />
              </Link>
            )
          })}
        </div>

        {/* who we help */}
        <div className="af-audience af-reveal">
          <div className="af-audience__head">
            <h3 className="af-h3">{liveAudience.title}</h3>
            <p className="af-p af-p--sm">{liveAudience.description}</p>
          </div>
          <div className="af-audience__list">
            {liveAudience.items.map((a) => {
              const Ico = Icon[a.icon]
              return (
                <span className="af-audience__item" key={a.label}>
                  <span className="af-audience__ico">{Ico ? Ico({ size: 22 }) : null}</span>
                  {a.label}
                </span>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
