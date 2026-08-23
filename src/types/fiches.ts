// Types du corpus de fiches pratiques Service-Public.gouv.fr (DILA, Licence
// Ouverte / Etalab) et des données qu'on en dérive. Source brute :
// data/fiches.jsonl. Voir scripts/build-arborescence.ts (génère
// data/generated/*) et data/README.md.

/** Une entrée telle qu'elle apparaît dans data/fiches.jsonl — un objet JSON
 * par ligne, fidèle à l'extraction XML de la DILA (voir data/README.md). */
export interface RawFiche {
  id: string;
  type_publication: string;
  titre: string;
  theme: string;
  description: string;
  type_fiche: string;
  date_modif: string;
  url: string;
  fil_ariane: string[];
  introduction: string;
  chapitres: FicheChapitre[];
  references: FicheLien[];
  services_en_ligne: FicheServiceEnLigne[];
  contacts: string[];
  pour_en_savoir_plus: FicheLien[];
}

export interface FicheChapitre {
  titre: string;
  contenu: string[];
}

export interface FicheLien {
  titre: string;
  url: string;
}

export interface FicheServiceEnLigne {
  titre: string;
  url: string;
  type: string;
}

/** Contenu complet d'une fiche, tel qu'écrit dans
 * data/generated/fiches/<slug>.json — reprend RawFiche et y ajoute le slug
 * calculé et le chemin de navigation résolu. */
export interface GeneratedFiche extends RawFiche {
  slug: string;
  /** Chemin de navigation résolu depuis fil_ariane (thème, dossier
   * éventuel), sans la racine ni le titre de la fiche lui-même. */
  path: ArboSegment[];
}

export interface ArboSegment {
  slug: string;
  titre: string;
}

/** Type d'un nœud de l'arborescence — "dossier" recouvre aussi bien un
 * dossier que le futur niveau sous-dossier si le corpus en gagne un jour
 * (voir data/README.md, la profondeur observée aujourd'hui est theme →
 * dossier → fiche, jamais plus). */
export type ArboNodeType = "theme" | "dossier" | "fiche";

interface ArboNodeBase {
  id: string;
  slug: string;
  titre: string;
  type: ArboNodeType;
}

export interface ArboFicheNode extends ArboNodeBase {
  type: "fiche";
  ficheId: string;
  slug: string;
  url: string;
  date_modif: string;
  description: string;
}

export interface ArboBranchNode extends ArboNodeBase {
  type: "theme" | "dossier";
  enfants: ArboNode[];
}

export type ArboNode = ArboBranchNode | ArboFicheNode;

/** data/generated/arborescence.json — la forêt des thèmes de niveau 1. */
export type Arborescence = ArboBranchNode[];

/** Une entrée de data/generated/index.json — index plat léger pour la
 * navigation et la recherche, sans le corps des fiches. */
export interface FicheIndexEntry {
  id: string;
  titre: string;
  slug: string;
  theme: string;
  themeSlug: string;
  dossier: string | null;
  dossierSlug: string | null;
  url: string;
  date_modif: string;
  /** Chapô court de la fiche (dc:description) — utilisé par la recherche
   * client (FicheSearch) et par la recherche de candidats du triage IA
   * (src/lib/triage/search.ts), en plus du titre. */
  description: string;
}

export type FicheIndex = FicheIndexEntry[];
