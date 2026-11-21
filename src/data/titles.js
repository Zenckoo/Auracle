// The 15 fantasy titles a traveler can show under their class (🎨 Customize).
// Keys are saved in the database: never rename a key, only its text.

import { localized } from '../core/i18n.js';
import * as fr from '../texts/fr/data.js';

const EN_TITLES = {
  starborn: 'Starborn',
  dawn: 'Keeper of Dawn',
  moonlit: 'Moonlit Wanderer',
  ember: 'Ember Heart',
  woods: 'Whisper of the Woods',
  dreamweaver: 'Dreamweaver',
  stormchaser: 'Stormchaser',
  tales: 'Seeker of Lost Tales',
  dragons: 'Friend of Dragons',
  lantern: 'Lantern in the Dark',
  tides: 'Child of the Tides',
  frostbloom: 'Frostbloom',
  small: 'Guardian of Small Things',
  mistwalker: 'Mistwalker',
  songs: 'Echo of the Old Songs',
};
export const TITLES = localized({ en: EN_TITLES, fr: fr.titles });

export function titleName(key) {
  return TITLES[key] ?? null;
}
