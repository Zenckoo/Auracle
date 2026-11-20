// /profile: shows a traveler card. Alone: your own card. With @member: their card, only if public.
// Facets are never shown here; only the hidden secret, if its owner chose to show it.

import { ui } from '../core/ui.js';
import { texts } from '../texts/en.js';
import { profileTexts as P } from '../texts/en-profile.js';
import { trialTexts as TT } from '../texts/en-trials.js';
import { CLASSES, GUILDS } from '../data/classes.js';
import * as store from '../core/store.js';
import * as scoring from '../core/scoring.js';
import { reportButton } from './report.js';
import { customizeTexts as CZ } from '../texts/en-customize.js';
import { titleName } from '../data/titles.js';
import { GUILD_DOTS } from '../data/colors.js';
import { vibeLine } from '../data/vibes.js';
import { showText } from '../core/text.js';
import { TASTE_FIELDS, LOOKING_FOR, lookingList } from '../data/tastes.js';
import { TIMEZONES, langList, langName, localTime, isBirthday, birthdayName } from '../data/practical.js';
import { IDENTITY_FIELDS, identityNames } from '../data/identity.js';
import { originNames } from '../data/origins.js';
import { badgeLine } from '../data/badges.js';
import { blessButton } from './blessings.js';
import { blessingTexts as BL } from '../texts/en-blessings.js';
import { bannerUrl, bannerGallery } from '../core/banners.js';
import { cardLayout } from '../data/layout.js';

const R = texts.results;

function note(text) {
  return ui.message([ui.container(ui.COLORS.auracle, [ui.text(text)])]);
}

function displayName(user, member) {
  return member?.nick || user.global_name || user.username;
}

// The 🗂️ About me part: the quote, the vibe, then who the traveler is, in small lines without emojis.
// identity: pronouns, gender, orientation and origins, only if the traveler chose to show them.
function aboutLines(profile, showIdentity, now = new Date()) {
  const lines = [];
  if (profile.about) lines.push(`❝ *${showText(profile.about)}* ❞`);
  const vibe = vibeLine(profile);
  if (vibe) lines.push(`-# ${vibe}`);

  const who = [];
  if (showIdentity) {
    for (const field of Object.keys(IDENTITY_FIELDS)) who.push(...identityNames(profile, field));
    who.push(...originNames(profile));
  }
  const langs = langList(profile);
  if (langs.length) who.push(langs.map(langName).join(', '));
  if (who.length) lines.push(`-# ${who.join(' · ')}`);

  const when = [];
  const time = localTime(profile, now);
  if (time) when.push(P.localTime(time, TIMEZONES[profile.timezone].name.split(',')[0]));
  if (isBirthday(profile, now)) when.push(P.birthdayToday);
  else if (birthdayName(profile)) when.push(P.birthday(birthdayName(profile)));
  if (when.length) lines.push(`-# ${when.join(' · ')}`);

  const social = [];
  const looking = lookingList(profile);
  if (looking.length) social.push(P.lookingFor(looking.map((k) => LOOKING_FOR[k].name.toLowerCase()).join(', ')));
  if (P.dms[profile.dms]) social.push(P.dms[profile.dms]);
  if (social.length) lines.push(`-# ${social.join(' · ')}`);
  return lines;
}

// The 🎮 Tastes part: a title, then "Games · ..." lines, and Ask me about in small.
function tasteBlock(profile) {
  const lines = TASTE_FIELDS.filter((f) => f.key !== 'ask_about' && profile[f.key]).map(
    (f) => `${P.tasteLabels[f.key]} · ${showText(profile[f.key])}`,
  );
  if (profile.ask_about) lines.push(P.askAbout(showText(profile.ask_about)));
  return lines.length ? [P.tastesTitle, ...lines] : [];
}

