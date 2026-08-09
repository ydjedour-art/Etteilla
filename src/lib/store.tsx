"use client";

// Magasin d'état côté client du prototype : permet aux boutons de l'app de
// produire un effet réel (créer un dossier, ajouter un document qui débloque une
// démarche, faire avancer un statut, changer de formule, exporter/supprimer ses
// données...) sans back-end, en persistant dans localStorage.
//
// En production, ce fichier disparaît : chaque action deviendrait un appel à
// l'API décrite dans docs/04-architecture-technique.md (src/lib/data/*.ts en
// donne déjà la forme).

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
  type ReactNode,
} from "react";
import {
  assistantConversation as seedAssistantMessages,
  currentUser as seedUser,
  dossiers as seedDossiers,
  formalityTemplates,
  vaultDocuments as seedVaultDocuments,
} from "@/lib/mock-data";
import type {
  AssistantMessage,
  Dossier,
  DossierStatus,
  TimelineEvent,
  UserProfile,
  VaultDocument,
} from "@/lib/types";

const STORAGE_KEY = "adminzen-store-v1";

interface AppState {
  user: UserProfile;
  dossiers: Dossier[];
  vaultDocuments: VaultDocument[];
  assistantMessages: AssistantMessage[];
}

function initialState(): AppState {
  return {
    user: seedUser,
    dossiers: seedDossiers,
    vaultDocuments: seedVaultDocuments,
    assistantMessages: seedAssistantMessages,
  };
}

function emptyState(): AppState {
  return {
    user: { ...seedUser, plan: "Vigilance" },
    dossiers: [],
    vaultDocuments: [],
    assistantMessages: [],
  };
}

/** Rapproche les pièces requises par une démarche de ce qui est déjà dans le
 * coffre-fort, pour ne jamais redemander ce qu'on a déjà (docs/01-vision-produit.md,
 * principe "zéro jargon, zéro friction"). */
function computeMissingDocuments(
  required: string[],
  vault: VaultDocument[]
): string[] {
  return required.filter(
    (req) =>
      !vault.some(
        (doc) =>
          req.toLowerCase().includes(doc.type.toLowerCase()) ||
          doc.type.toLowerCase().includes(req.toLowerCase())
      )
  );
}

