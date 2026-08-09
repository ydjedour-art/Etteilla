import { z } from "zod";

// Schéma de données obligatoire pour toute procédure administrative de la base de
// connaissances Sérénio. Fidèle au schéma "AI-friendly" spécifié pour le produit :
// il alimente le classificateur d'intention, la génération de checklists, le choix
// du mode (mandat vs pilotage), le système d'alertes d'échéances et l'assistant.
//
// Un seul champ est ajouté par rapport au schéma d'origine : `a_verifier` (voir plus
// bas). C'est une déviation volontaire et documentée, pas un oubli — voir
// knowledge-base/README.md, section "Pourquoi `a_verifier` existe".

export const FormulaireSchema = z.object({
  nom: z.string().min(1),
  cerfa: z.string().nullable(),
  url: z.string(),
  type: z.enum(["pdf", "online", "both"]),
});

export const DocumentRequisSchema = z.object({
  nom: z.string().min(1),
  obligatoire: z.boolean(),
  description: z.string(),
  exemples: z.array(z.string()).default([]),
  conditions: z.string().nullable(),
});

export const EtapeSchema = z.object({
  ordre: z.number().int().positive(),
  titre: z.string().min(1),
  description: z.string(),
  type: z.enum([
    "information",
    "action_utilisateur",
    "action_administration",
    "signature",
  ]),
  lien_utile: z.string().nullable(),
});

export const ModePossibleSchema = z
  .object({
    mandat: z.boolean(),
    pilotage: z.boolean(),
    // Toujours renseigné : la limite légale précise du mandat, ou pourquoi il est
    // exclu pour cette démarche (ex. authentification FranceConnect obligatoire).
    commentaire_mandat: z.string().min(1),
  })
  .refine((m) => m.mandat || m.pilotage, {
    message: "Au moins un des deux modes (mandat ou pilotage) doit être possible.",
  });

export const DelaisSchema = z.object({
  traitement_moyen: z.string(),
  echeances_importantes: z.array(z.string()).default([]),
});

export const CoutsSchema = z.object({
  gratuit: z.boolean(),
  montant: z.number().nullable(),
  details: z.string(),
});

export const TagSchema = z.enum(["high_volume", "high_friction", "non_recours"]);

const dateFormat = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Format attendu : YYYY-MM-DD");

const slugFormat = z
  .string()
  .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, "id doit être un slug kebab-case (ex. carte-vitale-premiere-demande)");

export const ProcedureSchema = z.object({
  id: slugFormat,
  titre: z.string().min(1),
  aliases: z.array(z.string()).default([]),
  categorie: z.string().min(1),
  organisme_principal: z.string().min(1),
  url_officielle: z.string().min(1),
  formulaires: z.array(FormulaireSchema).default([]),
  documents_requis: z.array(DocumentRequisSchema).default([]),
  etapes: z.array(EtapeSchema).min(1, "Au moins une étape est requise"),
  mode_possible: ModePossibleSchema,
  delais: DelaisSchema,
  couts: CoutsSchema,
  pieges_frequents: z.array(z.string()).default([]),
  publics_cibles: z.array(z.string()).default([]),
  tags: z.array(TagSchema).default([]),
  derniere_mise_a_jour: dateFormat,
  source_principale: z.string().min(1),
  notes_juridiques: z.string().default(""),
  embedding_text: z.string().min(1),

  /**
   * Champ de gouvernance ajouté par le pipeline Sérénio, absent du schéma d'origine.
   * `true` par défaut sur toute fiche générée automatiquement : une fiche ne doit
   * jamais alimenter le classificateur, la génération de checklist ou le mandat en
   * production tant qu'elle n'a pas été relue et validée par un humain (principe
   * "legal by design" — une checklist ou un mandat basé sur une donnée fausse cause
   * un préjudice réel : pièce manquante, délai raté, mauvaise base légale). Passe à
   * `false` uniquement via le workflow de revue décrit dans le README.
   */
  a_verifier: z.boolean().default(true),
});

export type Procedure = z.infer<typeof ProcedureSchema>;
export type Formulaire = z.infer<typeof FormulaireSchema>;
export type DocumentRequis = z.infer<typeof DocumentRequisSchema>;
export type Etape = z.infer<typeof EtapeSchema>;
export type ModePossible = z.infer<typeof ModePossibleSchema>;
export type Tag = z.infer<typeof TagSchema>;
