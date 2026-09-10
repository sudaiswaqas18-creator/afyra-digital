import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

type SaasKingEffectOptions = {
  home?: boolean
}

const GROUP_SELECTORS = [
  '[data-af-stagger]',
  '[data-px-stagger]',
  '[data-sv-stagger]',
  '.af-pillars__grid',
  '.af-features__wrap',
  '.af-why__grid',
  '.sv-feature-grid',
  '.rq-benefits__grid',
  '.px-solution-grid',
  '.px-system-band__steps',
  '.px-principles__grid',
  '.px-health-audience__grid',
  '.px-journey__line',
  '.px-process-page__grid',
  '.px-decisions__rail'
].join(', ')

const CARD_SELECTOR = ':scope > article, :scope > a.px-card, :scope > .af-pillar, :scope > .sv-feature-card, :scope > .px-card, :scope > .rq-benefit-card'
const ICON_SELECTOR = '.af-pillar__icon, .sv-feature-card__icon, .px-icon, .px-card__num, .px-journey__num, .sv-feature-card__num, .rq-benefit-card__num'

function unique<T>(items: T[]) {
  return Array.from(new Set(items))
}

/**
 * Shared SaaSking-inspired interaction layer used across the site.
 *
 * - Applies the moving-border / moving-ring treatment to genuine six-card
 *   groups and explicit grid fallbacks used across Afyra pages.
 * - Uses GSAP for the light sweep, icon ring motion and hover choreography.
 * - The homepage option additionally owns the pricing beam + capability orbit.
 */
