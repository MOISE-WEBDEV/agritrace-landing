// Chatbot de la landing (fonction serveur Vercel). La logique est dans src/lib/chat (testée) ; ce fichier ne fait que
// brancher la requête, le quota du backend et l'API Claude. La clé d'API reste côté serveur.

import { NextRequest, NextResponse } from 'next/server'
import { chatConfig } from '@/lib/chat/config.ts'
import { claudeClient, classifyWithClaude, replyWithClaude } from '@/lib/chat/claude.ts'
import { handleChat } from '@/lib/chat/handler.ts'
import { createStatusCache, requestChatStatus, requestQuota, visitorIp } from '@/lib/chat/relay.ts'
import { GENERIC_ERROR } from '@/lib/chat/texts.ts'

// Deux appels au modèle (parcours, puis réponse) : marge sous la limite de Vercel
export const maxDuration = 60

// Interrupteur du backend gardé en cache court (CHAT_STATUS_CACHE_MS) : une requête au plus par période et par instance
const startupConfig = chatConfig()
const chatStatus = createStatusCache(
  () => requestChatStatus({ backendUrl: startupConfig.backendUrl, secret: startupConfig.relaySecret, timeoutMs: startupConfig.statusTimeoutMs }),
  startupConfig.statusCacheMs
)

export async function POST(request: NextRequest) {
  const config = chatConfig()
  const body = await request.json().catch(() => null)
  const client = claudeClient(config)
  const ip = visitorIp(request.headers)

  try {
    const result = await handleChat(body, {
      config,
      status: chatStatus,
      quota: (sessionId) =>
        requestQuota({ backendUrl: config.backendUrl, secret: config.relaySecret, ip, sessionId, timeoutMs: config.quotaTimeoutMs }),
      classify: (routingText) => classifyWithClaude(client, config, routingText),
      reply: (system, turns) => replyWithClaude(client, config, system, turns),
      log: (message, detail) => console.error(message, detail ?? ''),
    })
    return NextResponse.json(result.body, { status: result.status })
  } catch (error) {
    console.error('[chat] erreur interne', error)
    return NextResponse.json({ error: GENERIC_ERROR }, { status: 500 })
  }
}
