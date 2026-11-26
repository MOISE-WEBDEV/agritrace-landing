// Formulaires du chatbot → backend Rails. L'adresse IP du visiteur est relayée avec le secret partagé
// LANDING_RELAY_SECRET (limite de 3 formulaires par heure appliquée au visiteur, pas à Vercel).

import { NextRequest, NextResponse } from 'next/server'
import { chatConfig } from '@/lib/chat/config.ts'
import { leadPayload } from '@/lib/chat/leads.ts'
import { LEADS_PATH, relayHeaders, visitorIp } from '@/lib/chat/relay.ts'

const SEND_ERROR = "Votre demande n'a pas pu être envoyée. Réessayez dans un instant."

export async function POST(request: NextRequest) {
  const config = chatConfig()
  const payload = leadPayload(await request.json().catch(() => null))
  if (!payload) return NextResponse.json({ error: 'Formulaire invalide.' }, { status: 400 })
  if (!config.relaySecret) {
    console.error('[leads] LANDING_RELAY_SECRET absent')
    return NextResponse.json({ error: SEND_ERROR }, { status: 503 })
  }

  try {
    const response = await fetch(`${config.backendUrl}${LEADS_PATH}`, {
      method: 'POST',
      headers: relayHeaders(config.relaySecret, visitorIp(request.headers)),
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(config.requestTimeoutMs),
    })
    if (response.ok) return NextResponse.json({ success: true }, { status: 201 })
    if (response.status === 429) {
      return NextResponse.json({ error: 'Trop de demandes envoyées. Réessayez plus tard.' }, { status: 429 })
    }
    console.error(`[leads] backend ${response.status}`)
    return NextResponse.json({ error: SEND_ERROR }, { status: response.status === 422 ? 422 : 502 })
  } catch (error) {
    console.error('[leads] erreur d’envoi', error)
    return NextResponse.json({ error: SEND_ERROR }, { status: 502 })
  }
}
