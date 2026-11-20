// 🎨 Accent colors for the card border, and the guild dots.
// When a traveler picks their own color, a colored dot in front of the guild name keeps the guild's color visible.

export const PALETTE = {
  crimson: { name: 'Crimson', emoji: '❤️', color: 0xdc143c },
  coral: { name: 'Coral', emoji: '🧡', color: 0xff7f50 },
  gold: { name: 'Gold', emoji: '💛', color: 0xf5c518 },
  emerald: { name: 'Emerald', emoji: '💚', color: 0x2ecc71 },
  sky: { name: 'Sky', emoji: '🩵', color: 0x5bc0eb },
  sapphire: { name: 'Sapphire', emoji: '💙', color: 0x2f6fde },
  amethyst: { name: 'Amethyst', emoji: '💜', color: 0x9b59b6 },
  rose: { name: 'Rose', emoji: '🩷', color: 0xff6fae },
  pearl: { name: 'Pearl', emoji: '🤍', color: 0xecebf5 },
  silver: { name: 'Silver', emoji: '🩶', color: 0xa8a9ad },
  bronze: { name: 'Bronze', emoji: '🤎', color: 0xa0703a },
  obsidian: { name: 'Obsidian', emoji: '🖤', color: 0x2b2b35 },
};

export const GUILD_DOTS = { dreamers: '🟣', scholars: '🟢', guardians: '🟡', wanderers: '🔴' };

// "#ff6fae" or "FF6FAE" -> 0xff6fae, or null if it is not a valid hex code.
export function parseHex(text) {
  const m = /^#?([0-9a-f]{6})$/i.exec((text ?? '').trim());
  return m ? parseInt(m[1], 16) : null;
}

function toHex(color) {
  return '#' + color.toString(16).padStart(6, '0').toUpperCase();
}

// The palette name of a color, or its hex code.
export function colorName(color) {
  const found = Object.values(PALETTE).find((p) => p.color === color);
  return found ? `${found.emoji} ${found.name}` : `🎨 ${toHex(color)}`;
}
