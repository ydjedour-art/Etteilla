// Couche d'accès aux données consommée par les écrans (src/app/**).
//
// Aujourd'hui : retourne les données simulées de mock-data.ts.
// Demain : chaque fonction devient un appel `fetch()` vers l'API réelle décrite
// dans docs/04-architecture-technique.md — les composants n'ont pas à changer.

import {
  assistantConversation,
  currentUser,
  dossiers,
  findDossierById,
  findTemplateBySlug,
  formalityTemplates,
  notifications,
  vaultDocuments,
} from "@/lib/mock-data";
import type {
  AssistantMessage,
  Dossier,
  FormalityTemplate,
  Notification,
  UserProfile,
  VaultDocument,
} from "@/lib/types";

export async function getCurrentUser(): Promise<UserProfile> {
  return currentUser;
}

export async function getDossiers(): Promise<Dossier[]> {
  return dossiers;
}

export async function getDossier(id: string): Promise<Dossier | undefined> {
  return findDossierById(id);
}

export async function getFormalityTemplates(): Promise<FormalityTemplate[]> {
  return formalityTemplates;
}

export async function getFormalityTemplate(
  slug: string
): Promise<FormalityTemplate | undefined> {
  return findTemplateBySlug(slug);
}

export async function getVaultDocuments(): Promise<VaultDocument[]> {
  return vaultDocuments;
}

export async function getNotifications(): Promise<Notification[]> {
  return notifications;
}

export async function getAssistantConversation(): Promise<AssistantMessage[]> {
  return assistantConversation;
}
