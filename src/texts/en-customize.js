// English texts for 🎨 Customize (in the /auracle menu).

export const customizeTexts = {
  hubButton: 'Customize',
  title: '### 🎨 Customize your card',
  intro: '-# Make your card truly yours. Everything is optional, and follows your card: private if your card is private.',
  sealed: '### ✨ Your card has been updated.',
  titleLine: (name) => `**✨ Fantasy title**: ${name ? `*${name}*` : 'None'}\n-# Shown under your class.`,
  titlePlaceholder: 'Choose a fantasy title',
  noTitle: 'No title',
  cardLine: (name) => `✨ *${name}*`,
  colorLine: (name) => `**🎨 Accent color**: ${name ?? 'Guild color'}\n-# The border of your card. Your guild keeps its color with a dot in front of its name.`,
  colorPlaceholder: 'Choose an accent color',
  guildColor: 'Guild color',
  customColor: 'My own hex code...',
  colorForm: {
    title: 'Your own color',
    label: 'Hex code',
    placeholder: '#FF6FAE',
  },
  badColor: '-# ⚠️ That hex code does not look right. Use 6 characters, like **#FF6FAE**.',
  viewCard: 'View my card',
};
