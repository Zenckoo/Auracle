// All of Auracle's English texts live here, so other languages can be added later.

export const texts = {
  common: {
    unknownCommand: 'This spell is not known yet, traveler.',
  },

  help: {
    title: "### 📜 The Traveler's Guide",
    commands: [
      { name: '`/awaken`', description: 'Begin your trial and discover your class' },
      { name: '`/profile`', description: "View your profile card, or a traveler's with @member" },
      { name: '`/privacy`', description: 'Choose what you share with others' },
      { name: '`/forget`', description: 'Erase all your data' },
      { name: '`/updates`', description: "See what's new and what's coming" },
      { name: '`/feedback`', description: 'Report a bug or suggest an idea' },
      { name: '`/help`', description: 'Open this guide' },
    ],
    footer: '-# Your results are private unless you choose otherwise.',
  },

  awaken: {
    welcome: {
      title: '### ✨ A new soul wanders in...',
      body:
        'Welcome, traveler. I am **Auracle**, keeper of the old trials.\n\n' +
        'Answer my questions honestly, and I shall reveal the hero hidden within you.\n\n' +
        '*No right or wrong answers here, only you.*',
      button: 'Enter',
    },

    preamble: {
      title: '### 📖 About this journey',
      body:
        "Auracle reveals your personality through the **Big Five**, one of psychology's most trusted models. " +
        'Your answers uncover your five core traits, and with them, your **hero class**: one of 16, across four guilds.\n\n' +
        '🔒 Your results stay private unless you choose to share them.\n\n' +
        '🌱 For now, Auracle is a personality test with a profile card. But it dreams bigger: ' +
        'a social companion for Discord, inclusive, safe, and truly yours to customize.\n\n' +
        '🛠️ Still a work in progress, with Dye Casa as its first testing ground. ' +
        'Spotted a bug or have an idea? Use `/feedback`. Lost? `/help` shows every command.\n\n' +
        '-# Crafted with care by Zenckoo ✨',
      button: 'Continue',
    },

    disclaimer: {
      title: '### ⚠️ Before you begin',
      body:
        '🔮 **Not a diagnosis.** This trial is based on the Big Five, but your class and four-letter type are a fun estimate, not a label or an official assessment.\n\n' +
        '💡 **Trust your instinct.** Answer with your first thought. If a word is unclear, choose *In between*.\n\n' +
        '💾 **Your data.** Unfinished trials are erased after 30 days. Finished profiles are kept until you use `/forget`. Change what others see anytime with `/privacy`.\n\n' +
        "🤝 **Respect.** The rules of this server apply to Auracle too: no mocking, no discrimination, no using someone's results against them.\n\n" +
        "🤖 **Built with AI assistance.** Auracle embraces today's tools: parts of its code and texts are created with the help of AI. Its art and illustrations, however, will always be made by human hands, never by AI.\n\n" +
        '🔞 **Discretion is advised.** If you are under 18, keep your results private and talk to a trusted adult if anything feels heavy.\n\n' +
        '-# You are always more than a test result. 💜',
      button: 'I understand',
    },

    question: {
      versionName: 'Standard Trial',
      prompt: '-# How accurately does this describe you?',
      answers: ['Not me at all', 'Mostly not me', 'In between', 'Mostly me', 'Exactly me'],
      back: 'Back',
      pause: 'Pause',
      // Shown once, when reaching 25%, 50% and 75% (question index 30, 60, 90).
      milestones: {
        30: '-# 🌫️ The mists are clearing... keep going.',
        60: "-# 🌫️ Halfway there! I'm starting to see something interesting.",
        90: '-# 🌫️ Almost there. Your class is taking shape...',
      },
    },

    pause:
      '### ⏸️ Rest now, traveler\n' +
      "Your progress is kept for 30 days. Return with `/awaken` whenever you're ready.",

    resume: {
      text: (position, total) =>
        `### 🔮 Welcome back!\nYour trial awaits at question ${position} of ${total}. Shall we continue?`,
      resume: 'Resume',
      restart: 'Start over',
    },

    end: {
      text:
        '### 🔔 The trial is complete\n' +
        '*The final answer echoes through the halls...*\n' +
        'Now, let us see who you truly are.',
      button: 'Reveal my class',
      soon: '-# The reveal is still being forged... come back very soon, traveler.',
    },

    complete: {
      text: '### 🏰 Your journey is complete, traveler.\nWhat do you seek?',
      results: 'View my results',
      newTrial: 'Begin a new trial',
      soon: '-# Your results are still being forged... come back very soon, traveler.',
    },

    warning: {
      text: '### ⚠️ Beware, traveler!\nTaking a new trial will erase your current class forever. Are you sure?',
      anew: 'Begin anew',
      keep: 'Keep my class',
      kept: 'Your class remains yours, traveler. 💜',
    },

    lost: 'Your trial could not be found, traveler. Use `/awaken` to begin again.',
  },
};
