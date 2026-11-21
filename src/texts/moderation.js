// moderation: the English texts are in en/moderation.js, the French ones in fr/ (same shape).
// A missing translation falls back to English.

import { localized } from '../core/i18n.js';
import * as en from './en/moderation.js';
import * as fr from './fr/moderation.js';

export const moderationTexts = localized({ en: en.moderationTexts, fr: fr.moderationTexts });
