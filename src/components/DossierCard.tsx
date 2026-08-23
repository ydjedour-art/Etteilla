import Link from "next/link";
import { formatDate } from "@/lib/format";
import type { Dossier, FormalityTemplate } from "@/lib/types";
import { StatusPill } from "./StatusPill";

/** Carte résumant un dossier : la démarche, son statut, sa prochaine échéance, et
 * une seule action possible (voir le dossier). Voir docs/05-design-system.md. */
export function DossierCard({
  dossier,
  template,
}: {
  dossier: Dossier;
  template: FormalityTemplate | undefined;
}) {
  return (
    <Link
      href={`/app/dossiers/${dossier.id}`}
      className="block rounded-2xl border border-ink/10 bg-card p-5 transition-shadow hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-ink-soft">{template?.organisme}</p>
          <h3 className="mt-0.5 text-lg font-semibold text-ink">
            {template?.name ?? "Démarche"}
          </h3>
        </div>
        <StatusPill status={dossier.status} />
      </div>
      {dossier.deadline && (
        <p className="mt-3 text-sm text-ink-soft">
          Échéance : {formatDate(dossier.deadline)}
        </p>
      )}
      {dossier.missingDocuments.length > 0 && (
        <p className="mt-1 text-sm text-attention">
          Il manque : {dossier.missingDocuments.join(", ")}
        </p>
      )}
    </Link>
  );
}