function pushEvent(
  dossier: Dossier,
  message: string,
  actor: TimelineEvent["actor"]
): Dossier {
  const now = new Date().toISOString();
  const event: TimelineEvent = { id: `evt-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, message, actor, createdAt: now };
  return { ...dossier, updatedAt: now, timeline: [...dossier.timeline, event] };
}

const ADVANCE_TABLE: Partial<
  Record<DossierStatus, { status: DossierStatus; message: string; actor: TimelineEvent["actor"] }>
> = {
  a_demarrer: {
    status: "pret_a_soumettre",
    message: "Dossier constitué, prêt à être envoyé.",
    actor: "systeme",
  },
  pret_a_soumettre: {
    status: "en_attente_administration",
    message: "Vous avez validé l'envoi. On transmet votre dossier et on suit son avancement pour vous.",
    actor: "utilisateur",
  },
  en_attente_administration: {
    status: "termine",
    message: "C'est fait ! Votre démarche est terminée, rien d'autre à faire.",
    actor: "systeme",
  },
  action_requise: {
    status: "pret_a_soumettre",
    message: "Merci, votre réponse a bien été prise en compte.",
    actor: "utilisateur",
  },
};

const ASSISTANT_FAQ: { keywords: string[]; reply: string }[] = [
  {
    keywords: ["quotient familial"],
    reply:
      "C'est un chiffre calculé à partir de vos revenus et de votre situation familiale : il sert à déterminer le montant de vos aides. On le met à jour automatiquement dès qu'on a vos nouveaux revenus, vous n'avez rien à calculer.",
  },
  {
    keywords: ["titre de séjour", "titre de sejour", "anef"],
    reply:
      "On surveille la date d'échéance de votre titre de séjour et on prépare le dossier de renouvellement plusieurs mois à l'avance, pour ne jamais être pris de court.",
  },
  {
    keywords: ["urssaf", "cotisation", "micro-entrepreneur", "auto-entrepreneur"],
    reply:
      "En tant qu'indépendant, vous devez déclarer votre chiffre d'affaires périodiquement à l'URSSAF. On vous rappelle avant l'échéance et on calcule le montant à déclarer pour vous.",
  },
  {
    keywords: ["caf", "allocation"],
    reply:
      "La CAF doit être tenue au courant de tout changement (adresse, ressources, situation familiale) pour que vos aides ne s'interrompent jamais. On s'en charge dès qu'un changement est détecté.",
  },
  {
    keywords: ["mutuelle"],
    reply:
      "On vérifie chaque année que votre contrat de mutuelle est toujours adapté à votre situation, et on gère le renouvellement à votre place.",
  },
  {
    keywords: ["impot", "impôt", "déclaration", "avis d'imposition"],
    reply:
      "Votre déclaration de revenus annuelle est préparée à partir de vos documents déjà connus. Il ne vous reste qu'à valider ce qu'on ne peut pas deviner tout seul.",
  },
  {
    keywords: ["document", "coffre", "pièce"],
    reply:
      "Vous pouvez ajouter vos documents dans le coffre-fort à tout moment : dès qu'un document correspond à une pièce manquante, la démarche concernée se débloque automatiquement.",
  },
];

function craftAssistantReply(userText: string): string {
  const lower = userText.toLowerCase();
  const match = ASSISTANT_FAQ.find((entry) =>
    entry.keywords.some((keyword) => lower.includes(keyword))
  );
  if (match) return match.reply;
  return "Bonne question. Dans la version finale, je réponds avec le contexte réel de vos dossiers (assistant Claude + base de connaissance, voir docs/04-architecture-technique.md). Essayez de me parler de la CAF, des impôts, de l'URSSAF, de la mutuelle ou du titre de séjour pour voir un exemple de réponse.";
}

type Action =
  | { type: "HYDRATE"; state: AppState }
  | { type: "CREATE_DOSSIER"; templateSlug: string }
  | { type: "ADVANCE_DOSSIER"; dossierId: string }
  | { type: "ADD_VAULT_DOCUMENT"; document: Pick<VaultDocument, "type" | "label" | "expiresAt"> }
  | { type: "SET_PLAN"; plan: UserProfile["plan"] }
  | { type: "SEND_ASSISTANT_MESSAGE"; content: string }
  | { type: "RESET_ACCOUNT" };

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case "HYDRATE":
      return action.state;

    case "CREATE_DOSSIER": {
      const template = formalityTemplates.find((t) => t.slug === action.templateSlug);
      if (!template) return state;
      const missing = computeMissingDocuments(template.requiredDocuments, state.vaultDocuments);
      const now = new Date().toISOString();
      const dossier: Dossier = {
        id: `dos-${action.templateSlug}-${Date.now()}`,
        templateSlug: action.templateSlug,
        profileName: state.user.firstName,
        status: missing.length > 0 ? "infos_manquantes" : "pret_a_soumettre",
        deadline: null,
        createdAt: now,
        updatedAt: now,
        missingDocuments: missing,
        timeline: [
          {
            id: `evt-${Date.now()}`,
            message:
              missing.length > 0
                ? "On a préparé votre dossier. Il ne manque plus que quelques pièces pour continuer."
                : "On a tout ce qu'il faut dans votre coffre-fort : votre dossier est prêt à être envoyé.",
            actor: "systeme",
            createdAt: now,
          },
        ],
      };
      return { ...state, dossiers: [dossier, ...state.dossiers] };
    }

    case "ADVANCE_DOSSIER": {
      return {
        ...state,
        dossiers: state.dossiers.map((dossier) => {
          if (dossier.id !== action.dossierId) return dossier;
          const transition = ADVANCE_TABLE[dossier.status];
          if (!transition) return dossier;
          return pushEvent(
            { ...dossier, status: transition.status },
            transition.message,
            transition.actor
          );
        }),
      };
    }

    case "ADD_VAULT_DOCUMENT": {
      const now = new Date().toISOString();
      const newDoc: VaultDocument = {
        id: `doc-${Date.now()}`,
        uploadedAt: now,
        validityStatus: "valide",
        ...action.document,
      };
      const vaultDocuments = [newDoc, ...state.vaultDocuments];

      const dossiers = state.dossiers.map((dossier) => {
        if (dossier.missingDocuments.length === 0) return dossier;
        const template = formalityTemplates.find((t) => t.slug === dossier.templateSlug);
        if (!template) return dossier;
        const stillMissing = computeMissingDocuments(template.requiredDocuments, vaultDocuments);
        if (stillMissing.length === dossier.missingDocuments.length) return dossier;

        const unlocked = stillMissing.length === 0;
        return pushEvent(
          {
            ...dossier,
            missingDocuments: stillMissing,
            status: unlocked ? "pret_a_soumettre" : dossier.status,
          },
          unlocked
            ? "Le document que vous venez d'ajouter complète votre dossier : il est prêt à être envoyé."
            : "Le document ajouté a bien été pris en compte.",
          "utilisateur"
        );
      });

      return { ...state, vaultDocuments, dossiers };
    }

    case "SET_PLAN":
      return { ...state, user: { ...state.user, plan: action.plan } };

    case "SEND_ASSISTANT_MESSAGE": {
      const now = new Date().toISOString();
      const userMessage: AssistantMessage = {
        id: `msg-${Date.now()}`,
        sender: "utilisateur",
        content: action.content,
        createdAt: now,
      };
      const reply: AssistantMessage = {
        id: `msg-${Date.now()}-r`,
        sender: "assistant_ia",
        content: craftAssistantReply(action.content),
        createdAt: now,
      };
      return { ...state, assistantMessages: [...state.assistantMessages, userMessage, reply] };
    }

    case "RESET_ACCOUNT":
      return emptyState();

    default:
      return state;
  }
}

interface AppStoreContextValue {
  state: AppState;
  createDossier: (templateSlug: string) => void;
  advanceDossier: (dossierId: string) => void;
  addVaultDocument: (document: Pick<VaultDocument, "type" | "label" | "expiresAt">) => void;
  setPlan: (plan: UserProfile["plan"]) => void;
  sendAssistantMessage: (content: string) => void;
  resetAccount: () => void;
  exportData: () => void;
}

const AppStoreContext = createContext<AppStoreContextValue | null>(null);

export function AppStoreProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, initialState);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) dispatch({ type: "HYDRATE", state: JSON.parse(raw) });
    } catch {
      // localStorage indisponible (navigation privée...) : on reste sur les données de démo.
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // stockage plein ou indisponible : on continue sans persister.
    }
  }, [state, hydrated]);

  const createDossier = useCallback(
    (templateSlug: string) => dispatch({ type: "CREATE_DOSSIER", templateSlug }),
    []
  );
  const advanceDossier = useCallback(
    (dossierId: string) => dispatch({ type: "ADVANCE_DOSSIER", dossierId }),
    []
  );
  const addVaultDocument = useCallback(
    (document: Pick<VaultDocument, "type" | "label" | "expiresAt">) =>
      dispatch({ type: "ADD_VAULT_DOCUMENT", document }),
    []
  );
  const setPlan = useCallback(
    (plan: UserProfile["plan"]) => dispatch({ type: "SET_PLAN", plan }),
    []
  );
  const sendAssistantMessage = useCallback(
    (content: string) => dispatch({ type: "SEND_ASSISTANT_MESSAGE", content }),
    []
  );
  const resetAccount = useCallback(() => dispatch({ type: "RESET_ACCOUNT" }), []);

  const exportData = useCallback(() => {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "adminzen-mes-donnees.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, [state]);

  const value = useMemo(
    () => ({
      state,
      createDossier,
      advanceDossier,
      addVaultDocument,
      setPlan,
      sendAssistantMessage,
      resetAccount,
      exportData,
    }),
    [state, createDossier, advanceDossier, addVaultDocument, setPlan, sendAssistantMessage, resetAccount, exportData]
  );

  return <AppStoreContext.Provider value={value}>{children}</AppStoreContext.Provider>;
}

export function useAppStore() {
  const ctx = useContext(AppStoreContext);
  if (!ctx) throw new Error("useAppStore doit être utilisé sous <AppStoreProvider>");
  return ctx;
}
