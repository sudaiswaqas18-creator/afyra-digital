import { useLayoutEffect, useMemo, useRef, type CSSProperties, type ReactNode } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useScopedTestimonials, type LiveTestimonial, type TestimonialSectionSettings } from '../lib/useScopedTestimonials'
import '../styles/testimonials-v76.css'

gsap.registerPlugin(ScrollTrigger)

export type TestimonialsVariant = 'home' | 'brand' | 'digital' | 'patient' | 'website' | 'social' | 'strategy'

type Props = {
  pageSlug: string
  variant: TestimonialsVariant
}

function initials(name: string) {
  return name.split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0]?.toUpperCase()).join('') || 'A'
}

function Avatar({ item, className = '' }: { item: LiveTestimonial; className?: string }) {
  if (item.avatar_url) return <img className={className} src={item.avatar_url} alt={`${item.author_name} testimonial avatar`} loading="lazy" decoding="async" />
  return <span className={`${className} aft-avatar-fallback`} aria-hidden="true">{initials(item.author_name)}</span>
}

function Stars({ rating, compact = false }: { rating: number; compact?: boolean }) {
  const safeRating = Math.max(0, Math.min(5, Math.round(Number(rating || 0))))
  return <span className={`aft-stars ${compact ? 'is-compact' : ''}`} aria-label={`${safeRating} out of 5 stars`}>{Array.from({ length: 5 }, (_, index) => <i key={index} className={index < safeRating ? 'is-on' : ''}>★</i>)}</span>
}

function Author({ item, avatarClass = '' }: { item: LiveTestimonial; avatarClass?: string }) {
  return (
    <div className="aft-author">
      <Avatar item={item} className={avatarClass || 'aft-avatar'} />
      <div className="aft-author__copy">
        <strong>{item.author_name}</strong>
        <span>{item.author_role}{item.author_company ? ` · ${item.author_company}` : ''}</span>
      </div>
    </div>
  )
}

function HomeCard({ item }: { item: LiveTestimonial }) {
  return (
    <article className="aft-home-card" data-aft-card>
      <span className="aft-home-card__quote">❝</span>
      <blockquote>“{item.quote}”</blockquote>
      <footer>
        <div className="aft-home-card__person"><strong>{item.author_name}</strong><span>{item.author_role}</span></div>
        <Avatar item={item} className="aft-home-card__avatar" />
      </footer>
    </article>
  )
}

function MarqueeCard({ item }: { item: LiveTestimonial }) {
  return (
    <article className="aft-marquee-card" data-aft-card>
      <Stars rating={item.rating} />
      <blockquote>“{item.quote}”</blockquote>
      <footer>
        <Author item={item} avatarClass="aft-marquee-card__avatar" />
        <span className="aft-marquee-card__quote">❝</span>
      </footer>
    </article>
  )
}

function SocialCard({ item }: { item: LiveTestimonial }) {
  return (
    <article className="aft-social-card" data-aft-card>
      <div className="aft-social-card__top"><Stars rating={item.rating} /><span>❞</span></div>
      <blockquote>“{item.quote}”</blockquote>
      <div className="aft-social-card__divider" />
      <Author item={item} avatarClass="aft-social-card__avatar" />
    </article>
  )
}

function WebsiteCard({ item }: { item: LiveTestimonial }) {
  return (
    <article className="aft-website-card" data-aft-card>
      <div className="aft-website-card__top"><span><b>{Number(item.rating || 5).toFixed(1)}</b> <i>★</i> Rating</span><strong>❞</strong></div>
      <blockquote>{item.quote}</blockquote>
      <Author item={item} avatarClass="aft-website-card__avatar" />
    </article>
  )
}

