# 🐧 La Confrérie du Manchot

> Un jeu éducatif 3D sur l'indépendance numérique, les logiciels libres et la sobriété numérique.

Projet développé pour le hackathon **Nuit de l'Info 2025**.

---

## 🎯 Objectif du Jeu

Dans **La Confrérie du Manchot**, vous incarnez un agent de la résistance numérique conduisant un camion de réparation à travers un campus universitaire. Votre mission : libérer les ordinateurs du joug des monopoles technologiques en installant Linux et en promouvant les logiciels libres !

### Mission Principale
Face à la fin imminente du support de Windows 10, des milliers d'ordinateurs parfaitement fonctionnels risquent d'être jetés. Votre objectif est de :
- 🔧 **Ressusciter les vieilles machines** en installant Linux
- 🌱 **Promouvoir la sobriété numérique** pour réduire l'impact écologique
- 🎁 **Partager les logiciels libres** pour créer des communs numériques
- 🛡️ **Établir une stratégie de résistance** contre les monopoles technologiques

### Valeurs du Jeu
- **Indépendance numérique** : Se libérer des géants de la tech
- **Écologie** : Lutter contre l'obsolescence programmée
- **Partage** : Construire des outils libres et accessibles à tous
- **Éducation** : Apprendre en s'amusant sur les enjeux du numérique

---

## 🎮 Comment Jouer

### Démarrage
1. Lancez le jeu dans votre navigateur
2. Attendez le chargement de l'écran d'accueil (logo animé)
3. Lisez l'introduction qui explique votre mission
4. Explorez le campus et accomplissez vos quêtes !

### Contrôles du Véhicule
| Touche | Action |
|--------|--------|
| **↑** ou **W** | Avancer |
| **↓** ou **S** | Reculer |
| **←** ou **A** | Tourner à gauche |
| **→** ou **D** | Tourner à droite |
| **Espace** ou **Shift** | Turbo boost 🔥 |

### Navigation
- **Flèche 3D jaune** : Indique l'emplacement de votre quête active dans le monde 3D
- **Boussole 2D** : Affiche la direction et la distance vers votre objectif
- **Mini-carte** : Suivez les indicateurs pour trouver les Points d'Intérêt (POI)

### Système de Quêtes

#### 🎯 Quêtes Principales (4)
Les quêtes principales doivent être complétées dans l'ordre :

1. **💾 Le Réveil des Machines**
   - Apprenez à ressusciter les vieux PC avec Linux
   - Quiz sur l'obsolescence programmée

2. **🚦 La Détox Numérique**
   - Maîtrisez la sobriété numérique
   - Quiz sur l'impact écologique du numérique

3. **🎁 La Forge des Communs**
   - Bâtissez des outils libres et partagés
   - Quiz sur les logiciels open source

4. **🗺️ Le Grand Guide de la Résistance**
   - Établissez une stratégie de résistance
   - Quiz sur l'indépendance numérique

#### ⭐ Quêtes Secondaires (3)
Disponibles à tout moment :

- **💡 Faits Fascinants** : Découvrez des faits surprenants sur le numérique
- **💬 Conversation Numérique** : Discutez avec l'assistant IA (avec humour !)
- **🎬 Femme et Informatique** : Regardez une vidéo sur la diversité dans la tech

### Points d'Intérêt (POI)

Approchez-vous des sphères lumineuses pour déclencher les interactions :

- **Sphères blanches** 🟢 : Quiz éducatifs
- **Sphère jaune** 🟡 : Chatbot IA
- **Sphère violette** 🟣 : Faits amusants
- **Sphère rose** 🌸 : Contenu vidéo

### Système de Progression

#### 💎 Expérience (XP)
- Gagnez **25 XP** par question de quiz correcte
- Gagnez **25 XP** par fait découvert
- Le XP nécessaire augmente à chaque niveau : `100 × (1.5 ^ (niveau - 1))`

