// Link buttons to Auracle's website and legal pages, so the bot and the site stay connected.

import { ui } from './ui.js';
import { SITE } from '../config.js';
import { texts } from '../texts/main.js';

const LINKS = {
  home: { url: SITE.home, emoji: '🌐' },
  privacy: { url: SITE.privacy, emoji: '🔒' },
  terms: { url: SITE.terms, emoji: '📜' },
};

// One link button, for example siteLink('home').
export function siteLink(key) {
  return ui.linkButton({ url: LINKS[key].url, label: texts.common.links[key], emoji: LINKS[key].emoji });
}

// A row of link buttons, for example siteLinks('terms', 'privacy').
export function siteLinks(...keys) {
  return ui.row(...keys.map(siteLink));
}
