// 🌍 Origins: countries or cultural heritages, shown with their flag and name. Up to 3.
// Part of 🌈 Identity: same explicit consent, private by default. Never a city or an address.
// Countries are grouped by region (a Discord menu holds 25 choices at most).

import { showText } from '../core/text.js';
import { localized } from '../core/i18n.js';
import * as fr from '../texts/fr/data.js';
import * as de from '../texts/de/data.js';

export const ORIGIN_MAX = 3;

const EN_ORIGIN_REGIONS = {
  west_europe: {
    name: 'Western Europe',
    emoji: '🏰',
    countries: { FR: 'France', BE: 'Belgium', NL: 'Netherlands', LU: 'Luxembourg', DE: 'Germany', AT: 'Austria', CH: 'Switzerland', LI: 'Liechtenstein', MC: 'Monaco', IE: 'Ireland', GB: 'United Kingdom', PT: 'Portugal', ES: 'Spain', AD: 'Andorra', IT: 'Italy', SM: 'San Marino', VA: 'Vatican City', MT: 'Malta' },
  },
  north_east_europe: {
    name: 'Northern & Eastern Europe',
    emoji: '❄️',
    countries: { IS: 'Iceland', NO: 'Norway', SE: 'Sweden', DK: 'Denmark', FI: 'Finland', EE: 'Estonia', LV: 'Latvia', LT: 'Lithuania', PL: 'Poland', CZ: 'Czechia', SK: 'Slovakia', HU: 'Hungary', RO: 'Romania', BG: 'Bulgaria', MD: 'Moldova', UA: 'Ukraine', BY: 'Belarus', RU: 'Russia' },
  },
  southeast_europe: {
    name: 'Balkans, Greece & Türkiye',
    emoji: '🏛️',
    countries: { SI: 'Slovenia', HR: 'Croatia', BA: 'Bosnia and Herzegovina', RS: 'Serbia', ME: 'Montenegro', XK: 'Kosovo', MK: 'North Macedonia', AL: 'Albania', GR: 'Greece', CY: 'Cyprus', TR: 'Türkiye' },
  },
  middle_east: {
    name: 'Middle East & Caucasus',
    emoji: '🏜️',
    countries: { SA: 'Saudi Arabia', AE: 'United Arab Emirates', QA: 'Qatar', BH: 'Bahrain', KW: 'Kuwait', OM: 'Oman', YE: 'Yemen', IQ: 'Iraq', IR: 'Iran', SY: 'Syria', LB: 'Lebanon', JO: 'Jordan', PS: 'Palestine', IL: 'Israel', AM: 'Armenia', GE: 'Georgia', AZ: 'Azerbaijan' },
  },
  south_asia: {
    name: 'Central & South Asia',
    emoji: '🪷',
    countries: { KZ: 'Kazakhstan', UZ: 'Uzbekistan', TM: 'Turkmenistan', KG: 'Kyrgyzstan', TJ: 'Tajikistan', AF: 'Afghanistan', PK: 'Pakistan', IN: 'India', BD: 'Bangladesh', LK: 'Sri Lanka', NP: 'Nepal', BT: 'Bhutan', MV: 'Maldives', MN: 'Mongolia' },
  },
  east_asia: {
    name: 'East & Southeast Asia',
    emoji: '🏯',
    countries: { CN: 'China', HK: 'Hong Kong', TW: 'Taiwan', JP: 'Japan', KR: 'South Korea', KP: 'North Korea', VN: 'Vietnam', LA: 'Laos', KH: 'Cambodia', TH: 'Thailand', MM: 'Myanmar', MY: 'Malaysia', SG: 'Singapore', ID: 'Indonesia', BN: 'Brunei', PH: 'Philippines', TL: 'Timor-Leste' },
  },
  north_west_africa: {
    name: 'North & West Africa',
    emoji: '🐪',
    countries: { MA: 'Morocco', DZ: 'Algeria', TN: 'Tunisia', LY: 'Libya', EG: 'Egypt', SD: 'Sudan', MR: 'Mauritania', SN: 'Senegal', GM: 'Gambia', GW: 'Guinea-Bissau', GN: 'Guinea', SL: 'Sierra Leone', LR: 'Liberia', CI: "Côte d'Ivoire", ML: 'Mali', BF: 'Burkina Faso', NE: 'Niger', GH: 'Ghana', TG: 'Togo', BJ: 'Benin', NG: 'Nigeria', CV: 'Cape Verde' },
  },
  central_east_africa: {
    name: 'Central & East Africa',
    emoji: '🦁',
    countries: { TD: 'Chad', CM: 'Cameroon', CF: 'Central African Republic', GQ: 'Equatorial Guinea', GA: 'Gabon', CG: 'Congo', CD: 'DR Congo', ST: 'São Tomé and Príncipe', SS: 'South Sudan', ET: 'Ethiopia', ER: 'Eritrea', DJ: 'Djibouti', SO: 'Somalia', KE: 'Kenya', UG: 'Uganda', RW: 'Rwanda', BI: 'Burundi', TZ: 'Tanzania' },
  },
  southern_africa: {
    name: 'Southern Africa & Indian Ocean',
    emoji: '🌍',
    countries: { AO: 'Angola', MZ: 'Mozambique', MW: 'Malawi', ZM: 'Zambia', ZW: 'Zimbabwe', BW: 'Botswana', NA: 'Namibia', ZA: 'South Africa', LS: 'Lesotho', SZ: 'Eswatini', MG: 'Madagascar', MU: 'Mauritius', SC: 'Seychelles', KM: 'Comoros', RE: 'Réunion', YT: 'Mayotte' },
  },
  north_america: {
    name: 'North America & Caribbean',
    emoji: '🍁',
    countries: { US: 'United States', CA: 'Canada', MX: 'Mexico', CU: 'Cuba', JM: 'Jamaica', HT: 'Haiti', DO: 'Dominican Republic', PR: 'Puerto Rico', BS: 'Bahamas', BB: 'Barbados', TT: 'Trinidad and Tobago', GP: 'Guadeloupe', MQ: 'Martinique', AG: 'Antigua and Barbuda', DM: 'Dominica', GD: 'Grenada', KN: 'Saint Kitts and Nevis', LC: 'Saint Lucia', VC: 'Saint Vincent and the Grenadines' },
  },
  south_america: {
    name: 'Central & South America',
    emoji: '🌺',
    countries: { GT: 'Guatemala', BZ: 'Belize', HN: 'Honduras', SV: 'El Salvador', NI: 'Nicaragua', CR: 'Costa Rica', PA: 'Panama', CO: 'Colombia', VE: 'Venezuela', GY: 'Guyana', SR: 'Suriname', GF: 'French Guiana', EC: 'Ecuador', PE: 'Peru', BO: 'Bolivia', BR: 'Brazil', PY: 'Paraguay', UY: 'Uruguay', AR: 'Argentina', CL: 'Chile' },
  },
  oceania: {
    name: 'Oceania',
    emoji: '🌊',
    countries: { AU: 'Australia', NZ: 'New Zealand', PG: 'Papua New Guinea', FJ: 'Fiji', SB: 'Solomon Islands', VU: 'Vanuatu', NC: 'New Caledonia', PF: 'French Polynesia', WS: 'Samoa', TO: 'Tonga', KI: 'Kiribati', TV: 'Tuvalu', NR: 'Nauru', FM: 'Micronesia', MH: 'Marshall Islands', PW: 'Palau' },
  },
};
export const ORIGIN_REGIONS = localized({ en: EN_ORIGIN_REGIONS, fr: fr.originRegions, de: de.originRegions });

// Every country, in the language of the request (built each time, so it follows the server's language).
const allCountries = () => Object.assign({}, ...Object.values(ORIGIN_REGIONS).map((r) => ({ ...r.countries })));

// 'FR' -> 🇫🇷 (two regional indicator letters).
export function flag(code) {
  return String.fromCodePoint(...[...code].map((c) => 0x1f1e6 + c.charCodeAt(0) - 65));
}

// The codes chosen ("own" included if the traveler wrote their own words).
export function originKeys(profile) {
  return (profile.origins ?? '').split(',').filter((c) => c in allCountries() || c === 'own');
}

// 🇫🇷 France, 🇲🇦 Morocco, Kurdish
export function originNames(profile, { escape = true } = {}) {
  const names = allCountries();
  return originKeys(profile)
    .map((c) => {
      if (c !== 'own') return `${flag(c)} ${names[c]}`;
      const own = profile.origins_text;
      return own ? (escape ? showText(own) : own) : null;
    })
    .filter(Boolean);
}
