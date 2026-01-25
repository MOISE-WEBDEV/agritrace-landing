import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Politique de Confidentialite | Agritrace',
  description: 'Politique de confidentialite d\'Agritrace. Decouvrez comment nous collectons, utilisons et protegeons vos donnees personnelles.',
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://www.agritrace.fr/confidentialite',
  },
}

export default function ConfidentialiteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
