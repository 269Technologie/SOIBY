# Rapport d'activité — Lundi 9 novembre 2026

**Projet :** SOIBY — Site vitrine (React, Vite, Tailwind)
**Auteur :** Henintsoa RAKOTOARIMANANA

---

## 1. Synthèse générale

La journée a été consacrée à la finalisation du site SOIBY :

- Refonte de la page d'accueil version web, calée sur la maquette 1671 × 941 px.
- Vidéo du héros toujours en lecture (web et mobile) et pied de page sur le deuxième écran, avec un pied de page web et mobile inspiré de celui de CSMC.
- Assistant « Créer mon site » : validation de l'éligibilité au forfait Site vitrine à 189 € HT et bascule vers une demande de devis personnalisé.
- Portfolio interactif des réalisations et prise de rendez-vous via Google Calendar.
- Recherche de noms de domaine : étude des API de `cloud-soiby`, puis intégration dans SOIBY (serveur + fenêtre de résultats).

**État du dépôt :** le commit `f9613180` (70 fichiers) est créé en local, signé `henintsoa10`. Le push vers `origin/main` n'est pas encore fait (aucun identifiant GitHub disponible dans l'environnement de travail).

---

## 2. Travaux réalisés

### 2.1. Page d'accueil version web (nouveaux fichiers `DesktopLanding.tsx`, `desktop.css`)

