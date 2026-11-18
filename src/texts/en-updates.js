// English texts for /updates. Add a new block at the top of "versions" for each release
// (v1.0.1 small fix, v1.1 new feature, v2.0 big change), and remove it from "soon".

export const updatesTexts = {
  newTitle: "### 📜 What's new",
  versions: [
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
  soonTitle: '### 🔮 Coming soon',
  soon: [
    'The **Grand Trial**: 300 questions for the deepest journey',
    '🗝️ **Hidden secrets**: the facet that surprises the most',
    'Profile banners',
    'More languages: French, German and Japanese',
  ],
  footer: '-# Have an idea? Share it with `/feedback`.',
};
