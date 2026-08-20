"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/Button";
import { ArrowRightIcon } from "@/components/icons";
import { categoryEmoji } from "@/lib/category-emoji";
import { detectFormalities, type DetectionResult } from "@/lib/detect";
import type { FormalityTemplate } from "@/lib/types";
import { findDemarcheMapping } from "@data/demarches-izyd";

const FREETEXT_EXAMPLES = [
  "Je viens de déménager",
  "J'ai perdu mon travail",
  "Mon titre de séjour arrive à échéance",
  "On attend un enfant",
];

const AUTOMATION_LABELS: Record<FormalityTemplate["automationLevel"], string> = {
  guide: "On te guide",
  pre_rempli: "On pré-remplit",
  delegue: "On s'en occupe entièrement",
};

type Step =
  | { kind: "category" }
  | { kind: "narrow"; options: FormalityTemplate[] }
  | { kind: "freetext" }
  | { kind: "freetext-empty"; query: string }
  | { kind: "result"; template: FormalityTemplate };

/** Point d'entrée principal de /demarches : une question, deux taps maximum,
 * jamais une liste à parcourir. Remplace le choix (10 cartes + filtres +
 * recherche affichés d'un coup) par une détection guidée — voir
 * docs/01-vision-produit.md : "un assistant qui détecte, pas un catalogue à
 * parcourir". Le catalogue complet reste disponible, mais en repli, pas en
 * premier écran. */
