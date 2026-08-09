import * as cheerio from "cheerio";
import type { Procedure } from "../schema/procedure.schema";
import { text, textList } from "./dom-utils";
import type { RawPage, SourceAdapter } from "./types";

// caf.fr : RSA, APL, Prime d'activité — cœur du segment "High friction / High
// non-recours" (~10 Md€ d'aides non réclamées chaque année selon la DREES).
// TODO calibrer les sélecteurs contre le HTML réel.

const PRIORITY_PATHS = [
  "allocataires/aides-et-demarches/droits-et-prestations/logement/allocations-de-logement",
  "allocataires/aides-et-demarches/droits-et-prestations/agir-en-cas-de/rsa",
  "allocataires/aides-et-demarches/droits-et-prestations/agir-en-cas-de/prime-dactivite",
];

export const caf: SourceAdapter = {
  id: "caf",
  label: "caf.fr",
  baseUrl: "https://www.caf.fr",

  async listCandidateUrls(): Promise<string[]> {
    return PRIORITY_PATHS.map((p) => `${caf.baseUrl}/${p}`);
  },

  parse(page: RawPage): Partial<Procedure> {
    const $ = cheerio.load(page.html);
    const titre = text($, "h1");
    const documentsRequis = textList($, ".documents-necessaires li, .liste-pieces li").map(
      (nom) => ({ nom, obligatoire: true, description: "", exemples: [] as string[], conditions: null })
    );

    return {
      titre,
      categorie: "Aides & allocations",
      organisme_principal: "CAF",
      url_officielle: page.url,
      documents_requis: documentsRequis,
      couts: { gratuit: true, montant: null, details: "" },
      tags: ["high_friction", "non_recours"],
      source_principale: page.url,
    };
  },
};
