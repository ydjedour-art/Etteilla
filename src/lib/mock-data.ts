// Données simulées du prototype. En production, ces données proviendraient de l'API
// décrite dans docs/04-architecture-technique.md — voir src/lib/data/*.ts pour la
// couche d'accès que le reste de l'app consomme (et qui sera branchée sur l'API
// réelle sans changer les composants).

import type {
  AssistantMessage,
  Dossier,
  FormalityTemplate,
  Notification,
  UserProfile,
  VaultDocument,
} from "./types";

export const currentUser: UserProfile = {
  firstName: "Léa",
  status: "Salarié",
  subscription: "serenite",
};

export const formalityTemplates: FormalityTemplate[] = [
  {
    slug: "declaration-revenus",
    name: "Déclaration de revenus",
    organisme: "Impôts (DGFiP)",
    category: "Impôts",
    description:
      "La déclaration annuelle qui sert à calculer votre impôt sur le revenu. On rassemble vos justificatifs et on la prépare pour vous.",
    recurrence: "annuelle",
    estimatedDurationMinutes: 10,
    automationLevel: "pre_rempli",
    requiredDocuments: ["Avis d'imposition précédent", "RIB"],
    steps: [
      { title: "Vérifier vos informations", description: "On relit ce qui a changé depuis l'an dernier." },
      { title: "Compléter les revenus manquants", description: "Seulement ce qui n'est pas déjà connu." },
      { title: "Valider et transmettre", description: "Un dernier coup d'œil, puis c'est envoyé." },
    ],
  },
  {
    slug: "mise-a-jour-caf",
    name: "Mise à jour de dossier CAF",
    organisme: "CAF",
    category: "Aides & allocations",
    description:
      "Adresse, ressources, quotient familial : on garde votre dossier CAF à jour pour que vos aides ne s'interrompent jamais.",
    recurrence: "trimestrielle",
    estimatedDurationMinutes: 5,
    automationLevel: "delegue",
    requiredDocuments: ["Justificatif de domicile"],
    steps: [
      { title: "Vérifier les changements", description: "Adresse, situation familiale, ressources." },
      { title: "On transmet à la CAF", description: "Avec votre accord, on s'en occupe." },
    ],
  },
  {
    slug: "declaration-ca-urssaf",
    name: "Déclaration de chiffre d'affaires",
    organisme: "URSSAF",
    category: "Indépendant",
    description:
      "La déclaration périodique obligatoire pour les micro-entrepreneurs. On vous rappelle et on prépare le montant à déclarer.",
    recurrence: "trimestrielle",
    estimatedDurationMinutes: 5,
    automationLevel: "pre_rempli",
    requiredDocuments: ["Relevé de chiffre d'affaires"],
    steps: [
      { title: "Indiquer votre chiffre d'affaires", description: "On calcule le montant des cotisations." },
      { title: "Valider et transmettre", description: "Envoi direct à l'URSSAF." },
    ],
  },
  {
    slug: "renouvellement-titre-sejour",
    name: "Renouvellement titre de séjour",
    organisme: "Préfecture (ANEF)",
    category: "Titre de séjour",
    description:
      "On anticipe l'échéance de votre titre de séjour et on prépare le dossier complet bien avant la date limite.",
    recurrence: "pluriannuelle",
    estimatedDurationMinutes: 15,
    automationLevel: "guide",
    requiredDocuments: [
      "Passeport en cours de validité",
      "Titre de séjour actuel",
      "Justificatif de domicile",
      "3 photos d'identité",
    ],
    steps: [
      { title: "Vérifier les pièces requises", description: "On vous dit exactement ce qu'il manque." },
      { title: "Compléter le dossier ANEF", description: "On assemble tout, prêt à déposer." },
      { title: "Déposer la demande", description: "Vous validez, on vous guide pas à pas." },
    ],
  },
  {
    slug: "rattachement-cpam",
    name: "Mise à jour Carte Vitale / CPAM",
    organisme: "CPAM (Sécurité sociale)",
    category: "Santé",
    description:
      "Rattachement, mise à jour de vos droits ou de votre carte vitale auprès de la Sécurité sociale.",
    recurrence: "ponctuelle",
    estimatedDurationMinutes: 8,
    automationLevel: "guide",
    requiredDocuments: ["Pièce d'identité", "Justificatif de domicile", "RIB"],
    steps: [
      { title: "Vérifier vos droits actuels", description: "On identifie ce qui doit être mis à jour." },
      { title: "Transmettre le dossier", description: "Envoi à la CPAM avec les bonnes pièces." },
    ],
  },
  {
    slug: "changement-adresse",
    name: "Changement d'adresse",
    organisme: "CAF · Impôts · Mutuelle · Assurance",
    category: "Vie quotidienne",
    description:
      "Un seul déménagement, une seule fois à le dire : on met à jour tous les organismes concernés pour vous.",
    recurrence: "ponctuelle",
    estimatedDurationMinutes: 3,
    automationLevel: "delegue",
    requiredDocuments: ["Justificatif de domicile"],
    steps: [
      { title: "Confirmer la nouvelle adresse", description: "Une seule saisie pour tous les organismes." },
      { title: "On informe chaque organisme", description: "CAF, impôts, mutuelle, assurance." },
    ],
  },
  {
    slug: "renouvellement-mutuelle",
    name: "Renouvellement mutuelle",
    organisme: "Mutuelle",
    category: "Santé",
    description:
      "On vérifie que votre contrat mutuelle est toujours adapté et on gère le renouvellement à votre place.",
    recurrence: "annuelle",
    estimatedDurationMinutes: 5,
    automationLevel: "pre_rempli",
    requiredDocuments: [],
    steps: [
      { title: "Vérifier votre contrat", description: "On regarde s'il est toujours adapté à votre situation." },
      { title: "Confirmer le renouvellement", description: "Ou on vous propose une alternative." },
    ],
  },
  {
    slug: "demande-aide-departement",
    name: "Demande d'aide (APA, aides spécifiques)",
    organisme: "Département / CAF",
    category: "Aides & allocations",
    description:
      "Pour un proche ou pour vous : on identifie les aides auxquelles vous avez droit et on monte le dossier.",
    recurrence: "ponctuelle",
    estimatedDurationMinutes: 12,
    automationLevel: "guide",
    requiredDocuments: ["Avis d'imposition", "Justificatif de domicile"],
    steps: [
      { title: "Vérifier l'éligibilité", description: "On identifie les aides pertinentes." },
      { title: "Constituer le dossier", description: "On rassemble toutes les pièces nécessaires." },
      { title: "Déposer la demande", description: "Suivi jusqu'à la décision." },
    ],
  },
  {
    slug: "perte-emploi-france-travail",
    name: "Inscription après une perte d'emploi",
    organisme: "France Travail (ex-Pôle emploi)",
    category: "Vie quotidienne",
    description:
      "Perdre son emploi suffit comme épreuve : on prépare l'inscription et la demande d'allocations pour que vous ne perdiez ni temps ni droits.",
    recurrence: "ponctuelle",
    estimatedDurationMinutes: 10,
    automationLevel: "guide",
    requiredDocuments: ["Pièce d'identité", "RIB", "Certificat de travail ou attestation employeur"],
    steps: [
      { title: "Vérifier les pièces requises", description: "On vous dit exactement ce qu'il faut, rien de plus." },
      { title: "Constituer le dossier d'inscription", description: "Prêt à déposer, avec le calcul estimé de vos droits." },
      { title: "Suivre la demande d'allocations", description: "On vous prévient à chaque étape importante." },
    ],
  },
  {
    slug: "naissance-enfant",
    name: "Déclarer une naissance",
    organisme: "CAF · Mairie · CPAM",
    category: "Vie quotidienne",
    description:
      "Une naissance déclenche plusieurs démarches en même temps : on les regroupe et on les déclenche pour vous en une fois.",
    recurrence: "ponctuelle",
    estimatedDurationMinutes: 5,
    automationLevel: "delegue",
    requiredDocuments: ["Acte de naissance", "Livret de famille"],
    steps: [
      { title: "Confirmer les informations de l'enfant", description: "Une seule saisie pour tous les organismes." },
      { title: "On met à jour chaque organisme", description: "CAF, mairie, CPAM, mutuelle." },
    ],
  },
];

