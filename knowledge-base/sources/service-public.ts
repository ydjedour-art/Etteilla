import * as cheerio from "cheerio";
import type { Procedure } from "../schema/procedure.schema";
import { extractCerfaNumber, resolveUrl, summarize, text, textList } from "./dom-utils";
import type { RawPage, SourceAdapter } from "./types";

// service-public.fr est la source la plus générique du catalogue : elle couvre la
// majorité des démarches "High volume" et "High friction" de la priorisation
// (voir knowledge-base/README.md). Les sélecteurs ci-dessous sont écrits à partir
// de la structure connue des fiches pratiques (titre, "Documents à fournir",
// étapes numérotées, encart Cerfa) — // TODO calibrer contre le HTML réel avant
// toute mise en production, cet environnement n'ayant pas d'accès au site.

// Démarches prioritaires à couvrir en premier (liste de travail, pas exhaustive) —
// voir knowledge-base/README.md "Priorisation des démarches".
const PRIORITY_SLUGS = [
  "vosdroits/F1234", // Carte Vitale : première demande (slug illustratif)
  "vosdroits/N1234", // RSA
  "vosdroits/F1235", // Prime d'activité
  "vosdroits/F1236", // Changement d'adresse
  "vosdroits/F1237", // Inscription sur les listes électorales
];

export const servicePublic: SourceAdapter = {
  id: "service-public",
  label: "service-public.fr",
  baseUrl: "https://www.service-public.fr",

  async listCandidateUrls(): Promise<string[]> {
    // Nécessite un accès réseau pour parcourir les pages d'index par thème et
    // résoudre les vraies URLs de fiches (les slugs ci-dessus sont illustratifs).
    // Voir README pour lancer l'extraction une fois le réseau disponible.
    return PRIORITY_SLUGS.map((slug) => `${servicePublic.baseUrl}/particuliers/${slug}`);
  },

  parse(page: RawPage): Partial<Procedure> {
    const $ = cheerio.load(page.html);

    const titre = text($, "h1.fiche-titre, h1");
    const intro = text($, ".fiche-intro p");
    const documentsRequis = textList($, ".fiche-documents .liste-documents li").map(
      (nom) => ({
        nom,
        obligatoire: true, // TODO calibrer : distinguer optionnel/conditionnel une fois le HTML réel connu
        description: "",
        exemples: [] as string[],
        conditions: null,
      })
    );

    const etapes = textList($, ".fiche-etapes .liste-etapes li").map((description, index) => ({
      ordre: index + 1,
      titre: summarize(description),
      description,
      type: "action_utilisateur" as const,
      lien_utile: null,
    }));

    const cerfaLinkText = text($, ".fiche-formulaire .lien-cerfa");
    const cerfaHref = $(".fiche-formulaire .lien-cerfa").attr("href");
    const cerfaNumber = extractCerfaNumber(cerfaLinkText);
    const formulaires = cerfaLinkText
      ? [
          {
            nom: cerfaLinkText.replace(/cerfa[^—-]*[—-]\s*/i, "").trim() || cerfaLinkText,
            cerfa: cerfaNumber,
            url: resolveUrl(page.url, cerfaHref) ?? "",
            type: "both" as const, // TODO calibrer : pdf vs. téléservice en ligne
          },
        ]
      : [];

    const coutText = text($, ".fiche-cout p");
    const gratuit = /gratuit/i.test(coutText);

    return {
      titre,
      categorie: "", // laissé à la revue humaine : dépend d'une taxonomie produit, pas du HTML source
      organisme_principal: "",
      url_officielle: page.url,
      formulaires,
      documents_requis: documentsRequis,
      etapes,
      delais: { traitement_moyen: "", echeances_importantes: [] },
      couts: { gratuit, montant: null, details: coutText },
      notes_juridiques: text($, ".fiche-references p"),
      source_principale: page.url,
      // `intro` est conservé pour aider la revue humaine à rédiger un `titre`/des
      // `aliases` pertinents ; non mappé directement sur un champ du schéma.
      aliases: intro ? [] : [],
    };
  },
};
