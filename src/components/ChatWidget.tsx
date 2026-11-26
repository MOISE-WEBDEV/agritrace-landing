'use client'

import { useState, useRef, useEffect } from 'react'
import {
  CONSENT_TEXT,
  FARMER_SIGNUP_INFO,
  FARMER_SIGNUP_LABEL,
  GENERIC_ERROR,
  MESSAGE_MAX_CHARS,
  SALARIE_INFO,
  privacyNotice,
} from '@/lib/chat/texts.ts'
import { PUBLIC_SUPPORT_EMAIL, SIGNUP_URL, supportMailto } from '@/lib/site.ts'

interface Message {
  role: 'user' | 'assistant'
  content: string
  // Signature posée par le serveur sur ses réponses (renvoyée telle quelle avec l'historique)
  signature?: string | null
}

type Panel = 'farmer_signup' | 'technician_form' | 'structure_form' | 'salarie_info' | null
// Formulaires du chatbot : technicien et structure seulement (l'agriculteur s'inscrit seul sur l'application)
type FormType = 'technician' | 'structure'

const SESSION_KEY = 'agritrace-chat-session'

const FORM_OF_PANEL: Partial<Record<Exclude<Panel, null>, FormType>> = {
  technician_form: 'technician',
  structure_form: 'structure',
}

const FORM_TITLES: Record<FormType, string> = {
  technician: '👨‍🌾 Compte technicien conseil',
  structure: '🏢 Votre structure',
}

const ACTION_LABELS: Record<FormType, string> = {
  technician: 'Demander mon compte technicien',
  structure: 'Être recontacté',
}

const inputClass = 'w-full px-3 py-2 border border-gray-300 rounded-lg text-sm'

function newSessionId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) return crypto.randomUUID()
  // Repli (navigateur ancien) : identifiant au même format
  return 'xxxxxxxx-xxxx-4xxx-8xxx-xxxxxxxxxxxx'.replace(/x/g, () => Math.floor(Math.random() * 16).toString(16))
}

function chatSessionId(): string {
  try {
    const saved = window.sessionStorage.getItem(SESSION_KEY)
    if (saved) return saved
    const created = newSessionId()
    window.sessionStorage.setItem(SESSION_KEY, created)
    return created
  } catch {
    return newSessionId()
  }
}

function PrivacyNotice({ withConsent }: { withConsent: boolean }) {
  return (
    <p className="text-[11px] leading-snug text-gray-500">
      {privacyNotice(withConsent)}{' '}
      <a href="/confidentialite" target="_blank" className="underline text-[#1b6f3a]">
        Politique de confidentialité
      </a>
    </p>
  )
}

