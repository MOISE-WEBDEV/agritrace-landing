const features = [
  {
    icon: '🗺️',
    title: 'Cartographie Interactive',
    description: 'Visualisez et gérez vos parcelles sur une carte interactive avec intégration cadastrale automatique.',
  },
  {
    icon: '🌱',
    title: 'Suivi des Cultures',
    description: 'Enregistrez vos cycles culturaux, variétés et suivez l\'évolution de vos cultures en temps réel.',
  },
  {
    icon: '💊',
    title: 'Traçabilité Phytosanitaire',
    description: 'Documentez toutes vos interventions avec accès à la base E-Phy officielle des produits autorisés.',
  },
  {
    icon: '🌤️',
    title: 'Météo Intégrée',
    description: 'Consultez les données de précipitations et conditions météo pour optimiser vos interventions.',
  },
  {
    icon: '👥',
    title: 'Gestion d\'Équipe',
    description: 'Créez des comptes pour vos employés et assignez-leur des tâches sur vos parcelles.',
  },
  {
    icon: '📊',
    title: 'Historique Complet',
    description: 'Accédez à l\'historique de toutes vos activités pour une traçabilité parfaite.',
  },
]

export default function Features() {
  return (
    <section id="fonctionnalites" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Tout ce dont vous avez besoin
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Une plateforme complète pour gérer votre exploitation agricole au quotidien
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-6 bg-white rounded-2xl border border-gray-100 hover:border-agri-green/30 hover:shadow-xl transition-all duration-300"
            >
              <div className="w-14 h-14 bg-agri-green-light rounded-xl flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
