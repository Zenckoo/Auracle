// banner: the English texts are in en/banner.js, the French ones in fr/ (same shape).
// A missing translation falls back to English.

import { localized } from '../core/i18n.js';
import * as en from './en/banner.js';
import * as fr from './fr/banner.js';

export const bannerTexts = localized({ en: en.bannerTexts, fr: fr.bannerTexts });
