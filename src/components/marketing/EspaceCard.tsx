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
  todo: "border-attention/30 text-attention",
  done: "border-success/30 text-success",
  wait: "border-ink/15 text-ink-soft",
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
      <div className="card-surface animate-card-float relative shadow-2xl shadow-black/20">
        {/* Barre de titre façon terminal — trois points, label, badge LIVE. */}
        <div className="flex items-center justify-between border-b border-ink/10 px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-primary" />
            <span className="h-2 w-2 rounded-full bg-yellow" />
            <span className="h-2 w-2 rounded-full bg-cyan" />
          </div>
          <span className="font-mono text-[10px] uppercase tracking-widest text-ink-soft">IZY/D · Ton espace</span>
          <span className="border border-cyan/30 px-2 py-0.5 font-mono text-[9px] text-cyan">LIVE</span>
        </div>

        <div className="p-5">
          <div className="flex items-start justify-between gap-3">
            <p className="text-sm font-semibold text-ink">3 démarches suivies · 0 en retard</p>
          </div>

          <div className="mt-3 flex items-center gap-2 border border-yellow/20 bg-yellow/5 px-3 py-2">
            <span className="text-yellow">✓</span>
            <span className="font-mono text-xs text-yellow/90">Tout est sous contrôle</span>
          </div>

          <div className="mt-4 space-y-0">
            {ROWS.map((row) => {
              const status: Status = row.animated && sent ? "done" : row.status;
              const label = row.animated && sent ? "Envoyé ✓" : STATUS_LABEL[row.status];
              return (
                <div
                  key={row.title}
                  className="flex items-center gap-3 border-b border-ink/05 py-2.5"
                >
                  <span className="text-base">{row.icon}</span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-xs text-ink/80">{row.title}</span>
                  </span>
                  <span
                    className={`whitespace-nowrap border px-2 py-0.5 font-mono text-[9px] transition-colors ${STATUS_STYLE[status]}`}
                  >
                    {label}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="mt-3 flex items-center gap-1.5 text-[10px] text-ink-soft">
            <span aria-hidden="true">🕊</span>
            On surveille tout pour toi
          </div>
        </div>
      </div>
    </div>
  );
}
