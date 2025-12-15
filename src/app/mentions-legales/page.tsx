import Link from 'next/link'

export default function MentionsLegales() {
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
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Mentions Légales</h1>

        <div className="bg-white rounded-lg shadow-sm p-8 space-y-8">
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">1. Éditeur du site</h2>
            <p className="text-gray-600 leading-relaxed">
              Le site <strong>www.agritrace.fr</strong> est édité par :<br /><br />
              <strong>Agritrace</strong><br />
              Entrepreneur individuel<br />
              Adresse : 1 route du Rond d&apos;Orléans, 02300 Sinceny<br />
              Email : <a href="mailto:service.client@agritrace.com" className="text-agri-green hover:underline">service.client@agritrace.com</a>
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">2. Directeur de la publication</h2>
            <p className="text-gray-600 leading-relaxed">
              Moïse Goguillon<br />
              Email : <a href="mailto:service.client@agritrace.com" className="text-agri-green hover:underline">service.client@agritrace.com</a>
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">3. Hébergement</h2>
            <p className="text-gray-600 leading-relaxed">
              <strong>Site vitrine (www.agritrace.fr)</strong><br />
              Hébergé par Vercel Inc.<br />
              340 S Lemon Ave #4133<br />
              Walnut, CA 91789, États-Unis<br /><br />

              <strong>Application (app.agritrace.fr)</strong><br />
              Hébergé par Heroku (Salesforce)<br />
              415 Mission Street, Suite 300<br />
              San Francisco, CA 94105, États-Unis
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">4. Propriété intellectuelle</h2>
            <p className="text-gray-600 leading-relaxed">
              L&apos;ensemble du contenu de ce site (textes, images, graphismes, logo, icônes, sons, logiciels, etc.)
              est la propriété exclusive d&apos;Agritrace ou de ses partenaires et est protégé par les lois françaises
              et internationales relatives à la propriété intellectuelle.
            </p>
            <p className="text-gray-600 leading-relaxed mt-4">
              Toute reproduction, représentation, modification, publication, adaptation de tout ou partie des éléments
              du site, quel que soit le moyen ou le procédé utilisé, est interdite, sauf autorisation écrite préalable.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">5. Limitation de responsabilité</h2>
            <p className="text-gray-600 leading-relaxed">
              Agritrace s&apos;efforce d&apos;assurer au mieux l&apos;exactitude et la mise à jour des informations diffusées sur ce site.
              Toutefois, Agritrace ne peut garantir l&apos;exactitude, la précision ou l&apos;exhaustivité des informations
              mises à disposition sur ce site.
            </p>
            <p className="text-gray-600 leading-relaxed mt-4">
              En conséquence, Agritrace décline toute responsabilité pour les éventuelles imprécisions, inexactitudes
              ou omissions portant sur des informations disponibles sur ce site.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">6. Cookies</h2>
            <p className="text-gray-600 leading-relaxed">
              Le site peut utiliser des cookies pour améliorer l&apos;expérience utilisateur. Pour plus d&apos;informations,
              consultez notre <Link href="/confidentialite" className="text-agri-green hover:underline">Politique de confidentialité</Link>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">7. Droit applicable</h2>
            <p className="text-gray-600 leading-relaxed">
              Les présentes mentions légales sont régies par le droit français. En cas de litige, les tribunaux
              français seront seuls compétents.
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
