// privacy: the English texts are in en/privacy.js, the French ones in fr/ (same shape).
// A missing translation falls back to English.

import { localized } from '../core/i18n.js';
import * as en from './en/privacy.js';
import * as fr from './fr/privacy.js';

export const privacyTexts = localized({ en: en.privacyTexts, fr: fr.privacyTexts });
export const forgetTexts = localized({ en: en.forgetTexts, fr: fr.forgetTexts });
