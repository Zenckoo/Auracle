// English texts for the 🚩 Report button on traveler cards.
// Reports go to a private moderation channel on the HQ server, read only by Zenckoo.

export const reportTexts = {
  button: 'Report',
  choose: '### 🚩 Report this card\nWhat on this card breaks the rules?\n-# Your report goes privately to Zenckoo. The traveler is never told who reported them.',
  placeholder: 'Choose a reason',
  reasons: {
    banner: { label: 'Banner', emoji: '🖼️' },
    about: { label: 'About me', emoji: '💬' },
    vibe: { label: 'Current vibe', emoji: '🌙' },
    blessing: { label: 'Blessing', emoji: '💌' },
    info: { label: 'Profile info', emoji: '📝' },
    other: { label: 'Something else', emoji: '❓' },
  },
  form: {
    title: 'Report this card',
    label: 'Details (optional)',
    labelOther: 'What is wrong?',
    placeholder: 'Tell Zenckoo what breaks the rules.',
  },
  heading: (emoji, label) => `### 🚩 Report: ${emoji} ${label}`,
  reported: (userId, name) => `**Reported:** <@${userId}> (${name})\n-# User ID ${userId}`,
  card: (cls, type) => `-# Card at the time of the report: ${cls} (${type})`,
  from: (userId, name, guildId) => `-# From <@${userId}> (${name})${guildId ? ` · Server ${guildId}` : ''}`,
  noDetails: '-# No details given.',
  thanks: '### 💜 Thank you, traveler\nYour report has reached Zenckoo, who will look at it personally.',
  failed: '### ⚠️ The report got lost\nPlease try again in a moment.',
  self: '### 🪞 Your own card\nYou cannot report your own card, traveler. You can change it anytime.',
  gone: '### 🌫️ Card not found\nThis card is private or no longer exists.',
  already: '### 🚩 Already reported\nYou already reported this card in the last 24 hours. Zenckoo will look at it.',
  limit: '### ⏳ Too many reports\nYou can send up to 5 reports every 24 hours. Please try again later.',
};
