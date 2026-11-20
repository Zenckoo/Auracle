// 📖 Codex (a button in /auracle): a small book in Discord explaining how Auracle works, with links to sources.
// One page at a time, with arrows and a menu to jump to any page.

import { ui } from '../core/ui.js';
import { codexTexts as X } from '../texts/en-codex.js';
import { CLASSES, GUILDS } from '../data/classes.js';
import { earn, announce } from '../core/badges.js';
import * as store from '../core/store.js';

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

// 🏅 Lorekeeper: once every page has been opened. Until then, only which pages were opened is kept.
async function readPage(interaction, env, index) {
  const userId = interaction?.member?.user?.id ?? interaction?.user?.id;
  if (!env || !userId) return [];
  const mask = await store.seeCodexPage(env, userId, index);
  if (mask == null || mask !== 2 ** PAGES.length - 1) return [];
  const fresh = await earn(env, userId, 'lorekeeper');
  await store.forgetCodexPages(env, userId);
  return fresh;
}

function clampPage(n) {
  return Math.max(0, Math.min(PAGES.length - 1, Number(n) || 0));
}

export async function codexCommand(interaction, env) {
  const fresh = await readPage(interaction, env, 0);
  return announce(ui.message(pageScreen(0)), fresh);
}

export async function codexComponent(interaction, env) {
  const [, action, value] = interaction.data.custom_id.split(':');
  const page = clampPage(action === 'jump' ? interaction.data.values?.[0] : value);
  const fresh = await readPage(interaction, env, page);
  return announce(ui.update(pageScreen(page)), fresh);
}
