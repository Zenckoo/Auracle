// names (fr): facet and badge names. Facets follow Thiry & Piolti (2023), with a few easier words.

export const facets = {
  N: ['Anxiété', 'Colère', 'Dépression', 'Timidité', 'Immodération', 'Vulnérabilité'],
  E: ['Sympathie', 'Sociabilité', 'Assertivité', 'Activité', 'Recherche de sensations', 'Enthousiasme'],
  O: ['Imagination', "Intérêt pour l'art", 'Émotivité', "Goût de l'aventure", 'Intellect', 'Progressisme'],
  A: ['Confiance', 'Moralité', 'Altruisme', 'Coopération', 'Modestie', 'Compassion'],
  C: ['Auto-efficacité', 'Ordre', 'Sens du devoir', 'Recherche de succès', 'Autodiscipline', 'Prudence'],
};

export const badges = {
  early: { name: 'Voyageur·se des débuts', hint: "Passer l'épreuve pendant la bêta publique" },
  grand: { name: 'Grande Épreuve', hint: 'Terminer la Grande Épreuve (300 questions)' },
  kindred: { name: 'Âmes sœurs', hint: 'Te comparer à d\'autres voyageur·ses 5 fois' },
  messenger: { name: 'Messager', hint: 'Envoyer ton premier 📬 Avis' },
  lorekeeper: { name: 'Gardien du savoir', hint: 'Ouvrir toutes les pages du 📖 Codex' },
  painter: { name: 'Apprenti peintre', hint: 'Personnaliser ta carte pour la première fois' },
  kindsoul: { name: 'Âme bienveillante', hint: 'Voir 3 de tes 💌 Bénédictions acceptées par d\'autres voyageur·ses' },
};
