"use client";

import { useState } from "react";
import { Button } from "@/components/Button";
import { CheckIcon } from "@/components/icons";
import { ACTE_TIERS, PLANS } from "@/lib/plans";

function formatPrice(value: number): string {
  return value.toFixed(2).replace(".", ",").replace(",00", "");
}

type Billing = "mensuel" | "annuel";

/** Les trois formules d'abonnement + l'option à la carte, avec bascule
 * mensuel/annuel. Utilisé à la fois en aperçu sur la landing (`#tarifs`) et
 * en version complète sur `/tarifs` — une seule source visuelle et une seule
 * source de prix (`src/lib/plans.ts`) pour ne jamais se contredire. */
export function PricingPlans({ compact = false }: { compact?: boolean }) {
  const [billing, setBilling] = useState<Billing>("mensuel");

  return (
    <div>
      {/* Bascule mensuel / annuel */}
      <div className="mx-auto flex w-fit items-center gap-1 rounded-full border border-ink/10 bg-white p-1 text-sm font-medium shadow-sm">
        {(
          [
            { key: "mensuel" as const, label: "Mensuel" },
            { key: "annuel" as const, label: "Annuel · 2 mois offerts" },
          ]
        ).map((option) => (
          <button
            key={option.key}
            type="button"
            onClick={() => setBilling(option.key)}
            className={`rounded-full px-4 py-2 transition-colors ${
              billing === option.key
                ? "bg-primary text-white"
                : "text-ink-soft hover:text-ink"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      {/* Cartes des 3 formules */}
      <div className="mt-8 grid gap-6 sm:grid-cols-3">
        {PLANS.map((plan) => {
          const price = billing === "mensuel" ? plan.monthlyPrice : plan.annualMonthlyPrice;
          return (
            <div
              key={plan.id}
              className={`relative flex h-full flex-col rounded-2xl border bg-white p-6 transition-shadow ${
                plan.highlighted
                  ? "border-primary shadow-lg shadow-primary/10 sm:-translate-y-2"
                  : "border-ink/10 hover:shadow-md"
              }`}
            >
              {plan.badge && (
                <span
                  className={`absolute -top-3 left-6 rounded-full px-3 py-1 text-xs font-semibold ${
                    plan.highlighted ? "bg-primary text-white" : "bg-gold/15 text-gold"
                  }`}
                >
                  {plan.badge}
                </span>
              )}
              <p className="mt-2 font-serif text-xl font-semibold text-ink">{plan.name}</p>
              <p className="mt-1 text-sm text-ink-soft">{plan.tagline}</p>

              <p className="mt-5 flex items-baseline gap-1">
                <span className="font-serif text-3xl font-semibold text-primary">
                  {formatPrice(price)} €
                </span>
                <span className="text-sm text-ink-soft">/mois</span>
              </p>
              {billing === "annuel" && (
                <p className="mt-1 text-xs text-ink-soft">Facturé annuellement</p>
              )}

              <p className="mt-4 text-sm italic text-ink-soft">{plan.bestFor}</p>

              <ul className="mt-5 flex-1 space-y-2.5 text-sm text-ink">
                {plan.features.map((feature) =>
                  feature.endsWith(":") ? (
                    <li key={feature} className="pt-1 text-xs font-semibold uppercase tracking-wide text-ink-soft">
                      {feature}
                    </li>
                  ) : (
                    <li key={feature} className="flex items-start gap-2">
                      <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                      <span>{feature}</span>
                    </li>
                  )
                )}
              </ul>

              {plan.footnote && (
                <p className="mt-3 text-xs text-ink-soft">{plan.footnote}</p>
              )}

              <Button
                href="/onboarding"
                variant={plan.highlighted ? "primary" : "secondary"}
                className="mt-6 w-full"
              >
                Choisir {plan.name}
              </Button>
            </div>
          );
        })}
      </div>

      {/* Option à la carte */}
      <div className="mt-8 rounded-2xl border border-dashed border-ink/20 bg-surface p-6 sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-serif text-lg font-semibold text-ink">
              Pas envie de vous abonner ? Payez à la carte.
            </p>
            <p className="mt-1 max-w-xl text-sm text-ink-soft">
              Aucun engagement : vous ne payez que la démarche que vous lancez, selon sa
              complexité. L&apos;identification et la checklist restent gratuites, pour
              toujours.
            </p>
          </div>
          {!compact && (
            <Button href="/onboarding" variant="ghost" className="shrink-0">
              Commencer sans abonnement
            </Button>
          )}
        </div>
        <div className="mt-5 grid gap-3 sm:grid-cols-4">
          {ACTE_TIERS.map((tier) => (
            <div key={tier.name} className="rounded-xl border border-ink/10 bg-white p-4">
              <p className="font-serif text-lg font-semibold text-primary">{tier.price}</p>
              <p className="mt-1 text-sm font-medium text-ink">{tier.name}</p>
              {!compact && (
                <p className="mt-1 text-xs text-ink-soft">{tier.description}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
