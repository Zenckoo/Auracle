// English texts for 🎨 Customize (in the /auracle menu).

export const customizeTexts = {
  hubButton: 'Customize',
  title: '### 🎨 Customize your card',
  intro: '-# Make your card truly yours. Everything is optional, and follows your card: private if your card is private.',
  sealed: '### ✨ Your card has been updated.',
  titleLine: (name) => `**✨ Fantasy title**: ${name ? `*${name}*` : 'None'}\n-# Shown under your class.`,
  titlePlaceholder: 'Choose a fantasy title',
  noTitle: 'No title',
  cardLine: (name) => `✨ *${name}*`,
  colorLine: (name) => `**🎨 Accent color**: ${name ?? 'Guild color'}\n-# The border of your card. Your guild keeps its color with a dot in front of its name.`,
  colorPlaceholder: 'Choose an accent color',
  guildColor: 'Guild color',
  customColor: 'My own hex code...',
  colorForm: {
    title: 'Your own color',
    label: 'Hex code',
    placeholder: '#FF6FAE',
  },
  badColor: '-# ⚠️ That hex code does not look right. Use 6 characters, like **#FF6FAE**.',
  viewCard: 'View my card',

  // Pages
  appearance: '**🖌️ Appearance**',
  pagesTitle: '**📖 More pages**',
  aboutPage: 'About me',
  tastesPage: 'Tastes & fun',
  practicalPage: 'Practical',
  back: 'Back',

  // 💬 About me page
  aboutTitle: '### 💬 About me',
  aboutIntro: '-# A few words about you, shown on your card. Leave it empty to show nothing.',
  aboutLine: (text) => `**💬 About me**\n${text ?? '-# Empty'}`,
  aboutWrite: 'Write',
  aboutClear: 'Clear',
  aboutForm: { title: 'About me', label: 'A few words about you (150 characters)', placeholder: 'Tea lover, night owl, always drawing something...' },
  vibeLine: (text) => `**🌙 Current vibe**: ${text ?? 'None'}\n-# How you feel right now. Change it whenever you want.`,
  vibePlaceholder: 'Choose your current vibe',
  noVibe: 'No vibe',
  customVibe: 'My own vibe...',
  vibeForm: { title: 'Your own vibe', label: 'Your vibe (40 characters)', placeholder: 'Learning to bake bread' },
  noLinks: '-# ⚠️ Links are not allowed on cards. Please write it without a link.',

  // 🎮 Tastes & fun page
  tastesTitle: '### 🎮 Tastes & fun',
  tastesIntro: '-# What you love, and what kind of company you are looking for. Everything is optional.',
  tastesLines: (lines) => `**🎮 Your tastes**\n${lines.length ? lines.join('\n') : '-# Empty'}`,
  tastesEdit: 'Edit my tastes',
  tastesClear: 'Clear',
  tastesForm: 'Tastes & fun',
  lookingLine: '**🤝 Looking for**\n-# Up to 3. Friendship and hobbies only.',
  lookingPlaceholder: 'What kind of company are you looking for?',
  dmsLine: '**✉️ Direct messages**',
  dmsPlaceholder: 'Your DM preference',
  dmsNone: 'Not shown',

  // 🕰️ Practical page
  practicalTitle: '### 🕰️ Practical',
  practicalIntro: '-# Little things that help others reach you. Everything is optional.',
  timeLine: (name) => `**🕰️ Local time**: ${name ?? 'Not shown'}\n-# Your card shows your current time. Only a broad time zone, never your city.`,
  timePlaceholder: 'Choose your time zone',
  timeNone: 'Not shown',
  langLine: (names, max) => `**🗣️ Languages**: ${names.length ? names.join(', ') : 'None'}\n-# Up to ${max}. Pick a region, then your languages.`,
  regionPlaceholder: 'Pick a region of the world',
  langPlaceholder: (region) => `Your languages: ${region}`,
  langClear: 'Clear languages',
  langFull: (max) => `-# ⚠️ You can show up to ${max} languages. Remove one before adding another.`,
  birthdayLine: (date) => `**🎂 Birthday**: ${date ?? 'Not shown'}\n-# Day and month only, never the year. On your birthday, your card celebrates it.`,
  birthdaySet: 'Set my birthday',
  birthdayClear: 'Clear',
  birthdayForm: { title: 'Your birthday', day: 'Day (1 to 31)', month: 'Month (1 to 12)' },
  badBirthday: '-# ⚠️ That date does not exist. Use numbers, like **14** and **3** for March 14.',
  // 🌈 Identity page
  identityPage: 'Identity',
  consentTitle: '### 🌈 Identity',
  consentBody:
    'Here you can share your **pronouns**, your **gender**, your **orientation** and your **origins** on your card, if you wish. Everything is optional.\n\n' +
    '🔒 **Private by default.** This part has its own switch: even if your card is public, it stays hidden until you decide otherwise.\n' +
    '🚫 **Never used elsewhere.** Not in Compare, Guilds, guild roles or statistics, and never linked to your results.\n' +
    '🧹 **Your choice, always.** You can withdraw your consent anytime, and everything here is erased at once.\n' +
    '🌱 **Younger travelers.** In some countries (in France, under 15), you need a parent\'s agreement first. If unsure, simply leave this empty.\n\n' +
    '-# These are sensitive data under the GDPR. Auracle saves them only with your explicit consent, and keeps the date you agreed as proof.',
  consentAgree: 'I agree',
  consentPolicy: 'Read the Privacy Policy',
  identityTitle: '### 🌈 Identity',
  identityIntro: '-# Pronouns, gender, orientation and origins. All optional. Pick up to 3 in each, or write your own words.',
  visibilityLine: (isPublic, cardPublic) =>
    `**👁️ Visibility**: ${isPublic ? '🌍 Shown on your public card' : '🔒 Private, only you can see it'}` +
    (isPublic && !cardPublic ? '\n-# Your card is private right now, so nobody else sees it anyway.' : ''),
  makePublic: 'Show on my card',
  makePrivate: 'Make private',
  publicWarning:
    '### 🌍 Show your identity?\nThis will be visible to everyone on the server. You can change it anytime.\n-# Only if your card is public too.',
  publicConfirm: 'Show it',
  keepPrivate: 'Keep private',
  fieldLine: {
    pronouns: (names) => `**🏷️ Pronouns**: ${names.length ? names.join(', ') : 'None'}`,
    gender: (names) => `**🌈 Gender**: ${names.length ? names.join(', ') : 'None'}`,
    orientation: (names) => `**💞 Orientation**: ${names.length ? names.join(', ') : 'None'}`,
    origins: (names) => `**🌍 Origins**: ${names.length ? names.join(', ') : 'None'}\n-# Up to 3. Pick a region, then your countries. Never a city.`,
  },
  fieldPlaceholder: {
    pronouns: 'Your pronouns',
    gender: 'Your gender',
    orientation: 'Your orientation',
  },
  ownWords: 'My own words...',
  ownForm: {
    pronouns: { title: 'Your pronouns', label: 'In your own words (30 characters)', placeholder: 'xe/xem' },
    gender: { title: 'Your gender', label: 'In your own words (30 characters)', placeholder: 'Your own words' },
    orientation: { title: 'Your orientation', label: 'In your own words (30 characters)', placeholder: 'Your own words' },
    origins: { title: 'Your origins', label: 'A heritage in your own words (30 characters)', placeholder: 'Kurdish, Romani, Mapuche...' },
  },
  originRegionPlaceholder: 'Pick a region for your origins',
  originPlaceholder: (region) => `Your origins: ${region}`,
  originOwn: 'My own words',
  originClear: 'Clear origins',
  tooMany: '-# ⚠️ You can choose up to 3 in each list. Remove one before adding another.',
  identityClear: 'Clear all',
  withdraw: 'Withdraw consent',
  withdrawWarning:
    '### 🧹 Withdraw your consent?\nAll your identity answers will be erased at once, and this page will ask for your consent again next time.',
  withdrawConfirm: 'Withdraw and erase',
  cancel: 'Cancel',
  withdrawn: '### 🧹 Consent withdrawn\nYour identity answers have been erased. 💜',
  identityRules: '-# Be yourself, kindly. Mocking anyone for who they are breaks the rules, and every card can be reported.',
  rules: '-# Keep it kind: no hate, no NSFW, no personal details like your address. Every card can be reported.',
};
