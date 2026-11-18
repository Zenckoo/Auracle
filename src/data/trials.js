// The two trials. Both measure the same 5 traits and 30 facets, so results stay comparable.

import { IPIP120 } from './ipip120.js';
import { IPIP300 } from './ipip300.js';

export const TRIALS = {
  standard: { items: IPIP120 },
  grand: { items: IPIP300 },
};

export function trialItems(version) {
  return (TRIALS[version] ?? TRIALS.standard).items;
}
