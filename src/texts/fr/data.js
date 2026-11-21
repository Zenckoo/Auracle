// data (fr): the ready-made choices of 🎨 Customize, in French. Missing keys fall back to English.
// Country and language names come from Unicode CLDR (the names phones and browsers use), checked by hand.

export const vibes = {
  cozy: { name: 'Mode cocooning' },
  chat: { name: 'Dispo pour papoter' },
  exams: { name: 'En plein exams' },
  gaming: { name: 'En pleine partie' },
  night: { name: 'Mode couche-tard' },
  battery: { name: 'Batterie faible' },
  creative: { name: 'Humeur créative' },
  away: { name: 'Absent·e quelque temps' },
};

export const tasteFields = [
  { label: 'Jeux préférés', placeholder: 'Stardew Valley, Zelda...' },
  { label: 'Animés ou séries préférés', placeholder: 'Frieren, Arcane...' },
  { label: 'Musique préférée (artistes ou styles)', placeholder: 'Lo-fi, Hozier...' },
  { label: 'Personnes préférées (réelles ou fictives)', placeholder: 'Gandalf, Hayao Miyazaki, Totoro...' },
  { label: 'Parle-moi de...', placeholder: 'Thé, dessin, espace...' },
];

export const lookingFor = {
  friends: { name: 'Des amis' },
  gaming: { name: 'Des partenaires de jeu' },
  art: { name: "Des amis artistes" },
  chat: { name: "Quelqu'un avec qui discuter" },
  study: { name: "Des partenaires d'études" },
  music: { name: 'Des amis mélomanes' },
};

export const dms = {
  open: { name: 'MP ouverts' },
  ask: { name: 'Demander avant' },
  closed: { name: 'MP fermés' },
};

export const timezones = {
  chicago: { name: 'Chicago, Mexico' },
  sao_paulo: { name: 'São Paulo, Buenos Aires' },
  azores: { name: 'Açores, Cap-Vert' },
  london: { name: 'Londres, Lisbonne' },
  athens: { name: 'Athènes, Le Caire, Johannesburg' },
  istanbul: { name: 'Istanbul, Moscou, Nairobi' },
  karachi: { name: 'Karachi, Tachkent' },
  delhi: { name: 'Delhi, Bombay' },
  bangkok: { name: 'Bangkok, Jakarta' },
  shanghai: { name: 'Pékin, Singapour, Manille' },
  tokyo: { name: 'Tokyo, Séoul' },
  sydney: { name: 'Sydney, Melbourne' },
  noumea: { name: 'Nouméa, Îles Salomon' },
  auckland: { name: 'Auckland, Fidji' },
  utc: { name: "UTC (sans heure d'été)" },
};

export const identity = {
  pronouns: {
    options: {
      she: 'elle/la',
      he: 'il/lui',
      they: 'iel/ellui',
      she_they: 'elle/iel',
      he_they: 'il/iel',
      it: null, // No real French equivalent: hidden from the French list.
      any: "N'importe quel pronom",
      ask: 'Demande-moi',
      questioning: 'En questionnement',
    },
  },
  gender: {
    options: {
      woman: 'Femme',
      man: 'Homme',
      nonbinary: 'Non-binaire',
      trans_woman: 'Femme trans',
      trans_man: 'Homme trans',
      transgender: 'Transgenre',
      genderfluid: 'Genderfluid',
      genderqueer: 'Genderqueer',
      agender: 'Agenre',
      bigender: 'Bigenre',
      demigirl: 'Demi-fille',
      demiboy: 'Demi-garçon',
      two_spirit: 'Bispirituel·le',
      questioning: 'En questionnement',
    },
  },
  orientation: {
    options: {
      straight: 'Hétéro',
      gay: 'Gay',
      lesbian: 'Lesbienne',
      bisexual: 'Bisexuel·le',
      pansexual: 'Pansexuel·le',
      queer: 'Queer',
      asexual: 'Asexuel·le',
      demisexual: 'Demisexuel·le',
      greysexual: 'Grey-asexuel·le',
      aromantic: 'Aromantique',
      demiromantic: 'Demiromantique',
      biromantic: 'Biromantique',
      panromantic: 'Panromantique',
      homoromantic: 'Homoromantique',
      questioning: 'En questionnement',
    },
  },
};

