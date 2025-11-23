 # Class Projects

Plateforme web pour **créer, découvrir et rejoindre des projets collaboratifs**. L’objectif est d’aider les étudiants / créateurs à constituer une équipe autour d’une idée (web, mobile, design, IA, etc.) et à trouver les bons collaborateurs.

## 🎯 Objectif du projet

- **Centraliser les projets** d’une classe / communauté
- **Mettre en relation** des créateurs de projets et des membres potentiels
- **Faciliter la découverte** de projets grâce à la recherche et aux tags

## ✨ Fonctionnalités principales

- **Page d’accueil** présentant le concept de Class Projects
- **Liste des projets** (`/projects`) avec:
  - Carte par projet (titre, description, catégorie, tags, taille d’équipe…)
  - Recherche par nom, description ou tags
- **Création de projet** (`/create`) avec formulaire complet:
  - Titre, description courte et longue
  - Catégorie (Web, Mobile, Design, Marketing, AI/ML…)
  - Taille de l’équipe, membres recherchés
  - Tags, objectifs, exigences
  - Liens externes (site, GitHub, réseaux sociaux…)
- **Authentification** via Clerk (inscription / connexion sécurisée)
- **UI responsive** avec un layout global (navbar, footer, notifications)

## 🧱 Stack technique

- **Framework**: [Next.js](https://nextjs.org) (App Router)
- **Langage**: TypeScript
- **UI**:
  - Composants UI (inputs, cartes…) basés sur shadcn/ui / Tailwind CSS
  - Icônes: [lucide-react](https://lucide.dev/)
- **Auth**: [Clerk](https://clerk.com) pour la gestion des utilisateurs
- **Notifications**: [sonner](https://sonner.emilkowal.ski/)
- **Architecture**:
  - Pages principales dans `app/`
  - Layout global dans `app/layout.tsx` (Navbar, Footer, Toaster)
  - API projets dans `app/api/projects/route.ts`
  - Types partagés dans `types/project.ts`

## 🚀 Démarrer le projet

Installer les dépendances :

```bash
npm install
```

Lancer le serveur de développement :

```bash
npm run dev
```

Ensuite, ouvrir [http://localhost:3000](http://localhost:3000) dans le navigateur.

## 🔧 Configuration nécessaire

Certaines fonctionnalités (authentification, éventuellement base de données) nécessitent des variables d’environnement :

- Créer un fichier `.env.local` à la racine de `next-app`
- Ajouter les clés Clerk (par ex. `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY`, etc.)

⚠️ Les valeurs exactes dépendent de ta configuration Clerk / backend. Ne jamais committer les vraies clés dans le repo public.

## 📌 Idées d’améliorations

- Filtre avancé par catégorie / taille d’équipe / niveau
- Système de favoris / candidatures aux projets
- Chat ou espace de discussion par projet
- Intégration avec un vrai backend / base de données persistante

