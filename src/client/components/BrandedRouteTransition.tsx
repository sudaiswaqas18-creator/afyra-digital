import { useLayoutEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'

const MIN_VISIBLE_MS = 520
const MAX_VISIBLE_MS = 1200

export default function BrandedRouteTransition() {
  const location = useLocation()
  const [visible, setVisible] = useState(true)
  const [cycle, setCycle] = useState(0)
  const timer = useRef<number | null>(null)
  const failsafe = useRef<number | null>(null)

  useLayoutEffect(() => {
    if (timer.current) window.clearTimeout(timer.current)
    if (failsafe.current) window.clearTimeout(failsafe.current)

    setCycle((value) => value + 1)
    setVisible(true)
    document.documentElement.classList.add('af-route-transitioning')

    const hide = () => {
      setVisible(false)
      document.documentElement.classList.remove('af-route-transitioning')
    }
    timer.current = window.setTimeout(hide, MIN_VISIBLE_MS)
    failsafe.current = window.setTimeout(hide, MAX_VISIBLE_MS)

    return () => {
      if (timer.current) window.clearTimeout(timer.current)
    if (failsafe.current) window.clearTimeout(failsafe.current)
      timer.current = null
    }
  }, [location.pathname, location.search])

  return (
    <div
      key={`${location.pathname}-${cycle}`}
      className={`af-page-transition ${visible ? 'is-visible' : 'is-hidden'}`}
      aria-hidden={!visible}
      aria-live="polite"
    >
      <div className="af-page-transition__inner">
        <img src="/static/img/logo-wide.png" alt="Afyra Digital" />
        <div className="af-page-transition__line" aria-hidden="true"><span /></div>
        <p>Let’s Grow Together</p>
      </div>
    </div>
  )
}
