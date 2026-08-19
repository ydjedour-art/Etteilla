import { Button } from "@/components/Button";

/** En-tête commun à toutes les pages du portail visiteur (landing, /tarifs,
 * /demarches) — cohérence de navigation pour un visiteur qui explore
 * plusieurs pages avant de s'inscrire. Les ancres pointent vers `/` : depuis
 * une autre page, le lien navigue d'abord vers la landing puis défile. */
export function MarketingHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-ink/10 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-marketing items-center justify-between px-6 py-5">
        <a href="/" className="font-serif text-xl font-semibold text-primary">
          Sérénio
        </a>
        <nav className="hidden items-center gap-8 text-sm font-medium text-ink-soft sm:flex">
          <a href="/#comment-ca-marche" className="hover:text-ink">Comment ça marche</a>
          <a href="/demarches" className="hover:text-ink">Démarches couvertes</a>
          <a href="/tarifs" className="hover:text-ink">Tarifs</a>
          <a href="/#faq" className="hover:text-ink">FAQ</a>
        </nav>
        <div className="flex items-center gap-3">
          <Button href="/onboarding" variant="ghost" className="hidden sm:inline-flex">
            Se connecter
          </Button>
          <Button href="/onboarding">Commencer</Button>
        </div>
      </div>
    </header>
  );
}
