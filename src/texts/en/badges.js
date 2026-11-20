// English texts for 🏅 Badges (Customize page, card line, "new badge" notice).

export const badgeTexts = {
  page: 'Badges',
  title: '### 🏅 Badges',
  intro: '-# Earned automatically, and never lost. Choose up to 3 to show on your card.',
  earned: (emoji, name, hint) => `${emoji} **${name}**\n-# ${hint}`,
  locked: (name, hint, progress) => `🔒 **${name}**\n-# ${hint}${progress ? ` (${progress})` : ''}`,
  none: '-# No badge yet. Your journey is just beginning! ✨',
  placeholder: 'Badges shown on your card',
  newBadge: (names, who) => `-# 🏅 New badge unlocked${who ? ` for ${who}` : ''}: ${names}! Choose the badges on your card in 🎨 Customize > 🏅 Badges.`,
};
