import { notFound } from "next/navigation";
import { Button } from "@/components/Button";
import { StatusPill } from "@/components/StatusPill";
import { Timeline } from "@/components/Timeline";
import { formatDate } from "@/lib/format";
import { getDossier, getFormalityTemplate } from "@/lib/data";

export default async function DossierDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const dossier = await getDossier(params.id);
  if (!dossier) notFound();
  const template = await getFormalityTemplate(dossier.templateSlug);

  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm text-ink-soft">{template?.organisme}</p>
        <div className="mt-1 flex items-center justify-between gap-4">
          <h1 className="text-2xl font-semibold text-ink">{template?.name}</h1>
          <StatusPill status={dossier.status} />
        </div>
        {dossier.deadline && (
          <p className="mt-2 text-sm text-ink-soft">
            Échéance : {formatDate(dossier.deadline)}
          </p>
        )}
      </div>

      {dossier.missingDocuments.length > 0 && (
        <div className="rounded-2xl bg-attention/10 p-5">
          <p className="font-medium text-attention">
            Il ne manque plus qu&apos;une pièce pour continuer
          </p>
          <ul className="mt-2 space-y-1 text-ink-soft">
            {dossier.missingDocuments.map((doc) => (
              <li key={doc}>• {doc}</li>
            ))}
          </ul>
          <div className="mt-4">
            <Button href="/app/coffre-fort">Ajouter le document</Button>
          </div>
        </div>
      )}

      <section>
        <h2 className="text-lg font-semibold text-ink">Suivi du dossier</h2>
        <div className="mt-4">
          <Timeline events={dossier.timeline} />
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-ink">Besoin d&apos;aide ?</h2>
        <p className="mt-1 text-ink-soft">
          Posez votre question à l&apos;assistant, il connaît le détail de ce dossier.
        </p>
        <div className="mt-3">
          <Button href="/app/assistant" variant="secondary">
            Ouvrir l&apos;assistant
          </Button>
        </div>
      </section>
    </div>
  );
}
