import { useState, useEffect, type ChangeEvent } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import {
  getToken, getStoredUser, apiLogout, apiGetMe,
  apiGetSolutions, apiCreateSolution, apiUpdateSolution, apiDeleteSolution,
  apiGetPrograms, apiCreateProgram, apiUpdateProgram, apiDeleteProgram,
  apiCreateProgramTerm, apiUpdateProgramTerm, apiDeleteProgramTerm,
  apiGetPageSections, apiUpdatePageSection, apiCreatePageSectionItem, apiUpdatePageSectionItem, apiDeletePageSectionItem,
  apiGetInsights, apiCreateInsight, apiUpdateInsight, apiDeleteInsight,
  apiGetTestimonials, apiGetTestimonialSectionSettings, apiUpdateTestimonialSectionSettings, apiCreateTestimonial, apiUpdateTestimonial, apiDeleteTestimonial,
  apiGetSettings, apiUpdateSettings, apiCreateSocialLink, apiUpdateSocialLink, apiDeleteSocialLink,
  apiGetInquiries, apiUpdateInquiryStatus, apiDeleteInquiry,
  apiUploadImage, apiGetPages, apiGetFaqs, apiCreateFaq, apiUpdateFaq, apiDeleteFaq, type CmsPage
} from '../lib/api'
import PageScopeField, { PageScopeBadges } from '../components/PageScopeField'

type TabKey =
  | 'overview'
  | 'solutions'
  | 'programs'
  | 'sections'
  | 'audience'
  | 'faqs'
  | 'insights'
  | 'testimonials'
  | 'inquiries'
  | 'settings'

/* ---------------- Inline Clean SVG Icons ---------------- */
function IconPencil() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
    </svg>
  )
}
function IconTrash() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <line x1="10" y1="11" x2="10" y2="17" />
      <line x1="14" y1="11" x2="14" y2="17" />
    </svg>
  )
}
function IconPlus() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  )
}
function IconEye() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}
function IconExternal() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  )
}
function IconSearch() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  )
}
function IconUpload() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" y1="3" x2="12" y2="15" />
    </svg>
  )
}
function IconCheck() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

