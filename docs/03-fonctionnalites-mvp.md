# 03 — Fonctionnalités & périmètre MVP

## Priorisation MoSCoW

### Must have (V1 — MVP)
- **Assistant IA de diagnostic** — point d'entrée principal du produit : l'utilisateur
  décrit sa situation en langage libre (« je viens de déménager », « j'ai perdu mon
  travail »), l'assistant détecte la ou les démarches concernées et n'affiche que les
  pièces effectivement manquantes. Le catalogue parcourable reste un accès secondaire
  (recherche manuelle, exploration), pas le point d'entrée principal. Prototype :
  appariement par mots-clés (`src/lib/detect.ts`) ; production : Claude + RAG sur le
  catalogue de démarches (voir `04-architecture-technique.md`).
- **Génération automatique du mandat de représentation**, à la demande, dès qu'une
  délégation est nécessaire — document explicite, daté, révocable à tout moment
  (voir `08-securite-rgpd.md`).
- Onboarding détection de démarches pertinentes (< 2 min).
- Tableau de bord « Aujourd'hui » : synthèse calme des dossiers en cours / échéances /
  actions requises.
- Catalogue de démarches (voir liste ci-dessous) avec fiche descriptive langage clair.
- Création et suivi de dossier par démarche (statuts, timeline, checklist de pièces).
- Coffre-fort de documents (upload, catégorisation automatique, détection d'expiration).
- Rappels d'échéances intelligents (anticipés, non intrusifs, un seul canal choisi par
  l'utilisateur : email ou push).
- Assistant conversationnel pour traduire le jargon / répondre aux questions sur un
  dossier (même moteur que l'assistant de diagnostic, RAG sur base de connaissances
  administrative + contexte du dossier).
- Espace concierge interne (back-office) permettant à un opérateur humain de traiter
  manuellement les dossiers marqués « à soumettre » tant que les intégrations API
  officielles ne sont pas disponibles (voir `04-architecture-technique.md`).
- Profil multi-personnes simplifié (gérer un proche — palier bas pour Nadia).
- Conformité RGPD de base (consentement, export, suppression du compte).

### Should have (V1.5)
- Pré-remplissage automatique des formulaires à partir des documents du coffre-fort
  (OCR + extraction structurée).
- Notifications proactives basées sur des événements de vie détectés (déménagement,
  naissance) proposant un « bundle » de démarches associées.
- Intégrations API officielles partielles (FranceConnect pour l'identité, DGFiP,
  CAF.fr) pour automatiser la soumission là où c'est permis techniquement.
- Historique / archives consultables de toutes les démarches passées.

### Could have (V2)
- Application mobile native (au-delà de la PWA).
- Signature électronique intégrée pour mandats.
- Marketplace de partenaires spécialisés (avocats, experts-comptables) pour les cas
  hors périmètre.
- Score de « santé administrative » gamifié en option (attention : à manier avec
  prudence pour ne pas devenir anxiogène).

### Won't have (pour l'instant)
- Conseil fiscal/juridique individualisé engageant.
- Gestion du contentieux (recours, tribunal administratif).
- Couverture de démarches hors du champ personnel (entreprises au-delà du statut
  micro-entrepreneur / auto-entrepreneur).

## Catalogue de démarches — périmètre MVP

> L'ambition produit est de couvrir **tous les actes administratifs** qu'un particulier
> peut avoir à accomplir en France (voir `01-vision-produit.md`, « Marché cible »). Le
> MVP démarre volontairement sur un périmètre restreint — mieux vaut 10 démarches
> impeccables que 100 approximatives — mais le catalogue est structuré (`FormalityTemplate`,
> voir `06-modele-donnees.md`) pour s'étendre en continu sans changement d'architecture :
> ajouter une démarche, c'est ajouter une entrée de catalogue, pas développer une
> fonctionnalité. Sélection initiale ci-dessous, choisie pour le meilleur rapport
> fréquence × anxiété plutôt que pour coller strictement aux 4 personas d'illustration.

| Démarche | Organisme | Récurrence | Persona clé |
|---|---|---|---|
| Déclaration de revenus | DGFiP (Impôts) | Annuelle | Tous |
| Mise à jour de dossier CAF (adresse, ressources, quotient familial) | CAF | Ponctuelle / trimestrielle | Thomas, Nadia |
| Déclaration de chiffre d'affaires micro-entrepreneur | URSSAF | Mensuelle/trimestrielle | Karim |
| Renouvellement titre de séjour | Préfecture (ANEF) | Pluriannuelle | Léa |
| Mise à jour Carte Vitale / rattachement CPAM | CPAM (Sécurité sociale) | Ponctuelle | Léa, Tous |
| Changement d'adresse (multi-organismes) | CAF / Impôts / Mutuelle / Assurance | Ponctuelle | Thomas |
| Renouvellement / affiliation mutuelle | Mutuelle | Annuelle | Tous |
| Demande d'aide (APA, allocations spécifiques) | Département / CAF | Ponctuelle | Nadia |
| Inscription après une perte d'emploi | France Travail | Ponctuelle | Tous |
| Déclarer une naissance (multi-organismes) | CAF / Mairie / CPAM | Ponctuelle | Tous |

Chaque démarche du catalogue est modélisée comme un **`FormalityTemplate`** (voir
`06-modele-donnees.md`) : description en langage clair, organisme, pièces requises,
étapes types, délai légal, niveau d'automatisation possible (guidé / pré-rempli /
soumis pour le compte de l'utilisateur).

## Modèle de délégation (niveaux de service)

1. **Gratuit — Vigilance** : rappels d'échéances, checklist, coffre-fort, assistant
   conversationnel. L'utilisateur exécute lui-même sur les sites officiels.
2. **Essentiel (payant)** : AdminZen pré-remplit les dossiers et les pièces, prêts à
   soumettre en un clic par l'utilisateur.
3. **Sérénité (payant, premium)** : avec mandat explicite, AdminZen soumet et suit les
   démarches pour le compte de l'utilisateur de bout en bout (concierge humain +
   automatisation), avec alerte immédiate si une action de l'utilisateur devient
   indispensable.

Ce modèle freemium finance à la fois le produit et le coût du concierge humain sur les
démarches non encore automatisables via API officielle.
