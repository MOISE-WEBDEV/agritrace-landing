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
import { PUBLIC_APP_URL, signupUrl } from '@/lib/site.ts'

export default function Home() {
  const handleSignup = (plan?: string) => {
    window.location.href = signupUrl(PUBLIC_APP_URL, plan)
  }

  const handleLogin = () => {
    window.location.href = PUBLIC_APP_URL
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
