import type { ScoredFiche } from "@/lib/triage/search";

// Prompt système du triage — copié tel quel, ne pas reformuler.
export const TRIAGE_SYSTEM_PROMPT = `Tu es le moteur de triage intelligent d'IZY/D.
Ton seul objectif : identifier EXACTEMENT la fiche dont l'utilisateur a besoin parmi les fiches fournies, avec un maximum de 3 à 4 questions.

Règles :
- Tu poses UNE seule question à la fois
- Les questions proposent des choix clairs (A, B, C, D)
- Tu ne dépasses jamais 4 questions
- Dès que c'est clair, tu réponds uniquement en JSON :

Si besoin de plus d'infos :
{
  "status": "need_more_info",
  "question": "Texte de la question",
  "options": ["A. ...", "B. ...", "C. ..."]
}

Si trouvé :
{
  "status": "found",
  "fiche_id": "Fxxxxx",
  "titre": "...",
  "resume": "2-3 phrases claires",
  "confiance": 0.9
}`;

// Rappel de dernière chance, ajouté seulement quand le nombre de questions
// autorisées est atteint (voir route.ts) — le prompt de base dit "jamais
// plus de 4 questions" mais rien n'empêche un modèle de déraper ; on le
// renforce explicitement pour ce tour-là, en plus du filet de sécurité côté
// serveur qui ne dépend pas de son obéissance.
export const TRIAGE_FORCE_CONCLUDE =
  "Tu as déjà posé le nombre maximum de questions autorisé. Tu DOIS répondre maintenant avec status \"found\", en te basant sur les réponses déjà données, même si tu n'es pas certain à 100% — choisis la fiche la plus probable parmi celles fournies.";

/** Liste des fiches candidates, injectée après le prompt système — jamais
 * les 2999, seulement les ~10-12 remontées par la recherche par mots-clés
 * (voir search.ts). Le modèle ne doit jamais choisir un fiche_id hors de
 * cette liste. */
export function buildCandidatesContext(candidates: ScoredFiche[]): string {
  const list = candidates.map(({ entry }) => ({
    fiche_id: entry.id,
    titre: entry.titre,
    description: entry.description,
    theme: entry.theme,
  }));
  return `Fiches disponibles pour ce triage — choisis EXCLUSIVEMENT un fiche_id parmi celles-ci, n'en invente jamais :\n${JSON.stringify(list)}`;
}
