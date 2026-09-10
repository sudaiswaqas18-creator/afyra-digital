import { hero } from '../data/content'
import { Button, Eyebrow, Icon } from './ui'
import HeroParallaxDashboard from './HeroParallaxDashboard'

export default function Hero() {
  return (
    <section id="home" className="af-section af-hero">
      {/* background layers */}
      <div className="af-hero__grid" aria-hidden="true" />
      <div className="af-hero__shape af-hero__shape--l" data-af-breathe aria-hidden="true" />
      <div className="af-hero__shape af-hero__shape--r" data-af-breathe aria-hidden="true" />
      <div className="af-hero__noise" aria-hidden="true" />

      <div className="af-container">
        <div className="af-hero__content af-text-center">
          <Eyebrow tag={hero.eyebrow.tag} text={hero.eyebrow.text} />
          <h1 className="af-h1 af-hero__title af-split">{hero.title}</h1>
          <p className="af-p af-hero__disc af-reveal" data-af-delay="0.2">
            {hero.description}
          </p>
          <div className="af-hero__btns af-reveal" data-af-delay="0.35">
            <Button href={hero.primaryCta.href} label={hero.primaryCta.label} variant="primary" />
            <Button
              href={hero.secondaryCta.href}
              label={hero.secondaryCta.label}
              variant="ghost"
              icon={Icon.arrowRight()}
            />
          </div>
        </div>

        {/* SaaS King-inspired layered dashboard parallax; Afyra content/colors preserved */}
        <div className="af-hero__stage">
          <HeroParallaxDashboard />
        </div>
      </div>
    </section>
  )
}
