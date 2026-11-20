// The main English texts (Help, the trial, results). Other languages: fr/main.js and de/main.js, same shape.

export const CHANGE_LATER = '-# You can change this anytime with 🔒 Privacy in `/auracle`.';

export const texts = {
  common: {
    unknownCommand: 'This spell is not known yet, traveler.',
    links: { home: 'Website', privacy: 'Privacy Policy', terms: 'Terms of Service' },
  },

  help: {
    title: "### 📜 The Traveler's Guide",
    commandsTitle: '**Commands**',
    commands: [
      { name: '`/auracle`', description: 'Open the menu: everything is in there' },
      { name: '`/awaken`', description: 'Begin your trial and discover your class' },
      { name: '`/profile`', description: "View your profile card, or a traveler's with @member" },
      { name: '`/forget`', description: 'Erase all your data' },
    ],
    menuTitle: '**In the `/auracle` menu**',
    menu: [
      '✨ **Awaken**: begin your trial',
      '🪪 **My card**: view your profile card',
      '🎨 **Customize**: title, color, About me, tastes, identity, badges, blessings, banner, and the order of your card',
      '🏰 **Guilds**: how the guilds are spread across the server',
      '🔒 **Privacy**: choose what you share, and get a copy of your data',
      "📜 **Updates**: see what's new and what's coming",
      '📬 **Feedback**: report a bug or suggest an idea',
      '❔ **Help**: open this guide',
      '📖 **Codex**: how Auracle works, sources, and where to find support',
      '🧹 **Forget**: erase all your data',
      "🪪 / 🤝 The two menus below: view a traveler's card, or compare with them",
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
        "🌱 Auracle starts with this trial, but it's more than a test: " +
        'a social companion for Discord, inclusive, safe, and truly yours to customize.\n\n' +
        '🛠️ Auracle is in **public beta**: open to every server, and still growing. ' +
        'Spotted a bug or have an idea? Use **📬 Feedback** in `/auracle`. Lost? `/auracle` gathers everything, and the **📖 Codex** explains how it all works, with support resources if you ever need them.\n\n' +
        '-# Crafted with care by Zenckoo ✨',
      button: 'Continue',
    },

    disclaimer: {
      title: '### ⚠️ Before you begin',
      body:
        '🔮 **Not a diagnosis.** This trial is based on the Big Five, but your class and four-letter type are a fun estimate, not a label or an official assessment.\n\n' +
        '💡 **Trust your instinct.** Answer with your first thought. If a word is unclear, choose *In between*.\n\n' +
        '💾 **Your data.** Unfinished trials are erased after 30 days. Finished profiles are kept until you use `/forget`. Change what others see anytime with 🔒 Privacy in `/auracle`.\n\n' +
        "🤝 **Respect.** The rules of this server apply to Auracle too: no mocking, no discrimination, no using someone's results against them.\n\n" +
        "🤖 **Built with AI assistance.** Auracle embraces today's tools: parts of its code and texts are created with the help of **Claude**, an AI by Anthropic. Its art and illustrations, however, will always be made by human hands, never by AI.\n\n" +
        '🔞 **Discretion is advised.** If you are under 18, keep your results private and talk to a trusted adult if anything feels heavy.\n\n' +
        '-# You are always more than a test result. 💜',
      agree: "📜 By continuing, you agree to Auracle's **Terms of Service** and **Privacy Policy**.",
      button: 'I understand',
    },

    question: {
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
    },

    complete: {
      text: '### 🏰 Your journey is complete, traveler.\nWhat do you seek?',
      results: 'View my results',
      newTrial: 'Begin a new trial',
    },

    warning: {
      text: '### ⚠️ Beware, traveler!\nA new trial will replace your current class and results once you finish it. Until then, your card stays private.\n-# Your customization and badges are kept. Are you sure?',
      anew: 'Begin anew',
      keep: 'Keep my class',
      kept: 'Your class remains yours, traveler. 💜',
    },

    lost: 'Your trial could not be found, traveler. Use `/awaken` to begin again.',
  },

  results: {
    revealIntro: '*The mists part... your true nature is revealed.*',
    calmWaters: '🌊 Calm waters',
    restlessFlame: '🔥 Restless flame',
    closeLetter: (pair, alternate) => `-# Your ${pair} balance is close: you may feel like an ${alternate} some days.`,
    estimate: '-# Your type is an estimate based on your Big Five results.',
    seeTraits: 'See my traits',
    seeFacets: 'See facets',
    backToClass: 'Back to class',
    backToTraits: 'Traits',
    facetsLabel: 'Facets',
    traitsTitle: '### 📊 Your traits',
    higherThan: (pct) => `Higher than ${pct}% of travelers`,

    gentleWord:
      '🌙 **A quiet word, traveler.** Your answers suggest you may carry a lot of worry or heaviness lately. ' +
      'This is not a diagnosis, just a reflection of your answers. If it feels heavy, talking to someone you trust, ' +
      "or a professional, can really help. You don't have to carry it alone.",
    helpButton: 'Find a helpline',

    traitNames: { O: 'Openness', C: 'Conscientiousness', E: 'Extraversion', A: 'Agreeableness', N: 'Neuroticism' },
    traitEmojis: { O: '🎨', C: '📋', E: '🎉', A: '🤝', N: '🌪️' },
    traitPhrases: {
      O: {
        low: "Feet on the ground: you trust what works and don't chase every shiny new idea.",
        average: 'Curious but practical: new ideas are welcome, as long as they make sense.',
        high: 'Head in the stars: endless ideas, endless questions... and maybe too many unfinished projects.',
      },
      C: {
        low: 'Go with the flow: plans are more like suggestions... and deadlines, gentle rumors.',
        average: "Balanced adventurer: organized when it matters, flexible when it doesn't.",
        high: 'Master of order: lists, plans, and goals... you probably have a list of your lists.',
      },
      E: {
        low: 'Quiet flame: you recharge in calm and solitude... and canceled plans feel like a gift.',
        average: 'Social chameleon: happy at the party, just as happy at home with a good book.',
        high: 'Spark of the party: people give you energy... and silence makes you a little nervous.',
      },
      A: {
        low: "Honest blade: you say what you think and don't sugarcoat the truth... diplomacy is optional.",
        average: "Fair companion: kind when it counts, firm when it's needed.",
        high: 'Golden heart: you care deeply and always help others... even when you should say no.',
      },
      N: {
        low: 'Calm waters: you stay steady when storms come.',
        average: 'Changing tides: some storms shake you, but you always find your way back to shore.',
        high: 'Restless flame: you feel deeply and always push to grow.',
      },
    },

    privacy: {
      question:
        '### 🪪 Your profile card\n' +
        'Shall your class be known to all, or kept a secret?\n' +
        '-# Public cards can be seen by anyone with /profile. Your facets always stay private.',
      public: 'Public',
      private: 'Private',
      changeLater: CHANGE_LATER,
      nowPublic: `### 🌍 Your class is now known to all\n${CHANGE_LATER}`,
      nowPrivate: `### 🔒 Your class stays a secret\n${CHANGE_LATER}`,
    },
  },
};
