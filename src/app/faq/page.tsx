'use client'

import { useState } from 'react'
import Link from 'next/link'
import Script from 'next/script'

interface FAQItem {
  question: string
  answer: string
}

const faqCategories = [
  {
    title: 'Général',
    items: [
      {
        question: "Qu'est-ce qu'Agritrace ?",
        answer: "Agritrace est une plateforme de gestion et de traçabilité agricole. Elle vous permet de gérer vos parcelles, suivre vos cultures, planifier vos interventions, gérer vos stocks de produits et collaborer avec vos employés et techniciens."
      },
      {
        question: "À qui s'adresse Agritrace ?",
        answer: "Agritrace s'adresse à tous les agriculteurs, quelle que soit la taille de leur exploitation. Que vous soyez céréalier, maraîcher, viticulteur ou éleveur, Agritrace s'adapte à vos besoins."
      },
      {
        question: "Agritrace fonctionne-t-il sur mobile ?",
        answer: "Oui ! Agritrace est une application web responsive qui fonctionne parfaitement sur smartphone, tablette et ordinateur. Vous pouvez l'utiliser directement depuis votre navigateur, sans installation."
      }
    ]
  },
  {
    title: 'Inscription et compte',
    items: [
      {
        question: "Comment créer un compte ?",
        answer: "Cliquez sur 'Créer un compte' sur notre page d'accueil. Remplissez le formulaire avec vos informations (nom, email, nom de l'exploitation, SIRET). Vous recevrez un email de confirmation pour activer votre compte."
      },
      {
        question: "La période d'essai est-elle vraiment gratuite ?",
        answer: "Oui, la période d'essai de 30 jours est entièrement gratuite et sans engagement. Aucune carte bancaire n'est demandée. Vous avez accès à toutes les fonctionnalités pendant cette période."
      },
      {
        question: "Puis-je créer des comptes pour mes employés ?",
        answer: "Oui ! En tant qu'agriculteur, vous pouvez créer des comptes employés. Vos employés auront accès aux tâches qui leur sont assignées et pourront les mettre à jour depuis leur téléphone."
      }
    ]
  },
  {
    title: 'Fonctionnalités',
    items: [
      {
        question: "Comment ajouter une parcelle ?",
        answer: "Depuis la carte interactive, cliquez sur 'Ajouter une parcelle' puis dessinez les contours de votre parcelle directement sur la carte. La surface est calculée automatiquement et vous pouvez renseigner la référence cadastrale. Vos parcelles peuvent ensuite être exportées au format GeoJSON."
      },
      {
        question: "Comment fonctionne la traçabilité ?",
        answer: "Chaque intervention (semis, traitement, récolte) que vous enregistrez est horodatée et liée à la parcelle concernée. Vous pouvez générer des rapports de traçabilité complets pour vos audits ou certifications."
      },
      {
        question: "Puis-je gérer mes stocks de produits phytosanitaires ?",
        answer: "Oui, avec le plan Pro. Vous suivez vos entrées et vos sorties de produits, vous recevez des alertes lorsqu'un stock devient bas, et les produits sont rattachés à la base officielle E-Phy avec leur numéro AMM et leurs substances actives."
      },
      {
        question: "Comment inviter un technicien à suivre mon exploitation ?",
        answer: "Dans les paramètres de votre compte, section 'Mes techniciens', vous pouvez rechercher et inviter un technicien. Une fois qu'il accepte, il pourra consulter vos parcelles et vous envoyer des recommandations."
      }
    ]
  },
  {
    title: 'Registre phytosanitaire',
    items: [
      {
        question: "Comment mon registre phytosanitaire se remplit-il ?",
        answer: "Vous n'avez rien à ressaisir. Lorsque vous créez une tâche de traitement puis que vous la validez (vous-même ou votre salarié depuis le champ), Agritrace crée automatiquement la ligne correspondante dans votre registre, pour chaque parcelle concernée."
      },
      {
        question: "Quelles informations figurent dans le registre exporté ?",
        answer: "La date et l'heure, la parcelle, sa référence cadastrale, ses coordonnées GPS, la surface traitée, la culture et la variété, le produit avec son numéro AMM et ses substances actives, la dose et la quantité totale, la cible, le stade de la culture, l'opérateur et le décideur avec leurs numéros Certiphyto, le matériel utilisé, les conditions météo et vos observations. Les produits appliqués dans une même bouillie sont regroupés sous un numéro d'opération commun."
      },
      {
        question: "Sous quel format puis-je exporter mon registre ?",
        answer: "Au format Excel (XLSX) ou CSV, au choix. Vous filtrez par année ou par période. Un second export, dit registre complet d'exploitation, reprend toutes vos opérations : semis, travail du sol, fertilisation, irrigation, récolte, en plus des traitements."
      },
      {
        question: "Agritrace garantit-il la conformité de mon registre ?",
        answer: "Non, et aucun logiciel ne peut le garantir. Agritrace enregistre et met en forme les informations que vous saisissez. La conformité de votre registre dépend de l'exactitude de ces données et du respect des règles d'usage des produits. Relisez votre registre avant tout contrôle ou audit, et rapprochez-vous de votre chambre d'agriculture ou de votre organisme certificateur en cas de doute."
      },
      {
        question: "Agritrace vérifie-t-il que mon traitement est autorisé ?",
        answer: "Non. Agritrace vous donne accès à la base officielle E-Phy pour retrouver un produit, son numéro AMM et ses substances actives, mais il ne contrôle ni la dose, ni l'autorisation du produit sur votre culture, ni les délais avant récolte. Vérifiez toujours l'étiquette du produit."
      },
      {
        question: "Un traitement que je n'ai pas saisi apparaît-il dans mon registre ?",
        answer: "Non. Seules les interventions enregistrées dans Agritrace figurent dans le registre. Si un traitement a été réalisé sans être saisi, il n'y apparaîtra pas."
      }
    ]
  },
  {
    title: 'Abonnement et facturation',
    items: [
      {
        question: "Quels sont les tarifs ?",
        answer: "Deux abonnements sont proposés. Le plan Essentiel à 17,90 €/mois (ou 179 €/an) comprend la cartographie des parcelles, le registre phytosanitaire, la gestion des tâches d'intervention et le support. Le plan Pro à 29 €/mois (ou 290 €/an) ajoute la gestion d'équipe, la météo et les stades de culture, le stock de produits, le suivi par votre technicien et la gestion du matériel. Les grandes structures peuvent demander un devis pour le plan Enterprise. Le nombre de parcelles n'est pas limité."
      },
      {
        question: "Comment payer mon abonnement ?",
        answer: "Le paiement s'effectue par carte bancaire via notre partenaire sécurisé Stripe. Vous pouvez choisir un paiement mensuel ou annuel."
      },
      {
        question: "Puis-je annuler mon abonnement ?",
        answer: "Oui, vous pouvez annuler à tout moment depuis votre espace client. Votre accès reste actif jusqu'à la fin de la période payée. Vos données restent accessibles en lecture seule après l'expiration."
      },
      {
        question: "Y a-t-il un engagement ?",
        answer: "Non, aucun engagement. Vous pouvez annuler votre abonnement mensuel à tout moment. Pour l'abonnement annuel, le paiement est en une fois mais vous pouvez ne pas renouveler."
      }
    ]
  },
  {
    title: 'Données et sécurité',
    items: [
      {
        question: "Mes données sont-elles sécurisées ?",
        answer: "Vos données circulent en HTTPS, vos mots de passe sont chiffrés et l'accès à votre compte est protégé. Nos serveurs applicatifs sont hébergés en Europe et vos données font l'objet de sauvegardes régulières. Le détail des prestataires auxquels nous faisons appel figure dans notre politique de confidentialité."
      },
      {
        question: "Puis-je exporter mes données ?",
        answer: "Oui, vous pouvez exporter vos données à tout moment dans des formats standards (CSV, GeoJSON). Vous restez propriétaire de vos données."
      },
      {
        question: "Que deviennent mes données si je résilie ?",
        answer: "Vos données sont conservées 3 ans après la résiliation (sauf demande de suppression). Vous pouvez les exporter avant de partir. Certaines données de traçabilité sont conservées 10 ans (obligation légale)."
      }
    ]
  },
  {
    title: 'Support',
    items: [
      {
        question: "Comment contacter le support ?",
        answer: "Vous pouvez nous contacter par email à service.client@agritrace.fr ou via le formulaire de contact dans l'application. Nous répondons généralement sous 24h ouvrées."
      },
      {
        question: "Proposez-vous des formations ?",
        answer: "Oui, nous proposons des sessions de prise en main gratuites en visioconférence pour les nouveaux utilisateurs. Contactez-nous pour planifier une session."
      },
      {
        question: "J'ai trouvé un bug, comment le signaler ?",
        answer: "Vous pouvez signaler un bug via le bouton 'Signaler un problème' dans l'application ou par email à service.client@agritrace.fr. Décrivez le problème et joignez une capture d'écran si possible."
      }
    ]
  }
]

