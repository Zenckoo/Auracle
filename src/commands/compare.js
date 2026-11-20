// 🤝 Compare (the menu in /auracle): two public cards face to face, with a fun compatibility score.

import { ui } from '../core/ui.js';
import { texts } from '../texts/main.js';
import { profileTexts } from '../texts/profile.js';
import { compareTexts as C } from '../texts/social.js';
import { CLASSES, GUILDS } from '../data/classes.js';
import * as store from '../core/store.js';
import * as scoring from '../core/scoring.js';
import { earn, announce } from '../core/badges.js';
import { KINDRED_GOAL } from '../data/badges.js';

const R = texts.results;
const GUILD_ORDER = ['dreamers', 'scholars', 'guardians', 'wanderers'];

function note(text) {
  return ui.message([ui.container(ui.COLORS.auracle, [ui.text(text)])]);
}

function displayName(user, member) {
  return member?.nick || user.global_name || user.username;
}

function duoPhrase(g1, g2) {
  const [a, b] = [g1, g2].sort((x, y) => GUILD_ORDER.indexOf(x) - GUILD_ORDER.indexOf(y));
  return C.duos[`${a}+${b}`];
}

function classBlock(profile, user, name) {
  const cls = CLASSES[profile.type_code];
  const guild = GUILDS[cls.guild];
  return ui.container(ui.COLORS[guild.colorKey], [
    ui.section(
      [`-# ${name}`, `### ${cls.emoji} ${cls.name}\n${cls.subtitle}`, `**${profile.type_code}** · ${guild.emoji} ${guild.name}`],
      ui.avatarUrl(user),
    ),
  ]);
}

export async function compareCommand(interaction, env) {
  const me = interaction.member?.user ?? interaction.user;
  const targetId = interaction.data.options?.find((o) => o.name === 'member')?.value;
  if (!targetId) return note(C.notAligned);
  if (targetId === me.id) return note(C.self);

  const target = interaction.data.resolved?.users?.[targetId];
  if (target?.bot) return note(profileTexts.bot);

  const [mine, theirs] = await Promise.all([store.getProfile(env, me.id), store.getProfile(env, targetId)]);
  if (!mine) return note(profileTexts.notAwakenedSelf);
  if (!theirs || mine.is_public !== 1 || theirs.is_public !== 1 || !target) return note(C.notAligned);

  // Compatibility: 100 minus the average gap between the five trait percentiles.
  const gaps = scoring.DOMAIN_ORDER.map((d) => ({
    d,
    gap: Math.abs(mine.scores.domains[d].percentile - theirs.scores.domains[d].percentile),
  }));
  const pct = Math.max(0, Math.min(100, Math.round(100 - gaps.reduce((s, g) => s + g.gap, 0) / gaps.length)));
  const label = (list) => (list.length ? list.map((g) => `${R.traitEmojis[g.d]} ${R.traitNames[g.d]}`).join(', ') : C.none);
  const alike = gaps.filter((g) => g.gap <= 15);
  const opposite = gaps.filter((g) => g.gap >= 40);

  const g1 = CLASSES[mine.type_code].guild;
  const g2 = CLASSES[theirs.type_code].guild;

  // 🏅 Kindred Spirits after 5 comparisons (only the number is kept, never with whom).
  const count = await store.countCompare(env, me.id);
  const fresh = count >= KINDRED_GOAL ? await earn(env, me.id, 'kindred') : [];

  const answer = ui.message(
    [
      ui.container(ui.COLORS.auracle, [ui.text(`${C.title}\n${C.score(pct)}\n${scoring.bar(pct)}\n*${duoPhrase(g1, g2)}*`)]),
      classBlock(mine, me, displayName(me, interaction.member)),
      classBlock(theirs, target, displayName(target, interaction.data.resolved?.members?.[targetId])),
      ui.container(ui.COLORS.auracle, [ui.text(`${C.alike} ${label(alike)}\n${C.opposite} ${label(opposite)}\n${C.footer}`)]),
    ],
    { ephemeral: false },
  );
  return announce(answer, fresh, displayName(me, interaction.member));
}
