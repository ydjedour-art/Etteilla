# 02 — Personas et parcours utilisateurs

## Segments prioritaires (land and expand)

Le marché cible est universel (voir `01-vision-produit.md`), mais le lancement suit une
séquence délibérée plutôt qu'un ciblage simultané de tout le monde :

1. **Aidants familiaux** — la charge la plus lourde (plusieurs profils, plusieurs
   organismes), donc la valeur perçue la plus immédiate.
2. **Nouveaux arrivants / titres de séjour / naturalisation** — la plus forte anxiété,
   les enjeux juridiques les plus élevés en cas d'erreur.
3. **Primo-actifs et jeunes familles** — volume élevé de démarches déclenchées par les
   événements de vie (premier emploi, naissance, déménagement).
4. **Seniors / passage à la retraite** — démarches à fort non-recours (ASPA,
   complémentaire santé solidaire), publics souvent les moins à l'aise avec le
   numérique.
5. **Extension progressive à l'ensemble des particuliers.**

Les personas ci-dessous illustrent les segments 1 à 3 ; un persona senior sera
formalisé avant l'attaque du segment 4.

## Personas

### 🧳 Léa, 29 ans — Expatriée fraîchement arrivée
Vient d'emménager à Lyon pour un CDI. Ne comprend ni le vocabulaire (CAF, CPAM, RIB,
avis d'imposition) ni les délais. A peur de faire une erreur qui compromette son titre
de séjour. Cherche avant tout de la **clarté** et de la **réassurance**.

### 👨‍💻 Karim, 34 ans — Indépendant (micro-entrepreneur)
Développeur freelance. Doit gérer URSSAF, déclarations trimestrielles, impôts, et n'a
« pas le temps de penser à ça ». Veut que ça soit **fait**, pas juste rappelé. Prêt à
payer pour déléguer complètement.

### 👵 Nadia, 51 ans — Aidante familiale
Gère l'administratif de sa mère âgée (APA, mutuelle, CPAM) en plus du sien et de sa
famille. Jongle entre plusieurs dossiers pour plusieurs personnes. A besoin de
**multi-profils** et de ne rien laisser passer entre deux échéances.

### 🧑 Thomas, 38 ans — Français « lambda » débordé
Salarié, deux enfants, déménagement récent. Pas dans l'urgence ni la détresse, juste
saturé mentalement par le nombre de petites démarches qui traînent (CAF à jour
d'adresse, mutuelle, carte grise...). Cherche à **alléger sa charge mentale au
quotidien**, pas à résoudre une crise.

Points communs : anxiété latente face à l'administratif, manque de temps/énergie,
besoin de confiance immédiate dans l'outil (sinon abandon), sensibilité forte à la
protection de leurs données personnelles (documents d'identité, avis d'imposition...).

## Parcours utilisateur — Onboarding

1. **Accroche** : « On s'occupe de ton administratif. Toi, tu vis. » + CTA unique
   « Je respire, on s'occupe de tout ».
2. **Situation de vie** (3-4 questions max, choix visuels) : statut (salarié /
   indépendant / étudiant / sans emploi), situation familiale, résidence (français /
   étranger en France), événement récent (déménagement, naissance, changement de
   travail...).
3. **Sérénio détecte les démarches pertinentes** et les affiche sous forme de cartes
   pré-cochées, éditables (« On a repéré 3 démarches qui vous concernent »).
4. **Création de compte** (email ou FranceConnect — voir `08-securite-rgpd.md`) — la
   dernière étape, jamais la première, pour ne pas créer de friction avant d'avoir
   montré la valeur.
5. **Premier écran d'accueil** : déjà rempli avec les démarches détectées, statut clair,
   aucune action urgente affichée si rien n'est urgent (« Tout est sous contrôle. »).

Durée cible : **< 2 minutes**, zéro champ de formulaire administratif classique.

## Parcours utilisateur — Traiter une démarche (ex. renouvellement titre de séjour)

1. Sérénio détecte l'échéance (date de fin de validité connue) **avant** que
   l'utilisateur n'y pense, et crée le dossier automatiquement en amont du délai légal.
2. Notification unique, non-anxiogène : « Ton titre de séjour arrive à échéance dans 4
   mois. On a préparé ton dossier, il te reste 2 minutes. »
3. L'utilisateur répond à quelques questions ciblées (uniquement ce qui n'est pas déjà
   connu) et importe/confirme les pièces manquantes depuis le coffre-fort ou son
   téléphone (photo).
4. Sérénio assemble le dossier, vérifie sa complétude (checklist automatique), et
   selon le mandat accordé : (a) le pré-remplit pour validation utilisateur, ou (b) le
   soumet directement pour le compte de l'utilisateur.
5. Suivi : statut affiché en permanence (`À compléter` → `Prêt à envoyer` → `Envoyé` →
   `En cours de traitement` → `Terminé`), avec traduction en langage humain de chaque
   étape officielle.
6. Clôture rassurante : « C'est fait. Rien à faire jusqu'au prochain renouvellement,
   dans 4 ans — on s'en occupera. »

## Parcours utilisateur — « Vie quotidienne » (Thomas / événement type déménagement)

Le principe clé : **la démarche se glisse à la fin d'un autre parcours**, jamais en
frontal. Exemple : Thomas met à jour son adresse dans son profil (action déjà motivée,
pas administrative en soi) → Sérénio lui propose en fin de flux : « Votre adresse a
changé. On met à jour la CAF, les impôts et votre mutuelle pour vous — vous confirmez ? »
→ un seul tap, trois démarches déclenchées.

## Métriques d'expérience à suivre (indicatives)

- Temps moyen jusqu'à la 1ère démarche complétée.
- % de dossiers complétés sans relance manuelle de l'utilisateur.
- Score d'anxiété perçue avant/après (mesuré par sondage in-app, pas une métrique
  technique mais un signal produit central).
- Taux de dossiers en statut « action requise » restés bloqués > 7 jours (signal
  d'échec de la promesse « on s'en occupe »).