export const dossiers: Dossier[] = [
  {
    id: "dos-titre-sejour",
    templateSlug: "renouvellement-titre-sejour",
    profileName: "Léa",
    status: "infos_manquantes",
    deadline: "2026-12-15",
    createdAt: "2026-08-01",
    updatedAt: "2026-08-08",
    missingDocuments: ["3 photos d'identité"],
    timeline: [
      { id: "t1", message: "On a repéré l'échéance de votre titre de séjour et préparé le dossier.", actor: "systeme", createdAt: "2026-08-01T09:00:00Z" },
      { id: "t2", message: "Il ne manque qu'une pièce : 3 photos d'identité.", actor: "assistant_ia", createdAt: "2026-08-08T10:12:00Z" },
    ],
  },
  {
    id: "dos-caf",
    templateSlug: "mise-a-jour-caf",
    profileName: "Léa",
    status: "en_attente_administration",
    deadline: "2026-09-01",
    createdAt: "2026-07-20",
    updatedAt: "2026-08-05",
    missingDocuments: [],
    timeline: [
      { id: "t1", message: "Dossier constitué avec votre nouvelle adresse.", actor: "systeme", createdAt: "2026-07-20T09:00:00Z" },
      { id: "t2", message: "On a transmis votre dossier à la CAF.", actor: "concierge", createdAt: "2026-07-22T14:30:00Z" },
      { id: "t3", message: "C'est entre les mains de la CAF. On vérifie chaque jour pour vous.", actor: "systeme", createdAt: "2026-08-05T08:00:00Z" },
    ],
  },
  {
    id: "dos-impots",
    templateSlug: "declaration-revenus",
    profileName: "Léa",
    status: "termine",
    deadline: "2026-05-25",
    createdAt: "2026-04-10",
    updatedAt: "2026-05-20",
    missingDocuments: [],
    timeline: [
      { id: "t1", message: "Déclaration préparée à partir de vos documents.", actor: "systeme", createdAt: "2026-04-10T09:00:00Z" },
      { id: "t2", message: "Vous avez validé, la déclaration est envoyée.", actor: "utilisateur", createdAt: "2026-05-18T19:22:00Z" },
      { id: "t3", message: "C'est fait. Rien à faire jusqu'à l'année prochaine.", actor: "systeme", createdAt: "2026-05-20T09:00:00Z" },
    ],
  },
];

