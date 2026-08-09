#!/usr/bin/env tsx
/**
 * Mécanisme de maintenance de la base de connaissances : signale les fiches dont
 * `derniere_mise_a_jour` dépasse le seuil de fraîcheur — les formulaires, montants
 * et démarches changent, une fiche non revisitée devient un risque silencieux.
 *
 * Usage : npm run kb:refresh-check [-- --seuil 60]
 */
import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.join(__dirname, "..", "data");
const DEFAULT_STALE_AFTER_DAYS = 90;

function daysSince(dateStr: string): number {
  const then = new Date(dateStr).getTime();
  if (Number.isNaN(then)) return Number.POSITIVE_INFINITY;
  return Math.floor((Date.now() - then) / (1000 * 60 * 60 * 24));
}

function main() {
  const args = process.argv.slice(2);
  const seuilIndex = args.indexOf("--seuil");
  const staleAfterDays =
    seuilIndex >= 0 && args[seuilIndex + 1] ? Number(args[seuilIndex + 1]) : DEFAULT_STALE_AFTER_DAYS;

  let files: string[];
  try {
    files = readdirSync(DATA_DIR).filter((f) => f.endsWith(".json"));
  } catch {
    console.log("Aucun dossier data/ — rien à contrôler.");
    return;
  }

  const stale: { file: string; age: number; titre: string }[] = [];

  for (const file of files) {
    const data = JSON.parse(readFileSync(path.join(DATA_DIR, file), "utf-8"));
    const age = daysSince(data.derniere_mise_a_jour);
    if (age > staleAfterDays) {
      stale.push({ file, age, titre: data.titre ?? "" });
    }
  }

  if (stale.length === 0) {
    console.log(`${files.length} fiche(s) contrôlée(s), aucune de plus de ${staleAfterDays} jours.`);
    return;
  }

  stale.sort((a, b) => b.age - a.age);
  console.log(`${stale.length}/${files.length} fiche(s) à recontrôler (> ${staleAfterDays} jours) :\n`);
  for (const s of stale) {
    console.log(`  - ${s.file} — "${s.titre}" — ${s.age} jours`);
  }
  console.log(
    `\nRelancer l'extraction sur ces sources (npm run kb:extract -- <source>) puis repasser en revue humaine avant remise en production.`
  );
}

main();
