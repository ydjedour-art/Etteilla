"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRightIcon } from "@/components/icons";
import { useAppStore } from "@/lib/store";

const EXAMPLES = [
  "J'ai reçu une mise en demeure de la CAF",
  "Avis d'imposition avec un montant à payer",
  "Lettre de la préfecture sur mon titre de séjour",
  "Relance URSSAF que je ne comprends pas",
];

type Urgence = "faible" | "moyenne" | "élevée";

interface DecodeResult {
  type: string;
  urgence: Urgence;
  delai: string;
  explication: string;
  piege: string;
  etapes: string[];
  izyd: {
    prise_en_charge: boolean;
    demarche: string;
    raison: string;
  };
}

const URGENCE_STYLE: Record<Urgence, string> = {
  faible: "bg-success/10 text-success",
  moyenne: "bg-attention/10 text-attention",
  élevée: "bg-critical/10 text-critical",
};

/** Décrypteur de courrier administratif — colle une lettre ou décris ta
 * situation, l'IA renvoie une analyse structurée + ce qu'IZY/D peut prendre
 * en charge. Appelle /api/decode (clé Anthropic côté serveur uniquement). */
export function LetterDecoder() {
  const router = useRouter();
  const { state } = useAppStore();
  const isZen = state.user.subscription === "zen_total";
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<DecodeResult | null>(null);

  async function decode() {
    if (!text.trim() || loading) return;
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("/api/decode", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: text.trim() }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data?.error || "Le décryptage a échoué. Réessaie dans un instant.");
        return;
      }
      setResult(data);
    } catch {
      setError("Connexion impossible. Vérifie ta connexion et réessaie.");
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      e.preventDefault();
      decode();
    }
  }

  return (
    <div>
      <div className="rounded-2xl border border-ink/10 bg-card p-6">
        <p className="eyebrow">Décrypteur IA</p>
        <h2 className="mt-2 font-display text-xl font-semibold text-ink">
          Décrypte ta lettre
        </h2>
        <p className="mt-1 text-sm text-ink-soft">
          Colle le texte, on t&apos;explique ce que ça veut dire et ce qu&apos;on
          peut faire à ta place.
        </p>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={5}
          placeholder="Colle ta lettre, ou explique ta situation…"
          className="mt-4 w-full resize-none rounded-xl border border-ink/15 bg-bg px-4 py-3 text-ink outline-none focus:border-primary"
        />

        <div className="mt-3 flex flex-wrap gap-2">
          {EXAMPLES.map((example) => (
            <button
              key={example}
              type="button"
              onClick={() => setText(example)}
              className="border border-ink/10 px-3 py-1.5 text-xs text-ink-soft hover:border-primary/40 hover:text-primary"
            >
              {example}
            </button>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={decode}
            disabled={!text.trim() || loading}
            className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-base font-bold text-accent-foreground transition-colors hover:bg-primary-hover disabled:opacity-50 disabled:pointer-events-none"
          >
            {loading && <span className="spinner" aria-hidden="true" />}
            {loading ? "Décryptage…" : "Décrypter"}
          </button>
          <span className="text-xs text-ink-soft">Cmd/Ctrl + Entrée pour envoyer</span>
        </div>

        {error && (
          <p className="mt-4 rounded-xl bg-critical/10 p-3 text-sm text-critical">{error}</p>
        )}
      </div>

      {result && (
        <div className="mt-6 rounded-2xl border border-ink/10 bg-card p-6">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <p className="font-display text-lg font-semibold text-ink">{result.type}</p>
            <span
              className={`whitespace-nowrap px-3 py-1 text-xs font-bold ${URGENCE_STYLE[result.urgence]}`}
            >
              Urgence {result.urgence}
            </span>
          </div>

          <div className="mt-5 space-y-5">
            <div>
              <p className="text-sm font-bold text-ink">📄 Ce que c&apos;est</p>
              <p className="mt-1 text-sm text-ink-soft">{result.explication}</p>
            </div>

            <div>
              <p className="text-sm font-bold text-ink">⏰ Le délai réel</p>
              <p className="mt-1.5 inline-flex rounded-lg bg-accent px-2.5 py-1 font-mono text-sm font-bold text-accent-foreground">
                {result.delai}
              </p>
            </div>

            <div>
              <p className="text-sm font-bold text-ink">⚠️ Le piège</p>
              <p className="mt-1 text-sm text-ink-soft">{result.piege}</p>
            </div>

            <div>
              <p className="text-sm font-bold text-ink">✅ Que faire</p>
              <ol className="mt-2 space-y-1.5">
                {result.etapes.map((etape, i) => (
                  <li key={i} className="flex gap-2 text-sm text-ink-soft">
                    <span className="font-mono font-bold text-primary">{i + 1}.</span>
                    {etape}
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-ink/10 bg-surface p-4">
            {result.izyd.prise_en_charge ? (
              <>
                <p className="font-display font-semibold text-ink">
                  On peut s&apos;en occuper — {result.izyd.demarche}
                </p>
                <p className="mt-1 text-sm text-ink-soft">{result.izyd.raison}</p>
                <button
                  type="button"
                  onClick={() => router.push("/onboarding")}
                  className="mt-3 inline-flex min-h-[44px] items-center gap-1.5 rounded-xl bg-primary px-4 py-2.5 text-sm font-bold text-accent-foreground hover:bg-primary-hover"
                >
                  On s&apos;en occupe <ArrowRightIcon className="h-4 w-4" />
                </button>
              </>
            ) : (
              <>
                <p className="font-display font-semibold text-ink">Rien à déléguer ici</p>
                <p className="mt-1 text-sm text-ink-soft">{result.izyd.raison}</p>
              </>
            )}
          </div>

          <p className="mt-4 text-xs text-ink-soft">
            Info, pas conseil juridique. Vérifie toujours sur{" "}
            <a
              href="https://www.service-public.fr"
              target="_blank"
              rel="noreferrer"
              className="underline hover:text-ink"
            >
              service-public.fr
            </a>
            .
          </p>

          {isZen ? (
            <button
              type="button"
              onClick={() => router.push("/app/assistant")}
              className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
            >
              Envie d&apos;en discuter ? Continue avec ton concierge <ArrowRightIcon className="h-3.5 w-3.5" />
            </button>
          ) : (
            <p className="mt-3 text-xs text-ink-soft">
              Une question de suivi ? La formule{" "}
              <button
                type="button"
                onClick={() => router.push("/tarifs")}
                className="font-medium text-primary hover:underline"
              >
                Zen Total
              </button>{" "}
              inclut un concierge Claude qui garde le fil de la conversation.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
