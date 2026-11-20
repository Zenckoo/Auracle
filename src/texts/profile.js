// profile: the English texts are in en/profile.js, the translations in fr/ and de/ (same shape).
// A missing translation falls back to English.

import { localized } from '../core/i18n.js';
import * as en from './en/profile.js';
import * as fr from './fr/profile.js';
import * as de from './de/profile.js';

export const profileTexts = localized({ en: en.profileTexts, fr: fr.profileTexts, de: de.profileTexts });
