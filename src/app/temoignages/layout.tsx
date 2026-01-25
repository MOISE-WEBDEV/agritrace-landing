import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Temoignages et avis agriculteurs | Agritrace',
  description: 'Decouvrez les avis verifies des agriculteurs qui utilisent Agritrace pour gerer leur exploitation et leur registre phytosanitaire numerique.',
  keywords: 'avis agritrace, temoignages agriculteurs, registre phytosanitaire avis, logiciel agricole avis, tracabilite agricole temoignages',
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
    title: 'Temoignages et avis agriculteurs | Agritrace',
    description: 'Decouvrez les avis verifies des agriculteurs qui utilisent Agritrace.',
    url: 'https://www.agritrace.fr/temoignages',
    siteName: 'Agritrace',
    locale: 'fr_FR',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.agritrace.fr/temoignages',
  },
}

export default function TemoignagesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
