"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/Button";
import { computeMissingDocuments } from "@/lib/documents";
import { detectFormalities } from "@/lib/detect";
import { useAppStore } from "@/lib/store";

const EXAMPLES = [
  "Je viens de déménager",
  "J'ai perdu mon travail",
  "Mon titre de séjour arrive à échéance",
  "On attend un enfant",
];

/** Point d'entrée principal du produit : l'utilisateur décrit sa situation en
 * langage libre, l'assistant identifie la démarche et ne demande que les pièces
 * manquantes. Voir docs/01-vision-produit.md ("un assistant qui détecte, pas un
 * catalogue à parcourir"). */
export function SituationIntake() {
  const router = useRouter();
  const { state, createDossier } = useAppStore();
  const [query, setQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState<string | null>(null);

  const results = submittedQuery ? detectFormalities(submittedQuery) : [];

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;
    setSubmittedQuery(query.trim());
  }

  function handleLaunch(templateSlug: string) {
    const existing = state.dossiers.find(
      (d) => d.templateSlug === templateSlug && d.status !== "termine" && d.status !== "refuse"
    );
    if (existing) {
      router.push(`/app/dossiers/${existing.id}`);
      return;
    }
    createDossier(templateSlug);
    router.push("/app");
  }

  return (
    <div className="rounded-2xl border border-primary/15 bg-white p-6">
      <p className="text-xs font-semibold uppercase tracking-wide text-primary">
        Assistant IZY/D
      </p>
      <h2 className="mt-1 text-lg font-semibold text-ink">
        Décrivez votre situation, on s&apos;occupe du reste
      </h2>
      <p className="mt-1 text-sm text-ink-soft">
        Une phrase suffit : on identifie la démarche et on ne vous demande que les
        pièces qu&apos;il vous manque vraiment.
      </p>

      <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-3 sm:flex-row">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ex. « je viens de déménager »"
          className="flex-1 rounded-xl border border-ink/15 px-4 py-3 text-ink outline-none focus:border-primary"
        />
        <Button type="submit" disabled={!query.trim()}>
          Analyser ma situation
        </Button>
      </form>

      {!submittedQuery && (
        <div className="mt-4 flex flex-wrap gap-2">
          {EXAMPLES.map((example) => (
            <button
              key={example}
              type="button"
              onClick={() => {
                setQuery(example);
                setSubmittedQuery(example);
              }}
              className="rounded-full border border-ink/10 px-3 py-1.5 text-xs text-ink-soft hover:border-primary/40 hover:text-primary"
            >
              {example}
            </button>
          ))}
        </div>
      )}

      {submittedQuery && (
        <div className="mt-5 space-y-3">
          {results.length === 0 && (
            <div className="rounded-xl bg-ink/5 p-4 text-sm text-ink-soft">
              On n&apos;a pas identifié de démarche précise pour «&nbsp;{submittedQuery}
              &nbsp;». <a href="/app/formalites" className="font-medium text-primary underline">Parcourez le catalogue complet</a>, ou reformulez votre situation.
            </div>
          )}

          {results.map(({ template }) => {
            const missing = computeMissingDocuments(
              template.requiredDocuments,
              state.vaultDocuments
            );
            const existing = state.dossiers.find(
              (d) =>
                d.templateSlug === template.slug &&
                d.status !== "termine" &&
                d.status !== "refuse"
            );
            return (
              <div
                key={template.slug}
                className="rounded-xl border border-primary/20 bg-primary-light/40 p-4"
              >
                <p className="text-xs font-medium text-ink-soft">{template.organisme}</p>
                <p className="font-semibold text-ink">{template.name}</p>
                {missing.length > 0 ? (
                  <p className="mt-1 text-sm text-attention">
                    Il ne manque que : {missing.join(", ")}
                  </p>
                ) : (
                  <p className="mt-1 text-sm text-success">
                    Vous avez déjà tout ce qu&apos;il faut dans votre coffre-fort.
                  </p>
                )}
                <div className="mt-3 flex flex-wrap items-center gap-3">
                  <Button type="button" onClick={() => handleLaunch(template.slug)}>
                    {existing ? "Voir ma démarche en cours" : "Oui, c'est ça — on s'en occupe"}
                  </Button>
                </div>
              </div>
            );
          })}

          <button
            type="button"
            onClick={() => {
              setSubmittedQuery(null);
              setQuery("");
            }}
            className="text-sm font-medium text-ink-soft hover:text-ink"
          >
            Décrire une autre situation
          </button>
        </div>
      )}
    </div>
  );
}