function ConsentBox() {
  return (
    <label className="flex items-start gap-2 text-xs text-gray-600">
      <input type="checkbox" name="marketing_consent" className="mt-0.5" />
      <span>{CONSENT_TEXT}</span>
    </label>
  )
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [panel, setPanel] = useState<Panel>(null)
  const [openForm, setOpenForm] = useState<FormType | null>(null)
  const [submitted, setSubmitted] = useState<FormType | null>(null)
  const [formError, setFormError] = useState<string | null>(null)
  const [isSending, setIsSending] = useState(false)
  const [showPulse, setShowPulse] = useState(true)
  const sessionId = useRef<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, panel])

  // Masquer le pulse après 10 secondes
  useEffect(() => {
    const timer = setTimeout(() => setShowPulse(false), 10000)
    return () => clearTimeout(timer)
  }, [])

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return
    if (!sessionId.current) sessionId.current = chatSessionId()

    const userMessage = input.trim()
    setInput('')
    setMessages(prev => [...prev, { role: 'user', content: userMessage }])
    setIsLoading(true)

    try {
      const res = await fetch('/api/claude-proxy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage,
          session_id: sessionId.current,
          conversation_history: messages
        })
      })
      const data = await res.json().catch(() => ({}))

      if (res.ok && typeof data.response === 'string') {
        setMessages(prev => [...prev, { role: 'assistant', content: data.response, signature: data.signature ?? null }])
        setPanel((data.panel ?? null) as Panel)
      } else {
        setMessages(prev => [...prev, { role: 'assistant', content: typeof data.error === 'string' ? data.error : GENERIC_ERROR }])
      }
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: GENERIC_ERROR }])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
    if (e.key === 'Escape') setIsOpen(false)
  }

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!openForm || isSending) return
    const formData = new FormData(e.currentTarget)
    const data: Record<string, string | boolean> = { prospect_type: openForm }
    formData.forEach((value, key) => {
      if (key !== 'marketing_consent' && typeof value === 'string') data[key] = value
    })
    data.marketing_consent = formData.get('marketing_consent') === 'on'

    setIsSending(true)
    setFormError(null)
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      if (res.ok) {
        setSubmitted(openForm)
        setOpenForm(null)
      } else {
        const body = await res.json().catch(() => ({}))
        setFormError(typeof body.error === 'string' ? body.error : GENERIC_ERROR)
      }
    } catch {
      setFormError(GENERIC_ERROR)
    } finally {
      setIsSending(false)
    }
  }

  const closeOverlays = () => {
    setOpenForm(null)
    setSubmitted(null)
    setFormError(null)
  }

  // Bouton flottant
  if (!isOpen) {
    return (
      <button
        onClick={() => { setIsOpen(true); setShowPulse(false) }}
        className="fixed bottom-6 right-6 z-[60] w-14 h-14 rounded-full bg-[#1b6f3a] text-white shadow-lg hover:bg-[#0a751f] transition-all hover:scale-110 flex items-center justify-center"
        aria-label="Ouvrir le chat"
      >
        {showPulse && (
          <span className="absolute inset-0 rounded-full bg-[#1b6f3a] animate-ping opacity-40" />
        )}
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      </button>
    )
  }

  const actionForm = panel ? FORM_OF_PANEL[panel] : undefined

  return (
    <div className="fixed bottom-6 right-6 z-[60] w-[380px] max-w-[calc(100vw-2rem)] h-[560px] max-h-[calc(100vh-3rem)] flex flex-col rounded-2xl shadow-2xl overflow-hidden bg-white border border-gray-200">
      {/* Header */}
      <div className="bg-[#1b6f3a] text-white px-4 py-3 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-xl">🌾</span>
          <div>
            <div className="font-semibold text-sm">Assistant Agritrace</div>
            <div className="text-xs opacity-80">Assistant automatisé</div>
          </div>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="text-white/80 hover:text-white text-xl leading-none"
          aria-label="Fermer le chat"
        >
          ✕
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
        {messages.length === 0 && (
          <div className="text-center text-gray-500 text-sm mt-8">
            <p className="text-2xl mb-2">👋</p>
            <p>Bonjour ! Comment puis-je vous aider ?</p>
            <p className="text-xs mt-1 text-gray-400">Découvrez Agritrace, votre registre phyto numérique</p>
          </div>
        )}
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] px-3 py-2 rounded-xl text-sm leading-relaxed ${
              msg.role === 'user'
                ? 'bg-[#1b6f3a] text-white rounded-br-sm'
                : 'bg-white text-gray-800 border border-gray-200 rounded-bl-sm shadow-sm'
            }`}>
              {msg.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-200 rounded-xl px-4 py-2 shadow-sm">
              <span className="flex gap-1">
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </span>
            </div>
          </div>
        )}

        {/* Suite selon le parcours choisi par le serveur */}
        {!isLoading && panel === 'salarie_info' && (
          <div className="bg-white border border-[#1b6f3a]/30 rounded-xl p-3 text-sm text-gray-700" data-chat-panel="salarie_info">
            {SALARIE_INFO}
          </div>
        )}
        {/* Agriculteur : inscription directe dans le même onglet (le plus simple sur téléphone), aucune coordonnée */}
        {!isLoading && panel === 'farmer_signup' && (
          <div className="bg-white border border-[#1b6f3a]/30 rounded-xl p-3 text-sm text-gray-700 flex flex-col gap-3" data-chat-panel="farmer_signup">
            <p>{FARMER_SIGNUP_INFO}</p>
            <a
              href={SIGNUP_URL}
              className="block w-full py-2.5 text-center bg-[#1b6f3a] text-white rounded-lg font-semibold text-sm hover:bg-[#0a751f] transition-colors"
            >
              {FARMER_SIGNUP_LABEL}
            </a>
          </div>
        )}
        {!isLoading && actionForm && (
          <div className="flex flex-col gap-2" data-chat-panel={panel ?? ''}>
            <button
              onClick={() => { setOpenForm(actionForm); setFormError(null) }}
              className="w-full py-2.5 bg-[#1b6f3a] text-white rounded-lg font-semibold text-sm hover:bg-[#0a751f] transition-colors"
            >
              {ACTION_LABELS[actionForm]}
            </button>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Formulaires */}
      {openForm && (
        <div className="absolute inset-0 bg-white z-10 flex flex-col">
          <div className="bg-[#1b6f3a] text-white px-4 py-3 flex items-center justify-between flex-shrink-0">
            <span className="font-semibold text-sm">{FORM_TITLES[openForm]}</span>
            <button onClick={closeOverlays} className="text-white/80 hover:text-white" aria-label="Fermer le formulaire">✕</button>
          </div>
          <form onSubmit={submitForm} className="flex-1 overflow-y-auto p-4 space-y-3">
            {openForm === 'technician' && (
              <>
                <input name="first_name" required placeholder="Prénom *" className={inputClass} />
                <input name="last_name" required placeholder="Nom *" className={inputClass} />
                <input name="company" placeholder="Statut ou entreprise (indépendant, société de conseil…)" className={inputClass} />
                <input name="email" type="email" required placeholder="Email professionnel *" className={inputClass} />
                <p className="text-xs text-gray-500">
                  Votre compte technicien est ouvert après vérification de votre Certiphyto Conseil.
                </p>
                <ConsentBox />
              </>
            )}
            {openForm === 'structure' && (
              <>
                <input name="first_name" required placeholder="Prénom *" className={inputClass} />
                <input name="last_name" required placeholder="Nom *" className={inputClass} />
                <input name="company" required placeholder="Structure (coopérative, négoce, chambre…) *" className={inputClass} />
                <input name="role_title" required placeholder="Fonction *" className={inputClass} />
                <input name="email" type="email" required placeholder="Email professionnel *" className={inputClass} />
                <input name="phone" type="tel" placeholder="Téléphone (facultatif)" className={inputClass} />
                <textarea name="message" rows={3} placeholder="Votre message (facultatif)" className={inputClass} />
              </>
            )}
            {formError && <p className="text-xs text-red-600" role="alert">{formError}</p>}
            <button
              type="submit"
              disabled={isSending}
              className="w-full py-2.5 bg-[#1b6f3a] text-white rounded-lg font-semibold text-sm hover:bg-[#0a751f] disabled:opacity-60 transition-colors"
            >
              Envoyer ma demande
            </button>
            <PrivacyNotice withConsent={openForm === 'technician'} />
          </form>
        </div>
      )}

      {/* Confirmation */}
      {submitted && (
        <div className="absolute inset-0 bg-white z-10 flex flex-col items-center justify-center p-6 text-center">
          <span className="text-4xl mb-4">✅</span>
          <h3 className="font-bold text-lg text-gray-800 mb-2">Demande envoyée !</h3>
          <p className="text-sm text-gray-600 mb-4">
            Notre équipe vous recontacte rapidement.
            {submitted === 'technician' && ' Préparez votre Certiphyto Conseil, il vous sera demandé.'}
          </p>
          <a href={supportMailto()} className="text-[#1b6f3a] font-semibold underline">
            {PUBLIC_SUPPORT_EMAIL}
          </a>
          <button onClick={() => { setIsOpen(false); closeOverlays() }} className="mt-4 text-sm text-gray-400 hover:text-gray-600">
            Fermer
          </button>
        </div>
      )}

      {/* Input */}
      {!openForm && !submitted && (
        <div className="p-3 border-t border-gray-200 flex gap-2 flex-shrink-0 bg-white">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Votre message..."
            maxLength={MESSAGE_MAX_CHARS}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#1b6f3a]"
            disabled={isLoading}
          />
          <button
            onClick={sendMessage}
            disabled={isLoading || !input.trim()}
            aria-label="Envoyer"
            className="px-3 py-2 bg-[#1b6f3a] text-white rounded-lg hover:bg-[#0a751f] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </div>
      )}
    </div>
  )
}
