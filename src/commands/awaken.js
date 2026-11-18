// /awaken: the trial. Part 1 = intro screens, questions, back, pause, resume.
// Every answer is saved at once, so closing the message never loses anything.

import { ui } from '../core/ui.js';
import { texts } from '../texts/en.js';
import { IPIP120 } from '../data/ipip120.js';
import * as store from '../core/store.js';

const T = texts.awaken;
const TOTAL = IPIP120.length;
const BLUE = ui.COLORS.auracle;
const ANSWER_EMOJIS = ['❌', '➖', '⚖️', '✔️', '✅'];

function userIdOf(interaction) {
  return interaction.member?.user?.id ?? interaction.user?.id;
}

function box(parts) {
  return [ui.container(BLUE, parts)];
}

function progressBar(index) {
  const filled = Math.round((index / TOTAL) * 10);
  return '▰'.repeat(filled) + '▱'.repeat(10 - filled) + ` ${Math.round((index / TOTAL) * 100)}%`;
}

// ---------- Screens ----------

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
    ui.row(ui.button({ id: 'aw:start', label: T.disclaimer.button, emoji: '✅' })),
  ]);
}

function questionScreen(trial) {
  const index = trial.current_index;
  const [statement] = IPIP120[index];
  const milestone = T.question.milestones[index];

  let header = `📜 **${T.question.versionName}** · ${index + 1} / ${TOTAL}\n${progressBar(index)}`;
  if (milestone) header += `\n${milestone}`;

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

function pauseScreen() {
  return box([ui.text(T.pause)]);
}

function resumeScreen(trial) {
  const position = Math.min(trial.current_index + 1, TOTAL);
  return box([
    ui.text(T.resume.text(position, TOTAL)),
    ui.separator(),
    ui.row(
      ui.button({ id: 'aw:resume', label: T.resume.resume, emoji: '▶️' }),
      ui.button({ id: 'aw:restart', label: T.resume.restart, emoji: '🔄', style: ui.ButtonStyle.SECONDARY }),
    ),
  ]);
}

function endScreen(note) {
  const parts = [
    ui.text(`📜 **${T.question.versionName}** · ${TOTAL} / ${TOTAL}\n${progressBar(TOTAL)}`),
    ui.separator(),
    ui.text(T.end.text),
  ];
  if (note) parts.push(ui.text(note));
  parts.push(ui.separator(), ui.row(ui.button({ id: 'aw:reveal', label: T.end.button, emoji: '✨' })));
  return box(parts);
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

function simpleScreen(text) {
  return box([ui.text(text)]);
}

// ---------- /awaken ----------

export async function awakenCommand(interaction, env) {
  const userId = userIdOf(interaction);

  const trial = await store.getTrial(env, userId);
  if (trial) return ui.message(resumeScreen(trial));

  const profile = await store.getProfile(env, userId);
  if (profile) return ui.message(completeScreen());

  return ui.message(welcomeScreen());
}

// ---------- Buttons ----------

export async function awakenComponent(interaction, env) {
  const userId = userIdOf(interaction);
  const [, action, ...args] = interaction.data.custom_id.split(':');

  switch (action) {
    case 'preamble':
      return ui.update(preambleScreen());

    case 'disclaimer':
      return ui.update(disclaimerScreen());

    case 'start':
    case 'restart': {
      const trial = await store.startTrial(env, userId);
      return ui.update(questionScreen(trial));
    }

    case 'ans': {
      const index = Number(args[0]);
      const value = Number(args[1]);
      const trial = await store.getTrial(env, userId);
      if (!trial) return ui.update(simpleScreen(T.lost));
      if (trial.current_index >= TOTAL) return ui.update(endScreen());

      // A late or double click on an old question: just show the current one again.
      if (index !== trial.current_index || value < 1 || value > 5) {
        return ui.update(questionScreen(trial));
      }

      trial.answers[index] = value;
      trial.current_index = index + 1;
      await store.saveTrial(env, trial);

      if (trial.current_index >= TOTAL) return ui.update(endScreen());
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
      return ui.update(pauseScreen());

    case 'resume': {
      const trial = await store.getTrial(env, userId);
      if (!trial) return ui.update(simpleScreen(T.lost));
      if (trial.current_index >= TOTAL) return ui.update(endScreen());
      return ui.update(questionScreen(trial));
    }

    case 'reveal':
      return ui.update(endScreen(T.end.soon));

    case 'results':
      return ui.update(simpleScreen(T.complete.soon));

    case 'newtrial':
      return ui.update(warningScreen());

    case 'anew':
      await store.deleteProfile(env, userId);
      await store.deleteTrial(env, userId);
      return ui.update(welcomeScreen());

    case 'keep':
      return ui.update(simpleScreen(T.warning.kept));

    default:
      return ui.update(simpleScreen(texts.common.unknownCommand));
  }
}
