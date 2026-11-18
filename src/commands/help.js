// /help: the Traveler's Guide.

import { ui } from '../core/ui.js';
import { texts } from '../texts/en.js';
import { hubTexts } from '../texts/en-hub.js';
import { socialHelp } from '../texts/en-social.js';

export function helpCommand() {
  const t = texts.help;
  const entries = [hubTexts.helpEntry];
  for (const c of t.commands) {
    entries.push(c);
    if (c.name === '`/profile`') entries.push(...socialHelp);
  }
  const list = entries.map((c) => `${c.name} : ${c.description}`).join('\n');

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
