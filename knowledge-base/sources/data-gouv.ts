import * as cheerio from "cheerio";
import type { Procedure } from "../schema/procedure.schema";
import { text } from "./dom-utils";
import type { RawPage, SourceAdapter } from "./types";

// data.gouv.fr n'est pas une source de fiches de démarches comme les autres : c'est
// un catalogue de jeux de données ouvertes (listes de formulaires Cerfa, référentiels
// d'organismes, données de non-recours DREES...). Dans le pipeline, elle sert
// surtout à ENRICHIR des fiches existantes (ex. vérifier qu'un Cerfa cité est bien à
// jour) plutôt qu'à générer des fiches complètes de bout en bout — ce parseur reste
// volontairement minimal, il extrait les métadonnées du jeu de données pour la revue
// humaine plutôt que de tenter de mapper directement sur `ProcedureSchema`.
// TODO calibrer contre le HTML réel une fois le réseau disponible.

export const dataGouv: SourceAdapter = {
  id: "data-gouv",
  label: "data.gouv.fr",
  baseUrl: "https://www.data.gouv.fr",

  async listCandidateUrls(): Promise<string[]> {
    // En pratique, on interrogerait l'API publique data.gouv.fr
    // (https://www.data.gouv.fr/api/1/datasets/?tag=demarches-administratives)
    // plutôt que de scraper des pages HTML — laissé en TODO, hors scope du
    // scraping HTML générique des autres sources.
    return [];
  },

  parse(page: RawPage): Partial<Procedure> {
    const $ = cheerio.load(page.html);
    const titre = text($, "h1");
    const description = text($, ".dataset-description, .description");

    return {
      titre,
      categorie: "Référentiel (enrichissement)",
      organisme_principal: "data.gouv.fr",
      url_officielle: page.url,
      notes_juridiques: description,
      source_principale: page.url,
    };
  },
};
