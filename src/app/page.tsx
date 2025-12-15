'use client'

import { useEffect, useState } from 'react'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Features from '@/components/Features'
import Services from '@/components/Services'
import Testimonials from '@/components/Testimonials'
import Pricing from '@/components/Pricing'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://app.agritrace.fr'

export default function Home() {
  const [isFirstVisit, setIsFirstVisit] = useState(true)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Vérifier si c'est la première visite
    const hasVisited = localStorage.getItem('agritrace_visited')

    if (hasVisited) {
      // Pas la première visite, rediriger vers l'app
      window.location.href = APP_URL
      return
    }

    // Première visite, afficher la landing page
    setIsFirstVisit(true)
    setIsLoading(false)
  }, [])

  const handleGetStarted = () => {
    // Marquer comme visité et rediriger
    localStorage.setItem('agritrace_visited', 'true')
    window.location.href = APP_URL
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-agri-green-light">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-float">🌾</div>
          <p className="text-agri-green font-semibold">Chargement...</p>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen">
      <Header onGetStarted={handleGetStarted} />
      <Hero onGetStarted={handleGetStarted} />
      <Features />
      <Services />
      <Testimonials />
      <Pricing onGetStarted={handleGetStarted} />
      <CTA onGetStarted={handleGetStarted} />
      <Footer />
    </main>
  )
}
