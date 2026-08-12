import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description:
    "Comment YD Formation collecte, utilise et protège vos données personnelles sur ydformation.lovable.app.",
};

export default function PolitiqueConfidentialitePage() {
  return (
    <main>
      <PageHero eyebrow="Vos données" title="Politique de confidentialité" />

      <article className="mx-auto max-w-content space-y-10 px-6 py-16 text-sm text-ink-soft">
        <section>
          <h2 className="font-serif text-xl font-semibold text-ink">Données collectées</h2>
          <p className="mt-3 leading-relaxed">
            Nous collectons uniquement les données que vous nous transmettez
            volontairement via le formulaire de contact : nom, adresse email, sujet et
            contenu de votre message.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl font-semibold text-ink">Finalité du traitement</h2>
          <p className="mt-3 leading-relaxed">
            Ces données sont utilisées exclusivement pour répondre à votre demande de
            contact et, le cas échéant, vous proposer un accompagnement adapté à votre
            situation. Elles ne sont ni revendues ni transmises à des tiers à des fins
            commerciales.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl font-semibold text-ink">Durée de conservation</h2>
          <p className="mt-3 leading-relaxed">
            Les données transmises via le formulaire de contact sont conservées le
            temps nécessaire au traitement de votre demande, puis supprimées ou
            archivées conformément à nos obligations légales.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl font-semibold text-ink">Vos droits</h2>
          <p className="mt-3 leading-relaxed">
            Conformément au Règlement Général sur la Protection des Données (RGPD),
            vous disposez d&apos;un droit d&apos;accès, de rectification, d&apos;effacement
            et de portabilité de vos données, ainsi que d&apos;un droit d&apos;opposition
            à leur traitement. Pour exercer ces droits, contactez-nous à
            contact@ydformation.fr.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl font-semibold text-ink">Sécurité</h2>
          <p className="mt-3 leading-relaxed">
            Nous mettons en œuvre les mesures raisonnables pour protéger vos données
            contre tout accès, modification ou divulgation non autorisés.
          </p>
        </section>
      </article>
    </main>
  );
}
