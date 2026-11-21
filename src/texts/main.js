// main: the English texts are in en/main.js, the French ones in fr/ (same shape).
// A missing translation falls back to English.

import { localized } from '../core/i18n.js';
import * as en from './en/main.js';
import * as fr from './fr/main.js';

export const texts = localized({ en: en.texts, fr: fr.texts });
