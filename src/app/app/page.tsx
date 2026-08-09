"use client";

import Link from "next/link";
import { DossierCard } from "@/components/DossierCard";
import { SituationIntake } from "@/components/SituationIntake";
import { TodayDigest } from "@/components/TodayDigest";
import { ZenState } from "@/components/ZenState";
import { formalityTemplates } from "@/lib/mock-data";
import { useAppStore } from "@/lib/store";

export default function DashboardPage() {
  const { state } = useAppStore();
  const { user, dossiers } = state;

  const active = dossiers.filter((d) => d.status !== "termine");
  const done = dossiers.filter((d) => d.status === "termine");

  return (
    <div className="space-y-8">
      <TodayDigest firstName={user.firstName} dossiers={dossiers} />

      <SituationIntake />

      <section>
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <h2 className="text-lg font-semibold text-ink">Vos démarches en cours</h2>
          <Link
            href="/app/formalites"
            className="whitespace-nowrap text-sm font-medium text-primary"
          >
            Voir toutes les démarches
          </Link>
        </div>

        <div className="mt-4 space-y-3">
          {active.length === 0 && (
            <ZenState
              title="Aucune démarche en cours"
              description="Dès qu'une échéance approchera, on préparera le dossier pour vous. Vous pouvez aussi en lancer une depuis le catalogue."
            />
          )}
          {active.map((dossier) => (
            <DossierCard
              key={dossier.id}
              dossier={dossier}
              template={formalityTemplates.find((t) => t.slug === dossier.templateSlug)}
            />
          ))}
        </div>
      </section>

      {done.length > 0 && (
        <section>
          <h2 className="text-lg font-semibold text-ink">Terminées récemment</h2>
          <div className="mt-4 space-y-3">
            {done.map((dossier) => (
              <DossierCard
                key={dossier.id}
                dossier={dossier}
                template={formalityTemplates.find((t) => t.slug === dossier.templateSlug)}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
