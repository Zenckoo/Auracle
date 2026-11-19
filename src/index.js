// Cloudflare entry point. This file is the only one tied to Cloudflare:
// everything in core/, texts/ and commands/ can move to another host.

import { verifyDiscordRequest } from './discord/verify.js';
import { registerCommands } from './discord/register.js';
import { handleCommand, handleComponent, handleModal } from './router.js';
import { recordMember } from './core/store.js';
import { syncMember } from './core/roles.js';

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

      // Remember which server this traveler uses Auracle on (for /guilds).
      const userId = interaction.member?.user?.id;
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

    return new Response('Not found.', { status: 404 });
  },
};
