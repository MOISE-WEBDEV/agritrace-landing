# Agritrace Landing Page

Page de présentation pour Agritrace - Plateforme de traçabilité agricole.

## Fonctionnement

Cette landing page fonctionne de la manière suivante :

1. **Première visite** : Le visiteur voit la page de présentation complète avec les services, fonctionnalités, tarifs, etc.

2. **Visites suivantes** : Le visiteur est automatiquement redirigé vers l'application principale (page de connexion Rails).

La détection de première visite utilise `localStorage` avec la clé `agritrace_visited`.

## Déploiement sur Vercel (Gratuit)

### Prérequis
- Compte GitHub
- Compte Vercel (gratuit sur vercel.com)

### Étapes

1. **Pousser le code sur GitHub**
   ```bash
   cd landing
   git init
   git add .
   git commit -m "Initial commit - Agritrace landing page"
   git remote add origin https://github.com/VOTRE_USERNAME/agritrace-landing.git
   git push -u origin main
   ```

2. **Connecter à Vercel**
   - Allez sur https://vercel.com
   - Connectez-vous avec GitHub
   - Cliquez sur "New Project"
   - Importez le repo `agritrace-landing`

3. **Configurer les variables d'environnement**
   Dans Vercel > Settings > Environment Variables :
   ```
   NEXT_PUBLIC_APP_URL=https://agritrace-backend-458dc2873922.herokuapp.com
   ```

4. **Configurer le domaine**
   - Dans Vercel > Settings > Domains
   - Ajoutez votre domaine personnalisé (ex: agritrace.fr)
   - Configurez les DNS chez Namecheap

## Développement local

```bash
# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev

# Build de production
npm run build
```

## Structure

```
landing/
├── src/
│   ├── app/
│   │   ├── layout.tsx      # Layout principal
│   │   ├── page.tsx        # Page d'accueil avec logique de redirection
│   │   └── globals.css     # Styles globaux
│   └── components/
│       ├── Header.tsx      # Navigation
│       ├── Hero.tsx        # Section héro
│       ├── Features.tsx    # Fonctionnalités
│       ├── Services.tsx    # Services par profil
│       ├── Testimonials.tsx # Témoignages
│       ├── Pricing.tsx     # Tarifs
│       ├── CTA.tsx         # Call-to-action
│       └── Footer.tsx      # Pied de page
├── public/                 # Assets statiques
├── package.json
├── tailwind.config.ts
└── next.config.js
```
