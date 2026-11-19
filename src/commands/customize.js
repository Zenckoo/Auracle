// 🎨 Customize: everything a traveler can change on their card. For now: the fantasy title.
// Opened from the /auracle menu. Buttons and menus are named "cz:...".

import { ui } from '../core/ui.js';
import { customizeTexts as C } from '../texts/en-customize.js';
import { profileTexts } from '../texts/en-profile.js';
import { CLASSES, GUILDS } from '../data/classes.js';
import { TITLES, titleName } from '../data/titles.js';
import * as store from '../core/store.js';

function userOf(interaction) {
  return interaction.member?.user ?? interaction.user;
}

function color(profile) {
  return ui.COLORS[GUILDS[CLASSES[profile.type_code].guild].colorKey];
}

function titleSelect(current) {
  const options = [
    { label: C.noTitle, value: 'none', emoji: { name: '🚫' }, default: !current },
    ...Object.entries(TITLES).map(([value, label]) => ({ label, value, emoji: { name: '✨' }, default: current === value })),
  ];
  return { type: 1, components: [{ type: 3, custom_id: 'cz:title', placeholder: C.titlePlaceholder, min_values: 1, max_values: 1, options }] };
}

function screen(profile, sealed = false) {
  const parts = [];
  if (sealed) parts.push(ui.text(C.sealed), ui.separator());
  parts.push(
    ui.text(`${C.title}\n${C.intro}`),
    ui.separator(),
    ui.text(C.titleLine(titleName(profile.title))),
    titleSelect(profile.title),
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

  return ui.update(screen(profile, true));
}