export const titles = {
  starborn: 'Né·e des étoiles',
  dawn: "Gardien·ne de l'aube",
  moonlit: 'Errance au clair de lune',
  ember: 'Cœur de braise',
  woods: 'Murmure des bois',
  dreamweaver: 'Tisseur·se de rêves',
  stormchaser: "Chasseur·se d'orages",
  tales: 'En quête des contes perdus',
  dragons: 'Ami·e des dragons',
  lantern: 'Lanterne dans la nuit',
  tides: 'Enfant des marées',
  frostbloom: 'Fleur de givre',
  small: 'Gardien·ne des petites choses',
  mistwalker: 'Arpenteur·se de brume',
  songs: 'Écho des chants anciens',
};

export const palette = {
  crimson: { name: 'Cramoisi' },
  coral: { name: 'Corail' },
  gold: { name: 'Or' },
  emerald: { name: 'Émeraude' },
  sky: { name: 'Ciel' },
  sapphire: { name: 'Saphir' },
  amethyst: { name: 'Améthyste' },
  rose: { name: 'Rose' },
  pearl: { name: 'Perle' },
  silver: { name: 'Argent' },
  bronze: { name: 'Bronze' },
  obsidian: { name: 'Obsidienne' },
};

export const parts = {
  about: { name: 'À propos de moi' },
  tastes: { name: 'Goûts et infos pratiques' },
  blessings: { name: 'Bénédictions' },
  traits: { name: 'Traits' },
};

