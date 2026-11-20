// customize: the English texts are in en/customize.js, the translations in fr/ and de/ (same shape).
// A missing translation falls back to English.

import { localized } from '../core/i18n.js';
import * as en from './en/customize.js';
import * as fr from './fr/customize.js';
import * as de from './de/customize.js';

export const customizeTexts = localized({ en: en.customizeTexts, fr: fr.customizeTexts, de: de.customizeTexts });
