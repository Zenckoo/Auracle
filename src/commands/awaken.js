// /awaken: the trial, from the welcome screen to the results.
// Every answer is saved at once, so closing the message never loses anything.

import { ui } from '../core/ui.js';
import { siteLinks } from '../core/links.js';
import { texts } from '../texts/en.js';
import { secretTexts as SX } from '../texts/en-secrets.js';
import { trialTexts as TT } from '../texts/en-trials.js';
import { FACETS } from '../data/ipip120.js';
import { trialItems } from '../data/trials.js';
import { CLASSES, GUILDS, article } from '../data/classes.js';
import * as store from '../core/store.js';
import * as scoring from '../core/scoring.js';
import { earn, announce } from '../core/badges.js';
import { BETA } from '../data/badges.js';

const T = texts.awaken;
const R = texts.results;
const BLUE = ui.COLORS.auracle;
const ANSWER_EMOJIS = ['❌', '➖', '⚖️', '✔️', '✅'];
// Result pages after "See facets": the Hidden secrets page first, then one page per trait.
const PAGES = ['S', ...scoring.DOMAIN_ORDER];

function userOf(interaction) {
  return interaction.member?.user ?? interaction.user;
}

function box(parts, color = BLUE) {
  return [ui.container(color, parts)];
}

function totalOf(trial) {
  return trialItems(trial.version).length;
}

function progressBar(index, total) {
  const filled = Math.round((index / total) * 10);
  return '▰'.repeat(filled) + '▱'.repeat(10 - filled) + ` ${Math.round((index / total) * 100)}%`;
}

// Messages at 25%, 50% and 75% of the trial, whatever its length.
function milestone(index, total) {
  const marks = [0.25, 0.5, 0.75].map((f) => Math.round(total * f));
  const position = marks.indexOf(index);
  return position >= 0 ? T.question.milestones[[30, 60, 90][position]] : null;
}

function trialName(version) {
  return `${TT.emojis[version] ?? TT.emojis.standard} **${TT.names[version] ?? TT.names.standard}**`;
}

function guildColor(typeCode) {
  return ui.COLORS[GUILDS[CLASSES[typeCode].guild].colorKey];
}

function pageName(page) {
  return page === 'S' ? SX.pageLabel : R.traitNames[page];
}

// ---------- Trial screens ----------

function welcomeScreen() {
  return box([
    ui.text(T.welcome.title),
    ui.separator(),
    ui.text(T.welcome.body),
    ui.separator(),
    ui.row(ui.button({ id: 'aw:preamble', label: T.welcome.button, emoji: '🚪' })),
  ]);
}

function preambleScreen() {
  return box([
    ui.text(T.preamble.title),
    ui.text(T.preamble.body),
    ui.separator(),
    ui.row(ui.button({ id: 'aw:disclaimer', label: T.preamble.button, emoji: '➡️' })),
  ]);
}

function disclaimerScreen() {
  return box([
    ui.text(T.disclaimer.title),
    ui.text(T.disclaimer.body),
    ui.separator(),
    ui.text(T.disclaimer.agree),
    siteLinks('terms', 'privacy'),
    ui.row(ui.button({ id: 'aw:choose', label: T.disclaimer.button, emoji: '✅' })),
  ]);
}

function chooseScreen() {
  return box([
    ui.text(TT.choose.title),
    ui.separator(),
    ui.text(TT.choose.standard),
    ui.text(TT.choose.grand),
    ui.text(TT.choose.note),
    ui.separator(),
    ui.row(
      ui.button({ id: 'aw:start:standard', label: TT.names.standard, emoji: TT.emojis.standard }),
      ui.button({ id: 'aw:start:grand', label: TT.names.grand, emoji: TT.emojis.grand, style: ui.ButtonStyle.SECONDARY }),
    ),
  ]);
}

function questionScreen(trial) {
  const index = trial.current_index;
  const total = totalOf(trial);
  const [statement] = trialItems(trial.version)[index];
  const mark = milestone(index, total);

  let header = `${trialName(trial.version)} · ${index + 1} / ${total}\n${progressBar(index, total)}`;
  if (mark) header += `\n${mark}`;

  const answers = T.question.answers.map((label, i) =>
    ui.button({ id: `aw:ans:${index}:${i + 1}`, label, emoji: ANSWER_EMOJIS[i] }),
  );

  return box([
    ui.text(header),
    ui.separator(),
    ui.text(`### "${statement}."\n${T.question.prompt}`),
    ui.separator(),
    ui.row(...answers),
    ui.row(
      ui.button({ id: 'aw:back', label: T.question.back, emoji: '◀️', style: ui.ButtonStyle.SECONDARY, disabled: index === 0 }),
      ui.button({ id: 'aw:pause', label: T.question.pause, emoji: '⏸️', style: ui.ButtonStyle.SECONDARY }),
    ),
  ]);
}

