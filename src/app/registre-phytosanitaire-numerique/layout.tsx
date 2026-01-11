import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Registre Phytosanitaire Numérique Automatique | Agritrace',
  description: 'Registre phytosanitaire numérique automatique. Chaque traitement enregistré est automatiquement tracé. Conforme réglementation 2027. Export PDF/CSV. Essai 30 jours.',
  keywords: 'registre phytosanitaire numérique, registre phyto, cahier enregistrement traitements, réglementation phytosanitaire 2027, traçabilité phytosanitaire, logiciel agricole',
  openGraph: {
    title: 'Registre Phytosanitaire Numérique Automatique | Agritrace',
    description: 'Tenez votre registre phytosanitaire sans effort. Automatique et conforme 2027. Essai 30 jours.',
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
