// Sends each slash command, button click and form to the right handler.

import { helpCommand } from './commands/help.js';
import { awakenCommand, awakenComponent } from './commands/awaken.js';
import { profileCommand } from './commands/profile.js';
import { privacyCommand, privacyComponent } from './commands/privacy.js';
import { forgetCommand, forgetComponent } from './commands/forget.js';
import { updatesCommand } from './commands/updates.js';
import { feedbackCommand, feedbackComponent, feedbackModal } from './commands/feedback.js';
import { ui } from './core/ui.js';
import { texts } from './texts/en.js';

const commandHandlers = {
  help: helpCommand,
  awaken: awakenCommand,
  profile: profileCommand,
  privacy: privacyCommand,
  forget: forgetCommand,
  updates: updatesCommand,
  feedback: feedbackCommand,
};

// Buttons are named "prefix:action:...". The prefix tells which feature owns them.
const componentHandlers = {
  aw: awakenComponent,
  pv: privacyComponent,
  fg: forgetComponent,
  fb: feedbackComponent,
};

// Forms (modals), same naming.
const modalHandlers = {
  fb: feedbackModal,
};

function unknown() {
  return ui.message([ui.container(ui.COLORS.auracle, [ui.text(texts.common.unknownCommand)])]);
}

export async function handleCommand(interaction, env, later) {
  const handler = commandHandlers[interaction.data.name];
  return handler ? handler(interaction, env, later) : unknown();
}

export async function handleComponent(interaction, env, later) {
  const prefix = interaction.data.custom_id.split(':')[0];
  const handler = componentHandlers[prefix];
  return handler ? handler(interaction, env, later) : unknown();
}

export async function handleModal(interaction, env, later) {
  const prefix = interaction.data.custom_id.split(':')[0];
  const handler = modalHandlers[prefix];
  return handler ? handler(interaction, env, later) : unknown();
}
