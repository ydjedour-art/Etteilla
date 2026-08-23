import { Button } from "@/components/Button";

/** Bandeau CTA — panneau plein --primary, plat et net (pas de halo ni de
 * dégradé : la retenue Apple plutôt que l'effet "glow"). Reprend le même
 * bloc à chaque fin de page du portail visiteur (landing, /tarifs,
 * /demarches), une seule variante pour rester reconnaissable. */
export function CtaBanner({
  title,
  text,
  cta = "On s'en occupe",
}: {
  title: string;
  text?: string;
  cta?: string;
}) {
  return (
    <section className="mx-auto max-w-marketing px-6 py-16 sm:py-20">
      <div className="flex flex-col items-start gap-6 rounded-3xl bg-primary p-8 sm:flex-row sm:items-center sm:justify-between sm:p-12">
        <div className="max-w-xl">
          <h2 className="font-display text-2xl font-semibold text-accent-foreground sm:text-3xl">
            {title}
          </h2>
          {text && <p className="mt-3 text-accent-foreground/80">{text}</p>}
        </div>
        <Button href="/onboarding" variant="inverted" className="shrink-0">
          {cta}
        </Button>
      </div>
    </section>
  );
}