function MetricCard({ item, feature = false, inverted = false }: { item: LiveTestimonial; feature?: boolean; inverted?: boolean }) {
  const effectiveInverted = inverted || item.card_variant === 'inverted'
  return (
    <article className={`aft-metric-card ${feature ? 'is-feature' : 'is-small'} ${effectiveInverted ? 'is-inverted' : ''}`} data-aft-card>
      {feature ? (
        <div className="aft-metric-card__headline">
          <div><strong>{item.metric_value || 'Demo'}</strong><span>{item.metric_label || 'Sample outcome'}</span></div>
          <span className="aft-rating-pill"><i>★</i>{Number(item.rating || 5).toFixed(1)}</span>
        </div>
      ) : (
        <div className="aft-metric-card__small-top"><span className="aft-metric-card__quote">❞</span><span className="aft-rating-pill"><i>★</i>{Number(item.rating || 5).toFixed(1)}</span></div>
      )}
      {feature ? <span className="aft-metric-card__quote">❞</span> : null}
      <blockquote>{item.quote}</blockquote>
      <footer>
        <Author item={item} avatarClass="aft-metric-card__avatar" />
        <span className="aft-metric-card__mark" aria-hidden="true">↗</span>
      </footer>
    </article>
  )
}

function repeatForLoop(items: LiveTestimonial[], minimum: number) {
  if (!items.length) return []
  const out: LiveTestimonial[] = []
  while (out.length < Math.max(minimum, items.length)) out.push(...items)
  return out.slice(0, Math.max(minimum, items.length))
}

function VerticalTrack({ items, direction, speed = 28, card }: { items: LiveTestimonial[]; direction: 'up' | 'down'; speed?: number; card: (item: LiveTestimonial, index: number) => ReactNode }) {
  const loopItems = repeatForLoop(items, 3)
  return (
    <div className="aft-vcol">
      <div className="aft-vtrack" data-aft-vtrack data-direction={direction} data-speed={speed}>
        <div className="aft-vset">{loopItems.map((item, index) => <span className="aft-track-item" key={`a-${item.id}-${index}`}>{card(item, index)}</span>)}</div>
        <div className="aft-vset" aria-hidden="true">{loopItems.map((item, index) => <span className="aft-track-item" key={`b-${item.id}-${index}`}>{card(item, index)}</span>)}</div>
      </div>
    </div>
  )
}

function HorizontalTrack({ items, direction, speed = 32, social = false }: { items: LiveTestimonial[]; direction: 'left' | 'right'; speed?: number; social?: boolean }) {
  const loopItems = repeatForLoop(items, social ? 4 : 6)
  return (
    <div className={`aft-hrow ${social ? 'is-social' : ''}`}>
      <div className="aft-htrack" data-aft-htrack data-direction={direction} data-speed={speed}>
        <div className="aft-hset">{loopItems.map((item, index) => social ? <SocialCard key={`a-${item.id}-${index}`} item={item} /> : <MarqueeCard key={`a-${item.id}-${index}`} item={item} />)}</div>
        <div className="aft-hset" aria-hidden="true">{loopItems.map((item, index) => social ? <SocialCard key={`b-${item.id}-${index}`} item={item} /> : <MarqueeCard key={`b-${item.id}-${index}`} item={item} />)}</div>
      </div>
    </div>
  )
}

function AvatarHeart({ items, withLogo = false }: { items: LiveTestimonial[]; withLogo?: boolean }) {
  if (!withLogo) return (
    <div className="aft-heart aft-heart--reference is-brand" aria-hidden="true">
      <div className="aft-heart__portrait-mask">
        <div className="aft-heart__portrait-grid">
          {Array.from({ length: 35 }, (_, index) => <img key={index} src={`/Home-Public/t1-author-${index % 8 + 1}-recolored.webp`} alt="" loading="lazy" />)}
        </div>
      </div>
      <img className="aft-heart__reference-border" src="/static/testimonials/heart-shape-border.webp" alt="" />
    </div>
  )
  const visible = repeatForLoop(items, 6).slice(0, 6)
  return (
    <div className="aft-patient-heart" aria-hidden="true">
      <svg className="aft-patient-heart__shape" viewBox="0 0 240 190" fill="none">
        <defs>
          <linearGradient id="patient-heart-fill" x1="0" y1="0" x2="0" y2="1">
            <stop stopColor="#00bba0" stopOpacity=".24" /><stop offset="1" stopColor="#def1f0" stopOpacity=".05" />
          </linearGradient>
          <pattern id="patient-heart-lines" width="5" height="190" patternUnits="userSpaceOnUse"><path d="M1 0V190" stroke="white" strokeOpacity=".55" /></pattern>
        </defs>
        <path d="M120 184C94 165 6 107 6 61C6 5 75 -13 120 39C165 -13 234 5 234 61C234 107 146 165 120 184Z" fill="url(#patient-heart-fill)" stroke="#e5eeec" strokeWidth="4" />
        <path d="M120 184C94 165 6 107 6 61C6 5 75 -13 120 39C165 -13 234 5 234 61C234 107 146 165 120 184Z" fill="url(#patient-heart-lines)" />
      </svg>
      <div className="aft-patient-heart__window">
        <div className="aft-patient-heart__track">
          {[0, 1].map(copy => <div className="aft-patient-heart__set" key={copy}>{visible.map((item, index) => <span key={`${item.id}-${index}`}><Avatar item={item} /></span>)}</div>)}
        </div>
      </div>
      <div className="aft-patient-heart__logo"><img src="/static/img/logo-mark.png" alt="" /></div>
    </div>
  )
}

