import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Agritrace - Plateforme de Traçabilité Agricole',
  description: 'Gérez vos parcelles, suivez vos cultures et tracez vos interventions phytosanitaires avec Agritrace.',
  keywords: 'agriculture, traçabilité, parcelles, cultures, phytosanitaire, exploitation agricole',
  openGraph: {
    title: 'Agritrace - Plateforme de Traçabilité Agricole',
    description: 'La solution complète pour la gestion de votre exploitation agricole',
    type: 'website',
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
