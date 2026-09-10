import { jsxRenderer } from 'hono/jsx-renderer'

export const renderer = jsxRenderer(({ children }) => {
  return (
    <html>
      <head>
        <link href="/static/style.css" rel="stylesheet" />
        <link href="/static/sections.css" rel="stylesheet" />
        <link href="/static/service-pages.css" rel="stylesheet" />
        <link href="/static/saasking-reference-solutions.css" rel="stylesheet" />
        <link href="/static/premium-pages.css" rel="stylesheet" />
        <link href="/static/layout-audit.css" rel="stylesheet" />
        <link href="/static/saasking-motion.css" rel="stylesheet" />
        <link href="/static/final-solution-fixes-v9.css" rel="stylesheet" />
        <link href="/static/critical-regression-v16.css" rel="stylesheet" />
        <link href="/static/web-development-v17.css" rel="stylesheet" />
        <link href="/static/patient-acquisition-v18.css" rel="stylesheet" />
        <link href="/static/digital-growth-home07-v24.css" rel="stylesheet" />
        <link href="/static/home-final-polish-v23.css" rel="stylesheet" />
        <link href="/static/home-hero-unified-v25.css" rel="stylesheet" />
        <link href="/static/home-hero-reference-dock-v27.css" rel="stylesheet" />
        <link href="/static/patient-acquisition-v28.css" rel="stylesheet" />
        <link href="/static/web-development-v29.css" rel="stylesheet" />
        <link href="/static/home-hero-reference-dock-v33.css" rel="stylesheet" />
        <link href="/static/home-hero-response-card-howitworks-center-v37.css" rel="stylesheet" />
        <link href="/static/home-hero-response-corner-fix-v38.css" rel="stylesheet" />
        <link href="/static/card-route-and-webstack-v40.css" rel="stylesheet" />
        <link href="/static/digital-presence-static-wings-trust-v41.css" rel="stylesheet" />
        <link href="/static/footer-detail-webstack-v42.css" rel="stylesheet" />
        <link href="/static/digital-presence-split-wings-trust-v43.css" rel="stylesheet" />
        <link href="/static/production-blockers-v44.css" rel="stylesheet" />
        <link href="/static/home-reference-polish-v45.css" rel="stylesheet" />
        <link href="/static/home-reference-display-v46.css" rel="stylesheet" />
        <link href="/static/brand-communication-stability-v48.css" rel="stylesheet" />
        <link href="/static/brand-communication-polish-v49.css" rel="stylesheet" />
        <link href="/static/brand-communication-final-polish-v50.css" rel="stylesheet" />
        <link href="/static/brand-communication-final-polish-v51.css" rel="stylesheet" />
      <link href="/static/digital-presence-reference-polish-v52.css" rel="stylesheet" />
        <link href="/static/digital-presence-final-polish-v53.css" rel="stylesheet" />
        <link href="/static/patient-acquisition-v55.css" rel="stylesheet" />
        <link href="/static/patient-acquisition-v56.css" rel="stylesheet" />
        <link href="/static/patient-acquisition-v57.css" rel="stylesheet" />
        <link href="/static/website-development-v57.css" rel="stylesheet" />
        <link href="/static/website-development-v58.css" rel="stylesheet" />
        <link href="/static/social-media-v60.css" rel="stylesheet" />
        <link href="/static/social-media-v62.css" rel="stylesheet" />
        <link href="/static/digital-growth-home07-v61.css" rel="stylesheet" />
        <link href="/static/responsive-center-webhero-v63.css" rel="stylesheet" />
</head>
      <body>{children}</body>
    </html>
  )
})
