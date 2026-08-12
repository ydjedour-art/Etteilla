import Link from "next/link";
import { ClockIcon, TagIcon, ArrowRightIcon } from "@/components/Icons";
import { FEATURES } from "@/lib/features";
import type { OfferItem } from "@/lib/offers";

/** Carte formation/module utilisée sur les pages de blocs et la page /offres. */
export function OfferCard({ item, id }: { item: OfferItem; id?: string }) {
  const ctaHref = item.href ?? "/contact";
  const ctaLabel = item.href ? "En savoir plus" : "Nous contacter";

  return (
    <div
      id={id ?? item.slug}
      className="flex h-full scroll-mt-24 flex-col rounded-2xl border border-ink/10 bg-white p-6"
    >
      <h3 className="font-semibold text-ink">{item.title}</h3>
      <p className="mt-2 flex-1 text-sm text-ink-soft">{item.description}</p>

      <div className="mt-5 space-y-2 text-sm text-ink-soft">
        <p className="flex items-center gap-2">
          <ClockIcon className="h-4 w-4 shrink-0 text-primary" />
          {item.duration}
        </p>
        <p className="flex items-center gap-2">
          <TagIcon className="h-4 w-4 shrink-0 text-primary" />
          {item.price}
        </p>
        {FEATURES.cpf && item.cpfEligible && (
          <p className="inline-flex items-center gap-1.5 rounded-full bg-primary-light px-2.5 py-1 text-xs font-medium text-primary">
            Éligible CPF
          </p>
        )}
      </div>

      <Link
        href={ctaHref}
        className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary-dark"
      >
        {ctaLabel}
        <ArrowRightIcon className="h-4 w-4" />
      </Link>
    </div>
  );
}
