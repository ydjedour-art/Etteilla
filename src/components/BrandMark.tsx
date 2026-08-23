/** Logo IZY/D : carré jaune citron (couleur de marque) avec trois lignes
 * horizontales qui évoquent une page de paperasse — le problème que le
 * produit prend en charge. Pas de lettres dans le carré : le mot "IZY/D"
 * s'écrit toujours à côté, jamais dedans. */
export function BrandMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 36 36"
      className={className}
      role="img"
      aria-label="Logo IZY/D"
    >
      <rect width="36" height="36" fill="var(--accent)" />
      <rect x="9" y="12" width="18" height="2.4" rx="1.2" fill="var(--on-accent)" />
      <rect x="9" y="17" width="13" height="2.4" rx="1.2" fill="var(--on-accent)" />
      <rect x="9" y="22" width="16" height="2.4" rx="1.2" fill="var(--on-accent)" />
    </svg>
  );
}