function resumeScreen(trial) {
  const total = totalOf(trial);
  const position = Math.min(trial.current_index + 1, total);
  return box([
    ui.text(`${T.resume.text(position, total)}\n-# ${TT.names[trial.version] ?? TT.names.standard}`),
    ui.separator(),
    ui.row(
      ui.button({ id: 'aw:resume', label: T.resume.resume, emoji: '▶️' }),
      ui.button({ id: 'aw:restart', label: T.resume.restart, emoji: '🔄', style: ui.ButtonStyle.SECONDARY }),
    ),
  ]);
}

function endScreen(trial) {
  const total = totalOf(trial);
  return box([
    ui.text(`${trialName(trial.version)} · ${total} / ${total}\n${progressBar(total, total)}`),
    ui.separator(),
    ui.text(T.end.text),
    ui.separator(),
    ui.row(ui.button({ id: 'aw:reveal', label: T.end.button, emoji: '✨' })),
  ]);
}

function completeScreen() {
  return box([
    ui.text(T.complete.text),
    ui.separator(),
    ui.row(
      ui.button({ id: 'aw:results', label: T.complete.results, emoji: '📜' }),
      ui.button({ id: 'aw:newtrial', label: T.complete.newTrial, emoji: '🔄', style: ui.ButtonStyle.SECONDARY }),
    ),
  ]);
}

function warningScreen() {
  return box([
    ui.text(T.warning.text),
    ui.separator(),
    ui.row(
      ui.button({ id: 'aw:anew', label: T.warning.anew, emoji: '🔄', style: ui.ButtonStyle.DANGER }),
      ui.button({ id: 'aw:keep', label: T.warning.keep, emoji: '🛡️', style: ui.ButtonStyle.SECONDARY }),
    ),
  ]);
}

function simpleScreen(text, color = BLUE) {
  return box([ui.text(text)], color);
}

// ---------- Result screens ----------

function revealScreen(profile, user) {
  const type = profile.type_code;
  const cls = CLASSES[type];
  const guild = GUILDS[cls.guild];
  const scores = profile.scores;
  const flame = scores.domains.N.percentile >= 50 ? R.restlessFlame : R.calmWaters;

  const parts = [
    ui.text(R.revealIntro),
    ui.separator(),
    ui.section(
      [
        `-# Behold, ${article(cls.name)}`,
        `## ${cls.emoji} ${cls.name}\n${cls.subtitle}`,
        `**${type}** · ${guild.emoji} ${guild.name} · ${flame}`,
      ],
      ui.avatarUrl(user),
    ),
  ];

  const close = scoring.closeLetters(scores, type);
  if (close.length) {
    parts.push(ui.text(close.map((c) => R.closeLetter(c.pair, c.alternate)).join('\n')));
  }

  parts.push(ui.separator(), ui.text(cls.description));

  if (scoring.needsGentleWord(scores)) {
    parts.push(ui.separator(), ui.text(R.gentleWord), ui.row(ui.linkButton({ url: 'https://findahelpline.com', label: R.helpButton, emoji: '🌙' })));
  }

  parts.push(
    ui.separator(),
    ui.text(R.estimate),
    ui.row(
      ui.button({ id: 'aw:traits', label: R.seeTraits, emoji: '📊' }),
      ui.button({ id: 'aw:facets:S', label: R.seeFacets, emoji: '🔍', style: ui.ButtonStyle.SECONDARY }),
    ),
  );

  return box(parts, guildColor(type));
}

function traitsScreen(profile) {
  const scores = profile.scores;
  const parts = [ui.text(R.traitsTitle)];

  for (const d of scoring.DOMAIN_ORDER) {
    const pct = scores.domains[d].percentile;
    const level = scoring.traitLevel(pct);
    parts.push(
      ui.separator(),
      ui.text(`**${R.traitEmojis[d]} ${R.traitNames[d]}**\n${scoring.bar(pct)}\n-# ${R.higherThan(pct)}\n${R.traitPhrases[d][level]}`),
    );
  }

  parts.push(
    ui.separator(),
    ui.row(
      ui.button({ id: 'aw:results', label: R.backToClass, emoji: '◀️', style: ui.ButtonStyle.SECONDARY }),
      ui.button({ id: 'aw:facets:S', label: R.seeFacets, emoji: '🔍' }),
    ),
  );

  return box(parts, guildColor(profile.type_code));
}

