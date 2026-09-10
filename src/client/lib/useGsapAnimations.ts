import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { setupProcessCardHover } from './processCardMotion'

gsap.registerPlugin(ScrollTrigger)

/**
 * Splits the text of an element into per-character spans so each glyph can be
 * animated independently (mirrors the reference theme's `wa_title_spilt_1`).
 * Word boundaries are preserved so text still wraps naturally.
 */
function splitChars(el: HTMLElement) {
  if (el.dataset.afSplit === 'done') return
  const text = el.textContent ?? ''
  el.textContent = ''
  const frag = document.createDocumentFragment()

  text.split(/(\s+)/).forEach((chunk) => {
    if (/^\s+$/.test(chunk)) {
      frag.appendChild(document.createTextNode(' '))
      return
    }
    const word = document.createElement('span')
    word.style.display = 'inline-block'
    word.style.whiteSpace = 'nowrap'
    Array.from(chunk).forEach((ch) => {
      const s = document.createElement('span')
      s.className = 'af-split-char'
      s.textContent = ch
      word.appendChild(s)
    })
    frag.appendChild(word)
  })

  el.appendChild(frag)
  el.dataset.afSplit = 'done'
}

function splitWords(el: HTMLElement) {
  if (el.dataset.afWords === 'done') return
  const text = el.textContent ?? ''
  el.textContent = ''
  text.split(/(\s+)/).forEach((chunk) => {
    if (/^\s+$/.test(chunk)) {
      el.appendChild(document.createTextNode(chunk))
      return
    }
    const wrap = document.createElement('span')
    wrap.className = 'af-word-wrap'
    const word = document.createElement('span')
    word.className = 'af-word'
    word.textContent = chunk
    wrap.appendChild(word)
    el.appendChild(wrap)
  })
  el.dataset.afWords = 'done'
}

