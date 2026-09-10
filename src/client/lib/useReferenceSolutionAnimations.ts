import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { ServiceLayout } from '../data/servicePages'
import { setupRisingIconLoop } from './setupRisingIconLoop'
import { setupProcessCardHover } from './processCardMotion'

gsap.registerPlugin(ScrollTrigger)

export function useReferenceSolutionAnimations(layout: ServiceLayout) {
  useEffect(() => {
    if (layout === '02') return
    const root = document.querySelector<HTMLElement>('[data-rs-root]')
    if (!root) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const compact = window.matchMedia('(max-width: 760px)').matches
    const growthCompact = window.matchMedia('(max-width: 850px)').matches
    if (reduce) return

    const cleanups: Array<() => void> = []
    const ctx = gsap.context(() => {
      const hero = root.querySelector<HTMLElement>('[data-rs-hero]')
      const heroCopy = root.querySelector<HTMLElement>('[data-rs-hero-copy]')
      const heroStage = root.querySelector<HTMLElement>('[data-rs-hero-stage]')
      const heroTrust = root.querySelector<HTMLElement>('[data-rs-hero-trust]')
      const isSocialHero = Boolean(hero?.hasAttribute('data-rs-social-hero'))
      const isGrowthHero = Boolean(hero?.hasAttribute('data-rs-growth-hero'))
      if (hero && heroCopy && heroStage) {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' }, delay: .08 })
        tl.fromTo(heroCopy.children, { y: 34, opacity: 0 }, { y: 0, opacity: 1, duration: .72, stagger: .08 })
          .fromTo(heroStage, { y: 40, opacity: 0, scale: .94, rotateX: 3 }, { y: 0, opacity: 1, scale: 1, rotateX: 0, duration: .95, ease: 'power4.out' }, '-=.45')
        if (heroTrust && layout !== '03' && !isSocialHero && !isGrowthHero) tl.fromTo(heroTrust.children, { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: .48, stagger: .05 }, '-=.28')

        if (!compact && layout !== '03' && layout !== '05' && !isSocialHero && !isGrowthHero) {
          gsap.to(heroStage, {
            yPercent: 9,
            scale: .965,
            ease: 'none',
            scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: .85 }
          })
          const img = heroStage.querySelector<HTMLElement>('[data-rs-depth]')
          if (img) gsap.to(img, { yPercent: -7, ease: 'none', scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: .9 } })
        }

        const stopHeroIconLoop = setupRisingIconLoop(heroStage, '[data-af-rising-icon]')
        cleanups.push(stopHeroIconLoop)

        const heroWings = Array.from(heroStage.querySelectorAll<HTMLElement>('[data-rs-hero-wing]'))
        if (heroWings.length && !compact && layout !== '03') {
          heroWings.forEach((wing, index) => {
            gsap.to(wing, {
              y: index % 2 ? -10 : 10,
              rotation: index % 2 ? 2 : -2,
              duration: 3.2 + index * .3,
              repeat: -1,
              yoyo: true,
              ease: 'sine.inOut'
            })
          })
        }

        const heroLine = root.querySelector<HTMLElement>('[data-rs-hero-line]')
        if (heroLine) {
          const marquee = heroLine.querySelector<HTMLElement>('[data-rs-hero-marquee]')

          if (layout === '03') {
            gsap.set(heroLine, {
              '--dp-v43-inset': '50%',
              '--dp-v43-shift': '0px',
              '--dp-v43-label': 0,
              '--dp-v53-rail': 0
            } as gsap.TweenVars)

            const revealTl = gsap.timeline({ defaults: { ease: 'none' } })
              .to(heroLine, {
                '--dp-v43-inset': '0%',
                '--dp-v43-shift': () => `${Math.min(Math.max(heroLine.clientWidth * .105, 98), 138)}px`,
                '--dp-v53-rail': 1,
                duration: .72
              } as gsap.TweenVars)
              .to(heroLine, { '--dp-v43-label': 1, duration: .28 } as gsap.TweenVars, .40)

            const reveal = ScrollTrigger.create({
              animation: revealTl,
              trigger: heroLine,
              start: 'top 94%',
              end: 'top 61%',
              scrub: .48,
              invalidateOnRefresh: true
            })
            cleanups.push(() => { reveal.kill(true); revealTl.kill() })
          } else {
            const fullTrack = heroLine.querySelector<HTMLElement>('.dp-trust-reveal__track--full')
            const leftGate = heroLine.querySelector<HTMLElement>('.dp-trust-reveal__gate--left')
            const rightGate = heroLine.querySelector<HTMLElement>('.dp-trust-reveal__gate--right')
            const center = heroLine.querySelector<HTMLElement>('.dp-trust-reveal__center')
            if (fullTrack) gsap.set(fullTrack, { opacity: 1, scaleX: 1, transformOrigin: '50% 50%', clipPath: 'inset(0 0% 0 0% round 20px)' })
            if (center) gsap.set(center, { opacity: 0, scale: .88 })
            if (leftGate) gsap.set(leftGate, { x: 0 })
            if (rightGate) gsap.set(rightGate, { x: 0 })
            const gateOffset = () => Math.max(88, ((center?.offsetWidth || 176) / 2) + 8)
            const lineTl = gsap.timeline({ paused: true, defaults: { ease: 'power3.out' } })
            if (leftGate) lineTl.to(leftGate, { x: () => -gateOffset(), duration: .88 }, 0)
            if (rightGate) lineTl.to(rightGate, { x: () => gateOffset(), duration: .88 }, 0)
            if (center) lineTl.to(center, { scale: 1, opacity: 1, duration: .58 }, .18)
            const lineTrigger = ScrollTrigger.create({ animation: lineTl, trigger: heroLine, start: 'top 88%', end: 'top 60%', scrub: .55, invalidateOnRefresh: true })
            cleanups.push(() => { lineTrigger.kill(true); lineTl.kill() })
          }

          if (marquee) {
            const distance = Math.max(320, marquee.scrollWidth / 2)
            const marqueeTween = gsap.fromTo(marquee, { x: 0 }, { x: -distance, duration: 18, repeat: -1, ease: 'none' })
            cleanups.push(() => marqueeTween.kill())
          }
        }
      }

      // Pointer-driven depth in the hero, matching the reference demos’ subtle 3D hover response.
      if (!compact && layout !== '03' && heroStage && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
        const visual = heroStage.querySelector<HTMLElement>('[data-rs-depth]')
        const chips = Array.from(heroStage.querySelectorAll<HTMLElement>('.rs-hero__chip'))
        if (visual) {
          const move = (event: PointerEvent) => {
            const rect = heroStage.getBoundingClientRect()
            const nx = ((event.clientX - rect.left) / rect.width - .5) * 2
            const ny = ((event.clientY - rect.top) / rect.height - .5) * 2
            gsap.to(visual, { rotationY: nx * 4.2, rotationX: -ny * 3.2, x: nx * 8, y: ny * 5, duration: .55, ease: 'power2.out', overwrite: 'auto' })
            chips.forEach((chip, index) => gsap.to(chip, { x: nx * (6 + index * 3), y: ny * (4 + index * 2), duration: .65, ease: 'power2.out', overwrite: 'auto' }))
          }
          const leave = () => {
            gsap.to(visual, { rotationY: 0, rotationX: 0, x: 0, y: 0, duration: .7, ease: 'power3.out', overwrite: 'auto' })
            chips.forEach((chip) => gsap.to(chip, { x: 0, y: 0, duration: .7, ease: 'power3.out', overwrite: 'auto' }))
          }
          heroStage.addEventListener('pointermove', move)
          heroStage.addEventListener('pointerleave', leave)
          cleanups.push(() => { heroStage.removeEventListener('pointermove', move); heroStage.removeEventListener('pointerleave', leave) })
        }
      }


      // Patient Acquisition hero: robot reveal, drifting rings, marquee and bounded pointer parallax.
      if (layout === '04' && hero) {
        const patientHeroBot = hero.querySelector<HTMLElement>('[data-rs-patient-hero-bot], [data-rs-patient-hero-logo]')
        const patientHeroCopy = hero.querySelector<HTMLElement>('[data-rs-hero-copy]')
        const patientHeroTrust = hero.querySelector<HTMLElement>('[data-rs-hero-trust]')
        const patientHeroSwirls = Array.from(hero.querySelectorAll<HTMLElement>('[data-rs-patient-hero-swirl]'))
        const patientHeroDot = hero.querySelector<HTMLElement>('[data-rs-patient-hero-orbit-dot]')
        const patientHeroMarquee = hero.querySelector<HTMLElement>('[data-rs-patient-hero-marquee]')

        if (patientHeroBot) {
          const intro = gsap.timeline({ defaults: { ease: 'power3.out' } })
          intro.fromTo(patientHeroBot, compact ? { y: 24, autoAlpha: 0, scale: .88, rotationY: -4 } : { y: 34, autoAlpha: 0, scale: .84, rotationY: -7 }, { y: 0, autoAlpha: 1, scale: 1, rotationY: 0, duration: .9 })
          if (patientHeroCopy) intro.fromTo(patientHeroCopy.children, { y: 18, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: .54, stagger: .07 }, '-=.45')
          if (patientHeroTrust) intro.fromTo(patientHeroTrust.children, { y: 16, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: .46, stagger: .06 }, '-=.24')
          cleanups.push(() => intro.kill())

          const drift = gsap.to(patientHeroBot, { yPercent: -4, duration: 2.8, repeat: -1, yoyo: true, ease: 'sine.inOut' })
          cleanups.push(() => drift.kill())
        }

        patientHeroSwirls.forEach((ring, index) => {
          gsap.set(ring, { transformOrigin: '50% 50%' })
          const spin = gsap.to(ring, { rotation: index % 2 ? -360 : 360, duration: index % 2 ? 26 : 34, repeat: -1, ease: 'none' })
          cleanups.push(() => spin.kill())
        })

        if (patientHeroDot) {
          const pulse = gsap.to(patientHeroDot, { scale: 1.28, opacity: .95, duration: 1.2, repeat: -1, yoyo: true, ease: 'sine.inOut' })
          cleanups.push(() => pulse.kill())
        }

        if (patientHeroMarquee) {
          const distance = Math.max(360, patientHeroMarquee.scrollWidth / 2)
          const marqueeTween = gsap.fromTo(patientHeroMarquee, { x: 0 }, { x: -distance, duration: 18, repeat: -1, ease: 'none' })
          cleanups.push(() => marqueeTween.kill())
        }

        if (!compact && window.matchMedia('(hover: hover) and (pointer: fine)').matches && patientHeroBot) {
          const moveBotX = gsap.quickTo(patientHeroBot, 'x', { duration: .36, ease: 'power3.out' })
          const moveBotY = gsap.quickTo(patientHeroBot, 'y', { duration: .36, ease: 'power3.out' })
          const rotateBotX = gsap.quickTo(patientHeroBot, 'rotationX', { duration: .38, ease: 'power3.out' })
          const rotateBotY = gsap.quickTo(patientHeroBot, 'rotationY', { duration: .38, ease: 'power3.out' })
          const ringMoves = patientHeroSwirls.map((ring, index) => ({
            x: gsap.quickTo(ring, 'x', { duration: .46, ease: 'power3.out' }),
            y: gsap.quickTo(ring, 'y', { duration: .46, ease: 'power3.out' }),
            factor: index ? 7 : 11
          }))
          const dotX = patientHeroDot ? gsap.quickTo(patientHeroDot, 'x', { duration: .4, ease: 'power3.out' }) : null
          const dotY = patientHeroDot ? gsap.quickTo(patientHeroDot, 'y', { duration: .4, ease: 'power3.out' }) : null
          const move = (event: PointerEvent) => {
            const rect = hero.getBoundingClientRect()
            if (!rect.width || !rect.height) return
            const nx = Math.max(-1, Math.min(1, ((event.clientX - rect.left) / rect.width - .5) * 2))
            const ny = Math.max(-1, Math.min(1, ((event.clientY - rect.top) / rect.height - .5) * 2))
            moveBotX(nx * 16)
            moveBotY(ny * 12)
            rotateBotX(-ny * 6)
            rotateBotY(nx * 8)
            ringMoves.forEach((ringMove, index) => {
              ringMove.x(nx * (index ? 6 : 10))
              ringMove.y(ny * (index ? 5 : 8))
            })
            if (dotX && dotY) {
              dotX(nx * 10)
              dotY(ny * 8)
            }
          }
          const reset = () => {
            moveBotX(0)
            moveBotY(0)
            rotateBotX(0)
            rotateBotY(0)
            ringMoves.forEach((ringMove) => {
              ringMove.x(0)
              ringMove.y(0)
            })
            dotX?.(0)
            dotY?.(0)
          }
          hero.addEventListener('pointermove', move)
          hero.addEventListener('pointerleave', reset)
          hero.addEventListener('pointercancel', reset)
          cleanups.push(() => {
            hero.removeEventListener('pointermove', move)
            hero.removeEventListener('pointerleave', reset)
            hero.removeEventListener('pointercancel', reset)
            gsap.set(patientHeroBot, { x: 0, y: 0, rotationX: 0, rotationY: 0 })
            gsap.set(patientHeroSwirls, { x: 0, y: 0 })
            if (patientHeroDot) gsap.set(patientHeroDot, { x: 0, y: 0 })
          })
        }
      }

      // Home-06 / Social Media hero: balanced forward tilt, faster straightening on scroll, and a continuously moving trust strip.
      const socialHeroSection = root.querySelector<HTMLElement>('[data-rs-social-hero]')
      if (socialHeroSection) {
        const socialCard = socialHeroSection.querySelector<HTMLElement>('[data-rs-social-hero-card]')
        const socialTrust = socialHeroSection.querySelector<HTMLElement>('[data-rs-hero-trust]')
        const socialTrustTrack = socialHeroSection.querySelector<HTMLElement>('[data-rs-social-trust-track]')
        const socialCurves = Array.from(socialHeroSection.querySelectorAll<HTMLElement>('.social-hero__curve'))
        const socialHalos = Array.from(socialHeroSection.querySelectorAll<HTMLElement>('.social-hero__halo'))
        if (socialCard) {
          gsap.set(socialCard, { transformPerspective: 2200, transformOrigin: '50% 100%', force3D: true })
          if (socialTrust) gsap.set(socialTrust, { autoAlpha: 0, y: 28 })
          const settle = gsap.timeline({
            scrollTrigger: {
              trigger: socialHeroSection,
              start: 'top top',
              end: compact ? '+=210' : '+=360',
              scrub: compact ? .18 : .22,
              invalidateOnRefresh: true,
              fastScrollEnd: 1200
            }
          })
          settle.fromTo(socialCard,
            compact
              ? { rotateX: 12, rotateY: 0, rotateZ: -.18, scale: 1.01, x: 0, y: 28 }
              : { rotateX: 18, rotateY: 0, rotateZ: -.28, scale: 1.025, x: 0, y: 58 },
            { rotateX: 0, rotateY: 0, rotateZ: 0, skewX: 0, skewY: 0, x: 0, scale: compact ? .985 : .965, y: compact ? -4 : -16, ease: 'none', duration: 1 }, 0)
          if (socialCurves.length) settle.fromTo(socialCurves, { autoAlpha: .42, scaleX: .88, y: 12 }, { autoAlpha: 1, scaleX: 1, y: 0, ease: 'none', duration: .72 }, .03)
          if (socialTrust) settle.to(socialTrust, { autoAlpha: 1, y: 0, ease: 'none', duration: .38 }, .36)
          cleanups.push(() => settle.kill())
        }
        if (socialTrustTrack) {
          gsap.set(socialTrustTrack, { xPercent: 0 })
          const marquee = gsap.to(socialTrustTrack, { xPercent: -50, duration: compact ? 16 : 20, repeat: -1, ease: 'none' })
          cleanups.push(() => marquee.kill())
        }
        socialHalos.forEach((halo, index) => {
          const tween = gsap.to(halo, { scale: index ? 1.03 : 1.045, opacity: index ? .86 : .66, duration: 3 + index * .55, repeat: -1, yoyo: true, ease: 'sine.inOut' })
          cleanups.push(() => tween.kill())
        })
      }


      // Home-07 / Digital Growth Strategy: phone hero, floating system, text reveal, pinned quick-start, S-curve roadmap and integration field.
      const growthHero = root.querySelector<HTMLElement>('[data-rs-growth-hero]')
      if (growthHero) {
        const phone = growthHero.querySelector<HTMLElement>('[data-rs-growth-phone]')
        const chips = Array.from(growthHero.querySelectorAll<HTMLElement>('[data-rs-growth-chip]'))
        const trust = growthHero.querySelector<HTMLElement>('[data-rs-hero-trust]')
        const trustTrack = growthHero.querySelector<HTMLElement>('[data-rs-growth-trust-track]')
        if (phone) {
          gsap.set(phone, { transformPerspective: 1600, transformOrigin: '50% 70%', force3D: true })
          const intro = gsap.timeline({ delay: .18, defaults: { ease: 'power3.out' } })
          intro.fromTo(phone, growthCompact ? { y: 32, rotateZ: -2, rotateY: -2, scale: .96, autoAlpha: 0 } : { y: 50, rotateZ: -3.2, rotateY: -5, rotateX: 2.5, scale: .93, autoAlpha: 0 }, { y: 0, rotateZ: 0, rotateY: 0, rotateX: 0, scale: 1, autoAlpha: 1, duration: .9 })
          if (chips.length) intro.fromTo(chips, { y: 24, scale: .82, autoAlpha: 0 }, { y: 0, scale: 1, autoAlpha: 1, duration: .5, stagger: .1, ease: 'back.out(1.4)' }, '-=.45')
          if (trust) intro.fromTo(trust.children, { y: 14, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: .42, stagger: .05 }, '-=.25')
          cleanups.push(() => intro.kill())

          if (!growthCompact) {
            const settle = gsap.timeline({ scrollTrigger: { trigger: growthHero, start: 'top top', end: 'bottom top', scrub: .72, invalidateOnRefresh: true } })
            settle.to(phone, { yPercent: 8, scale: .97, rotateZ: .35, ease: 'none', duration: 1 }, 0)
            cleanups.push(() => settle.kill())
          }
        }
        chips.forEach((chip, index) => {
          const drift = gsap.to(chip, { y: index % 2 ? -8 : 7, x: index % 3 ? 4 : -4, duration: 2.7 + index * .25, repeat: -1, yoyo: true, ease: 'sine.inOut' })
          cleanups.push(() => drift.kill())
        })

        if (trustTrack && trustTrack.scrollWidth) {
          const loopDistance = Math.max(trustTrack.scrollWidth / 2, 1)
          gsap.set(trustTrack, { x: 0 })
          const marquee = gsap.to(trustTrack, { x: -loopDistance, duration: 18, ease: 'none', repeat: -1 })
          cleanups.push(() => marquee.kill())
        }
      }

      const growthSystem = root.querySelector<HTMLElement>('[data-rs-growth-system-stage]')
      if (growthSystem) {
        const cards = Array.from(growthSystem.querySelectorAll<HTMLElement>('[data-rs-growth-feature-card]'))
        const chartLines = Array.from(growthSystem.querySelectorAll<SVGPathElement>('[data-rs-growth-chart-line]'))
        const chartBars = Array.from(growthSystem.querySelectorAll<SVGRectElement>('[data-rs-growth-chart-bars] rect'))
        const chartTooltip = growthSystem.querySelector<HTMLElement>('[data-rs-growth-chart-tooltip]')
        const hubLines = Array.from(growthSystem.querySelectorAll<SVGPathElement>('[data-rs-growth-node-line]'))
        const hubNodes = Array.from(growthSystem.querySelectorAll<HTMLElement>('[data-rs-growth-hub-node]'))
        const hubCore = growthSystem.querySelector<HTMLElement>('[data-rs-growth-hub-core]')
        const cardFloats = Array.from(growthSystem.querySelectorAll<HTMLElement>('[data-rs-growth-card-float]'))

        if (cards.length) {
          const entry = gsap.fromTo(cards,
            { y: growthCompact ? 26 : 46, scale: .965, autoAlpha: 0 },
            { y: 0, scale: 1, autoAlpha: 1, duration: .72, stagger: .105, ease: 'power3.out', scrollTrigger: { trigger: growthSystem, start: growthCompact ? 'top 90%' : 'top 82%', once: true } }
          )
          cleanups.push(() => entry.kill())

          if (!growthCompact && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
            cards.forEach((card) => {
              const enter = () => gsap.to(card, { y: -7, scale: 1.008, boxShadow: '0 26px 68px rgba(0,68,62,.11)', duration: .3, ease: 'power3.out', overwrite: 'auto' })
              const leave = () => gsap.to(card, { y: 0, scale: 1, boxShadow: '0 18px 50px rgba(0,68,62,.065)', duration: .38, ease: 'power3.out', overwrite: 'auto' })
              card.addEventListener('pointerenter', enter)
              card.addEventListener('pointerleave', leave)
              cleanups.push(() => { card.removeEventListener('pointerenter', enter); card.removeEventListener('pointerleave', leave) })
            })
          }
        }

        chartBars.forEach((bar, index) => {
          gsap.set(bar, { transformOrigin: '50% 100%', scaleY: .2, opacity: .22 })
          const barTween = gsap.to(bar, { scaleY: 1, opacity: index % 2 ? .72 : .42, duration: .52, delay: index * .055, ease: 'power3.out', scrollTrigger: { trigger: growthSystem, start: 'top 80%', once: true } })
          cleanups.push(() => barTween.kill())
        })

        chartLines.forEach((line, index) => {
          const len = line.getTotalLength?.() || 620
          gsap.set(line, { strokeDasharray: len, strokeDashoffset: len })
          const draw = gsap.to(line, { strokeDashoffset: 0, duration: 1.05, delay: .12 + index * .12, ease: 'power2.inOut', scrollTrigger: { trigger: growthSystem, start: 'top 80%', once: true } })
          const shimmer = gsap.to(line, { filter: index ? 'drop-shadow(0 0 7px rgba(255,150,13,.28))' : 'drop-shadow(0 0 7px rgba(0,187,160,.28))', duration: 1.8, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 1.3 + index * .2 })
          cleanups.push(() => { draw.kill(); shimmer.kill() })
        })

        if (chartTooltip) {
          gsap.set(chartTooltip, { x: 0, y: 0, autoAlpha: 0, scale: .88 })
          const reveal = gsap.to(chartTooltip, { autoAlpha: 1, scale: 1, duration: .42, ease: 'back.out(1.45)', scrollTrigger: { trigger: growthSystem, start: 'top 76%', once: true } })
          const travel = gsap.timeline({ repeat: -1, repeatDelay: .18, delay: 1.0, defaults: { ease: 'sine.inOut' } })
            .to(chartTooltip, { x: growthCompact ? 42 : 72, y: -18, duration: 1.25 })
            .to(chartTooltip, { x: growthCompact ? 96 : 162, y: 8, duration: 1.35 })
            .to(chartTooltip, { x: growthCompact ? 145 : 255, y: -22, duration: 1.25 })
            .to(chartTooltip, { x: growthCompact ? 72 : 112, y: 4, duration: 1.35 })
            .to(chartTooltip, { x: 0, y: 0, duration: 1.15 })
          cleanups.push(() => { reveal.kill(); travel.kill() })
        }

        hubLines.forEach((line, index) => {
          const len = line.getTotalLength?.() || 220
          gsap.set(line, { strokeDasharray: '5 8', strokeDashoffset: len, opacity: .18 })
          const draw = gsap.to(line, { strokeDashoffset: 0, opacity: .65, duration: .7, delay: index * .08, ease: 'power2.out', scrollTrigger: { trigger: growthSystem, start: 'top 78%', once: true } })
          const flow = gsap.to(line, { strokeDashoffset: '-=52', duration: 2.15 + index * .08, repeat: -1, ease: 'none', delay: .85 + index * .06 })
          cleanups.push(() => { draw.kill(); flow.kill() })
        })

        if (hubCore) {
          const coreEntry = gsap.fromTo(hubCore, { scale: .7, rotate: -8, autoAlpha: 0 }, { scale: 1, rotate: 0, autoAlpha: 1, duration: .62, ease: 'back.out(1.55)', scrollTrigger: { trigger: growthSystem, start: 'top 78%', once: true } })
          const corePulse = gsap.to(hubCore, { scale: 1.045, boxShadow: '0 0 0 13px rgba(0,187,160,.055),0 18px 42px rgba(0,187,160,.16)', duration: 2.3, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: .8 })
          cleanups.push(() => { coreEntry.kill(); corePulse.kill() })
        }

        hubNodes.forEach((node, index) => {
          const entry = gsap.fromTo(node, { scale: .55, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: .46, delay: index * .08, ease: 'back.out(1.5)', scrollTrigger: { trigger: growthSystem, start: 'top 77%', once: true } })
          const pulse = gsap.to(node, { y: index % 2 ? -5 : 5, scale: index % 2 ? 1.03 : 1.02, duration: 2.4 + index * .16, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: .9 + index * .1 })
          cleanups.push(() => { entry.kill(); pulse.kill() })
        })

        if (!growthCompact) {
          cardFloats.forEach((item, index) => {
            const drift = gsap.to(item, { y: index % 2 ? -5 : 5, x: index % 3 ? 2 : -2, duration: 3 + index * .18, repeat: -1, yoyo: true, ease: 'sine.inOut' })
            cleanups.push(() => drift.kill())
          })
        }
      }

      const growthText = root.querySelector<HTMLElement>('[data-rs-growth-text]')
      if (growthText) {
        const words = Array.from(growthText.querySelectorAll<HTMLElement>('[data-rs-growth-text-word]'))
        const badges = Array.from(growthText.querySelectorAll<HTMLElement>('[data-rs-growth-text-badge]'))
        if (words.length) {
          gsap.set(words, { color: 'rgba(0,68,62,.22)' })
          const reveal = gsap.to(words, {
            color: '#00443E',
            opacity: 1,
            stagger: .08,
            ease: 'none',
            scrollTrigger: { trigger: growthText, start: 'top 78%', end: 'bottom 45%', scrub: .72, invalidateOnRefresh: true }
          })
          cleanups.push(() => reveal.kill())
        }
        if (badges.length) {
          const badgeTween = gsap.fromTo(badges, { scale: .65, rotate: -9, autoAlpha: .35 }, { scale: 1, rotate: 0, autoAlpha: 1, duration: .45, stagger: .18, ease: 'back.out(1.5)', scrollTrigger: { trigger: growthText, start: 'top 70%', once: true } })
          cleanups.push(() => badgeTween.kill())
        }
      }

      const growthQuick = root.querySelector<HTMLElement>('[data-rs-growth-quick]')
      const growthQuickPin = root.querySelector<HTMLElement>('[data-rs-growth-quick-pin]')
      if (growthQuick && growthQuickPin) {
        const cards = Array.from(growthQuick.querySelectorAll<HTMLElement>('[data-rs-growth-quick-card]'))
        const progress = Array.from(growthQuick.querySelectorAll<HTMLElement>('[data-rs-growth-quick-progress] i'))
        if (growthCompact) {
          cards.forEach((card, index) => {
            const pieces = Array.from(card.querySelectorAll<HTMLElement>('.gs7-quick__mockup,.gs7-quick__content'))
            if (pieces.length) {
              const arrival = gsap.fromTo(pieces, { y: 26, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: .56, stagger: .08, ease: 'power3.out', scrollTrigger: { trigger: card, start: 'top 88%', once: true } })
              cleanups.push(() => arrival.kill())
            }
            const bar = progress[index]
            if (bar) {
              gsap.set(bar, { scaleX: 0, transformOrigin: 'left center' })
              const fill = gsap.to(bar, { scaleX: 1, duration: .5, ease: 'power2.out', scrollTrigger: { trigger: card, start: 'top 84%', once: true } })
              cleanups.push(() => fill.kill())
            }
          })
        } else if (cards.length >= 3) {
          gsap.set(cards, { force3D: true, transformOrigin: '50% 50%' })
          gsap.set(cards[0], { xPercent: 0, yPercent: 0, autoAlpha: 1, scale: 1, zIndex: 3 })
          gsap.set(cards[1], { xPercent: 14, yPercent: 0, autoAlpha: 0, scale: .985, zIndex: 2 })
          gsap.set(cards[2], { xPercent: 18, yPercent: 0, autoAlpha: 0, scale: .98, zIndex: 1 })
          progress.forEach((bar) => gsap.set(bar, { scaleX: 0, transformOrigin: 'left center' }))

          const tl = gsap.timeline({ defaults: { ease: 'none' } })
          if (progress[0]) tl.to(progress[0], { scaleX: 1, duration: .72 }, 0)
          tl.to({}, { duration: .22 })
          tl.to(cards[0], { xPercent: -13, scale: .955, autoAlpha: 0, duration: .52 }, .88)
            .to(cards[1], { xPercent: 0, scale: 1, autoAlpha: 1, zIndex: 4, duration: .58 }, .84)
          if (progress[1]) tl.to(progress[1], { scaleX: 1, duration: .72 }, .86)
          tl.to({}, { duration: .24 })
          tl.to(cards[1], { xPercent: -13, scale: .955, autoAlpha: 0, duration: .52 }, 1.92)
            .to(cards[2], { xPercent: 0, scale: 1, autoAlpha: 1, zIndex: 5, duration: .58 }, 1.88)
          if (progress[2]) tl.to(progress[2], { scaleX: 1, duration: .72 }, 1.90)
          tl.to({}, { duration: .72 })

          const trigger = ScrollTrigger.create({
            animation: tl,
            trigger: growthQuick,
            start: 'top top',
            end: '+=2450',
            pin: growthQuickPin,
            pinSpacing: true,
            scrub: .68,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            fastScrollEnd: true
          })
          cleanups.push(() => { trigger.kill(true); tl.kill() })
        }
      }

      const growthRoadmap = root.querySelector<HTMLElement>('[data-rs-growth-roadmap]')
      if (growthRoadmap && !growthCompact) {
        const path = growthRoadmap.querySelector<SVGPathElement>('[data-rs-growth-roadmap-path]')
        const steps = Array.from(growthRoadmap.querySelectorAll<HTMLElement>('[data-rs-growth-roadmap-step]'))
        if (path) {
          const len = path.getTotalLength?.() || 1900
          const fractions = [0.018, 0.309, 0.548, 0.786]
          gsap.set(path, { strokeDasharray: len, strokeDashoffset: len })
          steps.forEach((step) => {
            const copy = step.querySelector<HTMLElement>('div')
            const dot = step.querySelector<HTMLElement>('[data-rs-growth-roadmap-dot]')
            gsap.set(step, { autoAlpha: 1 })
            if (copy) gsap.set(copy, { y: 24, autoAlpha: 0 })
            if (dot) gsap.set(dot, { scale: .72, autoAlpha: .22, boxShadow: '0 0 0 7px rgba(0,187,160,.035)' })
          })

          const tl = gsap.timeline({ defaults: { ease: 'none' } })
          tl.to(path, { strokeDashoffset: 0, duration: 1 }, 0)
          steps.forEach((step, index) => {
            const copy = step.querySelector<HTMLElement>('div')
            const dot = step.querySelector<HTMLElement>('[data-rs-growth-roadmap-dot]')
            const at = fractions[index] ?? (index + 1) / (steps.length + 1)
            if (dot) tl.to(dot, { scale: 1, autoAlpha: 1, boxShadow: '0 0 0 10px rgba(0,187,160,.075)', duration: .025 }, at)
            if (copy) tl.to(copy, { y: 0, autoAlpha: 1, duration: .055, ease: 'power2.out' }, at)
          })

          const trigger = ScrollTrigger.create({
            animation: tl,
            trigger: growthRoadmap,
            start: 'top 64%',
            end: 'bottom 24%',
            scrub: .72,
            invalidateOnRefresh: true
          })
          cleanups.push(() => { trigger.kill(true); tl.kill() })
        }
      }

      if (growthRoadmap && growthCompact) {
        const compactSteps = Array.from(growthRoadmap.querySelectorAll<HTMLElement>('[data-rs-growth-roadmap-step]'))
        compactSteps.forEach((step) => {
          const copy = step.querySelector<HTMLElement>('div')
          const dot = step.querySelector<HTMLElement>('[data-rs-growth-roadmap-dot]')
          if (copy) {
            const reveal = gsap.fromTo(copy, { y: 20, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: .5, ease: 'power3.out', scrollTrigger: { trigger: step, start: 'top 88%', once: true } })
            cleanups.push(() => reveal.kill())
          }
          if (dot) {
            const dotReveal = gsap.fromTo(dot, { scale: .7, autoAlpha: .25 }, { scale: 1, autoAlpha: 1, duration: .4, ease: 'back.out(1.4)', scrollTrigger: { trigger: step, start: 'top 90%', once: true } })
            cleanups.push(() => dotReveal.kill())
          }
        })
      }

      const growthPrices = Array.from(root.querySelectorAll<HTMLElement>('[data-rs-growth-price-card]'))
      if (growthPrices.length) {
        const entry = gsap.fromTo(growthPrices, { y: 40, autoAlpha: 0, scale: .975 }, { y: 0, autoAlpha: 1, scale: 1, duration: .66, stagger: .09, ease: 'power3.out', scrollTrigger: { trigger: growthPrices[0].parentElement || growthPrices[0], start: 'top 86%', once: true } })
        cleanups.push(() => entry.kill())

        const priceExtras = Array.from(root.querySelectorAll<HTMLElement>('[data-rs-growth-price-extra] > *'))
        if (priceExtras.length) {
          const extraReveal = gsap.fromTo(priceExtras, { y: 34, autoAlpha: 0, scale: .985 }, { y: 0, autoAlpha: 1, scale: 1, duration: .58, stagger: .08, ease: 'power3.out', scrollTrigger: { trigger: priceExtras[0].parentElement || priceExtras[0], start: 'top 88%', once: true } })
          cleanups.push(() => extraReveal.kill())
        }

        if (!growthCompact && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
          growthPrices.forEach((card) => {
            const button = card.querySelector<HTMLElement>('.rs-btn')
            const price = card.querySelector<HTMLElement>('.gs7-price-card__price')
            const badge = card.querySelector<HTMLElement>('.gs7-price-card__top>b')
            const enter = () => {
              card.classList.add('is-hovered')
              gsap.to(card, { y: -12, scale: 1.016, rotateX: .45, transformPerspective: 1100, borderColor: 'rgba(0,187,160,.48)', boxShadow: '0 30px 76px rgba(0,187,160,.15)', duration: .3, ease: 'power3.out', overwrite: 'auto' })
              if (button) gsap.to(button, { y: -1, scale: 1.012, duration: .28, ease: 'power3.out', overwrite: 'auto' })
              if (price) gsap.to(price, { x: 3, duration: .28, ease: 'power3.out', overwrite: 'auto' })
              if (badge) gsap.to(badge, { scale: 1.045, duration: .28, ease: 'power3.out', overwrite: 'auto' })
            }
            const leave = () => {
              card.classList.remove('is-hovered')
              gsap.to(card, { y: 0, scale: 1, rotateX: 0, borderColor: card.classList.contains('is-popular') ? 'rgba(0,187,160,.42)' : 'rgba(0,68,62,.10)', boxShadow: card.classList.contains('is-popular') ? '0 24px 65px rgba(0,187,160,.10)' : '0 18px 55px rgba(0,68,62,.06)', duration: .4, ease: 'power3.out', overwrite: 'auto' })
              if (button) gsap.to(button, { y: 0, scale: 1, duration: .34, ease: 'power3.out', overwrite: 'auto' })
              if (price) gsap.to(price, { x: 0, duration: .34, ease: 'power3.out', overwrite: 'auto' })
              if (badge) gsap.to(badge, { scale: 1, duration: .34, ease: 'power3.out', overwrite: 'auto' })
            }
            card.addEventListener('pointerenter', enter); card.addEventListener('pointerleave', leave)
            cleanups.push(() => { card.removeEventListener('pointerenter', enter); card.removeEventListener('pointerleave', leave) })
          })
        }
      }

      const growthIntegrations = root.querySelector<HTMLElement>('[data-rs-growth-integrations]')
      if (growthIntegrations) {
        const box = growthIntegrations.querySelector<HTMLElement>('[data-rs-growth-integrations-box]')
        const core = growthIntegrations.querySelector<HTMLElement>('[data-rs-growth-integrations-core]')
        const nodes = Array.from(growthIntegrations.querySelectorAll<HTMLElement>('[data-rs-growth-integration-node]'))
        const movingLines = Array.from(growthIntegrations.querySelectorAll<SVGPathElement>('[data-rs-growth-integration-line]'))
        const baseLines = Array.from(growthIntegrations.querySelectorAll<SVGPathElement>('[data-rs-growth-integration-base]'))
        if (box) {
          const reveal = gsap.fromTo(box, { y: 70, autoAlpha: 0, scale: .985 }, { y: 0, autoAlpha: 1, scale: 1, duration: .82, ease: 'power3.out', scrollTrigger: { trigger: growthIntegrations, start: 'top 84%', once: true } })
          cleanups.push(() => reveal.kill())
        }
        if (core) {
          const coreTween = gsap.fromTo(core, { y: 34, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: .62, ease: 'power3.out', scrollTrigger: { trigger: growthIntegrations, start: 'top 80%', once: true } })
          cleanups.push(() => coreTween.kill())
        }
        if (nodes.length) {
          const drifts: gsap.core.Tween[] = []
          const nodeEntry = gsap.fromTo(nodes,
            { y: 38, scale: .6, autoAlpha: 0 },
            {
              y: 0, scale: 1, autoAlpha: 1, duration: .52, stagger: .07, ease: 'back.out(1.45)',
              scrollTrigger: { trigger: growthIntegrations, start: 'top 78%', once: true },
              onComplete: () => {
                if (!growthCompact) nodes.forEach((node, index) => drifts.push(gsap.to(node, { y: index % 2 ? -7 : 7, x: index % 3 ? 4 : -4, duration: 3.1 + index * .14, repeat: -1, yoyo: true, ease: 'sine.inOut' })))
              }
            }
          )
          cleanups.push(() => { nodeEntry.kill(); drifts.forEach((tween) => tween.kill()) })
        }
        baseLines.forEach((line, index) => {
          const len = line.getTotalLength?.() || 460
          gsap.set(line, { strokeDasharray: len, strokeDashoffset: len, opacity: .12 })
          const draw = gsap.to(line, { strokeDashoffset: 0, opacity: .55, duration: .78, delay: index * .055, ease: 'power2.out', scrollTrigger: { trigger: growthIntegrations, start: 'top 79%', once: true }, onComplete: () => gsap.set(line, { strokeDasharray: '6 10', strokeDashoffset: 0 }) })
          cleanups.push(() => draw.kill())
        })

        movingLines.forEach((line, index) => {
          const len = line.getTotalLength?.() || 460
          gsap.set(line, { strokeDasharray: `26 ${Math.max(70, len - 26)}`, strokeDashoffset: index * -31, opacity: .95 })
          const travel = gsap.to(line, { strokeDashoffset: `-=${len}`, duration: 2.7 + index * .17, repeat: -1, ease: 'none' })
          cleanups.push(() => travel.kill())
        })
      }

      const growthMobile = root.querySelector<HTMLElement>('[data-rs-growth-mobile]')
      if (growthMobile) {
        const copy = growthMobile.querySelector<HTMLElement>('[data-rs-growth-mobile-copy]')
        const phones = growthMobile.querySelector<HTMLElement>('[data-rs-growth-mobile-phones]')
        if (copy) {
          const copyReveal = gsap.fromTo(copy, { y: 28, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: .64, ease: 'power3.out', scrollTrigger: { trigger: growthMobile, start: 'top 82%', once: true } })
          cleanups.push(() => copyReveal.kill())
        }
        if (phones) {
          const phoneReveal = gsap.fromTo(phones, { y: growthCompact ? 72 : 150, autoAlpha: 0, scale: growthCompact ? .96 : .93 }, { y: 0, autoAlpha: 1, scale: 1, duration: growthCompact ? .82 : 1.05, ease: 'power4.out', scrollTrigger: { trigger: growthMobile, start: growthCompact ? 'top 88%' : 'top 78%', end: growthCompact ? 'top 58%' : 'top 48%', scrub: growthCompact ? false : .55, once: growthCompact } })
          cleanups.push(() => phoneReveal.kill())
        }
      }

      const growthFaq = root.querySelector<HTMLElement>('[data-rs-growth-faq]')
      if (growthFaq) {
        const items = Array.from(growthFaq.querySelectorAll<HTMLElement>('[data-rs-growth-faq-item]'))
        if (items.length) {
          const entry = gsap.fromTo(items, { x: 24, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: .48, stagger: .06, ease: 'power3.out', scrollTrigger: { trigger: items[0].parentElement || items[0], start: 'top 86%', once: true } })
          cleanups.push(() => entry.kill())
        }
      }


      root.querySelectorAll<HTMLElement>('[data-rs-orbit]').forEach((el, i) => gsap.to(el, { rotation: 360, duration: 24 + i * 6, repeat: -1, ease: 'none' }))
      root.querySelectorAll<HTMLElement>('[data-rs-orbit-reverse]').forEach((el, i) => gsap.to(el, { rotation: -360, duration: 30 + i * 7, repeat: -1, ease: 'none' }))
      if (!compact && layout !== '03') {
        root.querySelectorAll<HTMLElement>('[data-rs-float]').forEach((el, i) => {
          gsap.to(el, {
            y: i % 2 ? -10 : 10,
            x: i % 3 ? 5 : -5,
            rotation: i % 2 ? 1.2 : -1.2,
            duration: 2.8 + i * .4,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
          })
        })
      }

      root.querySelectorAll<HTMLElement>('[data-rs-reveal]').forEach((el) => {
        gsap.fromTo(el, compact ? { opacity: 0, y: 20 } : { opacity: 0, y: 34, scale: .985 }, {
          opacity: 1, y: 0, scale: 1, duration: .76, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true }
        })
      })

      // Reference-style pinned feature reveal: statement first, cards only after continued scroll.
      const story = root.querySelector<HTMLElement>('[data-rs-story]')
      const storyPin = root.querySelector<HTMLElement>('[data-rs-story-pin]')
      const storyIntro = root.querySelector<HTMLElement>('[data-rs-story-intro]')
      const storyGrid = root.querySelector<HTMLElement>('[data-rs-story-grid]')
      const featureCards = Array.from(root.querySelectorAll<HTMLElement>('[data-rs-feature]'))
      if (story && storyPin && storyIntro && storyGrid && featureCards.length && layout !== '03') {
        gsap.set(storyIntro, { autoAlpha: 1, y: 0, scale: 1 })
        gsap.set(storyGrid, { autoAlpha: 1 })
        gsap.set(featureCards, { autoAlpha: 0, y: 46, scale: .97, rotateX: -3, transformOrigin: '50% 50%' })
        const tl = gsap.timeline({ paused: true, defaults: { ease: 'none' } })
          .to({}, { duration: .75 })
          .to(storyIntro, { autoAlpha: 0, y: -30, scale: .985, duration: .46, ease: 'power2.inOut' })
          .to(featureCards.slice(0, 3), { autoAlpha: 1, y: 0, scale: 1, rotateX: 0, duration: .72, stagger: .09, ease: 'power3.out' })
          .to({}, { duration: .22 })
          .to(featureCards.slice(3), { autoAlpha: 1, y: 0, scale: 1, rotateX: 0, duration: .72, stagger: .09, ease: 'power3.out' })
          .to({}, { duration: .62 })
        const distance = () => Math.round(Math.max(650, window.innerHeight) * (compact ? 3.35 : 2.9))
        const trigger = ScrollTrigger.create({
          animation: tl,
          trigger: storyPin,
          start: () => `top top+=${compact ? 54 : 68}`,
          end: () => `+=${distance()}`,
          pin: storyPin,
          pinSpacing: true,
          scrub: .52,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onLeaveBack: () => {
            tl.progress(0).pause()
            gsap.set(storyIntro, { autoAlpha: 1, y: 0, scale: 1 })
            gsap.set(featureCards, { autoAlpha: 0, y: 46, scale: .97, rotateX: -3 })
          }
        })
        cleanups.push(() => { trigger.kill(true); tl.kill() })
      }

      if (layout === '03' && story && storyIntro && storyGrid && featureCards.length) {
        gsap.set(storyIntro, { autoAlpha: 1, y: 0, scale: 1 })
        gsap.set(storyGrid, { autoAlpha: 1 })
        gsap.set(featureCards, { autoAlpha: 0, y: 34, scale: .975, rotateX: -2, transformOrigin: '50% 50%' })
        const storyEntry = gsap.timeline({
          scrollTrigger: { trigger: story, start: compact ? 'top 88%' : 'top 80%', once: true },
          defaults: { ease: 'power3.out' }
        })
          .fromTo(storyIntro, { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: .62 })
          .to(featureCards.slice(0, 3), { autoAlpha: 1, y: 0, scale: 1, rotateX: 0, duration: .68, stagger: .09 }, '-=.18')
          .to(featureCards.slice(3), { autoAlpha: 1, y: 0, scale: 1, rotateX: 0, duration: .56, stagger: .07 }, '-=.28')
        cleanups.push(() => storyEntry.kill())

        const ecosystemOrnament = story.querySelector<HTMLElement>('.dp-section-ornament--ecosystem')
        if (ecosystemOrnament) {
          const ornamentEntry = gsap.fromTo(ecosystemOrnament, { autoAlpha: 0, y: 18, scale: .86 }, { autoAlpha: 1, y: 0, scale: 1, duration: .72, ease: 'back.out(1.35)', scrollTrigger: { trigger: story, start: 'top 86%', once: true } })
          cleanups.push(() => ornamentEntry.kill())
        }

        const barVisuals = Array.from(story.querySelectorAll<HTMLElement>('.dp-bars span'))
        barVisuals.forEach((bar, index) => {
          gsap.set(bar, { scaleY: .18, transformOrigin: '50% 100%', opacity: .28 })
          const t = gsap.to(bar, { scaleY: 1, opacity: 1, duration: .58, delay: .42 + index * .045, ease: 'power3.out', scrollTrigger: { trigger: story, start: 'top 78%', once: true } })
          cleanups.push(() => t.kill())
        })
        const network = story.querySelector<HTMLElement>('.dp-network')
        if (network) {
          const networkNodes = Array.from(network.querySelectorAll<HTMLElement>('.dp-network__node'))
          const connectors = Array.from(network.querySelectorAll<HTMLElement>('.dp-network__connector'))
          const hub = network.querySelector<HTMLElement>('.dp-network__hub')
          gsap.set(connectors, { scaleX: 0, transformOrigin: '50% 50%', opacity: .18 })
          gsap.set(networkNodes, { scale: .45, autoAlpha: 0, y: 8 })
          if (hub) gsap.set(hub, { scale: .5, autoAlpha: 0 })
          const nt = gsap.timeline({ scrollTrigger: { trigger: network, start: 'top 88%', once: true }, defaults: { ease: 'power3.out' } })
          if (hub) nt.to(hub, { scale: 1, autoAlpha: 1, duration: .55, ease: 'back.out(1.5)' })
          nt.to(connectors, { scaleX: 1, opacity: 1, duration: .56, stagger: .06 }, '-=.28')
            .to(networkNodes, { scale: 1, autoAlpha: 1, y: 0, duration: .46, stagger: .08, ease: 'back.out(1.5)' }, '-=.42')
          cleanups.push(() => nt.kill())
          if (hub) {
            const hp = gsap.to(hub, { scale: 1.055, boxShadow: '0 0 0 13px rgba(0,187,160,.045), 0 0 34px rgba(0,187,160,.30)', duration: 1.9, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 1.1 })
            cleanups.push(() => hp.kill())
          }
          networkNodes.forEach((node, index) => {
            const float = gsap.to(node, { y: index % 2 ? -5 : 5, duration: 2.2 + index * .18, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: .9 + index * .08 })
            cleanups.push(() => float.kill())
          })
        }

        const globe = story.querySelector<HTMLElement>('.dp-globe')
        if (globe) {
          const sphere = globe.querySelector<HTMLElement>('.dp-globe__sphere')
          const arcs = Array.from(globe.querySelectorAll<HTMLElement>('.dp-globe__arc'))
          const sparks = Array.from(globe.querySelectorAll<HTMLElement>('.dp-globe__spark'))
          if (sphere) {
            const ge = gsap.fromTo(sphere, { autoAlpha: 0, scale: .72, x: 26 }, { autoAlpha: 1, scale: 1, x: 0, duration: .8, ease: 'power3.out', scrollTrigger: { trigger: globe, start: 'top 88%', once: true } })
            const gr = gsap.to(sphere, { rotation: 360, duration: 34, repeat: -1, ease: 'none' })
            cleanups.push(() => { ge.kill(); gr.kill() })
          }
          arcs.forEach((arc, index) => {
            gsap.set(arc, { scale: .8, autoAlpha: 0 })
            const at = gsap.to(arc, { scale: 1, autoAlpha: .72, duration: .68, delay: .18 + index * .12, ease: 'power3.out', scrollTrigger: { trigger: globe, start: 'top 88%', once: true } })
            const ar = gsap.to(arc, { rotation: index ? -360 : 360, duration: 18 + index * 4, repeat: -1, ease: 'none' })
            cleanups.push(() => { at.kill(); ar.kill() })
          })
          sparks.forEach((spark, index) => {
            const st = gsap.to(spark, { opacity: .95, scale: 1.8, duration: 1.4 + index * .3, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: .6 + index * .5 })
            cleanups.push(() => st.kill())
          })
        }
        const badges = Array.from(story.querySelectorAll<HTMLElement>('.dp-feature__badge'))
        badges.forEach((badge, index) => {
          const pulse = gsap.to(badge, { y: index % 2 ? -4 : 4, scale: 1.045, boxShadow: index % 3 === 0 ? '0 0 28px rgba(0,187,160,.22)' : '0 0 24px rgba(255,150,13,.12)', duration: 2.5 + index * .12, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: .9 + index * .08 })
          cleanups.push(() => pulse.kill())
        })
      }

      featureCards.forEach((card, index) => {
        const bars = card.querySelectorAll<HTMLElement>('.rs-feature__signal b')
        bars.forEach((bar, barIndex) => gsap.fromTo(bar, { scaleX: .25, opacity: .42, transformOrigin: 'left center' }, { scaleX: 1, opacity: 1, duration: 1.25 + barIndex * .12, delay: index * .04, repeat: -1, yoyo: true, ease: 'sine.inOut' }))
      })

      // GSAP hover choreography across the cards: lift, light bloom and icon response.
      if (!compact && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
        const hoverCards = Array.from(root.querySelectorAll<HTMLElement>('[data-rs-feature],[data-rs-process-card],[data-rs-module],[data-rs-metric-card],[data-rs-proof-card],.rs-simulator__cards article'))
        hoverCards.forEach((card) => {
          const icon = card.querySelector<HTMLElement>('i, .rs-feature__top i')
          const enter = () => {
            gsap.to(card, { y: -8, scale: 1.012, boxShadow: '0 28px 70px rgba(0,187,160,.12)', duration: .3, ease: 'power2.out', overwrite: 'auto' })
            if (icon) gsap.to(icon, { scale: 1.08, rotation: -4, duration: .32, ease: 'power2.out', overwrite: 'auto' })
          }
          const leave = () => {
            gsap.to(card, { y: 0, scale: 1, boxShadow: '', duration: .42, ease: 'power3.out', overwrite: 'auto', clearProps: 'boxShadow' })
            if (icon) gsap.to(icon, { scale: 1, rotation: 0, duration: .4, ease: 'power3.out', overwrite: 'auto' })
          }
          card.addEventListener('pointerenter', enter)
          card.addEventListener('pointerleave', leave)
          cleanups.push(() => { card.removeEventListener('pointerenter', enter); card.removeEventListener('pointerleave', leave) })
        })
      }


      const patientInquiry = root.querySelector<HTMLElement>('[data-rs-patient-inquiry]')
      if (patientInquiry) {
        const feature = patientInquiry.querySelector<HTMLElement>('[data-rs-patient-inquiry-feature]')
        const chat = patientInquiry.querySelector<HTMLElement>('[data-rs-patient-inquiry-chat]')
        const typed = patientInquiry.querySelector<HTMLElement>('[data-rs-patient-typed]')
        const send = patientInquiry.querySelector<HTMLElement>('[data-rs-patient-send]')
        const cursor = patientInquiry.querySelector<HTMLElement>('.pa-inquiry__cursor')
        const revealTargets = [feature, chat].filter(Boolean) as HTMLElement[]
        if (revealTargets.length) {
          const reveal = gsap.fromTo(revealTargets,
            { y: 28, autoAlpha: 0, scale: .975 },
            { y: 0, autoAlpha: 1, scale: 1, duration: .72, stagger: .08, ease: 'power3.out', scrollTrigger: { trigger: patientInquiry, start: 'top 82%', once: true } }
          )
          cleanups.push(() => reveal.kill())
        }
        if (cursor) {
          const blink = gsap.to(cursor, { opacity: .14, duration: .52, repeat: -1, yoyo: true, ease: 'none' })
          cleanups.push(() => blink.kill())
        }
        if (typed) {
          const messages = [
            'Hi, I found your clinic online. What is the next step?',
            'Can someone guide me toward the right treatment or appointment?',
            'I would like details about availability, pricing and consultation options.'
          ]
          let messageIndex = 0
          let loopTimeline: gsap.core.Timeline | null = null
          const playLoop = () => {
            const message = messages[messageIndex]
            const state = { count: 0 }
            typed.textContent = ''
            loopTimeline = gsap.timeline({
              defaults: { ease: 'none' },
              onComplete: () => {
                messageIndex = (messageIndex + 1) % messages.length
                playLoop()
              }
            })
            loopTimeline.to(state, {
              count: message.length,
              duration: Math.max(1.7, message.length * .042),
              snap: { count: 1 },
              onUpdate: () => { typed.textContent = message.slice(0, Math.round(state.count)) }
            })
            if (send) {
              loopTimeline.to(send, { scale: .88, duration: .11, ease: 'power2.out' }, '-=.08')
              loopTimeline.to(send, { scale: 1, duration: .22, ease: 'back.out(1.8)' })
              loopTimeline.to(send, { boxShadow: '0 0 0 8px rgba(0,187,160,.12)', duration: .12, yoyo: true, repeat: 1, ease: 'sine.inOut' }, '<')
            }
            loopTimeline.to({}, { duration: .7 })
            loopTimeline.to(state, {
              count: 0,
              duration: Math.max(.58, message.length * .024),
              snap: { count: 1 },
              onUpdate: () => { typed.textContent = message.slice(0, Math.round(state.count)) }
            })
            loopTimeline.to({}, { duration: .28 })
          }
          playLoop()
          cleanups.push(() => loopTimeline?.kill())
        }
      }


      // Patient Acquisition: one shared continuous color-chain clock for the three inquiry boxes.
      // The phase is deliberately global to this section: moving from card A to B never restarts the light.
      const patientInquiryCards = Array.from(root.querySelectorAll<HTMLElement>('[data-rs-patient-inquiry-card]'))
      if (patientInquiryCards.length && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
        const chainState = { angle: 0 }
        const chainStops = ['#00BBA0', '#FF960D', '#00BBA0']
        let activeCard: HTMLElement | null = null
        let chainTween: gsap.core.Tween | null = null
        const colorAt = (angle: number) => {
          const phase = (((angle / 120) % (chainStops.length - 1)) + (chainStops.length - 1)) % (chainStops.length - 1)
          const i = Math.floor(phase)
          return gsap.utils.interpolate(chainStops[i], chainStops[i + 1], phase - i)
        }
        const renderChain = () => {
          if (!activeCard) return
          const color = colorAt(chainState.angle)
          activeCard.style.setProperty('--pa-chain-angle', `${Number(chainState.angle) % 360}deg`)
          activeCard.style.setProperty('--pa-chain-color', color)
          activeCard.style.setProperty('--pa-chain-amber', '#FF960D')
        }
        const startChain = () => {
          chainTween?.kill()
          chainTween = gsap.to(chainState, {
            angle: Number(chainState.angle) + 360,
            duration: 2.35,
            repeat: -1,
            ease: 'none',
            onUpdate: renderChain
          })
        }
        patientInquiryCards.forEach((card) => {
          const enter = () => {
            if (activeCard && activeCard !== card) activeCard.classList.remove('is-chain-active')
            activeCard = card
            card.classList.add('is-chain-active')
            renderChain()
            startChain()
            gsap.to(card, { y: -7, scale: 1.012, boxShadow: '0 24px 62px rgba(0,68,62,.11)', duration: .3, ease: 'power2.out', overwrite: 'auto' })
          }
          const leave = () => {
            if (activeCard !== card) return
            chainTween?.kill()
            chainTween = null
            activeCard = null
            card.classList.remove('is-chain-active')
            gsap.to(card, { y: 0, scale: 1, boxShadow: '0 18px 48px rgba(0,68,62,.06)', duration: .36, ease: 'power3.out', overwrite: 'auto' })
          }
          card.addEventListener('pointerenter', enter)
          card.addEventListener('pointerleave', leave)
          card.addEventListener('focusin', enter)
          card.addEventListener('focusout', leave)
          cleanups.push(() => {
            card.removeEventListener('pointerenter', enter)
            card.removeEventListener('pointerleave', leave)
            card.removeEventListener('focusin', enter)
            card.removeEventListener('focusout', leave)
            chainTween?.kill()
          })
        })
      }

      // Patient Acquisition: static growth grid — one-time stagger only, never pinned.
      const patientGrowthCards = Array.from(root.querySelectorAll<HTMLElement>('[data-rs-patient-growth-card]'))
      if (patientGrowthCards.length) {
        const reveal = gsap.fromTo(patientGrowthCards,
          { y: 34, autoAlpha: 0, scale: .975 },
          { y: 0, autoAlpha: 1, scale: 1, duration: .66, stagger: .075, ease: 'power3.out', scrollTrigger: { trigger: patientGrowthCards[0].parentElement || patientGrowthCards[0], start: 'top 84%', once: true } }
        )
        cleanups.push(() => reveal.kill())
        patientGrowthCards.forEach((card, index) => {
          const icon = card.querySelector<HTMLElement>('.pa-growth__icon')
          if (!icon) return
          gsap.set(icon, { '--pa-ring-angle': '0deg' })
          const ring = gsap.to(icon, {
            '--pa-ring-angle': '360deg',
            duration: 3.8 + index * .22,
            repeat: -1,
            ease: 'none'
          })
          const float = gsap.to(icon, {
            y: index % 2 ? -3 : 3,
            scale: 1.04,
            boxShadow: index % 3 === 1
              ? '0 0 0 1px rgba(255,255,255,.04) inset, 0 16px 30px rgba(255,150,13,.24)'
              : index % 3 === 2
                ? '0 0 0 1px rgba(255,255,255,.04) inset, 0 16px 30px rgba(0,187,160,.26)'
                : '0 0 0 1px rgba(255,255,255,.04) inset, 0 16px 30px rgba(0,187,160,.22)',
            duration: 2.2 + index * .16,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
          })
          const enter = () => gsap.to(card, { y: -8, duration: .28, ease: 'power2.out', overwrite: 'auto' })
          const leave = () => gsap.to(card, { y: 0, duration: .32, ease: 'power2.out', overwrite: 'auto' })
          card.addEventListener('pointerenter', enter)
          card.addEventListener('pointerleave', leave)
          cleanups.push(() => {
            ring.kill()
            float.kill()
            card.removeEventListener('pointerenter', enter)
            card.removeEventListener('pointerleave', leave)
          })
        })
      }

      // Patient Acquisition pricing: reference fan pose stays visibly intact until the card deck itself enters view,
      // then the three cards scrub into their final aligned state. This preserves the two-stage reference behavior.
      const patientPricing = root.querySelector<HTMLElement>('[data-rs-patient-pricing]')
      if (patientPricing) {
        const grid = patientPricing.querySelector<HTMLElement>('.pa-pricing__grid')
        const cards = Array.from(patientPricing.querySelectorAll<HTMLElement>('[data-rs-patient-price]'))
        if (grid && cards.length) {
          const pricingMM = gsap.matchMedia()
          pricingMM.add({
            desktop: '(min-width: 1051px)',
            tablet: '(min-width: 761px) and (max-width: 1050px)',
            mobile: '(max-width: 760px)'
          }, (context) => {
            const conditions = context.conditions as { desktop?: boolean; tablet?: boolean; mobile?: boolean }
            const starts = conditions.desktop ? [
              { rotation: -11.5, x: 86, y: 50, scale: .94, z: -46 },
              { rotation: 0, x: 0, y: -30, scale: 1.055, z: 64 },
              { rotation: 11.5, x: -86, y: 50, scale: .94, z: -46 }
            ] : conditions.tablet ? [
              { rotation: -4.25, x: -10, y: 24, scale: .985, z: 0 },
              { rotation: 1.2, x: 8, y: 12, scale: 1.01, z: 12 },
              { rotation: 4.25, x: 10, y: 24, scale: .985, z: 0 }
            ] : [
              { rotation: -2.7, x: -5, y: 16, scale: .992, z: 0 },
              { rotation: .8, x: 4, y: 10, scale: 1.006, z: 8 },
              { rotation: 2.7, x: 5, y: 16, scale: .992, z: 0 }
            ]

            cards.forEach((card, index) => {
              const pose = starts[index] || starts[1]
              gsap.set(card, {
                ...pose,
                zIndex: index === 1 ? 3 : 1,
                transformOrigin: '50% 100%',
                transformPerspective: 1600,
                force3D: true
              })
            })

            const tl = gsap.timeline({ paused: true, defaults: { ease: 'none' } })
            // A short scrubbed hold makes the fan clearly visible before straightening begins.
            tl.to({}, { duration: .22 })
            cards.forEach((card, index) => {
              tl.to(card, {
                rotation: 0,
                x: 0,
                y: 0,
                z: 0,
                scale: 1,
                duration: .78,
                ease: 'power2.out'
              }, .22 + index * .025)
            })

            const trigger = ScrollTrigger.create({
              animation: tl,
              trigger: grid,
              start: conditions.desktop ? 'top 92%' : 'top 94%',
              end: conditions.desktop ? 'top 40%' : 'top 48%',
              scrub: conditions.mobile ? .42 : .62,
              invalidateOnRefresh: true,
              fastScrollEnd: true
            })

            return () => {
              trigger.kill(true)
              tl.kill()
              gsap.set(cards, { clearProps: 'transform,zIndex' })
            }
          })
          cleanups.push(() => pricingMM.revert())
        }
      }

      // Patient Acquisition integrations: one real circular backbone with icons sitting directly on it.
      // The ring rotates as a single system and each badge counter-rotates so labels stay upright.
      const patientArc = root.querySelector<HTMLElement>('[data-rs-patient-arc]')
      if (patientArc) {
        const ring = patientArc.querySelector<HTMLElement>('[data-rs-patient-arc-ring]')
        const items = Array.from(patientArc.querySelectorAll<HTMLElement>('[data-rs-patient-arc-item]'))
        if (ring && items.length) {
          gsap.fromTo(items, { autoAlpha: 0, scale: .55 }, { autoAlpha: 1, scale: 1, duration: .62, stagger: .075, ease: 'back.out(1.55)', scrollTrigger: { trigger: patientArc, start: 'top 76%', once: true } })
          const orbitDuration = compact ? 72 : 52
          const ringTween = gsap.to(ring, { rotation: 360, duration: orbitDuration, repeat: -1, ease: 'none', transformOrigin: '50% 50%' })
          const counterTweens = items.map((item) => gsap.to(item, { rotation: -360, duration: orbitDuration, repeat: -1, ease: 'none', transformOrigin: '50% 50%' }))
          cleanups.push(() => { ringTween.kill(); counterTweens.forEach((tw) => tw.kill()) })
        }
      }

      const patientTouchpointStage = root.querySelector<HTMLElement>('[data-rs-patient-arc-stage]')
      if (patientTouchpointStage) {
        const glassCards = Array.from(patientTouchpointStage.querySelectorAll<HTMLElement>('.pa-touchpoints__glass'))
        const copy = patientTouchpointStage.querySelector<HTMLElement>('.pa-touchpoints__copy')
        if (copy) {
          const copyReveal = gsap.fromTo(copy, { y: 26, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: .7, ease: 'power3.out', scrollTrigger: { trigger: patientTouchpointStage, start: 'top 82%', once: true } })
          cleanups.push(() => copyReveal.kill())
        }
        glassCards.forEach((glass, index) => {
          const float = gsap.to(glass, { y: index ? -10 : 10, rotation: index ? 27 : -27, duration: 3.4 + index * .3, repeat: -1, yoyo: true, ease: 'sine.inOut' })
          cleanups.push(() => float.kill())
        })
      }

      const patientFaqItems = Array.from(root.querySelectorAll<HTMLElement>('[data-rs-patient-faq-item]'))
      if (patientFaqItems.length) {
        const faqReveal = gsap.fromTo(patientFaqItems,
          { y: 18, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: .5, stagger: .07, ease: 'power3.out', scrollTrigger: { trigger: patientFaqItems[0].parentElement || patientFaqItems[0], start: 'top 86%', once: true } }
        )
        cleanups.push(() => faqReveal.kill())
      }


      // Patient Acquisition process: use the homepage Process / How We Work *loaded* state immediately.
      // No pin, no sequential opacity gate, and no extra scroll required. Hover choreography is shared verbatim.
      const patientHomeProcess = root.querySelector<HTMLElement>('[data-rs-patient-home-process]')
      if (patientHomeProcess) {
        const cards = Array.from(patientHomeProcess.querySelectorAll<HTMLElement>('[data-rs-patient-home-process-card]'))
        const revealEls = Array.from(patientHomeProcess.querySelectorAll<HTMLElement>('.af-reveal'))
        const hub = patientHomeProcess.querySelector<HTMLElement>('.af-proc__hub')
        const hubGlow = patientHomeProcess.querySelector<HTMLElement>('.af-proc__hub-glow')

        if (cards.length) {
          gsap.set(cards, { autoAlpha: 1, x: 0, y: 0, scale: 1 })
          cleanups.push(setupProcessCardHover(cards))
        }
        if (revealEls.length) gsap.set(revealEls, { autoAlpha: 1, x: 0, y: 0, scale: 1 })
        if (hub) gsap.set(hub, { autoAlpha: 1, x: 0, y: 0, scale: 1 })

        // Same slow breathing treatment used by the homepage hub glow.
        if (hubGlow) {
          const glowTween = gsap.to(hubGlow, {
            scale: 1.14,
            opacity: .78,
            duration: 4.5,
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true
          })
          cleanups.push(() => glowTween.kill())
        }
      }

      // Large image theater: clip-open, depth drift and hotspot staging.
      root.querySelectorAll<HTMLElement>('[data-rs-theater]').forEach((stage) => {
        const image = stage.querySelector('img')
        const hotspots = stage.querySelectorAll<HTMLElement>('[data-rs-hotspot]')
        if (image) gsap.fromTo(image, { clipPath: 'inset(14% 8% 12% 8% round 34px)', scale: 1.06, opacity: .45 }, { clipPath: 'inset(0% 0% 0% 0% round 34px)', scale: 1, opacity: 1, duration: 1.1, ease: 'power4.out', scrollTrigger: { trigger: stage, start: 'top 84%', once: true } })
        gsap.fromTo(hotspots, { opacity: 0, scale: .65, y: 22 }, { opacity: 1, scale: 1, y: 0, duration: .52, stagger: .08, ease: 'back.out(1.55)', scrollTrigger: { trigger: stage, start: 'top 78%', once: true } })
        if (!compact && image) gsap.to(image, { yPercent: -4, ease: 'none', scrollTrigger: { trigger: stage, start: 'top bottom', end: 'bottom top', scrub: .7 } })
      })

      // Digital Presence integration sequence: text first, then orb + icons settle into orbit as the section is scrubbed.
      const integrationSequence = root.querySelector<HTMLElement>('[data-rs-integration-sequence]')
      if (integrationSequence) {
        const pin = integrationSequence.querySelector<HTMLElement>('[data-rs-integration-pin]')
        const intro = integrationSequence.querySelector<HTMLElement>('[data-rs-integration-intro]')
        const stage = integrationSequence.querySelector<HTMLElement>('[data-rs-integration-stage]')
        const hub = integrationSequence.querySelector<HTMLElement>('[data-rs-integration-hub]')
        const path = integrationSequence.querySelector<SVGElement>('[data-rs-integration-path]')
        const items = Array.from(integrationSequence.querySelectorAll<HTMLElement>('[data-rs-integration-item]'))
        if (pin && intro && stage && hub && items.length) {
          const getRadius = () => {
            const rect = stage.getBoundingClientRect()
            const mobile = rect.width < 640
            const radius = Math.min(rect.width, rect.height) * (mobile ? .34 : .38)
            return {
              rx: Math.min(radius, mobile ? 142 : 258),
              ry: Math.min(radius, mobile ? 142 : 258)
            }
          }
          const angleFor = (index: number) => -Math.PI / 2 + (Math.PI * 2 * index) / items.length

          gsap.set(intro, { autoAlpha: 1, y: 0, scale: 1 })
          gsap.set(stage, { autoAlpha: 0 })
          gsap.set(hub, { autoAlpha: 0, scale: .58 })
          if (path) gsap.set(path, { autoAlpha: 0, scale: .88, transformOrigin: '50% 50%' })
          items.forEach((item, index) => {
            const angle = angleFor(index)
            const { rx, ry } = getRadius()
            const sx = Math.cos(angle) * rx * .2 + (index % 2 ? 34 : -34)
            const sy = Math.sin(angle) * ry * .16 + (index % 3 - 1) * 24
            gsap.set(item, { x: sx, y: sy, autoAlpha: 0, scale: .38, rotation: index % 2 ? 12 : -12 })
          })

          const tl = gsap.timeline({ paused: true, defaults: { ease: 'none' } })
            .fromTo(intro, { autoAlpha: 0, y: 26, scale: .985 }, { autoAlpha: 1, y: 0, scale: 1, duration: .55, ease: 'power3.out' })
            .to({}, { duration: .72 })
            .to(intro, { autoAlpha: 0, y: -26, scale: .96, duration: .48, ease: 'power2.inOut' })
            .to(stage, { autoAlpha: 1, duration: .16 }, '-=.08')
            .to(hub, { autoAlpha: 1, scale: 1, duration: .66, ease: 'back.out(1.35)' }, '<')
          if (path) tl.to(path, { autoAlpha: .42, scale: 1, duration: .52, ease: 'power2.out' }, '-=.48')
          tl.to(items, {
            x: (index: number) => { const { rx } = getRadius(); return Math.cos(angleFor(index)) * rx },
            y: (index: number) => { const { ry } = getRadius(); return Math.sin(angleFor(index)) * ry },
            autoAlpha: 1,
            scale: 1,
            rotation: 0,
            duration: .62,
            stagger: .095,
            ease: 'back.out(1.45)'
          }, '-=.18')
          .to({}, { duration: .7 })

          const distance = () => Math.round(Math.max(window.innerHeight, 680) * (compact ? 2.55 : 2.2))
          const trigger = ScrollTrigger.create({
            animation: tl,
            trigger: integrationSequence,
            start: () => `top top+=${compact ? 52 : 68}`,
            end: () => `+=${distance()}`,
            pin,
            pinSpacing: true,
            scrub: .58,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onRefresh: () => {
              if (tl.progress() > .58) {
                items.forEach((item, index) => {
                  const { rx, ry } = getRadius()
                  gsap.set(item, { x: Math.cos(angleFor(index)) * rx, y: Math.sin(angleFor(index)) * ry })
                })
              }
            }
          })
          cleanups.push(() => { trigger.kill(true); tl.kill() })

          items.forEach((item, index) => {
            const bubble = item.querySelector<HTMLElement>('i')
            if (bubble) gsap.to(bubble, { scale: 1.055, boxShadow: index % 2 ? '0 0 28px rgba(255,150,13,.16)' : '0 0 28px rgba(0,187,160,.20)', duration: 2.2 + index * .11, repeat: -1, yoyo: true, ease: 'sine.inOut' })
          })
        }
      }

      // Integration arc draws as icons pop and then gently orbit/fall.
      root.querySelectorAll<HTMLElement>('[data-rs-integration-orbit]:not([data-rs-sequenced-orbit])').forEach((orbit) => {
        const path = orbit.querySelector<SVGPathElement>('[data-rs-integration-path]')
        const items = Array.from(orbit.querySelectorAll<HTMLElement>('[data-rs-integration-item]'))
        if (path) {
          const len = path.getTotalLength?.() || 1400
          gsap.set(path, { strokeDasharray: len, strokeDashoffset: len })
          gsap.to(path, { strokeDashoffset: 0, duration: 1.35, ease: 'power2.out', scrollTrigger: { trigger: orbit, start: 'top 83%', once: true } })
        }
        gsap.fromTo(items, { opacity: 0, scale: .58, y: 36 }, { opacity: 1, scale: 1, y: 0, duration: .58, stagger: .06, ease: 'back.out(1.45)', scrollTrigger: { trigger: orbit, start: 'top 82%', once: true } })
        if (!compact) items.forEach((item, i) => gsap.to(item, { y: i % 2 ? -8 : 8, x: i % 3 ? 3 : -3, duration: 2.5 + i * .12, repeat: -1, yoyo: true, ease: 'sine.inOut' }))
        if (!compact && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
          items.forEach((item) => {
            const bubble = item.querySelector<HTMLElement>('i')
            const enter = () => { gsap.to(item, { scale: 1.08, duration: .28, ease: 'power2.out' }); if (bubble) gsap.to(bubble, { rotation: 10, boxShadow: '0 0 34px rgba(0,187,160,.24)', duration: .3 }) }
            const leave = () => { gsap.to(item, { scale: 1, duration: .36, ease: 'power3.out' }); if (bubble) gsap.to(bubble, { rotation: 0, duration: .36, clearProps: 'boxShadow' }) }
            item.addEventListener('pointerenter', enter); item.addEventListener('pointerleave', leave)
            cleanups.push(() => { item.removeEventListener('pointerenter', enter); item.removeEventListener('pointerleave', leave) })
          })
        }
      })

      // Process line / nodes.
      root.querySelectorAll<HTMLElement>('[data-rs-process-track]').forEach((track) => {
        const line = track.querySelector<HTMLElement>('[data-rs-process-line]')
        const cards = track.querySelectorAll<HTMLElement>('[data-rs-process-card]')
        if (line) gsap.fromTo(line, { scaleX: 0, transformOrigin: 'left center' }, { scaleX: 1, duration: 1.2, ease: 'power2.out', scrollTrigger: { trigger: track, start: 'top 82%', once: true } })
        gsap.fromTo(cards, { y: 38, opacity: 0, scale: .97 }, { y: 0, opacity: 1, scale: 1, duration: .66, stagger: .1, ease: 'power3.out', scrollTrigger: { trigger: track, start: 'top 84%', once: true } })
      })

      // Strategy S-curve path and nodes.
      const roadmap = root.querySelector<HTMLElement>('[data-rs-roadmap]')
      if (roadmap) {
        const path = roadmap.querySelector<SVGPathElement>('[data-rs-roadmap-path]')
        const nodes = roadmap.querySelectorAll<HTMLElement>('[data-rs-roadmap-node]')
        if (path) {
          const len = path.getTotalLength?.() || 1800
          gsap.set(path, { strokeDasharray: len, strokeDashoffset: len })
          gsap.to(path, { strokeDashoffset: 0, duration: 1.6, ease: 'none', scrollTrigger: { trigger: roadmap, start: 'top 80%', end: 'bottom 62%', scrub: .65 } })
        }
        gsap.fromTo(nodes, { opacity: 0, scale: .72 }, { opacity: 1, scale: 1, duration: .52, stagger: .16, ease: 'back.out(1.45)', scrollTrigger: { trigger: roadmap, start: 'top 78%', once: true } })
      }

      // Patient simulator: conversational reveal.
      const simulator = root.querySelector<HTMLElement>('[data-rs-simulator-box]')
      if (simulator) {
        const left = simulator.querySelector('aside')
        const chat = simulator.querySelector('.rs-simulator__chat')
        const messages = simulator.querySelectorAll('.rs-simulator__messages p')
        const cards = simulator.querySelectorAll('.rs-simulator__cards article')
        const tl = gsap.timeline({ scrollTrigger: { trigger: simulator, start: 'top 80%', once: true } })
        if (left) tl.fromTo(left, { x: -30, opacity: 0 }, { x: 0, opacity: 1, duration: .55, ease: 'power3.out' })
        if (chat) tl.fromTo(chat, { y: 28, opacity: 0, scale: .975 }, { y: 0, opacity: 1, scale: 1, duration: .65, ease: 'power3.out' }, '-=.28')
        tl.fromTo(messages, { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: .45, stagger: .18, ease: 'power3.out' }, '-=.22')
          .fromTo(cards, { y: 26, opacity: 0 }, { y: 0, opacity: 1, duration: .48, stagger: .1, ease: 'power3.out' }, '-=.15')
      }

      // Website modules move in alternating directions.
      root.querySelectorAll<HTMLElement>('[data-rs-module]').forEach((module, index) => {
        gsap.fromTo(module, compact ? { y: 28, opacity: 0 } : { x: index % 2 ? 70 : -70, opacity: 0, rotateY: index % 2 ? -4 : 4 }, { x: 0, y: 0, rotateY: 0, opacity: 1, duration: .86, ease: 'power3.out', scrollTrigger: { trigger: module, start: 'top 86%', once: true } })
      })

      // Web Development / Home-05 hero: one scrubbed transform resolves the mockup completely from perspective to flat.
      const webHero = root.querySelector<HTMLElement>('[data-rs-web-hero]')
      if (webHero) {
        const mockup = webHero.querySelector<HTMLElement>('[data-rs-web-hero-mockup]')
        const anchors = Array.from(webHero.querySelectorAll<HTMLElement>('.web-hero__anchor'))
        const trust = webHero.querySelector<HTMLElement>('[data-rs-hero-trust]')
        if (mockup) {
          const initial = compact
            ? { rotationX: 12.5, rotationY: -1.1, rotationZ: -.32, scale: .95, y: 26 }
            : { rotationX: 19.5, rotationY: -1.5, rotationZ: -.42, scale: .938, y: 34 }
          gsap.set(mockup, { transformPerspective: compact ? 1700 : 2200, transformOrigin: '50% 100%', force3D: true })
          const settleTween = gsap.fromTo(mockup, initial, {
            rotationX: 0, rotationY: 0, rotationZ: 0, scale: 1, y: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: webHero,
              start: 'top top',
              end: compact ? '+=220' : '+=360',
              scrub: compact ? .2 : .28,
              invalidateOnRefresh: true,
              fastScrollEnd: true
            }
          })
          cleanups.push(() => settleTween.kill())

          if (anchors.length) {
            const anchorTween = gsap.fromTo(anchors,
              { scale: .72, autoAlpha: .7 },
              { scale: 1, autoAlpha: 1, ease: 'none', scrollTrigger: { trigger: webHero, start: 'top top', end: compact ? '+=210' : '+=360', scrub: .28, invalidateOnRefresh: true } }
            )
            cleanups.push(() => anchorTween.kill())
          }
          if (trust) {
            const trustTween = gsap.fromTo(trust,
              { y: 20, autoAlpha: .72 },
              { y: 0, autoAlpha: 1, ease: 'none', scrollTrigger: { trigger: webHero, start: compact ? 'top+=90 top' : 'top+=190 top', end: compact ? '+=120' : '+=170', scrub: .22, invalidateOnRefresh: true } }
            )
            cleanups.push(() => trustTween.kill())

            const trustTrack = trust.querySelector<HTMLElement>('div')
            if (trustTrack) {
              const trackTween = gsap.to(trustTrack, {
                xPercent: -4.5,
                duration: 4.6,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut'
              })
              cleanups.push(() => trackTween.kill())
            }
          }

          const framePanels = Array.from(webHero.querySelectorAll<HTMLElement>('.web-hero__copy-panel'))
          framePanels.forEach((panel, index) => {
            const tw = gsap.to(panel, {
              autoAlpha: .94,
              y: index % 2 ? -2 : 2,
              duration: 2.2 + index * .18,
              repeat: -1,
              yoyo: true,
              ease: 'sine.inOut'
            })
            cleanups.push(() => tw.kill())
          })

          const dots = Array.from(webHero.querySelectorAll<HTMLElement>('.web-hero__copy-dot'))
          dots.forEach((node, index) => {
            const tw = gsap.to(node, {
              scale: 1.28,
              autoAlpha: 1,
              duration: 1.2 + index * .08,
              repeat: -1,
              yoyo: true,
              ease: 'sine.inOut',
              transformOrigin: '50% 50%'
            })
            cleanups.push(() => tw.kill())
          })

          const sparkles = Array.from(webHero.querySelectorAll<HTMLElement>('.web-hero__copy-spark'))
          sparkles.forEach((node, index) => {
            const tl = gsap.timeline({ repeat: -1, repeatDelay: .18 + index * .14, delay: index * .18 })
            tl.fromTo(node,
              { autoAlpha: .14, scale: .52, x: 0, y: 0 },
              { autoAlpha: 1, scale: 1.45, x: index % 2 ? -2 : 2, y: -2, duration: .5, ease: 'power2.out' }
            ).to(node, {
              autoAlpha: .22, scale: .72, x: index % 2 ? 2 : -2, y: 2, duration: .72, ease: 'sine.inOut'
            })
            cleanups.push(() => tl.kill())
          })

          const titleIcons = Array.from(webHero.querySelectorAll<HTMLElement>('.web-hero__title-icons i'))
          titleIcons.forEach((icon, index) => {
            const pulse = gsap.to(icon, {
              y: index ? 2 : -2,
              scale: index ? 1.03 : 1.07,
              boxShadow: index
                ? '0 0 0 1px rgba(0,187,160,.32), 0 0 24px rgba(0,187,160,.18)'
                : '0 0 0 1px rgba(255,150,13,.34), 0 0 24px rgba(255,150,13,.18)',
              duration: 1.5 + index * .18,
              repeat: -1,
              yoyo: true,
              ease: 'sine.inOut'
            })
            cleanups.push(() => pulse.kill())
          })
        }
      }

      // Website Development / Website System V44: CSS sticky stage + one scrubbed timeline.
      // The outer track owns scroll distance; the deck itself stays sticky in the viewport.
      // This avoids ScrollTrigger pin drift and release jumps while preserving reversible scroll.
      const webStackCards = Array.from(root.querySelectorAll<HTMLElement>('[data-rs-web-stack-card]'))
      if (webStackCards.length) {
        const webStack = webStackCards[0].parentElement as HTMLElement | null
        const webTrack = webStack?.closest<HTMLElement>('[data-rs-web-stack-track]') ?? null

        webStackCards.forEach((card, index) => gsap.set(card, {
          zIndex: index + 1,
          force3D: true,
          transformOrigin: '50% 0%',
          backfaceVisibility: 'hidden',
          autoAlpha: 1
        }))

        if (compact || !webStack || !webTrack) {
          const arrival = gsap.fromTo(webStackCards,
            { y: 22, autoAlpha: .82, scale: .992 },
            { y: 0, autoAlpha: 1, scale: 1, duration: .6, stagger: .08, ease: 'power3.out', scrollTrigger: { trigger: webStack || webStackCards[0], start: 'top 88%', once: true } }
          )
          cleanups.push(() => arrival.kill())
        } else {
          gsap.set(webStackCards[0], { yPercent: 0, y: 0, scale: 1, rotation: 0 })
          webStackCards.slice(1).forEach((card, index) => gsap.set(card, {
            yPercent: 110 + index * 3,
            y: 0,
            scale: .988,
            rotation: index % 2 ? .14 : -.14
          }))

          const stackTimeline = gsap.timeline({
            defaults: { ease: 'none' },
            scrollTrigger: {
              trigger: webTrack,
              start: 'top 96px',
              end: 'bottom bottom',
              scrub: .62,
              invalidateOnRefresh: true,
              fastScrollEnd: true
            }
          })

          const arrivals = [0.15, 1.15, 2.15]
          webStackCards.slice(1).forEach((card, localIndex) => {
            const index = localIndex + 1
            const at = arrivals[localIndex] ?? (localIndex + .15)
            stackTimeline.to(card, { yPercent: 0, y: 0, scale: 1, rotation: 0, duration: .72 }, at)
            webStackCards.slice(0, index).forEach((previous, previousIndex) => {
              const depth = index - previousIndex
              stackTimeline.to(previous, {
                y: -Math.min(15, depth * 5),
                scale: 1 - Math.min(.022, depth * .006),
                autoAlpha: 1,
                duration: .64
              }, at + .06)
            })
          })
          // Explicit tail creates a short settled hold with card 04 fully over card 03.
          stackTimeline.to({}, { duration: .85 }, 3.1)

          cleanups.push(() => {
            stackTimeline.scrollTrigger?.kill(true)
            stackTimeline.kill()
          })
        }
      }

      const webTemplates = Array.from(root.querySelectorAll<HTMLElement>('[data-rs-web-template]'))
      if (webTemplates.length) {
        gsap.fromTo(webTemplates, { y: 34, autoAlpha: 0, scale: .975 }, { y: 0, autoAlpha: 1, scale: 1, duration: .65, stagger: .08, ease: 'power3.out', scrollTrigger: { trigger: webTemplates[0].parentElement || webTemplates[0], start: 'top 86%', once: true } })
      }

      // Web Development How It Works: reference-style dome with a continuously travelling light band.
      const webHow = root.querySelector<HTMLElement>('[data-rs-web-how]')
      if (webHow) {
        const dome = webHow.querySelector<HTMLElement>('[data-rs-web-how-dome]')
        const cards = Array.from(webHow.querySelectorAll<HTMLElement>('[data-rs-web-how-card]'))
        if (dome) {
          const sweep = dome.querySelector<HTMLElement>('i')
          const pulse = gsap.to(dome, { scale: 1.012, opacity: .97, duration: 3.2, repeat: -1, yoyo: true, ease: 'sine.inOut', transformOrigin: '50% 100%', paused: true })
          let sweepTween: gsap.core.Tween | null = null
          if (sweep) {
            gsap.set(sweep, { transformOrigin: '50% 100%', rotation: -118, force3D: true })
            sweepTween = gsap.to(sweep, { rotation: 246, duration: 4.9, repeat: -1, ease: 'none', paused: true })
          }
          const motionTrigger = ScrollTrigger.create({
            trigger: webHow,
            start: 'top bottom',
            end: 'bottom top',
            onToggle: (self) => {
              if (self.isActive) { pulse.play(); sweepTween?.play() }
              else { pulse.pause(); sweepTween?.pause() }
            }
          })
          if (motionTrigger.isActive) { pulse.play(); sweepTween?.play() }
          cleanups.push(() => { motionTrigger.kill(); pulse.kill(); sweepTween?.kill() })
        }
        if (cards.length) {
          const setActive = (activeIndex: number) => {
            cards.forEach((card, index) => {
              const active = index === activeIndex
              card.classList.toggle('is-active', active)
              gsap.to(card, {
                y: active ? -8 : 0,
                scale: active ? 1.018 : 1,
                borderColor: active ? 'rgba(0,187,160,.62)' : 'rgba(222,241,240,.10)',
                boxShadow: active ? '0 0 0 1px rgba(0,187,160,.18),0 0 34px rgba(0,187,160,.16),0 22px 60px rgba(0,0,0,.30)' : '0 20px 50px rgba(0,0,0,.18)',
                duration: .34,
                ease: 'power2.out',
                overwrite: 'auto'
              })
            })
          }
          setActive(Math.min(1, cards.length - 1))
          const trigger = ScrollTrigger.create({
            trigger: webHow,
            start: 'top 70%',
            end: 'bottom 35%',
            onUpdate: (self) => setActive(Math.min(cards.length - 1, Math.floor(self.progress * cards.length)))
          })
          cleanups.push(() => trigger.kill())
          if (!compact && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
            cards.forEach((card, index) => {
              const enter = () => setActive(index)
              card.addEventListener('pointerenter', enter)
              cleanups.push(() => card.removeEventListener('pointerenter', enter))
            })
          }
        }
      }

      const webCurrent = root.querySelector<HTMLElement>('[data-rs-web-current]')
      if (webCurrent) {
        const cards = Array.from(webCurrent.querySelectorAll<HTMLElement>('[data-rs-web-price-card]'))
        if (cards.length) {
          const tl = gsap.timeline({ scrollTrigger: { trigger: cards[0].parentElement || webCurrent, start: 'top 84%', once: true } })
          tl.fromTo(cards, { y: 34, autoAlpha: 0, scale: .975 }, { y: 0, autoAlpha: 1, scale: 1, duration: .62, stagger: .09, ease: 'power3.out' })
          cleanups.push(() => tl.kill())
          if (!compact && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
            cards.forEach((card) => {
              const enter = () => gsap.to(card, { y: -10, scale: 1.016, duration: .32, ease: 'power2.out', overwrite: 'auto' })
              const leave = () => gsap.to(card, { y: 0, scale: 1, duration: .38, ease: 'power3.out', overwrite: 'auto' })
              card.addEventListener('pointerenter', enter)
              card.addEventListener('pointerleave', leave)
              cleanups.push(() => { card.removeEventListener('pointerenter', enter); card.removeEventListener('pointerleave', leave) })
            })
          }
        }
      }

      // Trust & Proof: compact 3+2 cards with restrained vertical edge-light segments.
      const webProofCards = Array.from(root.querySelectorAll<HTMLElement>('[data-rs-web-proof-card]'))
      if (webProofCards.length) {
        const reveal = gsap.fromTo(webProofCards,
          { y: 30, autoAlpha: 0, scale: .987 },
          { y: 0, autoAlpha: 1, scale: 1, duration: .62, stagger: .075, ease: 'power3.out', scrollTrigger: { trigger: webProofCards[0].parentElement || webProofCards[0], start: 'top 87%', once: true } }
        )
        cleanups.push(() => reveal.kill())

        webProofCards.forEach((card, index) => {
          const lights = Array.from(card.querySelectorAll<HTMLElement>('[data-rs-web-proof-edge]'))
          lights.forEach((light, lightIndex) => {
            const travel = gsap.fromTo(light,
              { y: -34, autoAlpha: 0 },
              {
                y: () => card.clientHeight + 34,
                autoAlpha: .82,
                duration: 3.35 + index * .12 + lightIndex * .3,
                delay: index * .16 + lightIndex * 1.25,
                repeat: -1,
                repeatDelay: .28,
                repeatRefresh: true,
                ease: 'none'
              }
            )
            cleanups.push(() => travel.kill())
          })
        })
      }


      // Home-06 Growth System: coordinated 2-1-2 reveal rhythm closer to the requested reference cards.
      const socialGrowthGrid = root.querySelector<HTMLElement>('[data-rs-social-growth-grid]')
      const socialGrowthCards = Array.from(root.querySelectorAll<HTMLElement>('[data-rs-social-growth-card]'))
      if (socialGrowthGrid && socialGrowthCards.length) {
        const [firstCard, secondCard, thirdCard, fourthCard, fifthCard] = socialGrowthCards
        const reveal = gsap.timeline({
          scrollTrigger: { trigger: socialGrowthGrid, start: compact ? 'top 90%' : 'top 84%', once: true },
          defaults: { ease: 'power3.out' }
        })

        if (firstCard && secondCard) {
          reveal.fromTo([firstCard, secondCard],
            compact ? { y: 24, autoAlpha: 0, scale: .988 } : { y: 36, autoAlpha: 0, scale: .974 },
            { y: 0, autoAlpha: 1, scale: 1, duration: .66, stagger: .08 }, 0)
        }
        if (thirdCard) {
          reveal.fromTo(thirdCard,
            compact ? { y: 28, autoAlpha: 0, scale: .988 } : { y: 42, autoAlpha: 0, scale: .972 },
            { y: 0, autoAlpha: 1, scale: 1, duration: .74 }, .18)
        }
        if (fourthCard && fifthCard) {
          reveal.fromTo([fourthCard, fifthCard],
            compact ? { y: 24, autoAlpha: 0, scale: .988 } : { y: 34, autoAlpha: 0, scale: .976 },
            { y: 0, autoAlpha: 1, scale: 1, duration: .64, stagger: .08 }, .34)
        }

        socialGrowthCards.forEach((card, index) => {
          const visual = card.querySelector<HTMLElement>('[data-rs-social-growth-visual]')
          if (visual) reveal.fromTo(visual, { y: 18, autoAlpha: 0, scale: .985 }, { y: 0, autoAlpha: 1, scale: 1, duration: .52 }, index < 2 ? .14 + index * .06 : index === 2 ? .3 : .46 + (index - 3) * .06)

          if (index === 0) {
            const items = Array.from(card.querySelectorAll<HTMLElement>('.social-timeline__item'))
            if (items.length) reveal.fromTo(items, { x: -18, autoAlpha: 0, scale: .98 }, { x: 0, autoAlpha: 1, scale: 1, duration: .42, stagger: .07 }, .26)
          } else if (index === 1) {
            const items = Array.from(card.querySelectorAll<HTMLElement>('.social-workflow__item'))
            const secure = card.querySelector<HTMLElement>('.social-workflow__secure')
            if (items.length) reveal.fromTo(items, { x: 18, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: .4, stagger: .07 }, .28)
            if (secure) reveal.fromTo(secure, { y: 18, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: .45 }, .42)
          } else if (index === 2) {
            const bars = Array.from(card.querySelectorAll<HTMLElement>('.social-live-chat__bars b'))
            const codeLines = Array.from(card.querySelectorAll<HTMLElement>('.social-live-chat__code span'))
            if (bars.length) reveal.fromTo(bars, { scaleY: .18, autoAlpha: .3, transformOrigin: '50% 100%' }, { scaleY: 1, autoAlpha: 1, duration: .44, stagger: .05, ease: 'back.out(1.2)' }, .3)
            if (codeLines.length) reveal.fromTo(codeLines, { x: 14, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: .34, stagger: .04 }, .36)
          } else if (index === 3) {
            const fan = Array.from(card.querySelectorAll<HTMLElement>('.social-ticket-fan i'))
            const panel = card.querySelector<HTMLElement>('.social-ticket-panel')
            if (fan.length) reveal.fromTo(fan, { y: -18, rotate: 0, autoAlpha: 0 }, { y: 0, rotate: (i: number) => (i - 1.5) * 7, autoAlpha: 1, duration: .42, stagger: .05 }, .48)
            if (panel) reveal.fromTo(panel, { y: 18, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: .44 }, .54)
          } else if (index === 4) {
            const globe = card.querySelector<HTMLElement>('.social-collab__globe')
            const nodes = Array.from(card.querySelectorAll<HTMLElement>('.social-collab__node'))
            if (globe) reveal.fromTo(globe, { scale: .72, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: .5, ease: 'back.out(1.45)' }, .52)
            if (nodes.length) reveal.fromTo(nodes, { scale: .6, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: .4, stagger: .06, ease: 'back.out(1.35)' }, .58)
          }

          if (visual) {
            const hoverFloat = gsap.to(visual, { y: index % 2 ? -5 : 5, duration: 2.8 + index * .18, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: .8 + index * .08 })
            cleanups.push(() => hoverFloat.kill())
          }

          if (!compact && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
            const enter = () => gsap.to(card, { y: -7, scale: 1.008, boxShadow: index === 2 ? '0 30px 88px rgba(0,0,0,.42), 0 0 42px rgba(255,150,13,.12)' : '0 26px 74px rgba(0,0,0,.36), 0 0 30px rgba(255,150,13,.10)', duration: .28, ease: 'power3.out', overwrite: 'auto' })
            const leave = () => gsap.to(card, { y: 0, scale: 1, boxShadow: '', duration: .3, ease: 'power3.out', overwrite: 'auto' })
            card.addEventListener('pointerenter', enter)
            card.addEventListener('pointerleave', leave)
            cleanups.push(() => { card.removeEventListener('pointerenter', enter); card.removeEventListener('pointerleave', leave) })
          }
        })

        cleanups.push(() => reveal.kill())
      }

      // Home-06 connected touchpoints: rotating half-dome with moving light sector and continuously orbiting app icons.

      const socialOrbitStage = root.querySelector<HTMLElement>('[data-rs-social-orbit-stage]')
      if (socialOrbitStage) {
        const orbitRing = socialOrbitStage.querySelector<HTMLElement>('[data-rs-social-orbit-ring]')
        const arcLight = socialOrbitStage.querySelector<HTMLElement>('[data-rs-social-orbit-glow]')
        const arcLightSoft = socialOrbitStage.querySelector<HTMLElement>('[data-rs-social-orbit-glow-soft]')
        const sector = socialOrbitStage.querySelector<HTMLElement>('[data-rs-social-orbit-sector]')
        const orbitItems = Array.from(socialOrbitStage.querySelectorAll<HTMLElement>('[data-rs-social-orbit-item]'))
        const orbitItemIcons = Array.from(socialOrbitStage.querySelectorAll<HTMLElement>('[data-rs-social-orbit-item-icon]'))

        const entry = gsap.timeline({ scrollTrigger: { trigger: socialOrbitStage, start: 'top 84%', once: true }, defaults: { ease: 'power3.out' } })
        if (orbitRing) entry.fromTo(orbitRing, { autoAlpha: 0, y: 22, scale: .96 }, { autoAlpha: 1, y: 0, scale: 1, duration: .78 }, 0)
        if (orbitItems.length) entry.fromTo(orbitItems, { autoAlpha: 0, scale: .62 }, { autoAlpha: 1, scale: 1, duration: .48, stagger: .03, ease: 'back.out(1.42)' }, .16)
        cleanups.push(() => entry.kill())

        if (orbitRing) {
          gsap.set(orbitRing, { transformOrigin: '50% 50%', rotation: 0, force3D: true })
          const ringSpin = gsap.to(orbitRing, { rotation: 360, duration: 28, repeat: -1, ease: 'none' })
          cleanups.push(() => ringSpin.kill())
        }

        if (orbitItemIcons.length) {
          orbitItemIcons.forEach((icon) => {
            const counter = gsap.to(icon, { rotation: -360, duration: 28, repeat: -1, ease: 'none' })
            cleanups.push(() => counter.kill())
          })
        }

        if (sector) {
          gsap.set(sector, { transformOrigin: '50% 50%', rotation: -32 })
          const sectorSpin = gsap.to(sector, { rotation: 328, duration: 14, repeat: -1, ease: 'none' })
          cleanups.push(() => sectorSpin.kill())
        }
        if (arcLight) {
          gsap.set(arcLight, { transformOrigin: '50% 50%', rotation: -18 })
          const arcTween = gsap.to(arcLight, { rotation: 342, duration: 7.2, repeat: -1, ease: 'none' })
          cleanups.push(() => arcTween.kill())
        }
        if (arcLightSoft) {
          gsap.set(arcLightSoft, { transformOrigin: '50% 50%', rotation: 14 })
          const softTween = gsap.to(arcLightSoft, { rotation: 374, duration: 11.6, repeat: -1, ease: 'none' })
          cleanups.push(() => softTween.kill())
        }
      }

      // Home-06 communication metrics: right-side glow sits idle, then slides left on hover with a subtle border polish.
      const socialMetricCards = Array.from(root.querySelectorAll<HTMLElement>('[data-rs-social-communication] [data-rs-metric-card]'))
      if (socialMetricCards.length && !compact && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
        socialMetricCards.forEach((card) => {
          const setLineRight = () => gsap.set(card, { '--rs-comm-line-left': `${Math.max(card.clientWidth - 18, 14)}px` } as gsap.TweenVars)
          setLineRight()
          gsap.set(card, { '--rs-comm-glow-shift': '0%', '--rs-comm-line-opacity': .52 } as gsap.TweenVars)
          const enter = () => {
            gsap.to(card, { y: -6, duration: .28, ease: 'power3.out', overwrite: 'auto' })
            gsap.to(card, { '--rs-comm-glow-shift': '-78%', '--rs-comm-line-left': '14px', '--rs-comm-line-opacity': .92, duration: .5, ease: 'power3.out', overwrite: 'auto' } as gsap.TweenVars)
          }
          const leave = () => {
            gsap.to(card, { y: 0, duration: .3, ease: 'power3.out', overwrite: 'auto' })
            gsap.to(card, { '--rs-comm-glow-shift': '0%', '--rs-comm-line-left': `${Math.max(card.clientWidth - 18, 14)}px`, '--rs-comm-line-opacity': .52, duration: .4, ease: 'power3.out', overwrite: 'auto' } as gsap.TweenVars)
          }
          const onResize = () => setLineRight()
          window.addEventListener('resize', onResize)
          card.addEventListener('pointerenter', enter)
          card.addEventListener('pointerleave', leave)
          cleanups.push(() => {
            window.removeEventListener('resize', onResize)
            card.removeEventListener('pointerenter', enter)
            card.removeEventListener('pointerleave', leave)
          })
        })
      }

      // Home-06 communication orbit: reference-style glowing platform, beam/cylinders and rotating connected icon ring.

      const socialCommsOrbit = root.querySelector<HTMLElement>('[data-rs-social-comms-orbit]')
      if (socialCommsOrbit) {
        const beam = socialCommsOrbit.querySelector<HTMLElement>('[data-rs-social-comms-beam]')
        const cylinders = Array.from(socialCommsOrbit.querySelectorAll<HTMLElement>('[data-rs-social-comms-cylinders] i'))
        const core = socialCommsOrbit.querySelector<HTMLElement>('[data-rs-social-comms-core]')
        const ring = socialCommsOrbit.querySelector<HTMLElement>('[data-rs-social-comms-ring]')
        const nodeIcons = Array.from(socialCommsOrbit.querySelectorAll<HTMLElement>('[data-rs-social-comms-node-icon]'))
        const dashPaths = Array.from(socialCommsOrbit.querySelectorAll<SVGGeometryElement>('[data-rs-social-comms-dash]'))

        const intro = gsap.timeline({ scrollTrigger: { trigger: socialCommsOrbit, start: 'top 86%', once: true }, defaults: { ease: 'power3.out' } })
        intro.fromTo(socialCommsOrbit, { y: 30, autoAlpha: 0, scale: .96 }, { y: 0, autoAlpha: 1, scale: 1, duration: .72 })
        if (core) intro.fromTo(core, { scale: .62 }, { scale: 1, duration: .5, ease: 'back.out(1.55)' }, .18)
        if (cylinders.length) intro.fromTo(cylinders, { y: 18, autoAlpha: 0, scale: .82 }, { y: 0, autoAlpha: 1, scale: 1, duration: .42, stagger: .07 }, .26)
        cleanups.push(() => intro.kill())

        if (core) {
          const corePulse = gsap.to(core, { scale: 1.07, boxShadow: '0 0 0 10px rgba(255,150,13,.06),0 0 48px rgba(255,150,13,.42),0 0 78px rgba(0,187,160,.2)', duration: 1.45, repeat: -1, yoyo: true, ease: 'sine.inOut' })
          cleanups.push(() => corePulse.kill())
        }
        if (beam) {
          const beamPulse = gsap.to(beam, { opacity: .92, scaleY: 1.08, duration: 1.35, repeat: -1, yoyo: true, ease: 'sine.inOut', transformOrigin: '50% 100%' })
          cleanups.push(() => beamPulse.kill())
        }
        if (cylinders.length) {
          cylinders.forEach((cylinder, index) => {
            const float = gsap.to(cylinder, { y: index === 1 ? -6 : -3, opacity: index === 1 ? .95 : .72, duration: 1.6 + index * .22, repeat: -1, yoyo: true, ease: 'sine.inOut' })
            cleanups.push(() => float.kill())
          })
        }
        if (ring) {
          gsap.set(ring, { transformOrigin: '50% 50%', force3D: true })
          const ringTween = gsap.to(ring, { rotation: 360, duration: 24, repeat: -1, ease: 'none' })
          cleanups.push(() => ringTween.kill())
          nodeIcons.forEach((icon) => {
            const counter = gsap.to(icon, { rotation: -360, duration: 24, repeat: -1, ease: 'none' })
            cleanups.push(() => counter.kill())
          })
        }
        dashPaths.forEach((path, index) => {
          gsap.set(path, { strokeDasharray: index === 2 ? '3 7' : '4 8', strokeDashoffset: 0 })
          const dash = gsap.to(path, { strokeDashoffset: -44, duration: 2.6 + index * .35, repeat: -1, ease: 'none' })
          cleanups.push(() => dash.kill())
        })
      }

      // Help-desk-style radar and metrics.
      const radar = root.querySelector<HTMLElement>('[data-rs-radar]')
      if (radar) {
        radar.querySelectorAll<HTMLElement>('i').forEach((ring, i) => gsap.to(ring, { rotation: i % 2 ? -360 : 360, duration: 16 + i * 5, repeat: -1, ease: 'none' }))
        gsap.to(radar.querySelector('b'), { scale: 1.12, boxShadow: '0 0 40px rgba(255,150,13,.35)', duration: 1.5, repeat: -1, yoyo: true, ease: 'sine.inOut' })
      }
      const metricCards = root.querySelectorAll<HTMLElement>('[data-rs-metric-card]')
      if (metricCards.length) gsap.fromTo(metricCards, { y: 34, opacity: 0 }, { y: 0, opacity: 1, duration: .62, stagger: .1, ease: 'power3.out', scrollTrigger: { trigger: metricCards[0], start: 'top 88%', once: true } })

      // Price cards mimic reference hover/perspective while remaining keyboard-safe.
      const priceCards = Array.from(root.querySelectorAll<HTMLElement>('[data-rs-price-card]'))
      if (priceCards.length) {
        gsap.fromTo(priceCards, { y: 46, opacity: 0, rotateX: -3 }, { y: 0, opacity: 1, rotateX: 0, duration: .68, stagger: .09, ease: 'power3.out', scrollTrigger: { trigger: priceCards[0].parentElement || priceCards[0], start: 'top 86%', once: true } })
        if (!compact) {
          priceCards.forEach((card) => {
            const enter = () => gsap.to(card, { y: -10, scale: 1.018, rotateY: 0, duration: .34, ease: 'power2.out' })
            const leave = () => gsap.to(card, { y: 0, scale: 1, rotateY: 0, duration: .42, ease: 'power3.out' })
            card.addEventListener('pointerenter', enter)
            card.addEventListener('pointerleave', leave)
            cleanups.push(() => { card.removeEventListener('pointerenter', enter); card.removeEventListener('pointerleave', leave) })
          })
        }
      }

      const proofCards = root.querySelectorAll<HTMLElement>('[data-rs-proof-card]')
      if (proofCards.length) gsap.fromTo(proofCards, { y: 34, opacity: 0, scale: .98 }, { y: 0, opacity: 1, scale: 1, duration: .58, stagger: .08, ease: 'power3.out', scrollTrigger: { trigger: proofCards[0].parentElement || proofCards[0], start: 'top 88%', once: true } })

      const faqItems = root.querySelectorAll<HTMLElement>('[data-rs-faq-item]')
      if (faqItems.length) gsap.fromTo(faqItems, { x: 26, opacity: 0 }, { x: 0, opacity: 1, duration: .5, stagger: .06, ease: 'power3.out', scrollTrigger: { trigger: faqItems[0].parentElement || faqItems[0], start: 'top 86%', once: true } })

      const final = root.querySelector<HTMLElement>('[data-rs-final]')
      if (final) gsap.fromTo(final, { y: 42, opacity: 0, scale: .98 }, { y: 0, opacity: 1, scale: 1, duration: .82, ease: 'power3.out', scrollTrigger: { trigger: final, start: 'top 88%', once: true } })
    }, root)

    const refresh = window.setTimeout(() => { ScrollTrigger.sort(); ScrollTrigger.refresh() }, 420)
    const onResize = () => window.setTimeout(() => ScrollTrigger.refresh(), 160)
    window.addEventListener('orientationchange', onResize)
    return () => {
      window.clearTimeout(refresh)
      window.removeEventListener('orientationchange', onResize)
      cleanups.forEach((fn) => fn())
      ctx.revert()
    }
  }, [layout])
}
