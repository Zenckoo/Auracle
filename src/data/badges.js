// 🏅 Badges: earned automatically, never lost (only /forget erases them).
// Keys are saved in the database: never rename a key, only its text.
// No badge ever pushes anyone to retake the trial.

// 🌱 Early Traveler is given to everyone who takes the trial while this is true.
// Set it to false when the public beta ends: the badge then becomes unique to beta travelers.
export const BETA = true;

export const SHOW_MAX = 3;
export const KINDRED_GOAL = 5;
export const KIND_SOUL_GOAL = 3;

export const BADGES = {
  early: { emoji: '🌱', name: 'Early Traveler', hint: 'Take the trial during the public beta' },
  grand: { emoji: '📚', name: 'Grand Trial', hint: 'Finish the Grand Trial (300 questions)' },
  kindred: { emoji: '🤝', name: 'Kindred Spirits', hint: `Compare with other travelers ${KINDRED_GOAL} times` },
  messenger: { emoji: '💬', name: 'Messenger', hint: 'Send your first 📬 Feedback' },
  lorekeeper: { emoji: '📖', name: 'Lorekeeper', hint: 'Open every page of the 📖 Codex' },
  painter: { emoji: '🎨', name: 'Apprentice Painter', hint: 'Customize your card for the first time' },
  kindsoul: { emoji: '🕊️', name: 'Kind Soul', hint: `Have ${KIND_SOUL_GOAL} of your 💌 Blessings accepted by other travelers` },
};

function keys(text) {
  return (text ?? '').split(',').filter((k) => k in BADGES);
}

// Badges earned, in the order of BADGES.
export function earnedBadges(profile) {
  const earned = keys(profile.badges);
  return Object.keys(BADGES).filter((k) => earned.includes(k));
}

// Badges shown on the card (only earned ones, 3 at most).
export function shownBadges(profile) {
  const earned = earnedBadges(profile);
  return keys(profile.badges_shown).filter((k) => earned.includes(k)).slice(0, SHOW_MAX);
}

export function badgeName(key) {
  const b = BADGES[key];
  return b ? `${b.emoji} ${b.name}` : null;
}

// The small line on the card: -# 🏅 🌱 Early Traveler · 📚 Grand Trial
export function badgeLine(profile) {
  const shown = shownBadges(profile);
  return shown.length ? `-# 🏅 ${shown.map(badgeName).join(' · ')}` : null;
}

// How many Codex pages were opened (from the codex_seen bits).
export function pagesSeen(profile) {
  let n = 0;
  for (let mask = profile.codex_seen ?? 0; mask; mask >>= 1) n += mask & 1;
  return n;
}
