import Link from "next/link";
import { Button } from "@/components/Button";
import {
  ArrowRightIcon,
  BellIcon,
  ClockIcon,
  LockIcon,
  MapPinIcon,
  ShieldIcon,
  StackIcon,
  UsersIcon,
} from "@/components/icons";
import { MarketingFooter } from "@/components/marketing/MarketingFooter";
import { MarketingHeader } from "@/components/marketing/MarketingHeader";
import { PricingPlans } from "@/components/marketing/PricingPlans";
import { getFormalityTemplates } from "@/lib/data";

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

const PAIN_POINTS = [
  {
    icon: ClockIcon,
    title: "Une échéance qui vous échappe",
    description: "Un jour de retard, et c'est une pénalité ou une aide suspendue.",
  },
  {
    icon: StackIcon,
    title: "Des papiers partout, sauf là où il faut",
    description: "Chaque demande, la même chasse aux justificatifs dans vos mails et vos tiroirs.",
  },
  {
    icon: BellIcon,
    title: "Un jargon qui décourage",
    description: "Formulaires, sigles, délais... de quoi remettre à plus tard, encore.",
  },
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
      "Sérénio repère les démarches pertinentes et prépare les dossiers à votre place.",
  },
  {
    title: "Vous validez, on s'occupe du reste",
    description:
      "Un geste pour valider. On suit, on relance, on vous prévient uniquement si besoin.",
  },
];

const TRUST_POINTS = [
  {
    icon: LockIcon,
    title: "Chiffrement de bout en bout",
    description: "Vos documents sont chiffrés dès l'envoi, illisibles pour quiconque n'est pas autorisé.",
  },
  {
    icon: MapPinIcon,
    title: "Hébergement 100% France",
    description: "Aucune donnée ne quitte le territoire, sur des infrastructures certifiées.",
  },
  {
    icon: ShieldIcon,
    title: "Conforme RGPD",
    description: "Export ou suppression de vos données en un clic, à tout moment, sans condition.",
  },
  {
    icon: UsersIcon,
    title: "Vous gardez la main",
    description: "Chaque envoi passe par votre validation, et le mandat de représentation est révocable à tout moment.",
  },
];

// Scénarios illustratifs basés sur les personas produit (docs/02-personas-et-parcours.md)
// — pas des témoignages clients réels, Sérénio n'a pas encore d'utilisateurs.
const SCENARIOS = [
  {
    initials: "L",
    name: "Léa",
    context: "Expatriée, arrivée récente en France",
    quote:
      "Renouveler mon titre de séjour sans savoir par où commencer, c'était ma plus grande angoisse. Sérénio prépare le dossier des mois à l'avance.",
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
    question: "Sérénio peut-il vraiment envoyer mes dossiers à ma place ?",
    answer:
      "Deux modes selon la démarche : « On fait à votre place », avec un mandat de représentation explicite et révocable à tout moment ; ou « On vous pilote pas à pas » quand la loi impose que vous agissiez vous-même (ex. identification FranceConnect). Sérénio bascule automatiquement sur le bon mode.",
  },
  {
    question: "Faut-il un abonnement pour commencer ?",
    answer:
      "Non. L'identification de votre démarche et la checklist des pièces sont gratuites, et vous pouvez toujours payer à l'acte, sans engagement. Un abonnement (Essentiel, Sérénité ou Zen Total) devient intéressant dès que vous avez plusieurs démarches actives ou que vous voulez déléguer entièrement — voir le détail sur la page tarifs.",
  },
  {
    question: "Quelle formule choisir ?",
    answer:
      "Essentiel si vous voulez surtout ne plus rien oublier. Sérénité si vous jonglez avec plusieurs démarches et voulez de vraies économies. Zen Total si vous préférez tout déléguer, seul·e ou pour toute la famille. Vous changez de formule en un geste, à tout moment.",
  },
  {
    question: "Quelles démarches sont couvertes aujourd'hui ?",
    answer:
      "CAF, impôts, URSSAF, titre de séjour, CPAM, mutuelle, changement d'adresse et aides spécifiques. La liste s'élargit progressivement — le catalogue complet est consultable librement, sans inscription.",
  },
];

