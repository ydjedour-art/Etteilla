import { Button } from "@/components/Button";
import { BlockCard } from "@/components/BlockCard";
import {
  CheckIcon,
  MapPinIcon,
  RouteIcon,
  TargetIcon,
  UsersIcon,
} from "@/components/Icons";
import { OFFER_BLOCKS } from "@/lib/offers";
import { BLOG_POSTS } from "@/lib/blog";
import Link from "next/link";

const JOURNEY_STEPS = ["Se connaître", "Se former", "Créer", "Gérer"];

const WHY_US = [
  {
    icon: TargetIcon,
    title: "Une approche individualisée",
    description:
      "Chaque parcours part de votre situation réelle — pas d'un programme standard appliqué tel quel. Le contenu et le rythme s'adaptent à votre objectif.",
  },
  {
    icon: RouteIcon,
    title: "Un accompagnement de bout en bout",
    description:
      "De la clarification du projet à la gestion quotidienne de l'entreprise, les blocs se combinent pour couvrir l'ensemble du parcours, sans rupture entre les étapes.",
  },
  {
    icon: UsersIcon,
    title: "Une méthode structurée",
    description:
      "Chaque formation suit une progression claire, avec des livrables concrets à chaque étape — pas une simple succession de conseils généraux.",
  },
  {
    icon: MapPinIcon,
    title: "Basés à Marseille, accessibles partout",
    description:
      "Sessions en présentiel à Marseille ou à distance selon vos contraintes, avec la même exigence de suivi individualisé.",
  },
];

export default function HomePage() {
  return (
    <main>
      {/* Hero */}
      <section className="hero-glow border-b border-ink/10">
        <div className="mx-auto grid max-w-marketing items-center gap-12 px-6 py-16 sm:py-24 lg:grid-cols-2">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary-light px-3 py-1.5 text-sm font-medium text-primary">
              <RouteIcon className="h-4 w-4" />
              Formation & accompagnement professionnel — Marseille
            </span>
            <h1 className="mt-6 font-serif text-4xl font-semibold leading-tight text-ink sm:text-5xl">
              De la connaissance de soi
              <br />
              <span className="text-primary">à la gestion de votre entreprise.</span>
            </h1>
            <p className="mt-6 max-w-lg text-lg text-ink-soft">
              YD Formation accompagne chaque étape de votre parcours professionnel :
              se connaître, se former, créer son entreprise et la faire durer — avec
              une méthode structurée, du diagnostic jusqu&apos;à la mise en œuvre.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button href="/offres">Découvrir nos parcours</Button>
              <Button href="/contact" variant="ghost">
                Demander un diagnostic
              </Button>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-sm">
            <div className="official-photo-placeholder aspect-[4/5] w-full rounded-2xl shadow-xl" />
            <div className="absolute -bottom-6 -left-6 w-64 rounded-2xl border border-ink/10 bg-white p-4 shadow-lg">
              <p className="text-xs font-medium text-ink-soft">Parcours individualisé</p>
              <p className="mt-1 flex items-center gap-2 text-sm font-semibold text-success">
                <CheckIcon className="h-4 w-4" />
                Construit avec vous, étape par étape
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Le parcours en un coup d'œil */}
      <section className="border-b border-ink/10 bg-white py-10">
        <div className="mx-auto max-w-marketing px-6">
          <p className="text-center text-xs font-semibold uppercase tracking-wide text-ink-soft">
            Un accompagnement pensé comme un parcours complet
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            {JOURNEY_STEPS.map((step, index) => (
              <div key={step} className="flex items-center gap-3 sm:gap-4">
                <span className="rounded-full border border-primary/20 bg-primary-light px-4 py-2 text-sm font-semibold text-primary">
                  {step}
                </span>
                {index < JOURNEY_STEPS.length - 1 && (
                  <span className="text-ink-soft/50" aria-hidden>
                    →
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nos accompagnements */}
      <section id="nos-accompagnements" className="mx-auto max-w-marketing px-6 py-20">
        <h2 className="text-center font-serif text-3xl font-semibold text-ink">
          Nos accompagnements
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-sm text-ink-soft">
          Cinq grands domaines, à combiner selon votre point de départ et votre
          objectif. Chaque bloc se découvre en détail sur sa propre page.
        </p>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {OFFER_BLOCKS.map((block) => (
            <BlockCard key={block.slug} block={block} />
          ))}
        </div>
      </section>

      {/* Pourquoi nous */}
      <section className="border-y border-ink/10 bg-white py-20">
        <div className="mx-auto max-w-marketing px-6">
          <h2 className="text-center font-serif text-3xl font-semibold text-ink">
            Pourquoi YD Formation
          </h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {WHY_US.map((item) => (
              <div key={item.title} className="rounded-2xl border border-ink/10 p-6">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-light text-primary">
                  <item.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-semibold text-ink">{item.title}</h3>
                <p className="mt-2 text-sm text-ink-soft">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog teaser */}
      <section className="mx-auto max-w-marketing px-6 py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-serif text-3xl font-semibold text-ink">Derniers articles</h2>
          <Link href="/blog" className="text-sm font-semibold text-primary hover:text-primary-dark">
            Tous les articles →
          </Link>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {BLOG_POSTS.slice(0, 3).map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="flex h-full flex-col rounded-2xl border border-ink/10 bg-white p-6 transition-all duration-150 hover:-translate-y-0.5 hover:shadow-md"
            >
              <span className="text-xs font-semibold uppercase tracking-wide text-primary">
                {post.category}
              </span>
              <h3 className="mt-3 font-semibold text-ink">{post.title}</h3>
              <p className="mt-2 flex-1 text-sm text-ink-soft">{post.excerpt}</p>
              <span className="mt-4 text-xs text-ink-soft/70">{post.readingTime} de lecture</span>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA final */}
      <section className="mx-auto max-w-marketing px-6 pb-24">
        <div className="rounded-2xl bg-primary px-8 py-14 text-center text-white">
          <h2 className="font-serif text-2xl font-semibold sm:text-3xl">
            Un projet à clarifier, une entreprise à créer ou à faire grandir ?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-white/80">
            Parlons de votre situation pour construire le parcours le plus adapté —
            sans engagement.
          </p>
          <div className="mt-6 flex justify-center">
            <Button href="/contact" className="!bg-white !text-primary hover:!bg-white/90">
              Demander un diagnostic
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
