// 🌍 Languages. Each server picks the language Auracle speaks there (⚙️ Server settings).
// Without a choice, Auracle follows the language of the server on Discord, or English.
//
// How it works: every Discord request runs "inside" its language (runWithLang), and every text
// object is wrapped with localized({ en, fr, de }). When code reads a text, it gets the version of
// the current language, or the English one when a translation is missing. So the commands never
// need to know which language they speak.

import { AsyncLocalStorage } from 'node:async_hooks';

// ready: false = still being translated. Only the HQ server can pick it, to try it out.
export const LANGS = {
  en: { name: 'English', flag: '🇬🇧', ready: true },
  fr: { name: 'Français', flag: '🇫🇷', ready: true },
  de: { name: 'Deutsch', flag: '🇩🇪', ready: false },
};
export const DEFAULT_LANG = 'en';

const storage = new AsyncLocalStorage();

export function runWithLang(lang, fn) {
  return storage.run(LANGS[lang] ? lang : DEFAULT_LANG, fn);
}

export function currentLang() {
  return storage.getStore() ?? DEFAULT_LANG;
}

// The language a server starts with, from Discord's own setting ('fr', 'de', 'en-US'...).
export function langFromLocale(locale) {
  const short = (locale ?? '').slice(0, 2).toLowerCase();
  return LANGS[short]?.ready ? short : DEFAULT_LANG;
}

const isPlain = (v) => v !== null && typeof v === 'object';

// variants: { en: value, fr: value, de: value }. Objects and arrays stay "live": reading
// texts.awaken.welcome later, during a request, still gives that request's language.
function live(variants) {
  const pick = () => {
    const lang = currentLang();
    return variants[lang] !== undefined ? variants[lang] : variants.en;
  };
  const get = (_, key) => {
    const here = pick();
    const value = here?.[key] !== undefined ? here[key] : variants.en?.[key];
    if (!isPlain(value)) return value;
    return live(Object.fromEntries(Object.keys(LANGS).map((l) => [l, variants[l]?.[key]])));
  };
  const has = (_, key) => key in (pick() ?? {}) || key in (variants.en ?? {});
  // Lists: read by index and length, in the current language.
  if (Array.isArray(variants.en)) return new Proxy([], { get, has: (_, key) => key in (pick() ?? []) });
  return new Proxy({}, {
    get,
    has,
    ownKeys() {
      return Reflect.ownKeys(variants.en ?? {});
    },
    getOwnPropertyDescriptor(_, key) {
      const d = Reflect.getOwnPropertyDescriptor(variants.en ?? {}, key);
      return d ? { ...d, configurable: true } : undefined;
    },
  });
}

export function localized(variants) {
  return live(variants);
}