export default async function LandingPage() {
  const templates = await getFormalityTemplates();
  const featuredTemplates = templates.slice(0, 6);

  return (
    <main className="bg-surface">
      <MarketingHeader />

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
              CAF, impôts, URSSAF, titre de séjour... Sérénio est le filet de sécurité
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
            <p className="mt-6 text-xs text-ink-soft">
              Sans abonnement pour démarrer · Identification et checklist gratuites
            </p>
          </div>

          <div className="relative mx-auto w-full max-w-sm">
            <div className="official-photo-placeholder aspect-[4/5] w-full rounded-2xl shadow-xl" />
            <div className="absolute -bottom-6 -left-6 w-64 rounded-2xl border border-ink/10 bg-white p-4 shadow-lg">
              <p className="text-xs font-medium text-ink-soft">Dossier CAF</p>
              <p className="mt-1 flex items-center gap-2 text-sm font-semibold text-success">
                <ShieldIcon className="h-4 w-4" />
                Envoyé et suivi pour vous
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bandeau organismes */}
      <section className="border-b border-ink/10 bg-white py-10">
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

      {/* Le problème */}
      <section className="mx-auto max-w-marketing px-6 py-20">
        <h2 className="text-center font-serif text-3xl font-semibold text-ink">
          L&apos;administratif, ce n&apos;est pas votre métier. Pourtant, il faut bien
          s&apos;en occuper.
        </h2>
        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {PAIN_POINTS.map((pain) => (
            <div key={pain.title} className="rounded-2xl border border-ink/10 bg-white p-6">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-attention/10 text-attention">
                <pain.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-semibold text-ink">{pain.title}</h3>
              <p className="mt-2 text-sm text-ink-soft">{pain.description}</p>
            </div>
          ))}
        </div>
        <p className="mx-auto mt-10 max-w-lg text-center text-lg font-medium text-primary">
          Sérénio s&apos;occupe de tout ça à votre place — une chose de moins à porter.
        </p>
      </section>

      {/* Stats */}
      <section className="bg-primary py-14 text-white">
        <div className="mx-auto grid max-w-marketing gap-8 px-6 sm:grid-cols-3">
          <div className="text-center">
            <p className="font-serif text-4xl font-semibold">{templates.length}</p>
            <p className="mt-2 text-sm text-white/75">démarches couvertes au lancement</p>
          </div>
          <div className="text-center">
            <p className="font-serif text-4xl font-semibold">&lt; 5 min</p>
            <p className="mt-2 text-sm text-white/75">de votre temps, en moyenne, par démarche</p>
          </div>
          <div className="text-center">
            <p className="font-serif text-4xl font-semibold">100%</p>
            <p className="mt-2 text-sm text-white/75">de vos documents hébergés en France</p>
          </div>
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

      {/* Aperçu du catalogue de démarches */}
      <section id="demarches" className="border-y border-ink/10 bg-white py-20">
        <div className="mx-auto max-w-marketing px-6">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div>
              <h2 className="font-serif text-3xl font-semibold text-ink">
                Ce qu&apos;on peut déjà prendre en charge pour vous
              </h2>
              <p className="mt-2 max-w-xl text-sm text-ink-soft">
                Un aperçu du catalogue — chaque démarche est documentée à l&apos;avance,
                pièces et délais compris.
              </p>
            </div>
            <Link
              href="/demarches"
              className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
            >
              Voir toutes les démarches <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featuredTemplates.map((template) => (
              <Link
                key={template.slug}
                href="/demarches"
                className="flex h-full flex-col rounded-2xl border border-ink/10 p-5 transition-shadow hover:shadow-md"
              >
                <p className="text-xs font-medium uppercase tracking-wide text-ink-soft">
                  {template.organisme}
                </p>
                <h3 className="mt-1.5 font-semibold text-ink">{template.name}</h3>
                <p className="mt-2 flex-1 text-sm text-ink-soft">{template.description}</p>
                <p className="mt-3 text-xs font-medium text-primary">
                  ~{template.estimatedDurationMinutes} min de votre temps
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Scénarios (personas) */}
      <section className="py-20">
        <div className="mx-auto max-w-marketing px-6">
          <h2 className="text-center font-serif text-3xl font-semibold text-ink">
            Conçu pour des situations comme celle-ci
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-sm text-ink-soft">
            Sérénio est en cours de développement à partir de ces scénarios types —
            pas encore de témoignages d&apos;utilisateurs réels.
          </p>
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {SCENARIOS.map((scenario) => (
              <figure
                key={scenario.name}
                className="flex h-full flex-col rounded-2xl border border-ink/10 bg-white p-6"
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

      {/* Tarifs */}
      <section id="tarifs" className="border-y border-ink/10 bg-white py-20">
        <div className="mx-auto max-w-marketing px-6">
          <h2 className="text-center font-serif text-3xl font-semibold text-ink">
            Trois formules. Un seul objectif : vous libérer l&apos;esprit.
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-sm text-ink-soft">
            Chaque formule inclut tout ce qu&apos;offre la précédente. Et si un
            abonnement ne vous convient pas, vous pouvez toujours payer uniquement les
            démarches que vous lancez, sans engagement.
          </p>

          <div className="mt-10">
            <PricingPlans compact />
          </div>

          <p className="mt-8 text-center">
            <Link href="/tarifs" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline">
              Voir le comparatif complet et la FAQ facturation <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </p>
        </div>
      </section>

      {/* Confiance & sécurité */}
      <section className="mx-auto max-w-marketing px-6 py-20">
        <h2 className="text-center font-serif text-3xl font-semibold text-ink">
          Votre confiance, on la mérite chaque jour
        </h2>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {TRUST_POINTS.map((point) => (
            <div key={point.title} className="rounded-2xl border border-ink/10 bg-white p-6">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-light text-primary">
                <point.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-semibold text-ink">{point.title}</h3>
              <p className="mt-2 text-sm text-ink-soft">{point.description}</p>
            </div>
          ))}
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

      <MarketingFooter />
    </main>
  );
}
