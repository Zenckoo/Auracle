// trials: the English texts are in en/trials.js, the translations in fr/ and de/ (same shape).
// A missing translation falls back to English.

import { localized } from '../core/i18n.js';
import * as en from './en/trials.js';
import * as fr from './fr/trials.js';
import * as de from './de/trials.js';

export const trialTexts = localized({ en: en.trialTexts, fr: fr.trialTexts, de: de.trialTexts });