export function useGsapAnimations() {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const compact = window.matchMedia('(max-width: 760px)').matches
    document.documentElement.classList.add('af-js')

    if (reduce) {
      gsap.set('.af-reveal, .af-split .af-split-char', { opacity: 1, clearProps: 'transform' })
      return
    }

    const processCleanups: Array<() => void> = []
    const ctx = gsap.context(() => {
      /* ---------- 1. Character-by-character headline reveal ---------- */
      gsap.utils.toArray<HTMLElement>('.af-split').forEach((title) => {
        if (compact) {
          gsap.fromTo(title, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: .62, ease: 'power2.out', scrollTrigger: { trigger: title, start: 'top 92%', once: true } })
          return
        }
        splitChars(title)
        const chars = title.querySelectorAll('.af-split-char')
        gsap.fromTo(
          chars,
          { yPercent: 108, opacity: 0, rotateX: -55 },
          {
            yPercent: 0,
            opacity: 1,
            rotateX: 0,
            duration: 0.85,
            ease: 'power3.out',
            stagger: 0.018,
            scrollTrigger: { trigger: title, start: 'top 88%', once: true }
          }
        )
      })

      /* ---------- 1b. Word-by-word reveals for remaining headings ---------- */
      gsap.utils.toArray<HTMLElement>('main h3, main h4').forEach((title) => {
        if (title.classList.contains('af-split')) return
        if (compact) {
          gsap.fromTo(title, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: .58, ease: 'power2.out', scrollTrigger: { trigger: title, start: 'top 92%', once: true } })
          return
        }
        splitWords(title)
        gsap.fromTo(
          title.querySelectorAll('.af-word'),
          { yPercent: 105, opacity: 0, filter: 'blur(6px)' },
          { yPercent: 0, opacity: 1, filter: 'blur(0px)', duration: 0.78, ease: 'power3.out', stagger: 0.035, scrollTrigger: { trigger: title, start: 'top 90%', once: true } }
        )
      })

      /* all body copy receives a premium fade-up when its parent is not already staggered */
      gsap.utils.toArray<HTMLElement>('main p:not(.af-reveal)').forEach((el) => {
        if (el.closest('[data-af-stagger-item]') || el.closest('[data-af-float]') || el.closest('[data-af-hero-assemble-root]')) return
        gsap.fromTo(el, { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.78, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 92%', once: compact } })
      })

      /* ---------- 2. Generic scroll reveals ---------- */
      gsap.utils.toArray<HTMLElement>('.af-reveal').forEach((el) => {
        const delay = parseFloat(el.dataset.afDelay ?? '0')
        const dir = el.dataset.afFrom ?? 'up'
        const offset: Record<string, { x?: number; y?: number }> = {
          up: { y: 46 },
          down: { y: -46 },
          left: { x: -50 },
          right: { x: 50 },
          none: {}
        }
        gsap.fromTo(
          el,
          { opacity: 0, ...(offset[dir] ?? offset.up) },
          {
            opacity: 1,
            x: 0,
            y: 0,
            duration: 0.95,
            delay,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 90%', once: true }
          }
        )
      })

      /* ---------- 3a. Homepage approach bento — reference-style staged reveal ---------- */
      const featureReference = document.querySelector<HTMLElement>('[data-af-feature-reference]')
      if (featureReference) {
        const cards = gsap.utils.toArray<HTMLElement>('[data-af-stagger-item]', featureReference)
        const fromStates = compact
          ? cards.map(() => ({ x: 0, y: 34, rotation: 0 }))
          : [
              { x: -92, y: 54, rotation: -2.4 },
              { x: 96, y: 26, rotation: 1.7 },
              { x: -74, y: 70, rotation: -1.4 },
              { x: 82, y: 76, rotation: 2.1 }
            ]

        cards.forEach((card, index) => {
          const state = fromStates[index] ?? { x: 0, y: 46, rotation: 0 }
          gsap.fromTo(
            card,
            {
              opacity: 0,
              x: state.x,
              y: state.y,
              rotation: state.rotation,
              scale: compact ? .975 : .94,
              clipPath: compact ? 'inset(0% 0% 12% 0% round 16px)' : 'inset(7% 6% 16% 6% round 22px)',
              transformOrigin: '50% 50%'
            },
            {
              opacity: 1,
              x: 0,
              y: 0,
              rotation: 0,
              scale: 1,
              clipPath: 'inset(0% 0% 0% 0% round 16px)',
              duration: compact ? .72 : 1.05,
              delay: index * (compact ? .06 : .095),
              ease: 'power4.out',
              scrollTrigger: {
                trigger: featureReference,
                start: compact ? 'top 90%' : 'top 78%',
                once: true
              }
            }
          )

          /* The reference cards are animated UI displays, not static photos.
             Each visual gets its own staged timeline after the card enters. */
          const visual = card.querySelector<HTMLElement>('[data-af-feature-visual]')
          const kind = visual?.dataset.afFeatureVisual
          if (visual && kind) {
            const displayTl = gsap.timeline({
              scrollTrigger: { trigger: card, start: compact ? 'top 92%' : 'top 82%', once: true },
              defaults: { ease: 'power3.out' }
            })

            if (kind === 'visibility') {
              const lines = gsap.utils.toArray<SVGPathElement>('.af-fv__line', visual)
              lines.forEach((line) => {
                const length = Math.max(1, line.getTotalLength())
                gsap.set(line, { strokeDasharray: length, strokeDashoffset: length })
              })
              displayTl
                .fromTo(visual.querySelectorAll('.af-fv__metric-strip > span'), { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: .5, stagger: .08 }, 0)
                .to(lines, { strokeDashoffset: 0, duration: 1.15, stagger: .12, ease: 'power2.inOut' }, .08)
                .fromTo(visual.querySelectorAll('.af-fv__points circle'), { scale: 0, opacity: 0, transformOrigin: '50% 50%' }, { scale: 1, opacity: 1, duration: .42, stagger: .07, ease: 'back.out(2)' }, .6)
                .fromTo(visual.querySelector('.af-fv__chart-marker'), { x: -110, y: 34, opacity: 0, scaleY: .62 }, { x: 0, y: 0, opacity: 1, scaleY: 1, duration: .72, ease: 'back.out(1.45)' }, .5)
              gsap.to(visual.querySelector('.af-fv__chart-marker'), { y: -7, duration: 1.7, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 1.2 })
            }

            if (kind === 'trust') {
              displayTl
                .fromTo(visual.querySelector('.af-fv__trust-board'), { y: 70, x: 45, rotation: -13, scale: .9, opacity: 0 }, { y: 0, x: 0, rotation: -6, scale: 1, opacity: 1, duration: .95 }, 0)
                .fromTo(visual.querySelectorAll('.af-fv__board-card'), { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: .48, stagger: .06 }, .26)
                .fromTo(visual.querySelector('.af-fv__trust-hub'), { scale: .35, rotation: -90, opacity: 0 }, { scale: 1, rotation: 0, opacity: 1, duration: .75, ease: 'back.out(1.8)' }, .18)
                .fromTo(visual.querySelectorAll('.af-fv__trust-particles i'), { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: .35, stagger: .035 }, .34)
              gsap.to(visual.querySelector('.af-fv__trust-hub'), { y: -6, rotation: 3, duration: 2.1, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 1.2 })
              gsap.to(visual.querySelectorAll('.af-fv__trust-particles i'), { y: 'random(-9,5)', x: 'random(-5,5)', opacity: 'random(.25,1)', duration: 1.8, stagger: { each: .08, from: 'random', repeat: -1, yoyo: true }, ease: 'sine.inOut' })
            }

            if (kind === 'inquiries') {
              const paths = gsap.utils.toArray<SVGPathElement>('.af-fv__inquiry-links path', visual)
              paths.forEach((path) => {
                const length = Math.max(1, path.getTotalLength())
                gsap.set(path, { strokeDasharray: length, strokeDashoffset: length })
              })
              displayTl
                .fromTo(visual.querySelector('.af-fv__donut-card'), { x: -55, opacity: 0, rotation: -4 }, { x: 0, opacity: 1, rotation: 0, duration: .75 }, 0)
                .fromTo(visual.querySelector('.af-fv__flow-card'), { x: 58, opacity: 0, rotation: 3 }, { x: 0, opacity: 1, rotation: 0, duration: .78 }, .06)
                .to(paths, { strokeDashoffset: 0, duration: .7, stagger: .1, ease: 'power2.inOut' }, .24)
                .fromTo(visual.querySelector('.af-fv__inquiry-hub'), { scale: .25, opacity: 0 }, { scale: 1, opacity: 1, duration: .62, ease: 'back.out(2)' }, .32)
                .fromTo(visual.querySelectorAll('.af-fv__flow-row'), { y: 13, opacity: 0 }, { y: 0, opacity: 1, duration: .38, stagger: .07 }, .42)
              gsap.to(visual.querySelector('.af-fv__donut'), { rotation: 360, duration: 18, repeat: -1, ease: 'none' })
              gsap.to(visual.querySelector('.af-fv__inquiry-hub'), { scale: 1.06, duration: 1.3, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 1.1 })
            }

            if (kind === 'managed') {
              const paths = gsap.utils.toArray<SVGPathElement>('.af-fv__managed-links path', visual)
              paths.forEach((path) => {
                const length = Math.max(1, path.getTotalLength())
                gsap.set(path, { strokeDasharray: length, strokeDashoffset: length })
              })
              displayTl
                .fromTo(visual.querySelector('.af-fv__managed-cone'), { opacity: 0, scaleY: .4, transformOrigin: '50% 100%' }, { opacity: .78, scaleY: 1, duration: .8 }, 0)
                .fromTo(visual.querySelector('.af-fv__managed-hub'), { scale: .2, rotation: -80, opacity: 0 }, { scale: 1, rotation: 0, opacity: 1, duration: .7, ease: 'back.out(2)' }, .08)
                .to(paths, { strokeDashoffset: 0, duration: .72, stagger: .055, ease: 'power2.inOut' }, .28)
                .fromTo(visual.querySelectorAll('.af-fv__managed-node'), { scale: .35, opacity: 0 }, { scale: 1, opacity: 1, duration: .45, stagger: .07, ease: 'back.out(1.8)' }, .38)
              gsap.to(visual.querySelector('.af-fv__managed-hub'), { y: -5, scale: 1.035, duration: 1.8, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 1.1 })
              gsap.to(visual.querySelectorAll('.af-fv__managed-node b'), { boxShadow: '0 0 24px rgba(0,187,160,.42)', duration: 1.65, repeat: -1, yoyo: true, stagger: .16, ease: 'sine.inOut' })
            }
          }

          if (!compact) {
            const glow = card.querySelector<HTMLElement>('.af-feat__glow')
            const onEnter = () => {
              gsap.to(card, { y: -8, scale: 1.008, duration: .42, ease: 'power2.out', overwrite: 'auto' })
              if (glow) gsap.to(glow, { opacity: .48, scale: 1.16, duration: .48, ease: 'power2.out', overwrite: 'auto' })
            }
            const onLeave = () => {
              gsap.to(card, { y: 0, scale: 1, duration: .48, ease: 'power3.out', overwrite: 'auto' })
              if (glow) gsap.to(glow, { opacity: index === 1 ? .2 : index === 2 ? .16 : .3, scale: 1, duration: .5, ease: 'power3.out', overwrite: 'auto' })
            }
            card.addEventListener('mouseenter', onEnter)
            card.addEventListener('mouseleave', onLeave)
            processCleanups.push(() => {
              card.removeEventListener('mouseenter', onEnter)
              card.removeEventListener('mouseleave', onLeave)
            })
          }
        })
      }

      /* ---------- 3b. Staggered groups (cards / grids) ---------- */
      gsap.utils.toArray<HTMLElement>('[data-af-stagger]').forEach((group) => {
        if (group.matches('[data-af-feature-reference]')) return
        const items = group.querySelectorAll<HTMLElement>('[data-af-stagger-item]')
        if (!items.length) return
        gsap.fromTo(
          items,
          { opacity: 0, y: 52, scale: 0.965 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: 'power3.out',
            stagger: 0.1,
            scrollTrigger: { trigger: group, start: 'top 85%', once: true }
          }
        )
      })

      /* ---------- 3c. FAQ reference light vault + sparkle entrance ---------- */
      const faqArc = document.querySelector<HTMLElement>('[data-af-faq-arc]')
      if (faqArc) {
        const strokes = gsap.utils.toArray<SVGPathElement>('.af-faq__arc-stroke', faqArc)
        const halo = faqArc.querySelector<HTMLElement>('.af-faq__arc-halo')
        const glow = faqArc.querySelector<HTMLElement>('.af-faq__arc-glow')
        const beam = faqArc.querySelector<HTMLElement>('.af-faq__arc-beam')
        const sparks = gsap.utils.toArray<HTMLElement>('.af-faq__spark', faqArc)
        strokes.forEach((path) => {
          const length = Math.max(1, path.getTotalLength())
          gsap.set(path, { strokeDasharray: length, strokeDashoffset: length })
        })
        const faqTl = gsap.timeline({
          scrollTrigger: { trigger: faqArc.closest('.af-faq') ?? faqArc, start: 'top 86%', once: true }
        })
        faqTl
          .fromTo(glow, { opacity: 0, scale: .68 }, { opacity: .82, scale: 1, duration: 1.1, ease: 'power2.out' }, 0)
          .fromTo(halo, { opacity: 0, scale: .7, y: -22 }, { opacity: .96, scale: 1, y: 0, duration: 1.25, ease: 'power2.out' }, .04)
          .fromTo(beam, { opacity: 0, scaleX: .52, y: -18 }, { opacity: .9, scaleX: 1, y: 0, duration: 1.15, ease: 'power3.out' }, .08)
          .to(strokes, { strokeDashoffset: 0, duration: 1.22, stagger: .06, ease: 'power2.inOut' }, .03)
          .fromTo(sparks, { opacity: 0, y: 18, scale: .2 }, { opacity: .9, y: 0, scale: 1, duration: .62, ease: 'back.out(2.2)', stagger: .035 }, .34)

        if (sparks.length) {
          gsap.to(sparks, {
            y: 'random(-7,3)',
            x: 'random(-3,3)',
            opacity: 'random(.24,1)',
            scale: 'random(.65,1.35)',
            duration: 1.7,
            ease: 'sine.inOut',
            stagger: { each: .07, from: 'random', repeat: -1, yoyo: true },
            delay: 1.4
          })
        }
      }

      /* ---------- 4. Parallax drift on decorative layers ---------- */
      if (!compact) gsap.utils.toArray<HTMLElement>('[data-af-parallax]').forEach((el) => {
        const strength = parseFloat(el.dataset.afParallax || '80')
        gsap.to(el, {
          y: strength,
          ease: 'none',
          scrollTrigger: {
            trigger: el.closest('.af-section') ?? el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.1
          }
        })
      })

      /* ---------- 5/6. Hero V27: one dashboard box, one synchronized reference settle ---------- */
      const heroAssembly = document.querySelector<HTMLElement>('[data-af-hero-assemble-root]')
      if (heroAssembly) {
        const stage = heroAssembly.closest<HTMLElement>('.af-hero__stage') ?? heroAssembly
        const canvas = heroAssembly.querySelector<HTMLElement>('[data-af-hero-reference-canvas], [data-af-hero-unified-canvas]') ?? heroAssembly
        const shell = heroAssembly.querySelector<HTMLElement>('[data-af-hero-assemble-shell]')
        const parts = gsap.utils.toArray<HTMLElement>('[data-af-hero-assemble-part]', canvas)
        const glows = gsap.utils.toArray<HTMLElement>('[data-af-hero-assemble-glow]', canvas)
        const phone = window.matchMedia('(max-width: 620px)').matches
        const tablet = window.matchMedia('(max-width: 960px) and (min-width: 621px)').matches
        const scatterMult = (() => {
          const raw = parseFloat(getComputedStyle(heroAssembly).getPropertyValue('--af-scatter-mult'))
          return Number.isFinite(raw) && raw >= 0 ? raw : 1
        })()
        const flatReferenceDock = heroAssembly.matches('[data-af-hero-reference-dock-v33="true"]')
        const restRotation = (part: HTMLElement) => {
          // The V33/V34 reference dock must finish as a clean, axis-aligned dashboard.
          // Older homepage CSS still exposes legacy --af-rest-r tilt values, so do not
          // allow those values to leak into the final GSAP transform.
          if (flatReferenceDock) return 0
          const raw = parseFloat(getComputedStyle(part).getPropertyValue('--af-rest-r'))
          return Number.isFinite(raw) ? raw : 0
        }

        if (phone) {
          gsap.set(parts, { x: 0, y: 0, rotation: 0, scale: 1, opacity: 1, clearProps: 'willChange' })
          gsap.set(glows, { clearProps: 'transform' })
          if (shell) gsap.set(shell, { x: 0, y: 0, scale: 1, rotation: 0, opacity: 1, clearProps: 'willChange' })

          const mobileItems = shell ? [shell, ...parts] : parts
          gsap.fromTo(
            mobileItems,
            { opacity: 0, y: 16, scale: .992 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: .52,
              stagger: .025,
              ease: 'power2.out',
              scrollTrigger: { trigger: stage, start: 'top 94%', once: true }
            }
          )
        } else {
          gsap.set(heroAssembly, { perspective: 1600 })
          // The central dashboard is the fixed anchor. Only the cards travel.
          if (shell) gsap.set(shell, { x: 0, y: 0, scale: 1, rotation: 0, opacity: 1, clearProps: 'willChange' })

          parts.forEach((part) => {
            const styles = getComputedStyle(part)
            const x = (parseFloat(styles.getPropertyValue('--af-scatter-x')) || 0) * scatterMult
            const y = (parseFloat(styles.getPropertyValue('--af-scatter-y')) || 0) * scatterMult
            const scatterRotation = (parseFloat(styles.getPropertyValue('--af-scatter-r')) || 0) * (tablet ? .72 : 1)
            const scaleRaw = parseFloat(styles.getPropertyValue('--af-scatter-s')) || 1
            const scale = 1 - ((1 - scaleRaw) * (tablet ? .72 : 1))

            gsap.set(part, {
              x,
              y,
              rotation: restRotation(part) + scatterRotation,
              scale,
              opacity: .985,
              transformOrigin: '50% 50%',
              force3D: true,
              autoRound: false,
              willChange: 'transform'
            })
          })

          glows.forEach((glow, index) => {
            gsap.set(glow, {
              xPercent: index ? 6 : -5,
              yPercent: index ? 7 : -4,
              scale: index ? 1.045 : 1.07,
              opacity: index ? .32 : .44,
              force3D: true
            })
          })

          /*
            All hero modules, including the generated Response Rate card, settle in ONE tween at the same playhead position.
            The short trigger range + low scrub smoothing reproduces the reference's
            quick cohesive snap-in instead of the previous slow multi-group drift.
          */
          const heroSection = heroAssembly.closest<HTMLElement>('.af-hero') ?? stage
          const applyExactDock = () => {
            gsap.set(parts, {
              x: 0,
              y: 0,
              rotation: (_index, target) => restRotation(target as HTMLElement),
              scale: 1,
              opacity: 1,
              force3D: true,
              autoRound: false
            })
            heroAssembly.classList.add('af-hpd--docked')
          }
          const assembly = gsap.timeline({
            defaults: { ease: 'none' },
            scrollTrigger: {
              trigger: heroSection,
              start: 'top top',
              end: () => `+=${tablet ? 360 : 420}`,
              scrub: tablet ? .16 : .13,
              invalidateOnRefresh: true,
              fastScrollEnd: true,
              onRefreshInit: () => heroAssembly.classList.remove('af-hpd--docked'),
              onUpdate: (self) => {
                // Do not clip the travelling cards early. The frame becomes the final
                // dashboard only when the tween has effectively reached its exact end.
                if (self.progress >= .9985) applyExactDock()
                else heroAssembly.classList.remove('af-hpd--docked')
              },
              onLeave: applyExactDock,
              onScrubComplete: (self) => { if (self.progress >= .995) applyExactDock() },
              onEnterBack: () => heroAssembly.classList.remove('af-hpd--docked'),
              onLeaveBack: () => heroAssembly.classList.remove('af-hpd--docked')
            }
          })

          assembly.to(parts, {
            x: 0,
            y: 0,
            rotation: (_index, target) => restRotation(target as HTMLElement),
            scale: 1,
            opacity: 1,
            duration: 1,
            ease: 'none',
            force3D: true,
            autoRound: false,
            overwrite: 'auto'
          }, 0)
          assembly.to(glows, { xPercent: 0, yPercent: 0, scale: 1, opacity: .34, duration: 1, ease: 'none', force3D: true }, 0)

          /* Reference hover: quick lift and a faster snap back to the resting pose. */
          const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches
          if (canHover) {
            parts.forEach((part) => {
              const enter = () => {
                if ((assembly.scrollTrigger?.progress ?? 0) < .97) return
                gsap.to(part, { y: -6, scale: 1.016, duration: .14, ease: 'power2.out', overwrite: 'auto' })
              }
              const leave = () => {
                if ((assembly.scrollTrigger?.progress ?? 0) < .97) return
                gsap.to(part, { y: 0, scale: 1, rotation: restRotation(part), duration: .16, ease: 'power3.out', overwrite: 'auto' })
              }
              part.addEventListener('mouseenter', enter)
              part.addEventListener('mouseleave', leave)
              part.addEventListener('focusin', enter)
              part.addEventListener('focusout', leave)
              processCleanups.push(() => {
                part.removeEventListener('mouseenter', enter)
                part.removeEventListener('mouseleave', leave)
                part.removeEventListener('focusin', enter)
                part.removeEventListener('focusout', leave)
              })
            })
          }
        }
      }

      /* ---------- 7. Counters ---------- */
      gsap.utils.toArray<HTMLElement>('[data-af-count]').forEach((el) => {
        const target = parseFloat(el.dataset.afCount || '0')
        const suffix = el.dataset.afCountSuffix ?? ''
        const obj = { v: 0 }
        gsap.to(obj, {
          v: target,
          duration: 1.9,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 92%', once: true },
          onUpdate: () => {
            el.textContent =
              (target % 1 === 0 ? Math.round(obj.v).toLocaleString() : obj.v.toFixed(1)) + suffix
          }
        })
      })

      /* ---------- 8. Vertical marquee columns (testimonials) ---------- */
      if (!compact) gsap.utils.toArray<HTMLElement>('[data-af-vmarquee]').forEach((col) => {
        const dir = col.dataset.afVmarquee === 'down' ? 1 : -1
        const inner = col.firstElementChild as HTMLElement | null
        if (!inner) return
        const dist = inner.scrollHeight / 2
        if (dist < 40) return
        gsap.set(inner, { y: dir === 1 ? -dist : 0 })
        gsap.to(inner, {
          y: dir === 1 ? 0 : -dist,
          duration: 34,
          ease: 'none',
          repeat: -1
        })
      })

      /* ---------- 8b. Image / vector reveal + scrubbed section headings ---------- */
      gsap.utils.toArray<HTMLElement>('.af-ai-visual, .af-feat__visual').forEach((el) => {
        if (compact) {
          gsap.fromTo(el, { y: 14, opacity: .72 }, { y: 0, opacity: 1, duration: .56, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 93%', once: true } })
        } else {
          gsap.fromTo(el, { clipPath: 'inset(13% 8% 13% 8% round 20px)', scale: 1.05, opacity: .55 }, { clipPath: 'inset(0% 0% 0% 0% round 20px)', scale: 1, opacity: 1, duration: .95, ease: 'power4.out', scrollTrigger: { trigger: el, start: 'top 90%', once: true } })
        }
      })
      gsap.utils.toArray<HTMLElement>('.af-sec-head').forEach((el) => {
        if (compact) {
          gsap.fromTo(el, { y: 12, opacity: .75 }, { y: 0, opacity: 1, duration: .55, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 94%', once: true } })
        } else {
          gsap.fromTo(el, { xPercent: -2, opacity: .72 }, { xPercent: 0, opacity: 1, ease: 'none', scrollTrigger: { trigger: el, start: 'top 96%', end: 'top 60%', scrub: .8 } })
        }
      })

      /* ---------- 8c. How We Work: shared hover choreography on all four cards ---------- */
      processCleanups.push(setupProcessCardHover(gsap.utils.toArray<HTMLElement>('[data-af-process-card]')))

      /* ---------- 9. Section background glow breathing ---------- */
      gsap.utils.toArray<HTMLElement>('[data-af-breathe]').forEach((el, i) => {
        gsap.to(el, {
          scale: 1.14,
          opacity: 0.78,
          duration: 4.5 + i * 0.6,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true
        })
      })
    })

    /* Recalculate once after initial layout settles. Avoid anonymous late load
       refreshes that can fire after the visitor has started scrolling. */
    const refreshOnce = () => {
      if (window.scrollY < 48) ScrollTrigger.refresh()
    }
    const t = window.setTimeout(refreshOnce, 320)
    window.addEventListener('load', refreshOnce, { once: true })

    return () => {
      window.clearTimeout(t)
      window.removeEventListener('load', refreshOnce)
      processCleanups.forEach((cleanup) => cleanup())
      ctx.revert()
    }
  }, [])
}
