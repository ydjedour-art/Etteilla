import * as cheerio from "cheerio";

/** Texte d'un élément, espaces normalisés, ou chaîne vide si absent. */
export function text($: cheerio.CheerioAPI, selector: string): string {
  return $(selector).first().text().replace(/\s+/g, " ").trim();
}

/** Liste de textes pour tous les éléments matchant le sélecteur. */
export function textList($: cheerio.CheerioAPI, selector: string): string[] {
  return $(selector)
    .map((_, el) => $(el).text().replace(/\s+/g, " ").trim())
    .get()
    .filter(Boolean);
}

/** Résout une URL relative par rapport à l'URL de la page source. */
export function resolveUrl(base: string, href: string | undefined): string | null {
  if (!href) return null;
  try {
    return new URL(href, base).toString();
  } catch {
    return null;
  }
}

/** Extrait un numéro Cerfa d'un texte du type "Cerfa n° 13750*05" — renvoie null si
 * aucun motif reconnu (mieux vaut null qu'un faux positif dans une checklist). */
export function extractCerfaNumber(source: string): string | null {
  const match = source.match(/cerfa\s*n?°?\s*(\d{5}\*\d{2})/i);
  return match ? match[1] : null;
}

/** Résume un texte à `maxLength` caractères en coupant sur un mot entier plutôt
 * qu'en plein milieu — utilisé pour dériver un titre d'étape depuis sa description
 * quand la source ne fournit pas les deux séparément. */
export function summarize(source: string, maxLength = 60): string {
  if (source.length <= maxLength) return source;
  const truncated = source.slice(0, maxLength);
  const lastSpace = truncated.lastIndexOf(" ");
  return `${(lastSpace > 20 ? truncated.slice(0, lastSpace) : truncated).trim()}...`;
}
