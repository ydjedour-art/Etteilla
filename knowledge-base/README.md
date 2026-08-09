# Base de connaissances des procédures administratives — Sérénio

Ce module rend opérationnelle la récupération, la structuration et la maintenance
des fiches de procédures administratives qui alimentent :

- le classificateur d'intention (« je viens de perdre mon travail » → bonne fiche),
- la génération de checklists (documents exacts requis, rien de plus),
- le choix du mode d'exécution (mandat vs pilotage),
- le système d'alertes d'échéances,
- l'assistant conversationnel (RAG sur `embedding_text`).

## ⚠️ Contrainte réseau de cet environnement — à lire avant tout

Cette base a été construite dans un environnement de développement dont l'accès
réseau sortant est restreint par une politique d'organisation à une petite liste
autorisée (npm, PyPI, GitHub, Anthropic). Une vérification effectuée pendant le
développement a confirmé que des domaines externes arbitraires (boundless.com,
Unsplash, Pexels) étaient bloqués (403) par cette politique — **service-public.fr,
ants.gouv.fr, ameli.fr, caf.fr, impots.gouv.fr et data.gouv.fr sont donc
très probablement inaccessibles depuis cet environnement également.**

Conséquence concrète : le pipeline ci-dessous est **complet et fonctionnel**, mais
n'a **jamais tourné contre les vrais sites** — seulement contre une fixture HTML
locale construite à la main pour valider la mécanique de bout en bout (voir
`fixtures/`). Les sélecteurs CSS de chaque source (`sources/*.ts`) sont écrits à
partir de la structure générale connue de ces sites et sont marqués
`// TODO calibrer` : **ils doivent être vérifiés et ajustés contre le HTML réel**
dans un environnement disposant de l'accès réseau nécessaire avant toute
utilisation en production.

Ne présentez jamais une donnée de ce module comme vérifiée tant que ce calibrage
n'a pas eu lieu — voir `a_verifier` ci-dessous.

## Pourquoi `a_verifier` existe

Le schéma de données a été fourni avec une liste de champs précise. Un seul champ a
été ajouté au-delà de cette spécification : **`a_verifier`** (booléen, `true` par
défaut).

Ce n'est pas un oubli du schéma d'origine, c'est une décision délibérée de
gouvernance : une checklist erronée fait manquer un document à un utilisateur en
plein renouvellement de titre de séjour ; une mauvaise qualification
`mode_possible.mandat` peut exposer Sérénio juridiquement ou l'utilisateur
administrativement. Le principe « legal by design » du produit implique qu'**aucune
fiche générée automatiquement ne doit alimenter le classificateur, la génération de
checklist ou un mandat réel en production sans revue humaine explicite**.

`a_verifier: true` → fiche non revue, à ne pas servir en production (mais utilisable
en environnement de test/démo, clairement labellisée). `a_verifier: false` → fiche
passée par le workflow de revue ci-dessous.

## Workflow de revue humaine (avant `a_verifier: false`)

1. Un opérateur (produit ou juridique) ouvre la fiche dans `data/`.
2. Il vérifie contre la source officielle citée (`source_principale`, `url_officielle`) :
   - l'exactitude des documents requis et du numéro Cerfa,
   - les délais et échéances,
   - le coût réel,
   - **`mode_possible`** : la qualification mandat/pilotage doit être confirmée par
     un conseil juridique dès qu'elle engage la responsabilité de Sérénio ou la
     validité de la démarche pour l'utilisateur.
3. Il corrige directement le JSON (ce sont des fichiers texte versionnés — la revue
   passe par une pull request comme n'importe quel changement de code).
4. Il lance `npm run kb:build-embeddings` pour resynchroniser `embedding_text` si le
   contenu a changé.
5. Il passe `a_verifier` à `false` et `derniere_mise_a_jour` à la date de revue.
6. La pull request est relue par une deuxième personne avant fusion (à deux
   personnes minimum sur tout ce qui touche `mode_possible` ou `couts`).

## Structure

```
knowledge-base/
  schema/procedure.schema.ts   Schéma Zod (source de vérité) + types TS générés
  sources/                     Un adaptateur par source, interface commune
    types.ts                   Interface SourceAdapter (listCandidateUrls + parse)
    service-public.ts          Source générique (le plus gros volume de démarches)
    ants.ts                    Carte grise, permis, passeport/CNI
    ameli.ts                   Carte Vitale, Complémentaire Santé Solidaire
    caf.ts                     RSA, APL, Prime d'activité
    impots.ts                  Déclaration de revenus, contestations
    data-gouv.ts                Enrichissement (référentiels, pas des fiches)
  pipeline/
    extract.ts                 Orchestrateur : source → parse → normalise → valide → écrit
    normalize.ts                Complète les champs manquants, calcule id + embedding_text
    embedding-text.ts           Génération déterministe du texte RAG
    validate.ts                 Validateur CLI (utilisable en CI)
    refresh-check.ts            Détecte les fiches trop anciennes à recontrôler
    build-embeddings.ts         Recalcule embedding_text après une correction manuelle
  data/                         Les fiches, une par fichier JSON (nom = id)
  fixtures/                     HTML de test pour valider les parseurs hors-réseau
```

## Utilisation

```bash
# Valider toutes les fiches existantes contre le schéma (utilisable en CI)
npm run kb:validate

# Extraire une fiche depuis une source réelle (nécessite l'accès réseau à la source)
npm run kb:extract -- service-public

# Extraire depuis une fixture locale (fonctionne sans accès réseau — c'est ainsi que
# ce pipeline a été testé de bout en bout dans cet environnement)
npm run kb:extract -- service-public --fixture knowledge-base/fixtures/service-public-carte-vitale.html

# Repérer les fiches à recontrôler (par défaut : plus de 90 jours)
npm run kb:refresh-check

# Recalculer embedding_text après une correction manuelle en revue
npm run kb:build-embeddings
```

## Priorisation des démarches

**A. High volume** (à traiter en premier) : carte grise (toutes variantes), permis
de conduire, Carte Vitale, impôts, titre de séjour, CAF (RSA, APL, Prime
d'activité...), passeport/CNI, changement d'adresse, actes d'état civil, listes
électorales.

**B. High friction / High non-recours** : ASPA, Complémentaire Santé Solidaire,
certaines aides au logement, MDPH/AAH, contestations d'impôts ou d'amendes,
renouvellements de titres pour publics fragiles, démarches succession simples,
aides locales peu connues.

## État actuel de la base

| Fiche | Origine | Statut |
|---|---|---|
| `carte-vitale-premiere-demande` | Générée par le pipeline (`kb:extract` + fixture) | `a_verifier: true` |
| `certificat-immatriculation-cession` | Rédigée manuellement (connaissances générales) | `a_verifier: true` |
| `aspa-premiere-demande` | Rédigée manuellement (connaissances générales, sujet sensible) | `a_verifier: true` |

Trois fiches de démonstration, volontairement peu nombreuses : l'objectif de cette
étape était de rendre le **pipeline** opérationnel et vérifiable de bout en bout, pas
de peupler prématurément la base avec des données non vérifiées à grande échelle.
L'étape suivante, une fois l'accès réseau disponible, est de calibrer les sélecteurs
de `sources/service-public.ts` contre le HTML réel, lancer l'extraction sur la liste
« High volume », puis faire passer chaque fiche par la revue humaine avant
production.
