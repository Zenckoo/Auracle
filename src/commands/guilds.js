// 🏰 Guilds (a button in /auracle): how the four guilds are spread across this server (public cards only, numbers only).

import { ui } from '../core/ui.js';
import { guildsTexts as G } from '../texts/social.js';
import { CLASSES, GUILDS } from '../data/classes.js';
import * as store from '../core/store.js';
import * as scoring from '../core/scoring.js';

async function serverName(env, guildId) {
  try {
    const r = await fetch(`https://discord.com/api/v10/guilds/${guildId}`, {
      headers: { authorization: `Bot ${env.DISCORD_TOKEN}` },
    });
    if (!r.ok) return G.fallbackName;
    return (await r.json()).name || G.fallbackName;
  } catch {
    return G.fallbackName;
  }
}

export async function guildsCommand(interaction, env) {
  const guildId = interaction.guild_id;
  const [types, name] = await Promise.all([store.publicTypesInGuild(env, guildId), serverName(env, guildId)]);

  const counts = { dreamers: 0, scholars: 0, guardians: 0, wanderers: 0 };
  for (const t of types) if (CLASSES[t]) counts[CLASSES[t].guild] += 1;
  const total = types.length;

  const body = total
    ? Object.entries(GUILDS)
        .map(([key, g]) => `${g.emoji} **${g.name}**: ${counts[key]}\n${scoring.bar((counts[key] / total) * 100)}`)
        .join('\n\n')
    : G.empty;

  return ui.message(
    [ui.container(ui.COLORS.auracle, [ui.text(G.title(name)), ui.separator(), ui.text(body), ui.separator(), ui.text(G.total(total))])],
    { ephemeral: false },
  );
}
