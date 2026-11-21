// profile (fr): translations of en/profile.js, same shape. Missing keys fall back to English.

export const profileTexts = {
  cardLabel: (name) => `-# Carte de voyageur·se de ${name}`,
  privateNote: '-# 🔒 Ta carte est privée. Toi seul·e peux la voir.',
  notAwakenedSelf: "### 🌫️ Pas encore de classe\nTu n'as pas encore affronté l'épreuve, voyageur·se. Commence ton voyage avec `/awaken`.",
  notAwakenedOther: () => "### 🌫️ Encore inconnu\nCette personne n'a pas encore affronté l'épreuve. Sa classe reste inconnue.",
  privateOther: () => '### 🔒 Un chemin caché\nLa classe de cette personne reste un mystère...',
  bot: "### 🤖 Pas d'âme à révéler\nLes bots ne peuvent pas passer l'épreuve... pour l'instant.",

  tastesTitle: '**🎮 Goûts**',
  tasteLabels: { games: 'Jeux', shows: 'Animés & séries', music: 'Musique', characters: 'Favoris' },
  askAbout: (text) => `Parle-moi de ${text}`,
  localTime: (time, city) => `${time} à ${city}`,
  birthday: (date) => `Anniversaire le ${date}`,
  birthdayToday: "**🎂 C'est son anniversaire aujourd'hui !**",
  lookingFor: (list) => `Cherche ${list}`,
  dms: { open: 'MP ouverts', ask: 'MP : demander avant', closed: 'MP fermés' },
  blessingsTitle: '**💌 Bénédictions**',
  blessing: (text, authorId) => `*« ${text} »* · <@${authorId}>`,
  traitsTitle: '**📊 Traits**',
  secret: (facet, pct) => `-# 🗝️ Secret caché : **${facet}** · plus haut que ${pct} % des voyageur·ses`,
  footer: (trial, timestamp) => `-# ${trial} · Éveil le <t:${timestamp}:D> · Une estimation pour le plaisir, pas un diagnostic`,
};
