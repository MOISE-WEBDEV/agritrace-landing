import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://www.app.agritrace.fr'

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
      next: { revalidate: 3600 }
    })
    if (response.ok) {
      return response.json()
    }
    return []
  } catch {
    return []
  }
}

async function getArticle(slug: string): Promise<PressArticle | null> {
  const articles = await getArticles()
  return articles.find(a => (a.slug || String(a.id)) === slug) || null
}

// Generer les pages statiques pour tous les articles
export async function generateStaticParams() {
  const articles = await getArticles()
  return articles.map((article) => ({
    slug: article.slug || String(article.id),
  }))
}

// Generer les metadonnees dynamiques pour chaque article
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const article = await getArticle(slug)

  if (!article) {
    return {
      title: 'Article non trouve | Agritrace',
    }
  }

  return {
    title: `${article.title} | Actualites Agritrace`,
    description: article.excerpt || `Decouvrez cet article sur ${article.title}`,
    keywords: `${article.title}, agritrace, actualites, ${article.type === 'press' ? 'presse agricole' : 'tracabilite agricole'}`,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      url: `https://www.agritrace.fr/actualites/${article.slug || article.id}`,
      type: 'article',
      publishedTime: article.publishedAt,
      images: article.imageUrl ? [{ url: article.imageUrl }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt,
      images: article.imageUrl ? [article.imageUrl] : [],
    },
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

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = await getArticle(slug)

  if (!article) {
    notFound()
  }

  // Donnees structurees JSON-LD pour l'article
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: article.title,
    description: article.excerpt,
    datePublished: article.publishedAt,
    dateModified: article.publishedAt,
    author: {
      '@type': 'Organization',
      name: article.source,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Agritrace',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.agritrace.fr/logo.png'
      }
    },
    image: article.imageUrl,
    url: `https://www.agritrace.fr/actualites/${article.slug || article.id}`,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://www.agritrace.fr/actualites/${article.slug || article.id}`
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
        <div className="max-w-4xl mx-auto px-4 py-4">
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
      <nav className="max-w-4xl mx-auto px-4 py-4" aria-label="Fil d'ariane">
        <ol className="flex items-center gap-2 text-sm text-gray-600 flex-wrap">
          <li>
            <Link href="/" className="hover:text-green-600">Accueil</Link>
          </li>
          <li>/</li>
          <li>
            <Link href="/actualites" className="hover:text-green-600">Actualites</Link>
          </li>
          <li>/</li>
          <li className="text-gray-900 font-medium truncate max-w-xs">{article.title}</li>
        </ol>
      </nav>

      {/* Article */}
      <article className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
          {/* Image header */}
          {article.imageUrl && (
            <div className="relative h-64 md:h-96 overflow-hidden">
              <img
                src={article.imageUrl}
                alt={article.title}
                className="w-full h-full object-cover"
              />
              {/* Badge type */}
              <span className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold text-gray-700 shadow-sm">
                {getTypeIcon(article.type)} {getTypeLabel(article.type)}
              </span>
            </div>
          )}

          {/* Contenu */}
          <div className="p-6 md:p-10">
            {/* Meta informations */}
            <div className="flex items-center gap-4 mb-6 text-sm flex-wrap">
              <span className="font-semibold text-green-600 text-base">
                {article.source}
              </span>
              {article.publishedAt && (
                <time
                  dateTime={article.publishedAt}
                  className="text-gray-500"
                >
                  Publie le {formatDate(article.publishedAt)}
                </time>
              )}
              {!article.imageUrl && (
                <span className="bg-gray-100 px-3 py-1 rounded-full text-xs font-medium text-gray-600">
                  {getTypeIcon(article.type)} {getTypeLabel(article.type)}
                </span>
              )}
            </div>

            {/* Titre H1 */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
              {article.title}
            </h1>

            {/* Extrait en evidence */}
            {article.excerpt && (
              <p className="text-xl text-gray-600 mb-8 leading-relaxed border-l-4 border-green-500 pl-4 italic">
                {article.excerpt}
              </p>
            )}

            {/* Contenu principal */}
            {article.content && (
              <div className="prose prose-lg prose-green max-w-none text-gray-700 leading-relaxed whitespace-pre-line">
                {article.content}
              </div>
            )}

            {/* Lien vers source originale */}
            {article.articleUrl && article.articleUrl !== '#' && (
              <div className="mt-10 pt-6 border-t border-gray-200">
                <a
                  href={article.articleUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-green-600 font-medium hover:text-green-700 transition-colors"
                >
                  <span>Voir l&apos;article original sur {article.source}</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-8 flex justify-between items-center">
          <Link
            href="/actualites"
            className="inline-flex items-center gap-2 text-green-600 font-medium hover:text-green-700 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>Tous les articles</span>
          </Link>

          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-600 font-medium hover:text-green-600 transition-colors"
          >
            <span>Retour a l&apos;accueil</span>
          </Link>
        </div>

        {/* CTA */}
        <div className="mt-12 bg-green-50 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Decouvrez Agritrace
          </h2>
          <p className="text-gray-600 mb-6 max-w-xl mx-auto">
            Registre phytosanitaire numerique automatique, conforme a la reglementation 2027.
            Essayez gratuitement pendant 30 jours.
          </p>
          <a
            href="https://www.app.agritrace.fr/signup"
            className="inline-flex items-center gap-2 bg-green-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors"
          >
            Essayer gratuitement
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>
      </article>

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
