// English texts for Hidden secrets.

import { CHANGE_LATER } from './main.js';

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
  shown: `### 🗝️ Your secret now shines on your card\n${CHANGE_LATER}`,
  hidden: `### 🤫 Your secret stays hidden\n${CHANGE_LATER}`,
  privacyLine: (shown) => `Hidden secret: **${shown ? '🗝️ Shown' : '🤫 Hidden'}**`,
};
