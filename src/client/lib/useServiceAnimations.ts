import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { ServiceLayout } from '../data/servicePages'

gsap.registerPlugin(ScrollTrigger)

type SplitMode = 'words' | 'chars'
function splitText(el: HTMLElement, mode: SplitMode) {
  const original = el.innerHTML
  const text = el.textContent || ''
  el.textContent = ''
  text.split(/(\s+)/).forEach((part) => {
    if (/^\s+$/.test(part)) {
      el.append(document.createTextNode(part))
      return
    }
    const wrap = document.createElement('span')
    wrap.className = 'sv-word-wrap'
    if (mode === 'words') {
      const span = document.createElement('span')
      span.className = 'sv-word'
      span.textContent = part
      wrap.append(span)
    } else {
      Array.from(part).forEach((char) => {
        const span = document.createElement('span')
        span.className = 'sv-char'
        span.textContent = char
        wrap.append(span)
      })
    }
    el.append(wrap)
  })
  return () => { el.innerHTML = original }
}

export function useServiceAnimations(layout: ServiceLayout) {
  useEffect(() => {
    if (layout !== '02') return
    const root = document.querySelector<HTMLElement>('.sv-page')
    if (!root) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const compact = window.matchMedia('(max-width: 760px)').matches
    if (reduce) return
    ScrollTrigger.config({ limitCallbacks: true, ignoreMobileResize: true })
    const restore: Array<() => void> = []
    const cleanup: Array<() => void> = []

    if (layout === '02') {
      const ctx = gsap.context(() => {
        const reveal = (target: any, trigger: any, from: gsap.TweenVars = { y: 34, opacity: 0 }, delay = 0) => {
          gsap.fromTo(target, from, {
            y: 0,
            x: 0,
            opacity: 1,
            scale: 1,
            duration: .78,
            delay,
            ease: 'power3.out',
            scrollTrigger: { trigger, start: 'top 90%', once: true }
          })
        }

        /* Hero entrance */
        const hero = root.querySelector<HTMLElement>('.sv-hero')
        if (hero) {
          reveal('.sv-rating-pill', hero, { y: 18, opacity: 0 })
          gsap.fromTo('.sv-display--brand .sv-display__line', { y: 42, opacity: 0 }, { y: 0, opacity: 1, duration: .78, stagger: .1, ease: 'power4.out', delay: .08 })
          gsap.fromTo('.sv-hero__copy .sv-lead,.sv-hero__copy .sv-actions,.sv-hero__copy .sv-positioning', { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: .62, stagger: .08, ease: 'power3.out', delay: .34 })
          gsap.fromTo('[data-brand-flip-stack]', { x: 28, opacity: 0 }, { x: 0, opacity: 1, duration: .78, ease: 'power4.out', delay: .18, clearProps: 'x' })
        }

        /* Keep the rebuilt hero card visually equal to the left content without any scroll-driven movement. */
        const heroGrid = root.querySelector<HTMLElement>('.sv-hero__grid')
        const heroCopy = root.querySelector<HTMLElement>('.sv-hero__copy')
        const heroStack = root.querySelector<HTMLElement>('[data-brand-flip-stack]')
        if (heroGrid && heroCopy && heroStack) {
          const syncHeroBalance = () => {
            const copyHeight = Math.max(600, Math.round(heroCopy.getBoundingClientRect().height))
            heroGrid.style.setProperty('--af-hero-copy-height', `${copyHeight}px`)
            heroStack.style.setProperty('--af-hero-copy-height', `${copyHeight}px`)
          }
          syncHeroBalance()
          const onHeroResize = () => syncHeroBalance()
          window.addEventListener('resize', onHeroResize)
          cleanup.push(() => window.removeEventListener('resize', onHeroResize))
          if ('ResizeObserver' in window) {
            const observer = new ResizeObserver(syncHeroBalance)
            observer.observe(heroCopy)
            cleanup.push(() => observer.disconnect())
          }
          window.setTimeout(syncHeroBalance, 120)
        }

        /* Hero card size is CSS-driven and intentionally stable. Do not resize it from the animated type box. */

        /* Reference-style text box. The pen tracks the collapsing edge. */
        const typeBox = root.querySelector<HTMLElement>('[data-brand-typebox]')
        const panel = root.querySelector<HTMLElement>('[data-brand-typebox-panel]')
        const pen = typeBox?.querySelector<HTMLElement>('.sv-hero-typebox__pen')
        const words = Array.from(root.querySelectorAll<HTMLElement>('[data-brand-typebox-word]'))
        const hint = root.querySelector<HTMLElement>('[data-brand-typebox-hint]')
        if (typeBox && panel && pen && words.length && hint) {
          gsap.set(panel, { transformOrigin: 'left center', scaleX: 1 })
          gsap.set(words, { autoAlpha: 0, y: 12, position: 'absolute' })
          gsap.set(words[0], { autoAlpha: 1, y: 0, position: 'relative' })
          const typeTimeline = gsap.timeline({ repeat: -1, delay: 1.6 })
          const sequence = [...words.slice(1), words[0]]
          sequence.forEach((next) => {
            typeTimeline
              .to(panel, { scaleX: .11, duration: .34, ease: 'power2.in' }, '+=1.5')
              .to(pen, { x: () => -(Math.max(180, panel.offsetWidth * .83)), y: -2, rotation: -18, duration: .34, ease: 'power2.in' }, '<')
              .call(() => {
                gsap.set(words, { autoAlpha: 0, y: 12, position: 'absolute' })
                hint.textContent = next.dataset.hint || ''
                gsap.set(next, { position: 'relative' })
              })
              .to(panel, { scaleX: 1, duration: .5, ease: 'power3.out' })
              .to(pen, { x: 12, y: 2, rotation: 8, duration: .48, ease: 'power3.out' }, '<')
              .fromTo(next, { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: .34, ease: 'power3.out' }, '<.08')
              .to(pen, { x: 0, y: 0, rotation: 0, duration: .2, ease: 'power2.out' })
          })
        }

        /* Reference hero dashboard: no auto-flip. The front turns to the back only
           as the visitor scrolls through the lower half of the hero. */
        const flip = root.querySelector<HTMLElement>('[data-brand-flip]')
        if (flip && hero) {
          gsap.set(flip, {
            transformStyle: 'preserve-3d',
            transformPerspective: 1800,
            transformOrigin: '50% 50%',
            rotationX: 0,
            force3D: true
          })
          const flipTween = gsap.to(flip, {
            rotationX: 180,
            ease: 'none',
            force3D: true,
            scrollTrigger: {
              trigger: hero,
              start: 'top top',
              end: '+=280',
              scrub: .22,
              invalidateOnRefresh: true,
              onLeave: () => gsap.set(flip, { rotationX: 180 }),
              onLeaveBack: () => gsap.set(flip, { rotationX: 0 })
            }
          })
          cleanup.push(() => flipTween.kill())
        }
        root.querySelectorAll<HTMLElement>('[data-brand-hero-bottom]').forEach((badge, i) => {
          gsap.fromTo(badge, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: .56, delay: .54 + i * .08, ease: 'power3.out', clearProps: 'y' })
          if (!compact) gsap.to(badge, { y: i % 2 ? -8 : 8, duration: 2.8 + i * .24, repeat: -1, yoyo: true, ease: 'sine.inOut' })
        })
        root.querySelectorAll<HTMLElement>('[data-brand-hero-float]').forEach((side, i) => {
          const direction = side.classList.contains('sv-copy-side--right-top') || side.classList.contains('sv-copy-side--right-bottom') ? 22 : -22
          gsap.fromTo(side, { opacity: 0, x: direction, scale: .94 }, { opacity: 1, x: 0, scale: 1, duration: .66, delay: .42 + i * .08, ease: 'back.out(1.24)', clearProps: 'x,scale' })
          if (!compact) {
            gsap.to(side, {
              y: i % 2 ? -10 : 10,
              x: i % 2 ? -4 : 4,
              duration: 3.2 + i * .22,
              repeat: -1,
              yoyo: true,
              ease: 'sine.inOut'
            })
          }
        })

        /* Bridge sections */
        root.querySelectorAll<HTMLElement>('.sv-trust-strip,.af-marquee,.sv-service-editorial,.sv-brand-reference-strip').forEach((section) => {
          gsap.fromTo(section, { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: .72, ease: 'power3.out', scrollTrigger: { trigger: section, start: 'top 94%', once: true } })
        })

        const referenceStrip = root.querySelector<HTMLElement>('.sv-brand-reference-strip')
        const referenceTrack = root.querySelector<HTMLElement>('.sv-brand-reference-strip__track')
        const referencePoints = Array.from(root.querySelectorAll<HTMLElement>('.sv-brand-reference-strip__point'))
        if (referenceStrip && referenceTrack) {
          gsap.fromTo(referenceTrack, { autoAlpha: 0, scaleX: .86 }, {
            autoAlpha: 1,
            scaleX: 1,
            duration: .72,
            ease: 'power3.out',
            transformOrigin: '50% 50%',
            scrollTrigger: { trigger: referenceStrip, start: 'top 90%', once: true }
          })
          if (referencePoints.length) {
            gsap.fromTo(referencePoints, { scale: 0, autoAlpha: 0 }, {
              scale: 1,
              autoAlpha: 1,
              duration: .34,
              stagger: .05,
              ease: 'back.out(1.7)',
              scrollTrigger: { trigger: referenceStrip, start: 'top 88%', once: true }
            })
          }
        }

        const brandFeatureIntro = root.querySelector<HTMLElement>('[data-brand-feature-intro]')
        if (brandFeatureIntro) {
          const introCard = brandFeatureIntro.querySelector<HTMLElement>('.sv-brand-features__intro-card')
          if (introCard) {
            const introReveal = gsap.fromTo(introCard,
              { autoAlpha: 0, y: 34, scale: .965 },
              {
                autoAlpha: 1, y: 0, scale: 1, duration: .82, ease: 'power4.out',
                scrollTrigger: { trigger: brandFeatureIntro, start: 'top 84%', once: true }
              }
            )
            cleanup.push(() => introReveal.kill())
          }
        }

        /* Features V35 — compact sticky reveal with no ScrollTrigger pin spacer.
           The section now keeps the visual stage visible while the intro fades out and
           the cards reveal. This removes the broken fixed-pin/blank-space behavior that
           was caused by later !important position rules fighting ScrollTrigger. */
        const featureSection = root.querySelector<HTMLElement>('[data-brand-feature-section]')
        const featureStory = root.querySelector<HTMLElement>('[data-brand-feature-story]')
        const featurePin = root.querySelector<HTMLElement>('[data-brand-feature-pin]')
        const featureStage = root.querySelector<HTMLElement>('[data-brand-feature-stage]')
        const featureIntro = root.querySelector<HTMLElement>('[data-brand-feature-intro]')
        const featureGrid = root.querySelector<HTMLElement>('[data-brand-feature-grid]')
        const featureCards = Array.from(root.querySelectorAll<HTMLElement>('[data-brand-feature-card]'))
        if (featureSection && featureStory && featurePin && featureStage && featureIntro && featureGrid && featureCards.length) {
          // Remove only stale feature-story triggers left by previous route mounts.
          ScrollTrigger.getAll().forEach((trigger) => {
            const triggerEl = trigger.trigger as Element | undefined
            const pinEl = trigger.pin as Element | undefined
            if (triggerEl === featureSection || triggerEl === featureStory || triggerEl === featurePin || triggerEl === featureStage || pinEl === featurePin || pinEl === featureStage) trigger.kill(true)
          })

          const prepareCardInternals = (card: HTMLElement) => ({
            orbitRings: Array.from(card.querySelectorAll<HTMLElement>('.sv-orbit-ring')),
            orbitNodes: Array.from(card.querySelectorAll<HTMLElement>('.sv-orbit-node')),
            orbitGlyphs: Array.from(card.querySelectorAll<SVGElement>('.sv-orbit-node > .af-inline-svg-icon > svg')),
            orbitCore: card.querySelector<HTMLElement>('.sv-orbit-core'),
            hubCore: card.querySelector<HTMLElement>('.sv-brand-display-visual--hub .center'),
            hubPills: Array.from(card.querySelectorAll<HTMLElement>('.sv-brand-display-visual--hub > span')),
            hubLines: Array.from(card.querySelectorAll<SVGPathElement>('.sv-brand-hub-lines path')),
            messageParts: Array.from(card.querySelectorAll<HTMLElement>('.sv-message-avatar,.sv-brand-display-visual--message strong,.sv-brand-display-visual--message p,.sv-message-chat,.sv-brand-display-visual--message > b')),
            browser: card.querySelector<HTMLElement>('.sv-mini-browser'),
            browserParts: Array.from(card.querySelectorAll<HTMLElement>('.sv-mini-browser__canvas > span,.sv-mini-browser__canvas > b,.sv-mini-browser__canvas > em,.sv-brand-display-visual--timeline .sv-badge,.sv-brand-display-visual--timeline .sv-lines')),
            sheetParts: Array.from(card.querySelectorAll<HTMLElement>('.sv-sheet-network span,.sv-sheet-network i,.sv-brand-display-visual--sheet .sv-sheet,.sv-brand-display-visual--sheet .sv-sheet > b'))
          })

          const animateInternals = (timeline: gsap.core.Timeline, card: HTMLElement, at: number) => {
            const parts = prepareCardInternals(card)
            if (parts.orbitRings.length) timeline.fromTo(parts.orbitRings, { autoAlpha: 0, scale: .76, rotation: -12 }, { autoAlpha: 1, scale: 1, rotation: 0, duration: .38, stagger: .05, ease: 'back.out(1.35)' }, at)
            if (parts.orbitCore) timeline.fromTo(parts.orbitCore, { autoAlpha: 0, scale: .72 }, { autoAlpha: 1, scale: 1, duration: .32, ease: 'back.out(1.55)' }, at + .03)
            if (parts.orbitNodes.length) timeline.fromTo(parts.orbitNodes, { autoAlpha: 0, scale: .58, y: 10 }, { autoAlpha: 1, scale: 1, y: 0, duration: .3, stagger: .035, ease: 'back.out(1.7)' }, at + .06)
            if (parts.orbitGlyphs.length) timeline.fromTo(parts.orbitGlyphs, { scale: .35, rotation: -26, transformOrigin: '50% 50%' }, { scale: 1, rotation: 0, duration: .34, stagger: .04, ease: 'back.out(1.9)' }, at + .09)
            if (parts.hubCore) timeline.fromTo(parts.hubCore, { autoAlpha: 0, scale: .72 }, { autoAlpha: 1, scale: 1, duration: .34, ease: 'back.out(1.6)' }, at)
            if (parts.hubLines.length) timeline.fromTo(parts.hubLines, { autoAlpha: 0 }, { autoAlpha: 1, duration: .3, stagger: .025, ease: 'power2.out' }, at + .02)
            if (parts.hubPills.length) timeline.fromTo(parts.hubPills, { autoAlpha: 0, scale: .8, y: 8 }, { autoAlpha: 1, scale: 1, y: 0, duration: .3, stagger: .04, ease: 'power3.out' }, at + .05)
            if (parts.messageParts.length) timeline.fromTo(parts.messageParts, { autoAlpha: 0, y: 9 }, { autoAlpha: 1, y: 0, duration: .3, stagger: .035, ease: 'power3.out' }, at)
            if (parts.browser) timeline.fromTo(parts.browser, { autoAlpha: 0, y: -14, scale: .96 }, { autoAlpha: 1, y: 0, scale: 1, duration: .34, ease: 'power3.out' }, at)
            if (parts.browserParts.length) timeline.fromTo(parts.browserParts, { autoAlpha: 0, y: 7 }, { autoAlpha: 1, y: 0, duration: .26, stagger: .035, ease: 'power2.out' }, at + .06)
            if (parts.sheetParts.length) timeline.fromTo(parts.sheetParts, { autoAlpha: 0, y: 9, scale: .94 }, { autoAlpha: 1, y: 0, scale: 1, duration: .3, stagger: .04, ease: 'power3.out' }, at)
          }

          gsap.set([featurePin, featureStage], { clearProps: 'transform' })

          if (!compact) {
            gsap.set(featureIntro, { autoAlpha: 1, y: 0, scale: 1 })
            gsap.set(featureGrid, { autoAlpha: 0 })
            gsap.set(featureCards, { autoAlpha: 0, y: 38, scale: .97, rotateX: -2.5, transformOrigin: '50% 50%' })

            // One compact sticky story: intro is fully visible first, then the five-card
            // reference grid replaces it without an empty frame and holds before release.
            const featureTimeline = gsap.timeline({ paused: true, defaults: { ease: 'none' } })
              .to({}, { duration: .11 })
              .to(featureIntro, { autoAlpha: 0, y: -18, scale: .99, duration: .22, ease: 'power2.inOut' })
              .to(featureGrid, { autoAlpha: 1, duration: .16, ease: 'power2.out' }, '-=.11')
              .to(featureCards, { autoAlpha: 1, y: 0, scale: 1, rotateX: 0, duration: .50, stagger: .06, ease: 'power3.out' }, '-=.07')
              .to({}, { duration: .20 })

            featureCards.forEach((card, index) => animateInternals(featureTimeline, card, .32 + index * .06))

            const featureTrigger = ScrollTrigger.create({
              animation: featureTimeline,
              trigger: featureStory,
              start: 'top top+=72',
              end: 'bottom bottom',
              scrub: .42,
              invalidateOnRefresh: true,
              onLeave: () => featureTimeline.progress(1),
              onLeaveBack: () => featureTimeline.progress(0)
            })
            cleanup.push(() => { featureTrigger.kill(true); featureTimeline.kill() })
          } else {
            // Mobile stays in natural document flow: the intro scrolls away normally and
            // each card reveals as it enters, avoiding any tall pinned blank region.
            gsap.set(featureIntro, { autoAlpha: 1, y: 0, scale: 1 })
            gsap.set(featureGrid, { autoAlpha: 1 })
            gsap.set(featureCards, { autoAlpha: 0, y: 26, scale: .985, rotateX: 0 })

            const introExit = gsap.to(featureIntro, {
              autoAlpha: .18,
              y: -18,
              ease: 'none',
              scrollTrigger: { trigger: featureIntro, start: 'top top+=74', end: 'bottom top+=118', scrub: .25 }
            })
            cleanup.push(() => introExit.kill())

            featureCards.forEach((card, index) => {
              const cardTween = gsap.to(card, {
                autoAlpha: 1,
                y: 0,
                scale: 1,
                duration: .58,
                delay: Math.min(index * .035, .12),
                ease: 'power3.out',
                scrollTrigger: { trigger: card, start: 'top 90%', once: true }
              })
              cleanup.push(() => cardTween.kill())
            })
          }

          /* Living motion stays inside each feature card and only animates transforms/opacity. */
          featureCards.forEach((card, cardIndex) => {
            card.querySelectorAll<HTMLElement>('.sv-orbit-ring').forEach((ring, i) => {
              const spin = gsap.to(ring, { rotation: i % 2 ? -360 : 360, duration: 20 + i * 4, repeat: -1, ease: 'none', transformOrigin: '50% 50%' })
              cleanup.push(() => spin.kill())
            })
            card.querySelectorAll<HTMLElement>('.sv-orbit-node,.sv-brand-display-visual--hub > span').forEach((node, i) => {
              const drift = gsap.to(node, { y: i % 2 ? -4 : 4, x: i % 3 ? 2 : -2, duration: 2.4 + i * .13, repeat: -1, yoyo: true, ease: 'sine.inOut' })
              cleanup.push(() => drift.kill())
            })
            card.querySelectorAll<SVGElement>('.sv-orbit-node > .af-inline-svg-icon > svg').forEach((glyph, i) => {
              const glyphMotion = gsap.to(glyph, { rotation: i % 2 ? 7 : -7, scale: 1.08, duration: 1.7 + i * .12, repeat: -1, yoyo: true, ease: 'sine.inOut', transformOrigin: '50% 50%' })
              cleanup.push(() => glyphMotion.kill())
            })
            const hubCore = card.querySelector<HTMLElement>('.sv-brand-display-visual--hub .center')
            if (hubCore) {
              const pulse = gsap.to(hubCore, { scale: 1.055, boxShadow: '0 0 0 17px rgba(0,187,160,.08),0 0 32px rgba(0,187,160,.20)', duration: 1.5, repeat: -1, yoyo: true, ease: 'sine.inOut' })
              cleanup.push(() => pulse.kill())
            }
            card.querySelectorAll<HTMLElement>('.sv-brand-display-visual--message > b,.sv-mini-browser__canvas > b,.sv-brand-display-visual--sheet .sv-sheet > b').forEach((bar, i) => {
              const breathe = gsap.to(bar, { scaleX: .72 + (i % 3) * .1, transformOrigin: 'left center', duration: 1.25 + i * .1, repeat: -1, yoyo: true, ease: 'sine.inOut' })
              cleanup.push(() => breathe.kill())
            })
            const pointer = card.querySelector<HTMLElement>('.sv-brand-display-visual--timeline .sv-pointer')
            if (pointer) {
              const travel = gsap.to(pointer, { xPercent: 430, duration: 2.4, repeat: -1, yoyo: true, ease: 'power1.inOut' })
              cleanup.push(() => travel.kill())
            }
            const browser = card.querySelector<HTMLElement>('.sv-mini-browser')
            if (browser) {
              const float = gsap.to(browser, { y: cardIndex % 2 ? -4 : 4, duration: 2.6, repeat: -1, yoyo: true, ease: 'sine.inOut' })
              cleanup.push(() => float.kill())
            }
          })

        }


        const brandVideo = root.querySelector<HTMLElement>('[data-brand-video]')
        const brandVideoHead = root.querySelector<HTMLElement>('[data-brand-video-head]')
        const brandVideoFrame = root.querySelector<HTMLElement>('[data-brand-video-frame]')
        const brandVideoDots = Array.from(root.querySelectorAll<HTMLElement>('.sv-brand-video__dot'))
        if (brandVideo && brandVideoFrame) {
          if (brandVideoHead) {
            const headReveal = gsap.fromTo(brandVideoHead, { autoAlpha: 0, y: 24 }, {
              autoAlpha: 1, y: 0, duration: .65, ease: 'power3.out',
              scrollTrigger: { trigger: brandVideo, start: 'top 86%', once: true }
            })
            cleanup.push(() => headReveal.kill())
          }
          const frameReveal = gsap.fromTo(brandVideoFrame,
            { autoAlpha: 0, y: 34, scale: .985, '--video-line-progress': 0 },
            {
              autoAlpha: 1, y: 0, scale: 1, '--video-line-progress': 1, duration: .82, ease: 'power4.out',
              scrollTrigger: { trigger: brandVideoFrame, start: 'top 88%', once: true }
            } as gsap.TweenVars
          )
          cleanup.push(() => frameReveal.kill())
          if (brandVideoDots.length) {
            const dotReveal = gsap.fromTo(brandVideoDots, { autoAlpha: 0, scale: 0 }, {
              autoAlpha: 1, scale: 1, duration: .32, stagger: .06, ease: 'back.out(1.8)',
              scrollTrigger: { trigger: brandVideoFrame, start: 'top 86%', once: true }
            })
            cleanup.push(() => dotReveal.kill())
          }
        }

        /* Integrations — one continuous curve draw with a traveling tracer.
           No pin: the section stays in normal flow, which avoids scroll jumps. */
        const integrationSection = root.querySelector<HTMLElement>('[data-brand-integrations]')
        const integrationPin = root.querySelector<HTMLElement>('[data-brand-integrations-pin]')
        const integrationHead = root.querySelector<HTMLElement>('[data-brand-integrations-head]')
        const integrationArc = root.querySelector<HTMLElement>('[data-brand-integrations-arc]')
        const integrationPath = integrationArc?.querySelector<SVGPathElement>('[data-brand-integrations-path]')
        const integrationTracer = integrationArc?.querySelector<SVGPathElement>('[data-brand-integrations-tracer]')
        const integrationItems = Array.from(root.querySelectorAll<HTMLElement>('[data-brand-integration-item]'))
        if (integrationSection && integrationPin && integrationHead && integrationArc && integrationItems.length) {
          gsap.set(integrationPin, { clearProps: 'transform' })
          gsap.set(integrationHead, { autoAlpha: 0, y: 22 })
          integrationItems.forEach((item, index) => gsap.set(item, { autoAlpha: 0, scale: .76, y: index % 2 ? 10 : -10 }))

          let pathLength = 0
          if (integrationPath) {
            pathLength = Math.max(1, integrationPath.getTotalLength())
            gsap.set(integrationPath, { strokeDasharray: pathLength, strokeDashoffset: pathLength })
          }
          if (integrationTracer) {
            if (!pathLength) pathLength = Math.max(1, integrationTracer.getTotalLength())
            gsap.set(integrationTracer, { strokeDasharray: `72 ${Math.max(1, pathLength - 72)}`, strokeDashoffset: 0, autoAlpha: 0 })
          }

          const integrationTimeline = gsap.timeline({ paused: true })
            .to(integrationHead, { autoAlpha: 1, y: 0, duration: .56, ease: 'power3.out' }, 0)
          if (integrationPath) integrationTimeline.to(integrationPath, { strokeDashoffset: 0, duration: 1.05, ease: 'power1.inOut' }, .08)
          integrationTimeline.to(integrationItems, { autoAlpha: 1, scale: 1, y: 0, duration: .4, stagger: .085, ease: 'back.out(1.35)' }, .26)
          if (integrationTracer) integrationTimeline.to(integrationTracer, { autoAlpha: 1, duration: .24, ease: 'power1.out' }, .64)

          const tracerTween = integrationTracer ? gsap.to(integrationTracer, {
            strokeDashoffset: -pathLength,
            duration: 3.4,
            repeat: -1,
            ease: 'none',
            paused: true
          }) : null

          const integrationTrigger = ScrollTrigger.create({
            animation: integrationTimeline,
            trigger: integrationSection,
            start: 'top 82%',
            end: 'center 56%',
            scrub: .34,
            invalidateOnRefresh: true,
            onEnter: () => tracerTween?.play(),
            onEnterBack: () => tracerTween?.play(),
            onLeave: () => tracerTween?.pause(),
            onLeaveBack: () => { integrationTimeline.progress(0).pause(); tracerTween?.pause() }
          })

          cleanup.push(() => {
            integrationTrigger.kill(true)
            integrationTimeline.kill()
            tracerTween?.kill()
          })
        }

        /* Strategic solutions */
        const solutionSection = root.querySelector<HTMLElement>('[data-brand-solutions-section]')
        const solutionHead = root.querySelector<HTMLElement>('[data-brand-solutions-head]')
        const solutionFilter = root.querySelector<HTMLElement>('[data-brand-solutions-filter]')
        const solutionGrid = root.querySelector<HTMLElement>('[data-brand-solutions-grid]')
        const solutionCards = Array.from(root.querySelectorAll<HTMLElement>('[data-brand-solution-card]'))
        if (solutionSection && solutionGrid) {
          const strategicArc = solutionSection.querySelector<HTMLElement>('[data-brand-strategic-arc]')
          const strategicProgress = solutionSection.querySelector<SVGPathElement>('[data-brand-strategic-progress]')
          const strategicTracer = solutionSection.querySelector<SVGPathElement>('[data-brand-strategic-tracer]')
          const strategicSpark = solutionSection.querySelector<HTMLElement>('[data-brand-strategic-spark]')
          if (strategicArc && strategicProgress && strategicTracer) {
            const arcLength = Math.max(1, strategicProgress.getTotalLength())
            const glowBand = Math.max(150, arcLength * .18)
            const tracerBand = Math.max(46, arcLength * .045)
            const longGap = arcLength * 2.2

            // Use a gap longer than the whole SVG path so only ONE highlight band can
            // exist at a time. This removes the duplicated left/right green segments
            // produced by the previous repeating dash pattern.
            gsap.set(strategicArc, { '--strategic-halo': 0 } as gsap.TweenVars)
            gsap.set(strategicProgress, {
              strokeDasharray: `${glowBand} ${longGap}`,
              strokeDashoffset: arcLength + glowBand,
              autoAlpha: 0
            })
            gsap.set(strategicTracer, {
              strokeDasharray: `${tracerBand} ${longGap}`,
              strokeDashoffset: arcLength + tracerBand,
              autoAlpha: 0
            })
            if (strategicSpark) gsap.set(strategicSpark, { autoAlpha: 0, scale: .5 })

            const arcTimeline = gsap.timeline({ paused: true, defaults: { ease: 'none' } })
              .to(strategicArc, { '--strategic-halo': 1, duration: .34, ease: 'power1.out' } as gsap.TweenVars, 0)
              .to(strategicProgress, { autoAlpha: 1, duration: .10 }, .02)
              .to(strategicTracer, { autoAlpha: 1, duration: .10 }, .02)
              .to(strategicProgress, { strokeDashoffset: -glowBand * .95, duration: .94 }, .04)
              .to(strategicTracer, { strokeDashoffset: -tracerBand * 1.35, duration: .94 }, .04)
              .to(strategicTracer, { autoAlpha: .18, duration: .14, ease: 'power1.out' }, .86)
              .to(strategicProgress, { autoAlpha: .34, duration: .14, ease: 'power1.out' }, .86)

            const arcTrigger = ScrollTrigger.create({
              animation: arcTimeline,
              trigger: solutionSection,
              start: 'top 90%',
              end: 'top 48%',
              scrub: .32,
              invalidateOnRefresh: true,
              onLeaveBack: () => arcTimeline.progress(0).pause()
            })
            cleanup.push(() => { arcTrigger.kill(true); arcTimeline.kill() })
          }
          if (solutionHead) reveal(solutionHead, solutionSection, { y: 34, opacity: 0 })
          if (solutionFilter) reveal(solutionFilter, solutionSection, { y: 20, opacity: 0 }, .06)
          solutionCards.forEach((card, i) => {
            gsap.fromTo(card,
              compact ? { opacity: 0, y: 24 } : { opacity: 0, y: 58, rotateY: i % 2 ? -4 : 4, scale: .975 },
              { opacity: 1, y: 0, rotateY: 0, scale: 1, duration: .7, ease: 'power3.out', scrollTrigger: { trigger: card, start: 'top 90%', end: compact ? undefined : 'top 66%', scrub: compact ? false : .26, once: compact } }
            )
          })
        }
        /* How It Works V36 — short sticky runway, four deterministic steps.
           Card 01 is visible on section entry. Scrolling advances 01→02→03→04,
           then the sticky frame releases immediately into the next section.
           No ScrollTrigger pin is used, so there is no pin spacer / blank-scroll gap. */
        const stepSection = root.querySelector<HTMLElement>('[data-brand-steps-section]')
        const stepHead = root.querySelector<HTMLElement>('[data-brand-steps-head]')
        const stepPin = root.querySelector<HTMLElement>('[data-brand-step-pin]')
        const stepShell = root.querySelector<HTMLElement>('[data-brand-step-shell]')
        const stepCards = Array.from(root.querySelectorAll<HTMLElement>('.sv-brand-step-card'))
        const stepButtons = Array.from(root.querySelectorAll<HTMLButtonElement>('.sv-brand-steps__nav button'))
        const stepGuides = Array.from(root.querySelectorAll<HTMLElement>('[data-step-guide]'))
        if (stepSection && stepPin && stepShell && stepCards.length) {
          // Remove only stale How-it-works triggers from earlier route mounts/builds.
          ScrollTrigger.getAll().forEach((trigger) => {
            const triggerEl = trigger.trigger as Element | undefined
            const pinEl = trigger.pin as Element | undefined
            if (triggerEl === stepSection || triggerEl === stepPin || triggerEl === stepShell || pinEl === stepPin || pinEl === stepShell) trigger.kill(true)
          })

          if (stepHead) {
            gsap.set(stepHead, { autoAlpha: 1, y: 0, x: 0, visibility: 'visible', clearProps: 'transform' })
            const stepTitle = stepHead.querySelector<HTMLElement>('.sv-title')
            const stepLabel = stepHead.querySelector<HTMLElement>('[data-section-label]')
            if (stepTitle) gsap.set(stepTitle, { autoAlpha: 1, y: 0, x: 0, visibility: 'visible', clearProps: 'transform' })
            if (stepLabel) gsap.set(stepLabel, { autoAlpha: 1, y: 0, x: 0, visibility: 'visible', clearProps: 'transform' })
          }
          gsap.set([stepPin, stepShell], { clearProps: 'transform' })

          // Keep every active card in the geometric center of the stage on every viewport.
          // The active nav/guide still communicates 01→02→03→04, while the content card
          // no longer drifts toward the left/right edges on ultrawide screens.
          const targetLefts = ['50%', '50%', '50%', '50%']
          const setCardState = (card: HTMLElement, index: number, visible: boolean) => gsap.set(card, {
            autoAlpha: visible ? 1 : 0,
            left: targetLefts[index] || '50%',
            top: '50%',
            xPercent: -50,
            yPercent: -50,
            x: 0,
            y: 0,
            scale: 1,
            '--step-x': '0px',
            '--step-y': '0px',
            '--step-scale': visible ? 1 : .968,
            visibility: 'visible'
          })
          stepCards.forEach((card, index) => setCardState(card, index, index === 0))

          let activeStepIndex = -1
          const updateStepNav = (index: number) => {
            if (index === activeStepIndex) return
            activeStepIndex = index
            stepButtons.forEach((button, buttonIndex) => {
              const active = buttonIndex === index
              button.classList.toggle('is-active', active)
              button.setAttribute('aria-pressed', active ? 'true' : 'false')
              if (active && compact) button.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
            })
            stepGuides.forEach((guide, guideIndex) => guide.classList.toggle('is-active', guideIndex === index))
          }
          updateStepNav(0)

          // One normalized timeline. Each transition has a hold before and after it,
          // so normal wheel/trackpad scrolling never produces an empty stage.
          const stepTimeline = gsap.timeline({ paused: true, defaults: { ease: 'none' } })
          stepTimeline.to({}, { duration: 1 }, 0)
          const transitionStarts = [.20, .45, .70]
          transitionStarts.forEach((at, transitionIndex) => {
            const previous = stepCards[transitionIndex]
            const next = stepCards[transitionIndex + 1]
            const nextIndex = transitionIndex + 1
            stepTimeline
              .to(previous, {
                autoAlpha: 0,
                '--step-scale': .968,
                '--step-y': compact ? '-8px' : '-12px',
                '--step-x': compact ? '-8px' : '-14px',
                duration: .085,
                ease: 'power2.inOut'
              }, at)
              .fromTo(next,
                {
                  autoAlpha: 0,
                  '--step-scale': .968,
                  '--step-y': compact ? '10px' : '14px',
                  '--step-x': compact ? '10px' : '16px',
                  left: targetLefts[nextIndex] || '50%',
                  top: '50%',
                  xPercent: -50,
                  yPercent: -50
                },
                {
                  autoAlpha: 1,
                  '--step-scale': 1,
                  '--step-y': '0px',
                  '--step-x': '0px',
                  left: targetLefts[nextIndex] || '50%',
                  top: '50%',
                  xPercent: -50,
                  yPercent: -50,
                  duration: .11,
                  ease: 'power3.out'
                },
                at + .035
              )
          })

          const resetSteps = () => {
            stepTimeline.progress(0).pause()
            stepCards.forEach((card, index) => setCardState(card, index, index === 0))
            activeStepIndex = -1
            updateStepNav(0)
          }

          const activeIndexForProgress = (progress: number) => {
            if (progress < .24) return 0
            if (progress < .49) return 1
            if (progress < .74) return 2
            return 3
          }

          const stepTrigger = ScrollTrigger.create({
            animation: stepTimeline,
            trigger: stepSection,
            start: () => `top top+=${compact ? 52 : 68}`,
            end: 'bottom bottom',
            scrub: .28,
            invalidateOnRefresh: true,
            fastScrollEnd: false,
            onLeave: () => {
              stepTimeline.progress(1)
              updateStepNav(stepCards.length - 1)
            },
            onLeaveBack: resetSteps,
            onUpdate: (self) => updateStepNav(activeIndexForProgress(Math.max(0, Math.min(1, self.progress))))
          })

          // Tabs remain useful: jump to a settled point inside each scroll phase,
          // never to the transition edge or beyond the sticky runway.
          const settledProgress = [.08, .33, .58, .83]
          stepButtons.forEach((button, index) => {
            const handler = () => {
              const p = settledProgress[index] ?? 0
              const top = stepTrigger.start + (stepTrigger.end - stepTrigger.start) * p
              window.scrollTo({ top, behavior: 'smooth' })
            }
            button.addEventListener('click', handler)
            cleanup.push(() => button.removeEventListener('click', handler))
          })

          cleanup.push(() => {
            stepTrigger.kill(true)
            stepTimeline.kill()
          })
        }

        /* Pricing */
        const pricingSection = root.querySelector<HTMLElement>('[data-brand-pricing]')
        const pricingHead = root.querySelector<HTMLElement>('[data-brand-pricing-head]')
        const pricingGrid = root.querySelector<HTMLElement>('[data-brand-pricing-grid]')
        const priceCards = Array.from(root.querySelectorAll<HTMLElement>('[data-brand-price-card]'))
        if (pricingSection && pricingGrid) {
          const pricingFrame = pricingSection.querySelector<HTMLElement>('[data-brand-pricing-frame]')
          const pricingWatermark = pricingSection.querySelector<HTMLElement>('.sv-brand-pricing__watermark')
          const pricingDots = Array.from(pricingSection.querySelectorAll<HTMLElement>('.sv-brand-pricing__dot'))
          if (pricingHead) reveal(pricingHead, pricingSection, { y: 30, opacity: 0 })
          if (pricingWatermark) {
            const watermarkReveal = gsap.fromTo(pricingWatermark, { autoAlpha: 0, y: 18 }, {
              autoAlpha: .52, y: 0, duration: .72, ease: 'power3.out',
              scrollTrigger: { trigger: pricingSection, start: 'top 88%', once: true }
            })
            cleanup.push(() => watermarkReveal.kill())
          }
          if (pricingFrame) {
            const frameReveal = gsap.fromTo(pricingFrame, { '--pricing-frame': 0 } as gsap.TweenVars, {
              '--pricing-frame': 1, duration: .82, ease: 'power2.out',
              scrollTrigger: { trigger: pricingFrame, start: 'top 88%', once: true }
            } as gsap.TweenVars)
            cleanup.push(() => frameReveal.kill())
          }
          if (pricingDots.length) {
            const dotsReveal = gsap.fromTo(pricingDots, { scale: 0, autoAlpha: 0 }, {
              scale: 1, autoAlpha: 1, duration: .3, stagger: .055, ease: 'back.out(1.7)',
              scrollTrigger: { trigger: pricingGrid, start: 'top 89%', once: true }
            })
            cleanup.push(() => dotsReveal.kill())
          }
          const cardsReveal = gsap.fromTo(priceCards, { opacity: 0, y: 42, scale: .98 }, { opacity: 1, y: 0, scale: 1, duration: .68, stagger: .085, ease: 'power3.out', scrollTrigger: { trigger: pricingGrid, start: 'top 87%', once: true } })
          cleanup.push(() => cardsReveal.kill())
        }

        const faqSection = root.querySelector<HTMLElement>('[data-brand-faq]')
        const faqHead = root.querySelector<HTMLElement>('[data-brand-faq-head]')
        const faqItems = Array.from(root.querySelectorAll<HTMLElement>('[data-brand-faq-item]'))
        if (faqSection) {
          if (faqHead) reveal(faqHead, faqSection, { x: -30, opacity: 0 })
          gsap.fromTo(faqItems, { opacity: 0, x: 30 }, { opacity: 1, x: 0, duration: .55, stagger: .065, ease: 'power3.out', scrollTrigger: { trigger: faqSection, start: 'top 84%', once: true } })
        }
      }, root)

      const performRefresh = () => {
        if (window.scrollY >= 48) return
        ScrollTrigger.sort()
        ScrollTrigger.refresh()
      }
      /* One early refresh after layout has settled. Avoid late font/load refreshes while the
         visitor is already scrolling, which were the main source of pin jumps/flicker. */
      const refresh = window.setTimeout(performRefresh, 140)
      let resizeRefreshTimer = 0
      let lastViewportWidth = window.innerWidth
      const refreshAfterOrientation = () => {
        window.clearTimeout(resizeRefreshTimer)
        resizeRefreshTimer = window.setTimeout(performRefresh, 220)
      }
      const refreshAfterResize = () => {
        const currentWidth = window.innerWidth
        const widthChanged = Math.abs(currentWidth - lastViewportWidth) > 6
        if (!widthChanged) return
        lastViewportWidth = currentWidth
        window.clearTimeout(resizeRefreshTimer)
        resizeRefreshTimer = window.setTimeout(performRefresh, 180)
      }
      window.addEventListener('orientationchange', refreshAfterOrientation)
      window.addEventListener('resize', refreshAfterResize)
      return () => {
        window.clearTimeout(refresh)
        window.clearTimeout(resizeRefreshTimer)
        window.removeEventListener('orientationchange', refreshAfterOrientation)
        window.removeEventListener('resize', refreshAfterResize)
        cleanup.forEach((fn) => fn())
        ctx.revert()
      }
    }

    const ctx = gsap.context(() => {
      root.querySelectorAll<HTMLElement>('[data-section-label]').forEach((label) => {
        gsap.fromTo(label, { y: 16, opacity: 0, scale: .95 }, { y: 0, opacity: 1, scale: 1, duration: .65, ease: 'power3.out', scrollTrigger: { trigger: label, start: 'top 92%', once: true } })
      })

      root.querySelectorAll<HTMLElement>('.sv-display').forEach((el) => {
        if (el.classList.contains('sv-display--brand')) {
          const lines = el.querySelectorAll('.sv-display__line')
          gsap.fromTo(lines, { y: 46, opacity: 0 }, { y: 0, opacity: 1, duration: .82, stagger: .12, ease: 'power4.out', scrollTrigger: { trigger: el, start: 'top 88%', once: true } })
          const rotate = el.querySelector('.sv-hero-typebox')
          if (rotate) gsap.fromTo(rotate, { scale: .92, opacity: 0 }, { scale: 1, opacity: 1, duration: .54, delay: .35, ease: 'back.out(1.4)', scrollTrigger: { trigger: el, start: 'top 88%', once: true } })
          const pen = el.querySelector('.sv-hero-typebox__pen')
          if (pen) gsap.fromTo(pen, { rotation: 16, x: -10, opacity: 0 }, { rotation: 0, x: 0, opacity: 1, duration: .5, delay: .5, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 88%', once: true } })
          return
        }
        if (compact) {
          gsap.fromTo(el, { opacity: 0 }, { opacity: 1, duration: .72, ease: 'power2.out' })
          return
        }
        restore.push(splitText(el, 'chars'))
        gsap.fromTo(el.querySelectorAll('.sv-char'), { yPercent: 115, opacity: 0, rotateX: -62 }, { yPercent: 0, opacity: 1, rotateX: 0, duration: .82, stagger: .016, ease: 'power4.out', scrollTrigger: { trigger: el, start: 'top 88%', once: true } })
      })

      root.querySelectorAll<HTMLElement>('h2, h3').forEach((el) => {
        if (el.closest('.sv-display--brand')) return
        if (compact) {
          gsap.fromTo(el, { opacity: 0 }, { opacity: 1, duration: .68, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 92%', once: true } })
          return
        }
        restore.push(splitText(el, 'words'))
        gsap.fromTo(el.querySelectorAll('.sv-word'), { yPercent: 108, opacity: 0, filter: 'blur(7px)' }, { yPercent: 0, opacity: 1, filter: 'blur(0px)', duration: .86, stagger: .035, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 89%', once: true } })
      })

      root.querySelectorAll<HTMLElement>('[data-sv-reveal]').forEach((el) => {
        const dir = el.dataset.svReveal || 'up'
        const offset = compact ? {} : dir === 'left' ? { x: -56 } : dir === 'right' ? { x: 56 } : { y: 50 }
        gsap.fromTo(el, { opacity: 0, ...offset }, { opacity: 1, x: compact ? undefined : 0, y: compact ? undefined : 0, duration: .9, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 90%', once: true } })
      })

      root.querySelectorAll<HTMLElement>('section p').forEach((el) => {
        if (el.closest('[data-sv-item]') || el.hasAttribute('data-sv-reveal')) return
        gsap.fromTo(el, compact ? { opacity: 0 } : { opacity: 0, y: 28 }, { opacity: 1, y: compact ? undefined : 0, duration: .78, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 92%', once: true } })
      })

      root.querySelectorAll<HTMLElement>('[data-sv-stagger]').forEach((group) => {
        const items = group.querySelectorAll('[data-sv-item]')
        gsap.fromTo(items, compact ? { opacity: 0 } : { opacity: 0, y: 54, scale: .96 }, { opacity: 1, y: compact ? undefined : 0, scale: compact ? undefined : 1, duration: .8, stagger: .09, ease: 'power3.out', scrollTrigger: { trigger: group, start: 'top 84%', once: true } })
      })

      if (!compact) root.querySelectorAll<HTMLElement>('[data-sv-parallax]').forEach((el) => {
        gsap.to(el, { y: Number(el.dataset.svParallax || 80), ease: 'none', scrollTrigger: { trigger: el.closest('section') || el, start: 'top bottom', end: 'bottom top', scrub: .8 } })
      })

      root.querySelectorAll<HTMLElement>('.sv-title').forEach((el) => {
        if (compact) {
          gsap.fromTo(el, { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: .64, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 92%', once: true } })
        } else {
          gsap.fromTo(el, { xPercent: -3, opacity: .45 }, { xPercent: 0, opacity: 1, ease: 'none', scrollTrigger: { trigger: el, start: 'top 94%', end: 'top 58%', scrub: .75 } })
        }
      })

      root.querySelectorAll<HTMLElement>('.af-ai-visual, .af-card-visual').forEach((el) => {
        if (compact) {
          gsap.fromTo(el, { y: 16, opacity: .72 }, { y: 0, opacity: 1, duration: .58, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 94%', once: true } })
        } else {
          gsap.fromTo(el,
            { clipPath: 'inset(12% 7% 12% 7% round 20px)', scale: 1.045, opacity: .52 },
            { clipPath: 'inset(0% 0% 0% 0% round 20px)', scale: 1, opacity: 1, duration: .92, ease: 'power4.out', scrollTrigger: { trigger: el, start: 'top 91%', once: true } }
          )
        }
      })

      const heroArt = root.querySelector<HTMLElement>('.sv-hero__art')
      if (heroArt) {
        gsap.set(heroArt, { opacity: 1 })
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' }, delay: .16 })
        if (layout === '02') {
          tl.fromTo('.sv-copy-flip', { y: 44, rotateX: -7, opacity: 0, scale: .94 }, { y: 0, rotateX: 0, opacity: 1, scale: 1, duration: .82 })
            .fromTo('.sv-copy-ui__rail,.sv-copy-ui__top,.sv-copy-ui strong', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: .52, stagger: .08 }, '-=.42')
            .fromTo('.sv-copy-ui__composer,.sv-copy-ui__cards article,.sv-copy-ui__nav span,.sv-copy-ui__kanban article,.sv-copy-ui__meter i', { y: 18, opacity: 0, scale: .96 }, { y: 0, opacity: 1, scale: 1, duration: .44, stagger: .07 }, '-=.22')
            .fromTo('.sv-copy-card--left,.sv-copy-card--right', { y: 28, x: (i: number) => i ? 26 : -26, opacity: 0, scale: .92 }, { y: 0, x: 0, opacity: 1, scale: 1, duration: .58, stagger: .12, ease: 'back.out(1.35)' }, '-=.2')
        } else if (layout === '03') {
          tl.fromTo('.sv-orbit__ring', { scale: .64, opacity: 0, rotate: -22 }, { scale: 1, opacity: 1, rotate: 0, duration: .78, stagger: .12 })
            .fromTo('.sv-orbit__core', { scale: .55, opacity: 0 }, { scale: 1, opacity: 1, duration: .62, ease: 'back.out(1.7)' }, '-=.4')
            .fromTo('.sv-orbit__node', { scale: .55, opacity: 0 }, { scale: 1, opacity: 1, duration: .45, stagger: .08, ease: 'back.out(1.55)' }, '-=.32')
            .fromTo('.sv-orbit__caption', { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: .45 }, '-=.18')
        } else if (layout === '04') {
          tl.fromTo('.sv-chat__top', { y: -18, opacity: 0 }, { y: 0, opacity: 1, duration: .5 })
            .fromTo('.sv-chat__bubble--in', { x: -42, opacity: 0, scale: .94 }, { x: 0, opacity: 1, scale: 1, duration: .62 })
            .fromTo('.sv-chat__typing i', { y: 5, opacity: 0 }, { y: 0, opacity: 1, duration: .3, stagger: .08 }, '-=.22')
            .fromTo('.sv-chat__bubble--out', { x: 42, opacity: 0, scale: .94 }, { x: 0, opacity: 1, scale: 1, duration: .62 }, '-=.08')
            .fromTo('.sv-chat__activity span', { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: .42, stagger: .09 }, '-=.18')
            .fromTo('.sv-chat__flow i', { scaleX: 0, transformOrigin: 'left center' }, { scaleX: 1, duration: .48, stagger: .12 }, '-=.22')
        } else if (layout === '05') {
          tl.fromTo('.sv-browser', { rotateY: -9, rotateX: 5, y: 36, opacity: 0, scale: .93 }, { rotateY: 0, rotateX: 0, y: 0, opacity: 1, scale: 1, duration: .88 })
            .fromTo('.sv-browser__chrome i', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: .3, stagger: .07, ease: 'back.out(1.8)' }, '-=.48')
            .fromTo('.sv-browser__layer--hero>*', { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: .45, stagger: .08 }, '-=.3')
            .fromTo('.sv-browser__grid .sv-browser__layer', { y: 24, opacity: 0, scale: .94 }, { y: 0, opacity: 1, scale: 1, duration: .48, stagger: .1 }, '-=.16')
            .fromTo('.sv-browser__grid .sv-browser__layer b', { scaleX: 0, transformOrigin: 'left center' }, { scaleX: 1, duration: .42, stagger: .08 }, '-=.25')
        } else if (layout === '06') {
          tl.fromTo('.sv-support__main', { x: 32, opacity: 0 }, { x: 0, opacity: 1, duration: .66 })
            .fromTo('.sv-channel', { x: -24, opacity: 0, scale: .78 }, { x: 0, opacity: 1, scale: 1, duration: .42, stagger: .08, ease: 'back.out(1.5)' }, '-=.36')
            .fromTo('.sv-support__pulse', { scaleX: .72, opacity: 0, transformOrigin: 'left center' }, { scaleX: 1, opacity: 1, duration: .46 }, '-=.2')
            .fromTo('.sv-ticket', { x: 28, opacity: 0 }, { x: 0, opacity: 1, duration: .48, stagger: .12 }, '-=.2')
            .fromTo('.sv-ticket em', { x: 14, opacity: 0 }, { x: 0, opacity: 1, duration: .36, stagger: .08 }, '-=.16')
        } else if (layout === '07') {
          tl.fromTo('.sv-growth-route__segment', { scaleX: 0, transformOrigin: 'left center' }, { scaleX: 1, duration: .48, stagger: .11 })
            .fromTo('.sv-growth-route__node', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: .34, stagger: .1, ease: 'back.out(1.8)' }, '-=.28')
            .fromTo('.sv-growth-label', { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: .4, stagger: .1 }, '-=.24')
            .fromTo('.sv-growth-status span', { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: .34, stagger: .08 }, '-=.18')
        }
      }

      if (layout === '02') {
        const rating = root.querySelector('.sv-rating-pill')
        if (rating) gsap.fromTo(rating, { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: .56, ease: 'power3.out' })
        const flip = root.querySelector<HTMLElement>('.sv-copy-flip')
        if (flip && !compact) gsap.to(flip, { y: -6, rotateY: 1.2, duration: 4.6, ease: 'sine.inOut', repeat: -1, yoyo: true })
        root.querySelectorAll<HTMLElement>('.sv-copy-card--left,.sv-copy-card--right').forEach((badge, i) => {
          if (!compact) gsap.to(badge, { y: i % 2 ? -6 : 6, duration: 2.8 + i * .3, ease: 'sine.inOut', repeat: -1, yoyo: true })
        })
        root.querySelectorAll<HTMLElement>('.sv-copy-ui__cards article,.sv-copy-ui__kanban article').forEach((card, i) => {
          if (!compact) gsap.to(card, { y: i % 2 ? -4 : 4, duration: 2.5 + i * .16, repeat: -1, yoyo: true, ease: 'sine.inOut' })
        })

        /* Feature ScrollTrigger is intentionally handled only by the primary pinned timeline above. */

        const librarySection = root.querySelector<HTMLElement>('.sv-brand-library-section')
        const libraryFilter = root.querySelector<HTMLElement>('.sv-brand-filter')
        const libraryCards = Array.from(root.querySelectorAll<HTMLElement>('.sv-brand-library-card'))
        if (librarySection && libraryCards.length) {
          if (libraryFilter) {
            gsap.fromTo(libraryFilter, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: .75, ease: 'power3.out', scrollTrigger: { trigger: librarySection, start: 'top 88%', once: true } })
          }
          libraryCards.forEach((card, i) => {
            gsap.fromTo(card,
              compact ? { opacity: 0, y: 28 } : { opacity: 0, y: 70, rotateY: i % 2 ? -6 : 6, scale: .96 },
              {
                opacity: 1,
                y: 0,
                rotateY: 0,
                scale: 1,
                duration: .82,
                ease: 'power3.out',
                scrollTrigger: {
                  trigger: card,
                  start: 'top 90%',
                  end: compact ? undefined : 'top 62%',
                  scrub: compact ? false : .3,
                  once: compact
                }
              }
            )
          })
        }

        /* How It Works ScrollTrigger is intentionally handled only by the primary pinned trigger above. */

        root.querySelectorAll<HTMLElement>('.sv-brand-price-card').forEach((card, i) => {
          gsap.fromTo(card, compact ? { opacity: 0 } : { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: .74, delay: i * .07, ease: 'power3.out', scrollTrigger: { trigger: card, start: 'top 88%', once: true } })
        })
      }

      if (layout === '03') {
        const rings = root.querySelectorAll<HTMLElement>('.sv-orbit__ring')
        if (!compact) rings.forEach((ring, i) => gsap.to(ring, { rotate: i ? -360 : 360, transformOrigin: '50% 50%', duration: 22 + i * 7, repeat: -1, ease: 'none' }))
      }
      if (layout === '04') {
        const inbound = root.querySelector<HTMLElement>('.sv-chat__bubble--in')
        const outbound = root.querySelector<HTMLElement>('.sv-chat__bubble--out')
        if (inbound && !compact) gsap.to(inbound, { boxShadow: '0 0 0 1px rgba(0,187,160,.28), 0 15px 35px rgba(0,187,160,.08)', duration: 1.7, repeat: -1, yoyo: true, ease: 'sine.inOut' })
        if (outbound && !compact) gsap.to(outbound, { x: 5, duration: 2.3, repeat: -1, yoyo: true, ease: 'sine.inOut' })
      }
      if (layout === '05' && !compact) root.querySelectorAll<HTMLElement>('.sv-browser__grid .sv-browser__layer').forEach((block, i) => gsap.to(block, { y: i % 2 ? -4 : 4, duration: 2.8 + i * .35, repeat: -1, yoyo: true, ease: 'sine.inOut' }))
      if (layout === '06' && !compact) {
        root.querySelectorAll<HTMLElement>('.sv-channel').forEach((channel, i) => gsap.to(channel, { scale: 1.035, duration: 1.8, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: i * .18 }))
        root.querySelectorAll<HTMLElement>('.sv-ticket').forEach((ticket, i) => gsap.to(ticket, { x: i % 2 ? -3 : 3, duration: 2.7 + i * .25, repeat: -1, yoyo: true, ease: 'sine.inOut' }))
      }
      if (layout === '07' && !compact) root.querySelectorAll<HTMLElement>('.sv-growth-route__node').forEach((el, i) => gsap.to(el, { scale: 1.16, boxShadow: '0 0 0 9px rgba(0,187,160,.08),0 0 26px rgba(0,187,160,.3)', duration: 1.5 + i * .18, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: .7 + i * .14 }))
    }, root)

    const refresh = window.setTimeout(() => ScrollTrigger.refresh(), 450)
    return () => {
      window.clearTimeout(refresh)
      cleanup.forEach((fn) => fn())
      ctx.revert()
      restore.forEach((fn) => fn())
    }
  }, [layout])
}
