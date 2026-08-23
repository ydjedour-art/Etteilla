import Link from "next/link";
import type { ReactNode } from "react";

type CommonProps = {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
};

type ButtonAsLink = CommonProps & {
  href: string;
  onClick?: never;
  type?: never;
};

type ButtonAsButton = CommonProps & {
  href?: never;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
};

// Bouton d'action = fond --primary (même graphite-indigo dans les deux
// thèmes), texte sur-accent — seule couleur d'action du site, pour qu'on
// ne se demande jamais "quel bouton cliquer". Forme pilule et animation
// discrète (échelle, pas de lift) façon Apple.com.
const VARIANT_STYLES: Record<NonNullable<CommonProps["variant"]>, string> = {
  primary: "bg-primary text-accent-foreground hover:bg-primary-hover",
  secondary: "bg-primary/10 text-primary hover:bg-primary/15",
  ghost: "bg-transparent text-ink hover:bg-ink/5",
};

const BASE =
  "inline-flex items-center justify-center gap-2 rounded-pill px-6 py-3 text-base font-semibold transition-all duration-200 ease-apple min-h-[44px] hover:scale-[1.02] active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:opacity-50 disabled:pointer-events-none disabled:scale-100";

/** Bouton unique du design system — un seul style d'action primaire dans toute
 * l'app pour ne jamais laisser l'utilisateur hésiter sur "quel bouton cliquer".
 * Voir docs/05-design-system.md. */
export function Button(props: ButtonAsLink | ButtonAsButton) {
  const { children, variant = "primary", className = "" } = props;
  const classes = `${BASE} ${VARIANT_STYLES[variant]} ${className}`;

  if ("href" in props && props.href) {
    return (
      <Link href={props.href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={"type" in props ? props.type ?? "button" : "button"}
      onClick={"onClick" in props ? props.onClick : undefined}
      disabled={"disabled" in props ? props.disabled : undefined}
      className={classes}
    >
      {children}
    </button>
  );
}
