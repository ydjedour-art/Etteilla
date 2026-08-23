import Link from "next/link";
import { Button } from "@/components/Button";
import { LockIcon, MapPinIcon, ShieldIcon, UsersIcon } from "@/components/icons";
import { CtaBanner } from "@/components/marketing/CtaBanner";
import { DemarchesTicker } from "@/components/marketing/DemarchesTicker";
import { EspaceCard } from "@/components/marketing/EspaceCard";
import { MarketingFooter } from "@/components/marketing/MarketingFooter";
import { MarketingHeader } from "@/components/marketing/MarketingHeader";
import { Parallax } from "@/components/Parallax";
import { PricingPlans } from "@/components/marketing/PricingPlans";
import { Reveal } from "@/components/ScrollReveal";
import { TriageChat } from "@/components/marketing/TriageChat";
import { categoryEmoji } from "@/lib/category-emoji";
import { getFormalityTemplates } from "@/lib/data";

// Le visuel du hero est la carte "Ton espace" (src/components/marketing/EspaceCard.tsx),
// un aperçu vivant du tableau de bord plutôt qu'une photo. La classe
// .official-photo-placeholder (globals.css) reste dispo si une vraie photo
// est ajoutée ailleurs plus tard — voir le README pour le détail.

const HERO_STATS = [
  { n: "10", label: "démarches couvertes" },
  { n: "<5MIN", label: "de ton temps en moy." },
  { n: "100%", label: "hébergé en France" },
];

const VALUE_PROPS = [
  "SANS ABONNEMENT",
  "SANS ENGAGEMENT",
  "SANS JARGON",
  "SANS ATTENTE",
  "SANS PRISE DE TÊTE",
  "SANS FORMULAIRE",
  "SANS QUEUE",
];

const STEPS = [
  {
    n: "01",
    title: "Tu racontes ta situation",
    sub: "2 min, sans jargon",
    text: "Tu décris ce qui se passe. On comprend tout seul ce qu'il faut faire.",
  },
  {
    n: "02",
    title: "On s'occupe de tout",
    sub: "Formulaires, envois, suivi",
    text: "On remplit, on envoie, on relance. Tu reçois des updates simples.",
  },
  {
    n: "03",
    title: "Tu respires",
    sub: "Résultat garanti",
    text: "Une démarche de moins. On te tient au courant, simplement.",
  },
];

