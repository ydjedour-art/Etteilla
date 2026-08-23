// Appel à l'API Messages d'Anthropic pour l'assistant conversationnel Zen
// Total — contrairement à src/lib/decode/anthropic.ts (un seul message,
// réponse JSON structurée), ici on rejoue tout l'historique de la
// conversation à chaque appel : Claude n'a pas de mémoire côté serveur,
// donc c'est au client de renvoyer les tours précédents (voir route.ts).

const ANTHROPIC_ENDPOINT = "https://api.anthropic.com/v1/messages";
const ANTHROPIC_VERSION = "2023-06-01";
const MODEL = "claude-sonnet-5";
const MAX_TOKENS = 1024;
const TIMEOUT_MS = 25_000;

export class AnthropicError extends Error {}

export interface ChatTurn {
  role: "user" | "assistant";
  content: string;
}

/** Appelle Claude avec un prompt système fixe et l'historique complet de la
 * conversation. Retourne le texte de la réponse de l'assistant (texte
 * libre, pas de JSON attendu ici). */
export async function callAnthropicChat(systemPrompt: string, turns: ChatTurn[]): Promise<string> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new AnthropicError("ANTHROPIC_API_KEY absente des variables d'environnement.");
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const res = await fetch(ANTHROPIC_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": ANTHROPIC_VERSION,
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: MAX_TOKENS,
        system: systemPrompt,
        messages: turns.map((t) => ({ role: t.role, content: t.content })),
      }),
      signal: controller.signal,
    });

    if (!res.ok) {
      const body = await res.text().catch(() => "");
      throw new AnthropicError(`Anthropic a répondu ${res.status} : ${body.slice(0, 300)}`);
    }

    const data = await res.json();
    const textBlock = Array.isArray(data?.content)
      ? data.content.find((block: unknown): block is { type: "text"; text: string } => {
          const b = block as { type?: unknown; text?: unknown } | null;
          return !!b && b.type === "text" && typeof b.text === "string";
        })
      : null;

    if (!textBlock || !textBlock.text.trim()) {
      throw new AnthropicError("Réponse Anthropic vide ou inattendue.");
    }
    return textBlock.text.trim();
  } catch (err) {
    if (err instanceof AnthropicError) throw err;
    if (err instanceof Error && err.name === "AbortError") {
      throw new AnthropicError("Anthropic n'a pas répondu à temps.");
    }
    throw new AnthropicError(`Appel Anthropic échoué : ${(err as Error).message}`);
  } finally {
    clearTimeout(timeout);
  }
}
