import { useState, type CSSProperties } from 'react'
import { faqs } from '../data/content'
import { useHomeSection } from '../lib/liveContent'
import { useScopedFaqs } from '../lib/useScopedFaqs'
import { Icon, SectionHead } from './ui'

const faqSparkles = [
  ['30%', '24px', '2px', '.15s'], ['33%', '14px', '3px', '.65s'], ['36%', '22px', '2px', '1.25s'],
  ['39%', '10px', '2.5px', '.95s'], ['42%', '18px', '3.5px', '1.55s'], ['44%', '8px', '2px', '.35s'],
  ['46%', '16px', '3px', '2.1s'], ['48%', '4px', '2px', '.8s'], ['49.5%', '12px', '3.5px', '1.35s'],
  ['51%', '6px', '4px', '.1s'], ['52.5%', '15px', '2px', '1.8s'], ['54%', '5px', '2px', '.55s'],
  ['56%', '14px', '3px', '1.15s'], ['58%', '18px', '2px', '2.3s'], ['60%', '11px', '3px', '.4s'],
  ['63%', '20px', '2px', '1.65s'], ['66%', '15px', '3px', '.9s'], ['69%', '26px', '2px', '2s']
] as const

export default function Faqs() {
  const [open, setOpen] = useState(0)
  const { section } = useHomeSection('faqs')
  const scopedItems = useScopedFaqs(faqs.items, 'home')
  const content = section ? {
    eyebrow: { tag: section.eyebrow_tag || faqs.eyebrow.tag, text: section.eyebrow_text || faqs.eyebrow.text },
    title: section.title || faqs.title,
    description: section.description || faqs.description,
    items: scopedItems
  } : { ...faqs, items: scopedItems }

  return (
    <section id="faqs" className="af-section af-faq">
      <div className="af-faq__arc" aria-hidden="true" data-af-faq-arc>
        <span className="af-faq__arc-glow" />
        <span className="af-faq__arc-halo" />
        <span className="af-faq__arc-beam" />
        <div className="af-faq__spark-field">
          {faqSparkles.map(([left, top, size, delay], index) => (
            <span
              className={`af-faq__spark ${index === 9 ? 'af-faq__spark--amber' : ''}`}
              key={`${left}-${top}`}
              style={{ '--af-spark-x': left, '--af-spark-y': top, '--af-spark-size': size, '--af-spark-delay': delay } as CSSProperties}
            />
          ))}
        </div>
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
          {/* Solid background covering the BACK side (Process section above the arch) */}
          <path d="M -20 205 Q 700 -44 1420 205 L 1420 -300 L -20 -300 Z" fill="#03110f" />
          <path className="af-faq__arc-stroke af-faq__arc-stroke--glow" d="M0 205 Q700 -44 1400 205" fill="none" stroke="url(#afArcV46)" strokeWidth="10" opacity=".24" filter="url(#afArcGlowV46)" />
          <path className="af-faq__arc-stroke af-faq__arc-stroke--core" d="M0 205 Q700 -44 1400 205" fill="none" stroke="url(#afArcV46)" strokeWidth="2.2" filter="url(#afArcGlowV46)" />
        </svg>
      </div>

      <div className="af-container af-container--narrow">
        <SectionHead
          eyebrow={content.eyebrow}
          title={content.title}
          description={content.description}
        />

        <div className="af-faq__wrap" data-af-stagger>
          {content.items.map((item, i) => {
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
