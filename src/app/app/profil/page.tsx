"use client";

import { useRouter } from "next/navigation";
import { CheckIcon } from "@/components/icons";
import { useAppStore } from "@/lib/store";
import { ACTE_TIERS, PLANS } from "@/lib/plans";

export default function ProfilPage() {
  const router = useRouter();
  const { state, setSubscription, exportData, resetAccount } = useAppStore();
  const { user } = state;

  function handleDelete() {
    const confirmed = window.confirm(
      "Supprimer votre compte et toutes vos données Sérénio ? Cette action est irréversible."
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
          Trois formules d&apos;abonnement, chacune incluant tout ce qu&apos;offre la
          précédente. Vous changez ou résiliez en un geste, sans justification.
        </p>

        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          {PLANS.map((plan) => {
            const active = user.subscription === plan.id;
            return (
              <div
                key={plan.id}
                className={`flex h-full flex-col rounded-2xl border p-5 ${
                  active ? "border-primary bg-primary-light" : "border-ink/10 bg-white"
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <p className="font-semibold text-ink">{plan.name}</p>
                  {active && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-primary px-2.5 py-1 text-xs font-medium text-white">
                      <CheckIcon className="h-3 w-3" /> Actif
                    </span>
                  )}
                </div>
                <p className="mt-1 text-sm font-medium text-ink-soft">
                  {plan.monthlyPrice.toFixed(2).replace(".", ",").replace(",00", "")} €/mois
                </p>
                <ul className="mt-3 flex-1 space-y-1 text-sm text-ink-soft">
                  {plan.features
                    .filter((f) => !f.endsWith(":"))
                    .slice(0, 4)
                    .map((feature) => (
                      <li key={feature}>• {feature}</li>
                    ))}
                </ul>
                <button
                  type="button"
                  onClick={() => setSubscription(active ? "aucun" : plan.id)}
                  className={`mt-4 inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors min-h-[44px] ${
                    active
                      ? "bg-transparent text-critical hover:bg-critical/10"
                      : "bg-primary text-white hover:bg-primary-dark"
                  }`}
                >
                  {active ? "Résilier" : `Choisir ${plan.name}`}
                </button>
              </div>
            );
          })}
        </div>

        {user.subscription === "aucun" && (
          <p className="mt-3 text-sm text-ink-soft">
            Vous n&apos;êtes abonné·e à aucune formule : vous payez uniquement les
            démarches que vous lancez, à l&apos;acte (voir ci-dessous).
          </p>
        )}
      </section>

      <section>
        <h2 className="text-lg font-semibold text-ink">Tarifs à l&apos;acte</h2>
        <p className="mt-1 text-sm text-ink-soft">
          Toujours disponibles, avec ou sans abonnement. Le prix dépend de la
          complexité de la démarche, pas d&apos;un forfait fixe.
        </p>
        <div className="mt-3 space-y-3">
          {ACTE_TIERS.map((tier) => (
            <div key={tier.name} className="rounded-2xl border border-ink/10 bg-white p-4">
              <div className="flex items-center justify-between">
                <p className="font-medium text-ink">{tier.name}</p>
                <p className="text-sm font-semibold text-primary">{tier.price}</p>
              </div>
              <p className="mt-1 text-sm text-ink-soft">{tier.description}</p>
            </div>
          ))}
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