function SectionHeader({ copy, centered = true }: { copy: Pick<TestimonialSectionSettings, 'eyebrow' | 'title' | 'description'>; centered?: boolean }) {
  return (
    <header className={`aft-head ${centered ? 'is-centered' : ''}`} data-aft-head>
      <span className="aft-eyebrow"><i />{copy.eyebrow}</span>
      <h2>{copy.title}</h2>
      {copy.description ? <p>{copy.description}</p> : null}
    </header>
  )
}

function AvatarStack({ items, count = 5 }: { items: LiveTestimonial[]; count?: number }) {
  return <div className="aft-avatar-stack">{repeatForLoop(items, count).slice(0, count).map((item, index) => <Avatar key={`${item.id}-${index}`} item={item} />)}</div>
}

function MetricSummary({ items, copy }: { items: LiveTestimonial[]; copy: TestimonialSectionSettings }) {
  const avg = items.length ? items.reduce((sum, item) => sum + Number(item.rating || 0), 0) / items.length : 5
  return (
    <div className="aft-metric-summary" data-aft-summary>
      <div className="aft-metric-summary__clients"><AvatarStack items={items} /><span>{copy.client_count_label || `${items.length} demo client stories`}</span></div>
      <div className="aft-metric-summary__rating"><span className="aft-chat-dot">•••</span><div><Stars rating={Math.round(copy.aggregate_rating || avg)} compact /><b>{(copy.aggregate_rating || avg).toFixed(1)}</b><small>{copy.review_count_label || `${items.length} demo reviews`}</small></div></div>
      <span className="aft-summary-button">{copy.cta_label || 'View all reviews'}<b className="af-diagonal-arrow">↗</b></span>
    </div>
  )
}

function WebsiteProof({ items, copy }: { items: LiveTestimonial[]; copy: TestimonialSectionSettings }) {
  const avg = items.length ? items.reduce((sum, item) => sum + Number(item.rating || 0), 0) / items.length : 5
  return (
    <div className="aft-website-proof" data-aft-summary>
      <AvatarStack items={items} />
      <div><div><Stars rating={Math.round(copy.aggregate_rating || avg)} /></div><span>{copy.review_count_label || `From ${items.length}+ Demo Reviews`}</span></div>
    </div>
  )
}

function SocialSummary({ items, copy }: { items: LiveTestimonial[]; copy: TestimonialSectionSettings }) {
  const avg = items.length ? items.reduce((sum, item) => sum + Number(item.rating || 0), 0) / items.length : 5
  return (
    <div className="aft-social-summary" data-aft-summary>
      <div className="aft-social-summary__proof"><AvatarStack items={items} /><div><Stars rating={Math.round(copy.aggregate_rating || avg)} /><span>{copy.review_count_label || `From ${items.length}+ Demo Reviews`}</span></div></div>
      <span className="aft-summary-button">{copy.cta_label || 'View All Review'}<b className="af-diagonal-arrow">↗</b></span>
    </div>
  )
}

