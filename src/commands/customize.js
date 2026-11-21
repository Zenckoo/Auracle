// 🎨 Customize: everything a traveler can change on their card, page by page.
//   main  : 🖌️ Appearance (fantasy title, accent color) and buttons to the other pages
//   about : 💬 About me (a short sentence) and 🌙 Current vibe
//   tastes: 🎮 Tastes & fun (games, shows, music, favorite people, Ask me about, Looking for, DMs)
//   practical: 🕰️ Practical (time zone, languages by region, birthday)
//   identity: 🌈 Identity (pronouns, gender, orientation, origins), only after explicit consent, private by default
//   badges: 🏅 Badges (all badges, and up to 3 shown on the card)
//   💌 Blessings, 🖼️ Banner and 🗂️ Organize have their own files (blessings.js, banner.js, organize.js), opened from the main page.
// Opened from the /auracle menu. Buttons, menus and forms are named "cz:...".

import { ui } from '../core/ui.js';
import { customizeTexts as C } from '../texts/customize.js';
import { profileTexts } from '../texts/profile.js';
import { CLASSES, GUILDS } from '../data/classes.js';
import { TITLES, titleName } from '../data/titles.js';
import { PALETTE, parseHex, colorName } from '../data/colors.js';
import { VIBES, vibeLine } from '../data/vibes.js';
import { TASTE_FIELDS, TASTE_MAX, LOOKING_FOR, DMS, lookingList, tasteLines } from '../data/tastes.js';
import { TIMEZONES, LANG_REGIONS, LANG_MAX, langList, langName, parseBirthday, birthdayName } from '../data/practical.js';
import { IDENTITY_FIELDS, OWN_MAX, identityKeys, identityNames, hasIdentity } from '../data/identity.js';
import { ORIGIN_REGIONS, ORIGIN_MAX, flag, originKeys, originNames } from '../data/origins.js';
import { SITE } from '../config.js';
import { BADGES, SHOW_MAX, KINDRED_GOAL, KIND_SOUL_GOAL, earnedBadges, shownBadges, pagesSeen } from '../data/badges.js';
import { badgeTexts as B } from '../texts/badges.js';
import { blessingTexts } from '../texts/blessings.js';
import { bannerTexts } from '../texts/banner.js';
import { organizeTexts } from '../texts/organize.js';
import { codexTexts } from '../texts/codex.js';
import { earn, announce } from '../core/badges.js';
import { cleanText, showText } from '../core/text.js';
import * as store from '../core/store.js';

const S = ui.ButtonStyle;
const ABOUT_MAX = 150;
const VIBE_MAX = 40;

function userOf(interaction) {
  return interaction.member?.user ?? interaction.user;
}

function color(profile) {
  if (profile.accent != null) return profile.accent;
  return ui.COLORS[GUILDS[CLASSES[profile.type_code].guild].colorKey];
}

function select(id, placeholder, options) {
  return { type: 1, components: [{ type: 3, custom_id: id, placeholder, min_values: 1, max_values: 1, options }] };
}

// A form with one text field. value: what is already written (so it can be edited).
function form(id, { title, label, placeholder }, { max, required = false, long = false, value = null }) {
  const input = { type: 4, custom_id: 'text', style: long ? 2 : 1, label, placeholder, max_length: max, required };
  if (value) input.value = value;
  return { type: 9, data: { custom_id: id, title, components: [{ type: 1, components: [input] }] } };
}

function titleSelect(current) {
  return select('cz:title', C.titlePlaceholder, [
    { label: C.noTitle, value: 'none', emoji: { name: '🚫' }, default: !current },
    ...Object.entries(TITLES).map(([value, label]) => ({ label, value, emoji: { name: '✨' }, default: current === value })),
  ]);
}

function colorSelect(current) {
  return select('cz:color', C.colorPlaceholder, [
    { label: C.guildColor, value: 'guild', emoji: { name: '🏰' }, default: current == null },
    ...Object.entries(PALETTE).map(([value, p]) => ({ label: p.name, value, emoji: { name: p.emoji }, default: current === p.color })),
    { label: C.customColor, value: 'custom', emoji: { name: '🎨' } },
  ]);
}

