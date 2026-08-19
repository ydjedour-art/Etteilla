"use client";

import { useMemo, useState } from "react";
import { SearchIcon } from "@/components/icons";
import type { FormalityTemplate } from "@/lib/types";

const AUTOMATION_LABELS: Record<FormalityTemplate["automationLevel"], string> = {
  guide: "On te guide",
  pre_rempli: "On pré-remplit",
  delegue: "On s'en occupe entièrement",
};

const CATEGORY_EMOJI: Record<string, string> = {
  Impôts: "📑",
  "Aides & allocations": "🏠",
  Indépendant: "💼",
  "Titre de séjour": "🛂",
  Santé: "🏥",
  "Vie quotidienne": "✉️",
};

/** Catalogue public des démarches couvertes — filtrable par catégorie et par
 * recherche libre. Volontairement en lecture seule : les visiteurs non
 * connectés découvrent l'étendue de la couverture, mais toute action mène à
 * `/onboarding` plutôt que dans l'espace connecté. */
export function DemarchesExplorer({ templates }: { templates: FormalityTemplate[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string | null>(null);

  const categories = useMemo(
    () => Array.from(new Set(templates.map((t) => t.category))),
    [templates]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return templates.filter((t) => {
      const matchesCategory = !category || t.category === category;
      const matchesQuery =
        !q ||
        t.name.toLowerCase().includes(q) ||
        t.organisme.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [templates, query, category]);

  return (
    <div>
      {/* Recherche + filtres */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <label className="relative flex-1 sm:max-w-xs">
          <SearchIcon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-soft" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Chercher une démarche…"
            className="w-full rounded-xl border border-ink/10 bg-white py-2.5 pl-10 pr-4 text-sm text-ink placeholder:text-ink-soft/70 focus:border-primary focus:outline-none"
          />
        </label>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setCategory(null)}
            className={`rounded-full px-3.5 py-1.5 text-xs font-bold transition-colors ${
              category === null
                ? "bg-primary text-white"
                : "bg-white text-ink-soft ring-1 ring-inset ring-ink/10 hover:text-ink"
            }`}
          >
            Toutes
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat === category ? null : cat)}
              className={`rounded-full px-3.5 py-1.5 text-xs font-bold transition-colors ${
                category === cat
                  ? "bg-primary text-white"
                  : "bg-white text-ink-soft ring-1 ring-inset ring-ink/10 hover:text-ink"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Résultats */}
      {filtered.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-dashed border-ink/20 bg-white p-10 text-center">
          <p className="font-bold text-ink">Aucune démarche ne correspond à ta recherche.</p>
          <p className="mt-1 text-sm text-ink-soft">
            La liste s&apos;élargit régulièrement — raconte-nous ta situation, on te dira
            si on peut déjà t&apos;aider.
          </p>
        </div>
      ) : (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((template) => (
            <div key={template.slug} className="card-interactive flex h-full flex-col p-5">
              <div className="flex items-start justify-between gap-3">
                <span aria-hidden="true" className="text-2xl">
                  {CATEGORY_EMOJI[template.category] ?? "📄"}
                </span>
                <span className="whitespace-nowrap rounded-full bg-primary-light px-2.5 py-1 text-[11px] font-bold text-primary">
                  {AUTOMATION_LABELS[template.automationLevel]}
                </span>
              </div>
              <h3 className="mt-3 font-display text-lg font-extrabold text-ink">{template.name}</h3>
              <p className="text-xs text-ink-soft">{template.organisme}</p>
              <p className="mt-3 text-xs font-semibold text-ink-soft">
                ~{template.estimatedDurationMinutes} min de ton temps
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
