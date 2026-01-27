import type { Metadata } from 'next'
import './globals.css'

// Schema.org JSON-LD pour Organization
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': 'https://www.agritrace.fr/#organization',
  name: 'Agritrace',
  url: 'https://www.agritrace.fr',
  logo: {
    '@type': 'ImageObject',
    url: 'https://www.agritrace.fr/logo.png',
    width: 512,
    height: 512,
  },
  description: 'Agritrace est une plateforme de tracabilite agricole et de gestion parcellaire pour les exploitations agricoles francaises.',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'FR',
  },
  sameAs: [
    'https://www.facebook.com/profile.php?id=61586487988995',
    'https://www.instagram.com/agritrace.fr/',
    'https://x.com/Agri_trace',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    email: 'service.client@agritrace.fr',
    availableLanguage: 'French',
  },
}

// Schema.org JSON-LD pour SoftwareApplication
const softwareApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  '@id': 'https://www.agritrace.fr/#software',
  name: 'Agritrace',
  applicationCategory: 'BusinessApplication',
  applicationSubCategory: 'Agricultural Management Software',
  operatingSystem: 'Web Browser',
  offers: {
    '@type': 'Offer',
    price: '29',
    priceCurrency: 'EUR',
    priceValidUntil: '2027-12-31',
    availability: 'https://schema.org/InStock',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    ratingCount: '50',
    bestRating: '5',
    worstRating: '1',
  },
  description: 'Logiciel de tracabilite agricole et registre phytosanitaire numerique automatique. Gestion des parcelles, suivi des cultures, registre phyto conforme reglementation 2027.',
  featureList: [
    'Registre phytosanitaire numerique automatique',
    'Gestion des parcelles avec cartographie interactive',
    'Suivi des cultures et interventions',
    'Base de donnees E-Phy officielle',
    'Export PDF et CSV',
    'Gestion des stocks phytosanitaires',
    'Application mobile responsive',
  ],
  screenshot: 'https://www.agritrace.fr/og-image.png',
  softwareVersion: '2.0',
  author: {
    '@id': 'https://www.agritrace.fr/#organization',
  },
}

// Schema.org JSON-LD pour WebSite
const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': 'https://www.agritrace.fr/#website',
  name: 'Agritrace',
  url: 'https://www.agritrace.fr',
  description: 'Logiciel de tracabilite agricole et registre phytosanitaire numerique pour les exploitations agricoles francaises.',
  publisher: {
    '@id': 'https://www.agritrace.fr/#organization',
  },
  inLanguage: 'fr-FR',
}

export const metadata: Metadata = {
  title: 'Agritrace - Registre Phytosanitaire Numerique | Tracabilite Agricole',
  description: 'Registre phytosanitaire numerique automatique. Conforme reglementation 2027. Gerez vos parcelles, cultures et traitements phyto. Export PDF/CSV. Essai 30 jours.',
  keywords: 'registre phytosanitaire numerique, registre phyto, tracabilite agricole, logiciel agricole, gestion parcelles, traitement phytosanitaire, reglementation 2027, PAC, E-Phy',
  metadataBase: new URL('https://www.agritrace.fr'),
  alternates: {
    canonical: 'https://www.agritrace.fr',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'Agritrace - Registre Phytosanitaire Numerique',
    description: 'Registre phyto automatique conforme 2027. Vos traitements sont traces automatiquement. Essai 30 jours.',
    url: 'https://www.agritrace.fr',
    siteName: 'Agritrace',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Agritrace - Logiciel de Traçabilité Agricole',
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Agritrace - Registre Phytosanitaire Numerique',
    description: 'Registre phyto automatique conforme 2027. Traitements traces automatiquement. Essai 30 jours.',
    images: ['/og-image.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
