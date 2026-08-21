// Recherche rapide par mots-clés sur l'index des 2999 fiches — étape 2/3 du
// triage IA (voir src/app/api/triage/route.ts) : on réduit le corpus complet
// à une dizaine de candidats plausibles AVANT d'appeler l'IA, qui ne voit
// jamais les 2999 fiches d'un coup (trop cher, trop lent, et le modèle
// choisirait moins bien noyé dans le volume).
//
// Pondération simple, pas de dépendance externe (pas d'embeddings) : le
// titre compte plus que le chapô, qui compte plus que le thème/dossier.
// Suffisant pour ramener un lot pertinent en dessous de la seconde.

import type { FicheIndexEntry } from "@/types/fiches";

const STOPWORDS = new Set([
  "le", "la", "les", "l", "un", "une", "des", "de", "du", "d", "et", "ou", "a",
  "au", "aux", "ce", "cet", "cette", "ces", "je", "j", "tu", "il", "elle",
  "on", "nous", "vous", "ils", "elles", "mon", "ma", "mes", "ton", "ta",
  "tes", "son", "sa", "ses", "que", "qui", "quoi", "dont", "où", "pour",
  "par", "avec", "sans", "sur", "sous", "dans", "en", "est", "suis", "es",
  "sont", "être", "avoir", "ai", "as", "avons", "avez", "ont", "pas", "plus",
  "très", "bien", "faire", "fait", "comment", "quand", "si",
]);

function normalize(text: string): string {
  return text
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();
}

function tokenize(text: string): string[] {
  return normalize(text)
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((t) => t.length > 1 && !STOPWORDS.has(t));
}

// Reformulations courantes → vocabulaire du corpus. Sans ça, une phrase comme
// "j'ai perdu mon travail" est noyée par "travail", mot générique présent
// dans des centaines de fiches sans rapport (accident du travail, heures de
// travail...), et la bonne fiche (inscription à France Travail) sort du top
// 12. Même logique que src/lib/detect.ts, en plus large : on n'ajoute jamais
// de fiche directement, seulement des mots-clés supplémentaires à la
// recherche.
const SYNONYM_TRIGGERS: { trigger: string; expand: string }[] = [
  { trigger: "perdu mon travail", expand: "chômage licenciement pôle emploi france travail inscription" },
  { trigger: "perdu mon emploi", expand: "chômage licenciement pôle emploi france travail inscription" },
  { trigger: "perdu son emploi", expand: "chômage licenciement pôle emploi france travail inscription" },
  { trigger: "licenci", expand: "chômage pôle emploi france travail" },
  { trigger: "viré", expand: "chômage licenciement pôle emploi france travail" },
  { trigger: "au chômage", expand: "pôle emploi france travail inscription" },
  { trigger: "au chomage", expand: "pôle emploi france travail inscription" },
  { trigger: "déménag", expand: "adresse domicile" },
  { trigger: "demenag", expand: "adresse domicile" },
  { trigger: "nouvelle adresse", expand: "déménagement domicile" },
  { trigger: "attend un enfant", expand: "naissance grossesse aides financières" },
  { trigger: "attends un enfant", expand: "naissance grossesse aides financières" },
  { trigger: "future maman", expand: "naissance grossesse aides financières" },
  { trigger: "bébé", expand: "naissance enfant" },
  { trigger: "bebe", expand: "naissance enfant" },
  { trigger: "carte vitale", expand: "sécurité sociale assurance maladie" },
  { trigger: "auto-entrepreneur", expand: "micro-entreprise cotisations" },
  { trigger: "micro-entrepreneur", expand: "auto-entreprise cotisations" },
];

function expandTokens(query: string, tokens: string[]): string[] {
  const normalized = normalize(query);
  const extra = SYNONYM_TRIGGERS.filter((s) => normalized.includes(s.trigger))
    .map((s) => s.expand)
    .join(" ");
  return extra ? [...tokens, ...tokenize(extra)] : tokens;
}

export interface ScoredFiche {
  entry: FicheIndexEntry;
  score: number;
}

/** Retourne les `limit` fiches les plus pertinentes pour `query`, triées par
 * score décroissant. Score nul exclu (mieux vaut renvoyer moins de 12
 * candidats que des candidats hors sujet). */
export function searchFiches(
  index: FicheIndexEntry[],
  query: string,
  limit = 12
): ScoredFiche[] {
  const tokens = expandTokens(query, tokenize(query));
  if (tokens.length === 0) return [];

  const scored: ScoredFiche[] = [];
  for (const entry of index) {
    const titre = normalize(entry.titre);
    const description = normalize(entry.description);
    const contexte = normalize(`${entry.theme} ${entry.dossier ?? ""}`);

    let score = 0;
    for (const token of tokens) {
      if (titre.includes(token)) score += 3;
      if (description.includes(token)) score += 2;
      if (contexte.includes(token)) score += 1;
    }
    if (score > 0) scored.push({ entry, score });
  }

  return scored.sort((a, b) => b.score - a.score).slice(0, limit);
}
