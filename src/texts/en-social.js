// English texts for /compare and /guilds (as validated in the plan).

export const compareTexts = {
  title: '### 🤝 Compatibility',
  score: (pct) => `## ${pct}%`,
  alike: '**Alike:**',
  opposite: '**Opposite:**',
  none: 'none',
  footer: '-# A fun estimate based on your five traits, never a verdict.',
  notAligned:
    '### 🌌 The stars cannot align...\n' +
    'Both travelers must reveal their class to be compared.\n' +
    '-# Cards can be made public with 🔒 Privacy in `/auracle`.',
  self: '### 🪞 A perfect match\nComparing yourself to yourself? A perfect match, I suppose.',
  duos: {
    'dreamers+dreamers': "Two Dreamers together? Endless deep talks until 3 AM... but nobody knows what's for dinner.",
    'dreamers+scholars': 'Heart meets mind: one feels everything, the other analyzes everything. Together, you could fix the world... after a long debate.',
    'dreamers+guardians': 'The dreamer and the keeper: one imagines the castle, the other actually builds it.',
    'dreamers+wanderers': 'Feelings and adventure: one writes the story, the other lives it... usually without a map.',
    'scholars+scholars': 'Two Scholars together? Brilliant theories, endless debates... and nobody remembers to eat.',
    'scholars+guardians': 'The thinker and the keeper: one questions every rule, the other wrote them.',
    'scholars+wanderers': 'Plan versus instinct: one calculates every move, the other already jumped.',
    'guardians+guardians': 'Two Guardians together? Nothing will ever be late, lost, or out of place. Ever.',
    'guardians+wanderers': 'Order meets chaos: one packs for every possible danger, the other forgot their bag.',
    'wanderers+wanderers': 'Two Wanderers together? Unforgettable adventures... and absolutely no plan B.',
  },
};

export const guildsTexts = {
  title: (name) => `### 🏰 The realm of ${name}`,
  fallbackName: 'this server',
  total: (n) => `-# ${n} public ${n === 1 ? 'card' : 'cards'} in this realm. Private cards are never counted.`,
  empty: 'No public cards in this realm yet... Be the first with `/awaken`!',
};

// Lines added to /help, after /profile.
export const socialHelp = [
  { name: '`/compare`', description: 'See how well you match with someone' },
  { name: '`/guilds`', description: 'See how the guilds are spread across the server' },
];
