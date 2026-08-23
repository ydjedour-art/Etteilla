"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "izyd-theme";

function SunIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" className={className} aria-hidden>
      <circle cx="12" cy="12" r="4.5" />
      <path d="M12 2.5v2.5M12 19v2.5M4.6 4.6l1.8 1.8M17.6 17.6l1.8 1.8M2.5 12H5M19 12h2.5M4.6 19.4l1.8-1.8M17.6 6.4l1.8-1.8" />
    </svg>
  );
}

function MoonIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5Z" />
    </svg>
  );
}

/** Bascule sombre/clair — sombre par défaut. Le choix est mémorisé
 * (localStorage) et appliqué avant le premier paint par le script inline de
 * layout.tsx ; ce composant ne fait qu'écouter/mettre à jour l'attribut
 * `data-theme` sur <html> après montage. */
export function ThemeToggle({ className = "" }: { className?: string }) {
  const [theme, setTheme] = useState<"dark" | "light" | null>(null);

  useEffect(() => {
    const current = document.documentElement.getAttribute("data-theme");
    setTheme(current === "light" ? "light" : "dark");
  }, []);

  function toggle() {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // stockage indisponible (navigation privée...) : le thème reste actif
      // pour la session mais ne sera pas mémorisé.
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === "light" ? "Passer en mode sombre" : "Passer en mode clair"}
      className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border border-ink/10 text-ink-soft transition-colors hover:text-ink ${className}`}
    >
      {/* Rendu identique tant que le thème réel n'est pas connu côté client
        (évite un mismatch d'hydratation) : la lune sert d'icône par défaut,
        cohérente avec le sombre par défaut. */}
      {theme === "light" ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}
