import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Mentions légales du site YD Formation, organisme de formation basé à Marseille.",
};

export default function MentionsLegalesPage() {
  return (
    <main>
      <PageHero eyebrow="Informations légales" title="Mentions légales" />

      <article className="mx-auto max-w-content space-y-10 px-6 py-16 text-sm text-ink-soft">
        <section>
          <h2 className="font-serif text-xl font-semibold text-ink">Éditeur du site</h2>
          <p className="mt-3 leading-relaxed">
            Le site YD Formation est édité par YD Formation, organisme de formation
            basé à Marseille (France).
            <br />
            Forme juridique : [à compléter]
            <br />
            SIRET : [à compléter]
            <br />
            Numéro de déclaration d&apos;activité : [à compléter]
            <br />
            Adresse : Marseille, France — adresse complète communiquée sur demande
            <br />
            Email : contact@ydformation.fr
            <br />
            Directeur·rice de la publication : [à compléter]
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl font-semibold text-ink">Hébergement</h2>
          <p className="mt-3 leading-relaxed">
            Le site est hébergé par un prestataire d&apos;hébergement web. Les
            coordonnées complètes de l&apos;hébergeur sont communiquées sur simple
            demande à l&apos;adresse ci-dessus.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl font-semibold text-ink">Propriété intellectuelle</h2>
          <p className="mt-3 leading-relaxed">
            L&apos;ensemble des contenus présents sur ce site (textes, mises en page,
            visuels) est la propriété de YD Formation, sauf mention contraire. Toute
            reproduction, totale ou partielle, sans autorisation préalable est
            interdite.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl font-semibold text-ink">Données personnelles</h2>
          <p className="mt-3 leading-relaxed">
            Le traitement des données personnelles collectées via ce site (formulaire
            de contact notamment) est détaillé dans notre{" "}
            <a href="/politique-de-confidentialite" className="text-primary underline underline-offset-4">
              politique de confidentialité
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl font-semibold text-ink">Cookies</h2>
          <p className="mt-3 leading-relaxed">
            Ce site n&apos;utilise pas de cookies de suivi publicitaire. Seuls des
            cookies techniques strictement nécessaires au fonctionnement du site
            peuvent être déposés.
          </p>
        </section>
      </article>
    </main>
  );
}
