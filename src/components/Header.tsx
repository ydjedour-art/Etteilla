"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/Button";
import { ChevronDownIcon, MenuIcon, XIcon } from "@/components/Icons";
import { OFFER_BLOCKS } from "@/lib/offers";

const NAV_LINKS = [
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const [offresOpen, setOffresOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-marketing items-center justify-between px-6 py-4">
        <Link href="/" className="font-serif text-xl font-semibold text-primary">
          YD Formation
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium text-ink-soft lg:flex">
          <Link href="/" className="hover:text-ink">
            Accueil
          </Link>

          <div
            className="relative"
            onMouseEnter={() => setOffresOpen(true)}
            onMouseLeave={() => setOffresOpen(false)}
          >
            <button
              type="button"
              className="flex items-center gap-1.5 hover:text-ink"
              aria-expanded={offresOpen}
              onClick={() => setOffresOpen((v) => !v)}
            >
              Offres
              <ChevronDownIcon className={`h-4 w-4 transition-transform ${offresOpen ? "rotate-180" : ""}`} />
            </button>
            {offresOpen && (
              <div className="absolute left-1/2 top-full w-80 -translate-x-1/2 pt-3">
                <div className="rounded-2xl border border-ink/10 bg-white p-3 shadow-lg">
                  {OFFER_BLOCKS.map((block) => (
                    <Link
                      key={block.slug}
                      href={`/${block.slug}`}
                      className="block rounded-xl px-4 py-3 hover:bg-primary-light"
                    >
                      <span className="block text-sm font-semibold text-ink">{block.title}</span>
                      <span className="block text-xs text-ink-soft">{block.tagline}</span>
                    </Link>
                  ))}
                  <div className="mt-1 border-t border-ink/10 pt-2">
                    <Link
                      href="/offres"
                      className="block rounded-xl px-4 py-2.5 text-sm font-semibold text-primary hover:bg-primary-light"
                    >
                      Toutes nos offres →
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>

          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-ink">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Button href="/contact" variant="ghost">
            Prendre contact
          </Button>
          <Button href="/offres">Découvrir nos parcours</Button>
        </div>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-lg text-ink lg:hidden"
          aria-label="Ouvrir le menu"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-ink/10 bg-white px-6 py-4 lg:hidden">
          <nav className="flex flex-col gap-1 text-sm font-medium text-ink-soft">
            <Link href="/" className="rounded-lg px-2 py-2.5 hover:bg-surface hover:text-ink" onClick={() => setMobileOpen(false)}>
              Accueil
            </Link>
            <p className="px-2 pt-3 pb-1 text-xs font-semibold uppercase tracking-wide text-ink-soft/70">
              Offres
            </p>
            {OFFER_BLOCKS.map((block) => (
              <Link
                key={block.slug}
                href={`/${block.slug}`}
                className="rounded-lg px-2 py-2.5 hover:bg-surface hover:text-ink"
                onClick={() => setMobileOpen(false)}
              >
                {block.title}
              </Link>
            ))}
            <Link
              href="/offres"
              className="rounded-lg px-2 py-2.5 font-semibold text-primary hover:bg-surface"
              onClick={() => setMobileOpen(false)}
            >
              Toutes nos offres →
            </Link>
            <div className="my-2 border-t border-ink/10" />
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-2 py-2.5 hover:bg-surface hover:text-ink"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mt-4 flex flex-col gap-2">
            <Button href="/contact" variant="secondary" className="w-full">
              Prendre contact
            </Button>
            <Button href="/offres" className="w-full">
              Découvrir nos parcours
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
