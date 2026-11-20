// English texts for the Codex (📖 Codex in /auracle, and the Codex page of the website).

export const codexTexts = {
  title: '### 📖 The Codex',
  page: (n, total) => `Page ${n} / ${total}`,
  previous: 'Previous',
  next: 'Next',
  jump: 'Jump to a page',
  footer: '-# Questions or ideas? Share them with 📬 Feedback in `/auracle`.',
  hubButton: 'Codex',
  pages: [
    {
      emoji: '🔮',
      name: 'What is Auracle?',
      body:
        'Auracle is a social companion for Discord. It starts with a personality trial: you answer statements about yourself, and Auracle reveals your **five core traits**, your **30 facets**, and a **hero class** among 16, across four guilds.\n\n' +
        "Then it's all about you and your community: compare with friends, see your server's guilds, and make your card truly yours.\n\n" +
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
        'Your personality is about how you tend to think, feel and act. It has nothing to do with your gender, who you love, your skin, your faith, your body, your age or where you come from. The trial never asks about any of these, and they never change your results. If you add something about yourself to your card, in 🎨 Customize > 🌈 Identity, it is always your choice, and only yours.\n\n' +
        'No class, no guild and no score is better than another. Being quiet, sensitive or messy is not a flaw: it is a way of being.\n\n' +
        '🚫 **Auracle must never be used to judge, mock or exclude anyone.** Treating someone unfairly because of who they are is discrimination, and it has no place here.\n\n' +
        '🛡️ If someone targets you on Discord, you can block them, tell the moderators of your server, and report it to Discord.',
      links: [
        { label: 'How to report on Discord', url: 'https://discord.com/safety/360044103651-reporting-abusive-behavior-to-discord' },
        { label: 'Discord rules on hate', url: 'https://discord.com/safety/hateful-conduct-policy-explainer' },
      ],
    },
    {
      emoji: '🏷️',
      name: 'Identity words',
      body:
        'In 🎨 Customize > 🌈 Identity, you can show your pronouns, gender, orientation and origins, only if you want. Here is what the words mean, simply. Everyone defines themselves: these are short guides, not boxes.\n\n' +
        '🏷️ **Pronouns**: the words people use to talk about you. *They/them* can be for one person. **Neopronouns** (like xe/xem) are newer ones. **Any pronouns**: all are fine. **Ask me**: just ask!\n\n' +
        '🌈 **Gender**\n' +
        '**Non-binary**: not only a woman or a man · **Transgender**: a gender different from the one given at birth · **Genderfluid**: a gender that changes over time · **Genderqueer**: outside the usual boxes · **Agender**: no gender · **Bigender**: two genders · **Demigirl / Demiboy**: partly a girl, or partly a boy · **Two-Spirit**: an identity and role from some Indigenous cultures of North America\n\n' +
        '💞 **Orientation**\n' +
        '**Bisexual**: attracted to more than one gender · **Pansexual**: attraction whatever the gender · **Queer**: a broad, open word · **Asexual**: little or no sexual attraction · **Demisexual**: attraction only after a strong bond · **Grey-asexual**: somewhere in between · **Aromantic**: little or no romantic attraction · **Biromantic, panromantic, homoromantic, demiromantic**: the same ideas, for romantic attraction\n\n' +
        '❓ **Questioning**: still exploring, and that is completely okay.\n\n' +
        '-# Never guess or label someone else: use the words people choose for themselves. 💜',
      links: [{ label: 'LGBTQ+ key terms', url: 'https://www.thetrevorproject.org/resources/guide/allyship-in-action/' }],
    },
    {
      emoji: '🔒',
      name: 'Your data',
      body:
        'Auracle only keeps what it needs:\n' +
        '- Your answers and results, until you use `/forget`\n' +
        '- Unfinished trials, erased 30 days after your last answer\n' +
        '- What you add to your card: customization, identity (only with your consent), badges, banner and blessings\n' +
        '- Which servers you used Auracle on, only for 🏰 Guilds and guild roles\n\n' +
        'Your card, your hidden secret and your identity are **private by default**. Your facets are never shown to others. A blessing appears only if its owner accepts it, and every banner is checked automatically for safety before it is saved.\n\n' +
        '`/forget` erases everything, anytime, and **📦 My data** in 🔒 Privacy sends you a copy of everything Auracle keeps.\n\n' +
        '-# Every detail is in the Privacy Policy.',
      links: [{ label: 'Privacy Policy', url: 'https://auracle-site.pages.dev/privacy' }],
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
        '"Higher than X% of travelers" compares your scores with reference groups. For your **5 traits**: 18,591 people who took the IPIP-NEO-300, aged 14 to 29, from a study by Twomey and Johnson (2022), with open tables free to reuse. For your **facets**: about 3,000 people who took the IPIP-NEO-120 online (JobCannon, 2026, CC BY 4.0). Different tests and groups can place you a little differently, so see it as a friendly comparison.\n\n' +
        'Each trait is split into **6 facets**, 30 in total, for a finer picture. 🗝️ **Hidden secrets** are the facets that stand out the most from their own trait.\n\n' +
        'Once enough travelers have taken the trial, Auracle will compare you with its own community.',
      links: [
        { label: 'Trait reference (study)', url: 'https://doi.org/10.1027/1015-5759/a000644' },
        { label: 'Facet reference', url: 'https://jobcannon.io/research/ipip-neo-120' },
      ],
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
        '🛠️ **In Auracle:** **Claude**, an AI by Anthropic, helps with code and texts, always checked by me. It never sees your data. The art will always be made by humans.\n' +
        '🔒 **Privacy:** your answers never go to an AI, and Auracle keeps only what it needs. Only banners are checked by an AI, for safety, on Cloudflare\'s own servers.\n' +
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
        '🏰 **Guild roles (optional):** staff can turn them on in ⚙️ Server settings, in `/auracle`. Auracle then creates the four guild roles and gives each member with a public card the role of their guild. For this only, it asks for **Manage Roles**, and it never touches any other role.\n\n' +
        '👀 **What members see:** **Compare**, **Guilds** and public cards are posted in the channel. Everything else stays private to the member.\n\n' +
        '🔒 **What it keeps:** a member\'s answers and results, and which servers they used Auracle on (only for Guilds and guild roles). Members can erase it all with `/forget`. Private cards are never shown to others or counted.\n\n' +
        '🚫 **What it is not:** a diagnosis, a moderation tool, or a way to sort, rank or select members. Please never use results to judge anyone.\n\n' +
        '💬 **A problem or a question?** Use 📬 Feedback in `/auracle`: messages go straight to Zenckoo.',
      links: [
        { label: 'Terms of Service', url: 'https://auracle-site.pages.dev/terms' },
        { label: 'Privacy Policy', url: 'https://auracle-site.pages.dev/privacy' },
      ],
    },
    {
      emoji: '✨',
      name: 'About Auracle',
      body:
        'Auracle is crafted with care by **Zenckoo**. It is in **public beta**: open to everyone, still growing, and shaped by your feedback.\n\n' +
        '🤖 Parts of its code and texts are created with the help of **Claude**, an AI by Anthropic. Its art and illustrations will always be made by human hands, never by AI. More in **Auracle and AI**.\n\n' +
        "💡 Spotted a bug or have an idea? Use **📬 Feedback** in `/auracle`. Curious about what's coming? Check **📜 Updates**.\n\n" +
        '🌐 Auracle has its own website: **auracle-site.pages.dev**\n\n' +
        '-# Crystal ball icon by Lorc, from game-icons.net, under the CC BY 3.0 license.\n' +
        '-# Auracle is not affiliated with Discord or Anthropic.',
      links: [
        { label: 'Website', url: 'https://auracle-site.pages.dev' },
        { label: 'Privacy Policy', url: 'https://auracle-site.pages.dev/privacy' },
        { label: 'Terms of Service', url: 'https://auracle-site.pages.dev/terms' },
      ],
    },
  ],
};
