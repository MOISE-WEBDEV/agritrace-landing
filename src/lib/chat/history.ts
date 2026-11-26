// Historique de conversation envoyé par le navigateur : rien n'y est cru sur parole.
// - Messages « assistant » : gardés seulement s'ils portent la signature HMAC posée par le serveur (secret
//   CHAT_SIGNING_SECRET, liée à la session) ; un faux message du chatbot fabriqué dans le navigateur est ignoré.
// - Limites : nombre de messages, longueur de chaque message, taille totale (constantes de config.ts).

import { createHmac, timingSafeEqual } from 'node:crypto'

export interface ChatTurn {
  role: 'user' | 'assistant'
  content: string
}

export interface HistoryLimits {
  maxHistoryMessages: number
  maxMessageChars: number
  maxTotalChars: number
}

const SESSION_ID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

export function isValidSessionId(value: unknown): value is string {
  return typeof value === 'string' && SESSION_ID.test(value)
}

export function signReply(secret: string, sessionId: string, content: string): string {
  return createHmac('sha256', secret).update(`${sessionId}\n${content}`).digest('base64url')
}

export function verifyReply(secret: string | null, sessionId: string, content: string, signature: unknown): boolean {
  if (!secret || typeof signature !== 'string' || signature === '') return false
  const expected = Buffer.from(signReply(secret, sessionId, content))
  const given = Buffer.from(signature)
  return expected.length === given.length && timingSafeEqual(expected, given)
}

// Historique nettoyé, dans l'ordre, prêt pour le modèle (commence par un message du visiteur, rôles alternés)
export function sanitizeHistory(raw: unknown, sessionId: string, secret: string | null, limits: HistoryLimits): ChatTurn[] {
  if (!Array.isArray(raw)) return []

  const kept: ChatTurn[] = []
  for (const item of raw) {
    if (!item || typeof item !== 'object') continue
    const { role, content, signature } = item as Record<string, unknown>
    if (typeof content !== 'string' || content.trim() === '') continue
    if (role === 'user') {
      kept.push({ role, content: content.slice(0, limits.maxMessageChars) })
    } else if (role === 'assistant' && verifyReply(secret, sessionId, content, signature)) {
      kept.push({ role, content: content.slice(0, limits.maxMessageChars) })
    }
  }

  let recent = kept.slice(-limits.maxHistoryMessages)
  while (recent.length > 0 && totalChars(recent) > limits.maxTotalChars) recent = recent.slice(1)
  return normalizeTurns(recent)
}

// Messages du visiteur seulement (le choix du parcours ne lit jamais les réponses du chatbot)
export function visitorMessages(history: ChatTurn[], current: string, max: number): string[] {
  return [...history.filter((turn) => turn.role === 'user').map((turn) => turn.content), current].slice(-max)
}

function totalChars(turns: ChatTurn[]): number {
  return turns.reduce((sum, turn) => sum + turn.content.length, 0)
}

// Fusionne deux messages consécutifs du même rôle et retire les réponses du chatbot placées en tête
export function normalizeTurns(turns: ChatTurn[]): ChatTurn[] {
  const merged: ChatTurn[] = []
  for (const turn of turns) {
    const last = merged[merged.length - 1]
    if (last && last.role === turn.role) last.content = `${last.content}\n\n${turn.content}`
    else merged.push({ ...turn })
  }
  while (merged.length > 0 && merged[0].role === 'assistant') merged.shift()
  return merged
}
