/**
 * Afyra Digital API Client
 * Connects the React frontend to the Express + MySQL backend.
 * Dynamic reads explicitly bypass browser/proxy caches so a normal refresh sees admin changes.
 */

const configuredApiBase = String(import.meta.env.VITE_API_URL || '').trim().replace(/\/$/, '')
export const API_BASE = configuredApiBase || (import.meta.env.DEV ? 'http://localhost:5000/api' : '/api')

const configuredUploadBase = String(import.meta.env.VITE_UPLOAD_URL || '').trim().replace(/\/$/, '')
export const UPLOAD_BASE = configuredUploadBase || (API_BASE.startsWith('http') ? API_BASE.replace(/\/api$/, '') : '')

export interface AdminUser {
  id: number
  name: string
  email: string
  role: string
}

export function getToken(): string | null {
  return localStorage.getItem('afyra_admin_token')
}

export function setToken(token: string) {
  localStorage.setItem('afyra_admin_token', token)
}

export function removeToken() {
  localStorage.removeItem('afyra_admin_token')
  localStorage.removeItem('afyra_admin_user')
}

export function getStoredUser(): AdminUser | null {
  const data = localStorage.getItem('afyra_admin_user')
  if (!data) return null
  try {
    return JSON.parse(data)
  } catch {
    return null
  }
}

export function setStoredUser(user: AdminUser) {
  localStorage.setItem('afyra_admin_user', JSON.stringify(user))
}

async function readJson<T>(response: Response): Promise<T> {
  let data: any = null
  try {
    data = await response.json()
  } catch {
    // Keep the original status in the error below if the server returns non-JSON.
  }
  if (!response.ok) {
    throw new Error(data?.error || `Request failed with status ${response.status}`)
  }
  return data as T
}

function withOptionalAuth(headersInit?: HeadersInit) {
  const headers = new Headers(headersInit || {})
  const token = getToken()
  if (token) headers.set('Authorization', `Bearer ${token}`)
  return headers
}

async function apiRead<T = any>(endpoint: string): Promise<T> {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    method: 'GET',
    headers: withOptionalAuth({ Accept: 'application/json' }),
    cache: 'no-store'
  })
  return readJson<T>(response)
}

export async function authFetch<T = any>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const headers = withOptionalAuth(options.headers)

  if (!(options.body instanceof FormData) && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json')
  }
  headers.set('Accept', 'application/json')

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
    cache: 'no-store'
  })

  if (response.status === 401) {
    removeToken()
    if (window.location.pathname.startsWith('/admin') && window.location.pathname !== '/admin/login') {
      window.location.href = '/admin/login'
    }
  }

  return readJson<T>(response)
}

