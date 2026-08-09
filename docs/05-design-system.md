# 05 — Design system & principes UX/UI

> Historique de direction visuelle : v1 sauge calme → v2 palette « dynamique »
> (rose bonbon / bleu Klein / jaune citron) → **v3 (actuelle) « confiance
> officielle »**, inspirée des codes visuels des marques de confiance dans
> l'administratif (ex. Boundless pour l'immigration) : sobriété institutionnelle,
> typographie éditoriale, preuve de confiance, vraie photographie. Les principes
> UX de fond (n°2 à 6 ci-dessous) n'ont pas changé depuis v1 — seul l'habillage
> visuel évolue.

## Principes directeurs

Le public cible est fatigué, parfois anxieux, et confie des documents sensibles
(identité, titre de séjour, avis d'imposition). Le design doit à la fois **abaisser**
la charge cognitive et **inspirer confiance immédiatement** :

1. **Sérieux institutionnel, jamais froid.** L'interface doit avoir l'air aussi fiable
   qu'un service officiel, sans perdre la chaleur nécessaire à un public anxieux —
   d'où un bleu marine sobre plutôt qu'un ton corporate gris, et une typographie
   éditoriale plutôt que purement technique.
2. **Une seule action primaire par écran.** Les actions secondaires sont visuellement
   discrètes.
3. **Feedback constant et rassurant.** Aucun écran ne doit laisser l'utilisateur dans
   le doute sur « est-ce que ça a marché ? ».
4. **L'alerte reste dorée, jamais rouge d'urgence.** Le rouge critique est réservé aux
   blocages réels, à très faible fréquence d'apparition. Le vert est réservé aux états
   validés/terminés — jamais utilisé pour autre chose, afin de rester un signal fiable.
5. **La preuve de confiance est honnête.** Chiffres, mentions et témoignages ne sont
   jamais fabriqués pour impressionner : tant que Sérénio n'a pas d'utilisateurs réels,
   on présente des scénarios explicitement annoncés comme illustratifs (voir la landing
   page), jamais de faux avis ou de fausses statistiques d'usage.
6. **Micro-copy > iconographie seule.** Chaque icône (SVG simple, pas d'emoji en
   interface produit) est accompagnée d'un texte clair.
7. **Accessibilité par défaut** : contraste AA minimum, tailles de police ≥ 16px,
   cibles tactiles ≥ 44px, navigation clavier complète, support lecteur d'écran.

## Palette de couleurs — « confiance officielle »

Bleu marine institutionnel en couleur de marque (rappelle les codes visuels des
services officiels français et des marques de confiance de l'administratif/juridique),
un bleu plus clair en accent, de l'or discret pour l'attention, et un vert dédié
exclusivement aux états validés.

| Rôle | Couleur | Usage |
|---|---|---|
| Primaire | `#0F2C59` (bleu marine) | CTA principaux, marque, bandeaux de confiance |
| Primaire clair | `#E8EDF6` | Fonds de cartes, surfaces primaires douces |
| Primaire foncé | `#081A38` | États hover/actifs |
| Fond principal | `#F7F7F5` (gris clair neutre) | Fond d'application |
| Texte principal | `#14181F` | Texte de contenu |
| Texte secondaire | `#5B6270` | Métadonnées, aide contextuelle |
| Accent | `#1D5FD6` | Liens, informations neutres, badges secondaires |
| Attention | `#9C6B00` (or) | Action requise, échéance proche — jamais rouge |
| Succès | `#0F7A4C` (vert) | Dossier terminé / validé — couleur réservée à cet usage |
| Erreur critique | `#B91C1C` (rouge) | Blocage réel uniquement, très faible fréquence |
| Or (accent premium) | `#B8860B` | Badges de confiance, éléments distinctifs ponctuels |

Les teintes « pleines » sont réservées au texte et aux icônes ; les fonds de
badges/cartes utilisent systématiquement ces mêmes couleurs à faible opacité
(10-15 %) pour garder un fond globalement neutre.

## Typographie

- **Titres** : empilement serif natif (`ui-serif, Georgia, Cambria, "Times New
  Roman", Times, serif`) — registre éditorial/officiel, sans dépendance à une
  webfont chargée en réseau (fiabilité de build). Une police serif sous licence
  (ex. Source Serif 4, Lora) pourra la remplacer en production.
- **Corps et interface** : sans-serif (Inter / système), pour la lisibilité au
  quotidien.
- Échelle : 34/24/18/16/14px (titre écran / titre section / corps large / corps / méta).
- Line-height généreux (1.5+) pour le confort de lecture des explications.

## Photographie

La landing page réserve des emplacements dédiés à de vraies photographies
(personnes, situations de vie) — pattern central chez les marques de confiance de
l'administratif. Tant qu'aucune photo sous licence n'est disponible, ces emplacements
utilisent un habillage graphique de substitution (`.official-photo-placeholder`,
dégradé marine + trame de points) plutôt qu'une image cassée ou un visuel générique
non pertinent. Voir le README pour la procédure de remplacement par une vraie photo.

## Composants clés

- **`StatusPill`** : pastille de statut de dossier (`À compléter`, `Prêt à envoyer`,
  `Envoyé`, `En cours`, `Action requise`, `Terminé`) — couleur + libellé en langage
  clair, jamais de code administratif brut.
- **`DossierCard`** : carte résumant un dossier (démarche, organisme, statut,
  prochaine échéance, une seule action possible).
- **`Timeline`** : frise verticale des événements d'un dossier, en langage humain
  (« On a envoyé votre dossier à la CAF » plutôt que « Statut : SUBMITTED »).
- **`TodayDigest`** : bloc d'accueil du tableau de bord, résume en 1-2 phrases l'état
  général (« Tout est sous contrôle » / « Une action vous attend, ça prend 2 min »).
- **`ProgressSteps`** : indicateur d'étapes pour l'onboarding et les mini-formulaires
  (jamais plus de 4-5 étapes visibles).
- **`ZenState`** : état positif quand il n'y a rien à faire — un « rien à faire » doit
  être visuellement agréable, pas vide et inquiétant.
- **`DocumentTile`** : vignette de document du coffre-fort avec type détecté,
  expiration éventuelle, statut de validité.
- **`AssistantBubble`** : bulle de chat de l'assistant, ton chaleureux, réponses
  courtes avec option « en savoir plus ».

## Ton des micro-copies (exemples)

| Situation | À éviter | Sérénio |
|---|---|---|
| Dossier en attente admin | « Statut : PENDING » | « C'est entre les mains de la CAF, on vérifie chaque jour pour vous. » |
| Pièce manquante | « Erreur : document requis » | « Il manque une pièce, ça prend 30 secondes à ajouter. » |
| Rien à faire | (rien affiché) | « Rien à faire aujourd'hui. On garde un œil sur tout. » |
| Échéance proche | « ATTENTION : DATE LIMITE J-5 » | « Ton titre de séjour approche de son échéance, on t'a préparé le dossier. » |

## Structure de la landing page (référence Boundless)

Header sobre → hero avec preuve de confiance + emplacement photo → bandeau des
organismes couverts (preuve de pertinence, pas de faux logos presse) → bandeau de
chiffres produit honnêtes (pas de fausses statistiques d'usage) → « comment ça marche »
→ scénarios illustratifs explicitement annoncés comme non-témoignages → FAQ → CTA final
→ footer avec badges de confiance (sécurité, hébergement, RGPD). Voir
`src/app/page.tsx`.

## Grille & layout

- Web/app : conteneur central max `680px` pour les écrans de contenu/dossier (lecture
  confortable, pas de mur d'information), `1120px` pour la landing marketing.
- Mobile-first : toutes les interactions clés doivent être réalisables au pouce, en une
  main.
