import type { Procedure } from "../schema/procedure.schema";

/**
 * Construit le texte optimisé pour embedding (titre + résumé + documents clés +
 * étapes + pièges) — champ `embedding_text` du schéma, utilisé par le RAG qui
 * alimente le classificateur d'intention et l'assistant.
 *
 * Déterministe et pure : recalculable à tout moment à partir des autres champs
 * (voir `npm run kb:build-embeddings`), jamais une source de vérité en soi.
 */
export function buildEmbeddingText(p: Omit<Procedure, "embedding_text">): string {
  const parts: string[] = [];

  parts.push(p.titre);

  if (p.aliases.length > 0) {
    parts.push(`Aussi appelé : ${p.aliases.join(", ")}.`);
  }

  parts.push(`Catégorie : ${p.categorie}. Organisme : ${p.organisme_principal}.`);

  if (p.documents_requis.length > 0) {
    const noms = p.documents_requis.map((d) => d.nom);
    parts.push(`Documents nécessaires : ${noms.join(", ")}.`);
  }

  if (p.etapes.length > 0) {
    const titres = [...p.etapes]
      .sort((a, b) => a.ordre - b.ordre)
      .map((e) => e.titre);
    parts.push(`Étapes : ${titres.join(" → ")}.`);
  }

  if (p.mode_possible.mandat) {
    parts.push("Peut être réalisé par mandat de représentation.");
  }
  if (p.mode_possible.pilotage) {
    parts.push("Peut être piloté pas à pas par l'utilisateur.");
  }

  if (!p.couts.gratuit) {
    parts.push(`Démarche payante${p.couts.montant ? ` (${p.couts.montant} €)` : ""}.`);
  }

  if (p.pieges_frequents.length > 0) {
    parts.push(`Pièges fréquents : ${p.pieges_frequents.join(" ; ")}.`);
  }

  if (p.publics_cibles.length > 0) {
    parts.push(`Public concerné : ${p.publics_cibles.join(", ")}.`);
  }

  return parts.filter(Boolean).join(" ");
}
