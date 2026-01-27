'use client'

import { useState } from 'react'

interface Feature {
  icon: string
  title: string
  description: string
  video?: string
  badge?: string
}

const features: Feature[] = [
  {
    icon: '🗺️',
    title: 'Cartographie Interactive',
    description: 'Visualisez et gérez vos parcelles sur une carte interactive avec intégration cadastrale automatique.',
    video: '/videos/map-demo.mp4',
  },
  {
    icon: '🌱',
    title: 'Suivi des Cultures',
    description: 'Enregistrez vos cycles culturaux, variétés et suivez l\'évolution de vos cultures en temps réel.',
    video: '/videos/suivi-cultures.mp4',
  },
  {
    icon: '💊',
    title: 'Registre Phytosanitaire Numérique',
    description: 'Registre phyto automatique : chaque traitement enregistré est automatiquement tracé dans votre registre. Conforme réglementation 2027, accès base E-Phy officielle, export PDF/CSV.',
    video: '/videos/phyto-register-demo.mp4',
    badge: 'Obligatoire 2027',
  },
  {
    icon: '🌤️',
    title: 'Météo Intégrée',
    description: 'Consultez les données de précipitations et conditions météo pour optimiser vos interventions.',
    video: '/videos/meteo-demo.mp4',
  },
  {
    icon: '👥',
    title: 'Gestion d\'Équipe',
    description: 'Créez des comptes pour vos employés et assignez-leur des tâches sur vos parcelles.',
    video: '/videos/team-demo.mp4',
  },
  {
    icon: '📊',
    title: 'Historique Complet',
    description: 'Accédez à l\'historique de toutes vos activités pour une traçabilité parfaite.',
    video: '/videos/history-demo-compressed.mp4',
  },
]

export default function Features() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section id="fonctionnalites" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Fonctionnalites pour gerer votre exploitation agricole
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Tracabilite agricole, registre phytosanitaire numerique, gestion parcellaire et suivi des cultures : tous les outils pour piloter votre ferme.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative p-6 bg-white rounded-2xl border border-gray-100 hover:border-agri-green/30 hover:shadow-xl transition-all duration-300"
              onMouseEnter={() => feature.video && setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="w-14 h-14 bg-agri-green-light rounded-xl flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-xl font-semibold text-gray-900">
                  {feature.title}
                </h3>
                {feature.badge && (
                  <span className="px-2 py-1 bg-orange-100 text-orange-700 text-xs font-medium rounded-full">
                    {feature.badge}
                  </span>
                )}
              </div>
              <p className="text-gray-600">
                {feature.description}
              </p>

              {/* Video popup on hover */}
              {feature.video && hoveredIndex === index && (
                <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
                  <div className="w-[800px] max-w-[90vw] rounded-xl overflow-hidden shadow-2xl border border-gray-200 bg-black">
                    <video
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="w-full h-auto"
                    >
                      <source src={feature.video} type="video/mp4" />
                    </video>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
