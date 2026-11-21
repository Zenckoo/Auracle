// Link buttons to Auracle's website and legal pages, so the bot and the site stay connected.

import { ui } from './ui.js';
import { SITE } from '../config.js';
import { currentLang } from './i18n.js';
import { texts } from '../texts/main.js';

const LINKS = {
  home: { url: SITE.home, emoji: '🌐' },
  privacy: { url: SITE.privacy, emoji: '🔒' },
  terms: { url: SITE.terms, emoji: '📜' },
};

// One link button, for example siteLink('home').
// The French pages live under /fr/ (auracle-site.pages.dev/fr/privacy...).
export function siteUrl(key) {
  const url = LINKS[key].url;
  if (currentLang() !== 'fr') return url;
  const path = new URL(url).pathname.replace(/^\/$/, '');
  return `${SITE.home}/fr${path || '/'}`;
}

// One link button, for example siteLink('home'), in the server's language.
export function siteLink(key) {
  return ui.linkButton({ url: siteUrl(key), label: texts.common.links[key], emoji: LINKS[key].emoji });
}

// A row of link buttons, for example siteLinks('terms', 'privacy').
export function siteLinks(...keys) {
  return ui.row(...keys.map(siteLink));
}
