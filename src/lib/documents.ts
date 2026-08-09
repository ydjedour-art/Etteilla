import type { VaultDocument } from "./types";

/** Rapproche les pièces requises par une démarche de ce qui est déjà dans le
 * coffre-fort, pour ne jamais redemander ce qu'on a déjà — cœur du principe
 * « on ne demande que les papiers nécessaires » (docs/01-vision-produit.md). */
export function computeMissingDocuments(
  required: string[],
  vault: VaultDocument[]
): string[] {
  return required.filter(
    (req) =>
      !vault.some(
        (doc) =>
          req.toLowerCase().includes(doc.type.toLowerCase()) ||
          doc.type.toLowerCase().includes(req.toLowerCase())
      )
  );
}
