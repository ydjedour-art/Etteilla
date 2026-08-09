import type { Dossier } from "@/lib/types";

/** Bloc d'accueil du tableau de bord : résume l'état général en 1-2 phrases.
 * Voir docs/05-design-system.md. */
export function TodayDigest({
  firstName,
  dossiers,
}: {
  firstName: string;
  dossiers: Dossier[];
}) {
  const actionRequired = dossiers.filter(
    (d) => d.status === "infos_manquantes" || d.status === "action_requise"
  );

  if (actionRequired.length === 0) {
    return (
      <div className="rounded-2xl bg-success/10 p-6">
        <p className="text-sm font-medium text-success">Bonjour {firstName}</p>
        <p className="mt-2 text-xl font-semibold text-ink">
          Tout est sous contrôle.
        </p>
        <p className="mt-1 text-ink-soft">
          On garde un œil sur tout. Rien ne demande votre attention aujourd&apos;hui.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-attention/10 p-6">
      <p className="text-sm font-medium text-attention">Bonjour {firstName}</p>
      <p className="mt-2 text-xl font-semibold text-ink">
        {actionRequired.length === 1
          ? "Une action vous attend, ça prend 2 minutes."
          : `${actionRequired.length} actions vous attendent, ça prend quelques minutes.`}
      </p>
      <p className="mt-1 text-ink-soft">
        Tout le reste, on s&apos;en occupe pour vous.
      </p>
    </div>
  );
}
