// Récap post-triage : une fois la fiche trouvée, on résume son contenu en
// étapes actionnables / documents / durée, présenté comme un résumé IZY/D —
// jamais comme une citation de la source (voir TriageChat.tsx : ce flux ne
// doit pas laisser deviner que le contenu vient de Service-Public.gouv.fr,
// contrairement à la page fiche elle-même qui, elle, conserve l'attribution
// requise par la Licence Ouverte/Etalab — voir data/README.md).

import type { GeneratedFiche } from "@/types/fiches";

export interface TriageRecap {
  etapes: string[];
  documents: string[];
  duree_estimee: string;
}

export const RECAP_SYSTEM_PROMPT = `Tu es l'assistant IZY/D. À partir du contenu d'une fiche pratique, tu produis un récapitulatif court et actionnable pour quelqu'un qui vient de décrire sa situation.

Règle absolue : ne mentionne jamais "Service-Public", "service-public.fr", "DILA", ni aucune source externe. Présente ce récapitulatif comme le résumé d'IZY/D, jamais comme la citation d'un tiers.

Tu réponds UNIQUEMENT avec un objet JSON valide, sans texte autour, sans backticks, sans markdown.

Schéma exact :
{
  "etapes": ["étape actionnable 1", "étape 2", "étape 3"],
  "documents": ["document 1", "document 2"],
  "duree_estimee": "estimation courte, ex: '15 minutes' ou 'Quelques minutes, puis un délai de traitement variable'"
}

Règles :
- 3 étapes maximum, chacune une action concrète (verbe à l'infinitif), tutoiement.
- 2 à 4 documents maximum, seulement ceux mentionnés dans le contenu fourni. Liste vide si aucun document n'est identifiable.
- Ne jamais inventer un document, un délai ou un montant absent du texte fourni. Si le texte ne précise pas de délai, donne une estimation prudente et générale.
- Reste bref, concret, rassurant.`;

const MAX_CONTEXT_CHARS = 3500;

/** Construit le contexte fourni au modèle : titre + introduction + contenu
 * des chapitres, tronqué pour rester léger. */
export function buildRecapContext(fiche: GeneratedFiche): string {
  const parts = [fiche.titre, fiche.introduction, ...fiche.chapitres.flatMap((c) => [c.titre, ...c.contenu])];
  const text = parts.filter(Boolean).join("\n");
  return text.length > MAX_CONTEXT_CHARS ? text.slice(0, MAX_CONTEXT_CHARS) : text;
}

export function isTriageRecap(value: unknown): value is TriageRecap {
  const v = value as Partial<TriageRecap> | null;
  return (
    !!v &&
    Array.isArray(v.etapes) &&
    v.etapes.every((e) => typeof e === "string") &&
    Array.isArray(v.documents) &&
    v.documents.every((d) => typeof d === "string") &&
    typeof v.duree_estimee === "string" &&
    v.duree_estimee.trim().length > 0
  );
}

/** Repli si l'appel de récap échoue ou renvoie une forme inattendue — reste
 * honnête (pas d'étapes inventées) plutôt que de bloquer tout le flux. */
export function fallbackRecap(resume: string): TriageRecap {
  return {
    etapes: [resume || "Vérifie les conditions et prépare ta demande."],
    documents: [],
    duree_estimee: "Variable selon ta situation",
  };
}
