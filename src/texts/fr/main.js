// main (fr): translations of en/main.js, same shape. Missing keys fall back to English.
// Glossary: traveler = voyageur·se, tutoiement, menu names as in fr/hub.js.

export const CHANGE_LATER = '-# Tu peux changer ça quand tu veux avec 🔒 Confidentialité dans `/auracle`.';

export const texts = {
  common: {
    unknownCommand: "Ce sort m'est encore inconnu, voyageur·se.",
    links: { home: 'Site web', privacy: 'Politique de confidentialité', terms: "Conditions d'utilisation" },
  },

  help: {
    title: '### 📜 Le guide du voyageur·se',
    commandsTitle: '**Commandes**',
    commands: [
      { name: '`/auracle`', description: 'Ouvrir le menu : tout est dedans' },
      { name: '`/awaken`', description: "Commencer ton épreuve et découvrir ta classe" },
      { name: '`/profile`', description: "Voir ta carte de profil, ou celle d'un·e voyageur·se avec @membre" },
      { name: '`/forget`', description: 'Effacer toutes tes données' },
    ],
    menuTitle: '**Dans le menu `/auracle`**',
    menu: [
      "✨ **Éveil** : commencer ton épreuve",
      '🪪 **Ma carte** : voir ta carte de profil',
      "🎨 **Personnaliser** : titre, couleur, À propos, goûts, identité, badges, bénédictions, bannière et ordre de ta carte",
      '🏰 **Guildes** : la répartition des guildes sur le serveur',
      '🔒 **Confidentialité** : choisir ce que tu partages, et obtenir une copie de tes données',
      '📜 **Nouveautés** : voir ce qui a changé et ce qui arrive',
      '📬 **Avis** : signaler un bug ou proposer une idée',
      '❔ **Aide** : ouvrir ce guide',
      "📖 **Codex** : comment marche Auracle, les sources, et où trouver du soutien",
      '🧹 **Oublier** : effacer toutes tes données',
      "🪪 / 🤝 Les deux menus du bas : voir la carte d'un·e voyageur·se, ou te comparer à elle ou lui",
    ],
    footer: '-# Tes résultats restent privés, sauf si tu choisis le contraire.',
  },

  awaken: {
    welcome: {
      title: '### ✨ Une nouvelle âme approche...',
      body:
        'Bienvenue, voyageur·se. Je suis **Auracle**, gardien des anciennes épreuves.\n\n' +
        "Réponds à mes questions avec sincérité, et je te révélerai le héros qui sommeille en toi.\n\n" +
        "*Ici, pas de bonne ou de mauvaise réponse : il n'y a que toi.*",
      button: 'Entrer',
    },

    preamble: {
      title: '### 📖 À propos de ce voyage',
      body:
        "Auracle révèle ta personnalité grâce au **Big Five**, l'un des modèles les plus reconnus en psychologie. " +
        "Tes réponses dévoilent tes cinq grands traits, et avec eux ta **classe de héros** : une parmi 16, réparties en quatre guildes.\n\n" +
        '🔒 Tes résultats restent privés, sauf si tu choisis de les partager.\n\n' +
        "🌱 Auracle commence par cette épreuve, mais c'est bien plus qu'un test : " +
        "un compagnon social pour Discord, inclusif, sûr, et vraiment à personnaliser à ton image.\n\n" +
        "🛠️ Auracle est en **bêta publique** : ouvert à tous les serveurs, et toujours en train de grandir. " +
        "Un bug ou une idée ? Utilise **📬 Avis** dans `/auracle`. Perdu·e ? `/auracle` rassemble tout, et le **📖 Codex** explique comment tout fonctionne, avec des ressources de soutien si tu en as besoin un jour.\n\n" +
        '-# Créé avec soin par Zenckoo ✨',
      button: 'Continuer',
    },

    disclaimer: {
      title: '### ⚠️ Avant de commencer',
      body:
        "🔮 **Pas un diagnostic.** Cette épreuve s'appuie sur le Big Five, mais ta classe et ton type à quatre lettres sont une estimation pour le plaisir, pas une étiquette ni une évaluation officielle.\n\n" +
        "💡 **Fais confiance à ton instinct.** Réponds avec ta première idée. Si un mot n'est pas clair, choisis *Entre les deux*.\n\n" +
        "💾 **Tes données.** Les épreuves inachevées sont effacées au bout de 30 jours. Les profils terminés sont gardés jusqu'à ce que tu utilises `/forget`. Change ce que les autres voient quand tu veux avec 🔒 Confidentialité dans `/auracle`.\n\n" +
        "🤝 **Respect.** Les règles de ce serveur s'appliquent aussi à Auracle : pas de moqueries, pas de discrimination, et on n'utilise jamais les résultats de quelqu'un contre lui.\n\n" +
        "🤖 **Créé avec l'aide de l'IA.** Auracle vit avec les outils d'aujourd'hui : une partie de son code et de ses textes est créée avec l'aide de **Claude**, une IA d'Anthropic. Ses dessins et illustrations, eux, seront toujours faits par des mains humaines, jamais par une IA.\n\n" +
        "🔞 **Discrétion conseillée.** Si tu as moins de 18 ans, garde tes résultats privés et parle à un adulte de confiance si quelque chose te pèse.\n\n" +
        "-# Tu es toujours bien plus qu'un résultat de test. 💜",
      agree: "📜 En continuant, tu acceptes les **Conditions d'utilisation** et la **Politique de confidentialité** d'Auracle.",
      button: "J'ai compris",
    },

    question: {
      statement: (text) => `« ${text}. »`,
      prompt: '-# À quel point ça te décrit ?',
      answers: ['Pas du tout moi', 'Plutôt pas moi', 'Entre les deux', 'Plutôt moi', 'Tout à fait moi'],
      back: 'Retour',
      pause: 'Pause',
      milestones: {
        30: '-# 🌫️ La brume se dissipe... continue.',
        60: "-# 🌫️ À mi-chemin ! Je commence à voir quelque chose d'intéressant.",
        90: '-# 🌫️ Presque fini. Ta classe prend forme...',
      },
    },

    pause:
      '### ⏸️ Repose-toi, voyageur·se\n' +
      'Ta progression est gardée 30 jours. Reviens avec `/awaken` quand tu es prêt·e.',

    resume: {
      text: (position, total) =>
        `### 🔮 Bon retour !\nTon épreuve t'attend à la question ${position} sur ${total}. On continue ?`,
      resume: 'Reprendre',
      restart: 'Recommencer',
    },

    end: {
      text:
        "### 🔔 L'épreuve est terminée\n" +
        '*La dernière réponse résonne dans les couloirs...*\n' +
        'Voyons maintenant qui tu es vraiment.',
      button: 'Révéler ma classe',
    },

    complete: {
      text: '### 🏰 Ton voyage est accompli, voyageur·se.\nQue cherches-tu ?',
      results: 'Voir mes résultats',
      newTrial: 'Commencer une nouvelle épreuve',
    },

    warning: {
      text: "### ⚠️ Attention, voyageur·se !\nUne nouvelle épreuve remplacera ta classe et tes résultats actuels une fois terminée. D'ici là, ta carte reste privée.\n-# Ta personnalisation et tes badges sont gardés. Tu es sûr·e ?",
      anew: 'Recommencer à zéro',
      keep: 'Garder ma classe',
      kept: 'Ta classe reste la tienne, voyageur·se. 💜',
    },

    lost: "Ton épreuve est introuvable, voyageur·se. Utilise `/awaken` pour recommencer.",
  },

  results: {
    revealIntro: '*La brume se lève... ta vraie nature se révèle.*',
    behold: () => 'Voici ta classe',
    calmWaters: '🌊 Eaux calmes',
    restlessFlame: '🔥 Flamme ardente',
    closeLetter: (pair, alternate) => `-# Ton équilibre ${pair} est serré : certains jours, tu te sentiras peut-être plutôt ${alternate}.`,
    estimate: '-# Ton type est une estimation basée sur tes résultats du Big Five.',
    seeTraits: 'Voir mes traits',
    seeFacets: 'Voir les facettes',
    backToClass: 'Retour à la classe',
    backToTraits: 'Traits',
    facetsLabel: 'Facettes',
    traitsTitle: '### 📊 Tes traits',
    higherThan: (pct) => `Plus haut que ${pct} % des voyageur·ses`,

    gentleWord:
      "🌙 **Un mot doux, voyageur·se.** Tes réponses laissent penser que tu portes peut-être beaucoup d'inquiétude ou de lourdeur en ce moment. " +
      "Ce n'est pas un diagnostic, juste le reflet de tes réponses. Si c'est lourd, en parler à quelqu'un de confiance, " +
      "ou à un·e professionnel·le, peut vraiment aider. Tu n'as pas à porter ça seul·e.",
    helpButton: "Trouver une ligne d'écoute",

    traitNames: { O: 'Ouverture', C: 'Conscienciosité', E: 'Extraversion', A: 'Agréabilité', N: 'Névrosisme' },
    traitPhrases: {
      O: {
        low: "Les pieds sur terre : tu fais confiance à ce qui marche et tu ne cours pas après chaque nouvelle idée brillante.",
        average: 'Curieux·se mais pratique : les nouvelles idées sont les bienvenues, tant qu\'elles ont du sens.',
        high: "La tête dans les étoiles : des idées sans fin, des questions sans fin... et peut-être trop de projets inachevés.",
      },
      C: {
        low: "Au gré du vent : tes plans, c'est plutôt des idées en l'air... et les dates limites, de lointaines rumeurs.",
        average: "Aventurier·e équilibré·e : organisé·e quand ça compte, souple quand ça ne compte pas.",
        high: "Maître de l'ordre : listes, plans et objectifs... tu as sûrement une liste de tes listes.",
      },
      E: {
        low: 'Flamme tranquille : tu te recharges dans le calme et la solitude... et un plan annulé ressemble à un cadeau.',
        average: 'Caméléon social : heureux·se en soirée, tout aussi heureux·se chez toi avec un bon livre.',
        high: "Étincelle de la fête : les gens te donnent de l'énergie... et le silence te rend un peu nerveux·se.",
      },
      A: {
        low: "Lame honnête : tu dis ce que tu penses sans enrober la vérité... la diplomatie est facultative.",
        average: 'Compagnon juste : gentil·le quand ça compte, ferme quand il le faut.',
        high: "Cœur d'or : tu tiens profondément aux autres et tu aides toujours... même quand tu devrais dire non.",
      },
      N: {
        low: 'Eaux calmes : tu restes stable quand les tempêtes arrivent.',
        average: 'Marées changeantes : certaines tempêtes te secouent, mais tu retrouves toujours le chemin du rivage.',
        high: 'Flamme ardente : tu ressens tout intensément et tu cherches toujours à grandir.',
      },
    },

    privacy: {
      question:
        '### 🪪 Ta carte de profil\n' +
        'Ta classe doit-elle être connue de tous, ou rester secrète ?\n' +
        '-# Les cartes publiques sont visibles par tout le monde avec /profile. Tes facettes restent toujours privées.',
      public: 'Publique',
      private: 'Privée',
      changeLater: CHANGE_LATER,
      nowPublic: `### 🌍 Ta classe est maintenant connue de tous\n${CHANGE_LATER}`,
      nowPrivate: `### 🔒 Ta classe reste secrète\n${CHANGE_LATER}`,
    },
  },
};