// reportable: someone else's card, so it gets a 🚩 Report button.
// extra.blessings: the blessings shown on the card. extra.newBlessings: how many wait (only told to the owner, privately).
function card(profile, user, name, isOwnPrivate, reportable = false, extra = {}) {
  const type = profile.type_code;
  const cls = CLASSES[type];
  const guild = GUILDS[cls.guild];
  const scores = profile.scores;
  const flame = scores.domains.N.percentile >= 50 ? R.restlessFlame : R.calmWaters;

  // A custom accent color replaces the guild color on the border, so a dot keeps the guild color visible.
  const hasAccent = profile.accent != null;
  const guildLabel = `${hasAccent ? `${GUILD_DOTS[cls.guild]} ` : ''}${guild.emoji} ${guild.name}`;

  // Header, next to the avatar: the fantasy title like a rank, the class, then the guild and the flame.
  const title = titleName(profile.title);
  const heading = `${title ? `-# ${CZ.cardLine(title)}\n` : ''}## ${cls.emoji} ${cls.name}`;
  const guildLine = `**${type}** · ${guildLabel}\n-# ${cls.subtitle} · ${flame}`;

  // 💬 About me: the quote, the vibe, and who the traveler is.
  const showIdentity = isOwnPrivate || profile.identity_public === 1;
  const aboutList = aboutLines(profile, showIdentity);
  const about = aboutList.length ? [ui.separator(), ui.text(aboutList.join('\n'))] : [];

  // 🎮 Tastes, only what the traveler filled in.
  const tasteList = tasteBlock(profile);
  const tastes = tasteList.length ? [ui.separator(), ui.text(tasteList.join('\n'))] : [];

  // 💌 Up to 3 blessings from other travelers, chosen by the card owner, one line each.
  const shown = extra.blessings ?? [];
  const blessings = shown.length
    ? [ui.separator(), ui.text([P.blessingsTitle, ...shown.map((b) => P.blessing(showText(b.text), b.author_id))].join('\n'))]
    : [];

  // 📊 Traits: bars without emojis, then the hidden secret if its owner shows it.
  const traitList = [
    P.traitsTitle,
    ...scoring.DOMAIN_ORDER.map((d) => `${scoring.bar(scores.domains[d].percentile)} ${R.traitNames[d]}`),
  ];
  if (profile.secret_public === 1) {
    const [s] = scoring.hiddenSecrets(scores, 1);
    traitList.push(P.secret(s.name, s.facetPct));
  }

  // Footer: the badges, then one line for the trial, the date and the reminder that it is an estimate.
  const trial = TT.badge(profile.version).replace('-# ', '');
  const footer = [badgeLine(profile), P.footer(trial, Math.floor(profile.completed_at / 1000))];
  if (isOwnPrivate) footer.push(P.privateNote);
  if (isOwnPrivate && extra.newBlessings) footer.push(BL.newOnCard(extra.newBlessings));

  // 🖼️ The banner, on top of the card.
  const banner = bannerUrl(profile);

  // 🗂️ The 4 movable parts, in the order the traveler chose (hidden ones are left out).
  const blocks = { about, tastes, blessings, traits: [ui.separator(), ui.text(traitList.join('\n'))] };
  const middle = cardLayout(profile).filter((p) => !p.hidden).flatMap((p) => blocks[p.key]);

  return [
    ui.container(hasAccent ? profile.accent : ui.COLORS[guild.colorKey], [
      ...(banner ? [bannerGallery(banner)] : []),
      ui.section([P.cardLabel(name), heading, guildLine], ui.avatarUrl(user)),
      ...middle,
      ui.separator(),
      ui.text(footer.filter(Boolean).join('\n')),
      ...(reportable ? [ui.row(blessButton(user.id), reportButton(user.id))] : []),
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
    const extra = {
      blessings: await store.shownBlessings(env, me.id),
      newBlessings: isPublic ? 0 : await store.newBlessingCount(env, me.id),
    };
    return ui.message(card(profile, me, displayName(me, interaction.member), !isPublic, false, extra), { ephemeral: !isPublic });
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

  const extra = { blessings: await store.shownBlessings(env, targetId) };
  return ui.message(card(profile, target, name, false, true, extra), { ephemeral: false });
}
