import { formalityTemplates } from "@/lib/mock-data";
import type { FormalityTemplate } from "@/lib/types";

// Détection de démarche à partir d'une situation décrite en langage libre.
//
// Ici : un appariement par mots-clés, qui simule côté prototype ce que fera
// l'assistant IA en production (Claude + RAG sur le catalogue de démarches,
// voir docs/04-architecture-technique.md). Le contrat reste le même dans les
// deux cas : texte libre → une ou plusieurs démarches candidates.

interface KeywordRule {
  slug: string;
  keywords: string[];
}

const RULES: KeywordRule[] = [
  {
    slug: "renouvellement-titre-sejour",
    keywords: ["titre de séjour", "titre de sejour", "carte de séjour", "carte de sejour", "visa", "anef", "préfecture", "prefecture", "renouveler mon titre"],
  },
  {
    slug: "declaration-revenus",
    keywords: ["impôt", "impot", "déclaration de revenus", "declaration de revenus", "avis d'imposition", "revenus"],
  },
  {
    slug: "declaration-ca-urssaf",
    keywords: ["urssaf", "auto-entrepreneur", "auto entrepreneur", "micro-entrepreneur", "micro entrepreneur", "chiffre d'affaires", "chiffre d affaires", "cotisation"],
  },
  {
    slug: "mise-a-jour-caf",
    keywords: ["caf", "allocation", "quotient familial", "aide au logement", "apl"],
  },
  {
    slug: "rattachement-cpam",
    keywords: ["carte vitale", "cpam", "sécu", "secu", "sécurité sociale", "securite sociale"],
  },
  {
    slug: "changement-adresse",
    keywords: ["déménage", "demenage", "déménagement", "demenagement", "nouvelle adresse", "changement d'adresse", "changement d adresse"],
  },
  {
    slug: "renouvellement-mutuelle",
    keywords: ["mutuelle", "complémentaire santé", "complementaire sante"],
  },
  {
    slug: "demande-aide-departement",
    keywords: ["apa", "personne âgée", "personne agee", "parent âgé", "parent age", "dépendance", "dependance"],
  },
  {
    slug: "perte-emploi-france-travail",
    keywords: ["perdu mon travail", "perdu mon emploi", "licenci", "chômage", "chomage", "pôle emploi", "pole emploi", "france travail", "perte d'emploi", "perte d emploi", "viré", "vire"],
  },
  {
    slug: "naissance-enfant",
    keywords: ["naissance", "bébé", "bebe", "accouch", "nouveau-né", "nouveau ne", "j'attends un enfant", "future maman"],
  },
];

export interface DetectionResult {
  template: FormalityTemplate;
  matchedKeywords: string[];
}

export function detectFormalities(query: string): DetectionResult[] {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return [];

  const results: DetectionResult[] = [];
  for (const rule of RULES) {
    const matched = rule.keywords.filter((keyword) => normalized.includes(keyword));
    if (matched.length === 0) continue;
    const template = formalityTemplates.find((t) => t.slug === rule.slug);
    if (template) results.push({ template, matchedKeywords: matched });
  }

  return results
    .sort((a, b) => b.matchedKeywords.length - a.matchedKeywords.length)
    .slice(0, 3);
}
