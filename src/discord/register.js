// Registers Auracle's slash commands with Discord.
// Open in a browser: https://<worker-url>/register?key=YOUR_REGISTER_KEY
// Add &guild=SERVER_ID to register on one server only (instant, good for tests).

import { commandDefinitions } from '../commands/definitions.js';

export async function registerCommands(url, env) {
  const key = url.searchParams.get('key');
  if (!env.REGISTER_KEY || key !== env.REGISTER_KEY) {
    return new Response('Forbidden.', { status: 403 });
  }

  const guild = url.searchParams.get('guild');
  const base = `https://discord.com/api/v10/applications/${env.DISCORD_APPLICATION_ID}`;
  const endpoint = guild ? `${base}/guilds/${guild}/commands` : `${base}/commands`;

  const response = await fetch(endpoint, {
    method: 'PUT',
    headers: {
      'content-type': 'application/json',
      authorization: `Bot ${env.DISCORD_TOKEN}`,
    },
    body: JSON.stringify(commandDefinitions),
  });

  if (!response.ok) {
    const detail = await response.text();
    return new Response(`Registration failed (${response.status}): ${detail}`, { status: 500 });
  }

  const scope = guild ? `server ${guild}` : 'all servers (may take up to an hour to appear)';
  return new Response(`Commands registered on ${scope}: ${commandDefinitions.map((c) => '/' + c.name).join(', ')}`);
}
