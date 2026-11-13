// Tarifs affichés sur tout le site : un seul endroit à modifier. Montants HORS TAXES (TVA 20 % en sus).
// Utilisés par les cartes de la section tarifs, la FAQ, les données structurées (JSON-LD) et l'assistant.
export const TARIFS = {
  essentiel: { mensuel: 17.9, annuel: 179 },
  pro: { mensuel: 29, annuel: 290 },
}

export const MENTION_TVA = 'Prix hors taxes. TVA 20 % en sus.'

// 17.9 → « 17,90 € HT » ; 179 → « 179 € HT »
export function montant(valeur: number): string {
  const texte = Number.isInteger(valeur) ? String(valeur) : valeur.toFixed(2).replace('.', ',')
  return `${texte} €`
}

export const prixHT = (valeur: number): string => `${montant(valeur)} HT`

// Données structurées : « 17.90 »
export const prixSchema = (valeur: number): string => (Number.isInteger(valeur) ? String(valeur) : valeur.toFixed(2))
