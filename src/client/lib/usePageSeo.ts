import { useEffect } from 'react'

function ensureMeta(selector: string, attr: 'name' | 'property', key: string) {
  let el = document.querySelector<HTMLMetaElement>(selector)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  return el
}

export function usePageSeo(title: string, description: string, path: string) {
  useEffect(() => {
    const absoluteUrl = `${window.location.origin}${path}`
    document.title = title

    ensureMeta('meta[name="description"]', 'name', 'description').content = description
    ensureMeta('meta[name="robots"]', 'name', 'robots').content = 'index,follow'
    ensureMeta('meta[property="og:title"]', 'property', 'og:title').content = title
    ensureMeta('meta[property="og:description"]', 'property', 'og:description').content = description
    ensureMeta('meta[property="og:url"]', 'property', 'og:url').content = absoluteUrl
    ensureMeta('meta[property="og:type"]', 'property', 'og:type').content = 'website'
    ensureMeta('meta[name="twitter:title"]', 'name', 'twitter:title').content = title
    ensureMeta('meta[name="twitter:description"]', 'name', 'twitter:description').content = description
    ensureMeta('meta[name="twitter:card"]', 'name', 'twitter:card').content = 'summary_large_image'

    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    canonical.href = absoluteUrl
  }, [title, description, path])
}
