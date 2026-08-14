import type { ComponentType } from "react";

type InfoStat = {
  icon: ComponentType<{ className?: string }>;
  label: string;
  value: string;
};

/** Grille d'informations pratiques (durée, format, tarif, lieu...) pour les pages de détail. */
export function InfoStats({ items }: { items: InfoStat[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => (
        <div key={item.label} className="rounded-2xl border border-ink/10 bg-white p-5">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-light text-primary">
            <item.icon className="h-4 w-4" />
          </span>
          <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-ink-soft/70">
            {item.label}
          </p>
          <p className="mt-1 text-sm font-medium text-ink">{item.value}</p>
        </div>
      ))}
    </div>
  );
}
