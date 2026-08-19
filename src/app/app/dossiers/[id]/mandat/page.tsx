"use client";

import { useEffect } from "react";
import { notFound, useRouter } from "next/navigation";
import { Button } from "@/components/Button";
import { formatDate } from "@/lib/format";
import { findTemplateBySlug } from "@/lib/mock-data";
import { useAppStore } from "@/lib/store";

export default function MandatPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { state, generateMandate, revokeMandate } = useAppStore();
  const dossier = state.dossiers.find((d) => d.id === params.id);
  if (!dossier) notFound();
  const template = findTemplateBySlug(dossier.templateSlug);

  const mandate = state.mandates.find((m) => m.dossierId === dossier.id && !m.revokedAt);

  // Génère le mandat automatiquement dès qu'on arrive sur cette page sans en
  // avoir déjà un actif — "génère au besoin un mandat" (docs/01-vision-produit.md).
  useEffect(() => {
    if (!mandate && template) {
      generateMandate(
        dossier.id,
        `IZY/D est mandaté pour préparer, transmettre et suivre la démarche « ${template.name} » auprès de ${template.organisme}, dans la limite strictement nécessaire à son traitement.`
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dossier.id, mandate, template]);

  if (!template) notFound();

  if (!mandate) {
    return <p className="text-ink-soft">Génération du mandat…</p>;
  }

  return (
    <div className="space-y-6">
      <div className="no-print flex flex-wrap items-center justify-between gap-3">
        <Button href={`/app/dossiers/${dossier.id}`} variant="ghost">
          ← Retour au dossier
        </Button>
        <Button type="button" onClick={() => window.print()}>
          Imprimer / Enregistrer en PDF
        </Button>
      </div>

      <div className="mx-auto max-w-2xl rounded-2xl border border-ink/10 bg-white p-10">
        <p className="text-center text-xs uppercase tracking-widest text-ink-soft">
          Mandat de représentation
        </p>
        <h1 className="mt-2 text-center font-serif text-2xl font-semibold text-ink">
          IZY/D
        </h1>

        <div className="mt-8 space-y-4 text-ink">
          <p>
            Je soussigné(e) <strong>{state.user.firstName}</strong>, mandate IZY/D
            aux fins de représentation pour la démarche suivante :
          </p>

          <div className="rounded-xl bg-primary-light p-4">
            <p className="font-semibold text-ink">{template.name}</p>
            <p className="text-sm text-ink-soft">Auprès de : {template.organisme}</p>
          </div>

          <p className="text-sm text-ink-soft">{mandate.scope}</p>

          <p>
            Ce mandat est révocable à tout moment depuis mon espace IZY/D, avec
            effet immédiat sur le traitement de cette démarche.
          </p>

          <div className="grid grid-cols-2 gap-6 border-t border-ink/10 pt-6 text-sm">
            <div>
              <p className="text-ink-soft">Fait le</p>
              <p className="font-medium text-ink">{formatDate(mandate.grantedAt)}</p>
            </div>
            <div>
              <p className="text-ink-soft">Signature</p>
              <p className="font-serif text-lg italic text-ink">{state.user.firstName}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="no-print flex justify-center">
        <button
          type="button"
          onClick={() => {
            revokeMandate(mandate.id);
            router.push(`/app/dossiers/${dossier.id}`);
          }}
          className="text-sm font-medium text-critical hover:underline"
        >
          Révoquer ce mandat
        </button>
      </div>
    </div>
  );
}