function vibeSelect(profile) {
  return select('cz:vibe', C.vibePlaceholder, [
    { label: C.noVibe, value: 'none', emoji: { name: '🚫' }, default: !profile.vibe },
    ...Object.entries(VIBES).map(([value, v]) => ({ label: v.name, value, emoji: { name: v.emoji }, default: profile.vibe === value })),
    { label: C.customVibe, value: 'custom', emoji: { name: '💭' }, default: profile.vibe === 'custom' },
  ]);
}

// Top of every page: a warning (wrong input) or "Your card has been updated".
function notice({ sealed, warning }) {
  if (warning) return [ui.text(warning), ui.separator()];
  if (sealed) return [ui.text(C.sealed), ui.separator()];
  return [];
}

function cardButton() {
  return ui.button({ id: 'hub:card', label: C.viewCard, emoji: '🪪', style: S.SECONDARY });
}

function mainPage(profile, state = {}) {
  return [
    ui.container(color(profile), [
      ...notice(state),
      ui.text(`${C.title}\n${C.intro}`),
      ui.separator(),
      ui.text(`${C.appearance}\n${C.titleLine(titleName(profile.title))}`),
      titleSelect(profile.title),
      ui.text(C.colorLine(profile.accent == null ? null : colorName(profile.accent))),
      colorSelect(profile.accent),
      ui.separator(),
      ui.text(C.pagesTitle),
      ui.row(
        ui.button({ id: 'cz:page:about', label: C.aboutPage, emoji: '💬', style: S.PRIMARY }),
        ui.button({ id: 'cz:page:tastes', label: C.tastesPage, emoji: '🎮', style: S.PRIMARY }),
        ui.button({ id: 'cz:page:practical', label: C.practicalPage, emoji: '🕰️', style: S.PRIMARY }),
        ui.button({ id: 'cz:page:identity', label: C.identityPage, emoji: '🌈', style: S.PRIMARY }),
        ui.button({ id: 'cz:page:badges', label: B.page, emoji: '🏅', style: S.PRIMARY }),
      ),
      ui.row(
        ui.button({ id: 'bn:page', label: bannerTexts.page, emoji: '🖼️', style: S.PRIMARY }),
        ui.button({ id: 'bl:page', label: blessingTexts.page, emoji: '💌', style: S.PRIMARY }),
        ui.button({ id: 'og:page', label: organizeTexts.page, emoji: '🗂️', style: S.PRIMARY }),
        cardButton(),
      ),
    ]),
  ];
}

function aboutPage(profile, state = {}) {
  return [
    ui.container(color(profile), [
      ...notice(state),
      ui.text(`${C.aboutTitle}\n${C.aboutIntro}`),
      ui.separator(),
      ui.text(C.aboutLine(profile.about ? showText(profile.about) : null)),
      ui.row(
        ui.button({ id: 'cz:aboutedit', label: C.aboutWrite, emoji: '✏️', style: S.PRIMARY }),
        ui.button({ id: 'cz:aboutclear', label: C.aboutClear, emoji: '🧹', style: S.SECONDARY, disabled: !profile.about }),
      ),
      ui.separator(),
      ui.text(C.vibeLine(vibeLine(profile))),
      vibeSelect(profile),
      ui.separator(),
      ui.text(C.rules),
      ui.row(ui.button({ id: 'cz:page:main', label: C.back, emoji: '◀️', style: S.SECONDARY }), cardButton()),
    ]),
  ];
}

// The Tastes & fun form: the five free fields at once, already filled with what is saved.
function tastesForm(profile) {
  const rows = TASTE_FIELDS.map((f) => {
    const input = { type: 4, custom_id: f.key, style: 1, label: f.label, placeholder: f.placeholder, max_length: TASTE_MAX, required: false };
    if (profile[f.key]) input.value = profile[f.key];
    return { type: 1, components: [input] };
  });
  return { type: 9, data: { custom_id: 'cz:tastes', title: C.tastesForm, components: rows } };
}

function lookingSelect(profile) {
  const chosen = lookingList(profile);
  const options = Object.entries(LOOKING_FOR).map(([value, l]) => ({ label: l.name, value, emoji: { name: l.emoji }, default: chosen.includes(value) }));
  return { type: 1, components: [{ type: 3, custom_id: 'cz:looking', placeholder: C.lookingPlaceholder, min_values: 0, max_values: 3, options }] };
}

