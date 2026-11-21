// server: the English texts are in en/server.js, the French ones in fr/ (same shape).
// A missing translation falls back to English.

import { localized } from '../core/i18n.js';
import * as en from './en/server.js';
import * as fr from './fr/server.js';

export const serverTexts = localized({ en: en.serverTexts, fr: fr.serverTexts });
