import { notFound } from "next/navigation";
import Link from "next/link";
import { Breadcrumb } from "@/components/marketing/Breadcrumb";
import { CtaBanner } from "@/components/marketing/CtaBanner";
import { MarketingFooter } from "@/components/marketing/MarketingFooter";
import { MarketingHeader } from "@/components/marketing/MarketingHeader";
import { getArborescence, getTheme } from "@/lib/generated-data";
import { themeEmoji } from "@/lib/theme-emoji";

export async function generateStaticParams() {
  const arborescence = await getArborescence();
  return arborescence.map((theme) => ({ theme: theme.slug }));
}

export default async function ThemePage({ params }: { params: { theme: string } }) {
  const theme = await getTheme(params.theme);
  if (!theme) notFound();

  const dossiers = theme.enfants.filter((n) => n.type === "dossier");
  const fichesDirectes = theme.enfants.filter((n) => n.type === "fiche");
  const totalFiches =
    dossiers.reduce((sum, d) => sum + (d.type === "dossier" ? d.enfants.length : 0), 0) +
    fichesDirectes.length;

  return (
    <main>
      <MarketingHeader />

      <section className="border-b border-ink/10 bg-surface">
        <div className="mx-auto max-w-marketing px-6 py-10 sm:py-14">
          <Breadcrumb items={[{ label: "Démarches", href: "/demarches" }, { label: theme.titre }]} />
          <h1 className="mt-4 flex items-center gap-3 font-display text-3xl font-semibold leading-[1.1] text-ink sm:text-4xl">
            <span aria-hidden="true">{themeEmoji(theme.slug)}</span>
            {theme.titre}
          </h1>
          <p className="mt-2 text-ink-soft">
            {dossiers.length > 0
              ? `${dossiers.length} dossier${dossiers.length > 1 ? "s" : ""} · ${totalFiches} fiche${totalFiches > 1 ? "s" : ""}`
              : `${totalFiches} fiche${totalFiches > 1 ? "s" : ""}`}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-marketing px-6 py-16 sm:py-20">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {dossiers.map((dossier) => (
            <Link
              key={dossier.slug}
              href={`/demarches/${theme.slug}/${dossier.slug}`}
              className="card-interactive flex h-full flex-col p-5"
            >
              <span aria-hidden="true" className="text-xl">
                {themeEmoji(theme.slug)}
              </span>
              <h2 className="mt-2 font-display text-lg font-semibold text-ink">{dossier.titre}</h2>
              <p className="mt-2 text-sm text-ink-soft">
                {dossier.type === "dossier" ? dossier.enfants.length : 0} fiche
                {(dossier.type === "dossier" ? dossier.enfants.length : 0) > 1 ? "s" : ""}
              </p>
            </Link>
          ))}
          {fichesDirectes.map((fiche) =>
            fiche.type === "fiche" ? (
              <Link
                key={fiche.slug}
                href={`/demarches/${theme.slug}/${fiche.slug}`}
                className="card-interactive flex h-full flex-col p-5"
              >
                <span aria-hidden="true" className="text-xl">
                  {themeEmoji(theme.slug)}
                </span>
                <h2 className="mt-2 font-display text-lg font-semibold text-ink">{fiche.titre}</h2>
                {fiche.description && (
                  <p className="mt-2 line-clamp-3 text-sm text-ink-soft">{fiche.description}</p>
                )}
              </Link>
            ) : null
          )}
        </div>
      </section>

      <CtaBanner
        title="Une de ces démarches te concerne ?"
        text="Raconte ta situation, on regarde ce qu'on peut prendre en charge."
      />

      <MarketingFooter />
    </main>
  );
}
