'use client'

import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const APP_URL = 'https://www.app.agritrace.fr'

// ATTENTION SEO — Cette page est l'actif organique principal du site.
// Ne pas modifier sans precaution :
//   - l'URL /registre-phytosanitaire-numerique
//   - le H1 « Registre Phytosanitaire Numerique Automatique »
//   - la balise title definie dans layout.tsx
// Toute affirmation reglementaire (date d'entree en vigueur, format impose,
// caractere obligatoire) doit etre verifiee aupres des sources officielles
// AVANT d'etre reintroduite ici. Voir AUDIT_COMMUNICATION_SEO_AGRITRACE.md, section 8.

export default function RegistrePhytosanitaireNumerique() {
  const handleSignup = () => {
    window.location.href = `${APP_URL}/signup`
  }

  const handleLogin = () => {
    window.location.href = APP_URL
  }

  return (
    <main className="min-h-screen bg-white">
      <Header onSignup={handleSignup} onLogin={handleLogin} />

      {/* Fil d'ariane */}
      <nav className="max-w-7xl mx-auto px-4 pt-24 pb-2" aria-label="Fil d'ariane">
        <ol className="flex items-center gap-2 text-sm text-gray-500">
          <li>
            <Link href="/" className="hover:text-agri-green">Accueil</Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-gray-900 font-medium">Registre phytosanitaire numérique</li>
        </ol>
      </nav>

      {/* Hero */}
      <section className="py-12 md:py-20 bg-gradient-to-br from-green-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block bg-agri-green/10 text-agri-green px-4 py-2 rounded-full text-sm font-semibold mb-6">
              Sans double saisie
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Registre Phytosanitaire <span className="text-agri-green">Numérique</span> Automatique
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Vous n&apos;avez rien à ressaisir. Chaque traitement que vous validez dans Agritrace
              crée <strong>automatiquement</strong> la ligne correspondante dans votre registre.
              Vous l&apos;exportez ensuite au format Excel ou CSV, par année ou par période.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleSignup}
                className="bg-agri-green hover:bg-agri-green-dark text-white px-8 py-4 rounded-full font-semibold text-lg transition-all hover:shadow-xl"
              >
                Essayer gratuitement 30 jours
              </button>
              <a
                href="#fonctionnement"
                className="border-2 border-agri-green text-agri-green hover:bg-agri-green hover:text-white px-8 py-4 rounded-full font-semibold text-lg transition-all text-center"
              >
                Comment ça marche ?
              </a>
            </div>
            <p className="mt-6 text-sm text-gray-500">
              Sans carte bancaire · Sans engagement
            </p>
          </div>
        </div>
      </section>

      {/* Ce que doit contenir un registre */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
              Réglementation du registre phytosanitaire
            </h2>
            <div className="bg-gray-50 rounded-2xl p-8">
              <p className="text-gray-700 mb-6 text-lg">
                Tout agriculteur qui utilise des produits phytosanitaires doit tenir un registre
                de ses traitements, aussi appelé cahier d&apos;enregistrement. Les informations
                qui y figurent habituellement sont les suivantes :
              </p>
              <ul className="space-y-3 mb-6">
                {[
                  'La date du traitement',
                  'Le nom commercial du produit utilisé',
                  'La dose appliquée',
                  'La parcelle ou la culture traitée',
                  'La surface traitée',
                  'Le nom de l\'opérateur',
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-agri-green mt-1">✓</span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-gray-700 mb-6">
                Agritrace enregistre ces informations, et plusieurs autres : référence cadastrale,
                coordonnées GPS, culture et variété, numéro AMM, substances actives, quantité totale,
                cible, stade de la culture, matériel utilisé, conditions météo, numéros Certiphyto
                de l&apos;opérateur et du décideur.
              </p>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                <p className="text-blue-900">
                  <strong>Le cadre réglementaire évolue.</strong> Les obligations applicables à
                  votre exploitation, le format attendu et les échéances dépendent de textes
                  français et européens susceptibles d&apos;être modifiés. Vérifiez ce qui
                  s&apos;applique à votre situation auprès de votre chambre d&apos;agriculture,
                  de votre organisme certificateur ou des sources officielles.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comment ça marche */}
      <section id="fonctionnement" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Un registre phytosanitaire qui se remplit tout seul
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                step: '1',
                title: 'Vous préparez le traitement',
                description: 'Vous créez une tâche dans Agritrace : la ou les parcelles, le produit choisi dans la base E-Phy, la dose. Vous pouvez la confier à un salarié.',
                icon: '📝',
              },
              {
                step: '2',
                title: 'Le traitement est validé au champ',
                description: 'Vous ou votre salarié validez la tâche depuis un téléphone. Agritrace crée alors la ligne de registre pour chaque parcelle concernée, avec la date, l\'heure et l\'opérateur.',
                icon: '✅',
              },
              {
                step: '3',
                title: 'Vous exportez quand vous voulez',
                description: 'Vous choisissez une année ou une période, et vous téléchargez votre registre au format Excel ou CSV, prêt à être présenté.',
                icon: '📊',
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
              Zéro double saisie. Vos traitements s&apos;enregistrent au fil de la saison.
            </p>
          </div>
        </div>
      </section>

      {/* Bloc A — Ce que fait Agritrace */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">
            Ce que fait Agritrace, et ce qu&apos;il ne fait pas
          </h2>

          <div className="bg-green-50 border border-green-100 rounded-2xl p-8 mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span>✅</span> Ce que fait Agritrace
            </h3>
            <ul className="space-y-3">
              {[
                'Enregistre automatiquement chaque traitement validé : date, heure, parcelle, surface, culture, variété, stade.',
                'Reprend le produit depuis la base officielle E-Phy, avec son numéro AMM et ses substances actives.',
                'Identifie l\'opérateur et le décideur, avec leurs numéros Certiphyto.',
                'Enregistre le matériel utilisé et les conditions météo.',
                'Regroupe les produits d\'une même bouillie sous un numéro d\'opération commun.',
                'Exporte votre registre au format Excel ou CSV, par année ou par période.',
                'Permet aussi d\'exporter le registre complet de l\'exploitation : semis, travail du sol, fertilisation, irrigation, récolte.',
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-green-600 mt-1">✓</span>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Bloc B — Les limites de l'outil */}
          <div className="bg-orange-50 border border-orange-100 rounded-2xl p-8 mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span>⚠️</span> Les limites de l&apos;outil
            </h3>
            <ul className="space-y-3">
              {[
                'Agritrace enregistre ce que vous saisissez. Il ne vérifie ni la justesse de la dose, ni l\'autorisation du produit sur votre culture, ni le respect des délais avant récolte.',
                'Un traitement qui n\'a pas été enregistré dans Agritrace n\'apparaîtra pas dans votre registre.',
                'La base E-Phy est une source externe. Vérifiez toujours l\'étiquette du produit.',
                'L\'export reflète les données de votre compte à l\'instant où vous le générez.',
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-orange-600 mt-1">•</span>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Bloc C — Votre responsabilité */}
          <div className="bg-gray-100 border border-gray-200 rounded-2xl p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span>👤</span> Votre responsabilité
            </h3>
            <p className="text-gray-700 leading-relaxed">
              Vous restez responsable de l&apos;exactitude des informations enregistrées et du
              respect de la réglementation applicable à votre exploitation.{' '}
              <strong>Relisez votre registre avant tout contrôle ou audit.</strong> Agritrace est
              un outil d&apos;enregistrement et d&apos;export : il ne se substitue ni à votre
              conseiller, ni aux textes officiels. En cas de doute sur une obligation,
              rapprochez-vous de votre chambre d&apos;agriculture ou de votre organisme
              certificateur.
            </p>
          </div>
        </div>
      </section>

      {/* Avantages */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Pourquoi tenir son registre dans Agritrace ?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: '⚡',
                title: 'Pas de ressaisie',
                description: 'Le registre se construit à partir des tâches que vous validez déjà.',
              },
              {
                icon: '📱',
                title: 'Depuis le champ',
                description: 'Vos salariés valident leurs interventions depuis leur téléphone.',
              },
              {
                icon: '🔍',
                title: 'Base E-Phy',
                description: 'Retrouvez un produit, son numéro AMM et ses substances actives.',
              },
              {
                icon: '📊',
                title: 'Export Excel et CSV',
                description: 'Un fichier exploitable, filtré par année ou par période.',
              },
              {
                icon: '🗂️',
                title: 'Registre complet',
                description: 'Un second export reprend toutes vos opérations, pas seulement les traitements.',
              },
              {
                icon: '🤝',
                title: 'Travail à plusieurs',
                description: 'Salariés et technicien interviennent, les informations restent réunies.',
              },
              {
                icon: '🔒',
                title: 'Données protégées',
                description: 'Échanges en HTTPS, serveurs applicatifs en Europe, sauvegardes régulières.',
              },
              {
                icon: '🎯',
                title: 'Essai 30 jours',
                description: 'Testez sur vos propres parcelles, sans carte bancaire.',
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

      {/* Maillage interne */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Pour aller plus loin
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <Link href="/#fonctionnalites" className="block p-5 border border-gray-200 rounded-xl hover:border-agri-green hover:shadow-md transition-all">
              <span className="font-semibold text-gray-900">Toutes les fonctionnalités</span>
              <p className="text-sm text-gray-600 mt-1">Parcelles, cultures, équipe, stock, matériel et récolte.</p>
            </Link>
            <Link href="/#tarifs" className="block p-5 border border-gray-200 rounded-xl hover:border-agri-green hover:shadow-md transition-all">
              <span className="font-semibold text-gray-900">Tarifs</span>
              <p className="text-sm text-gray-600 mt-1">Essentiel, Pro et Enterprise, avec 30 jours d&apos;essai.</p>
            </Link>
            <Link href="/faq" className="block p-5 border border-gray-200 rounded-xl hover:border-agri-green hover:shadow-md transition-all">
              <span className="font-semibold text-gray-900">Questions fréquentes</span>
              <p className="text-sm text-gray-600 mt-1">Une rubrique est consacrée au registre phytosanitaire.</p>
            </Link>
            <Link href="/actualites" className="block p-5 border border-gray-200 rounded-xl hover:border-agri-green hover:shadow-md transition-all">
              <span className="font-semibold text-gray-900">Actualités et guides</span>
              <p className="text-sm text-gray-600 mt-1">Traçabilité, préparation de campagne et vie du secteur.</p>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 bg-agri-green">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Essayez le registre phytosanitaire numérique
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Créez votre compte et enregistrez vos premiers traitements sur vos propres parcelles.
            30 jours d&apos;essai, sans carte bancaire et sans engagement.
          </p>
          <button
            onClick={handleSignup}
            className="bg-white text-agri-green hover:bg-gray-100 px-8 py-4 rounded-full font-semibold text-lg transition-all hover:shadow-xl"
          >
            Commencer l&apos;essai
          </button>
        </div>
      </section>

      <Footer />
    </main>
  )
}
