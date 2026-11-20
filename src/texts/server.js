// server: the English texts are in en/server.js, the translations in fr/ and de/ (same shape).
// A missing translation falls back to English.

import { localized } from '../core/i18n.js';
import * as en from './en/server.js';
import * as fr from './fr/server.js';
import * as de from './de/server.js';

export const serverTexts = localized({ en: en.serverTexts, fr: fr.serverTexts, de: de.serverTexts });
