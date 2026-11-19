// 🚩 Report: a button on every traveler's card (not on your own).
// The traveler picks a reason, can add details, and the report goes to the HQ moderation channel.
// Anti-spam: 5 reports every 24 hours, and one report per card every 24 hours.

import { ui } from '../core/ui.js';
import { config } from '../config.js';
import { reportTexts as RP } from '../texts/en-report.js';
import { CLASSES } from '../data/classes.js';
import * as store from '../core/store.js';
import { vibeLine } from '../data/vibes.js';
import { showText } from '../core/text.js';
import { moderationRow } from './moderation.js';

const REPORT_LIMIT = 5;
const API = 'https://discord.com/api/v10';

function userOf(interaction) {
  return interaction.member?.user ?? interaction.user;
}

function box(text, extra = []) {
  return [ui.container(ui.COLORS.wanderers, [ui.text(text), ...extra])];
}

// The button placed on a traveler's card.
export function reportButton(targetId) {
  return ui.button({ id: `rp:open:${targetId}`, label: RP.button, emoji: '🚩', style: ui.ButtonStyle.SECONDARY });
}

// Returns a text to show if this report cannot be sent, or null if it can.
async function refusal(env, userId, targetId) {
  if (userId === targetId) return RP.self;
  const profile = await store.getProfile(env, targetId);
  if (!profile || profile.is_public !== 1) return RP.gone;
  if (await store.reportedRecently(env, userId, targetId)) return RP.already;
  if ((await store.reportCount(env, userId)) >= REPORT_LIMIT) return RP.limit;
  return null;
}

function reasonSelect(targetId) {
  return {
    type: 1,
    components: [
      {
        type: 3,
        custom_id: `rp:why:${targetId}`,
        placeholder: RP.placeholder,
        min_values: 1,
        max_values: 1,
        options: Object.entries(RP.reasons).map(([value, r]) => ({ label: r.label, value, emoji: { name: r.emoji } })),
      },
    ],
  };
}

function detailsForm(targetId, reason) {
  const isOther = reason === 'other';
  return {
    type: 9,
    data: {
      custom_id: `rp:send:${targetId}:${reason}`,
      title: RP.form.title,
      components: [
        {
          type: 1,
          components: [
            {
              type: 4,
              custom_id: 'text',
              style: 2,
              label: isOther ? RP.form.labelOther : RP.form.label,
              placeholder: RP.form.placeholder,
              min_length: isOther ? 5 : 0,
              max_length: 500,
              required: isOther,
            },
          ],
        },
      ],
    },
  };
}

// Buttons and menus: rp:open:<id> (the card button), rp:why:<id> (the reason menu).
export async function reportComponent(interaction, env) {
  const [, action, targetId] = interaction.data.custom_id.split(':');
  const userId = userOf(interaction).id;
  const blocked = await refusal(env, userId, targetId);

  if (action === 'open') {
    // A new private message, so the public card stays as it is.
    if (blocked) return ui.message(box(blocked));
    return ui.message(box(RP.choose, [reasonSelect(targetId)]));
  }

  if (action === 'why') {
    if (blocked) return ui.update(box(blocked));
    const reason = interaction.data.values?.[0];
    return detailsForm(targetId, reason in RP.reasons ? reason : 'other');
  }

  return ui.update(box(RP.failed));
}

function findValue(components) {
  for (const c of components ?? []) {
    if (c.custom_id === 'text' && typeof c.value === 'string') return c.value;
    const inner = findValue(c.components ?? (c.component ? [c.component] : []));
    if (inner) return inner;
  }
  return null;
}

async function nameOf(env, userId) {
  try {
    const res = await fetch(`${API}/users/${userId}`, { headers: { authorization: `Bot ${env.DISCORD_TOKEN}` } });
    if (!res.ok) return 'unknown';
    const u = await res.json();
    return u.global_name || u.username || 'unknown';
  } catch {
    return 'unknown';
  }
}

// What the reported card shows right now, so Zenckoo sees it even if it changes later.
function snapshot(profile) {
  const lines = [];
  const vibe = vibeLine(profile);
  if (vibe) lines.push(RP.snapshot('🌙 Vibe', vibe));
  if (profile.about) lines.push(RP.snapshot('💬 About me', showText(profile.about)));
  return `${RP.snapshotTitle}\n${lines.length ? lines.join('\n') : RP.nothingFilled}`;
}

// The form: rp:send:<id>:<reason>. Posts the report in the moderation channel.
export async function reportModal(interaction, env) {
  const [, , targetId, reasonKey] = interaction.data.custom_id.split(':');
  const user = userOf(interaction);
  const blocked = await refusal(env, user.id, targetId);
  if (blocked) return ui.update(box(blocked));

  const reason = RP.reasons[reasonKey] ?? RP.reasons.other;
  const details = (findValue(interaction.data.components) ?? '').trim();
  const profile = await store.getProfile(env, targetId);
  const cls = CLASSES[profile.type_code];

  const response = await fetch(`${API}/channels/${config.reportChannelId}/messages`, {
    method: 'POST',
    headers: { 'content-type': 'application/json', authorization: `Bot ${env.DISCORD_TOKEN}` },
    body: JSON.stringify({
      flags: ui.FLAGS.COMPONENTS_V2,
      allowed_mentions: { parse: [] },
      components: [
        ui.container(ui.COLORS.wanderers, [
          ui.text(RP.heading(reason.emoji, reason.label)),
          ui.text(RP.reported(targetId, await nameOf(env, targetId))),
          ui.text(RP.card(`${cls.emoji} ${cls.name}`, profile.type_code)),
          ui.separator(),
          ui.text(snapshot(profile)),
          ui.separator(),
          ui.text(details || RP.noDetails),
          ui.separator(),
          ui.text(RP.from(user.id, user.global_name || user.username, interaction.guild_id)),
          moderationRow(targetId),
        ]),
      ],
    }),
  });

  if (response.ok) await store.logReport(env, user.id, targetId);
  return ui.update(box(response.ok ? RP.thanks : RP.failed));
}
