// 🏅 Giving badges, and the small "New badge unlocked" line added to the answer that earned them.

import { ui } from './ui.js';
import { showText } from './text.js';
import { BADGES, badgeName } from '../data/badges.js';
import { badgeTexts as B } from '../texts/en-badges.js';
import * as store from './store.js';

// Gives each badge in the list. Returns the keys that are new.
export async function earn(env, userId, ...keys) {
  const fresh = [];
  for (const key of keys) {
    if (key in BADGES && (await store.awardBadge(env, userId, key))) fresh.push(key);
  }
  return fresh;
}

// Adds the "New badge unlocked" line at the top of the answer (its first container).
// who: a name, for public messages (like Compare), so everyone knows whose badge it is.
export function announce(answer, keys, who = null) {
  const container = answer?.data?.components?.[0];
  if (!keys.length || !Array.isArray(container?.components)) return answer;
  const line = B.newBadge(keys.map(badgeName).join(', '), who ? showText(who) : null);
  container.components.unshift(ui.text(line), ui.separator());
  return answer;
}
