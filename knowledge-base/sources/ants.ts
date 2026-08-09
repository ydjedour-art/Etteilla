import * as cheerio from "cheerio";
import type { Procedure } from "../schema/procedure.schema";
import { summarize, text, textList } from "./dom-utils";
import type { RawPage, SourceAdapter } from "./types";

// ants.gouv.fr (Agence Nationale des Titres Sécurisés) : source de référence pour
// carte grise, permis de conduire, passeport/CNI — le cœur du segment "High
// volume". Beaucoup de ces démarches se font désormais via le téléservice
// immatriculation.ants.gouv.fr plutôt que par formulaire papier : le champ
// `formulaires[].type` doit refléter cette réalité une fois calibré.
// TODO calibrer les sélecteurs contre le HTML réel (pas d'accès réseau ici).

const PRIORITY_PATHS = [
  "demarche/carte-grise-immatriculation", // slug illustratif
  "demarche/permis-de-conduire",
  "demarche/passeport",
  "demarche/carte-nationale-identite",
];

export const ants: SourceAdapter = {
  id: "ants",
  label: "ants.gouv.fr",
  baseUrl: "https://www.ants.gouv.fr",

  async listCandidateUrls(): Promise<string[]> {
    return PRIORITY_PATHS.map((p) => `${ants.baseUrl}/${p}`);
  },

  parse(page: RawPage): Partial<Procedure> {
    const $ = cheerio.load(page.html);
    const titre = text($, "h1");
    const documentsRequis = textList($, ".documents-requis li, .pieces-justificatives li").map(
      (nom) => ({ nom, obligatoire: true, description: "", exemples: [] as string[], conditions: null })
    );
    const etapes = textList($, ".etapes li, ol.demarche-etapes li").map((description, index) => ({
      ordre: index + 1,
      titre: summarize(description),
      description,
      type: "action_utilisateur" as const,
      lien_utile: null,
    }));

    return {
      titre,
      categorie: "",
      organisme_principal: "ANTS",
      url_officielle: page.url,
      documents_requis: documentsRequis,
      etapes,
      // La plupart des démarches ANTS imposent une identification personnelle
      // (FranceConnect) : mode par défaut prudent, à confirmer en revue humaine.
      mode_possible: {
        mandat: false,
        pilotage: true,
        commentaire_mandat:
          "À qualifier : de nombreuses démarches ANTS nécessitent une authentification FranceConnect personnelle, incompatible avec un mandat de représentation classique.",
      },
      source_principale: page.url,
    };
  },
};
