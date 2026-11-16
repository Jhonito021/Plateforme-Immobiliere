# Contexte du projet : Plateforme de location immobilière

> Ce fichier explique **ce qu'on construit, pourquoi, et comment on travaille ensemble**.
> Le détail fonctionnel est dans le cahier des charges **v2.0** (document de référence).
> En cas de contradiction, le cahier des charges v2.0 l'emporte. Ne pas utiliser l'ancienne version (`cahier-des-charges-plateforme-location-immobiliere.md`) : elle contenait des éléments désormais exclus.

---

## 1. Le projet en bref

- **Type** : projet de génie logiciel réalisé par une **équipe de 4 étudiants**.
- **Quoi** : une plateforme web de **location immobilière**.
- **Pourquoi** : faciliter la **recherche de logements** et la **mise en relation entre locataires et propriétaires**, avec un espace d'administration pour garder la plateforme fiable (vérification, modération, lutte contre les arnaques).
- **Ce que ce n'est pas** : un logiciel complet de gestion d'agence immobilière.

## 2. Utilisateurs

| Rôle | Ce qu'il fait |
|---|---|
| **Locataire** | Cherche un logement, consulte les annonces, met en favoris, contacte le propriétaire, demande une visite, évalue un propriétaire (si admissible) |
| **Propriétaire** | Publie et gère ses annonces et leur disponibilité, répond aux contacts et demandes de visite |
| **Administrateur** | Vérifie les propriétaires et les annonces, modère comptes/annonces/signalements, consulte les actions sensibles |

## 3. Périmètre du MVP

Le MVP (version minimale utilisable) contient :

- Recherche de logements avec filtres pertinents
- Publication et gestion des annonces par les propriétaires (photos, description, infos du logement, prix, localisation, disponibilité)
- Consultation détaillée d'une annonce
- Favoris
- Contact du propriétaire et demandes de visite
- Gestion de la disponibilité
- Administration des annonces et des utilisateurs
- Vérification des propriétaires et des annonces, signalement des annonces et utilisateurs, prévention des arnaques, validation et modération par un administrateur
- Contrôle d'accès selon les rôles, protection des données, journalisation des actions sensibles
- Évaluation d'un propriétaire (note + commentaire) par un **locataire admissible**

## 4. Exclusions (à ne jamais ajouter)

Ces éléments ne sont **ni dans le MVP, ni des options à court terme**. Ne pas les coder, ne pas les prévoir dans la structure, ne pas les proposer :

- Noter, classer ou commenter les **locataires** (seuls les propriétaires sont évaluables)
- Génération de contrats
- Paiement en ligne, dépôt de garantie, reçus, historique de transactions
- Recommandations par IA
- Visite virtuelle 3D

## 5. Options (hors MVP, uniquement si le MVP est terminé)

Recherche cartographique, comparaison de logements, notifications, réservation, avis complémentaires.
Elles restent **séparées du MVP** et ne doivent pas ralentir sa livraison.

## 6. Choix techniques

- Le cahier des charges **n'impose aucune technologie** : l'équipe décide.
- **Pas encore tranché.** Pistes envisagées : front **Angular ou React**, back **Spring Boot**, base **PostgreSQL**, **PWA** (site web installable, utilisable comme une appli mobile) pour la partie mobile.
- Souhait : une architecture **adaptable** (par exemple un monolithe modulaire, c'est-à-dire une seule application découpée en modules clairs). À clarifier avec l'équipe.
- ⚠️ Ne pas figer ces choix sans accord explicite de Mathieu.

## 7. État d'avancement

- ✅ Cahier des charges **v2.0** rédigé (en français).
- ⏳ En attente de la **validation** de Mathieu avant le découpage en sprints.
- ⬜ Découpage en sprints : pas encore fait.
- ⬜ Choix de la stack : pas encore fait.

## 8. Comment travailler avec Mathieu (important)

**Niveau** : Mathieu est **débutant en développement**.
- Expliquer simplement, définir chaque terme technique utilisé.
- Phrases courtes, pas de gros blocs de texte, pas de détails inutiles pour l'étape en cours.
- Si utile : un **petit schéma** et un **exemple concret**.

**Méthode : sprints, un seul à la fois**
- Pour chaque sprint, indiquer : **objectif**, **tâches prévues**, **résultat attendu**.
- À la fin d'un sprint : résumer **ce qui est fait** et **ce qui reste**, puis **demander la validation**.
- **Ne pas commencer le sprint suivant sans validation explicite.** Une question ou un commentaire n'est pas une validation.

**Règles de conduite**
- Ne pas changer le périmètre, les choix déjà validés ou l'ordre du workflow de sa propre initiative. Si une amélioration semble utile : l'expliquer brièvement et **attendre l'accord**.
- Si une information importante manque : poser **une question courte** avant de décider quelque chose qui pourrait changer le projet.
- Si un problème ou un risque apparaît : le signaler clairement et proposer une solution simple.
- Guider Mathieu **sans décider à sa place**.

**Format de réponse souhaité**
1. **Objectif** : ce qu'on cherche à accomplir
2. **Étapes** : les actions, dans l'ordre
3. **Explication** : simple et concise
4. **À valider** : une question claire si une décision est nécessaire

**Langue** : tout en français (échanges, commentaires utiles, documentation).

## 9. Première demande à Claude Code

1. Lire le cahier des charges v2.0 et ce fichier.
2. Résumer en quelques lignes ce qu'il a compris (objectif, MVP, exclusions).
3. Ne **rien coder** et ne pas choisir de technologie tant que Mathieu n'a pas validé le découpage en sprints.