function dmsSelect(profile) {
  return select('cz:dms', C.dmsPlaceholder, [
    { label: C.dmsNone, value: 'none', emoji: { name: '🚫' }, default: !DMS[profile.dms] },
    ...Object.entries(DMS).map(([value, d]) => ({ label: d.name, value, emoji: { name: d.emoji }, default: profile.dms === value })),
  ]);
}

function hasTastes(profile) {
  return TASTE_FIELDS.some((f) => profile[f.key]);
}

function tastesPage(profile, state = {}) {
  // Only the free fields here: Looking for and DMs have their own menus below.
  const free = tasteLines({ ...profile, looking_for: null, dms: null });
  return [
    ui.container(color(profile), [
      ...notice(state),
      ui.text(`${C.tastesTitle}\n${C.tastesIntro}`),
      ui.separator(),
      ui.text(C.tastesLines(free)),
      ui.row(
        ui.button({ id: 'cz:tastesedit', label: C.tastesEdit, emoji: '✏️', style: S.PRIMARY }),
        ui.button({ id: 'cz:tastesclear', label: C.tastesClear, emoji: '🧹', style: S.SECONDARY, disabled: !hasTastes(profile) }),
      ),
      ui.separator(),
      ui.text(C.lookingLine),
      lookingSelect(profile),
      ui.text(C.dmsLine),
      dmsSelect(profile),
      ui.separator(),
      ui.text(C.rules),
      ui.row(ui.button({ id: 'cz:page:main', label: C.back, emoji: '◀️', style: S.SECONDARY }), cardButton()),
    ]),
  ];
}

function timezoneSelect(profile) {
  return select('cz:tz', C.timePlaceholder, [
    { label: C.timeNone, value: 'none', emoji: { name: '🚫' }, default: !TIMEZONES[profile.timezone] },
    ...Object.entries(TIMEZONES).map(([value, t]) => ({ label: t.name, value, emoji: { name: '🕰️' }, default: profile.timezone === value })),
  ]);
}

function regionSelect(region) {
  return select('cz:region', C.regionPlaceholder, Object.entries(LANG_REGIONS).map(([value, r]) => ({ label: r.name, value, emoji: { name: r.emoji }, default: region === value })));
}

// The languages of one region. Choosing here replaces only this region's languages.
function langSelect(profile, region) {
  const r = LANG_REGIONS[region];
  const chosen = langList(profile);
  const options = Object.entries(r.langs).map(([value, name]) => ({ label: name, value, default: chosen.includes(value) }));
  return { type: 1, components: [{ type: 3, custom_id: `cz:lang:${region}`, placeholder: C.langPlaceholder(r.name), min_values: 0, max_values: Math.min(LANG_MAX, options.length), options }] };
}

function birthdayForm(profile) {
  const field = (id, label, value) => {
    const input = { type: 4, custom_id: id, style: 1, label, min_length: 1, max_length: 2, required: true };
    if (value) input.value = String(value);
    return { type: 1, components: [input] };
  };
  return {
    type: 9,
    data: {
      custom_id: 'cz:birthday',
      title: C.birthdayForm.title,
      components: [field('day', C.birthdayForm.day, profile.birth_day), field('month', C.birthdayForm.month, profile.birth_month)],
    },
  };
}

// region: the region whose languages are open (from the region menu), or null.
function practicalPage(profile, state = {}, region = null) {
  const langs = langList(profile);
  const hasBirthday = !!birthdayName(profile);
  return [
    ui.container(color(profile), [
      ...notice(state),
      ui.text(`${C.practicalTitle}\n${C.practicalIntro}`),
      ui.separator(),
      ui.text(C.timeLine(TIMEZONES[profile.timezone]?.name ?? null)),
      timezoneSelect(profile),
      ui.separator(),
      ui.text(C.langLine(langs.map(langName), LANG_MAX)),
      regionSelect(region),
      ...(LANG_REGIONS[region] ? [langSelect(profile, region)] : []),
      ui.row(ui.button({ id: 'cz:langclear', label: C.langClear, emoji: '🧹', style: S.SECONDARY, disabled: !langs.length })),
      ui.separator(),
      ui.text(C.birthdayLine(birthdayName(profile))),
      ui.row(
        ui.button({ id: 'cz:bdayedit', label: C.birthdaySet, emoji: '🎂', style: S.PRIMARY }),
        ui.button({ id: 'cz:bdayclear', label: C.birthdayClear, emoji: '🧹', style: S.SECONDARY, disabled: !hasBirthday }),
      ),
      ui.separator(),
      ui.row(ui.button({ id: 'cz:page:main', label: C.back, emoji: '◀️', style: S.SECONDARY }), cardButton()),
    ]),
  ];
}

