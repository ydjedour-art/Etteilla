"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRightIcon, SearchIcon } from "@/components/icons";
import type { FormalityTemplate } from "@/lib/types";

const AUTOMATION_LABELS: Record<FormalityTemplate["automationLevel"], string> = {
  guide: "On vous guide",
  pre_rempli: "On pré-remplit",
  delegue: "On s'en occupe entièrement",
};

const RECURRENCE_LABELS: Record<FormalityTemplate["recurrence"], string> = {
  ponctuelle: "Ponctuelle",
  mensuelle: "Tous les mois",
  trimestrielle: "Tous les trimestres",
  annuelle: "Tous les ans",
  pluriannuelle: "Tous les quelques années",
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
            placeholder="Chercher une démarche, un organisme…"
            className="w-full rounded-xl border border-ink/10 bg-white py-2.5 pl-10 pr-4 text-sm text-ink placeholder:text-ink-soft/70 focus:border-primary focus:outline-none"
          />
        </label>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setCategory(null)}
            className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
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
              className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
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
          <p className="font-medium text-ink">Aucune démarche ne correspond à votre recherche.</p>
          <p className="mt-1 text-sm text-ink-soft">
            La liste s&apos;élargit régulièrement — parlez-nous de votre situation, on vous
            dira si on peut déjà vous aider.
          </p>
        </div>
      ) : (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((template) => (
            <div
              key={template.slug}
              className="flex h-full flex-col rounded-2xl border border-ink/10 bg-white p-5 transition-shadow hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-3">
                <p className="text-xs font-medium uppercase tracking-wide text-ink-soft">
                  {template.organisme}
                </p>
                <span className="whitespace-nowrap rounded-full bg-primary-light px-2.5 py-1 text-[11px] font-medium text-primary">
                  {AUTOMATION_LABELS[template.automationLevel]}
                </span>
              </div>
              <h3 className="mt-1.5 font-serif text-lg font-semibold text-ink">{template.name}</h3>
              <p className="mt-2 flex-1 text-sm text-ink-soft">{template.description}</p>
              <div className="mt-4 flex items-center justify-between text-xs text-ink-soft">
                <span>{RECURRENCE_LABELS[template.recurrence]}</span>
                <span>~{template.estimatedDurationMinutes} min de votre temps</span>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-10 flex flex-col items-center gap-3 rounded-2xl bg-primary-light p-6 text-center">
        <p className="font-medium text-primary">
          Votre situation n&apos;est pas dans la liste ?
        </p>
        <p className="max-w-md text-sm text-ink-soft">
          Décrivez-la en une phrase pendant l&apos;inscription : on vous dit tout de suite
          si on peut déjà vous aider.
        </p>
        <Link
          href="/onboarding"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
        >
          Décrire ma situation <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
