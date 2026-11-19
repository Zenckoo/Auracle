// Free text written by travelers (About me, vibe...): checked before it is saved, escaped when it is shown.

const LINK = /(https?:\/\/|www\.|discord\.gg|discord\.com\/invite|\.(com|net|org|gg|io|xyz|ly)\b)/i;

// Returns { text } when the text can be saved (null if empty), or { error: 'link' } when it holds a link.
// Line breaks become spaces, so a card keeps its layout.
export function cleanText(raw, max) {
  const text = (raw ?? '').replace(/[\r\n\t]+/g, ' ').replace(/\s{2,}/g, ' ').trim().slice(0, max);
  if (LINK.test(text)) return { error: 'link' };
  return { text: text || null };
}

// Escapes Discord formatting, so a card can never ping anyone, hide a link, or change its own layout.
export function showText(text) {
  return (text ?? '').replace(/([\\*_~`|>#\[\]()<@:-])/g, '\\$1');
}
