import Link from "next/link";
import type { Arborescence } from "@/types/fiches";

/** Grille des thèmes de premier niveau, avec le nombre de fiches qu'ils
 * contiennent. Exclut les nœuds "thème" dégénérés du corpus source : une
 * poignée de fiches orphelines dont fil_ariane ne contient aucun vrai
 * niveau intermédiaire, si bien que leur "thème" est en réalité leur propre
 * titre (voir scripts/build-arborescence.ts) — elles restent trouvables par
 * la recherche et leur page, juste pas mises en avant ici. */
function countFiches(theme: Arborescence[number]): number {
  return theme.enfants.reduce(
    (sum, node) => sum + (node.type === "fiche" ? 1 : node.enfants.length),
    0
  );
}

function isDegenerate(theme: Arborescence[number]): boolean {
  return theme.enfants.length === 1 && theme.enfants[0].type === "fiche" && theme.enfants[0].titre === theme.titre;
}

export function ThemeGrid({ arborescence }: { arborescence: Arborescence }) {
  const themes = arborescence.filter((t) => !isDegenerate(t));

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {themes.map((theme) => (
        <Link
          key={theme.slug}
          href={`/demarches/${theme.slug}`}
          className="card-interactive flex h-full flex-col p-5"
        >
          <h3 className="font-display text-base font-extrabold text-ink">{theme.titre}</h3>
          <p className="mt-1 text-sm text-ink-soft">{countFiches(theme)} fiches</p>
        </Link>
      ))}
    </div>
  );
}
