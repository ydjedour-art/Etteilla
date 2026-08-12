import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { OfferCard } from "@/components/OfferCard";
import { Button } from "@/components/Button";
import { ArrowRightIcon } from "@/components/Icons";
import { OFFER_BLOCKS } from "@/lib/offers";

export const metadata: Metadata = {
  title: "Toutes nos offres",
  description:
    "Cinq domaines d'accompagnement, de la connaissance de soi à la gestion d'entreprise : bilan de compétences, formation, création d'entreprise, gestion et parcours sur-mesure.",
};

export default function OffresPage() {
  return (
    <main>
      <PageHero
        eyebrow="Nos offres"
        title="De la connaissance de soi à la gestion de votre entreprise"
        subtitle="Cinq grands domaines d'accompagnement, pensés pour se combiner selon votre point de départ et votre objectif. Parcourez-les un par un ou construisons ensemble votre parcours."
      >
        <div className="mt-8 flex flex-wrap gap-4">
          <Button href="/contact">Demander un diagnostic</Button>
        </div>
      </PageHero>

      {/* Sommaire rapide */}
      <section className="border-b border-ink/10 bg-white py-8">
        <div className="mx-auto max-w-marketing px-6">
          <div className="flex flex-wrap gap-3">
            {OFFER_BLOCKS.map((block) => (
              <a
                key={block.slug}
                href={`#${block.slug}`}
                className="rounded-full border border-ink/10 px-4 py-2 text-sm font-medium text-ink-soft hover:border-primary/30 hover:text-primary"
              >
                {block.navLabel}
              </a>
            ))}
          </div>
        </div>
      </section>

      {OFFER_BLOCKS.map((block, index) => {
        const Icon = block.icon;
        return (
          <section
            key={block.slug}
            id={block.slug}
            className={`scroll-mt-20 border-b border-ink/10 px-6 py-16 ${
              index % 2 === 1 ? "bg-white" : ""
            }`}
          >
            <div className="mx-auto max-w-marketing">
              <div className="flex flex-wrap items-start justify-between gap-6">
                <div className="max-w-2xl">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-light text-primary">
                    <Icon className="h-5 w-5" />
                  </span>
                  <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-ink-soft/70">
                    Bloc {String(block.order).padStart(2, "0")} / 05
                  </p>
                  <h2 className="mt-1 font-serif text-2xl font-semibold text-ink sm:text-3xl">
                    {block.title}
                  </h2>
                  <p className="mt-3 text-ink-soft">{block.description}</p>
                </div>
                <Link
                  href={`/${block.slug}`}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary-dark"
                >
                  Voir la page du bloc
                  <ArrowRightIcon className="h-4 w-4" />
                </Link>
              </div>

              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {block.items.map((item) => (
                  <OfferCard key={item.slug} item={item} id={`${block.slug}-${item.slug}`} />
                ))}
              </div>
            </div>
          </section>
        );
      })}

      <section className="mx-auto max-w-marketing px-6 py-20">
        <div className="rounded-2xl bg-primary px-8 py-14 text-center text-white">
          <h2 className="font-serif text-2xl font-semibold sm:text-3xl">
            Pas sûr·e du bloc qui vous correspond ?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-white/80">
            Un court échange suffit pour identifier le point de départ le plus
            pertinent selon votre situation.
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
