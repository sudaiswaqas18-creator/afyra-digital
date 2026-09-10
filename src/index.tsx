import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { serviceBySlug } from './client/data/servicePages'
import { sitePageSeo, type SitePageKey } from './client/data/sitePages'
import { cardBySlug, cardMetaDescription, cardSeoTitle } from './client/data/cardDetails'
import { brand } from './client/data/content'

type AssetBinding = { fetch(input: Request | string | URL, init?: RequestInit): Promise<Response> }
type AppEnv = { Bindings: { ASSETS?: AssetBinding; INQUIRY_WEBHOOK_URL?: string } }

const app = new Hono<AppEnv>()
const isDev = import.meta.env.DEV

app.use('/api/*', cors())

/* ---------------- API: consultation inquiry ---------------- */
app.post('/api/inquiry', async (c) => {
  try {
    const body = await c.req.json<{
      name?: string
      business?: string
      contact?: string
      message?: string
      website?: string
    }>()

    const name = body.name?.trim() ?? ''
    const business = body.business?.trim() ?? ''
    const contact = body.contact?.trim() ?? ''
    const message = body.message?.trim() ?? ''

    if (body.website?.trim()) return c.json({ ok: true, delivered: false })
    if (!name || !business || !contact) {
      return c.json({ ok: false, error: 'Name, business and contact are required.' }, 400)
    }
    if (name.length > 120 || business.length > 160 || contact.length > 180 || message.length > 4000) {
      return c.json({ ok: false, error: 'One or more fields are too long.' }, 400)
    }

    const webhookUrl = c.env?.INQUIRY_WEBHOOK_URL?.trim()
    if (!webhookUrl) {
      console.error('[afyra:inquiry] INQUIRY_WEBHOOK_URL is not configured.')
      return c.json({ ok: false, error: 'Inquiry delivery is not configured.' }, 503)
    }

    const payload = {
      source: 'Afyra Digital website',
      submittedAt: new Date().toISOString(),
      page: c.req.header('referer') || '',
      name,
      business,
      contact,
      message
    }

    const webhookResponse = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })

    if (!webhookResponse.ok) {
      console.error('[afyra:inquiry] Webhook delivery failed.', webhookResponse.status)
      return c.json({ ok: false, error: 'Inquiry delivery failed. Please try again.' }, 502)
    }

    return c.json({ ok: true, delivered: true })
  } catch (error) {
    console.error('[afyra:inquiry] Invalid request or delivery error.', error)
    return c.json({ ok: false, error: 'Invalid request.' }, 400)
  }
})

app.get('/api/health', (c) => c.json({ ok: true, service: 'afyra-digital' }))

/* ---------------- static assets in Pages advanced mode ----------------
   _worker.js owns every request, so explicitly forward public assets to the
   Pages ASSETS binding before the HTML catch-all. */
const assetRoutes = ['/static/*', '/generated/*', '/Home-Public/*'] as const
// In Cloudflare Pages production, _worker.js owns asset requests and must forward
// them to ASSETS. During Vite development, Vite's own public/source middleware
// serves these paths; registering the production handler there would return 503
// because a local ASSETS binding does not exist.
if (!isDev) {
  assetRoutes.forEach((route) => {
    app.get(route, async (c) => {
      const assets = c.env?.ASSETS
      if (!assets) return c.text('Static asset binding unavailable.', 503)
      return assets.fetch(c.req.raw)
    })
  })
}

/* ---------------- crawl support ---------------- */
app.get('/robots.txt', (c) => {
  const url = new URL(c.req.url)
  const origin = `${url.protocol}//${url.host}`
  return c.text(`User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`)
})

