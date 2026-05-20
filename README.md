<div align="center">

# 🚀 Ahmed Znouda — Portfolio v2

**A modern, bilingual, full-featured personal portfolio built with React + TypeScript + Vite**

[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=flat-square&logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7.0.0-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4.1-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11.0.8-0055FF?style=flat-square&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?style=flat-square&logo=vercel&logoColor=white)](https://vercel.com/)

</div>

---

## 📋 Table des matières

- [Aperçu du projet](#-aperçu-du-projet)
- [Fonctionnalités principales](#-fonctionnalités-principales)
- [Stack technologique](#-stack-technologique)
- [Structure du projet](#-structure-du-projet)
- [Architecture & composants](#-architecture--composants)
- [Sections du portfolio](#-sections-du-portfolio)
- [Gestion du contenu](#-gestion-du-contenu)
- [Démarrage rapide](#-démarrage-rapide)
- [Variables d'environnement](#-variables-denvironnement)
- [Scripts disponibles](#-scripts-disponibles)
- [Déploiement](#-déploiement)
- [Détails techniques avancés](#-détails-techniques-avancés)
- [Auteur](#-auteur)

---

## 🌟 Aperçu du projet

Ce portfolio personnel est une **Single Page Application (SPA)** moderne conçue pour présenter les compétences, expériences et projets d'Abdelhamid Znouda — ingénieur IT avec plus de **8 ans d'expérience** en développement full-stack, automatisation IA et systèmes legacy.

L'application est pensée pour offrir une expérience utilisateur fluide et professionnelle, avec un design soigné, des animations subtiles et une navigation intuitive. Elle supporte nativement le **bilinguisme (FR/EN)**, le **mode sombre** et s'adapte parfaitement à tous les formats d'écran.

---

## ✨ Fonctionnalités principales

### 🌐 Bilinguisme Français / Anglais
Toutes les sections de l'application sont disponibles en français et en anglais. La langue choisie est **persistée via `localStorage`**, garantissant une expérience cohérente entre les sessions.

### 🌙 Mode sombre / clair
Un toggle fluide entre les thèmes dark et light, basé sur les **CSS variables Tailwind** et la préférence système de l'utilisateur. L'état est persisté automatiquement.

### 🎞️ Animations avancées (Framer Motion)
- Animations déclenchées au **scroll** (`whileInView`) sur chaque section
- Animations d'apparition avec `AnimatePresence` pour les modales
- Effet **typewriter** dynamique dans le Hero (alternance des titres professionnels)
- Animations de flottement, de glow et de gradient en boucle

### 📱 Design entièrement responsive
Architecture **mobile-first** avec Tailwind CSS. Chaque composant est testé sur mobile, tablette et desktop. Le menu de navigation se transforme en menu hamburger sur les petits écrans.

### 📬 Formulaire de contact fonctionnel
Intégration complète avec **EmailJS** — les messages envoyés via le formulaire arrivent directement dans la boîte email sans backend dédié. Validation côté client incluse.

### 🖼️ Galerie de projets interactive
- Carousel horizontal avec **filtres par type** (All / Mobile / Web / Desktop)
- Modales de détails enrichies avec galeries de screenshots
- **Lightbox** avec navigation clavier (touches fléchées + Échap)
- 43 captures web + 15 captures mobile pour le projet Gaztrack Pro

### 🔒 Sécurité (Vercel Headers)
Headers de sécurité configurés : **CSP**, **HSTS**, **X-Content-Type-Options**, **Referrer-Policy** — directement dans `vercel.json`.

---

## 🛠️ Stack technologique

| Catégorie | Technologie | Version |
|-----------|-------------|---------|
| Framework UI | React | 18.3.1 |
| Langage | TypeScript | 5.5.3 |
| Build Tool | Vite | 7.0.0 |
| Styling | Tailwind CSS | 3.4.1 |
| Animations | Framer Motion | 11.0.8 |
| Icônes | Lucide React | 0.344.0 |
| Emails | EmailJS Browser | 4.4.1 |
| Utilitaires CSS | clsx + tailwind-merge | 2.x |
| Déploiement | Vercel | — |
| Linting | ESLint (React plugin) | — |

---

## 📁 Structure du projet

```
portfolio-v2/
│
├── public/                          # Assets statiques
│   ├── Portfolio.jpg                # Photo de profil
│   ├── mindsuite/
│   │   └── logo.png                 # Logo du projet Mind Suite
│   └── gaztrack/                    # Screenshots du projet Gaztrack Pro
│       ├── web_*.png                # 43 captures d'écran (version web)
│       └── mobile_*.png             # 15 captures d'écran (version mobile)
│
├── src/
│   ├── components/                  # Composants React de l'UI
│   │   ├── Navbar.tsx               # Barre de navigation fixe
│   │   ├── Hero.tsx                 # Section d'accueil principale
│   │   ├── About.tsx                # Présentation et spécialités
│   │   ├── Experience.tsx           # Timeline de l'expérience professionnelle
│   │   ├── Skills.tsx               # Compétences avec barres de progression
│   │   ├── Projects.tsx             # Carousel des projets
│   │   ├── Education.tsx            # Parcours académique
│   │   ├── Contact.tsx              # Formulaire de contact + infos
│   │   ├── GaztrackProDetails.tsx   # Modal détail — Gaztrack Pro
│   │   └── MindSuiteDetails.tsx     # Modal détail — Mind Suite
│   │
│   ├── hooks/                       # Hooks React personnalisés
│   │   ├── useTheme.tsx             # Gestion du thème (dark/light) via Context
│   │   └── useScrollPosition.ts     # Suivi de la position de scroll
│   │
│   ├── types/
│   │   └── index.ts                 # Interfaces TypeScript globales
│   │
│   ├── constants/
│   │   └── index.ts                 # Contenu statique bilingue (FR/EN)
│   │
│   ├── App.tsx                      # Composant racine — assemblage des sections
│   ├── main.tsx                     # Point d'entrée React
│   ├── index.css                    # Styles globaux + classes custom Tailwind
│   └── vite-env.d.ts                # Types pour les variables d'environnement Vite
│
├── dist/                            # Build de production (généré)
├── index.html                       # Template HTML principal
├── vite.config.ts                   # Configuration Vite (alias, plugins)
├── tailwind.config.js               # Theme Tailwind étendu (couleurs, animations)
├── tsconfig.json                    # Configuration TypeScript
├── postcss.config.js                # PostCSS + Autoprefixer
├── vercel.json                      # Headers sécurité + config déploiement
├── .env.local                       # Variables d'environnement locales (non versionné)
└── .gitignore
```

---

## 🏗️ Architecture & composants

### Composants principaux

#### `Navbar.tsx`
Navigation fixe en haut de page avec :
- Détection de la **section active** via `useScrollPosition` (highlight dynamique)
- **Toggle langue** (FR ↔ EN) avec persistance localStorage
- **Toggle thème** (dark ↔ light) connecté au contexte `useTheme`
- Menu **hamburger responsive** sur mobile avec animation d'ouverture/fermeture
- Fond transparent → opaque au scroll

#### `Hero.tsx`
Section d'accueil avec :
- **Effet typewriter** animant les différents titres professionnels en boucle
- Photo de profil avec effet **orange glow** pulsant
- Fallback automatique vers avatar généré (`ui-avatars.com`) si l'image est absente
- Boutons CTA : "Voir mes projets" + "Me contacter"
- Liens vers **réseaux sociaux** (LinkedIn, GitHub, Facebook, Instagram, TikTok)

#### `About.tsx`
Présentation avec :
- Carte de profil (photo + nom + titre)
- Bio professionnelle bilingue
- 4 cartes de spécialités animées : **IA & Automatisation**, **Frontend**, **Backend**, **Legacy Systems**
- Statistiques (années d'expérience, projets, technologies)

#### `Experience.tsx`
Timeline d'expérience professionnelle :
- Disposition **alternée gauche/droite** sur desktop, verticale sur mobile
- Badge "Poste actuel" mis en évidence
- Informations : entreprise, poste, localisation, période, description
- **6 postes** de carrière documentés

#### `Skills.tsx`
Compétences organisées en **6 catégories** :
- IA & Automatisation, Développement, Legacy, Bases de données, Support IT, Langues
- Barres de progression animées avec **niveau de maîtrise** (pourcentage)
- Environ **40+ compétences** référencées

#### `Projects.tsx`
Vitrine des projets avec :
- **Carousel horizontal** (scroll horizontal masqué)
- Filtres par type : **All / Mobile / Web / Desktop**
- Carte projet avec stack technique, description, bouton de détail
- Intégration des modales `GaztrackProDetails` et `MindSuiteDetails`

#### `GaztrackProDetails.tsx`
Modal projet Gaztrack Pro :
- Carousel de **58 screenshots** (43 web + 15 mobile)
- **Lightbox plein écran** avec navigation clavier (← →) et fermeture Échap
- Bouton "Demander une démo"

#### `MindSuiteDetails.tsx`
Modal projet Mind Suite :
- Présentation des fonctionnalités d'évaluation mentale
- Points forts, comment ça marche, avertissement légal

#### `Contact.tsx`
Section contact avec :
- Formulaire validé côté client → envoi via **EmailJS**
- **Copie dans le presse-papiers** au clic sur email/téléphone
- Affichage coordonnées, liens réseaux sociaux
- État de succès/erreur après soumission

### Hooks personnalisés

#### `useTheme.tsx`
- Context React pour la gestion globale du thème
- Lecture/écriture dans **localStorage**
- Applique la classe `dark` sur le `<html>` pour activer les variantes dark de Tailwind

#### `useScrollPosition.ts`
- Écoute l'événement `scroll` sur `window`
- Retourne la **section active** en fonction des positions des ancres dans le DOM
- Utilisé par `Navbar` pour le highlight de l'item de navigation courant

---

## 📄 Sections du portfolio

L'application est organisée en **7 sections** accessibles via la navigation :

| # | Ancre | Nom | Contenu |
|---|-------|-----|---------|
| 1 | `#home` | Accueil | Hero, typewriter, CTA, réseaux sociaux |
| 2 | `#about` | À propos | Bio, spécialités, statistiques |
| 3 | `#experience` | Expérience | Timeline de carrière (6 postes) |
| 4 | `#skills` | Compétences | 6 catégories, ~40 compétences |
| 5 | `#projects` | Projets | 3 projets phares avec galeries |
| 6 | `#education` | Formation | 5 établissements/certifications |
| 7 | `#contact` | Contact | Formulaire EmailJS + coordonnées |

---

## 📦 Gestion du contenu

Tout le contenu textuel est centralisé dans **`src/constants/index.ts`**, organisé en deux versions (anglais et français) typées via des interfaces TypeScript.

Ce fichier contient :
- `personalInfo` — nom, titre, bio, contact, réseaux sociaux
- `experiences` — tableau de 6 postes (entreprise, titre, dates, description)
- `education` — 5 entrées académiques (établissement, diplôme, période)
- `skills` — 6 catégories avec les niveaux de maîtrise
- `projects` — 3 projets avec stack, description, liens
- `navItems` — labels de navigation
- `ui` — tous les labels, titres, textes de boutons, messages du formulaire

> Pour modifier le contenu affiché (textes, données), il suffit d'éditer ce seul fichier.

---

## 🚀 Démarrage rapide

### Prérequis

- **Node.js** v18 ou supérieur
- **npm** v9 ou supérieur

### Installation

```bash
# 1. Cloner le dépôt
git clone https://github.com/abdelhamid-znouda/portfolio-v2.git
cd portfolio-v2

# 2. Installer les dépendances
npm install

# 3. Configurer les variables d'environnement
cp .env.local.example .env.local
# (voir section Variables d'environnement)

# 4. Lancer le serveur de développement
npm run dev
```

L'application sera accessible sur **http://localhost:5173**

---

## 🔐 Variables d'environnement

Créer un fichier `.env.local` à la racine du projet avec les variables suivantes :

```env
# EmailJS — Requis pour le formulaire de contact
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key

# Gemini API — Optionnel (fonctionnalités IA)
VITE_GEMINI_API_KEY=your_gemini_api_key
```

> Les variables Vite doivent obligatoirement être préfixées par `VITE_` pour être exposées au client.

Pour configurer EmailJS :
1. Créer un compte sur [emailjs.com](https://www.emailjs.com/)
2. Créer un **service email** (Gmail, Outlook, etc.)
3. Créer un **template de message**
4. Copier les IDs dans `.env.local`

---

## 📜 Scripts disponibles

```bash
# Démarrer en mode développement (HMR activé)
npm run dev

# Compiler pour la production (dans /dist)
npm run build

# Prévisualiser le build de production en local
npm run preview

# Linter ESLint
npm run lint
```

---

## 🌍 Déploiement

Le projet est configuré pour un déploiement zero-config sur **Vercel**.

### Déploiement automatique via Vercel

```bash
# Installer la CLI Vercel
npm i -g vercel

# Déployer
vercel
```

### Configuration `vercel.json`

Le fichier `vercel.json` inclus configure :
- Headers de sécurité (**CSP**, **HSTS**, **X-Frame-Options**, etc.)
- Sources autorisées pour images, polices, APIs (`ui-avatars.com`, EmailJS, etc.)
- Politique de référent (`strict-origin-when-cross-origin`)

### Build manuel

```bash
npm run build
# Les fichiers statiques sont dans /dist — peuvent être hébergés sur n'importe quel CDN
```

---

## 🔬 Détails techniques avancés

### Thème Tailwind personnalisé

Le fichier `tailwind.config.js` étend le thème avec :

**Couleurs personnalisées :**
```js
primary: { /* Orange — 10 nuances de #fff7ed à #431407 */ }
dark:    { /* Dégradés sombres pour le mode dark */ }
```

**Animations keyframes :**
| Nom | Description | Durée |
|-----|-------------|-------|
| `gradient` | Fond dégradé animé en boucle | 8s |
| `glow` | Halo lumineux pulsant (box-shadow) | 2s |
| `float` | Légère lévitation verticale | 6s |
| `pulse-glow` | Combinaison pulse + glow | 3s |

### Classes CSS globales (`index.css`)

| Classe | Usage |
|--------|-------|
| `.animate-blink` | Clignotement du curseur typewriter |
| `.orange-glow` | Halo orange autour de la photo de profil |
| `.orange-glow-lg` | Version large du halo |
| `.text-gradient` | Texte avec dégradé orange |
| `.glass-card` | Fond semi-transparent (glassmorphisme) |
| `.scrollbar-hide` | Masquer la scrollbar (carousel horizontal) |
| `.bg-grid` | Arrière-plan grille subtile |

### Gestion TypeScript

Toutes les structures de données sont typées dans `src/types/index.ts` :
- `Experience`, `Education`, `Skill`, `Project` — interfaces des entités
- `Language` — type union `'en' | 'fr'`
- `Theme` — type union `'dark' | 'light'`
- `ContentData` — interface racine du contenu bilingue

---

## 👤 Auteur

**Abdelhamid Znouda**
*IT Engineer — AI Automation | Full-Stack Development | Legacy Systems*

📍 Tunisie
📧 [abdelhamidznouda2025@gmail.com](mailto:abdelhamidznouda2025@gmail.com)
🔗 [LinkedIn](https://www.linkedin.com/in/abdelhamid-znouda)
🐙 [GitHub](https://github.com/abdelhamid-znouda)

---

<div align="center">

*Built with ❤️ using React, TypeScript & Tailwind CSS*

</div>
