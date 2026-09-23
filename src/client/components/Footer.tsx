import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { brand as fallbackBrand, footer as fallbackFooter } from '../data/content'
import { apiGetSettings, apiSubmitInquiry } from '../lib/api'
import { cmsPageSlugFromPath } from '../lib/pageScope'
import { Icon } from './ui'
import PublicIcon from './PublicIcon'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

type FooterProps = {
  fromServicePage?: boolean
}

export default function Footer({ fromServicePage = false }: FooterProps) {
  const footer = fallbackFooter
  const year = new Date().getFullYear()
  const [brand, setBrand] = useState(fallbackBrand)
  const [footerDesc, setFooterDesc] = useState(fallbackFooter.description)
  const extraSocial = [{label:'TikTok',icon:'tiktok',href:''},{label:'LinkedIn',icon:'linkedin',href:''},{label:'X',icon:'x',href:''}]
  const [socialLinks, setSocialLinks] = useState([...fallbackFooter.social,...extraSocial])
  const location = useLocation()
  const page = cmsPageSlugFromPath(location.pathname)
  const isBrandReferencePage = location.pathname === '/solutions/brand-creative-communication'
  const [newsletterStatus, setNewsletterStatus] = useState('')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    apiGetSettings(page)
      .then((res) => {
        if (res?.ok) {
          const s = res.data?.settings
          if (s?.id) {
            setBrand({
              ...fallbackBrand,
              name: s.site_name ?? fallbackBrand.name,
              tagline: s.tagline ?? fallbackBrand.tagline,
              positioning: s.positioning ?? fallbackBrand.positioning,
              phone: (s.phone_display ?? fallbackBrand.phone).replace(/^#?0/, '+92 ').replace(/^#/, ''),
              phoneHref: (s.phone_href ?? fallbackBrand.phoneHref).replace('tel:0','tel:+92'),
              email: s.email ?? fallbackBrand.email,
              whatsapp: s.whatsapp_url ?? fallbackBrand.whatsapp
            })
            setFooterDesc('footer_description' in s ? (s.footer_description ?? '') : fallbackFooter.description)
          } else {
            setBrand(fallbackBrand)
            setFooterDesc(fallbackFooter.description)
          }
        }
        if (res?.ok && Array.isArray(res.data?.social_links)) {
          setSocialLinks(res.data.social_links.map((link: any) => ({
            label: link.label,
            icon: link.icon || 'link',
            href: link.href?.replace('wa.me/920','wa.me/92')
          })).concat(extraSocial.filter(extra=>!res.data.social_links.some((link:any)=>link.label.toLowerCase()===extra.label.toLowerCase()))))
        }
      })
      .catch((error) => console.warn('[Afyra API] Footer settings unavailable; using bundled fallback.', error))
  }, [page])

  useEffect(()=>{
    if(location.pathname!=='/solutions/social-media-community-lead-communication'||window.matchMedia('(prefers-reduced-motion: reduce)').matches)return
    const root=document.querySelector('.social-v90-footer')
    if(!root)return
    const ctx=gsap.context(()=>{
      gsap.fromTo('.social-wordmark-letter',{x:-90,opacity:0},{x:0,opacity:1,stagger:.08,ease:'power2.out',scrollTrigger:{trigger:root.querySelector('.social-v90-footer__wordmark'),start:'top 95%',end:'top 72%',scrub:.7}})
      gsap.to('.social-footer-spark',{y:-24,opacity:.8,duration:2.6,stagger:.12,repeat:-1,yoyo:true,ease:'sine.inOut'})
    },root)
    return ()=>ctx.revert()
  },[location.pathname])

  const homeHref = (href: string) => {
    if (!fromServicePage) return href
    if (href === '#contact') return '/request-consultation'
    return href.startsWith('#') ? `/${href}` : href
  }

  if (location.pathname === '/solutions/digital-growth-marketing-strategy') return <footer className="growth-v91-footer"><div className="af-container"><div className="growth-v91-footer__grid"><div><a className="growth-v91-footer__brand" href="/"><img src="/static/img/logo-mark.png" alt=""/>Afyra Digital</a><h4>Contact</h4><a href={brand.phoneHref}>{brand.phone}</a><h4>Email</h4><a href={`mailto:${brand.email}`}>{brand.email}</a></div><div><h4>Main</h4><a href="/about">About Us</a><a href="/solutions">Our Solutions</a><a href="/healthcare">Healthcare</a><a href="/request-consultation">Get in Touch</a></div><div><h4>Links</h4><a href="#rs-programs">Pricing Plans</a><a href="/insights">Insights</a><a href="/contact">Contact</a></div><div><h4>Newsletter</h4><p>Receive digital growth insights and updates.</p><form onSubmit={async event=>{event.preventDefault();const form=event.currentTarget;setSubmitting(true);try{const result=await apiSubmitInquiry({name:'Newsletter subscriber',business:'Newsletter',contact:String(new FormData(form).get('email')),message:'Please subscribe me to Afyra Digital updates.',page_url:window.location.href});if(!result?.ok)throw new Error();setNewsletterStatus('Subscription request sent.');form.reset()}catch{setNewsletterStatus('Unable to send. Please try again.')}finally{setSubmitting(false)}}}><input name="email" type="email" required placeholder="Enter email address" aria-label="Email address"/><button disabled={submitting} aria-label="Subscribe"><span className="af-diagonal-arrow">↗</span></button></form><p role="status">{newsletterStatus}</p></div></div><div className="growth-v91-footer__wordmark" aria-hidden="true">AfyraDigital</div><div className="growth-v91-footer__bottom"><span>© {year} Afyra Digital. All rights reserved.</span><div>{socialLinks.map(link=><a href={link.href || undefined} key={link.label} target="_blank" rel="noopener noreferrer" aria-label={link.label}><PublicIcon name={/instagram/i.test(link.label)?'instagram':/facebook/i.test(link.label)?'facebook':/linkedin/i.test(link.label)?'linkedin':/tiktok/i.test(link.label)?'tiktok':/^x$/i.test(link.label)?'x':'whatsapp'} size={18}/></a>)}</div></div></div></footer>

  if (location.pathname === '/solutions/social-media-community-lead-communication') return <footer className="social-v90-footer"><div className="af-container">
    <div className="social-v90-footer__row"><a href="/" className="social-v90-footer__logo"><img src="/static/img/logo-mark.png" alt=""/>Afyra Digital</a><h3>Links</h3><nav><a href="/about">About Us</a><a href="#social-contact">Contact</a><a href="#rs-programs">Programs</a><a href="/solutions">Our Solutions</a></nav></div>
    <div className="social-v90-footer__row"><span className="social-footer-light" aria-hidden="true">{Array.from({length:18},(_,i)=><i className="social-footer-spark" key={i} style={{left:`${7+(i*37)%86}%`,top:`${15+(i*23)%70}%`}}/>)}</span><h3>Newsletter</h3><form onSubmit={async event=>{event.preventDefault();const form=event.currentTarget;const email=String(new FormData(form).get('email')||'');setSubmitting(true);try{const result=await apiSubmitInquiry({name:'Newsletter subscriber',business:'Newsletter',contact:email,message:'Please subscribe me to Afyra Digital updates.',page_url:window.location.href});if(!result?.ok)throw new Error();setNewsletterStatus('Subscription request sent.');form.reset()}catch{setNewsletterStatus('Unable to send. Please try again.')}finally{setSubmitting(false)}}}><input type="email" name="email" required aria-label="Email address" placeholder="Enter email address"/><button disabled={submitting} aria-label="Subscribe"><span className="af-diagonal-arrow">↗</span></button><p role="status">{newsletterStatus}</p></form></div>
    <div className="social-v90-footer__row"><strong className="social-v90-footer__wordmark" aria-label="Afyra Digital">{Array.from('Afyra Digital').map((letter,i)=><span aria-hidden="true" className={`social-wordmark-letter ${i>5?'is-accent':''}`} key={i}>{letter===' '?'\u00a0':letter}</span>)}</strong><h3>Social Media</h3><div className="social-v90-footer__social">{Array.from({length:12},(_,index)=>{const linkIndex=[1,4,6,9,3,11].indexOf(index);const link=linkIndex>=0?socialLinks[linkIndex]:undefined;return link?<a key={index} href={link.href || undefined} target="_blank" rel="noopener noreferrer" aria-label={link.label} title={link.label}><PublicIcon name={/whatsapp/i.test(link.label)?'whatsapp':/instagram/i.test(link.label)?'instagram':/facebook/i.test(link.label)?'facebook':/linkedin/i.test(link.label)?'linkedin':/tiktok/i.test(link.label)?'tiktok':/^x$/i.test(link.label)?'x':'social'} size={28}/></a>:<span key={index} aria-hidden="true"/>})}</div></div><div className="social-v90-footer__legal">© {year} Afyra Digital. All rights reserved.</div>
  </div></footer>

  if (location.pathname === '/solutions/digital-presence-advanced-systems') return <footer className="af-digital-footer"><div className="af-container">
    <div className="af-digital-footer__grid">
      <div><a href="/" className="af-digital-footer__logo"><img src="/static/img/logo-mark.png" alt="" />Afyra Digital</a><p>{footerDesc}</p><div className="af-digital-footer__social">{socialLinks.map(link => <a key={link.label} href={link.href || undefined} target="_blank" rel="noopener noreferrer">{link.label}</a>)}</div></div>
      <div><h3>Company</h3><ul>{footer.columns[0].links.map(link => <li key={link.label}><a href={homeHref(link.href)}>{link.label}</a></li>)}</ul></div>
      <div><h3>Contact & Support</h3><ul><li><a href="/request-consultation">Get in touch</a></li><li><a href="#faqs">Common questions</a></li><li><a href={brand.phoneHref}>{brand.phone}</a></li><li><a href={`mailto:${brand.email}`}>{brand.email}</a></li></ul></div>
      <div><h3>Newsletter</h3><p>Receive digital growth insights and product updates.</p><form onSubmit={async event => {
        event.preventDefault(); const form = event.currentTarget; const email = String(new FormData(form).get('email') || ''); setSubmitting(true); setNewsletterStatus('')
        try { const result = await apiSubmitInquiry({name:'Newsletter subscriber',business:'Digital presence newsletter',contact:email,message:'Please add me to the Afyra Digital newsletter. I consent to receiving email updates.',page_url:window.location.href}); if(!result?.ok) throw new Error('Request failed'); setNewsletterStatus('Thanks! Your subscription request has been received.');form.reset() }
        catch {setNewsletterStatus('Please try again. Your request could not be submitted.')} finally {setSubmitting(false)}
      }}><input type="email" name="email" required aria-label="Email address" placeholder="Enter email address" /><button type="submit" disabled={submitting} aria-label="Subscribe"><span className="af-diagonal-arrow">↗</span></button></form><p role="status">{newsletterStatus}</p></div>
    </div><div className="af-digital-footer__bottom"><span>©{year} Afyra Digital. All Rights Reserved.</span><a href="/request-consultation">Let’s build your digital presence</a></div><div className="af-digital-footer__wordmark" aria-hidden="true">Afyra Digital</div>
  </div></footer>

  if (['/solutions/patient-acquisition-lead-generation','/solutions/website-development'].includes(location.pathname)) {
    const patient=location.pathname.includes('patient-acquisition');
    return <footer className={`af-reference-footer ${patient?'is-patient':'is-website'}`}>
      <div className="af-container">
        <div className="af-reference-footer__grid">
          {patient ? <img className="af-reference-footer__robot" src="/static/reference-v86/patient-footer.webp" alt="Afyra digital assistant" loading="lazy"/> : <h2>Build a Website That Builds Your Business.</h2>}
          <div><h3>Company</h3>{footer.columns[0].links.slice(0,5).map(link=><a key={link.label} href={homeHref(link.href)}>{link.label}</a>)}</div>
          <div><h3>Contact & Support</h3><a href={brand.phoneHref}>{brand.phone}</a><a href={`mailto:${brand.email}`}>{brand.email}</a><a href="/request-consultation">Request Consultation</a></div>
          {patient && <div className="af-reference-footer__newsletter"><h3>Newsletter</h3><p>Receive practical insights for growing your practice and improving patient journeys.</p>
            <form onSubmit={async event => {
              event.preventDefault()
              const form = event.currentTarget
              const email = String(new FormData(form).get('email') || '')
              setSubmitting(true); setNewsletterStatus('')
              try {
                const result = await apiSubmitInquiry({name:'Newsletter subscriber', business:'Patient acquisition newsletter', contact:email, message:'Please add me to the Afyra Digital newsletter. I consent to receiving email updates.', page_url:window.location.href})
                if (!result?.ok) throw new Error('Request failed')
                setNewsletterStatus('Thanks! Your subscription request has been received.'); form.reset()
              } catch { setNewsletterStatus('Your request could not be submitted. Please try again.') }
              finally { setSubmitting(false) }
            }}><input type="email" name="email" required autoComplete="email" aria-label="Newsletter email address" placeholder="Enter email address"/><button type="submit" disabled={submitting} aria-label="Subscribe to newsletter">{submitting ? '…' : '↗'}</button></form><p role="status">{newsletterStatus}</p>
          </div>}
        </div>
        {!patient && <a className="af-reference-footer__wordmark" href="/" aria-label="Afyra Digital home"><img src="/static/img/logo-mark.png" alt=""/>Afyra Digital</a>}
        <div className="af-reference-footer__bottom"><span>© {year} Afyra Digital. All rights reserved.</span><div className="af-reference-footer__social">{socialLinks.map(link=><a key={link.label} href={link.href || undefined} target="_blank" rel="noopener noreferrer">{link.label}</a>)}</div></div>
      </div>
    </footer>
  }

  if (isBrandReferencePage) return (
    <footer className="af-footer af-brand-footer">
      <div className="af-container">
        <div className="af-brand-footer__grid">
          <div><h3>Contact Info</h3><div className="af-brand-footer__contact">
            <a href={brand.phoneHref}><span aria-hidden="true">☏</span>{brand.phone}</a>
            <a href={`mailto:${brand.email}`}><span aria-hidden="true">✉</span>{brand.email}</a>
            <a href="/request-consultation"><span aria-hidden="true">⌂</span>Let’s build your brand together.</a>
          </div></div>
          <div><h3>Useful Links</h3><ul>{footer.columns[0].links.map(link => <li key={link.label}><a href={homeHref(link.href)}>{link.label}</a></li>)}</ul></div>
          <div><h3>Connect With Us</h3><ul>{socialLinks.map(link => <li key={link.label}><a href={link.href || undefined} target="_blank" rel="noopener noreferrer">{link.label}</a></li>)}</ul></div>
          <div className="af-brand-footer__newsletter"><h2><span aria-hidden="true">♧</span> Newsletter</h2><p>Get the latest brand communication insights and updates.</p>
            <form onSubmit={async event => {
              event.preventDefault()
              const form = event.currentTarget
              const email = String(new FormData(form).get('email') || '')
              setSubmitting(true); setNewsletterStatus('')
              try {
                const result = await apiSubmitInquiry({ name: 'Newsletter subscriber', business: 'Brand communication newsletter', contact: email, message: 'Please add me to the Afyra Digital newsletter. I consent to receiving email updates.', page_url: window.location.href })
                if (!result?.ok) throw new Error('Unable to subscribe')
                setNewsletterStatus('Thanks! Your subscription request has been received.'); form.reset()
              } catch { setNewsletterStatus('We couldn’t submit your request. Please try again.') }
              finally { setSubmitting(false) }
            }}><label className="af-brand-footer__email-label" htmlFor="brand-newsletter-email">Email address</label><input id="brand-newsletter-email" name="email" type="email" placeholder="Enter email address" required autoComplete="email" /><button type="submit" disabled={submitting}>{submitting ? 'Sending…' : 'Subscribe'}</button></form>
            <p role="status">{newsletterStatus}</p>
          </div>
        </div>
        <a className="af-brand-footer__wordmark" href="/" aria-label="Afyra Digital home"><img src="/static/img/logo-mark.png" alt="" /><span>Afyra Digital</span></a>
        <div className="af-brand-footer__bottom"><a href="/about">About Afyra</a><span>Copyright © Afyra Digital {year}</span><a href="/request-consultation">Contact Us</a></div>
      </div>
    </footer>
  )

  return (
    <footer className="af-footer">
      <div className="af-footer__shape af-footer__shape--l" aria-hidden="true" />
      <div className="af-footer__shape af-footer__shape--r" aria-hidden="true" />

      <div className="af-container">
        <div className="af-footer__wrap">
          <div className="af-footer__brand">
            <a className="af-footer__logo" href={homeHref('/')} aria-label="Afyra Digital home">
              <img src="/static/img/logo-mark.png" alt="" />
              <span className="af-footer__wordmark"><strong>Afyra</strong><em>Digital</em></span>
            </a>
            <p className="af-p af-p--sm af-footer__disc">{footerDesc}</p>
            <p className="af-footer__tagline">{brand.positioning}</p>
            <div className="af-footer__contact" aria-label="Afyra Digital contact details">
              <p><strong>Phone:</strong> <a href={brand.phoneHref}>{brand.phone}</a></p>
              <p><strong>Email:</strong> <a href={`mailto:${brand.email}`}>{brand.email}</a></p>
            </div>
          </div>

          {footer.columns.map((col) => (
            <div className="af-footer__col" key={col.title}>
              <h5 className="af-footer__col-title">{col.title}</h5>
              <ul>
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a href={homeHref(l.href)}>{l.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className={`af-footer__big ${isBrandReferencePage ? 'af-footer__big--brand-reference' : ''}`} aria-hidden="true">
          {isBrandReferencePage ? <img src="/static/img/logo-mark.png" alt="" /> : null}
          <span>Afyra Digital</span>
        </div>

        <div className="af-footer__bottom">
          <p className="af-footer__copy">
            ©{year} <a href={homeHref('/')}>Afyra Digital</a> — All Rights Reserved.
          </p>
          <p className="af-footer__slogan">{brand.tagline}</p>
          <div className="af-footer__social" aria-label="Afyra Digital social links">
            {socialLinks.map((s) => {
              const Ico = (Icon as any)[s.icon] || Icon.whatsapp
              const isExternal = s.href.startsWith('http')
              return (
                <a
                  key={s.label}
                  href={s.href || undefined}
                  aria-label={s.label}
                  title={s.label}
                  {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                >
                  {Ico ? Ico({ size: 22 }) : null}
                </a>
              )
            })}
          </div>
        </div>
      </div>
    </footer>
  )
}
