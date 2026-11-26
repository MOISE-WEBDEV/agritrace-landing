// Traitement d'un message du chatbot, indépendant de Next et du SDK (dépendances injectées, donc testable) :
// interrupteur du backend → quota → historique vérifié → parcours (messages du visiteur seulement) → réponse → signature de la réponse.
// Toute erreur donne un message générique au navigateur ; le détail ne va que dans les journaux du serveur.

import type { ChatConfig, Parcours } from './config.ts'
import { isValidSessionId, normalizeTurns, sanitizeHistory, signReply, visitorMessages, type ChatTurn } from './history.ts'
import { replySystemPrompt } from './prompts.ts'
import type { ChatStatus, QuotaResult } from './relay.ts'
import { normalizeParcours, panelFor, routingInput, type Panel } from './routing.ts'
import { chatbotPaused, GENERIC_ERROR, RATE_LIMITED } from './texts.ts'

export interface ChatDeps {
  config: ChatConfig
  // État de l'interrupteur « Chatbot de la landing actif » (avec cache court)
  status: () => Promise<ChatStatus>
  quota: (sessionId: string) => Promise<QuotaResult>
  // Renvoie la valeur brute proposée par le modèle (contrôlée ici)
  classify: (routingText: string) => Promise<unknown>
  reply: (system: string, messages: ChatTurn[]) => Promise<string>
  log: (message: string, detail?: unknown) => void
}

export interface ChatResult {
  status: number
  body:
    | { response: string; parcours: Parcours; panel: Panel; signature: string | null }
    | { error: string }
}

const INVALID_MESSAGE = 'Message invalide.'

export async function handleChat(body: unknown, deps: ChatDeps): Promise<ChatResult> {
  const { config } = deps
  const input = (body && typeof body === 'object' ? body : {}) as Record<string, unknown>
  const message = typeof input.message === 'string' ? input.message.trim() : ''
  const sessionId = input.session_id

  if (message === '' || message.length > config.maxMessageChars || !isValidSessionId(sessionId)) {
    return { status: 400, body: { error: INVALID_MESSAGE } }
  }
  // Coupé depuis l'admin : message neutre, sans quota ni appel à l'API Claude
  if ((await deps.status()) === 'disabled') {
    return { status: 503, body: { error: chatbotPaused(config.supportEmail) } }
  }
  if (!config.apiKey) {
    deps.log('[chat] ANTHROPIC_API_KEY absente')
    return { status: 503, body: { error: GENERIC_ERROR } }
  }

  const quota = await deps.quota(sessionId)
  if (quota === 'limited') return { status: 429, body: { error: RATE_LIMITED } }
  if (quota !== 'ok') {
    deps.log('[chat] quota indisponible (backend injoignable ou LANDING_RELAY_SECRET absent)')
    return { status: 503, body: { error: GENERIC_ERROR } }
  }

  const history = sanitizeHistory(input.conversation_history, sessionId, config.signingSecret, config)

  try {
    const parcours = normalizeParcours(
      await deps.classify(routingInput(visitorMessages(history, message, config.maxVisitorMessagesForRouting)))
    )
    const turns = normalizeTurns([...history, { role: 'user', content: message }])
    const text = (await deps.reply(replySystemPrompt(parcours, config.supportEmail), turns)).trim()
    if (text === '') throw new Error('réponse vide')

    const signature = config.signingSecret ? signReply(config.signingSecret, sessionId, text) : null
    return { status: 200, body: { response: text, parcours, panel: panelFor(parcours), signature } }
  } catch (error) {
    deps.log('[chat] erreur de l’API Claude', error)
    return { status: 502, body: { error: GENERIC_ERROR } }
  }
}
