'use client'

import { useState, useRef, useEffect } from 'react'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

const APP_URL = 'https://www.app.agritrace.fr'

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [detectedType, setDetectedType] = useState<string | null>(null)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [showPulse, setShowPulse] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Masquer le pulse après 10 secondes
  useEffect(() => {
    const timer = setTimeout(() => setShowPulse(false), 10000)
    return () => clearTimeout(timer)
  }, [])

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return

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
          conversation_history: messages
        })
      })

      const data = await res.json()

      if (data.response) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.response }])
      }
      if (data.show_form) setShowForm(true)
      if (data.detected_type) setDetectedType(data.detected_type)
    } catch {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Désolé, une erreur est survenue. Vous pouvez nous contacter à service.client@agritrace.fr'
      }])
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
    const formData = new FormData(e.currentTarget)
    const data: Record<string, string> = {}
    formData.forEach((value, key) => { data[key] = value as string })
    data.prospect_type = detectedType || 'farmer'

    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      setFormSubmitted(true)
    } catch {
      alert('Erreur lors de l\'envoi. Contactez service.client@agritrace.fr')
    }
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

  return (
    <div className="fixed bottom-6 right-6 z-[60] w-[380px] max-w-[calc(100vw-2rem)] h-[520px] max-h-[calc(100vh-3rem)] flex flex-col rounded-2xl shadow-2xl overflow-hidden bg-white border border-gray-200">
      {/* Header */}
      <div className="bg-[#1b6f3a] text-white px-4 py-3 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-xl">🌾</span>
          <div>
            <div className="font-semibold text-sm">Assistant Agritrace</div>
            <div className="text-xs opacity-80">En ligne</div>
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
        <div ref={messagesEndRef} />
      </div>

      {/* Formulaire de collecte */}
      {showForm && !formSubmitted && (
        <div className="absolute inset-0 bg-white z-10 flex flex-col">
          <div className="bg-[#1b6f3a] text-white px-4 py-3 flex items-center justify-between flex-shrink-0">
            <span className="font-semibold text-sm">
              {detectedType === 'technician' ? '👨‍🌾 Vos coordonnées' : '🌾 Essayez Agritrace gratuitement'}
            </span>
            <button onClick={() => setShowForm(false)} className="text-white/80 hover:text-white">✕</button>
          </div>
          <form onSubmit={submitForm} className="flex-1 overflow-y-auto p-4 space-y-3">
            <input name="first_name" required placeholder="Prénom *" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
            {detectedType === 'technician' ? (
              <>
                <input name="last_name" required placeholder="Nom *" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
                <input name="company" placeholder="Structure (coopérative, chambre...)" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
                <input name="email" type="email" required placeholder="Email professionnel *" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
                <p className="text-xs text-gray-500">
                  Votre compte sera créé par notre équipe après vérification de votre Certiphyto Conseil.
                </p>
              </>
            ) : (
              <>
                <select name="culture_type" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white">
                  <option value="">Type de culture</option>
                  <option value="grande_culture">Grandes cultures</option>
                  <option value="arboriculture">Arboriculture fruitière</option>
                  <option value="viticulture">Viticulture</option>
                </select>
                <input name="surface" placeholder="Surface approximative (ha)" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
                <input name="email" type="email" required placeholder="Email *" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
              </>
            )}
            <button type="submit" className="w-full py-2.5 bg-[#1b6f3a] text-white rounded-lg font-semibold text-sm hover:bg-[#0a751f] transition-colors">
              {detectedType === 'technician' ? 'Envoyer ma demande' : 'Démarrer mon essai gratuit'}
            </button>
          </form>
        </div>
      )}

      {/* Succès formulaire */}
      {formSubmitted && (
        <div className="absolute inset-0 bg-white z-10 flex flex-col items-center justify-center p-6 text-center">
          <span className="text-4xl mb-4">✅</span>
          {detectedType === 'technician' ? (
            <>
              <h3 className="font-bold text-lg text-gray-800 mb-2">Demande envoyée !</h3>
              <p className="text-sm text-gray-600 mb-4">
                Notre équipe examinera votre dossier et créera votre compte sous 48h.
                Envoyez votre Certiphyto Conseil à :
              </p>
              <a href="mailto:service.client@agritrace.fr" className="text-[#1b6f3a] font-semibold underline">
                service.client@agritrace.fr
              </a>
            </>
          ) : (
            <>
              <h3 className="font-bold text-lg text-gray-800 mb-2">Bienvenue sur Agritrace !</h3>
              <p className="text-sm text-gray-600 mb-4">Créez votre compte et profitez de 30 jours d&apos;essai gratuit.</p>
              <a
                href={`${APP_URL}/signup`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2.5 bg-[#1b6f3a] text-white rounded-lg font-semibold text-sm hover:bg-[#0a751f] transition-colors"
              >
                Créer mon compte
              </a>
            </>
          )}
          <button onClick={() => { setIsOpen(false); setFormSubmitted(false); setShowForm(false) }} className="mt-4 text-sm text-gray-400 hover:text-gray-600">
            Fermer
          </button>
        </div>
      )}

      {/* Input */}
      {!showForm && !formSubmitted && (
        <div className="p-3 border-t border-gray-200 flex gap-2 flex-shrink-0 bg-white">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Votre message..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#1b6f3a]"
            disabled={isLoading}
          />
          <button
            onClick={sendMessage}
            disabled={isLoading || !input.trim()}
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
