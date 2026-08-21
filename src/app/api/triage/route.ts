import { NextResponse } from "next/server";
import { ficheHref } from "@/lib/fiche-href";
import { getFicheIndex } from "@/lib/generated-data";
import { callGroq, GroqError, parseTriageJson } from "@/lib/triage/groq";
import { buildCandidatesContext, TRIAGE_FORCE_CONCLUDE, TRIAGE_SYSTEM_PROMPT } from "@/lib/triage/prompt";
import { searchFiches, type ScoredFiche } from "@/lib/triage/search";
import type {
  ChatMessage,
  TriageApiResponse,
  TriageFound,
  TriageModelResponse,
  TriageQuestion,
} from "@/lib/triage/types";

// Lit data/generated/ via fs — doit tourner en runtime Node, pas Edge.
export const runtime = "nodejs";

const MAX_MESSAGES = 20;
const MAX_MESSAGE_LENGTH = 1000;
// "Jamais plus de 4 questions" (voir prompt.ts) : si le modèle a déjà posé
// 4 questions, cet appel doit obligatoirement conclure.
const MAX_QUESTIONS = 4;

function isValidMessages(value: unknown): value is ChatMessage[] {
  if (!Array.isArray(value) || value.length === 0 || value.length > MAX_MESSAGES) return false;
  return value.every(
    (m) =>
      m &&
      typeof m === "object" &&
      (m.role === "user" || m.role === "assistant") &&
      typeof m.content === "string" &&
      m.content.trim().length > 0 &&
      m.content.length <= MAX_MESSAGE_LENGTH
  );
}

function isTriageQuestion(value: unknown): value is TriageQuestion {
  const v = value as Partial<TriageQuestion> | null;
  return (
    !!v &&
    v.status === "need_more_info" &&
    typeof v.question === "string" &&
    v.question.trim().length > 0 &&
    Array.isArray(v.options) &&
    v.options.length >= 2 &&
    v.options.every((o) => typeof o === "string")
  );
}

function isTriageFound(value: unknown): value is TriageFound {
  const v = value as Partial<TriageFound> | null;
  return (
    !!v &&
    v.status === "found" &&
    typeof v.fiche_id === "string" &&
    v.fiche_id.trim().length > 0 &&
    typeof v.titre === "string" &&
    typeof v.resume === "string"
  );
}

function bestGuess(candidates: ScoredFiche[]): TriageFound {
  const top = candidates[0].entry;
  return {
    status: "found",
    fiche_id: top.id,
    titre: top.titre,
    resume: top.description || top.titre,
    confiance: 0.5,
  };
}

function enrichFound(found: TriageFound, candidates: ScoredFiche[], fullIndexById: Map<string, ScoredFiche["entry"]>) {
  const entry =
    candidates.find((c) => c.entry.id === found.fiche_id)?.entry ??
    fullIndexById.get(found.fiche_id) ??
    candidates[0].entry;

  return {
    ...found,
    fiche_id: entry.id,
    theme: entry.theme,
    themeSlug: entry.themeSlug,
    url: entry.url,
    href: ficheHref(entry),
  };
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json<TriageApiResponse>(
      { status: "error", message: "Requête invalide." },
      { status: 400 }
    );
  }

  const messages = (body as { messages?: unknown })?.messages;
  if (!isValidMessages(messages)) {
    return NextResponse.json<TriageApiResponse>(
      { status: "error", message: "Historique de conversation invalide." },
      { status: 400 }
    );
  }

  const firstUserMessage = messages.find((m) => m.role === "user")?.content ?? "";
  const index = await getFicheIndex();
  const candidates = searchFiches(index, firstUserMessage, 12);

  if (candidates.length === 0) {
    return NextResponse.json<TriageApiResponse>({
      status: "not_found",
      message:
        "On n'a pas trouvé de fiche qui corresponde à ce que tu décris. Essaie de reformuler, ou parcours le catalogue complet.",
    });
  }

  const questionsAsked = messages.filter((m) => m.role === "assistant").length;
  const forceConclude = questionsAsked >= MAX_QUESTIONS;

  const systemContent = [TRIAGE_SYSTEM_PROMPT, buildCandidatesContext(candidates), forceConclude ? TRIAGE_FORCE_CONCLUDE : null]
    .filter(Boolean)
    .join("\n\n");

  let parsed: TriageModelResponse | null = null;
  try {
    const raw = await callGroq([{ role: "system", content: systemContent }, ...messages]);
    const json = parseTriageJson(raw);
    if (isTriageQuestion(json)) parsed = json;
    else if (isTriageFound(json)) parsed = json;
  } catch (err) {
    const reason = err instanceof GroqError ? err.message : "Erreur inconnue";
    console.error("[api/triage] Groq call failed:", reason);
    return NextResponse.json<TriageApiResponse>(
      {
        status: "error",
        message: "Le triage est momentanément indisponible. Réessaie dans un instant.",
      },
      { status: 502 }
    );
  }

  // Filet de sécurité : si le modèle n'a pas obéi (mauvais format, ou
  // question posée malgré la limite atteinte), on force une conclusion
  // plutôt que de planter ou de dépasser le nombre de questions promis.
  if (!parsed || (forceConclude && parsed.status !== "found")) {
    parsed = bestGuess(candidates);
  }

  if (parsed.status === "need_more_info") {
    const response: TriageApiResponse = { ...parsed, raw: JSON.stringify(parsed) };
    return NextResponse.json(response);
  }

  const fullIndexById = new Map(index.map((entry) => [entry.id, entry]));
  const enriched = enrichFound(parsed, candidates, fullIndexById);
  const response: TriageApiResponse = { ...enriched, raw: JSON.stringify(enriched) };
  return NextResponse.json(response);
}
