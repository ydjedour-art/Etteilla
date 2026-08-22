"use client";

import { useState } from "react";
import { Button } from "@/components/Button";
import { ArrowRightIcon } from "@/components/icons";
import { themeEmoji } from "@/lib/theme-emoji";
import type { ChatMessage } from "@/lib/triage/types";

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
  }

  return (
    <div className="card-surface mx-auto max-w-xl p-6 sm:p-8">
      <div className="flex items-center gap-2">
        <span aria-hidden="true" className="text-xl">
          🧭
        </span>
        <p className="font-display text-lg font-extrabold text-ink">Triage IZY/D</p>
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
                  <div className="max-w-[85%] rounded-2xl bg-primary px-4 py-2.5 text-sm text-white">
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
                className="rounded-full border border-ink/10 px-3 py-1.5 text-xs text-ink-soft hover:border-primary/40 hover:text-primary"
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

      {/* Résultat trouvé */}
      {state.kind === "found" && (
        <div className="mt-5">
          <div className="flex items-start gap-3">
            <span aria-hidden="true" className="text-2xl">
              {themeEmoji(state.data.themeSlug)}
            </span>
            <div>
              <p className="text-xs font-bold text-ink-soft">{state.data.theme}</p>
              <p className="font-display text-lg font-extrabold text-ink">{state.data.titre}</p>
            </div>
          </div>
          <p className="mt-3 text-sm text-ink-soft">{state.data.resume}</p>
          <div className="mt-5 flex flex-col gap-2.5 sm:flex-row">
            <Button href="/onboarding" className="flex-1">
              😌 On s&apos;en occupe pour toi
            </Button>
            <a
              href={state.data.href}
              className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-ink/10 px-4 py-3 text-sm font-bold text-ink hover:border-primary/40"
            >
              Voir la fiche <ArrowRightIcon className="h-3.5 w-3.5" />
            </a>
          </div>
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
