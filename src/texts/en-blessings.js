// English texts for 💌 Blessings: kind words left on another traveler's card.

export const blessingTexts = {
  // On someone else's card
  button: 'Bless',
  form: {
    title: 'Leave a blessing',
    label: 'A kind word for this traveler (100 characters)',
    placeholder: 'Always there to welcome the newcomers 💜',
  },
  sent: (targetId) => `### 💌 Blessing sent!\nYour kind words are on their way to <@${targetId}>. They will appear on their card if they choose to show them.\n-# Writing a new blessing for this card replaces your previous one.`,
  self: '### 🪞 Your own card\nYou cannot bless your own card, traveler. But you deserve kind words too. 💜',
  noProfile: '### 🌫️ Not yet, traveler\nFinish your trial with `/awaken` before leaving blessings on other cards.',
  gone: '### 🌫️ Card not found\nThis card is private or no longer exists.',
  closed: '### 🔕 Blessings closed\nThis traveler is not receiving blessings right now.',
  limit: '### ⏳ So much kindness!\nYou can send up to 5 blessings every 24 hours. Please try again later.',
  noLinks: '### ⚠️ No links, please\nBlessings cannot contain links. Try again with kind words only.',
  empty: '### ⚠️ A little too short\nWrite at least a few words for your blessing.',

  // On the card
  cardLine: (text, authorId) => `💌 *${text}*\n-# from <@${authorId}>`,
  newOnCard: (n) => `-# 💌 ${n} new blessing${n > 1 ? 's' : ''} waiting in 🎨 Customize > 💌 Blessings`,
  hub: (n) => `### 💌 ${n} new blessing${n > 1 ? 's' : ''}!\n-# Kind words from other travelers. Open 🎨 Customize > 💌 Blessings to read them.`,

  // Customize > 💌 Blessings
  page: 'Blessings',
  title: '### 💌 Blessings',
  intro: '-# Kind words left on your card by other travelers. Nothing appears on your card until you accept it, and you choose up to 3 to show.',
  newTitle: (n) => `**✉️ New (${n})**`,
  newLine: (text, authorId) => `❝ *${text}* ❞\n-# from <@${authorId}>`,
  more: (n) => `-# And ${n} more after these.`,
  noNew: '-# No new blessing for now.',
  accept: 'Accept',
  decline: 'Decline',
  block: 'Block',
  acceptedTitle: (n) => `**💜 Accepted (${n})**`,
  acceptedLine: (text, authorId, shown) => `${shown ? '📌' : '💌'} *${text}* · <@${authorId}>`,
  noAccepted: '-# No accepted blessing yet.',
  showPlaceholder: 'Blessings shown on your card (3 max)',
  removePlaceholder: '🗑️ Remove a blessing',
  full: '### ⚠️ Your card is full of kindness\nYou can keep up to 10 accepted blessings. Remove one first.',
  settingsTitle: '**⚙️ Settings**',
  status: (on, blocked) => `Receiving blessings: **${on ? '🔔 On' : '🔕 Off'}**${blocked ? ` · 🚫 ${blocked} blocked` : ''}`,
  turnOff: 'Stop receiving',
  turnOn: 'Receive blessings',
  unblock: 'Unblock everyone',
  saved: '### ✨ Your blessings have been updated.',
  blocked: '### 🚫 Blocked\nThis traveler can no longer send you blessings. You can undo this with Unblock everyone.',
  rules: '-# 💜 Blessings follow the rules of the server and Auracle\'s Terms of Service. Spotted a mean one on someone\'s card? Use 🚩 Report.',
};
