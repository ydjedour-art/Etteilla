import { Button } from "@/components/Button";
import { CheckIcon, DashIcon } from "@/components/icons";
import { MarketingFooter } from "@/components/marketing/MarketingFooter";
import { MarketingHeader } from "@/components/marketing/MarketingHeader";
import { PricingPlans } from "@/components/marketing/PricingPlans";
import { COMPARISON_COLUMNS, COMPARISON_ROWS } from "@/lib/plans";

const BILLING_FAQS = [
  {
    question: "Je peux changer de formule ou l'arrêter quand je veux ?",
    answer:
      "Oui. Vous changez de formule ou résiliez en un geste, depuis votre profil, sans justification ni frais cachés. Le changement s'applique immédiatement, au prorata.",
  },
  {
    question: "Si je m'abonne, l'à la carte disparaît ?",
    answer:
      "Non, il reste toujours disponible — et moins cher. Un abonnement réduit ou inclut le prix des démarches à l'acte selon la formule ; il ne le remplace jamais complètement pour les cas non couverts.",
  },
  {
    question: "Que se passe-t-il si je dépasse ce qui est inclus dans ma formule ?",
    answer:
      "Rien de mauvaise surprise : on vous prévient avant, avec le prix exact, et vous validez avant tout paiement supplémentaire. Jamais de facturation automatique sans votre accord.",
  },
  {
    question: "L'abonnement Zen Total pour plusieurs personnes, comment ça marche ?",
    answer:
      "Vous ajoutez jusqu'à 3 profils (conjoint, enfant, parent aidé) sous le même abonnement, avec des dossiers et des coffres-forts strictement séparés — vous seul·e décidez qui voit quoi.",
  },
];

export default function TarifsPage() {
  return (
    <main className="bg-surface">
      <MarketingHeader />

      {/* Hero */}
      <section className="hero-glow border-b border-ink/10">
        <div className="mx-auto max-w-marketing px-6 py-16 text-center sm:py-20">
          <h1 className="font-serif text-4xl font-semibold leading-tight text-ink sm:text-5xl">
            Un tarif qui s&apos;adapte à votre vie,{" "}
            <span className="text-primary">pas l&apos;inverse.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-ink-soft">
            Trois formules d&apos;abonnement cohérentes, qui montent en tranquillité
            d&apos;esprit. Ou aucun abonnement du tout : vous ne payez que ce que vous
            utilisez.
          </p>
        </div>
      </section>

      {/* Plans */}
      <section className="mx-auto max-w-marketing px-6 py-16 sm:py-20">
        <PricingPlans />
      </section>

      {/* Comparatif complet */}
      <section className="border-y border-ink/10 bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-marketing px-6">
          <h2 className="text-center font-serif text-3xl font-semibold text-ink">
            Le détail, sans zone d&apos;ombre
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-sm text-ink-soft">
            Tout ce qui change d&apos;une formule à l&apos;autre, ligne par ligne.
          </p>

          <div className="mt-10 overflow-x-auto rounded-2xl border border-ink/10">
            <table className="w-full min-w-[640px] border-collapse bg-white text-left text-sm">
              <thead>
                <tr className="border-b border-ink/10 bg-surface">
                  <th className="px-5 py-4 font-medium text-ink-soft">Fonctionnalité</th>
                  {COMPARISON_COLUMNS.map((col, i) => (
                    <th
                      key={col}
                      className={`px-5 py-4 text-center font-serif text-base font-semibold ${
                        i === 2 ? "text-primary" : "text-ink"
                      }`}
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPARISON_ROWS.map((row, rowIndex) => (
                  <tr
                    key={row.label}
                    className={rowIndex % 2 === 1 ? "bg-surface/60" : undefined}
                  >
                    <td className="px-5 py-3.5 text-ink">{row.label}</td>
                    {row.cells.map((cell, i) => (
                      <td key={i} className="px-5 py-3.5 text-center">
                        {cell === true ? (
                          <CheckIcon className="mx-auto h-4 w-4 text-success" />
                        ) : cell === false ? (
                          <DashIcon className="mx-auto h-3.5 w-3.5 text-ink-soft/40" />
                        ) : (
                          <span className="text-ink-soft">{cell}</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ facturation */}
      <section className="mx-auto max-w-content px-6 py-20">
        <h2 className="text-center font-serif text-3xl font-semibold text-ink">
          Questions sur la facturation
        </h2>
        <div className="mt-10 divide-y divide-ink/10 rounded-2xl border border-ink/10 bg-white">
          {BILLING_FAQS.map((faq) => (
            <details key={faq.question} className="group p-6">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium text-ink">
                {faq.question}
                <span className="text-ink-soft transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 text-sm text-ink-soft">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      {/* CTA final */}
      <section className="mx-auto max-w-marketing px-6 pb-24">
        <div className="rounded-2xl bg-primary px-8 py-14 text-center text-white">
          <h2 className="font-serif text-2xl font-semibold sm:text-3xl">
            Choisissez votre formule. On s&apos;occupe du reste.
          </h2>
          <div className="mt-6 flex justify-center">
            <Button href="/onboarding" className="!bg-white !text-primary hover:!bg-white/90">
              Commencer
            </Button>
          </div>
        </div>
      </section>

      <MarketingFooter />
    </main>
  );
}
