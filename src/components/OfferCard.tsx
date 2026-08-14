"use client";

import { useState } from "react";
import Link from "next/link";
import { ClockIcon, TagIcon, ArrowRightIcon, ChevronDownIcon } from "@/components/Icons";
import { FEATURES } from "@/lib/features";
import type { OfferItem } from "@/lib/offers";

/** Longueur à partir de laquelle la description risque de dépasser 3 lignes
 * et justifie un bouton "Lire plus" plutôt qu'un texte tronqué silencieux. */
const EXPAND_THRESHOLD = 130;

/** Carte formation/module utilisée sur les pages de blocs et la page /offres.
 *
 * Règle prix/CTA : un tarif "sur devis" ne doit jamais s'afficher comme un
 * prix (aucune ligne prix dans ce cas, uniquement le bouton devis) ; un tarif
 * fixe s'affiche clairement. Le titre et la description sont tronqués à
 * hauteur fixe (line-clamp + min-height) pour que toutes les cartes d'une
 * même grille démarrent à la même hauteur, avec un "Lire plus / Voir moins"
 * pour accéder au texte complet sans casser l'alignement des cartes
 * voisines (la grille parente utilise `items-start`). */
export function OfferCard({ item, id }: { item: OfferItem; id?: string }) {
  const [expanded, setExpanded] = useState(false);
  const isQuote = item.price.trim().toLowerCase() === "sur devis";
  const canExpand = item.description.length > EXPAND_THRESHOLD;

  return (
    <div
      id={id ?? item.slug}
      className="flex h-full scroll-mt-24 flex-col rounded-2xl border border-ink/10 bg-white p-6 transition-shadow duration-150 hover:shadow-md"
    >
      <h3 className="line-clamp-2 min-h-[3rem] font-semibold text-ink">{item.title}</h3>

      <p
        className={
          expanded
            ? "mt-2 text-sm text-ink-soft"
            : "mt-2 line-clamp-3 min-h-16 text-sm text-ink-soft"
        }
      >
        {item.description}
      </p>
      {canExpand && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          className="mt-1.5 inline-flex w-fit items-center gap-1 text-xs font-semibold text-primary hover:text-primary-dark"
        >
          {expanded ? "Voir moins" : "Lire plus"}
          <ChevronDownIcon
            className={`h-3.5 w-3.5 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
          />
        </button>
      )}

      <div className="mt-4 min-h-[4.5rem] flex-1 space-y-2 text-sm text-ink-soft">
        <p className="flex items-center gap-2">
          <ClockIcon className="h-4 w-4 shrink-0 text-primary" />
          {item.duration}
        </p>
        {!isQuote && (
          <p className="flex items-center gap-2">
            <TagIcon className="h-4 w-4 shrink-0 text-primary" />
            {item.price}
          </p>
        )}
        {FEATURES.cpf && item.cpfEligible && (
          <p className="inline-flex items-center gap-1.5 rounded-full bg-primary-light px-2.5 py-1 text-xs font-medium text-primary">
            Éligible CPF
          </p>
        )}
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2">
        <Link
          href="/contact"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary-dark"
        >
          Demander un devis
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
        {item.href && (
          <Link href={item.href} className="text-sm font-medium text-ink-soft hover:text-ink">
            En savoir plus
          </Link>
        )}
      </div>
    </div>
  );
}
