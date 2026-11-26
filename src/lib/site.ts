// Adresses publiques de la landing (navigateur et serveur). Chacune a une valeur par défaut sûre, nommée ici, et peut
// être remplacée par une variable d'environnement FACULTATIVE. Une variable absente, vide ou mal formée ne casse
// jamais un lien : la valeur par défaut est retenue.
//
// Les variables NEXT_PUBLIC_* sont lues littéralement (process.env.NEXT_PUBLIC_…) : Next les remplace à la
// construction. Toute modification sur Vercel ne prend effet qu'au déploiement suivant.

// Application Agritrace (inscription, connexion, API publique des actualités et des avis)
export const DEFAULT_APP_URL = 'https://www.app.agritrace.fr'
// Page d'inscription de l'application (essai gratuit de 30 jours)
export const SIGNUP_PATH = '/signup'
// Adresse du service client
export const DEFAULT_SUPPORT_EMAIL = 'service.client@agritrace.fr'

const EMAIL_FORMAT = /^[^\s@<>"'()]+@[^\s@<>"'()]+\.[a-z]{2,}$/i

// Adresse https sans chemin, paramètre ni identifiant (« https://hote[:port] ») ; sinon la valeur par défaut
export function safeOrigin(raw: string | undefined, fallback: string): string {
  const value = (raw ?? '').trim()
  if (value === '') return fallback
  try {
    const url = new URL(value)
    const bare = url.pathname.replace(/\/+$/, '') === '' && url.search === '' && url.hash === ''
    if (url.protocol !== 'https:' || url.username !== '' || url.password !== '' || !bare) return fallback
    return url.origin
  } catch {
    return fallback
  }
}

export function safeEmail(raw: string | undefined, fallback: string): string {
  const value = (raw ?? '').trim()
  return EMAIL_FORMAT.test(value) ? value : fallback
}

export const PUBLIC_APP_URL = safeOrigin(process.env.NEXT_PUBLIC_APP_URL, DEFAULT_APP_URL)
export const PUBLIC_API_URL = safeOrigin(process.env.NEXT_PUBLIC_API_URL, DEFAULT_APP_URL)
export const PUBLIC_SUPPORT_EMAIL = safeEmail(process.env.NEXT_PUBLIC_SUPPORT_EMAIL, DEFAULT_SUPPORT_EMAIL)

export function signupUrl(appUrl: string = PUBLIC_APP_URL, plan?: string): string {
  const url = new URL(SIGNUP_PATH, appUrl)
  if (plan) url.searchParams.set('plan', plan)
  return url.toString()
}

export const SIGNUP_URL = signupUrl()
// Nom d'hôte affiché dans les textes (CGU, mentions légales)
export const PUBLIC_APP_HOST = new URL(PUBLIC_APP_URL).host

export function appPageUrl(path: string, appUrl: string = PUBLIC_APP_URL): string {
  return new URL(path, appUrl).toString()
}

export function supportMailto(subject?: string, email: string = PUBLIC_SUPPORT_EMAIL): string {
  return subject ? `mailto:${email}?subject=${encodeURIComponent(subject)}` : `mailto:${email}`
}
