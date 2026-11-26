// Adresses publiques (src/lib/site.ts) : un lien vers l'inscription n'est jamais cassé par une variable facultative
// absente, vide ou mal formée. Lancé SANS variable d'environnement : les valeurs par défaut sont vérifiées telles quelles.

import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

import {
  DEFAULT_APP_URL,
  DEFAULT_SUPPORT_EMAIL,
  PUBLIC_APP_URL,
  PUBLIC_SUPPORT_EMAIL,
  SIGNUP_URL,
  appPageUrl,
  safeEmail,
  safeOrigin,
  signupUrl,
  supportMailto,
} from '../src/lib/site.ts'

const withoutEnv = !process.env.NEXT_PUBLIC_APP_URL && !process.env.NEXT_PUBLIC_SUPPORT_EMAIL

test('sans variable d’environnement : inscription sur https://www.app.agritrace.fr/signup', { skip: !withoutEnv }, () => {
  assert.equal(DEFAULT_APP_URL, 'https://www.app.agritrace.fr')
  assert.equal(PUBLIC_APP_URL, DEFAULT_APP_URL)
  assert.equal(SIGNUP_URL, 'https://www.app.agritrace.fr/signup')
  assert.equal(PUBLIC_SUPPORT_EMAIL, DEFAULT_SUPPORT_EMAIL)
})

test('variable absente, vide ou mal formée : valeur par défaut', () => {
  for (const raw of [undefined, '', '   ', 'app.agritrace.fr', 'http://www.app.agritrace.fr', 'https://', 'javascript:alert(1)',
    'https://user:pass@www.app.agritrace.fr', 'https://www.app.agritrace.fr/signup', 'https://www.app.agritrace.fr/?x=1']) {
    assert.equal(safeOrigin(raw, DEFAULT_APP_URL), DEFAULT_APP_URL, String(raw))
    assert.equal(signupUrl(safeOrigin(raw, DEFAULT_APP_URL)), 'https://www.app.agritrace.fr/signup', String(raw))
  }
  for (const raw of [undefined, '', 'pas une adresse', 'a@b', 'x@y.fr?bcc=z@w.fr']) {
    assert.equal(safeEmail(raw, DEFAULT_SUPPORT_EMAIL), DEFAULT_SUPPORT_EMAIL, String(raw))
  }
})

test('variable valable : remplace la valeur par défaut (barre finale tolérée)', () => {
  assert.equal(safeOrigin('https://recette.example.test/', DEFAULT_APP_URL), 'https://recette.example.test')
  assert.equal(signupUrl('https://recette.example.test'), 'https://recette.example.test/signup')
  assert.equal(signupUrl(DEFAULT_APP_URL, 'pro'), 'https://www.app.agritrace.fr/signup?plan=pro')
  assert.equal(appPageUrl('/settings', DEFAULT_APP_URL), 'https://www.app.agritrace.fr/settings')
  assert.equal(safeEmail(' contact@example.test ', DEFAULT_SUPPORT_EMAIL), 'contact@example.test')
  assert.equal(supportMailto("Demande d'information", 'a@example.test'), "mailto:a@example.test?subject=Demande%20d'information")
})

test('fenêtre du chatbot : bouton d’inscription vers SIGNUP_URL, plus aucun formulaire agriculteur', () => {
  const widget = readFileSync(new URL('../src/components/ChatWidget.tsx', import.meta.url), 'utf8')
  assert.match(widget, /panel === 'farmer_signup'[\s\S]*?href=\{SIGNUP_URL\}[\s\S]*?\{FARMER_SIGNUP_LABEL\}/)
  assert.doesNotMatch(widget, /culture_type|name="surface"|'farmer'/)
})

test('aucune adresse de l’application ni du service client écrite en dur hors de src/lib/site.ts', () => {
  const files = [
    'src/app/page.tsx', 'src/app/layout.tsx', 'src/app/sitemap.ts', 'src/app/faq/page.tsx', 'src/app/cgu/page.tsx',
    'src/app/confidentialite/page.tsx', 'src/app/mentions-legales/page.tsx', 'src/app/temoignages/page.tsx',
    'src/app/actualites/page.tsx', 'src/app/actualites/[slug]/page.tsx', 'src/app/registre-phytosanitaire-numerique/page.tsx',
    'src/components/ChatWidget.tsx', 'src/components/CTA.tsx', 'src/components/Pricing.tsx', 'src/components/PressCarousel.tsx',
    'src/components/Testimonials.tsx', 'src/components/Footer.tsx', 'src/lib/chat/texts.ts', 'src/lib/chat/config.ts',
  ]
  for (const file of files) {
    const source = readFileSync(new URL(`../${file}`, import.meta.url), 'utf8')
      // Lien piège du pied de page (robots), volontairement fixe
      .replace('https://www.app.agritrace.fr/catalogue-export', '')
    assert.doesNotMatch(source, /app\.agritrace\.fr|service\.client@agritrace\.fr|process\.env\.NEXT_PUBLIC/, file)
  }
})
