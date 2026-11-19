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
  rules: '-# Keep it kind: no hate, no NSFW, no personal details like your address. Every card can be reported.',
};
