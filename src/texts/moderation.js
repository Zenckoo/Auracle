// moderation: the English texts are in en/moderation.js, the translations in fr/ and de/ (same shape).
// A missing translation falls back to English.

import { localized } from '../core/i18n.js';
import * as en from './en/moderation.js';
import * as fr from './fr/moderation.js';
import * as de from './de/moderation.js';

export const moderationTexts = localized({ en: en.moderationTexts, fr: fr.moderationTexts, de: de.moderationTexts });
