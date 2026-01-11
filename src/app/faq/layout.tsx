import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'FAQ - Questions Fréquentes | Agritrace',
  description: 'Retrouvez les réponses aux questions fréquentes sur Agritrace : inscription, fonctionnalités, tarifs, registre phytosanitaire, sécurité des données et support.',
  keywords: 'FAQ agritrace, questions fréquentes, aide agritrace, support agricole, registre phytosanitaire aide',
  openGraph: {
    title: 'FAQ - Questions Fréquentes | Agritrace',
    description: 'Toutes les réponses à vos questions sur Agritrace, le logiciel de traçabilité agricole.',
    url: 'https://www.agritrace.fr/faq',
    siteName: 'Agritrace',
    locale: 'fr_FR',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.agritrace.fr/faq',
  },
}

export default function FAQLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
