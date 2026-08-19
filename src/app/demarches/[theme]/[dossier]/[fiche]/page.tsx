import { notFound } from "next/navigation";
import { FicheDetail } from "@/components/marketing/FicheDetail";
import { getArborescence, getFicheContent, resolveDossierFiche } from "@/lib/generated-data";

export async function generateStaticParams() {
  const arborescence = await getArborescence();
  return arborescence.flatMap((theme) =>
    theme.enfants
      .filter((n) => n.type === "dossier")
      .flatMap((dossier) =>
        dossier.type === "dossier"
          ? dossier.enfants.map((fiche) => ({
              theme: theme.slug,
              dossier: dossier.slug,
              fiche: fiche.slug,
            }))
          : []
      )
  );
}

export default async function FichePage({
  params,
}: {
  params: { theme: string; dossier: string; fiche: string };
}) {
  const resolved = await resolveDossierFiche(params.theme, params.dossier, params.fiche);
  if (!resolved) notFound();
  const { theme, dossier, fiche } = resolved;

  const content = await getFicheContent(fiche.slug);
  if (!content) notFound();

  return (
    <FicheDetail
      fiche={content}
      breadcrumb={[
        { label: "Démarches", href: "/demarches" },
        { label: theme.titre, href: `/demarches/${theme.slug}` },
        { label: dossier.titre, href: `/demarches/${theme.slug}/${dossier.slug}` },
        { label: content.titre },
      ]}
    />
  );
}
