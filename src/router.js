// Sends each slash command and each button click to the right handler.

import { helpCommand } from './commands/help.js';
import { awakenCommand, awakenComponent } from './commands/awaken.js';
import { ui } from './core/ui.js';
import { texts } from './texts/en.js';

const commandHandlers = {
  help: helpCommand,
  awaken: awakenCommand,
};

// Buttons are named "prefix:action:...". The prefix tells which feature owns them.
const componentHandlers = {
  aw: awakenComponent,
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
