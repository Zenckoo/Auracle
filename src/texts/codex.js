// codex: the English texts are in en/codex.js, the translations in fr/ and de/ (same shape).
// A missing translation falls back to English.

import { localized } from '../core/i18n.js';
import * as en from './en/codex.js';
import * as fr from './fr/codex.js';
import * as de from './de/codex.js';

export const codexTexts = localized({ en: en.codexTexts, fr: fr.codexTexts, de: de.codexTexts });
