import { MetadataRoute } from 'next'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://www.app.agritrace.fr'

interface PressArticle {
  id: string | number
  slug?: string
  title: string
  publishedAt: string
  updated_at?: string
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

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await getArticles()

  // Pages statiques
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: 'https://www.agritrace.fr',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://www.agritrace.fr/actualites',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: 'https://www.agritrace.fr/registre-phytosanitaire-numerique',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://www.agritrace.fr/temoignages',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: 'https://www.agritrace.fr/faq',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: 'https://www.agritrace.fr/mentions-legales',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: 'https://www.agritrace.fr/cgu',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: 'https://www.agritrace.fr/confidentialite',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]

  // Pages d'articles dynamiques
  const articlePages: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `https://www.agritrace.fr/actualites/${article.slug || article.id}`,
    lastModified: article.updated_at ? new Date(article.updated_at) : new Date(article.publishedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...staticPages, ...articlePages]
}
