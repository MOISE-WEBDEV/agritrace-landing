import { Metadata } from 'next'
import Link from 'next/link'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://www.app.agritrace.fr'

export const metadata: Metadata = {
  title: 'Actualites agricoles : tracabilite, registre phytosanitaire et reglementation | Agritrace',
  description: 'Suivez les actualites de la tracabilite agricole : registre phytosanitaire numerique, reglementation 2027, innovations pour exploitations agricoles. Articles, presse et conseils experts.',
  keywords: 'actualites agricoles, tracabilite agricole, registre phytosanitaire, reglementation agricole 2027, numerique agricole, logiciel agricole, gestion exploitation',
  openGraph: {
    title: 'Actualites agricoles : tracabilite et registre phytosanitaire',
    description: 'Toute l\'actualite de la tracabilite agricole et du registre phytosanitaire numerique',
    url: 'https://www.agritrace.fr/actualites',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.agritrace.fr/actualites',
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

// Categoriser les articles par type
function categorizeArticles(articles: PressArticle[]) {
  return {
    press: articles.filter(a => a.type === 'press'),
    blog: articles.filter(a => a.type === 'blog'),
    social: articles.filter(a => a.type === 'social'),
  }
}

export default async function ActualitesPage() {
  const articles = await getArticles()
  const categorized = categorizeArticles(articles)

  // Donnees structurees JSON-LD enrichies
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Actualites agricoles : tracabilite, registre phytosanitaire et reglementation',
    description: 'Retrouvez toutes les actualites sur la tracabilite agricole, le registre phytosanitaire numerique et les evolutions reglementaires du secteur agricole.',
    url: 'https://www.agritrace.fr/actualites',
    inLanguage: 'fr-FR',
    isPartOf: {
      '@type': 'WebSite',
      name: 'Agritrace',
      url: 'https://www.agritrace.fr'
    },
    breadcrumb: {
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
        }
      ]
    },
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
          image: article.imageUrl,
          about: [
            { '@type': 'Thing', name: 'Tracabilite agricole' },
            { '@type': 'Thing', name: 'Registre phytosanitaire' }
          ]
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
              alt="Agritrace - Logiciel de tracabilite agricole"
              className="h-16 w-auto transition-transform group-hover:scale-105"
            />
          </Link>
        </div>
      </header>

      {/* Breadcrumb */}
      <nav className="max-w-7xl mx-auto px-4 py-4" aria-label="Fil d'ariane">
        <ol className="flex items-center gap-2 text-sm text-gray-600" itemScope itemType="https://schema.org/BreadcrumbList">
          <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
            <Link href="/" itemProp="item" className="hover:text-green-600">
              <span itemProp="name">Accueil</span>
            </Link>
            <meta itemProp="position" content="1" />
          </li>
          <li aria-hidden="true">/</li>
          <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
            <span itemProp="name" className="text-gray-900 font-medium">Actualites</span>
            <meta itemProp="position" content="2" />
          </li>
        </ol>
      </nav>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* En-tete SEO optimise */}
        <header className="mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center">
            Actualites agricoles : tracabilite, registre phytosanitaire et reglementation
          </h1>

          {/* Paragraphe introductif SEO */}
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-lg text-gray-600 leading-relaxed">
              La <strong>tracabilite agricole</strong> evolue rapidement avec les nouvelles obligations reglementaires.
              Depuis l&apos;obligation du <strong>registre phytosanitaire numerique</strong> prevue pour 2027,
              les exploitations agricoles doivent adapter leurs pratiques. Retrouvez ici toutes les actualites
              sur la <strong>reglementation agricole</strong>, les innovations du <strong>numerique agricole</strong>,
              et les conseils pratiques pour optimiser la gestion de votre exploitation.
              Articles de presse, analyses reglementaires et retours d&apos;experience d&apos;agriculteurs.
            </p>
          </div>
        </header>

        {/* H2 semantiques (visibles) pour structure SEO */}
        {articles.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Aucun article disponible pour le moment.</p>
          </div>
        ) : (
          <>
            {/* Section Presse */}
            {categorized.press.length > 0 && (
              <section className="mb-16">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <span className="text-2xl">📰</span>
                  Actualites reglementaires et presse agricole
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {categorized.press.map((article) => (
                    <ArticleCard key={article.id} article={article} />
                  ))}
                </div>
              </section>
            )}

            {/* Section Blog */}
            {categorized.blog.length > 0 && (
              <section className="mb-16">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <span className="text-2xl">✍️</span>
                  Conseils et innovations numeriques agricoles
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {categorized.blog.map((article) => (
                    <ArticleCard key={article.id} article={article} />
                  ))}
                </div>
              </section>
            )}

            {/* Section Social */}
            {categorized.social.length > 0 && (
              <section className="mb-16">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <span className="text-2xl">📱</span>
                  Communaute et reseaux sociaux
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {categorized.social.map((article) => (
                    <ArticleCard key={article.id} article={article} />
                  ))}
                </div>
              </section>
            )}

            {/* Si pas de categorisation, afficher tous */}
            {categorized.press.length === 0 && categorized.blog.length === 0 && categorized.social.length === 0 && (
              <section>
                <h2 className="sr-only">Tous les articles sur la tracabilite agricole</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {articles.map((article) => (
                    <ArticleCard key={article.id} article={article} />
                  ))}
                </div>
              </section>
            )}
          </>
        )}

        {/* Encart maillage interne */}
        <aside className="mt-16 bg-green-50 rounded-2xl p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Preparez votre exploitation a la reglementation 2027
          </h2>
          <p className="text-gray-600 mb-6">
            Le registre phytosanitaire numerique devient obligatoire. Decouvrez comment Agritrace
            simplifie la tracabilite de vos traitements et la conformite reglementaire.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/registre-phytosanitaire-numerique"
              className="inline-flex items-center gap-2 bg-green-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-green-700 transition-colors"
            >
              Decouvrir le registre phytosanitaire
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            <Link
              href="/#fonctionnalites"
              className="inline-flex items-center gap-2 border border-green-600 text-green-600 px-5 py-2.5 rounded-lg font-medium hover:bg-green-50 transition-colors"
            >
              Toutes les fonctionnalites
            </Link>
          </div>
        </aside>

        {/* CTA Presse */}
        <div className="text-center mt-16">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Contact presse</h2>
          <p className="text-gray-600 mb-4">
            Vous etes journaliste ou souhaitez en savoir plus sur la tracabilite agricole ?
          </p>
          <a
            href="mailto:service.client@agritrace.fr?subject=Demande presse - Tracabilite agricole"
            className="inline-flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Contactez notre equipe
          </a>
        </div>

        {/* Retour accueil */}
        <nav className="mt-12 text-center">
          <Link href="/" className="text-green-600 hover:text-green-700 font-medium">
            &larr; Retour a l&apos;accueil Agritrace
          </Link>
        </nav>
      </div>

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

// Composant carte article
function ArticleCard({ article }: { article: PressArticle }) {
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
      case 'press': return 'Presse'
      case 'social': return 'Social'
      case 'blog': return 'Blog'
      default: return 'Article'
    }
  }

  return (
    <article className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
      <Link href={`/actualites/${article.slug || article.id}`}>
        {/* Image */}
        <div className="relative h-48 bg-gradient-to-br from-green-50 to-green-100 overflow-hidden">
          {article.imageUrl ? (
            <img
              src={article.imageUrl}
              alt={`Illustration : ${article.title}`}
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

          {/* Titre H3 pour hierarchie */}
          <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 hover:text-green-600 transition-colors leading-tight">
            {article.title}
          </h3>

          {/* Extrait */}
          {article.excerpt && (
            <p className="text-gray-500 text-sm line-clamp-3 leading-relaxed">
              {article.excerpt}
            </p>
          )}

          {/* Lire la suite */}
          <div className="mt-4 flex items-center text-green-600 font-medium text-sm">
            <span>Lire l&apos;article complet</span>
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </Link>
    </article>
  )
}
