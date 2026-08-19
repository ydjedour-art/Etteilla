import { Button } from "@/components/Button";
import { DemarchesExplorer } from "@/components/marketing/DemarchesExplorer";
import { MarketingFooter } from "@/components/marketing/MarketingFooter";
import { MarketingHeader } from "@/components/marketing/MarketingHeader";
import { getFormalityTemplates } from "@/lib/data";

export default async function DemarchesPage() {
  const templates = await getFormalityTemplates();

  return (
    <main className="bg-surface">
      <MarketingHeader />

      <section className="hero-glow border-b border-ink/10">
        <div className="mx-auto max-w-marketing px-6 py-16 text-center sm:py-20">
          <h1 className="font-serif text-4xl font-semibold leading-tight text-ink sm:text-5xl">
            {templates.length} démarches déjà couvertes,{" "}
            <span className="text-primary">et la liste s&apos;allonge.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-ink-soft">
            CAF, impôts, URSSAF, titre de séjour, mutuelle... Chaque démarche est
            documentée à l&apos;avance : on sait exactement quelles pièces demander et
            comment l&apos;administration va traiter votre dossier.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-marketing px-6 py-16 sm:py-20">
        <DemarchesExplorer templates={templates} />
      </section>

      <section className="border-t border-ink/10 bg-white py-16">
        <div className="mx-auto max-w-marketing px-6 text-center">
          <h2 className="font-serif text-2xl font-semibold text-ink sm:text-3xl">
            Prêt·e à en rayer une de votre liste ?
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm text-ink-soft">
            Deux minutes pour raconter votre situation, et on s&apos;occupe du reste.
          </p>
          <div className="mt-6 flex justify-center">
            <Button href="/onboarding">Commencer</Button>
          </div>
        </div>
      </section>

      <MarketingFooter />
    </main>
  );
}
