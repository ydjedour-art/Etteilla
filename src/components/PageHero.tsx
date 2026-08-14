import type { ReactNode } from "react";

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children?: ReactNode;
};

/** En-tête standard des pages intérieures (blocs, offres détaillées, contact...). */
export function PageHero({ eyebrow, title, subtitle, children }: PageHeroProps) {
  return (
    <section className="hero-glow border-b border-ink/10">
      <div className="mx-auto max-w-marketing px-6 py-16 sm:py-20">
        {eyebrow && (
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary-light px-3 py-1.5 text-sm font-medium text-primary">
            {eyebrow}
          </span>
        )}
        <h1 className="mt-5 max-w-2xl font-serif text-3xl font-semibold leading-tight text-ink sm:text-4xl">
          {title}
        </h1>
        {subtitle && <p className="mt-5 max-w-2xl text-lg text-ink-soft">{subtitle}</p>}
        {children}
      </div>
    </section>
  );
}
