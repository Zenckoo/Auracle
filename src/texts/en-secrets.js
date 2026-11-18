// English texts for Hidden secrets.

export const secretTexts = {
  pageLabel: 'Secrets',
  title: '### 🗝️ Hidden secrets',
  intro: '-# The facets that stand out the most from their trait.',
  line: (emoji, facet, facetPct, trait, traitPct) =>
    `**${emoji} ${facet}**\n-# Higher than ${facetPct}% of travelers, while your ${trait} is higher than ${traitPct}%.`,
  question: (facet, facetPct, trait, traitPct) =>
    '### 🗝️ Your hidden secret\n' +
    `**${facet}** · higher than ${facetPct}% of travelers\n` +
    `-# Surprising, since your ${trait} is higher than ${traitPct}%.\n\n` +
    'Shall this secret appear on your card?',
  show: 'Show it',
  hide: 'Keep it hidden',
  shown: '### 🗝️ Your secret now shines on your card\n-# You can change this anytime with 🔒 Privacy in `/auracle`.',
  hidden: '### 🤫 Your secret stays hidden\n-# You can change this anytime with 🔒 Privacy in `/auracle`.',
  cardLine: (facet, pct) => `🗝️ Hidden secret: **${facet}** · higher than ${pct}% of travelers`,
  privacyLine: (shown) => `Hidden secret: **${shown ? '🗝️ Shown' : '🤫 Hidden'}**`,
};
