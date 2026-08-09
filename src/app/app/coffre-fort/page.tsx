"use client";

import { useState } from "react";
import { Button } from "@/components/Button";
import { DocumentTile } from "@/components/DocumentTile";
import { useAppStore } from "@/lib/store";

const DOCUMENT_TYPES = [
  "CNI",
  "Passeport",
  "Titre de séjour",
  "Avis d'imposition",
  "RIB",
  "Justificatif de domicile",
  "Carte Vitale",
  "Autre",
];

export default function CoffreFortPage() {
  const { state, addVaultDocument } = useAppStore();
  const { vaultDocuments } = state;

  const [formOpen, setFormOpen] = useState(false);
  const [type, setType] = useState(DOCUMENT_TYPES[0]);
  const [label, setLabel] = useState("");
  const [confirmation, setConfirmation] = useState<string | null>(null);

  const toWatch = vaultDocuments.filter(
    (d) => d.validityStatus === "expire_bientot" || d.validityStatus === "a_verifier"
  );

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file && !label) setLabel(file.name);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!label.trim()) return;
    addVaultDocument({ type, label: label.trim(), expiresAt: null });
    setConfirmation(`« ${label.trim()} » a été ajouté à votre coffre-fort.`);
    setLabel("");
    setFormOpen(false);
    setTimeout(() => setConfirmation(null), 4000);
  }

  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-ink">Coffre-fort</h1>
          <p className="mt-1 text-ink-soft">
            Vos documents, en sécurité, réutilisés automatiquement pour vos démarches.
          </p>
        </div>
        <Button type="button" onClick={() => setFormOpen((v) => !v)}>
          {formOpen ? "Annuler" : "Ajouter un document"}
        </Button>
      </div>

      {confirmation && (
        <div className="rounded-2xl bg-primary-light p-4 text-sm font-medium text-primary">
          ✓ {confirmation}
        </div>
      )}

      {formOpen && (
        <form
          onSubmit={handleSubmit}
          className="space-y-4 rounded-2xl border border-ink/10 bg-white p-5"
        >
          <div>
            <label htmlFor="doc-type" className="text-sm font-medium text-ink">
              Type de document
            </label>
            <select
              id="doc-type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="mt-2 w-full rounded-xl border border-ink/15 px-4 py-3 text-ink outline-none focus:border-primary"
            >
              {DOCUMENT_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="doc-file" className="text-sm font-medium text-ink">
              Fichier
            </label>
            <input
              id="doc-file"
              type="file"
              onChange={handleFileChange}
              className="mt-2 w-full text-sm text-ink-soft file:mr-4 file:rounded-xl file:border-0 file:bg-primary-light file:px-4 file:py-2 file:font-medium file:text-primary"
            />
          </div>

          <div>
            <label htmlFor="doc-label" className="text-sm font-medium text-ink">
              Nom du document
            </label>
            <input
              id="doc-label"
              type="text"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder="Ex. Passeport"
              className="mt-2 w-full rounded-xl border border-ink/15 px-4 py-3 text-ink outline-none focus:border-primary"
            />
          </div>

          <Button type="submit" disabled={!label.trim()}>
            Ajouter au coffre-fort
          </Button>
        </form>
      )}

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
        {vaultDocuments.map((document) => (
          <DocumentTile key={document.id} document={document} />
        ))}
        {vaultDocuments.length === 0 && (
          <p className="text-ink-soft">Aucun document pour l&apos;instant.</p>
        )}
      </div>
    </div>
  );
}
