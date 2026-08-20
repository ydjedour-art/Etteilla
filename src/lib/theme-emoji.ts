// Un émoji par thème du corpus Service-Public, pour que l'arborescence
// /demarches/** ressemble à IZY/D (chaleureux, repérable d'un coup d'œil)
// plutôt qu'à un site institutionnel. Purement visuel — n'affecte jamais la
// hiérarchie ni le contenu, qui viennent uniquement de data/generated/.
export const THEME_EMOJI: Record<string, string> = {
  "argent-impots-consommation": "💰",
  "associations-fondations-et-fonds-de-dotation": "🤝",
  "comment-faire-si": "🧭",
  "etranger-europe": "🌍",
  "famille-scolarite": "👨‍👩‍👧",
  justice: "⚖️",
  logement: "🏠",
  "loisirs-sports-culture": "🎨",
  "papiers-citoyennete-elections": "🪪",
  "social-sante": "🏥",
  "transports-mobilite": "🚗",
  "travail-formation": "💼",
};

export function themeEmoji(themeSlug: string): string {
  return THEME_EMOJI[themeSlug] ?? "📄";
}
