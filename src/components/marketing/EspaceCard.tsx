"use client";

import { useEffect, useState } from "react";

// Adapté de la maquette "Ton espace" fournie par l'utilisateur — remplace le
// bloc gradient vide du hero par un aperçu concret et vivant du tableau de
// bord (voir docs/05-design-system.md pour la charte de couleurs/typo
// réutilisée ici, identique au reste du site).

type Status = "todo" | "done" | "wait";

const STATUS_LABEL: Record<Status, string> = {
  todo: "À faire",
  done: "Prête ✓",
  wait: "Anticipée",
};

const STATUS_STYLE: Record<Status, string> = {
  todo: "bg-attention/10 text-attention",
  done: "bg-success/10 text-success",
  wait: "bg-ink/5 text-ink-soft",
};

const ROWS: { icon: string; title: string; subtitle: string; status: Status; animated?: boolean }[] = [
  { icon: "🏠", title: "Dossier CAF", subtitle: "Mise à jour trimestrielle", status: "todo", animated: true },
  { icon: "📑", title: "Déclaration de revenus", subtitle: "Préparée, prête à valider", status: "done" },
  { icon: "🛂", title: "Titre de séjour", subtitle: "Échéance dans 4 mois", status: "wait" },
];

/** Petite animation : la ligne "Dossier CAF" bascule de "À faire" à "Envoyé
 * ✓" toutes les 6 secondes, pour donner un sentiment de produit vivant sans
 * agiter toute la carte. Respecte prefers-reduced-motion. */
function useSentFlip() {
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setSent(true);
      return;
    }
    let onTimer: ReturnType<typeof setTimeout>;
    let offTimer: ReturnType<typeof setTimeout>;
    function cycle() {
      onTimer = setTimeout(() => setSent(true), 1600);
      offTimer = setTimeout(() => setSent(false), 5200);
    }
    cycle();
    const interval = setInterval(cycle, 6000);
    return () => {
      clearTimeout(onTimer);
      clearTimeout(offTimer);
      clearInterval(interval);
    };
  }, []);

  return sent;
}

export function EspaceCard() {
  const sent = useSentFlip();

  return (
    <div className="relative mx-auto w-full max-w-sm">
      <div
        aria-hidden="true"
        className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-gradient-to-br from-primary to-flash opacity-25 blur-3xl"
      />
      <div className="card-surface animate-card-float relative p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="font-display text-lg font-extrabold text-ink">Ton espace</p>
            <p className="mt-0.5 text-sm text-ink-soft">3 démarches suivies · 0 en retard</p>
          </div>
          <span className="whitespace-nowrap rounded-full bg-accent px-3 py-1.5 text-xs font-bold text-accent-foreground">
            Tout est sous contrôle
          </span>
        </div>

        <div className="mt-5 space-y-2.5">
          {ROWS.map((row) => {
            const status: Status = row.animated && sent ? "done" : row.status;
            const label = row.animated && sent ? "Envoyé ✓" : STATUS_LABEL[row.status];
            return (
              <div
                key={row.title}
                className="flex items-center gap-3 rounded-2xl border border-ink/10 bg-surface p-3.5"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-ink/10 bg-white text-lg">
                  {row.icon}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-bold text-ink">{row.title}</span>
                  <span className="block truncate text-xs text-ink-soft">{row.subtitle}</span>
                </span>
                <span
                  className={`whitespace-nowrap rounded-full px-2.5 py-1 text-[11px] font-bold transition-colors ${STATUS_STYLE[status]}`}
                >
                  {label}
                </span>
              </div>
            );
          })}
        </div>

        <div className="mt-5 flex items-center gap-2 border-t border-ink/10 pt-4 text-sm text-ink-soft">
          <span aria-hidden="true" className="text-base">🕊️</span>
          Une démarche de moins à porter. On te tient au courant.
        </div>
      </div>
    </div>
  );
}
