# Corpus de fiches Service-Public.gouv.fr

Ce dossier contient le corpus de fiches pratiques qui alimente `/demarches/**`
sur IZY/D, et le script qui en dérive l'arborescence de navigation du site.

## Provenance et licence

Les fiches proviennent de **Service-Public.gouv.fr**, éditées par la **DILA**
(Direction de l'information légale et administrative), extraites depuis leur
export XML open data vers un JSON structuré (voir la méthode d'extraction
ci-dessous). Elles sont publiées sous **Licence Ouverte / Etalab** : réutilisation
libre à condition de citer la source et la date de mise à jour — voir
`src/components/marketing/SourceAttribution.tsx`, affiché sur chaque page fiche.

**Ne jamais** reproduire le logo ou la marque "Service-Public.fr" (déposés à
l'INPI) — seule l'attribution textuelle est utilisée ici.

## Fichiers

| Fichier / dossier | Rôle | Généré ? |
|---|---|---|
| `fiches.jsonl` | Source brute : un objet JSON par ligne, un par fiche | Non — à déposer manuellement |
| `demarches-izyd.ts` | Mapping éditorial des 10 démarches IZY/D vers des `ficheId` du corpus | Non — tenu à la main |
| `generated/arborescence.json` | Arbre de navigation thème → dossier → fiche | **Oui** |
| `generated/index.json` | Index plat léger (id, titre, slug, thème, url) — navigation + recherche | **Oui** |
| `generated/fiches/<slug>.json` | Contenu complet d'une fiche, un fichier par fiche | **Oui** |

Tout ce qui est sous `generated/` est **entièrement régénéré** par le script —
ne pas l'éditer à la main, ce serait perdu au prochain `npm run build:arbo`.

## Régénérer les données

Le jeu de données DILA est mis à jour quasi quotidiennement. Pour rafraîchir
le site avec une version plus récente :

1. Remplace `data/fiches.jsonl` par le nouvel export (même format, un objet
   JSON par ligne — voir le schéma ci-dessous).
2. Lance :
   ```bash
   npm run build:arbo
   ```
3. Vérifie le résumé affiché (nombre de fiches, thèmes, dossiers) et relance
   `npm run build` pour confirmer que tout compile et que les pages
   `/demarches/**` se génèrent sans erreur.

Le script est **idempotent** : il purge et réécrit intégralement
`data/generated/` à chaque exécution, donc rejouable sans risque.

### Schéma d'une ligne de `fiches.jsonl`

```json
{
  "id": "F1",
  "type_publication": "Fiche d'information conditionnée",
  "titre": "…",
  "theme": "Argent - Impôts - Consommation",
  "description": "…",
  "type_fiche": "Fiche pratique",
  "date_modif": "2026-04-15",
  "url": "https://www.service-public.gouv.fr/particuliers/vosdroits/F1",
  "fil_ariane": ["Accueil particuliers", "Thème", "Dossier", "Titre de la fiche"],
  "introduction": "…",
  "chapitres": [{ "titre": "…", "contenu": ["paragraphe", "• item de liste", "[À noter] …"] }],
  "references": [{ "titre": "…", "url": "…" }],
  "services_en_ligne": [{ "titre": "…", "url": "…", "type": "…" }],
  "contacts": ["…"],
  "pour_en_savoir_plus": [{ "titre": "…", "url": "…" }]
}
```

Les types TypeScript correspondants sont dans `src/types/fiches.ts`
(`RawFiche` pour une ligne source, `GeneratedFiche`/`Arborescence`/`FicheIndex`
pour ce que produit le script).

## Comment la hiérarchie est construite

`scripts/build-arborescence.ts` reconstruit l'arbre **uniquement** à partir de
`fil_ariane` (1er élément = racine, dernier = titre de la fiche, éléments
intermédiaires = thème puis dossier éventuel) — jamais à partir du champ
`theme`, qui ne sert que de source d'information sur la fiche elle-même. Sur
le corpus de référence (2999 fiches, avril 2026) :

- **2974 fiches** ont un chemin complet thème → dossier → fiche.
- **22 fiches** ("Comment faire si…") n'ont pas de niveau dossier dans la
  source : elles sont rattachées directement à leur thème.
- **3 fiches orphelines** du corpus (contenu de test DILA, ex. "RG CFS
  Décès") n'ont aucun thème réel dans `fil_ariane` — leur propre titre sert
  alors de nœud "thème" (fidèle à la source, sans rien inventer). Elles sont
  volontairement exclues de la grille de thèmes mise en avant sur `/demarches`
  (`ThemeGrid`), mais restent trouvables par la recherche et via leur page.

Aucune fiche n'est jamais inventée, fusionnée ou recatégorisée manuellement —
seule la structure de navigation est dérivée des données.

## Le mapping des 10 démarches IZY/D (`demarches-izyd.ts`)

Relie chacune des 10 démarches mises en avant (`src/lib/mock-data.ts`) à un ou
plusieurs `ficheId` du corpus, avec une `confiance` explicite
(`confirmee` / `partielle` / `todo`) et une `note` qui explique la
correspondance — en particulier pourquoi certaines démarches (ex. la
déclaration URSSAF d'un micro-entrepreneur) n'ont **aucune** fiche
correspondante dans ce corpus : il couvre l'espace "particuliers" de
service-public.fr, pas l'espace "professionnels/entreprises". Ne jamais
remplir un `ficheId` sans vérification directe du contenu de la fiche.
