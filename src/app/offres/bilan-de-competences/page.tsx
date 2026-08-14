import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { InfoStats } from "@/components/InfoStats";
import { Button } from "@/components/Button";
import { CheckIcon, ClockIcon, GlobeIcon, TagIcon, UsersIcon } from "@/components/Icons";
import { FEATURES } from "@/lib/features";

export const metadata: Metadata = {
  title: "Bilan de compétences",
  description:
    "Un bilan de compétences individuel en trois phases pour analyser votre parcours, vos compétences transférables et construire un projet professionnel réaliste. 100 % à distance.",
};

const POUR_QUI = [
  "Vous ressentez une lassitude diffuse dans votre poste actuel, sans projet alternatif clair.",
  "Vous envisagez une reconversion et souhaitez la valider avant de vous engager.",
  "Vous sortez d'une transition professionnelle subie (fin de contrat, réorganisation) et voulez reprendre la main.",
  "Vous voulez identifier vos compétences transférables avant une évolution de poste ou une création d'entreprise.",
];

const PHASES = [
  {
    title: "Phase préliminaire",
    description:
      "Un premier échange pour comprendre votre demande, votre contexte professionnel et confirmer que le bilan de compétences est la réponse adaptée à votre situation.",
  },
  {
    title: "Phase d'investigation",
    description:
      "L'essentiel du parcours : analyse de votre trajectoire, de vos compétences transférables, de vos motivations réelles et confrontation de plusieurs pistes à la réalité du marché.",
  },
  {
    title: "Phase de conclusions",
    description:
      "Formalisation d'un plan d'action concret et hiérarchisé, avec un document de synthèse qui reste votre propriété exclusive.",
  },
];

const LIVRABLES = [
  "Une synthèse écrite de vos compétences et de vos motivations",
  "Un ou plusieurs projets professionnels validés et argumentés",
  "Un plan d'action avec des étapes datées et réalistes",
  "Une meilleure lisibilité de votre parcours pour vos futures candidatures",
];

export default function BilanDeCompetencesPage() {
  return (
    <main>
      <PageHero
        eyebrow="Se connaître & trouver sa voie"
        title="Bilan de compétences"
        subtitle="Un accompagnement individuel structuré pour faire le point sur votre parcours et construire un projet professionnel réaliste — pas une simple liste de pistes."
      >
        <div className="mt-8 flex flex-wrap gap-4">
          <Button href="/contact">Demander un diagnostic</Button>
          <Button href="/se-connaitre" variant="ghost">
            Voir le bloc « Se connaître »
          </Button>
        </div>
      </PageHero>

      <section className="mx-auto max-w-marketing px-6 py-16">
        <InfoStats
          items={[
            { icon: ClockIcon, label: "Durée", value: "24h réparties sur 1 à 3 mois" },
            { icon: UsersIcon, label: "Format", value: "Individuel · 100 % à distance" },
            { icon: GlobeIcon, label: "Modalité", value: "Visioconférence, où que vous soyez" },
            {
              icon: TagIcon,
              label: "Financement",
              value: FEATURES.cpf ? "Éligible CPF" : "Financement possible selon votre situation",
            },
          ]}
        />
      </section>

      <section className="border-y border-ink/10 bg-white py-16">
        <div className="mx-auto max-w-marketing px-6">
          <h2 className="font-serif text-2xl font-semibold text-ink">Pour qui ?</h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {POUR_QUI.map((item) => (
              <li key={item} className="flex items-start gap-3 rounded-2xl border border-ink/10 p-5">
                <CheckIcon className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <span className="text-sm text-ink-soft">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-marketing px-6 py-16">
        <h2 className="font-serif text-2xl font-semibold text-ink">Le déroulé, en trois phases</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {PHASES.map((phase, index) => (
            <div key={phase.title} className="rounded-2xl border border-ink/10 bg-white p-6">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white">
                {index + 1}
              </span>
              <h3 className="mt-4 font-semibold text-ink">{phase.title}</h3>
              <p className="mt-2 text-sm text-ink-soft">{phase.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-ink/10 bg-white py-16">
        <div className="mx-auto max-w-marketing px-6">
          <h2 className="font-serif text-2xl font-semibold text-ink">Ce que vous obtenez à l&apos;issue</h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {LIVRABLES.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <CheckIcon className="mt-0.5 h-5 w-5 shrink-0 text-success" />
                <span className="text-sm text-ink-soft">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-marketing px-6 py-16">
        <div className="rounded-2xl bg-primary-light p-6">
          <h2 className="font-serif text-xl font-semibold text-primary">Financement</h2>
          <p className="mt-2 text-sm text-ink-soft">
            {FEATURES.cpf
              ? "Ce bilan de compétences est éligible au Compte Personnel de Formation (CPF). D'autres solutions de financement existent selon votre statut (salarié, demandeur d'emploi, indépendant)."
              : "Plusieurs solutions de financement existent selon votre statut (salarié, demandeur d'emploi, indépendant). Nous étudions avec vous l'option la plus adaptée dès le premier échange."}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-marketing px-6 pb-24">
        <div className="rounded-2xl bg-primary px-8 py-14 text-center text-white">
          <h2 className="font-serif text-2xl font-semibold sm:text-3xl">
            Envie de faire le point sur votre situation ?
          </h2>
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
