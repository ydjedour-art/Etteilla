"use client";

import confetti from "canvas-confetti";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/Button";
import { themeEmoji } from "@/lib/theme-emoji";
import type { ChatMessage } from "@/lib/triage/types";
import type { TriageRecap } from "@/lib/triage/recap";

const EXAMPLES = [
  "Je viens de déménager",
  "J'ai perdu mon travail",
  "Mon titre de séjour arrive à échéance",
  "On attend un enfant",
];

interface FoundResult {
  fiche_id: string;
  titre: string;
  resume: string;
  confiance: number;
  theme: string;
  themeSlug: string;
  url: string;
  href: string;
  recap: TriageRecap;
}

/** Pluie de confettis légère et joyeuse — deux jets croisés depuis les coins
 * bas de l'écran, comme un feu d'artifice discret plutôt qu'un mur de
 * couleurs. canvas-confetti : ~3 Ko, zéro dépendance, l'outil standard pour
 * cet effet précis. */
function celebrate() {
  const colors = ["#3D4A66", "#8B9BC4", "#F5F5F7"];
  const shared: confetti.Options = { colors, ticks: 220, gravity: 0.9, scalar: 0.9 };
  confetti({ ...shared, particleCount: 70, angle: 60, spread: 65, origin: { x: 0, y: 0.9 } });
  confetti({ ...shared, particleCount: 70, angle: 120, spread: 65, origin: { x: 1, y: 0.9 } });
}

type TurnState =
  | { kind: "idle" }
  | { kind: "question"; question: string; options: string[] }
  | { kind: "found"; data: FoundResult }
  | { kind: "empty"; message: string }
  | { kind: "error"; message: string };

/** Chat de triage IA : décrit ta situation en une phrase, réponds à 1-4
 * questions à choix (A/B/C/D), on te sort la fiche exacte. Le serveur
 * (/api/triage) fait tout le travail (recherche + Groq) ; ce composant ne
 * fait que dérouler la conversation et rejouer l'historique à chaque tour —
 * voir src/app/api/triage/route.ts pour le protocole. */
