"use client";

import { useEffect, useState, type ReactNode } from "react";
import { Button } from "@/components/Button";
import { BrandMark } from "@/components/BrandMark";
import { ThemeToggle } from "@/components/ThemeToggle";

const NAV_LINKS = [
  { label: "Démarches", href: "/demarches" },
  { label: "Tarifs", href: "/tarifs" },
  { label: "Comment ça marche", href: "/#comment-ca-marche" },
];

/** Wordmark — "IZY" + slash en accent + "D", capitales serrées en Barlow
 * Condensed, comme la maquette de référence (dont le logo n'est QUE
 * typographique). On garde notre marque graphique (BrandMark, le carré à
 * lignes) à côté : c'est un actif de marque construit sur toute la session,
 * pas juste un style à copier. */
function Wordmark() {
  return (
    <span className="font-display text-lg font-black uppercase tracking-tight text-ink">
      IZY<span className="text-primary">/</span>D
    </span>
  );
}

/** En-tête commun à toutes les pages du portail visiteur (landing, /tarifs,
 * /demarches) — cohérence de navigation pour un visiteur qui explore
 * plusieurs pages avant de s'inscrire. Les ancres pointent vers `/` : depuis
 * une autre page, le lien navigue d'abord vers la landing puis défile.
 *
 * Contrairement à la référence (nav en position absolute qui défile avec le
 * hero), la nôtre reste sticky et s'opacifie/se floute au scroll — un vrai
 * gain d'utilisabilité qu'on garde en portant le reste du style.
 *
 * En dessous de sm, un bouton hamburger ouvre un panneau plein écran
 * numéroté (01/02/03…), grand format Barlow Condensed — repris de la
 * référence (FullMenu). */
export function MarketingHeader() {
  const [scrolled, setScrolled] = useState(false);
  // Le dock démarre caché, pas visible par défaut : testé deux fois qu'un
  // affichage par défaut au repos peut recouvrir du vrai contenu selon ce
  // qui se trouve au bas du viewport initial (le bouton "Choisir Sérénité"
  // en scrollant, l'attribution Service-Public d'une fiche courte dès le
  // chargement, sans même avoir scrollé — ça varie trop d'une page à
  // l'autre pour un seuil fixe). Il apparaît dès qu'on scrolle vers le
  // haut — un geste qui, par construction, n'arrive qu'après être passé
  // devant tout ce qu'il y avait à voir en premier.
  const [dockVisible, setDockVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    function onScroll() {
      const y = window.scrollY;
      setScrolled(y > 8);

      const nearBottom = y + window.innerHeight > document.documentElement.scrollHeight - 160;
      if (nearBottom) {
        setDockVisible(false);
      } else if (y > lastY + 4) {
        setDockVisible(false);
      } else if (y < lastY - 4) {
        setDockVisible(true);
      }
      lastY = y;
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
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
          // Opaque une fois scrollée — pas juste translucide : les sections
          // pleine-couleur (empathie, stats en --primary) laisseraient
          // sinon leur teinte remonter à travers le fond et rendre le "/"
          // du logo (déjà rouge) illisible sur un fond qui vire au rouge.
          scrolled ? "border-b border-ink/10 bg-bg" : "border-b border-transparent bg-bg/40"
        }`}
      >
        <div
          className={`mx-auto flex max-w-marketing items-center justify-between px-6 transition-[padding] duration-300 ease-apple ${
            scrolled ? "py-3" : "py-5"
          }`}
        >
          <a href="/" className="flex items-center gap-2.5">
            <BrandMark className="h-8 w-8 shrink-0" />
            <Wordmark />
          </a>
          <nav className="hidden items-center gap-8 font-mono text-xs uppercase tracking-widest text-ink-soft sm:flex">
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
              className="grid h-9 w-9 place-items-center border border-ink/15 text-ink transition-colors hover:bg-ink/5 sm:hidden"
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
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(var(--text) 1px, transparent 1px), linear-gradient(90deg, var(--text) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        <div className="relative flex items-center justify-between px-6 py-5">
          <span className="flex items-center gap-2.5">
            <BrandMark className="h-8 w-8 shrink-0" />
            <Wordmark />
          </span>
          <button
            type="button"
            onClick={() => setMenuOpen(false)}
            aria-label="Fermer le menu"
            className="grid h-9 w-9 place-items-center border border-ink/15 text-ink transition-colors hover:bg-ink/5"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" aria-hidden>
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        <nav className="relative flex flex-col px-6 py-6">
          {NAV_LINKS.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="group flex items-center gap-4 border-b border-ink/10 py-4 font-display text-4xl font-black uppercase leading-none tracking-tight text-ink transition-colors hover:text-primary"
            >
              <span className="font-mono text-xs text-ink-soft">0{i + 1}</span>
              {link.label}
            </a>
          ))}
        </nav>

        <div className="relative mt-6 flex flex-col gap-3 px-6">
          <Button href="/onboarding" variant="secondary">
            Se connecter
          </Button>
          <Button href="/onboarding">Commencer</Button>
        </div>
      </div>

      <BottomDock onMenuOpen={() => setMenuOpen(true)} visible={dockVisible} />
    </>
  );
}

const DOCK_ITEMS: { label: string; href: string; icon: ReactNode }[] = [
  {
    label: "Accueil",
    href: "/",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
        <path d="m4 11 8-7 8 7" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M6 10v9a1 1 0 0 0 1 1h3v-6h4v6h3a1 1 0 0 0 1-1v-9" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: "Démarches",
    href: "/demarches",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
        <path d="M9 6h11M9 12h11M9 18h11" strokeLinecap="round" />
        <path d="M4.5 6h.01M4.5 12h.01M4.5 18h.01" strokeLinecap="round" strokeWidth="3" />
      </svg>
    ),
  },
  {
    label: "Tarifs",
    href: "/tarifs",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
        <path d="M12 3v18M17 7.5c0-1.9-2.2-3-5-3s-5 1.3-5 3 2.2 3 5 3 5 1.1 5 3-2.2 3-5 3-5-1.1-5-3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

/** Dock flottant persistant — repris tel quel de la référence, y compris
 * son affichage à toutes les tailles (pas juste mobile) : sur la référence
 * il double la nav du haut plutôt que de la remplacer, un flourish
 * volontaire plus qu'une nécessité fonctionnelle. */
function BottomDock({ onMenuOpen, visible }: { onMenuOpen: () => void; visible: boolean }) {
  return (
    <nav
      className={`fixed bottom-5 left-1/2 z-30 -translate-x-1/2 transition-[opacity,transform] duration-300 ease-apple ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
      aria-label="Navigation rapide"
    >
      <div className="flex items-center border border-ink/12 bg-bg/95 backdrop-blur-xl">
        {DOCK_ITEMS.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="group flex flex-col items-center gap-1 px-4 py-3 text-ink-soft transition-colors hover:bg-ink/5 hover:text-primary"
          >
            {item.icon}
            <span className="font-mono text-[9px] uppercase tracking-widest">{item.label}</span>
          </a>
        ))}
        <div className="mx-1 h-6 w-px bg-ink/10" />
        <button
          type="button"
          onClick={onMenuOpen}
          aria-label="Ouvrir le menu"
          className="group flex flex-col items-center gap-1 px-4 py-3 text-ink-soft transition-colors hover:bg-primary/10 hover:text-primary"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" aria-hidden>
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
          <span className="font-mono text-[9px] uppercase tracking-widest">Menu</span>
        </button>
      </div>
    </nav>
  );
}