export const originRegions = {
  west_europe: {
    name: "Europe de l'Ouest",
    countries: { FR: 'France', BE: 'Belgique', NL: 'Pays-Bas', LU: 'Luxembourg', DE: 'Allemagne', AT: 'Autriche', CH: 'Suisse', LI: 'Liechtenstein', MC: 'Monaco', IE: 'Irlande', GB: 'Royaume-Uni', PT: 'Portugal', ES: 'Espagne', AD: 'Andorre', IT: 'Italie', SM: 'Saint-Marin', VA: 'Vatican', MT: 'Malte' },
  },
  north_east_europe: {
    name: "Europe du Nord et de l'Est",
    countries: { IS: 'Islande', NO: 'Norvège', SE: 'Suède', DK: 'Danemark', FI: 'Finlande', EE: 'Estonie', LV: 'Lettonie', LT: 'Lituanie', PL: 'Pologne', CZ: 'Tchéquie', SK: 'Slovaquie', HU: 'Hongrie', RO: 'Roumanie', BG: 'Bulgarie', MD: 'Moldavie', UA: 'Ukraine', BY: 'Biélorussie', RU: 'Russie' },
  },
  southeast_europe: {
    name: 'Balkans, Grèce et Turquie',
    countries: { SI: 'Slovénie', HR: 'Croatie', BA: 'Bosnie-Herzégovine', RS: 'Serbie', ME: 'Monténégro', XK: 'Kosovo', MK: 'Macédoine du Nord', AL: 'Albanie', GR: 'Grèce', CY: 'Chypre', TR: 'Turquie' },
  },
  middle_east: {
    name: 'Moyen-Orient et Caucase',
    countries: { SA: 'Arabie saoudite', AE: 'Émirats arabes unis', QA: 'Qatar', BH: 'Bahreïn', KW: 'Koweït', OM: 'Oman', YE: 'Yémen', IQ: 'Irak', IR: 'Iran', SY: 'Syrie', LB: 'Liban', JO: 'Jordanie', PS: 'Palestine', IL: 'Israël', AM: 'Arménie', GE: 'Géorgie', AZ: 'Azerbaïdjan' },
  },
  south_asia: {
    name: 'Asie centrale et du Sud',
    countries: { KZ: 'Kazakhstan', UZ: 'Ouzbékistan', TM: 'Turkménistan', KG: 'Kirghizstan', TJ: 'Tadjikistan', AF: 'Afghanistan', PK: 'Pakistan', IN: 'Inde', BD: 'Bangladesh', LK: 'Sri Lanka', NP: 'Népal', BT: 'Bhoutan', MV: 'Maldives', MN: 'Mongolie' },
  },
  east_asia: {
    name: "Asie de l'Est et du Sud-Est",
    countries: { CN: 'Chine', HK: 'Hong Kong', TW: 'Taïwan', JP: 'Japon', KR: 'Corée du Sud', KP: 'Corée du Nord', VN: 'Viêt Nam', LA: 'Laos', KH: 'Cambodge', TH: 'Thaïlande', MM: 'Myanmar', MY: 'Malaisie', SG: 'Singapour', ID: 'Indonésie', BN: 'Brunei', PH: 'Philippines', TL: 'Timor oriental' },
  },
  north_west_africa: {
    name: "Afrique du Nord et de l'Ouest",
    countries: { MA: 'Maroc', DZ: 'Algérie', TN: 'Tunisie', LY: 'Libye', EG: 'Égypte', SD: 'Soudan', MR: 'Mauritanie', SN: 'Sénégal', GM: 'Gambie', GW: 'Guinée-Bissau', GN: 'Guinée', SL: 'Sierra Leone', LR: 'Liberia', CI: "Côte d'Ivoire", ML: 'Mali', BF: 'Burkina Faso', NE: 'Niger', GH: 'Ghana', TG: 'Togo', BJ: 'Bénin', NG: 'Nigeria', CV: 'Cap-Vert' },
  },
  central_east_africa: {
    name: "Afrique centrale et de l'Est",
    countries: { TD: 'Tchad', CM: 'Cameroun', CF: 'République centrafricaine', GQ: 'Guinée équatoriale', GA: 'Gabon', CG: 'Congo', CD: 'RD Congo', ST: 'Sao Tomé-et-Principe', SS: 'Soudan du Sud', ET: 'Éthiopie', ER: 'Érythrée', DJ: 'Djibouti', SO: 'Somalie', KE: 'Kenya', UG: 'Ouganda', RW: 'Rwanda', BI: 'Burundi', TZ: 'Tanzanie' },
  },
  southern_africa: {
    name: 'Afrique australe et océan Indien',
    countries: { AO: 'Angola', MZ: 'Mozambique', MW: 'Malawi', ZM: 'Zambie', ZW: 'Zimbabwe', BW: 'Botswana', NA: 'Namibie', ZA: 'Afrique du Sud', LS: 'Lesotho', SZ: 'Eswatini', MG: 'Madagascar', MU: 'Maurice', SC: 'Seychelles', KM: 'Comores', RE: 'La Réunion', YT: 'Mayotte' },
  },
  north_america: {
    name: 'Amérique du Nord et Caraïbes',
    countries: { US: 'États-Unis', CA: 'Canada', MX: 'Mexique', CU: 'Cuba', JM: 'Jamaïque', HT: 'Haïti', DO: 'République dominicaine', PR: 'Porto Rico', BS: 'Bahamas', BB: 'Barbade', TT: 'Trinité-et-Tobago', GP: 'Guadeloupe', MQ: 'Martinique', AG: 'Antigua-et-Barbuda', DM: 'Dominique', GD: 'Grenade', KN: 'Saint-Kitts-et-Nevis', LC: 'Sainte-Lucie', VC: 'Saint-Vincent-et-les-Grenadines' },
  },
  south_america: {
    name: 'Amérique centrale et du Sud',
    countries: { GT: 'Guatemala', BZ: 'Belize', HN: 'Honduras', SV: 'Salvador', NI: 'Nicaragua', CR: 'Costa Rica', PA: 'Panama', CO: 'Colombie', VE: 'Venezuela', GY: 'Guyana', SR: 'Suriname', GF: 'Guyane française', EC: 'Équateur', PE: 'Pérou', BO: 'Bolivie', BR: 'Brésil', PY: 'Paraguay', UY: 'Uruguay', AR: 'Argentine', CL: 'Chili' },
  },
  oceania: {
    name: 'Océanie',
    countries: { AU: 'Australie', NZ: 'Nouvelle-Zélande', PG: 'Papouasie-Nouvelle-Guinée', FJ: 'Fidji', SB: 'Îles Salomon', VU: 'Vanuatu', NC: 'Nouvelle-Calédonie', PF: 'Polynésie française', WS: 'Samoa', TO: 'Tonga', KI: 'Kiribati', TV: 'Tuvalu', NR: 'Nauru', FM: 'Micronésie', MH: 'Îles Marshall', PW: 'Palaos' },
  },
};

