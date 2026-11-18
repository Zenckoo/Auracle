// /help: the Traveler's Guide.

import { ui } from '../core/ui.js';
import { texts } from '../texts/en.js';
import { hubTexts } from '../texts/en-hub.js';

export function helpCommand() {
  const t = texts.help;
  const list = [hubTexts.helpEntry, ...t.commands].map((c) => `${c.name} : ${c.description}`).join('\n');

  return ui.message([
    ui.container(ui.COLORS.auracle, [
      ui.text(t.title),
      ui.separator(),
      ui.text(list),
      ui.separator(),
      ui.text(t.footer),
    ]),
  ]);
}
