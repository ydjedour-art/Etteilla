import { CtaBanner } from "@/components/marketing/CtaBanner";
import { DemarchesExplorer } from "@/components/marketing/DemarchesExplorer";
import { MarketingFooter } from "@/components/marketing/MarketingFooter";
import { MarketingHeader } from "@/components/marketing/MarketingHeader";
import { getFormalityTemplates } from "@/lib/data";

export default async function DemarchesPage() {
  const templates = await getFormalityTemplates();

  return (
    <main className="bg-white">
      <MarketingHeader />

      <section className="hero-glow border-b border-ink/10">
        <div className="mx-auto max-w-marketing px-6 py-16 text-center sm:py-20">
          <h1 className="font-display text-4xl font-extrabold leading-[1.05] text-ink sm:text-6xl">
            {templates.length} démarches déjà prises en charge.
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-ink-soft">
            CAF, impôts, URSSAF, titre de séjour, mutuelle. Chacune est documentée
            à l&apos;avance — on sait déjà quelles pièces demander.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-marketing px-6 py-16 sm:py-20">
        <DemarchesExplorer templates={templates} />
      </section>

      <CtaBanner
        title="Ta situation n'est pas dans la liste ?"
        text="Raconte-la en une phrase à l'inscription. On te dit si on peut déjà t'aider."
        cta="Décrire ma situation"
      />

      <MarketingFooter />
    </main>
  );
}
