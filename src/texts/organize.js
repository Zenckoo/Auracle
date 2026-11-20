// organize: the English texts are in en/organize.js, the translations in fr/ and de/ (same shape).
// A missing translation falls back to English.

import { localized } from '../core/i18n.js';
import * as en from './en/organize.js';
import * as fr from './fr/organize.js';
import * as de from './de/organize.js';

export const organizeTexts = localized({ en: en.organizeTexts, fr: fr.organizeTexts, de: de.organizeTexts });