export const vaultDocuments: VaultDocument[] = [
  { id: "doc1", type: "Titre de séjour", label: "Titre de séjour — carte pluriannuelle", uploadedAt: "2023-01-15", expiresAt: "2026-12-15", validityStatus: "expire_bientot" },
  { id: "doc2", type: "Passeport", label: "Passeport", uploadedAt: "2022-06-02", expiresAt: "2028-06-02", validityStatus: "valide" },
  { id: "doc3", type: "Avis d'imposition", label: "Avis d'imposition 2025", uploadedAt: "2025-08-30", expiresAt: null, validityStatus: "valide" },
  { id: "doc4", type: "Justificatif de domicile", label: "Facture d'électricité — juillet", uploadedAt: "2026-08-01", expiresAt: null, validityStatus: "valide" },
  { id: "doc5", type: "RIB", label: "RIB — compte principal", uploadedAt: "2024-02-10", expiresAt: null, validityStatus: "a_verifier" },
];

export const notifications: Notification[] = [
  {
    id: "n1",
    title: "Ton titre de séjour approche de son échéance",
    body: "On a préparé ton dossier, il te reste 2 minutes pour ajouter tes photos d'identité.",
    scheduledFor: "2026-08-08T09:00:00Z",
    read: false,
    dossierId: "dos-titre-sejour",
  },
  {
    id: "n2",
    title: "Ton dossier CAF est bien parti",
    body: "On surveille son avancement, tu n'as rien à faire pour le moment.",
    scheduledFor: "2026-08-05T08:00:00Z",
    read: true,
    dossierId: "dos-caf",
  },
];

export const assistantConversation: AssistantMessage[] = [
  {
    id: "m1",
    sender: "assistant_ia",
    content:
      "Bonjour Léa. Je suis là pour t'aider à y voir clair. Tu peux me poser n'importe quelle question sur tes démarches en cours.",
    createdAt: "2026-08-08T10:00:00Z",
  },
  {
    id: "m2",
    sender: "utilisateur",
    content: "C'est quoi le \"quotient familial\" que la CAF me demande ?",
    createdAt: "2026-08-08T10:01:00Z",
  },
  {
    id: "m3",
    sender: "assistant_ia",
    content:
      "C'est un chiffre calculé à partir de tes revenus et de ta situation familiale : il sert à déterminer le montant de tes aides. Tu n'as rien à calculer toi-même — on le met à jour automatiquement dès qu'on a tes nouveaux revenus.",
    createdAt: "2026-08-08T10:01:30Z",
  },
];

export function findTemplateBySlug(slug: string): FormalityTemplate | undefined {
  return formalityTemplates.find((t) => t.slug === slug);
}

export function findDossierById(id: string): Dossier | undefined {
  return dossiers.find((d) => d.id === id);
}
