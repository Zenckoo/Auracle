// updates: the English texts are in en/updates.js, the translations in fr/ and de/ (same shape).
// A missing translation falls back to English.

import { localized } from '../core/i18n.js';
import * as en from './en/updates.js';
import * as fr from './fr/updates.js';
import * as de from './de/updates.js';

export const updatesTexts = localized({ en: en.updatesTexts, fr: fr.updatesTexts, de: de.updatesTexts });
