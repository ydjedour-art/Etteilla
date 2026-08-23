// Couche d'accès aux données générées par scripts/build-arborescence.ts
// (data/generated/*), sur le même principe que src/lib/data/index.ts pour
// les données mock : les pages n'accèdent jamais aux fichiers directement,
// elles passent par ces fonctions. Lecture fichier + petit cache mémoire
// (process Next.js), pas de base de données.

import { readFileSync } from "node:fs";
import path from "node:path";
import type {
  ArboBranchNode,
  ArboFicheNode,
  ArboNode,
  Arborescence,
  FicheIndex,
  GeneratedFiche,
} from "@/types/fiches";

const GENERATED_DIR = path.join(process.cwd(), "data", "generated");

let arborescenceCache: Arborescence | null = null;
let indexCache: FicheIndex | null = null;

function readJson<T>(relativePath: string): T {
  const raw = readFileSync(path.join(GENERATED_DIR, relativePath), "utf-8");
  return JSON.parse(raw) as T;
}

export async function getArborescence(): Promise<Arborescence> {
  if (!arborescenceCache) arborescenceCache = readJson<Arborescence>("arborescence.json");
  return arborescenceCache;
}

/** Index plat léger (id, titre, slug, thème, url — pas le corps des
 * fiches) : sert à la fois la recherche et les besoins de listing rapides. */
export async function getFicheIndex(): Promise<FicheIndex> {
  if (!indexCache) indexCache = readJson<FicheIndex>("index.json");
  return indexCache;
}

export async function getTheme(themeSlug: string): Promise<ArboBranchNode | undefined> {
  const arbo = await getArborescence();
  return arbo.find((t) => t.slug === themeSlug);
}

/** Résout le 2e segment de route sous un thème : soit un dossier (avec ses
 * fiches en enfants), soit — pour les thèmes sans niveau dossier comme
 * "Comment faire si" — directement une fiche. Les deux cas se distinguent
 * par `node.type`. */
export async function resolveThemeChild(
  themeSlug: string,
  childSlug: string
): Promise<{ theme: ArboBranchNode; node: ArboNode } | undefined> {
  const theme = await getTheme(themeSlug);
  if (!theme) return undefined;
  const node = theme.enfants.find((n) => n.slug === childSlug);
  if (!node) return undefined;
  return { theme, node };
}

export async function resolveDossierFiche(
  themeSlug: string,
  dossierSlug: string,
  ficheSlug: string
): Promise<{ theme: ArboBranchNode; dossier: ArboBranchNode; fiche: ArboFicheNode } | undefined> {
  const theme = await getTheme(themeSlug);
  if (!theme) return undefined;
  const dossierNode = theme.enfants.find((n) => n.slug === dossierSlug);
  if (!dossierNode || dossierNode.type !== "dossier") return undefined;
  const ficheNode = dossierNode.enfants.find((n) => n.slug === ficheSlug);
  if (!ficheNode || ficheNode.type !== "fiche") return undefined;
  return { theme, dossier: dossierNode, fiche: ficheNode };
}

/** Contenu complet d'une fiche (introduction, chapitres, références...). */
export async function getFicheContent(slug: string): Promise<GeneratedFiche | undefined> {
  try {
    return readJson<GeneratedFiche>(`fiches/${slug}.json`);
  } catch {
    return undefined;
  }
}