function PatientSummary({ items, copy }: { items: LiveTestimonial[]; copy: TestimonialSectionSettings }) {
  return <div className="aft-patient-summary" data-aft-summary><AvatarStack items={items} /><span>{copy.client_count_label || `Join ${items.length} demo customers`}</span></div>
}

function HomeLayout({ items, copy }: { items: LiveTestimonial[]; copy: TestimonialSectionSettings }) {
  const columns = [items.filter((_, i) => i % 3 === 0), items.filter((_, i) => i % 3 === 1), items.filter((_, i) => i % 3 === 2)].map((group) => group.length ? group : items)
  const particles = useMemo(() => {
    const hash = (n: number) => {
      const x = Math.sin(n * 12.9898 + 78.233) * 43758.5453
      return x - Math.floor(x)
    }
    return Array.from({ length: 64 }, (_, index) => {
      const leftPct = 12 + hash(index + 1) * 76
      const u = (leftPct - 50) / 50
      // Bowl curve height at this horizontal position (px from bottom of 140px zone)
      const curveY = 18 + 92 * (u * u)
      // Strictly position above the curve line so no sparkle is below the curve
      const bottomPx = curveY + 12 + hash(index + 101) * 65
      return {
        left: `${leftPct}%`,
        bottom: `${bottomPx}px`,
        size: `${0.8 + hash(index + 211) * 2.2}px`,
        base: index < 7 ? 0.16 + hash(index + 307) * 0.14 : 0
      }
    })
  }, [])
  return (
    <div className="aft-home__inner">
      <SectionHeader copy={copy} />
      <div className="aft-home__viewport">
        <div className="aft-home__grid">
          <VerticalTrack items={columns[0]} direction="up" speed={29} card={(item) => <HomeCard item={item} />} />
          <VerticalTrack items={columns[1]} direction="down" speed={31} card={(item) => <HomeCard item={item} />} />
          <VerticalTrack items={columns[2]} direction="up" speed={27} card={(item) => <HomeCard item={item} />} />
        </div>
        <div className="aft-home__fade" aria-hidden="true" />
      </div>
      <div className="aft-home__arc-zone" aria-hidden="true">
        <svg width="0" height="0" aria-hidden="true"><defs><clipPath id="home-bowl-clip" clipPathUnits="objectBoundingBox"><path d="M0 0H1V.593333Q.5 .926667 0 .593333Z" /></clipPath></defs></svg>
        <div className="aft-home__bowl-effects"><div className="aft-home__particle-field" data-aft-particle-field />
        <div className="aft-home__arc-glow" data-aft-arc-glow />
        <div className="aft-home__particles">
          {particles.map((particle, index) => (
            <i
              data-aft-particle
              data-base-alpha={particle.base}
              key={index}
              style={{ left: particle.left, bottom: particle.bottom, width: particle.size, height: particle.size } as CSSProperties}
            >
              <b data-aft-twinkle />
            </i>
          ))}
        </div>
        </div><svg viewBox="0 0 700 140" preserveAspectRatio="none" className="aft-home__arc" data-aft-arc-line>
          <defs>
            <linearGradient id="aftArcGradV77" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#00BBA0" stopOpacity="0" />
              <stop offset="18%" stopColor="#00BBA0" stopOpacity=".55" />
              <stop offset="48%" stopColor="#DEF1F0" stopOpacity=".95" />
              <stop offset="52%" stopColor="#00BBA0" stopOpacity="1" />
              <stop offset="82%" stopColor="#00BBA0" stopOpacity=".55" />
              <stop offset="100%" stopColor="#00BBA0" stopOpacity="0" />
            </linearGradient>
            <filter id="aftArcGlowFilterV77" x="-20%" y="-40%" width="140%" height="200%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <clipPath id="aftCurveAboveClip">
              <path d="M -10 18 Q 350 118 710 18 L 710 -250 L -10 -250 Z" />
            </clipPath>
          </defs>
          <path d="M 0 18 Q 350 118 700 18" fill="none" stroke="url(#aftArcGradV77)" strokeWidth="8" opacity=".22" filter="url(#aftArcGlowFilterV77)" />
          <path d="M 0 18 Q 350 118 700 18" fill="none" stroke="url(#aftArcGradV77)" strokeWidth="2.2" filter="url(#aftArcGlowFilterV77)" />
        </svg>
      </div>
    </div>
  )
}

