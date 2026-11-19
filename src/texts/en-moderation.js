// English texts for the moderation buttons under a 🚩 Report (HQ moderation channel, Zenckoo only).

export const moderationTexts = {
  clearAbout: 'Clear About me',
  clearVibe: 'Clear vibe',
  notAllowed: '### 🔒 Moderators only\nOnly Zenckoo can use these buttons.',
  done: (what, userId) => `### ✅ Done\n${what} of <@${userId}> has been cleared.`,
  gone: '### 🌫️ Nothing to clear\nThis traveler has no card anymore.',
  what: { about: 'About me', vibe: 'The vibe' },
};
