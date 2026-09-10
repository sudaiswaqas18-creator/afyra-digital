import { Link } from 'react-router-dom'
import { solutions, audience } from '../data/content'
import { Eyebrow, Icon } from './ui'
import GeneratedVisual from './GeneratedVisual'

export default function Solutions() {
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
          {solutions.items.map((item, index) => {
            const Ico = Icon[item.icon]
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
            <h3 className="af-h3">{audience.title}</h3>
            <p className="af-p af-p--sm">{audience.description}</p>
          </div>
          <div className="af-audience__list">
            {audience.items.map((a) => {
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
