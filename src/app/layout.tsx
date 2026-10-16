import type { Metadata } from 'next'
import './globals.css'
import ChatWidget from '@/components/ChatWidget'

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
  description: 'Agritrace est une plateforme de gestion, de traçabilité et de collaboration agricole pour les exploitations agricoles françaises.',
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
  offers: [
    {
      '@type': 'Offer',
      name: 'Essentiel',
      price: '17.90',
      priceCurrency: 'EUR',
      priceValidUntil: '2027-12-31',
      availability: 'https://schema.org/InStock',
    },
    {
      '@type': 'Offer',
      name: 'Pro',
      price: '29',
      priceCurrency: 'EUR',
      priceValidUntil: '2027-12-31',
      availability: 'https://schema.org/InStock',
    },
  ],
  // NOTE: aucun `aggregateRating` n'est declare ici.
  // Les avis sont collectes et moderes via /api/v1/reviews/approved et affiches
  // sur /temoignages. Ne reintroduire un aggregateRating que s'il est calcule
  // dynamiquement a partir des avis reellement approuves (regles Google sur les
  // extraits enrichis : une note codee en dur expose a une action manuelle).
  description: 'Logiciel de gestion agricole et registre phytosanitaire numérique automatique. Gestion des parcelles, suivi des cultures, coordination de l\'équipe et traçabilité des interventions.',
  featureList: [
    'Registre phytosanitaire numérique automatique',
    'Gestion des parcelles avec cartographie interactive',
    'Suivi des cultures et des interventions',
    'Base de données officielle E-Phy',
    'Export Excel et CSV',
    'Gestion des stocks phytosanitaires',
    'Gestion de l\'équipe et des tâches',
    'Suivi des récoltes et des bons d\'apport',
    'Application web responsive',
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
  description: 'Logiciel de gestion agricole et registre phytosanitaire numérique pour les exploitations agricoles françaises.',
  publisher: {
    '@id': 'https://www.agritrace.fr/#organization',
  },
  inLanguage: 'fr-FR',
}

export const metadata: Metadata = {
  // NOTE SEO : le mot-cle « Registre Phytosanitaire Numerique » est conserve en
  // tete de title. Ne pas le retirer sans avoir releve au prealable les positions
  // actuelles dans Google Search Console.
  title: 'Agritrace - Registre Phytosanitaire Numérique | Gestion Agricole',
  description: 'Registre phytosanitaire numérique automatique. Gérez vos parcelles, vos cultures, vos interventions et votre équipe au même endroit. Export Excel et CSV. Essai gratuit 30 jours, sans carte bancaire.',
  keywords: 'registre phytosanitaire numérique, registre phyto, traçabilité agricole, logiciel agricole, gestion parcelles, gestion exploitation agricole, traitement phytosanitaire, E-Phy',
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
    title: 'Agritrace - Registre Phytosanitaire Numérique',
    description: 'Chaque traitement que vous validez est enregistré automatiquement dans votre registre. Essai gratuit 30 jours, sans carte bancaire.',
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
    title: 'Agritrace - Registre Phytosanitaire Numérique',
    description: 'Chaque traitement que vous validez est enregistré automatiquement dans votre registre. Essai gratuit 30 jours.',
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
      <body>
        {children}
        <ChatWidget />
      </body>
    </html>
  )
}
