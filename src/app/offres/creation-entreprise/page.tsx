import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { InfoStats } from "@/components/InfoStats";
import { Button } from "@/components/Button";
import { CheckIcon, ClockIcon, MapPinIcon, TagIcon, UsersIcon } from "@/components/Icons";
import { FEATURES } from "@/lib/features";

export const metadata: Metadata = {
  title: "Formation création d'entreprise (RS6996)",
  description:
    "Formation certifiante RS6996 pour structurer un projet de création ou de reprise d'entreprise : étude de marché, business model, prévisionnel financier, statut juridique. À Marseille ou à distance.",
};

const POUR_QUI = [
  "Vous avez une idée de création ou de reprise d'entreprise et voulez la structurer avant de vous lancer.",
  "Vous voulez sécuriser votre projet avec une méthode reconnue plutôt qu'en avançant à l'instinct.",
  "Vous cherchez une formation certifiante à valoriser auprès de partenaires ou de financeurs.",
  "Vous souhaitez être accompagné·e du choix du statut jusqu'au prévisionnel financier.",
];

const PROGRAMME = [
  {
    title: "Étude de marché & positionnement",
    description:
      "Analyser la demande, la concurrence et définir un positionnement différenciant avant d'investir dans le projet.",
  },
  {
    title: "Business model & offre",
    description:
      "Formaliser comment l'activité crée et capture de la valeur : offre, canaux, ressources clés, structure de coûts.",
  },
  {
    title: "Prévisionnel financier",
    description:
      "Construire un prévisionnel réaliste : compte de résultat, plan de trésorerie, plan de financement.",
  },
  {
    title: "Statut juridique & fiscal",
    description:
      "Comprendre les principales options de statut et leurs implications, pour arbitrer en connaissance de cause.",
  },
  {
    title: "Présentation du projet",
    description:
      "Préparer un pitch clair et structuré pour présenter le projet à un partenaire, un financeur ou un jury.",
  },
];

export default function CreationEntreprisePage() {
  return (
    <main>
      <PageHero
        eyebrow="Créer son entreprise"
        title="Formation création d'entreprise (RS6996)"
        subtitle="Le parcours de référence pour structurer un projet de création ou de reprise d'entreprise, de l'étude de marché à la présentation du projet."
      >
        <div className="mt-8 flex flex-wrap gap-4">
          <Button href="/contact">Demander un diagnostic</Button>
          <Button href="/creer-son-entreprise" variant="ghost">
            Voir le bloc « Créer son entreprise »
          </Button>
        </div>
      </PageHero>

      <section className="mx-auto max-w-marketing px-6 py-16">
        <InfoStats
          items={[
            { icon: ClockIcon, label: "Durée", value: "70h sur 2 à 3 semaines" },
            { icon: UsersIcon, label: "Format", value: "Individuel ou petit groupe" },
            { icon: MapPinIcon, label: "Lieu", value: "Marseille ou à distance" },
            {
              icon: TagIcon,
              label: "Financement",
              value: FEATURES.cpf ? "Éligible CPF" : "Financement possible selon votre profil",
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
        <h2 className="font-serif text-2xl font-semibold text-ink">Programme</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PROGRAMME.map((module, index) => (
            <div key={module.title} className="rounded-2xl border border-ink/10 bg-white p-6">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white">
                {index + 1}
              </span>
              <h3 className="mt-4 font-semibold text-ink">{module.title}</h3>
              <p className="mt-2 text-sm text-ink-soft">{module.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-ink/10 bg-white py-16">
        <div className="mx-auto max-w-marketing px-6">
          <h2 className="font-serif text-2xl font-semibold text-ink">Validation</h2>
          <p className="mt-4 max-w-2xl text-sm text-ink-soft">
            La formation vise la certification RS6996 « Réaliser un projet de création ou
            de reprise d&apos;entreprise ». La validation s&apos;appuie sur une mise en
            situation professionnelle portant sur votre propre projet, dans les
            conditions fixées par le référentiel de certification.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-marketing px-6 py-16">
        <div className="rounded-2xl bg-primary-light p-6">
          <h2 className="font-serif text-xl font-semibold text-primary">Financement</h2>
          <p className="mt-2 text-sm text-ink-soft">
            {FEATURES.cpf
              ? "Cette formation est éligible au Compte Personnel de Formation (CPF). D'autres solutions de financement existent selon votre profil (salarié, demandeur d'emploi, indépendant)."
              : "Plusieurs solutions de financement existent selon votre profil (salarié, demandeur d'emploi, indépendant). Nous étudions avec vous l'option la plus adaptée dès le premier échange."}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-marketing px-6 pb-24">
        <div className="rounded-2xl bg-primary px-8 py-14 text-center text-white">
          <h2 className="font-serif text-2xl font-semibold sm:text-3xl">
            Prêt·e à structurer votre projet de création ?
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
