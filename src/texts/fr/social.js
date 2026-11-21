// social (fr): translations of en/social.js, same shape. Missing keys fall back to English.

export const compareTexts = {
  title: '### 🤝 Compatibilité',
  score: (pct) => `## ${pct} %`,
  alike: '**Pareils :**',
  opposite: '**Opposés :**',
  none: 'aucun',
  footer: '-# Une estimation pour le plaisir basée sur vos cinq traits, jamais un verdict.',
  notAligned:
    "### 🌌 Les étoiles ne peuvent pas s'aligner...\n" +
    'Les deux voyageur·ses doivent révéler leur classe pour être comparé·es.\n' +
    '-# Une carte peut devenir publique avec 🔒 Confidentialité dans `/auracle`.',
  self: '### 🪞 Une entente parfaite\nTe comparer à toi-même ? Une entente parfaite, je suppose.',
  duos: {
    'dreamers+dreamers': "Deux Rêveurs ensemble ? Des discussions profondes jusqu'à 3 h du matin... mais personne ne sait ce qu'on mange ce soir.",
    'dreamers+scholars': "Le cœur et la tête : l'un ressent tout, l'autre analyse tout. Ensemble, vous pourriez réparer le monde... après un long débat.",
    'dreamers+guardians': "Le rêveur et le gardien : l'un imagine le château, l'autre le construit vraiment.",
    'dreamers+wanderers': "Émotions et aventure : l'un écrit l'histoire, l'autre la vit... en général sans carte.",
    'scholars+scholars': 'Deux Érudits ensemble ? Des théories brillantes, des débats sans fin... et personne ne pense à manger.',
    'scholars+guardians': "Le penseur et le gardien : l'un remet chaque règle en question, l'autre les a écrites.",
    'scholars+wanderers': "Plan contre instinct : l'un calcule chaque mouvement, l'autre a déjà sauté.",
    'guardians+guardians': 'Deux Gardiens ensemble ? Rien ne sera jamais en retard, perdu ou mal rangé. Jamais.',
    'guardians+wanderers': "L'ordre face au chaos : l'un prépare son sac pour tous les dangers possibles, l'autre a oublié le sien.",
    'wanderers+wanderers': 'Deux Vagabonds ensemble ? Des aventures inoubliables... et absolument aucun plan B.',
  },
};

export const guildsTexts = {
  title: (name) => `### 🏰 Le royaume de ${name}`,
  fallbackName: 'ce serveur',
  total: (n) => `-# ${n} ${n <= 1 ? 'carte publique' : 'cartes publiques'} dans ce royaume. Les cartes privées ne sont jamais comptées.`,
  empty: 'Pas encore de carte publique dans ce royaume... Sois le premier ou la première avec `/eveil` !',
};