function backRow() {
  return ui.row(ui.button({ id: 'cz:page:main', label: C.back, emoji: '◀️', style: S.SECONDARY }), cardButton());
}

// Shown until the traveler gives explicit consent. Nothing about identity is saved before.
function consentPage(profile, state = {}) {
  return [
    ui.container(color(profile), [
      ...notice(state),
      ui.text(`${C.consentTitle}\n${C.consentBody}`),
      ui.separator(),
      ui.row(
        ui.button({ id: 'cz:idagree', label: C.consentAgree, emoji: '✅', style: S.PRIMARY }),
        ui.linkButton({ url: `${SITE.privacy}#identity-and-origins`, label: C.consentPolicy, emoji: '🔒' }),
      ),
      backRow(),
    ]),
  ];
}

function identitySelect(profile, field) {
  const f = IDENTITY_FIELDS[field];
  const chosen = identityKeys(profile, field);
  const options = [
    ...Object.entries(f.options)
      .filter(([, label]) => label) // A language can hide a choice it has no word for (null).
      .map(([value, label]) => ({ label, value, emoji: { name: f.emoji }, default: chosen.includes(value) })),
    { label: C.ownWords, value: 'own', emoji: { name: '💭' }, default: chosen.includes('own') && !!profile[`${field}_text`] },
  ];
  return { type: 1, components: [{ type: 3, custom_id: `cz:idf:${field}`, placeholder: C.fieldPlaceholder[field], min_values: 0, max_values: f.max, options }] };
}

function originRegionSelect(region) {
  return select('cz:idoreg', C.originRegionPlaceholder, Object.entries(ORIGIN_REGIONS).map(([value, r]) => ({ label: r.name, value, emoji: { name: r.emoji }, default: region === value })));
}

// The countries of one region, with their flags. Choosing here replaces only this region's countries.
function originSelect(profile, region) {
  const r = ORIGIN_REGIONS[region];
  const chosen = originKeys(profile);
  const options = Object.entries(r.countries).map(([value, name]) => ({ label: name, value, emoji: { name: flag(value) }, default: chosen.includes(value) }));
  return { type: 1, components: [{ type: 3, custom_id: `cz:idocountry:${region}`, placeholder: C.originPlaceholder(r.name), min_values: 0, max_values: Math.min(ORIGIN_MAX, options.length), options }] };
}

// region: the region whose countries are open (from the origins region menu), or null.
function identityPage(profile, state = {}, region = null) {
  const isPublic = profile.identity_public === 1;
  const origins = originNames(profile);
  const fields = Object.keys(IDENTITY_FIELDS).flatMap((field) => [
    ui.text(C.fieldLine[field](identityNames(profile, field))),
    identitySelect(profile, field),
  ]);
  return [
    ui.container(color(profile), [
      ...notice(state),
      ui.text(`${C.identityTitle}\n${C.identityIntro}`),
      ui.separator(),
      ui.text(C.visibilityLine(isPublic, profile.is_public === 1)),
      ui.row(
        ui.button({ id: 'cz:idvis', label: isPublic ? C.makePrivate : C.makePublic, emoji: isPublic ? '🔒' : '🌍', style: S.SECONDARY }),
      ),
      ui.separator(),
      ...fields,
      ui.text(C.fieldLine.origins(origins)),
      originRegionSelect(region),
      ...(ORIGIN_REGIONS[region] ? [originSelect(profile, region)] : []),
      ui.row(
        ui.button({ id: 'cz:idoown', label: C.originOwn, emoji: '💭', style: S.SECONDARY }),
        ui.button({ id: 'cz:idoclear', label: C.originClear, emoji: '🧹', style: S.SECONDARY, disabled: !origins.length }),
      ),
      ui.separator(),
      ui.text(C.identityRules),
      ui.row(
        ui.button({ id: 'cz:idclear', label: C.identityClear, emoji: '🧹', style: S.SECONDARY, disabled: !hasIdentity(profile) }),
        ui.button({ id: 'cz:idwithdraw', label: C.withdraw, emoji: '↩️', style: S.DANGER }),
      ),
      backRow(),
    ]),
  ];
}

