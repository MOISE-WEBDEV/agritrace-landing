import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Agritrace - Registre Phytosanitaire Numerique Gratuit | Tracabilite Agricole',
  description: 'Registre phytosanitaire numerique automatique et gratuit. Conforme reglementation 2027. Gerez vos parcelles, cultures et traitements phyto. Export PDF/CSV.',
  keywords: 'registre phytosanitaire numerique, registre phyto, tracabilite agricole, logiciel agricole gratuit, gestion parcelles, traitement phytosanitaire, reglementation 2027, PAC, E-Phy',
  metadataBase: new URL('https://www.agritrace.fr'),
  openGraph: {
    title: 'Agritrace - Registre Phytosanitaire Numerique Gratuit',
    description: 'Registre phyto automatique conforme 2027. Vos traitements sont traces automatiquement. Gratuit pour les agriculteurs.',
    url: 'https://www.agritrace.fr',
    siteName: 'Agritrace',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Agritrace - Logiciel de Traçabilité Agricole Gratuit',
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Agritrace - Registre Phytosanitaire Numerique Gratuit',
    description: 'Registre phyto automatique conforme 2027. Traitements traces automatiquement. Gratuit.',
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
      <body>{children}</body>
    </html>
  )
}
