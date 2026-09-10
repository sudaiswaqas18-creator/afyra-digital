import { useState, type CSSProperties } from 'react'
import { faqs } from '../data/content'
import { Icon, SectionHead } from './ui'

const faqSparkles = [
  ['31%', '72px', '2px', '.15s'], ['34%', '52px', '3px', '.65s'], ['37%', '92px', '2px', '1.25s'],
  ['40%', '43px', '2px', '.95s'], ['42%', '76px', '4px', '1.55s'], ['44%', '57px', '2px', '.35s'],
  ['46%', '96px', '3px', '2.1s'], ['48%', '34px', '2px', '.8s'], ['49.5%', '65px', '3px', '1.35s'],
  ['51%', '48px', '4px', '.1s'], ['52.5%', '83px', '2px', '1.8s'], ['54%', '36px', '2px', '.55s'],
  ['56%', '70px', '3px', '1.15s'], ['58%', '98px', '2px', '2.3s'], ['60%', '49px', '3px', '.4s'],
  ['62.5%', '77px', '2px', '1.65s'], ['65%', '55px', '3px', '.9s'], ['68%', '87px', '2px', '2s']
] as const

export default function Faqs() {
  const [open, setOpen] = useState(0)

  return (
    <section id="faqs" className="af-section af-faq">
      <div className="af-faq__arc" aria-hidden="true" data-af-faq-arc>
        <span className="af-faq__arc-glow" />
        <span className="af-faq__arc-halo" />
        <span className="af-faq__arc-beam" />
        <svg viewBox="0 0 1400 230" preserveAspectRatio="none" className="af-faq__arc-line">
          <defs>
            <linearGradient id="afArcV46" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#00BBA0" stopOpacity="0" />
              <stop offset="20%" stopColor="#00BBA0" stopOpacity=".55" />
              <stop offset="48%" stopColor="#DEF1F0" stopOpacity=".95" />
              <stop offset="52%" stopColor="#00BBA0" stopOpacity="1" />
              <stop offset="80%" stopColor="#00BBA0" stopOpacity=".55" />
              <stop offset="100%" stopColor="#00BBA0" stopOpacity="0" />
            </linearGradient>
            <filter id="afArcGlowV46" x="-20%" y="-80%" width="140%" height="260%">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>
          <path className="af-faq__arc-stroke af-faq__arc-stroke--glow" d="M0 205 Q700 -44 1400 205" fill="none" stroke="url(#afArcV46)" strokeWidth="10" opacity=".18" filter="url(#afArcGlowV46)" />
          <path className="af-faq__arc-stroke af-faq__arc-stroke--core" d="M0 205 Q700 -44 1400 205" fill="none" stroke="url(#afArcV46)" strokeWidth="2.2" filter="url(#afArcGlowV46)" />
        </svg>
        <div className="af-faq__spark-field">
          {faqSparkles.map(([left, top, size, delay], index) => (
            <span
              className={`af-faq__spark ${index === 9 ? 'af-faq__spark--amber' : ''}`}
              key={`${left}-${top}`}
              style={{ '--af-spark-x': left, '--af-spark-y': top, '--af-spark-size': size, '--af-spark-delay': delay } as CSSProperties}
            />
          ))}
        </div>
      </div>

      <div className="af-container af-container--narrow">
        <SectionHead
          eyebrow={faqs.eyebrow}
          title={faqs.title}
          description={faqs.description}
        />

        <div className="af-faq__wrap" data-af-stagger>
          {faqs.items.map((item, i) => {
            const isOpen = open === i
            return (
              <div
                className={`af-faq__item ${isOpen ? 'is-open' : ''}`}
                key={item.q}
                data-af-stagger-item
              >
                <button
                  className="af-faq__q"
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                >
                  <span>{item.q}</span>
                  <span className="af-faq__chev">{Icon.chevron({ size: 19 })}</span>
                </button>
                <div className="af-faq__a" style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}>
                  <div className="af-faq__a-inner">
                    <p className="af-p af-p--sm">{item.a}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