export default function AdminDashboardPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const pathParts = location.pathname.replace(/^\/|\/$/g, '').split('/')
  const routeTab = (pathParts[2] || 'overview') as TabKey
  const routeItemId = pathParts[3] ? Number(pathParts[3]) : null
  const validTabs: TabKey[] = ['overview','solutions','programs','sections','audience','faqs','insights','testimonials','inquiries','settings']
  const [activeTab, setActiveTab] = useState<TabKey>(validTabs.includes(routeTab) ? routeTab : 'overview')
  const [user, setUser] = useState(getStoredUser())
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [toast, setToast] = useState<{ message: string; isError?: boolean } | null>(null)

  // Data states
  const [solutions, setSolutions] = useState<any[]>([])
  const [programsData, setProgramsData] = useState<{ plans: any[]; terms: any[] }>({ plans: [], terms: [] })
  const [insights, setInsights] = useState<any[]>([])
  const [testimonials, setTestimonials] = useState<any[]>([])
  const [settingsData, setSettingsData] = useState<{ settings: any; social_links: any[] }>({ settings: {}, social_links: [] })
  const [inquiries, setInquiries] = useState<any[]>([])
  const [pageSections, setPageSections] = useState<any[]>([])
  const [faqs, setFaqs] = useState<any[]>([])
  const [cmsPages, setCmsPages] = useState<CmsPage[]>([])
  const [loading, setLoading] = useState(true)

  // Modals, selection & confirmation states
  const [modalType, setModalType] = useState<string | null>(null)
  const [editingItem, setEditingItem] = useState<any>(null)
  const [activeSectionId, setActiveSectionId] = useState<number | null>(null)
  const [deleteConfirm, setDeleteConfirm] = useState<{ action: () => Promise<void>; title: string } | null>(null)
  const [viewInquiry, setViewInquiry] = useState<any | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})

  // Inquiries filter states
  const [inquirySearch, setInquirySearch] = useState('')
  const [inquiryFilter, setInquiryFilter] = useState<'all' | 'new' | 'read' | 'archived'>('all')

  const [testimonialPageFilter, setTestimonialPageFilter] = useState('all')
  const [testimonialSectionSettings, setTestimonialSectionSettings] = useState<any | null>(null)
  const [testimonialSettingsLoading, setTestimonialSettingsLoading] = useState(false)

  const goToTab = (tab: TabKey) => {
    setActiveTab(tab)
    setIsSidebarOpen(false)
    navigate(tab === 'overview' ? '/admin/dashboard' : `/admin/dashboard/${tab}`)
  }

  const goToItem = (tab: TabKey, id: number) => {
    setActiveTab(tab)
    navigate(`/admin/dashboard/${tab}/${id}`)
  }

  const showToast = (message: string, isError = false) => {
    setToast({ message, isError })
    window.setTimeout(() => setToast(null), 3500)
  }

  useEffect(() => {
    const nextTab = validTabs.includes(routeTab) ? routeTab : 'overview'
    setActiveTab(nextTab)
  }, [location.pathname])

  // Resolve URL-addressable item editors after their data has loaded.
  useEffect(() => {
    if (!routeItemId || loading) return
    if (activeTab === 'solutions') { const item = solutions.find((x) => x.id === routeItemId); if (item) { setEditingItem(item); setModalType('solution') } }
    else if (activeTab === 'programs') { const item = programsData.plans.find((x) => x.id === routeItemId); if (item) { setEditingItem(item); setModalType('program') } }
    else if (activeTab === 'insights') { const item = insights.find((x) => x.id === routeItemId); if (item) { setEditingItem(item); setModalType('insight') } }
    else if (activeTab === 'testimonials') { const item = testimonials.find((x) => x.id === routeItemId); if (item) { setEditingItem(item); setModalType('testimonial') } }
    else if (activeTab === 'inquiries') { const item = inquiries.find((x) => x.id === routeItemId); if (item) setViewInquiry(item) }
    else if (activeTab === 'settings') { const item = settingsData.social_links.find((x) => x.id === routeItemId); if (item) { setEditingItem(item); setModalType('edit_social') } }
    else if (activeTab === 'faqs') { const item = faqs.find((x) => x.id === routeItemId); if (item) { setEditingItem(item); setModalType('faq') } }
    else if (activeTab === 'audience' || activeTab === 'sections') {
      const sections = activeTab === 'audience'
        ? pageSections.filter((section) => section.section_key === 'audience')
        : pageSections.filter((section) => section.section_key !== 'audience' && section.section_key !== 'faqs')
      for (const section of sections) {
        const item = (section.items || []).find((entry: any) => entry.id === routeItemId)
        if (item) { setActiveSectionId(section.id); setEditingItem(item); setModalType('edit_section_item'); break }
      }
    }
  }, [routeItemId, activeTab, loading, solutions, programsData.plans, insights, testimonials, inquiries, settingsData.social_links, pageSections, faqs])

  // Auth guard on mount
  useEffect(() => {
    const token = getToken()
    if (!token) {
      navigate('/admin/login', { replace: true })
      return
    }

    apiGetMe()
      .then((res) => {
        if (res.ok && res.user) setUser(res.user)
      })
      .catch(() => {
        navigate('/admin/login', { replace: true })
      })
  }, [navigate])

  // Load all dashboard content
  const loadAllData = async () => {
    setLoading(true)
    try {
      const [solRes, progRes, insRes, testRes, setRes, inqRes, secRes, faqRes, pagesRes] = await Promise.all([
        apiGetSolutions(), apiGetPrograms(), apiGetInsights(), apiGetTestimonials(undefined, true), apiGetSettings(), apiGetInquiries(), apiGetPageSections(), apiGetFaqs(), apiGetPages()
      ])

      if (solRes.ok) setSolutions(solRes.data)
      if (progRes.ok) setProgramsData(progRes.data)
      if (insRes.ok) setInsights(insRes.data)
      if (testRes.ok) setTestimonials(testRes.data)
      if (setRes.ok) setSettingsData(setRes.data)
      if (inqRes.ok) setInquiries(inqRes.data)
      if (secRes.ok) setPageSections(secRes.data)
      if (faqRes.ok) setFaqs(faqRes.data)
      if (pagesRes.ok) setCmsPages(pagesRes.data)
    } catch (err: any) {
      showToast(err.message || 'Failed to load dashboard data', true)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadAllData()
  }, [])

  useEffect(() => {
    if (activeTab !== 'testimonials' || testimonialPageFilter === 'all') {
      setTestimonialSectionSettings(null)
      return
    }
    let mounted = true
    setTestimonialSettingsLoading(true)
    apiGetTestimonialSectionSettings(testimonialPageFilter)
      .then((res) => { if (mounted) setTestimonialSectionSettings(res?.data || null) })
      .catch((err: any) => { if (mounted) { setTestimonialSectionSettings(null); showToast(err.message || 'Failed to load testimonial section settings.', true) } })
      .finally(() => { if (mounted) setTestimonialSettingsLoading(false) })
    return () => { mounted = false }
  }, [activeTab, testimonialPageFilter])

  const handleLogout = async () => {
    await apiLogout()
    navigate('/admin/login', { replace: true })
  }

  // Helper to get specific section from pageSections
  const getSection = (key: string) => pageSections.find((s) => s.section_key === key)
  const getPageIds = (formData: FormData) => formData.getAll('page_ids').map((value) => Number(value)).filter((id) => Number.isInteger(id) && id > 0)
  const pageLinksFor = (...slugs: string[]) => cmsPages.filter((page) => slugs.includes(page.slug))
  const programDefaultLinks = () => cmsPages.filter((page) => ['home', 'healthcare', 'programs', 'request-consultation'].includes(page.slug) || page.page_type === 'solution')
  const allPageLinks = () => cmsPages
  const parentSectionLinks = (sectionId?: number) => pageSections.find((section) => Number(section.id) === Number(sectionId))?.page_links || []

  /* ---------------- Form Submissions with Strict Validation ---------------- */

  // 1. Solution Form
  const handleSolutionSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFormErrors({})
    const form = e.currentTarget
    const formData = new FormData(form)

    const slug = (formData.get('slug') as string).trim()
    const name = (formData.get('name') as string).trim()
    const title = (formData.get('title') as string).trim()
    const description = (formData.get('description') as string).trim()
    const intro = (formData.get('intro') as string).trim()

    const errors: Record<string, string> = {}
    if (!name) errors.name = 'Solution name is required.'
    if (!slug) errors.slug = 'Slug identifier is required.'
    else if (!/^[a-z0-9-]+$/.test(slug)) errors.slug = 'Slug must be lowercase alphanumeric with hyphens only (e.g. healthcare-seo).'
    if (!description) errors.description = 'Summary description is required.'
    if (!intro) errors.intro = 'Intro paragraph is required.'

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      return
    }

    // Process features (newline delimited title:description)
    const featuresRaw = (formData.get('features_text') as string || '').split('\n').filter(Boolean)
    const features = featuresRaw.map((line) => {
      const parts = line.split(':')
      return {
        title: parts[0]?.trim() || 'Feature',
        description: parts.slice(1).join(':')?.trim() || parts[0]?.trim() || ''
      }
    })

    // Process touchpoints
    const touchpoints = (formData.get('touchpoints_text') as string || '')
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)

    const process = (formData.get('process_text') as string || '')
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => {
        const parts = line.split(':')
        return { title: parts[0]?.trim() || 'Step', description: parts.slice(1).join(':').trim() || parts[0]?.trim() || '' }
      })

    const payload = {
      slug,
      name,
      layout: formData.get('layout') as any,
      eyebrow: (formData.get('eyebrow') as string).trim() || 'Healthcare Growth',
      title: title || name,
      description,
      intro,
      content_gap: String(formData.get('content_gap') || '').trim() || null,
      proof_note: String(formData.get('proof_note') || '').trim() || null,
      seo_title: (formData.get('seo_title') as string).trim() || `${name} | Afyra Digital`,
      seo_description: (formData.get('seo_description') as string).trim() || null,
      sort_order: Number(formData.get('sort_order')) || 0,
      is_published: formData.get('is_published') === 'on',
      page_ids: getPageIds(formData),
      features: features.length > 0 ? features : undefined,
      touchpoints: touchpoints.length > 0 ? touchpoints : undefined,
      process: process.length > 0 ? process : undefined
    }

    setIsSaving(true)
    try {
      if (editingItem?.id) {
        await apiUpdateSolution(editingItem.id, payload)
        showToast('Solution updated successfully!')
      } else {
        await apiCreateSolution(payload)
        showToast('Solution created successfully!')
      }
      setModalType(null)
      setEditingItem(null)
      goToTab('solutions')
      loadAllData()
    } catch (err: any) {
      showToast(err.message, true)
    } finally {
      setIsSaving(false)
    }
  }

  // 2. Program Form
  const handleProgramSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFormErrors({})
    const form = e.currentTarget
    const formData = new FormData(form)

    const name = (formData.get('name') as string).trim()
    const slug = (formData.get('slug') as string).trim()
    const priceStr = formData.get('price') as string
    const price = Number(priceStr)

    const errors: Record<string, string> = {}
    if (!name) errors.name = 'Program name is required.'
    if (!slug) errors.slug = 'Slug is required.'
    if (isNaN(price) || price < 0) errors.price = 'Price must be a valid positive number.'

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      return
    }

    const bestFor = (formData.get('bestFor') as string).split('\n').map((s) => s.trim()).filter(Boolean)
    const includes = (formData.get('includes') as string).split('\n').map((s) => s.trim()).filter(Boolean)

    const payload = {
      slug,
      name,
      price,
      currency: String(formData.get('currency') || '').trim() || 'PKR',
      purpose: String(formData.get('purpose') || '').trim(),
      icon: String(formData.get('icon') || '').trim() || 'seed',
      platforms: String(formData.get('platforms') || '').trim(),
      is_popular: formData.get('is_popular') === 'on',
      sort_order: Number(formData.get('sort_order')) || 0,
      is_published: formData.get('is_published') === 'on',
      page_ids: getPageIds(formData),
      bestFor,
      includes
    }

    setIsSaving(true)
    try {
      if (editingItem?.id) {
        await apiUpdateProgram(editingItem.id, payload)
        showToast('Program updated successfully!')
      } else {
        await apiCreateProgram(payload)
        showToast('Program created successfully!')
      }
      setModalType(null)
      setEditingItem(null)
      goToTab('programs')
      loadAllData()
    } catch (err: any) {
      showToast(err.message, true)
    } finally {
      setIsSaving(false)
    }
  }

  const handleProgramTermSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const label = (formData.get('label') as string || '').trim()
    const sort_order = Number(formData.get('sort_order')) || 0
    const page_ids = getPageIds(formData)
    if (!label) { showToast('Commercial term text is required.', true); return }
    setIsSaving(true)
    try {
      if (editingItem?.id) await apiUpdateProgramTerm(editingItem.id, { label, sort_order, page_ids })
      else await apiCreateProgramTerm(label, sort_order, page_ids)
      showToast(editingItem?.id ? 'Term updated!' : 'Term added!')
      setModalType(null); setEditingItem(null); goToTab('programs'); loadAllData()
    } catch (err: any) { showToast(err.message, true) }
    finally { setIsSaving(false) }
  }

  // 3. Section Header Edit
  const handleSectionHeaderSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!editingItem?.id) return
    const form = e.currentTarget
    const formData = new FormData(form)

    const payload = {
      eyebrow_tag: (formData.get('eyebrow_tag') as string).trim(),
      eyebrow_text: (formData.get('eyebrow_text') as string).trim(),
      title: (formData.get('title') as string).trim(),
      description: String(formData.get('description') || '').trim(),
      meta_title: String(formData.get('meta_title') || '').trim(),
      meta_description: String(formData.get('meta_description') || '').trim() || null,
      data: (() => { const raw = String(formData.get('data_json') || '').trim(); if (!raw) return undefined; try { return JSON.parse(raw) } catch { return raw } })(),
      sort_order: Number(formData.get('sort_order')) || 0,
      page_ids: getPageIds(formData)
    }

    setIsSaving(true)
    try {
      await apiUpdatePageSection(editingItem.id, payload)
      showToast('Section headline updated!')
      setModalType(null)
      setEditingItem(null)
      goToTab(activeTab)
      loadAllData()
    } catch (err: any) {
      showToast(err.message, true)
    } finally {
      setIsSaving(false)
    }
  }

  // 4. Section Item (Features, Process, Audience, FAQ)
  const handleSectionItemSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFormErrors({})
    const form = e.currentTarget
    const formData = new FormData(form)

    const title = (formData.get('title') as string).trim()
    const description = (formData.get('description') as string).trim()
    const label = (formData.get('label') as string).trim()
    const icon = (formData.get('icon') as string).trim()
    const sort_order = Number(formData.get('sort_order')) || 0

    if (!title) {
      setFormErrors({ title: 'Title / Question is required.' })
      return
    }

    const payload = {
      section_id: activeSectionId || editingItem?.section_id,
      group_key: String(formData.get('group_key') || '').trim() || null,
      title,
      description,
      label,
      icon,
      extra: (() => { const raw = String(formData.get('extra_json') || '').trim(); if (!raw) return undefined; try { return JSON.parse(raw) } catch { return raw } })(),
      sort_order,
      page_ids: getPageIds(formData)
    }

    setIsSaving(true)
    try {
      if (editingItem?.id && modalType === 'edit_section_item') {
        await apiUpdatePageSectionItem(editingItem.id, payload)
        showToast('Item updated successfully!')
      } else {
        await apiCreatePageSectionItem(payload)
        showToast('Item added successfully!')
      }
      setModalType(null)
      setEditingItem(null)
      goToTab(activeTab)
      loadAllData()
    } catch (err: any) {
      showToast(err.message, true)
    } finally {
      setIsSaving(false)
    }
  }

  // 5. FAQ Form — dedicated records keyed only by their unique FAQ id.
  const handleFaqSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFormErrors({})
    const formData = new FormData(e.currentTarget)
    const question = (formData.get('question') as string || '').trim()
    const answer = (formData.get('answer') as string || '').trim()
    if (!question || !answer) {
      setFormErrors({ question: !question ? 'Question is required.' : '', answer: !answer ? 'Answer is required.' : '' })
      return
    }
    const payload = {
      question,
      answer,
      sort_order: Number(formData.get('sort_order')) || 0,
      is_published: formData.get('is_published') === 'on',
      page_ids: getPageIds(formData)
    }
    setIsSaving(true)
    try {
      if (editingItem?.id) {
        await apiUpdateFaq(editingItem.id, payload)
        showToast('FAQ updated successfully!')
      } else {
        await apiCreateFaq(payload)
        showToast('FAQ created successfully!')
      }
      setModalType(null)
      setEditingItem(null)
      goToTab('faqs')
      loadAllData()
    } catch (err: any) {
      showToast(err.message, true)
    } finally {
      setIsSaving(false)
    }
  }

  // 5. Insight Form
  const handleInsightSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFormErrors({})
    const form = e.currentTarget
    const formData = new FormData(form)

    const title = (formData.get('title') as string).trim()
    const slug = (formData.get('slug') as string).trim()
    const category = (formData.get('category') as string).trim()
    const excerpt = (formData.get('excerpt') as string).trim()
    const body = (formData.get('body') as string).trim()

    const errors: Record<string, string> = {}
    if (!title) errors.title = 'Article title is required.'
    if (!slug) errors.slug = 'Slug is required.'
    else if (!/^[a-z0-9-]+$/.test(slug)) errors.slug = 'Slug must be lowercase alphanumeric with hyphens.'
    if (!excerpt) errors.excerpt = 'Excerpt is required.'
    if (!body) errors.body = 'Article body content is required.'

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      return
    }

    const payload = {
      slug,
      title,
      category: category || 'Strategy',
      excerpt,
      body,
      image_url: String(formData.get('image_url') || '').trim() || null,
      published_at: String(formData.get('published_at') || '').trim() || null,
      sort_order: Number(formData.get('sort_order')) || 0,
      is_published: formData.get('is_published') === 'on',
      page_ids: getPageIds(formData)
    }

    setIsSaving(true)
    try {
      if (editingItem?.id) {
        await apiUpdateInsight(editingItem.id, payload)
        showToast('Insight updated successfully!')
      } else {
        await apiCreateInsight(payload)
        showToast('Insight created successfully!')
      }
      setModalType(null)
      setEditingItem(null)
      goToTab('insights')
      loadAllData()
    } catch (err: any) {
      showToast(err.message, true)
    } finally {
      setIsSaving(false)
    }
  }

  // 6. Testimonial Form
  const handleTestimonialSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFormErrors({})
    const form = e.currentTarget
    const formData = new FormData(form)

    const author_name = (formData.get('author_name') as string).trim()
    const author_role = (formData.get('author_role') as string).trim()
    const quote = (formData.get('quote') as string).trim()
    const rating = Number(formData.get('rating')) || 5

    const errors: Record<string, string> = {}
    if (!author_name) errors.author_name = 'Author name is required.'
    if (!author_role) errors.author_role = 'Role / Clinic title is required.'
    if (!quote) errors.quote = 'Testimonial quote text is required.'

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      return
    }

    const payload = {
      author_name,
      author_role,
      author_company: String(formData.get('author_company') || '').trim(),
      quote,
      avatar_url: String(formData.get('avatar_url') || '').trim() || null,
      rating,
      metric_value: String(formData.get('metric_value') || '').trim(),
      metric_label: String(formData.get('metric_label') || '').trim(),
      badge_text: String(formData.get('badge_text') || '').trim(),
      source_label: String(formData.get('source_label') || '').trim(),
      card_variant: String(formData.get('card_variant') || 'auto'),
      sort_order: Number(formData.get('sort_order')) || 0,
      is_published: formData.get('is_published') === 'on',
      page_ids: getPageIds(formData)
    }

    setIsSaving(true)
    try {
      if (editingItem?.id) {
        await apiUpdateTestimonial(editingItem.id, payload)
        showToast('Testimonial updated successfully!')
      } else {
        await apiCreateTestimonial(payload)
        showToast('Testimonial created successfully!')
      }
      setModalType(null)
      setEditingItem(null)
      goToTab('testimonials')
      loadAllData()
    } catch (err: any) {
      showToast(err.message, true)
    } finally {
      setIsSaving(false)
    }
  }

  const handleTestimonialSectionSettingsSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!testimonialSectionSettings?.page_id) { showToast('Select a page before editing testimonial section settings.', true); return }
    const formData = new FormData(e.currentTarget)
    const ratingValue = String(formData.get('aggregate_rating') || '').trim()
    const payload = {
      eyebrow: String(formData.get('eyebrow') || '').trim(),
      title: String(formData.get('title') || '').trim(),
      description: String(formData.get('description') || '').trim() || null,
      client_count_label: String(formData.get('client_count_label') || '').trim(),
      aggregate_rating: ratingValue ? Number(ratingValue) : null,
      review_count_label: String(formData.get('review_count_label') || '').trim(),
      cta_label: String(formData.get('cta_label') || '').trim() || 'View all reviews',
      cta_url: String(formData.get('cta_url') || '').trim(),
      is_enabled: formData.get('is_enabled') === 'on'
    }
    if (!payload.title) { showToast('Testimonial section title is required.', true); return }
    setIsSaving(true)
    try {
      await apiUpdateTestimonialSectionSettings(testimonialSectionSettings.page_id, payload)
      showToast('Testimonial section settings updated.')
      const refreshed = await apiGetTestimonialSectionSettings(testimonialPageFilter)
      setTestimonialSectionSettings(refreshed?.data || null)
    } catch (err: any) { showToast(err.message || 'Failed to update testimonial section settings.', true) }
    finally { setIsSaving(false) }
  }

  // 7. Site Settings & Social Links
  const handleSettingsSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)

    const payload = {
      site_name: (formData.get('site_name') as string).trim(),
      tagline: (formData.get('tagline') as string).trim(),
      positioning: (formData.get('positioning') as string).trim(),
      phone_display: (formData.get('phone_display') as string).trim(),
      phone_href: (formData.get('phone_href') as string).trim(),
      email: (formData.get('email') as string).trim(),
      whatsapp_url: String(formData.get('whatsapp_url') || '').trim(),
      meta_title: String(formData.get('meta_title') || '').trim(),
      meta_description: String(formData.get('meta_description') || '').trim() || null,
      footer_description: String(formData.get('footer_description') || '').trim(),
      page_ids: getPageIds(formData)
    }

    setIsSaving(true)
    try {
      await apiUpdateSettings(payload)
      showToast('Site settings updated!')
      loadAllData()
    } catch (err: any) {
      showToast(err.message, true)
    } finally {
      setIsSaving(false)
    }
  }

  const handleSocialLinkSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)

    const platform = (formData.get('platform') as string).trim()
    const url = (formData.get('url') as string).trim()
    const label = (formData.get('label') as string).trim() || platform

    if (!platform || !url) {
      showToast('Platform and URL are required.', true)
      return
    }

    setIsSaving(true)
    try {
      if (editingItem?.id && modalType === 'edit_social') {
        await apiUpdateSocialLink(editingItem.id, { icon: platform, href: url, label, sort_order: Number(formData.get('sort_order')) || 0, page_ids: getPageIds(formData) })
        showToast('Social link updated!')
      } else {
        await apiCreateSocialLink({ icon: platform, href: url, label, sort_order: Number(formData.get('sort_order')) || 0, page_ids: getPageIds(formData) })
        showToast('Social link added!')
      }
      setModalType(null)
      setEditingItem(null)
      goToTab('settings')
      loadAllData()
    } catch (err: any) {
      showToast(err.message, true)
    } finally {
      setIsSaving(false)
    }
  }

  // Image upload handler
  const handleImageFileChange = async (e: ChangeEvent<HTMLInputElement>, fieldName: string) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      showToast('Only image files (PNG, JPG, WebP) are allowed.', true)
      return
    }

    setIsUploading(true)
    try {
      const url = await apiUploadImage(file)
      const input = document.getElementById(fieldName) as HTMLInputElement
      if (input) input.value = url
      showToast('Image uploaded successfully!')
    } catch (err: any) {
      showToast(err.message || 'Image upload failed', true)
    } finally {
      setIsUploading(false)
    }
  }

  // Filtered inquiries
  const filteredInquiries = inquiries.filter((inq) => {
    const matchesFilter = inquiryFilter === 'all' || inq.status === inquiryFilter
    const term = inquirySearch.toLowerCase().trim()
    const matchesSearch = !term ||
      inq.name.toLowerCase().includes(term) ||
      inq.business?.toLowerCase().includes(term) ||
      inq.contact?.toLowerCase().includes(term) ||
      inq.message?.toLowerCase().includes(term)
    return matchesFilter && matchesSearch
  })

  const visibleTestimonials = testimonialPageFilter === 'all'
    ? testimonials
    : testimonials.filter((item) => (item.page_links || []).some((page: any) => page.slug === testimonialPageFilter))

  const newInquiryCount = inquiries.filter((i) => i.status === 'new').length

  return (
    <div className="af-admin-root">
      <div className="af-admin-layout">
        {/* ==================== Persistent Sidebar ==================== */}
        <aside className={`af-sidebar ${isSidebarOpen ? 'is-open' : ''}`}>
          <div className="af-sidebar__top">
            <Link to="/" className="af-sidebar__brand">
              <img src="/static/img/logo-mark.png" alt="Afyra Logo" className="af-sidebar__logo" />
              <span className="af-sidebar__wordmark">Afyra<span>Admin</span></span>
            </Link>

            <nav className="af-sidebar__nav">
              <button
                className={`af-nav-item ${activeTab === 'overview' ? 'is-active' : ''}`}
                onClick={() => goToTab('overview')}
              >
                <span className="af-nav-item__left">
                  <span className="af-nav-item__icon">📊</span>
                  Overview
                </span>
              </button>

              <button
                className={`af-nav-item ${activeTab === 'solutions' ? 'is-active' : ''}`}
                onClick={() => goToTab('solutions')}
              >
                <span className="af-nav-item__left">
                  <span className="af-nav-item__icon">⚡</span>
                  Solutions
                </span>
                <span className="af-nav-badge">{solutions.length}</span>
              </button>

              <button
                className={`af-nav-item ${activeTab === 'programs' ? 'is-active' : ''}`}
                onClick={() => goToTab('programs')}
              >
                <span className="af-nav-item__left">
                  <span className="af-nav-item__icon">💎</span>
                  Pricing & Plans
                </span>
                <span className="af-nav-badge">{programsData.plans.length}</span>
              </button>

              <button
                className={`af-nav-item ${activeTab === 'audience' ? 'is-active' : ''}`}
                onClick={() => goToTab('audience')}
              >
                <span className="af-nav-item__left">
                  <span className="af-nav-item__icon">🩺</span>
                  Healthcare Audience
                </span>
                <span className="af-nav-badge">{getSection('audience')?.items?.length || 5}</span>
              </button>

              <button
                className={`af-nav-item ${activeTab === 'sections' ? 'is-active' : ''}`}
                onClick={() => goToTab('sections')}
              >
                <span className="af-nav-item__left">
                  <span className="af-nav-item__icon">🧩</span>
                  Bento & Page Copy
                </span>
              </button>

              <button
                className={`af-nav-item ${activeTab === 'faqs' ? 'is-active' : ''}`}
                onClick={() => goToTab('faqs')}
              >
                <span className="af-nav-item__left">
                  <span className="af-nav-item__icon">❓</span>
                  FAQs
                </span>
                <span className="af-nav-badge">{faqs.length}</span>
              </button>

              <button
                className={`af-nav-item ${activeTab === 'insights' ? 'is-active' : ''}`}
                onClick={() => goToTab('insights')}
              >
                <span className="af-nav-item__left">
                  <span className="af-nav-item__icon">📝</span>
                  Insights & Blog
                </span>
                <span className="af-nav-badge">{insights.length}</span>
              </button>

              <button
                className={`af-nav-item ${activeTab === 'testimonials' ? 'is-active' : ''}`}
                onClick={() => goToTab('testimonials')}
              >
                <span className="af-nav-item__left">
                  <span className="af-nav-item__icon">⭐</span>
                  Testimonials
                </span>
                <span className="af-nav-badge">{testimonials.length}</span>
              </button>

              <button
                className={`af-nav-item ${activeTab === 'inquiries' ? 'is-active' : ''}`}
                onClick={() => goToTab('inquiries')}
              >
                <span className="af-nav-item__left">
                  <span className="af-nav-item__icon">📬</span>
                  Inquiries / Leads
                </span>
                {newInquiryCount > 0 && <span className="af-nav-badge">{newInquiryCount} new</span>}
              </button>

              <button
                className={`af-nav-item ${activeTab === 'settings' ? 'is-active' : ''}`}
                onClick={() => goToTab('settings')}
              >
                <span className="af-nav-item__left">
                  <span className="af-nav-item__icon">⚙️</span>
                  Site & Footer
                </span>
              </button>
            </nav>
          </div>

          <div className="af-sidebar__bottom">
            <div className="af-admin-profile">
              <div className="af-admin-avatar">
                {user?.name ? user.name[0].toUpperCase() : 'A'}
              </div>
              <div className="af-admin-info">
                <p className="af-admin-name">{user?.name || 'Administrator'}</p>
                <span className="af-admin-role">{user?.role || 'Superadmin'}</span>
              </div>
            </div>
            <button className="af-logout-btn" onClick={handleLogout}>
              Sign Out
            </button>
          </div>
        </aside>

        {isSidebarOpen && (
          <button
            type="button"
            className="af-sidebar-backdrop"
            aria-label="Close dashboard navigation"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* ==================== Main Content Area ==================== */}
        <div className="af-dash-main">
          {/* Top Bar */}
          <header className="af-dash-header">
            <div className="af-dash-title-wrap">
              <button
                className="af-btn-icon-sm af-sidebar-toggle"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                aria-label="Open dashboard navigation"
                aria-expanded={isSidebarOpen}
              >
                ☰
              </button>
              <h1 className="af-dash-title">
                {activeTab === 'overview' && 'System Overview'}
                {activeTab === 'solutions' && 'Healthcare Solutions'}
                {activeTab === 'programs' && 'Pricing & Growth Programs'}
                {activeTab === 'audience' && 'Healthcare Audience & Segments'}
                {activeTab === 'sections' && 'Bento Grid & Website Copy'}
                {activeTab === 'faqs' && 'Frequently Asked Questions'}
                {activeTab === 'insights' && 'Strategic Insights & Blog'}
                {activeTab === 'testimonials' && 'Client Proof & Testimonials'}
                {activeTab === 'inquiries' && 'Patient Consultation Requests'}
                {activeTab === 'settings' && 'Site & Footer Settings'}
              </h1>
            </div>

            <div className="af-dash-header-actions">
              <button
                className="af-action-btn-secondary"
                onClick={loadAllData}
                title="Refresh database records"
              >
                ↻ Refresh
              </button>
              <a href="/" target="_blank" rel="noopener noreferrer" className="af-view-site-btn">
                View Live Site <IconExternal />
              </a>
            </div>
          </header>

          <main className="af-dash-content">
            {/* 1. OVERVIEW TAB */}
            {activeTab === 'overview' && (
              <div>
                <div className="af-stat-grid">
                  <div className="af-stat-card" role="button" tabIndex={0} onClick={() => goToTab('solutions')} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') goToTab('solutions') }}>
                    <div className="af-stat-card__top">
                      <span className="af-stat-card__icon">⚡</span>
                      <span className="af-pill-badge af-pill-badge--green">Live</span>
                    </div>
                    <h3 className="af-stat-card__num">{solutions.length}</h3>
                    <p className="af-stat-card__label">Active Solutions</p>
                  </div>

                  <div className="af-stat-card" role="button" tabIndex={0} onClick={() => goToTab('programs')} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') goToTab('programs') }}>
                    <div className="af-stat-card__top">
                      <span className="af-stat-card__icon">💎</span>
                      <span className="af-pill-badge af-pill-badge--blue">Tiers</span>
                    </div>
                    <h3 className="af-stat-card__num">{programsData.plans.length}</h3>
                    <p className="af-stat-card__label">Growth Programs</p>
                  </div>

                  <div className="af-stat-card" role="button" tabIndex={0} onClick={() => goToTab('inquiries')} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') goToTab('inquiries') }}>
                    <div className="af-stat-card__top">
                      <span className="af-stat-card__icon">📬</span>
                      <span className="af-pill-badge af-pill-badge--amber">{newInquiryCount} New</span>
                    </div>
                    <h3 className="af-stat-card__num">{inquiries.length}</h3>
                    <p className="af-stat-card__label">Consultation Requests</p>
                  </div>

                  <div className="af-stat-card" role="button" tabIndex={0} onClick={() => goToTab('insights')} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') goToTab('insights') }}>
                    <div className="af-stat-card__top">
                      <span className="af-stat-card__icon">📝</span>
                      <span className="af-pill-badge af-pill-badge--green">Articles</span>
                    </div>
                    <h3 className="af-stat-card__num">{insights.length}</h3>
                    <p className="af-stat-card__label">Published Insights</p>
                  </div>
                </div>

                {/* Recent Inquiries Quick Table */}
                <div className="af-dash-panel">
                  <div className="af-panel-header">
                    <h3 className="af-panel-title">Recent Patient Consultation Requests</h3>
                    <button className="af-action-btn-secondary" onClick={() => goToTab('inquiries')}>
                      View All ({inquiries.length})
                    </button>
                  </div>

                  <div className="af-table-responsive">
                    <table className="af-table af-programs-table">
                      <thead>
                        <tr>
                          <th>Patient / Client</th>
                          <th>Practice / Business</th>
                          <th>Contact</th>
                          <th>Date</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {inquiries.slice(0, 5).map((inq) => (
                          <tr key={inq.id} style={{ cursor: 'pointer' }} onClick={(event) => { if ((event.target as HTMLElement).closest('button,select,a,input')) return; goToItem('inquiries', inq.id) }}>
                            <td><strong>{inq.name}</strong></td>
                            <td>{inq.business || '—'}</td>
                            <td><a href={`tel:${inq.contact}`} style={{ color: '#0f766e', fontWeight: 600 }}>{inq.contact}</a></td>
                            <td>{new Date(inq.created_at).toLocaleDateString()}</td>
                            <td>
                              <select
                                value={inq.status}
                                onChange={async (e) => {
                                  await apiUpdateInquiryStatus(inq.id, e.target.value as any)
                                  showToast('Status updated!')
                                  loadAllData()
                                }}
                                className="af-form-control"
                                style={{ width: 'auto', padding: '0.35rem 0.65rem', fontSize: '0.82rem' }}
                              >
                                <option value="new">NEW</option>
                                <option value="read">READ</option>
                                <option value="archived">ARCHIVED</option>
                              </select>
                            </td>
                            <td>
                              <button
                                className="af-btn-icon-sm"
                                onClick={() => goToItem('inquiries', inq.id)}
                                title="View message details"
                              >
                                <IconEye />
                              </button>
                            </td>
                          </tr>
                        ))}
                        {inquiries.length === 0 && (
                          <tr><td colSpan={6} style={{ textAlign: 'center', padding: '2rem', color: '#64748b' }}>No consultation inquiries yet.</td></tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* 2. SOLUTIONS TAB */}
            {activeTab === 'solutions' && (
              <div className="af-dash-panel">
                <div className="af-panel-header">
                  <h3 className="af-panel-title">Healthcare Solutions ({solutions.length})</h3>
                  <button
                    className="af-action-btn-primary"
                    onClick={() => { setEditingItem(null); setModalType('solution'); setFormErrors({}) }}
                  >
                    <IconPlus /> Add Solution
                  </button>
                </div>

                <div className="af-table-responsive">
                  <table className="af-table">
                    <thead>
                      <tr>
                        <th>Solution Name</th>
                        <th>Slug</th>
                        <th>Layout</th>
                        <th>Features</th>
                        <th>Appears on</th>
                        <th>Sort</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {solutions.map((sol) => (
                        <tr key={sol.id} style={{ cursor: 'pointer' }} onClick={(event) => { if ((event.target as HTMLElement).closest('button,select,a,input')) return; goToItem('solutions', sol.id) }}>
                          <td><strong>{sol.name}</strong></td>
                          <td><code>/{sol.slug}</code></td>
                          <td><span className="af-pill-badge af-pill-badge--blue">Layout {sol.layout}</span></td>
                          <td>{sol.features?.length || 0} items</td>
                          <td><PageScopeBadges links={sol.page_links} /></td>
                          <td>{sol.sort_order}</td>
                          <td>
                            <span className={`af-pill-badge ${sol.is_published ? 'af-pill-badge--green' : 'af-pill-badge--gray'}`}>
                              {sol.is_published ? 'ACTIVE' : 'DRAFT'}
                            </span>
                          </td>
                          <td>
                            <div className="af-row-actions">
                              <button
                                className="af-btn-icon-sm"
                                onClick={() => { setFormErrors({}); goToItem('solutions', sol.id) }}
                                title="Edit solution"
                              >
                                <IconPencil />
                              </button>
                              <button
                                className="af-btn-icon-sm af-btn-icon-sm--danger"
                                onClick={() => {
                                  setDeleteConfirm({
                                    title: `Delete solution "${sol.name}"?`,
                                    action: async () => {
                                      await apiDeleteSolution(sol.id)
                                      showToast('Solution deleted.')
                                      loadAllData()
                                    }
                                  })
                                }}
                                title="Delete solution"
                              >
                                <IconTrash />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* 3. PROGRAMS & PRICING TAB */}
            {activeTab === 'programs' && (
              <div>
                <div className="af-dash-panel">
                  <div className="af-panel-header">
                    <h3 className="af-panel-title">Growth Programs & Plans ({programsData.plans.length})</h3>
                    <button
                      className="af-action-btn-primary"
                      onClick={() => { setEditingItem(null); setModalType('program'); setFormErrors({}) }}
                    >
                      <IconPlus /> Add Program
                    </button>
                  </div>

                  <div className="af-table-responsive">
                    <table className="af-table">
                      <thead>
                        <tr>
                          <th>Plan Name</th>
                          <th>Price</th>
                          <th>Target Purpose</th>
                          <th>Platforms</th>
                          <th>Appears on</th>
                          <th>Popular</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {programsData.plans.map((p) => (
                          <tr key={p.id} style={{ cursor: 'pointer' }} onClick={(event) => { if ((event.target as HTMLElement).closest('button,select,a,input')) return; goToItem('programs', p.id) }}>
                            <td><strong>{p.name}</strong></td>
                            <td>{p.currency} {Number(p.price).toLocaleString()}/mo</td>
                            <td>{p.purpose}</td>
                            <td>{p.platforms}</td>
                            <td><PageScopeBadges links={p.page_links} /></td>
                            <td>{p.is_popular ? <span className="af-pill-badge af-pill-badge--amber">POPULAR</span> : '—'}</td>
                            <td>
                              <span className={`af-pill-badge ${p.is_published ? 'af-pill-badge--green' : 'af-pill-badge--gray'}`}>
                                {p.is_published ? 'ACTIVE' : 'DRAFT'}
                              </span>
                            </td>
                            <td>
                              <div className="af-row-actions">
                                <button
                                  className="af-btn-icon-sm"
                                  onClick={() => { setFormErrors({}); goToItem('programs', p.id) }}
                                  title="Edit plan"
                                >
                                  <IconPencil />
                                </button>
                                <button
                                  className="af-btn-icon-sm af-btn-icon-sm--danger"
                                  onClick={() => {
                                    setDeleteConfirm({
                                      title: `Delete program "${p.name}"?`,
                                      action: async () => {
                                        await apiDeleteProgram(p.id)
                                        showToast('Program deleted.')
                                        loadAllData()
                                      }
                                    })
                                  }}
                                  title="Delete plan"
                                >
                                  <IconTrash />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Program Commercial Terms */}
                <div className="af-dash-panel" style={{ padding: '1.75rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                    <h3 className="af-panel-title">Commercial Terms & Engagement Rules</h3>
                    <button className="af-action-btn-primary" onClick={() => { setEditingItem(null); setModalType('program_term'); setFormErrors({}) }}>
                      <IconPlus /> Add Term
                    </button>
                  </div>
                  <ul className="af-terms-list">
                    {programsData.terms.map((t) => (
                      <li className="af-term-row" key={t.id}>
                        <span className="af-term-label"><strong>#{t.id}</strong><span>{t.label}</span></span>
                        <div className="af-term-scope"><PageScopeBadges links={t.page_links} /></div>
                        <div className="af-row-actions">
                          <button className="af-btn-icon-sm" onClick={() => { setEditingItem(t); setModalType('program_term') }} title="Edit term"><IconPencil /></button>
                          <button className="af-btn-icon-sm af-btn-icon-sm--danger" onClick={() => setDeleteConfirm({ title: 'Delete this commercial term?', action: async () => { await apiDeleteProgramTerm(t.id); showToast('Term deleted.'); loadAllData() } })}><IconTrash /></button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* 4. HEALTHCARE AUDIENCE TAB */}
            {activeTab === 'audience' && (
              <div className="af-dash-panel">
                <div className="af-panel-header">
                  <div>
                    <h3 className="af-panel-title">Healthcare Audience Segments ("Who We Help")</h3>
                    <p style={{ margin: '0.25rem 0 0', color: '#64748b', fontSize: '0.85rem' }}>
                      Target medical practices and clinical specialties displayed on the website.
                    </p>
                    <div style={{ marginTop: '0.5rem' }}><PageScopeBadges links={getSection('audience')?.page_links} /></div>
                  </div>
                  <div className="af-panel-actions">
                    {getSection('audience') && (
                      <button
                        className="af-action-btn-secondary"
                        onClick={() => { setEditingItem(getSection('audience')); setModalType('edit_section_header') }}
                      >
                        Edit Section Copy
                      </button>
                    )}
                    <button
                      className="af-action-btn-primary"
                      onClick={() => {
                        const sec = getSection('audience')
                        setActiveSectionId(sec ? sec.id : 4)
                        setEditingItem(null)
                        setModalType('new_section_item')
                        setFormErrors({})
                      }}
                    >
                      <IconPlus /> Add Medical Segment
                    </button>
                  </div>
                </div>

                <div className="af-table-responsive">
                  <table className="af-table">
                    <thead>
                      <tr>
                        <th>Medical Specialty / Segment</th>
                        <th>Icon</th>
                        <th>Positioning Description</th>
                        <th>Appears on</th>
                        <th>Sort</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(getSection('audience')?.items || []).map((item: any) => (
                        <tr key={item.id} style={{ cursor: 'pointer' }} onClick={(event) => { if ((event.target as HTMLElement).closest('button,select,a,input')) return; goToItem('audience', item.id) }}>
                          <td><strong>{item.title || item.label}</strong></td>
                          <td><code>{item.icon || 'doctor'}</code></td>
                          <td>{item.description}</td>
                          <td><PageScopeBadges links={item.page_links} /></td>
                          <td>{item.sort_order}</td>
                          <td>
                            <div className="af-row-actions">
                              <button
                                className="af-btn-icon-sm"
                                onClick={() => { setFormErrors({}); goToItem('audience', item.id) }}
                                title="Edit segment"
                              >
                                <IconPencil />
                              </button>
                              <button
                                className="af-btn-icon-sm af-btn-icon-sm--danger"
                                onClick={() => {
                                  setDeleteConfirm({
                                    title: `Delete segment "${item.title || item.label}"?`,
                                    action: async () => {
                                      await apiDeletePageSectionItem(item.id)
                                      showToast('Segment deleted.')
                                      loadAllData()
                                    }
                                  })
                                }}
                                title="Delete segment"
                              >
                                <IconTrash />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* 5. SECTIONS & BENTO COPY TAB */}
            {activeTab === 'sections' && (
              <div>
                {pageSections
                  .filter((sec) => sec.section_key !== 'audience' && sec.section_key !== 'faqs')
                  .map((sec) => (
                    <div className="af-dash-panel" key={sec.id} style={{ marginBottom: '2rem' }}>
                      <div className="af-panel-header">
                        <div>
                          <span className="af-pill-badge af-pill-badge--blue" style={{ marginBottom: '0.35rem' }}>
                            {sec.section_key.toUpperCase()}
                          </span>
                          <h3 className="af-panel-title">{sec.title}</h3>
                          <p style={{ margin: '0.25rem 0 0', color: '#64748b', fontSize: '0.85rem' }}>{sec.description}</p>
                          <div style={{ marginTop: '0.5rem' }}><PageScopeBadges links={sec.page_links} /></div>
                        </div>
                        <div className="af-panel-actions">
                          <button
                            className="af-action-btn-secondary"
                            onClick={() => { setEditingItem(sec); setModalType('edit_section_header') }}
                          >
                            Edit Header
                          </button>
                          <button
                            className="af-action-btn-primary"
                            onClick={() => {
                              setActiveSectionId(sec.id)
                              setEditingItem(null)
                              setModalType('new_section_item')
                              setFormErrors({})
                            }}
                          >
                            <IconPlus /> Add Item
                          </button>
                        </div>
                      </div>

                      <div className="af-table-responsive">
                        <table className="af-table">
                          <thead>
                            <tr>
                              <th>Title / Step</th>
                              <th>Icon / Label</th>
                              <th>Description</th>
                              <th>Appears on</th>
                              <th>Sort</th>
                              <th>Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {(sec.items || []).map((it: any) => (
                              <tr key={it.id} style={{ cursor: 'pointer' }} onClick={(event) => { if ((event.target as HTMLElement).closest('button,select,a,input')) return; goToItem('sections', it.id) }}>
                                <td><strong>{it.title}</strong></td>
                                <td><code>{it.icon || it.label || '—'}</code></td>
                                <td>{it.description}</td>
                                <td><PageScopeBadges links={it.page_links} /></td>
                                <td>{it.sort_order}</td>
                                <td>
                                  <div className="af-row-actions">
                                    <button
                                      className="af-btn-icon-sm"
                                      onClick={() => { setFormErrors({}); goToItem('sections', it.id) }}
                                      title="Edit item"
                                    >
                                      <IconPencil />
                                    </button>
                                    <button
                                      className="af-btn-icon-sm af-btn-icon-sm--danger"
                                      onClick={() => {
                                        setDeleteConfirm({
                                          title: `Delete item "${it.title}"?`,
                                          action: async () => {
                                            await apiDeletePageSectionItem(it.id)
                                            showToast('Item deleted.')
                                            loadAllData()
                                          }
                                        })
                                      }}
                                      title="Delete item"
                                    >
                                      <IconTrash />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                            {(sec.items || []).length === 0 && (
                              <tr><td colSpan={6} style={{ textAlign: 'center', color: '#64748b', padding: '1.5rem' }}>No items in this section yet.</td></tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ))}
              </div>
            )}

            {/* 6. FAQS TAB */}
            {activeTab === 'faqs' && (
              <div className="af-dash-panel">
                <div className="af-panel-header">
                  <div>
                    <h3 className="af-panel-title">Frequently Asked Questions ({faqs.length})</h3>
                    <p style={{ margin: '0.25rem 0 0', color: '#64748b', fontSize: '0.85rem' }}>
                      Each FAQ has its own database ID. Sort order controls display position only; duplicate sort values never identify or overwrite records.
                    </p>
                  </div>
                  <div className="af-panel-actions">
                    {getSection('faqs') && (
                      <button className="af-action-btn-secondary" onClick={() => { setEditingItem(getSection('faqs')); setModalType('edit_section_header') }}>
                        Edit Section Header
                      </button>
                    )}
                    <button className="af-action-btn-primary" onClick={() => { setEditingItem(null); setModalType('faq'); setFormErrors({}) }}>
                      <IconPlus /> Add FAQ
                    </button>
                  </div>
                </div>

                <div className="af-table-responsive">
                  <table className="af-table">
                    <thead><tr><th>ID</th><th>Question</th><th>Answer</th><th>Appears on</th><th>Sort</th><th>Actions</th></tr></thead>
                    <tbody>
                      {faqs.map((faq: any) => (
                        <tr key={faq.id} style={{ cursor: 'pointer' }} onClick={(event) => { if ((event.target as HTMLElement).closest('button,select,a,input')) return; goToItem('faqs', faq.id) }}>
                          <td>#{faq.id}</td>
                          <td style={{ maxWidth: '300px', fontWeight: 600 }}>{faq.question}</td>
                          <td style={{ maxWidth: '420px' }}>{faq.answer}</td>
                          <td><PageScopeBadges links={faq.page_links} /></td>
                          <td>{faq.sort_order}</td>
                          <td><div className="af-row-actions">
                            <button className="af-btn-icon-sm" onClick={() => { setFormErrors({}); goToItem('faqs', faq.id) }} title="Edit FAQ"><IconPencil /></button>
                            <button className="af-btn-icon-sm af-btn-icon-sm--danger" onClick={() => setDeleteConfirm({ title: `Delete FAQ #${faq.id}?`, action: async () => { await apiDeleteFaq(faq.id); showToast('FAQ deleted.'); loadAllData() } })} title="Delete FAQ"><IconTrash /></button>
                          </div></td>
                        </tr>
                      ))}
                      {faqs.length === 0 && <tr><td colSpan={6} style={{ textAlign: 'center', color: '#64748b', padding: '1.5rem' }}>No FAQs yet.</td></tr>}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* 7. INSIGHTS / BLOG TAB */}
            {activeTab === 'insights' && (
              <div className="af-dash-panel">
                <div className="af-panel-header">
                  <h3 className="af-panel-title">Strategic Insights & Articles ({insights.length})</h3>
                  <button
                    className="af-action-btn-primary"
                    onClick={() => { setEditingItem(null); setModalType('insight'); setFormErrors({}) }}
                  >
                    <IconPlus /> Add Article
                  </button>
                </div>

                <div className="af-table-responsive">
                  <table className="af-table">
                    <thead>
                      <tr>
                        <th>Article Title</th>
                        <th>Category</th>
                        <th>Excerpt</th>
                        <th>Appears on</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {insights.map((ins) => (
                        <tr key={ins.id} style={{ cursor: 'pointer' }} onClick={(event) => { if ((event.target as HTMLElement).closest('button,select,a,input')) return; goToItem('insights', ins.id) }}>
                          <td><strong>{ins.title}</strong></td>
                          <td><span className="af-pill-badge af-pill-badge--blue">{ins.category}</span></td>
                          <td style={{ maxWidth: '320px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {ins.excerpt}
                          </td>
                          <td><PageScopeBadges links={ins.page_links} /></td>
                          <td>
                            <span className={`af-pill-badge ${ins.is_published ? 'af-pill-badge--green' : 'af-pill-badge--gray'}`}>
                              {ins.is_published ? 'PUBLISHED' : 'DRAFT'}
                            </span>
                          </td>
                          <td>
                            <div className="af-row-actions">
                              <button
                                className="af-btn-icon-sm"
                                onClick={() => { setFormErrors({}); goToItem('insights', ins.id) }}
                                title="Edit article"
                              >
                                <IconPencil />
                              </button>
                              <button
                                className="af-btn-icon-sm af-btn-icon-sm--danger"
                                onClick={() => {
                                  setDeleteConfirm({
                                    title: `Delete insight "${ins.title}"?`,
                                    action: async () => {
                                      await apiDeleteInsight(ins.id)
                                      showToast('Insight deleted.')
                                      loadAllData()
                                    }
                                  })
                                }}
                                title="Delete article"
                              >
                                <IconTrash />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* 8. TESTIMONIALS TAB */}
            {activeTab === 'testimonials' && (
              <div className="af-dash-panel">
                <div className="af-panel-header" style={{ alignItems: 'flex-end', gap: '12px', flexWrap: 'wrap' }}>
                  <div>
                    <h3 className="af-panel-title">Client Testimonials & Proof ({visibleTestimonials.length}{testimonialPageFilter === 'all' ? '' : ` of ${testimonials.length}`})</h3>
                    <p style={{ margin: '6px 0 0', color: '#64748b', fontSize: '12px' }}>Rows labeled <strong>DEMO SAMPLE</strong> are temporary published placeholders for layout/GSAP testing only. Replace or delete them before launch; only real client proof should remain in production.</p>
                  </div>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginLeft: 'auto', flexWrap: 'wrap' }}>
                    <select className="af-form-control" style={{ width: '230px' }} value={testimonialPageFilter} onChange={(e) => setTestimonialPageFilter(e.target.value)} aria-label="Filter testimonials by page">
                      <option value="all">All pages</option>
                      {cmsPages.map((page) => <option key={page.id} value={page.slug}>{page.name}</option>)}
                    </select>
                    <button className="af-action-btn-primary" onClick={() => { setEditingItem(null); setModalType('testimonial'); setFormErrors({}) }}>
                      <IconPlus /> Add Testimonial
                    </button>
                  </div>
                </div>

                <div className="af-table-responsive">
                  <table className="af-table">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Author Name</th>
                        <th>Role / Company</th>
                        <th>Quote</th>
                        <th>Metric / Headline</th>
                        <th>Rating</th>
                        <th>Appears on</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {visibleTestimonials.map((t) => (
                        <tr key={t.id} style={{ cursor: 'pointer' }} onClick={(event) => { if ((event.target as HTMLElement).closest('button,select,a,input')) return; goToItem('testimonials', t.id) }}>
                          <td><strong>#{t.id}</strong></td>
                          <td><strong>{t.author_name}</strong></td>
                          <td>{t.author_role}{t.author_company ? <><br /><small style={{ color: '#94a3b8' }}>{t.author_company}</small></> : null}</td>
                          <td style={{ maxWidth: '280px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>“{t.quote}”</td>
                          <td>{t.metric_value || t.metric_label ? <><strong>{t.metric_value}</strong> {t.metric_label}</> : <span style={{ color: '#94a3b8' }}>—</span>}</td>
                          <td style={{ color: '#f59e0b', fontSize: '1rem' }}>{'★'.repeat(t.rating)}</td>
                          <td><PageScopeBadges links={t.page_links} /></td>
                          <td><span className={`af-pill-badge ${t.is_published ? 'af-pill-badge--green' : 'af-pill-badge--gray'}`}>{t.is_published ? 'PUBLISHED' : 'DRAFT'}</span></td>
                          <td>
                            <div className="af-row-actions">
                              <button className="af-btn-icon-sm" onClick={() => { setFormErrors({}); goToItem('testimonials', t.id) }} title="Edit testimonial"><IconPencil /></button>
                              <button className="af-btn-icon-sm af-btn-icon-sm--danger" onClick={() => {
                                setDeleteConfirm({
                                  title: `Delete testimonial #${t.id} from "${t.author_name}"?`,
                                  action: async () => { await apiDeleteTestimonial(t.id); showToast('Testimonial deleted.'); loadAllData() }
                                })
                              }} title="Delete testimonial"><IconTrash /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {!visibleTestimonials.length ? <tr><td colSpan={9} style={{ textAlign: 'center', padding: '28px', color: '#64748b' }}>No testimonials are assigned to this page yet.</td></tr> : null}
                    </tbody>
                  </table>
                </div>

                {testimonialPageFilter !== 'all' ? (
                  <div style={{ marginTop: '24px', borderTop: '1px solid #e2e8f0', paddingTop: '22px' }}>
                    <div className="af-panel-header" style={{ marginBottom: '12px' }}>
                      <div>
                        <h3 className="af-panel-title">Section Display Settings — {cmsPages.find((page) => page.slug === testimonialPageFilter)?.name}</h3>
                        <p style={{ margin: '5px 0 0', color: '#64748b', fontSize: '12px' }}>These fields control the testimonial section heading, verified summary labels and review CTA for this page.</p>
                      </div>
                    </div>
                    {testimonialSettingsLoading ? <p style={{ color: '#64748b' }}>Loading section settings…</p> : testimonialSectionSettings ? (
                      <form key={`${testimonialSectionSettings.id}-${testimonialPageFilter}`} onSubmit={handleTestimonialSectionSettingsSubmit}>
                        <div className="af-form-grid-2">
                          <div className="af-form-row"><label className="af-form-label">Eyebrow</label><input className="af-form-control" name="eyebrow" defaultValue={testimonialSectionSettings.eyebrow} /></div>
                          <div className="af-form-row"><label className="af-form-label">Section Title *</label><input className="af-form-control" name="title" defaultValue={testimonialSectionSettings.title} /></div>
                        </div>
                        <div className="af-form-row"><label className="af-form-label">Section Description</label><textarea className="af-form-control" name="description" rows={3} defaultValue={testimonialSectionSettings.description || ''} /></div>
                        <div className="af-form-grid-2">
                          <div className="af-form-row"><label className="af-form-label">Client Count Label</label><input className="af-form-control" name="client_count_label" defaultValue={testimonialSectionSettings.client_count_label || ''} placeholder="Leave blank to derive from published records" /></div>
                          <div className="af-form-row"><label className="af-form-label">Verified Aggregate Rating</label><input className="af-form-control" type="number" min="0" max="5" step="0.1" name="aggregate_rating" defaultValue={testimonialSectionSettings.aggregate_rating ?? ''} placeholder="Leave blank to derive from published records" /></div>
                        </div>
                        <div className="af-form-grid-2">
                          <div className="af-form-row"><label className="af-form-label">Review Count Label</label><input className="af-form-control" name="review_count_label" defaultValue={testimonialSectionSettings.review_count_label || ''} placeholder="Leave blank to derive from published records" /></div>
                          <div className="af-form-row"><label className="af-form-label">CTA Label</label><input className="af-form-control" name="cta_label" defaultValue={testimonialSectionSettings.cta_label || 'View all reviews'} /></div>
                        </div>
                        <div className="af-form-row"><label className="af-form-label">CTA URL</label><input className="af-form-control" name="cta_url" defaultValue={testimonialSectionSettings.cta_url || ''} placeholder="Optional verified review destination" /></div>
                        <div className="af-form-row"><label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontWeight: 600, color: '#334155' }}><input type="checkbox" name="is_enabled" defaultChecked={testimonialSectionSettings.is_enabled} /> Enable this testimonial section when published testimonials exist</label></div>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '14px' }}><button type="submit" className="af-action-btn-primary" disabled={isSaving}>{isSaving ? 'Saving…' : 'Save Section Settings'}</button></div>
                      </form>
                    ) : <p style={{ color: '#64748b' }}>No testimonial section settings exist for this page yet. Run the latest database migration first.</p>}
                  </div>
                ) : null}
              </div>
            )}

            {/* 9. INQUIRIES / LEADS TAB */}
            {activeTab === 'inquiries' && (
              <div className="af-dash-panel">
                <div className="af-panel-header af-inquiries-header">
                  <div className="af-inquiries-heading">
                    <h3 className="af-panel-title">Patient Consultation Requests ({inquiries.length})</h3>
                    <p className="af-inquiries-subtitle">
                      Real-time patient acquisition leads received via consultation forms.
                    </p>
                  </div>

                  <div className="af-panel-actions af-inquiries-filters">
                    <label className="af-inquiry-search">
                      <span className="af-inquiry-search__icon"><IconSearch /></span>
                      <input
                        type="text"
                        placeholder="Search leads..."
                        className="af-form-control af-inquiry-search__input"
                        value={inquirySearch}
                        onChange={(e) => setInquirySearch(e.target.value)}
                      />
                    </label>

                    <select
                      className="af-form-control af-inquiry-status-filter"
                      value={inquiryFilter}
                      onChange={(e) => setInquiryFilter(e.target.value as any)}
                    >
                      <option value="all">All Statuses</option>
                      <option value="new">New ({newInquiryCount})</option>
                      <option value="read">Read</option>
                      <option value="archived">Archived</option>
                    </select>
                  </div>
                </div>

                <div className="af-table-responsive">
                  <table className="af-table">
                    <thead>
                      <tr>
                        <th>Patient / Contact</th>
                        <th>Practice / Specialty</th>
                        <th>Phone / WhatsApp</th>
                        <th>Message Preview</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredInquiries.map((inq) => (
                        <tr key={inq.id} style={{ cursor: 'pointer' }} onClick={(event) => { if ((event.target as HTMLElement).closest('button,select,a,input')) return; goToItem('inquiries', inq.id) }}>
                          <td><strong>{inq.name}</strong></td>
                          <td>{inq.business || '—'}</td>
                          <td>
                            <a href={`tel:${inq.contact}`} style={{ color: '#0f766e', fontWeight: 600 }}>
                              {inq.contact}
                            </a>
                          </td>
                          <td style={{ maxWidth: '280px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {inq.message}
                          </td>
                          <td>
                            <select
                              value={inq.status}
                              onChange={async (e) => {
                                await apiUpdateInquiryStatus(inq.id, e.target.value as any)
                                showToast('Status updated!')
                                loadAllData()
                              }}
                              className="af-form-control"
                              style={{ width: 'auto', padding: '0.35rem 0.65rem', fontSize: '0.82rem' }}
                            >
                              <option value="new">NEW</option>
                              <option value="read">READ</option>
                              <option value="archived">ARCHIVED</option>
                            </select>
                          </td>
                          <td>
                            <div className="af-row-actions">
                              <button
                                className="af-btn-icon-sm"
                                onClick={() => goToItem('inquiries', inq.id)}
                                title="View full message"
                              >
                                <IconEye />
                              </button>
                              <button
                                className="af-btn-icon-sm af-btn-icon-sm--danger"
                                onClick={() => {
                                  setDeleteConfirm({
                                    title: `Delete inquiry from ${inq.name}?`,
                                    action: async () => {
                                      await apiDeleteInquiry(inq.id)
                                      showToast('Inquiry deleted.')
                                      loadAllData()
                                    }
                                  })
                                }}
                                title="Delete inquiry"
                              >
                                <IconTrash />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {filteredInquiries.length === 0 && (
                        <tr><td colSpan={6} style={{ textAlign: 'center', padding: '2rem', color: '#64748b' }}>No matching consultation requests found.</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* 10. SITE & FOOTER SETTINGS TAB */}
            {activeTab === 'settings' && (
              <div>
                <div className="af-dash-panel" style={{ padding: '2rem', marginBottom: '2rem' }}>
                  <h3 className="af-panel-title" style={{ marginBottom: '1.5rem' }}>Site-Wide & Contact Configuration</h3>
                  <form onSubmit={handleSettingsSubmit}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
                      <div className="af-form-row">
                        <label className="af-form-label">Agency Name *</label>
                        <input className="af-form-control" name="site_name" defaultValue={settingsData.settings?.site_name} required />
                      </div>
                      <div className="af-form-row">
                        <label className="af-form-label">Tagline</label>
                        <input className="af-form-control" name="tagline" defaultValue={settingsData.settings?.tagline} />
                      </div>
                      <div className="af-form-row" style={{ gridColumn: 'span 2' }}>
                        <label className="af-form-label">Positioning Statement</label>
                        <input className="af-form-control" name="positioning" defaultValue={settingsData.settings?.positioning} />
                      </div>
                      <div className="af-form-row">
                        <label className="af-form-label">Phone Display (e.g. +92 300 1234567)</label>
                        <input className="af-form-control" name="phone_display" defaultValue={settingsData.settings?.phone_display} />
                      </div>
                      <div className="af-form-row">
                        <label className="af-form-label">Phone Href (e.g. tel:+923001234567)</label>
                        <input className="af-form-control" name="phone_href" defaultValue={settingsData.settings?.phone_href} />
                      </div>
                      <div className="af-form-row">
                        <label className="af-form-label">Public Email</label>
                        <input className="af-form-control" type="email" name="email" defaultValue={settingsData.settings?.email} />
                      </div>
                      <div className="af-form-row">
                        <label className="af-form-label">WhatsApp Contact URL</label>
                        <input className="af-form-control" name="whatsapp_url" defaultValue={settingsData.settings?.whatsapp_url} />
                      </div>
                      <div className="af-form-row"><label className="af-form-label">Default Meta Title</label><input className="af-form-control" name="meta_title" defaultValue={settingsData.settings?.meta_title || ''} /></div>
                      <div className="af-form-row"><label className="af-form-label">Default Meta Description</label><input className="af-form-control" name="meta_description" defaultValue={settingsData.settings?.meta_description || ''} /></div>
                      <div className="af-form-row" style={{ gridColumn: 'span 2' }}>
                        <label className="af-form-label">Footer Description</label>
                        <textarea className="af-form-control" name="footer_description" defaultValue={settingsData.settings?.footer_description} />
                      </div>
                    </div>
                    <PageScopeField pages={cmsPages} links={settingsData.settings?.page_links?.length ? settingsData.settings.page_links : allPageLinks()} label="Site/footer settings appear on" />

                    <button type="submit" className="af-action-btn-primary" style={{ marginTop: '1rem' }} disabled={isSaving}>
                      {isSaving ? 'Saving...' : 'Save Site Settings'}
                    </button>
                  </form>
                </div>

                {/* Social Links Manager */}
                <div className="af-dash-panel">
                  <div className="af-panel-header">
                    <h3 className="af-panel-title">Footer Social Links ({settingsData.social_links.length})</h3>
                    <button
                      className="af-action-btn-primary"
                      onClick={() => { setEditingItem(null); setModalType('new_social') }}
                    >
                      <IconPlus /> Add Social Link
                    </button>
                  </div>

                  <div className="af-table-responsive">
                    <table className="af-table">
                      <thead>
                        <tr>
                          <th>Platform</th>
                          <th>Display Label</th>
                          <th>URL</th>
                          <th>Appears on</th>
                          <th>Sort</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {settingsData.social_links.map((link) => (
                          <tr key={link.id} style={{ cursor: 'pointer' }} onClick={(event) => { if ((event.target as HTMLElement).closest('button,select,a,input')) return; goToItem('settings', link.id) }}>
                            <td><strong>{link.icon}</strong></td>
                            <td>{link.label}</td>
                            <td><a href={link.href} target="_blank" rel="noopener noreferrer" style={{ color: '#0f766e' }}>{link.href}</a></td>
                            <td><PageScopeBadges links={link.page_links} /></td>
                            <td>{link.sort_order}</td>
                            <td>
                              <div className="af-row-actions">
                                <button
                                  className="af-btn-icon-sm"
                                  onClick={() => goToItem('settings', link.id)}
                                  title="Edit link"
                                >
                                  <IconPencil />
                                </button>
                                <button
                                  className="af-btn-icon-sm af-btn-icon-sm--danger"
                                  onClick={() => {
                                    setDeleteConfirm({
                                      title: `Delete ${link.label || link.icon} link?`,
                                      action: async () => {
                                        await apiDeleteSocialLink(link.id)
                                        showToast('Social link deleted.')
                                        loadAllData()
                                      }
                                    })
                                  }}
                                  title="Delete link"
                                >
                                  <IconTrash />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* ==========================================================================
          MODALS & DIALOGS (WITH PERFECT SCROLLBARS & FLEXIBLE OVERFLOW)
          ========================================================================== */}

      {/* 1. Solution Modal */}
      {modalType === 'solution' && (
        <div className="af-modal-backdrop">
          <div className="af-modal-card">
            <div className="af-modal-header">
              <h3>{editingItem ? 'Edit Solution' : 'Add New Healthcare Solution'}</h3>
              <button className="af-modal-close-btn" onClick={() => { setModalType(null); setEditingItem(null); goToTab(activeTab) }}>✕</button>
            </div>
            <form onSubmit={handleSolutionSubmit}>
              <div className="af-modal-body">
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="af-form-row">
                    <label className="af-form-label">Solution Name *</label>
                    <input className={`af-form-control ${formErrors.name ? 'is-invalid' : ''}`} name="name" defaultValue={editingItem?.name} />
                    {formErrors.name && <span className="af-form-error">{formErrors.name}</span>}
                  </div>
                  <div className="af-form-row">
                    <label className="af-form-label">Slug (URL identifier) *</label>
                    <input className={`af-form-control ${formErrors.slug ? 'is-invalid' : ''}`} name="slug" defaultValue={editingItem?.slug} placeholder="e.g. website-development" />
                    {formErrors.slug && <span className="af-form-error">{formErrors.slug}</span>}
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="af-form-row">
                    <label className="af-form-label">Layout Template</label>
                    <select className="af-form-control" name="layout" defaultValue={editingItem?.layout || '02'}>
                      <option value="02">Layout 02 (Brand & Creative Communication)</option>
                      <option value="03">Layout 03 (Advanced Digital Systems)</option>
                      <option value="04">Layout 04 (Patient Acquisition & Lead Gen)</option>
                      <option value="05">Layout 05 (Website Development)</option>
                      <option value="06">Layout 06 (Social Media & Lead Comm)</option>
                      <option value="07">Layout 07 (Digital Growth Strategy)</option>
                    </select>
                  </div>
                  <div className="af-form-row">
                    <label className="af-form-label">Sort Order</label>
                    <input className="af-form-control" type="number" name="sort_order" defaultValue={editingItem?.sort_order ?? 1} />
                  </div>
                </div>

                <div className="af-form-row">
                  <label className="af-form-label">Eyebrow Tag</label>
                  <input className="af-form-control" name="eyebrow" defaultValue={editingItem?.eyebrow} placeholder="e.g. Healthcare Growth" />
                </div>

                <div className="af-form-row">
                  <label className="af-form-label">Hero Title</label>
                  <input className="af-form-control" name="title" defaultValue={editingItem?.title} placeholder="Main page headline" />
                </div>

                <div className="af-form-row">
                  <label className="af-form-label">Summary Description *</label>
                  <textarea className={`af-form-control ${formErrors.description ? 'is-invalid' : ''}`} name="description" defaultValue={editingItem?.description} />
                  {formErrors.description && <span className="af-form-error">{formErrors.description}</span>}
                </div>

                <div className="af-form-row">
                  <label className="af-form-label">Intro Paragraph *</label>
                  <textarea className={`af-form-control ${formErrors.intro ? 'is-invalid' : ''}`} name="intro" defaultValue={editingItem?.intro} />
                  {formErrors.intro && <span className="af-form-error">{formErrors.intro}</span>}
                </div>

                <div className="af-form-row">
                  <label className="af-form-label">Features List (Format: Title: Description, one per line)</label>
                  <textarea
                    className="af-form-control"
                    name="features_text"
                    defaultValue={editingItem?.features ? editingItem.features.map((f: any) => `${f.title}: ${f.description}`).join('\n') : ''}
                    placeholder="Patient Booking System: Connect directly to clinic calendars&#10;Google Profile SEO: Optimize local ranking"
                    rows={4}
                  />
                </div>

                <div className="af-form-row">
                  <label className="af-form-label">Touchpoints / Channels (Comma-separated)</label>
                  <input
                    className="af-form-control"
                    name="touchpoints_text"
                    defaultValue={editingItem?.touchpoints ? editingItem.touchpoints.map((t: any) => t.label || t).join(', ') : ''}
                    placeholder="WhatsApp, Instagram, Google Maps, Booking Portal"
                  />
                </div>

                <div className="af-form-row">
                  <label className="af-form-label">Process Steps (Format: Title: Description, one per line)</label>
                  <textarea className="af-form-control" name="process_text" rows={4} defaultValue={editingItem?.process ? editingItem.process.map((step: any) => `${step.title}: ${step.description}`).join('\n') : ''} placeholder="Discovery: Understand current visibility and growth gaps&#10;Strategy: Define the connected growth path" />
                </div>

                <div className="af-form-row">
                  <label className="af-form-label">Content Gap / Pending Input Note</label>
                  <textarea className="af-form-control" name="content_gap" rows={2} defaultValue={editingItem?.content_gap || ''} />
                </div>

                <div className="af-form-row">
                  <label className="af-form-label">Proof / Trust Note</label>
                  <textarea className="af-form-control" name="proof_note" rows={2} defaultValue={editingItem?.proof_note || ''} />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="af-form-row">
                    <label className="af-form-label">SEO Title</label>
                    <input className="af-form-control" name="seo_title" defaultValue={editingItem?.seo_title} />
                  </div>
                  <div className="af-form-row">
                    <label className="af-form-label">SEO Meta Description</label>
                    <input className="af-form-control" name="seo_description" defaultValue={editingItem?.seo_description} />
                  </div>
                </div>

                <div className="af-form-row">
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontWeight: 600, color: '#334155' }}>
                    <input type="checkbox" name="is_published" defaultChecked={editingItem ? editingItem.is_published : false} />
                    Active & Published on Website
                  </label>
                </div>
                {!editingItem ? <div className="af-scope-notice">A dedicated solution page will be created automatically and permanently linked to this solution when you save it.</div> : null}
                <PageScopeField pages={cmsPages} links={editingItem?.page_links || pageLinksFor('home', 'solutions')} lockedPageSlugs={editingItem?.slug ? [`solution:${editingItem.slug}`] : []} />
              </div>

              <div className="af-modal-footer">
                <button type="button" className="af-btn-ghost" onClick={() => { setModalType(null); setEditingItem(null); goToTab(activeTab) }}>Cancel</button>
                <button type="submit" className="af-action-btn-primary" disabled={isSaving}>
                  {isSaving ? 'Saving Solution...' : 'Save Solution'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 2. Program Modal */}
      {modalType === 'program' && (
        <div className="af-modal-backdrop">
          <div className="af-modal-card">
            <div className="af-modal-header">
              <h3>{editingItem ? 'Edit Growth Program' : 'Add New Growth Program'}</h3>
              <button className="af-modal-close-btn" onClick={() => { setModalType(null); setEditingItem(null); goToTab(activeTab) }}>✕</button>
            </div>
            <form onSubmit={handleProgramSubmit}>
              <div className="af-modal-body">
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="af-form-row">
                    <label className="af-form-label">Plan Name *</label>
                    <input className={`af-form-control ${formErrors.name ? 'is-invalid' : ''}`} name="name" defaultValue={editingItem?.name} />
                    {formErrors.name && <span className="af-form-error">{formErrors.name}</span>}
                  </div>
                  <div className="af-form-row">
                    <label className="af-form-label">Slug *</label>
                    <input className={`af-form-control ${formErrors.slug ? 'is-invalid' : ''}`} name="slug" defaultValue={editingItem?.slug} placeholder="e.g. starter-presence" />
                    {formErrors.slug && <span className="af-form-error">{formErrors.slug}</span>}
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '1rem' }}>
                  <div className="af-form-row">
                    <label className="af-form-label">Price *</label>
                    <input className={`af-form-control ${formErrors.price ? 'is-invalid' : ''}`} type="number" name="price" defaultValue={editingItem?.price} />
                    {formErrors.price && <span className="af-form-error">{formErrors.price}</span>}
                  </div>
                  <div className="af-form-row">
                    <label className="af-form-label">Currency</label>
                    <input className="af-form-control" name="currency" defaultValue={editingItem?.currency || 'PKR'} />
                  </div>
                  <div className="af-form-row">
                    <label className="af-form-label">Sort Order</label>
                    <input className="af-form-control" type="number" name="sort_order" defaultValue={editingItem?.sort_order ?? 1} />
                  </div>
                </div>

                <div className="af-form-row">
                  <label className="af-form-label">Target Purpose</label>
                  <input className="af-form-control" name="purpose" defaultValue={editingItem?.purpose} placeholder="e.g. Online Presence & Trust Building" />
                </div>

                <div className="af-form-row">
                  <label className="af-form-label">Program Icon Key</label>
                  <input className="af-form-control" name="icon" defaultValue={editingItem?.icon || 'seed'} placeholder="e.g. seed, growth, authority" />
                </div>

                <div className="af-form-row">
                  <label className="af-form-label">Supported Platforms</label>
                  <input className="af-form-control" name="platforms" defaultValue={editingItem?.platforms} placeholder="e.g. Facebook + Instagram + Google" />
                </div>

                <div className="af-form-row">
                  <label className="af-form-label">Best For (One statement per line)</label>
                  <textarea
                    className="af-form-control"
                    name="bestFor"
                    defaultValue={editingItem?.bestFor ? editingItem.bestFor.join('\n') : ''}
                    placeholder="Clinics starting digital presence&#10;Practices needing foundational trust"
                    rows={4}
                  />
                </div>

                <div className="af-form-row">
                  <label className="af-form-label">Included Deliverables (One feature per line)</label>
                  <textarea
                    className="af-form-control"
                    name="includes"
                    defaultValue={editingItem?.includes ? editingItem.includes.join('\n') : ''}
                    placeholder="12 Professional Social Posts&#10;Google Business Profile Optimization&#10;WhatsApp Lead Directing"
                    rows={5}
                  />
                </div>

                <div style={{ display: 'flex', gap: '2rem', marginTop: '1rem' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontWeight: 600, color: '#334155' }}>
                    <input type="checkbox" name="is_popular" defaultChecked={editingItem?.is_popular} />
                    Highlight as Most Popular
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontWeight: 600, color: '#334155' }}>
                    <input type="checkbox" name="is_published" defaultChecked={editingItem ? editingItem.is_published : false} />
                    Published & Visible
                  </label>
                </div>
                <PageScopeField pages={cmsPages} links={editingItem?.page_links || programDefaultLinks()} />
              </div>

              <div className="af-modal-footer">
                <button type="button" className="af-btn-ghost" onClick={() => { setModalType(null); setEditingItem(null); goToTab(activeTab) }}>Cancel</button>
                <button type="submit" className="af-action-btn-primary" disabled={isSaving}>
                  {isSaving ? 'Saving Program...' : 'Save Program'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Program Commercial Term Modal */}
      {modalType === 'program_term' && (
        <div className="af-modal-backdrop">
          <div className="af-modal-card" style={{ maxWidth: '620px' }}>
            <div className="af-modal-header"><h3>{editingItem ? `Edit Commercial Term #${editingItem.id}` : 'Add Commercial Term'}</h3><button className="af-modal-close-btn" onClick={() => { setModalType(null); setEditingItem(null); goToTab('programs') }}>✕</button></div>
            <form onSubmit={handleProgramTermSubmit}>
              <div className="af-modal-body">
                <div className="af-form-row"><label className="af-form-label">Term *</label><textarea className="af-form-control" name="label" rows={3} defaultValue={editingItem?.label} required /></div>
                <div className="af-form-row"><label className="af-form-label">Sort Order</label><input className="af-form-control" type="number" name="sort_order" defaultValue={editingItem?.sort_order ?? programsData.terms.length + 1} /></div>
                <PageScopeField pages={cmsPages} links={editingItem?.page_links || programDefaultLinks()} />
              </div>
              <div className="af-modal-footer"><button type="button" className="af-btn-ghost" onClick={() => { setModalType(null); setEditingItem(null); goToTab('programs') }}>Cancel</button><button type="submit" className="af-action-btn-primary" disabled={isSaving}>{isSaving ? 'Saving...' : 'Save Term'}</button></div>
            </form>
          </div>
        </div>
      )}

      {/* 3. Section Header Edit Modal */}
      {modalType === 'edit_section_header' && (
        <div className="af-modal-backdrop">
          <div className="af-modal-card" style={{ maxWidth: '600px' }}>
            <div className="af-modal-header">
              <h3>Edit Section Copy ({editingItem?.section_key})</h3>
              <button className="af-modal-close-btn" onClick={() => { setModalType(null); setEditingItem(null); goToTab(activeTab) }}>✕</button>
            </div>
            <form onSubmit={handleSectionHeaderSubmit}>
              <div className="af-modal-body">
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '1rem' }}>
                  <div className="af-form-row">
                    <label className="af-form-label">Eyebrow Tag</label>
                    <input className="af-form-control" name="eyebrow_tag" defaultValue={editingItem?.eyebrow_tag} />
                  </div>
                  <div className="af-form-row">
                    <label className="af-form-label">Eyebrow Subtext</label>
                    <input className="af-form-control" name="eyebrow_text" defaultValue={editingItem?.eyebrow_text} />
                  </div>
                </div>

                <div className="af-form-row">
                  <label className="af-form-label">Main Section Title *</label>
                  <input className="af-form-control" name="title" defaultValue={editingItem?.title} required />
                </div>

                <div className="af-form-row">
                  <label className="af-form-label">Section Description</label>
                  <textarea className="af-form-control" name="description" defaultValue={editingItem?.description} rows={3} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 120px', gap: '1rem' }}>
                  <div className="af-form-row"><label className="af-form-label">Meta Title</label><input className="af-form-control" name="meta_title" defaultValue={editingItem?.meta_title || ''} /></div>
                  <div className="af-form-row"><label className="af-form-label">Meta Description</label><input className="af-form-control" name="meta_description" defaultValue={editingItem?.meta_description || ''} /></div>
                  <div className="af-form-row"><label className="af-form-label">Sort</label><input className="af-form-control" type="number" name="sort_order" defaultValue={editingItem?.sort_order || 0} /></div>
                </div>
                <div className="af-form-row"><label className="af-form-label">Section Data (JSON)</label><textarea className="af-form-control" name="data_json" rows={3} defaultValue={editingItem?.data ? (typeof editingItem.data === 'string' ? editingItem.data : JSON.stringify(editingItem.data, null, 2)) : ''} /></div>
                <PageScopeField pages={cmsPages} links={editingItem?.page_links || pageLinksFor(testimonialPageFilter !== 'all' ? testimonialPageFilter : 'home')} />
              </div>

              <div className="af-modal-footer">
                <button type="button" className="af-btn-ghost" onClick={() => { setModalType(null); setEditingItem(null); goToTab(activeTab) }}>Cancel</button>
                <button type="submit" className="af-action-btn-primary" disabled={isSaving}>
                  {isSaving ? 'Saving...' : 'Save Section Copy'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 4. Section Item Modal (Bento Items, Process Steps, Audience Segments, FAQs) */}
      {(modalType === 'new_section_item' || modalType === 'edit_section_item') && (
        <div className="af-modal-backdrop">
          <div className="af-modal-card" style={{ maxWidth: '620px' }}>
            <div className="af-modal-header">
              <h3>{modalType === 'edit_section_item' ? 'Edit Item' : 'Add Section Item'}</h3>
              <button className="af-modal-close-btn" onClick={() => { setModalType(null); setEditingItem(null); goToTab(activeTab) }}>✕</button>
            </div>
            <form onSubmit={handleSectionItemSubmit}>
              <div className="af-modal-body">
                <div className="af-form-row">
                  <label className="af-form-label">Title / Question *</label>
                  <input className={`af-form-control ${formErrors.title ? 'is-invalid' : ''}`} name="title" defaultValue={editingItem?.title} />
                  {formErrors.title && <span className="af-form-error">{formErrors.title}</span>}
                </div>

                <div className="af-form-row">
                  <label className="af-form-label">Group Key</label>
                  <input className="af-form-control" name="group_key" defaultValue={editingItem?.group_key || ''} placeholder="Optional grouping key" />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                  <div className="af-form-row">
                    <label className="af-form-label">Label</label>
                    <input className="af-form-control" name="label" defaultValue={editingItem?.label} placeholder="e.g. Doctors, Step 1" />
                  </div>
                  <div className="af-form-row">
                    <label className="af-form-label">Icon</label>
                    <input className="af-form-control" name="icon" defaultValue={editingItem?.icon} placeholder="e.g. doctor, clinic, chart" />
                  </div>
                  <div className="af-form-row">
                    <label className="af-form-label">Sort Order</label>
                    <input className="af-form-control" type="number" name="sort_order" defaultValue={editingItem?.sort_order ?? 1} />
                  </div>
                </div>

                <div className="af-form-row">
                  <label className="af-form-label">Description / Answer *</label>
                  <textarea className="af-form-control" name="description" defaultValue={editingItem?.description} rows={4} />
                </div>
                <div className="af-form-row"><label className="af-form-label">Extra Data (JSON)</label><textarea className="af-form-control" name="extra_json" rows={3} defaultValue={editingItem?.extra ? (typeof editingItem.extra === 'string' ? editingItem.extra : JSON.stringify(editingItem.extra, null, 2)) : ''} /></div>
                <PageScopeField pages={cmsPages} links={editingItem?.page_links || parentSectionLinks(activeSectionId || editingItem?.section_id)} />
              </div>

              <div className="af-modal-footer">
                <button type="button" className="af-btn-ghost" onClick={() => { setModalType(null); setEditingItem(null); goToTab(activeTab) }}>Cancel</button>
                <button type="submit" className="af-action-btn-primary" disabled={isSaving}>
                  {isSaving ? 'Saving...' : 'Save Item'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Dedicated FAQ Modal */}
      {modalType === 'faq' && (
        <div className="af-modal-backdrop">
          <div className="af-modal-card" style={{ maxWidth: '680px' }}>
            <div className="af-modal-header">
              <h3>{editingItem ? `Edit FAQ #${editingItem.id}` : 'Add FAQ'}</h3>
              <button className="af-modal-close-btn" onClick={() => { setModalType(null); setEditingItem(null); goToTab('faqs') }}>✕</button>
            </div>
            <form onSubmit={handleFaqSubmit}>
              <div className="af-modal-body">
                {editingItem?.id ? <div className="af-scope-notice">Database record ID: <strong>#{editingItem.id}</strong>. Sort order is display-only and is never used to identify this FAQ.</div> : null}
                <div className="af-form-row">
                  <label className="af-form-label">Question *</label>
                  <input className={`af-form-control ${formErrors.question ? 'is-invalid' : ''}`} name="question" defaultValue={editingItem?.question} />
                  {formErrors.question && <span className="af-form-error">{formErrors.question}</span>}
                </div>
                <div className="af-form-row">
                  <label className="af-form-label">Answer *</label>
                  <textarea className={`af-form-control ${formErrors.answer ? 'is-invalid' : ''}`} name="answer" defaultValue={editingItem?.answer} rows={6} />
                  {formErrors.answer && <span className="af-form-error">{formErrors.answer}</span>}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="af-form-row"><label className="af-form-label">Sort Order</label><input className="af-form-control" type="number" name="sort_order" defaultValue={editingItem?.sort_order ?? 1} /></div>
                  <div className="af-form-row"><label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '2rem', fontWeight: 600 }}><input type="checkbox" name="is_published" defaultChecked={editingItem ? editingItem.is_published : false} /> Published & Visible</label></div>
                </div>
                <PageScopeField pages={cmsPages} links={editingItem?.page_links || pageLinksFor(testimonialPageFilter !== 'all' ? testimonialPageFilter : 'home')} />
              </div>
              <div className="af-modal-footer">
                <button type="button" className="af-btn-ghost" onClick={() => { setModalType(null); setEditingItem(null); goToTab('faqs') }}>Cancel</button>
                <button type="submit" className="af-action-btn-primary" disabled={isSaving}>{isSaving ? 'Saving...' : 'Save FAQ'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 5. Insight Modal */}
      {modalType === 'insight' && (
        <div className="af-modal-backdrop">
          <div className="af-modal-card">
            <div className="af-modal-header">
              <h3>{editingItem ? 'Edit Insight Article' : 'Write New Insight Article'}</h3>
              <button className="af-modal-close-btn" onClick={() => { setModalType(null); setEditingItem(null); goToTab(activeTab) }}>✕</button>
            </div>
            <form onSubmit={handleInsightSubmit}>
              <div className="af-modal-body">
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1rem' }}>
                  <div className="af-form-row">
                    <label className="af-form-label">Article Title *</label>
                    <input className={`af-form-control ${formErrors.title ? 'is-invalid' : ''}`} name="title" defaultValue={editingItem?.title} />
                    {formErrors.title && <span className="af-form-error">{formErrors.title}</span>}
                  </div>
                  <div className="af-form-row">
                    <label className="af-form-label">Category</label>
                    <input className="af-form-control" name="category" defaultValue={editingItem?.category || 'Healthcare'} />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1rem' }}>
                  <div className="af-form-row">
                    <label className="af-form-label">Slug (URL identifier) *</label>
                    <input className={`af-form-control ${formErrors.slug ? 'is-invalid' : ''}`} name="slug" defaultValue={editingItem?.slug} placeholder="e.g. patient-trust-before-inquiry" />
                    {formErrors.slug && <span className="af-form-error">{formErrors.slug}</span>}
                  </div>
                  <div className="af-form-row">
                    <label className="af-form-label">Sort Order</label>
                    <input className="af-form-control" type="number" name="sort_order" defaultValue={editingItem?.sort_order ?? 1} />
                  </div>
                </div>

                <div className="af-form-row">
                  <label className="af-form-label">Cover Image URL</label>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <input className="af-form-control" id="insight_image_url" name="image_url" defaultValue={editingItem?.image_url} placeholder="https://..." />
                    <label className="af-action-btn-secondary" style={{ cursor: 'pointer', whiteSpace: 'nowrap' }}>
                      <IconUpload /> {isUploading ? 'Uploading...' : 'Upload'}
                      <input type="file" accept="image/*" style={{ display: 'none' }} onChange={(e) => handleImageFileChange(e, 'insight_image_url')} />
                    </label>
                  </div>
                </div>

                <div className="af-form-row">
                  <label className="af-form-label">Published At</label>
                  <input className="af-form-control" type="datetime-local" name="published_at" defaultValue={editingItem?.published_at ? String(editingItem.published_at).slice(0,16) : ''} />
                </div>

                <div className="af-form-row">
                  <label className="af-form-label">Brief Summary / Excerpt *</label>
                  <textarea className={`af-form-control ${formErrors.excerpt ? 'is-invalid' : ''}`} name="excerpt" defaultValue={editingItem?.excerpt} rows={2} />
                  {formErrors.excerpt && <span className="af-form-error">{formErrors.excerpt}</span>}
                </div>

                <div className="af-form-row">
                  <label className="af-form-label">Complete Article Body Content *</label>
                  <textarea className={`af-form-control ${formErrors.body ? 'is-invalid' : ''}`} name="body" defaultValue={editingItem?.body} rows={7} />
                  {formErrors.body && <span className="af-form-error">{formErrors.body}</span>}
                </div>

                <div className="af-form-row">
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontWeight: 600, color: '#334155' }}>
                    <input type="checkbox" name="is_published" defaultChecked={editingItem ? editingItem.is_published : false} />
                    Published & Visible
                  </label>
                </div>
                <PageScopeField pages={cmsPages} links={editingItem?.page_links || pageLinksFor('insights')} />
              </div>

              <div className="af-modal-footer">
                <button type="button" className="af-btn-ghost" onClick={() => { setModalType(null); setEditingItem(null); goToTab(activeTab) }}>Cancel</button>
                <button type="submit" className="af-action-btn-primary" disabled={isSaving || isUploading}>
                  {isSaving ? 'Saving...' : 'Save Article'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 6. Testimonial Modal */}
      {modalType === 'testimonial' && (
        <div className="af-modal-backdrop">
          <div className="af-modal-card" style={{ maxWidth: '780px' }}>
            <div className="af-modal-header">
              <h3>{editingItem ? `Edit Testimonial #${editingItem.id}` : 'Add Client Testimonial'}</h3>
              <button className="af-modal-close-btn" onClick={() => { setModalType(null); setEditingItem(null); goToTab(activeTab) }}>✕</button>
            </div>
            <form onSubmit={handleTestimonialSubmit}>
              <div className="af-modal-body">
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="af-form-row">
                    <label className="af-form-label">Author Name *</label>
                    <input className={`af-form-control ${formErrors.author_name ? 'is-invalid' : ''}`} name="author_name" defaultValue={editingItem?.author_name} />
                    {formErrors.author_name && <span className="af-form-error">{formErrors.author_name}</span>}
                  </div>
                  <div className="af-form-row">
                    <label className="af-form-label">Role / Practice *</label>
                    <input className={`af-form-control ${formErrors.author_role ? 'is-invalid' : ''}`} name="author_role" defaultValue={editingItem?.author_role} placeholder="e.g. Medical Director, Dental Center" />
                    {formErrors.author_role && <span className="af-form-error">{formErrors.author_role}</span>}
                  </div>
                </div>

                <div className="af-form-row">
                  <label className="af-form-label">Company / Practice Name</label>
                  <input className="af-form-control" name="author_company" defaultValue={editingItem?.author_company || ''} placeholder="Optional verified organization name" />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="af-form-row">
                    <label className="af-form-label">Star Rating (1 - 5)</label>
                    <select className="af-form-control" name="rating" defaultValue={editingItem?.rating || 5}>
                      <option value="5">★★★★★ (5 Stars)</option>
                      <option value="4">★★★★☆ (4 Stars)</option>
                      <option value="3">★★★☆☆ (3 Stars)</option>
                      <option value="2">★★☆☆☆ (2 Stars)</option>
                      <option value="1">★☆☆☆☆ (1 Star)</option>
                    </select>
                  </div>
                  <div className="af-form-row">
                    <label className="af-form-label">Sort Order</label>
                    <input className="af-form-control" type="number" name="sort_order" defaultValue={editingItem?.sort_order ?? 1} />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="af-form-row">
                    <label className="af-form-label">Metric Value / Highlight</label>
                    <input className="af-form-control" name="metric_value" defaultValue={editingItem?.metric_value || ''} placeholder="e.g. verified 2X result only when evidenced" />
                    <small style={{ color: '#64748b' }}>Used by metric-highlight layouts. Do not enter unsupported performance claims.</small>
                  </div>
                  <div className="af-form-row">
                    <label className="af-form-label">Metric Label / Headline</label>
                    <input className="af-form-control" name="metric_label" defaultValue={editingItem?.metric_label || ''} placeholder="e.g. increase in qualified inquiries" />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="af-form-row">
                    <label className="af-form-label">Badge Text</label>
                    <input className="af-form-control" name="badge_text" defaultValue={editingItem?.badge_text || ''} placeholder="Optional short verified label" />
                  </div>
                  <div className="af-form-row">
                    <label className="af-form-label">Source Label</label>
                    <input className="af-form-control" name="source_label" defaultValue={editingItem?.source_label || ''} placeholder="e.g. Google Review, Client Interview" />
                  </div>
                </div>

                <div className="af-form-row">
                  <label className="af-form-label">Card Treatment</label>
                  <select className="af-form-control" name="card_variant" defaultValue={editingItem?.card_variant || 'auto'}>
                    <option value="auto">Automatic for page layout</option>
                    <option value="feature">Feature</option>
                    <option value="standard">Standard</option>
                    <option value="inverted">Inverted contrast</option>
                  </select>
                </div>

                <div className="af-form-row">
                  <label className="af-form-label">Avatar Photo URL</label>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <input className="af-form-control" id="testimonial_avatar_url" name="avatar_url" defaultValue={editingItem?.avatar_url} placeholder="https://..." />
                    <label className="af-action-btn-secondary" style={{ cursor: 'pointer', whiteSpace: 'nowrap' }}>
                      <IconUpload /> {isUploading ? 'Uploading...' : 'Upload'}
                      <input type="file" accept="image/*" style={{ display: 'none' }} onChange={(e) => handleImageFileChange(e, 'testimonial_avatar_url')} />
                    </label>
                  </div>
                </div>

                <div className="af-form-row">
                  <label className="af-form-label">Client Quote *</label>
                  <textarea className={`af-form-control ${formErrors.quote ? 'is-invalid' : ''}`} name="quote" defaultValue={editingItem?.quote} rows={4} />
                  {formErrors.quote && <span className="af-form-error">{formErrors.quote}</span>}
                </div>

                <div className="af-form-row">
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontWeight: 600, color: '#334155' }}>
                    <input type="checkbox" name="is_published" defaultChecked={editingItem ? editingItem.is_published : false} />
                    Published & Visible
                  </label>
                </div>
                <PageScopeField pages={cmsPages} links={editingItem?.page_links || pageLinksFor(testimonialPageFilter !== 'all' ? testimonialPageFilter : 'home')} />
              </div>

              <div className="af-modal-footer">
                <button type="button" className="af-btn-ghost" onClick={() => { setModalType(null); setEditingItem(null); goToTab(activeTab) }}>Cancel</button>
                <button type="submit" className="af-action-btn-primary" disabled={isSaving || isUploading}>
                  {isSaving ? 'Saving...' : 'Save Testimonial'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 7. Social Link Modal */}
      {(modalType === 'new_social' || modalType === 'edit_social') && (
        <div className="af-modal-backdrop">
          <div className="af-modal-card" style={{ maxWidth: '500px' }}>
            <div className="af-modal-header">
              <h3>{modalType === 'edit_social' ? 'Edit Social Link' : 'Add Social Platform'}</h3>
              <button className="af-modal-close-btn" onClick={() => { setModalType(null); setEditingItem(null); goToTab(activeTab) }}>✕</button>
            </div>
            <form onSubmit={handleSocialLinkSubmit}>
              <div className="af-modal-body">
                <div className="af-form-row">
                  <label className="af-form-label">Platform Name *</label>
                  <input className="af-form-control" name="platform" defaultValue={editingItem?.icon} placeholder="e.g. Instagram, LinkedIn, Facebook" required />
                </div>
                <div className="af-form-row">
                  <label className="af-form-label">Display Label</label>
                  <input className="af-form-control" name="label" defaultValue={editingItem?.label} placeholder="e.g. Follow Us" />
                </div>
                <div className="af-form-row">
                  <label className="af-form-label">Profile URL *</label>
                  <input className="af-form-control" name="url" defaultValue={editingItem?.href} placeholder="https://instagram.com/..." required />
                </div>
                <div className="af-form-row">
                  <label className="af-form-label">Sort Order</label>
                  <input className="af-form-control" type="number" name="sort_order" defaultValue={editingItem?.sort_order ?? 1} />
                </div>
                <PageScopeField pages={cmsPages} links={editingItem?.page_links || allPageLinks()} />
              </div>

              <div className="af-modal-footer">
                <button type="button" className="af-btn-ghost" onClick={() => { setModalType(null); setEditingItem(null); goToTab(activeTab) }}>Cancel</button>
                <button type="submit" className="af-action-btn-primary" disabled={isSaving}>
                  {isSaving ? 'Saving...' : 'Save Link'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 8. View Full Inquiry Modal */}
      {viewInquiry && (
        <div className="af-modal-backdrop">
          <div className="af-modal-card" style={{ maxWidth: '580px' }}>
            <div className="af-modal-header">
              <h3>Consultation Lead Details</h3>
              <button className="af-modal-close-btn" onClick={() => { setViewInquiry(null); goToTab('inquiries') }}>✕</button>
            </div>
            <div className="af-modal-body">
              <div style={{ marginBottom: '1.25rem', padding: '1rem', background: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                <p style={{ margin: '0 0 0.5rem', fontSize: '1.1rem', fontWeight: 700, color: '#0f172a' }}>{viewInquiry.name}</p>
                <p style={{ margin: '0 0 0.35rem', color: '#64748b', fontSize: '0.9rem' }}>
                  <strong>Practice / Clinic:</strong> {viewInquiry.business || 'Not specified'}
                </p>
                <p style={{ margin: '0 0 0.35rem', color: '#64748b', fontSize: '0.9rem' }}>
                  <strong>Contact:</strong> <a href={`tel:${viewInquiry.contact}`} style={{ color: '#0f766e', fontWeight: 600 }}>{viewInquiry.contact}</a>
                </p>
                <p style={{ margin: '0', color: '#64748b', fontSize: '0.85rem' }}>
                  <strong>Submitted:</strong> {new Date(viewInquiry.created_at).toLocaleString()}
                </p>
              </div>

              <div className="af-form-row">
                <label className="af-form-label">Message / Growth Inquiry:</label>
                <div style={{ padding: '1rem', background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '8px', lineHeight: 1.6, color: '#1e293b' }}>
                  {viewInquiry.message}
                </div>
              </div>

              <div className="af-form-row" style={{ marginTop: '1rem' }}>
                <label className="af-form-label">Lead Status:</label>
                <select
                  value={viewInquiry.status}
                  onChange={async (e) => {
                    await apiUpdateInquiryStatus(viewInquiry.id, e.target.value as any)
                    setViewInquiry({ ...viewInquiry, status: e.target.value })
                    showToast('Status updated!')
                    loadAllData()
                  }}
                  className="af-form-control"
                  style={{ width: '100%' }}
                >
                  <option value="new">NEW (Uncontacted)</option>
                  <option value="read">READ (In Follow-up)</option>
                  <option value="archived">ARCHIVED (Closed)</option>
                </select>
              </div>
            </div>

            <div className="af-modal-footer">
              <button className="af-action-btn-primary" onClick={() => { setViewInquiry(null); goToTab('inquiries') }}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 9. Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="af-modal-backdrop">
          <div className="af-modal-card" style={{ maxWidth: '440px' }}>
            <div className="af-modal-header">
              <h3 style={{ color: '#dc2626' }}>Confirm Delete</h3>
              <button className="af-modal-close-btn" onClick={() => setDeleteConfirm(null)}>✕</button>
            </div>
            <div className="af-modal-body">
              <p style={{ margin: 0, color: '#334155', lineHeight: 1.6, fontSize: '0.95rem' }}>
                {deleteConfirm.title} This action permanently removes the record from the database.
              </p>
            </div>
            <div className="af-modal-footer">
              <button className="af-btn-ghost" onClick={() => setDeleteConfirm(null)}>Cancel</button>
              <button
                className="af-action-btn-primary"
                style={{ background: '#dc2626', color: '#fff' }}
                onClick={async () => {
                  try {
                    await deleteConfirm.action()
                  } finally {
                    setDeleteConfirm(null)
                  }
                }}
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==================== Toast Notification ==================== */}
      {toast && (
        <div className={`af-toast ${toast.isError ? 'af-toast--error' : ''}`}>
          <span>{toast.isError ? '⚠️' : '✓'}</span>
          <span>{toast.message}</span>
        </div>
      )}
    </div>
  )
}
