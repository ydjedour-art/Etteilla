import Link from "next/link";
import type { ReactNode } from "react";

type CommonProps = {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "inverted";
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

// Bouton d'action = fond --primary (rouge signal, identique dans les deux
// thèmes), texte sur-accent — seule couleur d'action pleine du site, pour
// qu'on ne se demande jamais "quel bouton cliquer". Au survol : inversion
// franche vers les tons de la page (bg <-> texte), pas un dégradé — la
// signature de la maquette de référence.
const VARIANT_STYLES: Record<NonNullable<CommonProps["variant"]>, string> = {
  primary: "bg-primary text-accent-foreground hover:bg-ink hover:text-bg",
  secondary: "border-2 border-ink/25 text-ink hover:border-ink hover:bg-ink hover:text-bg",
  ghost: "bg-transparent text-ink-soft hover:text-ink",
  // Réservé aux panneaux déjà teintés en --primary (CtaBanner…) : un bouton
  // "primary" s'y fondrait dans le fond. Inverse la paire de couleurs.
  inverted: "bg-accent-foreground text-primary hover:bg-ink hover:text-bg",
};

const BASE =
  "inline-flex items-center justify-center gap-2 px-8 py-3.5 font-display text-sm font-black uppercase tracking-[0.1em] transition-colors duration-150 min-h-[44px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:opacity-50 disabled:pointer-events-none";

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
