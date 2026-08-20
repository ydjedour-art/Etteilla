import Link from "next/link";
import { Button } from "@/components/Button";
import { LockIcon, MapPinIcon, ShieldIcon, UsersIcon } from "@/components/icons";
import { CtaBanner } from "@/components/marketing/CtaBanner";
import { EspaceCard } from "@/components/marketing/EspaceCard";
import { MarketingFooter } from "@/components/marketing/MarketingFooter";
import { MarketingHeader } from "@/components/marketing/MarketingHeader";
import { PricingPlans } from "@/components/marketing/PricingPlans";
import { categoryEmoji } from "@/lib/category-emoji";
import { getFormalityTemplates } from "@/lib/data";

// Le visuel du hero est la carte "Ton espace" (src/components/marketing/EspaceCard.tsx),
// un aperçu vivant du tableau de bord plutôt qu'une photo. La classe
// .official-photo-placeholder (globals.css) reste dispo si une vraie photo
// est ajoutée ailleurs plus tard — voir le README pour le détail.

const STEPS = [
  {
    emoji: "🗣️",
    title: "Tu racontes ta situation",
    text: "2 minutes, sans jargon. Ce qui pèse, ce qui presse.",
  },
  {
    emoji: "🧭",
    title: "On s'occupe de tout",
    text: "On remplit, on envoie, on suit à ta place.",
  },
  {
    emoji: "🤝",
    title: "Tu respires",
    text: "Une démarche de moins. On te tient au courant, simplement.",
  },
];

// Scénarios illustratifs basés sur les personas produit (docs/02-personas-et-parcours.md)
// — pas des témoignages clients réels, IZY/D n'a pas encore d'utilisateurs.
const SCENARIOS = [
  {
    initials: "L",
    name: "Léa",
    context: "Expatriée",
    quote: "Mon titre de séjour, préparé des mois à l'avance. Sans que j'aie à y penser.",
  },
  {
    initials: "K",
    name: "Karim",
    context: "Micro-entrepreneur",
    quote: "Mes déclarations URSSAF, calculées et prêtes à valider chaque trimestre.",
  },
  {
    initials: "N",
    name: "Nadia",
    context: "Aidante familiale",
    quote: "Mes démarches et celles de ma mère, au même endroit, avec les mêmes rappels.",
  },
];

const TRUST_POINTS = [
  { icon: LockIcon, label: "Chiffré de bout en bout" },
  { icon: MapPinIcon, label: "Hébergé en France" },
  { icon: ShieldIcon, label: "Conforme RGPD" },
  { icon: UsersIcon, label: "Mandat révocable à tout moment" },
];

