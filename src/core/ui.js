// Helpers to build Discord Components V2 messages.
// Only uses what Discord really supports: containers, text, separators, buttons.

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

const ButtonStyle = { PRIMARY: 1, SECONDARY: 2, SUCCESS: 3, DANGER: 4 };

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

  button({ id, label, emoji, style = ButtonStyle.PRIMARY }) {
    const b = { type: 2, style, label, custom_id: id };
    if (emoji) b.emoji = { name: emoji };
    return b;
  },

  row(...buttons) {
    return { type: 1, components: buttons };
  },

  // type 4 = reply to the command with a new message
  message(components, { ephemeral = true } = {}) {
    return {
      type: 4,
      data: {
        flags: FLAGS.COMPONENTS_V2 | (ephemeral ? FLAGS.EPHEMERAL : 0),
        components,
      },
    };
  },
};
