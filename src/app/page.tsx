import { Button } from "@/components/Button";

// NOTE PHOTOGRAPHIE — cette page réserve des emplacements pour de vraies photos
// (voir .official-photo-placeholder dans globals.css). Pour remplacer un
// emplacement par une vraie photo : dépose le fichier dans /public/photos/ puis
// remplace le <div className="official-photo-placeholder"> concerné par
// `<img src="/photos/ton-fichier.jpg" className="h-full w-full object-cover" alt="…" />`.
// Voir le README pour le détail.

const ORGANISMES = [
  "CAF",
  "DGFiP (Impôts)",
  "URSSAF",
  "Préfecture (ANEF)",
  "CPAM",
  "Mutuelle",
];

const STATS = [
  { value: "8", label: "démarches couvertes au lancement" },
  { value: "< 5 min", label: "de votre temps, en moyenne, par démarche" },
  { value: "100%", label: "de vos documents hébergés en France" },
];

const STEPS = [
  {
    title: "Racontez votre situation",
    description:
      "En 2 minutes, sans jargon : votre statut, votre famille, ce qui vient de changer.",
  },
  {
    title: "On détecte ce qui vous concerne",
    description:
      "AdminZen repère les démarches pertinentes et prépare les dossiers à votre place.",
  },
  {
    title: "Vous validez, on s'occupe du reste",
    description:
      "Un geste pour valider. On suit, on relance, on vous prévient uniquement si besoin.",
  },
];

// Scénarios illustratifs basés sur les personas produit (docs/02-personas-et-parcours.md)
// — pas des témoignages clients réels, AdminZen n'a pas encore d'utilisateurs.
const SCENARIOS = [
  {
    initials: "L",
    name: "Léa",
    context: "Expatriée, arrivée récente en France",
    quote:
      "Renouveler mon titre de séjour sans savoir par où commencer, c'était ma plus grande angoisse. AdminZen prépare le dossier des mois à l'avance.",
  },
  {
    initials: "K",
    name: "Karim",
    context: "Indépendant, micro-entrepreneur",
    quote:
      "Entre les clients et les déclarations URSSAF, il fallait choisir. Maintenant le montant est calculé et prêt à valider chaque trimestre.",
  },
  {
    initials: "N",
    name: "Nadia",
    context: "Aidante familiale",
    quote:
      "Je gère l'administratif de ma mère en plus du mien. Avoir tous les dossiers au même endroit, avec les mêmes rappels, change tout.",
  },
];

const FAQS = [
  {
    question: "Mes documents sont-ils vraiment en sécurité ?",
    answer:
      "Oui : chiffrement des documents, hébergement en France, et un accès strictement limité à ce qui est nécessaire pour traiter votre dossier. Le détail complet est documenté publiquement dans notre politique de sécurité.",
  },
  {
    question: "AdminZen peut-il vraiment envoyer mes dossiers à ma place ?",
    answer:
      "Selon la formule choisie : soit on prépare tout et vous validez en un clic, soit — avec un mandat explicite que vous pouvez révoquer à tout moment — on transmet et on suit le dossier pour vous de bout en bout.",
  },
  {
    question: "Combien ça coûte ?",
    answer:
      "La formule Vigilance (rappels, coffre-fort, assistant) est gratuite. Les formules Essentiel et Sérénité, payantes, ajoutent le pré-remplissage puis la prise en charge complète.",
  },
  {
    question: "Quelles démarches sont couvertes aujourd'hui ?",
    answer:
      "CAF, impôts, URSSAF, titre de séjour, CPAM, mutuelle, changement d'adresse et aides spécifiques. La liste s'élargit progressivement.",
  },
];

function CheckIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="m5 12 5 5L20 7" />
    </svg>
  );
}

function ShieldIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className={className} aria-hidden>
      <path d="M12 3 4.5 6v6c0 4.5 3 7.5 7.5 9 4.5-1.5 7.5-4.5 7.5-9V6L12 3Z" strokeLinejoin="round" />
      <path d="m9 12 2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MapPinIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className={className} aria-hidden>
      <path d="M12 21s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12Z" strokeLinejoin="round" />
      <circle cx="12" cy="9" r="2.5" />
    </svg>
  );
}

function LockIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className={className} aria-hidden>
      <rect x="4.5" y="10.5" width="15" height="9.5" rx="2" />
      <path d="M8 10.5V7.5a4 4 0 0 1 8 0v3" />
    </svg>
  );
}

export default function LandingPage() {
  return (
    <main className="bg-surface">
      {/* Header */}
      <header className="border-b border-ink/10 bg-white">
        <div className="mx-auto flex max-w-marketing items-center justify-between px-6 py-5">
          <span className="font-serif text-xl font-semibold text-primary">AdminZen</span>
          <nav className="hidden items-center gap-8 text-sm font-medium text-ink-soft sm:flex">
            <a href="#comment-ca-marche" className="hover:text-ink">Comment ça marche</a>
            <a href="#demarches" className="hover:text-ink">Démarches couvertes</a>
            <a href="#faq" className="hover:text-ink">FAQ</a>
          </nav>
          <div className="flex items-center gap-3">
            <Button href="/onboarding" variant="ghost" className="hidden sm:inline-flex">
              Se connecter
            </Button>
            <Button href="/onboarding">Commencer</Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="hero-glow border-b border-ink/10">
        <div className="mx-auto grid max-w-marketing items-center gap-12 px-6 py-16 sm:py-24 lg:grid-cols-2">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary-light px-3 py-1.5 text-sm font-medium text-primary">
              <ShieldIcon className="h-4 w-4" />
              Conçu pour l&apos;administratif français
            </span>
            <h1 className="mt-6 font-serif text-4xl font-semibold leading-tight text-ink sm:text-5xl">
              On s&apos;occupe de ton administratif.
              <br />
              <span className="text-primary">Toi, tu vis.</span>
            </h1>
            <p className="mt-6 max-w-lg text-lg text-ink-soft">
              CAF, impôts, URSSAF, titre de séjour... AdminZen est le filet de sécurité
              qui prend en charge votre administratif — pour de vrai, pas juste des
              rappels.
            </p>
            <p className="mt-3 max-w-lg text-sm text-ink-soft">
              Simple flemme ou vraie phobie administrative : décrivez votre situation en
              une phrase, on identifie la démarche et on ne vous demande que le
              nécessaire.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button href="/onboarding">Je respire, on s&apos;occupe de tout</Button>
              <a
                href="#comment-ca-marche"
                className="text-sm font-medium text-ink-soft underline underline-offset-4 hover:text-ink"
              >
                Voir comment ça marche
              </a>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-sm">
            <div className="official-photo-placeholder aspect-[4/5] w-full rounded-2xl shadow-xl" />
            <div className="absolute -bottom-6 -left-6 w-64 rounded-2xl border border-ink/10 bg-white p-4 shadow-lg">
              <p className="text-xs font-medium text-ink-soft">Dossier CAF</p>
              <p className="mt-1 flex items-center gap-2 text-sm font-semibold text-success">
                <CheckIcon className="h-4 w-4" />
                Envoyé et suivi pour vous
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bandeau organismes */}
      <section id="demarches" className="border-b border-ink/10 bg-white py-10">
        <div className="mx-auto max-w-marketing px-6">
          <p className="text-center text-xs font-semibold uppercase tracking-wide text-ink-soft">
            Démarches déléguables auprès de
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
            {ORGANISMES.map((org) => (
              <span key={org} className="text-lg font-serif text-ink-soft/80">
                {org}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-primary py-14 text-white">
        <div className="mx-auto grid max-w-marketing gap-8 px-6 sm:grid-cols-3">
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-serif text-4xl font-semibold">{stat.value}</p>
              <p className="mt-2 text-sm text-white/75">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Comment ça marche */}
      <section id="comment-ca-marche" className="mx-auto max-w-marketing px-6 py-20">
        <h2 className="text-center font-serif text-3xl font-semibold text-ink">
          Comment ça marche
        </h2>
        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {STEPS.map((step, index) => (
            <div key={step.title} className="rounded-2xl border border-ink/10 bg-white p-6">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white">
                {index + 1}
              </span>
              <h3 className="mt-4 font-semibold text-ink">{step.title}</h3>
              <p className="mt-2 text-sm text-ink-soft">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Scénarios (personas) */}
      <section className="border-y border-ink/10 bg-white py-20">
        <div className="mx-auto max-w-marketing px-6">
          <h2 className="text-center font-serif text-3xl font-semibold text-ink">
            Conçu pour des situations comme celle-ci
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-sm text-ink-soft">
            AdminZen est en cours de développement à partir de ces scénarios types —
            pas encore de témoignages d&apos;utilisateurs réels.
          </p>
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {SCENARIOS.map((scenario) => (
              <figure
                key={scenario.name}
                className="flex h-full flex-col rounded-2xl border border-ink/10 p-6"
              >
                <blockquote className="flex-1 text-ink">
                  &laquo; {scenario.quote} &raquo;
                </blockquote>
                <figcaption className="mt-5 flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-light font-serif text-sm font-semibold text-primary">
                    {scenario.initials}
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-ink">{scenario.name}</span>
                    <span className="block text-xs text-ink-soft">{scenario.context}</span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-content px-6 py-20">
        <h2 className="text-center font-serif text-3xl font-semibold text-ink">
          Questions fréquentes
        </h2>
        <div className="mt-10 divide-y divide-ink/10 rounded-2xl border border-ink/10 bg-white">
          {FAQS.map((faq) => (
            <details key={faq.question} className="group p-6">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium text-ink">
                {faq.question}
                <span className="text-ink-soft transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 text-sm text-ink-soft">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      {/* CTA final */}
      <section className="mx-auto max-w-marketing px-6 pb-24">
        <div className="rounded-2xl bg-primary px-8 py-14 text-center text-white">
          <h2 className="font-serif text-2xl font-semibold sm:text-3xl">
            Votre charge mentale administrative peut s&apos;arrêter aujourd&apos;hui.
          </h2>
          <div className="mt-6 flex justify-center">
            <Button href="/onboarding" className="!bg-white !text-primary hover:!bg-white/90">
              Commencer
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-ink/10 bg-white">
        <div className="mx-auto max-w-marketing px-6 py-12">
          <div className="grid gap-10 sm:grid-cols-4">
            <div>
              <span className="font-serif text-lg font-semibold text-primary">AdminZen</span>
              <p className="mt-3 text-sm text-ink-soft">
                On s&apos;occupe de ton administratif. Toi, tu vis.
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold text-ink">Produit</p>
              <ul className="mt-3 space-y-2 text-sm text-ink-soft">
                <li><a href="#comment-ca-marche" className="hover:text-ink">Comment ça marche</a></li>
                <li><a href="#demarches" className="hover:text-ink">Démarches couvertes</a></li>
                <li><a href="#faq" className="hover:text-ink">FAQ</a></li>
              </ul>
            </div>
            <div>
              <p className="text-sm font-semibold text-ink">Compte</p>
              <ul className="mt-3 space-y-2 text-sm text-ink-soft">
                <li><a href="/onboarding" className="hover:text-ink">Créer un compte</a></li>
                <li><a href="/onboarding" className="hover:text-ink">Se connecter</a></li>
              </ul>
            </div>
            <div>
              <p className="text-sm font-semibold text-ink">Confiance</p>
              <ul className="mt-3 space-y-2 text-sm text-ink-soft">
                <li className="flex items-center gap-2"><LockIcon className="h-4 w-4" /> Documents chiffrés</li>
                <li className="flex items-center gap-2"><MapPinIcon className="h-4 w-4" /> Hébergé en France</li>
                <li className="flex items-center gap-2"><ShieldIcon className="h-4 w-4" /> Conforme RGPD</li>
              </ul>
            </div>
          </div>
          <p className="mt-10 border-t border-ink/10 pt-6 text-xs text-ink-soft">
            © {new Date().getFullYear()} AdminZen — Prototype de conception, données
            simulées.
          </p>
        </div>
      </footer>
    </main>
  );
}
