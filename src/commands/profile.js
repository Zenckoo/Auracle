// /profile: shows a traveler card. Alone: your own card. With @member: their card, only if public.
// Facets are never shown here; only the hidden secret, if its owner chose to show it.

import { ui } from '../core/ui.js';
import { texts } from '../texts/en.js';
import { profileTexts as P } from '../texts/en-profile.js';
import { secretTexts as SX } from '../texts/en-secrets.js';
import { trialTexts as TT } from '../texts/en-trials.js';
import { CLASSES, GUILDS } from '../data/classes.js';
import * as store from '../core/store.js';
import * as scoring from '../core/scoring.js';
import { reportButton } from './report.js';
import { customizeTexts as CZ } from '../texts/en-customize.js';
import { titleName } from '../data/titles.js';

const R = texts.results;

function note(text) {
  return ui.message([ui.container(ui.COLORS.auracle, [ui.text(text)])]);
}

function displayName(user, member) {
  return member?.nick || user.global_name || user.username;
}

// reportable: someone else's card, so it gets a 🚩 Report button.
function card(profile, user, name, isOwnPrivate, reportable = false) {
  const type = profile.type_code;
  const cls = CLASSES[type];
  const guild = GUILDS[cls.guild];
  const scores = profile.scores;
  const flame = scores.domains.N.percentile >= 50 ? R.restlessFlame : R.calmWaters;

  let traits = scoring.DOMAIN_ORDER.map(
    (d) => `${R.traitEmojis[d]} ${scoring.bar(scores.domains[d].percentile)} ${R.traitNames[d]}`,
  ).join('\n');

  if (profile.secret_public === 1) {
    const [s] = scoring.hiddenSecrets(scores, 1);
    traits += `\n\n${SX.cardLine(s.name, s.facetPct)}`;
  }

  const title = titleName(profile.title);
  const heading = `## ${cls.emoji} ${cls.name}\n${cls.subtitle}${title ? `\n${CZ.cardLine(title)}` : ''}`;

  const footer = [`${TT.badge(profile.version)} · ${P.awakened(Math.floor(profile.completed_at / 1000)).replace('-# ', '')}`, R.estimate];
  if (isOwnPrivate) footer.push(P.privateNote);

  return [
    ui.container(ui.COLORS[guild.colorKey], [
      ui.section(
        [P.cardLabel(name), heading, `**${type}** · ${guild.emoji} ${guild.name} · ${flame}`],
        ui.avatarUrl(user),
      ),
      ui.separator(),
      ui.text(traits),
      ui.separator(),
      ui.text(footer.join('\n')),
      ...(reportable ? [ui.row(reportButton(user.id))] : []),
    ]),
  ];
}

export async function profileCommand(interaction, env) {
  const me = interaction.member?.user ?? interaction.user;
  const targetId = interaction.data.options?.find((o) => o.name === 'member')?.value;

  // Own card
  if (!targetId || targetId === me.id) {
    const profile = await store.getProfile(env, me.id);
    if (!profile) return note(P.notAwakenedSelf);
    const isPublic = profile.is_public === 1;
    return ui.message(card(profile, me, displayName(me, interaction.member), !isPublic), { ephemeral: !isPublic });
  }

  // Someone else's card
  const target = interaction.data.resolved?.users?.[targetId];
  const targetMember = interaction.data.resolved?.members?.[targetId];
  if (!target) return note(P.notAwakenedOther('This traveler'));
  const name = displayName(target, targetMember);

  if (target.bot) return note(P.bot);

  const profile = await store.getProfile(env, targetId);
  if (!profile) return note(P.notAwakenedOther(name));
  if (profile.is_public !== 1) return note(P.privateOther(name));

  return ui.message(card(profile, target, name, false, true), { ephemeral: false });
}
