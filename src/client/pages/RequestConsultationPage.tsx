import { useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ScrollTop from '../components/ScrollTop'
import Marquee from '../components/Marquee'
import SectionLabel from '../components/SectionLabel'
import CardVisual from '../components/CardVisual'
import PublicIcon from '../components/PublicIcon'
import SemanticCardIcon from '../components/SemanticCardIcon'
import { brand, cta, faqs, process } from '../data/content'
import { cardKey } from '../data/cardDetails'
import { usePageSeo } from '../lib/usePageSeo'
import { useMarketingAnimations } from '../lib/useMarketingAnimations'
import { useSaasKingEffects } from '../lib/useSaasKingEffects'
import { apiSubmitInquiry } from '../lib/api'
import { useLiveProgramsData } from '../lib/useLiveProgramsData'
import { useLiveSolutionsNav } from '../lib/useLiveSolutionsNav'

type Status = 'idle' | 'sending' | 'done' | 'error'

type ConsultationForm = {
  name: string
  business: string
  contact: string
  interest: string
  message: string
}

const consultationBenefits = [
  {
    title: 'Start With the Business Objective',
    body: 'The conversation begins with the growth outcome you need rather than a list of isolated marketing tasks.',
    key: 'consultation-business-objective'
  },
  {
    title: 'Connect the Right Growth System',
    body: 'Strategy, content, visibility, lead communication, local discovery and conversion are considered as connected parts of the journey.',
    key: 'consultation-connected-growth-system'
  },
  {
    title: 'Leave With a Clear Next Step',
    body: 'The goal is a clear conversation about the approach and the program or solution that fits your current stage.',
    key: 'consultation-clear-next-step'
  }
]

export default function RequestConsultationPage() {
  const [status, setStatus] = useState<Status>('idle')
  const [form, setForm] = useState<ConsultationForm>({ name: '', business: '', contact: '', interest: '', message: '' })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const programs = useLiveProgramsData()
  const serviceNav = useLiveSolutionsNav()

  usePageSeo(
    'Request a Consultation | Afyra Digital',
    'Request a consultation with Afyra Digital to discuss your business, growth objective, digital visibility, patient acquisition, brand positioning or marketing program needs.',
    '/request-consultation'
  )
  useMarketingAnimations('request-consultation')
  useSaasKingEffects()

  const validateField = (key: keyof ConsultationForm, val: string): string => {
    const v = val.trim()
    if (key === 'name') {
      if (!v) return 'Please enter your full name.'
      if (v.length < 2) return 'Name must be at least 2 characters.'
    }
    if (key === 'business') {
      if (!v) return 'Please enter your clinic or business name.'
    }
    if (key === 'contact') {
      if (!v) return 'Please provide your WhatsApp number or email.'
      const hasAt = v.includes('@') && v.includes('.')
      const digits = v.replace(/\D/g, '')
      if (!hasAt && digits.length < 7) {
        return 'Please enter a valid phone number (at least 7 digits) or email address.'
      }
    }
    if (key === 'interest') {
      if (!v) return 'Please select an area of interest.'
    }
    if (key === 'message') {
      if (!v) return 'Please share a brief note on what outcome you want to strengthen.'
      if (v.length < 5) return 'Please provide a little more detail.'
    }
    return ''
  }

  const update = (key: keyof ConsultationForm) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const val = event.target.value
    setForm((current) => ({ ...current, [key]: val }))
    if (errors[key]) {
      const fieldError = validateField(key, val)
      setErrors((prev) => {
        const next = { ...prev }
        if (!fieldError) delete next[key]
        else next[key] = fieldError
        return next
      })
    }
  }

  const handleBlur = (key: keyof ConsultationForm) => () => {
    const err = validateField(key, form[key])
    if (err) {
      setErrors((prev) => ({ ...prev, [key]: err }))
    }
  }

  async function submit(event: React.FormEvent) {
    event.preventDefault()
    if (status === 'sending') return

    const newErrors: Record<string, string> = {}
    ;(Object.keys(form) as Array<keyof ConsultationForm>).forEach((k) => {
      const err = validateField(k, form[k])
      if (err) newErrors[k] = err
    })

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      const firstKey = Object.keys(newErrors)[0]
      const el = document.querySelector(`[name="${firstKey}"]`) as HTMLElement
      if (el) el.focus()
      return
    }

    setStatus('sending')
    try {
      const message = [form.interest ? `Area of interest: ${form.interest}` : '', form.message].filter(Boolean).join('\n\n')
      await apiSubmitInquiry({
        name: form.name.trim(),
        business: form.business.trim(),
        contact: form.contact.trim(),
        message,
        page_url: window.location.href
      })
      setStatus('done')
      setForm({ name: '', business: '', contact: '', interest: '', message: '' })
      setErrors({})
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="px-page px-theme-light rq-page">
      <Header fromServicePage />
      <main>
        <section className="rq-hero">
          <div className="rq-hero__orb rq-hero__orb--one" data-px-parallax="70" aria-hidden="true" />
          <div className="rq-hero__orb rq-hero__orb--two" data-px-parallax="-55" aria-hidden="true" />
          <div className="af-container rq-hero__grid">
            <div className="rq-hero__copy">
              <span className="px-kicker" data-px-reveal>Request consultation</span>
              <h1 data-px-chars>Tell Us the Growth Outcome You Want to Strengthen.</h1>
              <p className="rq-lead">{cta.description}</p>
              <p className="rq-notice">{cta.notice}</p>
              <div className="rq-hero__actions" data-px-reveal>
                <a className="px-btn px-btn--primary" href="#consultation-form"><span>Start Your Request</span><PublicIcon name="arrowRight" size={17} /></a>
                <Link className="px-btn px-btn--ghost" to="/programs"><span>Compare Programs</span><PublicIcon name="arrowRight" size={17} /></Link>
              </div>
              <p className="rq-positioning">{brand.positioning}</p>
            </div>
            <div className="rq-hero__visual" data-px-image-reveal>
              <CardVisual assetKey="healthcare-journey-inquiry-detail" label="Afyra Digital consultation and inquiry journey" priority />
              <div className="rq-hero__metric rq-hero__metric--one"><SemanticCardIcon assetKey="strategy" size={22} /><span>Strategy first</span></div>
              <div className="rq-hero__metric rq-hero__metric--two"><SemanticCardIcon assetKey="appointment-opportunity" size={22} /><span>Clear next step</span></div>
            </div>
          </div>
        </section>

        <Marquee />

        <section className="rq-section rq-form-section" id="consultation-form">
          <div className="af-container rq-form-grid">
            <div className="rq-form-copy">
              <SectionLabel text="Start the conversation" />
              <h2>Share the Context. We’ll Start With the Right Questions.</h2>
              <p>{process.steps[0].description}</p>
              <div className="rq-form-copy__cards" data-px-stagger>
                <div className="rq-mini-card"><SemanticCardIcon assetKey="patient-trust" size={24} /><div><strong>Healthcare-aware</strong><span>Doctors, clinics, hospitals and aesthetic/cosmetic centers are Afyra’s strongest current specialization.</span></div></div>
                <div className="rq-mini-card"><SemanticCardIcon assetKey="growth-strategy" size={24} /><div><strong>Strategy before activity</strong><span>The discussion stays focused on positioning, systems and business outcomes.</span></div></div>
              </div>
            </div>

            <div className="rq-form-shell" data-px-image-reveal>
              {status === 'done' ? (
                <div className="rq-form-success" role="status">
                  <span className="rq-form-success__icon"><PublicIcon name="check" size={24} /></span>
                  <span className="px-kicker">Request received</span>
                  <h2>Thank You. Your Consultation Request Is In.</h2>
                  <p>We will review the information you submitted and use it to prepare for the next conversation.</p>
                  <Link className="px-btn px-btn--ghost" to="/"><span>Return Home</span><PublicIcon name="arrowRight" size={17} /></Link>
                </div>
              ) : (
                <form className="rq-form" onSubmit={submit} noValidate>
                  <div className="rq-form__head">
                    <span className="px-kicker">Consultation request</span>
                    <h2>Tell Us About Your Business.</h2>
                    <p>Required fields help us understand who you are and how to contact you.</p>
                  </div>
                  <div className="rq-field-grid">
                    <label>
                      <span>Your name *</span>
                      <input
                        type="text"
                        name="name"
                        className={errors.name ? 'is-invalid' : ''}
                        value={form.name}
                        onChange={update('name')}
                        onBlur={handleBlur('name')}
                        placeholder="Your name"
                      />
                      {errors.name && <span className="rq-field-error">⚠ {errors.name}</span>}
                    </label>
                    <label>
                      <span>Clinic / business name *</span>
                      <input
                        type="text"
                        name="business"
                        className={errors.business ? 'is-invalid' : ''}
                        value={form.business}
                        onChange={update('business')}
                        onBlur={handleBlur('business')}
                        placeholder="Business name"
                      />
                      {errors.business && <span className="rq-field-error">⚠ {errors.business}</span>}
                    </label>
                  </div>
                  <label>
                    <span>WhatsApp number or email *</span>
                    <input
                      type="text"
                      name="contact"
                      className={errors.contact ? 'is-invalid' : ''}
                      value={form.contact}
                      onChange={update('contact')}
                      onBlur={handleBlur('contact')}
                      placeholder="e.g. 0300-1234567 or doctor@clinic.com"
                    />
                    {errors.contact && <span className="rq-field-error">⚠ {errors.contact}</span>}
                  </label>
                  <label>
                    <span>Area of interest *</span>
                    <select
                      name="interest"
                      className={errors.interest ? 'is-invalid' : ''}
                      value={form.interest}
                      onChange={update('interest')}
                      onBlur={handleBlur('interest')}
                    >
                      <option value="">Select an area</option>
                      {serviceNav.map((service) => <option key={service.href} value={service.name}>{service.name}</option>)}
                      <option value="Marketing Programs">Marketing Programs</option>
                    </select>
                    {errors.interest && <span className="rq-field-error">⚠ {errors.interest}</span>}
                  </label>
                  <label>
                    <span>What growth outcome are you looking for? *</span>
                    <textarea
                      name="message"
                      rows={5}
                      className={errors.message ? 'is-invalid' : ''}
                      value={form.message}
                      onChange={update('message')}
                      onBlur={handleBlur('message')}
                      placeholder="Tell us what you want to improve — visibility, trust, inquiries, patient acquisition, digital presence, positioning or another business outcome."
                    />
                    {errors.message && <span className="rq-field-error">⚠ {errors.message}</span>}
                  </label>
                  <div className="rq-form__actions">
                    <button className="px-btn px-btn--primary" type="submit" disabled={status === 'sending'}>
                      <span>{status === 'sending' ? 'Submitting Request…' : 'Request Consultation'}</span>
                      <PublicIcon name="arrowRight" size={17} />
                    </button>
                    {status === 'error' ? <span className="rq-form__error">Something went wrong. Please try again.</span> : null}
                  </div>
                  <p className="rq-form__notice">{cta.notice}</p>
                </form>
              )}
            </div>
          </div>
        </section>

        <section className="rq-section rq-benefits">
          <div className="af-container">
            <div className="rq-section-head">
              <SectionLabel text="What the conversation is for" />
              <h2>Clarity Before Commitment.</h2>
              <p>A consultation should help clarify the business objective, the right growth system and the next practical step.</p>
            </div>
            <div className="rq-benefits__grid" data-px-stagger>
              {consultationBenefits.map((item, index) => (
                <article className="rq-benefit-card" key={item.title}>
                  <span className="rq-benefit-card__num">0{index + 1}</span>
                  <SemanticCardIcon assetKey={item.key} size={28} />
                  <h3 data-px-heading>{item.title}</h3>
                  <p>{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="rq-section rq-process">
          <div className="af-container rq-process__grid">
            <div className="rq-process__intro" data-px-pin-content>
              <SectionLabel text="What happens next" />
              <h2>{process.title}</h2>
              <p>{process.description}</p>
              <Link className="px-btn px-btn--ghost" to="/about"><span>About Afyra</span><PublicIcon name="arrowRight" size={17} /></Link>
            </div>
            <ol className="rq-process__steps" data-px-stagger>
              {process.steps.map((step) => (
                <li key={step.number}>
                  <span className="rq-process__num">0{step.number}</span>
                  <SemanticCardIcon assetKey={step.title} size={24} />
                  <div><h3 data-px-heading>{step.title}</h3><p>{step.description}</p></div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="rq-section rq-program-context">
          <div className="af-container rq-program-context__grid">
            <div className="rq-program-context__visual" data-px-image-reveal>
              <CardVisual assetKey={cardKey('programs','plan','growth')} label="Patient Growth Plan consultation context" />
            </div>
            <div className="rq-program-context__copy">
              <SectionLabel text="Current programs" />
              <h2>Already Comparing Programs?</h2>
              <p>Afyra currently has three approved marketing programs: Starter Presence, Patient Growth Plan and Authority Building Plan. Customized programs are also available according to business requirements.</p>
              <div className="rq-program-context__list" data-px-stagger>
                {programs.plans.map((plan) => <div key={plan.id}><strong>{plan.name}</strong><span>PKR {plan.price.toLocaleString()}/month</span></div>)}
              </div>
              <Link className="px-btn px-btn--primary" to="/programs"><span>View Programs & Pricing</span><PublicIcon name="arrowRight" size={17} /></Link>
            </div>
          </div>
        </section>

        <section className="rq-section rq-faq">
          <div className="af-container rq-faq__grid">
            <div className="rq-faq__intro">
              <SectionLabel text="Questions before you submit" />
              <h2>{faqs.title}</h2>
              <p>{faqs.description}</p>
            </div>
            <div className="rq-faq__items" data-px-stagger>
              {faqs.items.slice(0, 5).map((item) => <details key={item.q}><summary>{item.q}<span>+</span></summary><p>{item.a}</p></details>)}
            </div>
          </div>
        </section>

        <section className="rq-final">
          <div className="af-container">
            <div className="rq-final__box" data-px-image-reveal>
              <SectionLabel text={brand.tagline} />
              <h2>{cta.title}</h2>
              <p>{cta.description}</p>
              <a className="px-btn px-btn--primary" href="#consultation-form"><span>Start Your Consultation Request</span><PublicIcon name="arrowRight" size={17} /></a>
            </div>
          </div>
        </section>
      </main>
      <Footer fromServicePage />
      <ScrollTop />
    </div>
  )
}
