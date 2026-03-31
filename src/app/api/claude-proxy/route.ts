// API Route proxy pour les appels Claude depuis le widget chat inbound
// Protège la clé API côté serveur (Vercel Function)

import { NextRequest, NextResponse } from 'next/server'

// Augmenter le timeout Vercel (max 60s sur Hobby)
export const maxDuration = 30

const ANTHROPIC_API_URL = 'https://api.anthropic.com/v1/messages'
const MODEL = 'claude-haiku-4-5-20251001'

// Rate limiting simple en mémoire (par IP)
const rateLimits = new Map<string, { count: number; resetAt: number }>()
const RATE_LIMIT = 20 // requêtes par minute
const RATE_WINDOW = 60 * 1000 // 1 minute en ms

const SYSTEM_PROMPT = `Tu es l'assistant commercial d'Agritrace, une plateforme SaaS de traçabilité agricole française.
Tu t'adresses aux visiteurs du site agritrace.fr pour les aider à découvrir la solution.

RÈGLES STRICTES :
- Réponds UNIQUEMENT en français
- Maximum 4 phrases par réponse
- Ton professionnel, expert du monde agricole, bienveillant
- Ne dis jamais que tu es une IA ou un chatbot — tu es "l'assistant Agritrace"

OBJECTIF PRINCIPAL : Identifier si le visiteur est un agriculteur ou un technicien conseiller agronome.

DÉTECTION DU PROFIL :
En début de conversation, pose une question naturelle pour identifier le profil du visiteur.
Exemples : "Êtes-vous agriculteur ou technicien conseiller ?"

SI AGRICULTEUR :
- Collecte sa filière (grandes cultures, arboriculture, viticulture)
- Mentionne l'obligation du registre phytosanitaire numérique 2027
- Propose l'essai gratuit 30 jours sans carte bancaire (29€/mois ensuite)
- Mets en avant : gestion parcelles, traçabilité interventions, registre phyto, météo intégrée
- Objections : prix → "1€/jour", complexité → "prise en main en 15 min", papier → "non conforme 2027"
- Quand tu as assez d'informations (filière + intérêt confirmé), ajoute [SHOW_COLLECT_FORM] à ta réponse

SI TECHNICIEN CONSEILLER :
- Explique que le compte est gratuit mais nécessite une validation (Certiphyto Conseil obligatoire)
- Mets en avant : tableau de bord multi-exploitations, suivi clients, outil de prescription
- L'inscription passe par un email à service.client@agritrace.fr
- Quand tu as identifié son intérêt, ajoute [SHOW_COLLECT_FORM] à ta réponse
- Message obligatoire : "Pour créer votre compte, contactez service.client@agritrace.fr avec votre Certiphyto Conseil. Votre compte sera créé sous 48h."

IMPORTANT : Le signal [SHOW_COLLECT_FORM] doit apparaître dans ta réponse quand le visiteur est prêt à laisser ses coordonnées. Ne l'utilise qu'une seule fois par conversation.`

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const entry = rateLimits.get(ip)

  if (!entry || now > entry.resetAt) {
    rateLimits.set(ip, { count: 1, resetAt: now + RATE_WINDOW })
    return true
  }

  if (entry.count >= RATE_LIMIT) return false

  entry.count++
  return true
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip = request.headers.get('x-forwarded-for') || 'unknown'
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Trop de requêtes. Réessayez dans une minute.' },
        { status: 429 }
      )
    }

    const apiKey = process.env.ANTHROPIC_API_KEY
    if (!apiKey) {
      return NextResponse.json({ error: 'Service indisponible' }, { status: 503 })
    }

    const body = await request.json()
    const { message, conversation_history = [] } = body

    if (!message || typeof message !== 'string' || message.length > 2000) {
      return NextResponse.json({ error: 'Message invalide' }, { status: 400 })
    }

    // Construire les messages pour Claude
    const messages = [
      ...conversation_history.slice(-10), // Garder les 10 derniers messages max
      { role: 'user', content: message }
    ]

    // Appel Claude API
    const response = await fetch(ANTHROPIC_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 512,
        system: SYSTEM_PROMPT,
        messages
      })
    })

    if (!response.ok) {
      const errorBody = await response.text()
      console.error(`Claude API error: ${response.status} - ${errorBody}`)
      return NextResponse.json({ error: `Erreur API (${response.status})`, details: errorBody.substring(0, 200) }, { status: 502 })
    }

    const data = await response.json()
    const assistantMessage = data.content?.[0]?.text || ''

    // Détecter le signal [SHOW_COLLECT_FORM]
    const showForm = assistantMessage.includes('[SHOW_COLLECT_FORM]')
    const cleanMessage = assistantMessage.replace(/\[SHOW_COLLECT_FORM\]/g, '').trim()

    // Détecter le type de prospect (heuristique simple)
    const fullConversation = messages.map(m => m.content).join(' ').toLowerCase()
    let detectedType: string | null = null
    if (fullConversation.includes('technicien') || fullConversation.includes('conseiller') || fullConversation.includes('agronome')) {
      detectedType = 'technician'
    } else if (fullConversation.includes('agriculteur') || fullConversation.includes('exploitation') || fullConversation.includes('parcelle') || fullConversation.includes('hectare')) {
      detectedType = 'farmer'
    }

    return NextResponse.json({
      response: cleanMessage,
      show_form: showForm,
      detected_type: detectedType
    })

  } catch (error) {
    console.error('Chat proxy error:', error)
    return NextResponse.json({ error: 'Erreur interne' }, { status: 500 })
  }
}
