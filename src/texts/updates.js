// updates: the English texts are in en/updates.js, the French ones in fr/ (same shape).
// A missing translation falls back to English.

import { localized } from '../core/i18n.js';
import * as en from './en/updates.js';
import * as fr from './fr/updates.js';

export const updatesTexts = localized({ en: en.updatesTexts, fr: fr.updatesTexts });
