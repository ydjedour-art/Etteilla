# 06 — Modèle de données cible

Le schéma complet et exécutable se trouve dans [`prisma/schema.prisma`](../prisma/schema.prisma).
Ce document en donne la lecture fonctionnelle.

## Entités principales

### `User`
Le titulaire du compte. Peut gérer d'autres `Profile` que le sien (cas de Nadia,
aidante). Contient les informations d'authentification et de préférences (canal de
notification, langue, forfait).

### `Profile`
Une personne pour laquelle des démarches sont suivies (soi-même par défaut, ou un
proche aidé). Séparer `User` (qui se connecte) de `Profile` (pour qui on agit) permet
le multi-profils sans dupliquer les comptes.

### `Document`
Une pièce dans le coffre-fort : type détecté (CNI, titre de séjour, avis
d'imposition, RIB, justificatif de domicile...), référence chiffrée vers l'object
storage, date d'expiration éventuelle, statut de validité, `profileId` propriétaire.

### `FormalityTemplate`
Un type de démarche du catalogue (ex. « Renouvellement titre de séjour ») :
description en langage clair, organisme, catégorie, récurrence, liste des pièces
requises, étapes types, niveau d'automatisation possible. Contenu géré par l'équipe
produit/contenu, indépendant du code.

### `Dossier`
Une instance de démarche pour un `Profile` donné, créée à partir d'un
`FormalityTemplate`. Porte le statut courant, l'échéance, le forfait de délégation
appliqué, l'agent concierge assigné le cas échéant, et la liste des documents
associés.

### `TimelineEvent`
Chaque événement de la vie d'un `Dossier` (créé, pièce ajoutée, soumis, mise à jour
administration, terminé...), avec un message en langage humain et l'acteur à
l'origine (système / utilisateur / concierge / assistant IA).

### `Notification`
Rappel ou alerte programmé(e), lié(e) ou non à un `Dossier`, avec règle
d'anticipation et canal choisi par l'utilisateur.

### `Message`
Échange de l'assistant conversationnel (ou du concierge) avec l'utilisateur,
éventuellement rattaché à un `Dossier` pour contexte.

### `Mandate`
Le mandat de représentation explicite accordé par l'utilisateur pour que Sérénio (via
un agent concierge ou une intégration automatisée) agisse en son nom sur une démarche
donnée — pièce centrale de la conformité (voir `08-securite-rgpd.md`).

### `Subscription`
L'état d'abonnement de l'utilisateur (`aucun` / `serenite`), utilisé
pour déterminer le niveau de délégation disponible par démarche.

### `ConciergeAgent`
Compte interne d'un opérateur humain du back-office, avec ses dossiers assignés.

### `AuditLog`
Trace immuable de tout accès à une donnée sensible (qui, quand, quel document/dossier,
quelle action) — exigence RGPD et confiance utilisateur.

## Relations clés

```
User 1—N Profile
Profile 1—N Document
Profile 1—N Dossier
FormalityTemplate 1—N Dossier
Dossier 1—N TimelineEvent
Dossier 1—N Message
Dossier 0..1—1 Mandate
Dossier N—1 ConciergeAgent (optionnel)
User 1—1 Subscription
User/Dossier/Document → N AuditLog
```

## États d'un `Dossier` (statut)

```
a_demarrer → infos_manquantes → pret_a_soumettre → soumis
   → en_attente_administration → action_requise (branche possible, retour utilisateur)
   → termine
   (branche possible à tout moment : refuse, avec raison + prochaine étape suggérée)
```

Chaque transition génère un `TimelineEvent` et, si pertinent, une `Notification`.
