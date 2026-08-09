# 08 — Sécurité & RGPD

AdminZen traite des données parmi les plus sensibles qui soient à l'échelle
individuelle : pièces d'identité, titres de séjour, avis d'imposition, informations de
santé indirectes (CPAM), situation familiale et financière. La confiance est la
condition d'existence du produit — un incident de sécurité serait fatal à la
promesse « on s'occupe de tout, en sécurité ».

## Classification des données

| Niveau | Exemples | Traitement |
|---|---|---|
| Critique | Titre de séjour, CNI/passeport, avis d'imposition, RIB | Chiffrement au repos (AES-256) + en transit (TLS 1.3), chiffrement applicatif supplémentaire pour les fichiers, accès strictement journalisé |
| Sensible | Situation familiale, adresse, statut professionnel | Chiffrement au repos, accès limité au périmètre fonctionnel nécessaire |
| Standard | Préférences de notification, langue | Chiffrement au repos standard |

## Principes RGPD

- **Minimisation** : on ne collecte que ce qui est nécessaire à la démarche en cours ;
  pas de champ « au cas où ».
- **Finalité explicite** : chaque document/donnée demandé(e) est accompagné(e) de la
  raison (« On a besoin de votre avis d'imposition pour mettre à jour votre quotient
  familial CAF »).
- **Consentement granulaire** : le consentement au traitement est distinct par usage
  (stockage coffre-fort ≠ soumission automatisée en son nom) — voir `Mandate` dans le
  modèle de données.
- **Droit à l'oubli** : suppression de compte = suppression effective des documents et
  données personnelles sous 30 jours, sauf obligations légales de conservation
  (ex. justificatifs fiscaux à durée légale) explicitement signalées à l'utilisateur.
- **Portabilité** : export complet des données et documents en un clic.
- **Résidence des données** : hébergement en France/UE (voir `04-architecture-technique.md`).
- **Durée de conservation** : par défaut alignée sur la durée légale de conservation
  propre à chaque type de document (ex. avis d'imposition : durée réglementaire),
  purge automatique au-delà sauf action utilisateur explicite.

## Le mandat de représentation (`Mandate`)

Dès qu'AdminZen agit *pour* l'utilisateur (soumission par un concierge humain ou une
intégration automatisée), un mandat explicite et daté est requis :
- Libellé clair de ce qui est délégué, démarche par démarche (pas un mandat global
  implicite).
- Révocable à tout moment depuis le profil, avec effet immédiat sur les dossiers en
  cours (retour en mode « guidé », l'utilisateur reprend la main).
- Historique conservé (traçabilité) : qui a soumis quoi, quand, sur la base de quel
  mandat.

## Contrôle d'accès interne (back-office concierge)

- Accès des agents concierge **limité au strict nécessaire par dossier assigné**
  (pas d'accès libre à toute la base utilisateurs).
- Toute consultation d'un document sensible par un agent est journalisée
  (`AuditLog` : agent, document, dossier, horodatage, action).
- Authentification renforcée pour les comptes internes (MFA obligatoire).
- Formation et engagement de confidentialité contractuel pour tout agent concierge.

## Sécurité applicative

- Chiffrement des documents avant écriture dans l'object storage (clé gérée via un
  service de gestion de clés dédié, jamais en clair dans le code ou la base).
- Authentification utilisateur : email + code à usage unique en V1 (pas de mot de
  passe stocké côté produit), 2FA disponible, migration vers FranceConnect en V1.5
  pour l'identité vérifiée.
- Revue de sécurité (a minima OWASP Top 10) avant toute mise en production, puis à
  chaque évolution majeure du périmètre de données traitées.
- Plan de réponse à incident documenté (détection, confinement, notification CNIL
  sous 72h si applicable, communication utilisateur transparente).

## Registre de traitement (à formaliser avant lancement)

Avant la mise en production, formaliser (hors développement, avec un DPO/conseil
juridique) : le registre des traitements RGPD, l'analyse d'impact (AIPD/DPIA) compte
tenu du volume de données sensibles traitées, et les mentions légales/CGU couvrant
explicitement le mandat de représentation administrative.
