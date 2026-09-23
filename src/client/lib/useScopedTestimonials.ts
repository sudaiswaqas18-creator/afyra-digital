import { useEffect, useState } from 'react'
import { apiGetTestimonials } from './api'

export type TestimonialPageLink = {
  id: number
  slug: string
  name: string
  route_path: string
  page_type: 'core' | 'solution'
}

export type LiveTestimonial = {
  id: number
  author_name: string
  author_role: string
  author_company: string
  quote: string
  avatar_url: string | null
  rating: number
  metric_value: string
  metric_label: string
  badge_text: string
  source_label: string
  card_variant: 'auto' | 'feature' | 'standard' | 'inverted'
  is_published: boolean
  sort_order: number
  page_links?: TestimonialPageLink[]
}

export type TestimonialSectionSettings = {
  id: number
  page_id: number
  page_slug: string
  page_name: string
  route_path: string
  eyebrow: string
  title: string
  description: string | null
  client_count_label: string
  aggregate_rating: number | null
  review_count_label: string
  cta_label: string
  cta_url: string
  is_enabled: boolean
}

export function useScopedTestimonials(pageSlug: string) {
  const [items, setItems] = useState<LiveTestimonial[]>([])
  const [section, setSection] = useState<TestimonialSectionSettings | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true
    setLoading(true)
    setError(null)

    apiGetTestimonials(pageSlug)
      .then((res) => {
        if (!mounted) return
        if (!res?.ok) throw new Error(res?.error || 'Unable to load testimonials.')
        setItems(Array.isArray(res.data) ? res.data : [])
        setSection(res.section || null)
      })
      .catch((err) => {
        if (!mounted) return
        console.warn(`[Afyra API] Testimonials unavailable for ${pageSlug}.`, err)
        if (import.meta.env.DEV && ['solution:brand-creative-communication','solution:patient-acquisition-lead-generation'].includes(pageSlug)) {
          setItems(Array.from({length:8},(_,i)=>({id:-(i+1),author_name:'Demo Customer '+(i+1),author_role:'Preview only',author_company:'Not a verified review',quote:'Sample review card for previewing the communication experience. Replace this placeholder with an approved customer testimonial before publishing.',avatar_url:'/Home-Public/t1-author-'+(i+1)+'-recolored.webp',rating:5,metric_value:'',metric_label:'',badge_text:'Demo',source_label:'local-layout-preview',card_variant:'standard' as const,is_published:false,sort_order:i})))
          setSection({id:-1,page_id:-1,page_slug:pageSlug,page_name:'Preview',route_path:'',eyebrow:'DEMO / PLACEHOLDER TESTIMONIALS',title:'Customer Experiences — Layout Preview',description:'Sample cards for visual preview. These are not real client reviews.',client_count_label:'Demo content · replace with approved reviews',aggregate_rating:null,review_count_label:'',cta_label:'',cta_url:'',is_enabled:true})
          setError(null)
        } else {
          setItems([]); setSection(null)
          setError(err instanceof Error ? err.message : 'Unable to load testimonials.')
        }
      })
      .finally(() => {
        if (mounted) setLoading(false)
      })

    return () => { mounted = false }
  }, [pageSlug])

  return { items, section, loading, error }
}
