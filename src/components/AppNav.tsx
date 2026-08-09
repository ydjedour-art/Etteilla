"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/app", label: "Aujourd'hui", icon: "🏠" },
  { href: "/app/formalites", label: "Démarches", icon: "📋" },
  { href: "/app/coffre-fort", label: "Coffre-fort", icon: "🗄️" },
  { href: "/app/assistant", label: "Assistant", icon: "💬" },
  { href: "/app/profil", label: "Profil", icon: "👤" },
];

/** Navigation de l'app — 5 destinations maximum, toujours visibles, pour ne
 * jamais faire chercher l'utilisateur. Voir docs/05-design-system.md. */
export function AppNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-10 border-t border-ink/10 bg-white/95 backdrop-blur sm:sticky sm:top-0 sm:h-screen sm:w-56 sm:border-r sm:border-t-0">
      <ul className="flex justify-around sm:flex-col sm:gap-1 sm:p-4">
        {LINKS.map((link) => {
          const active =
            link.href === "/app"
              ? pathname === "/app"
              : pathname.startsWith(link.href);
          return (
            <li key={link.href} className="flex-1 sm:flex-none">
              <Link
                href={link.href}
                className={`flex flex-col items-center gap-0.5 rounded-xl px-3 py-2.5 text-xs font-medium sm:flex-row sm:gap-2 sm:text-sm ${
                  active
                    ? "text-primary sm:bg-primary-light"
                    : "text-ink-soft hover:text-ink"
                }`}
              >
                <span aria-hidden>{link.icon}</span>
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
