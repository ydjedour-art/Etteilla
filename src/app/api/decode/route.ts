import { NextResponse } from "next/server";
import { AnthropicError, callAnthropic, parseDecodeJson } from "@/lib/decode/anthropic";
import { checkRateLimit } from "@/lib/decode/rate-limit";

// Le fetch vers l'API Anthropic doit tourner en runtime Node, pas Edge.
export const runtime = "nodejs";

const MAX_TEXT_LENGTH = 6000;

const SYSTEM_PROMPT = `Tu es l'assistant IZY/D. Tu décryptes les courriers administratifs français en langage clair et rassurant, avec le tutoiement.
On te donne le texte d'une lettre ou la description d'un problème. Tu réponds UNIQUEMENT avec un objet JSON valide, sans texte autour, sans backticks, sans markdown.

Schéma exact :
{
 "type": "phrase courte disant ce que c'est",
 "urgence": "faible" | "moyenne" | "élevée",
 "delai": "le délai concret à retenir, ex: '2 mois pour contester'",
 "explication": "2-3 phrases simples : ce que ça veut dire vraiment",
 "piege": "1-2 phrases : le principal risque ou l'erreur à ne pas commettre",
 "etapes": ["étape actionnable 1", "étape 2", "étape 3"],
 "izyd": {
   "prise_en_charge": true | false,
   "demarche": "nom court de la démarche IZY/D concernée",
   "raison": "1 phrase : ce qu'IZY/D ferait à sa place, OU pourquoi rien n'est à déléguer"
 }
}

Règles :
- "prise_en_charge" = true seulement si IZY/D peut réellement avancer la démarche à la place de l'usager (remplir, envoyer, suivre un dossier CAF, impôts, URSSAF, titre de séjour, CPAM, changement d'adresse...).
- false si tout est déjà réglé, purement informatif, ou hors périmètre.
- Ne jamais inventer de numéro de loi ni de montant non présent dans le texte. Rester bref et prudent. Ajouter mentalement que ce n'est pas un conseil juridique.`;

interface DecodeResult {
  type: string;
  urgence: "faible" | "moyenne" | "élevée";
  delai: string;
  explication: string;
  piege: string;
  etapes: string[];
  izyd: {
    prise_en_charge: boolean;
    demarche: string;
    raison: string;
  };
}

function isDecodeResult(value: unknown): value is DecodeResult {
  const v = value as Partial<DecodeResult> | null;
  if (!v || typeof v !== "object") return false;
  if (typeof v.type !== "string" || !v.type.trim()) return false;
  if (v.urgence !== "faible" && v.urgence !== "moyenne" && v.urgence !== "élevée") return false;
  if (typeof v.delai !== "string") return false;
  if (typeof v.explication !== "string") return false;
  if (typeof v.piege !== "string") return false;
  if (!Array.isArray(v.etapes) || !v.etapes.every((e) => typeof e === "string")) return false;
  const izyd = v.izyd as Partial<DecodeResult["izyd"]> | undefined;
  if (!izyd || typeof izyd !== "object") return false;
  if (typeof izyd.prise_en_charge !== "boolean") return false;
  if (typeof izyd.demarche !== "string") return false;
  if (typeof izyd.raison !== "string") return false;
  return true;
}

function clientKey(req: Request): string {
  // Derrière un proxy/CDN en prod, x-forwarded-for porte l'IP réelle du
  // visiteur ; en local, on retombe sur une clé unique partagée (pas
  // d'IP fiable disponible).
  const forwarded = req.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || "local";
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

  const text = (body as { text?: unknown } | null)?.text;
  if (typeof text !== "string" || !text.trim()) {
    return NextResponse.json({ error: "Le texte de la lettre est manquant." }, { status: 400 });
  }
  if (text.length > MAX_TEXT_LENGTH) {
    return NextResponse.json({ error: "Texte trop long." }, { status: 400 });
  }

  try {
    const raw = await callAnthropic(SYSTEM_PROMPT, text.trim());
    const parsed = parseDecodeJson(raw);

    if (!isDecodeResult(parsed)) {
      return NextResponse.json(
        { error: "Réponse inattendue de l'analyse. Réessaie." },
        { status: 502 }
      );
    }

    // On ne renvoie au client que le JSON structuré et parsé — jamais la
    // réponse brute du modèle, ni le texte de la lettre (pas de stockage
    // ni de réémission du contenu envoyé, au-delà de ce traitement direct).
    return NextResponse.json(parsed);
  } catch (err) {
    if (err instanceof AnthropicError) {
      console.error("[api/decode] Anthropic error:", err.message);
    } else {
      console.error("[api/decode] Unexpected error:", err);
    }
    return NextResponse.json(
      { error: "Le décryptage a échoué. Réessaie dans un instant." },
      { status: 502 }
    );
  }
}
