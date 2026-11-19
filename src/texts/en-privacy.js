// English texts for /privacy and /forget (as validated in the plan).

export const privacyTexts = {
  title: '### 🔒 Your secrets, your choice, traveler.',
  current: (isPublic) => `Profile card: **${isPublic ? '🌍 Public' : '🔒 Private'}**`,
  explain: '-# Public cards can be seen by anyone with /profile. Your facets always stay private.',
  public: 'Public',
  private: 'Private',
  sealed: '### ✨ Your choice has been sealed.',
  roleLine: (wear) => `Guild role: **${wear ? '🏰 Worn' : '🚫 Not worn'}**`,
  wear: 'Wear it',
  noWear: "Don't wear it",
  roleNote: '-# Only on servers where staff turned on guild roles, and only while your card is public.',
};

export const forgetTexts = {
  question:
    '### ⚠️ Are you sure, traveler?\n' +
    'All your answers, your class, and your secrets will vanish forever.',
  erase: 'Erase everything',
  keep: 'Keep my journey',
  erased:
    '### 🌫️ Your journey has been erased\n' +
    'Every answer, your class and your secrets are gone. You can begin again anytime with `/awaken`.',
  kept: 'Your journey remains yours, traveler. 💜',
  nothing: '### 🌫️ Nothing to forget\nYou have no saved data, traveler.',
};