app.get('/sitemap.xml', (c) => {
  const url = new URL(c.req.url)
  const origin = `${url.protocol}//${url.host}`
  const pagePaths = ['/', ...Object.values(sitePageSeo).map((item) => item.path)]
  const servicePaths = Object.values(serviceBySlug).map((item) => `/solutions/${item.slug}`)
  const detailPaths = Object.values(cardBySlug).map((item) => `/details/${item.slug}`)
  const paths = Array.from(new Set([...pagePaths, ...servicePaths, ...detailPaths]))
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${paths.map((path) => `  <url><loc>${origin}${path}</loc></url>`).join('\n')}\n</urlset>`
  return c.body(xml, 200, { 'Content-Type': 'application/xml; charset=UTF-8' })
})

app.get('/contact', (c) => c.redirect('/request-consultation', 302))

/* ---------------- page shell + route-aware SEO ---------------- */
const HOME_TITLE = 'Afyra Digital — Digital Growth & Marketing Agency for Healthcare'
const HOME_DESC =
  'Afyra Digital is a digital growth and marketing agency helping doctors, clinics, hospitals and aesthetic centers build trust, stay visible and generate qualified patient inquiries.'

const html = (value: string) => value.replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char] || char)

app.get('*', (c) => {
  const url = new URL(c.req.url)
  const origin = `${url.protocol}//${url.host}`
  const match = url.pathname.match(/^\/solutions\/([^/]+)\/?$/)
  const service = match ? serviceBySlug[decodeURIComponent(match[1])] : undefined
  const detailMatch = url.pathname.match(/^\/details\/([^/]+)\/?$/)
  const detail = detailMatch ? cardBySlug[decodeURIComponent(detailMatch[1])] : undefined
  const pageEntry = (Object.entries(sitePageSeo) as [SitePageKey, (typeof sitePageSeo)[SitePageKey]][]).find(([, value]) => value.path === url.pathname.replace(/\/$/, '') || (value.path === '/' && url.pathname === '/'))
  const pageSeo = pageEntry?.[1]
  const path = detail ? `/details/${detail.slug}` : service ? `/solutions/${service.slug}` : (pageSeo?.path ?? '/')
  const title = detail ? cardSeoTitle(detail) : service?.seo.title ?? pageSeo?.title ?? HOME_TITLE
  const description = detail ? cardMetaDescription(detail) : service?.seo.description ?? pageSeo?.description ?? HOME_DESC
  const canonical = `${origin}${path}`

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Afyra Digital',
    description: HOME_DESC,
    slogan: "We Don't Run Ads. We Bring Leads.",
    url: origin,
    logo: `${origin}/static/img/logo-full.png`,
    telephone: brand.phone.replace(/[^0-9+]/g, ''),
    email: brand.email,
    areaServed: 'PK',
    serviceType: [
      'Digital Growth & Marketing Strategy',
      'Social Media & Brand Management',
      'Patient Acquisition & Lead Generation',
      'Search & Local Visibility',
      'Brand & Digital Presence',
      'Content & Creative Communication'
    ],
    knowsAbout: ['Healthcare Marketing', 'Patient Acquisition', 'Local SEO']
  }

  const serviceSchema = service ? {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.seo.description,
    serviceType: service.name,
    provider: { '@type': 'Organization', name: 'Afyra Digital', url: origin },
    url: canonical
  } : null

  const detailSchema = detail ? {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: detail.title,
    description: detail.summary,
    url: canonical,
    isPartOf: { '@type': 'WebSite', name: 'Afyra Digital', url: origin },
    about: { '@type': 'Thing', name: detail.title },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: origin },
        { '@type': 'ListItem', position: 2, name: detail.parentTitle, item: `${origin}${detail.parentPath}` },
        { '@type': 'ListItem', position: 3, name: detail.title, item: canonical }
      ]
    }
  } : null

  const pageSchema = !service && !detail && pageSeo ? {
    '@context': 'https://schema.org',
    '@type': pageSeo.path === '/solutions' ? 'CollectionPage' : 'WebPage',
    name: pageSeo.title,
    description: pageSeo.description,
    url: canonical,
    isPartOf: { '@type': 'WebSite', name: 'Afyra Digital', url: origin }
  } : null

  const schema = detailSchema ? [organizationSchema, detailSchema] : serviceSchema ? [organizationSchema, serviceSchema] : pageSchema ? [organizationSchema, pageSchema] : organizationSchema
  const safeSchema = JSON.stringify(schema).replace(/</g, '\u003c')
  const clientEntry = isDev ? '/src/client/main.tsx' : '/static/client.js'
  return c.html(`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${html(title)}</title>
<meta name="description" content="${html(description)}">
<meta name="robots" content="index,follow">
<meta name="theme-color" content="#00443E">
<meta name="color-scheme" content="light dark">
<link rel="canonical" href="${html(canonical)}">
<link rel="icon" type="image/png" href="/static/img/logo-mark.png">
<link rel="apple-touch-icon" href="/static/img/logo-mark.png">

<meta property="og:type" content="website">
<meta property="og:title" content="${html(title)}">
<meta property="og:description" content="${html(description)}">
<meta property="og:url" content="${html(canonical)}">
<meta property="og:image" content="${origin}/static/img/logo-full.png">
<meta property="og:site_name" content="Afyra Digital">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${html(title)}">
<meta name="twitter:description" content="${html(description)}">
<meta name="twitter:image" content="${origin}/static/img/logo-full.png">

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=League+Spartan:wght@400;500;600;700&display=swap" rel="stylesheet">
<link href="/static/style.css" rel="stylesheet">
<link href="/static/sections.css" rel="stylesheet">
<link href="/static/service-pages.css" rel="stylesheet">
<link href="/static/saasking-reference-solutions.css" rel="stylesheet">
<link href="/static/premium-pages.css" rel="stylesheet">
<link href="/static/site-runtime.css" rel="stylesheet">
<link href="/static/saasking-motion.css" rel="stylesheet">
<link href="/static/final-solution-fixes-v9.css" rel="stylesheet">
<link href="/static/critical-regression-v16.css" rel="stylesheet">
<link href="/static/web-development-v17.css" rel="stylesheet">
<link href="/static/patient-acquisition-v18.css" rel="stylesheet">
<link href="/static/digital-growth-home07-v24.css" rel="stylesheet">
<link href="/static/home-final-polish-v23.css" rel="stylesheet">
<link href="/static/home-hero-unified-v25.css" rel="stylesheet">
<link href="/static/home-hero-reference-dock-v27.css" rel="stylesheet">
<link href="/static/patient-acquisition-v28.css" rel="stylesheet">
<link href="/static/web-development-v29.css" rel="stylesheet">
<link href="/static/cross-page-animation-polish-v31.css" rel="stylesheet">
<link href="/static/home-hero-reference-dock-v33.css" rel="stylesheet">
<link href="/static/home-hero-response-card-howitworks-center-v37.css" rel="stylesheet">
<link href="/static/home-hero-response-corner-fix-v38.css" rel="stylesheet">
<link href="/static/digital-presence-hero-reference-v39.css" rel="stylesheet">
<link href="/static/card-route-and-webstack-v40.css" rel="stylesheet">
<link href="/static/digital-presence-static-wings-trust-v41.css" rel="stylesheet">
<link href="/static/footer-detail-webstack-v42.css" rel="stylesheet">
<link href="/static/digital-presence-split-wings-trust-v43.css" rel="stylesheet">
<link href="/static/production-blockers-v44.css" rel="stylesheet">
<link href="/static/home-reference-polish-v45.css" rel="stylesheet">
<link href="/static/home-reference-display-v46.css" rel="stylesheet">
<link href="/static/brand-communication-stability-v48.css" rel="stylesheet">
<link href="/static/brand-communication-polish-v49.css" rel="stylesheet">
<link href="/static/brand-communication-final-polish-v50.css" rel="stylesheet">
<link href="/static/brand-communication-final-polish-v51.css" rel="stylesheet">
<link href="/static/digital-presence-reference-polish-v52.css" rel="stylesheet">
<link href="/static/digital-presence-final-polish-v53.css" rel="stylesheet">
<link href="/static/patient-acquisition-v55.css" rel="stylesheet">
<link href="/static/patient-acquisition-v56.css" rel="stylesheet">
<link href="/static/patient-acquisition-v57.css" rel="stylesheet">
<link href="/static/website-development-v57.css" rel="stylesheet">
<link href="/static/website-development-v58.css" rel="stylesheet">
<link href="/static/social-media-v60.css" rel="stylesheet">
<link href="/static/social-media-v62.css" rel="stylesheet">
<link href="/static/digital-growth-home07-v61.css" rel="stylesheet">
<link href="/static/responsive-center-webhero-v63.css" rel="stylesheet">

<script type="application/ld+json">${safeSchema}</script>
</head>
<body>
<div id="afyra-boot-loader" class="af-boot-loader" aria-label="Loading Afyra Digital"><div class="af-boot-loader__inner"><img src="/static/img/logo-wide.png" alt="Afyra Digital"><div class="af-boot-loader__line"><span></span></div><p>Let’s Grow Together</p></div></div>
<div id="root"></div>
<noscript><div style="max-width:760px;margin:120px auto;padding:24px;font-family:system-ui;color:#00443E;background:#DEF1F0;border-radius:18px">Afyra Digital requires JavaScript to display its animated pages. Please enable JavaScript and reload.</div></noscript>
<script>window.afyraBootFailsafe=setTimeout(function(){var e=document.getElementById("afyra-boot-loader");if(e){e.style.opacity="0";e.style.visibility="hidden";e.style.pointerEvents="none";setTimeout(function(){e.remove()},220)}},1450)</script>
<script type="module" src="${clientEntry}"></script>
</body>
</html>`)
})

export default app
