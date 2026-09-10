import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function splitWords(el: HTMLElement) {
  if (el.dataset.pxSplit === 'done') return () => {}
  const original = el.innerHTML
  const text = el.textContent || ''
  el.textContent = ''
  text.split(/(\s+)/).forEach((part) => {
    if (/^\s+$/.test(part)) {
      el.append(document.createTextNode(part))
      return
    }
    const wrap = document.createElement('span')
    wrap.className = 'px-word-wrap'
    const word = document.createElement('span')
    word.className = 'px-word'
    word.textContent = part
    wrap.append(word)
    el.append(wrap)
  })
  el.dataset.pxSplit = 'done'
  return () => {
    el.innerHTML = original
    delete el.dataset.pxSplit
  }
}

function splitChars(el: HTMLElement) {
  if (el.dataset.pxChars === 'done') return () => {}
  const original = el.innerHTML
  const text = el.textContent || ''
  el.textContent = ''
  text.split(/(\s+)/).forEach((part) => {
    if (/^\s+$/.test(part)) {
      el.append(document.createTextNode(part))
      return
    }
    const wordWrap = document.createElement('span')
    wordWrap.className = 'px-word-wrap'
    Array.from(part).forEach((char) => {
      const span = document.createElement('span')
      span.className = 'px-char'
      span.textContent = char
      wordWrap.append(span)
    })
    el.append(wordWrap)
  })
  el.dataset.pxChars = 'done'
  return () => {
    el.innerHTML = original
    delete el.dataset.pxChars
  }
}

