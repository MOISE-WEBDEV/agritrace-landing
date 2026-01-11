'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function RegistrePhytosanitaireNumerique() {
  const [showSignupModal, setShowSignupModal] = useState(false)

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 text-agri-green hover:text-agri-green-dark">
            <span className="text-2xl">🌾</span>
            <span className="font-bold text-xl">Agritrace</span>
          </Link>
          <button
            onClick={() => setShowSignupModal(true)}
            className="bg-agri-green hover:bg-agri-green-dark text-white px-5 py-2 rounded-full font-medium transition-colors"
          >
            Essai gratuit
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-green-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              Obligatoire dès 2027
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Registre Phytosanitaire <span className="text-agri-green">Numérique</span> Gratuit
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Tenez votre registre phytosanitaire sans effort. Chaque traitement enregistré dans Agritrace
              est <strong>automatiquement tracé</strong> dans votre registre. Conforme à la réglementation 2027.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setShowSignupModal(true)}
                className="bg-agri-green hover:bg-agri-green-dark text-white px-8 py-4 rounded-full font-semibold text-lg transition-all hover:shadow-xl"
              >
                Créer mon registre gratuitement
              </button>
              <a
                href="#fonctionnement"
                className="border-2 border-agri-green text-agri-green hover:bg-agri-green hover:text-white px-8 py-4 rounded-full font-semibold text-lg transition-all text-center"
              >
                Comment ça marche ?
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Réglementation */}
      <section className="py-16 bg-orange-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
              Réglementation du registre phytosanitaire
            </h2>
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <p className="text-gray-700 mb-6 text-lg">
                Le <strong>registre phytosanitaire</strong> (ou cahier d'enregistrement des traitements) est
                <strong> obligatoire</strong> pour tous les agriculteurs utilisant des produits phytosanitaires.
                Il doit contenir :
              </p>
              <ul className="space-y-3 mb-6">
                {[
                  'La date du traitement',
                  'Le nom commercial du produit utilisé',
                  'La dose appliquée',
                  'La parcelle ou culture traitée',
                  'La surface traitée',
                  'Le nom de l\'opérateur',
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-green-500 mt-1">✓</span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="bg-orange-100 border-l-4 border-orange-500 p-4 rounded">
                <p className="text-orange-800 font-medium">
                  À partir de 2027, le registre phytosanitaire devra être tenu sous format <strong>numérique</strong>.
                  Anticipez dès maintenant avec Agritrace !
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comment ça marche */}
      <section id="fonctionnement" className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Un registre phytosanitaire automatique
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                step: '1',
                title: 'Enregistrez votre traitement',
                description: 'Créez une tâche de traitement phytosanitaire dans Agritrace. Sélectionnez la parcelle, le produit et la dose.',
                icon: '📝',
              },
              {
                step: '2',
                title: 'C\'est automatique',
                description: 'Dès que la tâche est validée, toutes les informations sont automatiquement enregistrées dans votre registre phytosanitaire numérique.',
                icon: '⚡',
              },
              {
                step: '3',
                title: 'Exportez à tout moment',
                description: 'Téléchargez votre registre en PDF ou CSV pour vos contrôles, audits ou certifications. Toujours à jour, toujours conforme.',
                icon: '📄',
              },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-agri-green rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
                  {item.icon}
                </div>
                <div className="text-sm font-semibold text-agri-green mb-2">Étape {item.step}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <p className="text-xl text-gray-700 font-medium">
              Zéro double saisie. Zéro effort supplémentaire. 100% conforme.
            </p>
          </div>
        </div>
      </section>

      {/* Avantages */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Pourquoi choisir Agritrace pour votre registre phyto ?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: '🆓',
                title: 'Gratuit',
                description: 'Commencez gratuitement, sans carte bancaire requise.',
              },
              {
                icon: '⚡',
                title: 'Automatique',
                description: 'Plus de double saisie, tout est tracé automatiquement.',
              },
              {
                icon: '📱',
                title: 'Mobile',
                description: 'Accessible sur smartphone, tablette et ordinateur.',
              },
              {
                icon: '✅',
                title: 'Conforme',
                description: 'Conforme à la réglementation en vigueur et 2027.',
              },
              {
                icon: '🔍',
                title: 'Base E-Phy',
                description: 'Accès à la base de données officielle des produits.',
              },
              {
                icon: '📊',
                title: 'Export PDF/CSV',
                description: 'Exportez votre registre pour audits et contrôles.',
              },
              {
                icon: '🔒',
                title: 'Sécurisé',
                description: 'Données hébergées en Europe, sauvegardées quotidiennement.',
              },
              {
                icon: '🤝',
                title: 'Support inclus',
                description: 'Équipe disponible pour vous accompagner.',
              },
            ].map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <span className="text-3xl">{item.icon}</span>
                <h3 className="text-lg font-bold text-gray-900 mt-3 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 bg-agri-green">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Passez au registre phytosanitaire numérique
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Rejoignez les agriculteurs qui ont simplifié leur traçabilité avec Agritrace.
            Gratuit pour démarrer, sans engagement.
          </p>
          <button
            onClick={() => setShowSignupModal(true)}
            className="bg-white text-agri-green hover:bg-gray-100 px-8 py-4 rounded-full font-semibold text-lg transition-all hover:shadow-xl"
          >
            Créer mon compte gratuitement
          </button>
        </div>
      </section>

      {/* Footer simplifié */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🌾</span>
            <span className="font-bold">Agritrace</span>
          </div>
          <nav className="flex gap-6 text-sm text-gray-400">
            <Link href="/" className="hover:text-white">Accueil</Link>
            <Link href="/faq" className="hover:text-white">FAQ</Link>
            <Link href="/mentions-legales" className="hover:text-white">Mentions légales</Link>
            <Link href="/confidentialite" className="hover:text-white">Confidentialité</Link>
          </nav>
          <p className="text-gray-400 text-sm">© 2025 Agritrace</p>
        </div>
      </footer>

      {/* Modal signup - redirect to app */}
      {showSignupModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Créer votre compte</h3>
            <p className="text-gray-600 mb-6">
              Vous allez être redirigé vers l'application Agritrace pour créer votre compte gratuitement.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => setShowSignupModal(false)}
                className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-full font-medium hover:bg-gray-50"
              >
                Annuler
              </button>
              <a
                href="https://app.agritrace.fr/signup"
                className="flex-1 bg-agri-green text-white py-3 rounded-full font-medium text-center hover:bg-agri-green-dark"
              >
                Continuer
              </a>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
