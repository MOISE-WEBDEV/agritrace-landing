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

async function getRelatedArticles(currentId: string | number, type: string): Promise<PressArticle[]> {
  const articles = await getArticles()
  return articles
    .filter(a => (a.slug || String(a.id)) !== String(currentId))
    .slice(0, 3)
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

  // Titre SEO optimise selon le type
  const seoTitle = article.type === 'press'
    ? `${article.title} - Tracabilite agricole | Agritrace`
    : `${article.title} - Registre phytosanitaire | Agritrace`

  // Description SEO enrichie
  const seoDescription = article.excerpt
    ? `${article.excerpt.slice(0, 140)}... Decouvrez les actualites sur la tracabilite agricole et le registre phytosanitaire.`
    : `Decouvrez cet article sur ${article.title}. Actualites tracabilite agricole, registre phytosanitaire numerique et reglementation 2027.`

  return {
    title: seoTitle,
    description: seoDescription,
    keywords: `${article.title}, tracabilite agricole, registre phytosanitaire, reglementation agricole, ${article.type === 'press' ? 'presse agricole, actualites reglementaires' : 'conseils agricoles, numerique agricole'}`,
    openGraph: {
      title: article.title,
      description: article.excerpt || seoDescription,
      url: `https://www.agritrace.fr/actualites/${article.slug || article.id}`,
      type: 'article',
      publishedTime: article.publishedAt,
      authors: [article.source],
      tags: ['tracabilite agricole', 'registre phytosanitaire', 'agriculture'],
      images: article.imageUrl ? [{ url: article.imageUrl, alt: `Illustration : ${article.title}` }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt || seoDescription,
      images: article.imageUrl ? [article.imageUrl] : [],
    },
    alternates: {
      canonical: `https://www.agritrace.fr/actualites/${article.slug || article.id}`,
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

  const relatedArticles = await getRelatedArticles(article.id, article.type)

  // Donnees structurees JSON-LD enrichies
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
    },
    about: [
      { '@type': 'Thing', name: 'Tracabilite agricole' },
      { '@type': 'Thing', name: 'Registre phytosanitaire' },
      { '@type': 'Thing', name: 'Reglementation agricole' }
    ],
    keywords: 'tracabilite agricole, registre phytosanitaire, reglementation 2027'
  }

  // JSON-LD Breadcrumb
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Accueil',
        item: 'https://www.agritrace.fr'
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Actualites',
        item: 'https://www.agritrace.fr/actualites'
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: article.title,
        item: `https://www.agritrace.fr/actualites/${article.slug || article.id}`
      }
    ]
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* JSON-LD Article */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* JSON-LD Breadcrumb */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <Link href="/" className="flex items-center group">
            <img
              src="/logo.png"
              alt="Agritrace - Logiciel de tracabilite agricole"
              className="h-16 w-auto transition-transform group-hover:scale-105"
            />
          </Link>
        </div>
      </header>

      {/* Breadcrumb */}
      <nav className="max-w-4xl mx-auto px-4 py-4" aria-label="Fil d'ariane">
        <ol className="flex items-center gap-2 text-sm text-gray-600 flex-wrap" itemScope itemType="https://schema.org/BreadcrumbList">
          <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
            <Link href="/" itemProp="item" className="hover:text-green-600">
              <span itemProp="name">Accueil</span>
            </Link>
            <meta itemProp="position" content="1" />
          </li>
          <li aria-hidden="true">/</li>
          <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
            <Link href="/actualites" itemProp="item" className="hover:text-green-600">
              <span itemProp="name">Actualites</span>
            </Link>
            <meta itemProp="position" content="2" />
          </li>
          <li aria-hidden="true">/</li>
          <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
            <span itemProp="name" className="text-gray-900 font-medium truncate max-w-xs block">{article.title}</span>
            <meta itemProp="position" content="3" />
          </li>
        </ol>
      </nav>

      {/* Article */}
      <article className="max-w-4xl mx-auto px-4 py-8" itemScope itemType="https://schema.org/NewsArticle">
        <meta itemProp="datePublished" content={article.publishedAt} />
        <meta itemProp="author" content={article.source} />

        <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
          {/* Image header */}
          {article.imageUrl && (
            <figure className="relative h-64 md:h-96 overflow-hidden">
              <img
                src={article.imageUrl}
                alt={`Illustration de l'article : ${article.title}`}
                className="w-full h-full object-cover"
                itemProp="image"
              />
              {/* Badge type */}
              <span className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold text-gray-700 shadow-sm">
                {getTypeIcon(article.type)} {getTypeLabel(article.type)}
              </span>
            </figure>
          )}

          {/* Contenu */}
          <div className="p-6 md:p-10">
            {/* Meta informations */}
            <div className="flex items-center gap-4 mb-6 text-sm flex-wrap">
              <span className="font-semibold text-green-600 text-base" itemProp="publisher">
                {article.source}
              </span>
              {article.publishedAt && (
                <time
                  dateTime={article.publishedAt}
                  className="text-gray-500"
                  itemProp="datePublished"
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
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight" itemProp="headline">
              {article.title}
            </h1>

            {/* Extrait en evidence */}
            {article.excerpt && (
              <p className="text-xl text-gray-600 mb-8 leading-relaxed border-l-4 border-green-500 pl-4 italic" itemProp="description">
                {article.excerpt}
              </p>
            )}

            {/* Contenu principal */}
            {article.content && (
              <div className="prose prose-lg prose-green max-w-none text-gray-700 leading-relaxed whitespace-pre-line" itemProp="articleBody">
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

        {/* Articles lies - Maillage interne */}
        {relatedArticles.length > 0 && (
          <section className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Articles similaires sur la tracabilite agricole
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedArticles.map((related) => (
                <Link
                  key={related.id}
                  href={`/actualites/${related.slug || related.id}`}
                  className="bg-white rounded-xl p-5 shadow-md hover:shadow-lg transition-shadow"
                >
                  <span className="text-xs font-medium text-green-600 mb-2 block">
                    {getTypeIcon(related.type)} {getTypeLabel(related.type)}
                  </span>
                  <h3 className="font-semibold text-gray-900 line-clamp-2 hover:text-green-600 transition-colors">
                    {related.title}
                  </h3>
                  {related.publishedAt && (
                    <time className="text-xs text-gray-400 mt-2 block">
                      {formatDate(related.publishedAt)}
                    </time>
                  )}
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Navigation */}
        <nav className="mt-8 flex justify-between items-center">
          <Link
            href="/actualites"
            className="inline-flex items-center gap-2 text-green-600 font-medium hover:text-green-700 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>Toutes les actualites agricoles</span>
          </Link>

          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-600 font-medium hover:text-green-600 transition-colors"
          >
            <span>Retour a l&apos;accueil</span>
          </Link>
        </nav>

        {/* CTA */}
        <aside className="mt-12 bg-green-600 rounded-2xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">
            Passez au registre phytosanitaire numerique
          </h2>
          <p className="text-green-100 mb-6 max-w-xl mx-auto">
            Anticipez les obligations reglementaires a venir. Vos traitements sont automatiquement traces.
            Essai gratuit 30 jours, sans engagement.
          </p>
          <a
            href="https://www.app.agritrace.fr/signup"
            className="inline-flex items-center gap-2 bg-white text-green-600 px-8 py-3 rounded-lg font-medium hover:bg-green-50 transition-colors"
          >
            Essayer Agritrace gratuitement
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </aside>
      </article>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-400">
            &copy; 2025 Agritrace - Logiciel de tracabilite agricole. Tous droits reserves.
          </p>
        </div>
      </footer>
    </main>
  )
}
