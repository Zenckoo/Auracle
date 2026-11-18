// English texts for /updates. Add a new block at the TOP of "versions" for each release
// (v1.0.1 small fix, v1.1 new feature, v2.0 big change), and remove it from "soon".
// Each version gets its own page in What's new, newest first.

export const updatesTexts = {
  newTitle: "### 📜 What's new",
  soonTitle: '### 🔮 Coming soon',
  newTab: "What's new",
  soonTab: 'Coming soon',
  newer: 'Newer',
  older: 'Older',
  page: (n, total) => `Page ${n} / ${total}`,
  versions: [
    {
      name: 'v1.5',
      items: [
        '🧭 Everything now lives in the `/auracle` menu: fewer commands, more buttons',
        'Only four commands remain: `/auracle`, `/awaken`, `/profile` and `/forget`',
        'The Help guide now shows every button of the menu',
      ],
    },
    {
      name: 'v1.4',
      items: [
        '📖 `/codex`: a small book explaining how Auracle works, the Big Five, the trials, your letters, the guilds, your data, with links to the sources',
        'The Codex is also in the `/auracle` menu',
        '🌈 New Codex pages: **Understanding your results**, **Everyone belongs here**, **LGBTQ+ support**, a bigger **If things feel heavy**, **Auracle and AI**, and **For server staff**, with trusted links',
        'The Codex pages are now sorted by importance, starting with support',
      ],
    },
    {
      name: 'v1.3',
      items: [
        '📚 The **Grand Trial**: 300 questions, 10 per facet, for the deepest journey',
        'Choose your path before you begin: Standard Trial or Grand Trial',
        'Your card now shows which trial you took',
      ],
    },
    {
      name: 'v1.2',
      items: [
        '🗝️ **Hidden secrets**: the facets that stand out the most from their trait, on a new page before your facets',
        'Choose to show your top secret on your card, or keep it hidden',
        '`/privacy` now has a second setting for your hidden secret',
      ],
    },
    {
      name: 'v1.1',
      items: [
        '`/compare`: see how well you match with another traveler',
        '`/guilds`: how the guilds are spread across the server',
        '`/auracle`: one menu for everything, no need to type commands',
      ],
    },
    {
      name: 'v1.0',
      items: [
        'The **Standard Trial**: 120 questions to reveal your hero class',
        '16 classes across 4 guilds: 🌙 Dreamers, 📚 Scholars, 🏰 Guardians, 🗺️ Wanderers',
        'Your 5 traits and 30 facets, compared to other travelers',
        'Profile cards with `/profile`, public or private with `/privacy`',
        'Erase everything anytime with `/forget`',
        'Report a bug or share an idea with `/feedback`',
      ],
    },
  ],
  soon: [
    'Profile banners',
    'More languages: French, German and Japanese',
  ],
  footer: '-# Have an idea? Share it with 📬 Feedback in `/auracle`.',
};
