// The Traveler's Guide (Help button in /auracle): the 4 commands, the menu buttons, and links to the website.

import { ui } from '../core/ui.js';
import { texts } from '../texts/main.js';
import { serverTexts } from '../texts/server.js';
import { siteLinks } from '../core/links.js';

export function helpCommand() {
  const t = texts.help;
  const commands = t.commands.map((c) => `${c.name} : ${c.description}`).join('\n');
  const menu = [...t.menu, serverTexts.helpLine].join('\n');

  return ui.message([
    ui.container(ui.COLORS.auracle, [
      ui.text(t.title),
      ui.separator(),
      ui.text(`${t.commandsTitle}\n${commands}`),
      ui.separator(),
      ui.text(`${t.menuTitle}\n${menu}`),
      ui.separator(),
      ui.text(t.footer),
      siteLinks('home', 'privacy', 'terms'),
    ]),
  ]);
}
