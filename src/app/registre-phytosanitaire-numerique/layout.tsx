import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Registre Phytosanitaire Numérique Gratuit | Agritrace',
  description: 'Registre phytosanitaire numérique automatique et gratuit. Chaque traitement enregistré est automatiquement tracé. Conforme réglementation 2027. Export PDF/CSV.',
  keywords: 'registre phytosanitaire numérique, registre phyto gratuit, cahier enregistrement traitements, réglementation phytosanitaire 2027, traçabilité phytosanitaire, logiciel agricole',
  openGraph: {
    title: 'Registre Phytosanitaire Numérique Gratuit | Agritrace',
    description: 'Tenez votre registre phytosanitaire sans effort. Automatique, gratuit et conforme 2027.',
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
