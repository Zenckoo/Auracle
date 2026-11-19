// 🎨 Customize: everything a traveler can change on their card, page by page.
//   main  : 🖌️ Appearance (fantasy title, accent color) and buttons to the other pages
//   about : 💬 About me (a short sentence) and 🌙 Current vibe
// Opened from the /auracle menu. Buttons, menus and forms are named "cz:...".

import { ui } from '../core/ui.js';
import { customizeTexts as C } from '../texts/en-customize.js';
import { profileTexts } from '../texts/en-profile.js';
import { CLASSES, GUILDS } from '../data/classes.js';
import { TITLES, titleName } from '../data/titles.js';
import { PALETTE, parseHex, colorName } from '../data/colors.js';
import { VIBES, vibeLine } from '../data/vibes.js';
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
      ui.row(ui.button({ id: 'cz:page:about', label: C.aboutPage, emoji: '💬', style: S.PRIMARY }), cardButton()),
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

const PAGES = { main: mainPage, about: aboutPage };

function noProfile() {
  return [ui.container(ui.COLORS.auracle, [ui.text(profileTexts.notAwakenedSelf)])];
}

export async function customizeCommand(interaction, env) {
  const profile = await store.getProfile(env, userOf(interaction).id);
  if (!profile) return ui.message(noProfile());
  return ui.message(mainPage(profile));
}

export async function customizeComponent(interaction, env) {
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

    default:
      return ui.update(mainPage(profile));
  }
}

function findValue(components) {
  for (const c of components ?? []) {
    if (c.custom_id === 'text' && typeof c.value === 'string') return c.value;
    const inner = findValue(c.components ?? (c.component ? [c.component] : []));
    if (inner != null) return inner;
  }
  return null;
}

// Forms: cz:hex (own color), cz:about (About me), cz:vibetext (own vibe).
export async function customizeModal(interaction, env) {
  const userId = userOf(interaction).id;
  const action = interaction.data.custom_id.split(':')[1];
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

  return ui.update(mainPage(profile));
}
