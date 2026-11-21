# 🔮 Auracle

Un compagnon social pour Discord : une épreuve de personnalité Big Five (IPIP-NEO), 16 classes de héros dans 4 guildes, des cartes de profil, et un site web relié au bot.

Crafted with care by Zenckoo ✨ · Code et textes écrits avec l'aide de Claude (Anthropic).

## Comment il fonctionne

- Hébergé gratuitement sur Cloudflare : le bot sur Workers, la base de données sur D1, les bannières sur R2 (vérifiées par Workers AI), le site sur Pages
- Uniquement des commandes slash et des boutons, pas besoin d'être allumé en permanence
- 4 commandes : `/auracle` (le menu avec tous les boutons), `/awaken`, `/profile`, `/forget`
- Chaque nuit, un nettoyage automatique efface les vieilles données (voir `scheduled()` dans `src/index.js`)
- La seule partie liée à Cloudflare est `src/index.js` : le reste peut déménager chez un autre hébergeur
- Versions : 0.x pendant la bêta (v0.7 = bêta publique, v0.8 = français), v1.0 à la sortie de bêta. Chaque version est notée dans `src/texts/en/updates.js` et `src/texts/fr/updates.js`
- Langues : anglais et français. Chaque serveur a sa langue (⚙️ Server settings), sinon celle du serveur sur Discord. Une langue pas encore finie (`ready: false` dans `src/core/i18n.js`) n'est visible que sur le QG

## Organisation

- `src/index.js` : point d'entrée Cloudflare (interactions Discord, blocages, nettoyage de nuit)
- `src/router.js` : envoie chaque commande, bouton et formulaire au bon fichier
- `src/discord/` : sécurité Discord et enregistrement des commandes
- `src/commands/` : une fonction par fichier (épreuve, carte, menu, Privacy, Codex, Guilds, Feedback...)
- `src/core/` : base de données (`store.js`), calcul des résultats, rôles de guilde, messages Discord, liens vers le site
- `src/core/i18n.js` : les langues, et la langue de chaque requête
- `src/data/` : questions des épreuves (anglais, et français dans `src/data/fr/`), classes, données de référence
- `src/texts/` : tous les textes, un fichier par fonction et par langue (`en/`, `fr/`, `de/`). Ce qui manque dans une langue s'affiche en anglais
- `src/config.js` : réglages publics (identifiant du bot, liens du site, permission demandée)
- `migrations/` : la structure de la base de données, dans l'ordre
- `site/` : le site web (accueil, Codex, Privacy Policy, Terms of Service), en anglais et en français (`site/fr/`), mis en ligne par Cloudflare Pages
- `tools/gencodex.mjs` : refait les pages Codex du site à partir des textes du bot (`node tools/gencodex.mjs write`)

## Clés secrètes (dans Cloudflare, jamais dans le code)

- `DISCORD_APPLICATION_ID`
- `DISCORD_PUBLIC_KEY`
- `DISCORD_TOKEN`
- `REGISTER_KEY` (un mot de passe au choix, pour enregistrer les commandes)
