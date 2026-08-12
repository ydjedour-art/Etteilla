import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { InfoStats } from "@/components/InfoStats";
import { Button } from "@/components/Button";
import { CheckIcon, ClockIcon, MapPinIcon, TagIcon, UsersIcon } from "@/components/Icons";

export const metadata: Metadata = {
  title: "RGPD & protection des données",
  description:
    "Formation et accompagnement opérationnel à la mise en conformité RGPD : cartographie des traitements, registre, sensibilisation des équipes. À Marseille ou à distance.",
};

const POUR_QUI = [
  "Vous dirigez une TPE/PME et n'avez jamais formalisé votre conformité RGPD.",
  "Vous devez sensibiliser vos équipes aux bonnes pratiques sur les données personnelles.",
  "Vous voulez structurer un registre des traitements clair et tenable dans la durée.",
  "Vous cherchez un accompagnement opérationnel pour occuper la fonction de point de contact protection des données au sein de votre structure.",
];

const PROGRAMME = [
  {
    title: "Cartographie des traitements",
    description:
      "Identifier l'ensemble des traitements de données personnelles réellement en place dans votre structure.",
  },
  {
    title: "Registre des traitements",
    description:
      "Structurer un registre adapté à la taille de votre organisation, exploitable au quotidien et présentable en cas de contrôle.",
  },
  {
    title: "Sensibilisation des équipes",
    description:
      "Former vos collaborateurs aux réflexes qui limitent le risque au quotidien : collecte, partage, conservation des données.",
  },
  {
    title: "Procédures opérationnelles",
    description:
      "Mettre en place des procédures internes pour répondre aux demandes des personnes concernées et réagir en cas d'incident.",
  },
];

export default function RgpdDpoPage() {
  return (
    <main>
      <PageHero
        eyebrow="Gérer & développer son entreprise"
        title="RGPD & protection des données"
        subtitle="Une formation opérationnelle pour cartographier vos traitements, structurer votre registre et sensibiliser vos équipes — pour maîtriser vos obligations sans jargon inutile."
      >
        <div className="mt-8 flex flex-wrap gap-4">
          <Button href="/contact">Demander un diagnostic</Button>
          <Button href="/gerer-son-entreprise" variant="ghost">
            Voir le bloc « Gérer son entreprise »
          </Button>
        </div>
      </PageHero>

      <section className="mx-auto max-w-marketing px-6 py-16">
        <InfoStats
          items={[
            { icon: ClockIcon, label: "Durée", value: "1 à 2 jours (audit + formation)" },
            { icon: UsersIcon, label: "Format", value: "Individuel ou équipe" },
            { icon: MapPinIcon, label: "Lieu", value: "Marseille ou à distance" },
            { icon: TagIcon, label: "Tarif", value: "Sur devis" },
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
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
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
        <p className="mt-8 max-w-2xl text-sm text-ink-soft">
          Cet accompagnement est une prestation de formation et d&apos;organisation
          opérationnelle. Il ne constitue pas une prestation juridique et ne remplace
          pas, le cas échéant, l&apos;avis d&apos;un professionnel du droit sur un point
          spécifique.
        </p>
      </section>

      <section className="mx-auto max-w-marketing px-6 pb-24">
        <div className="rounded-2xl bg-primary px-8 py-14 text-center text-white">
          <h2 className="font-serif text-2xl font-semibold sm:text-3xl">
            Faites le point sur votre conformité RGPD
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
