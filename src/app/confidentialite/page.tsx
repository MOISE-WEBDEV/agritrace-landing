import Link from 'next/link'

export default function Confidentialite() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header simple */}
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <Link href="/" className="flex items-center gap-2 text-agri-green hover:text-agri-green-dark">
            <span className="text-2xl">🌾</span>
            <span className="font-bold">Agritrace</span>
          </Link>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Politique de Confidentialité</h1>

        <div className="bg-white rounded-lg shadow-sm p-8 space-y-8">
          <p className="text-gray-600 leading-relaxed">
            Dernière mise à jour : Décembre 2025
          </p>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">1. Introduction</h2>
            <p className="text-gray-600 leading-relaxed">
              Agritrace s&apos;engage à protéger la vie privée de ses utilisateurs. Cette politique de confidentialité
              explique comment nous collectons, utilisons, stockons et protégeons vos données personnelles lorsque
              vous utilisez notre plateforme.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">2. Données collectées</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Nous collectons les données suivantes :
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
              <li><strong>Données d&apos;identification</strong> : nom, prénom, email, numéro de téléphone</li>
              <li><strong>Données professionnelles</strong> : nom de l&apos;exploitation, SIRET, adresse</li>
              <li><strong>Données d&apos;exploitation</strong> : parcelles, cultures, interventions, stocks</li>
              <li><strong>Données de connexion</strong> : adresse IP, type de navigateur, pages visitées</li>
              <li><strong>Données de géolocalisation</strong> : coordonnées GPS des parcelles (avec votre consentement)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">3. Utilisation des données</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Vos données sont utilisées pour :
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
              <li>Fournir et améliorer nos services de gestion agricole</li>
              <li>Personnaliser votre expérience utilisateur</li>
              <li>Assurer la traçabilité de vos interventions</li>
              <li>Vous envoyer des notifications et alertes pertinentes</li>
              <li>Répondre à vos demandes de support</li>
              <li>Respecter nos obligations légales</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">4. Base légale du traitement</h2>
            <p className="text-gray-600 leading-relaxed">
              Le traitement de vos données repose sur :
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4 mt-4">
              <li><strong>L&apos;exécution du contrat</strong> : pour fournir les services auxquels vous avez souscrit</li>
              <li><strong>Votre consentement</strong> : pour les communications marketing et la géolocalisation</li>
              <li><strong>L&apos;intérêt légitime</strong> : pour améliorer nos services et assurer la sécurité</li>
              <li><strong>L&apos;obligation légale</strong> : pour respecter la réglementation agricole</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">5. Partage des données</h2>
            <p className="text-gray-600 leading-relaxed">
              Vos données ne sont jamais vendues. Elles peuvent être partagées avec :
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4 mt-4">
              <li><strong>Vos techniciens agricoles</strong> : uniquement si vous les avez autorisés</li>
              <li><strong>Nos prestataires techniques</strong> : hébergement (Heroku), paiement (Stripe)</li>
              <li><strong>Les autorités</strong> : si la loi l&apos;exige</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">6. Conservation des données</h2>
            <p className="text-gray-600 leading-relaxed">
              Vos données sont conservées pendant la durée de votre utilisation du service, puis :
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4 mt-4">
              <li><strong>Données de compte</strong> : supprimées 3 ans après la dernière connexion</li>
              <li><strong>Données d&apos;exploitation</strong> : conservées 10 ans (obligations légales de traçabilité)</li>
              <li><strong>Données de facturation</strong> : conservées 10 ans (obligations comptables)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">7. Sécurité</h2>
            <p className="text-gray-600 leading-relaxed">
              Nous mettons en œuvre des mesures de sécurité appropriées :
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4 mt-4">
              <li>Chiffrement des données en transit (HTTPS/TLS)</li>
              <li>Chiffrement des mots de passe (bcrypt)</li>
              <li>Authentification sécurisée (JWT)</li>
              <li>Sauvegardes régulières</li>
              <li>Accès restreint aux données</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">8. Vos droits (RGPD)</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Conformément au RGPD, vous disposez des droits suivants :
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
              <li><strong>Droit d&apos;accès</strong> : obtenir une copie de vos données</li>
              <li><strong>Droit de rectification</strong> : corriger vos données inexactes</li>
              <li><strong>Droit à l&apos;effacement</strong> : demander la suppression de vos données</li>
              <li><strong>Droit à la portabilité</strong> : récupérer vos données dans un format standard</li>
              <li><strong>Droit d&apos;opposition</strong> : vous opposer à certains traitements</li>
              <li><strong>Droit de limitation</strong> : limiter le traitement de vos données</li>
            </ul>
            <p className="text-gray-600 leading-relaxed mt-4">
              Pour exercer ces droits, contactez-nous à : <a href="mailto:rgpd@agritrace.fr" className="text-agri-green hover:underline">rgpd@agritrace.fr</a>
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">9. Cookies</h2>
            <p className="text-gray-600 leading-relaxed">
              Nous utilisons des cookies essentiels au fonctionnement du service (authentification, préférences).
              Aucun cookie publicitaire ou de tracking n&apos;est utilisé.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">10. Contact</h2>
            <p className="text-gray-600 leading-relaxed">
              Pour toute question relative à cette politique de confidentialité :<br /><br />
              Email : <a href="mailto:rgpd@agritrace.fr" className="text-agri-green hover:underline">rgpd@agritrace.fr</a><br />
              Vous pouvez également déposer une réclamation auprès de la CNIL : <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-agri-green hover:underline">www.cnil.fr</a>
            </p>
          </section>
        </div>

        <div className="mt-8 text-center">
          <Link href="/" className="text-agri-green hover:text-agri-green-dark font-medium">
            ← Retour à l&apos;accueil
          </Link>
        </div>
      </div>
    </main>
  )
}
