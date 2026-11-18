// /codex: a small book in Discord explaining how Auracle works, with links to sources.
// One page at a time, with arrows and a menu to jump to any page.

import { ui } from '../core/ui.js';
import { codexTexts as X } from '../texts/en-codex.js';
import { CLASSES, GUILDS } from '../data/classes.js';

const S = ui.ButtonStyle;
const PAGES = X.pages;

function guildsBody() {
  return Object.entries(GUILDS)
    .map(([key, g]) => {
      const classes = Object.entries(CLASSES)
        .filter(([, c]) => c.guild === key)
        .map(([type, c]) => `${c.emoji} ${c.name}, ${c.subtitle} · ${type}`)
        .join('\n');
      return `${g.emoji} **${g.name}**\n${classes}`;
    })
    .join('\n\n');
}

function pageScreen(index) {
  const p = Math.max(0, Math.min(PAGES.length - 1, index));
  const page = PAGES[p];
  const body = page.body ?? guildsBody();

  const parts = [
    ui.text(`${X.title}\n-# ${X.page(p + 1, PAGES.length)}`),
    ui.separator(),
    ui.text(`## ${page.emoji} ${page.name}\n${body}`),
  ];

  if (page.links.length) {
    parts.push(ui.row(...page.links.map((l) => ui.linkButton({ url: l.url, label: l.label, emoji: '🔗' }))));
  }

  parts.push(
    ui.separator(),
    ui.row(
      ui.button({ id: `cx:page:${Math.max(0, p - 1)}`, label: X.previous, emoji: '◀️', style: S.SECONDARY, disabled: p === 0 }),
      ui.button({ id: `cx:page:${Math.min(PAGES.length - 1, p + 1)}:n`, label: X.next, emoji: '▶️', style: S.SECONDARY, disabled: p >= PAGES.length - 1 }),
    ),
    {
      type: 1,
      components: [
        {
          type: 3,
          custom_id: 'cx:jump',
          placeholder: X.jump,
          options: PAGES.map((pg, i) => ({ label: pg.name, value: String(i), emoji: { name: pg.emoji }, default: i === p })),
        },
      ],
    },
    ui.text(X.footer),
  );

  return [ui.container(ui.COLORS.auracle, parts)];
}

export function codexCommand() {
  return ui.message(pageScreen(0));
}

export function codexComponent(interaction) {
  const [, action, value] = interaction.data.custom_id.split(':');
  if (action === 'jump') return ui.update(pageScreen(Number(interaction.data.values?.[0]) || 0));
  return ui.update(pageScreen(Number(value) || 0));
}
