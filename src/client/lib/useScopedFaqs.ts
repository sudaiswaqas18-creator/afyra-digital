import { useEffect, useState } from 'react'
import { apiGetFaqs } from './api'
import { cmsPageSlugFromPath } from './pageScope'

export type FaqItem = { id?: number; q: string; a: string; sort_order?: number }

export function useScopedFaqs(fallback: readonly FaqItem[], explicitPage?: string) {
  const [items, setItems] = useState<FaqItem[]>(() => [...fallback])
  const page = explicitPage || cmsPageSlugFromPath()

  useEffect(() => {
    let active = true
    apiGetFaqs(page)
      .then((res) => {
        if (!active || !res?.ok || !Array.isArray(res.data)) return
        setItems(res.data.map((row: any) => ({ id: row.id, q: row.question, a: row.answer, sort_order: row.sort_order })))
      })
      .catch((error) => console.warn(`[Afyra API] FAQs unavailable for ${page}; using bundled fallback.`, error))
    return () => { active = false }
  }, [page])

  return items
}
