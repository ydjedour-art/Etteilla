import { formatDate } from "@/lib/format";
import type { TimelineEvent } from "@/lib/types";

const ACTOR_LABELS: Record<TimelineEvent["actor"], string> = {
  systeme: "AdminZen",
  utilisateur: "Vous",
  concierge: "Votre conseiller AdminZen",
  assistant_ia: "Assistant AdminZen",
};

/** Frise des événements d'un dossier, toujours rédigée en langage humain — jamais
 * de statut technique brut. Voir docs/05-design-system.md. */
export function Timeline({ events }: { events: TimelineEvent[] }) {
  const sorted = [...events].sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );

  return (
    <ol className="space-y-6">
      {sorted.map((event, index) => (
        <li key={event.id} className="relative flex gap-4">
          <div className="flex flex-col items-center">
            <span
              className={`h-3 w-3 rounded-full ${
                index === sorted.length - 1 ? "bg-primary" : "bg-primary/30"
              }`}
            />
            {index < sorted.length - 1 && (
              <span className="mt-1 w-px flex-1 bg-ink/10" />
            )}
          </div>
          <div className="pb-1">
            <p className="text-sm text-ink-soft">
              {formatDate(event.createdAt)} · {ACTOR_LABELS[event.actor]}
            </p>
            <p className="text-ink">{event.message}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
