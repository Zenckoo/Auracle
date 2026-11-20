// 🗂️ Organize card: Customize > 🗂️ Organize. Move the 4 parts of the card up, or hide them.
//   og:page   og:up:<key>   og:toggle:<key>   og:reset

import { ui } from '../core/ui.js';
import { organizeTexts as O } from '../texts/organize.js';
import { customizeTexts as C } from '../texts/customize.js';
import { profileTexts } from '../texts/profile.js';
import { CLASSES, GUILDS } from '../data/classes.js';
import { PARTS, cardLayout, layoutText } from '../data/layout.js';
import * as store from '../core/store.js';

const S = ui.ButtonStyle;

function userOf(interaction) {
  return interaction.member?.user ?? interaction.user;
}

function color(profile) {
  if (profile.accent != null) return profile.accent;
  return ui.COLORS[GUILDS[CLASSES[profile.type_code].guild].colorKey];
}

function organizePage(profile, notice = null) {
  const parts = cardLayout(profile);
  const rows = parts.flatMap((p, i) => [
    ui.text(O.line(i + 1, PARTS[p.key].emoji, PARTS[p.key].name, p.hidden)),
    ui.row(
      ui.button({ id: `og:up:${p.key}`, label: O.up, emoji: '⬆️', style: S.SECONDARY, disabled: i === 0 }),
      ui.button({ id: `og:toggle:${p.key}`, label: p.hidden ? O.show : O.hide, emoji: p.hidden ? '👁️' : '🙈', style: S.SECONDARY }),
    ),
  ]);
  return [
    ui.container(color(profile), [
      ...(notice ? [ui.text(notice), ui.separator()] : []),
      ui.text(`${O.title}\n${O.intro}`),
      ui.separator(),
      ...rows,
      ui.separator(),
      ui.row(
        ui.button({ id: 'og:reset', label: O.reset, emoji: '🔄', style: S.SECONDARY, disabled: !profile.card_layout }),
        ui.button({ id: 'cz:page:main', label: C.back, emoji: '◀️', style: S.SECONDARY }),
        ui.button({ id: 'hub:card', label: C.viewCard, emoji: '🪪', style: S.SECONDARY }),
      ),
    ]),
  ];
}

export async function organizeComponent(interaction, env) {
  const userId = userOf(interaction).id;
  const [, action, key] = interaction.data.custom_id.split(':');
  const profile = await store.getProfile(env, userId);
  if (!profile) return ui.update([ui.container(ui.COLORS.auracle, [ui.text(profileTexts.notAwakenedSelf)])]);

  const parts = cardLayout(profile);
  const i = parts.findIndex((p) => p.key === key);
  if (action === 'up' && i > 0) [parts[i - 1], parts[i]] = [parts[i], parts[i - 1]];
  else if (action === 'toggle' && i >= 0) parts[i].hidden = !parts[i].hidden;
  else if (action !== 'reset') return ui.update(organizePage(profile));

  const layout = action === 'reset' ? null : layoutText(parts);
  await store.setCardLayout(env, userId, layout);
  profile.card_layout = layout;
  return ui.update(organizePage(profile, O.saved));
}