function confirmPage(profile, text, yes, no) {
  return [
    ui.container(color(profile), [
      ui.text(text),
      ui.row(yes, ui.button({ id: 'cz:page:identity', label: no.label, emoji: no.emoji, style: S.SECONDARY })),
    ]),
  ];
}

function identityOrConsent(profile, state = {}) {
  return profile.identity_consent_at ? identityPage(profile, state) : consentPage(profile, state);
}

// Progress shown next to a locked badge, when it can be counted.
function progress(profile, key) {
  if (key === 'kindred') return `${Math.min(profile.compare_count ?? 0, KINDRED_GOAL)}/${KINDRED_GOAL}`;
  if (key === 'lorekeeper') return `${pagesSeen(profile)}/${codexTexts.pages.length}`;
  if (key === 'kindsoul') return `${Math.min(profile.blessings_accepted ?? 0, KIND_SOUL_GOAL)}/${KIND_SOUL_GOAL}`;
  return null;
}

function badgesPage(profile, state = {}) {
  const earned = earnedBadges(profile);
  const shown = shownBadges(profile);
  const lines = Object.entries(BADGES).map(([key, b]) =>
    earned.includes(key) ? B.earned(b.emoji, b.name, b.hint) : B.locked(b.name, b.hint, progress(profile, key)),
  );
  const choose = earned.length
    ? [{ type: 1, components: [{ type: 3, custom_id: 'cz:badges', placeholder: B.placeholder, min_values: 0, max_values: Math.min(SHOW_MAX, earned.length),
        options: earned.map((key) => ({ label: BADGES[key].name, value: key, emoji: { name: BADGES[key].emoji }, default: shown.includes(key) })) }] }]
    : [ui.text(B.none)];
  return [
    ui.container(color(profile), [
      ...notice(state),
      ui.text(`${B.title}\n${B.intro}`),
      ui.separator(),
      ui.text(lines.join('\n')),
      ui.separator(),
      ...choose,
      backRow(),
    ]),
  ];
}

const PAGES = { main: mainPage, about: aboutPage, tastes: tastesPage, practical: practicalPage, identity: identityOrConsent, badges: badgesPage };

function noProfile() {
  return [ui.container(ui.COLORS.auracle, [ui.text(profileTexts.notAwakenedSelf)])];
}

export async function customizeCommand(interaction, env) {
  const profile = await store.getProfile(env, userOf(interaction).id);
  if (!profile) return ui.message(noProfile());
  return ui.message(mainPage(profile));
}

// 🏅 Apprentice Painter: the first time a change is saved ("Your card has been updated").
async function withPainter(answer, env, userId) {
  if (answer?.data?.components?.[0]?.components?.[0]?.content !== C.sealed) return answer;
  return announce(answer, await earn(env, userId, 'painter'));
}

export async function customizeComponent(interaction, env) {
  return withPainter(await handleComponent(interaction, env), env, userOf(interaction).id);
}

export async function customizeModal(interaction, env) {
  return withPainter(await handleModal(interaction, env), env, userOf(interaction).id);
}

