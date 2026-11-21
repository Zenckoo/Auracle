// privacy (fr): translations of en/privacy.js, same shape. Missing keys fall back to English.

export const privacyTexts = {
  title: '### 🔒 Tes secrets, ton choix, voyageur·se.',
  current: (isPublic) => `Carte de profil : **${isPublic ? '🌍 Publique' : '🔒 Privée'}**`,
  explain: '-# Les cartes publiques sont visibles par tout le monde avec /profile. Tes facettes restent toujours privées.',
  public: 'Publique',
  private: 'Privée',
  sealed: '### ✨ Ton choix est scellé.',
  roleLine: (wear) => `Rôle de guilde : **${wear ? '🏰 Porté' : '🚫 Pas porté'}**`,
  wear: 'Le porter',
  noWear: 'Ne pas le porter',
  roleNote: '-# Seulement sur les serveurs où le staff a activé les rôles de guilde, et seulement quand ta carte est publique.',
  a11yLine: (on) => `**♿ Mode accessibilité** : ${on ? 'Activé' : 'Désactivé'}\n-# Des messages plus simples pour les lecteurs d'écran : des mots au lieu des barres, pas d'emojis décoratifs, pas de petit texte. Rien que pour toi.`,
  a11yOn: 'Activer',
  a11yOff: 'Désactiver',
  dataLine: '**📦 Tes données**\n-# Reçois un fichier avec tout ce qu\'Auracle garde sur toi.',
  dataButton: 'Mes données',
  dataSending: "### 📦 Tes données arrivent\nAuracle t'envoie un fichier privé avec tout ce qu'il garde sur toi.",
  dataFile:
    "📦 Voici tout ce qu'Auracle garde sur toi, voyageur·se. Toi seul·e peux voir ce message.\n" +
    "-# Les messages d'Avis que tu as envoyés sont gardés dans un salon Discord privé et ne sont pas dans ce fichier. Pour les obtenir, écris à auracle.contact@gmail.com",
};

export const forgetTexts = {
  question:
    '### ⚠️ Tu es sûr·e, voyageur·se ?\n' +
    'Tes réponses, ta classe, ta carte et tout ce qu\'il y a dessus (personnalisation, badges, bannière), ainsi que les bénédictions que tu as écrites, disparaîtront pour toujours.',
  erase: 'Tout effacer',
  keep: 'Garder mon voyage',
  erased:
    '### 🌫️ Ton voyage a été effacé\n' +
    'Tes réponses, ta classe, ta carte et tes bénédictions ont disparu. Tu peux recommencer quand tu veux avec `/awaken`.',
  kept: 'Ton voyage reste le tien, voyageur·se. 💜',
  nothing: "### 🌫️ Rien à oublier\nTu n'as aucune donnée enregistrée, voyageur·se.",
};
