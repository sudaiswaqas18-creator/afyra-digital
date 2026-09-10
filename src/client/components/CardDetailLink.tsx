import { Link } from 'react-router-dom'
import PublicIcon from './PublicIcon'

export default function CardDetailLink({ slug, label = 'Explore details' }: { slug: string; label?: string }) {
  return <Link className="af-card-detail-link" to={`/details/${slug}`} aria-label={`${label}: ${slug.replace(/-/g, ' ')}`}><span>{label}</span><PublicIcon name="arrowRight" size={16} /></Link>
}
