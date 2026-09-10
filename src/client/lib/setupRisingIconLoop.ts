import gsap from 'gsap'

/**
 * Shared continuous upward icon loop used by the Digital Presence hero
 * and Brand Communication integrations section. Icons rise, fade at the
 * top, wrap to the lower start point and drift gently left/right.
 */
export function setupRisingIconLoop(container: ParentNode, selector = '[data-af-rising-icon]') {
  const icons = Array.from(container.querySelectorAll<HTMLElement>(selector))
  const tweens: Array<{ kill: () => void }> = []

  if (!icons.length) return () => undefined

  gsap.fromTo(
    icons,
    { opacity: 0, scale: .45 },
    { opacity: 1, scale: 1, duration: .72, stagger: .07, ease: 'power3.out', delay: .2 }
  )

  icons.forEach((icon, index) => {
    const start = Number(icon.dataset.riseStart || (108 + index * 52))
    const distance = Number(icon.dataset.riseDistance || (248 + index * 20))
    const duration = Number(icon.dataset.riseDuration || (7.2 - index * .35))
    const drift = Number(icon.dataset.riseDrift || 0)
    const baseOpacity = Number(icon.dataset.riseOpacity || Math.max(.44, 1 - index * .12))
    const startY = -start
    const endY = -(start + distance)
    const wrapY = gsap.utils.wrap(endY, startY)

    gsap.set(icon, { y: startY, x: drift, opacity: baseOpacity })

    const rise = gsap.to(icon, {
      y: endY,
      duration,
      ease: 'none',
      repeat: -1,
      delay: -((index * 1.37 + .9) % duration),
      modifiers: {
        y: gsap.utils.unitize((value) => wrapY(parseFloat(value)))
      },
      onUpdate: () => {
        const currentY = Number(gsap.getProperty(icon, 'y'))
        const progress = Math.min(1, Math.max(0, (startY - currentY) / distance))
        let alpha = baseOpacity
        if (progress < .16) alpha = gsap.utils.mapRange(0, .16, 0, baseOpacity, progress)
        else if (progress > .78) alpha = gsap.utils.mapRange(.78, 1, baseOpacity, 0, progress)
        gsap.set(icon, { opacity: alpha })
      }
    })

    const driftTween = gsap.to(icon, {
      x: drift + (index % 2 ? 8 : -8),
      duration: 2.6 + index * .28,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    })

    tweens.push(rise, driftTween)
  })

  return () => tweens.forEach((tween) => tween.kill())
}
