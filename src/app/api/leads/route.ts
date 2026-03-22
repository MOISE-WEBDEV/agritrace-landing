// API Route pour envoyer les données du formulaire de collecte au backend Rails

import { NextRequest, NextResponse } from 'next/server'

const RAILS_API_URL = process.env.RAILS_API_URL || 'https://www.app.agritrace.fr'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const response = await fetch(`${RAILS_API_URL}/api/v1/public_leads`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })

    const data = await response.json()

    if (response.ok) {
      return NextResponse.json(data, { status: 201 })
    } else {
      return NextResponse.json(data, { status: response.status })
    }
  } catch (error) {
    console.error('Lead submission error:', error)
    return NextResponse.json({ error: 'Erreur lors de l\'envoi' }, { status: 500 })
  }
}