function FAQAccordion({ item }: { item: FAQItem }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border-b border-gray-200">
      <button
        className="w-full py-4 flex justify-between items-center text-left hover:text-agri-green transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-medium text-gray-900">{item.question}</span>
        <span className="text-2xl text-gray-400">{isOpen ? '−' : '+'}</span>
      </button>
      {isOpen && (
        <div className="pb-4 text-gray-600 leading-relaxed">
          {item.answer}
        </div>
      )}
    </div>
  )
}

// Schema.org FAQPage structured data
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqCategories.flatMap(category =>
    category.items.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    }))
  ),
}

export default function FAQ() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
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
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Questions Fréquentes</h1>
        <p className="text-gray-600 mb-8">
          Retrouvez les réponses aux questions les plus courantes sur Agritrace.
        </p>

        <div className="space-y-8">
          {faqCategories.map((category, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">{category.title}</h2>
              <div>
                {category.items.map((item, itemIndex) => (
                  <FAQAccordion key={itemIndex} item={item} />
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-agri-green/10 rounded-lg p-8 text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Vous n&apos;avez pas trouvé votre réponse ?</h2>
          <p className="text-gray-600 mb-6">
            Notre équipe est là pour vous aider. Contactez-nous et nous vous répondrons rapidement.
          </p>
          <a
            href="mailto:service.client@agritrace.fr"
            className="inline-block bg-agri-green hover:bg-agri-green-dark text-white px-6 py-3 rounded-full font-medium transition-colors"
          >
            Contacter le support
          </a>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-6 text-center">
          <Link href="/" className="text-agri-green hover:text-agri-green-dark font-medium">
            ← Retour à l&apos;accueil
          </Link>
          <Link href="/registre-phytosanitaire-numerique" className="text-agri-green hover:text-agri-green-dark font-medium">
            Le registre phytosanitaire numérique →
          </Link>
        </div>
      </div>
    </main>
  )
}
