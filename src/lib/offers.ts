import type { ComponentType } from "react";
import {
  CompassIcon,
  GraduationCapIcon,
  RocketIcon,
  TrendingUpIcon,
  RouteIcon,
} from "@/components/Icons";

export type OfferItem = {
  /** Identifiant utilisé pour l'ancre sur la page du bloc (#slug). */
  slug: string;
  title: string;
  description: string;
  duration: string;
  price: string;
  /** Si true et FEATURES.cpf activé, un badge "Éligible CPF" est affiché. */
  cpfEligible?: boolean;
  /** Page de détail dédiée, si elle existe. */
  href?: string;
};

export type OfferBlock = {
  slug: string;
  order: number;
  title: string;
  /** Intitulé court utilisé dans la navigation et les fils d'Ariane. */
  navLabel: string;
  tagline: string;
  description: string;
  icon: ComponentType<{ className?: string }>;
  items: OfferItem[];
};

export const OFFER_BLOCKS: OfferBlock[] = [
  {
    slug: "se-connaitre",
    order: 1,
    title: "Se connaître & trouver sa voie",
    navLabel: "Se connaître",
    tagline: "Faire le point avant d'avancer.",
    description:
      "Avant de choisir une direction, encore faut-il savoir d'où l'on part. Ce premier bloc aide à clarifier ses compétences, ses envies et ses freins, avec une méthode structurée plutôt qu'une introspection livrée à elle-même.",
    icon: CompassIcon,
    items: [
      {
        slug: "bilan-de-competences",
        title: "Bilan de compétences",
        description:
          "Un accompagnement individuel en trois phases (préliminaire, investigation, conclusions) pour analyser votre parcours, vos compétences transférables et construire un projet professionnel réaliste et argumenté.",
        duration: "1 à 3 mois — 24h réparties selon votre rythme",
        price: "Financement possible selon votre situation",
        cpfEligible: true,
        href: "/offres/bilan-de-competences",
      },
      {
        slug: "orientation-projet-professionnel",
        title: "Orientation & clarification de projet professionnel",
        description:
          "Pour les situations moins engageantes qu'un bilan complet : quelques séances ciblées pour explorer des pistes, tester leur cohérence et sortir de l'hésitation avec un plan d'action concret.",
        duration: "3 à 6 séances, environ 1 mois",
        price: "à partir de 450 €",
      },
      {
        slug: "soft-skills-de-base",
        title: "Soft skills de base",
        description:
          "Confiance en soi, communication et organisation personnelle : les fondations comportementales qui conditionnent la réussite de toute reconversion, création d'entreprise ou évolution professionnelle.",
        duration: "1 à 2 jours (7 à 14h)",
        price: "à partir de 390 €",
      },
    ],
  },
  {
    slug: "monter-en-competences",
    order: 2,
    title: "Se former & monter en compétences",
    navLabel: "Monter en compétences",
    tagline: "Renforcer ce qui fera la différence.",
    description:
      "Une fois le cap fixé, il faut les compétences pour le tenir. Ce bloc regroupe les formations qui outillent concrètement : posture professionnelle, savoir-faire métier et maîtrise des outils numériques et d'IA du quotidien.",
    icon: GraduationCapIcon,
    items: [
      {
        slug: "soft-skills-avancees",
        title: "Soft skills avancées",
        description:
          "Management d'équipe, négociation, prise de parole en public, gestion du stress : des modules courts et concrets pour des situations professionnelles exigeantes, avec mises en situation.",
        duration: "Modules de 1 à 2 jours",
        price: "à partir de 450 € par module",
      },
      {
        slug: "competences-metier-transverses",
        title: "Compétences métier et transverses",
        description:
          "Formations construites sur mesure selon votre secteur et vos besoins réels : montée en compétence technique, transversale ou managériale, en individuel ou en petit collectif.",
        duration: "Sur mesure, de 1 à 5 jours",
        price: "sur devis",
      },
      {
        slug: "intelligence-artificielle",
        title: "Intelligence artificielle : outils et productivité",
        description:
          "Comprendre et utiliser concrètement les outils d'IA générative dans votre métier : gain de temps, rédaction, organisation, automatisation des tâches répétitives — sans prérequis technique.",
        duration: "1 jour (7h) ou parcours de 3 jours",
        price: "à partir de 390 €",
      },
    ],
  },
  {
    slug: "creer-son-entreprise",
    order: 3,
    title: "Créer son entreprise",
    navLabel: "Créer son entreprise",
    tagline: "Passer de l'idée au projet structuré.",
    description:
      "De l'idée à l'immatriculation : ce bloc accompagne la création d'entreprise avec une formation certifiante de référence et des modules pratiques pour poser des fondations solides — statut, modèle économique, prévisionnel et premiers outils numériques.",
    icon: RocketIcon,
    items: [
      {
        slug: "creation-entreprise-rs6996",
        title: "Formation création d'entreprise (RS6996)",
        description:
          "Le parcours de référence pour structurer un projet de création ou de reprise d'entreprise : étude de marché, business model, prévisionnel financier, choix du statut, jusqu'à la présentation du projet.",
        duration: "70h, réparties sur 2 à 3 semaines",
        price: "Financement possible selon votre profil",
        cpfEligible: true,
        href: "/offres/creation-entreprise",
      },
      {
        slug: "fondamentaux-creation",
        title: "Fondamentaux : statut, business model, prévisionnel, pitch",
        description:
          "Un format condensé pour celles et ceux qui veulent avancer vite sur les bases : choisir son statut juridique, construire son business model, chiffrer un prévisionnel simple et préparer son pitch.",
        duration: "3 à 5 jours",
        price: "à partir de 690 €",
      },
      {
        slug: "outils-digitaux-demarrage",
        title: "Outils digitaux de démarrage",
        description:
          "Créer son site vitrine, structurer sa présence sur les réseaux sociaux et poser les bases d'une prospection efficace — les premiers réflexes numériques pour être visible dès le lancement.",
        duration: "2 jours",
        price: "à partir de 490 €",
      },
    ],
  },
  {
    slug: "gerer-son-entreprise",
    order: 4,
    title: "Gérer & développer son entreprise",
    navLabel: "Gérer son entreprise",
    tagline: "Piloter, développer, sécuriser.",
    description:
      "Créer n'est que la première étape : ce bloc accompagne les dirigeants et indépendants déjà en activité sur la gestion quotidienne, le développement commercial, la transition numérique et la conformité des données.",
    icon: TrendingUpIcon,
    items: [
      {
        slug: "gestion-quotidienne",
        title: "Gestion quotidienne",
        description:
          "Administratif courant, bases de la finance d'entreprise, premiers réflexes RH, obligations de conformité : les fondamentaux pour piloter son activité sereinement au jour le jour.",
        duration: "Modules de 1 à 3 jours",
        price: "à partir de 450 €",
      },
      {
        slug: "developpement-commercial-marketing",
        title: "Développement commercial & marketing",
        description:
          "Structurer une démarche commerciale, définir son positionnement, construire un plan marketing réaliste et développer un portefeuille clients de façon méthodique.",
        duration: "2 à 4 jours",
        price: "à partir de 590 €",
      },
      {
        slug: "transition-numerique-ia-dirigeants",
        title: "Transition numérique & IA pour dirigeants",
        description:
          "Identifier où l'IA et les outils numériques peuvent réellement alléger votre gestion et votre développement commercial, avec un plan d'adoption adapté à la taille de votre structure.",
        duration: "1 à 2 jours",
        price: "à partir de 490 €",
      },
      {
        slug: "rgpd-protection-donnees",
        title: "RGPD & protection des données",
        description:
          "Cartographie des traitements, registre, sensibilisation des équipes et accompagnement à la mise en conformité : une formation opérationnelle pour maîtriser vos obligations sur les données personnelles.",
        duration: "1 à 2 jours (audit + formation)",
        price: "sur devis",
        href: "/offres/rgpd-dpo",
      },
    ],
  },
  {
    slug: "parcours-sur-mesure",
    order: 5,
    title: "Accompagnement & parcours sur-mesure",
    navLabel: "Parcours sur-mesure",
    tagline: "Un fil conducteur, de l'idée à la gestion.",
    description:
      "Certains projets ne se laissent pas découper en modules isolés. Ce bloc propose des parcours combinés, construits avec vous à partir des briques précédentes, ainsi qu'un accompagnement individuel dans la durée.",
    icon: RouteIcon,
    items: [
      {
        slug: "parcours-complets",
        title: "Parcours complets « de l'idée à la gestion »",
        description:
          "Un fil conducteur unique qui combine plusieurs blocs — orientation, création, gestion — construit avec vous selon votre point de départ et votre objectif, avec un seul interlocuteur du début à la fin.",
        duration: "3 à 12 mois, rythme adapté à votre disponibilité",
        price: "sur devis",
      },
      {
        slug: "modules-a-la-carte",
        title: "Modules à la carte",
        description:
          "Vous savez déjà ce qu'il vous manque : nous assemblons uniquement les modules pertinents parmi l'ensemble de notre offre, sans passer par un parcours standard.",
        duration: "à la carte",
        price: "sur devis",
      },
      {
        slug: "accompagnement-individuel-coaching",
        title: "Accompagnement individuel / coaching",
        description:
          "Un suivi personnalisé en one-to-one pour ancrer les acquis, lever les blocages spécifiques à votre situation et garder un cap dans la durée, en complément ou en dehors de toute formation.",
        duration: "Séances de 1h à 2h — cycle recommandé de 6 à 10 séances",
        price: "à partir de 90 € la séance",
      },
    ],
  },
];

export function getBlockBySlug(slug: string): OfferBlock | undefined {
  return OFFER_BLOCKS.find((block) => block.slug === slug);
}

export function getAllOfferItems(): (OfferItem & { blockSlug: string; blockTitle: string })[] {
  return OFFER_BLOCKS.flatMap((block) =>
    block.items.map((item) => ({ ...item, blockSlug: block.slug, blockTitle: block.title }))
  );
}
