// Helpers to build Discord Components V2 messages.
// Only uses what Discord really supports: containers, sections, thumbnails, text, separators, buttons.

const FLAGS = {
  EPHEMERAL: 1 << 6,
  COMPONENTS_V2: 1 << 15,
};

const COLORS = {
  auracle: 0x4c6fff,
  dreamers: 0x9b87f5,
  scholars: 0x1fa67a,
  guardians: 0xe0a526,
  wanderers: 0xe0533d,
};

const ButtonStyle = { PRIMARY: 1, SECONDARY: 2, SUCCESS: 3, DANGER: 4, LINK: 5 };

export const ui = {
  FLAGS,
  COLORS,
  ButtonStyle,

  text(content) {
    return { type: 10, content };
  },

  separator(divider = true, spacing = 1) {
    return { type: 14, divider, spacing };
  },

  container(accentColor, components) {
    return { type: 17, accent_color: accentColor, components };
  },

  // Text on the left, a small image on the right.
  section(texts, imageUrl) {
    return {
      type: 9,
      components: texts.map((t) => ({ type: 10, content: t })),
      accessory: { type: 11, media: { url: imageUrl } },
    };
  },

  button({ id, label, emoji, style = ButtonStyle.PRIMARY, disabled = false }) {
    const b = { type: 2, style, label, custom_id: id };
    if (emoji) b.emoji = { name: emoji };
    if (disabled) b.disabled = true;
    return b;
  },

  linkButton({ url, label, emoji }) {
    const b = { type: 2, style: ButtonStyle.LINK, label, url };
    if (emoji) b.emoji = { name: emoji };
    return b;
  },

  row(...buttons) {
    return { type: 1, components: buttons };
  },

  // type 4 = reply to a slash command with a new message
  message(components, { ephemeral = true } = {}) {
    return {
      type: 4,
      data: {
        flags: FLAGS.COMPONENTS_V2 | (ephemeral ? FLAGS.EPHEMERAL : 0),
        components,
        allowed_mentions: { parse: [] }, // Never ping anyone, whatever a card says.
      },
    };
  },

  // type 7 = a button was clicked: replace the same message (no spam in the channel)
  update(components) {
    return {
      type: 7,
      data: {
        flags: FLAGS.COMPONENTS_V2,
        components,
        allowed_mentions: { parse: [] },
      },
    };
  },

  // A second message sent just after answering (for example the Public / Private choice).
  async followUp(interaction, components, { ephemeral = true } = {}) {
    await fetch(`https://discord.com/api/v10/webhooks/${interaction.application_id}/${interaction.token}`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        flags: FLAGS.COMPONENTS_V2 | (ephemeral ? FLAGS.EPHEMERAL : 0),
        components,
      }),
    });
  },

  // A private follow-up message with a file attached (for example the My data export).
  async followUpFile(interaction, content, filename, text) {
    const form = new FormData();
    form.append('payload_json', JSON.stringify({
      content,
      flags: FLAGS.EPHEMERAL,
      allowed_mentions: { parse: [] },
      attachments: [{ id: 0, filename }],
    }));
    form.append('files[0]', new Blob([text], { type: 'application/json' }), filename);
    await fetch(`https://discord.com/api/v10/webhooks/${interaction.application_id}/${interaction.token}`, {
      method: 'POST',
      body: form,
    });
  },
  // Replaces the message this interaction answered (used after a slow task, like checking a banner).
  async editOriginal(interaction, components) {
    await fetch(`https://discord.com/api/v10/webhooks/${interaction.application_id}/${interaction.token}/messages/@original`, {
      method: 'PATCH',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ components, allowed_mentions: { parse: [] } }),
    });
  },

  avatarUrl(user) {
    if (user?.avatar) return `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=256`;
    const index = Number((BigInt(user?.id ?? '0') >> 22n) % 6n);
    return `https://cdn.discordapp.com/embed/avatars/${index}.png`;
  },
};
