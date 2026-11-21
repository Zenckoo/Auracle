// 🎨 Customize > 🎮 Tastes & fun: the free fields, "Looking for" and DM preferences.
// Keys are saved in the database: never rename a key, only its text.
// "Looking for" is only about friendship and hobbies: never dating.

import { showText } from '../core/text.js';
import { profileTexts } from '../texts/profile.js';
import { localized } from '../core/i18n.js';
import * as fr from '../texts/fr/data.js';
import * as de from '../texts/de/data.js';

export const TASTE_MAX = 60;

// The free fields, in the order of the form and of the card.
const EN_TASTE_FIELDS = [
  { key: 'games', emoji: '🎮', label: 'Favorite games', placeholder: 'Stardew Valley, Zelda...' },
  { key: 'shows', emoji: '📺', label: 'Favorite anime or series', placeholder: 'Frieren, Arcane...' },
  { key: 'music', emoji: '🎧', label: 'Favorite music (artists or styles)', placeholder: 'Lo-fi, Hozier...' },
  { key: 'characters', emoji: '⭐', label: 'Favorite people (real or fictional)', placeholder: 'Gandalf, Hayao Miyazaki, Totoro...' },
  { key: 'ask_about', emoji: '💡', label: 'Ask me about...', placeholder: 'Tea, drawing, space...' },
];
export const TASTE_FIELDS = localized({ en: EN_TASTE_FIELDS, fr: fr.tasteFields, de: de.tasteFields });

const EN_LOOKING_FOR = {
  friends: { name: 'Friends', emoji: '🤝' },
  gaming: { name: 'Gaming buddies', emoji: '🎮' },
  art: { name: 'Art friends', emoji: '🎨' },
  chat: { name: 'Someone to chat with', emoji: '💬' },
  study: { name: 'Study buddies', emoji: '📚' },
  music: { name: 'Music buddies', emoji: '🎧' },
};
export const LOOKING_FOR = localized({ en: EN_LOOKING_FOR, fr: fr.lookingFor, de: de.lookingFor });

const EN_DMS = {
  open: { name: 'DMs open', emoji: '🟢' },
  ask: { name: 'Ask first', emoji: '🟡' },
  closed: { name: 'DMs closed', emoji: '🔴' },
};
export const DMS = localized({ en: EN_DMS, fr: fr.dms, de: de.dms });

export function lookingList(profile) {
  return (profile.looking_for ?? '').split(',').filter((k) => k in LOOKING_FOR);
}

// The Tastes & fun lines of a card (empty if nothing is filled).
export function tasteLines(profile) {
  const lines = TASTE_FIELDS.filter((f) => f.key !== 'ask_about' && profile[f.key]).map((f) => `${f.emoji} ${showText(profile[f.key])}`);
  const small = [];
  if (profile.ask_about) small.push(`💡 ${profileTexts.askAbout(showText(profile.ask_about))}`);
  const looking = lookingList(profile);
  if (looking.length) small.push(`🤝 ${profileTexts.lookingFor(looking.map((k) => LOOKING_FOR[k].name.toLowerCase()).join(', '))}`);
  if (DMS[profile.dms]) small.push(`${DMS[profile.dms].emoji} ${DMS[profile.dms].name}`);
  if (small.length) lines.push(`-# ${small.join(' · ')}`);
  return lines;
}
