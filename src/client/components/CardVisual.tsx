import SemanticCardIcon from './SemanticCardIcon'

type Props = {
  assetKey: string
  label: string
  compact?: boolean
  className?: string
  priority?: boolean
}

export default function CardVisual({ assetKey, label, compact = false, className = '', priority = false }: Props) {
  return (
    <figure className={`af-card-visual ${compact ? 'is-compact' : ''} ${className}`.trim()}>
      <img
        src={`/generated/cards/${assetKey}.webp`}
        alt={`${label} — custom Afyra Digital visual`}
        width={800}
        height={500}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding="async"
      />
      <SemanticCardIcon assetKey={assetKey} size={20} />
      <figcaption>{label}</figcaption>
    </figure>
  )
}
