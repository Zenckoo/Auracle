// ⚙️ Server settings (staff only): the language Auracle speaks here, and the guild roles.

import { ui } from '../core/ui.js';
import { serverTexts as SV } from '../texts/server.js';
import { config, inviteUrl } from '../config.js';
import * as roles from '../core/roles.js';
import * as store from '../core/store.js';
import { LANGS, runWithLang, langFromLocale } from '../core/i18n.js';

const S = ui.ButtonStyle;

function note(text, extra = []) {
  return [ui.container(ui.COLORS.auracle, [ui.text(text), ...extra])];
}

// 🌍 The language menu: Automatic, then each language.
function languagePart(settings, guildLocale, guildId) {
  const chosen = settings?.language ?? null;
  const shown = chosen ?? langFromLocale(guildLocale);
  const options = [
    { label: SV.languageAuto, value: 'auto', description: SV.languageAutoHint, emoji: { name: '🌐' }, default: !chosen },
    ...Object.entries(LANGS).filter(([, l]) => l.ready || guildId === config.hqGuildId).map(([code, l]) => ({ label: l.name, value: code, emoji: { name: l.flag }, default: chosen === code })),
  ];
  return [
    ui.text(`${SV.languageTitle}\n${SV.languageExplain}`),
    ui.text(SV.languageStatus(`${LANGS[shown].flag} ${LANGS[shown].name}`, !chosen)),
    { type: 1, components: [{ type: 3, custom_id: 'sv:lang', placeholder: SV.languagePlaceholder, options }] },
  ];
}

function screen(settings, notice, guildLocale, guildId) {
  const on = settings?.roles_enabled === 1;
  const parts = [];
  if (notice) parts.push(ui.text(notice), ui.separator());
  parts.push(
    ui.text(`${SV.title}\n${SV.intro}`),
    ui.separator(),
    // The language section appears once a second language is ready (and on the HQ server, to try them).
    ...(Object.values(LANGS).filter((l) => l.ready).length > 1 || guildId === config.hqGuildId
      ? [...languagePart(settings, guildLocale, guildId), ui.separator()]
      : []),
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
  return ui.message(screen(settings, null, interaction.guild_locale, interaction.guild_id));
}

export async function serverComponent(interaction, env, later) {
  const guildId = interaction.guild_id;
  if (!guildId) return ui.update(note(SV.serverOnly));
  if (!roles.isStaff(interaction)) return ui.update(note(SV.notStaff));
  const action = interaction.data.custom_id.split(':')[1];
  const locale = interaction.guild_locale;

  // 🌍 A new language: saved, then the page answers in that language right away.
  if (action === 'lang') {
    const value = interaction.data.values?.[0];
    const language = LANGS[value] && (LANGS[value].ready || guildId === config.hqGuildId) ? value : null;
    await store.setServerLanguage(env, guildId, language);
    const lang = language ?? langFromLocale(locale);
    return runWithLang(lang, async () =>
      ui.update(screen(await store.getServerSettings(env, guildId), SV.languageSaved(LANGS[lang].name), locale, guildId)));
  }

  if (action === 'on') {
    if (!roles.botCanManageRoles(interaction)) return ui.update(permissionScreen(guildId));
    const result = await roles.enableRoles(env, guildId);
    if (!result.ok) {
      return ui.update(result.reason === 'permission' ? permissionScreen(guildId) : note(SV.failed));
    }
    later(roles.fillServer(env, guildId).catch(() => {}));
    return ui.update(screen(await store.getServerSettings(env, guildId), SV.enabled, locale, guildId));
  }

  if (action === 'off') {
    await roles.disableRoles(env, guildId);
    return ui.update(screen(await store.getServerSettings(env, guildId), SV.disabled, locale, guildId));
  }

  return ui.update(screen(await store.getServerSettings(env, guildId), null, locale, guildId));
}
