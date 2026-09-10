import { useState } from 'react'
import { cta } from '../data/content'
import { Button, Icon } from './ui'
import Dashboard from './Dashboard'

type Status = 'idle' | 'sending' | 'done' | 'error'

export default function Cta() {
  const [status, setStatus] = useState<Status>('idle')
  const [form, setForm] = useState({ name: '', business: '', contact: '', message: '' })

  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }))

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (status === 'sending') return
    setStatus('sending')
    try {
      const res = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      if (!res.ok) throw new Error('request failed')
      setStatus('done')
      setForm({ name: '', business: '', contact: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="af-section af-cta">
      <div className="af-container">
        <div className="af-cta__wrap af-reveal">
          <div className="af-cta__bg" aria-hidden="true" />
          <div className="af-cta__glow af-cta__glow--1" data-af-breathe aria-hidden="true" />
          <div className="af-cta__glow af-cta__glow--2" data-af-breathe aria-hidden="true" />

          <div className="af-cta__content">
            <h2 className="af-h2 af-cta__title">{cta.title}</h2>
            <p className="af-p af-cta__disc">{cta.description}</p>

            {status === 'done' ? (
              <div className="af-cta__done" role="status">
                <span className="af-cta__done-ico">{Icon.check({ size: 22 })}</span>
                <div>
                  <p className="af-cta__done-title">Thank you — your request is in.</p>
                  <p className="af-p af-p--sm">
                    We will review your details and get back to you to arrange the consultation.
                  </p>
                </div>
              </div>
            ) : (
              <form className="af-cta__form" onSubmit={submit}>
                <div className="af-cta__form-row">
                  <input
                    type="text"
                    placeholder="Your name"
                    aria-label="Your name"
                    required
                    value={form.name}
                    onChange={update('name')}
                  />
                  <input
                    type="text"
                    placeholder="Clinic / business name"
                    aria-label="Clinic or business name"
                    required
                    value={form.business}
                    onChange={update('business')}
                  />
                </div>
                <input
                  type="text"
                  placeholder="WhatsApp number or email"
                  aria-label="WhatsApp number or email"
                  required
                  value={form.contact}
                  onChange={update('contact')}
                />
                <textarea
                  rows={3}
                  placeholder="What growth outcome are you looking for?"
                  aria-label="What growth outcome are you looking for?"
                  value={form.message}
                  onChange={update('message')}
                />
                <div className="af-cta__form-actions">
                  <Button
                    type="submit"
                    label={status === 'sending' ? 'Sending…' : cta.buttonLabel}
                    variant="primary"
                  />
                  {status === 'error' ? (
                    <span className="af-cta__err">
                      Something went wrong. Please try again.
                    </span>
                  ) : null}
                </div>
                <p className="af-cta__notice">{cta.notice}</p>
              </form>
            )}
          </div>

          <div className="af-cta__visual" aria-hidden="true">
            <span className="af-cta__visual-layer af-cta__visual-layer--1" />
            <span className="af-cta__visual-layer af-cta__visual-layer--2" />
            <div className="af-cta__visual-db">
              <Dashboard />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
