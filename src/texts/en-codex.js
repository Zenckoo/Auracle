// English texts for /codex: how Auracle works, with links to sources.

export const codexTexts = {
  title: '### 📖 The Codex',
  page: (n, total) => `Page ${n} / ${total}`,
  previous: 'Previous',
  next: 'Next',
  jump: 'Jump to a page',
  footer: '-# Questions or ideas? Share them with `/feedback`.',
  helpEntry: { name: '`/codex`', description: 'How Auracle works, with sources and links' },
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
      emoji: '🔒',
      name: 'Your data',
      body:
        'Auracle only keeps what it needs:\n' +
        '- Your answers and results, until you use `/forget`\n' +
        '- Unfinished trials, erased 30 days after your last answer\n' +
        '- Which server you used Auracle on, only for `/guilds`\n\n' +
        'Your card and your hidden secret are **private by default**. Your facets are never shown to others. `/forget` erases everything, anytime.',
      links: [],
    },
    {
      emoji: '🌙',
      name: 'If things feel heavy',
      body:
        'A personality trial can stir up feelings. If your answers or your results feel heavy, you are not alone: talking to someone you trust, or to a professional, can really help.\n\n' +
        'If you are under 18, keep your results private and talk to a trusted adult if anything worries you. 💜',
      links: [{ label: 'Find a helpline', url: 'https://findahelpline.com' }],
    },
    {
      emoji: '✨',
      name: 'About Auracle',
      body:
        'Auracle is crafted with care by **Zenckoo**, and still a work in progress.\n\n' +
        '🤖 Parts of its code and texts are created with the help of AI. Its art and illustrations will always be made by human hands, never by AI.\n\n' +
        "💡 Spotted a bug or have an idea? Use `/feedback`. Curious about what's coming? Try `/updates`.",
      links: [],
    },
  ],
};
