// Textes fixes du chatbot, partagés entre la fenêtre (navigateur) et le serveur. Les adresses publiques viennent de
// variables NEXT_PUBLIC_* (lues littéralement pour que Next les remplace à la construction), avec une valeur par défaut nommée.

export const DEFAULT_SUPPORT_EMAIL = 'service.client@agritrace.fr'
export const DEFAULT_APP_URL = 'https://www.app.agritrace.fr'

export const PUBLIC_SUPPORT_EMAIL = process.env.NEXT_PUBLIC_SUPPORT_EMAIL || DEFAULT_SUPPORT_EMAIL
export const PUBLIC_APP_URL = (process.env.NEXT_PUBLIC_APP_URL || DEFAULT_APP_URL).replace(/\/+$/, '')
export const SIGNUP_PATH = '/signup'

// Longueur maximale d'un message du visiteur (champ de saisie et contrôle du serveur)
export const MESSAGE_MAX_CHARS = 1000

// Question unique posée en cas de doute sur le profil
export const DOUBT_QUESTION = 'Êtes-vous exploitant agricole, technicien conseil, ou représentez-vous une structure ?'

// Case de consentement (non cochée par défaut) : ce texte exact est enregistré avec la date et la source
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
export const RATE_LIMITED = 'Vous avez envoyé beaucoup de messages. Réessayez un peu plus tard.'
