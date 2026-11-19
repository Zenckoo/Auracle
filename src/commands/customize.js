// 🎨 Customize: everything a traveler can change on their card: fantasy title and accent color.
// Opened from the /auracle menu. Buttons, menus and forms are named "cz:...".

import { ui } from '../core/ui.js';
import { customizeTexts as C } from '../texts/en-customize.js';
import { profileTexts } from '../texts/en-profile.js';
import { CLASSES, GUILDS } from '../data/classes.js';
import { TITLES, titleName } from '../data/titles.js';
import { PALETTE, parseHex, colorName } from '../data/colors.js';
import * as store from '../core/store.js';

function userOf(interaction) {
  return interaction.member?.user ?? interaction.user;
}

function color(profile) {
  if (profile.accent != null) return profile.accent;
  return ui.COLORS[GUILDS[CLASSES[profile.type_code].guild].colorKey];
}

function titleSelect(current) {
  const options = [
    { label: C.noTitle, value: 'none', emoji: { name: '🚫' }, default: !current },
    ...Object.entries(TITLES).map(([value, label]) => ({ label, value, emoji: { name: '✨' }, default: current === value })),
  ];
  return { type: 1, components: [{ type: 3, custom_id: 'cz:title', placeholder: C.titlePlaceholder, min_values: 1, max_values: 1, options }] };
}

function colorSelect(current) {
  const options = [
    { label: C.guildColor, value: 'guild', emoji: { name: '🏰' }, default: current == null },
    ...Object.entries(PALETTE).map(([value, p]) => ({ label: p.name, value, emoji: { name: p.emoji }, default: current === p.color })),
    { label: C.customColor, value: 'custom', emoji: { name: '🎨' } },
  ];
  return { type: 1, components: [{ type: 3, custom_id: 'cz:color', placeholder: C.colorPlaceholder, min_values: 1, max_values: 1, options }] };
}

function colorForm() {
  return {
    type: 9,
    data: {
      custom_id: 'cz:hex',
      title: C.colorForm.title,
      components: [
        {
          type: 1,
          components: [
            { type: 4, custom_id: 'text', style: 1, label: C.colorForm.label, placeholder: C.colorForm.placeholder, min_length: 6, max_length: 7, required: true },
          ],
        },
      ],
    },
  };
}

// sealed: show "Your card has been updated". warning: a small note at the top (for a wrong hex code).
function screen(profile, { sealed = false, warning = null } = {}) {
  const parts = [];
  if (warning) parts.push(ui.text(warning), ui.separator());
  else if (sealed) parts.push(ui.text(C.sealed), ui.separator());
  parts.push(
    ui.text(`${C.title}\n${C.intro}`),
    ui.separator(),
    ui.text(C.titleLine(titleName(profile.title))),
    titleSelect(profile.title),
    ui.separator(),
    ui.text(C.colorLine(profile.accent == null ? null : colorName(profile.accent))),
    colorSelect(profile.accent),
    ui.separator(),
    ui.row(ui.button({ id: 'hub:card', label: C.viewCard, emoji: '🪪', style: ui.ButtonStyle.SECONDARY })),
  );
  return [ui.container(color(profile), parts)];
}

function noProfile() {
  return [ui.container(ui.COLORS.auracle, [ui.text(profileTexts.notAwakenedSelf)])];
}

export async function customizeCommand(interaction, env) {
  const profile = await store.getProfile(env, userOf(interaction).id);
  if (!profile) return ui.message(noProfile());
  return ui.message(screen(profile));
}

export async function customizeComponent(interaction, env) {
  const userId = userOf(interaction).id;
  const action = interaction.data.custom_id.split(':')[1];
  const profile = await store.getProfile(env, userId);
  if (!profile) return ui.update(noProfile());

  if (action === 'title') {
    const value = interaction.data.values?.[0];
    const title = value in TITLES ? value : null;
    await store.setTitle(env, userId, title);
    profile.title = title;
  }

  if (action === 'color') {
    const value = interaction.data.values?.[0];
    if (value === 'custom') return colorForm();
    const accent = PALETTE[value]?.color ?? null;
    await store.setAccent(env, userId, accent);
    profile.accent = accent;
  }

  return ui.update(screen(profile, { sealed: true }));
}

function findValue(components) {
  for (const c of components ?? []) {
    if (c.custom_id === 'text' && typeof c.value === 'string') return c.value;
    const inner = findValue(c.components ?? (c.component ? [c.component] : []));
    if (inner) return inner;
  }
  return null;
}

// The hex code form (cz:hex).
export async function customizeModal(interaction, env) {
  const userId = userOf(interaction).id;
  const profile = await store.getProfile(env, userId);
  if (!profile) return ui.update(noProfile());

  const accent = parseHex(findValue(interaction.data.components));
  if (accent == null) return ui.update(screen(profile, { warning: C.badColor }));

  await store.setAccent(env, userId, accent);
  profile.accent = accent;
  return ui.update(screen(profile, { sealed: true }));
}
