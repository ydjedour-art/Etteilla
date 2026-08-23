import { NextResponse } from "next/server";
import { AnthropicError, callAnthropicChat, type ChatTurn } from "@/lib/assistant/claude";
import { checkRateLimit } from "@/lib/decode/rate-limit";

// Le fetch vers l'API Anthropic doit tourner en runtime Node, pas Edge.
export const runtime = "nodejs";

const MAX_MESSAGE_LENGTH = 4000;
const MAX_HISTORY_TURNS = 20;

const SYSTEM_PROMPT = `Tu es le concierge IZY/D, un assistant personnel dédié aux abonné·es de la formule Zen Total. Tu parles en français, tu tutoies, ton ton est chaleureux, direct et rassurant — jamais bureaucratique.

Ton rôle : aider l'utilisateur·rice à comprendre et avancer sur ses démarches administratives françaises (CAF, impôts, URSSAF, CPAM, préfecture/titre de séjour, mutuelle, changement d'adresse, retraite, etc.). Tu expliques en langage simple, tu donnes les délais et pièges concrets quand tu les connais, et tu rappelles que IZY/D peut prendre en charge la démarche à sa place (formule Zen Total : démarches déléguées illimitées, concierge dédié, mandat de représentation).

Règles :
- Réponses courtes et actionnables (quelques phrases ou une liste à puces courte), pas de pavé.
- Ne jamais inventer de numéro de loi, de montant ou de délai précis que tu ne connais pas avec certitude — reste prudent et généraliste dans ce cas, et invite à vérifier sur service-public.fr ou à laisser IZY/D s'en charger.
- Tu n'es pas un conseil juridique ou fiscal formel : tu informes et tu orientes.
- Si la question sort complètement du champ administratif/démarches, réponds brièvement puis recentre gentiment vers ce que tu sais faire.`;

function isChatTurn(value: unknown): value is ChatTurn {
  const v = value as Partial<ChatTurn> | null;
  return (
    !!v &&
    typeof v === "object" &&
    (v.role === "user" || v.role === "assistant") &&
    typeof v.content === "string" &&
    v.content.trim().length > 0 &&
    v.content.length <= MAX_MESSAGE_LENGTH
  );
}

function clientKey(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  return `assistant:${forwarded?.split(",")[0]?.trim() || "local"}`;
}

export async function POST(req: Request) {
  if (!checkRateLimit(clientKey(req))) {
    return NextResponse.json(
      { error: "Trop de demandes. Réessaie dans une minute." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  const rawMessages = (body as { messages?: unknown } | null)?.messages;
  if (!Array.isArray(rawMessages) || rawMessages.length === 0 || !rawMessages.every(isChatTurn)) {
    return NextResponse.json({ error: "Historique de conversation invalide." }, { status: 400 });
  }
  if (rawMessages[rawMessages.length - 1].role !== "user") {
    return NextResponse.json({ error: "Le dernier message doit venir de l'utilisateur." }, { status: 400 });
  }

  // On ne garde que les derniers tours : borne la taille du payload et le
  // coût de l'appel, un concierge n'a pas besoin de tout l'historique
  // depuis le début de la formule pour répondre utilement.
  const turns = rawMessages.slice(-MAX_HISTORY_TURNS) as ChatTurn[];

  try {
    const reply = await callAnthropicChat(SYSTEM_PROMPT, turns);
    return NextResponse.json({ reply });
  } catch (err) {
    if (err instanceof AnthropicError) {
      console.error("[api/assistant] Anthropic error:", err.message);
    } else {
      console.error("[api/assistant] Unexpected error:", err);
    }
    return NextResponse.json(
      { error: "Le concierge n'a pas pu répondre. Réessaie dans un instant." },
      { status: 502 }
    );
  }
}
