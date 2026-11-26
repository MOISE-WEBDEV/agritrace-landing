// Textes fixes du chatbot, partagés entre la fenêtre (navigateur) et le serveur. Les adresses publiques (application,
// inscription, service client) viennent de src/lib/site.ts : valeur par défaut sûre, variable facultative validée.

import { PUBLIC_SUPPORT_EMAIL } from '../site.ts'

export { DEFAULT_APP_URL, DEFAULT_SUPPORT_EMAIL, PUBLIC_APP_URL, PUBLIC_SUPPORT_EMAIL, SIGNUP_PATH, SIGNUP_URL } from '../site.ts'

// Longueur maximale d'un message du visiteur (champ de saisie et contrôle du serveur)
export const MESSAGE_MAX_CHARS = 1000

// Question unique posée en cas de doute sur le profil
export const DOUBT_QUESTION = 'Êtes-vous exploitant agricole, technicien conseil, ou représentez-vous une structure ?'

// Agriculteur : il crée son compte seul sur l'application ; le chatbot ne lui demande aucune coordonnée
export const FARMER_SIGNUP_INFO =
  "Vous créez votre compte vous-même sur l'application : aucune coordonnée n'est demandée ici. " +
  "Essai gratuit de 30 jours, sans carte bancaire. Vous inviterez ensuite vos salariés depuis le menu « Mon Équipe »."
export const FARMER_SIGNUP_LABEL = 'Démarrer mon essai gratuit de 30 jours'

// Case de consentement du formulaire technicien (non cochée par défaut) : ce texte exact est enregistré avec la date et la source
export const CONSENT_TEXT =
  "J'accepte de recevoir des informations et conseils d'Agritrace par e-mail (désinscription possible à tout moment)"

// Durée de conservation annoncée (purge quotidienne du backend : 12 mois sans échange)
export const RETENTION_TEXT = '12 mois après notre dernier échange'

export function privacyNotice(withConsent: boolean): string {
  const purpose = withConsent
    ? 'répondre à votre demande et, si vous avez coché la case, vous envoyer des informations par e-mail'
    : 'répondre à votre demande'
  return (
    `Vos données sont traitées par MGStudio – Agritrace pour ${purpose}. ` +
    `Elles sont conservées ${RETENTION_TEXT}. Vous pouvez y accéder, les rectifier, les effacer ou vous opposer à ` +
    `leur traitement en écrivant à ${PUBLIC_SUPPORT_EMAIL}.`
  )
}

// Salarié d'une exploitation : pas de compte seul, son employeur l'invite
export const SALARIE_INFO =
  "Votre compte Agritrace est créé par votre employeur : il vous invite lui-même depuis Agritrace, menu « Mon Équipe ». " +
  'Vous recevrez alors un e-mail pour activer votre accès. Parlez-en à votre employeur.'

// Message unique côté navigateur pour toute erreur (jamais le texte d'une erreur de l'API)
export const GENERIC_ERROR = `L'assistant est momentanément indisponible. Vous pouvez nous écrire à ${PUBLIC_SUPPORT_EMAIL}.`
// Chatbot coupé depuis la page Agents IA du backend (interrupteur « Chatbot de la landing actif »)
export function chatbotPaused(supportEmail: string): string {
  return `Notre assistant est momentanément indisponible, écrivez-nous à ${supportEmail}.`
}
export const RATE_LIMITED = 'Vous avez envoyé beaucoup de messages. Réessayez un peu plus tard.'
