import { Metadata } from 'next'

export const metadata: Metadata = {
  // NE PAS modifier ce title sans releve prealable des positions dans Search Console :
  // c'est la page exacte-match sur « registre phytosanitaire numerique ».
  title: 'Registre Phytosanitaire Numérique Automatique | Agritrace',
  description: 'Registre phytosanitaire numérique automatique : chaque traitement que vous validez est enregistré sans ressaisie. Export Excel et CSV. Essai gratuit 30 jours, sans carte bancaire.',
  keywords: 'registre phytosanitaire numérique, registre phyto, cahier enregistrement traitements, réglementation phytosanitaire, traçabilité phytosanitaire, logiciel agricole',
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
    title: 'Registre Phytosanitaire Numérique Automatique | Agritrace',
    description: 'Tenez votre registre phytosanitaire sans ressaisie. Chaque traitement validé est enregistré automatiquement. Essai gratuit 30 jours.',
    url: 'https://www.agritrace.fr/registre-phytosanitaire-numerique',
    siteName: 'Agritrace',
    locale: 'fr_FR',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.agritrace.fr/registre-phytosanitaire-numerique',
  },
}

export default function RegistrePhytosanitaireLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
