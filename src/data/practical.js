// 🎨 Customize > 🕰️ Practical: time zone, languages and birthday (day and month, never the year).
// Keys are saved in the database: never rename a key, only its text.

import { currentLang, localized } from '../core/i18n.js';
import * as fr from '../texts/fr/data.js';

// 24 time zones (Discord menus hold 25 choices, the 25th is "Not shown"). Only a broad zone, never a city.
const EN_TIMEZONES = {
  honolulu: { name: 'Honolulu', zone: 'Pacific/Honolulu' },
  anchorage: { name: 'Anchorage', zone: 'America/Anchorage' },
  los_angeles: { name: 'Los Angeles', zone: 'America/Los_Angeles' },
  denver: { name: 'Denver', zone: 'America/Denver' },
  chicago: { name: 'Chicago, Mexico City', zone: 'America/Chicago' },
  new_york: { name: 'New York, Toronto', zone: 'America/New_York' },
  sao_paulo: { name: 'São Paulo, Buenos Aires', zone: 'America/Sao_Paulo' },
  azores: { name: 'Azores, Cape Verde', zone: 'Atlantic/Azores' },
  london: { name: 'London, Lisbon', zone: 'Europe/London' },
  paris: { name: 'Paris, Berlin, Lagos', zone: 'Europe/Paris' },
  athens: { name: 'Athens, Cairo, Johannesburg', zone: 'Europe/Athens' },
  istanbul: { name: 'Istanbul, Moscow, Nairobi', zone: 'Europe/Istanbul' },
  dubai: { name: 'Dubai', zone: 'Asia/Dubai' },
  karachi: { name: 'Karachi, Tashkent', zone: 'Asia/Karachi' },
  delhi: { name: 'Delhi, Mumbai', zone: 'Asia/Kolkata' },
  dhaka: { name: 'Dhaka', zone: 'Asia/Dhaka' },
  bangkok: { name: 'Bangkok, Jakarta', zone: 'Asia/Bangkok' },
  shanghai: { name: 'Beijing, Singapore, Manila', zone: 'Asia/Shanghai' },
  tokyo: { name: 'Tokyo, Seoul', zone: 'Asia/Tokyo' },
  adelaide: { name: 'Adelaide', zone: 'Australia/Adelaide' },
  sydney: { name: 'Sydney, Melbourne', zone: 'Australia/Sydney' },
  noumea: { name: 'Nouméa, Solomon Islands', zone: 'Pacific/Noumea' },
  auckland: { name: 'Auckland, Fiji', zone: 'Pacific/Auckland' },
  utc: { name: 'UTC (no daylight saving)', zone: 'UTC' },
};
export const TIMEZONES = localized({ en: EN_TIMEZONES, fr: fr.timezones });

