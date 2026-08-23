// Un émoji par catégorie de démarche (src/lib/mock-data.ts) — utilisé par
// DemarchesExplorer, la landing et le questionnaire de situation
// (SituationQuiz) pour rester cohérent partout où les 10 démarches IZY/D
// sont affichées.
export const CATEGORY_EMOJI: Record<string, string> = {
  Impôts: "📑",
  "Aides & allocations": "🏠",
  Indépendant: "💼",
  "Titre de séjour": "🛂",
  Santé: "🏥",
  "Vie quotidienne": "✉️",
};

export function categoryEmoji(category: string): string {
  return CATEGORY_EMOJI[category] ?? "📄";
}
