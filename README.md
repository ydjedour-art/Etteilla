# AdminZen 🌿

> **« On s'occupe de ton administratif. Toi, tu vis. »**

AdminZen est un filet de sécurité mental contre l'administratif français. L'application
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
parcours utilisateur avec des données simulées (`src/lib/mock-data.ts`), afin de valider
l'UX avant de brancher le vrai back-end.

```bash
npm install
npm run dev
# http://localhost:3000
```

Écrans disponibles :
- `/` — Landing page (promesse, comment ça marche)
- `/onboarding` — Parcours d'inscription en 4 étapes
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

## 🧭 Statut

Phase actuelle : **Conception & préparation du développement** (Phase 0 de la
[roadmap](docs/07-roadmap-et-jalons.md)). Le code applicatif est un prototype UX, pas une
version de production.