#### 🏆 Badges
Collectionnez des badges en accomplissant différents objectifs :
- **Badges thématiques** : Quiz Master, Explorateur Tech, Chercheur de Savoir
- **Badges de progression** : Novice Numérique, Enthousiaste Tech, Avocat Digital, Champion Tech, Maître Digital

#### 📊 Suivi de Progression
- Consultez votre niveau et votre barre d'XP en haut à droite
- Ouvrez le tracker de quêtes sur le côté gauche
- Cliquez sur l'icône 🏆 pour voir vos badges

### Fonctionnalités Spéciales

#### 🔥 Mode Turbo
Maintenez **Espace** ou **Shift** pour activer le boost :
- Vitesse doublée
- Flammes animées à l'arrière du camion
- Parfait pour traverser rapidement le campus

#### 🚶 NPCs (Personnages Non-Joueurs)
- Des personnages se promènent sur le campus
- Évitez de les percuter... ou découvrez ce qui se passe ! 👻
- Des particules d'âme apparaissent en cas de collision

#### 💾 Sauvegarde Automatique
- Votre progression est sauvegardée automatiquement
- Niveau, XP, quêtes complétées et badges sont conservés
- Bouton de réinitialisation disponible en haut à droite

---

## 🛠️ Stack Technique

### Framework & Bibliothèques
- **[React 18](https://react.dev/)** - Framework JavaScript pour l'interface utilisateur
- **[Vite](https://vitejs.dev/)** - Build tool ultra-rapide et serveur de développement
- **[React Three Fiber](https://docs.pmnd.rs/react-three-fiber/)** - Rendu 3D avec Three.js dans React
- **[@react-three/drei](https://github.com/pmndrs/drei)** - Utilitaires pour React Three Fiber
- **[Three.js](https://threejs.org/)** - Bibliothèque 3D JavaScript
- **[TailwindCSS](https://tailwindcss.com/)** - Framework CSS utility-first

### API & Services
- **[Google Gemini API](https://ai.google.dev/)** - Intelligence artificielle pour le chatbot
  - Modèle : `gemini-2.0-flash-lite-001`
  - Réponses humoristiques et décalées (fonctionnalité du jeu !)

### Outils de Développement
- **Vite HMR** - Hot Module Replacement pour un développement rapide
- **PostCSS** - Traitement CSS
- **Autoprefixer** - Compatibilité CSS multi-navigateurs

### Architecture 3D
- **Moteur physique personnalisé** - Sans bibliothèque externe
  - Mouvement basé sur la vélocité
  - Détection de collision AABB
  - Friction et accélération réalistes
- **Rendu optimisé**
  - InstancedMesh pour les objets répétés (arbres)
  - Throttling des mises à jour de position
  - Trail system optimisé (20 points)
- **Système de caméra**
  - Vue isométrique avec suivi fluide (lerp)
  - Offset configurable pour une vue d'ensemble

### Gestion d'État
- **React Hooks** (useState, useEffect, useRef)
- **LocalStorage** - Persistance de la progression du joueur
- **Event System** - Communication entre composants (collisions NPC, POI verrouillés)

---

## 📦 Installation & Développement

### Prérequis
- **Node.js** version 16 ou supérieure
- **npm** ou **yarn**

### Installation des Dépendances

```bash
npm install
```

### Lancer le Serveur de Développement

```bash
npm run dev
```

Le jeu sera accessible sur **http://localhost:5173**

### Configuration Optionnelle

Pour activer le chatbot IA, créez un fichier `.env` à la racine du projet :

```env
VITE_GEMINI_API_KEY=votre_clé_api_ici
```

Pour obtenir une clé API gratuite :
1. Visitez [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Créez une nouvelle clé API
3. Ajoutez-la au fichier `.env`

> **Note** : Le chatbot fonctionne avec des réponses par défaut même sans clé API.

### Build de Production

```bash
npm run build
```

Les fichiers de production seront générés dans le dossier `dist/`.

### Prévisualiser le Build

```bash
npm run preview
```

---

## 📁 Structure du Projet

```
nuit-de-linfo/
├── public/
│   └── logo-anime.gif          # Logo animé pour l'écran de chargement
├── src/
│   ├── App.jsx                 # Composant principal et gestion d'état
│   ├── GameScene.jsx           # Monde 3D, environnement et POIs
│   ├── Player.jsx              # Physique du véhicule et contrôles
│   ├── NPC.jsx                 # Personnages non-joueurs autonomes
│   ├── Overlay.jsx             # Système de modales pour les POIs
│   ├── Quiz.jsx                # Composant de quiz avec scoring
│   ├── Chatbot.jsx             # Intégration du chatbot Gemini
│   ├── QuestTracker.jsx        # Interface de suivi des quêtes
│   ├── QuestSuccess.jsx        # Modal de succès de quête
│   ├── IntroPopup.jsx          # Popup d'introduction au démarrage
│   ├── LevelUp.jsx             # Modal de montée de niveau
│   ├── Badges.jsx              # Affichage de la collection de badges
│   ├── LoadingScreen.jsx       # Écran de chargement avec logo
│   ├── ArrowIndicator.jsx      # Flèche 3D de navigation
│   ├── NavigationArrow.jsx     # Boussole 2D de navigation
│   ├── quizData.js             # Contenu des quiz
│   ├── main.jsx                # Point d'entrée React
│   └── index.css               # Styles Tailwind
├── CLAUDE.md                   # Documentation technique
├── README.md                   # Documentation (anglais)
├── README_FR.md                # Documentation (français)
├── package.json                # Dépendances du projet
├── vite.config.js              # Configuration Vite
└── tailwind.config.js          # Configuration Tailwind
```

---

## 🎨 Caractéristiques Visuelles

### Design Low-Poly
- Esthétique 3D minimaliste avec formes géométriques simples
- Ombres portées pour plus de profondeur
- Éclairages émissifs pour les effets lumineux

### Interface Utilisateur
- Dégradés colorés pour les modales
- Animations fluides (fade-in, slide-up, bounce)
- Design responsive avec TailwindCSS
- Icônes emoji pour une touche ludique

### Effets Visuels
- 🔥 Flammes animées en mode boost
- 💫 Particules d'âme pour les NPCs
- ✨ Sphères lumineuses pour les POIs
- 🎯 Flèche indicatrice avec animation de rebond

---

## 🎓 Contenu Éducatif

Le jeu aborde plusieurs thématiques importantes :

### Obsolescence Programmée
- Impact de la fin du support logiciel
- Solutions avec les logiciels libres
- Économie circulaire et réemploi

### Sobriété Numérique
- Empreinte écologique du numérique
- Gestion des déchets électroniques
- Bonnes pratiques pour réduire l'impact

### Logiciels Libres
- Philosophie de l'open source
- Avantages de Linux
- Création de communs numériques

### Indépendance Numérique
- Alternatives aux GAFAM
- Protection des données
- Autonomie technologique

---

## 🏆 Crédits

Développé dans le cadre de la **Nuit de l'Info 2025** pour promouvoir l'indépendance numérique et les logiciels libres.

### Inspirations
- **NIRD** (Numérique et Indépendance, Résistance et Développement)
- La communauté **Linux** et le mouvement **open source**
- Les initiatives de **reconditionnement informatique**

### Remerciements
- À tous les contributeurs de l'écosystème React et Three.js
- À la communauté des logiciels libres
- Aux organisateurs de la Nuit de l'Info

---

## 📜 Licence

Projet hackathon - Libre d'utilisation et de modification.

---

## 🐧 Rejoignez la Confrérie du Manchot !

Ensemble, construisons un numérique plus libre, plus durable et plus équitable.

**Vive Linux ! Vive les logiciels libres ! 🐧**
