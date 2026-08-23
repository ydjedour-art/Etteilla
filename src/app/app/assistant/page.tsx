"use client";

import { useEffect, useRef, useState } from "react";
import { AssistantBubble } from "@/components/AssistantBubble";
import { Button } from "@/components/Button";
import { useAppStore } from "@/lib/store";
import { findPlan } from "@/lib/plans";

/** Bulle "en train d'écrire" pendant l'appel au concierge Claude — même
 * enveloppe visuelle qu'une réponse assistant, pour ne pas faire sauter la
 * mise en page quand la vraie réponse arrive. */
function ThinkingBubble() {
  return (
    <div className="flex justify-start">
      <div className="flex items-center gap-1.5 rounded-2xl bg-primary/10 px-4 py-3.5">
        <span className="thinking-dot" />
        <span className="thinking-dot [animation-delay:0.15s]" />
        <span className="thinking-dot [animation-delay:0.3s]" />
      </div>
      <style jsx>{`
        .thinking-dot {
          width: 6px;
          height: 6px;
          border-radius: 999px;
          background: var(--primary);
          opacity: 0.5;
          animation: thinking-bounce 1s ease-in-out infinite;
        }
        @keyframes thinking-bounce {
          0%,
          80%,
          100% {
            opacity: 0.3;
            transform: translateY(0);
          }
          40% {
            opacity: 1;
            transform: translateY(-3px);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .thinking-dot {
            animation: none;
            opacity: 0.6;
          }
        }
      `}</style>
    </div>
  );
}

/** Écran d'accès pour qui n'a pas la formule Zen Total — le concierge IA
 * (vrai Claude, pas un mock) est réservé à ce palier, cf. src/lib/plans.ts
 * ("Un·e concierge dédié·e qui connaît le dossier"). Le décrypteur de
 * courrier (/app/decodeur) reste lui accessible à tout le monde : c'est la
 * "option IA" générale, le concierge conversationnel est l'avantage Zen. */
function ZenUpsell() {
  const zen = findPlan("zen_total");

  return (
    <div className="flex flex-1 flex-col items-center justify-center rounded-2xl border border-ink/10 bg-card p-8 text-center">
      <p className="eyebrow">Réservé à Zen Total</p>
      <h1 className="mt-2 font-display text-2xl font-semibold text-ink">
        Un concierge Claude, dédié à ton dossier
      </h1>
      <p className="mx-auto mt-2 max-w-md text-sm text-ink-soft">
        Avec la formule Zen Total, discute librement avec un assistant IA propulsé par
        Claude : il connaît tes démarches, répond à tes questions et peut prendre le
        relais quand tu préfères déléguer.
      </p>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <Button href="/tarifs">
          Découvrir Zen Total{zen ? ` — ${zen.monthlyPrice.toFixed(2).replace(".", ",").replace(",00", "")} €/mois` : ""}
        </Button>
        <Button href="/app/decodeur" variant="secondary">
          Essayer le décrypteur de courrier
        </Button>
      </div>
      <p className="mt-4 text-xs text-ink-soft">
        Pas encore prêt·e à t&apos;engager ? Le décrypteur de courrier (IA aussi) reste
        disponible dans toutes les formules.
      </p>
    </div>
  );
}

function AssistantChat() {
  const { state, sendAssistantMessage } = useAppStore();
  const [draft, setDraft] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [state.assistantMessages, state.assistantThinking]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!draft.trim() || state.assistantThinking) return;
    sendAssistantMessage(draft.trim());
    setDraft("");
  }

  return (
    <div className="flex h-[calc(100vh-6rem)] flex-col sm:h-[calc(100vh-5rem)]">
      <div>
        <p className="eyebrow">Concierge Zen Total · propulsé par Claude</p>
        <h1 className="mt-1 text-2xl font-semibold text-ink">Assistant</h1>
        <p className="mt-1 text-ink-soft">
          Posez n&apos;importe quelle question sur vos démarches, en langage simple.
        </p>
      </div>

      <div className="mt-6 flex-1 space-y-4 overflow-y-auto pb-4">
        {state.assistantMessages.map((message) => (
          <AssistantBubble key={message.id} message={message} />
        ))}
        {state.assistantThinking && <ThinkingBubble />}
        <div ref={bottomRef} />
      </div>

      {state.assistantError && (
        <p className="mb-3 rounded-xl bg-critical/10 p-3 text-sm text-critical">
          {state.assistantError}
        </p>
      )}

      <form onSubmit={handleSubmit} className="flex gap-2 border-t border-ink/10 pt-4">
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Écrivez votre question..."
          disabled={state.assistantThinking}
          className="flex-1 rounded-xl border border-ink/15 px-4 py-3 text-ink outline-none focus:border-primary disabled:opacity-60"
        />
        <Button type="submit" disabled={!draft.trim() || state.assistantThinking}>
          Envoyer
        </Button>
      </form>
    </div>
  );
}

export default function AssistantPage() {
  const { state } = useAppStore();
  const isZen = state.user.subscription === "zen_total";

  if (!isZen) {
    return (
      <div className="flex h-[calc(100vh-6rem)] flex-col sm:h-[calc(100vh-5rem)]">
        <ZenUpsell />
      </div>
    );
  }

  return <AssistantChat />;
}
