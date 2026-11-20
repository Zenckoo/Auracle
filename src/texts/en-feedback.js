// English texts for 📬 Feedback (a button in /auracle).

export const feedbackTexts = {
  question: '### 📬 Speak, traveler.\nDid something break, or do you have an idea for Auracle?',
  bugButton: 'Report a bug',
  ideaButton: 'Suggest an idea',
  bug: {
    title: 'Report a bug',
    label: 'What happened?',
    placeholder: 'Tell me what you did and what went wrong.',
    heading: '### 🐞 Bug report',
  },
  idea: {
    title: 'Suggest an idea',
    label: 'Your idea',
    placeholder: 'What would make Auracle even better?',
    heading: '### 💡 New idea',
  },
  from: (userId, name) => `-# From <@${userId}> (${name})`,
  thanks: '### 💜 Thank you, traveler\nYour message has reached Zenckoo.',
  failed: '### ⚠️ The message got lost\nPlease try again in a moment.',
  limitNote: '-# Up to 5 messages every 24 hours. Spamming Feedback leads to an automatic 30-day block from Auracle.',
};

// Shown when a traveler is blocked from Auracle. until: timestamp in milliseconds.
export const banTexts = {
  spamReason: 'Feedback spam',
  blocked: (until) =>
    '### ⛔ Auracle is resting for you\n' +
    `You sent too many Feedback messages, so Auracle is blocked for you until <t:${Math.floor(until / 1000)}:D>.\n` +
    '-# You can still erase your data with `/forget`. Think this is a mistake? Write to auracle.contact@gmail.com',
};
