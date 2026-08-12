export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string; // ISO
  readingTime: string;
  content: string[]; // paragraphes
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "bilan-de-competences-a-qui-quand",
    title: "Bilan de compétences : à qui s'adresse-t-il et quand le démarrer ?",
    excerpt:
      "Reconversion envisagée, lassitude installée, envie de donner un sens différent à son travail : voici comment savoir si le moment est venu de faire le point.",
    category: "Se connaître",
    date: "2026-06-12",
    readingTime: "5 min",
    content: [
      "Le bilan de compétences a mauvaise réputation : on l'imagine réservé aux situations de crise, ou au contraire comme une formalité sans grand effet. En pratique, c'est un outil structuré qui a sa place dans des contextes très différents — et le bon moment pour le démarrer compte autant que la démarche elle-même.",
      "Trois profils y trouvent généralement le plus de valeur. D'abord, les personnes en questionnement diffus : le poste actuel ne pose pas de problème précis, mais l'énergie n'y est plus, sans qu'un projet alternatif soit clair. Ensuite, celles qui envisagent une reconversion déjà identifiée et cherchent à la valider ou à la sécuriser avant de s'engager. Enfin, les personnes en transition subie — fin de contrat, réorganisation — pour qui le bilan sert à transformer une contrainte en point de départ choisi.",
      "La méthode se déroule en trois phases : une phase préliminaire pour cadrer la demande, une phase d'investigation pour analyser le parcours, les compétences transférables et les motivations réelles, puis une phase de conclusions qui aboutit à un plan d'action concret et réaliste — pas une liste de pistes vagues.",
      "Le mauvais moment pour démarrer, à l'inverse, c'est souvent l'urgence : vouloir boucler un bilan de compétences en deux semaines pour répondre à une échéance externe donne rarement un résultat solide. Le format s'étale sur plusieurs semaines pour une bonne raison — laisser le temps à la réflexion de mûrir entre les séances.",
      "Si vous hésitez encore, un échange préalable suffit généralement à clarifier si un bilan de compétences est la bonne réponse à votre situation, ou si une simple séance d'orientation ciblée serait plus adaptée.",
    ],
  },
  {
    slug: "creer-son-entreprise-5-etapes",
    title: "Créer son entreprise en 2026 : les 5 étapes à ne pas sauter",
    excerpt:
      "Entre l'envie d'entreprendre et l'immatriculation, certaines étapes sont souvent bâclées — et se paient plus tard. Voici l'ordre qui limite les mauvaises surprises.",
    category: "Créer son entreprise",
    date: "2026-05-20",
    readingTime: "6 min",
    content: [
      "La création d'entreprise attire par sa promesse de liberté, mais la précipitation est le principal facteur d'échec évitable. Voici les cinq étapes que nous voyons le plus souvent sautées ou expédiées — dans le mauvais sens.",
      "1. Vérifier le marché avant l'idée. Beaucoup de porteurs de projet partent de leur solution plutôt que du besoin observé. Une étude de marché, même légère, permet de confronter l'idée à une réalité chiffrée avant d'y investir du temps et de l'argent.",
      "2. Construire un vrai business model, pas seulement un produit. Comment l'activité gagne-t-elle de l'argent, à quel coût, avec quel cycle de vente ? Ces questions structurent des choix ultérieurs — statut, financement, priorités des premiers mois.",
      "3. Chiffrer un prévisionnel réaliste. Un prévisionnel trop optimiste fragilise la trésorerie dès les premiers mois. Mieux vaut un scénario prudent, avec des hypothèses explicites, qu'un tableau flatteur mais déconnecté du terrain.",
      "4. Choisir son statut juridique en connaissance de cause. Le statut conditionne la fiscalité, la protection du patrimoine personnel et la crédibilité vis-à-vis de certains partenaires. Ce choix mérite d'être posé avec méthode plutôt que par défaut ou par imitation.",
      "5. Préparer sa présence numérique avant le lancement, pas après. Site, réseaux sociaux et premiers réflexes de prospection se préparent en amont pour être opérationnels dès l'immatriculation — pas improvisés dans l'urgence une fois l'entreprise créée.",
      "Une formation structurée sur ces cinq étapes — comme notre parcours création d'entreprise — permet d'avancer avec méthode plutôt qu'en accumulant les recherches éparses.",
    ],
  },
  {
    slug: "rgpd-tpe-pme-par-ou-commencer",
    title: "RGPD pour les TPE/PME : par où commencer sans tout arrêter",
    excerpt:
      "La conformité RGPD paraît complexe vue de loin. En réalité, quelques actions prioritaires couvrent l'essentiel du risque pour une petite structure.",
    category: "Gérer son entreprise",
    date: "2026-04-08",
    readingTime: "5 min",
    content: [
      "Beaucoup de dirigeants de TPE/PME repoussent le sujet RGPD faute de temps ou par crainte de sa complexité perçue. Pourtant, l'essentiel du risque peut être couvert par quelques actions concrètes, hiérarchisées par priorité plutôt que traitées d'un bloc.",
      "Première étape : cartographier les traitements de données réellement en place. Fichier clients, newsletter, candidatures, vidéosurveillance éventuelle — l'objectif est de savoir ce qui existe avant de chercher à le corriger.",
      "Deuxième étape : tenir un registre des traitements, même simplifié pour une petite structure. Ce document sert de base à toute la démarche de conformité et constitue la première pièce demandée en cas de contrôle.",
      "Troisième étape : sensibiliser les équipes. La majorité des incidents liés aux données personnelles viennent de pratiques quotidiennes mal cadrées — mot de passe partagé, fichier envoyé par erreur — plus que d'attaques sophistiquées.",
      "Quatrième étape : sécuriser les points de collecte les plus exposés — formulaires de site web, contrats, sous-traitants qui traitent des données pour votre compte.",
      "Une fois ces bases posées, la conformité RGPD devient un sujet de maintenance plutôt qu'un chantier permanent. C'est l'objectif de notre accompagnement : structurer une fois, puis transmettre les bons réflexes en interne.",
    ],
  },
  {
    slug: "ia-usages-concrets-gain-de-temps",
    title: "Intelligence artificielle au travail : 5 usages concrets pour gagner du temps",
    excerpt:
      "Pas besoin d'être technophile pour tirer parti de l'IA générative au quotidien. Cinq usages simples, testés en formation, qui font gagner un temps réel.",
    category: "Monter en compétences",
    date: "2026-03-15",
    readingTime: "4 min",
    content: [
      "L'intelligence artificielle générative reste souvent perçue comme un sujet technique réservé aux métiers du numérique. En formation, nous voyons l'inverse : ce sont les tâches administratives et répétitives du quotidien qui bénéficient le plus vite d'un usage bien cadré de ces outils.",
      "1. Rédiger un premier jet plus vite. Emails, comptes rendus, descriptions de poste : partir d'un brouillon généré puis l'ajuster fait gagner un temps considérable par rapport à la page blanche.",
      "2. Synthétiser un document long. Contrat, rapport, compte rendu de réunion — obtenir un résumé structuré en quelques secondes permet de prioriser sa lecture approfondie.",
      "3. Préparer une prise de parole. Structurer les idées d'une présentation ou anticiper les questions difficiles d'un entretien devient un exercice guidé plutôt qu'une angoisse de la page blanche.",
      "4. Automatiser les tâches répétitives. Classement, réponses types, mise en forme de données : plusieurs outils permettent d'automatiser ces micro-tâches sans compétence technique poussée.",
      "5. Explorer plusieurs options avant de trancher. Pour un choix de nom, une accroche commerciale ou une reformulation, générer plusieurs variantes aide à sortir d'un premier réflexe pas toujours le meilleur.",
      "Le point commun de ces usages : ils ne remplacent pas le jugement professionnel, ils accélèrent la partie mécanique du travail pour laisser plus de temps à ce qui compte réellement.",
    ],
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug);
}