export function useMarketingAnimations(routeKey: string) {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>('.px-page')
    if (!root) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const compact = window.matchMedia('(max-width: 760px)').matches
    const restore: Array<() => void> = []

    if (reduce) return

    const ctx = gsap.context(() => {
      root.querySelectorAll<HTMLElement>('[data-px-chars]').forEach((el) => {
        if (compact) {
          gsap.fromTo(el, { opacity: 0 }, { opacity: 1, duration: .72, ease: 'power2.out' })
          return
        }
        restore.push(splitChars(el))
        gsap.fromTo(el.querySelectorAll('.px-char'),
          { yPercent: 112, opacity: 0, rotateX: -65 },
          { yPercent: 0, opacity: 1, rotateX: 0, duration: 0.85, stagger: 0.015, ease: 'power4.out', scrollTrigger: { trigger: el, start: 'top 86%', once: true } }
        )
      })

      root.querySelectorAll<HTMLElement>('h2:not([data-px-chars]), h3[data-px-heading]').forEach((el) => {
        if (compact) {
          gsap.fromTo(el, { opacity: 0 }, { opacity: 1, duration: .68, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 92%', once: true } })
          return
        }
        restore.push(splitWords(el))
        gsap.fromTo(el.querySelectorAll('.px-word'),
          { yPercent: 110, opacity: 0, filter: 'blur(8px)' },
          { yPercent: 0, opacity: 1, filter: 'blur(0px)', duration: 0.9, stagger: 0.04, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 88%', once: true } }
        )
      })

      /* Performance: one paragraph/reveal trigger per section instead of one ScrollTrigger per node. */
      root.querySelectorAll<HTMLElement>('section').forEach((section) => {
        const items = Array.from(section.querySelectorAll<HTMLElement>('p, [data-px-reveal]'))
          .filter((el) => !el.closest('.px-card') && !el.closest('[data-px-stagger]'))
        if (!items.length) return
        gsap.fromTo(items,
          compact ? { opacity: 0 } : { y: 30, opacity: 0 },
          { y: compact ? undefined : 0, opacity: 1, duration: 0.72, stagger: 0.035, ease: 'power3.out', scrollTrigger: { trigger: section, start: 'top 91%', once: true } }
        )
      })

      root.querySelectorAll<HTMLElement>('[data-px-stagger]').forEach((group) => {
        const items = group.querySelectorAll(':scope > *')
        gsap.fromTo(items,
          compact ? { opacity: 0 } : { y: 58, opacity: 0, scale: 0.965 },
          { y: compact ? undefined : 0, opacity: 1, scale: compact ? undefined : 1, duration: 0.88, stagger: 0.085, ease: 'power3.out', scrollTrigger: { trigger: group, start: 'top 84%', once: true } }
        )
      })

      if (!compact) root.querySelectorAll<HTMLElement>('[data-px-parallax]').forEach((el) => {
        const amount = Number(el.dataset.pxParallax || 70)
        gsap.fromTo(el, { y: -amount * .3 }, { y: amount, ease: 'none', scrollTrigger: { trigger: el.closest('section') || el, start: 'top bottom', end: 'bottom top', scrub: .8 } })
      })

      root.querySelectorAll<HTMLElement>('[data-px-image-reveal]').forEach((el) => {
        if (compact) {
          gsap.fromTo(el, { y: 16, opacity: .7 }, { y: 0, opacity: 1, duration: .62, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 92%', once: true } })
        } else {
          gsap.fromTo(el,
            { clipPath: 'inset(16% 12% 16% 12% round 28px)', scale: 1.08, opacity: .55 },
            { clipPath: 'inset(0% 0% 0% 0% round 28px)', scale: 1, opacity: 1, duration: 1.15, ease: 'power4.out', scrollTrigger: { trigger: el, start: 'top 86%', once: true } }
          )
        }
      })

      root.querySelectorAll<HTMLElement>('[data-px-scrub-text]').forEach((el) => {
        if (compact) {
          gsap.fromTo(el, { y: 14, opacity: .55 }, { y: 0, opacity: 1, duration: .58, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 92%', once: true } })
        } else {
          gsap.fromTo(el, { xPercent: -8, opacity: .25 }, { xPercent: 0, opacity: 1, ease: 'none', scrollTrigger: { trigger: el, start: 'top 92%', end: 'top 48%', scrub: .8 } })
        }
      })

      root.querySelectorAll<HTMLElement>('[data-section-label]').forEach((label) => {
        gsap.fromTo(label, { y: 18, opacity: 0, scale: .94 }, { y: 0, opacity: 1, scale: 1, duration: .68, ease: 'power3.out', scrollTrigger: { trigger: label, start: 'top 92%', once: true } })
      })

      const pin = root.querySelector<HTMLElement>('[data-px-pin]')
      if (pin && routeKey !== 'about' && window.matchMedia('(min-width: 981px)').matches) {
        const content = pin.querySelector<HTMLElement>('[data-px-pin-content]')
        if (content) {
          ScrollTrigger.create({ trigger: pin, start: 'top 112px', end: 'bottom bottom', pin: content, pinSpacing: true, anticipatePin: 1 })
        }
      }

      /* Stable card imagery: reveal once instead of continuously drifting every card. */
      root.querySelectorAll<HTMLElement>('.af-card-visual').forEach((el) => {
        if (el.closest('[data-px-image-reveal]')) return
        if (compact) {
          gsap.fromTo(el, { opacity: .72, y: 14 }, { opacity: 1, y: 0, duration: .56, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 93%', once: true } })
        } else {
          gsap.fromTo(el,
            { opacity: .55, scale: 1.035, clipPath: 'inset(8% 5% 8% 5% round 20px)' },
            { opacity: 1, scale: 1, clipPath: 'inset(0% 0% 0% 0% round 20px)', duration: .9, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 91%', once: true } }
          )
        }
      })

      /* GSAP hover polish for the four top-level editorial pages. */
      if (['healthcare', 'programs', 'about', 'insights'].includes(routeKey) && window.matchMedia('(hover: hover)').matches) {
        root.querySelectorAll<HTMLElement>('.px-card').forEach((card) => {
          const enter = () => {
            if (card.classList.contains('af-sk-light-card')) return
            gsap.to(card, { y: -7, scale: 1.012, duration: .34, ease: 'power2.out', overwrite: 'auto' })
          }
          const leave = () => {
            if (card.classList.contains('af-sk-light-card')) return
            gsap.to(card, { y: 0, scale: 1, duration: .42, ease: 'power3.out', overwrite: 'auto' })
          }
          card.addEventListener('mouseenter', enter)
          card.addEventListener('mouseleave', leave)
          restore.push(() => { card.removeEventListener('mouseenter', enter); card.removeEventListener('mouseleave', leave) })
        })
      }

      if (routeKey === 'about') {
        root.querySelectorAll<HTMLElement>('.px-vision__list .px-card').forEach((card, i) => {
          gsap.fromTo(card, { y: 34, opacity: 0, scale: .975 }, { y: 0, opacity: 1, scale: 1, duration: .72, delay: Math.min(i * .035, .2), ease: 'power3.out', scrollTrigger: { trigger: card, start: 'top 90%', once: true } })
        })
      }

      /* Route-specific hero choreography. Each top-level page gets a distinct motion language. */
      const heroVisual = root.querySelector<HTMLElement>('[data-px-hero-visual]')
      const heroMedia = heroVisual?.querySelector<HTMLElement>('.px-hero__media')
      const heroCards = heroVisual?.querySelectorAll<HTMLElement>('[data-px-hero-context-card]')
      if (heroVisual && heroMedia && heroCards?.length) {
        const img = heroMedia.querySelector<HTMLElement>('img')
        if (routeKey === 'solutions') {
          gsap.fromTo(heroCards, { y: 42, opacity: 0, scale: .9 }, { y: 0, opacity: 1, scale: 1, duration: .78, stagger: .11, delay: .45, ease: 'back.out(1.35)' })
          if (img) gsap.fromTo(img, { scale: 1.1, xPercent: -2 }, { scale: 1, xPercent: 0, duration: 1.3, ease: 'power3.out' })
        } else if (routeKey === 'healthcare') {
          heroCards.forEach((card, i) => gsap.fromTo(card, { x: i % 2 ? 38 : -38, opacity: 0 }, { x: 0, opacity: 1, duration: .78, delay: .45 + i * .12, ease: 'power3.out' }))
          if (img) gsap.fromTo(img, { scale: 1.08, filter: 'saturate(.72)' }, { scale: 1, filter: 'saturate(1)', duration: 1.35, ease: 'power3.out' })
        } else if (routeKey === 'programs') {
          heroCards.forEach((card, i) => gsap.fromTo(card, { y: 46, rotate: (i - 1) * 4, opacity: 0, transformOrigin: '50% 100%' }, { y: 0, rotate: 0, opacity: 1, duration: .82, delay: .4 + i * .12, ease: 'back.out(1.5)' }))
          if (img) gsap.fromTo(img, { scale: 1.06 }, { scale: 1, duration: 1.1, ease: 'power2.out' })
        } else if (routeKey === 'about') {
          gsap.fromTo(heroCards, { scaleX: .75, opacity: 0, transformOrigin: 'left center' }, { scaleX: 1, opacity: 1, duration: .8, stagger: .12, delay: .45, ease: 'power3.out' })
          if (img) gsap.fromTo(img, { xPercent: 3, scale: 1.07 }, { xPercent: 0, scale: 1, duration: 1.25, ease: 'power3.out' })
        } else if (routeKey === 'insights') {
          gsap.fromTo(heroCards, { x: -26, opacity: 0, filter: 'blur(8px)' }, { x: 0, opacity: 1, filter: 'blur(0px)', duration: .8, stagger: .1, delay: .42, ease: 'power3.out' })
          if (img) gsap.fromTo(img, { scale: 1.1, filter: 'contrast(.82)' }, { scale: 1, filter: 'contrast(1)', duration: 1.35, ease: 'power3.out' })
        }
      }

      if (routeKey === 'request-consultation') {
        const visual = root.querySelector<HTMLElement>('.rq-hero__visual')
        const metrics = root.querySelectorAll<HTMLElement>('.rq-hero__metric')
        if (visual) gsap.fromTo(visual, { y: 55, opacity: 0, rotateY: -5 }, { y: 0, opacity: 1, rotateY: 0, duration: 1.05, ease: 'power3.out', delay: .2 })
        metrics.forEach((metric, i) => gsap.fromTo(metric, { x: i ? 34 : -34, scale: .88, opacity: 0 }, { x: 0, scale: 1, opacity: 1, duration: .72, delay: .65 + i * .14, ease: 'back.out(1.5)' }))
      }

      if (routeKey.startsWith('detail-')) {
        const detailImage = root.querySelector<HTMLElement>('.dt-hero__visual .af-card-visual img')
        if (detailImage) gsap.fromTo(detailImage, { scale: 1.09 }, { scale: 1, duration: 1.2, ease: 'power3.out' })
      }
    }, root)

    let cancelled = false
    const refresh = window.setTimeout(() => {
      const run = () => { if (!cancelled) ScrollTrigger.refresh() }
      if ('requestIdleCallback' in window) window.requestIdleCallback(run, { timeout: 650 })
      else run()
    }, 220)
    return () => {
      cancelled = true
      window.clearTimeout(refresh)
      ctx.revert()
      restore.forEach((fn) => fn())
    }
  }, [routeKey])
}
