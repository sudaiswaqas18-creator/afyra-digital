import { whyAfyra } from '../data/content'
import { useHomeSection } from '../lib/liveContent'
import { Eyebrow, Icon } from './ui'

export default function WhyAfyra() {
  const { section } = useHomeSection('why_afyra')
  const content = section ? {
    eyebrow: { tag: section.eyebrow_tag || whyAfyra.eyebrow.tag, text: section.eyebrow_text || whyAfyra.eyebrow.text },
    title: section.title || whyAfyra.title,
    columns: [
      { heading: 'What we focus on', tone: 'positive' as const, items: (section.items || []).filter((item) => item.group_key === 'focus').map((item) => item.title || item.label || '') },
      { heading: 'What we avoid', tone: 'negative' as const, items: (section.items || []).filter((item) => item.group_key === 'avoid').map((item) => item.title || item.label || '') }
    ]
  } : whyAfyra
  return (
    <section id="why-afyra" className="af-section af-why">
      <div className="af-why__glow" data-af-breathe aria-hidden="true" />
      <div className="af-container">
        <div className="af-sec-head af-text-center">
          <Eyebrow tag={content.eyebrow.tag} text={content.eyebrow.text} />
          <h2 className="af-h2 af-split">{content.title}</h2>
        </div>

        <div className="af-why__grid" data-af-stagger>
          {content.columns.map((col) => (
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
