// updates (fr): translations of en/updates.js, same shape. Keep the same versions, in the same order, as in English.

export const updatesTexts = {
  newTitle: '### 📜 Nouveautés',
  soonTitle: '### 🔮 Bientôt',
  newTab: 'Nouveautés',
  soonTab: 'Bientôt',
  newer: 'Plus récent',
  older: 'Plus ancien',
  page: (n, total) => `Page ${n} / ${total}`,
  versions: [
    {
      name: 'v0.8 · Auracle parle français 🇫🇷',
      items: [
        '🇫🇷 Auracle parle maintenant **français** : menus, épreuve, cartes, Codex et Nouveautés',
        "🌍 Chaque serveur a sa propre langue. Auracle suit la langue de ton serveur sur Discord, et le staff peut en choisir une autre dans ⚙️ Réglages du serveur, dans `/auracle`",
        "📜 En français, les questions viennent de la traduction publiée de l'IPIP-NEO-300 par **Thiry et Piolti (2023)**",
        '🌐 Le site web est aussi en français, avec un bouton **EN · FR** en haut de chaque page. Les boutons du bot l\'ouvrent dans la langue de ton serveur',
        '⌨️ Les commandes gardent le même nom dans toutes les langues : `/auracle`, `/awaken`, `/profile` et `/forget`',
      ],
    },
    {
      name: 'v0.7 · Bêta publique 🌍',
      items: [
        '🌍 Auracle est maintenant ouvert à tous les serveurs, en bêta publique',
        '🏰 **Rôles de guilde** : le staff peut les activer dans ⚙️ Réglages du serveur, dans `/auracle`. Chaque voyageur·se avec une carte publique reçoit le rôle de sa guilde',
        'Tu ne veux pas porter ton rôle de guilde ? Choisis-le dans 🔒 Confidentialité',
        '🌐 Auracle a son propre site web, avec le Codex, la Politique de confidentialité et les Conditions d\'utilisation : **auracle-site.pages.dev**',
        '🔮 Une nouvelle icône de boule de cristal et une bannière étoilée',
        "📦 **Mes données** dans 🔒 Confidentialité : reçois un fichier avec tout ce qu'Auracle garde sur toi",
        "⚖️ Une nouvelle Politique de confidentialité et de nouvelles Conditions d'utilisation, bien plus détaillées, en toute transparence sur l'IA",
        "🤖 Auracle crédite maintenant **Claude**, l'IA d'Anthropic qui aide à écrire son code et ses textes",
        '📬 Les Avis sont limités à 5 messages toutes les 24 heures, pour éviter le spam',
        "🔗 Des liens vers le site, la Politique de confidentialité et les Conditions d'utilisation dans le menu `/auracle`, l'Aide, la Confidentialité, le Codex et avant l'épreuve",
        '🎨 **Personnaliser** dans `/auracle` : un titre fantasy parmi 15, une couleur d\'accent pour le contour de ta carte, une phrase **À propos de moi** et ta **vibe du moment**',
        '🎮 **Goûts & fun** : jeux, animés, musique, personnes préférées, le genre de compagnie que tu cherches, et ta préférence pour les MP',
        '🕰️ **Infos pratiques** : ton heure locale, les langues que tu parles (plus de 150, du swahili au maori) et ton anniversaire',
        '🌈 **Identité**, si tu le souhaites : pronoms, genre, orientation et origines, seulement avec ton consentement et privé par défaut',
        '🚩 **Signaler** : chaque carte a maintenant un bouton Signaler. Choisis une raison, et ton signalement va en privé à Zenckoo',
        "📖 Une nouvelle page du Codex, **Les mots de l'identité** : pronoms, genres et orientations expliqués simplement",
        '🏅 **Badges** : gagne-les au fil de ton voyage et affiches-en jusqu\'à 3 sur ta carte. 🌱 **Voyageur·se des débuts** est réservé aux voyageur·ses de la bêta publique !',
        '🔄 Passer une nouvelle épreuve garde maintenant ta personnalisation et tes badges',
        "💌 **Bénédictions** : laisse un mot gentil sur la carte de quelqu'un avec le bouton 💌 Bénir. Rien n'apparaît avant que la personne l'accepte, et elle en choisit jusqu'à 3 à afficher. Gagne le badge 🕊️ **Âme bienveillante** quand 3 de tes bénédictions sont acceptées !",
        "🖼️ **Bannières** : envoie ta propre image ou ton GIF en haut de ta carte, dans 🎨 Personnaliser. Chaque bannière est vérifiée pour garder Auracle sûr pour tout le monde",
        "🗂️ **Organise ta carte** : choisis l'ordre de ses parties, et cache celles que tu veux",
        "♿ **Mode accessibilité** dans 🔒 Confidentialité : des messages plus simples pour les lecteurs d'écran, avec des mots au lieu des barres et sans emojis décoratifs",
        '🪪 Une carte de profil plus claire : des parties nettes avec chacune un titre, moins d\'emojis, et tout ce qui te concerne réuni au même endroit',
        '📊 Des pourcentages de traits plus précis, basés sur une étude publiée de 18 591 personnes (détails dans le 📖 Codex)',
      ],
    },
    {
      name: 'v0.6 · Tests privés',
      items: [
        '🧭 Tout se trouve maintenant dans le menu `/auracle` : moins de commandes, plus de boutons',
        'Il ne reste que quatre commandes : `/auracle`, `/awaken`, `/profile` et `/forget`',
        "Le guide d'Aide montre maintenant tous les boutons du menu",
      ],
    },
    {
      name: 'v0.5 · Tests privés',
      items: [
        '📖 `/codex` : un petit livre qui explique comment marche Auracle, le Big Five, les épreuves, tes lettres, les guildes, tes données, avec des liens vers les sources',
        'Le Codex est aussi dans le menu `/auracle`',
        '🌈 De nouvelles pages du Codex : **Comprendre tes résultats**, **Tout le monde a sa place ici**, **Soutien LGBTQ+**, une page **Si les choses te pèsent** plus complète, **Auracle et l\'IA**, et **Pour le staff des serveurs**, avec des liens de confiance',
        'Les pages du Codex sont maintenant rangées par importance, en commençant par le soutien',
      ],
    },
    {
      name: 'v0.4 · Tests privés',
      items: [
        '📚 La **Grande Épreuve** : 300 questions, 10 par facette, pour le voyage le plus profond',
        'Choisis ta voie avant de commencer : Épreuve classique ou Grande Épreuve',
        "Ta carte montre maintenant quelle épreuve tu as passée",
      ],
    },
    {
      name: 'v0.3 · Tests privés',
      items: [
        '🗝️ **Secrets cachés** : les facettes qui se démarquent le plus de leur trait, sur une nouvelle page avant tes facettes',
        'Choisis de montrer ton secret principal sur ta carte, ou de le garder caché',
        '`/privacy` a maintenant un deuxième réglage pour ton secret caché',
      ],
    },
    {
      name: 'v0.2 · Tests privés',
      items: [
        "`/compare` : découvre à quel point tu t'entends avec quelqu'un",
        '`/guilds` : la répartition des guildes sur le serveur',
        '`/auracle` : un seul menu pour tout, sans avoir à taper de commandes',
      ],
    },
    {
      name: 'v0.1 · Tests privés',
      items: [
        "L'**Épreuve classique** : 120 questions pour révéler ta classe de héros",
        '16 classes réparties en 4 guildes : 🌙 Rêveurs, 📚 Érudits, 🏰 Gardiens, 🗺️ Vagabonds',
        "Tes 5 traits et tes 30 facettes, comparés aux autres voyageur·ses",
        'Des cartes de profil avec `/profile`, publiques ou privées avec `/privacy`',
        'Tout effacer quand tu veux avec `/forget`',
        'Signaler un bug ou partager une idée avec `/feedback`',
      ],
    },
  ],
  soon: [
    '🔑 **Connexion avec Discord** sur le site web',
    '🎨 **Personnaliser ta carte sur le site web**, avec encore plus d\'options, comme déplacer et recadrer ta bannière',
    "🗣️ D'autres langues : allemand et japonais",
  ],
  footer: '-# Une idée ? Partage-la avec 📬 Avis dans `/auracle`.',
};
