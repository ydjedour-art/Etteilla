# 01 — Vision produit

## Le problème

L'administratif français est une charge mentale continue : formulaires épars, jargon
technique, délais flous, pièces justificatives introuvables, relances qui se perdent,
peur de « mal faire » ou d'oublier une échéance qui a des conséquences réelles
(suspension d'allocations, retard de titre de séjour, pénalités fiscales...).

Cette charge touche particulièrement :
- Les **expatriés / primo-arrivants**, qui découvrent un système opaque sans réseau familial pour les aider.
- Les **actifs surchargés** (parents, aidants, indépendants) qui n'ont ni le temps ni l'énergie de suivre 5 organismes en parallèle.
- Toute personne en **fatigue ou détresse psychologique**, pour qui une lettre de la CAF peut déclencher une spirale d'anxiété disproportionnée.

Les outils existants (sites des organismes, agrégateurs de documents, simples
« to-do list ») résolvent au mieux un bout du problème : ils **informent**, mais ne
**déchargent** jamais vraiment l'utilisateur. La charge mentale reste entière — c'est
l'utilisateur qui doit rester vigilant, comprendre, agir et vérifier.

## Marché cible

La cible n'est pas un segment de niche : c'est **quiconque ressent de la phobie
administrative** — de la simple flemme chronique à l'angoisse paralysante face à un
courrier officiel. C'est un trait quasi universel en France (un très grand marché),
pas une caractéristique propre aux seuls expatriés ou indépendants. Les personas
détaillés dans `02-personas-et-parcours.md` (Léa, Karim, Nadia, Thomas) sont des
**points d'entrée illustratifs** dans ce marché — pas un plafond de segmentation.
Le produit vise, à terme, **tous les actes administratifs** qu'un particulier peut
avoir à accomplir en France, pas uniquement le périmètre de lancement (voir
`03-fonctionnalites-mvp.md` pour le phasage réaliste de cette ambition).

## La promesse

> **« On s'occupe de ton administratif. Toi, tu vis. »**

Sérénio n'est pas un énième tableau de bord de tâches administratives. C'est un
**filet de sécurité mental** : l'utilisateur délègue la vigilance, la compréhension du
jargon et — dès que possible — l'exécution elle-même. Sérénio porte la charge
cognitive ; l'utilisateur garde la main sur les décisions qui l'engagent, sans avoir à
tout piloter.

## Principes produit

1. **Un seul filet, pas dix apps.** Toutes les démarches (CAF, impôts, URSSAF,
   préfecture, CPAM, mutuelle, changement d'adresse...) vivent au même endroit, avec le
   même langage et la même logique.
2. **On décrit, on ne cherche pas.** L'utilisateur n'a jamais à savoir dans quel
   organisme ranger son problème ni où cliquer dans un catalogue : il décrit sa
   situation en une phrase, l'assistant IA détecte la démarche concernée et ne demande
   que les pièces effectivement manquantes — jamais une liste générique. Le catalogue
   par organisme reste disponible en secours, pas comme point d'entrée principal.
3. **Zéro jargon.** Chaque terme administratif est traduit en langage humain
   (« Quotient familial » → « Ce chiffre sert à calculer vos aides, on le met à jour pour
   vous »).
4. **Le silence est une fonctionnalité.** Tant qu'aucune action n'est requise de
   l'utilisateur, l'app ne le sollicite pas. Pas de notifications anxiogènes « au cas
   où » : uniquement ce qui compte, quand ça compte.
5. **Toujours dire où on en est.** Une angoisse fréquente est le doute (« est-ce que
   c'est parti ? est-ce que c'est bon ? »). Chaque dossier affiche un statut clair et
   rassurant à tout moment.
6. **Une action à la fois.** Jamais plus d'une décision demandée par écran. Pas de
   formulaires à 40 champs : des questions courtes, une par une, avec pré-remplissage
   dès que l'information est déjà connue.
7. **La démarche s'intègre à la fin du parcours, jamais en travers.** L'utilisateur ne
   « fait » pas une démarche : il répond à quelques questions en fin de flux (ex. après
   avoir signalé un déménagement) et Sérénio orchestre tout le reste en tâche de fond.
8. **Progressive disclosure du contrôle.** Court terme : Sérénio guide et pré-remplit,
   l'utilisateur valide et transmet. Moyen terme : avec mandat explicite — généré
   automatiquement dès qu'il est nécessaire, révocable à tout moment — Sérénio soumet
   et suit à la place de l'utilisateur (voir `08-securite-rgpd.md`).

## Ton de voix

- Chaleureux, jamais infantilisant. On parle à un adulte fatigué, pas à un enfant.
- Phrases courtes, verbes d'action, pas de conditionnel anxiogène.
- On assume l'émotion (« On sait que ce courrier de la CAF fait peur. On l'a lu pour
  vous, tout va bien. ») sans être mièvre.
- Jamais de culpabilisation (« Vous avez oublié... » → « On a repéré une échéance, on
  s'en charge. »).

## Positionnement strict (contrainte, pas un choix)

Sérénio fait de l'**assistance et de l'accompagnement administratif uniquement** —
jamais du conseil juridique, fiscal ou comptable réglementé. Cette limite est
structurelle, pas une omission temporaire : c'est elle qui rend le mandat de
représentation (articles 1984 et suivants du Code civil) et le modèle « legal by
design » tenables. Concrètement :

- Pas de conseil individualisé engageant la responsabilité juridique de Sérénio
  au-delà de l'exécution du mandat donné pour une démarche précise.
- Pas de contentieux complexe (litiges, recours devant un tribunal) en MVP —
  redirection vers des partenaires spécialisés (avocats, experts-comptables).
- Bascule automatique en mode pilotage dès qu'une démarche exige légalement l'action
  personnelle de l'utilisateur (ex. authentification FranceConnect) — jamais de
  contournement.

## Non-objectifs (pour l'instant)

- Ne pas viser l'exhaustivité du catalogue de démarches dès le lancement : mieux vaut
  10 démarches impeccables que 100 approximatives (voir `03-fonctionnalites-mvp.md`).
