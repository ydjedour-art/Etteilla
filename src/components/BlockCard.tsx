import Link from "next/link";
import { ArrowRightIcon } from "@/components/Icons";
import type { OfferBlock } from "@/lib/offers";

/** Carte cliquable présentant un grand bloc d'offres (page d'accueil, /offres). */
export function BlockCard({ block }: { block: OfferBlock }) {
  const Icon = block.icon;

  return (
    <Link
      href={`/${block.slug}`}
      className="group flex h-full flex-col rounded-2xl border border-ink/10 bg-white p-6 transition-all duration-150 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md"
    >
      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-light text-primary">
        <Icon className="h-5 w-5" />
      </span>
      <span className="mt-4 text-xs font-semibold uppercase tracking-wide text-ink-soft/70">
        {String(block.order).padStart(2, "0")}
      </span>
      <h3 className="mt-1 font-serif text-lg font-semibold text-ink">{block.title}</h3>
      <p className="mt-2 flex-1 text-sm text-ink-soft">{block.tagline}</p>
      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
        Découvrir
        <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </span>
    </Link>
  );
}
