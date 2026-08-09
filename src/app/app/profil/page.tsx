"use client";

import { useRouter } from "next/navigation";
import { useAppStore } from "@/lib/store";
import type { UserProfile } from "@/lib/types";

const PLANS: { name: UserProfile["plan"]; price: string; description: string }[] = [
  {
    name: "Vigilance",
    price: "Gratuit",
    description: "Rappels, checklist, coffre-fort et assistant.",
  },
  {
    name: "Essentiel",
    price: "9,90€/mois",
    description: "AdminZen pré-remplit vos dossiers, prêts à envoyer en un clic.",
  },
  {
    name: "Sérénité",
    price: "19,90€/mois",
    description: "AdminZen soumet et suit vos démarches de bout en bout pour vous.",
  },
];

export default function ProfilPage() {
  const router = useRouter();
  const { state, setPlan, exportData, resetAccount } = useAppStore();
  const { user } = state;

  function handleDelete() {
    const confirmed = window.confirm(
      "Supprimer votre compte et toutes vos données AdminZen ? Cette action est irréversible."
    );
    if (!confirmed) return;
    resetAccount();
    router.push("/");
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-ink">Profil</h1>
        <p className="mt-1 text-ink-soft">
          {user.firstName} · {user.status}
        </p>
      </div>

      <section>
        <h2 className="text-lg font-semibold text-ink">Votre formule</h2>
        <p className="mt-1 text-sm text-ink-soft">
          Cliquez sur une formule pour en changer.
        </p>
        <div className="mt-3 space-y-3">
          {PLANS.map((plan) => {
            const active = plan.name === user.plan;
            return (
              <button
                key={plan.name}
                type="button"
                onClick={() => setPlan(plan.name)}
                className={`w-full rounded-2xl border p-5 text-left transition-colors ${
                  active
                    ? "border-primary bg-primary-light"
                    : "border-ink/10 bg-white hover:border-primary/40"
                }`}
              >
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-ink">{plan.name}</p>
                  <p className="text-sm font-medium text-ink-soft">{plan.price}</p>
                </div>
                <p className="mt-1 text-sm text-ink-soft">{plan.description}</p>
                {active && (
                  <span className="mt-3 inline-block rounded-full bg-primary px-3 py-1 text-xs font-medium text-white">
                    Formule actuelle
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-ink">Vos données</h2>
        <p className="mt-1 text-sm text-ink-soft">
          Conformément au RGPD, vous pouvez exporter ou supprimer vos données à tout
          moment (voir docs/08-securite-rgpd.md).
        </p>
        <div className="mt-3 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={exportData}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary-light px-5 py-3 text-base font-medium text-primary transition-colors hover:bg-primary-light/70 min-h-[44px]"
          >
            Exporter mes données
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-transparent px-5 py-3 text-base font-medium text-critical transition-colors hover:bg-critical/10 min-h-[44px]"
          >
            Supprimer mon compte
          </button>
        </div>
      </section>
    </div>
  );
}
