import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Mentions Legales | Agritrace',
  description: 'Mentions legales du site Agritrace. Informations sur l\'editeur, l\'hebergement et les droits de propriete intellectuelle.',
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://www.agritrace.fr/mentions-legales',
  },
}

export default function MentionsLegalesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