export const langRegions = {
  west_europe: {
    name: "Europe de l'Ouest",
    langs: { en: 'Anglais', fr: 'Français', es: 'Espagnol', pt: 'Portugais', de: 'Allemand', it: 'Italien', nl: 'Néerlandais', ca: 'Catalan', eu: 'Basque', gl: 'Galicien', ga: 'Irlandais', cy: 'Gallois', gd: 'Gaélique écossais', br: 'Breton', lb: 'Luxembourgeois', oc: 'Occitan', co: 'Corse', mt: 'Maltais', fy: 'Frison', rm: 'Romanche' },
  },
  east_europe: {
    name: "Europe du Nord et de l'Est",
    langs: { sv: 'Suédois', no: 'Norvégien', da: 'Danois', fi: 'Finnois', is: 'Islandais', et: 'Estonien', lv: 'Letton', lt: 'Lituanien', pl: 'Polonais', cs: 'Tchèque', sk: 'Slovaque', hu: 'Hongrois', ro: 'Roumain', bg: 'Bulgare', sr: 'Serbe', hr: 'Croate', bs: 'Bosniaque', sl: 'Slovène', mk: 'Macédonien', sq: 'Albanais', el: 'Grec', ru: 'Russe', uk: 'Ukrainien', be: 'Biélorusse', se: 'Same' },
  },
  middle_east: {
    name: 'Moyen-Orient et Asie centrale',
    langs: { ar: 'Arabe', he: 'Hébreu', fa: 'Persan', tr: 'Turc', ku: 'Kurde', hy: 'Arménien', ka: 'Géorgien', az: 'Azerbaïdjanais', kk: 'Kazakh', uz: 'Ouzbek', ky: 'Kirghize', tg: 'Tadjik', tk: 'Turkmène', ps: 'Pachto', tt: 'Tatar', ce: 'Tchétchène', syc: 'Assyrien (syriaque)' },
  },
  south_asia: {
    name: 'Asie du Sud',
    langs: { hi: 'Hindi', ur: 'Ourdou', bn: 'Bengali', pa: 'Pendjabi', ta: 'Tamoul', te: 'Télougou', mr: 'Marathi', gu: 'Goudjarati', kn: 'Kannada', ml: 'Malayalam', or: 'Odia', si: 'Cingalais', ne: 'Népalais', as: 'Assamais', sd: 'Sindhi', kok: 'Konkani', dz: 'Dzongkha', dv: 'Maldivien (dhivehi)' },
  },
  east_asia: {
    name: "Asie de l'Est et du Sud-Est",
    langs: { zh: 'Chinois (mandarin)', yue: 'Cantonais', nan: 'Hokkien', ja: 'Japonais', ko: 'Coréen', mn: 'Mongol', bo: 'Tibétain', ug: 'Ouïghour', vi: 'Vietnamien', th: 'Thaï', lo: 'Lao', km: 'Khmer', my: 'Birman', id: 'Indonésien', ms: 'Malais', fil: 'Filipino (tagalog)', ceb: 'Cebuano', jv: 'Javanais', su: 'Soundanais', hmn: 'Hmong' },
  },
  africa: {
    name: 'Afrique',
    langs: { sw: 'Swahili', am: 'Amharique', yo: 'Yoruba', ig: 'Igbo', ha: 'Haoussa', zu: 'Zoulou', xh: 'Xhosa', af: 'Afrikaans', so: 'Somali', om: 'Oromo', ti: 'Tigrigna', wo: 'Wolof', ln: 'Lingala', rw: 'Kinyarwanda', rn: 'Kirundi', sn: 'Shona', mg: 'Malgache', ak: 'Twi (akan)', ff: 'Peul', st: 'Sesotho', tn: 'Setswana', ber: 'Tamazight (berbère)', bm: 'Bambara', lg: 'Luganda', ny: 'Chichewa' },
  },
  americas_pacific: {
    name: 'Amériques et Pacifique',
    langs: { qu: 'Quechua', gn: 'Guarani', ay: 'Aymara', nah: 'Nahuatl', yua: 'Maya yucatèque', ht: 'Créole haïtien', pap: 'Papiamento', jam: 'Patois jamaïcain', nv: 'Navajo', chr: 'Cherokee', iu: 'Inuktitut', cr: 'Cree', haw: 'Hawaïen', mi: 'Maori', sm: 'Samoan', to: 'Tongien', fj: 'Fidjien', ty: 'Tahitien', tpi: 'Tok pisin', rcf: 'Créole réunionnais', gcf: 'Créole antillais' },
  },
  other: {
    name: 'Signes, langues anciennes et construites',
    langs: { ase: 'Langue des signes américaine', bfi: 'Langue des signes britannique', fsl: 'Langue des signes française', ils: 'Signes internationaux', sgn: 'Une autre langue des signes', la: 'Latin', sa: 'Sanskrit', grc: 'Grec ancien', yi: 'Yiddish', rom: 'Romani', eo: 'Espéranto', tok: 'Toki pona' },
  },
};
