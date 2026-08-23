/** Bandeau défilant listant les démarches couvertes — motif inspiré d'une
 * maquette de référence (ticker horizontal), adapté à notre palette : pas de
 * couleur vive, vitesse lente, respecte prefers-reduced-motion (voir
 * .marquee-track dans globals.css). Contenu réel — les noms des démarches
 * IZY/D, pas une liste inventée. Composant statique, pas de state. */
export function DemarchesTicker({ items }: { items: string[] }) {
  const doubled = [...items, ...items];

  return (
    <div className="overflow-hidden border-y border-ink/10 bg-surface py-4">
      <div className="marquee-track">
        {doubled.map((item, i) => (
          <span key={i} className="flex shrink-0 items-center gap-10">
            <span className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-ink-soft">
              {item}
            </span>
            <span aria-hidden="true" className="text-primary/40">
              ✦
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
