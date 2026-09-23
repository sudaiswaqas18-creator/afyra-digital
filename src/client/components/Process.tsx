import { useLayoutEffect, useRef, useState } from 'react'
import { process } from '../data/content'
import { useHomeSection } from '../lib/liveContent'
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
  const wrapRef = useRef<HTMLDivElement | null>(null)
  const hubRef = useRef<HTMLDivElement | null>(null)

  const [wirePaths, setWirePaths] = useState<{
    w0: string
    w1: string
    w2: string
    w3: string
    viewBox: string
  }>({
    w0: 'M 220 130 L 170 130 Q 145 130 145 105 L 145 95 Q 145 70 120 70 L 0 70',
    w1: 'M 220 190 L 170 190 Q 145 190 145 215 L 145 225 Q 145 250 120 250 L 0 250',
    w2: 'M 300 130 L 350 130 Q 375 130 375 105 L 375 95 Q 375 70 400 70 L 520 70',
    w3: 'M 300 190 L 350 190 Q 375 190 375 215 L 375 225 Q 375 250 400 250 L 520 250',
    viewBox: '0 0 520 320'
  })

  useLayoutEffect(() => {
    const wrap = wrapRef.current
    const hub = hubRef.current
    if (!wrap || !hub) return

    const updateWires = () => {
      const wrapRect = wrap.getBoundingClientRect()
      if (!wrapRect.width || !wrapRect.height) return

      const pins = Array.from(wrap.querySelectorAll<HTMLElement>('.af-proc__pin'))
      if (pins.length < 4) return

      const hubRing = hub.querySelector<HTMLElement>('.af-proc__hub-ring') || hub
      const ringRect = hubRing.getBoundingClientRect()

      const hubLeft = ringRect.left - wrapRect.left
      const hubRight = ringRect.right - wrapRect.left
      const hubTopY = ringRect.top + ringRect.height * 0.32 - wrapRect.top
      const hubBottomY = ringRect.top + ringRect.height * 0.68 - wrapRect.top

      const getPinCenter = (el: HTMLElement) => {
        const r = el.getBoundingClientRect()
        return {
          x: r.left + r.width / 2 - wrapRect.left,
          y: r.top + r.height / 2 - wrapRect.top
        }
      }

      const p0 = getPinCenter(pins[0])
      const p1 = getPinCenter(pins[1])
      const p2 = getPinCenter(pins[2])
      const p3 = getPinCenter(pins[3])

      const makeWire = (x1: number, y1: number, x2: number, y2: number, dir: 'left' | 'right') => {
        const midX = (x1 + x2) / 2
        const r = Math.max(8, Math.min(28, Math.abs(midX - x1) * 0.45, Math.abs(y2 - y1) * 0.45))
        const dy = y2 > y1 ? 1 : -1
        const dx = dir === 'left' ? -1 : 1
        return `M ${x1} ${y1} ` +
               `L ${midX - dx * r} ${y1} ` +
               `Q ${midX} ${y1} ${midX} ${y1 + dy * r} ` +
               `L ${midX} ${y2 - dy * r} ` +
               `Q ${midX} ${y2} ${midX + dx * r} ${y2} ` +
               `L ${x2} ${y2}`
      }

      setWirePaths({
        w0: makeWire(hubLeft, hubTopY, p0.x, p0.y, 'left'),
        w1: makeWire(hubLeft, hubBottomY, p1.x, p1.y, 'left'),
        w2: makeWire(hubRight, hubTopY, p2.x, p2.y, 'right'),
        w3: makeWire(hubRight, hubBottomY, p3.x, p3.y, 'right'),
        viewBox: `0 0 ${Math.round(wrapRect.width)} ${Math.round(wrapRect.height)}`
      })
    }

    updateWires()

    let ro: ResizeObserver | null = null
    if (typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(updateWires)
      ro.observe(wrap)
      wrap.querySelectorAll<HTMLElement>('[data-af-process-card]').forEach((c) => ro?.observe(c))
    }
    window.addEventListener('resize', updateWires)
    ;(document as Document & { fonts?: FontFaceSet }).fonts?.ready?.then(updateWires).catch(() => undefined)

    return () => {
      ro?.disconnect()
      window.removeEventListener('resize', updateWires)
    }
  }, [])

  const Step = ({ step, side, index }: { step?: ProcessStep; side: 'left' | 'right'; index: number }) => {
    if (!step) return null
    return (
    <div
      className={`af-proc__item af-proc__item--${side}`}
      data-af-stagger-item={enableStagger ? true : undefined}
      data-af-process-card
      data-af-process-index={index}
      {...(cardData?.(index) || {})}
    >
      <span className="af-proc__pin" aria-hidden="true" />
      <span className="af-proc__num" aria-hidden="true">{step.number}</span>
      <div className="af-proc__card-copy">
        <h4 className="af-h4 af-proc__title">{step.title}</h4>
        <p className="af-p af-p--sm af-proc__disc">{step.description}</p>
      </div>
    </div>
    )
  }

  return (
    <section id={id} className={`af-section af-proc ${className}`.trim()} {...(sectionData || {})}>
      <div className={`af-container ${containerClassName}`.trim()} {...(containerData || {})}>
        <SectionHead eyebrow={eyebrow} title={title} description={description} />

        <div className="af-proc__wrap" ref={wrapRef} data-af-stagger={enableStagger ? true : undefined}>
          <div className="af-proc__col">
            <Step step={s1} side="left" index={0} />
            <Step step={s2} side="left" index={1} />
          </div>

          <div className="af-proc__hub af-reveal" ref={hubRef} data-af-from="none">
            <div className="af-proc__hub-glow" data-af-breathe aria-hidden="true" />
            <div className="af-proc__hub-ring">
              <div className="af-proc__hub-core">
                <img src="/static/img/logo-mark-tight.png" alt="Afyra Digital" />
              </div>
            </div>
          </div>

          <div className="af-proc__col">
            <Step step={s3} side="right" index={2} />
            <Step step={s4} side="right" index={3} />
          </div>

          <svg className="af-proc__lines" viewBox={wirePaths.viewBox} preserveAspectRatio="none" aria-hidden="true">
            <defs>
              <linearGradient id="afProcWireGradLeft" x1="1" y1="0" x2="0" y2="0">
                <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.8" />
                <stop offset="45%" stopColor="#00BBA0" stopOpacity="0.75" />
                <stop offset="100%" stopColor="#00BBA0" stopOpacity="0.5" />
              </linearGradient>
              <linearGradient id="afProcWireGradRight" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.8" />
                <stop offset="45%" stopColor="#00BBA0" stopOpacity="0.75" />
                <stop offset="100%" stopColor="#00BBA0" stopOpacity="0.5" />
              </linearGradient>
            </defs>
            <g fill="none" strokeWidth="1.8">
              <path stroke="url(#afProcWireGradLeft)" d={wirePaths.w0} />
              <path stroke="url(#afProcWireGradLeft)" d={wirePaths.w1} />
              <path stroke="url(#afProcWireGradRight)" d={wirePaths.w2} />
              <path stroke="url(#afProcWireGradRight)" d={wirePaths.w3} />
            </g>
          </svg>
        </div>
      </div>
    </section>
  )
}

export default function Process() {
  const { section } = useHomeSection('process')
  const content = section ? {
    eyebrow: { tag: section.eyebrow_tag || process.eyebrow.tag, text: section.eyebrow_text || process.eyebrow.text },
    title: section.title || process.title,
    description: section.description || process.description,
    steps: (section.items || []).map((item, index) => ({
      number: item.label || String(index + 1),
      title: item.title || '',
      description: item.description || ''
    }))
  } : process

  return (
    <ProcessLayout
      id="process"
      steps={content.steps}
      eyebrow={content.eyebrow}
      title={content.title}
      description={content.description}
    />
  )
}
