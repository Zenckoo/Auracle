// /updates: two tabs. What's new shows one version per page (newest first), Coming soon shows what's planned.

import { ui } from '../core/ui.js';
import { updatesTexts as U } from '../texts/en-updates.js';

const S = ui.ButtonStyle;

function tabs(active) {
  return ui.row(
    ui.button({ id: 'up:new:0', label: U.newTab, emoji: '📜', style: active === 'new' ? S.PRIMARY : S.SECONDARY }),
    ui.button({ id: 'up:soon', label: U.soonTab, emoji: '🔮', style: active === 'soon' ? S.PRIMARY : S.SECONDARY }),
  );
}

function newsScreen(page) {
  const total = U.versions.length;
  const p = Math.max(0, Math.min(total - 1, page));
  const v = U.versions[p];
  const items = v.items.map((i) => `- ${i}`).join('\n');

  return [
    ui.container(ui.COLORS.auracle, [
      ui.text(`${U.newTitle}\n-# ${U.page(p + 1, total)}`),
      ui.separator(),
      ui.text(`**${v.name}**${v.date ? ` · ${v.date}` : ''}\n${items}`),
      ui.separator(),
      ui.row(
        ui.button({ id: `up:new:${p - 1}`, label: U.newer, emoji: '◀️', style: S.SECONDARY, disabled: p === 0 }),
        ui.button({ id: `up:new:${p + 1}`, label: U.older, emoji: '▶️', style: S.SECONDARY, disabled: p >= total - 1 }),
      ),
      tabs('new'),
      ui.text(U.footer),
    ]),
  ];
}

function soonScreen() {
  const items = U.soon.map((i) => `- ${i}`).join('\n');
  return [
    ui.container(ui.COLORS.auracle, [
      ui.text(`${U.soonTitle}\n${items}`),
      ui.separator(),
      tabs('soon'),
      ui.text(U.footer),
    ]),
  ];
}

export function updatesCommand() {
  return ui.message(newsScreen(0));
}

export function updatesComponent(interaction) {
  const [, action, page] = interaction.data.custom_id.split(':');
  if (action === 'soon') return ui.update(soonScreen());
  return ui.update(newsScreen(Number(page) || 0));
}
