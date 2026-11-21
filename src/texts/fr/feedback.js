// feedback (fr): translations of en/feedback.js, same shape. Missing keys fall back to English.
// The headings and the "From" line go to Zenckoo's HQ channel, so they stay in English.

export const feedbackTexts = {
  question: "### 📬 Parle, voyageur·se.\nQuelque chose s'est cassé, ou tu as une idée pour Auracle ?",
  bugButton: 'Signaler un bug',
  ideaButton: 'Proposer une idée',
  bug: {
    title: 'Signaler un bug',
    label: "Que s'est-il passé ?",
    placeholder: "Dis-moi ce que tu as fait et ce qui n'a pas marché.",
  },
  idea: {
    title: 'Proposer une idée',
    label: 'Ton idée',
    placeholder: 'Qu\'est-ce qui rendrait Auracle encore mieux ?',
  },
  thanks: '### 💜 Merci, voyageur·se\nTon message est bien arrivé jusqu\'à Zenckoo.',
  failed: "### ⚠️ Le message s'est perdu\nRéessaie dans un instant.",
  limitNote: "-# Jusqu'à 5 messages toutes les 24 heures. Spammer les Avis entraîne un blocage automatique d'Auracle pendant 30 jours.",
};

export const banTexts = {
  blocked: (until) =>
    "### ⛔ Auracle fait une pause avec toi\n" +
    `Tu as envoyé trop de messages d'Avis, donc Auracle est bloqué pour toi jusqu'au <t:${Math.floor(until / 1000)}:D>.\n` +
    "-# Tu peux toujours effacer tes données avec `/forget`. Tu penses que c'est une erreur ? Écris à auracle.contact@gmail.com",
};