- Reconstruction de la page à partir de la maquette : chaque élément est positionné aux coordonnées mesurées dans l'image, police Ubuntu, échelle adaptée à la largeur et à la hauteur de la fenêtre.
- Images de fond extraites de la maquette, textes effacés (reconstitution du dégradé) : bandeau d'en-tête, équipe, FAQ ; les textes sont de vrais textes HTML.
- Calage mesuré par comparaison automatique avec la maquette : environ 50 textes alignés à 2 px près.
- Carrousel des réalisations (flèches, pastilles), pastilles FAQ avec réponse en bulle, fenêtre « Voir les 13 questions ».
- Correction d'un défaut de clic : des calques transparents de la taille de la page bloquaient les boutons ; ils laissent désormais passer les clics.
- Zone d'en-tête : cadre de la vidéo agrandi (245 → 310 px dans le repère de la maquette), texte à sa taille d'origine et sans chevauchement avec la vidéo.
- Pied de page rejeté sur le deuxième écran sur toutes les tailles de fenêtre testées.
- Ancienne version web retirée de `LandingMaquette.tsx` (toujours disponible dans l'historique Git).

### 2.2. Vidéo toujours en lecture (nouveau composant `AutoVideo.tsx`)

- Remplacement de la photo du héros web par `videos.mp4` ; sur mobile, `mobile.mp4` remplace le lecteur à commandes.
- Lecture automatique, muette, en boucle, sans commandes ; reprise automatique si le navigateur met la vidéo en pause.
- Image de secours conservée si la vidéo ne se charge pas.

### 2.3. Pied de page web et mobile (nouveau composant `SiteFooter.tsx`)

- Structure reprise du pied de page de la Caisse Solidarité Maladie (projet `solidarite`) : bandeau et réseaux sociaux, quatre colonnes, chiffres et engagements, mentions légales, copyright.
- Même composant sur le web et le mobile (deux colonnes sur mobile).
- « Contact » (menu web et nouveau lien du menu mobile) mène à la colonne Contact du pied de page.
- Aucune adresse postale ajoutée : elle n'existe pas dans le projet.

### 2.4. Assistant « Créer mon site » (`SiteWizard.tsx`)

- Maintien des 5 étapes des maquettes (Coordonnées, Activité, Projet, Besoins, Validation).
- Validation automatique de l'éligibilité :
  - projet Site vitrine : « Votre projet est compatible avec l'offre Site vitrine à 189 € HT. » ;
  - e-commerce, marketplace ou vente en ligne : « Votre projet nécessite une étude personnalisée. Demandez votre devis gratuit. ».
- En mode devis : bannière « Projet sur mesure / Sur devis », forfait « Devis personnalisé », bouton final « Demander mon devis », message adapté envoyé à l'équipe, sans commande au forfait.
- Le bouton « Demander un devis » de l'étape de validation bascule aussi vers cette demande (fonctionnalités spécifiques).
- Réduction du défilement sur le web (bandeau compact, champs resserrés) ; les écrans mobiles tiennent toujours sur un seul écran.

### 2.5. Portfolio interactif (`PortfolioModal.tsx`, `portfolio.ts`, `portfolio.css`)

- Un clic sur une réalisation ouvre une fenêtre dans le site : grande capture de la page, vignettes des autres pages, croix de fermeture, navigation au clavier et par flèches.
- 20 captures réalisées (4 pages pour chacune des 5 réalisations : WinEdge, Pilote360, Caisse Solidarité Maladie, Coontrool, SMSCovoit), après refus des bandeaux de cookies ; images optimisées (environ 2 Mo au total).
- Fonctionne sur le web et sur mobile (fenêtre en bas d'écran).

### 2.6. Prise de rendez-vous Google Calendar (`booking.ts`)

- Tous les boutons « Prendre rendez-vous » ouvrent la page de réservation Google Calendar définie par `VITE_GOOGLE_BOOKING_URL` ; sans lien, la fenêtre interne est conservée.
- Page de réservation de test créée dans l'agenda de `henintsoa.daxido@gmail.com` (« SOIBY – Test rendez-vous », créneaux d'1 h, du lundi au vendredi) ; lien renseigné dans `.env`.
- Le lien du compte `recruoff@gmail.com` reste à fournir pour la mise en production.

### 2.7. Recherche de noms de domaine

- Audit en lecture seule de `cloud-soiby` : la recherche de la page d'accueil utilise l'API Domain Name API (`apps/domains/dna.py`) ; l'ancienne recherche (page connectée) appelle Namecheap en bac à sable et renvoie des résultats simulés en cas d'erreur.
- Test réel de l'API en production : disponibilité et prix revenus correctement.
- Recherche intégrée dans SOIBY (10 nov.) : un champ « Rechercher un nom de domaine » (web et mobile) ouvre, à la validation, la fenêtre « Recherche et gestion de nom de domaine » (design de la maquette `Recherche_de_domaines_SOIBY.png`) avec la recherche déjà lancée ; disponibilité réelle pour .fr, .com, .net, .org, .info, prix de vente HT (14,90 € .fr, 12,90 € .com, 15,90 € .net, « Prix sur demande » sinon), boutons « Réserver ce domaine » / « Transférer mon domaine » qui ouvrent la prise de rendez-vous avec le besoin pré-rempli.
- Les clés de l'API restent côté serveur (`server/index.mjs`, port 3013, variables `DNA_*` du `.env`) ; 14 tests automatiques dans `server/domains.test.mjs` (`node --test server/*.test.mjs`).
- Les modifications faites par erreur dans `cloud-soiby` ont été annulées (retour à l'état d'origine) ; `Dockerfile`, `vite.config.ts`, `package.json` et `.gitignore` de SOIBY sont inchangés.

### 2.8. Divers

- FAQ déplacée dans un module partagé (`src/faq.ts`) entre le web et le mobile.
- Commit `f9613180` signé `henintsoa10 <henintsoa.daxido@gmail.com>` ; le fichier `.env` n'est volontairement pas inclus.

---

## 3. Tests et vérifications

- Vérification de type (`tsc --noEmit`) et build de production (`vite build`) réussis après chaque modification.
- Clics réels (souris) testés sur les boutons principaux : assistant, rendez-vous, carrousel, FAQ, portfolio, pied de page ; contrôle de 18 cibles pour s'assurer qu'aucune n'est recouverte.
- Pied de page sur le deuxième écran vérifié sur 9 tailles de fenêtre.
- Assistant : parcours « éligible » et « devis personnalisé » testés ; aucun débordement sur 3 tailles de téléphone.
- Lien de réservation vérifié en visiteur anonyme et par ouverture réelle depuis le bouton du site.
- Serveur de recherche de domaines : 14 tests automatiques réussis ; recherche vérifiée dans le navigateur (web et mobile) avec l'API réelle.

---

## 4. État d'avancement et points restants

| Élément                                              | État                                              |
|------------------------------------------------------|---------------------------------------------------|
| Page d'accueil web (maquette), vidéo, pied de page   | Terminé, commité localement                       |
| Assistant : éligibilité et devis personnalisé        | Terminé, commité localement                       |
| Portfolio interactif                                 | Terminé, commité localement                       |
| Rendez-vous Google Calendar                          | Opérationnel avec la page de test                 |
| Push vers `origin/main`                              | À faire (identifiants GitHub requis)              |
| Lien de réservation de `recruoff@gmail.com`          | À fournir puis à remplacer dans `.env`            |
| `.env` : clés de production de l'API de domaines     | Nécessaires à la recherche ; ne jamais commiter `.env` |
| Serveur API en production (`node server/index.mjs`)  | À déployer (aucun backend actuellement en production) |
| Pages Mentions légales et Politique de confidentialité | Liens vides, pages à créer                      |
| Adresse postale et liens des réseaux sociaux         | À renseigner                                      |
| Début de la vidéo du héros                           | Contient un titre propre à la vidéo, à raccourcir si besoin |

---

## 5. Conclusion

La page d'accueil web, l'assistant de commande, le portfolio et la prise de rendez-vous répondent au mini cahier des charges, à l'exception du déploiement du serveur de recherche de domaines et du lien de réservation définitif.

Prochaines étapes : pousser le commit, remplacer le lien de test par celui de `recruoff@gmail.com`, déployer le serveur de recherche, puis compléter les pages légales et les liens manquants.
