// Source unique du modèle tarifaire IZY/D : trois formules d'abonnement
// cohérentes et progressives (Essentiel → Sérénité → Zen Total), chacune
// incluant tout ce qu'offre la précédente, plus une option "à la carte" sans
// engagement pour celles et ceux qui préfèrent payer démarche par démarche.
//
// Consommé par la landing (aperçu), /tarifs (détail complet + comparatif) et
// /app/profil (gestion de sa formule) — pour ne jamais afficher deux prix
// différents pour la même chose. Voir docs/03-fonctionnalites-mvp.md.

import type { SubscriptionStatus } from "./types";

export type PlanId = Exclude<SubscriptionStatus, "aucun">;

export interface Plan {
  id: PlanId;
  name: string;
  tagline: string;
  bestFor: string;
  monthlyPrice: number;
  /** Prix mensuel équivalent en cas de facturation annuelle ("2 mois offerts"). */
  annualMonthlyPrice: number;
  highlighted?: boolean;
  badge?: string;
  features: string[];
  footnote?: string;
}

export const PLANS: Plan[] = [
  {
    id: "essentiel",
    name: "Essentiel",
    tagline: "Pour ne plus rien oublier",
    bestFor: "Tu veux garder le contrôle, sans y penser tous les jours.",
    monthlyPrice: 9.9,
    annualMonthlyPrice: 8.25,
    features: [
      "Coffre-fort de documents illimité et chiffré",
      "Détection automatique de chaque démarche à traiter",
      "Checklist claire des pièces à fournir",
      "Rappels avant chaque échéance importante",
      "Tarifs à l'acte sur les démarches guidées ou prises en charge",
    ],
  },
  {
    id: "serenite",
    name: "Sérénité",
    tagline: "Pour ne plus jamais courir après une date limite",
    bestFor: "Tu as plusieurs démarches actives et zéro envie d'y penser.",
    monthlyPrice: 19.9,
    annualMonthlyPrice: 16.6,
    highlighted: true,
    badge: "Le plus choisi",
    features: [
      "Tout Essentiel, plus :",
      "Surveillance continue de toutes les échéances, multi-organismes",
      "Alertes anticipées, plusieurs semaines avant",
      "-20% sur toutes les démarches payées à l'acte",
      "1 démarche guidée offerte chaque mois",
      "Support prioritaire, réponse en moins de 24h",
    ],
  },
  {
    id: "zen_total",
    name: "Zen Total",
    tagline: "Pour ne plus jamais y toucher",
    bestFor: "Tu veux déléguer, point final — seul·e ou en famille.",
    monthlyPrice: 39.9,
    annualMonthlyPrice: 33.3,
    badge: "Le plus complet",
    features: [
      "Tout Sérénité, plus :",
      "Démarches guidées et déléguées illimitées, incluses",
      "Jusqu'à 3 profils (famille, proche aidé)",
      "Mandat de représentation permanent",
      "Un·e concierge dédié·e qui connaît le dossier",
      "Garantie zéro pénalité de retard*",
    ],
    footnote: "* Sur les démarches suivies dans l'abonnement.",
  },
];

export function findPlan(id: string): Plan | undefined {
  return PLANS.find((plan) => plan.id === id);
}

/** Tarifs "à la carte" : sans abonnement, on paye uniquement la démarche
 * lancée, selon sa complexité. Toujours disponible, y compris pour les
 * abonné·es (à tarif réduit selon la formule). */
export const ACTE_TIERS = [
  {
    name: "Identification + checklist",
    price: "Gratuit",
    description:
      "On identifie la démarche et on liste les pièces nécessaires. Sans engagement, pour toujours.",
  },
  {
    name: "Guidé simple (pilotage)",
    price: "29–49 €",
    description: "On pilote pas à pas jusqu'au bout.",
  },
  {
    name: "Standard / hybride",
    price: "59–99 €",
    description: "Préparation complète, validation finale, puis on transmet.",
  },
  {
    name: "Complexe / sensible",
    price: "129–249 €",
    description: "Titre de séjour, litiges, dossiers multi-organismes...",
  },
];

type ComparisonCell = boolean | string;

/** Comparatif complet affiché sur /tarifs. Colonnes : À la carte, Essentiel,
 * Sérénité, Zen Total — dans cet ordre. */
export const COMPARISON_ROWS: { label: string; cells: [ComparisonCell, ComparisonCell, ComparisonCell, ComparisonCell] }[] = [
  { label: "Coffre-fort de documents illimité et chiffré", cells: [true, true, true, true] },
  { label: "Détection automatique des démarches", cells: [true, true, true, true] },
  { label: "Checklist des pièces à fournir", cells: [true, true, true, true] },
  { label: "Rappels avant les échéances", cells: [false, true, true, true] },
  { label: "Surveillance continue, multi-organismes", cells: [false, false, true, true] },
  { label: "Réduction sur les démarches à l'acte", cells: [false, false, "-20%", "Incluses"] },
  { label: "Démarches guidées incluses chaque mois", cells: [false, false, "1", "Illimitées"] },
  { label: "Démarches déléguées (on s'en charge)", cells: ["À l'acte", "À l'acte", "À l'acte (-20%)", "Incluses"] },
  { label: "Profils supplémentaires (famille, aidant)", cells: [false, false, false, "Jusqu'à 3"] },
  { label: "Mandat de représentation permanent", cells: [false, false, false, true] },
  { label: "Support", cells: ["Standard", "Standard", "Prioritaire < 24h", "Concierge dédié"] },
];

export const COMPARISON_COLUMNS = ["À la carte", "Essentiel", "Sérénité", "Zen Total"] as const;
