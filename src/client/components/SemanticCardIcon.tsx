import InlineSvgIcon from './InlineSvgIcon'

type Props = { assetKey: string; size?: number; className?: string }

function iconFor(assetKey: string) {
  const key = assetKey.toLowerCase()
  if (/(local|search|visibility|google|discovery|seo)/.test(key)) return 'search'
  if (/(social|community|instagram|facebook|linkedin)/.test(key)) return 'social'
  if (/(whatsapp|messenger|message|communication)/.test(key) && /(lead|inquiry|community|social)/.test(key)) return 'message'
  if (/(website|digital-presence|advanced-systems|technical|mobile|usability)/.test(key)) return 'website'
  if (/(patient|lead|inquiry|conversion|appointment|acquisition)/.test(key)) return 'leads'
  if (/(hospital)/.test(key)) return 'hospital'
  if (/(clinic)/.test(key)) return 'clinic'
  if (/(doctor)/.test(key)) return 'doctor'
  if (/(aesthetic)/.test(key)) return 'aesthetic'
  if (/(cosmetic)/.test(key)) return 'cosmetic'
  if (/(program|starter|plan|pricing|term)/.test(key)) return 'program'
  if (/(trust|reputation|credibility|authority|proof)/.test(key)) return 'trust'
  if (/(brand|creative|identity)/.test(key)) return 'brand'
  if (/(content|educational|storytelling|video)/.test(key)) return 'content'
  if (/(insight|decision|analytics|report|measure|performance)/.test(key)) return 'insights'
  if (/(strategy|growth|process|scale|vision|positioning|long-term|outcome|system)/.test(key)) return 'strategy'
  return 'spark'
}

export default function SemanticCardIcon({ assetKey, size = 24, className = '' }: Props) {
  const name = iconFor(assetKey)
  return <InlineSvgIcon name={name} size={size} className={`af-semantic-card-icon af-semantic-card-icon--${name} ${className}`.trim()} />
}
