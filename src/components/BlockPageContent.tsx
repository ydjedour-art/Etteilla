import Link from "next/link";
import { Button } from "@/components/Button";
import { PageHero } from "@/components/PageHero";
import { OfferCard } from "@/components/OfferCard";
import { ArrowRightIcon } from "@/components/Icons";
import { OFFER_BLOCKS, type OfferBlock } from "@/lib/offers";

export function BlockPageContent({ block }: { block: OfferBlock }) {
  const otherBlocks = OFFER_BLOCKS.filter((b) => b.slug !== block.slug);

  return (
    <main>
      <PageHero
        eyebrow={`Bloc ${String(block.order).padStart(2, "0")} / 05`}
        title={block.title}
        subtitle={block.description}
      >
        <div className="mt-8 flex flex-wrap gap-4">
          <Button href="/contact">Demander un diagnostic</Button>
          <Button href="/offres" variant="ghost">
            Voir toutes les offres
          </Button>
        </div>
      </PageHero>

      <section className="mx-auto max-w-marketing px-6 py-16">
        <h2 className="font-serif text-2xl font-semibold text-ink">
          Formations et modules de ce bloc
        </h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {block.items.map((item) => (
            <OfferCard key={item.slug} item={item} />
          ))}
        </div>
      </section>

      <section className="border-y border-ink/10 bg-white py-16">
        <div className="mx-auto max-w-marketing px-6">
          <h2 className="font-serif text-2xl font-semibold text-ink">Explorer les autres blocs</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {otherBlocks.map((other) => (
              <Link
                key={other.slug}
                href={`/${other.slug}`}
                className="group flex items-center justify-between gap-3 rounded-2xl border border-ink/10 p-5 hover:border-primary/30 hover:bg-primary-light/40"
              >
                <span className="text-sm font-semibold text-ink">{other.title}</span>
                <ArrowRightIcon className="h-4 w-4 shrink-0 text-primary transition-transform group-hover:translate-x-1" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-marketing px-6 py-20">
        <div className="rounded-2xl bg-primary px-8 py-14 text-center text-white">
          <h2 className="font-serif text-2xl font-semibold sm:text-3xl">
            Une question sur ce parcours ?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-white/80">
            Nous étudions ensemble votre situation pour vous orienter vers le format
            le plus adapté — module isolé ou parcours combiné.
          </p>
          <div className="mt-6 flex justify-center">
            <Button href="/contact" className="!bg-white !text-primary hover:!bg-white/90">
              Nous contacter
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
