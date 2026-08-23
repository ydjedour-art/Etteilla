import { BrandMark } from "@/components/BrandMark";
import { LockIcon, MapPinIcon, ShieldIcon } from "@/components/icons";

/** Pied de page commun aux pages du portail visiteur. */
export function MarketingFooter() {
  return (
    <footer className="border-t border-ink/10 bg-bg pb-28">
      <div className="mx-auto max-w-marketing px-6 py-12">
        <div className="grid gap-10 sm:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <BrandMark className="h-7 w-7 shrink-0" />
              <span className="font-display text-lg font-black uppercase tracking-tight text-ink">
                IZY<span className="text-primary">/</span>D
              </span>
            </div>
            <p className="mt-3 text-sm text-ink-soft">
              On s&apos;occupe de ton administratif. Toi, tu vis.
            </p>
          </div>
          <div>
            <p className="text-sm font-bold text-ink">Le site</p>
            <ul className="mt-3 space-y-2 text-sm text-ink-soft">
              <li><a href="/demarches" className="hover:text-ink">Démarches</a></li>
              <li><a href="/tarifs" className="hover:text-ink">Tarifs</a></li>
              <li><a href="/#comment-ca-marche" className="hover:text-ink">Comment ça marche</a></li>
              <li><a href="/tarifs#faq" className="hover:text-ink">FAQ</a></li>
            </ul>
          </div>
          <div>
            <p className="text-sm font-bold text-ink">Compte</p>
            <ul className="mt-3 space-y-2 text-sm text-ink-soft">
              <li><a href="/onboarding" className="hover:text-ink">Créer un compte</a></li>
              <li><a href="/onboarding" className="hover:text-ink">Se connecter</a></li>
            </ul>
          </div>
          <div>
            <p className="text-sm font-bold text-ink">Confiance</p>
            <ul className="mt-3 space-y-2 text-sm text-ink-soft">
              <li className="flex items-center gap-2"><LockIcon className="h-4 w-4" /> Chiffré de bout en bout</li>
              <li className="flex items-center gap-2"><MapPinIcon className="h-4 w-4" /> Hébergé en France</li>
              <li className="flex items-center gap-2"><ShieldIcon className="h-4 w-4" /> Conforme RGPD</li>
            </ul>
          </div>
        </div>
        <p className="mt-10 border-t border-ink/10 pt-6 text-xs text-ink-soft">
          © {new Date().getFullYear()} IZY/D — Prototype de conception, données
          simulées.
        </p>
      </div>
    </footer>
  );
}
