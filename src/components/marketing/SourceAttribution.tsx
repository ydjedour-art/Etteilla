import { formatDate } from "@/lib/format";

/** Attribution obligatoire (Licence Ouverte / Etalab) sur chaque page fiche
 * issue du corpus Service-Public.gouv.fr (DILA) — voir data/README.md.
 * Volontairement discrète (texte, pas de logo ni de marque reproduits :
 * "Service-Public.fr" est une marque déposée à l'INPI). */
export function SourceAttribution({ url, dateModif }: { url: string; dateModif: string }) {
  return (
    <p className="mt-10 border-t border-ink/10 pt-6 text-xs text-ink-soft">
      Source : Service-Public.gouv.fr (DILA)
      {dateModif && <> — mis à jour le {formatDate(dateModif)}</>}
      {" · "}
      <a href={url} target="_blank" rel="noreferrer" className="underline underline-offset-2 hover:text-ink">
        Voir la fiche d&apos;origine
      </a>
    </p>
  );
}
