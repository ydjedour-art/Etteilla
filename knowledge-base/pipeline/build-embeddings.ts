#!/usr/bin/env tsx
/**
 * Recalcule `embedding_text` pour toutes les fiches à partir de leurs autres
 * champs, et réécrit le fichier si le texte a changé (ex. après une correction
 * manuelle du titre ou des documents requis en revue humaine).
 *
 * Usage : npm run kb:build-embeddings
 */
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { ProcedureSchema } from "../schema/procedure.schema";
import { buildEmbeddingText } from "./embedding-text";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.join(__dirname, "..", "data");

function main() {
  let files: string[];
  try {
    files = readdirSync(DATA_DIR).filter((f) => f.endsWith(".json"));
  } catch {
    console.log("Aucun dossier data/ — rien à faire.");
    return;
  }

  let updated = 0;

  for (const file of files) {
    const filePath = path.join(DATA_DIR, file);
    const json = JSON.parse(readFileSync(filePath, "utf-8"));
    const result = ProcedureSchema.safeParse(json);
    if (!result.success) {
      console.error(`✗ ${file} ignoré (invalide) — lancer kb:validate pour le détail`);
      continue;
    }

    const { embedding_text: _current, ...rest } = result.data;
    const nextEmbeddingText = buildEmbeddingText(rest);

    if (nextEmbeddingText !== result.data.embedding_text) {
      const next = { ...result.data, embedding_text: nextEmbeddingText };
      writeFileSync(filePath, `${JSON.stringify(next, null, 2)}\n`, "utf-8");
      updated++;
      console.log(`↻ ${file} — embedding_text mis à jour`);
    }
  }

  console.log(`\n${updated}/${files.length} fiche(s) mise(s) à jour.`);
}

main();
