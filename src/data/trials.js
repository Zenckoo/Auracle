// The two trials. Both measure the same 5 traits and 30 facets, so results stay comparable.
// Only the sentences change with the language: the order, traits and scoring stay the same.

import { currentLang } from '../core/i18n.js';
import { IPIP120 } from './ipip120.js';
import { IPIP300 } from './ipip300.js';
import { FR120, FR300 } from './fr/items.js';

const TRIALS = {
  standard: { items: IPIP120, texts: { fr: FR120 } },
  grand: { items: IPIP300, texts: { fr: FR300 } },
};

export function trialItems(version) {
  return (TRIALS[version] ?? TRIALS.standard).items;
}

// The sentence of one question, in the server's language (English if not translated).
export function statement(version, index) {
  const trial = TRIALS[version] ?? TRIALS.standard;
  return trial.texts[currentLang()]?.[index] ?? trial.items[index][0];
}
