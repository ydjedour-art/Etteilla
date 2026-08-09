import { notFound } from "next/navigation";
import { Button } from "@/components/Button";
import { getFormalityTemplate } from "@/lib/data";

const RECURRENCE_LABELS: Record<string, string> = {
  ponctuelle: "Ponctuelle",
  mensuelle: "Tous les mois",
  trimestrielle: "Tous les trimestres",
  annuelle: "Tous les ans",
  pluriannuelle: "Tous les quelques années",
};

export default async function FormaliteDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const template = await getFormalityTemplate(params.slug);
  if (!template) notFound();

  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm text-ink-soft">{template.organisme}</p>
        <h1 className="mt-1 text-2xl font-semibold text-ink">{template.name}</h1>
        <p className="mt-3 text-ink-soft">{template.description}</p>
      </div>

      <div className="flex flex-wrap gap-3 text-sm">
        <span className="rounded-full bg-primary-light px-3 py-1.5 font-medium text-primary">
          ⏱ {template.estimatedDurationMinutes} min de votre temps
        </span>
        <span className="rounded-full bg-accent/10 px-3 py-1.5 font-medium text-accent">
          🔁 {RECURRENCE_LABELS[template.recurrence]}
        </span>
      </div>

      {template.requiredDocuments.length > 0 && (
        <section>
          <h2 className="text-lg font-semibold text-ink">Ce qu&apos;il vous faut</h2>
          <ul className="mt-3 space-y-2">
            {template.requiredDocuments.map((doc) => (
              <li
                key={doc}
                className="flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-ink border border-ink/10"
              >
                <span aria-hidden>📄</span>
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
            <li key={step.title} className="flex gap-4 rounded-xl bg-white p-4 border border-ink/10">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary-light text-sm font-semibold text-primary">
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

      <Button href="/app">Lancer cette démarche</Button>
    </div>
  );
}
