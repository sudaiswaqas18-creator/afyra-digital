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
        if (homePillar) {
          // Homepage uses the reference-style short travelling seam lights
          // instead of a full rotating conic outline.
          gsap.set(card, { '--af-sk-border-opacity': .18, force3D: true })
          return
        }
        gsap.set(card, { '--af-sk-border-angle': `${index * 56}deg`, force3D: true })
        const tween = gsap.to(card, {
          '--af-sk-border-angle': `${360 + index * 56}deg`,
          duration: 4.2 + (index % 3) * .36,
          repeat: -1,
          ease: 'none',
          delay: -(index * .34)
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

    // SaaS King-style travelling border seams for the homepage six-card grid.
    // Four short lines approach each internal junction and briefly flare where
    // the 3-column / 2-row borders meet. This replaces the old full-card color
    // rotation on the homepage only.
    const homeGrid = document.querySelector<HTMLElement>('.af-home-page .af-pillars__grid')
    if (homeGrid && sixCardGroups.includes(homeGrid)) {
      homeGrid.querySelectorAll('.af-sk-junction-layer').forEach((node) => node.remove())
      const layer = document.createElement('div')
      layer.className = 'af-sk-junction-layer'
      ;[1, 2].forEach((column) => {
        const junction = document.createElement('span')
        junction.className = 'af-sk-junction'
        junction.style.left = `${(column / 3) * 100}%`
        junction.style.top = '50%'
        ;['top', 'right', 'bottom', 'left'].forEach((direction) => {
          const arm = document.createElement('i')
          arm.className = `af-sk-junction__arm af-sk-junction__arm--${direction}`
          junction.appendChild(arm)
        })
        const flare = document.createElement('b')
        flare.className = 'af-sk-junction__flare'
        junction.appendChild(flare)
        layer.appendChild(junction)
      })
      homeGrid.appendChild(layer)
      cleanup.push(() => layer.remove())

      if (!reduce) {
        Array.from(layer.querySelectorAll<HTMLElement>('.af-sk-junction')).forEach((junction, index) => {
          const top = junction.querySelector<HTMLElement>('.af-sk-junction__arm--top')
          const right = junction.querySelector<HTMLElement>('.af-sk-junction__arm--right')
          const bottom = junction.querySelector<HTMLElement>('.af-sk-junction__arm--bottom')
          const left = junction.querySelector<HTMLElement>('.af-sk-junction__arm--left')
          const flare = junction.querySelector<HTMLElement>('.af-sk-junction__flare')
          if (!top || !right || !bottom || !left || !flare) return
          // Continuous seam travellers: the four short light bands start away
          // from the junction, travel toward one another, meet / flare, then
          // retreat back along the same borders before looping.  Keeping the
          // lines visible at low opacity makes the motion read like SaaS King's
          // border-light pass instead of a sporadic flash.
          const seam = gsap.timeline({ repeat: -1, repeatDelay: .65, delay: index * .65 })
          seam.set([top, right, bottom, left], { autoAlpha: .16, scale: 1 })
            .set(flare, { autoAlpha: 0, scale: .2 })
            .fromTo(top, { y: -118, autoAlpha: .12 }, { y: -3, autoAlpha: 1, duration: 1.08, ease: 'power2.inOut' }, 0)
            .fromTo(bottom, { y: 118, autoAlpha: .12 }, { y: 3, autoAlpha: 1, duration: 1.08, ease: 'power2.inOut' }, 0)
            .fromTo(left, { x: -138, autoAlpha: .12 }, { x: -3, autoAlpha: 1, duration: 1.08, ease: 'power2.inOut' }, .04)
            .fromTo(right, { x: 138, autoAlpha: .12 }, { x: 3, autoAlpha: 1, duration: 1.08, ease: 'power2.inOut' }, .04)
            .to(flare, { autoAlpha: 1, scale: 1.08, duration: .16, ease: 'power3.out' }, .98)
            .to(flare, { autoAlpha: .18, scale: .55, duration: .25, ease: 'power2.out' }, 1.14)
            .to(top, { y: -118, autoAlpha: .12, duration: 1.02, ease: 'power2.inOut' }, 1.18)
            .to(bottom, { y: 118, autoAlpha: .12, duration: 1.02, ease: 'power2.inOut' }, 1.18)
            .to(left, { x: -138, autoAlpha: .12, duration: 1.02, ease: 'power2.inOut' }, 1.22)
            .to(right, { x: 138, autoAlpha: .12, duration: 1.02, ease: 'power2.inOut' }, 1.22)
            .to(flare, { autoAlpha: 0, scale: .2, duration: .28, ease: 'power2.out' }, 1.34)
          seam.timeScale(.42)
          timelines.push(seam)
        })
      }
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
      const section = document.querySelector<HTMLElement>('.af-home-page .af-price')
      const mark = section?.querySelector<HTMLElement>('.af-price__mark')
      const beam = section?.querySelector<HTMLElement>('.af-price__beam')
      const beamCore = section?.querySelector<HTMLElement>('.af-price__beam-core')
      const traveler = section?.querySelector<HTMLElement>('.af-price__beam-traveler')
      const impact = section?.querySelector<HTMLElement>('.af-price__beam-impact')
      const wrap = section?.querySelector<HTMLElement>('.af-price__wrap')
      const priceHead = section?.querySelector<HTMLElement>('.af-price__head')
      const priceTerms = section?.querySelector<HTMLElement>('.af-price__terms')
      const priceSwitch = section?.querySelector<HTMLElement>('.af-price__switch')
      const priceCard = section?.querySelector<HTMLElement>('.af-price__card')
      const ringCenter = section?.querySelector<HTMLElement>('.af-price__ring-center')
      const ringSlots = section ? Array.from(section.querySelectorAll<HTMLElement>('.af-price__orbit-item')) : []
      const ringCards = section ? Array.from(section.querySelectorAll<HTMLElement>('[data-af-pricing-orbit-card]')) : []
      const orbit = section?.querySelector<HTMLElement>('[data-af-pricing-orbit]')
      const orbitTrack = orbit?.querySelector<HTMLElement>('[data-af-pricing-orbit-track]')

      if (section && mark && beam && beamCore && traveler && impact && wrap) {
        if (reduce) {
          gsap.set([mark, beamCore, traveler, impact, wrap, priceHead, priceTerms, priceSwitch, priceCard, ringCenter, ...ringSlots], { clearProps: 'all' })
        } else {
          const markImage = mark.querySelector<HTMLElement>('img')
          gsap.set(mark, {
            scale: .88,
            y: -8,
            boxShadow: '0 0 0 6px rgba(0,187,160,.05), 0 0 20px rgba(0,187,160,.13), 0 0 56px rgba(222,241,240,.02)'
          })
          if (markImage) gsap.set(markImage, { filter: 'brightness(.82) drop-shadow(0 0 3px rgba(222,241,240,.28))' })
          gsap.set(beamCore, { scaleY: .03, transformOrigin: '50% 0%', opacity: .16 })
          gsap.set(traveler, { y: 0, opacity: 0, scaleY: .28, transformOrigin: '50% 0%' })
          gsap.set(impact, { opacity: 0, scaleX: .28, scaleY: .55 })
          gsap.set(wrap, {
            '--af-sk-impact-line-opacity': .08,
            '--af-sk-impact-line-scale': .22,
            borderColor: 'rgba(222,241,240,.055)',
            boxShadow: '0 0 0 1px rgba(222,241,240,.025)'
          })
          if (priceHead) gsap.set(priceHead, { y: 18, autoAlpha: 0 })
          if (priceTerms) gsap.set(priceTerms, { y: 12, autoAlpha: 0 })
          if (priceSwitch) gsap.set(priceSwitch, { y: -10, autoAlpha: 0 })
          if (priceCard) gsap.set(priceCard, { y: 22, autoAlpha: 0, scale: .985, transformOrigin: '50% 0%' })
          if (ringCenter) gsap.set(ringCenter, { autoAlpha: 0, y: 12 })
          ringSlots.forEach((slot, index) => {
            gsap.set(slot, { autoAlpha: 0, scale: .68, force3D: true })
          })

          const tl = gsap.timeline({
            defaults: { ease: 'none' },
            scrollTrigger: {
              trigger: section,
              start: 'top 94%',
              end: 'top 8%',
              scrub: .48,
              invalidateOnRefresh: true,
              fastScrollEnd: true
            }
          })

          tl.to(mark, {
            scale: 1.05,
            y: 2,
            boxShadow: '0 0 0 7px rgba(0,187,160,.10), 0 0 58px rgba(0,187,160,.62), 0 0 100px rgba(222,241,240,.18)',
            duration: .18,
            ease: 'power2.out'
          }, 0)
          if (markImage) tl.to(markImage, { filter: 'brightness(1.35) drop-shadow(0 0 17px rgba(222,241,240,.78))', duration: .18, ease: 'power2.out' }, 0)

          tl.to(beamCore, { scaleY: 1, opacity: .90, duration: .55 }, .08)
            .to(traveler, { opacity: 1, scaleY: 1, duration: .08 }, .09)
            .to(traveler, { y: () => Math.max(150, beam.getBoundingClientRect().height - 42), duration: .56 }, .12)
            .to(traveler, { opacity: 0, duration: .06 }, .67)
            .to(impact, { opacity: 1, scaleX: 1.28, scaleY: 1.12, duration: .08, ease: 'power3.out' }, .64)
            .to(impact, { opacity: .42, scaleX: 1, scaleY: 1, duration: .12 }, .72)
            .to(wrap, {
              '--af-sk-impact-line-opacity': 1,
              '--af-sk-impact-line-scale': 1,
              borderColor: 'rgba(222,241,240,.19)',
              boxShadow: '0 0 0 7px rgba(222,241,240,.036), 0 -1px 34px rgba(0,187,160,.26), 0 -36px 76px rgba(0,187,160,.12)',
              duration: .14,
              ease: 'power2.out'
            }, .66)
            .to(priceHead!, { y: 0, autoAlpha: 1, duration: .18, ease: 'power3.out' }, .69)
            .to(ringSlots, { scale: 1, autoAlpha: 1, duration: .24, stagger: .018, ease: 'back.out(1.45)' }, .70)
            .to(ringCenter!, { y: 0, autoAlpha: 1, duration: .18, ease: 'power2.out' }, .74)
            .to(priceTerms!, { y: 0, autoAlpha: 1, duration: .16, ease: 'power2.out' }, .77)
            .to(priceSwitch!, { y: 0, autoAlpha: 1, duration: .15, ease: 'power2.out' }, .72)
            .to(priceCard!, { y: 0, autoAlpha: 1, scale: 1, duration: .22, ease: 'power3.out' }, .75)

          if (tl.scrollTrigger) triggers.push(tl.scrollTrigger)
          timelines.push(tl)

          // SaaS King-style descending app chain.  The reference does not use a
          // centered circular carousel: tiles travel along an open curved path
          // that enters from the left, bends across the panel and exits through
          // the lower edge.  The endpoints live outside the clipping window so
          // wrapping is invisible, giving us a continuous loop with no overflow.
          if (orbit && orbitTrack && ringSlots.length) {
            const orbitState = { phase: 0 }
            const cubic = (p0: number, p1: number, p2: number, p3: number, t: number) => {
              const u = 1 - t
              return u * u * u * p0 + 3 * u * u * t * p1 + 3 * u * t * t * p2 + t * t * t * p3
            }
            const cubicDerivative = (p0: number, p1: number, p2: number, p3: number, t: number) => {
              const u = 1 - t
              return 3 * u * u * (p1 - p0) + 6 * u * t * (p2 - p1) + 3 * t * t * (p3 - p2)
            }
            const positionOrbit = () => {
              const rect = orbit.getBoundingClientRect()
              const width = Math.max(1, rect.width)
              const height = Math.max(1, rect.height)

              // Normalized cubic path sampled in the current responsive stage.
              // Expanded arc gives plenty of room for larger tiles without overlapping.
              const px = [-.18 * width, .15 * width, .96 * width, .84 * width]
              const py = [.45 * height, .08 * height, .18 * height, 1.18 * height]

              // Sample arc length so curved sections keep the same tile spacing.
              const samples = Array.from({ length: 181 }, (_, i) => {
                const t = i / 180
                return { t, x: cubic(...px as [number,number,number,number], t), y: cubic(...py as [number,number,number,number], t), length: 0 }
              })
              for (let i = 1; i < samples.length; i++) samples[i].length = samples[i-1].length + Math.hypot(samples[i].x-samples[i-1].x, samples[i].y-samples[i-1].y)
              const length = samples[180].length

              // Make icons bigger like Image 2 (up to 72px), while strictly enforcing a gap so they NEVER overlap
              const slotCount = ringSlots.length
              const stepDistance = length / slotCount
              const maxAllowedSize = Math.max(54, stepDistance - 18)
              const tileSize = Math.min(72, Math.max(58, maxAllowedSize))
              orbit.style.setProperty('--orbit-tile-size', `${tileSize}px`)

              ringSlots.forEach((slot, index) => {
                const distance = ((orbitState.phase + index / slotCount) % 1) * length
                const next = samples.findIndex(sample => sample.length >= distance)
                const b = samples[Math.max(1,next)], a = samples[Math.max(1,next)-1]
                const phase = a.t + (b.t-a.t) * (distance-a.length) / Math.max(.001,b.length-a.length)
                const x = cubic(px[0], px[1], px[2], px[3], phase) - tileSize / 2
                const y = cubic(py[0], py[1], py[2], py[3], phase) - tileSize / 2
                const dx = cubicDerivative(px[0], px[1], px[2], px[3], phase)
                const dy = cubicDerivative(py[0], py[1], py[2], py[3], phase)
                const tangent = Math.atan2(dy, dx) * 180 / Math.PI
                const tilt = Math.max(-14, Math.min(18, tangent * .22))
                gsap.set(slot, { x, y, force3D: true })
                const card = slot.querySelector<HTMLElement>('[data-af-pricing-orbit-card]')
                if (card) gsap.set(card, { rotation: tilt, force3D: true })
              })
            }

            positionOrbit()
            const orbitTween = gsap.to(orbitState, {
              phase: 1,
              duration: 32,
              repeat: -1,
              ease: 'none',
              paused: true,
              onUpdate: positionOrbit
            })
            const orbitVisibility = ScrollTrigger.create({
              trigger: section,
              start: 'top bottom',
              end: 'bottom top',
              onEnter: () => orbitTween.play(),
              onEnterBack: () => orbitTween.play(),
              onLeave: () => orbitTween.pause(),
              onLeaveBack: () => orbitTween.pause()
            })
            const orbitRect = section.getBoundingClientRect()
            if (orbitRect.bottom > 0 && orbitRect.top < window.innerHeight) orbitTween.play()
            const onOrbitResize = () => positionOrbit()
            window.addEventListener('resize', onOrbitResize, { passive: true })
            cleanup.push(() => window.removeEventListener('resize', onOrbitResize))
            triggers.push(orbitVisibility)
            tweens.push(orbitTween)
          }

          ringCards.forEach((card, index) => {
            const pulse = gsap.to(card, {
              y: index % 2 === 0 ? -2 : 2,
              scale: 1.014,
              duration: 2.3 + (index % 4) * .18,
              ease: 'sine.inOut',
              yoyo: true,
              repeat: -1,
              delay: index * .04,
              force3D: true
            })
            tweens.push(pulse)
          })
        }
      }

      /* ---------------- Homepage process / How it works ---------------- */
      const processSection = document.querySelector<HTMLElement>('.af-home-page #process')
      const processWrap = processSection?.querySelector<HTMLElement>('.af-proc__wrap')
      const processCards = processWrap ? Array.from(processWrap.querySelectorAll<HTMLElement>('[data-af-process-card]')) : []
      const processHub = processWrap?.querySelector<HTMLElement>('.af-proc__hub')
      const processHubGlow = processWrap?.querySelector<HTMLElement>('.af-proc__hub-glow')
      const processPaths = processWrap ? Array.from(processWrap.querySelectorAll<SVGPathElement>('.af-proc__lines path')) : []

      if (processSection && processWrap && processCards.length && processHub) {
        if (reduce) {
          gsap.set([...processCards, processHub, ...processPaths], { clearProps: 'all' })
        } else {
          processCards.forEach((card, index) => {
            const fromLeft = index < 2
            gsap.set(card, {
              autoAlpha: 0,
              x: fromLeft ? -52 : 52,
              y: index % 2 === 0 ? -14 : 14,
              scale: .95,
              force3D: true
            })
          })
          gsap.set(processHub, { autoAlpha: 0, scale: .72, rotation: -8, force3D: true })
          processPaths.forEach((path) => {
            const length = Math.max(1, path.getTotalLength())
            gsap.set(path, { strokeDasharray: length, strokeDashoffset: length, opacity: .32 })
          })

          const ptl = gsap.timeline({
            defaults: { ease: 'none' },
            scrollTrigger: {
              trigger: processSection,
              start: 'top 88%',
              end: 'bottom 48%',
              scrub: .5,
              invalidateOnRefresh: true
            }
          })
          ptl.to(processHub, { autoAlpha: 1, scale: 1, rotation: 0, duration: .28, ease: 'back.out(1.7)' }, .06)
            .to(processCards, { autoAlpha: 1, x: 0, y: 0, scale: 1, duration: .36, stagger: .045, ease: 'power3.out' }, .16)
            .to(processPaths, { strokeDashoffset: 0, opacity: .72, duration: .30, stagger: .025, ease: 'power2.inOut' }, .24)
          if (ptl.scrollTrigger) triggers.push(ptl.scrollTrigger)
          timelines.push(ptl)

          if (processHubGlow) {
            const breathe = gsap.to(processHubGlow, { scale: 1.08, opacity: .86, duration: 2.7, repeat: -1, yoyo: true, ease: 'sine.inOut', force3D: true })
            tweens.push(breathe)
          }
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
