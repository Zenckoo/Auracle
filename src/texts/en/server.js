// English texts for ⚙️ Server settings (staff only), in the /auracle menu.

export const serverTexts = {
  hubButton: 'Server settings',
  helpLine: '⚙️ **Server settings**: guild roles, for server staff only',
  title: '### ⚙️ Server settings',
  intro: '-# Only members who can manage this server see these settings.',
  notStaff: '### 🔒 Staff only\nOnly members who can manage this server can open these settings.',
  serverOnly: '### 🏰 Servers only\nServer settings can only be opened inside a server.',

  languageTitle: '**🌍 Language**',
  languageExplain: '-# The language Auracle speaks on this server: menus, trial, cards and Codex. What travelers write themselves stays as they wrote it.',
  languageStatus: (name, auto) => `Language: **${name}**${auto ? ' · automatic' : ''}`,
  languagePlaceholder: 'Choose a language',
  languageAuto: 'Automatic',
  languageAutoHint: 'Follows the language of your server on Discord',
  languageSaved: (name) => `### 🌍 Auracle now speaks ${name} here`,

  rolesTitle: '**🏰 Guild roles**',
  rolesExplain:
    'Auracle can create the four guild roles and give each traveler the role of their guild.\n' +
    '-# Only travelers with a **public** card get a role, and they can choose not to wear it. Auracle never touches any other role.',
  status: (on) => `Guild roles: **${on ? '🟢 On' : '⚪ Off'}**`,
  enable: 'Turn on',
  disable: 'Turn off',

  enabled:
    '### 🏰 Guild roles are on\n' +
    'The four roles are ready. Travelers with a public card are getting their role now, and the others get theirs the next time they use Auracle here.\n' +
    '-# You can rename, recolor or move the roles: Auracle keeps your changes. Just keep the Auracle role above them.',
  disabled: '### ⚪ Guild roles are off\nAuracle removed its four guild roles from this server.',
  missingPermission:
    '### 🔑 Auracle needs one permission\n' +
    'To create and give the guild roles, Auracle needs **Manage Roles**. It will only ever use it for its four guild roles.\n' +
    '-# Tap the button below and keep **Manage Roles** checked. Then come back and turn the roles on.',
  grantButton: 'Give the permission',
  failed: '### ⚠️ Something went wrong\nPlease try again in a moment. If it keeps failing, use 📬 Feedback in `/auracle`.',
};
