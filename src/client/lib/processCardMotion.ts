import gsap from 'gsap'

/**
 * Shared Process / How We Work hover choreography.
 * The homepage and solution-page Process layouts call this same helper so the
 * motion values, easing and cleanup behavior cannot drift apart.
 */
export function setupProcessCardHover(cards: Iterable<HTMLElement>) {
  const cleanups: Array<() => void> = []

  Array.from(cards).forEach((card) => {
    const num = card.querySelector<HTMLElement>('.af-proc__num')
    const enter = () => {
      gsap.to(card, {
        y: -7,
        scale: 1.018,
        borderColor: 'rgba(0,187,160,.62)',
        backgroundColor: 'rgba(0,187,160,.095)',
        boxShadow: '0 24px 55px rgba(0,187,160,.14)',
        duration: .34,
        ease: 'power2.out',
        overwrite: 'auto'
      })
      if (num) gsap.to(num, { scale: 1.035, opacity: 1, duration: .34, ease: 'power2.out', overwrite: 'auto' })
    }
    const leave = () => {
      gsap.to(card, {
        y: 0,
        scale: 1,
        borderColor: 'rgba(222,241,240,.08)',
        backgroundColor: 'rgba(222,241,240,.045)',
        boxShadow: '0 0 0 rgba(0,0,0,0)',
        duration: .38,
        ease: 'power2.out',
        overwrite: 'auto'
      })
      if (num) gsap.to(num, { scale: 1, opacity: .9, duration: .32, ease: 'power2.out', overwrite: 'auto' })
    }

    card.addEventListener('mouseenter', enter)
    card.addEventListener('mouseleave', leave)
    card.addEventListener('focusin', enter)
    card.addEventListener('focusout', leave)
    cleanups.push(() => {
      card.removeEventListener('mouseenter', enter)
      card.removeEventListener('mouseleave', leave)
      card.removeEventListener('focusin', enter)
      card.removeEventListener('focusout', leave)
    })
  })

  return () => cleanups.forEach((cleanup) => cleanup())
}
