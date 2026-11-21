// organize: the English texts are in en/organize.js, the French ones in fr/ (same shape).
// A missing translation falls back to English.

import { localized } from '../core/i18n.js';
import * as en from './en/organize.js';
import * as fr from './fr/organize.js';

export const organizeTexts = localized({ en: en.organizeTexts, fr: fr.organizeTexts });
