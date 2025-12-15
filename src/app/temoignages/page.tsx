'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface Review {
  id: number
  rating: number
  title: string
  content: string
  author: {
    first_name: string
    role: string
    farm_name: string | null
    city: string | null
  }
  created_at: string
}

const API_URL = 'https://www.app.agritrace.fr/api/v1'

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star} className={star <= rating ? 'text-yellow-400' : 'text-gray-300'}>
          ★
        </span>
      ))}
    </div>
  )
}

function ReviewCard({ review }: { review: Review }) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long'
    })
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <StarRating rating={review.rating} />
        <span className="text-sm text-gray-400">{formatDate(review.created_at)}</span>
      </div>

      <h3 className="font-semibold text-gray-900 mb-2">{review.title}</h3>
      <p className="text-gray-600 mb-4 leading-relaxed">{review.content}</p>

      <div className="pt-4 border-t border-gray-100">
        <p className="font-medium text-gray-900">{review.author.first_name}</p>
        <p className="text-sm text-gray-500">
          {review.author.farm_name && `${review.author.farm_name}`}
          {review.author.farm_name && review.author.city && ' - '}
          {review.author.city}
        </p>
      </div>
    </div>
  )
}

export default function Temoignages() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`${API_URL}/reviews/approved`)
        if (!response.ok) {
          throw new Error('Erreur lors du chargement des avis')
        }
        const data = await response.json()
        setReviews(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Une erreur est survenue')
      } finally {
        setLoading(false)
      }
    }

    fetchReviews()
  }, [])

  // Calcul de la moyenne des notes
  const averageRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : '0'

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 text-agri-green hover:text-agri-green-dark">
            <span className="text-2xl">🌾</span>
            <span className="font-bold">Agritrace</span>
          </Link>
          <a
            href="https://www.app.agritrace.fr/signup"
            className="bg-agri-green hover:bg-agri-green-dark text-white px-4 py-2 rounded-full text-sm font-medium transition-colors"
          >
            Créer un compte
          </a>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Hero section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Ce que nos utilisateurs disent d&apos;Agritrace
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Découvrez les témoignages des agriculteurs qui utilisent Agritrace au quotidien pour gérer leur exploitation.
          </p>
        </div>

        {/* Stats */}
        {reviews.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm p-6 mb-12 flex flex-col md:flex-row items-center justify-center gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-agri-green">{averageRating}</div>
              <div className="flex justify-center mt-1">
                <StarRating rating={Math.round(Number(averageRating))} />
              </div>
              <p className="text-gray-500 text-sm mt-1">Note moyenne</p>
            </div>
            <div className="hidden md:block w-px h-16 bg-gray-200"></div>
            <div className="text-center">
              <div className="text-4xl font-bold text-agri-green">{reviews.length}</div>
              <p className="text-gray-500 text-sm mt-1">Avis vérifiés</p>
            </div>
          </div>
        )}

        {/* Reviews grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-agri-green border-t-transparent"></div>
            <p className="text-gray-500 mt-4">Chargement des avis...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-500">{error}</p>
          </div>
        ) : reviews.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl shadow-sm">
            <div className="text-6xl mb-4">💬</div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Aucun avis pour le moment</h2>
            <p className="text-gray-600 mb-6">
              Soyez le premier à partager votre expérience avec Agritrace !
            </p>
            <a
              href="https://www.app.agritrace.fr/signup"
              className="inline-block bg-agri-green hover:bg-agri-green-dark text-white px-6 py-3 rounded-full font-medium transition-colors"
            >
              Créer un compte gratuit
            </a>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="mt-12 bg-agri-green/10 rounded-xl p-8 text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Vous utilisez Agritrace ?
          </h2>
          <p className="text-gray-600 mb-6 max-w-xl mx-auto">
            Partagez votre expérience et aidez d&apos;autres agriculteurs à découvrir comment Agritrace peut simplifier la gestion de leur exploitation.
          </p>
          <a
            href="https://www.app.agritrace.fr/settings"
            className="inline-block bg-agri-green hover:bg-agri-green-dark text-white px-6 py-3 rounded-full font-medium transition-colors"
          >
            Laisser un avis
          </a>
        </div>

        <div className="mt-8 text-center">
          <Link href="/" className="text-agri-green hover:text-agri-green-dark font-medium">
            ← Retour à l&apos;accueil
          </Link>
        </div>
      </div>
    </main>
  )
}
