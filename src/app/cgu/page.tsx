import Link from 'next/link'

export default function CGU() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header simple */}
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <Link href="/" className="flex items-center group">
            <img
              src="/logo.png"
              alt="Agritrace"
              className="h-12 w-auto transition-transform group-hover:scale-105"
            />
          </Link>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Conditions Générales d&apos;Utilisation</h1>

        <div className="bg-white rounded-lg shadow-sm p-8 space-y-8">
          <p className="text-gray-600 leading-relaxed">
            Dernière mise à jour : Décembre 2025
          </p>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">1. Objet</h2>
            <p className="text-gray-600 leading-relaxed">
              Les présentes Conditions Générales d&apos;Utilisation (CGU) définissent les modalités d&apos;accès et d&apos;utilisation
              de la plateforme Agritrace, accessible à l&apos;adresse <strong>www.agritrace.fr</strong> et <strong>app.agritrace.fr</strong>.
            </p>
            <p className="text-gray-600 leading-relaxed mt-4">
              En créant un compte ou en utilisant nos services, vous acceptez sans réserve les présentes CGU.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">2. Description du service</h2>
            <p className="text-gray-600 leading-relaxed">
              Agritrace est une plateforme de gestion et de traçabilité agricole permettant aux agriculteurs de :
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4 mt-4">
              <li>Gérer leurs parcelles agricoles et visualiser leur exploitation sur une carte</li>
              <li>Suivre les cycles de culture et les interventions</li>
              <li>Gérer leurs stocks de produits phytosanitaires</li>
              <li>Planifier et assigner des tâches à leurs employés</li>
              <li>Collaborer avec leurs techniciens agricoles</li>
              <li>Générer des rapports de traçabilité</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">3. Inscription et compte utilisateur</h2>
            <p className="text-gray-600 leading-relaxed">
              <strong>3.1 Conditions d&apos;inscription</strong><br />
              L&apos;inscription est réservée aux professionnels agricoles majeurs. En vous inscrivant, vous certifiez
              que les informations fournies sont exactes et complètes.
            </p>
            <p className="text-gray-600 leading-relaxed mt-4">
              <strong>3.2 Sécurité du compte</strong><br />
              Vous êtes responsable de la confidentialité de vos identifiants de connexion. Toute activité
              réalisée depuis votre compte est présumée être de votre fait.
            </p>
            <p className="text-gray-600 leading-relaxed mt-4">
              <strong>3.3 Comptes employés</strong><br />
              En tant qu&apos;agriculteur, vous pouvez créer des comptes pour vos employés. Vous restez responsable
              de l&apos;utilisation de ces comptes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">4. Période d&apos;essai et abonnement</h2>
            <p className="text-gray-600 leading-relaxed">
              <strong>4.1 Période d&apos;essai</strong><br />
              Une période d&apos;essai gratuite de 30 jours est offerte à tout nouvel utilisateur. Durant cette période,
              vous avez accès à l&apos;ensemble des fonctionnalités.
            </p>
            <p className="text-gray-600 leading-relaxed mt-4">
              <strong>4.2 Abonnement</strong><br />
              À l&apos;issue de la période d&apos;essai, un abonnement payant est nécessaire pour continuer à utiliser
              le service. Les tarifs sont disponibles sur notre site.
            </p>
            <p className="text-gray-600 leading-relaxed mt-4">
              <strong>4.3 Résiliation</strong><br />
              Vous pouvez résilier votre abonnement à tout moment. L&apos;accès au service reste actif jusqu&apos;à
              la fin de la période payée.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">5. Utilisation du service</h2>
            <p className="text-gray-600 leading-relaxed">
              <strong>5.1 Utilisation autorisée</strong><br />
              Le service est destiné exclusivement à un usage professionnel agricole. Vous vous engagez à
              utiliser le service conformément à sa destination et aux lois en vigueur.
            </p>
            <p className="text-gray-600 leading-relaxed mt-4">
              <strong>5.2 Utilisations interdites</strong><br />
              Il est interdit de :
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4 mt-2">
              <li>Utiliser le service à des fins illégales</li>
              <li>Tenter de contourner les mesures de sécurité</li>
              <li>Partager vos identifiants avec des tiers non autorisés</li>
              <li>Revendre ou sous-licencier l&apos;accès au service</li>
              <li>Collecter des données d&apos;autres utilisateurs</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">6. Propriété des données</h2>
            <p className="text-gray-600 leading-relaxed">
              <strong>6.1 Vos données</strong><br />
              Vous restez propriétaire de toutes les données que vous saisissez dans Agritrace (parcelles,
              cultures, interventions, etc.).
            </p>
            <p className="text-gray-600 leading-relaxed mt-4">
              <strong>6.2 Export des données</strong><br />
              Vous pouvez à tout moment exporter vos données dans un format standard.
            </p>
            <p className="text-gray-600 leading-relaxed mt-4">
              <strong>6.3 Licence d&apos;utilisation</strong><br />
              En utilisant le service, vous accordez à Agritrace une licence limitée pour traiter vos données
              dans le seul but de fournir le service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">7. Propriété intellectuelle</h2>
            <p className="text-gray-600 leading-relaxed">
              La plateforme Agritrace, son code source, son design, ses textes et images sont la propriété
              exclusive d&apos;Agritrace. Toute reproduction ou utilisation non autorisée est interdite.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">8. Disponibilité du service</h2>
            <p className="text-gray-600 leading-relaxed">
              Agritrace s&apos;efforce d&apos;assurer la disponibilité du service 24h/24, 7j/7. Toutefois, nous ne
              garantissons pas une disponibilité ininterrompue. Des interruptions pour maintenance ou mise
              à jour peuvent survenir.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">9. Responsabilité</h2>
            <p className="text-gray-600 leading-relaxed">
              <strong>9.1 Exactitude des données</strong><br />
              Vous êtes responsable de l&apos;exactitude des données saisies. Agritrace ne peut être tenu responsable
              des conséquences d&apos;erreurs de saisie.
            </p>
            <p className="text-gray-600 leading-relaxed mt-4">
              <strong>9.2 Limitation de responsabilité</strong><br />
              Agritrace ne pourra être tenu responsable des dommages indirects, pertes de données ou manque
              à gagner résultant de l&apos;utilisation ou de l&apos;impossibilité d&apos;utiliser le service.
            </p>
            <p className="text-gray-600 leading-relaxed mt-4">
              <strong>9.3 Produits phytosanitaires et traitements agricoles</strong><br />
              Agritrace est un outil de gestion et de traçabilité agricole. En aucun cas, Agritrace ne peut
              être tenu responsable :
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4 mt-2">
              <li>Des erreurs de traitement ou d&apos;application de produits phytosanitaires</li>
              <li>Des erreurs de dosage, de dilution ou de quantités appliquées</li>
              <li>Des erreurs de choix de produits ou de substances actives</li>
              <li>Des erreurs de prescription ou de recommandation</li>
              <li>Des conséquences sanitaires, environnementales ou économiques liées à l&apos;utilisation de produits</li>
              <li>Des non-conformités réglementaires dans l&apos;utilisation des produits phytosanitaires</li>
            </ul>
            <p className="text-gray-600 leading-relaxed mt-4">
              <strong>9.4 Responsabilité professionnelle</strong><br />
              Les techniciens agricoles, conseillers et prescripteurs sont seuls responsables de leurs
              prescriptions, recommandations et conseils techniques. Agritrace n&apos;intervient pas dans
              les décisions agronomiques et ne peut être tenu responsable des choix techniques effectués
              par les professionnels agricoles.
            </p>
            <p className="text-gray-600 leading-relaxed mt-4">
              <strong>9.5 Obligation de vérification</strong><br />
              L&apos;utilisateur a l&apos;obligation de vérifier l&apos;exactitude de toutes les données et informations
              présentes dans la plateforme avant toute prise de décision ou action. Il appartient à
              l&apos;utilisateur de :
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4 mt-2">
              <li>Vérifier la conformité des produits et dosages avec la réglementation en vigueur</li>
              <li>Valider les calculs de doses et de surfaces traitées</li>
              <li>Consulter les étiquettes et fiches de données de sécurité des produits</li>
              <li>Respecter les conditions d&apos;emploi et les précautions d&apos;usage des produits phytosanitaires</li>
              <li>S&apos;assurer de disposer des autorisations et certifications nécessaires (Certiphyto, etc.)</li>
            </ul>
            <p className="text-gray-600 leading-relaxed mt-4">
              <strong>9.6 Conformité réglementaire</strong><br />
              L&apos;utilisateur est seul responsable du respect de la réglementation applicable aux produits
              phytosanitaires, notamment le respect des autorisations de mise sur le marché (AMM), des
              délais avant récolte (DAR), des zones non traitées (ZNT), et de toute autre obligation
              légale ou réglementaire en matière d&apos;utilisation de produits phytosanitaires.
            </p>
            <p className="text-gray-600 leading-relaxed mt-4">
              <strong>9.7 Outil d&apos;aide à la décision</strong><br />
              Agritrace est un outil d&apos;aide à la gestion et à la traçabilité. Les informations fournies
              par la plateforme ne constituent en aucun cas un conseil agronomique, une prescription ou
              une recommandation technique. Il appartient à l&apos;utilisateur de faire appel à un professionnel
              qualifié pour toute décision technique concernant l&apos;utilisation de produits phytosanitaires.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">10. Modification des CGU</h2>
            <p className="text-gray-600 leading-relaxed">
              Agritrace se réserve le droit de modifier les présentes CGU. Les utilisateurs seront informés
              de toute modification significative par email ou notification dans l&apos;application.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">11. Droit applicable et litiges</h2>
            <p className="text-gray-600 leading-relaxed">
              Les présentes CGU sont soumises au droit français. En cas de litige, une solution amiable sera
              recherchée avant toute action judiciaire. À défaut, les tribunaux français seront compétents.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">12. Contact</h2>
            <p className="text-gray-600 leading-relaxed">
              Pour toute question concernant ces CGU :<br /><br />
              Email : <a href="mailto:service.client@agritrace.com" className="text-agri-green hover:underline">service.client@agritrace.com</a>
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
