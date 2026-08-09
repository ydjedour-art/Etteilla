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
};

const VARIANT_STYLES: Record<NonNullable<CommonProps["variant"]>, string> = {
  primary: "bg-primary text-white hover:bg-primary-dark",
  secondary: "bg-primary-light text-primary hover:bg-primary-light/70",
  ghost: "bg-transparent text-ink hover:bg-ink/5",
};

const BASE =
  "inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-base font-medium transition-colors min-h-[44px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

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
      className={classes}
    >
      {children}
    </button>
  );
}
