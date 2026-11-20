// English texts for 📜 Updates (a button in /auracle). Add a new block at the TOP of "versions" for each release.
// During the beta, versions are 0.x: v0.7.1 small fix, v0.8 new feature. v1.0 will mark the end of the beta.
// Remove the new features from "soon" once they are out.
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
      name: 'v0.7 · Public beta 🌍',
      items: [
        '🌍 Auracle is now open to every server, in public beta',
        '🏰 **Guild roles**: server staff can turn them on in ⚙️ Server settings, in `/auracle`. Each traveler with a public card gets the role of their guild',
        "Don't want to wear your guild role? Choose it in 🔒 Privacy",
        '🌐 Auracle has its own website, with the Codex, the Privacy Policy and the Terms of Service: **auracle-site.pages.dev**',
        '🔮 A new crystal ball icon and a starry banner',
        '📦 **My data** in 🔒 Privacy: get a file with everything Auracle keeps about you',
        '⚖️ A new, much more detailed Privacy Policy and Terms of Service, with full transparency on AI',
        '🤖 Auracle now credits **Claude**, the AI by Anthropic that helps write its code and texts',
        '📬 Feedback is limited to 5 messages every 24 hours, to keep it spam-free',
        '🔗 Links to the website, the Privacy Policy and the Terms of Service in the `/auracle` menu, Help, Privacy, the Codex and before the trial',
        '🎨 **Customize** in `/auracle`: a fantasy title among 15, an accent color for the border of your card, an **About me** sentence and your **current vibe**',
        '🎮 **Tastes & fun**: games, anime, music, favorite people, the kind of company you are looking for, and your DM preference',
        '🕰️ **Practical**: your local time, the languages you speak (more than 150, from Swahili to Māori) and your birthday',
        '🌈 **Identity**, if you wish: pronouns, gender, orientation and origins, only with your consent and private by default',
        "🚩 **Report**: every traveler's card now has a Report button. Pick a reason, and your report goes privately to Zenckoo",
        '📖 A new Codex page, **Identity words**: pronouns, genders and orientations explained simply',
        '🏅 **Badges**: earn them along your journey and show up to 3 on your card. 🌱 **Early Traveler** is only for travelers of the public beta!',
        '🔄 Taking a new trial now keeps your customization and badges',
        "💌 **Blessings**: leave a kind word on another traveler's card with the 💌 Bless button. Nothing appears until they accept it, and they choose up to 3 to show. Earn the 🕊️ **Kind Soul** badge when 3 of your blessings are accepted!",
        '🖼️ **Banners**: upload your own image or GIF on top of your card, in 🎨 Customize. Every banner is checked to keep Auracle safe for everyone',
        '🗂️ **Organize your card**: choose the order of its parts, and hide the ones you want',
        '♿ **Accessibility mode** in 🔒 Privacy: simpler messages for screen readers, with words instead of bars and no decorative emojis',
        '🪪 A cleaner profile card: clear parts with a title each, fewer emojis, and everything about you gathered in one place',
        '📊 More accurate trait percentiles, now based on a published study of 18,591 people (details in the 📖 Codex)',
      ],
    },
    {
      name: 'v0.6 · Private tests',
      items: [
        '🧭 Everything now lives in the `/auracle` menu: fewer commands, more buttons',
        'Only four commands remain: `/auracle`, `/awaken`, `/profile` and `/forget`',
        'The Help guide now shows every button of the menu',
      ],
    },
    {
      name: 'v0.5 · Private tests',
      items: [
        '📖 `/codex`: a small book explaining how Auracle works, the Big Five, the trials, your letters, the guilds, your data, with links to the sources',
        'The Codex is also in the `/auracle` menu',
        '🌈 New Codex pages: **Understanding your results**, **Everyone belongs here**, **LGBTQ+ support**, a bigger **If things feel heavy**, **Auracle and AI**, and **For server staff**, with trusted links',
        'The Codex pages are now sorted by importance, starting with support',
      ],
    },
    {
      name: 'v0.4 · Private tests',
      items: [
        '📚 The **Grand Trial**: 300 questions, 10 per facet, for the deepest journey',
        'Choose your path before you begin: Standard Trial or Grand Trial',
        'Your card now shows which trial you took',
      ],
    },
    {
      name: 'v0.3 · Private tests',
      items: [
        '🗝️ **Hidden secrets**: the facets that stand out the most from their trait, on a new page before your facets',
        'Choose to show your top secret on your card, or keep it hidden',
        '`/privacy` now has a second setting for your hidden secret',
      ],
    },
    {
      name: 'v0.2 · Private tests',
      items: [
        '`/compare`: see how well you match with another traveler',
        '`/guilds`: how the guilds are spread across the server',
        '`/auracle`: one menu for everything, no need to type commands',
      ],
    },
    {
      name: 'v0.1 · Private tests',
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
    '🔑 **Log in with Discord** on the website',
    '🎨 **Customize your card on the website**, with even more options, like moving and cropping your banner',
    '🗣️ More languages: French, German and Japanese',
  ],
  footer: '-# Have an idea? Share it with 📬 Feedback in `/auracle`.',
};
