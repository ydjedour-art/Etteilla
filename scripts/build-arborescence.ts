#!/usr/bin/env tsx
/**
 * Construit l'arborescence de navigation IZY/D (thème → dossier → fiche) à
 * partir du corpus de fiches pratiques Service-Public.gouv.fr (DILA, Licence
 * Ouverte / Etalab) — voir data/README.md pour la provenance et la licence.
 *
 * Lit data/fiches.jsonl (un objet JSON par ligne) et écrit dans
 * data/generated/ :
 *   - arborescence.json  : l'arbre imbriqué thème → dossier → fiche
 *   - index.json          : index plat léger (id, titre, slug, thème, url) —
 *                           pour la navigation et la recherche, sans le corps
 *                           des fiches
 *   - fiches/<slug>.json  : le contenu complet d'une fiche, un fichier par
 *                           fiche, chargé à la demande sur sa page
 *
 * La hiérarchie vient uniquement de `fil_ariane` (le 1er élément est la
 * racine, le dernier est le titre de la fiche) — on ne réinvente aucune
 * taxonomie. Le champ `theme` n'est jamais utilisé pour la hiérarchie : il
 * sert seulement de vérification (il ne contredit `fil_ariane[1]` sur
 * aucune des 2999 fiches du corpus de référence).
 *
 * Idempotent et rejouable : purge et régénère intégralement data/generated/
 * à chaque exécution, pour pouvoir être relancé sans risque sur un
 * fiches.jsonl plus récent (le jeu de données DILA est mis à jour
 * quasi quotidiennement).
 *
 * Usage :
 *   npm run build:arbo
 */
