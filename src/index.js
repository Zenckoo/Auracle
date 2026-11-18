// Cloudflare entry point. This file is the only one tied to Cloudflare:
// everything in core/, texts/ and commands/ can move to another host.

import { verifyDiscordRequest } from './discord/verify.js';
import { registerCommands } from './discord/register.js';
import { handleCommand, handleComponent } from './router.js';

const InteractionType = { PING: 1, APPLICATION_COMMAND: 2, MESSAGE_COMPONENT: 3 };

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

      if (interaction.type === InteractionType.APPLICATION_COMMAND) {
        return json(await handleCommand(interaction, env, later));
      }

      if (interaction.type === InteractionType.MESSAGE_COMPONENT) {
        return json(await handleComponent(interaction, env, later));
      }

      return json({ error: 'Unknown interaction type' }, 400);
    }

    return new Response('Not found.', { status: 404 });
  },
};
