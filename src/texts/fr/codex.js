// codex (fr): translations of en/codex.js, same shape. Missing keys fall back to English.
// The pages are a list: keep the same order and the same number of pages as in English.

export const codexTexts = {
  title: '### 📖 Le Codex',
  page: (n, total) => `Page ${n} / ${total}`,
  previous: 'Précédente',
  next: 'Suivante',
  jump: 'Aller à une page',
  footer: '-# Des questions ou des idées ? Partage-les avec 📬 Avis dans `/auracle`.',
  hubButton: 'Codex',
  pages: [
    {
      emoji: '🔮',
      name: "C'est quoi, Auracle ?",
      body:
        "Auracle est un compagnon social pour Discord. Tout commence par une épreuve de personnalité : tu réponds à des phrases sur toi, et Auracle révèle tes **cinq grands traits**, tes **30 facettes**, et une **classe de héros** parmi 16, réparties en quatre guildes.\n\n" +
        "Ensuite, place à toi et à ta communauté : compare-toi à tes amis, découvre les guildes de ton serveur, et rends ta carte vraiment à toi.\n\n" +
        "⚠️ **Pas un diagnostic.** Auracle n'est pas une évaluation psychologique ou médicale. Ta classe est une estimation pour le plaisir, jamais une étiquette.",
      links: [],
    },
    {
      emoji: '🌙',
      name: 'Si les choses te pèsent',
      body:
        "Une épreuve de personnalité peut remuer des émotions, et la vie peut parfois sembler lourde. Tu n'es pas seul·e, et demander de l'aide est une force.\n\n" +
        "💬 En parler à quelqu'un de confiance, ou à un·e professionnel·le, peut vraiment aider.\n" +
        "📞 **Find a Helpline** liste des lignes d'écoute gratuites et confidentielles dans ton pays, par téléphone, SMS ou chat.\n" +
        "🤝 **Befrienders Worldwide** offre un soutien émotionnel à toute personne en détresse.\n\n" +
        "🚨 **Si tu es en danger en ce moment, appelle le numéro d'urgence de ton pays.**\n\n" +
        "Si tu as moins de 18 ans, garde tes résultats privés et parle à un adulte de confiance si quelque chose t'inquiète. 💜",
      links: [
        { label: 'Find a Helpline', url: 'https://findahelpline.com' },
        { label: 'Befrienders Worldwide', url: 'https://www.befrienders.org' },
      ],
    },
    {
      emoji: '🏳️‍🌈',
      name: 'Soutien LGBTQ+',
      body:
        "Qui que tu sois et qui que tu aimes, tu es légitime, et tu mérites de te sentir en sécurité. 💜\n\n" +
        "Si tu te poses des questions, si tu fais ton coming out ou si tu traverses un moment difficile, ces endroits peuvent t'aider :\n" +
        "🌈 **TrevorSpace** : une communauté en ligne sûre pour les jeunes LGBTQ+ de 13 à 24 ans, partout dans le monde (en anglais)\n" +
        "📞 **Switchboard International** : une liste de lignes d'écoute LGBTQ+ dans de nombreux pays\n" +
        "🏳️‍⚧️ **Trans Lifeline** : des ressources pour les personnes trans, dans de nombreux pays\n\n" +
        "-# Ne partage que ce que tu veux, avec qui tu veux. Ton histoire t'appartient.",
      links: [
        { label: 'TrevorSpace', url: 'https://www.trevorspace.org' },
        { label: 'Switchboard International', url: 'https://international.switchboard.lgbt/' },
        { label: 'Trans Lifeline', url: 'https://translifeline.org/resource_category/international/' },
      ],
    },
    {
      emoji: '🌈',
      name: 'Tout le monde a sa place ici',
      body:
        "Ta personnalité, c'est ta façon de penser, de ressentir et d'agir. Elle n'a rien à voir avec ton genre, qui tu aimes, ta couleur de peau, ta religion, ton corps, ton âge ou d'où tu viens. L'épreuve ne pose jamais de questions là-dessus, et rien de tout ça ne change tes résultats. Si tu ajoutes quelque chose sur toi à ta carte, dans 🎨 Personnaliser > 🌈 Identité, c'est toujours ton choix, et seulement le tien.\n\n" +
        "Aucune classe, aucune guilde et aucun score ne vaut mieux qu'un autre. Être calme, sensible ou désordonné n'est pas un défaut : c'est une façon d'être.\n\n" +
        "🚫 **Auracle ne doit jamais servir à juger, moquer ou exclure qui que ce soit.** Traiter quelqu'un injustement à cause de qui il est, c'est de la discrimination, et ça n'a pas sa place ici.\n\n" +
        "🛡️ Si quelqu'un s'en prend à toi sur Discord, tu peux le bloquer, prévenir les modérateurs de ton serveur et le signaler à Discord.",
      links: [
        { label: 'Signaler sur Discord', url: 'https://discord.com/safety/360044103651-reporting-abusive-behavior-to-discord' },
        { label: 'Les règles de Discord sur la haine', url: 'https://discord.com/safety/hateful-conduct-policy-explainer' },
      ],
    },
    {
      emoji: '🏷️',
      name: "Les mots de l'identité",
      body:
        "Dans 🎨 Personnaliser > 🌈 Identité, tu peux afficher tes pronoms, ton genre, ton orientation et tes origines, seulement si tu le veux. Voici ce que veulent dire les mots, simplement. Chacun·e se définit soi-même : ce sont de petits repères, pas des cases.\n\n" +
        "🏷️ **Pronoms** : les mots qu'on utilise pour parler de toi. **Iel** est un pronom neutre, pour une seule personne. Les **néopronoms** (comme ael ou ul) sont plus récents. **N'importe quel pronom** : tous te vont. **Demande-moi** : il suffit de demander !\n\n" +
        "🌈 **Genre**\n" +
        "**Non-binaire** : ni seulement femme, ni seulement homme · **Transgenre** : un genre différent de celui donné à la naissance · **Genderfluid** : un genre qui change avec le temps · **Genderqueer** : en dehors des cases habituelles · **Agenre** : sans genre · **Bigenre** : deux genres · **Demi-fille / Demi-garçon** : en partie fille, ou en partie garçon · **Bispirituel·le** : une identité et un rôle venant de certaines cultures autochtones d'Amérique du Nord\n\n" +
        "💞 **Orientation**\n" +
        "**Bisexuel·le** : attiré·e par plus d'un genre · **Pansexuel·le** : une attirance peu importe le genre · **Queer** : un mot large et ouvert · **Asexuel·le** : peu ou pas d'attirance sexuelle · **Demisexuel·le** : une attirance seulement après un lien fort · **Grey-asexuel·le** : quelque part entre les deux · **Aromantique** : peu ou pas d'attirance romantique · **Biromantique, panromantique, homoromantique, demiromantique** : les mêmes idées, pour l'attirance romantique\n\n" +
        "❓ **En questionnement** : encore en exploration, et c'est complètement OK.\n\n" +
        "-# Ne devine jamais et n'étiquette jamais quelqu'un d'autre : utilise les mots que chacun·e choisit pour soi. 💜",
      links: [{ label: 'Lexique LGBTQ+ (en anglais)', url: 'https://www.thetrevorproject.org/resources/guide/allyship-in-action/' }],
    },
    {
      emoji: '🔒',
      name: 'Tes données',
      body:
        "Auracle ne garde que ce dont il a besoin :\n" +
        "- Tes réponses et tes résultats, jusqu'à ce que tu utilises `/oublier`\n" +
        "- Les épreuves inachevées, effacées 30 jours après ta dernière réponse\n" +
        "- Ce que tu ajoutes à ta carte : personnalisation, identité (seulement avec ton consentement), badges, bannière et bénédictions\n" +
        "- Les serveurs où tu as utilisé Auracle, seulement pour les 🏰 Guildes et les rôles de guilde\n\n" +
        "Ta carte, ton secret caché et ton identité sont **privés par défaut**. Tes facettes ne sont jamais montrées aux autres. Une bénédiction n'apparaît que si la personne concernée l'accepte, et chaque bannière est vérifiée automatiquement avant d'être enregistrée.\n\n" +
        "`/oublier` efface tout, quand tu veux, et **📦 Mes données** dans 🔒 Confidentialité t'envoie une copie de tout ce qu'Auracle garde.\n\n" +
        "-# Tous les détails sont dans la Politique de confidentialité.",
      links: [{ label: 'Politique de confidentialité', url: 'https://auracle-site.pages.dev/privacy' }],
    },
    {
      emoji: '🌱',
      name: 'Comprendre tes résultats',
      body:
        "Tes résultats sont une photo, pas une sentence. La personnalité change doucement au fil de la vie, et ton humeur du jour peut aussi influencer tes réponses.\n\n" +
        "📉 **Un score bas n'est jamais un défaut.** Une Extraversion basse veut dire que tu te recharges dans le calme, pas que tu es moins doué·e avec les gens. Chaque niveau de chaque trait a ses forces.\n\n" +
        "🔁 **Tu peux repasser l'épreuve** quand tu veux avec `/eveil`. Si ta nouvelle classe te semble différente, ça fait partie du voyage.\n\n" +
        "🪞 **C'est toi qui te connais le mieux.** Si quelque chose ne te ressemble pas, fais-toi confiance plutôt qu'à l'épreuve.\n\n" +
        "-# Ta classe est une façon amusante de parler de qui tu es, jamais une case où rester.",
      links: [],
    },
    {
      emoji: '🧠',
      name: 'Le Big Five',
      body:
        "Le **Big Five** est l'un des modèles de personnalité les plus étudiés en psychologie. Il décrit les gens avec cinq grands traits, chacun allant de bas à haut :\n\n" +
        "🎨 **Ouverture** : curiosité, imagination, goût des idées nouvelles\n" +
        "📋 **Conscienciosité** : organisation, discipline, fiabilité\n" +
        "🎉 **Extraversion** : l'énergie puisée dans les gens et l'action\n" +
        "🤝 **Agréabilité** : gentillesse, confiance, coopération\n" +
        "🌪️ **Névrosisme** : à quel point tu ressens fort le stress et les émotions\n\n" +
        "Aucun trait n'est bon ou mauvais : chacun vient avec ses forces et ses petites manies.",
      links: [{ label: 'Le Big Five sur Wikipédia', url: 'https://fr.wikipedia.org/wiki/Mod%C3%A8le_des_Big_Five_(psychologie)' }],
    },
    {
      emoji: '🧭',
      name: 'Ta classe et tes quatre lettres',
      body:
        "Tes quatre lettres sont estimées à partir de tes résultats au Big Five :\n\n" +
        "**E / I** viennent de l'Extraversion\n" +
        "**N / S** viennent de l'Ouverture\n" +
        "**F / T** viennent de l'Agréabilité\n" +
        "**J / P** viennent de la Conscienciosité\n\n" +
        "Chaque lettre dépend de si ton score est au-dessus ou en dessous du milieu du groupe de référence. Quand tu es proche du milieu, Auracle te dit que certains jours, tu te sentiras peut-être plutôt l'autre lettre.\n\n" +
        "Le Névrosisme ne change pas tes lettres : il ajoute 🌊 Eaux calmes ou 🔥 Flamme ardente à ta carte.\n\n" +
        "-# Ces lettres sont une estimation propre à Auracle, pas un type officiel d'un test commercial.",
      links: [],
    },
    {
      emoji: '🏰',
      name: 'Les quatre guildes',
      body: null,
      links: [],
    },
    {
      emoji: '📊',
      name: 'Pourcentages et facettes',
      body:
        "« Plus haut que X % des voyageur·ses » compare tes scores à des groupes de référence. Pour tes **5 traits** : 18 591 personnes ayant passé l'IPIP-NEO-300, de 14 à 29 ans, d'après une étude de Twomey et Johnson (2022), avec des tableaux ouverts et libres de réutilisation. Pour tes **facettes** : environ 3 000 personnes ayant passé l'IPIP-NEO-120 en ligne (JobCannon, 2026, CC BY 4.0). D'autres tests et d'autres groupes peuvent te placer un peu différemment, alors vois ça comme une comparaison amicale.\n\n" +
        "Chaque trait est divisé en **6 facettes**, 30 au total, pour une image plus fine. Les 🗝️ **secrets cachés** sont les facettes qui se démarquent le plus de leur trait.\n\n" +
        "Quand assez de voyageur·ses auront passé l'épreuve, Auracle te comparera à sa propre communauté.",
      links: [
        { label: 'Référence des traits (étude)', url: 'https://doi.org/10.1027/1015-5759/a000644' },
        { label: 'Référence des facettes', url: 'https://jobcannon.io/research/ipip-neo-120' },
      ],
    },
    {
      emoji: '📜',
      name: 'Les épreuves',
      body:
        "Les deux épreuves utilisent des phrases de l'**International Personality Item Pool (IPIP)**, une collection libre et publique d'items de personnalité tenue par l'Oregon Research Institute.\n\n" +
        "📜 **Épreuve classique** : l'IPIP-NEO-120, 120 phrases, 4 par facette (Johnson, 2014).\n" +
        "📚 **Grande Épreuve** : l'IPIP-NEO-300, 300 phrases, 10 par facette (Goldberg, 1999).\n\n" +
        "🇫🇷 **En français**, les phrases viennent de la traduction de l'IPIP-NEO-300 par **Thiry et Piolti (2023)**. L'Épreuve classique reprend les mêmes phrases pour ses 120 questions.\n\n" +
        "Auracle garde les phrases telles qu'elles ont été publiées, sauf deux phrases sur le vote, reformulées pour avoir du sens dans tous les pays.",
      links: [
        { label: "Site officiel de l'IPIP", url: 'https://ipip.ori.org/' },
        { label: 'Étude de Johnson (2014)', url: 'https://doi.org/10.1016/j.jrp.2014.05.003' },
      ],
    },
    {
      emoji: '🤖',
      name: "Auracle et l'IA",
      body:
        '*Quelques mots de Zenckoo :*\n\n' +
        "Chaque nouvelle technologie a soulevé les mêmes doutes au début. Je crois qu'il faut vivre avec son temps : l'IA est un outil utile, qui mérite d'être exploré. Elle me permet de construire des idées que je n'aurais jamais pu construire seul, et Auracle en fait partie.\n\n" +
        "Mais un outil doit aider les gens, pas les remplacer, surtout dans l'art et l'audiovisuel. La Recommandation de l'UNESCO sur l'éthique de l'IA, adoptée par 193 pays, va dans ce sens : l'IA ne doit jamais remplacer la responsabilité finale des êtres humains. Elle demande aussi de la transparence, et que chacun puisse comprendre l'IA. C'est pour ça que cette page existe.\n\n" +
        "🛠️ **Dans Auracle :** **Claude**, une IA d'Anthropic, aide pour le code et les textes, toujours vérifiés par moi. Elle ne voit jamais tes données. Les dessins seront toujours faits par des humains.\n" +
        "🔒 **Vie privée :** tes réponses ne passent jamais par une IA, et Auracle ne garde que ce dont il a besoin. Seules les bannières sont vérifiées par une IA, pour la sécurité, sur les serveurs de Cloudflare.\n" +
        "⚖️ **Équité :** une IA peut avoir des biais. Tes résultats viennent d'une formule fixe basée sur la recherche publique, la même pour tout le monde.\n\n" +
        "**💡 Utiliser l'IA sainement**\n" +
        "🧠 Réfléchis à ton idée avant de demander.\n" +
        "🔍 Vérifie ce qu'elle dit : elle peut se tromper.\n" +
        "🎯 Garde le dernier mot.\n" +
        "🤝 Elle ne remplace jamais les amis, les artistes ou les professionnels.\n" +
        "🌱 Utilise-la quand elle aide vraiment : l'IA consomme beaucoup d'énergie.\n\n" +
        '-# Zenckoo 💜',
      links: [
        { label: "L'UNESCO et l'éthique de l'IA", url: 'https://www.unesco.org/fr/artificial-intelligence/recommendation-ethics' },
        { label: 'IA et esprit critique (en anglais)', url: 'https://doi.org/10.1145/3706598.3713778' },
      ],
    },
    {
      emoji: '🛡️',
      name: 'Pour le staff des serveurs',
      body:
        "Tu penses ajouter Auracle à ton serveur ? Voici ce qu'il faut savoir :\n\n" +
        "⚙️ **Ce qu'il fait :** Auracle répond seulement à ses propres commandes. Il ne lit jamais tes salons, n'envoie jamais de messages de lui-même, et n'a besoin d'aucune permission d'admin ou de modération.\n\n" +
        "🌍 **Langue :** Auracle suit la langue de ton serveur sur Discord. Le staff peut la changer dans ⚙️ Réglages du serveur, dans `/auracle`.\n\n" +
        "🏰 **Rôles de guilde (facultatif) :** le staff peut les activer dans ⚙️ Réglages du serveur. Auracle crée alors les quatre rôles de guilde et donne à chaque membre avec une carte publique le rôle de sa guilde. Pour ça seulement, il demande **Gérer les rôles**, et il ne touche jamais aux autres rôles.\n\n" +
        "👀 **Ce que voient les membres :** la **Comparaison**, les **Guildes** et les cartes publiques sont postées dans le salon. Tout le reste reste privé pour le membre.\n\n" +
        "🔒 **Ce qu'il garde :** les réponses et résultats d'un membre, et les serveurs où il a utilisé Auracle (seulement pour les Guildes et les rôles de guilde). Les membres peuvent tout effacer avec `/oublier`. Les cartes privées ne sont jamais montrées ni comptées.\n\n" +
        "🚫 **Ce que ce n'est pas :** un diagnostic, un outil de modération, ou un moyen de trier, classer ou sélectionner les membres. Ne vous servez jamais des résultats pour juger qui que ce soit.\n\n" +
        "💬 **Un problème ou une question ?** Utilise 📬 Avis dans `/auracle` : les messages arrivent directement à Zenckoo.",
      links: [
        { label: "Conditions d'utilisation", url: 'https://auracle-site.pages.dev/terms' },
        { label: 'Politique de confidentialité', url: 'https://auracle-site.pages.dev/privacy' },
      ],
    },
    {
      emoji: '✨',
      name: 'À propos d\'Auracle',
      body:
        "Auracle est créé avec soin par **Zenckoo**. Il est en **bêta publique** : ouvert à tout le monde, toujours en train de grandir, et façonné par vos retours.\n\n" +
        "🤖 Une partie de son code et de ses textes est créée avec l'aide de **Claude**, une IA d'Anthropic. Ses dessins et illustrations seront toujours faits par des mains humaines, jamais par une IA. Plus de détails dans **Auracle et l'IA**.\n\n" +
        "💡 Un bug ou une idée ? Utilise **📬 Avis** dans `/auracle`. Curieux·se de ce qui arrive ? Regarde les **📜 Nouveautés**.\n\n" +
        "🌐 Auracle a son propre site web : **auracle-site.pages.dev**\n\n" +
        '-# Icône de boule de cristal par Lorc, de game-icons.net, sous licence CC BY 3.0.\n' +
        "-# Auracle n'est affilié ni à Discord ni à Anthropic.",
      links: [
        { label: 'Site web', url: 'https://auracle-site.pages.dev' },
        { label: 'Politique de confidentialité', url: 'https://auracle-site.pages.dev/privacy' },
        { label: "Conditions d'utilisation", url: 'https://auracle-site.pages.dev/terms' },
      ],
    },
  ],
};
