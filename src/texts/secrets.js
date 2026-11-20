// secrets: the English texts are in en/secrets.js, the translations in fr/ and de/ (same shape).
// A missing translation falls back to English.

import { localized } from '../core/i18n.js';
import * as en from './en/secrets.js';
import * as fr from './fr/secrets.js';
import * as de from './de/secrets.js';

export const secretTexts = localized({ en: en.secretTexts, fr: fr.secretTexts, de: de.secretTexts });
