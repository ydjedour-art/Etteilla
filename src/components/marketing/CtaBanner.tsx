import { Button } from "@/components/Button";

/** Bandeau CTA bleu Klein avec halos — reprend le même bloc à chaque fin de
 * page du portail visiteur (landing, /tarifs, /demarches), une seule
 * variante pour rester reconnaissable. */
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
      <div className="relative flex flex-col items-start gap-6 overflow-hidden rounded-3xl bg-primary p-8 sm:flex-row sm:items-center sm:justify-between sm:p-12">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-accent/20 blur-2xl"
        />
        <div
          aria-hidden="true"
          className="animate-float-glow pointer-events-none absolute -bottom-20 -left-10 h-48 w-48 rounded-full bg-flash/30 blur-2xl"
        />
        <div className="relative max-w-xl">
          <h2 className="font-display text-2xl font-extrabold text-white sm:text-3xl">
            {title}
          </h2>
          {text && <p className="mt-3 text-white/80">{text}</p>}
        </div>
        <Button href="/onboarding" className="relative shrink-0">
          {cta}
        </Button>
      </div>
    </section>
  );
}
