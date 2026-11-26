// Formulaires du chatbot → backend (POST /api/v1/public_leads). Seuls les champs prévus pour chaque type sont relayés ;
// le consentement n'est transmis que si la case est cochée, avec le texte exact affiché.

import { CONSENT_TEXT } from './texts.ts'

export const LEAD_FIELDS = Object.freeze({
  farmer: ['first_name', 'email', 'culture_type', 'surface'],
  technician: ['first_name', 'last_name', 'company', 'email'],
  structure: ['first_name', 'last_name', 'company', 'role_title', 'email', 'phone', 'message'],
} as const)

export type LeadType = keyof typeof LEAD_FIELDS
// Formulaires portant la case de consentement (jamais « structure » : suivi manuel, aucune campagne)
const WITH_CONSENT: readonly LeadType[] = ['farmer', 'technician']
const MAX_FIELD_CHARS = 2000

export function leadPayload(raw: unknown): Record<string, string | boolean> | null {
  if (!raw || typeof raw !== 'object') return null
  const input = raw as Record<string, unknown>
  const type = input.prospect_type
  if (typeof type !== 'string' || !(type in LEAD_FIELDS)) return null
  const leadType = type as LeadType

  const payload: Record<string, string | boolean> = { prospect_type: leadType }
  for (const field of LEAD_FIELDS[leadType]) {
    const value = input[field]
    if (typeof value === 'string' && value.trim() !== '') payload[field] = value.trim().slice(0, MAX_FIELD_CHARS)
  }
  if (WITH_CONSENT.includes(leadType) && input.marketing_consent === true) {
    payload.marketing_consent = true
    payload.consent_text = CONSENT_TEXT
  }
  return payload
}
