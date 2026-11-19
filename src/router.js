// Sends each slash command, button click and form to the right handler.

import { awakenCommand, awakenComponent } from './commands/awaken.js';
import { profileCommand } from './commands/profile.js';
import { privacyComponent } from './commands/privacy.js';
import { forgetCommand, forgetComponent } from './commands/forget.js';
import { updatesComponent } from './commands/updates.js';
import { feedbackComponent, feedbackModal } from './commands/feedback.js';
import { hubCommand, hubComponent } from './commands/hub.js';
import { codexComponent } from './commands/codex.js';
import { serverComponent } from './commands/server.js';
import { reportComponent, reportModal } from './commands/report.js';
import { customizeComponent } from './commands/customize.js';
import { syncEverywhere } from './core/roles.js';
import { ui } from './core/ui.js';
import { texts } from './texts/en.js';

// The 4 slash commands. Everything else is a button in the /auracle menu (see hub.js).
const commandHandlers = {
  auracle: hubCommand,
  awaken: awakenCommand,
  profile: profileCommand,
  forget: forgetCommand,
};

// Buttons are named "prefix:action:...". The prefix tells which feature owns them.
const componentHandlers = {
  hub: hubComponent,
  aw: awakenComponent,
  pv: privacyComponent,
  fg: forgetComponent,
  fb: feedbackComponent,
  up: updatesComponent,
  cx: codexComponent,
  sv: serverComponent,
  rp: reportComponent,
  cz: customizeComponent,
};

// Forms (modals), same naming.
const modalHandlers = {
  fb: feedbackModal,
  rp: reportModal,
};

function unknown() {
  return ui.message([ui.container(ui.COLORS.auracle, [ui.text(texts.common.unknownCommand)])]);
}

export async function handleCommand(interaction, env, later) {
  const handler = commandHandlers[interaction.data.name];
  return handler ? handler(interaction, env, later) : unknown();
}

// Buttons that change a card in the trial: public, private, or a new trial (card erased).
// Once they are done, the traveler's guild role is updated on every server that uses them.
const ROLE_CHANGES = new Set(['aw:pub', 'aw:priv', 'aw:anew']);

export async function handleComponent(interaction, env, later) {
  const prefix = interaction.data.custom_id.split(':')[0];
  const handler = componentHandlers[prefix];
  if (!handler) return unknown();
  const answer = await handler(interaction, env, later);
  const userId = interaction.member?.user?.id ?? interaction.user?.id;
  if (ROLE_CHANGES.has(interaction.data.custom_id) && userId) {
    later(syncEverywhere(env, userId).catch(() => {}));
  }
  return answer;
}

export async function handleModal(interaction, env, later) {
  const prefix = interaction.data.custom_id.split(':')[0];
  const handler = modalHandlers[prefix];
  return handler ? handler(interaction, env, later) : unknown();
}
