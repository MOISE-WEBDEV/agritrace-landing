'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'

// Interface pour les articles de presse
export interface PressArticle {
  id: string
  title: string
  excerpt: string
  source: string // Nom du média (ex: "La France Agricole")
  sourceUrl?: string // URL du média
  articleUrl: string // URL de l'article original
  imageUrl?: string // Image de l'article ou logo du média
  publishedAt: string // Date ISO
  type: 'press' | 'social' | 'blog' // Type de contenu
}

// Articles par défaut (à remplacer par vos vrais articles)
const defaultArticles: PressArticle[] = [
  {
    id: '1',
    title: 'Agritrace révolutionne la traçabilité agricole',
    excerpt: 'Une startup française propose une solution innovante pour simplifier le registre phytosanitaire numérique des agriculteurs.',
    source: 'La France Agricole',
    articleUrl: '#',
    imageUrl: '/images/press/france-agricole.png',
    publishedAt: '2025-01-10',
    type: 'press'
  },
  {
    id: '2',
    title: 'Le numérique au service des exploitations agricoles',
    excerpt: 'Comment les outils digitaux transforment la gestion quotidienne des agriculteurs et facilitent la conformité réglementaire.',
    source: 'Terre-net',
    articleUrl: '#',
    imageUrl: '/images/press/terre-net.png',
    publishedAt: '2025-01-05',
    type: 'press'
  },
  {
    id: '3',
    title: 'Réglementation 2027 : êtes-vous prêts ?',
    excerpt: 'Agritrace accompagne les agriculteurs vers la conformité avec les nouvelles exigences du registre phytosanitaire électronique.',
    source: 'Agritrace Blog',
    articleUrl: '#',
    imageUrl: '/images/press/agritrace-blog.png',
    publishedAt: '2024-12-20',
    type: 'blog'
  }
]

interface PressCarouselProps {
  articles?: PressArticle[]
  title?: string
  subtitle?: string
}

export default function PressCarousel({
  articles = defaultArticles,
  title = "Ils parlent de nous",
  subtitle = "Découvrez ce que la presse et nos partenaires disent d'Agritrace"
}: PressCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)

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
        "url": article.articleUrl !== '#' ? article.articleUrl : undefined,
        "image": article.imageUrl
      }
    }))

    return {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "Articles de presse sur Agritrace",
      "description": "Revue de presse et actualités concernant Agritrace, logiciel de traçabilité agricole",
      "numberOfItems": articles.length,
      "itemListElement": itemListElements
    }
  }

  if (articles.length === 0) return null

  return (
    <section
      id="presse"
      className="py-20 bg-gradient-to-b from-gray-50 to-white"
      aria-label="Revue de presse Agritrace"
    >
      {/* Données structurées JSON-LD pour SEO */}
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
                  itemScope
                  itemType="https://schema.org/NewsArticle"
                >
                  <a
                    href={article.articleUrl}
                    target={article.articleUrl !== '#' ? '_blank' : undefined}
                    rel={article.articleUrl !== '#' ? 'noopener noreferrer' : undefined}
                    className="block bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 h-full group"
                  >
                    {/* Image */}
                    <div className="relative h-48 bg-gray-100 overflow-hidden">
                      {article.imageUrl ? (
                        <Image
                          src={article.imageUrl}
                          alt={`${article.title} - ${article.source}`}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          itemProp="image"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-agri-green-light">
                          <span className="text-6xl">{getTypeIcon(article.type)}</span>
                        </div>
                      )}
                      {/* Badge type */}
                      <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-gray-700">
                        {getTypeIcon(article.type)} {getTypeLabel(article.type)}
                      </span>
                    </div>

                    {/* Contenu */}
                    <div className="p-6">
                      {/* Source et date */}
                      <div className="flex items-center justify-between mb-3 text-sm">
                        <span
                          className="font-semibold text-agri-green"
                          itemProp="publisher"
                          itemScope
                          itemType="https://schema.org/Organization"
                        >
                          <span itemProp="name">{article.source}</span>
                        </span>
                        <time
                          dateTime={article.publishedAt}
                          className="text-gray-500"
                          itemProp="datePublished"
                        >
                          {formatDate(article.publishedAt)}
                        </time>
                      </div>

                      {/* Titre */}
                      <h3
                        className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-agri-green transition-colors"
                        itemProp="headline"
                      >
                        {article.title}
                      </h3>

                      {/* Extrait */}
                      <p
                        className="text-gray-600 text-sm line-clamp-3"
                        itemProp="description"
                      >
                        {article.excerpt}
                      </p>

                      {/* Lien */}
                      <div className="mt-4 flex items-center text-agri-green font-medium text-sm group-hover:gap-2 transition-all">
                        <span>Lire l'article</span>
                        <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </a>
                </article>
              ))}
            </div>
          </div>

          {/* Bouton suivant */}
          {articles.length > visibleCount && (
            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-agri-green hover:shadow-xl transition-all duration-300 hidden md:flex"
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
                    ? 'bg-agri-green w-8'
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
            href="mailto:contact@agritrace.fr?subject=Demande presse Agritrace"
            className="inline-flex items-center gap-2 bg-agri-green text-white px-6 py-3 rounded-lg font-medium hover:bg-agri-green-dark transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Contactez-nous
          </a>
        </div>
      </div>
    </section>
  )
}
