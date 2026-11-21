// blessings: the English texts are in en/blessings.js, the French ones in fr/ (same shape).
// A missing translation falls back to English.

import { localized } from '../core/i18n.js';
import * as en from './en/blessings.js';
import * as fr from './fr/blessings.js';

export const blessingTexts = localized({ en: en.blessingTexts, fr: fr.blessingTexts });
