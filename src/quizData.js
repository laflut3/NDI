// Quiz data for the 4 POI stations
export const QUIZ_DATA = {
  quiz1: {
    title: "💾 Mon Ordinateur est un Héros",
    subtitle: "Durabilité et Obsolescence",
    questions: [
      {
        question: "Quel problème fait qu'un ordinateur encore en bon état doit souvent être jeté dans les écoles ?",
        answers: [
          "Il est trop lent pour aller sur Internet.",
          "Les élèves le salissent trop vite.",
          "La fin du support d'un logiciel important (comme Windows 10)."
        ],
        correctAnswer: 2,
        explanation: "C'est l'obsolescence logicielle (la fin des mises à jour de sécurité d'un système d'exploitation) qui rend le matériel obsolète ou vulnérable."
      },
      {
        question: "Comment appelle-t-on le fait qu'un matériel soit mis aux ordures alors qu'il fonctionne encore ?",
        answers: [
          "L'obsolescence programmée.",
          "Le reconditionnement.",
          "L'usure naturelle."
        ],
        correctAnswer: 0,
        explanation: "Ce terme décrit le processus par lequel la durée de vie d'un produit est artificiellement limitée, souvent via la partie logicielle."
      },
      {
        question: "Selon la démarche NIRD, quel système d'exploitation libre peut être installé pour donner une 'seconde vie' à un vieil ordinateur ?",
        answers: [
          "Windows 11.",
          "Linux.",
          "iOS."
        ],
        correctAnswer: 1,
        explanation: "La promotion de l'usage de Linux est une des principales activités de NIRD pour lutter contre l'obsolescence programmée."
      },
      {
        question: "Quel est le but principal de l'utilisation de logiciels libres (comme Linux) dans les écoles, selon le sujet ?",
        answers: [
          "Avoir des jeux vidéo éducatifs gratuits.",
          "Rendre les ordinateurs plus rapides que les autres écoles.",
          "Lutter contre l'obsolescence programmée et les licences chères."
        ],
        correctAnswer: 2,
        explanation: "Les logiciels libres permettent de prolonger la vie des machines et d'éviter les coûts des licences, renforçant l'autonomie."
      },
      {
        question: "Quel est le grand avantage de Linux (logiciel libre) par rapport à Windows pour la planète et le matériel ?",
        answers: [
          "Il est plus rapide pour installer des logiciels propriétaires.",
          "Il est moins gourmand en ressources, ce qui permet de réutiliser de très vieux ordinateurs.",
          "Il consomme plus d'électricité, mais permet de faire fonctionner les vieux jeux vidéo."
        ],
        correctAnswer: 1,
        explanation: "Linux est léger, ce qui permet de ne pas jeter le matériel plus ancien, luttant ainsi contre l'obsolescence et la production de déchets électroniques."
      }
    ]
  },
  quiz2: {
    title: "🚦 Les 3 Règles d'Or du Numérique Citoyen",
    subtitle: "Responsabilité et Sobriété",
    questions: [
      {
        question: "Que signifie la 'sobriété numérique' dans votre vie de tous les jours ?",
        answers: [
          "Utiliser le moins de couleurs possible sur les écrans.",
          "Éteindre tous les appareils électriques, y compris les lumières.",
          "Réduire son usage numérique inutile (ex: trier ses e-mails, limiter le streaming)."
        ],
        correctAnswer: 2,
        explanation: "La sobriété numérique consiste à réduire la consommation d'énergie et de ressources liée aux usages numériques pour un impact environnemental moindre."
      },
      {
        question: "En utilisant Linux au lieu de Windows, que gagne l'école sur le plan de la Responsabilité et de l'Autonomie ?",
        answers: [
          "Elle gagne en vitesse d'impression pour les devoirs.",
          "Elle n'a plus besoin d'acheter de licences chères et peut adapter ses outils librement.",
          "Elle obtient des réductions chez les grands fournisseurs de matériel neuf."
        ],
        correctAnswer: 1,
        explanation: "Linux est libre, donc sans frais de licence, et permet une adaptation aux besoins locaux, augmentant ainsi l'autonomie technologique de l'établissement."
      },
      {
        question: "En parlant de 'Numérique Responsable', que signifie le fait que des données soient stockées hors 'UE' (hors Union Européenne) ?",
        answers: [
          "L'établissement fait des économies sur la facture d'électricité.",
          "Que ces données sont potentiellement soumises à des lois étrangères, moins protectrices.",
          "Le service de stockage est plus rapide pour les utilisateurs."
        ],
        correctAnswer: 1,
        explanation: "Stocker des données hors UE peut signifier qu'elles ne sont pas protégées par le Règlement Général sur la Protection des Données (RGPD) européen."
      },
      {
        question: "L'un des trois piliers de la démarche NIRD est 'Responsable'. Que cela implique-t-il concrètement pour les élèves ?",
        answers: [
          "Devenir les administrateurs du réseau Wi-Fi de l'école.",
          "Être responsable de la propreté de la salle informatique.",
          "Devenir des écocitoyens du numérique en connaissant l'impact de leurs usages."
        ],
        correctAnswer: 2,
        explanation: "Le pilier 'Responsable' couvre l'écocitoyenneté et la sensibilisation à l'impact environnemental du numérique."
      },
      {
        question: "Pour pratiquer la 'sobriété numérique' au quotidien, quelle est la meilleure habitude à prendre ?",
        answers: [
          "Supprimer les vieux e-mails inutiles et limiter le stockage dans le cloud.",
          "Laisser son ordinateur allumé la nuit pour les mises à jour.",
          "Ne regarder que des vidéos en très haute qualité (4K)."
        ],
        correctAnswer: 0,
        explanation: "Le nettoyage des données (e-mails, cloud) est un geste essentiel de sobriété pour réduire la consommation des data centers."
      }
    ]
  },
  quiz3: {
    title: "🎁 Partageons nos Super-Outils",
    subtitle: "Inclusivité et Communs",
    questions: [
      {
        question: "Quel est l'objectif principal de l'aspect 'Inclusif' dans la démarche NIRD ?",
        answers: [
          "Assurer que tous les élèves aient accès à des outils numériques de qualité, même avec du vieux matériel.",
          "Faire en sorte que l'école achète le même type de matériel que les grandes entreprises.",
          "Rendre les ordinateurs plus puissants et rapides pour tous."
        ],
        correctAnswer: 0,
        explanation: "L'inclusion vise à réduire la fracture numérique en rendant la technologie accessible à tous, notamment via le réemploi et les logiciels libres."
      },
      {
        question: "Que signifie 'Communs numériques éducatifs' dans le contexte de NIRD ?",
        answers: [
          "Des règles strictes que tous les élèves doivent suivre en ligne.",
          "Des serveurs de données secrets gérés par l'administration de l'école.",
          "Des ressources, logiciels et outils qui sont partagés, construits en commun et accessibles à tous gratuitement."
        ],
        correctAnswer: 2,
        explanation: "Les Communs numériques éducatifs sont des ressources mutualisées et libres, créées par et pour la communauté éducative (élèves, enseignants, techniciens)."
      },
      {
        question: "L'une des activités de NIRD est d'encourager le 'reconditionnement' et le 'réemploi'. Quel est le bénéfice de cette pratique pour l'Inclusion ?",
        answers: [
          "Cela rend la technologie plus abordable, permettant à plus d'élèves d'avoir accès à du matériel fonctionnel.",
          "Cela limite le nombre d'ordinateurs dans l'école pour des raisons de sécurité.",
          "Cela permet d'avoir du matériel neuf plus rapidement que d'habitude."
        ],
        correctAnswer: 0,
        explanation: "En prolongeant la vie du matériel et en le rendant disponible pour d'autres, le réemploi réduit les coûts et augmente l'accès aux équipements."
      },
      {
        question: "Quel est le mot clé qui résume l'idée de l'utilisation de solutions numériques locales, ouvertes et autonomes ?",
        answers: [
          "La co-construction.",
          "L'individualisation.",
          "L'abonnement."
        ],
        correctAnswer: 0,
        explanation: "La co-construction de solutions implique la participation de tous les acteurs locaux (enseignants, élèves, techniciens, etc.) pour créer des outils autonomes."
      },
      {
        question: "Pourquoi la démarche NIRD insiste-t-elle sur la mutualisation des ressources et outils libres (via la Forge) ?",
        answers: [
          "Pour que chaque établissement garde ses meilleures solutions secrètes.",
          "Pour forcer les Big Tech à baisser leurs prix.",
          "Pour que toute la communauté éducative puisse profiter des solutions de chacun et gagner en autonomie collectivement."
        ],
        correctAnswer: 2,
        explanation: "Le partage de ressources et d'outils libres permet à tous d'éviter de réinventer la roue et de renforcer la communauté NIRD (l'autonomie collective)."
      }
    ]
  },
  quiz4: {
    title: "🗺️ Le Grand Guide de la Résistance",
    subtitle: "Acteurs et Stratégie NIRD",
    questions: [
      {
        question: "Qui a lancé l'initiative de la démarche NIRD ?",
        answers: [
          "Le Ministère de l'Éducation (seul).",
          "Un collectif enseignant de la Forge des communs numériques éducatifs.",
          "Les Big Tech, pour améliorer leur image."
        ],
        correctAnswer: 1,
        explanation: "Le NIRD est porté par un collectif enseignant de la Forge des communs numériques éducatifs."
      },
      {
        question: "L'approche de la démarche NIRD est décrite comme venant :",
        answers: [
          "De l'extérieur (les associations) pour sensibiliser les élèves uniquement.",
          "D'en haut (le Ministère) pour agir en bas (les écoles).",
          "D'en bas (le terrain) pour montrer 'en haut' (aux autorités) qu'il faut agir."
        ],
        correctAnswer: 2,
        explanation: "Il s'agit d'une initiative 'd'en bas qui cherche à montrer en haut qu'il y a urgence à agir'."
      },
      {
        question: "Parmi les acteurs de NIRD, quel groupe est mentionné comme ayant un rôle important dans la gestion technique et l'autonomie ?",
        answers: [
          "Les Techniciens et administrateurs réseaux des lycées.",
          "Les parents d'élèves.",
          "Les entreprises de vente de matériel neuf."
        ],
        correctAnswer: 0,
        explanation: "Les techniciens et administrateurs réseaux font partie des acteurs clés qui transforment les pratiques."
      },
      {
        question: "Quel est le mot-clé qui résume le mieux l'esprit du projet NIRD face aux Big Tech ?",
        answers: [
          "La Vitesse.",
          "L'acceptation.",
          "La Résistance."
        ],
        correctAnswer: 2,
        explanation: "Le sujet parle du 'Village Numérique Résistant' et de 'l'esprit de résistance numérique propre à NIRD'."
      },
      {
        question: "L'objectif final de la démarche NIRD est de redonner quoi aux équipes éducatives (enseignants, élèves, etc.) ?",
        answers: [
          "Plus de vacances scolaires.",
          "Le pouvoir d'agir et de renforcer leur autonomie technologique.",
          "Un salaire plus élevé."
        ],
        correctAnswer: 1,
        explanation: "L'ambition de NIRD est de 'redonner du pouvoir d'agir aux équipes éducatives et en renforçant leur autonomie technologique'."
      }
    ]
  }
}
