// Appel à l'API Messages d'Anthropic — voir route.ts pour l'orchestration
// complète. Pas de SDK : un simple fetch suffit pour un seul endpoint,
// cohérent avec src/lib/triage/groq.ts (même approche pour Groq).

const ANTHROPIC_ENDPOINT = "https://api.anthropic.com/v1/messages";
const ANTHROPIC_VERSION = "2023-06-01";
// Modèle Claude actuel au moment de l'écriture — à reconfirmer dans la
// console Anthropic si un modèle plus récent est disponible.
const MODEL = "claude-sonnet-5";
const MAX_TOKENS = 1000;
const TIMEOUT_MS = 20_000;

export class AnthropicError extends Error {}

/** Appelle Claude avec un prompt système fixe et le texte de l'utilisateur
 * en unique message. Retourne le texte brut de la réponse (le JSON attendu
 * par le prompt système, potentiellement entouré de backticks). */
export async function callAnthropic(systemPrompt: string, userText: string): Promise<string> {
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
        messages: [{ role: "user", content: userText }],
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
    return textBlock.text;
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

/** Extrait un objet JSON de la réponse du modèle : enlève d'éventuels
 * backticks/fences markdown avant de parser (le prompt système demande du
 * JSON pur, mais on reste défensif). */
export function parseDecodeJson(raw: string): unknown | null {
  const stripped = raw
    .trim()
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/```\s*$/i, "")
    .trim();

  try {
    return JSON.parse(stripped);
  } catch {
    const match = stripped.match(/\{[\s\S]*\}/);
    if (!match) return null;
    try {
      return JSON.parse(match[0]);
    } catch {
      return null;
    }
  }
}
