import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: ['/', '/_next/static/'],
      disallow: ['/api/'],
    },
    sitemap: 'https://www.agritrace.fr/sitemap.xml',
  }
}
