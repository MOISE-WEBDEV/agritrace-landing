'use client'

import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Features from '@/components/Features'
import Services from '@/components/Services'
import Testimonials from '@/components/Testimonials'
import Pricing from '@/components/Pricing'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'

const APP_URL = 'https://www.app.agritrace.fr'

export default function Home() {
  const handleSignup = () => {
    window.location.href = `${APP_URL}/signup`
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
      <Pricing onGetStarted={handleSignup} />
      <CTA onGetStarted={handleSignup} />
      <Footer />
    </main>
  )
}