async function handleComponent(interaction, env) {
  const userId = userOf(interaction).id;
  const [, action, arg] = interaction.data.custom_id.split(':');
  const value = interaction.data.values?.[0];
  const profile = await store.getProfile(env, userId);
  if (!profile) return ui.update(noProfile());

  switch (action) {
    case 'page':
      return ui.update((PAGES[arg] ?? mainPage)(profile));

    case 'title': {
      const title = value in TITLES ? value : null;
      await store.setTitle(env, userId, title);
      profile.title = title;
      return ui.update(mainPage(profile, { sealed: true }));
    }

    case 'color': {
      if (value === 'custom') return form('cz:hex', C.colorForm, { max: 7, required: true });
      const accent = PALETTE[value]?.color ?? null;
      await store.setAccent(env, userId, accent);
      profile.accent = accent;
      return ui.update(mainPage(profile, { sealed: true }));
    }

    case 'aboutedit':
      return form('cz:about', C.aboutForm, { max: ABOUT_MAX, long: true, value: profile.about });

    case 'aboutclear':
      await store.setAbout(env, userId, null);
      profile.about = null;
      return ui.update(aboutPage(profile, { sealed: true }));

    case 'vibe': {
      if (value === 'custom') return form('cz:vibetext', C.vibeForm, { max: VIBE_MAX, required: true, value: profile.vibe_text });
      const vibe = value in VIBES ? value : null;
      await store.setVibe(env, userId, vibe);
      Object.assign(profile, { vibe, vibe_text: null });
      return ui.update(aboutPage(profile, { sealed: true }));
    }

    case 'tastesedit':
      return tastesForm(profile);

    case 'tastesclear':
      await store.setTastes(env, userId, {});
      for (const f of TASTE_FIELDS) profile[f.key] = null;
      return ui.update(tastesPage(profile, { sealed: true }));

    case 'looking': {
      const chosen = (interaction.data.values ?? []).filter((k) => k in LOOKING_FOR).slice(0, 3);
      await store.setLookingFor(env, userId, chosen);
      profile.looking_for = chosen.length ? chosen.join(',') : null;
      return ui.update(tastesPage(profile, { sealed: true }));
    }

    case 'dms': {
      const dms = value in DMS ? value : null;
      await store.setDms(env, userId, dms);
      profile.dms = dms;
      return ui.update(tastesPage(profile, { sealed: true }));
    }

    case 'tz': {
      const timezone = value in TIMEZONES ? value : null;
      await store.setTimezone(env, userId, timezone);
      profile.timezone = timezone;
      return ui.update(practicalPage(profile, { sealed: true }));
    }

    case 'region':
      return ui.update(practicalPage(profile, {}, value in LANG_REGIONS ? value : null));

    case 'lang': {
      const region = LANG_REGIONS[arg] ? arg : null;
      if (!region) return ui.update(practicalPage(profile));
      const inRegion = Object.keys(LANG_REGIONS[region].langs);
      const kept = langList(profile).filter((c) => !inRegion.includes(c));
      const picked = (interaction.data.values ?? []).filter((c) => inRegion.includes(c));
      const languages = [...kept, ...picked];
      if (languages.length > LANG_MAX) return ui.update(practicalPage(profile, { warning: C.langFull(LANG_MAX) }, region));
      await store.setLanguages(env, userId, languages);
      profile.languages = languages.length ? languages.join(',') : null;
      return ui.update(practicalPage(profile, { sealed: true }, region));
    }

    case 'langclear':
      await store.setLanguages(env, userId, []);
      profile.languages = null;
      return ui.update(practicalPage(profile, { sealed: true }));

    case 'bdayedit':
      return birthdayForm(profile);

    case 'bdayclear':
      await store.setBirthday(env, userId, null, null);
      Object.assign(profile, { birth_day: null, birth_month: null });
      return ui.update(practicalPage(profile, { sealed: true }));

    case 'badges': {
      const earned = earnedBadges(profile);
      const chosen = (interaction.data.values ?? []).filter((k) => earned.includes(k)).slice(0, SHOW_MAX);
      await store.setBadgesShown(env, userId, chosen);
      profile.badges_shown = chosen.join(',') || null;
      return ui.update(badgesPage(profile, { sealed: true }));
    }

    case 'idagree': {
      const at = profile.identity_consent_at ?? Date.now();
      await store.setIdentityConsent(env, userId, at);
      profile.identity_consent_at = at;
      return ui.update(identityPage(profile));
    }

    default:
      if (action.startsWith('id')) return identityComponent(interaction, env, profile, action, arg);
      return ui.update(mainPage(profile));
  }
}

