// banner (fr): translations of en/banner.js, same shape. Missing keys fall back to English.
// The moderation messages go to Zenckoo's HQ channel, so they stay in English.

export const bannerTexts = {
  page: 'Bannière',
  title: '### 🖼️ Bannière',
  intro: '-# Une image en haut de ta carte, comme sur Discord. Les GIF sont les bienvenus !',
  current: '**🖼️ Ta bannière**',
  none: '-# Pas encore de bannière.',
  rules:
    '**📏 Règles**\n' +
    "-# PNG, JPG, WebP ou GIF · au moins 600 × 200 pixels · 10 Mo max. Les images en largeur rendent mieux (environ 3 fois plus larges que hautes).\n" +
    "-# Chaque bannière est vérifiée automatiquement, et peut être retirée par la modération. Rien de choquant : pas de nudité, de gore, de haine ni rien de dangereux pour les plus jeunes. Seulement des images que tu as le droit d'utiliser.\n" +
    '-# ✂️ Déplacer et recadrer ta bannière arrivera avec le site web.',
  upload: 'Envoyer une bannière',
  change: 'Changer de bannière',
  remove: 'Retirer',
  form: { title: 'Ta bannière', label: 'Ton image', description: 'PNG, JPG, WebP ou GIF · au moins 600 × 200 pixels · 10 Mo max' },
  checking: '### ⏳ Vérification de ta bannière...\n-# Ça prend quelques secondes.',
  saved: '### ✨ Ta bannière est sur ta carte !',
  removed: '### 🧹 Ta bannière a été retirée.',
  badType: "### ⚠️ Mauvais type de fichier\nEnvoie une image PNG, JPG, WebP ou GIF, s'il te plaît.",
  tooBig: '### ⚠️ Trop lourde\nTon image dépasse 10 Mo. Essaie un fichier plus petit ou plus court.',
  tooSmall: (w, h) => `### ⚠️ Trop petite\nTon image fait ${w} × ${h} pixels. Il faut au moins 600 × 200 pixels pour qu'elle soit nette sur ta carte.`,
  refused: "### 🚫 Bannière refusée\nCette image ne semble pas adaptée à tout le monde, donc elle ne peut pas être affichée sur Auracle.\n-# Si tu penses que c'est une erreur, envoie un 📬 Avis.",
  failed: "### ⚠️ Quelque chose s'est mal passé\nTa bannière n'a pas pu être enregistrée. Réessaie dans un instant.",
  limit: "### ⏳ Trop d'envois\nTu peux envoyer jusqu'à 5 bannières toutes les 24 heures. Réessaie plus tard.",
  notReady: '### 🛠️ Presque prêt\nLes bannières sont en cours de préparation. Reviens bientôt !',
};
