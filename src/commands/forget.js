// /forget: erase everything Auracle knows about you (right to be forgotten).

import { ui } from '../core/ui.js';
import { forgetTexts as F } from '../texts/en-privacy.js';
import * as store from '../core/store.js';
import * as roles from '../core/roles.js';

function userOf(interaction) {
  return interaction.member?.user ?? interaction.user;
}

function box(text, extra = []) {
  return [ui.container(ui.COLORS.auracle, [ui.text(text), ...extra])];
}

export async function forgetCommand(interaction, env) {
  const userId = userOf(interaction).id;
  const profile = await store.getProfile(env, userId);
  const trial = await store.getTrial(env, userId);
  if (!profile && !trial) return ui.message(box(F.nothing));

  return ui.message(
    box(F.question, [
      ui.separator(),
      ui.row(
        ui.button({ id: 'fg:erase', label: F.erase, emoji: '🗑️', style: ui.ButtonStyle.DANGER }),
        ui.button({ id: 'fg:keep', label: F.keep, emoji: '🛡️', style: ui.ButtonStyle.SECONDARY }),
      ),
    ]),
  );
}

export async function forgetComponent(interaction, env, later) {
  const userId = userOf(interaction).id;
  const action = interaction.data.custom_id.split(':')[1];

  if (action === 'erase') {
    // Read the servers with guild roles before the server list is erased, then remove the roles.
    const servers = await store.roleServersOfUser(env, userId);
    await store.deleteProfile(env, userId);
    await store.deleteTrial(env, userId);
    await store.deleteMembers(env, userId);
    await store.deleteBlessings(env, userId);
    if (later) later(roles.syncEverywhere(env, userId, { servers, profile: null }).catch(() => {}));
    return ui.update(box(F.erased));
  }
  return ui.update(box(F.kept));
}
