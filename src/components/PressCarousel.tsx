'use client'

import { useState, useEffect, useCallback } from 'react'

// Interface pour les articles de presse
export interface PressArticle {
  id: string | number
  title: string
  excerpt: string
  content?: string
  source: string
  sourceUrl?: string
  articleUrl: string
  imageUrl?: string
  publishedAt: string
  type: 'press' | 'social' | 'blog'
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://www.app.agritrace.fr'

interface PressCarouselProps {
  title?: string
  subtitle?: string
}

export default function PressCarousel({
  title = "Actualités",
  subtitle = "Retrouvez nos dernières nouvelles, annonces et articles de presse"
}: PressCarouselProps) {
  const [articles, setArticles] = useState<PressArticle[]>([])
  const [loading, setLoading] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const [imageErrors, setImageErrors] = useState<Set<string | number>>(new Set())
  const [selectedArticle, setSelectedArticle] = useState<PressArticle | null>(null)

  // Charger les articles depuis l'API
  useEffect(() => {
    fetchArticles()
  }, [])

  async function fetchArticles() {
    try {
      const response = await fetch(`${API_URL}/api/v1/press_articles`)
      if (response.ok) {
        const data = await response.json()
        setArticles(data)
      }
    } catch (error) {
      console.error('Error fetching press articles:', error)
    } finally {
      setLoading(false)
    }
  }

  // Nombre d'articles visibles selon la taille d'écran
  const getVisibleCount = () => {
    if (typeof window === 'undefined') return 3
    if (window.innerWidth < 640) return 1
    if (window.innerWidth < 1024) return 2
    return 3
  }

  const [visibleCount, setVisibleCount] = useState(3)

  useEffect(() => {
    const handleResize = () => setVisibleCount(getVisibleCount())
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const maxIndex = Math.max(0, articles.length - visibleCount)

  const nextSlide = useCallback(() => {
    setCurrentIndex(prev => prev >= maxIndex ? 0 : prev + 1)
  }, [maxIndex])

  const prevSlide = useCallback(() => {
    setCurrentIndex(prev => prev <= 0 ? maxIndex : prev - 1)
  }, [maxIndex])

  // Autoplay
  useEffect(() => {
    if (!isAutoPlaying || articles.length <= visibleCount) return
    const interval = setInterval(nextSlide, 5000)
    return () => clearInterval(interval)
  }, [isAutoPlaying, nextSlide, articles.length, visibleCount])

  // Touch handlers pour swipe mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const minSwipeDistance = 50
    if (distance > minSwipeDistance) nextSlide()
    if (distance < -minSwipeDistance) prevSlide()
    setTouchStart(null)
    setTouchEnd(null)
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  }

  const getTypeIcon = (type: PressArticle['type']) => {
    switch (type) {
      case 'press': return '📰'
      case 'social': return '📱'
      case 'blog': return '✍️'
      default: return '📄'
    }
  }

  const getTypeLabel = (type: PressArticle['type']) => {
    switch (type) {
      case 'press': return 'Article de presse'
      case 'social': return 'Réseaux sociaux'
      case 'blog': return 'Article de blog'
      default: return 'Publication'
    }
  }

  // Gestion des erreurs d'image
  const handleImageError = (articleId: string | number) => {
    setImageErrors(prev => new Set(prev).add(articleId))
  }

  // Verifier si l'image doit etre affichee
  const shouldShowImage = (article: PressArticle) => {
    return article.imageUrl && !imageErrors.has(article.id)
  }

  // Ouvrir la modale avec le contenu de l'article
  const openArticleModal = (e: React.MouseEvent, article: PressArticle) => {
    e.preventDefault()
    e.stopPropagation()
    setSelectedArticle(article)
    setIsAutoPlaying(false)
  }

  // Fermer la modale
  const closeModal = () => {
    setSelectedArticle(null)
    setIsAutoPlaying(true)
  }

  // Générer les données structurées JSON-LD pour le SEO
  const generateJsonLd = () => {
    const itemListElements = articles.map((article, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "NewsArticle",
        "headline": article.title,
        "description": article.excerpt,
        "datePublished": article.publishedAt,
        "publisher": {
          "@type": "Organization",
          "name": article.source
        },
        "url": article.articleUrl && article.articleUrl !== '#' ? article.articleUrl : undefined,
        "image": article.imageUrl
      }
    }))

    return {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "Actualités Agritrace",
      "description": "Actualités, annonces et articles de presse concernant Agritrace, logiciel de traçabilité agricole",
      "numberOfItems": articles.length,
      "itemListElement": itemListElements
    }
  }

  // Ne pas afficher si chargement ou pas d'articles
  if (loading) return null
  if (articles.length === 0) return null

  return (
    <section
      id="presse"
      className="py-20 bg-gradient-to-b from-gray-50 to-white"
      aria-label="Revue de presse Agritrace"
    >
      {/* Données structurées JSON-LD pour SEO - invisible */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateJsonLd()) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête de section */}
        <header className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {subtitle}
          </p>
        </header>

