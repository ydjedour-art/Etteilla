/** Indicateur d'étapes — jamais plus de 4-5 étapes visibles à la fois.
 * Voir docs/05-design-system.md. */
export function ProgressSteps({
  total,
  current,
}: {
  total: number;
  current: number;
}) {
  return (
    <div className="flex items-center gap-2" role="progressbar" aria-valuemin={1} aria-valuemax={total} aria-valuenow={current}>
      {Array.from({ length: total }).map((_, index) => (
        <span
          key={index}
          className={`h-1.5 flex-1 rounded-full ${
            index < current ? "bg-primary" : "bg-primary/15"
          }`}
        />
      ))}
    </div>
  );
}
