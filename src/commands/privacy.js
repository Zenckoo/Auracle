// 🔒 Privacy (in the /auracle menu): public or private card, hidden secret, guild role, and My data.

import { ui } from '../core/ui.js';
import { profileTexts } from '../texts/en-profile.js';
import { privacyTexts as P } from '../texts/en-privacy.js';
import { secretTexts as SX } from '../texts/en-secrets.js';
import { CLASSES, GUILDS } from '../data/classes.js';
import * as store from '../core/store.js';
import * as roles from '../core/roles.js';
import { SITE } from '../config.js';
import { texts } from '../texts/en.js';

const S = ui.ButtonStyle;

function userOf(interaction) {
  return interaction.member?.user ?? interaction.user;
}

function color(profile) {
  return ui.COLORS[GUILDS[CLASSES[profile.type_code].guild].colorKey];
}

// My data, and a link to the full Privacy Policy on the website.
function dataRow() {
  return ui.row(
    ui.button({ id: 'pv:export', label: P.dataButton, emoji: '📦', style: S.SECONDARY }),
    ui.linkButton({ url: SITE.privacy, label: texts.common.links.privacy, emoji: '🔒' }),
  );
}

function screen(profile, sealed = false) {
  const isPublic = profile.is_public === 1;
  const isShown = profile.secret_public === 1;
  const wearsRole = profile.wear_role !== 0;
  const parts = [];
  if (sealed) parts.push(ui.text(P.sealed), ui.separator());
  parts.push(
    ui.text(`${P.title}\n${P.explain}`),
    ui.separator(),
    ui.text(P.current(isPublic)),
    ui.row(
      ui.button({ id: 'pv:pub', label: P.public, emoji: '🌍', style: isPublic ? S.SUCCESS : S.SECONDARY }),
      ui.button({ id: 'pv:priv', label: P.private, emoji: '🔒', style: isPublic ? S.SECONDARY : S.SUCCESS }),
    ),
    ui.text(SX.privacyLine(isShown)),
    ui.row(
      ui.button({ id: 'pv:sshow', label: SX.show, emoji: '🗝️', style: isShown ? S.SUCCESS : S.SECONDARY }),
      ui.button({ id: 'pv:shide', label: SX.hide, emoji: '🤫', style: isShown ? S.SECONDARY : S.SUCCESS }),
    ),
    ui.text(`${P.roleLine(wearsRole)}\n${P.roleNote}`),
    ui.row(
      ui.button({ id: 'pv:rwear', label: P.wear, emoji: '🏰', style: wearsRole ? S.SUCCESS : S.SECONDARY }),
      ui.button({ id: 'pv:rhide', label: P.noWear, emoji: '🚫', style: wearsRole ? S.SECONDARY : S.SUCCESS }),
    ),
    ui.separator(),
    ui.text(P.dataLine),
    dataRow(),
  );
  return [ui.container(color(profile), parts)];
}

// No class yet: Auracle may still keep an unfinished trial or servers, so My data stays available.
function noProfileScreen() {
  return [
    ui.container(ui.COLORS.auracle, [
      ui.text(profileTexts.notAwakenedSelf),
      ui.separator(),
      ui.text(P.dataLine),
      dataRow(),
    ]),
  ];
}

export async function privacyCommand(interaction, env) {
  const profile = await store.getProfile(env, userOf(interaction).id);
  if (!profile) return ui.message(noProfileScreen());
  return ui.message(screen(profile));
}

export async function privacyComponent(interaction, env, later) {
  const userId = userOf(interaction).id;
  const action = interaction.data.custom_id.split(':')[1];
  // My data: works even without a finished trial (an unfinished trial or servers can still be kept).
  if (action === 'export') {
    const data = await store.exportData(env, userId);
    if (later) later(ui.followUpFile(interaction, P.dataFile, 'auracle-my-data.json', JSON.stringify(data, null, 2)).catch(() => {}));
    return ui.message([ui.container(ui.COLORS.auracle, [ui.text(P.dataSending)])]);
  }

  const profile = await store.getProfile(env, userId);
  if (!profile) return ui.update(noProfileScreen());

  if (action === 'pub' || action === 'priv') {
    const isPublic = action === 'pub';
    await store.setPublic(env, userId, isPublic);
    profile.is_public = isPublic ? 1 : 0;
  } else if (action === 'sshow' || action === 'shide') {
    const isShown = action === 'sshow';
    await store.setSecretPublic(env, userId, isShown);
    profile.secret_public = isShown ? 1 : 0;
  } else if (action === 'rwear' || action === 'rhide') {
    const wear = action === 'rwear';
    await store.setWearRole(env, userId, wear);
    profile.wear_role = wear ? 1 : 0;
  }
  // Public/private or wear/don't wear: update the guild role on every server that uses them.
  if (later && action !== 'sshow' && action !== 'shide') {
    later(roles.syncEverywhere(env, userId, { profile }).catch(() => {}));
  }
  return ui.update(screen(profile, true));
}
