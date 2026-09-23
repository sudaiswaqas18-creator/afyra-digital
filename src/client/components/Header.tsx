import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useLiveSolutionsNav } from '../lib/useLiveSolutionsNav'
import { Icon } from './ui'

type HeaderProps = { fromServicePage?: boolean }

const primaryNav = [
  { label: 'Home', to: '/' },
  { label: 'Healthcare', to: '/healthcare' },
  { label: 'Programs', to: '/programs' },
  { label: 'About', to: '/about' },
  { label: 'Insights', to: '/insights' }
]

export default function Header(_props: HeaderProps) {
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [lightSurface,setLightSurface]=useState(false)
  const [open, setOpen] = useState(false)
  const [solutionsOpen, setSolutionsOpen] = useState(false)
  const [mobileSolutionsOpen, setMobileSolutionsOpen] = useState(false)
  const dropdownRef = useRef<HTMLLIElement>(null)
  const consultationHref = '/request-consultation'
  const serviceNav = useLiveSolutionsNav()
  const headerVariant = location.pathname === '/' ? 'home' : ({ '/solutions/digital-growth-marketing-strategy': 'growth', '/solutions/social-media-community-lead-communication': 'social', '/solutions/website-development': 'website', '/solutions/patient-acquisition-lead-generation': 'patient', '/solutions/digital-presence-advanced-systems': 'digital' } as Record<string, string>)[location.pathname] || 'default'

  useEffect(()=>{
    let frame=0
    const measure=()=>{
      frame=0
      const header=document.getElementById('site-header')
      const logo=header?.querySelector('.af-header__brand')
      if(!header||!logo)return
      const r=logo.getBoundingClientRect()
      const stack=document.elementsFromPoint(r.left+r.width/2,Math.min(innerHeight-1,r.top+r.height/2))
      let el=stack.find(node=>!header.contains(node)&&node!==header) as HTMLElement|null
      let light=false
      while(el){
        const c=getComputedStyle(el).backgroundColor.match(/[\d.]+/g)?.map(Number)
        if(c&&c.length>=3&&(c[3]??1)>.7){light=(c[0]*.2126+c[1]*.7152+c[2]*.0722)>150;break}
        el=el.parentElement
      }
      setLightSurface(light)
    }
    const schedule=()=>{if(!frame)frame=requestAnimationFrame(measure)}
    schedule()
    const timer=setTimeout(schedule,700)
    window.addEventListener('scroll',schedule,{passive:true})
    window.addEventListener('resize',schedule)
    return ()=>{cancelAnimationFrame(frame);clearTimeout(timer);window.removeEventListener('scroll',schedule);window.removeEventListener('resize',schedule)}
  },[location.pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  useEffect(() => {
    const onPointerDown = (event: PointerEvent) => {
      if (!dropdownRef.current?.contains(event.target as Node)) setSolutionsOpen(false)
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSolutionsOpen(false)
        setOpen(false)
      }
    }
    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [])

  useEffect(() => {
    setOpen(false)
    setSolutionsOpen(false)
    setMobileSolutionsOpen(false)
  }, [location.pathname])

  const closeAll = () => {
    setOpen(false)
    setSolutionsOpen(false)
    setMobileSolutionsOpen(false)
  }

  const isActive = (to: string) => to === '/' ? location.pathname === '/' : location.pathname.startsWith(to)
  const solutionActive = location.pathname === '/solutions' || location.pathname.startsWith('/solutions/')

  return (
    <header id="site-header" data-logo-tone={lightSurface ? 'dark' : 'light'} className={`af-header af-header--premium af-header--${headerVariant} ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="af-header__glow" aria-hidden="true" />
      <div className="af-container af-header__inner">
        <Link className="af-header__brand" to="/" aria-label="Afyra Digital home" onClick={closeAll}>
          <img src="/static/img/logo-mark.png" alt="" className="af-header__logo" />
          <span className="af-header__name">AFYRA DIGITAL</span>
        </Link>

        <nav className="af-header__nav" aria-label="Primary navigation">
          <ul>
            <li><Link className={isActive('/') ? 'is-active' : ''} to="/">Home</Link></li>
            <li
              ref={dropdownRef}
              className={`af-header__dropdown ${solutionsOpen ? 'is-open' : ''} ${solutionActive ? 'is-active' : ''}`}
              onMouseEnter={() => setSolutionsOpen(true)}
              onMouseLeave={() => setSolutionsOpen(false)}
            >
              <div className="af-header__solutions-trigger">
                <Link className={solutionActive ? 'is-active' : ''} to="/solutions" onClick={() => setSolutionsOpen(false)}>Solutions</Link>
                <button type="button" aria-expanded={solutionsOpen} aria-label="Toggle Solutions menu" onClick={() => setSolutionsOpen((value) => !value)} onFocus={() => setSolutionsOpen(true)}>
                  <span className="af-control-chevron" aria-hidden="true" />
                </button>
              </div>
              <div className="af-header__dropdown-menu" role="menu" aria-label="Afyra Digital solutions">
                {serviceNav.map((service) => <Link key={service.href} to={service.href} role="menuitem" onClick={closeAll}>{service.name}</Link>)}
              </div>
            </li>
            {primaryNav.slice(1).map((item) => <li key={item.to}><Link className={isActive(item.to) ? 'is-active' : ''} to={item.to}>{item.label}</Link></li>)}
          </ul>
        </nav>

        <div className="af-header__actions">
          <a className="af-header__consult" href={consultationHref}>Request Consultation {Icon.arrowRight({ size: 17 })}</a>
          <button className="af-header__burger" onClick={() => setOpen(true)} aria-label="Open menu" aria-expanded={open}><span className="af-control-menu" aria-hidden="true"><i /><i /><i /></span></button>
        </div>
      </div>

      <div
        className={`af-drawer ${open ? 'is-open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        style={{
          background: '#ffffff',
          backgroundColor: '#ffffff',
          color: '#00443e'
        }}
      >
        <div className="af-drawer__head"><Link className="af-header__brand" to="/" onClick={closeAll}><img src="/static/img/logo-mark.png" alt="" className="af-header__logo" /><span className="af-header__name">AFYRA DIGITAL</span></Link><button className="af-drawer__close" onClick={() => setOpen(false)} aria-label="Close menu"><span className="af-control-close" aria-hidden="true" /></button></div>
        <ul className="af-drawer__nav">
          <li><Link to="/" onClick={closeAll}>Home</Link></li>
          <li className={`af-drawer__solutions ${mobileSolutionsOpen ? 'is-open' : ''}`}>
            <div className="af-drawer__solutions-head"><Link to="/solutions" onClick={closeAll}>Solutions</Link><button type="button" aria-expanded={mobileSolutionsOpen} aria-label="Toggle Solutions menu" onClick={() => setMobileSolutionsOpen((value) => !value)}><span className="af-control-chevron" aria-hidden="true" /></button></div>
            <div className="af-drawer__solutions-list">{serviceNav.map((service) => <Link key={service.href} to={service.href} onClick={closeAll}>{service.name}</Link>)}</div>
          </li>
          {primaryNav.slice(1).map((item) => <li key={item.to}><Link to={item.to} onClick={closeAll}>{item.label}</Link></li>)}
        </ul>
        <div className="af-drawer__foot"><a className="af-header__consult af-header__consult--mobile" href={consultationHref} onClick={closeAll}>Request Consultation {Icon.arrowRight({ size: 17 })}</a></div>
      </div>
      {open ? <div className="af-drawer__scrim" onClick={() => setOpen(false)} /> : null}
    </header>
  )
}
