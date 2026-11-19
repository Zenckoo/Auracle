// English texts for 🗂️ Organize card (in Customize).

export const organizeTexts = {
  page: 'Organize',
  title: '### 🗂️ Organize your card',
  intro: '-# Choose the order of your card, and hide what you want. Your banner and class always stay on top, your badges at the bottom.',
  line: (n, emoji, name, hidden) => `**${n}.** ${emoji} ${hidden ? `~~${name}~~ · 🙈 Hidden` : name}`,
  up: 'Up',
  hide: 'Hide',
  show: 'Show',
  reset: 'Default order',
  saved: '### ✨ Your card has been updated.',
};
