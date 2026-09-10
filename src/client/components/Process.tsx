import { process } from '../data/content'
import { SectionHead } from './ui'

type ProcessStep = {
  number: string
  title: string
  description: string
}

type DataAttrs = Record<string, string | number | boolean | undefined>

type ProcessLayoutProps = {
  steps: readonly ProcessStep[]
  eyebrow: { tag: string; text: string }
  title: string
  description?: string
  id?: string
  className?: string
  containerClassName?: string
  sectionData?: DataAttrs
  containerData?: DataAttrs
  cardData?: (index: number) => DataAttrs
  enableStagger?: boolean
}

export function ProcessLayout({
  steps,
  eyebrow,
  title,
  description,
  id,
  className = '',
  containerClassName = '',
  sectionData,
  containerData,
  cardData,
  enableStagger = true
}: ProcessLayoutProps) {
  const [s1, s2, s3, s4] = steps

  const Step = ({ step, side, index }: { step: ProcessStep; side: 'left' | 'right'; index: number }) => (
    <div
      className={`af-proc__item af-proc__item--${side}`}
      data-af-stagger-item={enableStagger ? true : undefined}
      data-af-process-card
      data-af-process-index={index}
      {...(cardData?.(index) || {})}
    >
      <h3 className="af-proc__num" aria-hidden="true">{step.number}</h3>
      <h4 className="af-h4 af-proc__title">{step.title}</h4>
      <p className="af-p af-p--sm af-proc__disc">{step.description}</p>
    </div>
  )

  return (
    <section id={id} className={`af-section af-proc ${className}`.trim()} {...(sectionData || {})}>
      <div className={`af-container ${containerClassName}`.trim()} {...(containerData || {})}>
        <SectionHead eyebrow={eyebrow} title={title} description={description} />

        <div className="af-proc__wrap" data-af-stagger={enableStagger ? true : undefined}>
          <div className="af-proc__col">
            <Step step={s1} side="left" index={0} />
            <Step step={s2} side="left" index={1} />
          </div>

          <div className="af-proc__hub af-reveal" data-af-from="none">
            <div className="af-proc__hub-glow" data-af-breathe aria-hidden="true" />
            <div className="af-proc__hub-ring">
              <div className="af-proc__hub-core">
                <img src="/static/img/logo-mark-tight.png" alt="Afyra Digital" />
              </div>
            </div>
            <svg className="af-proc__lines" viewBox="0 0 420 300" aria-hidden="true">
              <g fill="none" stroke="rgba(0,187,160,.4)" strokeWidth="1.4">
                <path d="M210 118 L210 92 Q210 78 196 78 L20 78" />
                <path d="M210 182 L210 208 Q210 222 196 222 L20 222" />
                <path d="M210 118 L210 92 Q210 78 224 78 L400 78" />
                <path d="M210 182 L210 208 Q210 222 224 222 L400 222" />
              </g>
              <g fill="#FF960D">
                <circle cx="20" cy="78" r="3.4" />
                <circle cx="20" cy="222" r="3.4" />
                <circle cx="400" cy="78" r="3.4" />
                <circle cx="400" cy="222" r="3.4" />
              </g>
            </svg>
          </div>

          <div className="af-proc__col">
            <Step step={s3} side="right" index={2} />
            <Step step={s4} side="right" index={3} />
          </div>
        </div>
      </div>
    </section>
  )
}

export default function Process() {
  return (
    <ProcessLayout
      id="process"
      steps={process.steps}
      eyebrow={process.eyebrow}
      title={process.title}
      description={process.description}
    />
  )
}