function HorizontalLayout({ items, copy, heartLogo = false, patient = false }: { items: LiveTestimonial[]; copy: TestimonialSectionSettings; heartLogo?: boolean; patient?: boolean }) {
  const top = items.filter((_, i) => i % 2 === 0)
  const bottom = items.filter((_, i) => i % 2 === 1)
  return (
    <div className="aft-horizontal__inner">
      <AvatarHeart items={items} withLogo={heartLogo} />
      <SectionHeader copy={copy} />
      <div className="aft-horizontal__rows">
        <HorizontalTrack items={top.length ? top : items} direction="right" speed={34} />
        <HorizontalTrack items={bottom.length ? bottom : items} direction="left" speed={31} />
      </div>
      {patient ? <PatientSummary items={items} copy={copy} /> : null}
    </div>
  )
}

function MetricLayout({ items, copy, digital = false }: { items: LiveTestimonial[]; copy: TestimonialSectionSettings; digital?: boolean }) {
  const display = repeatForLoop(items, 5).slice(0, 5)
  if (digital) return <div className="aft-metric__inner is-digital-reference">
    <SectionHeader copy={copy} />
    <div className="dp-testimonial-grid">{items.slice(0, 7).map((item, index) => <article key={item.id} className={`dp-testimonial ${index < 2 || index > 4 ? 'is-portrait' : ''}`} data-aft-card>
      {index < 2 || index > 4 ? <img className="dp-testimonial__photo" src={item.avatar_url || '/static/demo-testimonials/avatar-01.svg'} alt="" loading="lazy" /> : null}
      <div><blockquote>{item.quote}</blockquote><footer>{index > 1 && index < 5 ? <img src={item.avatar_url || '/static/demo-testimonials/avatar-01.svg'} alt="" loading="lazy" /> : null}<span><strong>{item.author_name}</strong><small>{item.author_role}{item.author_company ? ` · ${item.author_company}` : ''}</small></span></footer></div>
    </article>)}</div>
    <MetricSummary items={items} copy={copy} />
  </div>
  return (
    <div className={`aft-metric__inner ${digital ? 'is-digital-reference' : ''}`}>
      <SectionHeader copy={copy} />
      {digital ? (
        <div className="aft-digital-metric">
          <div className="aft-digital-metric__features">
            <MetricCard item={display[0]} feature />
            <MetricCard item={display[1]} feature />
          </div>
          <div className="aft-digital-metric__small-row">
            <MetricCard item={display[2]} />
            <MetricCard item={display[3]} inverted />
            <MetricCard item={display[4]} />
          </div>
        </div>
      ) : (
        <div className="aft-metric__grid">
          <div className="aft-metric__feature-left"><MetricCard item={display[0]} feature /></div>
          <div className="aft-metric__feature-right"><MetricCard item={display[1]} feature /></div>
          <div className="aft-metric__small-one"><MetricCard item={display[2]} /></div>
          <div className="aft-metric__small-two"><MetricCard item={display[3]} inverted /></div>
          <div className="aft-metric__small-three"><MetricCard item={display[4]} /></div>
        </div>
      )}
      <MetricSummary items={items} copy={copy} />
    </div>
  )
}

function WebsiteLayout({ items, copy }: { items: LiveTestimonial[]; copy: TestimonialSectionSettings }) {
  const left = items.filter((_, i) => i % 2 === 0)
  const right = items.filter((_, i) => i % 2 === 1)
  return (
    <div className="aft-website__inner">
      <div className="aft-website__copy">
        <SectionHeader copy={copy} centered={false} />
        <WebsiteProof items={items} copy={copy} />
      </div>
      <div className="aft-website__columns">
        <VerticalTrack items={left.length ? left : items} direction="down" speed={31} card={(item) => <WebsiteCard item={item} />} />
        <VerticalTrack items={right.length ? right : items} direction="up" speed={28} card={(item) => <WebsiteCard item={item} />} />
        <div className="aft-website__fade" aria-hidden="true" />
      </div>
    </div>
  )
}

