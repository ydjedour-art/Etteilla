#!/usr/bin/env tsx
/**
 * Valide toutes les fiches de knowledge-base/data/ contre ProcedureSchema.
 * Usage : npm run kb:validate
 * Sortie non-zéro si au moins une fiche est invalide (utilisable en CI).
 */
import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { ProcedureSchema } from "../schema/procedure.schema";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.join(__dirname, "..", "data");

function main() {
  let files: string[];
  try {
    files = readdirSync(DATA_DIR).filter((f) => f.endsWith(".json"));
  } catch {
    console.log("Aucun dossier data/ — rien à valider.");
    return;
  }

  if (files.length === 0) {
    console.log("Aucune fiche dans knowledge-base/data/.");
    return;
  }

  let errorCount = 0;
  let toReviewCount = 0;

  for (const file of files) {
    const raw = readFileSync(path.join(DATA_DIR, file), "utf-8");
    let json: unknown;
    try {
      json = JSON.parse(raw);
    } catch (err) {
      errorCount++;
      console.error(`✗ ${file} : JSON invalide (${(err as Error).message})`);
      continue;
    }

    const result = ProcedureSchema.safeParse(json);
    if (!result.success) {
      errorCount++;
      console.error(`✗ ${file}`);
      for (const issue of result.error.issues) {
        console.error(`   - ${issue.path.join(".") || "(racine)"}: ${issue.message}`);
      }
      continue;
    }

    if (result.data.a_verifier) {
      toReviewCount++;
      console.log(`⚠ ${file} — conforme au schéma, à vérifier avant mise en production`);
    } else {
      console.log(`✓ ${file} — conforme, revue effectuée`);
    }
  }

  console.log(
    `\n${files.length} fiche(s) — ${errorCount} erreur(s) de schéma, ${toReviewCount} en attente de revue humaine.`
  );

  if (errorCount > 0) process.exit(1);
}

main();
