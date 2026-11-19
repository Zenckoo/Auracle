// Link buttons to Auracle's website and legal pages, so the bot and the site stay connected.

import { ui } from './ui.js';
import { SITE } from '../config.js';
import { texts } from '../texts/en.js';

const LINKS = {
  home: { url: SITE.home, emoji: '🌐' },
  privacy: { url: SITE.privacy, emoji: '🔒' },
  terms: { url: SITE.terms, emoji: '📜' },
};

// A row of link buttons, for example siteLinks('terms', 'privacy').
export function siteLinks(...keys) {
  return ui.row(...keys.map((k) => ui.linkButton({ url: LINKS[k].url, label: texts.common.links[k], emoji: LINKS[k].emoji })));
}
