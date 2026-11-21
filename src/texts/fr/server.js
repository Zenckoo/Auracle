// server (fr): translations of en/server.js, same shape. Missing keys fall back to English.

export const serverTexts = {
  hubButton: 'Réglages du serveur',
  helpLine: '⚙️ **Réglages du serveur** : rôles de guilde et langue, pour le staff uniquement',
  title: '### ⚙️ Réglages du serveur',
  intro: '-# Seuls les membres qui peuvent gérer ce serveur voient ces réglages.',
  notStaff: '### 🔒 Staff uniquement\nSeuls les membres qui peuvent gérer ce serveur peuvent ouvrir ces réglages.',
  serverOnly: "### 🏰 Serveurs uniquement\nLes réglages du serveur ne s'ouvrent que dans un serveur.",

  languageTitle: '**🌍 Langue**',
  languageExplain: "-# La langue qu'Auracle parle sur ce serveur : menus, épreuve, cartes et Codex. Ce que les voyageur·ses écrivent eux-mêmes reste tel quel.",
  languageStatus: (name, auto) => `Langue : **${name}**${auto ? ' · automatique' : ''}`,
  languagePlaceholder: 'Choisir une langue',
  languageAuto: 'Automatique',
  languageAutoHint: 'Suit la langue de ton serveur sur Discord',
  languageSaved: (name) => `### 🌍 Auracle parle maintenant ${name} ici`,

  rolesTitle: '**🏰 Rôles de guilde**',
  rolesExplain:
    'Auracle peut créer les quatre rôles de guilde et donner à chaque voyageur·se le rôle de sa guilde.\n' +
    "-# Seuls les voyageur·ses avec une carte **publique** reçoivent un rôle, et ils peuvent choisir de ne pas le porter. Auracle ne touche jamais aux autres rôles.",
  status: (on) => `Rôles de guilde : **${on ? '🟢 Activés' : '⚪ Désactivés'}**`,
  enable: 'Activer',
  disable: 'Désactiver',

  enabled:
    '### 🏰 Les rôles de guilde sont activés\n' +
    "Les quatre rôles sont prêts. Les voyageur·ses avec une carte publique reçoivent leur rôle maintenant, et les autres le recevront la prochaine fois qu'ils utiliseront Auracle ici.\n" +
    "-# Tu peux renommer, recolorer ou déplacer les rôles : Auracle garde tes changements. Garde juste le rôle Auracle au-dessus d'eux.",
  disabled: '### ⚪ Les rôles de guilde sont désactivés\nAuracle a retiré ses quatre rôles de guilde de ce serveur.',
  missingPermission:
    "### 🔑 Auracle a besoin d'une permission\n" +
    "Pour créer et donner les rôles de guilde, Auracle a besoin de **Gérer les rôles**. Il ne s'en servira que pour ses quatre rôles de guilde.\n" +
    '-# Appuie sur le bouton ci-dessous et garde **Gérer les rôles** cochée. Puis reviens activer les rôles.',
  grantButton: 'Donner la permission',
  failed: "### ⚠️ Quelque chose s'est mal passé\nRéessaie dans un instant. Si ça continue, utilise 📬 Avis dans `/auracle`.",
};
