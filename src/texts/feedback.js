// feedback: the English texts are in en/feedback.js, the French ones in fr/ (same shape).
// A missing translation falls back to English.

import { localized } from '../core/i18n.js';
import * as en from './en/feedback.js';
import * as fr from './fr/feedback.js';

export const feedbackTexts = localized({ en: en.feedbackTexts, fr: fr.feedbackTexts });
export const banTexts = localized({ en: en.banTexts, fr: fr.banTexts });
