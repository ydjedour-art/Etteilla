import { CtaBanner } from "@/components/marketing/CtaBanner";
import { DemarchesExplorer } from "@/components/marketing/DemarchesExplorer";
import { FicheSearch, type SearchableFiche } from "@/components/marketing/FicheSearch";
import { MarketingFooter } from "@/components/marketing/MarketingFooter";
import { MarketingHeader } from "@/components/marketing/MarketingHeader";
import { ThemeGrid } from "@/components/marketing/ThemeGrid";
import { getFormalityTemplates } from "@/lib/data";
import { getArborescence, getFicheIndex } from "@/lib/generated-data";

export default async function DemarchesPage() {
  const [templates, arborescence, index] = await Promise.all([
    getFormalityTemplates(),
    getArborescence(),
    getFicheIndex(),
  ]);

  const searchIndex: SearchableFiche[] = index.map((entry) => ({
    slug: entry.slug,
    titre: entry.titre,
    theme: entry.theme,
    themeSlug: entry.themeSlug,
    dossierSlug: entry.dossierSlug,
  }));

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

      <section className="border-t border-ink/10 bg-surface py-16 sm:py-20">
        <div className="mx-auto max-w-marketing px-6">
          <h2 className="font-display text-2xl font-extrabold text-ink sm:text-3xl">
            Explorer les {index.length} fiches officielles
          </h2>
          <p className="mt-2 max-w-xl text-ink-soft">
            Le catalogue complet de Service-Public.gouv.fr, organisé par thème — pour
            tout ce qu&apos;on ne prend pas encore en charge nous-mêmes.
          </p>

          <div className="mt-8 max-w-lg">
            <FicheSearch index={searchIndex} />
          </div>

          <div className="mt-10">
            <ThemeGrid arborescence={arborescence} />
          </div>
        </div>
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
