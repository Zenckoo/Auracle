// English texts for /codex: how Auracle works, with links to sources.

export const codexTexts = {
  title: '### 📖 The Codex',
  page: (n, total) => `Page ${n} / ${total}`,
  previous: 'Previous',
  next: 'Next',
  jump: 'Jump to a page',
  footer: '-# Questions or ideas? Share them with 📬 Feedback in `/auracle`.',
  helpEntry: { name: '`/codex`', description: 'How Auracle works, sources, and where to find support' },
  hubButton: 'Codex',
  pages: [
    {
      emoji: '🔮',
      name: 'What is Auracle?',
      body:
        'Auracle is a personality trial for Discord. You answer statements about yourself, and Auracle reveals your **five core traits**, your **30 facets**, and a **hero class** among 16, across four guilds.\n\n' +
        'It is made to help you know yourself a little better, compare with friends, and have fun together.\n\n' +
        '⚠️ **Not a diagnosis.** Auracle is not a psychological or medical assessment. Your class is a fun estimate, never a label.',
      links: [],
    },
    {
      emoji: '🌙',
      name: 'If things feel heavy',
      body:
        'A personality trial can stir up feelings, and life can feel heavy sometimes. You are not alone, and asking for help is a sign of strength.\n\n' +
        '💬 Talking to someone you trust, or to a professional, can really help.\n' +
        '📞 **Find a Helpline** lists free and confidential lines in your country, by phone, text or chat.\n' +
        '🤝 **Befrienders Worldwide** offers emotional support to anyone in distress.\n\n' +
        '🚨 **If you are in danger right now, call your local emergency number.**\n\n' +
        'If you are under 18, keep your results private and talk to a trusted adult if anything worries you. 💜',
      links: [
        { label: 'Find a Helpline', url: 'https://findahelpline.com' },
        { label: 'Befrienders Worldwide', url: 'https://www.befrienders.org' },
      ],
    },
    {
      emoji: '🏳️‍🌈',
      name: 'LGBTQ+ support',
      body:
        'Whoever you are and whoever you love, you are valid, and you deserve to feel safe. 💜\n\n' +
        'If you are questioning, coming out, or going through a hard time, these places can help:\n' +
        '🌈 **TrevorSpace**: a safe online community for LGBTQ+ young people aged 13 to 24, all around the world\n' +
        '📞 **Switchboard International**: a list of LGBTQ+ support lines in many countries\n' +
        '🏳️‍⚧️ **Trans Lifeline**: resources for trans people, in many countries\n\n' +
        '-# Only share what you want, with whom you want. Your story belongs to you.',
      links: [
        { label: 'TrevorSpace', url: 'https://www.trevorspace.org' },
        { label: 'Switchboard International', url: 'https://international.switchboard.lgbt/' },
        { label: 'Trans Lifeline', url: 'https://translifeline.org/resource_category/international/' },
      ],
    },
    {
      emoji: '🌈',
      name: 'Everyone belongs here',
      body:
        'Your personality is about how you tend to think, feel and act. It has nothing to do with your gender, who you love, your skin, your faith, your body, your age or where you come from. The trial never asks about any of these, and they never change your results. If one day you add something about yourself to your card, it will always be your choice, and only yours.\n\n' +
        'No class, no guild and no score is better than another. Being quiet, sensitive or messy is not a flaw: it is a way of being.\n\n' +
        '🚫 **Auracle must never be used to judge, mock or exclude anyone.** Treating someone unfairly because of who they are is discrimination, and it has no place here.\n\n' +
        '🛡️ If someone targets you on Discord, you can block them, tell the moderators of your server, and report it to Discord.',
      links: [
        { label: 'How to report on Discord', url: 'https://discord.com/safety/360044103651-reporting-abusive-behavior-to-discord' },
        { label: 'Discord rules on hate', url: 'https://discord.com/safety/hateful-conduct-policy-explainer' },
      ],
    },
    {
      emoji: '🔒',
      name: 'Your data',
      body:
        'Auracle only keeps what it needs:\n' +
        '- Your answers and results, until you use `/forget`\n' +
        '- Unfinished trials, erased 30 days after your last answer\n' +
        '- Which server you used Auracle on, only for 🏰 Guilds\n\n' +
        'Your card and your hidden secret are **private by default**. Your facets are never shown to others. `/forget` erases everything, anytime.',
      links: [],
    },
    {
      emoji: '🌱',
      name: 'Understanding your results',
      body:
        'Your results are a snapshot, not a sentence. Personality slowly changes through life, and your mood on the day can shape your answers too.\n\n' +
        '📉 **A low score is never a flaw.** Low Extraversion means you recharge in calm, not that you are worse with people. Every level of every trait has its own strengths.\n\n' +
        '🔁 **You can take the trial again** anytime with `/awaken`. If your new class feels different, that is part of the journey.\n\n' +
        '🪞 **You know yourself best.** If something does not sound like you, trust yourself over the trial.\n\n' +
        '-# Your class is a fun way to talk about who you are, never a box to stay in.',
      links: [],
    },
    {
      emoji: '🧠',
      name: 'The Big Five',
      body:
        'The **Big Five** is one of the most studied models of personality in psychology. It describes people with five broad traits, each from low to high:\n\n' +
        '🎨 **Openness**: curiosity, imagination, love of new ideas\n' +
        '📋 **Conscientiousness**: organization, discipline, reliability\n' +
        '🎉 **Extraversion**: energy drawn from people and action\n' +
        '🤝 **Agreeableness**: kindness, trust, cooperation\n' +
        '🌪️ **Neuroticism**: how strongly you feel stress and emotions\n\n' +
        'No trait is good or bad: each one comes with its strengths and its little quirks.',
      links: [{ label: 'Big Five on Wikipedia', url: 'https://en.wikipedia.org/wiki/Big_Five_personality_traits' }],
    },
    {
      emoji: '🧭',
      name: 'Your class and four letters',
      body:
        'Your four letters are estimated from your Big Five results:\n\n' +
        '**E / I** come from Extraversion\n' +
        '**N / S** come from Openness\n' +
        '**F / T** come from Agreeableness\n' +
        '**J / P** come from Conscientiousness\n\n' +
        'Each letter depends on whether you score above or below the middle of the reference group. When you are close to the middle, Auracle tells you that you may feel like the other letter some days.\n\n' +
        'Neuroticism does not change your letters: it adds 🌊 Calm waters or 🔥 Restless flame to your card.\n\n' +
        "-# These letters are Auracle's own estimate, not an official type from any commercial test.",
      links: [],
    },
    {
      emoji: '🏰',
      name: 'The four guilds',
      body: null, // Built from the class list, so it always matches the bot.
      links: [],
    },
    {
      emoji: '📊',
      name: 'Percentiles and facets',
      body:
        '"Higher than X% of travelers" compares your scores with a reference group of about 3,000 people who took the IPIP-NEO-120 online (JobCannon, 2026, shared under the CC BY 4.0 license). It is not a sample of the whole population, so see it as a friendly comparison.\n\n' +
        'Each trait is split into **6 facets**, 30 in total, for a finer picture. 🗝️ **Hidden secrets** are the facets that stand out the most from their own trait.\n\n' +
        'Once enough travelers have taken the trial, Auracle will compare you with its own community.',
      links: [{ label: 'Reference data', url: 'https://jobcannon.io/research/ipip-neo-120' }],
    },
    {
      emoji: '📜',
      name: 'The trials',
      body:
        'Both trials use statements from the **International Personality Item Pool (IPIP)**, a free, public domain collection of personality items kept by the Oregon Research Institute.\n\n' +
        '📜 **Standard Trial**: the IPIP-NEO-120, 120 statements, 4 per facet (Johnson, 2014).\n' +
        '📚 **Grand Trial**: the IPIP-NEO-300, 300 statements, 10 per facet (Goldberg, 1999).\n\n' +
        'Auracle keeps the statements as published, except two statements about voting, reworded so they make sense in every country.',
      links: [
        { label: 'IPIP official site', url: 'https://ipip.ori.org/' },
        { label: 'Johnson (2014) study', url: 'https://doi.org/10.1016/j.jrp.2014.05.003' },
      ],
    },
    {
      emoji: '🤖',
      name: 'Auracle and AI',
      body:
        '*A few words from Zenckoo:*\n\n' +
        'Every new technology raised the same doubts at first. I believe we have to live with our time: AI is a useful tool, worth exploring. It lets me build ideas I could never build alone, and Auracle is one of them.\n\n' +
        'But a tool should help people, not replace them, especially in art and audiovisual work. UNESCO\'s Recommendation on the Ethics of AI, adopted by 193 countries, agrees: AI must never *"displace ultimate human responsibility."* It also asks for transparency, and for everyone to understand AI. That is why this page exists.\n\n' +
        '🛠️ **In Auracle:** AI helps with code and texts, always checked by me. The art will always be made by humans.\n' +
        '🔒 **Privacy:** your answers never go to an AI, and Auracle keeps only what it needs.\n' +
        '⚖️ **Fairness:** AI can carry bias. Your results come from a fixed formula based on public research, the same for everyone.\n\n' +
        '**💡 Use AI in a healthy way**\n' +
        '🧠 Think your idea through before asking.\n' +
        '🔍 Check what it says: it can be wrong.\n' +
        '🎯 Keep the final say.\n' +
        '🤝 It never replaces friends, artists or professionals.\n' +
        '🌱 Use it when it truly helps: AI uses a lot of energy.\n\n' +
        '-# Zenckoo 💜',
      links: [
        { label: 'UNESCO on AI ethics', url: 'https://www.unesco.org/en/artificial-intelligence/recommendation-ethics' },
        { label: 'AI and critical thinking', url: 'https://doi.org/10.1145/3706598.3713778' },
      ],
    },
    {
      emoji: '🛡️',
      name: 'For server staff',
      body:
        'Thinking of adding Auracle to your server? Here is what you should know:\n\n' +
        '⚙️ **What it does:** Auracle only answers its own commands. It never reads your channels, never sends messages on its own, and needs no admin or moderation permission.\n\n' +
        '👀 **What members see:** **Compare**, **Guilds** and public cards are posted in the channel. Everything else stays private to the member.\n\n' +
        '🔒 **What it keeps:** a member\'s answers and results, and which servers they used Auracle on (only for Guilds). Members can erase it all with `/forget`. Private cards are never shown to others or counted.\n\n' +
        '🚫 **What it is not:** a diagnosis, a moderation tool, or a way to sort, rank or select members. Please never use results to judge anyone.\n\n' +
        '💬 **A problem or a question?** Use 📬 Feedback in `/auracle`: messages go straight to Zenckoo.',
      links: [],
    },
    {
      emoji: '✨',
      name: 'About Auracle',
      body:
        'Auracle is crafted with care by **Zenckoo**, and still a work in progress.\n\n' +
        '🤖 Parts of its code and texts are created with the help of AI. Its art and illustrations will always be made by human hands, never by AI. More in **Auracle and AI**.\n\n' +
        "💡 Spotted a bug or have an idea? Use **📬 Feedback** in `/auracle`. Curious about what's coming? Check **📜 Updates**.",
      links: [],
    },
  ],
};