function SocialLayout({ items, copy }: { items: LiveTestimonial[]; copy: TestimonialSectionSettings }) {
  const top = items.filter((_, i) => i % 2 === 0)
  const bottom = items.filter((_, i) => i % 2 === 1)
  return (
    <div className="aft-social__inner">
      <SectionHeader copy={copy} />
      <div className="aft-social__rows">
        <HorizontalTrack items={top.length ? top : items} direction="right" speed={34} social />
        <HorizontalTrack items={bottom.length ? bottom : items} direction="left" speed={31} social />
      </div>
      <SocialSummary items={items} copy={copy} />
    </div>
  )
}

export default function TestimonialsSection({ pageSlug, variant }: Props) {
  const rootRef = useRef<HTMLElement | null>(null)
  const { items, section, loading, error } = useScopedTestimonials(pageSlug)

  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root || !items.length) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let refreshFrame = 0
    let refreshTimer = 0
    let disposed = false

    const scheduleRefresh = () => {
      if (disposed) return
      window.cancelAnimationFrame(refreshFrame)
      window.clearTimeout(refreshTimer)
      refreshFrame = window.requestAnimationFrame(() => {
        refreshTimer = window.setTimeout(() => ScrollTrigger.refresh(), 45)
      })
    }

    const ctx = gsap.context(() => {
      /* All vertical testimonial layouts use true seamless GSAP marquees.
         Homepage used to hand the tracks to a short ScrollTrigger scrub, so by
         the time the section was visibly framed the cards often appeared
         static. The reference keeps columns alive continuously: 1 + 3 travel
         upward while the middle column travels downward. We pause the loops
         while completely off-screen to avoid wasting frames. */
      gsap.utils.toArray<HTMLElement>('[data-aft-vtrack]').forEach((track) => {
        const duration = Number(track.dataset.speed || 28)
        const down = track.dataset.direction === 'down'
        if (reduceMotion) {
          gsap.set(track, { yPercent: down ? -22 : -8 })
          return
        }

        const tween = down
          ? gsap.fromTo(track, { yPercent: -50 }, { yPercent: 0, duration, repeat: -1, ease: 'none', force3D: true, paused: variant === 'home' })
          : gsap.fromTo(track, { yPercent: 0 }, { yPercent: -50, duration, repeat: -1, ease: 'none', force3D: true, paused: variant === 'home' })

      if (variant === 'home') {
          const visibilityTrigger = ScrollTrigger.create({
            trigger: root,
            start: 'top bottom',
            end: 'bottom top',
            onEnter: () => tween.play(),
            onEnterBack: () => tween.play(),
            onLeave: () => tween.pause(),
            onLeaveBack: () => tween.pause()
          })
          const rect = root.getBoundingClientRect()
          if (rect.bottom > 0 && rect.top < window.innerHeight) tween.play()
          // Keep the trigger inside the current GSAP context; ctx.revert() will
          // kill it, but an explicit cleanup makes StrictMode double-mount safe.
          root.dataset.aftHomeMarquee = 'ready'
          void visibilityTrigger
        }
      })

        if (variant === 'strategy' && !reduceMotion) {
        const right = root.querySelector('.aft-metric__small-two .aft-metric-card')
        const left = root.querySelector('.aft-metric__small-one .aft-metric-card')
        if (right && left) {
          gsap.set([right,left],{'--review-wipe':'0%',color:'#0b1c1b'})
          const wipe = gsap.timeline({repeat:-1,repeatDelay:1,scrollTrigger:{trigger:root,start:'top bottom',end:'bottom top',toggleActions:'play pause play pause'}})
          wipe.to({}, {duration:1.4})
            .to(right,{'--review-wipe':'100%',color:'#fff',duration:.8,ease:'power2.inOut'})
            .to(left,{'--review-wipe':'100%',color:'#fff',duration:.8,ease:'power2.inOut'},'+=.25')
            .to({}, {duration:1.8})
            .to(right,{'--review-wipe':'0%',color:'#0b1c1b',duration:.8,ease:'power2.inOut'})
            .to(left,{'--review-wipe':'0%',color:'#0b1c1b',duration:.8,ease:'power2.inOut'},'+=.25')
        }
      }

      gsap.utils.toArray<HTMLElement>('[data-aft-htrack]').forEach((track) => {
        const duration = Number(track.dataset.speed || 32)
        if (reduceMotion) {
          gsap.set(track, { xPercent: track.dataset.direction === 'right' ? -8 : 0 })
          return
        }
        if (track.dataset.direction === 'right') {
          gsap.fromTo(track, { xPercent: -50 }, { xPercent: 0, duration, repeat: -1, ease: 'none', force3D: true })
        } else {
          gsap.fromTo(track, { xPercent: 0 }, { xPercent: -50, duration, repeat: -1, ease: 'none', force3D: true })
        }
      })

      if (!reduceMotion) {
        gsap.utils.toArray<HTMLElement>('[data-aft-heart-avatar]').forEach((avatar, index) => {
          const drift = Number(avatar.style.getPropertyValue('--drift') || (index % 2 ? 1 : -1))
          gsap.to(avatar, {
            x: drift * (6 + (index % 3) * 1.5),
            y: index % 3 === 0 ? -2.5 : 2,
            duration: 2.4 + (index % 5) * 0.24,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: index * 0.045,
            force3D: true
          })
        })
        const heartTexture = root.querySelector<HTMLElement>('[data-aft-heart-texture]')
        if (heartTexture) gsap.to(heartTexture, { xPercent: 2.5, duration: 5.2, repeat: -1, yoyo: true, ease: 'sine.inOut', force3D: true })
      }

      gsap.from('[data-aft-head] > *', {
        y: reduceMotion ? 8 : 18,
        autoAlpha: 0,
        duration: reduceMotion ? 0.34 : 0.68,
        stagger: reduceMotion ? 0.035 : 0.07,
        ease: 'power3.out',
        scrollTrigger: { trigger: root, start: 'top 88%', once: true }
      })

      const summary = root.querySelector('[data-aft-summary]')
      if (summary) gsap.from(summary, {
        y: reduceMotion ? 6 : 14,
        autoAlpha: 0,
        duration: reduceMotion ? 0.3 : 0.6,
        ease: 'power2.out',
        scrollTrigger: { trigger: summary, start: 'top 94%', once: true }
      })

      if (variant === 'home') {
        const particles = gsap.utils.toArray<HTMLElement>('[data-aft-particle]')
        const twinkles = gsap.utils.toArray<HTMLElement>('[data-aft-twinkle]')
        const glow = root.querySelector<HTMLElement>('[data-aft-arc-glow]')
        const field = root.querySelector<HTMLElement>('[data-aft-particle-field]')
        const arc = root.querySelector<HTMLElement>('[data-aft-arc-line]')

        particles.forEach((particle, index) => {
          const base = Number(particle.dataset.baseAlpha || 0)
          gsap.set(particle, { autoAlpha: base, scale: base ? 0.58 : 0.18, y: 8, force3D: true })
          const twinkle = twinkles[index]
          if (!twinkle) return
          if (reduceMotion) {
            gsap.set(twinkle, { opacity: index < 7 ? 0.72 : 0.5, scale: 1 })
          } else {
            gsap.fromTo(twinkle,
              { opacity: 0.24, scale: 0.72 },
              {
                opacity: 1,
                scale: 1.34,
                duration: 0.9 + (index % 7) * 0.13,
                delay: (index % 13) * 0.047,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut',
                force3D: true
              }
            )
          }
        })

        if (field) gsap.set(field, { autoAlpha: 0.04, y: 12 })
        if (glow) gsap.set(glow, { opacity: 0, scaleX: 0.70, scaleY: 0.78, transformOrigin: '50% 100%' })
        if (arc) gsap.set(arc, { opacity: 0.58 })

        /* One master ScrollTrigger owns the visible homepage testimonial state.
           The old short trigger completed while the section was still entering
           the viewport, which made the cards look static to the user. */
        ScrollTrigger.create({
          trigger: root,
          start: 'top 25%',
          end: '+=280',
          scrub: 0.42,
          invalidateOnRefresh: true,
          fastScrollEnd: true,
          onUpdate(self) {
            const p = Math.max(0, Math.min(1, self.progress))
            // The marquee columns are time-based (as on the reference); this
            // ScrollTrigger owns only the arc/sparkle progression. Sparkles
            // appear first and the central glow follows after a little scroll.
            const sparkleP = Math.max(0, Math.min(1, (p - 0.015) / 0.78))
            const glowP = Math.max(0, Math.min(1, (p - 0.12) / 0.58))

            particles.forEach((particle, index) => {
              const seed = index < 7
              const threshold = seed ? 0 : 0.035 + (((index * 17) % 61) / 61) * 0.64
              const reveal = seed ? Math.max(0.18, sparkleP) : Math.max(0, Math.min(1, (sparkleP - threshold) * 4.5))
              const opacity = seed
                ? 0.10 + sparkleP * (0.34 + (index % 3) * 0.065)
                : reveal * (0.30 + (index % 6) * 0.085)
              gsap.set(particle, {
                autoAlpha: opacity,
                scale: seed ? 0.52 + sparkleP * 0.44 : 0.16 + reveal * 0.86,
                y: 9 - reveal * 9,
                force3D: true
              })
            })

            if (field) gsap.set(field, { autoAlpha: 0.018 + sparkleP * 0.34, y: 13 - sparkleP * 13 })
            if (glow) gsap.set(glow, {
              '--home-glow': glowP,
              opacity: glowP,
              scaleX: 0.66 + glowP * 0.34,
              scaleY: 0.72 + glowP * 0.28,
              force3D: true
            })
            if (arc) gsap.set(arc, {
              opacity: 0.54 + glowP * 0.46,
              filter: `brightness(${0.82 + glowP * 0.42}) drop-shadow(0 2px ${2 + glowP * 9}px rgba(0,187,160,${0.26 + glowP * 0.60}))`
            })
          }
        })
      }
    }, root)

    if (typeof ResizeObserver !== 'undefined') {
      const ro = new ResizeObserver(scheduleRefresh)
      ro.observe(root)
      const viewport = root.querySelector<HTMLElement>('.aft-home__viewport')
      if (viewport) ro.observe(viewport)
      const images = Array.from(root.querySelectorAll<HTMLImageElement>('img'))
      images.forEach((img) => {
        if (!img.complete) img.addEventListener('load', scheduleRefresh, { once: true })
      })
      ;(document as Document & { fonts?: FontFaceSet }).fonts?.ready.then(scheduleRefresh).catch(() => undefined)
      scheduleRefresh()

      return () => {
        disposed = true
        ro.disconnect()
        window.cancelAnimationFrame(refreshFrame)
        window.clearTimeout(refreshTimer)
        ctx.revert()
      }
    }

    scheduleRefresh()
    return () => {
      disposed = true
      window.cancelAnimationFrame(refreshFrame)
      window.clearTimeout(refreshTimer)
      ctx.revert()
    }
  }, [items, variant])

  if (loading) return <section className={`aft-section aft-section--${variant} is-loading`} aria-busy="true" aria-label="Loading testimonials"><div className="aft-loading-line" /></section>
  if (error || !section || !section.is_enabled || !items.length) return null

  return (
    <section ref={rootRef} className={`aft-section aft-section--${variant}`} data-aft-section={variant} aria-label={`${section.title} testimonials`}>
      {variant === 'home' ? <HomeLayout items={items} copy={section} /> : null}
      {variant === 'brand' ? <HorizontalLayout items={items} copy={section} /> : null}
      {variant === 'digital' ? <MetricLayout items={items} copy={section} digital /> : null}
      {variant === 'strategy' ? <MetricLayout items={items} copy={section} /> : null}
      {variant === 'patient' ? <HorizontalLayout items={items} copy={section} heartLogo patient /> : null}
      {variant === 'website' ? <WebsiteLayout items={items} copy={section} /> : null}
      {variant === 'social' ? <SocialLayout items={items} copy={section} /> : null}
    </section>
  )
}
