// trials (fr): translations of en/trials.js, same shape. Missing keys fall back to English.

export const trialTexts = {
  names: { standard: 'Épreuve classique', grand: 'Grande Épreuve' },
  choose: {
    title: '### 🧭 Choisis ta voie, voyageur·se.',
    standard: "📜 **Épreuve classique**\n120 questions · environ 10 minutes. La voie classique, parfaite pour la plupart des voyageur·ses.",
    grand: '📚 **Grande Épreuve**\n300 questions · environ 35 minutes. Un voyage plus profond, pour qui veut percer tous les secrets.',
    note: '-# Les deux révèlent la même classe, les mêmes traits et les mêmes facettes. Tu peux faire une pause quand tu veux et revenir plus tard.',
  },
  badge: (version) => (version === 'grand' ? '-# 📚 Grande Épreuve' : '-# 📜 Épreuve classique'),
};
