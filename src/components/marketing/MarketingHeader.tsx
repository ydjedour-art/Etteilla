"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/Button";
import { BrandMark } from "@/components/BrandMark";
import { ThemeToggle } from "@/components/ThemeToggle";

/** En-tête commun à toutes les pages du portail visiteur (landing, /tarifs,
 * /demarches) — cohérence de navigation pour un visiteur qui explore
 * plusieurs pages avant de s'inscrire. Les ancres pointent vers `/` : depuis
 * une autre page, le lien navigue d'abord vers la landing puis défile.
 *
 * Comportement façon Apple.com : quasi transparente en haut de page, elle
 * s'opacifie et gagne un léger flou/hairline dès qu'on défile — jamais un
 * changement brutal, juste une bascule de classes en douceur (transition
 * CSS sur l'élément, pas de calcul d'opacité continu en JS). */
export function MarketingHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-30 backdrop-blur-xl transition-colors duration-300 ease-apple ${
        scrolled ? "border-b border-ink/10 bg-bg/80" : "border-b border-transparent bg-bg/40"
      }`}
    >
      <div className="mx-auto flex max-w-marketing items-center justify-between px-6 py-4">
        <a href="/" className="flex items-center gap-2.5">
          <BrandMark className="h-8 w-8 shrink-0" />
          <span className="font-display text-base font-semibold text-ink">IZY/D</span>
        </a>
        <nav className="hidden items-center gap-8 text-sm font-medium text-ink-soft sm:flex">
          <a href="/demarches" className="hover:text-ink">Démarches</a>
          <a href="/tarifs" className="hover:text-ink">Tarifs</a>
          <a href="/#comment-ca-marche" className="hover:text-ink">Comment ça marche</a>
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button href="/onboarding" variant="ghost" className="hidden !px-3 sm:inline-flex">
            Se connecter
          </Button>
          <Button href="/onboarding">Commencer</Button>
        </div>
      </div>
    </header>
  );
}
