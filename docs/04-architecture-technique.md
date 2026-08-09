# 04 — Architecture technique

## Choix de stack

| Couche | Choix | Justification |
|---|---|---|
| Front-end web | **Next.js 14 (App Router) + TypeScript + Tailwind CSS** | Time-to-market rapide, rendu hybride SSR/CSR utile pour SEO de la landing + réactivité de l'app, écosystème React large pour recruter, PWA facilement activable pour couvrir le mobile sans app native en V1. |
| Back-end API | **Next.js Route Handlers en V1 → extraction vers un service NestJS dédié dès V1.5** | Démarrer mono-repo simple pour aller vite ; isoler le back-end dès que la charge concierge/automatisation justifie un service indépendant scalable séparément du front. |
| Base de données | **PostgreSQL (Prisma ORM)** | Relationnel adapté au modèle dossiers/utilisateurs/documents, transactions fiables pour données sensibles, Prisma pour vélocité + migrations versionnées. |
| Stockage documents | **Object storage compatible S3, hébergé en France/UE (OVHcloud ou Scaleway)** | Résidence des données en France pour les pièces d'identité et documents sensibles (souveraineté + RGPD), chiffrement côté serveur + côté client pour les documents les plus sensibles (titre de séjour, avis d'imposition). |
| Files d'attente / tâches asynchrones | **Redis + BullMQ** | Traitement des rappels programmés, OCR, notifications, files de traitement concierge. |
| Authentification | **Auth propre (email + OTP) en V1, ajout FranceConnect en V1.5** | FranceConnect apporte confiance et pré-remplissage d'identité vérifiée mais complexifie l'homologation ; on démarre simple et on l'ajoute dès que le volume le justifie. |
| Assistant conversationnel | **Claude (API Anthropic) avec RAG sur base de connaissances administrative + contexte du dossier utilisateur** | Qualité de compréhension du langage naturel et de résumé de jargon administratif ; RAG pour ancrer les réponses dans une base vérifiée (éviter les hallucinations sur des sujets à conséquences réelles). |
| Hébergement infra | **Scaleway ou OVHcloud (région France/UE)** | Résidence des données, conformité RGPD simplifiée, image « souveraineté » cohérente avec la nature du produit. |
| Observabilité | **Sentry (erreurs) + logs structurés + tableau de bord opérationnel concierge** | Fiabilité perçue critique : une erreur silencieuse sur un dossier = angoisse utilisateur. |

## Architecture système (vue d'ensemble)

```
┌────────────────────────┐        ┌───────────────────────────┐
│   App Next.js (Web/PWA)│◄──────►│   API (Route Handlers →    │
│  - Landing + Onboarding│        │   service NestJS en V1.5)  │
│  - Dashboard, Dossiers │        └──────────────┬─────────────┘
│  - Coffre-fort, Chat   │                       │
└───────────┬────────────┘                       │
            │                                     ▼
            │                       ┌───────────────────────────┐
            │                       │  PostgreSQL (Prisma)       │
            │                       │  Users, Dossiers, Docs...  │
            │                       └──────────────┬─────────────┘
            │                                      │
            ▼                                      ▼
┌────────────────────────┐        ┌───────────────────────────┐
│  Object Storage (S3 FR)│        │   Redis + BullMQ           │
│  Documents chiffrés     │        │  Rappels, OCR, notifs      │
└────────────────────────┘        └──────────────┬─────────────┘
                                                    │
                       ┌────────────────────────────┼─────────────────────┐
                       ▼                             ▼                     ▼
             ┌──────────────────┐        ┌──────────────────┐   ┌──────────────────┐
             │ Assistant IA      │        │ Back-office       │   │ Intégrations API │
             │ (Claude + RAG)    │        │ Concierge (ops)   │   │ officielles       │
             │                   │        │ traitement manuel │   │ (FranceConnect,   │
             │                   │        │ des dossiers      │   │ DGFiP, CAF...)    │
             └──────────────────┘        └──────────────────┘   │ V1.5+             │
                                                                  └──────────────────┘
```

## Automatisation vs. concierge humain

Les administrations françaises n'exposent pas toutes une API publique de soumission
pour un particulier (FranceConnect permet l'authentification et l'accès à certaines
données, mais pas la soumission programmatique de toute démarche). Le MVP part donc
d'un principe pragmatique et honnête :

- **Court terme (MVP)** : Sérénio assemble, vérifie et pré-remplit le dossier
  (formulaires, pièces). Selon le forfait, soit l'utilisateur soumet lui-même en un
  clic guidé (export PDF pré-rempli / lien direct vers le bon formulaire officiel),
  soit un **agent concierge humain** (outillé par le back-office interne) réalise la
  soumission pour le compte de l'utilisateur, sur mandat explicite.
