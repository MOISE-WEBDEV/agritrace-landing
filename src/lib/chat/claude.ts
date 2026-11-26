// Appels à l'API Claude (SDK officiel), côté serveur seulement : la clé ne quitte jamais Vercel.

import Anthropic from '@anthropic-ai/sdk'
import type { ChatConfig } from './config.ts'
import type { ChatTurn } from './history.ts'
import { parseRoutingOutput, ROUTING_SCHEMA, ROUTING_SYSTEM_PROMPT } from './routing.ts'

export function claudeClient(config: ChatConfig): Anthropic {
  return new Anthropic({
    apiKey: config.apiKey ?? undefined,
    timeout: config.requestTimeoutMs,
    maxRetries: config.maxRetries,
  })
}

function textOf(message: Anthropic.Message): string {
  if (message.stop_reason === 'refusal') throw new Error('refus du modèle')
  return message.content
    .filter((block): block is Anthropic.TextBlock => block.type === 'text')
    .map((block) => block.text)
    .join('')
}

// Parcours proposé par le modèle, en sortie structurée (liste fermée) ; contrôlé de nouveau par handler.ts
export async function classifyWithClaude(client: Anthropic, config: ChatConfig, routingText: string): Promise<string> {
  const message = await client.messages.create({
    model: config.model,
    max_tokens: config.routingMaxTokens,
    system: ROUTING_SYSTEM_PROMPT,
    messages: [{ role: 'user', content: routingText }],
    output_config: { effort: config.effort, format: { type: 'json_schema', schema: { ...ROUTING_SCHEMA } } },
  })
  return parseRoutingOutput(textOf(message))
}

export async function replyWithClaude(client: Anthropic, config: ChatConfig, system: string, turns: ChatTurn[]): Promise<string> {
  const message = await client.messages.create({
    model: config.model,
    max_tokens: config.replyMaxTokens,
    system,
    messages: turns,
    output_config: { effort: config.effort },
  })
  return textOf(message)
}
