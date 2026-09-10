import { useEffect, useRef } from 'react'

/**
 * Lightweight branded scrollbar.
 * Uses transform/height writes only, so it does not force React re-renders while scrolling.
 * Native touch scrolling remains untouched; the custom rail is a visual indicator on touch devices.
 */
export default function AnimatedScrollbar() {
  const trackRef = useRef<HTMLDivElement>(null)
  const thumbRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const track = trackRef.current
    const thumb = thumbRef.current
    if (!track || !thumb) return

    let raf = 0
    let hideTimer = 0
    let dragging = false
    let dragStartY = 0
    let dragStartScroll = 0

    const maxScroll = () => Math.max(0, document.documentElement.scrollHeight - window.innerHeight)

    const update = () => {
      raf = 0
      const scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight)
      const viewport = window.innerHeight
      const trackHeight = track.clientHeight
      const scrollable = Math.max(0, scrollHeight - viewport)
      const ratio = scrollHeight > 0 ? viewport / scrollHeight : 1
      const thumbHeight = Math.max(44, Math.min(trackHeight, trackHeight * ratio))
      const travel = Math.max(0, trackHeight - thumbHeight)
      const progress = scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0

      thumb.style.height = `${thumbHeight}px`
      thumb.style.transform = `translate3d(0, ${travel * progress}px, 0)`
      track.classList.toggle('is-disabled', scrollable <= 2)
      track.classList.add('is-active')

      window.clearTimeout(hideTimer)
      hideTimer = window.setTimeout(() => {
        if (!dragging) track.classList.remove('is-active')
      }, 760)
    }

    const schedule = () => {
      if (!raf) raf = window.requestAnimationFrame(update)
    }

    const onPointerDown = (event: PointerEvent) => {
      // Touch scrolling should stay completely native.
      if (event.pointerType === 'touch') return
      event.preventDefault()
      const rect = track.getBoundingClientRect()
      const thumbRect = thumb.getBoundingClientRect()

      if (event.target === thumb || thumb.contains(event.target as Node)) {
        dragging = true
        dragStartY = event.clientY
        dragStartScroll = window.scrollY
        thumb.setPointerCapture?.(event.pointerId)
        track.classList.add('is-dragging', 'is-active')
        return
      }

      const trackHeight = rect.height
      const thumbHeight = thumbRect.height
      const travel = Math.max(1, trackHeight - thumbHeight)
      const target = Math.min(travel, Math.max(0, event.clientY - rect.top - thumbHeight / 2))
      window.scrollTo({ top: (target / travel) * maxScroll(), left: 0, behavior: 'smooth' })
    }

    const onPointerMove = (event: PointerEvent) => {
      if (!dragging) return
      event.preventDefault()
      const trackHeight = track.clientHeight
      const thumbHeight = thumb.getBoundingClientRect().height
      const travel = Math.max(1, trackHeight - thumbHeight)
      const scrollRange = maxScroll()
      const delta = event.clientY - dragStartY
      window.scrollTo(0, Math.min(scrollRange, Math.max(0, dragStartScroll + (delta / travel) * scrollRange)))
    }

    const stopDragging = (event?: PointerEvent) => {
      if (!dragging) return
      dragging = false
      track.classList.remove('is-dragging')
      if (event) thumb.releasePointerCapture?.(event.pointerId)
      schedule()
    }

    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule, { passive: true })
    track.addEventListener('pointerdown', onPointerDown)
    window.addEventListener('pointermove', onPointerMove, { passive: false })
    window.addEventListener('pointerup', stopDragging)
    window.addEventListener('pointercancel', stopDragging)

    const resizeObserver = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(schedule) : null
    resizeObserver?.observe(document.documentElement)
    resizeObserver?.observe(document.body)

    schedule()

    return () => {
      if (raf) window.cancelAnimationFrame(raf)
      window.clearTimeout(hideTimer)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      track.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerup', stopDragging)
      window.removeEventListener('pointercancel', stopDragging)
      resizeObserver?.disconnect()
    }
  }, [])

  return (
    <div ref={trackRef} className="af-branded-scrollbar" aria-hidden="true">
      <div ref={thumbRef} className="af-branded-scrollbar__thumb"><span /></div>
    </div>
  )
}
