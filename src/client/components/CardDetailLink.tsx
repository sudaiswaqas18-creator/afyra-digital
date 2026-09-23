import { Link } from 'react-router-dom'
import PublicIcon from './PublicIcon'
import { serviceBySlug } from '../data/servicePages'

export default function CardDetailLink({ slug, label = 'Explore details' }: { slug: string; label?: string }) {
  const matchedService = Object.keys(serviceBySlug).find((s) => slug.includes(s))
  const target = matchedService
    ? `/solutions/${matchedService}`
    : (slug.startsWith('healthcare') ? '/healthcare' : slug.startsWith('programs') ? '/programs' : slug.startsWith('about') ? '/about' : slug.startsWith('insights') ? '/insights' : '/solutions')

  return (
    <Link className="af-card-detail-link" to={target} aria-label={`${label}: ${slug.replace(/-/g, ' ')}`}>
      <span>{label}</span>
      <PublicIcon name="arrowRight" size={16} />
    </Link>
  )
}
