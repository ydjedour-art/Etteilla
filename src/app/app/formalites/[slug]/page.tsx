"use client";

import { notFound, useRouter } from "next/navigation";
import { Button } from "@/components/Button";
import { findTemplateBySlug } from "@/lib/mock-data";
import { useAppStore } from "@/lib/store";

const RECURRENCE_LABELS: Record<string, string> = {
  ponctuelle: "Ponctuelle",
  mensuelle: "Tous les mois",
  trimestrielle: "Tous les trimestres",
  annuelle: "Tous les ans",
  pluriannuelle: "Tous les quelques années",
};

function ClockIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function RepeatIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M4 7h13l-3-3M20 17H7l3 3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function DocIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="shrink-0 text-ink-soft" aria-hidden>
      <path d="M7 3h7l4 4v14H7V3Z" strokeLinejoin="round" />
      <path d="M14 3v4h4" strokeLinejoin="round" />
    </svg>
  );
}

export default function FormaliteDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const router = useRouter();
  const { state, createDossier } = useAppStore();
  const template = findTemplateBySlug(params.slug);
  if (!template) notFound();

  const existing = state.dossiers.find(
    (d) => d.templateSlug === params.slug && d.status !== "termine" && d.status !== "refuse"
  );

  function handleLaunch() {
    if (existing) {
      router.push(`/app/dossiers/${existing.id}`);
      return;
    }
    createDossier(params.slug);
    // Le nouveau dossier vient d'être ajouté en tête de liste dans le store.
    router.push("/app");
  }

  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm text-ink-soft">{template.organisme}</p>
        <h1 className="mt-1 text-2xl font-semibold text-ink">{template.name}</h1>
        <p className="mt-3 text-ink-soft">{template.description}</p>
      </div>

      <div className="flex flex-wrap gap-3 text-sm">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1.5 font-medium text-primary">
          <ClockIcon /> {template.estimatedDurationMinutes} min de votre temps
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1.5 font-medium text-primary">
          <RepeatIcon /> {RECURRENCE_LABELS[template.recurrence]}
        </span>
      </div>

      {template.requiredDocuments.length > 0 && (
        <section>
          <h2 className="text-lg font-semibold text-ink">Ce qu&apos;il vous faut</h2>
          <ul className="mt-3 space-y-2">
            {template.requiredDocuments.map((doc) => (
              <li
                key={doc}
                className="flex items-center gap-2 rounded-xl bg-card px-4 py-3 text-ink border border-ink/10"
              >
                <DocIcon />
                {doc}
              </li>
            ))}
          </ul>
        </section>
      )}

      <section>
        <h2 className="text-lg font-semibold text-ink">Comment ça se passe</h2>
        <ol className="mt-3 space-y-3">
          {template.steps.map((step, index) => (
            <li key={step.title} className="flex gap-4 rounded-xl bg-card p-4 border border-ink/10">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                {index + 1}
              </span>
              <div>
                <p className="font-medium text-ink">{step.title}</p>
                <p className="text-sm text-ink-soft">{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <Button type="button" onClick={handleLaunch}>
        {existing ? "Voir ma démarche en cours" : "Lancer cette démarche"}
      </Button>
    </div>
  );
}