import {
  createReadStream,
  existsSync,
  mkdirSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import path from "node:path";
import { createInterface } from "node:readline";
import { fileURLToPath } from "node:url";
import type {
  ArboBranchNode,
  ArboFicheNode,
  ArboNode,
  Arborescence,
  ArboSegment,
  FicheIndex,
  FicheIndexEntry,
  GeneratedFiche,
  RawFiche,
} from "../src/types/fiches";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.join(__dirname, "..");
const SOURCE_FILE = path.join(ROOT_DIR, "data", "fiches.jsonl");
const OUT_DIR = path.join(ROOT_DIR, "data", "generated");
const FICHES_DIR = path.join(OUT_DIR, "fiches");

const DIACRITICS_RE = /[̀-ͯ]/g;

function slugify(input: string): string {
  const slug = input
    .normalize("NFKD")
    .replace(DIACRITICS_RE, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return slug || "sans-titre";
}

/** Arbre mutable pendant la construction — converti en ArboNode[] (public,
 * immuable, trié) à la fin de run(). Une Map par niveau garantit qu'on
 * réutilise le même nœud "dossier" pour toutes les fiches qui y appartiennent
 * au lieu d'en créer un par fiche. */
interface MutableBranch {
  slug: string;
  titre: string;
  type: "theme" | "dossier";
  enfants: Map<string, MutableBranch | ArboFicheNode>;
}

function getOrCreateBranch(
  parentMap: Map<string, MutableBranch | ArboFicheNode>,
  titre: string,
  type: "theme" | "dossier"
): MutableBranch {
  const slug = slugify(titre);
  const existing = parentMap.get(slug);
  if (existing && existing.type !== "fiche") return existing;
  const branch: MutableBranch = { slug, titre, type, enfants: new Map() };
  parentMap.set(slug, branch);
  return branch;
}

/** Segments intermédiaires entre la racine et le titre de la fiche
 * (thème, [dossier], …). fil_ariane fait presque toujours 4 éléments
 * (racine, thème, dossier, fiche) ; parfois 3 (pas de dossier — les fiches
 * "Comment faire si…") ; très rarement 2 (3 fiches orphelines du corpus,
 * sans thème réel — on retombe alors sur le titre de la fiche lui-même comme
 * seul segment, fidèle à ce que fil_ariane encode, sans rien inventer). */
function intermediateSegments(filAriane: string[]): string[] {
  const segments = filAriane.slice(1, -1);
  if (segments.length > 0) return segments;
  const own = filAriane[filAriane.length - 1];
  return own ? [own] : [];
}

function toArboNode(node: MutableBranch | ArboFicheNode): ArboNode {
  if (node.type === "fiche") return node;
  const enfants = [...node.enfants.values()]
    .map(toArboNode)
    .sort((a, b) => a.titre.localeCompare(b.titre, "fr"));
  const branch: ArboBranchNode = {
    id: node.slug,
    slug: node.slug,
    titre: node.titre,
    type: node.type,
    enfants,
  };
  return branch;
}

async function run() {
  if (!existsSync(SOURCE_FILE)) {
    console.error(`Introuvable : ${path.relative(ROOT_DIR, SOURCE_FILE)}`);
    console.error("Dépose le fichier fiches.jsonl (DILA) à cet emplacement avant de relancer.");
    process.exit(1);
  }

  // Purge complète avant régénération — voir l'en-tête du fichier.
  rmSync(OUT_DIR, { recursive: true, force: true });
  mkdirSync(FICHES_DIR, { recursive: true });

  const roots = new Map<string, MutableBranch | ArboFicheNode>();
  const indexEntries: FicheIndexEntry[] = [];
  const usedFicheSlugs = new Set<string>();

  let total = 0;
  let noIntro = 0;
  let sansDossier = 0;

  const rl = createInterface({
    input: createReadStream(SOURCE_FILE, "utf-8"),
    crlfDelay: Infinity,
  });

  for await (const line of rl) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    const raw: RawFiche = JSON.parse(trimmed);
    total++;
    if (!raw.introduction) noIntro++;

    const segments = intermediateSegments(raw.fil_ariane);

    // Descend/crée les nœuds thème puis dossier(s) éventuels.
    let parentMap = roots;
    let parentPath: ArboSegment[] = [];
    for (let i = 0; i < segments.length; i++) {
      const type = i === 0 ? "theme" : "dossier";
      const branch = getOrCreateBranch(parentMap, segments[i], type);
      parentPath = [...parentPath, { slug: branch.slug, titre: branch.titre }];
      parentMap = branch.enfants;
    }
    if (segments.length === 1) sansDossier++;

    // Slug de fiche : unique globalement (data/generated/fiches/ est un
    // dossier à plat). Suffixe par ficheId en cas de collision (13 cas sur
    // 2999 dans le corpus de référence — titres identiques dans des dossiers
    // différents).
    let ficheSlug = slugify(raw.titre);
    if (usedFicheSlugs.has(ficheSlug)) {
      ficheSlug = `${ficheSlug}-${raw.id.toLowerCase()}`;
    }
    usedFicheSlugs.add(ficheSlug);

    const ficheNode: ArboFicheNode = {
      id: ficheSlug,
      slug: ficheSlug,
      titre: raw.titre,
      type: "fiche",
      ficheId: raw.id,
      url: raw.url,
      date_modif: raw.date_modif,
      description: raw.description,
    };
    parentMap.set(ficheSlug, ficheNode);

    const themeSlug = parentPath[0]?.slug ?? null;
    const dossierSeg = parentPath.length > 1 ? parentPath[parentPath.length - 1] : null;
    indexEntries.push({
      id: raw.id,
      titre: raw.titre,
      slug: ficheSlug,
      theme: parentPath[0]?.titre ?? "",
      themeSlug: themeSlug ?? "",
      dossier: dossierSeg?.titre ?? null,
      dossierSlug: dossierSeg?.slug ?? null,
      url: raw.url,
      date_modif: raw.date_modif,
    });

    const generatedFiche: GeneratedFiche = {
      ...raw,
      slug: ficheSlug,
      path: parentPath,
    };
    writeFileSync(
      path.join(FICHES_DIR, `${ficheSlug}.json`),
      `${JSON.stringify(generatedFiche, null, 2)}\n`,
      "utf-8"
    );
  }

  const arborescence: Arborescence = [...roots.values()]
    .map(toArboNode)
    .filter((n): n is ArboBranchNode => n.type !== "fiche")
    .sort((a, b) => a.titre.localeCompare(b.titre, "fr"));

  indexEntries.sort((a, b) => a.titre.localeCompare(b.titre, "fr"));
  const index: FicheIndex = indexEntries;

  writeFileSync(
    path.join(OUT_DIR, "arborescence.json"),
    `${JSON.stringify(arborescence, null, 2)}\n`,
    "utf-8"
  );
  writeFileSync(path.join(OUT_DIR, "index.json"), `${JSON.stringify(index, null, 2)}\n`, "utf-8");

  const dossierCount = arborescence.reduce(
    (sum, theme) => sum + theme.enfants.filter((n) => n.type === "dossier").length,
    0
  );

  console.log(`✓ ${total} fiche(s) lues depuis ${path.relative(ROOT_DIR, SOURCE_FILE)}`);
  console.log(`  ${arborescence.length} thème(s), ${dossierCount} dossier(s), ${sansDossier} fiche(s) sans dossier`);
  console.log(`  ${noIntro} fiche(s) sans introduction (laissée vide, comme dans la source)`);
  console.log(`  ${usedFicheSlugs.size} slug(s) de fiche uniques`);
  console.log(`→ ${path.relative(ROOT_DIR, OUT_DIR)}/arborescence.json`);
  console.log(`→ ${path.relative(ROOT_DIR, OUT_DIR)}/index.json`);
  console.log(`→ ${path.relative(ROOT_DIR, FICHES_DIR)}/ (${total} fichiers)`);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
