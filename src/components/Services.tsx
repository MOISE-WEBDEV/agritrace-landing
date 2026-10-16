const services = [
  {
    icon: '🌾',
    title: 'Pour les Agriculteurs',
    description: 'Gérez vos parcelles, suivez vos cultures et documentez vos interventions en toute simplicité.',
    features: [
      'Cartographie interactive de vos parcelles',
      'Enregistrement des cycles culturaux',
      'Suivi des interventions phytosanitaires',
      'Gestion du stock de produits',
      'Historique complet des activités',
    ],
    color: 'green',
  },
  {
    icon: '👨‍🔬',
    title: 'Pour les Techniciens',
    description: 'Suivez les exploitations que vous accompagnez et transmettez vos préconisations.',
    features: [
      'Tableau de bord multi-exploitations',
      'Accès aux parcelles que l\'agriculteur vous autorise',
      'Préconisations envoyées directement dans ses tâches',
      'Préconisation groupée sur plusieurs exploitations',
      'Historique des interventions suivies',
    ],
    color: 'blue',
  },
  {
    icon: '👷',
    title: 'Pour les Employés',
    description: 'Consultez vos tâches assignées et enregistrez votre travail directement depuis le terrain.',
    features: [
      'Liste des tâches du jour',
      'Localisation des parcelles sur la carte',
      'Validation des interventions depuis le champ',
      'Utilisable depuis un téléphone',
      'Mise à jour immédiate pour l\'exploitant',
    ],
    color: 'orange',
  },
]

export default function Services() {
  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Une solution pour chaque profil
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Agritrace s'adapte à vos besoins, que vous soyez agriculteur, technicien ou employé
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className={`p-6 ${
                service.color === 'green' ? 'bg-gradient-to-r from-green-500 to-green-600' :
                service.color === 'blue' ? 'bg-gradient-to-r from-blue-500 to-blue-600' :
                'bg-gradient-to-r from-orange-500 to-orange-600'
              } text-white`}>
                <span className="text-4xl">{service.icon}</span>
                <h3 className="text-xl font-bold mt-4">{service.title}</h3>
                <p className="text-white/90 mt-2 text-sm">{service.description}</p>
              </div>
              <div className="p-6">
                <ul className="space-y-3">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className={`mt-1 ${
                        service.color === 'green' ? 'text-green-500' :
                        service.color === 'blue' ? 'text-blue-500' :
                        'text-orange-500'
                      }`}>✓</span>
                      <span className="text-gray-600 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
