#!/usr/bin/env tsx
/**
 * Orchestrateur d'extraction : source → pages brutes → parsing → normalisation →
 * validation de schéma → écriture dans knowledge-base/data/.
 *
 * Usage :
 *   npm run kb:extract -- service-public
 *   npm run kb:extract -- service-public --fixture knowledge-base/fixtures/service-public-carte-vitale.html
 *
 * Le mode `--fixture` lit un fichier HTML local au lieu de faire une requête
 * réseau — c'est ce qui permet de faire tourner et de vérifier tout le pipeline
 * dans un environnement sans accès à service-public.fr / ants.gouv.fr / etc.
 * (voir knowledge-base/README.md, section réseau). Sans `--fixture`, ce script
 * effectue de vraies requêtes HTTP vers la source choisie.
 */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { ProcedureSchema } from "../schema/procedure.schema";
import { findSource, sources } from "../sources";
import { normalize } from "./normalize";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.join(__dirname, "..", "data");

async function fetchHtml(url: string): Promise<string> {
  const res = await fetch(url, {
    headers: { "User-Agent": "SerenioKnowledgeBase/0.1 (+contact@serenio.fr)" },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} pour ${url}`);
  return res.text();
}

async function run() {
  const args = process.argv.slice(2);
  const sourceId = args[0];

  if (!sourceId) {
    console.error(`Usage : npm run kb:extract -- <source> [--fixture <chemin>]`);
    console.error(`Sources disponibles : ${sources.map((s) => s.id).join(", ")}`);
    process.exit(1);
  }

  const source = findSource(sourceId);
  if (!source) {
    console.error(`Source inconnue : "${sourceId}". Disponibles : ${sources.map((s) => s.id).join(", ")}`);
    process.exit(1);
  }

  const fixtureFlagIndex = args.indexOf("--fixture");
  const fixturePath = fixtureFlagIndex >= 0 ? args[fixtureFlagIndex + 1] : null;

  const urls = fixturePath ? [fixturePath] : await source.listCandidateUrls();
  if (urls.length === 0) {
    console.log(`Aucune URL à traiter pour ${source.label}.`);
    return;
  }
  console.log(`${urls.length} page(s) à traiter pour ${source.label}${fixturePath ? " (mode fixture)" : ""}.`);

  mkdirSync(DATA_DIR, { recursive: true });

  let ok = 0;
  let failed = 0;

  for (const target of urls) {
    try {
      const html = fixturePath ? readFileSync(fixturePath, "utf-8") : await fetchHtml(target);
      const pageUrl = fixturePath ? urls[0] : target;
      const partial = source.parse({ url: pageUrl, html, fetchedAt: new Date().toISOString() });
      const record = normalize(partial, source);

      const result = ProcedureSchema.safeParse(record);
      if (!result.success) {
        failed++;
        console.error(`✗ Échec de validation pour ${target}`);
        for (const issue of result.error.issues) {
          console.error(`   - ${issue.path.join(".")}: ${issue.message}`);
        }
        continue;
      }

      const outPath = path.join(DATA_DIR, `${result.data.id}.json`);
      writeFileSync(outPath, `${JSON.stringify(result.data, null, 2)}\n`, "utf-8");
      ok++;
      console.log(`✓ ${result.data.id} → data/${path.basename(outPath)} (a_verifier: ${result.data.a_verifier})`);
    } catch (err) {
      failed++;
      console.error(`✗ ${target} : ${(err as Error).message}`);
    }
  }

  console.log(`\n${ok} fiche(s) écrite(s), ${failed} échec(s).`);
  console.log(
    `Rappel : toute fiche écrite ici a \`a_verifier: true\` et ne doit pas être servie en\nproduction avant la revue humaine décrite dans knowledge-base/README.md.`
  );
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
