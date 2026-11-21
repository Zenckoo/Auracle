import { showText } from '../core/text.js';
import { localized } from '../core/i18n.js';
import * as fr from '../texts/fr/data.js';
// The ready-made vibes for 🎨 Customize > 💬 About me. Keys are saved in the database: never rename a key.

const EN_VIBES = {
  cozy: { name: 'Cozy mode', emoji: '☕' },
  chat: { name: 'Open to chat', emoji: '💬' },
  exams: { name: 'Busy with exams', emoji: '📚' },
  gaming: { name: 'Gaming time', emoji: '🎮' },
  night: { name: 'Night owl mode', emoji: '🌙' },
  battery: { name: 'Low battery', emoji: '🔋' },
  creative: { name: 'Creative mood', emoji: '🎨' },
  away: { name: 'Away for a while', emoji: '✈️' },
};
export const VIBES = localized({ en: EN_VIBES, fr: fr.vibes });

// The vibe as shown on a card, or null.
export function vibeLine(profile) {
  if (profile.vibe === 'custom' && profile.vibe_text) return `💭 ${showText(profile.vibe_text)}`;
  const v = VIBES[profile.vibe];
  return v ? `${v.emoji} ${v.name}` : null;
}
