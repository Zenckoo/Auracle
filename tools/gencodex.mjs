// Rebuilds the Codex pages of the website from the bot's own texts, so both always say the same thing.
// Usage (from the repo folder): node tools/gencodex.mjs [show|write]
//   en -> site/codex.html, fr -> site/fr/codex.html (only the <main> part changes).
import fs from 'node:fs';
import { runWithLang } from '../src/core/i18n.js';
import { codexTexts } from '../src/texts/codex.js';
import { CLASSES, GUILDS } from '../src/data/classes.js';

const LANGS = {
  en: { file: 'site/codex.html', contents: 'Contents', back: '↑ Back to contents' },
  fr: { file: 'site/fr/codex.html', contents: 'Sommaire', back: '↑ Retour au sommaire' },
};
const COLORS = { dreamers: 'var(--dreamers)', scholars: 'var(--scholars)', guardians: 'var(--guardians)', wanderers: 'var(--wanderers)' };

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const inline = (s) => esc(s).replace(/\*\*(.+?)\*\*/g, '<b>$1</b>').replace(/\*(.+?)\*/g, '<i>$1</i>').replace(/`(.+?)`/g, '<code>$1</code>');
function body(text) {
  return text.split('\n\n').map((p) => {
    const lines = p.split('\n');
    if (lines.every((l) => l.startsWith('-# '))) return lines.map((l) => `<p class="small">${inline(l.slice(3))}</p>`).join('\n');
    return `<p>${lines.map((l) => inline(l.startsWith('-# ') ? l.slice(3) : l)).join('<br>')}</p>`;
  }).join('\n');
}
function guilds() {
  return '<div class="guilds">' + Object.entries(GUILDS).map(([key, g]) => {
    const classes = Object.entries(CLASSES).filter(([, c]) => c.guild === key)
      .map(([type, c]) => `<li>${c.emoji} <b>${esc(c.name)}</b>, ${esc(c.subtitle)} <span>· ${type}</span></li>`).join('');
    return `<div class="guild" style="--c:${COLORS[key]}"><h3><span class="dot"></span>${g.emoji} ${esc(g.name)}</h3><ul>${classes}</ul></div>`;
  }).join('\n') + '</div>';
}

// Page ids come from the English names, so links like /fr/codex#your-data work in every language.
const ids = runWithLang('en', () => codexTexts.pages.map((p) => p.name.toLowerCase().replace(/\+/g, '').replace(/[^a-z0-9 ]/g, '').trim().replace(/\s+/g, '-')));

function main(lang) {
  const L = LANGS[lang];
  return runWithLang(lang, () => {
    const pages = codexTexts.pages;
    const total = pages.length;
    const toc = pages.map((p, i) => `        <li><a href="#${ids[i]}">${p.emoji} ${esc(p.name)}</a></li>`).join('\n');
    const articles = pages.map((p, i) => {
      const links = p.links.length ? `<div class="links">${p.links.map((l) => `<a class="link" href="${l.url}" target="_blank" rel="noopener">🔗 ${esc(l.label)}</a>`).join('')}</div>` : '';
      return `    <article class="page" id="${ids[i]}">\n      <p class="num">${esc(codexTexts.page(i + 1, total))}</p>\n      <h2>${p.emoji} ${esc(p.name)}</h2>\n      ${p.body === null ? guilds() : body(p.body)}\n      ${links}\n      <a class="top" href="#contents">${L.back}</a>\n    </article>`;
    }).join('\n\n');
    return `<main class="wrap">\n  <nav class="contents" id="contents">\n    <h2>${L.contents}</h2>\n    <ol>\n${toc}\n    </ol>\n  </nav>\n\n${articles}\n</main>`;
  });
}

const mode = process.argv[2] ?? 'show';
for (const lang of Object.keys(LANGS)) {
  const file = LANGS[lang].file;
  if (!fs.existsSync(file)) { console.log(`${lang}: ${file} does not exist yet`); continue; }
  const html = fs.readFileSync(file, 'utf8');
  const next = html.replace(/<main class="wrap">[\s\S]*?\n<\/main>/, () => main(lang));
  console.log(`${lang}: ${next === html ? 'up to date' : 'changed'}`);
  if (mode === 'write') fs.writeFileSync(file, next);
}
