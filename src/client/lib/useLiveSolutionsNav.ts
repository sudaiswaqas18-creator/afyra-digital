import { useEffect, useState } from 'react'
import { serviceNav as fallbackServiceNav } from '../data/servicePages'
import { apiGetSolutions } from './api'

type SolutionNavItem = { name: string; href: string; slug?: string }

let cachedSolutions: SolutionNavItem[] | null = null
let pendingSolutions: Promise<SolutionNavItem[]> | null = null
let warned = false

function loadSolutionsOnce() {
  if (cachedSolutions) return Promise.resolve(cachedSolutions)
  if (!pendingSolutions) {
    pendingSolutions = apiGetSolutions()
      .then((response) => {
        if (!response?.ok || !Array.isArray(response.data)) throw new Error('Invalid solutions response')
        const mapped = response.data.map((solution: any) => ({
          name: solution.name || solution.title || solution.slug,
          href: `/solutions/${solution.slug}`,
          slug: solution.slug
        }))
        cachedSolutions = mapped
        return mapped
      })
      .catch((error) => {
        pendingSolutions = null
        if (!warned) {
          warned = true
          console.warn('[Afyra API] Solutions navigation unavailable; using bundled fallback.', error)
        }
        throw error
      })
  }
  return pendingSolutions
}

export function useLiveSolutionsNav() {
  const [items, setItems] = useState<SolutionNavItem[]>(cachedSolutions || fallbackServiceNav)

  useEffect(() => {
    let active = true
    loadSolutionsOnce()
      .then((next) => {
        if (active) setItems(next)
      })
      .catch(() => {
        // Keep the bundled navigation only when the API is genuinely unavailable.
      })
    return () => { active = false }
  }, [])

  return items
}
