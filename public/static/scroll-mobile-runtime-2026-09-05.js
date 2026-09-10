/* Afyra Digital — compatibility layer for the currently packaged prebuilt client.
   Fresh Vite development uses the React source implementation instead. */
(() => {
  const root = document.documentElement
  root.classList.add('af-runtime-compat')

  function installScrollbar() {
    if (document.querySelector('.af-branded-scrollbar')) return
    const track = document.createElement('div')
    track.className = 'af-branded-scrollbar'
    track.setAttribute('aria-hidden', 'true')
    const thumb = document.createElement('div')
    thumb.className = 'af-branded-scrollbar__thumb'
    thumb.innerHTML = '<span></span>'
    track.appendChild(thumb)
    document.body.appendChild(track)

    let raf = 0
    let timer = 0
    let dragging = false
    let startY = 0
    let startScroll = 0
    const maxScroll = () => Math.max(0, document.documentElement.scrollHeight - innerHeight)

    const update = () => {
      raf = 0
      const height = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight)
      const viewport = innerHeight
      const th = track.clientHeight
      const scrollable = Math.max(0, height - viewport)
      const h = Math.max(44, Math.min(th, th * (viewport / Math.max(height, 1))))
      const travel = Math.max(0, th - h)
      const progress = scrollable ? Math.min(1, Math.max(0, scrollY / scrollable)) : 0
      thumb.style.height = `${h}px`
      thumb.style.transform = `translate3d(0,${travel * progress}px,0)`
      track.classList.toggle('is-disabled', scrollable <= 2)
      track.classList.add('is-active')
      clearTimeout(timer)
      timer = setTimeout(() => { if (!dragging) track.classList.remove('is-active') }, 760)
    }
    const schedule = () => { if (!raf) raf = requestAnimationFrame(update) }
    track.addEventListener('pointerdown', (event) => {
      if (event.pointerType === 'touch') return
      event.preventDefault()
      const rect = track.getBoundingClientRect()
      const trect = thumb.getBoundingClientRect()
      if (event.target === thumb || thumb.contains(event.target)) {
        dragging = true; startY = event.clientY; startScroll = scrollY
        track.classList.add('is-dragging','is-active')
        try { thumb.setPointerCapture(event.pointerId) } catch {}
        return
      }
      const travel = Math.max(1, rect.height - trect.height)
      const pos = Math.min(travel, Math.max(0, event.clientY - rect.top - trect.height/2))
      scrollTo({ top: (pos/travel) * maxScroll(), behavior: 'smooth' })
    })
    addEventListener('pointermove', (event) => {
      if (!dragging) return
      event.preventDefault()
      const travel = Math.max(1, track.clientHeight - thumb.getBoundingClientRect().height)
      scrollTo(0, Math.min(maxScroll(), Math.max(0, startScroll + ((event.clientY-startY)/travel)*maxScroll())))
    }, { passive:false })
    const stop = () => { dragging = false; track.classList.remove('is-dragging'); schedule() }
    addEventListener('pointerup', stop); addEventListener('pointercancel', stop)
    addEventListener('scroll', schedule, { passive:true }); addEventListener('resize', schedule, { passive:true })
    if ('ResizeObserver' in window) new ResizeObserver(schedule).observe(document.body)
    schedule()
  }

  function installSocialBuiltAroundReveal() {
    const cards = [...document.querySelectorAll('.sv-layout-06 .sv-features--06 .sv-feature-card')]
    if (!cards.length) return
    if (!('IntersectionObserver' in window)) { cards.forEach(c => c.classList.add('is-af-built-visible')); return }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        const index = cards.indexOf(entry.target)
        setTimeout(() => entry.target.classList.add('is-af-built-visible'), Math.max(0,index)*55)
        observer.unobserve(entry.target)
      })
    }, { threshold:.08, rootMargin:'0px 0px -5% 0px' })
    cards.forEach(card => observer.observe(card))
  }

  function refreshRouteEnhancements() {
    installScrollbar()
    installSocialBuiltAroundReveal()
  }

  const observer = new MutationObserver(() => {
    clearTimeout(observer._t)
    observer._t = setTimeout(refreshRouteEnhancements, 60)
  })
  observer.observe(document.getElementById('root') || document.body, { childList:true, subtree:true })
  requestAnimationFrame(refreshRouteEnhancements)
})()
