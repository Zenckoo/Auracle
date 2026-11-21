// organize (fr): translations of en/organize.js, same shape. Missing keys fall back to English.

import { customizeTexts } from './customize.js';

export const organizeTexts = {
  page: 'Organiser',
  title: '### 🗂️ Organise ta carte',
  intro: "-# Choisis l'ordre de ta carte, et cache ce que tu veux. Ta bannière et ta classe restent toujours en haut, tes badges en bas.",
  line: (n, emoji, name, hidden) => `**${n}.** ${emoji} ${hidden ? `~~${name}~~ · 🙈 Caché` : name}`,
  up: 'Monter',
  hide: 'Cacher',
  show: 'Afficher',
  reset: 'Ordre par défaut',
  saved: customizeTexts.sealed,
};
