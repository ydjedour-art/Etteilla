import { notFound } from "next/navigation";
import Link from "next/link";
import { Breadcrumb } from "@/components/marketing/Breadcrumb";
import { CtaBanner } from "@/components/marketing/CtaBanner";
import { FicheDetail } from "@/components/marketing/FicheDetail";
import { MarketingFooter } from "@/components/marketing/MarketingFooter";
import { MarketingHeader } from "@/components/marketing/MarketingHeader";
import { getArborescence, getFicheContent, resolveThemeChild } from "@/lib/generated-data";

// Ce segment recouvre deux cas : un vrai dossier (on liste ses fiches) ou,
// pour les thèmes sans niveau dossier dans la source (ex. "Comment faire
// si"), une fiche directement — voir data/README.md. Next.js n'autorise pas
// deux noms de paramètre dynamique différents au même niveau de route, donc
// on discrimine ici par `node.type` plutôt que d'avoir deux fichiers.

export async function generateStaticParams() {
  const arborescence = await getArborescence();
  return arborescence.flatMap((theme) =>
    theme.enfants.map((child) => ({ theme: theme.slug, dossier: child.slug }))
  );
}

export default async function DossierOrFichePage({
  params,
}: {
  params: { theme: string; dossier: string };
}) {
  const resolved = await resolveThemeChild(params.theme, params.dossier);
  if (!resolved) notFound();
  const { theme, node } = resolved;

  if (node.type === "fiche") {
    const fiche = await getFicheContent(node.slug);
    if (!fiche) notFound();
    return (
      <FicheDetail
        fiche={fiche}
        breadcrumb={[
          { label: "Démarches", href: "/demarches" },
          { label: theme.titre, href: `/demarches/${theme.slug}` },
          { label: fiche.titre },
        ]}
      />
    );
  }

  const dossier = node;

  return (
    <main className="bg-white">
      <MarketingHeader />

      <section className="border-b border-ink/10 bg-surface">
        <div className="mx-auto max-w-marketing px-6 py-10 sm:py-14">
          <Breadcrumb
            items={[
              { label: "Démarches", href: "/demarches" },
              { label: theme.titre, href: `/demarches/${theme.slug}` },
              { label: dossier.titre },
            ]}
          />
          <h1 className="mt-4 font-display text-3xl font-extrabold leading-[1.1] text-ink sm:text-4xl">
            {dossier.titre}
          </h1>
          <p className="mt-2 text-ink-soft">
            {dossier.enfants.length} fiche{dossier.enfants.length > 1 ? "s" : ""}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-marketing px-6 py-16 sm:py-20">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {dossier.enfants.map((fiche) =>
            fiche.type === "fiche" ? (
              <Link
                key={fiche.slug}
                href={`/demarches/${theme.slug}/${dossier.slug}/${fiche.slug}`}
                className="card-interactive flex h-full flex-col p-5"
              >
                <h2 className="font-display text-base font-extrabold text-ink">{fiche.titre}</h2>
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
