// Sends each slash command to the right handler.

import { helpCommand } from './commands/help.js';
import { ui } from './core/ui.js';
import { texts } from './texts/en.js';

const handlers = {
  help: helpCommand,
};

export async function handleCommand(interaction, env) {
  const handler = handlers[interaction.data.name];
  if (!handler) {
    return ui.message([ui.container(ui.COLORS.auracle, [ui.text(texts.common.unknownCommand)])]);
  }
  return handler(interaction, env);
}
