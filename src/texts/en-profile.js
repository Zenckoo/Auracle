// English texts for /profile (as validated in the plan).

export const profileTexts = {
  cardLabel: (name) => `-# ${name}'s traveler card`,
  awakened: (timestamp) => `-# Awakened <t:${timestamp}:D>`,
  privateNote: '-# 🔒 Your card is private. Only you can see it.',
  notAwakenedSelf: "### 🌫️ No class yet\nYou haven't faced the trial yet, traveler. Begin your journey with `/awaken`.",
  notAwakenedOther: () => '### 🌫️ Still unknown\nThis traveler has not yet faced the trial. Their class remains unknown.',
  privateOther: () => "### 🔒 A hidden path\nThis traveler's class remains a mystery...",
  bot: '### 🤖 No soul to reveal\nBots cannot take the trial... yet.',
};
