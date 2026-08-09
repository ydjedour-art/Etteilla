import { STATUS_LABELS, STATUS_STYLES, type DossierStatus } from "@/lib/types";

/** Pastille de statut — toujours un libellé en langage clair, jamais un code
 * administratif brut. Voir docs/05-design-system.md. */
export function StatusPill({ status }: { status: DossierStatus }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${STATUS_STYLES[status]}`}
    >
      {STATUS_LABELS[status]}
    </span>
  );
}
