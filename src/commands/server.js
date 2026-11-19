// ⚙️ Server settings (staff only): turn the guild roles on or off.

import { ui } from '../core/ui.js';
import { serverTexts as SV } from '../texts/en-server.js';
import { inviteUrl } from '../config.js';
import * as roles from '../core/roles.js';
import * as store from '../core/store.js';

const S = ui.ButtonStyle;

function note(text, extra = []) {
  return [ui.container(ui.COLORS.auracle, [ui.text(text), ...extra])];
}

function screen(settings, notice) {
  const on = settings?.roles_enabled === 1;
  const parts = [];
  if (notice) parts.push(ui.text(notice), ui.separator());
  parts.push(
    ui.text(`${SV.title}\n${SV.intro}`),
    ui.separator(),
    ui.text(`${SV.rolesTitle}\n${SV.rolesExplain}`),
    ui.text(SV.status(on)),
    ui.row(
      ui.button({ id: 'sv:on', label: SV.enable, emoji: '🟢', style: on ? S.SUCCESS : S.SECONDARY }),
      ui.button({ id: 'sv:off', label: SV.disable, emoji: '⚪', style: on ? S.SECONDARY : S.DANGER }),
    ),
  );
  return [ui.container(ui.COLORS.auracle, parts)];
}

function permissionScreen(guildId) {
  return note(SV.missingPermission, [
    ui.separator(),
    ui.row(ui.linkButton({ url: inviteUrl(guildId), label: SV.grantButton, emoji: '🔑' })),
  ]);
}

export async function serverCommand(interaction, env) {
  if (!interaction.guild_id) return ui.message(note(SV.serverOnly));
  if (!roles.isStaff(interaction)) return ui.message(note(SV.notStaff));
  const settings = await store.getServerSettings(env, interaction.guild_id);
  return ui.message(screen(settings));
}

export async function serverComponent(interaction, env, later) {
  const guildId = interaction.guild_id;
  if (!guildId) return ui.update(note(SV.serverOnly));
  if (!roles.isStaff(interaction)) return ui.update(note(SV.notStaff));
  const action = interaction.data.custom_id.split(':')[1];

  if (action === 'on') {
    if (!roles.botCanManageRoles(interaction)) return ui.update(permissionScreen(guildId));
    const result = await roles.enableRoles(env, guildId);
    if (!result.ok) {
      return ui.update(result.reason === 'permission' ? permissionScreen(guildId) : note(SV.failed));
    }
    later(roles.fillServer(env, guildId).catch(() => {}));
    return ui.update(screen(await store.getServerSettings(env, guildId), SV.enabled));
  }

  if (action === 'off') {
    await roles.disableRoles(env, guildId);
    return ui.update(screen(await store.getServerSettings(env, guildId), SV.disabled));
  }

  return ui.update(screen(await store.getServerSettings(env, guildId)));
}
