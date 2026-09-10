import { useLayoutEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import gsap from 'gsap'
import { cardDetails, slugify } from '../data/cardDetails'

const CARD_SELECTOR = [
  'article',
  '.af-feat',
  '.af-why__card',
  '.af-proc__item',
  '.af-price__card',
  '.af-pillar',
  '.rq-mini-card',
  '.rq-process__steps li',
  '.rq-program-context__list > div',
  '.px-hero__context-card',
  '.sv-proof-card',
  '.web-templates__grid figure',
  '.sv-crosslinks__grid > a'
].join(',')

const EXCLUDED_SELECTOR = [
  '[data-af-hero-assemble-root]',
  '.af-hpd',
  '.rs-faq',
  '.sv-faq',
  '.rq-form-shell',
  '[data-rs-faq-item]',
  '[data-rs-patient-faq-item]',
  '[data-rs-growth-faq-item]',
  '[data-rs-social-faq-item]',
  '[data-brand-faq-item]'
].join(',')

function cleanText(value: string | null | undefined) {
  return (value || '').replace(/\s+/g, ' ').trim()
}

function pageKey(pathname: string) {
  if (pathname === '/') return 'home'
  return pathname.replace(/^\//, '').replace(/\//g, '-') || 'page'
}

function routeForKnownTitle(title: string, pathname: string) {
  const norm = title.toLowerCase()
  const exactOnPage = cardDetails.find((item) => item.parentPath === pathname && item.title.toLowerCase() === norm)
  if (exactOnPage) return `/details/${exactOnPage.slug}`

  const prefixedOnPage = cardDetails.find((item) => item.parentPath === pathname && item.title.toLowerCase().startsWith(`${norm} for `))
  if (prefixedOnPage) return `/details/${prefixedOnPage.slug}`

  const exact = cardDetails.filter((item) => item.title.toLowerCase() === norm)
  if (exact.length === 1) return `/details/${exact[0].slug}`

  return ''
}

function isNavigableHref(href: string | null) {
  return !!href && (href.startsWith('/') || href.startsWith('#')) && !href.startsWith('/request-consultation')
}

export default function CardRouteEnhancer() {
  const location = useLocation()
  const navigate = useNavigate()

  useLayoutEffect(() => {
    let raf = 0
    const cleanupFns: Array<() => void> = []

    const enhance = () => {
      window.cancelAnimationFrame(raf)
      raf = window.requestAnimationFrame(() => {
        const cards = Array.from(document.querySelectorAll<HTMLElement>(CARD_SELECTOR))
        cards.forEach((card) => {
          if (card.dataset.afRouteEnhanced === 'true') return
          if (card.closest(EXCLUDED_SELECTOR)) return
          if (card.querySelector('summary')) return

          const heading = card.querySelector<HTMLElement>('h2, h3, h4, .af-price__card-name, figcaption, .rs-simulator__cards b, .sv-crosslinks__label, strong')
          if (!heading) return
          const title = cleanText(heading.textContent)
          if (!title || title.length < 2) return

          const wholeCardAnchor = card.matches('a[href]') ? card as HTMLAnchorElement : null
          const detailAnchor = card.querySelector<HTMLAnchorElement>('a.af-card-detail-link[href], a[href^="/details/"]')
          const titleAnchor = heading.closest<HTMLAnchorElement>('a[href]')
          let href = detailAnchor?.getAttribute('href') || titleAnchor?.getAttribute('href') || wholeCardAnchor?.getAttribute('href') || ''

          if (!isNavigableHref(href)) href = routeForKnownTitle(title, location.pathname)

          if (!href) {
            const summary = cleanText(card.querySelector<HTMLElement>('p')?.textContent).slice(0, 240)
            const parentTitle = cleanText(document.querySelector<HTMLElement>('main h1')?.textContent) || 'Afyra Digital'
            const slug = `context-${pageKey(location.pathname)}-${slugify(title)}`
            const params = new URLSearchParams({ title, from: location.pathname, parent: parentTitle })
            if (summary) params.set('summary', summary)
            href = `/details/${slug}?${params.toString()}`
          }

          if (!href) return
          card.dataset.afRouteEnhanced = 'true'
          card.dataset.afCardRoute = href
          card.classList.add('af-card-route-card')
          heading.classList.add('af-card-route-title')

          let line = heading.querySelector<HTMLElement>(':scope > .af-card-route-line')
          if (!line) {
            line = document.createElement('span')
            line.className = 'af-card-route-line'
            line.setAttribute('aria-hidden', 'true')
            heading.appendChild(line)
          }
          gsap.set(line, { scaleX: 0, transformOrigin: '0% 50%', backgroundPosition: '0% 50%' })

          const originalColor = getComputedStyle(heading).color
          const enter = () => {
            gsap.killTweensOf([heading, line])
            gsap.to(line, { scaleX: 1, backgroundPosition: '100% 50%', duration: .42, ease: 'power3.out' })
            gsap.to(heading, { color: '#00BBA0', duration: .3, ease: 'power2.out' })
          }
          const leave = () => {
            gsap.killTweensOf([heading, line])
            gsap.to(line, { scaleX: 0, backgroundPosition: '0% 50%', duration: .34, ease: 'power3.inOut' })
            gsap.to(heading, { color: originalColor, duration: .3, ease: 'power2.out' })
          }
          heading.addEventListener('mouseenter', enter)
          heading.addEventListener('mouseleave', leave)
          heading.addEventListener('focus', enter)
          heading.addEventListener('blur', leave)

          const navigateToCard = () => {
            if (href.startsWith('#')) {
              document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
            } else {
              navigate(href)
            }
          }

          if (!titleAnchor && !wholeCardAnchor) {
            heading.setAttribute('role', 'link')
            heading.tabIndex = 0
            const go = (event: Event) => {
              if (event instanceof KeyboardEvent && event.key !== 'Enter' && event.key !== ' ') return
              if (event instanceof KeyboardEvent) event.preventDefault()
              event.stopPropagation()
              navigateToCard()
            }
            heading.addEventListener('click', go)
            heading.addEventListener('keydown', go)
            cleanupFns.push(() => {
              heading.removeEventListener('click', go)
              heading.removeEventListener('keydown', go)
            })
          }

          if (!wholeCardAnchor) {
            const goCard = (event: MouseEvent) => {
              const target = event.target as Element | null
              if (!target) return
              if (target.closest('.af-card-route-title')) return
              if (target.closest('a,button,input,select,textarea,summary,[role="button"],[role="link"]')) return
              navigateToCard()
            }
            card.addEventListener('click', goCard)
            cleanupFns.push(() => card.removeEventListener('click', goCard))
          }

          cleanupFns.push(() => {
            heading.removeEventListener('mouseenter', enter)
            heading.removeEventListener('mouseleave', leave)
            heading.removeEventListener('focus', enter)
            heading.removeEventListener('blur', leave)
            gsap.killTweensOf([heading, line])
            line?.remove()
            heading.classList.remove('af-card-route-title')
            card.classList.remove('af-card-route-card')
            heading.removeAttribute('role')
            heading.removeAttribute('tabindex')
            delete card.dataset.afRouteEnhanced
            delete card.dataset.afCardRoute
          })
        })
      })
    }

    enhance()
    const observer = new MutationObserver(enhance)
    observer.observe(document.getElementById('root') || document.body, { childList: true, subtree: true })
    const settle = window.setTimeout(enhance, 180)

    return () => {
      observer.disconnect()
      window.clearTimeout(settle)
      window.cancelAnimationFrame(raf)
      cleanupFns.splice(0).reverse().forEach((fn) => fn())
    }
  }, [location.pathname, location.search, navigate])

  return null
}
