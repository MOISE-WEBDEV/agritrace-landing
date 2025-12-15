const testimonials = [
  {
    name: 'Jean-Pierre Martin',
    role: 'Céréalier, Beauce',
    avatar: '👨‍🌾',
    content: 'Agritrace a révolutionné ma gestion quotidienne. Je gagne un temps fou sur le suivi de mes parcelles et la traçabilité est impeccable pour les contrôles.',
    rating: 5,
  },
  {
    name: 'Marie Dupont',
    role: 'Technicienne, Coopérative AgriPlus',
    avatar: '👩‍🔬',
    content: 'Un outil indispensable pour suivre mes agriculteurs. L\'interface est intuitive et mes clients adoptent rapidement la solution.',
    rating: 5,
  },
  {
    name: 'Thomas Bernard',
    role: 'Polyculteur-éleveur, Normandie',
    avatar: '👨‍🌾',
    content: 'La cartographie avec le cadastre intégré est un vrai plus. Je crée mes parcelles en quelques clics et tout est automatiquement calculé.',
    rating: 5,
  },
]

export default function Testimonials() {
  return (
    <section id="temoignages" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Ils nous font confiance
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Découvrez ce que nos utilisateurs pensent d'Agritrace
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400">★</span>
                ))}
              </div>
              <p className="text-gray-600 mb-6 italic">
                "{testimonial.content}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-agri-green-light rounded-full flex items-center justify-center text-2xl">
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