export function TriageChat() {
  const [history, setHistory] = useState<ChatMessage[]>([]);
  const [state, setState] = useState<TurnState>({ kind: "idle" });
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [celebrated, setCelebrated] = useState(false);

  async function send(nextHistory: ChatMessage[]) {
    setLoading(true);
    try {
      const res = await fetch("/api/triage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextHistory }),
      });
      const data = await res.json();

      if (data.status === "need_more_info") {
        setHistory([...nextHistory, { role: "assistant", content: data.raw }]);
        setState({ kind: "question", question: data.question, options: data.options });
      } else if (data.status === "found") {
        setHistory([...nextHistory, { role: "assistant", content: data.raw }]);
        setState({ kind: "found", data });
      } else if (data.status === "not_found") {
        setState({ kind: "empty", message: data.message });
      } else {
        setState({ kind: "error", message: data.message ?? "Une erreur est survenue." });
      }
    } catch {
      setState({ kind: "error", message: "Connexion impossible. Réessaie dans un instant." });
    } finally {
      setLoading(false);
    }
  }

  function start(text: string) {
    const trimmed = text.trim();
    if (!trimmed) return;
    const next: ChatMessage[] = [{ role: "user", content: trimmed }];
    setHistory(next);
    setQuery("");
    send(next);
  }

  function answer(optionText: string) {
    const next: ChatMessage[] = [...history, { role: "user", content: optionText }];
    setHistory(next);
    send(next);
  }

  function reset() {
    setHistory([]);
    setState({ kind: "idle" });
    setQuery("");
    setCelebrated(false);
  }

  return (
    <div className="card-surface mx-auto max-w-xl p-6 sm:p-8">
      <div className="flex items-center gap-2">
        <span aria-hidden="true" className="text-xl">
          🧭
        </span>
        <p className="font-display text-lg font-semibold text-ink">Triage IZY/D</p>
      </div>
      <p className="mt-1 text-sm text-ink-soft">
        Décris ta situation, 3-4 questions max, on te sort la bonne démarche.
      </p>

      {/* Transcript des tours précédents */}
      {history.length > 0 && (
        <div className="mt-5 space-y-2.5">
          {history.map((m, i) => {
            if (m.role === "user") {
              return (
                <div key={i} className="flex justify-end">
                  <div className="max-w-[85%] rounded-2xl bg-primary px-4 py-2.5 text-sm text-accent-foreground">
                    {m.content}
                  </div>
                </div>
              );
            }
            let question: string | null = null;
            try {
              const parsed = JSON.parse(m.content);
              if (parsed.status === "need_more_info") question = parsed.question;
            } catch {
              // ignore : réponse "found", déjà affichée via la carte résultat
            }
            if (!question) return null;
            return (
              <div key={i} className="flex justify-start">
                <div className="max-w-[85%] rounded-2xl bg-primary/10 px-4 py-2.5 text-sm text-ink">
                  {question}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {loading && (
        <div className="mt-3 flex justify-start">
          <div className="rounded-2xl bg-primary/10 px-4 py-2.5 text-sm text-ink-soft">
            On regarde… 🔍
          </div>
        </div>
      )}

      {/* Écran initial */}
      {state.kind === "idle" && !loading && (
        <>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              start(query);
            }}
            className="mt-5 flex flex-col gap-3 sm:flex-row"
          >
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ex. « je viens de déménager »"
              className="flex-1 rounded-xl border border-ink/15 px-4 py-3 text-ink outline-none focus:border-primary"
            />
            <Button type="submit" disabled={!query.trim()}>
              C&apos;est parti
            </Button>
          </form>
          <div className="mt-4 flex flex-wrap gap-2">
            {EXAMPLES.map((example) => (
              <button
                key={example}
                type="button"
                onClick={() => start(example)}
                className="border border-ink/10 px-3 py-1.5 text-xs text-ink-soft hover:border-primary/40 hover:text-primary"
              >
                {example}
              </button>
            ))}
          </div>
        </>
      )}

      {/* Question à choix */}
      {state.kind === "question" && !loading && (
        <div className="mt-4 flex flex-col gap-2.5">
          {state.options.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => answer(option)}
              className="card-interactive px-4 py-3 text-left text-sm font-semibold text-ink"
            >
              {option}
            </button>
          ))}
        </div>
      )}

      {/* Résultat trouvé + récap actionnable */}
      {state.kind === "found" && (
        <div className="mt-5">
          <div className="flex items-start gap-3">
            <span aria-hidden="true" className="text-2xl">
              {themeEmoji(state.data.themeSlug)}
            </span>
            <div>
              <p className="text-xs font-bold text-ink-soft">{state.data.theme}</p>
              <p className="font-display text-lg font-semibold text-ink">{state.data.titre}</p>
            </div>
          </div>
          <p className="mt-3 text-sm text-ink-soft">{state.data.resume}</p>

          {/* Récap : étapes, documents, durée — jamais de renvoi vers la
              source d'origine dans ce flux (voir src/lib/triage/recap.ts). */}
          <div className="mt-5 rounded-2xl border border-ink/10 bg-surface p-5">
            <p className="text-xs font-bold uppercase tracking-wide text-ink-soft">Ce qu&apos;il y a à faire</p>
            <ol className="mt-3 space-y-2">
              {state.data.recap.etapes.map((etape, i) => (
                <li key={i} className="flex gap-2.5 text-sm text-ink">
                  <span className="font-mono font-bold text-primary">{i + 1}.</span>
                  {etape}
                </li>
              ))}
            </ol>

            {state.data.recap.documents.length > 0 && (
              <div className="mt-4 border-t border-ink/10 pt-4">
                <p className="text-xs font-bold uppercase tracking-wide text-ink-soft">Documents nécessaires</p>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {state.data.recap.documents.map((doc) => (
                    <li
                      key={doc}
                      className="border border-ink/10 bg-card px-3 py-1 text-xs font-medium text-ink"
                    >
                      {doc}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-4 flex items-center gap-2 border-t border-ink/10 pt-4 text-sm text-ink-soft">
              <span aria-hidden="true">⏱️</span>
              {state.data.recap.duree_estimee}
            </div>
          </div>

          {celebrated ? (
            <div className="mt-5 rounded-2xl bg-primary/10 p-5 text-center">
              <p className="font-display text-lg font-semibold text-ink">Bravo, tu gères ! 🎉</p>
              <p className="mt-1 text-sm text-ink-soft">
                On reste dispo si tu changes d&apos;avis en cours de route.
              </p>
              <Link href="/onboarding" className="mt-3 inline-block text-sm font-bold text-primary hover:underline">
                Besoin d&apos;aide finalement ?
              </Link>
            </div>
          ) : (
            <div className="mt-5 flex flex-col gap-2.5 sm:flex-row">
              <Button href="/onboarding" className="flex-1">
                Laissez-nous faire
              </Button>
              <button
                type="button"
                onClick={() => {
                  celebrate();
                  setCelebrated(true);
                }}
                className="inline-flex items-center justify-center rounded-pill border border-ink/10 px-5 py-3 text-sm font-semibold text-ink transition-colors hover:border-primary/40"
              >
                Je peux y arriver seul pour cette fois
              </button>
            </div>
          )}

          <button
            type="button"
            onClick={reset}
            className="mt-4 text-xs font-bold text-ink-soft hover:text-ink"
          >
            ← Ce n&apos;est pas ça, recommencer
          </button>
        </div>
      )}

      {/* Rien trouvé / erreur */}
      {(state.kind === "empty" || state.kind === "error") && (
        <div className="mt-5">
          <p className="text-sm text-ink-soft">{state.message}</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Button href="/onboarding" variant="secondary">
              Décrire ma situation à l&apos;inscription
            </Button>
            <button
              type="button"
              onClick={reset}
              className="text-sm font-bold text-ink-soft hover:text-ink"
            >
              Recommencer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
