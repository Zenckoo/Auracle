// badges: the English texts are in en/badges.js, the translations in fr/ and de/ (same shape).
// A missing translation falls back to English.

import { localized } from '../core/i18n.js';
import * as en from './en/badges.js';
import * as fr from './fr/badges.js';
import * as de from './de/badges.js';

export const badgeTexts = localized({ en: en.badgeTexts, fr: fr.badgeTexts, de: de.badgeTexts });
