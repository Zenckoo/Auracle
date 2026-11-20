// English texts for the two trials (Standard and Grand).

export const trialTexts = {
  names: { standard: 'Standard Trial', grand: 'Grand Trial' },
  emojis: { standard: '📜', grand: '📚' },
  choose: {
    title: '### 🧭 Choose your path, traveler.',
    standard: '📜 **Standard Trial**\n120 questions · about 10 minutes. The classic path, perfect for most travelers.',
    grand: '📚 **Grand Trial**\n300 questions · about 35 minutes. A deeper journey, for those who seek every secret.',
    note: '-# Both reveal the same class, traits and facets. You can pause anytime and come back later.',
  },
  badge: (version) => (version === 'grand' ? '-# 📚 Grand Trial' : '-# 📜 Standard Trial'),
};