// Languages, grouped by region so each menu stays under Discord's limit of 25 choices.
const EN_LANG_REGIONS = {
  west_europe: {
    name: 'Western Europe', emoji: '🏰',
    langs: { en: 'English', fr: 'French', es: 'Spanish', pt: 'Portuguese', de: 'German', it: 'Italian', nl: 'Dutch', ca: 'Catalan', eu: 'Basque', gl: 'Galician', ga: 'Irish', cy: 'Welsh', gd: 'Scottish Gaelic', br: 'Breton', lb: 'Luxembourgish', oc: 'Occitan', co: 'Corsican', mt: 'Maltese', fy: 'Frisian', rm: 'Romansh' },
  },
  east_europe: {
    name: 'Northern & Eastern Europe', emoji: '❄️',
    langs: { sv: 'Swedish', no: 'Norwegian', da: 'Danish', fi: 'Finnish', is: 'Icelandic', et: 'Estonian', lv: 'Latvian', lt: 'Lithuanian', pl: 'Polish', cs: 'Czech', sk: 'Slovak', hu: 'Hungarian', ro: 'Romanian', bg: 'Bulgarian', sr: 'Serbian', hr: 'Croatian', bs: 'Bosnian', sl: 'Slovenian', mk: 'Macedonian', sq: 'Albanian', el: 'Greek', ru: 'Russian', uk: 'Ukrainian', be: 'Belarusian', se: 'Sámi' },
  },
  middle_east: {
    name: 'Middle East & Central Asia', emoji: '🏜️',
    langs: { ar: 'Arabic', he: 'Hebrew', fa: 'Persian', tr: 'Turkish', ku: 'Kurdish', hy: 'Armenian', ka: 'Georgian', az: 'Azerbaijani', kk: 'Kazakh', uz: 'Uzbek', ky: 'Kyrgyz', tg: 'Tajik', tk: 'Turkmen', ps: 'Pashto', tt: 'Tatar', ce: 'Chechen', syc: 'Assyrian (Syriac)' },
  },
  south_asia: {
    name: 'South Asia', emoji: '🪷',
    langs: { hi: 'Hindi', ur: 'Urdu', bn: 'Bengali', pa: 'Punjabi', ta: 'Tamil', te: 'Telugu', mr: 'Marathi', gu: 'Gujarati', kn: 'Kannada', ml: 'Malayalam', or: 'Odia', si: 'Sinhala', ne: 'Nepali', as: 'Assamese', sd: 'Sindhi', kok: 'Konkani', dz: 'Dzongkha', dv: 'Dhivehi' },
  },
  east_asia: {
    name: 'East & Southeast Asia', emoji: '🏯',
    langs: { zh: 'Chinese (Mandarin)', yue: 'Cantonese', nan: 'Hokkien', ja: 'Japanese', ko: 'Korean', mn: 'Mongolian', bo: 'Tibetan', ug: 'Uyghur', vi: 'Vietnamese', th: 'Thai', lo: 'Lao', km: 'Khmer', my: 'Burmese', id: 'Indonesian', ms: 'Malay', fil: 'Filipino (Tagalog)', ceb: 'Cebuano', jv: 'Javanese', su: 'Sundanese', hmn: 'Hmong' },
  },
  africa: {
    name: 'Africa', emoji: '🌍',
    langs: { sw: 'Swahili', am: 'Amharic', yo: 'Yoruba', ig: 'Igbo', ha: 'Hausa', zu: 'Zulu', xh: 'Xhosa', af: 'Afrikaans', so: 'Somali', om: 'Oromo', ti: 'Tigrinya', wo: 'Wolof', ln: 'Lingala', rw: 'Kinyarwanda', rn: 'Kirundi', sn: 'Shona', mg: 'Malagasy', ak: 'Twi (Akan)', ff: 'Fula', st: 'Sesotho', tn: 'Setswana', ber: 'Tamazight (Berber)', bm: 'Bambara', lg: 'Luganda', ny: 'Chichewa' },
  },
  americas_pacific: {
    name: 'Americas & Pacific', emoji: '🌺',
    langs: { qu: 'Quechua', gn: 'Guarani', ay: 'Aymara', nah: 'Nahuatl', yua: 'Yucatec Maya', ht: 'Haitian Creole', pap: 'Papiamento', jam: 'Jamaican Patois', nv: 'Navajo', chr: 'Cherokee', iu: 'Inuktitut', cr: 'Cree', haw: 'Hawaiian', mi: 'Māori', sm: 'Samoan', to: 'Tongan', fj: 'Fijian', ty: 'Tahitian', tpi: 'Tok Pisin', rcf: 'Réunion Creole', gcf: 'Antillean Creole' },
  },
  other: {
    name: 'Sign, classical & constructed', emoji: '✋',
    langs: { ase: 'American Sign Language', bfi: 'British Sign Language', fsl: 'French Sign Language', ils: 'International Sign', sgn: 'Another sign language', la: 'Latin', sa: 'Sanskrit', grc: 'Ancient Greek', yi: 'Yiddish', rom: 'Romani', eo: 'Esperanto', tok: 'Toki Pona' },
  },
};
export const LANG_REGIONS = localized({ en: EN_LANG_REGIONS, fr: fr.langRegions });

export const LANG_MAX = 6;

// Every language, in the language of the request (built each time, so it follows the server's language).
const allLangs = () => Object.assign({}, ...Object.values(LANG_REGIONS).map((r) => ({ ...r.langs })));

export function langName(code) {
  return allLangs()[code] ?? null;
}

export function langList(profile) {
  return (profile.languages ?? '').split(',').filter((c) => c in allLangs());
}

const DAYS_IN_MONTH = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

// "14" and "3" -> { day: 14, month: 3 }, or null if it is not a real date.
export function parseBirthday(dayText, monthText) {
  const day = Number((dayText ?? '').trim());
  const month = Number((monthText ?? '').trim());
  if (!Number.isInteger(day) || !Number.isInteger(month) || month < 1 || month > 12) return null;
  if (day < 1 || day > DAYS_IN_MONTH[month - 1]) return null;
  return { day, month };
}

export function birthdayName(profile) {
  if (!profile.birth_day || !profile.birth_month) return null;
  // "January 10", "10 janvier", "10. Januar": the date written the way each language writes it.
  const date = new Date(Date.UTC(2000, profile.birth_month - 1, profile.birth_day));
  return new Intl.DateTimeFormat(currentLang(), { day: 'numeric', month: 'long', timeZone: 'UTC' }).format(date);
}

// Today's date where the traveler lives (their time zone, or UTC).
function today(profile, now = new Date()) {
  const zone = TIMEZONES[profile.timezone]?.zone ?? 'UTC';
  const parts = new Intl.DateTimeFormat('en-US', { timeZone: zone, day: 'numeric', month: 'numeric' }).formatToParts(now);
  return { day: Number(parts.find((p) => p.type === 'day').value), month: Number(parts.find((p) => p.type === 'month').value) };
}

export function isBirthday(profile, now = new Date()) {
  if (!profile.birth_day || !profile.birth_month) return false;
  const t = today(profile, now);
  return t.day === profile.birth_day && t.month === profile.birth_month;
}

export function localTime(profile, now = new Date()) {
  const tz = TIMEZONES[profile.timezone];
  if (!tz) return null;
  return new Intl.DateTimeFormat('en-GB', { timeZone: tz.zone, hour: '2-digit', minute: '2-digit' }).format(now);
}
