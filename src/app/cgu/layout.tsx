import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Conditions Generales d\'Utilisation | Agritrace',
  description: 'Conditions generales d\'utilisation de la plateforme Agritrace. Regles d\'acces et modalites d\'utilisation du service de tracabilite agricole.',
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://www.agritrace.fr/cgu',
  },
}

export default function CGULayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
