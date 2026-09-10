type VisualTone = 'mint' | 'deep' | 'teal' | 'warm'

type Props = {
  label: string
  tone?: VisualTone
  compact?: boolean
  className?: string
  priority?: boolean
}

const EXACT_VISUALS: Record<string, string> = {
  'Digital Growth & Marketing Strategy': '/generated/cards/solutions-service-digital-growth-marketing-strategy.webp',
  'Social Media & Brand Management': '/generated/cards/solutions-service-social-media-community-lead-communication.webp',
  'Social Media, Community & Lead Communication': '/generated/cards/solutions-service-social-media-community-lead-communication.webp',
  'Patient Acquisition & Lead Generation': '/generated/cards/solutions-service-patient-acquisition-lead-generation.webp',
  'Search & Local Visibility': '/generated/cards/healthcare-need-local-discovery.webp',
  'Website Development': '/generated/cards/solutions-service-website-development.webp',
  'Brand & Digital Presence': '/generated/cards/solutions-service-digital-presence-advanced-systems.webp',
  'Digital Presence / Advanced Digital Systems': '/generated/cards/solutions-service-digital-presence-advanced-systems.webp',
  'Content & Creative Communication': '/generated/cards/brand-creative-communication-showcase-creative-assets.webp',
  'Brand & Creative Communication': '/generated/cards/solutions-service-brand-creative-communication.webp',
  'Afyra connected growth solutions': '/generated/cards/solutions-outcome-long-term-growth.webp',
  'Healthcare patient trust and visibility system': '/generated/cards/healthcare-need-patient-trust.webp',
  'Afyra marketing programs and growth stages': '/generated/cards/programs-plan-growth.webp',
  'Afyra Digital agency vision and growth system': '/generated/cards/about-vision-strong-agency-positioning.webp',
  'Digital growth strategy insights': '/generated/cards/insights-note-make-the-next-step-clear.webp',
  'Long-term Afyra Digital vision': '/generated/cards/about-vision-long-term-brand-equity.webp'
}

const FALLBACKS = [
  '/generated/cards/solutions-service-digital-growth-marketing-strategy.webp',
  '/generated/cards/solutions-service-brand-creative-communication.webp',
  '/generated/cards/solutions-service-patient-acquisition-lead-generation.webp',
  '/generated/cards/solutions-service-website-development.webp',
  '/generated/cards/healthcare-audience-doctors.webp',
  '/generated/cards/about-process-4-manage-report-and-scale.webp'
] as const

function hash(input: string) {
  let h = 2166136261
  for (let i = 0; i < input.length; i += 1) {
    h ^= input.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return Math.abs(h >>> 0)
}

export default function GeneratedVisual({ label, tone = 'deep', compact = false, className = '', priority = false }: Props) {
  const src = EXACT_VISUALS[label] ?? FALLBACKS[hash(label) % FALLBACKS.length]
  const toneClass = `af-ai-visual--${tone}`

  return (
    <figure className={`af-ai-visual ${toneClass} af-ai-visual--photo ${compact ? 'is-compact' : ''} ${className}`.trim()} aria-label={`${label} branded visual`}>
      <img
        src={src}
        alt={`${label} — Afyra Digital contextual visual`}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        width={800}
        height={500}
        decoding="async"
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      />
      <figcaption>{label}</figcaption>
    </figure>
  )
}
