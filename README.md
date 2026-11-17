# 🔮 Auracle

Un bot Discord qui fait passer le test de personnalité Big Five (IPIP-NEO) et révèle à chacun sa classe de héros.

Crafted with care by Zenckoo ✨

## Comment il fonctionne

- Hébergé gratuitement sur Cloudflare Workers
- Uniquement des commandes slash et des boutons, pas besoin d'être allumé en permanence
- La seule partie liée à Cloudflare est `src/index.js` : le reste peut déménager chez un autre hébergeur

## Organisation

- `src/index.js` : point d'entrée Cloudflare
- `src/discord/` : sécurité Discord et enregistrement des commandes
- `src/commands/` : une commande par fichier
- `src/core/ui.js` : construction des messages (Components V2)
- `src/texts/en.js` : tous les textes en anglais

## Clés secrètes (dans Cloudflare, jamais dans le code)

- `DISCORD_APPLICATION_ID`
- `DISCORD_PUBLIC_KEY`
- `DISCORD_TOKEN`
- `REGISTER_KEY` (un mot de passe au choix, pour enregistrer les commandes)
