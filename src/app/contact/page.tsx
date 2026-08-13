import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { ContactForm } from "@/components/ContactForm";
import { GlobeIcon, MailIcon, PhoneIcon, ClockIcon } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Un projet d'orientation, de formation ou de création/gestion d'entreprise ? Contactez YD Formation, 100 % à distance, pour un premier échange sans engagement.",
};

export default function ContactPage() {
  return (
    <main>
      <PageHero
        eyebrow="Contact"
        title="Parlons de votre projet"
        subtitle="Un premier échange, sans engagement, pour comprendre votre situation et vous orienter vers le parcours le plus adapté."
      />

      <section className="mx-auto max-w-marketing px-6 py-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <h2 className="font-serif text-2xl font-semibold text-ink">Nos coordonnées</h2>
            <ul className="mt-6 space-y-5 text-sm text-ink-soft">
              <li className="flex items-start gap-3">
                <GlobeIcon className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <span>
                  100 % à distance
                  <br />
                  Un accompagnement individuel par visioconférence, où que vous soyez en France.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <MailIcon className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <span>contact@ydformation.fr</span>
              </li>
              <li className="flex items-start gap-3">
                <PhoneIcon className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <span>Coordonnées téléphoniques communiquées lors de la prise de contact</span>
              </li>
              <li className="flex items-start gap-3">
                <ClockIcon className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <span>Réponse sous quelques jours ouvrés</span>
              </li>
            </ul>

            <div className="mt-8 rounded-2xl bg-primary-light p-5">
              <p className="text-sm text-ink-soft">
                Pas encore sûr·e du bloc qui correspond à votre besoin ? Décrivez
                simplement votre situation — nous vous orientons vers l&apos;offre
                pertinente.
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-ink/10 bg-white p-6 sm:p-8">
            <ContactForm />
          </div>
        </div>
      </section>
    </main>
  );
}
