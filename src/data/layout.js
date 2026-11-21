// 🗂️ Organize card: the 4 parts of the card a traveler can move or hide.
// The banner and the class header always stay on top, the badges and the date always at the bottom.
// Saved as "about,tastes,-blessings,traits" ("-" = hidden). Never rename a key, only its text.

import { localized } from '../core/i18n.js';
import * as fr from '../texts/fr/data.js';
import * as de from '../texts/de/data.js';

const EN_PARTS = {
  about: { emoji: '💬', name: 'About me' },
  tastes: { emoji: '🎮', name: 'Tastes & practical' },
  blessings: { emoji: '💌', name: 'Blessings' },
  traits: { emoji: '📊', name: 'Traits' },
};
export const PARTS = localized({ en: EN_PARTS, fr: fr.parts, de: de.parts });

const DEFAULT_ORDER = ['about', 'tastes', 'blessings', 'traits'];

// [{ key, hidden }] in the traveler's order. Unknown keys are dropped, missing ones added at the end.
export function cardLayout(profile) {
  const saved = (profile.card_layout ?? '').split(',').filter(Boolean).map((k) => ({ key: k.replace(/^-/, ''), hidden: k.startsWith('-') }));
  const seen = new Set();
  const parts = saved.filter((p) => p.key in PARTS && !seen.has(p.key) && seen.add(p.key));
  for (const key of DEFAULT_ORDER) if (!seen.has(key)) parts.push({ key, hidden: false });
  return parts;
}

export function layoutText(parts) {
  const text = parts.map((p) => (p.hidden ? `-${p.key}` : p.key)).join(',');
  return text === DEFAULT_ORDER.join(',') ? null : text;
}
