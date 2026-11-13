/**
 * Mentions légales et politique de confidentialité de soiby.fr.
 * Mêmes informations société que Coontrool (repo saaloo, src/i18n/translations.ts → legal), éditeur commun : SOIBY SAS.
 * Syntaxe : « \n » = retour à la ligne, [[libellé]](url) = lien, « **titre** » seul dans un paragraphe = sous-titre.
 */
export type LegalSection = { title: string; paragraphs: string[] };
export type LegalDoc = { id: LegalId; title: string; updated: string; sections: LegalSection[] };
export type LegalId = "mentions-legales" | "politique-confidentialite";

export const EMAIL = "contact@soiby.fr";
const MAIL = `[[${EMAIL}]](mailto:${EMAIL})`;
const SOCIETE = "SOIBY SAS\n21 place de la République\n75003 Paris, France\nSIRET : 990 593 469 00010\nRCS : 990 593 469\nTVA intracommunautaire : FR52990593469";

export const LEGAL: Record<LegalId, LegalDoc> = {
  "mentions-legales": {
    id: "mentions-legales",
    title: "Mentions légales",
    updated: "Dernière mise à jour : 13 novembre 2026",
    sections: [
      {
        title: "1. Éditeur du site",
        paragraphs: [
          `Le site soiby.fr, ainsi que les services et plateformes SOIBY, sont édités par :\nSOIBY SAS\nSociété par actions simplifiée au capital de 12 000 €\nSiège social : 21 place de la République, 75003 Paris, France\nSIRET : 990 593 469 00010\nRCS : 990 593 469\nN° TVA intracommunautaire : FR52990593469\nE-mail : ${MAIL}\nSite internet : soiby.fr`,
          "SOIBY SAS est un studio technologique et un éditeur de plateformes : création de sites web, d'applications et de plateformes sur mesure, noms de domaine, hébergement et services cloud (SOIBY Cloud). SOIBY SAS édite également la solution SaaS Coontrool.",
        ],
      },
      {
        title: "2. Directeur de la publication",
        paragraphs: ["Le directeur de la publication est le représentant légal de SOIBY SAS, Président de la société."],
      },
      {
        title: "3. Hébergement",
        paragraphs: [
          "Le site soiby.fr et les services associés sont hébergés et exploités par SOIBY SAS, dont le siège social est situé 21 place de la République, 75003 Paris, France.",
        ],
      },
      {
        title: "4. Propriété intellectuelle",
        paragraphs: [
          "L'ensemble des éléments composant le site SOIBY et ses services, notamment la marque, le nom de domaine, le logo, les interfaces, les éléments graphiques, les textes, les vidéos, les logiciels, l'architecture technique, les bases de données, les contenus et les fonctionnalités, est protégé par les dispositions applicables en matière de propriété intellectuelle. Ils sont la propriété de SOIBY SAS ou font l'objet de droits d'utilisation accordés à SOIBY SAS. Toute reproduction, représentation, adaptation, modification, distribution ou exploitation, totale ou partielle, sans autorisation préalable lorsqu'elle est requise, est interdite.",
          "Les réalisations présentées sur le site le sont avec l'accord des clients concernés ; leurs marques et contenus restent la propriété de leurs titulaires respectifs.",
        ],
      },
      {
        title: "5. Conditions contractuelles",
        paragraphs: [
          "Les prestations et services de SOIBY sont soumis aux documents contractuels applicables, notamment le devis accepté, les conditions générales de vente, les conditions d'utilisation des services en ligne (dont SOIBY Cloud), la Politique de confidentialité, le DPA lorsqu'il est applicable et les éventuelles conditions particulières.",
        ],
      },
      {
        title: "6. Données personnelles",
        paragraphs: [
          "SOIBY SAS accorde une importance particulière à la protection des données personnelles. Lorsque le RGPD est applicable, les traitements sont notamment fondés sur l'exécution du contrat, le respect d'une obligation légale, l'intérêt légitime ou le consentement lorsque celui-ci est requis.",
          "La [[Politique de confidentialité]](/politique-confidentialite) présente les catégories de données traitées, les finalités, les destinataires, les durées de conservation, les mesures de sécurité ainsi que les droits des personnes concernées.",
          `Contact données personnelles : SOIBY SAS — 21 place de la République, 75003 Paris, France — ${MAIL}`,
        ],
      },
      {
        title: "7. Cookies",
        paragraphs: [
          "Le site SOIBY et ses services peuvent utiliser des cookies et technologies similaires nécessaires au fonctionnement du service, à la sécurité, à la mesure d'audience ou à d'autres finalités. Lorsque le consentement est requis, celui-ci est recueilli conformément à la réglementation applicable.",
        ],
      },
      {
        title: "8. Responsabilité",
        paragraphs: [
          "SOIBY SAS s'efforce d'assurer l'exactitude et la mise à jour des informations publiées sur le site, sans pouvoir garantir l'absence d'erreurs ou d'omissions. Les tarifs et délais indiqués le sont à titre indicatif ; seul le devis accepté engage les parties.",
          "Le Client demeure responsable des contenus et données qu'il fournit ou publie au moyen des services SOIBY, de l'utilisation qu'en font ses utilisateurs et du respect des obligations qui lui sont applicables.",
        ],
      },
      {
        title: "9. Services tiers",
        paragraphs: [
          "Certaines fonctionnalités peuvent dépendre de services tiers, notamment pour les paiements, l'enregistrement des noms de domaine, l'hébergement, le cloud, la prise de rendez-vous, les notifications ou certains services techniques. Ces services peuvent être soumis à leurs propres conditions contractuelles et politiques de confidentialité.",
        ],
      },
      {
        title: "10. Paiements",
        paragraphs: [
          "Les prestations et abonnements SOIBY peuvent notamment être réglés par l'intermédiaire de prestataires de paiement tels que Stripe, ou de tout autre prestataire indiqué lors de la commande. Les informations bancaires sont principalement traitées par le prestataire de paiement concerné. SOIBY n'a pas vocation à conserver les données complètes de carte bancaire.",
        ],
      },
      {
        title: "11. Droit applicable",
        paragraphs: [
          "Les relations contractuelles sont régies par le droit français, sous réserve des dispositions impératives éventuellement applicables au Client dans son pays.",
        ],
      },
      {
        title: "12. Contact",
        paragraphs: [`${SOCIETE}\n${MAIL}\nSOIBY — Respirez, on s'occupe de tout !`],
      },
    ],
  },

  "politique-confidentialite": {
    id: "politique-confidentialite",
    title: "Politique de confidentialité",
    updated: "Dernière mise à jour : 13 novembre 2026",
    sections: [
      {
        title: "1. Identité du responsable",
        paragraphs: [
          `Le responsable des traitements réalisés pour les besoins propres de SOIBY est SOIBY SAS, au capital de 12 000 €, 21 place de la République, 75003 Paris, France, SIRET 990 593 469 00010. Site internet : soiby.fr. Contact relatif aux données personnelles : ${MAIL}. Lorsque la réglementation locale l'exige, un représentant ou un délégué à la protection des données pourra être désigné.`,
        ],
      },
      {
        title: "2. Quelles données collectons-nous ?",
        paragraphs: [
          "Selon votre utilisation du site et des services SOIBY, nous pouvons traiter notamment les catégories suivantes :",
          "**Données d'identification**",
          "Nom, prénom, adresse e-mail, numéro de téléphone, pays, informations relatives à l'entreprise.",
          "**Données relatives à votre projet**",
          "Informations transmises lors d'une demande de devis, d'une prise de rendez-vous ou de la configuration d'un site : type de projet, besoins, contenus, noms de domaine recherchés ou souhaités.",
          "**Données relatives au compte et aux commandes**",
          "Identifiant, informations de connexion à l'espace client SOIBY Cloud, services souscrits, historique des commandes, factures, informations nécessaires à la gestion des paiements. Les informations bancaires peuvent être traitées directement par notre prestataire de paiement. SOIBY n'a pas vocation à conserver les données complètes de carte bancaire.",
          "**Données relatives à l'utilisation des services**",
          "Données de connexion, adresse IP, informations relatives à l'appareil, journaux techniques, données nécessaires à la sécurité et à la prévention de la fraude.",
          "**Données hébergées pour le compte du client**",
          "Les sites, applications et plateformes réalisés ou hébergés par SOIBY peuvent contenir des données introduites par le client ou par ses propres utilisateurs. Pour ces traitements, le client demeure responsable du traitement et SOIBY agit en principe comme sous-traitant/prestataire technique.",
        ],
      },
      {
        title: "3. Pourquoi utilisons-nous vos données ?",
        paragraphs: [
          "Nous utilisons les données personnelles notamment pour :",
          "**Répondre à vos demandes**",
          "Traiter vos demandes de contact, de devis et de rendez-vous, vérifier la disponibilité des noms de domaine, préparer et suivre votre projet.",
          "**Fournir nos services**",
          "Concevoir, développer, mettre en ligne et maintenir vos sites, applications et plateformes, enregistrer et gérer vos noms de domaine, fournir l'hébergement et l'accès à SOIBY Cloud.",
          "**Gérer les commandes et la facturation**",
          "Établir les devis et factures, gérer les paiements, les renouvellements, les impayés, les suspensions et réactivations.",
          "**Assurer la sécurité**",
          "Sécuriser les comptes, détecter les activités anormales, prévenir la fraude, protéger les plateformes, conserver les journaux nécessaires à la sécurité et à l'audit.",
          "**Améliorer nos services**",
          "Détecter les dysfonctionnements, analyser les performances techniques, améliorer les fonctionnalités et développer de nouveaux services.",
          "**Respecter nos obligations légales**",
          "Certaines données peuvent être conservées ou communiquées lorsque cela est nécessaire pour respecter une obligation légale, fiscale, comptable, judiciaire ou réglementaire.",
        ],
      },
      {
        title: "4. Bases juridiques",
        paragraphs: [
          "Lorsque le RGPD s'applique, les traitements sont fondés, selon leur nature, notamment sur l'exécution du contrat ou de mesures précontractuelles (devis), le respect d'une obligation légale, notre intérêt légitime, ou votre consentement lorsque celui-ci est requis. Lorsque le traitement repose sur votre consentement, celui-ci peut être retiré à tout moment, sans remettre en cause la licéité des traitements effectués avant ce retrait.",
        ],
      },
      {
        title: "5. Données des utilisateurs des sites de nos clients",
        paragraphs: [
          "Lorsque SOIBY réalise ou héberge un site, une application ou une plateforme pour un client, ce dernier peut y collecter des données concernant ses propres clients, employés ou partenaires. Dans ce contexte, le client doit notamment disposer d'une base légale appropriée, informer les personnes concernées, respecter les règles applicables dans son pays et limiter les données collectées à ce qui est nécessaire.",
          "SOIBY traite ces données uniquement dans le cadre des services fournis au client et conformément à ses instructions documentées, sous réserve de ses propres obligations légales.",
        ],
      },
      {
        title: "6. Données sensibles",
        paragraphs: [
          "SOIBY n'a pas vocation à collecter des données sensibles qui ne sont pas nécessaires à ses services. Tout projet nécessitant le traitement de catégories particulières de données fera l'objet, lorsque nécessaire, de mesures et informations spécifiques.",
        ],
      },
      {
        title: "7. Destinataires des données",
        paragraphs: [
          "Les données peuvent être accessibles, dans la mesure nécessaire, à SOIBY et ses équipes autorisées, ses prestataires techniques, ses prestataires d'hébergement, les registres et bureaux d'enregistrement de noms de domaine, ses prestataires de paiement, de prise de rendez-vous, de support et de sécurité, ses conseils professionnels, et les autorités compétentes lorsque la loi l'impose. Ces prestataires ne peuvent accéder aux données que dans la mesure nécessaire à leurs missions.",
        ],
      },
      {
        title: "8. Paiements",
        paragraphs: [
          "Les paiements peuvent être réalisés via Stripe ou tout autre prestataire de paiement indiqué lors de la commande. Les informations bancaires sont principalement traitées par le prestataire concerné conformément à ses propres règles de sécurité et de confidentialité. SOIBY ne demande jamais au client de communiquer ses données bancaires par e-mail ou par un moyen non sécurisé.",
        ],
      },
      {
        title: "9. Transferts internationaux",
        paragraphs: [
          "Certaines données peuvent être traitées ou hébergées dans un pays différent de celui dans lequel se trouve l'utilisateur. Lorsque le RGPD ou une autre réglementation applicable encadre un transfert international, SOIBY met en œuvre les mécanismes et garanties appropriés, pouvant notamment comprendre une décision d'adéquation, des clauses contractuelles types, des mesures supplémentaires de sécurité, ou tout autre mécanisme légalement reconnu.",
        ],
      },
      {
        title: "10. Durée de conservation",
        paragraphs: [
          "SOIBY conserve les données uniquement pendant la durée nécessaire aux finalités pour lesquelles elles sont traitées, sauf obligation légale imposant une conservation plus longue. À titre général : les données de prospects (demandes de contact ou de devis sans suite) sont conservées au maximum 3 ans après le dernier contact ; les données du compte sont conservées pendant la durée de la relation contractuelle ; les données nécessaires à la facturation et à la comptabilité sont conservées pendant les durées légales applicables ; les journaux de sécurité sont conservés pendant une durée proportionnée à leur finalité.",
          "Les données peuvent ensuite être supprimées, anonymisées ou archivées lorsqu'une obligation légale le justifie.",
        ],
      },
      {
        title: "11. Sécurité",
        paragraphs: [
          "SOIBY met en œuvre des mesures techniques et organisationnelles destinées à protéger les données contre l'accès non autorisé, la perte, la destruction, l'altération et la divulgation non autorisée : authentification sécurisée, gestion des permissions, protection des API, chiffrement lorsque nécessaire, sauvegardes, surveillance de la sécurité, journalisation des opérations sensibles et contrôle des accès internes. Aucune transmission ou aucun système informatique ne peut toutefois être garanti comme absolument sécurisé.",
        ],
      },
      {
        title: "12. Violation de données",
        paragraphs: [
          "En cas de violation de données personnelles, SOIBY met en œuvre les procédures appropriées prévues par la réglementation applicable. Lorsque la loi l'impose, les autorités compétentes et les personnes concernées seront informées dans les délais requis. Lorsqu'un client est responsable du traitement des données concernées, SOIBY l'informera dans les meilleurs délais raisonnables.",
        ],
      },
      {
        title: "13. Vos droits",
        paragraphs: [
          "Lorsque le RGPD s'applique, vous disposez notamment, selon les conditions prévues par la réglementation, des droits d'accès, de rectification, d'effacement, de limitation, d'opposition, de portabilité, et de retrait du consentement lorsque le traitement repose sur celui-ci. Certaines limitations peuvent s'appliquer lorsque la conservation ou le traitement est imposé par la loi.",
          `Pour exercer vos droits : ${MAIL}. Nous pouvons demander des informations permettant de vérifier l'identité du demandeur lorsque cela est nécessaire à la protection des données.`,
          "Vous pouvez également introduire une réclamation auprès de l'autorité de contrôle compétente, notamment la [[CNIL]](https://www.cnil.fr) en France.",
        ],
      },
      {
        title: "14. Cookies et technologies similaires",
        paragraphs: [
          "Le site et les services SOIBY peuvent utiliser des cookies ou technologies similaires nécessaires à leur fonctionnement, à la sécurité, à la mesure d'audience ou à d'autres finalités. Lorsque le consentement est requis, celui-ci est recueilli conformément à la réglementation applicable.",
        ],
      },
      {
        title: "15. Prospection commerciale",
        paragraphs: [
          "SOIBY peut envoyer des communications commerciales lorsque cela est légalement autorisé. Lorsque le consentement est requis, celui-ci sera recueilli conformément à la réglementation applicable. Vous pouvez vous désabonner à tout moment en utilisant le lien prévu dans les communications ou en nous contactant.",
        ],
      },
      {
        title: "16. Mineurs",
        paragraphs: [
          "Les services SOIBY sont destinés à des professionnels et à des adultes. Nous ne cherchons pas volontairement à collecter des données personnelles concernant des mineurs en dehors des situations dans lesquelles cela est légalement permis et nécessaire.",
        ],
      },
      {
        title: "17. Modification de la politique",
        paragraphs: [
          "SOIBY peut modifier la présente Politique de confidentialité afin de tenir compte de l'évolution de ses services, de changements réglementaires ou techniques ou de nouveaux prestataires. La version applicable est celle publiée sur le site soiby.fr à la date considérée. En cas de modification substantielle, SOIBY pourra en informer les utilisateurs par un moyen approprié.",
        ],
      },
      {
        title: "18. Contact",
        paragraphs: [`SOIBY SAS\n21 place de la République\n75003 Paris, France\n${MAIL}\nSOIBY — Respirez, on s'occupe de tout !`],
      },
    ],
  },
};

export const isLegalId = (v: string): v is LegalId => Object.prototype.hasOwnProperty.call(LEGAL, v);
