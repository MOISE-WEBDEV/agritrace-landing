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
        answer: "Depuis la carte interactive, cliquez sur 'Ajouter une parcelle' puis dessinez les contours de votre parcelle directement sur la carte. Vous pouvez également importer vos parcelles depuis un fichier GeoJSON ou les dessiner manuellement."
      },
      {
        question: "Comment fonctionne la traçabilité ?",
        answer: "Chaque intervention (semis, traitement, récolte) que vous enregistrez est horodatée et liée à la parcelle concernée. Vous pouvez générer des rapports de traçabilité complets pour vos audits ou certifications."
      },
      {
        question: "Puis-je gérer mes stocks de produits phytosanitaires ?",
        answer: "Oui, Agritrace intègre un module de gestion des stocks. Vous pouvez suivre vos entrées/sorties de produits, recevoir des alertes de stock bas et accéder aux fiches de sécurité des produits."
      },
      {
        question: "Comment inviter un technicien à suivre mon exploitation ?",
        answer: "Dans les paramètres de votre compte, section 'Mes techniciens', vous pouvez rechercher et inviter un technicien. Une fois qu'il accepte, il pourra consulter vos parcelles et vous envoyer des recommandations."
      }
    ]
  },
  {
    title: 'Abonnement et facturation',
    items: [
      {
        question: "Quels sont les tarifs ?",
        answer: "Nous proposons un abonnement Pro à 29€/mois (ou 290€/an, soit 2 mois offerts). Ce tarif inclut toutes les fonctionnalités, un nombre illimité de parcelles et le support client."
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
        answer: "Oui, la sécurité est notre priorité. Vos données sont chiffrées en transit (HTTPS) et au repos. Nos serveurs sont hébergés en Europe et nous effectuons des sauvegardes quotidiennes."
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
        answer: "Vous pouvez nous contacter par email à service.client@agritrace.com ou via le formulaire de contact dans l'application. Nous répondons généralement sous 24h ouvrées."
      },
      {
        question: "Proposez-vous des formations ?",
        answer: "Oui, nous proposons des sessions de prise en main gratuites en visioconférence pour les nouveaux utilisateurs. Contactez-nous pour planifier une session."
      },
      {
        question: "J'ai trouvé un bug, comment le signaler ?",
        answer: "Vous pouvez signaler un bug via le bouton 'Signaler un problème' dans l'application ou par email à service.client@agritrace.com. Décrivez le problème et joignez une capture d'écran si possible."
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
            href="mailto:service.client@agritrace.com"
            className="inline-block bg-agri-green hover:bg-agri-green-dark text-white px-6 py-3 rounded-full font-medium transition-colors"
          >
            Contacter le support
          </a>
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
