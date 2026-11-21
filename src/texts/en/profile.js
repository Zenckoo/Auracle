// English texts for the profile card (/profile, 🪪 My card).

export const profileTexts = {
  cardLabel: (name) => `-# ${name}'s traveler card`,
  privateNote: '-# 🔒 Your card is private. Only you can see it.',
  notAwakenedSelf: "### 🌫️ No class yet\nYou haven't faced the trial yet, traveler. Begin your journey with `/awaken`.",
  notAwakenedOther: () => '### 🌫️ Still unknown\nThis traveler has not yet faced the trial. Their class remains unknown.',
  privateOther: () => "### 🔒 A hidden path\nThis traveler's class remains a mystery...",
  bot: '### 🤖 No soul to reveal\nBots cannot take the trial... yet.',

  // The parts of the card: one title and one emoji per part, then simple "Name · value" lines.
  tastesTitle: '**🎮 Tastes**',
  tasteLabels: { games: 'Games', shows: 'Anime & series', music: 'Music', characters: 'Favorites' },
  askAbout: (text) => `Ask me about ${text}`,
  localTime: (time, city) => `${time} in ${city}`,
  birthday: (date) => `Birthday ${date}`,
  birthdayToday: '**🎂 Birthday today!**',
  lookingFor: (list) => `Looking for ${list}`,
  dms: { open: 'DMs open', ask: 'DMs: ask first', closed: 'DMs closed' },
  blessingsTitle: '**💌 Blessings**',
  blessing: (text, authorId) => `*"${text}"* · <@${authorId}>`,
  traitsTitle: '**📊 Traits**',
  secret: (facet, pct) => `-# 🗝️ Hidden secret: **${facet}** · higher than ${pct}% of travelers`,
  footer: (trial, timestamp) => `-# ${trial} · Awakened <t:${timestamp}:D> · A fun estimate, not a diagnosis`,
};
