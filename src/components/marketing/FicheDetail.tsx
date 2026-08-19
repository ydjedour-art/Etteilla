import Link from "next/link";
import { ArrowRightIcon } from "@/components/icons";
import { Breadcrumb, type BreadcrumbItem } from "@/components/marketing/Breadcrumb";
import { CtaBanner } from "@/components/marketing/CtaBanner";
import { MarketingFooter } from "@/components/marketing/MarketingFooter";
import { MarketingHeader } from "@/components/marketing/MarketingHeader";
import { SourceAttribution } from "@/components/marketing/SourceAttribution";
import type { GeneratedFiche } from "@/types/fiches";

const CALLOUT_LABELS: Record<string, string> = {
  "À noter": "bg-primary-light text-primary",
  "À savoir": "bg-primary-light text-primary",
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

export function FicheDetail({
  fiche,
  breadcrumb,
}: {
  fiche: GeneratedFiche;
  breadcrumb: BreadcrumbItem[];
}) {
  return (
    <main className="bg-white">
      <MarketingHeader />

      <div className="mx-auto max-w-content px-6 py-10 sm:py-14">
        <Breadcrumb items={breadcrumb} />

        <h1 className="mt-4 font-display text-3xl font-extrabold leading-[1.1] text-ink sm:text-4xl">
          {fiche.titre}
        </h1>

        {fiche.introduction && (
          <p className="mt-5 text-lg text-ink-soft">{fiche.introduction}</p>
        )}

        {fiche.chapitres.length > 0 && (
          <div className="mt-8 space-y-8">
            {fiche.chapitres.map((chapitre, i) => (
              <section key={i}>
                {chapitre.titre && (
                  <h2 className="font-display text-xl font-extrabold text-ink">{chapitre.titre}</h2>
                )}
                <div className="mt-3 space-y-2.5 text-ink">
                  {chapitre.contenu.map((line, j) => (
                    <ContentLine key={j} line={line} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}

        {fiche.services_en_ligne.length > 0 && (
          <section className="card-surface mt-10 p-6">
            <h2 className="font-display text-lg font-extrabold text-ink">Services en ligne</h2>
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
          </section>
        )}

        {fiche.references.length > 0 && (
          <section className="mt-8">
            <h2 className="font-display text-lg font-extrabold text-ink">Références</h2>
            <ul className="mt-3 space-y-1.5 text-sm text-ink-soft">
              {fiche.references.map((r) => (
                <li key={r.url}>{r.titre}</li>
              ))}
            </ul>
          </section>
        )}

        {fiche.contacts.length > 0 && (
          <section className="mt-8">
            <h2 className="font-display text-lg font-extrabold text-ink">Qui peut t&apos;aider</h2>
            <ul className="mt-3 space-y-1.5 text-sm text-ink-soft">
              {fiche.contacts.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </section>
        )}

        {fiche.pour_en_savoir_plus.length > 0 && (
          <section className="mt-8">
            <h2 className="font-display text-lg font-extrabold text-ink">Pour en savoir plus</h2>
            <ul className="mt-3 space-y-1.5 text-sm">
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
          </section>
        )}

        <SourceAttribution url={fiche.url} dateModif={fiche.date_modif} />

        <Link
          href="/onboarding"
          className="mt-8 inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:underline"
        >
          On s&apos;en occupe pour toi <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </div>

      <CtaBanner
        title="Cette démarche te concerne ?"
        text="Raconte ta situation, on regarde ce qu'on peut prendre en charge."
      />

      <MarketingFooter />
    </main>
  );
}
