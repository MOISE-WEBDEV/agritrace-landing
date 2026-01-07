interface HeroProps {
  onGetStarted: (plan?: string) => void
}

export default function Hero({ onGetStarted }: HeroProps) {
  return (
    <section className="pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-agri-green-light via-white to-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="text-center md:text-left">
            <div className="inline-block bg-agri-green/10 text-agri-green px-4 py-2 rounded-full text-sm font-medium mb-6 animate-fade-in-up">
              🚀 La traçabilité agricole simplifiée
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 animate-fade-in-up delay-100">
              Gérez votre exploitation <span className="text-agri-green">en toute simplicité</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-600 mb-8 animate-fade-in-up delay-200">
              Agritrace vous accompagne dans la gestion quotidienne de vos parcelles,
              le suivi de vos cultures et la traçabilité de vos interventions phytosanitaires.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start animate-fade-in-up delay-300">
              <button
                onClick={() => onGetStarted()}
                className="bg-agri-green hover:bg-agri-green-dark text-white px-8 py-4 rounded-full font-semibold text-lg transition-all hover:shadow-xl hover:scale-105"
              >
                Commencer gratuitement
              </button>
              <a
                href="#fonctionnalites"
                className="border-2 border-agri-green text-agri-green hover:bg-agri-green hover:text-white px-8 py-4 rounded-full font-semibold text-lg transition-all text-center"
              >
                En savoir plus
              </a>
            </div>

            <div className="mt-8 flex items-center justify-center md:justify-start gap-6 text-sm text-gray-500 animate-fade-in-up delay-400">
              <div className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>Gratuit pour démarrer</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>Sans engagement</span>
              </div>
            </div>
          </div>

          {/* Hero Image / Illustration */}
          <div className="relative animate-fade-in-up delay-200">
            <div className="relative z-10 bg-white rounded-2xl shadow-2xl p-6 md:p-8">
              {/* Mock Dashboard */}
              <div className="bg-agri-green-light rounded-xl p-4 mb-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-agri-green rounded-full flex items-center justify-center text-white">
                    🗺️
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Mes Parcelles</p>
                    <p className="text-sm text-gray-500">12 parcelles actives</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="bg-white rounded-lg p-3 text-center">
                    <p className="text-2xl font-bold text-agri-green">180</p>
                    <p className="text-xs text-gray-500">Hectares</p>
                  </div>
                  <div className="bg-white rounded-lg p-3 text-center">
                    <p className="text-2xl font-bold text-agri-green">28</p>
                    <p className="text-xs text-gray-500">Interventions</p>
                  </div>
                  <div className="bg-white rounded-lg p-3 text-center">
                    <p className="text-2xl font-bold text-agri-green">100%</p>
                    <p className="text-xs text-gray-500">Traçabilité</p>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="space-y-3">
                <p className="font-medium text-gray-700">Activité récente</p>
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                  <span className="text-xl">🌾</span>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Semis de blé - Parcelle Nord</p>
                    <p className="text-xs text-gray-500">Il y a 2 heures</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                  <span className="text-xl">💊</span>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Traitement fongicide enregistré</p>
                    <p className="text-xs text-gray-500">Hier</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-yellow-200 rounded-full opacity-60 blur-xl"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-green-200 rounded-full opacity-60 blur-xl"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
