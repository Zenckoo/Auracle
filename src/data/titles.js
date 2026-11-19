// The 15 fantasy titles a traveler can show under their class (🎨 Customize).
// Keys are saved in the database: never rename a key, only its text.

export const TITLES = {
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

export function titleName(key) {
  return TITLES[key] ?? null;
}
