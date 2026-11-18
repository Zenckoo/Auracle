// English texts for /feedback.

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
};
