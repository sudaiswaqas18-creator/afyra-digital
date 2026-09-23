import { useEffect, useMemo, useState } from 'react'
import { programs as fallbackPrograms } from '../data/content'
import { apiGetPrograms } from './api'
import { cmsPageSlugFromPath } from './pageScope'

type FallbackPlan = (typeof fallbackPrograms.plans)[number]
export type LivePlan = Omit<FallbackPlan, 'id'> & {
  id: string | number
  slug?: string
  is_popular?: boolean
  is_published?: boolean
  sort_order?: number
}
export type LiveProgramsData = Omit<typeof fallbackPrograms, 'plans' | 'terms'> & {
  plans: LivePlan[]
  terms: string[]
}

const cache = new Map<string, LiveProgramsData>()
const pending = new Map<string, Promise<LiveProgramsData>>()
const warned = new Set<string>()

function mapProgramsResponse(response: any): LiveProgramsData {
  if (!response?.ok || !response?.data || !Array.isArray(response.data.plans)) {
    throw new Error('Invalid programs response')
  }

  const plans: LivePlan[] = response.data.plans.map((plan: any) => ({
    ...plan,
    id: plan.id ?? plan.slug,
    icon: plan.icon || 'seed',
    popular: Boolean(plan.is_popular !== undefined ? plan.is_popular : plan.popular),
    bestFor: Array.isArray(plan.bestFor) ? plan.bestFor : [],
    includes: Array.isArray(plan.includes) ? plan.includes : []
  }))

  const terms = Array.isArray(response.data.terms)
    ? response.data.terms
        .map((term: any) => (typeof term === 'string' ? term : term?.label))
        .filter(Boolean)
    : []

  return { ...fallbackPrograms, plans, terms }
}

function loadPrograms(scope: string) {
  const cached = cache.get(scope)
  if (cached) return Promise.resolve(cached)

  const existing = pending.get(scope)
  if (existing) return existing

  const request = apiGetPrograms(scope)
    .then(mapProgramsResponse)
    .then((mapped) => {
      cache.set(scope, mapped)
      pending.delete(scope)
      return mapped
    })
    .catch((error) => {
      pending.delete(scope)
      if (!warned.has(scope)) {
        warned.add(scope)
        console.warn(`[Afyra API] Programs unavailable for page "${scope}"; using bundled fallback.`, error)
      }
      throw error
    })

  pending.set(scope, request)
  return request
}

export function useLiveProgramsData(explicitScope?: string) {
  const scope = useMemo(() => explicitScope || cmsPageSlugFromPath(), [explicitScope])
  const [programs, setPrograms] = useState<LiveProgramsData>(() => cache.get(scope) || fallbackPrograms)

  useEffect(() => {
    let active = true
    setPrograms(cache.get(scope) || fallbackPrograms)
    loadPrograms(scope)
      .then((next) => {
        if (active) setPrograms(next)
      })
      .catch(() => {
        // Keep the approved bundled fallback only when the scoped API is genuinely unavailable.
      })

    return () => { active = false }
  }, [scope])

  return programs
}
