export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-3xl">🌾</span>
              <span className="text-xl font-bold">Agritrace</span>
            </div>
            <p className="text-gray-400 text-sm">
              La plateforme de traçabilité agricole qui simplifie la gestion de votre exploitation.
            </p>
          </div>

          {/* Produit */}
          <div>
            <h4 className="font-semibold mb-4">Produit</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#fonctionnalites" className="hover:text-white transition-colors">Fonctionnalités</a></li>
              <li><a href="#tarifs" className="hover:text-white transition-colors">Tarifs</a></li>
              <li><a href="#temoignages" className="hover:text-white transition-colors">Témoignages</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Mises à jour</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="mailto:service.client@agritrace.fr" className="hover:text-white transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Centre d'aide</a></li>
              <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
              <li><a href="mailto:service.informatique@agritrace.fr" className="hover:text-white transition-colors">Support technique</a></li>
            </ul>
          </div>

          {/* Légal */}
          <div>
            <h4 className="font-semibold mb-4">Légal</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Mentions légales</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Politique de confidentialité</a></li>
              <li><a href="#" className="hover:text-white transition-colors">CGU</a></li>
              <li><a href="#" className="hover:text-white transition-colors">RGPD</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2025 Agritrace. Tous droits réservés.
          </p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <span className="text-xl">📘</span>
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <span className="text-xl">🐦</span>
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <span className="text-xl">📸</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
