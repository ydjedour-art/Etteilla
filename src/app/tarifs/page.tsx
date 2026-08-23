import { CheckIcon, DashIcon } from "@/components/icons";
import { CtaBanner } from "@/components/marketing/CtaBanner";
import { MarketingFooter } from "@/components/marketing/MarketingFooter";
import { MarketingHeader } from "@/components/marketing/MarketingHeader";
import { PricingPlans } from "@/components/marketing/PricingPlans";
import { Reveal } from "@/components/ScrollReveal";
import { COMPARISON_COLUMNS, COMPARISON_ROWS } from "@/lib/plans";

const BILLING_FAQS = [
  {
    question: "Je peux changer ou arrêter quand je veux ?",
    answer: "Oui, en un geste depuis ton profil. Sans justification, sans frais cachés.",
  },
  {
    question: "Si je m'abonne, l'à la carte disparaît ?",
    answer: "Non. Il reste dispo, et moins cher — l'abonnement réduit son prix, il ne le remplace pas.",
  },
  {
    question: "Et si je dépasse ce qui est inclus ?",
    answer: "On te prévient avant, avec le prix exact. Jamais de facturation sans ton accord.",
  },
  {
    question: "Zen Total pour plusieurs personnes, comment ça marche ?",
    answer: "Jusqu'à 3 profils sous un abonnement, avec des dossiers strictement séparés.",
  },
];

export default function TarifsPage() {
  return (
    <main>
      <MarketingHeader />

      {/* Hero */}
      <section className="hero-glow border-b border-ink/10">
        <Reveal className="mx-auto max-w-marketing px-6 py-16 text-center sm:py-20">
          <h1 className="font-display text-4xl font-semibold leading-[1.05] text-ink sm:text-6xl">
            Un tarif qui s&apos;adapte à ta vie,{" "}
            <span className="underline-accent">pas l&apos;inverse.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-ink-soft">
            Trois formules, chacune plus tranquille que la précédente. Ou zéro
            abonnement : tu payes juste ce que tu utilises.
          </p>
        </Reveal>
      </section>

      {/* Plans */}
      <Reveal className="mx-auto max-w-marketing px-6 py-16 sm:py-20">
        <section>
          <PricingPlans />
        </section>
      </Reveal>

      {/* Comparatif complet */}
      <section className="border-y border-ink/10 bg-surface py-16 sm:py-20">
        <Reveal className="mx-auto max-w-marketing px-6">
          <h2 className="text-center font-display text-2xl font-semibold text-ink sm:text-3xl">
            Le détail, sans zone d&apos;ombre
          </h2>

          <div className="mt-10 overflow-x-auto rounded-2xl border border-ink/10 bg-card">
            <table className="w-full min-w-[640px] border-collapse bg-card text-left text-sm">
              <thead>
                <tr className="border-b border-ink/10 bg-surface">
                  <th className="px-5 py-4 font-semibold text-ink-soft">Fonctionnalité</th>
                  {COMPARISON_COLUMNS.map((col, i) => (
                    <th
                      key={col}
                      className={`px-5 py-4 text-center font-display text-base font-semibold ${
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
        </Reveal>
      </section>

      {/* FAQ facturation */}
      <section id="faq" className="mx-auto max-w-content px-6 py-16 sm:py-20">
        <Reveal>
          <h2 className="text-center font-display text-2xl font-semibold text-ink sm:text-3xl">
            Questions sur la facturation
          </h2>
          <div className="mt-10 divide-y divide-ink/10 rounded-2xl border border-ink/10 bg-card">
            {BILLING_FAQS.map((faq) => (
              <details key={faq.question} className="group p-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold text-ink">
                  {faq.question}
                  <span className="text-ink-soft transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-sm text-ink-soft">{faq.answer}</p>
              </details>
            ))}
          </div>
        </Reveal>
      </section>

      <Reveal>
        <CtaBanner title="Choisis ta formule. On s'occupe du reste." />
      </Reveal>

      <MarketingFooter />
    </main>
  );
}
