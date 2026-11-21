// hub: the English texts are in en/hub.js, the French ones in fr/ (same shape).
// A missing translation falls back to English.

import { localized } from '../core/i18n.js';
import * as en from './en/hub.js';
import * as fr from './fr/hub.js';

export const hubTexts = localized({ en: en.hubTexts, fr: fr.hubTexts });
