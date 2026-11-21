// The 4 guilds and 16 classes. Names and texts are Auracle's own (never 16Personalities' names).

import { localized } from '../core/i18n.js';
import * as fr from '../texts/fr/classes.js';
import * as de from '../texts/de/classes.js';

const EN_GUILDS = {
  dreamers: { name: 'The Dreamers', emoji: '🌙', colorKey: 'dreamers' },
  scholars: { name: 'The Scholars', emoji: '📚', colorKey: 'scholars' },
  guardians: { name: 'The Guardians', emoji: '🏰', colorKey: 'guardians' },
  wanderers: { name: 'The Wanderers', emoji: '🗺️', colorKey: 'wanderers' },
};

const EN_CLASSES = {
  INFP: { name: 'Bard', subtitle: 'the Peacemaker', emoji: '🎶', guild: 'dreamers',
    description: 'Like a Bard, you turn feelings into stories and seek harmony wherever you go. Kind, imaginative, and loyal to your values... and probably has 47 tabs open right now.' },
  ENFP: { name: 'Enchanter', subtitle: 'the Inspirer', emoji: '✨', guild: 'dreamers',
    description: 'Like an Enchanter, you bring magic and energy wherever you walk. You get excited about every new idea... while your to-do list quietly grows to 200 unfinished items.' },
  INFJ: { name: 'Seer', subtitle: 'the Idealist', emoji: '🔮', guild: 'dreamers',
    description: "Like a Seer, you read people before they speak and dream of a better world. Wise beyond your years... and secretly judging everyone's vibe." },
  ENFJ: { name: 'Paladin', subtitle: 'the Hero', emoji: '🛡️', guild: 'dreamers',
    description: 'Like a Paladin, you lead with your heart and lift everyone around you. A born mentor... who forgets to take care of themselves.' },

  INTP: { name: 'Sage', subtitle: 'the Analyst', emoji: '📜', guild: 'scholars',
    description: "Like a Sage, you seek the hidden logic behind everything. Endlessly curious and sharp-minded... and you've been 'about to reply' to that message for three days." },
  ENTP: { name: 'Trickster', subtitle: 'the Challenger', emoji: '🃏', guild: 'scholars',
    description: "Like a Trickster, you twist ideas, test limits, and love a good debate. Clever and quick... and you'll argue the opposite side just for fun." },
  INTJ: { name: 'Archmage', subtitle: 'the Strategist', emoji: '🌌', guild: 'scholars',
    description: 'Like an Archmage, you see ten moves ahead and build plans that span years. Brilliant and independent... and you already have a backup plan for your backup plan.' },
  ENTJ: { name: 'Battlemage', subtitle: 'the Leader', emoji: '⚔️', guild: 'scholars',
    description: "Like a Battlemage, you charge forward and lead the way to victory. Bold and decisive... and somehow you've taken charge of the group chat too." },

  ISTJ: { name: 'Monk', subtitle: 'the Organizer', emoji: '🧘', guild: 'guardians',
    description: "Like a Monk, you live by discipline and keep everything in perfect order. Calm, patient, and reliable to the bone... and your morning routine hasn't changed in five years." },
  ESTJ: { name: 'Knight', subtitle: 'the Pillar', emoji: '🐴', guild: 'guardians',
    description: 'Like a Knight, you hold the line with honor and keep everyone moving forward. Strong, steady, and dependable... and yes, you do have a spreadsheet for that.' },
  ISFJ: { name: 'Cleric', subtitle: 'the Protector', emoji: '🕯️', guild: 'guardians',
    description: "Like a Cleric, you heal, support, and quietly protect those you love. Warm and devoted... and you remember everyone's birthday except your own." },
  ESFJ: { name: 'Shaman', subtitle: 'the Host', emoji: '🪶', guild: 'guardians',
    description: 'Like a Shaman, you are the heart of the tribe, weaving bonds between everyone around the fire. Caring and social... and you always know the latest gossip of the village.' },

  ISTP: { name: 'Artificer', subtitle: 'the Prodigy', emoji: '⚙️', guild: 'wanderers',
    description: "Like an Artificer, you master any tool and solve problems with calm, precise hands. Cool under pressure... and you'd rather fix it yourself than read the instructions." },
  ESTP: { name: 'Rogue', subtitle: 'the Daredevil', emoji: '🗝️', guild: 'wanderers',
    description: "Like a Rogue, you jump into action while others are still making plans. Bold, quick, and fearless... and 'what could go wrong?' is your favorite question." },
  ISFP: { name: 'Druid', subtitle: 'the Free Spirit', emoji: '🌿', guild: 'wanderers',
    description: "Like a Druid, you follow your heart and find beauty where others don't look. Gentle and artistic... and you'll vanish into nature the moment plans get too strict." },
  ESFP: { name: 'Jester', subtitle: 'the Life of the Party', emoji: '🎭', guild: 'wanderers',
    description: "Like a Jester, you light up every room and turn any moment into a celebration. Fun, warm, and spontaneous... and 'just one more song' is never just one." },
};

// Names and texts follow the server's language (texts/fr/classes.js, texts/de/classes.js).
export const GUILDS = localized({ en: EN_GUILDS, fr: fr.guilds, de: de.guilds });
export const CLASSES = localized({ en: EN_CLASSES, fr: fr.classes, de: de.classes });