// 🌈 Identity buttons and menus. All of them need consent first.
async function identityComponent(interaction, env, profile, action, field) {
  const userId = profile.user_id;
  if (!profile.identity_consent_at) return ui.update(consentPage(profile));

  switch (action) {
    case 'idvis': {
      if (profile.identity_public === 1) {
        await store.setIdentityPublic(env, userId, false);
        profile.identity_public = 0;
        return ui.update(identityPage(profile, { sealed: true }));
      }
      const yes = ui.button({ id: 'cz:idpubok', label: C.publicConfirm, emoji: '🌍', style: S.PRIMARY });
      return ui.update(confirmPage(profile, C.publicWarning, yes, { label: C.keepPrivate, emoji: '🔒' }));
    }

    case 'idpubok':
      await store.setIdentityPublic(env, userId, true);
      profile.identity_public = 1;
      return ui.update(identityPage(profile, { sealed: true }));

    case 'idf': {
      const f = IDENTITY_FIELDS[field];
      if (!f) return ui.update(identityPage(profile));
      const values = (interaction.data.values ?? []).filter((k) => k in f.options || k === 'own');
      if (values.length > f.max) return ui.update(identityPage(profile, { warning: C.tooMany }));
      const known = values.filter((k) => k !== 'own');
      const ownText = profile[`${field}_text`];
      // "My own words" chosen without words yet: save the rest, then open the form.
      if (values.includes('own') && !ownText) {
        await store.setIdentityField(env, userId, field, known, null);
        return form(`cz:idown:${field}`, { ...C.ownForm[field] }, { max: OWN_MAX, required: true });
      }
      const keys = values.includes('own') ? [...known, 'own'] : known;
      const text = values.includes('own') ? ownText : null;
      await store.setIdentityField(env, userId, field, keys, text);
      Object.assign(profile, { [field]: keys.join(',') || null, [`${field}_text`]: text });
      return ui.update(identityPage(profile, { sealed: true }));
    }

    case 'idoreg':
      return ui.update(identityPage(profile, {}, interaction.data.values?.[0] in ORIGIN_REGIONS ? interaction.data.values[0] : null));

    case 'idocountry': {
      const region = ORIGIN_REGIONS[field] ? field : null;
      if (!region) return ui.update(identityPage(profile));
      const inRegion = Object.keys(ORIGIN_REGIONS[region].countries);
      const kept = originKeys(profile).filter((c) => !inRegion.includes(c));
      const picked = (interaction.data.values ?? []).filter((c) => inRegion.includes(c));
      const keys = [...kept, ...picked];
      if (keys.length > ORIGIN_MAX) return ui.update(identityPage(profile, { warning: C.tooMany }, region));
      const text = keys.includes('own') ? profile.origins_text : null;
      await store.setIdentityField(env, userId, 'origins', keys, text);
      Object.assign(profile, { origins: keys.join(',') || null, origins_text: text });
      return ui.update(identityPage(profile, { sealed: true }, region));
    }

    case 'idoown':
      return form('cz:idown:origins', { ...C.ownForm.origins }, { max: OWN_MAX, value: profile.origins_text });

    case 'idoclear':
      await store.setIdentityField(env, userId, 'origins', [], null);
      Object.assign(profile, { origins: null, origins_text: null });
      return ui.update(identityPage(profile, { sealed: true }));

    case 'idclear':
      await store.clearIdentity(env, userId);
      for (const f of [...Object.keys(IDENTITY_FIELDS), 'origins']) Object.assign(profile, { [f]: null, [`${f}_text`]: null });
      return ui.update(identityPage(profile, { sealed: true }));

    case 'idwithdraw': {
      const yes = ui.button({ id: 'cz:idwithdrawok', label: C.withdrawConfirm, emoji: '🧹', style: S.DANGER });
      return ui.update(confirmPage(profile, C.withdrawWarning, yes, { label: C.cancel, emoji: '◀️' }));
    }

    case 'idwithdrawok':
      await store.clearIdentity(env, userId, true);
      return ui.update([ui.container(color(profile), [ui.text(C.withdrawn), backRow()])]);

    default:
      return ui.update(identityOrConsent(profile));
  }
}

// All the text fields of a form, by their custom_id.
function formValues(components, out = {}) {
  for (const c of components ?? []) {
    if (c.custom_id && typeof c.value === 'string') out[c.custom_id] = c.value;
    formValues(c.components ?? (c.component ? [c.component] : []), out);
  }
  return out;
}

