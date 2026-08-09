"use client";

import { useEffect, useRef, useState } from "react";
import { AssistantBubble } from "@/components/AssistantBubble";
import { Button } from "@/components/Button";
import { getAssistantConversation } from "@/lib/data";
import type { AssistantMessage } from "@/lib/types";

// Réponse simulée pour le prototype — en production, cet appel part vers l'API
// assistant décrite dans docs/04-architecture-technique.md (Claude + RAG).
const CANNED_REPLY =
  "Bonne question. En production, je répondrais ici avec le contexte de vos dossiers réels — pour l'instant je suis une démonstration du design de l'assistant.";

export default function AssistantPage() {
  const [messages, setMessages] = useState<AssistantMessage[]>([]);
  const [draft, setDraft] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getAssistantConversation().then(setMessages);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function sendMessage(e: React.FormEvent) {
    e.preventDefault();
    if (!draft.trim()) return;
    const userMessage: AssistantMessage = {
      id: `local-${Date.now()}`,
      sender: "utilisateur",
      content: draft.trim(),
      createdAt: new Date().toISOString(),
    };
    const reply: AssistantMessage = {
      id: `local-${Date.now()}-reply`,
      sender: "assistant_ia",
      content: CANNED_REPLY,
      createdAt: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, userMessage, reply]);
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
        {messages.map((message) => (
          <AssistantBubble key={message.id} message={message} />
        ))}
        <div ref={bottomRef} />
      </div>

      <form onSubmit={sendMessage} className="flex gap-2 border-t border-ink/10 pt-4">
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Écrivez votre question..."
          className="flex-1 rounded-xl border border-ink/15 px-4 py-3 text-ink outline-none focus:border-primary"
        />
        <Button type="submit">Envoyer</Button>
      </form>
    </div>
  );
}
