"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/Button";
import { BrandMark } from "@/components/BrandMark";
import { ThemeToggle } from "@/components/ThemeToggle";

const NAV_LINKS = [
  { label: "Démarches", href: "/demarches" },
  { label: "Tarifs", href: "/tarifs" },
  { label: "Comment ça marche", href: "/#comment-ca-marche" },
];

/** En-tête commun à toutes les pages du portail visiteur (landing, /tarifs,
 * /demarches) — cohérence de navigation pour un visiteur qui explore
 * plusieurs pages avant de s'inscrire. Les ancres pointent vers `/` : depuis
 * une autre page, le lien navigue d'abord vers la landing puis défile.
 *
 * Comportement façon Apple.com : quasi transparente et haute en haut de
 * page, elle s'opacifie, se floute et se resserre légèrement dès qu'on
 * défile — jamais un changement brutal, tout est animé (background, bordure
 * ET hauteur) via transition CSS sur l'état "scrolled", pas de calcul
 * continu en JS.
 *
 * En dessous de sm, les liens de nav n'avaient nulle part où aller (juste
 * masqués) — un bouton hamburger ouvre un panneau plein écran qui les
 * reprend tous, plus "Se connecter". */
export function MarketingHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={`sticky top-0 z-30 backdrop-blur-xl transition-[background-color,border-color] duration-300 ease-apple ${
          scrolled ? "border-b border-ink/10 bg-bg/80" : "border-b border-transparent bg-bg/40"
        }`}
      >
        <div
          className={`mx-auto flex max-w-marketing items-center justify-between px-6 transition-[padding] duration-300 ease-apple ${
            scrolled ? "py-3" : "py-5"
          }`}
        >
          <a href="/" className="flex items-center gap-2.5">
            <BrandMark className="h-8 w-8 shrink-0" />
            <span className="font-display text-base font-semibold text-ink">IZY/D</span>
          </a>
          <nav className="hidden items-center gap-8 text-sm font-medium text-ink-soft sm:flex">
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href} className="hover:text-ink">
                {link.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button href="/onboarding" variant="ghost" className="hidden !px-3 sm:inline-flex">
              Se connecter
            </Button>
            <Button href="/onboarding" className="hidden sm:inline-flex">
              Commencer
            </Button>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Ouvrir le menu"
              aria-expanded={menuOpen}
              className="grid h-9 w-9 place-items-center rounded-full border border-ink/10 text-ink transition-colors hover:bg-ink/5 sm:hidden"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" aria-hidden>
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Panneau plein écran mobile — hors de <header> volontairement : le
          header a backdrop-blur (donc son propre "containing block" pour les
          descendants position:fixed), ce qui coincerait ce panneau dans la
          hauteur de la barre au lieu de couvrir tout le viewport. */}
      <div
        className={`fixed inset-0 z-40 bg-bg transition-opacity duration-300 ease-apple sm:hidden ${
          menuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!menuOpen}
      >
        <div className="flex items-center justify-between px-6 py-5">
          <span className="flex items-center gap-2.5">
            <BrandMark className="h-8 w-8 shrink-0" />
            <span className="font-display text-base font-semibold text-ink">IZY/D</span>
          </span>
          <button
            type="button"
            onClick={() => setMenuOpen(false)}
            aria-label="Fermer le menu"
            className="grid h-9 w-9 place-items-center rounded-full border border-ink/10 text-ink transition-colors hover:bg-ink/5"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" aria-hidden>
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        <nav className="flex flex-col gap-1 px-6 py-6">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="rounded-xl px-3 py-4 font-display text-2xl font-semibold text-ink transition-colors hover:bg-ink/5"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex flex-col gap-3 px-6">
          <Button href="/onboarding" variant="secondary">
            Se connecter
          </Button>
          <Button href="/onboarding">Commencer</Button>
        </div>
      </div>
    </>
  );
}
