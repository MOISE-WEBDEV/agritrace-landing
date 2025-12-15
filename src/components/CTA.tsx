interface CTAProps {
  onGetStarted: () => void
}

export default function CTA({ onGetStarted }: CTAProps) {
  return (
    <section className="py-20 bg-gradient-to-r from-agri-green to-agri-green-dark">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Prêt à simplifier la gestion de votre exploitation ?
        </h2>
        <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
          Rejoignez des centaines d'agriculteurs qui ont déjà adopté Agritrace
          pour gérer leurs parcelles et assurer leur traçabilité.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={onGetStarted}
            className="bg-white text-agri-green hover:bg-gray-100 px-8 py-4 rounded-full font-semibold text-lg transition-all hover:shadow-xl"
          >
            Créer mon compte gratuit
          </button>
          <a
            href="mailto:service.client@agritrace.fr"
            className="border-2 border-white text-white hover:bg-white hover:text-agri-green px-8 py-4 rounded-full font-semibold text-lg transition-all"
          >
            Nous contacter
          </a>
        </div>
        <p className="mt-6 text-white/70 text-sm">
          Aucune carte bancaire requise • Démarrez en moins de 2 minutes
        </p>
      </div>
    </section>
  )
}
