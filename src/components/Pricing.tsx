interface PricingProps {
  onGetStarted: () => void
}

const plans = [
  {
    name: 'Essai Gratuit',
    price: '0€',
    period: 'pendant 1 mois',
    description: 'Testez toutes les fonctionnalités',
    features: [
      'Accès complet pendant 30 jours',
      'Parcelles illimitées',
      'Cartographie interactive',
      'Suivi des cultures',
      'Support par email',
      'Sans engagement',
    ],
    cta: 'Commencer l\'essai gratuit',
    highlighted: false,
  },
  {
    name: 'Pro',
    price: '29€',
    period: '/mois',
    description: 'Pour les exploitations en croissance',
    features: [
      'Parcelles illimitées',
      'Toutes les fonctionnalités',
      'Gestion d\'équipe (5 employés)',
      'Météo avancée',
      'Historique illimité',
      'Support prioritaire',
      'Export PDF des rapports',
    ],
    cta: 'Choisir Pro',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: 'Sur mesure',
    period: '',
    description: 'Pour les grandes structures',
    features: [
      'Tout le plan Pro',
      'Employés illimités',
      'API personnalisée',
      'Formation dédiée',
      'Support téléphonique 24/7',
      'Intégrations sur mesure',
      'SLA garanti',
    ],
    cta: 'Nous contacter',
    highlighted: false,
  },
]

export default function Pricing({ onGetStarted }: PricingProps) {
  return (
    <section id="tarifs" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Des tarifs adaptés à vos besoins
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Commencez gratuitement et évoluez selon vos besoins
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`rounded-2xl p-8 ${
                plan.highlighted
                  ? 'bg-agri-green text-white shadow-xl scale-105'
                  : 'bg-white shadow-lg'
              }`}
            >
              <h3 className={`text-xl font-bold mb-2 ${
                plan.highlighted ? 'text-white' : 'text-gray-900'
              }`}>
                {plan.name}
              </h3>
              <p className={`text-sm mb-4 ${
                plan.highlighted ? 'text-white/80' : 'text-gray-500'
              }`}>
                {plan.description}
              </p>
              <div className="mb-6">
                <span className={`text-4xl font-bold ${
                  plan.highlighted ? 'text-white' : 'text-gray-900'
                }`}>
                  {plan.price}
                </span>
                <span className={plan.highlighted ? 'text-white/80' : 'text-gray-500'}>
                  {plan.period}
                </span>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className={plan.highlighted ? 'text-green-300' : 'text-agri-green'}>✓</span>
                    <span className={`text-sm ${
                      plan.highlighted ? 'text-white/90' : 'text-gray-600'
                    }`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
              <button
                onClick={onGetStarted}
                className={`w-full py-3 rounded-full font-semibold transition-all ${
                  plan.highlighted
                    ? 'bg-white text-agri-green hover:bg-gray-100'
                    : 'bg-agri-green text-white hover:bg-agri-green-dark'
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
