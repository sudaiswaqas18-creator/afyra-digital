import type { ReactNode } from 'react'
import InlineSvgIcon from './InlineSvgIcon'

export function Eyebrow({ tag, text }: { tag: string; text: string }) {
  return <div className="af-eyebrow"><h5 className="af-eyebrow__text"><span className="af-eyebrow__tag">{tag}</span>{text}</h5></div>
}

type BtnProps = { href?: string; label: string; variant?: 'primary' | 'ghost'; icon?: ReactNode; block?: boolean; type?: 'button' | 'submit'; onClick?: () => void }

export function Button({ href, label, variant = 'primary', icon, block, type = 'button', onClick }: BtnProps) {
  const cls = ['af-btn', variant === 'primary' ? 'af-btn--primary' : 'af-btn--ghost', block ? 'af-btn--block' : ''].filter(Boolean).join(' ')
  const inner = <><span className="af-btn__text"><span>{label}</span><span aria-hidden="true">{label}</span></span>{icon ? <span className="af-btn__icon">{icon}</span> : null}{variant === 'primary' ? <span className="af-btn__glow" aria-hidden="true" /> : null}</>
  return href ? <a className={cls} href={href}>{inner}</a> : <button className={cls} type={type} onClick={onClick}>{inner}</button>
}

export function SectionHead({ eyebrow, title, description, align = 'center', className = '' }: { eyebrow: { tag: string; text: string }; title: string; description?: string; align?: 'center' | 'left'; className?: string }) {
  return <div className={`af-sec-head ${align === 'center' ? 'af-text-center' : 'af-sec-head--left'} ${className}`}><Eyebrow tag={eyebrow.tag} text={eyebrow.text} /><h2 className="af-h2 af-split">{title}</h2>{description ? <p className="af-p af-reveal" data-af-delay="0.15">{description}</p> : null}</div>
}

/* Inline SVG icons preserve the supplied icon artwork without loading icon files from /public. */
export const Icon: Record<string, (props?: { size?: number }) => JSX.Element> = new Proxy({}, {
  get: (_target, name: string) => (props?: { size?: number }) => <InlineSvgIcon name={name} size={props?.size ?? 24} className={`af-icon-img af-icon-img--${name}`} />
})