- **Moyen terme (V1.5+)** : intégrations API officielles ajoutées démarche par
  démarche (API Particulier, DGFiP, ANEF...) pour automatiser la soumission là où
  c'est juridiquement et techniquement possible, en commençant par les démarches à
  plus fort volume.

Cette approche évite de sur-promettre une automatisation totale non tenable à J1, tout
en tenant la promesse produit (« on s'occupe de tout ») grâce au concierge humain.

## Détection assistée par IA (point d'entrée principal)

Conformément au principe produit « on décrit, on ne cherche pas »
(`01-vision-produit.md`), l'utilisateur ne parcourt pas un catalogue pour trouver sa
démarche : il décrit sa situation en langage libre, et le système identifie la ou les
démarches concernées.

- **Prototype** : appariement par mots-clés (`src/lib/detect.ts`), volontairement
  simple et déterministe pour valider l'UX sans dépendance à un modèle de langage.
- **Production** : appel à l'API Claude avec un prompt de classification contraint au
  catalogue de démarches (`FormalityTemplate`), enrichi par RAG sur une base de
  connaissance administrative — le modèle retourne une ou plusieurs démarches
  candidates avec un niveau de confiance, jamais une action exécutée directement sans
  confirmation utilisateur. Le même moteur sert l'assistant conversationnel de suivi de
  dossier (une seule brique IA, deux points d'usage). Cette base de connaissance est
  rendue opérationnelle par le module [`knowledge-base/`](../knowledge-base/README.md)
  (schéma, fetchers par source officielle, pipeline d'extraction/validation, workflow
  de revue humaine avant mise en production — voir son README pour l'état d'avancement
  et la contrainte réseau de l'environnement de développement).
- Dans les deux cas, une fois la démarche identifiée, seules les pièces **manquantes**
  (calculées par rapport au coffre-fort de l'utilisateur, voir `computeMissingDocuments`
  côté prototype) sont demandées — jamais une liste générique.

## Génération du mandat de représentation

Dès qu'une délégation devient nécessaire (forfait Sérénité, ou action explicite de
l'utilisateur sur un dossier donné), un mandat est généré automatiquement — pas de
formulaire séparé à remplir :

- **Prototype** : document HTML formaté généré côté client, imprimable/exportable en
  PDF via la fonction d'impression du navigateur (`window.print()`), révocable depuis
  l'interface.
- **Production** : template de mandat légal versionné (revu juridiquement), rempli
  automatiquement à partir des données du dossier, avec signature électronique
  (V1.5, voir `07-roadmap-et-jalons.md`) et archivage probant côté back-end
  (`Mandate`, voir `06-modele-donnees.md`).

Dans tous les cas, le mandat reste scindé par démarche (jamais un mandat global
implicite) et révocable à tout moment avec effet immédiat — voir
`08-securite-rgpd.md`.

## Back-office concierge (interne)

Application interne (même code base Next.js, route protégée `/ops`, ou app séparée en
V1.5) où les agents Sérénio :
- Voient la file des dossiers `prêt_à_soumettre`, triés par échéance.
- Disposent d'une checklist étape par étape par type de démarche.
- Marquent l'avancement (`soumis`, `en_attente_administration`, `terminé`,
  `action_requise`), ce qui met à jour en temps réel le statut visible côté
  utilisateur.
- Ont un accès strictement contrôlé et audité aux documents nécessaires (voir
  `08-securite-rgpd.md`).

## API interne — ressources principales (V1)

```
POST   /api/onboarding/detect-formalities
GET    /api/dossiers
POST   /api/dossiers                (créer un dossier depuis un template)
GET    /api/dossiers/:id
PATCH  /api/dossiers/:id/status
GET    /api/documents
POST   /api/documents               (upload vers le coffre-fort)
GET    /api/formalites               (catalogue)
GET    /api/formalites/:slug
POST   /api/assistant/chat
GET    /api/notifications
```

Le prototype front-end actuel (`src/`) consomme ces contrats via une couche
`src/lib/data/*` qui retourne aujourd'hui des données simulées (`mock-data.ts`) mais
respecte déjà la forme des réponses attendues, pour un branchement direct sur l'API
réelle sans refonte du front.

## PWA & mobile

V1 : Progressive Web App (installable, notifications push web, offline basique pour
consulter les statuts) pour couvrir mobile sans coût de développement natif double.
V2 : évaluation d'une app native (React Native, réutilisation partielle de la logique
métier) selon la traction.
