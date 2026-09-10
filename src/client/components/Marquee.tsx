import { capabilities } from '../data/content'
import { Icon } from './ui'

export default function Marquee() {
  const row = [...capabilities, ...capabilities]

  return (
    <section className="af-section af-marquee">
      <div className="af-container">
        <h3 className="af-marquee__title af-reveal">
          Strategy, content, visibility and conversion — managed as one growth system
        </h3>
      </div>
      <div className="af-marquee__wrap">
        <div className="af-marquee__track">
          {row.map((item, i) => (
            <span className="af-marquee__item" key={`${item}-${i}`}>
              <span className="af-marquee__ico">{Icon.spark({ size: 13 })}</span>
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
