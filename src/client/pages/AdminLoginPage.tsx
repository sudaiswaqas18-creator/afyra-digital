import { useState, useRef, useEffect, type FormEvent } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import gsap from 'gsap'
import { apiLogin, getToken } from '../lib/api'

export default function AdminLoginPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  const pageRef = useRef<HTMLDivElement>(null)
  const visualSideRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const errorRef = useRef<HTMLDivElement>(null)
  const curtainRef = useRef<HTMLDivElement>(null)

  // Redirect to dashboard if already logged in
  useEffect(() => {
    if (getToken()) {
      navigate('/admin/dashboard', { replace: true })
    }
  }, [navigate])

  // GSAP Entrance Timeline on load
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.fromTo(
        '.af-login-orb',
        { opacity: 0, scale: 0.6 },
        { opacity: 1, scale: 1, duration: 1.4, stagger: 0.2 }
      )
        .fromTo(
          visualSideRef.current,
          { opacity: 0, x: -40 },
          { opacity: 1, x: 0, duration: 0.9 },
          '-=1.0'
        )
        .fromTo(
          cardRef.current,
          { opacity: 0, y: 35, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, duration: 0.85 },
          '-=0.6'
        )
        .fromTo(
          '.af-login-stagger-item',
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.08 },
          '-=0.4'
        )
    }, pageRef)

    return () => ctx.revert()
  }, [])

  // Trigger smooth reveal and shake when an error occurs
  const triggerErrorAnimation = (msg: string) => {
    setErrorMsg(msg)
    if (cardRef.current) {
      gsap.killTweensOf(cardRef.current)
      gsap.fromTo(
        cardRef.current,
        { x: -10 },
        { x: 10, duration: 0.07, repeat: 5, yoyo: true, ease: 'power1.inOut', onComplete: () => {
          gsap.set(cardRef.current, { x: 0 })
        }}
      )
    }
    if (errorRef.current) {
      gsap.fromTo(errorRef.current, { opacity: 0, y: -6 }, { opacity: 1, y: 0, duration: 0.3 })
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setErrorMsg(null)

    if (!email.trim() || !password) {
      triggerErrorAnimation('Please enter both your admin email and password.')
      return
    }

    setIsLoading(true)

    try {
      await apiLogin(email.trim(), password)

      // Smooth GSAP curtain transition into dashboard
      if (curtainRef.current) {
        gsap.to(curtainRef.current, {
          scaleY: 1,
          duration: 0.6,
          ease: 'power3.inOut',
          onComplete: () => {
            navigate('/admin/dashboard')
          }
        })
      } else {
        navigate('/admin/dashboard')
      }
    } catch (err: any) {
      setIsLoading(false)
      triggerErrorAnimation(err.message || 'Invalid email or password.')
    }
  }

  return (
    <div className="af-admin-root" ref={pageRef}>
      <div className="af-login-page">
        {/* Ambient background glow orbs */}
        <div className="af-login-orb af-login-orb--1" aria-hidden="true" />
        <div className="af-login-orb af-login-orb--2" aria-hidden="true" />
        <div className="af-login-orb af-login-orb--3" aria-hidden="true" />

        {/* Left Column: Branded Visual Experience */}
        <div className="af-login-visual-side" ref={visualSideRef}>
          <div className="af-login-brand-header">
            <img src="/static/img/logo-mark.png" alt="Afyra Digital" className="af-login-logo-img" />
            <h1 className="af-login-brand-title">Afyra<span>Digital</span></h1>
          </div>

          <div className="af-login-hero-block">
            <div className="af-login-badge">
              <span className="af-login-badge__dot" />
              <span>Administrative Gateway</span>
            </div>

            <h2 className="af-login-visual-heading">
              Manage Your <em>Growth Engine</em> With Total Control.
            </h2>
            <p className="af-login-visual-p">
              Update healthcare solutions, customize patient programs, publish strategic insights, and monitor incoming client inquiries in real time.
            </p>

            {/* Geometric interactive rotating ring graphic */}
            <div className="af-login-ring-scene">
              <div className="af-login-ring-1" />
              <div className="af-login-ring-2" />
              <div className="af-login-ring-center">
                <img src="/static/img/logo-mark-tight.png" alt="Afyra Icon" />
              </div>
            </div>
          </div>

          <div className="af-login-visual-footer">
            <span>©{new Date().getFullYear()} Afyra Digital Systems</span>
            <span className="af-login-quote-tag">“We Don't Run Ads. We Bring Leads.”</span>
          </div>
        </div>

        {/* Right Column: Refined Glassmorphic Login Form */}
        <div className="af-login-form-side">
          <div className="af-login-card" ref={cardRef}>
            <div className="af-login-card__head">
              <h2 className="af-login-card__title af-login-stagger-item">Admin Portal</h2>
              <p className="af-login-card__subtitle af-login-stagger-item">
                Sign in with authorized administrator credentials.
              </p>
            </div>

            {errorMsg && (
              <div className="af-login-error" ref={errorRef} role="alert">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate>
              <div className="af-input-group af-login-stagger-item">
                <div className="af-input-wrap">
                  <span className="af-input-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  </span>
                  <input
                    id="admin-email"
                    type="email"
                    className="af-admin-input"
                    placeholder="admin@afyradigital.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                    autoComplete="email"
                    required
                  />
                </div>
              </div>

              <div className="af-input-group af-login-stagger-item">
                <div className="af-input-wrap">
                  <span className="af-input-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                  </span>
                  <input
                    id="admin-password"
                    type={showPassword ? 'text' : 'password'}
                    className="af-admin-input"
                    placeholder="••••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                    autoComplete="current-password"
                    required
                  />
                  <button
                    type="button"
                    className="af-input-toggle-btn"
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex={-1}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                        <line x1="1" y1="1" x2="23" y2="23" />
                      </svg>
                    ) : (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="af-login-submit-btn af-login-stagger-item"
                disabled={isLoading}
                id="admin-login-submit"
              >
                {isLoading ? (
                  <>
                    <span className="af-btn-spinner" />
                    <span>Authenticating Session...</span>
                  </>
                ) : (
                  <>
                    <span>Enter Admin Portal</span>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </>
                )}
              </button>

              <div className="af-login-form-footer af-login-stagger-item">
                <Link to="/" className="af-login-back-link">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="19" y1="12" x2="5" y2="12" />
                    <polyline points="12 19 5 12 12 5" />
                  </svg>
                  <span>Return to Public Website</span>
                </Link>
              </div>
            </form>
          </div>
        </div>

        {/* Transition Curtain */}
        <div className="af-login-exit-curtain" ref={curtainRef} />
      </div>
    </div>
  )
}
