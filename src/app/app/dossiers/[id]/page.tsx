"use client";

import { notFound } from "next/navigation";
import { Button } from "@/components/Button";
import { StatusPill } from "@/components/StatusPill";
import { Timeline } from "@/components/Timeline";
import { formatDate } from "@/lib/format";
import { findTemplateBySlug } from "@/lib/mock-data";
import { useAppStore } from "@/lib/store";

export default function DossierDetailPage({ params }: { params: { id: string } }) {
  const { state, advanceDossier } = useAppStore();
  const dossier = state.dossiers.find((d) => d.id === params.id);
  if (!dossier) notFound();
  const template = findTemplateBySlug(dossier.templateSlug);

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
          <p className="mt-2 text-xs text-ink-soft">
            Ajoutez le document au coffre-fort : le dossier se débloque tout seul dès
            qu&apos;il correspond.
          </p>
          <div className="mt-4">
            <Button href="/app/coffre-fort">Ajouter le document</Button>
          </div>
        </div>
      )}

      {dossier.missingDocuments.length === 0 && dossier.status === "pret_a_soumettre" && (
        <div className="rounded-2xl bg-primary-light p-5">
          <p className="font-medium text-primary">Votre dossier est prêt</p>
          <p className="mt-1 text-sm text-ink-soft">
            Toutes les pièces sont réunies. Un dernier coup d&apos;œil et c&apos;est envoyé.
          </p>
          <div className="mt-4">
            <Button type="button" onClick={() => advanceDossier(dossier.id)}>
              Envoyer le dossier
            </Button>
          </div>
        </div>
      )}

      {(dossier.status === "en_attente_administration" || dossier.status === "action_requise") && (
        <div className="rounded-2xl bg-accent/10 p-5">
          <p className="font-medium text-accent">
            {dossier.status === "action_requise"
              ? "L'administration a répondu, on attend votre confirmation."
              : "C'est entre les mains de l'administration."}
          </p>
          <p className="mt-1 text-sm text-ink-soft">
            On vérifie l&apos;avancement pour vous. Vous n&apos;avez rien à faire pour le
            moment.
          </p>
          <div className="mt-4">
            <Button type="button" variant="secondary" onClick={() => advanceDossier(dossier.id)}>
              🔧 Simuler la suite du parcours (démo)
            </Button>
          </div>
        </div>
      )}

      {dossier.status === "termine" && (
        <div className="rounded-2xl bg-primary-light p-5">
          <p className="font-medium text-primary">C&apos;est fait, rien d&apos;autre à faire.</p>
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
