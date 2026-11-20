// report: the English texts are in en/report.js, the translations in fr/ and de/ (same shape).
// A missing translation falls back to English.

import { localized } from '../core/i18n.js';
import * as en from './en/report.js';
import * as fr from './fr/report.js';
import * as de from './de/report.js';

export const reportTexts = localized({ en: en.reportTexts, fr: fr.reportTexts, de: de.reportTexts });