export default async function LandingPage() {
  const templates = await getFormalityTemplates();
  const featuredTemplates = templates.slice(0, 6);

  return (
    <main className="bg-white">
      <MarketingHeader />

      {/* Hero */}
      <section className="hero-glow border-b border-ink/10">
        <div className="mx-auto grid max-w-marketing items-center gap-12 px-6 py-16 sm:py-24 lg:grid-cols-2">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white px-3 py-1.5 text-sm font-semibold text-ink-soft">
              <span aria-hidden="true" className="h-2 w-2 rounded-full bg-accent" />
              Conciergerie administrative · 100 % en ligne
            </span>
            <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.05] text-ink sm:text-6xl">
              On s&apos;occupe de <span className="underline-accent">tes démarches</span>.
              <br />
              Toi, tu vis.
            </h1>
            <p className="mt-6 max-w-lg text-lg text-ink-soft">
              CAF, impôts, URSSAF, titre de séjour. On avance à ta place — pour de vrai,
              pas juste des rappels.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button href="/onboarding">Je respire, on s&apos;occupe de tout</Button>
              <Link
                href="/demarches"
                className="text-sm font-bold text-ink-soft underline underline-offset-4 hover:text-ink"
              >
                Voir ce qu&apos;on prend en charge
              </Link>
            </div>
            <p className="mt-6 text-sm text-ink-soft">
              Sans abonnement pour démarrer · Checklist gratuite
            </p>
          </div>

          <EspaceCard />
        </div>
      </section>

      {/* Le poids qu'on enlève */}
      <section className="mx-auto max-w-marketing px-6 py-16 sm:py-20">
        <h2 className="max-w-xl font-display text-2xl font-extrabold text-ink sm:text-3xl">
          Une enveloppe qu&apos;on n&apos;ose pas ouvrir.
        </h2>
        <p className="mt-4 max-w-xl text-lg text-ink-soft">
          Une date limite oubliée. Un jargon qui décourage. Ce n&apos;est pas de la
          flemme — c&apos;est lourd à porter seul·e.
        </p>
        <p className="mt-4 max-w-xl font-display text-xl font-extrabold text-primary">
          On s&apos;en occupe. Une démarche de moins à porter.
        </p>
      </section>

      {/* Stats */}
      <section className="bg-primary py-14 text-white">
        <div className="mx-auto grid max-w-marketing gap-8 px-6 sm:grid-cols-3">
          <div className="text-center">
            <p className="font-display text-4xl font-extrabold">{templates.length}</p>
            <p className="mt-2 text-sm text-white/75">démarches couvertes au lancement</p>
          </div>
          <div className="text-center">
            <p className="font-display text-4xl font-extrabold">&lt; 5 min</p>
            <p className="mt-2 text-sm text-white/75">de ton temps, en moyenne, par démarche</p>
          </div>
          <div className="text-center">
            <p className="font-display text-4xl font-extrabold">100%</p>
            <p className="mt-2 text-sm text-white/75">de tes documents hébergés en France</p>
          </div>
        </div>
      </section>

      {/* Ce qu'on prend en charge */}
      <section id="demarches" className="border-b border-ink/10 py-16 sm:py-20">
        <div className="mx-auto max-w-marketing px-6">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <h2 className="font-display text-2xl font-extrabold text-ink sm:text-3xl">
              Ce qu&apos;on prend en charge
            </h2>
            <Link
              href="/demarches"
              className="shrink-0 text-sm font-bold text-primary hover:underline"
            >
              Voir les {templates.length} démarches →
            </Link>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featuredTemplates.map((template) => (
              <Link
                key={template.slug}
                href="/demarches"
                className="card-interactive flex items-center gap-3 p-4"
              >
                <span aria-hidden="true" className="text-2xl">
                  {categoryEmoji(template.category)}
                </span>
                <span>
                  <span className="block font-semibold text-ink">{template.name}</span>
                  <span className="block text-xs text-ink-soft">{template.organisme}</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Comment ça marche */}
      <section id="comment-ca-marche" className="py-16 sm:py-20">
        <div className="mx-auto max-w-marketing px-6">
          <h2 className="font-display text-2xl font-extrabold text-ink sm:text-3xl">
            Comment ça se passe
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {STEPS.map((step) => (
              <div key={step.title} className="card-surface h-full p-6">
                <span
                  aria-hidden="true"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-lg"
                >
                  {step.emoji}
                </span>
                <h3 className="mt-4 font-display text-lg font-extrabold text-ink">{step.title}</h3>
                <p className="mt-2 text-ink-soft">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Scénarios (personas) */}
      <section className="border-y border-ink/10 bg-surface py-16 sm:py-20">
        <div className="mx-auto max-w-marketing px-6">
          <h2 className="font-display text-2xl font-extrabold text-ink sm:text-3xl">
            Des situations comme celle-ci
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {SCENARIOS.map((scenario) => (
              <figure key={scenario.name} className="card-surface flex h-full flex-col p-6">
                <blockquote className="flex-1 text-ink">&laquo; {scenario.quote} &raquo;</blockquote>
                <figcaption className="mt-5 flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-light font-display text-sm font-extrabold text-primary">
                    {scenario.initials}
                  </span>
                  <span>
                    <span className="block text-sm font-bold text-ink">{scenario.name}</span>
                    <span className="block text-xs text-ink-soft">{scenario.context}</span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
          <p className="mt-6 text-xs text-ink-soft">
            Scénarios illustratifs — IZY/D n&apos;a pas encore d&apos;utilisateurs.
          </p>
        </div>
      </section>

      {/* Tarifs */}
      <section id="tarifs" className="py-16 sm:py-20">
        <div className="mx-auto max-w-marketing px-6">
          <h2 className="text-center font-display text-2xl font-extrabold text-ink sm:text-3xl">
            Trois formules. Zéro friction.
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-ink-soft">
            Chacune inclut tout ce qu&apos;offre la précédente. Aucune envie de
            t&apos;abonner ? Paie juste ce que tu lances.
          </p>

          <div className="mt-10">
            <PricingPlans compact />
          </div>
        </div>
      </section>

      {/* Confiance */}
      <section className="border-t border-ink/10 bg-surface py-10">
        <div className="mx-auto flex max-w-marketing flex-wrap items-center justify-center gap-x-8 gap-y-3 px-6">
          {TRUST_POINTS.map((point) => (
            <span key={point.label} className="flex items-center gap-2 text-sm font-semibold text-ink-soft">
              <point.icon className="h-4 w-4 text-primary" />
              {point.label}
            </span>
          ))}
        </div>
      </section>

      <CtaBanner
        title="Une question, un doute ? Parlons-en."
        text="On respire un coup, et on regarde ta situation ensemble."
      />

      <MarketingFooter />
    </main>
  );
}
