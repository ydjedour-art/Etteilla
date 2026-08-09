import * as cheerio from "cheerio";
import type { Procedure } from "../schema/procedure.schema";
import { text, textList } from "./dom-utils";
import type { RawPage, SourceAdapter } from "./types";

// ameli.fr (Assurance Maladie) : Carte Vitale, rattachement, indemnités
// journalières, Complémentaire Santé Solidaire (segment "High friction / non-recours").
// TODO calibrer les sélecteurs contre le HTML réel.

const PRIORITY_PATHS = [
  "assure/droits-demarches/demarches/carte-vitale",
  "assure/droits-demarches/complementaire-sante-solidaire",
];

export const ameli: SourceAdapter = {
  id: "ameli",
  label: "ameli.fr",
  baseUrl: "https://www.ameli.fr",

  async listCandidateUrls(): Promise<string[]> {
    return PRIORITY_PATHS.map((p) => `${ameli.baseUrl}/${p}`);
  },

  parse(page: RawPage): Partial<Procedure> {
    const $ = cheerio.load(page.html);
    const titre = text($, "h1");
    const documentsRequis = textList($, ".pieces-a-fournir li, .liste-documents li").map(
      (nom) => ({ nom, obligatoire: true, description: "", exemples: [] as string[], conditions: null })
    );

    return {
      titre,
      categorie: "Santé",
      organisme_principal: "CPAM (Assurance Maladie)",
      url_officielle: page.url,
      documents_requis: documentsRequis,
      couts: { gratuit: true, montant: null, details: "" },
      source_principale: page.url,
    };
  },
};
