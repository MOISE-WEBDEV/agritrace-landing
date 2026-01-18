import { Metadata } from 'next'
import Link from 'next/link'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://www.app.agritrace.fr'

export const metadata: Metadata = {
  title: 'Actualites Agritrace | Articles, Presse et Nouveautes',
  description: 'Retrouvez toutes les actualites Agritrace : articles de presse, nouveautes produit, annonces et conseils pour la tracabilite agricole et le registre phytosanitaire.',
  keywords: 'actualites agritrace, articles agriculture, presse agricole, nouveautes tracabilite, registre phytosanitaire actualites',
  openGraph: {
    title: 'Actualites Agritrace',
    description: 'Articles, presse et nouveautes sur la tracabilite agricole',
    url: 'https://www.agritrace.fr/actualites',
    type: 'website',
  },
}

interface PressArticle {
  id: string | number
  slug?: string
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

async function getArticles(): Promise<PressArticle[]> {
  try {
    const response = await fetch(`${API_URL}/api/v1/press_articles`, {
      next: { revalidate: 3600 } // Revalider toutes les heures
    })
    if (response.ok) {
      return response.json()
    }
    return []
  } catch {
    return []
  }
}

function formatDate(dateString: string) {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}

function getTypeIcon(type: PressArticle['type']) {
  switch (type) {
    case 'press': return '📰'
    case 'social': return '📱'
    case 'blog': return '✍️'
    default: return '📄'
  }
}

function getTypeLabel(type: PressArticle['type']) {
  switch (type) {
    case 'press': return 'Article de presse'
    case 'social': return 'Reseaux sociaux'
    case 'blog': return 'Article de blog'
    default: return 'Publication'
  }
}

export default async function ActualitesPage() {
  const articles = await getArticles()

  // Donnees structurees JSON-LD
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Actualites Agritrace',
    description: 'Toutes les actualites et articles concernant Agritrace',
    url: 'https://www.agritrace.fr/actualites',
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: articles.length,
      itemListElement: articles.map((article, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'NewsArticle',
          headline: article.title,
          description: article.excerpt,
          datePublished: article.publishedAt,
          url: `https://www.agritrace.fr/actualites/${article.slug || article.id}`,
          publisher: {
            '@type': 'Organization',
            name: article.source
          },
          image: article.imageUrl
        }
      }))
    }
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Link href="/" className="flex items-center group">
            <img
              src="/logo.png"
              alt="Agritrace"
              className="h-16 w-auto transition-transform group-hover:scale-105"
            />
          </Link>
        </div>
      </header>

      {/* Breadcrumb */}
      <nav className="max-w-7xl mx-auto px-4 py-4" aria-label="Fil d'ariane">
        <ol className="flex items-center gap-2 text-sm text-gray-600">
          <li>
            <Link href="/" className="hover:text-green-600">Accueil</Link>
          </li>
          <li>/</li>
          <li className="text-gray-900 font-medium">Actualites</li>
        </ol>
      </nav>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Actualites Agritrace
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Retrouvez nos dernieres nouvelles, annonces et articles de presse
          </p>
        </div>

        {articles.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Aucun article disponible pour le moment.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <article
                key={article.id}
                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
              >
                <Link href={`/actualites/${article.slug || article.id}`}>
                  {/* Image */}
                  <div className="relative h-48 bg-gradient-to-br from-green-50 to-green-100 overflow-hidden">
                    {article.imageUrl ? (
                      <img
                        src={article.imageUrl}
                        alt={article.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
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
                    <h2 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 hover:text-green-600 transition-colors leading-tight">
                      {article.title}
                    </h2>

                    {/* Extrait */}
                    {article.excerpt && (
                      <p className="text-gray-500 text-sm line-clamp-3 leading-relaxed">
                        {article.excerpt}
                      </p>
                    )}

                    {/* Lire la suite */}
                    <div className="mt-4 flex items-center text-green-600 font-medium text-sm">
                      <span>Lire la suite</span>
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="text-center mt-16">
          <p className="text-gray-600 mb-4">
            Vous etes journaliste ou souhaitez en savoir plus ?
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

        {/* Retour accueil */}
        <div className="mt-12 text-center">
          <Link href="/" className="text-green-600 hover:text-green-700 font-medium">
            &larr; Retour a l&apos;accueil
          </Link>
        </div>
      </div>

      {/* Footer simple */}
      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-400">
            &copy; 2025 Agritrace. Tous droits reserves.
          </p>
        </div>
      </footer>
    </main>
  )
}
