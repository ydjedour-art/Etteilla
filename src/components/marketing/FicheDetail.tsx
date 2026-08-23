import Link from "next/link";
import { ArrowRightIcon } from "@/components/icons";
import { Breadcrumb, type BreadcrumbItem } from "@/components/marketing/Breadcrumb";
import { CtaBanner } from "@/components/marketing/CtaBanner";
import { MarketingFooter } from "@/components/marketing/MarketingFooter";
import { MarketingHeader } from "@/components/marketing/MarketingHeader";
import { SourceAttribution } from "@/components/marketing/SourceAttribution";
import { themeEmoji } from "@/lib/theme-emoji";
import type { GeneratedFiche } from "@/types/fiches";

const CALLOUT_LABELS: Record<string, string> = {
  "À noter": "bg-primary/10 text-primary",
  "À savoir": "bg-primary/10 text-primary",
  Exemple: "bg-surface text-ink-soft",
  Rappel: "bg-surface text-ink-soft",
  Attention: "bg-attention/10 text-attention",
};

/** Une ligne de contenu de chapitre. Le pipeline d'extraction (voir
 * data/README.md) préfixe les puces par "• " et les encarts par
 * "[Label] texte" — on retranscrit ce format en mise en forme, sans jamais
 * modifier le texte lui-même. */
function ContentLine({ line }: { line: string }) {
  const calloutMatch = line.match(/^\[([^\]]+)\]\s*(.*)$/);
  if (calloutMatch) {
    const [, label, rest] = calloutMatch;
    const style = CALLOUT_LABELS[label] ?? "bg-surface text-ink-soft";
    return (
      <div className={`rounded-xl px-4 py-3 text-sm ${style}`}>
        <span className="font-bold">{label} — </span>
        {rest}
      </div>
    );
  }
  if (line.startsWith("• ")) {
    return (
      <div className="flex gap-2 pl-1 text-sm">
        <span aria-hidden="true" className="text-ink-soft">•</span>
        <span>{line.slice(2)}</span>
      </div>
    );
  }
  return <p className="text-sm leading-relaxed">{line}</p>;
}

/** Un chapitre, replié par défaut : son titre (une question, en général) sert
 * de bouton — on n'affiche jamais toute la fiche d'un coup. Pensé pour ne
 * pas noyer une personne en phobie administrative sous un mur de texte : elle
 * ouvre seulement ce qui la concerne. */
function ChapterAccordion({ titre, contenu }: { titre: string; contenu: string[] }) {
  if (!titre) {
    return (
      <div className="space-y-2.5 text-ink">
        {contenu.map((line, i) => (
          <ContentLine key={i} line={line} />
        ))}
      </div>
    );
  }
  return (
    <details className="card-surface group p-5 open:pb-6">
      <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-display text-base font-semibold text-ink">
        {titre}
        <span aria-hidden="true" className="mt-0.5 shrink-0 text-ink-soft transition-transform group-open:rotate-45">
          +
        </span>
      </summary>
      <div className="mt-4 space-y-2.5 text-ink">
        {contenu.map((line, i) => (
          <ContentLine key={i} line={line} />
        ))}
      </div>
    </details>
  );
}

export function FicheDetail({
  fiche,
  breadcrumb,
  themeSlug,
}: {
  fiche: GeneratedFiche;
  breadcrumb: BreadcrumbItem[];
  themeSlug: string;
}) {
  const hasHelp = fiche.services_en_ligne.length > 0 || fiche.contacts.length > 0;
  const hasMore = fiche.references.length > 0 || fiche.pour_en_savoir_plus.length > 0;

  return (
    <main>
      <MarketingHeader />

      <div className="mx-auto max-w-content px-6 py-10 sm:py-14">
        <Breadcrumb items={breadcrumb} />

        <h1 className="mt-4 flex items-start gap-3 font-display text-3xl font-semibold leading-[1.1] text-ink sm:text-4xl">
          <span aria-hidden="true">{themeEmoji(themeSlug)}</span>
          {fiche.titre}
        </h1>

        {fiche.introduction && (
          <p className="mt-5 text-lg text-ink-soft">{fiche.introduction}</p>
        )}

        <Link
          href="/onboarding"
          className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-bold text-accent-foreground hover:bg-primary-hover"
        >
          😌 On s&apos;en occupe pour toi <ArrowRightIcon className="h-4 w-4" />
        </Link>

        {fiche.chapitres.length > 0 && (
          <div className="mt-8 space-y-3">
            {fiche.chapitres.map((chapitre, i) => (
              <ChapterAccordion key={i} titre={chapitre.titre} contenu={chapitre.contenu} />
            ))}
          </div>
        )}

        {hasHelp && (
          <section className="card-surface mt-8 p-6">
            <h2 className="font-display text-lg font-semibold text-ink">🤝 Qui peut t&apos;aider</h2>

            {fiche.services_en_ligne.length > 0 && (
              <ul className="mt-3 space-y-2 text-sm">
                {fiche.services_en_ligne.map((s) => (
                  <li key={s.url}>
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noreferrer"
                      className="font-semibold text-primary underline underline-offset-4 hover:no-underline"
                    >
                      {s.titre}
                    </a>
                  </li>
                ))}
              </ul>
            )}

            {fiche.contacts.length > 0 && (
              <ul className="mt-3 space-y-1.5 text-sm text-ink-soft">
                {fiche.contacts.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            )}
          </section>
        )}

        {hasMore && (
          <details className="group mt-6">
            <summary className="inline-flex cursor-pointer list-none items-center gap-1.5 text-sm font-bold text-ink-soft hover:text-ink">
              En savoir plus (documents officiels)
              <span aria-hidden="true" className="transition-transform group-open:rotate-90">→</span>
            </summary>
            <div className="mt-3 space-y-4">
              {fiche.references.length > 0 && (
                <ul className="space-y-1.5 text-sm text-ink-soft">
                  {fiche.references.map((r) => (
                    <li key={r.url}>{r.titre}</li>
                  ))}
                </ul>
              )}
              {fiche.pour_en_savoir_plus.length > 0 && (
                <ul className="space-y-1.5 text-sm">
                  {fiche.pour_en_savoir_plus.map((p) => (
                    <li key={p.url}>
                      <a
                        href={p.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-primary underline underline-offset-4 hover:no-underline"
                      >
                        {p.titre}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </details>
        )}

        <SourceAttribution url={fiche.url} dateModif={fiche.date_modif} />
      </div>

      <CtaBanner
        title="Cette démarche te concerne ?"
        text="Raconte ta situation, on regarde ce qu'on peut prendre en charge."
      />

      <MarketingFooter />
    </main>
  );
}
