# IZY/D 🟡

> **« On s'occupe de ton administratif. Toi, tu vis. »**

IZY/D est un filet de sécurité mental contre l'administratif français. L'application
s'adresse aux personnes fatiguées par la charge mentale administrative — expatriés,
Français lambda, aidants — confrontées à la CAF, aux impôts, à l'URSSAF, aux titres de
séjour, etc.

Ce dépôt contient la **conception produit**, l'**architecture technique** et le **socle
de développement** (prototype cliquable + modèle de données cible) préparés pour
démarrer l'implémentation.

## 📚 Documentation de conception

| Document | Contenu |
|---|---|
| [`docs/01-vision-produit.md`](docs/01-vision-produit.md) | Vision, promesse, principes produit, ton de voix |
| [`docs/02-personas-et-parcours.md`](docs/02-personas-et-parcours.md) | Personas cibles et parcours utilisateurs clés |
| [`docs/03-fonctionnalites-mvp.md`](docs/03-fonctionnalites-mvp.md) | Périmètre fonctionnel priorisé (MoSCoW), catalogue de démarches |
| [`docs/04-architecture-technique.md`](docs/04-architecture-technique.md) | Stack, architecture système, intégrations |
| [`docs/05-design-system.md`](docs/05-design-system.md) | Principes UX/UI, palette, composants |
| [`docs/06-modele-donnees.md`](docs/06-modele-donnees.md) | Modèle de données cible (voir aussi `prisma/schema.prisma`) |
| [`docs/07-roadmap-et-jalons.md`](docs/07-roadmap-et-jalons.md) | Phasage du développement |
| [`docs/08-securite-rgpd.md`](docs/08-securite-rgpd.md) | Sécurité, RGPD, mandat de représentation |

## 🖥️ Prototype cliquable

Un prototype front-end (Next.js + TypeScript + Tailwind) implémente les écrans clés du
parcours utilisateur, avec des données de démonstration (`src/lib/mock-data.ts`) et un
état client interactif (`src/lib/store.tsx`, persisté en `localStorage`) : les boutons
produisent un vrai effet (créer un dossier, ajouter un document qui débloque
automatiquement une démarche, faire avancer un statut, changer de formule, exporter ou
supprimer ses données) sans nécessiter de back-end. C'est un outil de validation UX, pas
encore la version connectée aux vraies administrations (voir `docs/04-architecture-technique.md`).

Direction visuelle empruntée à la charte YD Formation : bleu Klein (`#002FA7`) + jaune
citron (`#FFE500`, seule couleur d'action du site) + rose flash (`#FF3EA5`) en accent
"wow", sur fond blanc franc, typographie Plus Jakarta Sans (titres, très grasse) /
Source Sans 3 (texte) — ton direct et peu de texte par écran, plutôt que le registre
institutionnel de la V1 (voir `tailwind.config.ts` et `src/app/globals.css`).

### 📸 Ajouter de vraies photos

La landing page réserve des emplacements photo (fond dégradé marine avec trame de
points, classe `.official-photo-placeholder` dans `src/app/globals.css`). Pour les
remplacer par une vraie photo :

1. Dépose ton fichier dans `public/photos/` (ex. `public/photos/hero.jpg`).
2. Dans `src/app/page.tsx`, remplace le `<div className="official-photo-placeholder" ... />`
   concerné par :
   ```tsx
   <img src="/photos/hero.jpg" alt="…" className="h-full w-full rounded-2xl object-cover shadow-xl" />
   ```
3. Redéploie (Vercel republie automatiquement au push).

```bash
npm install
npm run dev
# http://localhost:3000
```

Écrans disponibles :

**Portail visiteur (non connecté)**
- `/` — Landing page (promesse, problème/solution, aperçu des démarches, aperçu des
  formules, confiance & sécurité, FAQ)
- `/demarches` — Catalogue public des démarches couvertes, avec recherche et filtres
- `/tarifs` — Détail des 3 formules d'abonnement (bascule mensuel/annuel), comparatif
  complet, option à la carte, FAQ facturation
- `/onboarding` — Parcours d'inscription en 4 étapes

**Espace connecté**
- `/app` — Tableau de bord « Aujourd'hui »
- `/app/formalites` — Catalogue de démarches + mes démarches en cours
- `/app/formalites/[slug]` — Détail d'une démarche + lancement d'un dossier
- `/app/dossiers/[id]` — Suivi d'un dossier (timeline, documents, statut)
- `/app/coffre-fort` — Coffre-fort de documents
- `/app/assistant` — Assistant conversationnel
- `/app/profil` — Profil & abonnement

## 🗄️ Modèle de données cible

Le schéma Prisma dans [`prisma/schema.prisma`](prisma/schema.prisma) décrit le modèle de
données cible pour le back-end de production (PostgreSQL). Le prototype front-end
n'y est **pas branché** — il utilise des données simulées le temps que le back-end soit
implémenté (voir `docs/04-architecture-technique.md`).

## 📖 Base de connaissances des procédures administratives

Le module [`knowledge-base/`](knowledge-base/README.md) rend opérationnelles la
récupération, la structuration et la maintenance des fiches de démarches
administratives (schéma, fetchers par source, pipeline d'extraction/validation,
workflow de revue humaine). **Lire en priorité la section sur la contrainte réseau**
avant d'utiliser ce module : les sources officielles (service-public.fr, ants.gouv.fr...)
ne sont pas accessibles depuis l'environnement où ce module a été développé.

```bash
npm run kb:validate           # Valider les fiches existantes
npm run kb:extract -- service-public --fixture knowledge-base/fixtures/service-public-carte-vitale.html
npm run kb:refresh-check      # Repérer les fiches à recontrôler
```

## 🧭 Statut

Phase actuelle : **Conception & préparation du développement** (Phase 0 de la
[roadmap](docs/07-roadmap-et-jalons.md)). Le code applicatif est un prototype UX, pas une
version de production.
