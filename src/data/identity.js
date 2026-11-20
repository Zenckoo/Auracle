// 🌈 Identity: pronouns, gender, orientation (and origins, see origins.js). Optional, private by default, only with explicit consent.
// Each field keeps a list of keys (comma-separated) and, if "own" is chosen, the traveler's own words.
// Never used in Compare, Guilds, guild roles or statistics.

import { showText } from '../core/text.js';
import { originNames } from './origins.js';

export const OWN_MAX = 30;

export const IDENTITY_FIELDS = {
  pronouns: {
    emoji: '🏷️',
    max: 3,
    options: {
      she: 'she/her',
      he: 'he/him',
      they: 'they/them',
      she_they: 'she/they',
      he_they: 'he/they',
      it: 'it/its',
      any: 'Any pronouns',
      ask: 'Ask me',
      questioning: 'Questioning',
    },
  },
  gender: {
    emoji: '🌈',
    max: 3,
    options: {
      woman: 'Woman',
      man: 'Man',
      nonbinary: 'Non-binary',
      trans_woman: 'Trans woman',
      trans_man: 'Trans man',
      transgender: 'Transgender',
      genderfluid: 'Genderfluid',
      genderqueer: 'Genderqueer',
      agender: 'Agender',
      bigender: 'Bigender',
      demigirl: 'Demigirl',
      demiboy: 'Demiboy',
      two_spirit: 'Two-Spirit',
      questioning: 'Questioning',
    },
  },
  orientation: {
    emoji: '💞',
    max: 3,
    options: {
      straight: 'Straight',
      gay: 'Gay',
      lesbian: 'Lesbian',
      bisexual: 'Bisexual',
      pansexual: 'Pansexual',
      queer: 'Queer',
      asexual: 'Asexual',
      demisexual: 'Demisexual',
      greysexual: 'Grey-asexual',
      aromantic: 'Aromantic',
      demiromantic: 'Demiromantic',
      biromantic: 'Biromantic',
      panromantic: 'Panromantic',
      homoromantic: 'Homoromantic',
      questioning: 'Questioning',
    },
  },
};

// The keys chosen for a field ("own" included if the traveler wrote their own words).
export function identityKeys(profile, field) {
  const known = IDENTITY_FIELDS[field].options;
  return (profile[field] ?? '').split(',').filter((k) => k in known || k === 'own');
}

// What a field shows: the chosen names, then the traveler's own words.
export function identityNames(profile, field, { escape = true } = {}) {
  const known = IDENTITY_FIELDS[field].options;
  const own = profile[`${field}_text`];
  return identityKeys(profile, field)
    .map((k) => (k === 'own' ? (own ? (escape ? showText(own) : own) : null) : known[k]))
    .filter(Boolean);
}

export function hasIdentity(profile) {
  return Object.keys(IDENTITY_FIELDS).some((f) => identityNames(profile, f).length) || originNames(profile).length > 0;
}

// The small identity line of a reported card: -# 🏷️ she/they · 🌈 Non-binary · 💞 Bisexual · 🌍 🇫🇷 France
export function identityLine(profile) {
  const parts = Object.entries(IDENTITY_FIELDS)
    .map(([field, f]) => {
      const names = identityNames(profile, field);
      return names.length ? `${f.emoji} ${names.join(', ')}` : null;
    })
    .filter(Boolean);
  const origins = originNames(profile);
  if (origins.length) parts.push(`🌍 ${origins.join(', ')}`);
  return parts.length ? `-# ${parts.join(' · ')}` : null;
}
