import InlineSvgIcon from './InlineSvgIcon'

type Props = { name: string; size?: number; className?: string }

export default function PublicIcon({ name, size = 24, className = '' }: Props) {
  return <InlineSvgIcon name={name} size={size} className={`af-public-icon af-public-icon--${name} ${className}`.trim()} />
}
