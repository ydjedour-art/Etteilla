import { CtaBanner } from "@/components/marketing/CtaBanner";
import { DemarchesExplorer } from "@/components/marketing/DemarchesExplorer";
import { FicheSearch, type SearchableFiche } from "@/components/marketing/FicheSearch";
import { MarketingFooter } from "@/components/marketing/MarketingFooter";
import { MarketingHeader } from "@/components/marketing/MarketingHeader";
import { Reveal } from "@/components/ScrollReveal";
import { ThemeGrid } from "@/components/marketing/ThemeGrid";
import { TriageChat } from "@/components/marketing/TriageChat";
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
    <main>
      <MarketingHeader />

      <section className="hero-glow border-b border-ink/10">
        <Reveal className="mx-auto max-w-marketing px-6 py-16 text-center sm:py-20">
          <h1 className="font-display text-4xl font-semibold leading-[1.05] text-ink sm:text-6xl">
            Qu&apos;est-ce qu&apos;on peut prendre en charge ?
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-ink-soft">
            Une question, et on te dit tout de suite si c&apos;est pour nous.
          </p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-marketing px-6 py-16 sm:py-20">
        <Reveal>
          <TriageChat />

          <details className="group mx-auto mt-8 max-w-xl text-center">
            <summary className="inline-flex cursor-pointer list-none items-center gap-1.5 text-sm font-bold text-ink-soft hover:text-ink">
              Ou voir les {templates.length} démarches d&apos;un coup
              <span aria-hidden="true" className="transition-transform group-open:rotate-90">→</span>
            </summary>
            <div className="mt-8 text-left">
              <DemarchesExplorer templates={templates} />
            </div>
          </details>
        </Reveal>
      </section>

      <section className="border-t border-ink/10 bg-surface py-16 sm:py-20">
        <Reveal className="mx-auto max-w-lg px-6 text-center">
          <h2 className="font-display text-xl font-semibold text-ink">
            Pas dans la liste ? 🔍
          </h2>
          <p className="mt-2 text-sm text-ink-soft">
            On garde aussi les {index.length} fiches officielles de Service-Public.gouv.fr,
            au cas où.
          </p>
          <div className="mt-6 text-left">
            <FicheSearch index={searchIndex} />
          </div>

          <details className="group mt-6">
            <summary className="inline-flex cursor-pointer list-none items-center gap-1.5 text-sm font-bold text-primary">
              Ou parcourir par thème
              <span aria-hidden="true" className="transition-transform group-open:rotate-90">→</span>
            </summary>
            <div className="mt-6 text-left">
              <ThemeGrid arborescence={arborescence} />
            </div>
          </details>
        </Reveal>
      </section>

      <Reveal>
        <CtaBanner
          title="Toujours pas trouvé ton cas ?"
          text="On regarde ta situation avec toi, sans engagement."
        />
      </Reveal>

      <MarketingFooter />
    </main>
  );
}
