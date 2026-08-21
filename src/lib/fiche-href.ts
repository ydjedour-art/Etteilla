// URL interne d'une fiche à partir de ses coordonnées d'index — utilisé par
// la recherche (FicheSearch), le triage IA (api/triage) et tout endroit qui
// doit lier vers une page /demarches/[theme]/[dossier]/[fiche] sans recharger
// l'arborescence complète. Pour les thèmes sans niveau dossier (voir
// data/README.md), la fiche est directement le 2e segment.
export function ficheHref(entry: {
  themeSlug: string;
  dossierSlug: string | null;
  slug: string;
}): string {
  const middle = entry.dossierSlug ?? entry.slug;
  const tail = entry.dossierSlug ? `/${entry.slug}` : "";
  return `/demarches/${entry.themeSlug}/${middle}${tail}`;
}
