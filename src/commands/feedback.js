// 📬 Feedback (a button in /auracle): two buttons, a small form, and the message goes to the HQ channel.

import { ui } from '../core/ui.js';
import { config } from '../config.js';
import { feedbackTexts as F, banTexts } from '../texts/en-feedback.js';
import * as store from '../core/store.js';
import { earn, announce } from '../core/badges.js';

// Anti-spam: 5 messages every 24 hours. Trying to send more blocks Auracle for 30 days.
const FEEDBACK_LIMIT = 5;
const BAN_DAYS = 30;

const KINDS = { bug: F.bug, idea: F.idea };

function userOf(interaction) {
  return interaction.member?.user ?? interaction.user;
}

function box(text, extra = []) {
  return [ui.container(ui.COLORS.auracle, [ui.text(text), ...extra])];
}

export function feedbackCommand() {
  return ui.message(
    box(F.question, [
      ui.separator(),
      ui.row(
        ui.button({ id: 'fb:bug', label: F.bugButton, emoji: '🐞', style: ui.ButtonStyle.SECONDARY }),
        ui.button({ id: 'fb:idea', label: F.ideaButton, emoji: '💡' }),
      ),
      ui.text(F.limitNote),
    ]),
  );
}

// Over the limit? Then Auracle is blocked for this traveler. Returns the block, or null.
async function overLimit(env, userId) {
  if ((await store.feedbackCount(env, userId)) < FEEDBACK_LIMIT) return null;
  await store.banUser(env, userId, banTexts.spamReason, BAN_DAYS);
  return store.getBan(env, userId);
}

// Button clicked: open the small form (a Discord "modal").
export async function feedbackComponent(interaction, env) {
  const blocked = await overLimit(env, userOf(interaction).id);
  if (blocked) return ui.update(box(banTexts.blocked(blocked.until)));
  const kind = interaction.data.custom_id.split(':')[1];
  const t = KINDS[kind] ?? F.idea;
  return {
    type: 9,
    data: {
      custom_id: `fb:${kind in KINDS ? kind : 'idea'}`,
      title: t.title,
      components: [
        {
          type: 1,
          components: [
            {
              type: 4,
              custom_id: 'text',
              style: 2,
              label: t.label,
              placeholder: t.placeholder,
              min_length: 5,
              max_length: 1500,
              required: true,
            },
          ],
        },
      ],
    },
  };
}

function findValue(components) {
  for (const c of components ?? []) {
    if (c.custom_id === 'text' && typeof c.value === 'string') return c.value;
    const inner = findValue(c.components ?? (c.component ? [c.component] : []));
    if (inner) return inner;
  }
  return null;
}

// Form sent: post it in the HQ channel, then thank the traveler.
export async function feedbackModal(interaction, env) {
  const kind = interaction.data.custom_id.split(':')[1];
  const t = KINDS[kind] ?? F.idea;
  const user = userOf(interaction);
  const name = user.global_name || user.username;
  const text = (findValue(interaction.data.components) ?? '').trim();

  const blocked = await overLimit(env, user.id);
  if (blocked) return ui.update(box(banTexts.blocked(blocked.until)));

  const response = await fetch(`https://discord.com/api/v10/channels/${config.feedbackChannelId}/messages`, {
    method: 'POST',
    headers: { 'content-type': 'application/json', authorization: `Bot ${env.DISCORD_TOKEN}` },
    body: JSON.stringify({
      flags: ui.FLAGS.COMPONENTS_V2,
      allowed_mentions: { parse: [] },
      components: [
        ui.container(kind === 'bug' ? ui.COLORS.wanderers : ui.COLORS.auracle, [
          ui.text(t.heading),
          ui.text(text || '-'),
          ui.separator(),
          ui.text(F.from(user.id, name)),
        ]),
      ],
    }),
  });

  if (!response.ok) return ui.update(box(F.failed));
  await store.logFeedback(env, user.id);
  // 🏅 Messenger for the first Feedback.
  return announce(ui.update(box(F.thanks)), await earn(env, user.id, 'messenger'));
}
