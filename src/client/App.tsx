import { useGsapAnimations } from './lib/useGsapAnimations'
import { useSaasKingEffects } from './lib/useSaasKingEffects'
import Header from './components/Header'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import Features from './components/Features'
import Solutions from './components/Solutions'
import WhyAfyra from './components/WhyAfyra'
import Programs from './components/Programs'
import Process from './components/Process'
import Faqs from './components/Faqs'
import Cta from './components/Cta'
import Footer from './components/Footer'
import ScrollTop from './components/ScrollTop'
import { usePageSeo } from './lib/usePageSeo'

export default function App() {
  useGsapAnimations()
  useSaasKingEffects({ home: true })
  usePageSeo(
    'Afyra Digital — Digital Growth & Marketing Agency for Healthcare',
    'Afyra Digital is a digital growth and marketing agency helping doctors, clinics, hospitals and aesthetic centers build trust, stay visible and generate qualified patient inquiries.',
    '/'
  )

  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <Marquee />
        <Features />
        <Solutions />
        <WhyAfyra />
        <Programs />
        <Process />
        <Faqs />
        <Cta />
      </main>
      <Footer />
      <ScrollTop />
    </>
  )
}
