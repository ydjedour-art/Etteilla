# 05 — Design system & principes UX/UI

## Principes directeurs

Le public cible est fatigué, parfois anxieux. Le design doit **abaisser** la charge
cognitive et émotionnelle à chaque écran :

1. **Calme visuel** : beaucoup d'espace blanc, peu d'éléments par écran, hiérarchie
   typographique nette.
2. **Une seule action primaire par écran.** Les actions secondaires sont visuellement
   discrètes.
3. **Feedback constant et rassurant.** Aucun écran ne doit laisser l'utilisateur dans
   le doute sur « est-ce que ça a marché ? ».
4. **Pas de rouge agressif.** Les états d'alerte utilisent un ambre chaud, jamais un
   rouge d'urgence médicale — sauf action réellement bloquante à très court délai.
5. **Micro-copy > iconographie seule.** Chaque icône est accompagnée d'un texte clair.
6. **Accessibilité par défaut** : contraste AA minimum, tailles de police ≥ 16px,
   cibles tactiles ≥ 44px, navigation clavier complète, support lecteur d'écran.

## Palette de couleurs

| Rôle | Couleur | Usage |
|---|---|---|
| Primaire | `#2F6B5E` (sauge profond) | CTA principaux, éléments de marque |
| Primaire clair | `#E8F2EE` | Fonds de cartes, surfaces primaires douces |
| Fond principal | `#FBFAF7` (blanc cassé chaud) | Fond d'application |
| Texte principal | `#1F2A27` | Texte de contenu |
| Texte secondaire | `#5B6B66` | Métadonnées, aide contextuelle |
| Accent | `#3E7CB1` (bleu doux) | Liens, informations neutres |
| Attention | `#C98A3B` (ambre chaud) | Action requise, échéance proche — jamais rouge |
| Succès | `#2F6B5E` | Dossier terminé (réutilise le primaire : « c'est fait » = « c'est AdminZen ») |
| Erreur critique | `#B3543F` (terracotta, pas un rouge vif) | Blocage réel uniquement |

## Typographie

- Police : humanist sans-serif arrondie (ex. **Inter** ou **General Sans**), lisible et
  chaleureuse, jamais géométrique/froide.
- Échelle : 34/24/18/16/14px (titre écran / titre section / corps large / corps / méta).
- Line-height généreux (1.5+) pour le confort de lecture des explications.

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
- **`EmptyState` / `ZenState`** : illustration douce + message positif quand il n'y a
  rien à faire — un « rien à faire » doit être visuellement agréable, pas vide et
  inquiétant.
- **`DocumentTile`** : vignette de document du coffre-fort avec type détecté,
  expiration éventuelle, statut de validité.
- **`AssistantBubble`** : bulle de chat de l'assistant, ton chaleureux, réponses
  courtes avec option « en savoir plus ».

## Ton des micro-copies (exemples)

| Situation | À éviter | AdminZen |
|---|---|---|
| Dossier en attente admin | « Statut : PENDING » | « C'est entre les mains de la CAF, on vérifie chaque jour pour vous. » |
| Pièce manquante | « Erreur : document requis » | « Il manque une pièce, ça prend 30 secondes à ajouter. » |
| Rien à faire | (rien affiché) | « Rien à faire aujourd'hui. On garde un œil sur tout. » |
| Échéance proche | « ATTENTION : DATE LIMITE J-5 » | « Ton titre de séjour approche de son échéance, on t'a préparé le dossier. » |

## Grille & layout

- Web/app : conteneur central max `680px` pour les écrans de contenu/dossier (lecture
  confortable, pas de mur d'information), `1120px` pour la landing marketing.
- Mobile-first : toutes les interactions clés doivent être réalisables au pouce, en une
  main.
