import { useEffect, useMemo, useState } from 'react'
import type { CmsPage } from '../lib/api'

export type PageLink = Pick<CmsPage, 'id' | 'slug' | 'name' | 'route_path' | 'page_type'>

export function pageIdsFromLinks(links?: PageLink[]) {
  return Array.isArray(links) ? links.map((page) => Number(page.id)).filter(Number.isFinite) : []
}

export function PageScopeBadges({ links }: { links?: PageLink[] }) {
  if (!links?.length) return <span className="af-scope-empty">Unassigned</span>
  return (
    <div className="af-scope-badges">
      {links.map((page) => <span className="af-scope-badge" key={page.id}>{page.name}</span>)}
    </div>
  )
}

export default function PageScopeField({ pages, links, label = 'Appears on pages', lockedPageSlugs = [] }: { pages: CmsPage[]; links?: PageLink[]; label?: string; lockedPageSlugs?: string[] }) {
  const linkIdsKey = useMemo(
    () => pageIdsFromLinks(links).sort((first, second) => first - second).join(','),
    [links]
  )
  const initial = useMemo(
    () => new Set(linkIdsKey ? linkIdsKey.split(',').map(Number) : []),
    [linkIdsKey]
  )
  const lockedPageSlugsKey = lockedPageSlugs.join(',')
  const lockedIds = useMemo(
    () => new Set(pages.filter((page) => lockedPageSlugs.includes(page.slug)).map((page) => page.id)),
    [pages, lockedPageSlugsKey]
  )
  const [selected, setSelected] = useState<Set<number>>(() => new Set([...initial, ...lockedIds]))

  useEffect(() => {
    setSelected(new Set([...initial, ...lockedIds]))
  }, [initial, lockedIds])

  const selectedPages = pages.filter((page) => selected.has(page.id))

  const toggle = (id: number) => {
    if (lockedIds.has(id)) return
    setSelected((current) => {
      const next = new Set(current)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <div className="af-page-scope-field">
      <div className="af-page-scope-field__head">
        <label className="af-form-label">{label}</label>
        <span>{selectedPages.length} page{selectedPages.length === 1 ? '' : 's'} selected</span>
      </div>
      {selectedPages.length > 1 ? (
        <div className="af-shared-warning">This item is shared across {selectedPages.length} pages: {selectedPages.map((page) => page.name).join(', ')}. Editing it here will update it everywhere it appears.</div>
      ) : selectedPages.length === 1 ? (
        <div className="af-scope-notice">This item appears on: <strong>{selectedPages[0].name}</strong>.</div>
      ) : (
        <div className="af-scope-warning">This item is not assigned to any live page. It will stay in the CMS but will not render through page-scoped public API calls.</div>
      )}
      <div className="af-page-scope-grid">
        {pages.map((page) => {
          const checked = selected.has(page.id)
          const locked = lockedIds.has(page.id)
          const checkboxId = `page-scope-${page.id}`
          return (
            <div className={`af-page-scope-option ${checked ? 'is-checked' : ''} ${locked ? 'is-locked' : ''}`} key={page.id}>
              <input id={checkboxId} className="af-page-scope-checkbox" type="checkbox" name="page_ids" value={page.id} checked={checked} disabled={locked} onClick={(event) => event.stopPropagation()} onChange={() => toggle(page.id)} />
              {locked ? <input type="hidden" name="page_ids" value={page.id} /> : null}
              <label htmlFor={checkboxId} className="af-page-scope-option__content"><strong>{page.name}</strong><small>{page.route_path}</small></label>
            </div>
          )
        })}
      </div>
    </div>
  )
}
