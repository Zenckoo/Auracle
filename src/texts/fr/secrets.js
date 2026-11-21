// secrets (fr): translations of en/secrets.js, same shape. Missing keys fall back to English.

import { CHANGE_LATER } from './main.js';

export const secretTexts = {
  pageLabel: 'Secrets',
  title: '### 🗝️ Secrets cachés',
  intro: '-# Les facettes qui se démarquent le plus de leur trait.',
  line: (emoji, facet, facetPct, trait, traitPct) =>
    `**${emoji} ${facet}**\n-# Plus haut que ${facetPct} % des voyageur·ses, alors que ton score en ${trait} est plus haut que ${traitPct} %.`,
  question: (facet, facetPct, trait, traitPct) =>
    '### 🗝️ Ton secret caché\n' +
    `**${facet}** · plus haut que ${facetPct} % des voyageur·ses\n` +
    `-# Étonnant, puisque ton score en ${trait} est plus haut que ${traitPct} %.\n\n` +
    'Ce secret doit-il apparaître sur ta carte ?',
  show: 'Le montrer',
  hide: 'Le garder caché',
  shown: `### 🗝️ Ton secret brille maintenant sur ta carte\n${CHANGE_LATER}`,
  hidden: `### 🤫 Ton secret reste caché\n${CHANGE_LATER}`,
  privacyLine: (shown) => `Secret caché : **${shown ? '🗝️ Montré' : '🤫 Caché'}**`,
};
