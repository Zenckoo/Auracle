// 📜 Updates (a button in /auracle): two tabs. What's new shows one version per page (newest first), Coming soon shows what's planned.

import { ui } from '../core/ui.js';
import { updatesTexts as U } from '../texts/en-updates.js';

const S = ui.ButtonStyle;

// Button ids: up:tab:new, up:tab:soon (tabs) and up:page:N (arrows). Every id on a screen is unique.
function tabs(active) {
  return ui.row(
    ui.button({ id: 'up:tab:new', label: U.newTab, emoji: '📜', style: active === 'new' ? S.PRIMARY : S.SECONDARY }),
    ui.button({ id: 'up:tab:soon', label: U.soonTab, emoji: '🔮', style: active === 'soon' ? S.PRIMARY : S.SECONDARY }),
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
      ui.text(`**${v.name}**\n${items}`),
      ui.separator(),
      ui.row(
        ui.button({ id: `up:page:${Math.max(0, p - 1)}`, label: U.newer, emoji: '◀️', style: S.SECONDARY, disabled: p === 0 }),
        ui.button({ id: `up:page:${Math.min(total - 1, p + 1)}:o`, label: U.older, emoji: '▶️', style: S.SECONDARY, disabled: p >= total - 1 }),
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
  const [, action, value] = interaction.data.custom_id.split(':');
  if (action === 'tab' && value === 'soon') return ui.update(soonScreen());
  if (action === 'page') return ui.update(newsScreen(Number(value) || 0));
  return ui.update(newsScreen(0));
}
