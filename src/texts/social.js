// social: the English texts are in en/social.js, the French ones in fr/ (same shape).
// A missing translation falls back to English.

import { localized } from '../core/i18n.js';
import * as en from './en/social.js';
import * as fr from './fr/social.js';

export const compareTexts = localized({ en: en.compareTexts, fr: fr.compareTexts });
export const guildsTexts = localized({ en: en.guildsTexts, fr: fr.guildsTexts });
