'use client'

import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Features from '@/components/Features'
import Services from '@/components/Services'
import Testimonials from '@/components/Testimonials'
import PressCarousel from '@/components/PressCarousel'
import Pricing from '@/components/Pricing'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'

const APP_URL = 'https://www.app.agritrace.fr'

export default function Home() {
  const handleSignup = (plan?: string) => {
    const url = plan ? `${APP_URL}/signup?plan=${plan}` : `${APP_URL}/signup`
    window.location.href = url
  }

  const handleLogin = () => {
    window.location.href = APP_URL
  }

  return (
    <main className="min-h-screen">
      <Header onSignup={handleSignup} onLogin={handleLogin} />
      <Hero onGetStarted={handleSignup} />
      <Features />
      <Services />
      <Testimonials />
      <PressCarousel />
      <Pricing onGetStarted={handleSignup} />
      <CTA onGetStarted={handleSignup} />
      <Footer />
    </main>
  )
}
