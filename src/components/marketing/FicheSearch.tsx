"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { SearchIcon } from "@/components/icons";
import { ficheHref } from "@/lib/fiche-href";

export interface SearchableFiche {
  slug: string;
  titre: string;
  theme: string;
  themeSlug: string;
  dossierSlug: string | null;
}

const MAX_RESULTS = 30;

/** Recherche simple côté client sur l'index plat (titre + thème) — filtre en
 * mémoire, sans dépendance externe : suffisant pour 2999 entrées. */
export function FicheSearch({ index }: { index: SearchableFiche[] }) {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 2) return [];
    return index
      .filter((entry) => entry.titre.toLowerCase().includes(q) || entry.theme.toLowerCase().includes(q))
      .slice(0, MAX_RESULTS);
  }, [index, query]);

  return (
    <div>
      <label className="relative block">
        <SearchIcon className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-soft" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={`Chercher parmi les ${index.length} fiches…`}
          className="w-full rounded-xl border border-ink/10 bg-white py-3 pl-11 pr-4 text-sm text-ink placeholder:text-ink-soft/70 focus:border-primary focus:outline-none"
        />
      </label>

      {query.trim().length >= 2 && (
        <div className="mt-3 max-h-96 overflow-y-auto rounded-xl border border-ink/10 bg-white">
          {results.length === 0 ? (
            <p className="p-4 text-sm text-ink-soft">Aucune fiche ne correspond à &laquo; {query} &raquo;.</p>
          ) : (
            <ul className="divide-y divide-ink/10">
              {results.map((entry) => (
                <li key={entry.slug}>
                  <Link
                    href={ficheHref(entry)}
                    className="flex items-center justify-between gap-3 px-4 py-3 text-sm hover:bg-surface"
                  >
                    <span className="font-medium text-ink">{entry.titre}</span>
                    <span className="shrink-0 text-xs text-ink-soft">{entry.theme}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
          {results.length === MAX_RESULTS && (
            <p className="border-t border-ink/10 p-3 text-center text-xs text-ink-soft">
              Affine ta recherche pour voir plus de résultats précis.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