function findValue(components) {
  for (const c of components ?? []) {
    if (c.custom_id === 'text' && typeof c.value === 'string') return c.value;
    const inner = findValue(c.components ?? (c.component ? [c.component] : []));
    if (inner != null) return inner;
  }
  return null;
}

// Forms: cz:hex (own color), cz:about (About me), cz:vibetext (own vibe), cz:tastes (Tastes & fun), cz:birthday, cz:idown.
async function handleModal(interaction, env) {
  const userId = userOf(interaction).id;
  const [, action, arg] = interaction.data.custom_id.split(':');
  const raw = findValue(interaction.data.components);
  const profile = await store.getProfile(env, userId);
  if (!profile) return ui.update(noProfile());

  if (action === 'hex') {
    const accent = parseHex(raw);
    if (accent == null) return ui.update(mainPage(profile, { warning: C.badColor }));
    await store.setAccent(env, userId, accent);
    profile.accent = accent;
    return ui.update(mainPage(profile, { sealed: true }));
  }

  if (action === 'about') {
    const { text, error } = cleanText(raw, ABOUT_MAX);
    if (error) return ui.update(aboutPage(profile, { warning: C.noLinks }));
    await store.setAbout(env, userId, text);
    profile.about = text;
    return ui.update(aboutPage(profile, { sealed: true }));
  }

  if (action === 'vibetext') {
    const { text, error } = cleanText(raw, VIBE_MAX);
    if (error) return ui.update(aboutPage(profile, { warning: C.noLinks }));
    const vibe = text ? 'custom' : null;
    await store.setVibe(env, userId, vibe, text);
    Object.assign(profile, { vibe, vibe_text: text });
    return ui.update(aboutPage(profile, { sealed: true }));
  }

  if (action === 'birthday') {
    const values = formValues(interaction.data.components);
    const date = parseBirthday(values.day, values.month);
    if (!date) return ui.update(practicalPage(profile, { warning: C.badBirthday }));
    await store.setBirthday(env, userId, date.day, date.month);
    Object.assign(profile, { birth_day: date.day, birth_month: date.month });
    return ui.update(practicalPage(profile, { sealed: true }));
  }

  // 🌍 A heritage in the traveler's own words (empty to remove it).
  if (action === 'idown' && arg === 'origins') {
    if (!profile.identity_consent_at) return ui.update(identityOrConsent(profile));
    const { text, error } = cleanText(raw, OWN_MAX);
    if (error) return ui.update(identityPage(profile, { warning: C.noLinks }));
    const known = originKeys(profile).filter((c) => c !== 'own');
    if (text && known.length >= ORIGIN_MAX) return ui.update(identityPage(profile, { warning: C.tooMany }));
    const keys = text ? [...known, 'own'] : known;
    await store.setIdentityField(env, userId, 'origins', keys, text);
    Object.assign(profile, { origins: keys.join(',') || null, origins_text: text });
    return ui.update(identityPage(profile, { sealed: true }));
  }

  // 🌈 Own words for pronouns, gender or orientation.
  if (action === 'idown') {
    const f = IDENTITY_FIELDS[arg];
    if (!f || !profile.identity_consent_at) return ui.update(identityOrConsent(profile));
    const { text, error } = cleanText(raw, OWN_MAX);
    if (error) return ui.update(identityPage(profile, { warning: C.noLinks }));
    const known = identityKeys(profile, arg).filter((k) => k !== 'own');
    if (text && known.length >= f.max) return ui.update(identityPage(profile, { warning: C.tooMany }));
    const keys = text ? [...known, 'own'] : known;
    await store.setIdentityField(env, userId, arg, keys, text);
    Object.assign(profile, { [arg]: keys.join(',') || null, [`${arg}_text`]: text });
    return ui.update(identityPage(profile, { sealed: true }));
  }

  if (action === 'tastes') {
    const values = formValues(interaction.data.components);
    const fields = {};
    for (const f of TASTE_FIELDS) {
      const { text, error } = cleanText(values[f.key], TASTE_MAX);
      if (error) return ui.update(tastesPage(profile, { warning: C.noLinks }));
      fields[f.key] = text;
    }
    await store.setTastes(env, userId, fields);
    Object.assign(profile, fields);
    return ui.update(tastesPage(profile, { sealed: true }));
  }

  return ui.update(mainPage(profile));
}
