'use client'

import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Features from '@/components/Features'
import Services from '@/components/Services'
import Pricing from '@/components/Pricing'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'

const APP_URL = 'https://www.app.agritrace.fr'

export default function Home() {
  const handleGetStarted = () => {
    window.location.href = APP_URL
  }

  return (
    <main className="min-h-screen">
      <Header onGetStarted={handleGetStarted} />
      <Hero onGetStarted={handleGetStarted} />
      <Features />
      <Services />
      <Pricing onGetStarted={handleGetStarted} />
      <CTA onGetStarted={handleGetStarted} />
      <Footer />
    </main>
  )
}
