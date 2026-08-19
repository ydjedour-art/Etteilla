import { formatDate } from "@/lib/format";
import type { VaultDocument } from "@/lib/types";

const VALIDITY_LABELS: Record<VaultDocument["validityStatus"], string> = {
  valide: "À jour",
  expire_bientot: "Expire bientôt",
  expire: "Expiré",
  a_verifier: "À vérifier",
};

const VALIDITY_STYLES: Record<VaultDocument["validityStatus"], string> = {
  valide: "bg-primary/15 text-primary",
  expire_bientot: "bg-attention/15 text-attention",
  expire: "bg-critical/15 text-critical",
  a_verifier: "bg-primary/10 text-primary",
};

export function DocumentTile({ document }: { document: VaultDocument }) {
  return (
    <div className="rounded-2xl border border-ink/10 bg-white p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm text-ink-soft">{document.type}</p>
          <p className="font-medium text-ink">{document.label}</p>
        </div>
        <span
          className={`whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-medium ${
            VALIDITY_STYLES[document.validityStatus]
          }`}
        >
          {VALIDITY_LABELS[document.validityStatus]}
        </span>
      </div>
      <p className="mt-3 text-xs text-ink-soft">
        Ajouté le {formatDate(document.uploadedAt)}
        {document.expiresAt && ` · Expire le ${formatDate(document.expiresAt)}`}
      </p>
    </div>
  );
}