function pageNav(page) {
  const position = PAGES.indexOf(page);
  const prev = PAGES[(position + PAGES.length - 1) % PAGES.length];
  const next = PAGES[(position + 1) % PAGES.length];
  return ui.row(
    ui.button({ id: `aw:facets:${prev}`, label: pageName(prev), emoji: '◀️', style: ui.ButtonStyle.SECONDARY }),
    ui.button({ id: `aw:facets:${next}`, label: pageName(next), emoji: '▶️', style: ui.ButtonStyle.SECONDARY }),
    ui.button({ id: 'aw:traits', label: R.backToTraits, emoji: '📊' }),
  );
}

function secretsScreen(profile) {
  const secrets = scoring.hiddenSecrets(profile.scores, 3);
  const lines = secrets.map((s) =>
    `${SX.line(R.traitEmojis[s.domain], s.name, s.facetPct, R.traitNames[s.domain], s.traitPct)}\n${scoring.bar(s.facetPct)}`,
  );
  return box(
    [
      ui.text(`-# ${R.facetsLabel} · 1 / ${PAGES.length}\n${SX.title}\n${SX.intro}`),
      ui.separator(),
      ui.text(lines.join('\n\n')),
      ui.separator(),
      pageNav('S'),
    ],
    guildColor(profile.type_code),
  );
}

function facetsScreen(profile, domain) {
  if (domain === 'S') return secretsScreen(profile);
  const position = PAGES.indexOf(domain);
  const scores = profile.scores;
  const pct = scores.domains[domain].percentile;

  const lines = scores.facets[domain].map(
    (f, i) => `**${FACETS[domain][i]}**\n${scoring.bar(f.percentile)}\n-# ${R.higherThan(f.percentile)}`,
  );

  return box(
    [
      ui.text(`-# ${R.facetsLabel} · ${position + 1} / ${PAGES.length}\n### ${R.traitEmojis[domain]} ${R.traitNames[domain]}\n-# ${R.higherThan(pct)}`),
      ui.separator(),
      ui.text(lines.join('\n\n')),
      ui.separator(),
      pageNav(domain),
    ],
    guildColor(profile.type_code),
  );
}

function privacyChoiceScreen(typeCode) {
  return box(
    [
      ui.text(R.privacy.question),
      ui.separator(),
      ui.row(
        ui.button({ id: 'aw:pub', label: R.privacy.public, emoji: '🌍' }),
        ui.button({ id: 'aw:priv', label: R.privacy.private, emoji: '🔒', style: ui.ButtonStyle.SECONDARY }),
      ),
      ui.text(R.privacy.changeLater),
    ],
    guildColor(typeCode),
  );
}

// After the card choice: the hidden secret, and Show it / Keep it hidden.
function secretChoiceScreen(profile, cardText) {
  const [s] = scoring.hiddenSecrets(profile.scores, 1);
  return box(
    [
      ui.text(cardText),
      ui.separator(),
      ui.text(SX.question(s.name, s.facetPct, R.traitNames[s.domain], s.traitPct)),
      ui.row(
        ui.button({ id: 'aw:sec:show', label: SX.show, emoji: '🗝️' }),
        ui.button({ id: 'aw:sec:hide', label: SX.hide, emoji: '🤫', style: ui.ButtonStyle.SECONDARY }),
      ),
    ],
    guildColor(profile.type_code),
  );
}

// ---------- /awaken ----------

export async function awakenCommand(interaction, env) {
  const userId = userOf(interaction).id;

  const trial = await store.getTrial(env, userId);
  if (trial) {
    if (trial.current_index >= totalOf(trial)) return ui.message(endScreen(trial));
    return ui.message(resumeScreen(trial));
  }

  const profile = await store.getProfile(env, userId);
  if (profile) return ui.message(completeScreen());

  return ui.message(welcomeScreen());
}

// ---------- Buttons ----------

