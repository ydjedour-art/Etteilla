import Link from "next/link";
import { GlobeIcon, MailIcon, PhoneIcon } from "@/components/Icons";
import { OFFER_BLOCKS } from "@/lib/offers";

export function Footer() {
  return (
    <footer className="border-t border-ink/10 bg-white">
      <div className="mx-auto max-w-marketing px-6 py-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <span className="font-serif text-lg font-semibold text-primary">YD Formation</span>
            <p className="mt-3 text-sm text-ink-soft">
              Un accompagnement structuré, de la connaissance de soi à la gestion
              d&apos;entreprise — 100 % à distance.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-ink-soft">
              <li className="flex items-center gap-2">
                <GlobeIcon className="h-4 w-4 shrink-0" /> 100 % à distance, partout en France
              </li>
              <li className="flex items-center gap-2">
                <MailIcon className="h-4 w-4 shrink-0" /> contact@ydformation.fr
              </li>
              <li className="flex items-center gap-2">
                <PhoneIcon className="h-4 w-4 shrink-0" /> Sur rendez-vous
              </li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-ink">Nos offres</p>
            <ul className="mt-3 space-y-2 text-sm text-ink-soft">
              {OFFER_BLOCKS.map((block) => (
                <li key={block.slug}>
                  <Link href={`/${block.slug}`} className="hover:text-ink">
                    {block.navLabel}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/offres" className="font-medium text-primary hover:text-primary-dark">
                  Toutes nos offres
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-ink">Formations phares</p>
            <ul className="mt-3 space-y-2 text-sm text-ink-soft">
              <li>
                <Link href="/offres/bilan-de-competences" className="hover:text-ink">
                  Bilan de compétences
                </Link>
              </li>
              <li>
                <Link href="/offres/creation-entreprise" className="hover:text-ink">
                  Création d&apos;entreprise (RS6996)
                </Link>
              </li>
              <li>
                <Link href="/offres/rgpd-dpo" className="hover:text-ink">
                  RGPD & protection des données
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-ink">Organisme</p>
            <ul className="mt-3 space-y-2 text-sm text-ink-soft">
              <li>
                <Link href="/blog" className="hover:text-ink">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-ink">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/mentions-legales" className="hover:text-ink">
                  Mentions légales
                </Link>
              </li>
              <li>
                <Link href="/politique-de-confidentialite" className="hover:text-ink">
                  Politique de confidentialité
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <p className="mt-10 border-t border-ink/10 pt-6 text-xs text-ink-soft">
          © {new Date().getFullYear()} YD Formation — Organisme de formation 100 % à distance.
        </p>
      </div>
    </footer>
  );
}
