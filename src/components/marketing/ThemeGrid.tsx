import Link from "next/link";
import { themeEmoji } from "@/lib/theme-emoji";
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
    <div className="flex flex-wrap gap-2.5">
      {themes.map((theme) => (
        <Link
          key={theme.slug}
          href={`/demarches/${theme.slug}`}
          className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-card py-2 pl-2.5 pr-4 text-sm font-semibold text-ink transition-colors hover:border-primary hover:bg-primary/10"
        >
          <span aria-hidden="true" className="text-lg">
            {themeEmoji(theme.slug)}
          </span>
          {theme.titre}
          <span className="text-xs font-normal text-ink-soft">{countFiches(theme)}</span>
        </Link>
      ))}
    </div>
  );
}
