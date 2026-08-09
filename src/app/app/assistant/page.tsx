"use client";

import { useEffect, useRef, useState } from "react";
import { AssistantBubble } from "@/components/AssistantBubble";
import { Button } from "@/components/Button";
import { useAppStore } from "@/lib/store";

export default function AssistantPage() {
  const { state, sendAssistantMessage } = useAppStore();
  const [draft, setDraft] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [state.assistantMessages]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!draft.trim()) return;
    sendAssistantMessage(draft.trim());
    setDraft("");
  }

  return (
    <div className="flex h-[calc(100vh-6rem)] flex-col sm:h-[calc(100vh-5rem)]">
      <div>
        <h1 className="text-2xl font-semibold text-ink">Assistant</h1>
        <p className="mt-1 text-ink-soft">
          Posez n&apos;importe quelle question sur vos démarches, en langage simple.
        </p>
      </div>

      <div className="mt-6 flex-1 space-y-4 overflow-y-auto pb-4">
        {state.assistantMessages.map((message) => (
          <AssistantBubble key={message.id} message={message} />
        ))}
        <div ref={bottomRef} />
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2 border-t border-ink/10 pt-4">
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Écrivez votre question..."
          className="flex-1 rounded-xl border border-ink/15 px-4 py-3 text-ink outline-none focus:border-primary"
        />
        <Button type="submit" disabled={!draft.trim()}>
          Envoyer
        </Button>
      </form>
    </div>
  );
}
