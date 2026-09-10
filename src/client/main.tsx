import { StrictMode, Suspense, lazy, useLayoutEffect, type ReactNode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import App from './App'
const ServicePage = lazy(() => import('./pages/ServicePage'))
const MarketingPage = lazy(() => import('./pages/MarketingPage'))
const CardDetailPage = lazy(() => import('./pages/CardDetailPage'))
const RequestConsultationPage = lazy(() => import('./pages/RequestConsultationPage'))
import RouteBoundary from './components/RouteBoundary'
import BrandedRouteTransition from './components/BrandedRouteTransition'
import AnimatedScrollbar from './components/AnimatedScrollbar'
import CardRouteEnhancer from './components/CardRouteEnhancer'

function RouteLifecycle() {
  const location = useLocation()

  useLayoutEffect(() => {
    if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual'

    document.body.style.overflow = ''
    document.documentElement.style.overflow = ''
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill(true))
    ScrollTrigger.clearScrollMemory('manual')

    const html = document.documentElement
    const previousBehavior = html.style.scrollBehavior
    html.style.scrollBehavior = 'auto'

    const resetTop = () => {
      html.scrollTop = 0
      document.body.scrollTop = 0
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    }

    resetTop()
    const rafOne = window.requestAnimationFrame(() => {
      resetTop()
      window.requestAnimationFrame(() => {
        resetTop()
        ScrollTrigger.refresh(true)
      })
    })
    const settle = window.setTimeout(resetTop, 120)
    const restoreBehavior = window.setTimeout(() => { html.style.scrollBehavior = previousBehavior }, 180)

    return () => {
      window.cancelAnimationFrame(rafOne)
      window.clearTimeout(settle)
      window.clearTimeout(restoreBehavior)
    }
  }, [location.pathname, location.search])

  return null
}


function KeyedRouteBoundary({ children }: { children: ReactNode }) {
  const location = useLocation()
  return <RouteBoundary key={location.pathname}>{children}</RouteBoundary>
}


function RouteLoading() {
  return <div className="af-route-suspense" aria-hidden="true" />
}

gsap.registerPlugin(ScrollTrigger)
ScrollTrigger.config({ ignoreMobileResize: true, limitCallbacks: true })

function SiteRouter() {
  return (
    <BrowserRouter>
      <RouteLifecycle />
      <BrandedRouteTransition />
      <AnimatedScrollbar />
      <CardRouteEnhancer />
      <KeyedRouteBoundary>
        <Suspense fallback={<RouteLoading />}>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/solutions/:slug" element={<ServicePage />} />
          <Route path="/details/:slug" element={<CardDetailPage />} />
          <Route path="/solutions" element={<MarketingPage />} />
          <Route path="/healthcare" element={<MarketingPage />} />
          <Route path="/programs" element={<MarketingPage />} />
          <Route path="/about" element={<MarketingPage />} />
          <Route path="/insights" element={<MarketingPage />} />
          <Route path="/request-consultation" element={<RequestConsultationPage />} />
          <Route path="/contact" element={<Navigate to="/request-consultation" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        </Suspense>
      </KeyedRouteBoundary>
    </BrowserRouter>
  )
}

const el = document.getElementById('root')
if (el) {
  createRoot(el).render(
    <StrictMode>
      <SiteRouter />
    </StrictMode>
  )
  const dismissBootLoader = () => document.getElementById('afyra-boot-loader')?.remove()
  window.requestAnimationFrame(() => window.requestAnimationFrame(dismissBootLoader))
  window.setTimeout(dismissBootLoader, 1200)
}
