import { Button } from "@/components/Button";

/** En-tête commun à toutes les pages du portail visiteur (landing, /tarifs,
 * /demarches) — cohérence de navigation pour un visiteur qui explore
 * plusieurs pages avant de s'inscrire. Les ancres pointent vers `/` : depuis
 * une autre page, le lien navigue d'abord vers la landing puis défile. */
export function MarketingHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-ink/10 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-marketing items-center justify-between px-6 py-4">
        <a href="/" className="flex items-center gap-2.5">
          <span
            aria-hidden="true"
            className="grid h-9 w-9 place-items-center rounded-lg bg-accent font-display text-sm font-extrabold text-accent-foreground"
          >
            iD
          </span>
          <span className="font-display text-lg font-extrabold text-ink">IZY/D</span>
        </a>
        <nav className="hidden items-center gap-7 text-sm font-semibold text-ink-soft sm:flex">
          <a href="/demarches" className="hover:text-ink">Démarches</a>
          <a href="/tarifs" className="hover:text-ink">Tarifs</a>
          <a href="/#comment-ca-marche" className="hover:text-ink">Comment ça marche</a>
        </nav>
        <div className="flex items-center gap-2">
          <Button href="/onboarding" variant="ghost" className="hidden !px-3 sm:inline-flex">
            Se connecter
          </Button>
          <Button href="/onboarding">On s&apos;en occupe</Button>
        </div>
      </div>
    </header>
  );
}
