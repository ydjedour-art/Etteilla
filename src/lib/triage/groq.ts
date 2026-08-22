// Appel à l'API Groq (compatible OpenAI) — voir data/README.md pour le
// modèle de données interrogé, et route.ts pour l'orchestration complète.
// Pas de SDK : un simple fetch suffit pour un seul endpoint, cohérent avec
// le reste du repo (pas de dépendance ajoutée pour peu).

const GROQ_ENDPOINT = "https://api.groq.com/openai/v1/chat/completions";
// llama-3.3-70b-versatile a été déprécié par Groq (17 juin 2026, tiers
// gratuit/développeur). Migré vers leur remplacement recommandé :
// https://console.groq.com/docs/deprecations
const MODEL = "openai/gpt-oss-120b";
const TIMEOUT_MS = 15_000;

export interface GroqMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export class GroqError extends Error {}

export async function callGroq(messages: GroqMessage[]): Promise<string> {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    throw new GroqError("GROQ_API_KEY absente des variables d'environnement.");
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const res = await fetch(GROQ_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: MODEL,
        messages,
        temperature: 0.3,
        max_tokens: 600,
        response_format: { type: "json_object" },
      }),
      signal: controller.signal,
    });

    if (!res.ok) {
      const body = await res.text().catch(() => "");
      throw new GroqError(`Groq a répondu ${res.status} : ${body.slice(0, 300)}`);
    }

    const data = await res.json();
    const content = data?.choices?.[0]?.message?.content;
    if (typeof content !== "string" || !content.trim()) {
      throw new GroqError("Réponse Groq vide ou inattendue.");
    }
    return content;
  } catch (err) {
    if (err instanceof GroqError) throw err;
    if (err instanceof Error && err.name === "AbortError") {
      throw new GroqError("Groq n'a pas répondu à temps.");
    }
    throw new GroqError(`Appel Groq échoué : ${(err as Error).message}`);
  } finally {
    clearTimeout(timeout);
  }
}

/** Extrait un objet JSON de la réponse du modèle, même s'il a ajouté du
 * texte autour (le mode JSON de Groq est fiable mais on reste défensif). */
export function parseTriageJson(raw: string): unknown | null {
  try {
    return JSON.parse(raw);
  } catch {
    const match = raw.match(/\{[\s\S]*\}/);
    if (!match) return null;
    try {
      return JSON.parse(match[0]);
    } catch {
      return null;
    }
  }
}
