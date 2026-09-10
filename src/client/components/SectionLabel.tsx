type Props = { text: string; className?: string }

function splitLabel(text: string) {
  const parts = text.trim().split(/\s+/)
  if (parts.length <= 1) return { tag: parts[0] || 'Afyra', rest: '' }
  return { tag: parts[0], rest: parts.slice(1).join(' ') }
}

export default function SectionLabel({ text, className = '' }: Props) {
  const { tag, rest } = splitLabel(text)
  return (
    <div className={`af-eyebrow af-global-section-label ${className}`.trim()} data-section-label>
      <h5 className="af-eyebrow__text">
        <span className="af-eyebrow__tag">{tag}</span>
        {rest ? <span>{rest}</span> : null}
      </h5>
    </div>
  )
}
