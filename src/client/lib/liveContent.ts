import { useEffect, useState } from 'react'
import { apiGetPageSections } from './api'

export type LiveSectionItem = {
  id: number
  section_id: number
  group_key?: string | null
  label?: string
  icon?: string
  title?: string
  description?: string
  extra?: unknown
  sort_order?: number
  page_links?: any[]
}

export type LivePageSection = {
  id: number
  page_key: string
  section_key: string
  eyebrow_tag?: string
  eyebrow_text?: string
  title?: string
  description?: string
  data?: unknown
  sort_order?: number
  page_links?: any[]
  items?: LiveSectionItem[]
}

const pageSectionPromises = new Map<string, Promise<LivePageSection[]>>()

async function loadPageSections(pageKey: string) {
  const existing = pageSectionPromises.get(pageKey)
  if (existing) return existing
  const request = apiGetPageSections(pageKey)
    .then((res: any) => {
      if (!res?.ok || !Array.isArray(res.data)) throw new Error(res?.error || `Invalid ${pageKey} section response`)
      return res.data as LivePageSection[]
    })
    .catch((error) => {
      pageSectionPromises.delete(pageKey)
      throw error
    })
  pageSectionPromises.set(pageKey, request)
  return request
}

export function usePageSection(pageKey: string, sectionKey: string) {
  const [section, setSection] = useState<LivePageSection | null>(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    let mounted = true
    setFailed(false)
    loadPageSections(pageKey)
      .then((sections) => {
        if (!mounted) return
        setSection(sections.find((item) => item.section_key === sectionKey) || null)
      })
      .catch((error) => {
        console.warn(`[Afyra API] Failed to load section "${sectionKey}" for page "${pageKey}". Using bundled fallback.`, error)
        if (mounted) setFailed(true)
      })
    return () => { mounted = false }
  }, [pageKey, sectionKey])

  return { section, failed }
}

export function useHomeSection(sectionKey: string) {
  return usePageSection('home', sectionKey)
}