export function useSaasKingEffects(options: SaasKingEffectOptions = {}) {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const cleanup: Array<() => void> = []
    const tweens: gsap.core.Tween[] = []
    const timelines: gsap.core.Timeline[] = []
    const triggers: ScrollTrigger[] = []

    const groups = Array.from(document.querySelectorAll<HTMLElement>(GROUP_SELECTORS))
    const sixCardGroups: HTMLElement[] = []
    const sixCards: HTMLElement[] = []

    groups.forEach((group) => {
      const cards = Array.from(group.querySelectorAll<HTMLElement>(CARD_SELECTOR)).filter((card) => card.parentElement === group)
      if (cards.length !== 6) return

      group.classList.add('af-sk-light-grid')
      group.dataset.afSkLightGrid = 'true'
      sixCardGroups.push(group)

      cards.forEach((card, index) => {
        card.classList.add('af-sk-light-card')
        card.style.setProperty('--af-sk-phase', String(index))
        sixCards.push(card)

        const icon = card.querySelector<HTMLElement>(ICON_SELECTOR)
        if (icon) {
          icon.classList.add('af-sk-light-icon')
          icon.style.setProperty('--af-sk-phase', String(index))
        }
      })
    })

    const allIcons = unique(sixCards.map((card) => card.querySelector<HTMLElement>(ICON_SELECTOR)).filter(Boolean) as HTMLElement[])

    if (!reduce) {
      sixCards.forEach((card, index) => {
        const homePillar = card.closest('.af-pillars__grid') !== null
        gsap.set(card, { '--af-sk-border-angle': `${index * 56}deg`, force3D: true })
        const tween = gsap.to(card, {
          '--af-sk-border-angle': `${360 + index * 56}deg`,
          duration: homePillar ? 3.65 + (index % 2) * .12 : 4.2 + (index % 3) * .36,
          repeat: -1,
          ease: 'none',
          delay: -(index * (homePillar ? .26 : .34))
        })
        tweens.push(tween)
      })

      allIcons.forEach((icon, index) => {
        gsap.set(icon, { '--af-sk-ring-angle': `${index * 72}deg` })
        const tween = gsap.to(icon, {
          '--af-sk-ring-angle': `${360 + index * 72}deg`,
          duration: 3 + (index % 2) * .32,
          repeat: -1,
          ease: 'none',
          delay: -(index * .2)
        })
        tweens.push(tween)
      })
    }

    const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    if (canHover && !reduce) {
      sixCards.forEach((card) => {
        const icon = card.querySelector<HTMLElement>(ICON_SELECTOR)
        const homePillar = card.closest('.af-pillars__grid') !== null
        const enter = () => {
          gsap.to(card, {
            y: homePillar ? -6 : -7,
            scale: homePillar ? 1.01 : 1.014,
            '--af-sk-border-opacity': .96,
            duration: homePillar ? .2 : .28,
            ease: 'power2.out',
            overwrite: 'auto'
          })
          if (icon) gsap.to(icon, { scale: 1.07, duration: homePillar ? .22 : .3, ease: 'power2.out', overwrite: 'auto' })
        }
        const leave = () => {
          gsap.to(card, {
            y: 0,
            scale: 1,
            '--af-sk-border-opacity': .54,
            duration: homePillar ? .24 : .38,
            ease: 'power3.out',
            overwrite: 'auto'
          })
          if (icon) gsap.to(icon, { scale: 1, duration: homePillar ? .24 : .36, ease: 'power3.out', overwrite: 'auto' })
        }
        card.addEventListener('mouseenter', enter)
        card.addEventListener('mouseleave', leave)
        card.addEventListener('focusin', enter)
        card.addEventListener('focusout', leave)
        cleanup.push(() => {
          card.removeEventListener('mouseenter', enter)
          card.removeEventListener('mouseleave', leave)
          card.removeEventListener('focusin', enter)
          card.removeEventListener('focusout', leave)
        })
      })
    }

    if (options.home) {
      /* ---------------- Homepage pricing beam ---------------- */
      const section = document.querySelector<HTMLElement>('.af-price')
      const mark = section?.querySelector<HTMLElement>('.af-price__mark')
      const beam = section?.querySelector<HTMLElement>('.af-price__beam')
      const beamCore = section?.querySelector<HTMLElement>('.af-price__beam-core')
      const traveler = section?.querySelector<HTMLElement>('.af-price__beam-traveler')
      const impact = section?.querySelector<HTMLElement>('.af-price__beam-impact')
      const wrap = section?.querySelector<HTMLElement>('.af-price__wrap')

      if (section && mark && beam && beamCore && traveler && impact && wrap) {
        if (reduce) {
          gsap.set([mark, beamCore, traveler, impact, wrap], { clearProps: 'all' })
        } else {
          gsap.set(beamCore, { scaleY: .08, transformOrigin: '50% 0%', opacity: .3 })
          gsap.set(traveler, { yPercent: 0, opacity: 0, scaleY: .35, transformOrigin: '50% 0%' })
          gsap.set(impact, { opacity: 0, scale: .45 })
          const markImage = mark.querySelector<HTMLElement>('img')
          gsap.set(mark, {
            scale: .94,
            boxShadow: '0 0 0 7px rgba(0,187,160,.07), 0 0 26px rgba(0,187,160,.18), 0 0 58px rgba(222,241,240,.03)'
          })
          if (markImage) gsap.set(markImage, { filter: 'brightness(.92) drop-shadow(0 0 4px rgba(222,241,240,.34))' })
          gsap.set(wrap, {
            '--af-sk-impact-line-opacity': .12,
            '--af-sk-impact-line-scale': .35,
            borderColor: 'rgba(222,241,240,.07)'
          })

          const tl = gsap.timeline({
            defaults: { ease: 'none' },
            scrollTrigger: {
              trigger: section,
              start: 'top 82%',
              end: 'top 18%',
              scrub: .42,
              invalidateOnRefresh: true
            }
          })

          tl.to(mark, {
            scale: 1.05,
            boxShadow: '0 0 0 7px rgba(0,187,160,.10), 0 0 56px rgba(0,187,160,.60), 0 0 94px rgba(222,241,240,.17)',
            duration: .2,
            ease: 'power2.out'
          }, 0)
          if (markImage) {
            tl.to(markImage, { filter: 'brightness(1.35) drop-shadow(0 0 16px rgba(222,241,240,.72))', duration: .2, ease: 'power2.out' }, 0)
          }
          tl.to(beamCore, { scaleY: 1, opacity: .82, duration: .72 }, .06)
            .to(traveler, { opacity: 1, scaleY: 1, duration: .12 }, .08)
            .to(traveler, { yPercent: 690, duration: .66 }, .14)
            .to(traveler, { opacity: 0, duration: .08 }, .8)
            .to(impact, { opacity: 1, scale: 1.18, duration: .12, ease: 'power3.out' }, .76)
            .to(impact, { opacity: .38, scale: 1, duration: .2 }, .88)
            .to(wrap, {
              '--af-sk-impact-line-opacity': 1,
              '--af-sk-impact-line-scale': 1,
              borderColor: 'rgba(222,241,240,.21)',
              boxShadow: '0 0 0 8px rgba(222,241,240,.045), 0 -1px 33px rgba(0,187,160,.28), 0 -34px 66px rgba(0,187,160,.13)',
              duration: .18,
              ease: 'power2.out'
            }, .78)

          if (tl.scrollTrigger) triggers.push(tl.scrollTrigger)
          timelines.push(tl)
        }
      }

      /* ---------------- Pricing capability orbit ---------------- */
      const orbit = section?.querySelector<HTMLElement>('[data-af-pricing-orbit]')
      const orbitTrack = orbit?.querySelector<HTMLElement>('[data-af-pricing-orbit-track]')
      const orbitCards = orbit ? Array.from(orbit.querySelectorAll<HTMLElement>('[data-af-pricing-orbit-card]')) : []

      if (orbit && orbitTrack && orbitCards.length) {
        if (reduce) {
          gsap.set([orbitTrack, ...orbitCards], { clearProps: 'transform' })
        } else {
          const duration = window.matchMedia('(max-width: 620px)').matches ? 26 : window.matchMedia('(max-width: 980px)').matches ? 23 : 20
          const spin = gsap.to(orbitTrack, { rotation: 360, duration, repeat: -1, ease: 'none', transformOrigin: '50% 50%' })
          tweens.push(spin)
          orbitCards.forEach((card, index) => {
            const counter = gsap.to(card, { rotation: -360, duration, repeat: -1, ease: 'none', transformOrigin: '50% 50%' })
            tweens.push(counter)
            const pulse = gsap.to(card, {
              y: index % 2 === 0 ? -4 : 4,
              scale: 1.035,
              duration: 1.6 + (index % 3) * .15,
              ease: 'sine.inOut',
              yoyo: true,
              repeat: -1
            })
            tweens.push(pulse)
          })

          const entranceTrigger = ScrollTrigger.create({
            trigger: orbit,
            start: 'top 88%',
            once: true,
            onEnter: () => {
              gsap.fromTo(orbitCards, { opacity: 0, scale: .72 }, { opacity: 1, scale: 1, duration: .55, stagger: .045, ease: 'back.out(1.55)' })
            }
          })
          triggers.push(entranceTrigger)
        }
      }
    }

    const refresh = window.setTimeout(() => { if (window.scrollY < 48) ScrollTrigger.refresh() }, 120)

    return () => {
      window.clearTimeout(refresh)
      cleanup.forEach((fn) => fn())
      triggers.forEach((trigger) => trigger.kill())
      timelines.forEach((timeline) => timeline.kill())
      tweens.forEach((tween) => tween.kill())
      sixCardGroups.forEach((group) => {
        group.classList.remove('af-sk-light-grid')
        delete group.dataset.afSkLightGrid
      })
      sixCards.forEach((card) => {
        card.classList.remove('af-sk-light-card')
        card.style.removeProperty('--af-sk-phase')
        card.style.removeProperty('--af-sk-border-angle')
        card.style.removeProperty('--af-sk-border-opacity')
      })
      allIcons.forEach((icon) => {
        icon.classList.remove('af-sk-light-icon')
        icon.style.removeProperty('--af-sk-phase')
        icon.style.removeProperty('--af-sk-ring-angle')
      })
    }
  }, [options.home])
}
