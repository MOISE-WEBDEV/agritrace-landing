// Relais vers le backend Agritrace : l'adresse IP du visiteur est transmise dans un en-tête dédié, accompagnée du
// secret partagé LANDING_RELAY_SECRET (sans lui, le backend ignore l'en-tête). Sert au quota du chatbot (limites
// persistantes, gardées par le backend) et à l'envoi des formulaires.

export const RELAY_SECRET_HEADER = 'X-Agritrace-Relay-Secret'
export const VISITOR_IP_HEADER = 'X-Agritrace-Visitor-Ip'
export const QUOTA_PATH = '/api/v1/public_chat_quota'
export const LEADS_PATH = '/api/v1/public_leads'

type HeaderReader = { get(name: string): string | null }

// Sur Vercel, x-real-ip porte l'adresse du visiteur ; repli sur la première adresse de x-forwarded-for
export function visitorIp(headers: HeaderReader): string | null {
  const real = headers.get('x-real-ip')?.trim()
  if (real) return real
  const forwarded = headers.get('x-forwarded-for')?.split(',')[0]?.trim()
  return forwarded || null
}

export function relayHeaders(secret: string, ip: string | null): Record<string, string> {
  const headers: Record<string, string> = { 'Content-Type': 'application/json', [RELAY_SECRET_HEADER]: secret }
  if (ip) headers[VISITOR_IP_HEADER] = ip
  return headers
}

export type QuotaResult = 'ok' | 'limited' | 'unavailable'

export interface QuotaRequest {
  backendUrl: string
  secret: string | null
  ip: string | null
  sessionId: string
  timeoutMs: number
  fetchImpl?: typeof fetch
}

// Sans secret, ou si le backend ne répond pas : « unavailable » (le chatbot refuse plutôt que de dépenser sans limite)
export async function requestQuota(request: QuotaRequest): Promise<QuotaResult> {
  if (!request.secret) return 'unavailable'
  const fetchImpl = request.fetchImpl ?? fetch
  try {
    const response = await fetchImpl(`${request.backendUrl}${QUOTA_PATH}`, {
      method: 'POST',
      headers: relayHeaders(request.secret, request.ip),
      body: JSON.stringify({ session_id: request.sessionId }),
      signal: AbortSignal.timeout(request.timeoutMs),
    })
    if (response.status === 429) return 'limited'
    if (!response.ok) return 'unavailable'
    const body = (await response.json().catch(() => null)) as { allowed?: unknown } | null
    return body?.allowed === true ? 'ok' : 'unavailable'
  } catch {
    return 'unavailable'
  }
}
