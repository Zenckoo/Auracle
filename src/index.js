// Cloudflare entry point. This file is the only one tied to Cloudflare:
// everything in core/, texts/ and commands/ can move to another host.

import { verifyDiscordRequest } from './discord/verify.js';
import { registerCommands } from './discord/register.js';
import { handleCommand, handleComponent, handleModal } from './router.js';
import { recordMember, getBan, cleanup, getServerLanguage } from './core/store.js';
import { runWithLang, langFromLocale } from './core/i18n.js';
import { syncMember } from './core/roles.js';
import { ui } from './core/ui.js';
import { banTexts } from './texts/feedback.js';

const InteractionType = { PING: 1, APPLICATION_COMMAND: 2, MESSAGE_COMPONENT: 3, MODAL_SUBMIT: 5 };

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json;charset=UTF-8' },
  });
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (request.method === 'GET' && url.pathname === '/') {
      return new Response('Auracle is awake.');
    }

    if (request.method === 'GET' && url.pathname === '/register') {
      return registerCommands(url, env);
    }

    if (request.method === 'POST' && url.pathname === '/') {
      const { isValid, interaction } = await verifyDiscordRequest(request, env);
      if (!isValid) {
        return new Response('Bad request signature.', { status: 401 });
      }

      // later(task) runs something just after the answer is sent (follow-up messages).
      const later = (task) => ctx.waitUntil(task);

      if (interaction.type === InteractionType.PING) {
        return json({ type: 1 });
      }

      // 🌍 Everything below speaks the server's language: the staff's choice, or the server's Discord language.
      const chosen = interaction.guild_id ? await getServerLanguage(env, interaction.guild_id).catch(() => null) : null;
      const lang = chosen ?? langFromLocale(interaction.guild_locale);
      return runWithLang(lang, () => handle(interaction, env, later));
    }

    return new Response('Not found.', { status: 404 });
  },

  // Every night: erase unfinished trials after 30 days, old Feedback counters and ended blocks.
  async scheduled(event, env, ctx) {
    ctx.waitUntil(cleanup(env));
  },
};

// One Discord request, already inside its language.
async function handle(interaction, env, later) {
  // Blocked travelers (Feedback spam) can only erase their data with /forget.
  const userId = interaction.member?.user?.id ?? interaction.user?.id;
  if (userId && (interaction.type === InteractionType.APPLICATION_COMMAND || interaction.type === InteractionType.MESSAGE_COMPONENT || interaction.type === InteractionType.MODAL_SUBMIT)) {
    const isForget = interaction.data?.name === 'forget' || interaction.data?.custom_id?.startsWith('fg:');
    const ban = isForget ? null : await getBan(env, userId);
    if (ban) {
      const box = [ui.container(ui.COLORS.auracle, [ui.text(banTexts.blocked(ban.until))])];
      return json(ui.message(box));
    }
  }

  // Remember which server this traveler uses Auracle on (for 🏰 Guilds).
  if (interaction.guild_id && userId) {
    later(recordMember(env, userId, interaction.guild_id).catch(() => {}));
  }

  if (interaction.type === InteractionType.APPLICATION_COMMAND) {
    // Guild roles: check this traveler's role on this server (not for /forget, which removes it itself).
    if (interaction.guild_id && userId && interaction.data.name !== 'forget') {
      later(syncMember(env, interaction.guild_id, userId, { currentRoles: interaction.member.roles ?? [] }).catch(() => {}));
    }
    return json(await handleCommand(interaction, env, later));
  }

  if (interaction.type === InteractionType.MESSAGE_COMPONENT) {
    return json(await handleComponent(interaction, env, later));
  }

  if (interaction.type === InteractionType.MODAL_SUBMIT) {
    return json(await handleModal(interaction, env, later));
  }

  return json({ error: 'Unknown interaction type' }, 400);
}