        {/* Carrousel */}
        <div
          className="relative"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Bouton précédent */}
          {articles.length > visibleCount && (
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-agri-green hover:shadow-xl transition-all duration-300 hidden md:flex"
              aria-label="Article précédent"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}

          {/* Container des articles */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * (100 / visibleCount)}%)`,
              }}
            >
              {articles.map((article) => (
                <article
                  key={article.id}
                  className="flex-shrink-0 px-3"
                  style={{ width: `${100 / visibleCount}%` }}
                >
                  <div className="block bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 h-full group">
                    {/* Image */}
                    <div className="relative h-48 bg-gradient-to-br from-green-50 to-green-100 overflow-hidden">
                      {shouldShowImage(article) ? (
                        <img
                          src={article.imageUrl}
                          alt=""
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          onError={() => handleImageError(article.id)}
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="text-center">
                            <span className="text-5xl block mb-2">{getTypeIcon(article.type)}</span>
                            <span className="text-green-700 font-medium text-sm">{article.source}</span>
                          </div>
                        </div>
                      )}
                      {/* Badge type */}
                      <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-semibold text-gray-700 shadow-sm">
                        {getTypeIcon(article.type)} {getTypeLabel(article.type)}
                      </span>
                    </div>

                    {/* Contenu */}
                    <div className="p-5">
                      {/* Source et date */}
                      <div className="flex items-center justify-between mb-3 text-sm">
                        <span className="font-semibold text-green-600">
                          {article.source}
                        </span>
                        {article.publishedAt && (
                          <time
                            dateTime={article.publishedAt}
                            className="text-gray-400 text-xs"
                          >
                            {formatDate(article.publishedAt)}
                          </time>
                        )}
                      </div>

                      {/* Titre */}
                      <h3 className="text-base font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-green-600 transition-colors leading-tight">
                        {article.title}
                      </h3>

                      {/* Extrait */}
                      {article.excerpt && (
                        <p className="text-gray-500 text-sm line-clamp-3 leading-relaxed">
                          {article.excerpt}
                        </p>
                      )}

                      {/* Boutons d'action */}
                      <div className="mt-4 flex items-center gap-3">
                        {/* Lire la suite - ouvre la modale si contenu disponible */}
                        {article.content && (
                          <button
                            onClick={(e) => openArticleModal(e, article)}
                            className="flex items-center text-green-600 font-medium text-sm hover:text-green-700 transition-colors"
                          >
                            <span>Lire la suite</span>
                            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </button>
                        )}
                        {/* Lien externe vers l'article original */}
                        {article.articleUrl && article.articleUrl !== '#' && (
                          <a
                            href={article.articleUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center text-gray-500 font-medium text-sm hover:text-green-600 transition-colors"
                          >
                            <span>{article.content ? 'Source' : 'Lire l\'article'}</span>
                            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Bouton suivant */}
          {articles.length > visibleCount && (
            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-green-600 hover:shadow-xl transition-all duration-300 hidden md:flex"
              aria-label="Article suivant"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
        </div>

        {/* Indicateurs de pagination */}
        {articles.length > visibleCount && (
          <nav className="flex justify-center mt-8 gap-2" aria-label="Navigation du carrousel">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-green-600 w-8'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Aller à la page ${index + 1}`}
                aria-current={index === currentIndex ? 'true' : undefined}
              />
            ))}
          </nav>
        )}

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            Vous êtes journaliste ou souhaitez en savoir plus ?
          </p>
          <a
            href="mailto:service.client@agritrace.fr?subject=Demande presse Agritrace"
            className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Contactez-nous
          </a>
        </div>
      </div>

      {/* Modale pour afficher le contenu complet */}
      {selectedArticle && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header de la modale */}
            <div className="relative">
              {/* Image en header si disponible */}
              {shouldShowImage(selectedArticle) && (
                <div className="h-48 overflow-hidden">
                  <img
                    src={selectedArticle.imageUrl}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              {/* Bouton fermer */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-600 hover:text-gray-900 hover:bg-white transition-all shadow-lg"
                aria-label="Fermer"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              {/* Badge type */}
              <span className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-semibold text-gray-700 shadow-sm">
                {getTypeIcon(selectedArticle.type)} {getTypeLabel(selectedArticle.type)}
              </span>
            </div>

            {/* Contenu de la modale */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-12rem)]">
              {/* Source et date */}
              <div className="flex items-center justify-between mb-4 text-sm">
                <span className="font-semibold text-green-600">
                  {selectedArticle.source}
                </span>
                {selectedArticle.publishedAt && (
                  <time
                    dateTime={selectedArticle.publishedAt}
                    className="text-gray-400"
                  >
                    {formatDate(selectedArticle.publishedAt)}
                  </time>
                )}
              </div>

              {/* Titre */}
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {selectedArticle.title}
              </h3>

              {/* Contenu complet */}
              <div className="prose prose-green max-w-none text-gray-600 leading-relaxed whitespace-pre-line">
                {selectedArticle.content || selectedArticle.excerpt}
              </div>

              {/* Lien vers l'article original */}
              {selectedArticle.articleUrl && selectedArticle.articleUrl !== '#' && (
                <div className="mt-6 pt-4 border-t border-gray-100">
                  <a
                    href={selectedArticle.articleUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-green-600 font-medium hover:text-green-700 transition-colors"
                  >
                    <span>Voir l&apos;article original</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
