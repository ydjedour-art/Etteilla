// Types du prototype front-end. Ils reflètent volontairement la forme des futures
// réponses d'API (voir docs/04-architecture-technique.md) pour permettre un
// branchement direct sur le back-end réel sans refonte du front (voir
// src/lib/data/*.ts).

export type DossierStatus =
  | "a_demarrer"
  | "infos_manquantes"
  | "pret_a_soumettre"
  | "soumis"
  | "en_attente_administration"
  | "action_requise"
  | "termine"
  | "refuse";

export type AutomationLevel = "guide" | "pre_rempli" | "delegue";

export type Recurrence =
  | "ponctuelle"
  | "mensuelle"
  | "trimestrielle"
  | "annuelle"
  | "pluriannuelle";

export interface FormalityTemplate {
  slug: string;
  name: string;
  organisme: string;
  category: string;
  description: string;
  recurrence: Recurrence;
  estimatedDurationMinutes: number;
  automationLevel: AutomationLevel;
  requiredDocuments: string[];
  steps: { title: string; description: string }[];
}

export interface TimelineEvent {
  id: string;
  message: string;
  actor: "systeme" | "utilisateur" | "concierge" | "assistant_ia";
  createdAt: string; // ISO date
}

export interface Dossier {
  id: string;
  templateSlug: string;
  profileName: string;
  status: DossierStatus;
  deadline: string | null; // ISO date
  createdAt: string;
  updatedAt: string;
  missingDocuments: string[];
  timeline: TimelineEvent[];
}

export interface VaultDocument {
  id: string;
  type: string;
  label: string;
  uploadedAt: string;
  expiresAt: string | null;
  validityStatus: "valide" | "expire_bientot" | "expire" | "a_verifier";
}

export interface Notification {
  id: string;
  title: string;
  body: string;
  scheduledFor: string;
  read: boolean;
  dossierId?: string;
}

export interface AssistantMessage {
  id: string;
  sender: "utilisateur" | "assistant_ia";
  content: string;
  createdAt: string;
}

/** Mandat de représentation généré pour un dossier — voir docs/08-securite-rgpd.md. */
export interface Mandate {
  id: string;
  dossierId: string;
  scope: string;
  grantedAt: string; // ISO date
  revokedAt: string | null;
}

/** Modèle tarifaire Sérénio : à l'acte (par démarche, prix selon complexité) +
 * abonnement mensuel optionnel "Sérénité" (surveillance, alertes, tarifs
 * préférentiels). Voir docs/03-fonctionnalites-mvp.md. */
export type SubscriptionStatus = "aucun" | "serenite";

export interface UserProfile {
  firstName: string;
  status: "Salarié" | "Indépendant" | "Étudiant" | "Sans emploi" | "Retraité";
  subscription: SubscriptionStatus;
}

export const STATUS_LABELS: Record<DossierStatus, string> = {
  a_demarrer: "À démarrer",
  infos_manquantes: "Infos manquantes",
  pret_a_soumettre: "Prêt à envoyer",
  soumis: "Envoyé",
  en_attente_administration: "En cours de traitement",
  action_requise: "Action requise",
  termine: "Terminé",
  refuse: "À revoir",
};

/** Couleurs Tailwind associées à chaque statut, cf. docs/05-design-system.md
 * (jamais de rouge vif hors blocage réel, l'or porte l'attention). */
export const STATUS_STYLES: Record<DossierStatus, string> = {
  a_demarrer: "bg-ink-soft/10 text-ink-soft",
  infos_manquantes: "bg-attention/15 text-attention",
  pret_a_soumettre: "bg-accent/15 text-accent",
  soumis: "bg-accent/15 text-accent",
  en_attente_administration: "bg-accent/15 text-accent",
  action_requise: "bg-attention/15 text-attention",
  termine: "bg-success/15 text-success",
  refuse: "bg-critical/15 text-critical",
};
