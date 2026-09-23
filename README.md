# Prépa Concours AgroTIC — PWA d'entraînement

Environnement personnel d'entraînement scientifique et méthodologique pour préparer
le **Concours commun voie Apprentissage** (trajectoire AgroTIC → Bordeaux Sciences Agro).

> ⚠️ Ce dépôt est un **point de départ réel et fonctionnel**, pas la version finale à
> 5 000 exercices décrite dans le prompt maître. Le corpus actuel est volontairement
> modeste (~35 exercices, ~24 notions) mais rigoureux : mieux vaut un socle solide et
> extensible qu'un contenu massif et médiocre. Voir "Prochaines étapes" plus bas.

## Pourquoi ce recentrage de contenu

Le format réel du concours voie Apprentissage (confirmé précédemment) est : analyse et
synthèse de documents, anglais, dossier et projet professionnel, entretien de 30 minutes —
et non un QCM de connaissances scientifiques pures. Le corpus reflète donc ce recentrage :
le domaine transversal **TR** (méthodologie de synthèse, anglais, projet professionnel)
est le plus développé, tandis que les domaines scientifiques (PV, PA, ENV, BIO, AA, PAY)
fournissent la culture générale agricole nécessaire pour nourrir les documents et l'oral.

## Stack technique

- **React 19 + Vite** — build rapide, HMR
- **Dexie.js** (IndexedDB) — mémoire locale du parcours utilisateur, aucune donnée envoyée à un serveur
- **react-router-dom** (HashRouter) — compatible GitHub Pages sans configuration serveur
- **vite-plugin-pwa** — manifest + service worker (installable, fonctionnement hors-ligne)

## Architecture

```
src/
  data/         # Contenu pédagogique statique (domaines, notions, exercices, questions d'oral)
                # -> versionné dans le code, séparé des données utilisateur
  db/           # Couche d'accès aux données (Dexie/IndexedDB) — repository pattern
                # -> pour migrer vers Supabase plus tard, ne réécrire QUE ce fichier
  services/     # Moteur adaptatif + évaluation des réponses
  components/   # Layout, ExerciseRunner (composant d'exercice réutilisable)
  pages/        # Une page par écran de navigation
```

**Séparation contenu / données utilisateur** (volontaire, cf. prompt maître §21) :
- Le contenu (`src/data/*.js`) peut être mis à jour, enrichi ou corrigé sans jamais
  toucher à l'historique de l'utilisateur.
- Les données utilisateur (tentatives, maîtrise, sessions, projet, oral) vivent
  uniquement dans IndexedDB via `src/db/database.js`.

**Migration future vers une base distante (Supabase)** : tous les composants passent
par les fonctions de `src/db/database.js` (`getProfile`, `recordAttempt`, etc.) plutôt
que d'appeler Dexie directement. Remplacer l'implémentation de ces fonctions par des
appels Supabase suffit ; aucune page n'a besoin d'être modifiée.

## Fonctionnalités livrées

- Onboarding progressif (profil étudiant)
- Tableau de bord (objectif du jour, notions fragiles, activité récente — sans fausse
  prédiction de réussite)
- Apprendre : navigation Domaine → Unité → Notion, avec plusieurs niveaux de lecture
  (comprendre simplement / scientifiquement / exemple / limites / erreurs fréquentes)
- S'entraîner : filtres manuels + "entraînement intelligent" (moteur adaptatif)
- Mes erreurs : regroupées par notion, jamais un simple "faux"
- À revoir : file de réactivation (J+2 après une erreur), notions fragiles, jamais pratiquées
- Défi transversal : situations interdisciplinaires
- Mode concours : simulation chronométrée, navigation libre, correction différée,
  analyse par domaine après coup
- Oral : banque de questions par catégorie, chronomètre, notes, historique par question
- Mon projet : constructeur de cohérence de projet professionnel (formation → compétences
  → expériences → intérêts → école visée → objectif)
- Progression : vue multidimensionnelle (par domaine, par niveau de maîtrise D1-D4,
  historique des simulations) — jamais une seule barre globale

## Moteur adaptatif (volontairement simple)

Logique de `src/services/adaptiveEngine.js` :
réactivation due > notion fragile > jamais pratiquée > transfert (notion maîtrisée),
avec un ajustement de niveau basé sur le score moyen de maîtrise des notions concernées.
Pas d'IA complexe : une heuristique simple et fiable, comme demandé.

## Installation et développement

```bash
npm install
npm run dev       # serveur de développement
npm run build     # build de production dans dist/
npm run preview   # prévisualiser le build
```

## Déploiement GitHub Pages

Un workflow GitHub Actions (`.github/workflows/deploy.yml`) build et déploie
automatiquement sur push vers `main`.

Étapes pour l'activer :
1. Pousser ce dépôt sur GitHub (le nom du dépôt doit correspondre à `REPO_NAME` dans
   `vite.config.js`, ou définir la variable d'environnement `VITE_BASE_PATH` au build,
   ex. `VITE_BASE_PATH=/mon-repo/ npm run build`).
2. Dans Settings → Pages, choisir la source "GitHub Actions".
3. Pousser sur `main` : le site se construit et se déploie automatiquement.

## Prochaines étapes (non incluses dans cette première livraison)

- Étoffer le corpus (viser d'abord ~100 exercices de bonne qualité avant 500)
- Ajouter des remédiations dédiées (mini-rappel ciblé après une erreur détectée)
  plutôt que de renvoyer vers l'entraînement général
- Système de répétition espacée plus fin (actuellement : réactivation fixe à J+2)
- Vérifier et sourcer les informations officielles actuelles sur le concours et
  Bordeaux Sciences Agro avant de les présenter comme telles dans l'app (le contenu
  actuel est explicitement un choix pédagogique, pas une source officielle)
- Tests d'utilisation réels sur mobile (le layout est responsive mais n'a pas été
  testé sur un appareil physique)
- Éventuelle synchronisation multi-appareils via Supabase (architecture déjà prête)
