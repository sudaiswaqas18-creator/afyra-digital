import { useEffect, useRef, useState, useMemo, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import '../styles/patient-robot-testimonials.css'

gsap.registerPlugin(ScrollTrigger)

export interface PatientTestimonialItem {
  id: string
  doctorName: string
  role: string
  clinic: string
  location: string
  avatar: string
  rating: number
  metricVal: string
  metricLabel: string
  quote: string
  tags: string[]
}

const patientReviews: PatientTestimonialItem[] = [
  {
    id: 'rev-1',
    doctorName: 'Dr. Harris Reynolds',
    role: 'Medical Director',
    clinic: 'Reynolds Aesthetic Clinic',
    location: 'London & Dubai',
    avatar: '/Home-Public/t1-author-1-recolored.webp',
    rating: 5,
    metricVal: '+148%',
    metricLabel: 'Monthly Qualified Inquiries',
    quote: 'Afyra transformed our patient intake completely. Instead of random unqualified clicks, we now receive pre-screened consultation requests from patients who understand our treatments and convert effortlessly.',
    tags: ['Aesthetic Medicine', 'Pre-Screened Leads', 'High Show Rate']
  },
  {
    id: 'rev-2',
    doctorName: 'Dr. Sarah Vance',
    role: 'Lead Orthodontist & Founder',
    clinic: 'Apex Dental & Implant Institute',
    location: 'Manchester',
    avatar: '/Home-Public/t1-author-2-recolored.webp',
    rating: 5,
    metricVal: '3.4x',
    metricLabel: 'Increase in High-Value Cases',
    quote: 'The predictable pipeline Afyra built for our dental implant practice filled our calendar 6 weeks in advance. Their automated WhatsApp booking intake is unmatched in the healthcare sector.',
    tags: ['Dental Implants', 'Calendar Bookings', 'Automated Intake']
  },
  {
    id: 'rev-3',
    doctorName: 'Dr. Michael Al-Rashid',
    role: 'Chief Spine Surgeon',
    clinic: 'Harley Street Spine Center',
    location: 'Harley St, London',
    avatar: '/Home-Public/t1-author-3-recolored.webp',
    rating: 5,
    metricVal: '-92%',
    metricLabel: 'Cost Per Patient Acquisition',
    quote: 'Traditional agencies wasted our budget on vanity metrics. Afyra targeted private insured and self-pay surgical candidates with pinpoint precision. Our consultation volume doubled in 90 days.',
    tags: ['Private Specialists', 'Targeted Acquisition', 'Proven ROI']
  },
  {
    id: 'rev-4',
    doctorName: 'Elena Rostova',
    role: 'Clinic Operations Director',
    clinic: 'Lumina Dermatology Group',
    location: 'Zurich & Geneva',
    avatar: '/Home-Public/t1-author-4-recolored.webp',
    rating: 5,
    metricVal: '210+',
    metricLabel: 'Verified Patient Bookings / Mo',
    quote: 'The integration with our CRM and WhatsApp desk allows our coordinators to confirm patient slots within minutes. Patient trust begins long before they even step into our clinic.',
    tags: ['Dermatology', 'WhatsApp CRM', 'Front-Desk Speed']
  },
  {
    id: 'rev-5',
    doctorName: 'Dr. Tariq Mansoor',
    role: 'Managing Director',
    clinic: 'Emirates Care Polyclinics',
    location: 'Abu Dhabi',
    avatar: '/Home-Public/t1-author-5-recolored.webp',
    rating: 5,
    metricVal: 'Scalable',
    metricLabel: 'Multi-Location Patient Growth',
    quote: 'Afyra is the only growth partner that understands medical ethics, patient acquisition psychology, and clinical authority. They don\'t just run campaigns; they engineer a repeatable acquisition engine.',
    tags: ['Multi-Location', 'Clinical Authority', 'Systemic Engine']
  },
  {
    id: 'rev-6',
    doctorName: 'Dr. Marcus Thorne',
    role: 'Clinical Lead',
    clinic: 'Thorne Regenerative Institute',
    location: 'Edinburgh',
    avatar: '/Home-Public/t1-author-6-recolored.webp',
    rating: 5,
    metricVal: '+220%',
    metricLabel: 'Self-Pay Consultations',
    quote: 'Within 60 days of partnering with Afyra, our private regenerative medicine bookings surged. The precision targeting filters out tire-kickers and brings qualified, committed patients directly to our door.',
    tags: ['Regenerative Care', 'Private Self-Pay', 'Zero Waste']
  }
]

export default function PatientRobotTestimonials() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const stageRef = useRef<HTMLDivElement | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const stRef = useRef<ScrollTrigger | null>(null)

  // Avatar list for heart animation
  const heartAvatars = useMemo(() => [
    '/Home-Public/t1-author-1-recolored.webp',
    '/Home-Public/t1-author-2-recolored.webp',
    '/Home-Public/t1-author-3-recolored.webp',
    '/Home-Public/t1-author-4-recolored.webp',
    '/Home-Public/t1-author-5-recolored.webp',
    '/Home-Public/t1-author-6-recolored.webp'
  ], [])

  // Smooth scroll to card when clicking pill tabs or navigation arrows
  const scrollToCard = useCallback((idx: number) => {
    const targetIdx = Math.max(0, Math.min(patientReviews.length - 1, idx))
    setActiveIndex(targetIdx)

    if (stRef.current) {
      const st = stRef.current
      const start = st.start
      const totalDist = st.end - start
      const targetScroll = start + (targetIdx / (patientReviews.length - 1)) * totalDist + 5

      window.scrollTo({
        top: targetScroll,
        behavior: 'smooth'
      })
    }
  }, [])

  // GSAP Scroll Stacking Animation
  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const ctx = gsap.context(() => {
      // Header entrance
      gsap.from('.pa-head > *', {
        y: reduceMotion ? 10 : 25,
        autoAlpha: 0,
        duration: reduceMotion ? 0.35 : 0.75,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', once: true }
      })

      const cards = gsap.utils.toArray<HTMLElement>('.pa-stack-card')
      const totalCards = cards.length

      if (totalCards <= 1) return

      // Initial card states: only Card 0 visible; Cards 1..N hidden below with visibility: hidden
      cards.forEach((card, i) => {
        gsap.set(card, {
          zIndex: i + 1,
          yPercent: i === 0 ? 0 : 100,
          opacity: i === 0 ? 1 : 0,
          visibility: i === 0 ? 'visible' : 'hidden',
          scale: i === 0 ? 1 : 0.95,
          pointerEvents: i === 0 ? 'auto' : 'none'
        })
      })

      // Pinned Scroll Stacking Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: stage,
          start: 'top 18%',
          end: () => `+=${(totalCards - 1) * 700}`,
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
          onUpdate: (self) => {
            const p = self.progress
            const calculatedIndex = Math.min(
              totalCards - 1,
              Math.max(0, Math.round(p * (totalCards - 1)))
            )
            setActiveIndex(calculatedIndex)
          }
        }
      })

      stRef.current = tl.scrollTrigger || null

      // Build each step:
      // Card i enters cleanly from bottom with 0% peeking
      // Card i-1 recedes gracefully (scale 0.96, y -12px, opacity 0.5)
      // Earlier cards (i-2, etc.) fade out so the background deck remains ultra clean
      for (let i = 1; i < totalCards; i++) {
        const step = `card-${i}`

        // Fade out earlier card i-2 if exists
        if (i >= 2) {
          tl.to(cards[i - 2], {
            opacity: 0,
            scale: 0.92,
            y: -24,
            duration: 0.8,
            ease: 'power1.inOut'
          }, step)
        }

        // Card i-1 recedes into subtle background deck ledge
        tl.to(cards[i - 1], {
          scale: 0.96,
          y: -12,
          opacity: 0.55,
          duration: 1,
          ease: 'power2.inOut'
        }, step)

        // Card i becomes visible and glides up smoothly to stack on top
        tl.set(cards[i], { visibility: 'visible', pointerEvents: 'auto' }, step)
        tl.fromTo(cards[i], 
          { yPercent: 100, opacity: 0, scale: 0.96 },
          { yPercent: 0, opacity: 1, scale: 1, duration: 1, ease: 'power2.out' },
          step
        )
      }
    }, stage)

    return () => ctx.revert()
  }, [])

  return (
    <section 
      ref={sectionRef} 
      className="pa-testimonials-section" 
      aria-label="Patient Acquisition Verified Doctor Testimonials"
    >
      <div className="pa-container">
        {/* Heart + Heading */}
        <div className="pa-head">
          {/* Authentic Afyra Heart Animation */}
          <div className="aft-patient-heart" aria-hidden="true">
            <svg className="aft-patient-heart__shape" viewBox="0 0 240 190" fill="none">
              <defs>
                <linearGradient id="pa-patient-heart-fill" x1="0" y1="0" x2="0" y2="1">
                  <stop stopColor="#00bba0" stopOpacity=".24" />
                  <stop offset="1" stopColor="#def1f0" stopOpacity=".05" />
                </linearGradient>
                <pattern id="pa-patient-heart-lines" width="5" height="190" patternUnits="userSpaceOnUse">
                  <path d="M1 0V190" stroke="#00bba0" strokeOpacity=".35" />
                </pattern>
              </defs>
              <path 
                d="M120 184C94 165 6 107 6 61C6 5 75 -13 120 39C165 -13 234 5 234 61C234 107 146 165 120 184Z" 
                fill="url(#pa-patient-heart-fill)" 
                stroke="#c5efe8" 
                strokeWidth="4" 
              />
              <path 
                d="M120 184C94 165 6 107 6 61C6 5 75 -13 120 39C165 -13 234 5 234 61C234 107 146 165 120 184Z" 
                fill="url(#pa-patient-heart-lines)" 
              />
            </svg>
            <div className="aft-patient-heart__window">
              <div className="aft-patient-heart__track">
                {[0, 1].map((copy) => (
                  <div className="aft-patient-heart__set" key={copy}>
                    {heartAvatars.map((src, idx) => (
                      <span key={`${copy}-${idx}`}>
                        <img src={src} alt="" loading="lazy" />
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            </div>
            <div className="aft-patient-heart__logo">
              <img src="/static/img/logo-mark.png" alt="Afyra Logo" />
            </div>
          </div>

          <span className="pa-eyebrow">
            <i />Verified Clinical Outcomes
          </span>
          <h2>What Practice Leaders Say About <span>Afyra's Acquisition Engine</span></h2>
          <p>Real verified results from clinics, dental institutes, and specialist practices scaling their private inquiries with Afyra.</p>
        </div>

        {/* Pinned Card Stacking Stage */}
        <div className="pa-stack-wrapper" ref={stageRef}>
          {/* Top Bar: Progress Counter & Doctor Pills */}
          <div className="pa-stack-nav">
            <div className="pa-stack-counter" aria-label={`Card ${activeIndex + 1} of ${patientReviews.length}`}>
              <div className="pa-count-badge">
                <span className="pa-count-current">{String(activeIndex + 1).padStart(2, '0')}</span>
                <span className="pa-count-sep">/</span>
                <span className="pa-count-total">{String(patientReviews.length).padStart(2, '0')}</span>
              </div>
              <span className="pa-count-hint">Scroll To Next Review</span>
            </div>

            <div className="pa-stack-pills" role="tablist" aria-label="Select doctor review">
              {patientReviews.map((item, idx) => (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={idx === activeIndex}
                  className={`pa-pill-btn ${idx === activeIndex ? 'is-active' : ''}`}
                  onClick={() => scrollToCard(idx)}
                >
                  <span className="pa-pill-dot" />
                  <span>{item.doctorName.replace('Dr. ', '')}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Cards Deck (Stacked Cards) */}
          <div className="pa-stack-deck">
            {patientReviews.map((item, idx) => (
              <article
                key={item.id}
                className="pa-stack-card"
                data-card-index={idx}
              >
                {/* Header: Rating & Verified Badge */}
                <div className="pa-card-header">
                  <div className="pa-card-header__left">
                    <span className="pa-rating-stars">{'★'.repeat(item.rating)}</span>
                    <span className="pa-rating-score">5.0 / 5.0 Rating</span>
                  </div>
                  <div className="pa-card-badge">
                    <svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" /></svg>
                    Verified Practice Partner
                  </div>
                </div>

                {/* Metric Banner Chip */}
                <div className="pa-metric-banner">
                  <span className="pa-metric-banner__val">{item.metricVal}</span>
                  <span className="pa-metric-banner__label">{item.metricLabel}</span>
                </div>

                {/* Quote with Stylized Mark */}
                <div className="pa-card-quote-wrap">
                  <span className="pa-card-quote-mark" aria-hidden="true">“</span>
                  <blockquote className="pa-card-quote">{item.quote}</blockquote>
                </div>

                {/* Author Info & Clinical Tags */}
                <div className="pa-card-author">
                  <div className="pa-card-author__profile">
                    <div className="pa-author-avatar-wrap">
                      <img 
                        src={item.avatar} 
                        alt={item.doctorName} 
                        className="pa-author-avatar" 
                        width="58" 
                        height="58" 
                      />
                      <span className="pa-author-verified-dot" title="Verified Practitioner">
                        <svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" /></svg>
                      </span>
                    </div>
                    <div className="pa-author-meta">
                      <strong>{item.doctorName}</strong>
                      <span>{item.role} · {item.clinic} ({item.location})</span>
                    </div>
                  </div>
                  <div className="pa-card-tags">
                    {item.tags.map((tag) => (
                      <span key={tag} className="pa-tag">{tag}</span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Bottom Controls: Direct Nav Dots & Prev/Next Arrows */}
          <div className="pa-deck-controls">
            <div className="pa-deck-dots">
              {patientReviews.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={`pa-deck-dot ${idx === activeIndex ? 'is-active' : ''}`}
                  onClick={() => scrollToCard(idx)}
                  aria-label={`Scroll to testimonial ${idx + 1}`}
                />
              ))}
            </div>

            <div className="pa-deck-arrows">
              <button
                type="button"
                className="pa-deck-arrow"
                onClick={() => scrollToCard(activeIndex - 1)}
                disabled={activeIndex === 0}
                aria-label="Previous review"
              >
                ←
              </button>
              <button
                type="button"
                className="pa-deck-arrow"
                onClick={() => scrollToCard(activeIndex + 1)}
                disabled={activeIndex === patientReviews.length - 1}
                aria-label="Next review"
              >
                →
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Social Proof Summary Bar */}
        <div className="pa-summary-bar">
          <div className="pa-summary-avatars">
            {patientReviews.slice(0, 5).map((item, i) => (
              <img key={i} src={item.avatar} alt="" className="pa-summary-avatar" />
            ))}
          </div>
          <span className="pa-summary-text">
            Join 200+ healthcare practices & clinics scaling private patient volume
          </span>
          <div className="pa-summary-rating">
            ★★★★★ <span>4.98 / 5.0</span>
          </div>
          <a href="#contact" className="pa-summary-cta">
            Schedule Practice Strategy <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </section>
  )
}
