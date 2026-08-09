# 07 — Roadmap & jalons

## Phase 0 — Conception & préparation (ce dépôt)
- Vision, personas, périmètre fonctionnel MVP.
- Architecture technique cible et modèle de données.
- Design system et prototype cliquable (données simulées).
- **Sortie** : socle prêt pour qu'une équipe démarre l'implémentation back-end sans
  ambiguïté sur les contrats de données ni l'expérience cible.

## Phase 1 — MVP (objectif ~8-10 semaines avec une petite équipe)
- Authentification (email + OTP), onboarding, création de compte.
- Catalogue des 8 démarches prioritaires (contenu rédigé + structuré en base).
- Création/suivi de dossier, coffre-fort documents (upload + stockage chiffré),
  rappels d'échéances.
- Back-office concierge minimal (file de dossiers, mise à jour de statut manuelle).
- Assistant conversationnel V1 (RAG sur base de connaissance statique).
- Tarification à l'acte (identification gratuite → guidé → standard) et mode pilotage
  fonctionnel ; abonnement Sérénité en Phase 2.
- **Critère de sortie** : un utilisateur peut, de bout en bout, se faire accompagner
  sur au moins 3 démarches réelles avec suivi de statut fiable.

## Phase 2 — Automatisation & délégation complète (V1.5)
- Abonnement `Sérénité` : mandat de représentation + soumission par concierge pour
  toutes les démarches du catalogue, surveillance continue des échéances.
- Premières intégrations API officielles (FranceConnect identité, une démarche
  automatisée de bout en bout comme preuve de concept).
- Pré-remplissage automatique via OCR/extraction sur les documents du coffre-fort.
- Notifications proactives basées sur événements de vie (déménagement, naissance...).
- Multi-profils complet (aidants).

## Phase 3 — Extension & scale (V2)
- Élargissement du catalogue de démarches (déclinaisons régionales, cas spécifiques).
- Application mobile native si la traction PWA le justifie.
- Marketplace de partenaires spécialisés pour les cas hors périmètre.
- Extension d'intégrations API officielles à la majorité du catalogue.
- Internationalisation (au-delà du français, pour les profils expatriés multilingues).

## Jalons de validation produit (à chaque phase)

- Le score d'anxiété perçue (mesuré via sondage in-app) doit baisser mesurablement
  après le premier dossier traité, sinon la promesse produit n'est pas tenue —
  priorité sur toute autre métrique de croissance.
- Aucun dossier ne doit rester en statut « action requise » sans notification claire
  plus de 48h (SLA interne, mesuré en continu dès la Phase 1).
