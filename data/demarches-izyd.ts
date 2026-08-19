// Mapping éditorial entre les 10 démarches prises en charge par IZY/D
// (src/lib/mock-data.ts) et le corpus de fiches Service-Public.gouv.fr
// (data/fiches.jsonl → data/generated/). Fichier tenu à la main, pas généré
// — voir scripts/build-arborescence.ts pour tout ce qui l'est.
//
// Règle stricte respectée ici : aucun ficheId n'a été deviné. Quand aucune
// correspondance fiable n'a été trouvée dans le corpus, `ficheIds` reste
// vide et `confiance` vaut "todo" — avec une note qui explique pourquoi.
// Voir data/README.md pour le détail de la méthode de recherche utilisée.
//
// `niveau` et `tempsEstimeMinutes` dupliquent volontairement
// automationLevel/estimatedDurationMinutes de src/lib/mock-data.ts (à tenir
// synchronisés si l'un des deux change — ce fichier est éditorial, pas
// dérivé automatiquement du mock).

import type { AutomationLevel } from "@/lib/types";

export interface DemarcheIzydMapping {
  /** Doit correspondre à un slug de src/lib/mock-data.ts::formalityTemplates. */
  templateSlug: string;
  emoji: string;
  niveau: AutomationLevel;
  tempsEstimeMinutes: number;
  /** ficheId (F123…) du corpus, uniquement quand la correspondance est
   * confirmée ou raisonnablement pertinente — jamais devinée au hasard. */
  ficheIds: string[];
  confiance: "confirmee" | "partielle" | "todo";
  /** Explique la confiance ci-dessus : ce qui est couvert, ce qui manque. */
  note: string;
  /** Dossier de l'arborescence à proposer en exploration complémentaire,
   * quand un dossier pertinent existe même sans fiche unique idéale. */
  dossierRef?: { theme: string; dossier: string };
}

export const DEMARCHES_IZYD: DemarcheIzydMapping[] = [
  {
    templateSlug: "declaration-revenus",
    emoji: "📑",
    niveau: "pre_rempli",
    tempsEstimeMinutes: 10,
    ficheIds: ["F358", "F359"],
    confiance: "confirmee",
    note: "Correspondance directe : la déclaration annuelle (F358) et sa date limite (F359).",
    dossierRef: {
      theme: "argent-impots-consommation",
      dossier: "impot-sur-le-revenu-declaration-et-revenus-a-declarer",
    },
  },
  {
    templateSlug: "mise-a-jour-caf",
    emoji: "🏠",
    niveau: "delegue",
    tempsEstimeMinutes: 5,
    ficheIds: ["F14199"],
    confiance: "partielle",
    note:
      "Pas de fiche « mise à jour de dossier CAF » dédiée dans le corpus. F14199 (déclarer ses ressources à la Caf/MSA) est le cas d'usage le plus proche trouvé.",
    dossierRef: { theme: "famille-scolarite", dossier: "allocations-destinees-aux-familles" },
  },
  {
    templateSlug: "declaration-ca-urssaf",
    emoji: "💼",
    niveau: "pre_rempli",
    tempsEstimeMinutes: 5,
    ficheIds: [], // TODO — voir la note.
    confiance: "todo",
    note:
      "Aucune correspondance trouvée. Ce corpus (service-public.gouv.fr, espace « particuliers ») ne couvre pas les démarches d'entreprise/indépendant (URSSAF, micro-entreprise, chiffre d'affaires) : il faudrait le jeu de données « professionnels » de la DILA, non fourni ici.",
  },
  {
    templateSlug: "renouvellement-titre-sejour",
    emoji: "🛂",
    niveau: "guide",
    tempsEstimeMinutes: 15,
    ficheIds: ["F39"], // Vue d'ensemble uniquement — voir la note.
    confiance: "partielle",
    note:
      "Pas de fiche « renouvellement » générique : chaque type de titre (salarié, étudiant, vie privée et familiale…) a sa propre fiche dans le corpus. F39 donne une vue d'ensemble des titres requis ; le dossier complet (58 fiches) couvre chaque situation spécifiquement — à affiner selon le titre détenu par l'utilisateur, pas de fiche à choisir au hasard.",
    dossierRef: {
      theme: "etranger-europe",
      dossier: "titres-cartes-de-sejour-et-documents-de-circulation-pour-etranger-en-france",
    },
  },
  {
    templateSlug: "rattachement-cpam",
    emoji: "🏥",
    niveau: "guide",
    tempsEstimeMinutes: 8,
    ficheIds: ["F265"],
    confiance: "confirmee",
    note: "Correspondance directe : fiche de présentation de la carte Vitale.",
    dossierRef: { theme: "social-sante", dossier: "remboursement-des-soins-par-la-securite-sociale" },
  },
  {
    templateSlug: "changement-adresse",
    emoji: "✉️",
    niveau: "delegue",
    tempsEstimeMinutes: 3,
    ficheIds: ["F383"],
    confiance: "partielle",
    note:
      "Seule la fiche impôts (F383) a été trouvée. Le corpus n'a pas de fiche « changement d'adresse » dédiée pour la CAF, la mutuelle ou l'assurance — la démarche IZY/D couvre plus large que ce que documente ce corpus.",
  },
  {
    templateSlug: "renouvellement-mutuelle",
    emoji: "🏥",
    niveau: "pre_rempli",
    tempsEstimeMinutes: 5,
    ficheIds: ["F20314"],
    confiance: "partielle",
    note:
      "F20314 est une fiche de présentation générale de la complémentaire santé, pas un guide de renouvellement pas à pas — le corpus n'en a pas.",
    dossierRef: {
      theme: "social-sante",
      dossier: "complementaire-sante-mutuelle-et-complementaire-sante-solidaire",
    },
  },
  {
    templateSlug: "demande-aide-departement",
    emoji: "🏠",
    niveau: "guide",
    tempsEstimeMinutes: 12,
    ficheIds: ["F10009"],
    confiance: "confirmee",
    note: "Correspondance directe : l'allocation personnalisée d'autonomie (Apa).",
    dossierRef: { theme: "social-sante", dossier: "allocations-et-aides-aux-personnes-agees" },
  },
  {
    templateSlug: "perte-emploi-france-travail",
    emoji: "✉️",
    niveau: "guide",
    tempsEstimeMinutes: 10,
    ficheIds: ["F1636"],
    confiance: "confirmee",
    note: "Correspondance directe : l'inscription à France Travail (ex-Pôle emploi).",
    dossierRef: {
      theme: "social-sante",
      dossier: "chomage-demarches-aupres-de-france-travail-anciennement-pole-emploi",
    },
  },
  {
    templateSlug: "naissance-enfant",
    emoji: "✉️",
    niveau: "delegue",
    tempsEstimeMinutes: 5,
    ficheIds: ["F961"],
    confiance: "confirmee",
    note: "Correspondance directe : la déclaration de naissance.",
    dossierRef: { theme: "famille-scolarite", dossier: "naissance-et-filiation" },
  },
];

export function findDemarcheMapping(templateSlug: string): DemarcheIzydMapping | undefined {
  return DEMARCHES_IZYD.find((m) => m.templateSlug === templateSlug);
}
