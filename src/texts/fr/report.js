// report (fr): translations of en/report.js, same shape. Missing keys fall back to English.
// What goes to Zenckoo's HQ channel (headings, snapshot) stays in English.

export const reportTexts = {
  button: 'Signaler',
  choose: "### 🚩 Signaler cette carte\nQu'est-ce qui enfreint les règles sur cette carte ?\n-# Ton signalement va en privé à Zenckoo. La personne n'apprend jamais qui l'a signalée.",
  placeholder: 'Choisis une raison',
  reasons: {
    banner: { label: 'Bannière' },
    about: { label: 'À propos de moi' },
    vibe: { label: 'Vibe du moment' },
    blessing: { label: 'Bénédiction' },
    info: { label: 'Infos du profil' },
    other: { label: 'Autre chose' },
  },
  form: {
    title: 'Signaler cette carte',
    label: 'Détails (facultatif)',
    labelOther: "Qu'est-ce qui ne va pas ?",
    placeholder: 'Explique à Zenckoo ce qui enfreint les règles.',
  },
  thanks: '### 💜 Merci, voyageur·se\nTon signalement est arrivé jusqu\'à Zenckoo, qui va le regarder personnellement.',
  failed: "### ⚠️ Le signalement s'est perdu\nRéessaie dans un instant.",
  self: '### 🪞 Ta propre carte\nTu ne peux pas signaler ta propre carte, voyageur·se. Tu peux la modifier quand tu veux.',
  gone: "### 🌫️ Carte introuvable\nCette carte est privée ou n'existe plus.",
  already: '### 🚩 Déjà signalée\nTu as déjà signalé cette carte dans les dernières 24 heures. Zenckoo va la regarder.',
  limit: "### ⏳ Trop de signalements\nTu peux envoyer jusqu'à 5 signalements toutes les 24 heures. Réessaie plus tard.",
};