export async function awakenComponent(interaction, env, later) {
  const user = userOf(interaction);
  const userId = user.id;
  const [, action, ...args] = interaction.data.custom_id.split(':');

  switch (action) {
    case 'preamble':
      return ui.update(preambleScreen());

    case 'disclaimer':
      return ui.update(disclaimerScreen());

    case 'choose':
      return ui.update(chooseScreen());

    case 'start': {
      const version = args[0] === 'grand' ? 'grand' : 'standard';
      const trial = await store.startTrial(env, userId, version);
      return ui.update(questionScreen(trial));
    }

    case 'restart': {
      const old = await store.getTrial(env, userId);
      const trial = await store.startTrial(env, userId, old?.version === 'grand' ? 'grand' : 'standard');
      return ui.update(questionScreen(trial));
    }

    case 'ans': {
      const index = Number(args[0]);
      const value = Number(args[1]);
      const trial = await store.getTrial(env, userId);
      if (!trial) return ui.update(simpleScreen(T.lost));
      if (trial.current_index >= totalOf(trial)) return ui.update(endScreen(trial));

      // A late or double click on an old question: just show the current one again.
      if (index !== trial.current_index || value < 1 || value > 5) {
        return ui.update(questionScreen(trial));
      }

      trial.answers[index] = value;
      trial.current_index = index + 1;
      await store.saveTrial(env, trial);

      if (trial.current_index >= totalOf(trial)) return ui.update(endScreen(trial));
      return ui.update(questionScreen(trial));
    }

    case 'back': {
      const trial = await store.getTrial(env, userId);
      if (!trial) return ui.update(simpleScreen(T.lost));
      if (trial.current_index > 0) {
        trial.current_index -= 1;
        await store.saveTrial(env, trial);
      }
      return ui.update(questionScreen(trial));
    }

    case 'pause':
      return ui.update(simpleScreen(T.pause));

    case 'resume': {
      const trial = await store.getTrial(env, userId);
      if (!trial) return ui.update(simpleScreen(T.lost));
      if (trial.current_index >= totalOf(trial)) return ui.update(endScreen(trial));
      return ui.update(questionScreen(trial));
    }

    case 'reveal': {
      const trial = await store.getTrial(env, userId);

      // Already revealed (double click): show the saved result.
      if (!trial || trial.current_index < totalOf(trial)) {
        const profile = await store.getProfile(env, userId);
        if (profile) return ui.update(revealScreen(profile, user));
        return ui.update(simpleScreen(T.lost));
      }

      const scores = scoring.computeScores(trial.answers, trial.version);
      const typeCode = scoring.computeType(scores);
      await store.completeTrial(env, trial, scores, typeCode);

      // Just after the reveal, a second small message asks Public or Private.
      later(ui.followUp(interaction, privacyChoiceScreen(typeCode)));

      // 🏅 Badges: 🌱 Early Traveler during the public beta, 📚 Grand Trial for the 300 questions.
      const fresh = await earn(env, userId, ...(BETA ? ['early'] : []), ...(trial.version === 'grand' ? ['grand'] : []));
      return announce(ui.update(revealScreen({ type_code: typeCode, scores }, user)), fresh);
    }

    case 'results': {
      const profile = await store.getProfile(env, userId);
      if (!profile) return ui.update(simpleScreen(T.lost));
      return ui.update(revealScreen(profile, user));
    }

    case 'traits': {
      const profile = await store.getProfile(env, userId);
      if (!profile) return ui.update(simpleScreen(T.lost));
      return ui.update(traitsScreen(profile));
    }

    case 'facets': {
      const profile = await store.getProfile(env, userId);
      if (!profile) return ui.update(simpleScreen(T.lost));
      const page = PAGES.includes(args[0]) ? args[0] : 'S';
      return ui.update(facetsScreen(profile, page));
    }

    case 'pub':
    case 'priv': {
      const profile = await store.getProfile(env, userId);
      if (!profile) return ui.update(simpleScreen(T.lost));
      const isPublic = action === 'pub';
      await store.setPublic(env, userId, isPublic);
      return ui.update(secretChoiceScreen(profile, isPublic ? R.privacy.nowPublic : R.privacy.nowPrivate));
    }

    case 'sec': {
      const profile = await store.getProfile(env, userId);
      if (!profile) return ui.update(simpleScreen(T.lost));
      const isShown = args[0] === 'show';
      await store.setSecretPublic(env, userId, isShown);
      return ui.update(simpleScreen(isShown ? SX.shown : SX.hidden, guildColor(profile.type_code)));
    }

    case 'newtrial':
      return ui.update(warningScreen());

    case 'anew':
      // The card becomes private until the new trial is finished, then the new class replaces the old one.
      // Customization and badges are kept: only /forget erases them.
      await store.setPublic(env, userId, false);
      await store.deleteTrial(env, userId);
      return ui.update(welcomeScreen());

    case 'keep':
      return ui.update(simpleScreen(T.warning.kept));

    default:
      return ui.update(simpleScreen(texts.common.unknownCommand));
  }
}
