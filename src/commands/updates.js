// /updates: what's new in Auracle and what's coming.

import { ui } from '../core/ui.js';
import { updatesTexts as U } from '../texts/en-updates.js';

export function updatesCommand() {
  const news = U.versions
    .map((v) => `**${v.name}**\n${v.items.map((i) => `- ${i}`).join('\n')}`)
    .join('\n\n');
  const soon = U.soon.map((i) => `- ${i}`).join('\n');

  return ui.message([
    ui.container(ui.COLORS.auracle, [
      ui.text(`${U.newTitle}\n${news}`),
      ui.separator(),
      ui.text(`${U.soonTitle}\n${soon}`),
      ui.separator(),
      ui.text(U.footer),
    ]),
  ]);
}
