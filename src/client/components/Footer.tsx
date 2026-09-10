import { brand, footer } from '../data/content'
import { Icon } from './ui'

type FooterProps = {
  fromServicePage?: boolean
}

export default function Footer({ fromServicePage = false }: FooterProps) {
  const year = new Date().getFullYear()
  const homeHref = (href: string) => {
    if (!fromServicePage) return href
    if (href === '#contact') return '/request-consultation'
    return href.startsWith('#') ? `/${href}` : href
  }

  return (
    <footer className="af-footer">
      <div className="af-footer__shape af-footer__shape--l" aria-hidden="true" />
      <div className="af-footer__shape af-footer__shape--r" aria-hidden="true" />

      <div className="af-container">
        <div className="af-footer__wrap">
          <div className="af-footer__brand">
            <a className="af-footer__logo" href={homeHref('/')} aria-label="Afyra Digital home">
              <img src="/static/img/logo-mark.png" alt="" />
              <span className="af-footer__wordmark"><strong>Afyra</strong><em>Digital</em></span>
            </a>
            <p className="af-p af-p--sm af-footer__disc">{footer.description}</p>
            <p className="af-footer__tagline">{brand.positioning}</p>
            <div className="af-footer__contact" aria-label="Afyra Digital contact details">
              <p><strong>Phone:</strong> <a href={brand.phoneHref}>{brand.phone}</a></p>
              <p><strong>Email:</strong> <a href={`mailto:${brand.email}`}>{brand.email}</a></p>
            </div>
          </div>

          {footer.columns.map((col) => (
            <div className="af-footer__col" key={col.title}>
              <h5 className="af-footer__col-title">{col.title}</h5>
              <ul>
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a href={homeHref(l.href)}>{l.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="af-footer__big" aria-hidden="true">
          <span>Afyra Digital</span>
        </div>

        <div className="af-footer__bottom">
          <p className="af-footer__copy">
            ©{year} <a href={homeHref('/')}>Afyra Digital</a> — All Rights Reserved.
          </p>
          <p className="af-footer__slogan">{brand.tagline}</p>
          <div className="af-footer__social" aria-label="Afyra Digital social links">
            {footer.social.map((s) => {
              const Ico = Icon[s.icon]
              const isExternal = s.href.startsWith('http')
              return (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  title={s.label}
                  {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                >
                  {Ico ? Ico({ size: 22 }) : null}
                </a>
              )
            })}
          </div>
        </div>
      </div>
    </footer>
  )
}
