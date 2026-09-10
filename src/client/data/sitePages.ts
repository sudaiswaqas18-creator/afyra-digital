export type SitePageKey = 'solutions' | 'healthcare' | 'programs' | 'about' | 'insights' | 'requestConsultation'

export const sitePageSeo: Record<SitePageKey, { title: string; description: string; path: string }> = {
  solutions: {
    title: 'Digital Growth Solutions | Afyra Digital',
    description: 'Explore Afyra Digital solution pillars across strategy, brand presence, patient acquisition, social communication, website experience and connected digital growth systems.',
    path: '/solutions'
  },
  healthcare: {
    title: 'Healthcare Marketing for Doctors, Clinics & Hospitals | Afyra Digital',
    description: 'Afyra Digital helps doctors, clinics, hospitals and aesthetic or cosmetic centers strengthen patient trust, visibility, inquiries and long-term digital authority.',
    path: '/healthcare'
  },
  programs: {
    title: 'Marketing Programs & Pricing | Afyra Digital',
    description: 'Compare Afyra Digital Starter Presence, Patient Growth Plan and Authority Building Plan, including current approved pricing, inclusions and terms.',
    path: '/programs'
  },
  about: {
    title: 'About Afyra Digital | Digital Growth & Marketing Agency',
    description: 'Learn how Afyra Digital is building a scalable agency around strategy, systems, measurable business outcomes, long-term partnerships and professional brand value.',
    path: '/about'
  },
  insights: {
    title: 'Digital Growth Insights | Afyra Digital',
    description: 'Explore Afyra Digital thinking on healthcare trust, digital visibility, growth systems, SEO, conversion and long-term agency strategy.',
    path: '/insights'
  },
  requestConsultation: {
    title: 'Request a Consultation | Afyra Digital',
    description: 'Request a consultation with Afyra Digital to discuss your business, growth objective, digital visibility, patient acquisition, brand positioning or marketing program needs.',
    path: '/request-consultation'
  }
}
