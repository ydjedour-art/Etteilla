// Protocole de conversation entre TriageChat (client) et /api/triage
// (serveur). Le serveur ne garde aucun état entre deux appels : le client
// renvoie l'historique complet à chaque tour (voir route.ts pour le détail
// du contrat).

export type ChatRole = "user" | "assistant";

export interface ChatMessage {
  role: ChatRole;
  content: string;
}

/** Ce que le modèle doit renvoyer — format imposé par le prompt système
 * (src/lib/triage/prompt.ts), copié tel quel de la spec produit. */
export interface TriageQuestion {
  status: "need_more_info";
  question: string;
  options: string[];
}

export interface TriageFound {
  status: "found";
  fiche_id: string;
  titre: string;
  resume: string;
  confiance: number;
}

export type TriageModelResponse = TriageQuestion | TriageFound;

/** Ce que /api/triage renvoie réellement au client : la réponse du modèle,
 * enrichie (lien officiel, lien interne, thème, récap actionnable) quand
 * elle est trouvée, plus `raw` — le JSON exact à ré-empiler dans
 * l'historique pour le tour suivant, pour que le modèle retrouve ses
 * propres réponses précédentes telles quelles. */
export type TriageApiResponse =
  | (TriageQuestion & { raw: string })
  | (TriageFound & {
      raw: string;
      theme: string;
      themeSlug: string;
      url: string;
      href: string;
      recap: import("./recap").TriageRecap;
    })
  | { status: "not_found"; message: string }
  | { status: "error"; message: string };
