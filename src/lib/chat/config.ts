import { DEFAULT_APP_URL, DEFAULT_SUPPORT_EMAIL, safeEmail } from '../site.ts'
import { MESSAGE_MAX_CHARS } from './texts.ts'

// Réglages du chatbot de la landing (serveur uniquement). Aucun secret ici : la clé d'API, les secrets partagés et les
// adresses viennent des variables d'environnement de Vercel ; les valeurs par défaut sont des constantes nommées.

export const PARCOURS = ['agriculteur', 'salarie', 'technicien', 'structure', 'question'] as const
export type Parcours = (typeof PARCOURS)[number]

// Valeur retenue quand le modèle renvoie autre chose que la liste fermée, ou ne répond pas
export const PARCOURS_PAR_DEFAUT: Parcours = 'question'

export const CHAT_DEFAULTS = Object.freeze({
  // Modèle d'IA (surchargeable par CHAT_MODEL)
  model: 'claude-haiku-5-5',
  // Effort du modèle : réponses courtes de site vitrine
  effort: 'low' as const,
  replyMaxTokens: 2048,
  routingMaxTokens: 1024,
  requestTimeoutMs: 20_000,
  maxRetries: 1,
  // Historique envoyé au modèle : nombre de messages, longueur de chaque message, taille totale
  maxHistoryMessages: 10,
  maxMessageChars: MESSAGE_MAX_CHARS,
  maxTotalChars: 6000,
  // Messages du visiteur pris en compte pour le choix du parcours (les plus récents)
  maxVisitorMessagesForRouting: 6,
  // Délai de l'appel au backend pour le quota
  quotaTimeoutMs: 5_000,
  // Interrupteur « Chatbot de la landing actif » (backend) : durée du cache, pour ne pas interroger le backend à chaque
  // message (surchargeable par CHAT_STATUS_CACHE_MS), et délai de l'appel
  statusCacheMs: 60_000,
  statusTimeoutMs: 2_000,
  supportEmail: DEFAULT_SUPPORT_EMAIL,
  backendUrl: DEFAULT_APP_URL,
})

export interface ChatConfig {
  model: string
  effort: 'low' | 'medium' | 'high'
  replyMaxTokens: number
  routingMaxTokens: number
  requestTimeoutMs: number
  maxRetries: number
  maxHistoryMessages: number
  maxMessageChars: number
  maxTotalChars: number
  maxVisitorMessagesForRouting: number
  quotaTimeoutMs: number
  statusCacheMs: number
  statusTimeoutMs: number
  supportEmail: string
  backendUrl: string
  // Secrets (jamais renvoyés au navigateur)
  apiKey: string | null
  signingSecret: string | null
  relaySecret: string | null
}

type Env = Record<string, string | undefined>

function positiveInt(value: string | undefined, fallback: number): number {
  const parsed = Number.parseInt(value ?? '', 10)
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback
}

function present(value: string | undefined): string | null {
  const trimmed = (value ?? '').trim()
  return trimmed === '' ? null : trimmed
}

export function chatConfig(env: Env = process.env): ChatConfig {
  return {
    model: present(env.CHAT_MODEL) ?? CHAT_DEFAULTS.model,
    effort: CHAT_DEFAULTS.effort,
    replyMaxTokens: CHAT_DEFAULTS.replyMaxTokens,
    routingMaxTokens: CHAT_DEFAULTS.routingMaxTokens,
    requestTimeoutMs: CHAT_DEFAULTS.requestTimeoutMs,
    maxRetries: CHAT_DEFAULTS.maxRetries,
    maxHistoryMessages: positiveInt(env.CHAT_MAX_HISTORY_MESSAGES, CHAT_DEFAULTS.maxHistoryMessages),
    maxMessageChars: positiveInt(env.CHAT_MAX_MESSAGE_CHARS, CHAT_DEFAULTS.maxMessageChars),
    maxTotalChars: positiveInt(env.CHAT_MAX_TOTAL_CHARS, CHAT_DEFAULTS.maxTotalChars),
    maxVisitorMessagesForRouting: CHAT_DEFAULTS.maxVisitorMessagesForRouting,
    quotaTimeoutMs: CHAT_DEFAULTS.quotaTimeoutMs,
    statusCacheMs: positiveInt(env.CHAT_STATUS_CACHE_MS, CHAT_DEFAULTS.statusCacheMs),
    statusTimeoutMs: CHAT_DEFAULTS.statusTimeoutMs,
    supportEmail: safeEmail(env.SUPPORT_EMAIL, CHAT_DEFAULTS.supportEmail),
    backendUrl: (present(env.RAILS_API_URL) ?? CHAT_DEFAULTS.backendUrl).replace(/\/+$/, ''),
    apiKey: present(env.ANTHROPIC_API_KEY),
    signingSecret: present(env.CHAT_SIGNING_SECRET),
    relaySecret: present(env.LANDING_RELAY_SECRET),
  }
}
