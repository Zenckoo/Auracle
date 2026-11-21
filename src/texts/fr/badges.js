// badges (fr): translations of en/badges.js, same shape. Missing keys fall back to English.

export const badgeTexts = {
  page: 'Badges',
  title: '### 🏅 Badges',
  intro: "-# Gagnés automatiquement, et jamais perdus. Choisis-en jusqu'à 3 à montrer sur ta carte.",
  none: "-# Pas encore de badge. Ton voyage ne fait que commencer ! ✨",
  placeholder: 'Badges montrés sur ta carte',
  newBadge: (names, who) => `-# 🏅 Nouveau badge débloqué${who ? ` pour ${who}` : ''} : ${names} ! Choisis les badges de ta carte dans 🎨 Personnaliser > 🏅 Badges.`,
};
