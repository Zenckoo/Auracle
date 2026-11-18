// English texts for /profile.

export const profileTexts = {
  cardLabel: (name) => `-# ${name}'s traveler card`,
  awakened: (timestamp) => `-# Awakened <t:${timestamp}:D>`,
  privateNote: '-# 🔒 Only you can see this card. Make it public with /privacy.',
  notAwakenedSelf: "### 🌫️ No class yet\nYou haven't taken the trial, traveler. Begin your journey with `/awaken`.",
  notAwakenedOther: (name) => `### 🌫️ No class yet\n${name} hasn't taken the trial yet.`,
  privateOther: (name) => `### 🔒 A hidden path\n${name} keeps their class a secret.`,
  bot: '### 🤖 No soul to reveal\nBots cannot take the trial... yet.',
};
