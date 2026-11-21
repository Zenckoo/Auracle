// ♿ Accessibility mode: turns any answer into a version easier to read with a screen reader.
// It only changes how Auracle shows things to the traveler who turned it on, never what is saved.
//   - bars (▰▰▰▱▱) become words: "Openness: about 60%"; a bar alone on its line is dropped (the % follows it)
//   - small grey text (-#) becomes normal text
//   - decorative emojis are removed, from texts, buttons and menus (a screen reader reads each one aloud)
//   - no italics and no strikethrough

import { texts } from '../texts/main.js';
import { VIBES } from '../data/vibes.js';

const EMOJI = /(?:[\p{Extended_Pictographic}\p{Regional_Indicator}][\u{FE0F}\u{200D}\u{20E3}\p{Extended_Pictographic}\p{Regional_Indicator}\p{Emoji_Modifier}]*)+ ?/gu;
const BAR = '[▰▱]{10}';

// Emojis that carry a meaning on a card line: they become a word instead of disappearing.
// Only at the start of a line or after " · ", so the same emoji elsewhere is simply removed.
// The words are in texts/<language>/main.js (a11y.words), so they follow the server's language.
const WORD_EMOJIS = ['🎮', '📺', '🎧', '⭐', '🕰️', '🗣️', '🎂', '🏷️', '🌈', '💞', '🌍', '🏅', '💌'];
const WORD_AT = new RegExp(`(^|· )(${WORD_EMOJIS.map((e) => e.replace(/️/g, '')).join('|')})️? `, 'gmu');

function percent(bar) {
  return [...bar].filter((c) => c === '▰').length * 10;
}

export function simplify(text) {
  if (typeof text !== 'string') return text;
  const A = texts.a11y;
  const gaming = VIBES.gaming.name;
  return text
    .replace(/❝ ?/g, '"').replace(/ ?❞/g, '"')
    .replace(/^-# /gm, '')
    // 🎮 before the "Gaming time" vibe is not the games: it is simply removed (with the other emojis, below).
    .replace(WORD_AT, (all, before, emoji, offset, whole) =>
      emoji === '🎮' && whole.startsWith(gaming, offset + all.length) ? all : `${before}${A.words[emoji] ?? A.words[`${emoji}️`]} `)
    .replace(new RegExp(`^\\s*${BAR}\\s*$\\n?`, 'gm'), '')
    .replace(new RegExp(`(${BAR}) (\\d+%)`, 'g'), (_, bar, pct) => A.done(pct))
    .replace(new RegExp(`(${BAR}) (\\p{Lu}[\\p{L}-]*)`, 'gu'), (_, bar, name) => A.trait(name, percent(bar)))
    .replace(new RegExp(BAR, 'g'), (bar) => A.about(percent(bar)))
    .replace(EMOJI, '')
    .replace(/~~/g, '')
    .replace(/(?<![\\*])\*(?!\*)/g, '')
    .replace(/[ \t]+$/gm, '')
    .replace(/^ +/gm, '');
}

function walk(components) {
  for (const c of components ?? []) {
    if (c.type === 10) c.content = simplify(c.content);
    if (c.label && c.emoji) delete c.emoji;
    if (c.label) c.label = simplify(c.label) || c.label;
    if (c.placeholder) c.placeholder = simplify(c.placeholder);
    for (const o of c.options ?? []) {
      delete o.emoji;
      o.label = simplify(o.label) || o.label;
      if (o.description) o.description = simplify(o.description);
    }
    walk(c.components);
    if (c.accessory?.type === 2) walk([c.accessory]);
  }
}

// Changes a message answer (new message or update) in place. Forms and other answers stay as they are.
export function accessible(answer) {
  if ((answer?.type === 4 || answer?.type === 7) && Array.isArray(answer.data?.components)) walk(answer.data.components);
  return answer;
}
