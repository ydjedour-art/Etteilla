import type { Procedure } from "../schema/procedure.schema";
import type { SourceAdapter } from "../sources/types";
import { buildEmbeddingText } from "./embedding-text";

function slugify(input: string): string {
  return input
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "") // retire les accents (diacritiques combinants)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Complète un extrait partiel (issu d'un `SourceAdapter.parse`) avec les valeurs par
 * défaut prudentes du schéma, calcule l'id et l'`embedding_text`, et marque
 * systématiquement `a_verifier: true` — toute fiche issue du pipeline automatisé
 * doit passer par la revue humaine avant d'alimenter le produit (voir README).
 */
export function normalize(partial: Partial<Procedure>, source: SourceAdapter): Procedure {
  const titre = partial.titre?.trim() || "Titre à compléter";

  const base: Omit<Procedure, "embedding_text"> = {
    id: partial.id ?? slugify(titre),
    titre,
    aliases: partial.aliases ?? [],
    categorie: partial.categorie || "À compléter",
    organisme_principal: partial.organisme_principal || source.label,
    url_officielle: partial.url_officielle || "",
    formulaires: partial.formulaires ?? [],
    documents_requis: partial.documents_requis ?? [],
    etapes: partial.etapes ?? [],
    mode_possible:
      partial.mode_possible ?? {
        mandat: false,
        pilotage: true,
        commentaire_mandat:
          "Non déterminé automatiquement : à qualifier lors de la revue humaine avant mise en production.",
      },
    delais: partial.delais ?? { traitement_moyen: "", echeances_importantes: [] },
    couts: partial.couts ?? { gratuit: true, montant: null, details: "" },
    pieges_frequents: partial.pieges_frequents ?? [],
    publics_cibles: partial.publics_cibles ?? [],
    tags: partial.tags ?? [],
    derniere_mise_a_jour: new Date().toISOString().slice(0, 10),
    source_principale: partial.source_principale || source.baseUrl,
    notes_juridiques: partial.notes_juridiques ?? "",
    a_verifier: true,
  };

  return { ...base, embedding_text: buildEmbeddingText(base) };
}
