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

## La promesse

> **« On s'occupe de ton administratif. Toi, tu vis. »**

AdminZen n'est pas un énième tableau de bord de tâches administratives. C'est un
**filet de sécurité mental** : l'utilisateur délègue la vigilance, la compréhension du
jargon et — dès que possible — l'exécution elle-même. AdminZen porte la charge
cognitive ; l'utilisateur garde la main sur les décisions qui l'engagent, sans avoir à
tout piloter.

## Principes produit

1. **Un seul filet, pas dix apps.** Toutes les démarches (CAF, impôts, URSSAF,
   préfecture, CPAM, mutuelle, changement d'adresse...) vivent au même endroit, avec le
   même langage et la même logique.
2. **Zéro jargon.** Chaque terme administratif est traduit en langage humain
   (« Quotient familial » → « Ce chiffre sert à calculer vos aides, on le met à jour pour
   vous »).
3. **Le silence est une fonctionnalité.** Tant qu'aucune action n'est requise de
   l'utilisateur, l'app ne le sollicite pas. Pas de notifications anxiogènes « au cas
   où » : uniquement ce qui compte, quand ça compte.
4. **Toujours dire où on en est.** Une angoisse fréquente est le doute (« est-ce que
   c'est parti ? est-ce que c'est bon ? »). Chaque dossier affiche un statut clair et
   rassurant à tout moment.
5. **Une action à la fois.** Jamais plus d'une décision demandée par écran. Pas de
   formulaires à 40 champs : des questions courtes, une par une, avec pré-remplissage
   dès que l'information est déjà connue.
6. **La démarche s'intègre à la fin du parcours, jamais en travers.** L'utilisateur ne
   « fait » pas une démarche : il répond à quelques questions en fin de flux (ex. après
   avoir signalé un déménagement) et AdminZen orchestre tout le reste en tâche de fond.
7. **Progressive disclosure du contrôle.** Court terme : AdminZen guide et pré-remplit,
   l'utilisateur valide et transmet. Moyen terme : avec mandat explicite, AdminZen
   soumet et suit à la place de l'utilisateur (voir `08-securite-rgpd.md`).

## Ton de voix

- Chaleureux, jamais infantilisant. On parle à un adulte fatigué, pas à un enfant.
- Phrases courtes, verbes d'action, pas de conditionnel anxiogène.
- On assume l'émotion (« On sait que ce courrier de la CAF fait peur. On l'a lu pour
  vous, tout va bien. ») sans être mièvre.
- Jamais de culpabilisation (« Vous avez oublié... » → « On a repéré une échéance, on
  s'en charge. »).

## Non-objectifs (pour l'instant)

- Ne pas devenir un cabinet de conseil fiscal/juridique personnalisé (pas de conseil
  individualisé engageant la responsabilité juridique d'AdminZen au-delà de
  l'exécution mandatée).
- Ne pas couvrir le contentieux complexe (litiges, recours devant un tribunal) en MVP —
  redirection vers des partenaires spécialisés.
- Ne pas viser l'exhaustivité du catalogue de démarches dès le lancement : mieux vaut
  10 démarches impeccables que 100 approximatives (voir `03-fonctionnalites-mvp.md`).
