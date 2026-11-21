// profile: the English texts are in en/profile.js, the French ones in fr/ (same shape).
// A missing translation falls back to English.

import { localized } from '../core/i18n.js';
import * as en from './en/profile.js';
import * as fr from './fr/profile.js';

export const profileTexts = localized({ en: en.profileTexts, fr: fr.profileTexts });
