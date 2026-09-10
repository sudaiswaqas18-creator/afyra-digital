import { whyAfyra } from '../data/content'
import { Eyebrow, Icon } from './ui'

export default function WhyAfyra() {
  return (
    <section id="why-afyra" className="af-section af-why">
      <div className="af-why__glow" data-af-breathe aria-hidden="true" />
      <div className="af-container">
        <div className="af-sec-head af-text-center">
          <Eyebrow tag={whyAfyra.eyebrow.tag} text={whyAfyra.eyebrow.text} />
          <h2 className="af-h2 af-split">{whyAfyra.title}</h2>
        </div>

        <div className="af-why__grid" data-af-stagger>
          {whyAfyra.columns.map((col) => (
            <div
              className={`af-why__card af-why__card--${col.tone}`}
              key={col.heading}
              data-af-stagger-item
            >
              <h4 className="af-h4 af-why__card-title">{col.heading}</h4>
              <ul className="af-why__list">
                {col.items.map((it) => (
                  <li key={it}>
                    <span className="af-why__ico">
                      {col.tone === 'positive' ? Icon.check({ size: 15 }) : Icon.cross({ size: 15 })}
                    </span>
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* positioning statement */}
        <div className="af-why__quote af-reveal">
          <span className="af-why__quote-ico">{Icon.quote({ size: 40 })}</span>
          <p className="af-why__quote-text">
            Afyra Digital = <strong>Agency + Strategy + Systems + Growth + Results.</strong>
          </p>
          <p className="af-p af-p--sm af-why__quote-sub">
            We build and manage the digital system your business needs to grow — not isolated
            marketing tasks.
          </p>
        </div>
      </div>
    </section>
  )
}
