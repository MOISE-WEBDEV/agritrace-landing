import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Agritrace - Plateforme de Traçabilité Agricole',
  description: 'Gérez vos parcelles, suivez vos cultures et tracez vos interventions phytosanitaires avec Agritrace. Solution complète pour les agriculteurs.',
  keywords: 'agriculture, traçabilité, parcelles, cultures, phytosanitaire, exploitation agricole, gestion exploitation',
  metadataBase: new URL('https://www.agritrace.fr'),
  openGraph: {
    title: 'Agritrace - Simplifiez la gestion de votre exploitation',
    description: 'Gérez vos parcelles, suivez vos cultures et optimisez votre exploitation agricole. Essai gratuit 30 jours.',
    url: 'https://www.agritrace.fr',
    siteName: 'Agritrace',
    images: [
      {
        url: '/logo.png',
        width: 1024,
        height: 1024,
        alt: 'Agritrace - Plateforme de gestion agricole',
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Agritrace - Simplifiez la gestion de votre exploitation',
    description: 'Gérez vos parcelles, suivez vos cultures et optimisez votre exploitation agricole.',
    images: ['/logo.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  )
}
