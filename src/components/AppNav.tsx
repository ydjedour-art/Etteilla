"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

function HomeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path d="m4 11 8-7 8 7" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6 10v9a1 1 0 0 0 1 1h3v-6h4v6h3a1 1 0 0 0 1-1v-9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ListIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path d="M9 6h11M9 12h11M9 18h11" strokeLinecap="round" />
      <path d="M4.5 6h.01M4.5 12h.01M4.5 18h.01" strokeLinecap="round" strokeWidth="3" />
    </svg>
  );
}

function VaultIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <rect x="3.5" y="4" width="17" height="16" rx="2" />
      <circle cx="12" cy="12" r="3.25" />
      <path d="M12 10v.01" strokeLinecap="round" />
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path d="M4 5.5h16v11H9l-4 3.5v-3.5H4v-11Z" strokeLinejoin="round" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M4.5 20c1.4-3.6 4.5-5.5 7.5-5.5s6.1 1.9 7.5 5.5" strokeLinecap="round" />
    </svg>
  );
}

const LINKS: { href: string; label: string; icon: ReactNode }[] = [
  { href: "/app", label: "Aujourd'hui", icon: <HomeIcon /> },
  { href: "/app/formalites", label: "Démarches", icon: <ListIcon /> },
  { href: "/app/coffre-fort", label: "Coffre-fort", icon: <VaultIcon /> },
  { href: "/app/assistant", label: "Assistant", icon: <ChatIcon /> },
  { href: "/app/profil", label: "Profil", icon: <UserIcon /> },
];

/** Navigation de l'app — 5 destinations maximum, toujours visibles, pour ne
 * jamais faire chercher l'utilisateur. Voir docs/05-design-system.md. */
export function AppNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-10 border-t border-ink/10 bg-white/95 backdrop-blur sm:sticky sm:top-0 sm:h-screen sm:w-56 sm:border-r sm:border-t-0">
      <div className="hidden px-6 py-6 sm:block">
        <span className="font-serif text-lg font-semibold text-primary">AdminZen</span>
      </div>
      <ul className="flex justify-around sm:flex-col sm:gap-1 sm:px-4">
        {LINKS.map((link) => {
          const active =
            link.href === "/app"
              ? pathname === "/app"
              : pathname.startsWith(link.href);
          return (
            <li key={link.href} className="flex-1 sm:flex-none">
              <Link
                href={link.href}
                className={`flex flex-col items-center gap-0.5 rounded-xl px-3 py-2.5 text-xs font-medium sm:flex-row sm:gap-3 sm:text-sm ${
                  active
                    ? "text-primary sm:bg-primary-light"
                    : "text-ink-soft hover:text-ink"
                }`}
              >
                {link.icon}
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
