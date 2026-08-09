import * as cheerio from "cheerio";
import type { Procedure } from "../schema/procedure.schema";
import { summarize, text, textList } from "./dom-utils";
import type { RawPage, SourceAdapter } from "./types";

// impots.gouv.fr (DGFiP) : déclaration de revenus, contestations d'impôts. La
// déclaration de revenus impose une authentification personnelle (espace
// particulier impots.gouv.fr) — mode pilotage par défaut, mandat exclu sauf cas
// très spécifiques (à qualifier juridiquement).
// TODO calibrer les sélecteurs contre le HTML réel.

const PRIORITY_PATHS = [
  "particulier/questions/comment-declarer-mes-revenus",
  "particulier/questions/comment-contester-mon-impot",
];

export const impots: SourceAdapter = {
  id: "impots",
  label: "impots.gouv.fr",
  baseUrl: "https://www.impots.gouv.fr",

  async listCandidateUrls(): Promise<string[]> {
    return PRIORITY_PATHS.map((p) => `${impots.baseUrl}/${p}`);
  },

  parse(page: RawPage): Partial<Procedure> {
    const $ = cheerio.load(page.html);
    const titre = text($, "h1");
    const etapes = textList($, ".contenu-etapes li, ol li").map((description, index) => ({
      ordre: index + 1,
      titre: summarize(description),
      description,
      type: "action_utilisateur" as const,
      lien_utile: null,
    }));

    return {
      titre,
      categorie: "Impôts",
      organisme_principal: "DGFiP",
      url_officielle: page.url,
      etapes,
      mode_possible: {
        mandat: false,
        pilotage: true,
        commentaire_mandat:
          "La déclaration se fait via l'espace particulier authentifié du contribuable ; le mandat n'est pertinent que pour des démarches connexes (réclamations écrites), à qualifier au cas par cas.",
      },
      source_principale: page.url,
    };
  },
};