// Scénarios illustratifs basés sur les personas produit (docs/02-personas-et-parcours.md)
// — pas des témoignages clients réels, IZY/D n'a pas encore d'utilisateurs.
const SCENARIOS = [
  {
    initials: "L",
    name: "Léa M.",
    context: "Expatriée revenue en France",
    quote: "Mon titre de séjour, préparé des mois à l'avance. Sans que j'aie à y penser.",
  },
  {
    initials: "K",
    name: "Karim B.",
    context: "Micro-entrepreneur",
    quote: "Mes déclarations URSSAF, calculées et prêtes à valider chaque trimestre.",
  },
  {
    initials: "N",
    name: "Nadia T.",
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
    <main>
      <MarketingHeader />

      {/* Hero */}
      <section className="scanlines relative overflow-hidden border-b border-ink/10">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: "radial-gradient(circle, var(--text) 1px, transparent 1px)", backgroundSize: "40px 40px" }}
        />
        <div className="relative mx-auto grid max-w-marketing items-center gap-12 px-6 py-16 sm:py-24 lg:grid-cols-2">
          <Reveal>
            <div className="mb-6 inline-flex items-center gap-2">
              <span aria-hidden="true" className="pulse-dot h-1.5 w-1.5 rounded-full bg-cyan" />
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-cyan">
                Conciergerie administrative · 100&nbsp;% en ligne
              </span>
            </div>
            <h1 className="hero-title text-ink">
              <span className="block">On s&apos;occupe</span>
              <span className="glitch-text block text-primary">de tes</span>
              <span className="block">démarches.</span>
              <span className="outline-text block">Toi, tu vis.</span>
            </h1>
            <p className="mt-8 max-w-sm text-base leading-relaxed text-ink-soft">
              CAF, impôts, URSSAF, titre de séjour — on s&apos;en occupe vraiment. Pas juste des
              rappels. Du vrai boulot.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href="/onboarding">Je respire, on s&apos;occupe de tout</Button>
              <Link
                href="/demarches"
                className="inline-flex items-center border-2 border-ink/25 px-7 py-3.5 font-display text-sm font-black uppercase tracking-[0.1em] text-ink transition-colors hover:border-ink hover:bg-ink hover:text-bg"
              >
                Voir ce qu&apos;on prend en charge →
              </Link>
            </div>
            <p className="mt-4 font-mono text-xs tracking-wide text-ink-soft/70">
              Sans abonnement pour démarrer · Checklist gratuite
            </p>
            <Link
              href="/app/decodeur"
              className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
            >
              📨 Décrypte ta lettre en 10 secondes
            </Link>

            <div className="mt-12 flex gap-8 border-t border-ink/10 pt-8">
              {HERO_STATS.map((s) => (
                <div key={s.n}>
                  <div className="font-display text-lg font-black text-yellow">{s.n}</div>
                  <div className="mt-0.5 text-[10px] text-ink-soft">{s.label}</div>
                </div>
              ))}
            </div>
          </Reveal>

          <div className="relative flex min-h-[420px] items-center justify-center lg:justify-end">
            <Parallax speed={0.06}>
              <Reveal delay={150}>
                <EspaceCard />
              </Reveal>
            </Parallax>

            <div className="animate-badge-pop absolute left-2 top-4 z-20 lg:left-0" style={{ transform: "rotate(-8deg)" }}>
              <div className="whitespace-nowrap bg-yellow px-3 py-2 text-xs font-black text-vivid-foreground shadow-lg">
                📨 Décrypte ta lettre en 10s
              </div>
            </div>
            <div className="animate-badge-pop absolute bottom-8 right-0 z-20 lg:-right-4" style={{ transform: "rotate(5deg)", animationDelay: "0.6s" }}>
              <div className="whitespace-nowrap bg-cyan px-3 py-2 text-xs font-black text-vivid-foreground shadow-lg">
                ✅ Dossier validé · il y a 2h
              </div>
            </div>
          </div>
        </div>
      </section>

      <DemarchesTicker items={templates.map((t) => t.name)} />

      {/* Empathie — déclaration plein écran, comme une respiration au milieu
          de la page. */}
      <section className="relative flex min-h-[70vh] flex-col items-center justify-center overflow-hidden bg-primary px-6 py-24 text-center text-accent-foreground md:px-12">
        <div aria-hidden="true" className="absolute -right-20 -top-20 h-64 w-64 rotate-12 border border-accent-foreground/10" />
        <div aria-hidden="true" className="absolute -bottom-20 -left-20 h-96 w-96 -rotate-6 border border-accent-foreground/08" />

        <Reveal className="relative max-w-4xl">
          <p className="font-mono text-xs uppercase tracking-[0.4em] text-accent-foreground/60">{"// La réalité"}</p>
          <h2 className="section-title mt-8 text-accent-foreground">
            T&apos;as déjà passé
            <br />
            <span className="outline-text" style={{ WebkitTextStroke: "2px var(--on-accent)" }}>
              3 heures
            </span>
            <br />
            sur un formulaire
            <br />
            qui change rien&nbsp;?
          </h2>
          <p className="mx-auto mt-10 max-w-xl text-lg leading-relaxed text-accent-foreground/80">
            On a tous vécu ça. IZY/D existe pour que ça n&apos;arrive plus jamais. Pas de jargon.
            Pas d&apos;attente. Juste des résultats.
          </p>
          <div className="mt-10">
            <Button href="/onboarding" variant="inverted">
              On s&apos;en occupe →
            </Button>
          </div>
        </Reveal>

        <div className="absolute inset-x-0 bottom-0 overflow-hidden border-t border-accent-foreground/15 py-2.5">
          <div className="marquee-track-rev">
            {[...VALUE_PROPS, ...VALUE_PROPS].map((item, i) => (
              <span key={i} className="shrink-0 font-display text-[10px] font-black uppercase tracking-[0.25em] text-accent-foreground/50">
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Triage IA */}
      <section className="border-y border-ink/10 bg-surface py-16 sm:py-20">
        <div className="mx-auto max-w-marketing px-6">
          <Reveal>
            <p className="eyebrow">Triage IZY/D</p>
            <h2 className="section-title mt-3 max-w-2xl text-ink">
              On te dit tout de suite
              <br />
              <span className="text-primary">si c&apos;est pour nous.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-ink-soft">
              Décris ta situation, réponds à quelques questions, on identifie la bonne démarche
              parmi des milliers de fiches officielles.
            </p>
          </Reveal>
          <Reveal delay={150} className="mt-10">
            <TriageChat />
          </Reveal>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-primary py-14 text-accent-foreground">
        <div className="mx-auto grid max-w-marketing gap-4 px-6 sm:grid-cols-3">
          <Reveal className="border border-accent-foreground/15 p-5 text-center">
            <p className="font-display text-4xl font-black text-yellow">{templates.length}</p>
            <p className="mt-2 text-sm text-accent-foreground/75">démarches couvertes au lancement</p>
          </Reveal>
          <Reveal delay={100} className="border border-accent-foreground/15 p-5 text-center">
            <p className="font-display text-4xl font-black text-yellow">&lt; 5 min</p>
            <p className="mt-2 text-sm text-accent-foreground/75">de ton temps, en moyenne, par démarche</p>
          </Reveal>
          <Reveal delay={200} className="border border-accent-foreground/15 p-5 text-center">
            <p className="font-display text-4xl font-black text-yellow">100%</p>
            <p className="mt-2 text-sm text-accent-foreground/75">de tes documents hébergés en France</p>
          </Reveal>
        </div>
      </section>

      {/* Ce qu'on prend en charge */}
      <section id="demarches" className="border-b border-ink/10 py-16 sm:py-20">
        <div className="mx-auto max-w-marketing px-6">
          <Reveal className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="eyebrow">Ce qu&apos;on prend en charge</p>
              <h2 className="section-title mt-3 text-ink">
                {templates.length} démarches.
                <br />
                <span className="outline-text">Zéro galère.</span>
              </h2>
            </div>
            <Link
              href="/demarches"
              className="shrink-0 font-mono text-sm text-ink-soft transition-colors hover:text-ink"
            >
              Voir les {templates.length} démarches →
            </Link>
          </Reveal>

          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {featuredTemplates.map((template, i) => (
              <Reveal key={template.slug} delay={(i % 3) * 80}>
                <Link href="/demarches" className="card-interactive flex h-full flex-col gap-4 p-5">
                  <div className="flex items-start justify-between">
                    <span aria-hidden="true" className="text-2xl">
                      {categoryEmoji(template.category)}
                    </span>
                    <span className="border border-ink/10 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-ink-soft">
                      {template.category}
                    </span>
                  </div>
                  <div>
                    <span className="block font-display text-base font-black leading-tight text-ink">{template.name}</span>
                    <span className="mt-1 block font-mono text-xs text-ink-soft">{template.organisme}</span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Comment ça marche — colonne de titre "collée" pendant que les 3 étapes
          défilent à côté (position: sticky pur CSS). */}
      <section id="comment-ca-marche" className="bg-surface-2 py-16 sm:py-20">
        <div className="mx-auto max-w-marketing px-6">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,340px)_1fr] lg:gap-16">
            <div className="lg:sticky lg:top-32 lg:self-start">
              <Reveal>
                <p className="eyebrow">Comment ça marche</p>
                <h2 className="section-title mt-3 text-ink">
                  3 étapes.
                  <br />
                  <span className="text-primary">C&apos;est tout.</span>
                </h2>
              </Reveal>
            </div>

            <div className="flex flex-col gap-6 sm:gap-8">
              {STEPS.map((step, i) => (
                <Reveal key={step.title} delay={i * 100}>
                  <div className="relative overflow-hidden border border-ink/08 p-6 sm:p-8">
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute -left-1 -top-4 select-none font-display text-8xl font-black leading-none text-ink/[0.04]"
                    >
                      {step.n}
                    </span>
                    <div
                      className={`relative flex h-8 w-8 items-center justify-center border-2 font-display text-xs font-black ${
                        i === 1 ? "step-active border-cyan text-cyan" : "border-ink/25 text-ink-soft"
                      }`}
                    >
                      {step.n}
                    </div>
                    <h3 className="relative mt-5 font-display text-xl font-black leading-tight text-ink">{step.title}</h3>
                    <p className="relative mt-1 font-mono text-[10px] uppercase tracking-widest text-cyan/70">{step.sub}</p>
                    <p className="relative mt-3 text-sm text-ink-soft">{step.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Scénarios (personas) */}
      <section className="border-y border-ink/10 py-16 sm:py-20">
        <div className="mx-auto max-w-marketing px-6">
          <Reveal>
            <p className="eyebrow">Ils respirent enfin</p>
            <h2 className="section-title mt-3 text-ink">
              Des vies
              <br />
              <span className="outline-text">soulagées.</span>
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {SCENARIOS.map((scenario, i) => (
              <Reveal key={scenario.name} delay={i * 100}>
                <figure className="card-surface flex h-full flex-col p-6">
                  <blockquote className="flex-1 text-ink">&laquo; {scenario.quote} &raquo;</blockquote>
                  <figcaption className="mt-5 border-t border-ink/10 pt-4">
                    <span className="block font-display text-sm font-black text-ink">{scenario.name}</span>
                    <span className="mt-0.5 block font-mono text-xs text-ink-soft">{scenario.context}</span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
          <p className="mt-6 font-mono text-[10px] text-ink-soft/60">
            * Scénarios illustratifs — IZY/D n&apos;a pas encore d&apos;utilisateurs.
          </p>
        </div>
      </section>

      {/* Tarifs */}
      <section id="tarifs" className="py-16 sm:py-20">
        <div className="mx-auto max-w-marketing px-6">
          <Reveal>
            <p className="eyebrow">Combien ça coûte</p>
            <h2 className="section-title mt-3 text-center text-ink">
              Pas de surprise.
              <br />
              <span className="outline-text">Juste du prix.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-center text-ink-soft">
              Chacune inclut tout ce qu&apos;offre la précédente. Aucune envie de t&apos;abonner ?
              Paie juste ce que tu lances.
            </p>
          </Reveal>

          <Reveal delay={150} className="mt-10">
            <PricingPlans compact />
          </Reveal>
        </div>
      </section>

      {/* Confiance */}
      <section className="border-t border-ink/10 bg-surface py-10">
        <Reveal className="mx-auto flex max-w-marketing flex-wrap items-center justify-center gap-x-8 gap-y-3 px-6">
          {TRUST_POINTS.map((point) => (
            <span key={point.label} className="flex items-center gap-2 font-mono text-xs uppercase tracking-wide text-ink-soft">
              <point.icon className="h-4 w-4 text-primary" />
              {point.label}
            </span>
          ))}
        </Reveal>
      </section>

      <Reveal>
        <CtaBanner
          title="Une question, un doute ? Parlons-en."
          text="On respire un coup, et on regarde ta situation ensemble."
        />
      </Reveal>

      <MarketingFooter />
    </main>
  );
}
