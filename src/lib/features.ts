/**
 * Feature flags du site.
 *
 * `cpf` contrôle l'affichage de toute mention du Compte Personnel de
 * Formation (CPF) sur le site : badges "Éligible CPF", mentions de
 * financement, etc. Le flag est désactivé par défaut — passez-le à `true`
 * pour réactiver ces mentions dès que le dossier de référencement CPF est
 * prêt à être communiqué publiquement.
 */
export const FEATURES = {
  cpf: false,
} as const;