export function SituationQuiz({ templates }: { templates: FormalityTemplate[] }) {
  const [step, setStep] = useState<Step>({ kind: "category" });
  const [query, setQuery] = useState("");

  const categories = useMemo(
    () => Array.from(new Set(templates.map((t) => t.category))),
    [templates]
  );

  function pickCategory(category: string) {
    const options = templates.filter((t) => t.category === category);
    if (options.length === 1) {
      setStep({ kind: "result", template: options[0] });
    } else {
      setStep({ kind: "narrow", options });
    }
  }

  function handleFreetextSubmit(value: string) {
    const results: DetectionResult[] = detectFormalities(value);
    if (results.length > 0) {
      setStep({ kind: "result", template: results[0].template });
    } else {
      setStep({ kind: "freetext-empty", query: value });
    }
  }

  function reset() {
    setStep({ kind: "category" });
    setQuery("");
  }

  return (
    <div className="card-surface mx-auto max-w-xl p-6 sm:p-8">
      {step.kind === "category" && (
        <>
          <h2 className="text-center font-display text-xl font-extrabold text-ink">
            Qu&apos;est-ce qui t&apos;amène ? 🤔
          </h2>
          <p className="mt-1 text-center text-sm text-ink-soft">Une réponse suffit.</p>
          <div className="mt-6 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => pickCategory(category)}
                className="card-interactive flex flex-col items-center gap-1.5 px-3 py-4 text-center text-sm font-bold text-ink"
              >
                <span aria-hidden="true" className="text-2xl">
                  {categoryEmoji(category)}
                </span>
                {category}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setStep({ kind: "freetext" })}
              className="card-interactive flex flex-col items-center gap-1.5 px-3 py-4 text-center text-sm font-bold text-ink-soft"
            >
              <span aria-hidden="true" className="text-2xl">
                💬
              </span>
              Autre chose
            </button>
          </div>
        </>
      )}

      {step.kind === "narrow" && (
        <>
          <button
            type="button"
            onClick={reset}
            className="text-xs font-bold text-ink-soft hover:text-ink"
          >
            ← Recommencer
          </button>
          <h2 className="mt-3 text-center font-display text-xl font-extrabold text-ink">
            Plus précisément ?
          </h2>
          <div className="mt-6 flex flex-col gap-2.5">
            {step.options.map((template) => (
              <button
                key={template.slug}
                type="button"
                onClick={() => setStep({ kind: "result", template })}
                className="card-interactive flex items-center gap-3 p-4 text-left"
              >
                <span aria-hidden="true" className="text-xl">
                  {categoryEmoji(template.category)}
                </span>
                <span>
                  <span className="block font-bold text-ink">{template.name}</span>
                  <span className="block text-xs text-ink-soft">{template.organisme}</span>
                </span>
              </button>
            ))}
          </div>
        </>
      )}

      {step.kind === "freetext" && (
        <>
          <button
            type="button"
            onClick={reset}
            className="text-xs font-bold text-ink-soft hover:text-ink"
          >
            ← Recommencer
          </button>
          <h2 className="mt-3 text-center font-display text-xl font-extrabold text-ink">
            Raconte en une phrase 💬
          </h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (query.trim()) handleFreetextSubmit(query.trim());
            }}
            className="mt-5 flex flex-col gap-3 sm:flex-row"
          >
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ex. « je viens de déménager »"
              className="flex-1 rounded-xl border border-ink/15 px-4 py-3 text-ink outline-none focus:border-primary"
            />
            <Button type="submit" disabled={!query.trim()}>
              C&apos;est parti
            </Button>
          </form>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {FREETEXT_EXAMPLES.map((example) => (
              <button
                key={example}
                type="button"
                onClick={() => handleFreetextSubmit(example)}
                className="rounded-full border border-ink/10 px-3 py-1.5 text-xs text-ink-soft hover:border-primary/40 hover:text-primary"
              >
                {example}
              </button>
            ))}
          </div>
        </>
      )}

      {step.kind === "freetext-empty" && (
        <>
          <button
            type="button"
            onClick={reset}
            className="text-xs font-bold text-ink-soft hover:text-ink"
          >
            ← Recommencer
          </button>
          <h2 className="mt-3 font-display text-lg font-extrabold text-ink">
            On n&apos;a pas encore ça tout prêt.
          </h2>
          <p className="mt-2 text-sm text-ink-soft">
            «&nbsp;{step.query}&nbsp;» ne correspond à aucune de nos 10 démarches pour
            l&apos;instant. Décris-la à l&apos;inscription, on regarde quand même.
          </p>
          <Button href="/onboarding" className="mt-5 w-full">
            Décrire ma situation à l&apos;inscription
          </Button>
        </>
      )}

      {step.kind === "result" && (
        <>
          <button
            type="button"
            onClick={reset}
            className="text-xs font-bold text-ink-soft hover:text-ink"
          >
            ← Ce n&apos;est pas ça, recommencer
          </button>
          <div className="mt-3 flex items-start gap-3">
            <span aria-hidden="true" className="text-3xl">
              {categoryEmoji(step.template.category)}
            </span>
            <div>
              <p className="text-xs font-bold text-ink-soft">{step.template.organisme}</p>
              <h2 className="font-display text-xl font-extrabold text-ink">{step.template.name}</h2>
            </div>
          </div>
          <p className="mt-3 text-sm text-ink-soft">{step.template.description}</p>
          <div className="mt-4 flex flex-wrap items-center gap-2 text-xs font-bold text-ink-soft">
            <span className="rounded-full bg-primary-light px-2.5 py-1 text-primary">
              {AUTOMATION_LABELS[step.template.automationLevel]}
            </span>
            <span>~{step.template.estimatedDurationMinutes} min de ton temps</span>
          </div>
          <Button href="/onboarding" className="mt-6 w-full">
            😌 On s&apos;en occupe pour toi
          </Button>
          {findDemarcheMapping(step.template.slug)?.dossierRef && (
            <a
              href={`/demarches/${findDemarcheMapping(step.template.slug)!.dossierRef!.theme}/${
                findDemarcheMapping(step.template.slug)!.dossierRef!.dossier
              }`}
              className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline"
            >
              En savoir plus (Service-Public.fr) <ArrowRightIcon className="h-3 w-3" />
            </a>
          )}
        </>
      )}
    </div>
  );
}
