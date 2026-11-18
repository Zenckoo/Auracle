// /privacy: choose if your profile card is public or private, and if your hidden secret shows on it.

import { ui } from '../core/ui.js';
import { profileTexts } from '../texts/en-profile.js';
import { privacyTexts as P } from '../texts/en-privacy.js';
import { secretTexts as SX } from '../texts/en-secrets.js';
import { CLASSES, GUILDS } from '../data/classes.js';
import * as store from '../core/store.js';

const S = ui.ButtonStyle;

function userOf(interaction) {
  return interaction.member?.user ?? interaction.user;
}

function color(profile) {
  return ui.COLORS[GUILDS[CLASSES[profile.type_code].guild].colorKey];
}

function screen(profile, sealed = false) {
  const isPublic = profile.is_public === 1;
  const isShown = profile.secret_public === 1;
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
  );
  return [ui.container(color(profile), parts)];
}

export async function privacyCommand(interaction, env) {
  const profile = await store.getProfile(env, userOf(interaction).id);
  if (!profile) return ui.message([ui.container(ui.COLORS.auracle, [ui.text(profileTexts.notAwakenedSelf)])]);
  return ui.message(screen(profile));
}

export async function privacyComponent(interaction, env) {
  const userId = userOf(interaction).id;
  const action = interaction.data.custom_id.split(':')[1];
  const profile = await store.getProfile(env, userId);
  if (!profile) return ui.update([ui.container(ui.COLORS.auracle, [ui.text(profileTexts.notAwakenedSelf)])]);

  if (action === 'pub' || action === 'priv') {
    const isPublic = action === 'pub';
    await store.setPublic(env, userId, isPublic);
    profile.is_public = isPublic ? 1 : 0;
  } else if (action === 'sshow' || action === 'shide') {
    const isShown = action === 'sshow';
    await store.setSecretPublic(env, userId, isShown);
    profile.secret_public = isShown ? 1 : 0;
  }
  return ui.update(screen(profile, true));
}
