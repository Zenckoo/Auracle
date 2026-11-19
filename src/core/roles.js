// Guild roles: Auracle creates four roles on servers that turn them on, and gives each
// traveler with a public card the role of their guild. It never touches any other role.

import { ui } from './ui.js';
import { CLASSES, GUILDS } from '../data/classes.js';
import { MANAGE_ROLES } from '../config.js';
import * as store from './store.js';

const API = 'https://discord.com/api/v10';
const GUILD_KEYS = ['dreamers', 'scholars', 'guardians', 'wanderers'];
const ADMINISTRATOR = 0x8n;
const MANAGE_GUILD = 0x20n;
const REASON = 'Auracle guild roles';

// Cloudflare allows about 50 calls to Discord per click, so big servers are filled in little by little.
const BULK_LIMIT = 40;

function discord(env, method, path, body) {
  const headers = { authorization: `Bot ${env.DISCORD_TOKEN}`, 'X-Audit-Log-Reason': REASON };
  if (body) headers['content-type'] = 'application/json';
  return fetch(API + path, { method, headers, body: body ? JSON.stringify(body) : undefined });
}

function bits(value) {
  try {
    return BigInt(value ?? '0');
  } catch {
    return 0n;
  }
}

// Staff = people who can manage the server (or admins).
export function isStaff(interaction) {
  return (bits(interaction.member?.permissions) & (MANAGE_GUILD | ADMINISTRATOR)) !== 0n;
}

// Does Auracle itself have Manage Roles on this server?
export function botCanManageRoles(interaction) {
  return (bits(interaction.app_permissions) & (MANAGE_ROLES | ADMINISTRATOR)) !== 0n;
}

function roleIds(settings) {
  const ids = {};
  for (const key of GUILD_KEYS) ids[key] = settings?.[`role_${key}`] ?? null;
  return ids;
}

// The role a traveler should wear on a server (or null).
function wantedRole(settings, profile) {
  if (!settings?.roles_enabled || !profile) return null;
  if (profile.is_public !== 1 || profile.wear_role === 0) return null;
  const guild = CLASSES[profile.type_code]?.guild;
  return guild ? settings[`role_${guild}`] : null;
}

// Creates the four roles (or reuses the ones Auracle already made), then saves their ids.
// Returns { ok: true } or { ok: false, reason: 'permission' | 'error' }.
export async function enableRoles(env, guildId) {
  const settings = await store.getServerSettings(env, guildId);
  const list = await discord(env, 'GET', `/guilds/${guildId}/roles`);
  if (!list.ok) return { ok: false, reason: list.status === 403 ? 'permission' : 'error' };
  const existing = new Set((await list.json()).map((r) => r.id));

  const ids = roleIds(settings);
  for (const key of GUILD_KEYS) {
    if (ids[key] && existing.has(ids[key])) continue; // Keep it, even if the server renamed or recolored it.
    const g = GUILDS[key];
    const res = await discord(env, 'POST', `/guilds/${guildId}/roles`, {
      name: `${g.emoji} ${g.name}`,
      color: ui.COLORS[g.colorKey],
      hoist: false,
      mentionable: false,
      permissions: '0',
    });
    if (!res.ok) {
      await store.saveServerRoles(env, guildId, false, ids); // Remember the roles already made.
      return { ok: false, reason: res.status === 403 ? 'permission' : 'error' };
    }
    ids[key] = (await res.json()).id;
  }

  await store.saveServerRoles(env, guildId, true, ids);
  return { ok: true };
}

// Gives their role to the travelers Auracle already knows on this server (runs after the answer).
export async function fillServer(env, guildId) {
  const settings = await store.getServerSettings(env, guildId);
  if (!settings?.roles_enabled) return;
  const wearers = await store.roleWearersInGuild(env, guildId, BULK_LIMIT);
  for (const w of wearers) {
    const role = wantedRole(settings, { ...w, is_public: 1, wear_role: 1 });
    if (role) await discord(env, 'PUT', `/guilds/${guildId}/members/${w.user_id}/roles/${role}`).catch(() => {});
  }
}

// Deletes the four roles Auracle made on this server.
export async function disableRoles(env, guildId) {
  const settings = await store.getServerSettings(env, guildId);
  for (const id of Object.values(roleIds(settings))) {
    if (id) await discord(env, 'DELETE', `/guilds/${guildId}/roles/${id}`).catch(() => {});
  }
  await store.saveServerRoles(env, guildId, false, {});
}

// Puts the right guild role on one traveler, on one server. Removes the other guild roles.
// currentRoles: the member's role ids if already known (saves one call to Discord).
export async function syncMember(env, guildId, userId, { currentRoles, settings, profile } = {}) {
  const s = settings ?? (await store.getServerSettings(env, guildId));
  if (!s?.roles_enabled) return;
  const p = profile !== undefined ? profile : await store.getProfile(env, userId);
  const want = wantedRole(s, p);

  let roles = currentRoles;
  if (!roles) {
    const res = await discord(env, 'GET', `/guilds/${guildId}/members/${userId}`);
    if (!res.ok) return; // Not on this server anymore.
    roles = (await res.json()).roles ?? [];
  }

  for (const id of Object.values(roleIds(s))) {
    if (!id) continue;
    if (id === want && !roles.includes(id)) {
      await discord(env, 'PUT', `/guilds/${guildId}/members/${userId}/roles/${id}`);
    } else if (id !== want && roles.includes(id)) {
      await discord(env, 'DELETE', `/guilds/${guildId}/members/${userId}/roles/${id}`);
    }
  }
}

// After a change (privacy, new trial, /forget...): updates the traveler's role on every server
// with guild roles. servers: pass them when the list will be erased just after (for /forget).
export async function syncEverywhere(env, userId, { servers, profile } = {}) {
  const list = servers ?? (await store.roleServersOfUser(env, userId));
  if (!list.length) return;
  const p = profile !== undefined ? profile : await store.getProfile(env, userId);
  for (const s of list) {
    await syncMember(env, s.guild_id, userId, { settings: s, profile: p }).catch(() => {});
  }
}
