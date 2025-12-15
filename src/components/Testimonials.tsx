'use client'

import { useEffect, useState } from 'react'

interface Review {
  id: number
  rating: number
  title: string
  content: string
  author: {
    first_name: string
    role: string
    farm_name?: string
    city?: string
  }
  created_at: string
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://www.app.agritrace.fr'

export default function Testimonials() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchReviews()
  }, [])

  async function fetchReviews() {
    try {
      const response = await fetch(`${API_URL}/api/v1/reviews/approved`)
      if (response.ok) {
        const data = await response.json()
        setReviews(data)
      }
    } catch (error) {
      console.error('Error fetching reviews:', error)
    } finally {
      setLoading(false)
    }
  }

  // Ne pas afficher la section si pas d'avis
  if (loading) {
    return null
  }

  if (reviews.length === 0) {
    return null
  }

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'farmer': return 'Agriculteur'
      case 'technician': return 'Technicien'
      default: return 'Utilisateur'
    }
  }

  const getAvatar = (role: string) => {
    switch (role) {
      case 'farmer': return '👨‍🌾'
      case 'technician': return '👩‍🔬'
      default: return '👤'
    }
  }

  return (
    <section id="temoignages" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Ils nous font confiance
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Découvrez ce que nos utilisateurs pensent d'Agritrace
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {reviews.slice(0, 6).map((review) => (
            <div
              key={review.id}
              className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400">★</span>
                ))}
                {[...Array(5 - review.rating)].map((_, i) => (
                  <span key={i} className="text-gray-300">★</span>
                ))}
              </div>
              <p className="text-gray-600 mb-6 italic">
                "{review.content}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-agri-green-light rounded-full flex items-center justify-center text-2xl">
                  {getAvatar(review.author.role)}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{review.author.first_name}</p>
                  <p className="text-sm text-gray-500">
                    {getRoleLabel(review.author.role)}
                    {review.author.city && `, ${review.author.city}`}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
