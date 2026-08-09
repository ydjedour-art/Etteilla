import { Button } from "@/components/Button";
import { DocumentTile } from "@/components/DocumentTile";
import { getVaultDocuments } from "@/lib/data";

export default async function CoffreFortPage() {
  const documents = await getVaultDocuments();
  const toWatch = documents.filter(
    (d) => d.validityStatus === "expire_bientot" || d.validityStatus === "a_verifier"
  );

  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-ink">Coffre-fort</h1>
          <p className="mt-1 text-ink-soft">
            Vos documents, en sécurité, réutilisés automatiquement pour vos démarches.
          </p>
        </div>
        <Button type="button">Ajouter un document</Button>
      </div>

      {toWatch.length > 0 && (
        <div className="rounded-2xl bg-attention/10 p-5">
          <p className="font-medium text-attention">
            {toWatch.length} document{toWatch.length > 1 ? "s" : ""} à surveiller
          </p>
          <p className="mt-1 text-sm text-ink-soft">
            On vous préviendra à temps s&apos;il faut les renouveler.
          </p>
        </div>
      )}

      <div className="grid gap-3 sm:grid-cols-2">
        {documents.map((document) => (
          <DocumentTile key={document.id} document={document} />
        ))}
      </div>
    </div>
  );
}