/* ---------------- Auth API ---------------- */
export async function apiLogin(email: string, password: string): Promise<{ ok: boolean; token: string; user: AdminUser }> {
  const res = await fetch(`${API_BASE}/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ email, password }),
    cache: 'no-store'
  })

  const data = await readJson<{ ok: boolean; token: string; user: AdminUser }>(res)
  setToken(data.token)
  setStoredUser(data.user)
  return data
}

export async function apiGetMe(): Promise<{ ok: boolean; user: AdminUser }> {
  return authFetch('/admin/me')
}

export async function apiLogout(): Promise<void> {
  try {
    await authFetch('/admin/logout', { method: 'POST' })
  } catch (err) {
    console.warn('[API] Logout request error:', err)
  } finally {
    removeToken()
  }
}

/* ---------------- Upload API ---------------- */
export async function apiUploadImage(file: File): Promise<string> {
  const formData = new FormData()
  formData.append('image', file)
  const res = await authFetch<{ ok: boolean; url: string }>('/upload', {
    method: 'POST',
    body: formData
  })
  return `${UPLOAD_BASE}${res.url}`
}

/* ---------------- Public & Admin Content APIs ---------------- */

/* ---------------- Page registry & FAQ API ---------------- */
export type CmsPage = {
  id: number
  slug: string
  name: string
  route_path: string
  page_type: 'core' | 'solution'
  is_active: boolean
  sort_order: number
}

export function apiGetPages() {
  return authFetch<{ ok: boolean; data: CmsPage[] }>('/pages')
}

export function apiGetFaqs(page?: string) {
  const query = page ? `?page=${encodeURIComponent(page)}` : ''
  return apiRead<any>(`/faqs${query}`)
}

export function apiCreateFaq(data: any) {
  return authFetch('/faqs', { method: 'POST', body: JSON.stringify(data) })
}

export function apiUpdateFaq(id: number, data: any) {
  return authFetch(`/faqs/${id}`, { method: 'PUT', body: JSON.stringify(data) })
}

export function apiDeleteFaq(id: number) {
  return authFetch(`/faqs/${id}`, { method: 'DELETE' })
}

export function apiGetSolutions(page?: string) {
  const query = page ? `?page=${encodeURIComponent(page)}` : ''
  return apiRead<any>(`/solutions${query}`)
}

export function apiGetSolutionBySlug(slug: string, page?: string) {
  const query = page ? `?page=${encodeURIComponent(page)}` : ''
  return apiRead<any>(`/solutions/${encodeURIComponent(slug)}${query}`)
}

export function apiCreateSolution(data: any) {
  return authFetch('/solutions', { method: 'POST', body: JSON.stringify(data) })
}

export function apiUpdateSolution(id: number, data: any) {
  return authFetch(`/solutions/${id}`, { method: 'PUT', body: JSON.stringify(data) })
}

export function apiDeleteSolution(id: number) {
  return authFetch(`/solutions/${id}`, { method: 'DELETE' })
}

export function apiGetPrograms(page?: string) {
  const query = page ? `?page=${encodeURIComponent(page)}` : ''
  return apiRead<any>(`/programs${query}`)
}

export function apiCreateProgram(data: any) {
  return authFetch('/programs', { method: 'POST', body: JSON.stringify(data) })
}

export function apiUpdateProgram(id: number, data: any) {
  return authFetch(`/programs/${id}`, { method: 'PUT', body: JSON.stringify(data) })
}

export function apiDeleteProgram(id: number) {
  return authFetch(`/programs/${id}`, { method: 'DELETE' })
}

export function apiCreateProgramTerm(label: string, sort_order = 0, page_ids: number[] = []) {
  return authFetch('/programs/terms', { method: 'POST', body: JSON.stringify({ label, sort_order, page_ids }) })
}

export function apiUpdateProgramTerm(id: number, data: any) {
  return authFetch(`/programs/terms/${id}`, { method: 'PUT', body: JSON.stringify(data) })
}

export function apiDeleteProgramTerm(id: number) {
  return authFetch(`/programs/terms/${id}`, { method: 'DELETE' })
}

export function apiGetPageSections(page_key?: string) {
  const query = page_key ? `?page_key=${encodeURIComponent(page_key)}` : ''
  return apiRead<any>(`/page-sections${query}`)
}

export function apiUpdatePageSection(id: number, data: any) {
  return authFetch(`/page-sections/sections/${id}`, { method: 'PUT', body: JSON.stringify(data) })
}

export function apiCreatePageSectionItem(data: any) {
  return authFetch('/page-sections/items', { method: 'POST', body: JSON.stringify(data) })
}

export function apiUpdatePageSectionItem(id: number, data: any) {
  return authFetch(`/page-sections/items/${id}`, { method: 'PUT', body: JSON.stringify(data) })
}

export function apiDeletePageSectionItem(id: number) {
  return authFetch(`/page-sections/items/${id}`, { method: 'DELETE' })
}

export function apiGetInsights(page?: string) {
  const query = page ? `?page=${encodeURIComponent(page)}` : ''
  return apiRead<any>(`/insights${query}`)
}

export function apiCreateInsight(data: any) {
  return authFetch('/insights', { method: 'POST', body: JSON.stringify(data) })
}

export function apiUpdateInsight(id: number, data: any) {
  return authFetch(`/insights/${id}`, { method: 'PUT', body: JSON.stringify(data) })
}

export function apiDeleteInsight(id: number) {
  return authFetch(`/insights/${id}`, { method: 'DELETE' })
}

export function apiGetTestimonials(page?: string, includeDrafts = false) {
  const params = new URLSearchParams()
  if (page) params.set('page', page)
  if (includeDrafts) params.set('preview', '1')
  const query = params.toString() ? `?${params.toString()}` : ''
  return apiRead<any>(`/testimonials${query}`)
}

export function apiGetTestimonialSectionSettings(page: string) {
  return apiRead<any>(`/testimonials/section-settings?page=${encodeURIComponent(page)}`)
}

export function apiUpdateTestimonialSectionSettings(pageId: number, data: any) {
  return authFetch(`/testimonials/section-settings/${pageId}`, { method: 'PUT', body: JSON.stringify(data) })
}

export function apiCreateTestimonial(data: any) {
  return authFetch('/testimonials', { method: 'POST', body: JSON.stringify(data) })
}

export function apiUpdateTestimonial(id: number, data: any) {
  return authFetch(`/testimonials/${id}`, { method: 'PUT', body: JSON.stringify(data) })
}

export function apiDeleteTestimonial(id: number) {
  return authFetch(`/testimonials/${id}`, { method: 'DELETE' })
}

export function apiGetSettings(page?: string) {
  const query = page ? `?page=${encodeURIComponent(page)}` : ''
  return apiRead<any>(`/settings${query}`)
}

export function apiUpdateSettings(data: any) {
  return authFetch('/settings', { method: 'PUT', body: JSON.stringify(data) })
}

export function apiCreateSocialLink(data: any) {
  return authFetch('/settings/social-links', { method: 'POST', body: JSON.stringify(data) })
}

export function apiUpdateSocialLink(id: number, data: any) {
  return authFetch(`/settings/social-links/${id}`, { method: 'PUT', body: JSON.stringify(data) })
}

export function apiDeleteSocialLink(id: number) {
  return authFetch(`/settings/social-links/${id}`, { method: 'DELETE' })
}

export async function apiSubmitInquiry(data: { name: string; business: string; contact: string; message: string; page_url?: string }) {
  const res = await fetch(`${API_BASE}/inquiries`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(data),
    cache: 'no-store'
  })
  return readJson<any>(res)
}

export function apiGetInquiries(status?: string) {
  const q = status ? `?status=${encodeURIComponent(status)}` : ''
  return authFetch(`/inquiries${q}`)
}

export function apiUpdateInquiryStatus(id: number, status: 'new' | 'read' | 'archived') {
  return authFetch(`/inquiries/${id}/status`, { method: 'PUT', body: JSON.stringify({ status }) })
}

export function apiDeleteInquiry(id: number) {
  return authFetch(`/inquiries/${id}`, { method: 'DELETE' })
}
