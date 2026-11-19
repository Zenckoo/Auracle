// /auracle: a menu with buttons for every feature, so nobody has to type commands.
// Each button opens its answer as a new message; the menu stays open.

import { ui } from '../core/ui.js';
import { hubTexts as H } from '../texts/en-hub.js';
import { helpCommand } from './help.js';
import { awakenCommand } from './awaken.js';
import { profileCommand } from './profile.js';
import { privacyCommand } from './privacy.js';
import { forgetCommand } from './forget.js';
import { updatesCommand } from './updates.js';
import { feedbackCommand } from './feedback.js';
import { compareCommand } from './compare.js';
import { guildsCommand } from './guilds.js';
import { codexCommand } from './codex.js';
import { codexTexts } from '../texts/en-codex.js';
import { serverTexts } from '../texts/en-server.js';
import { serverCommand } from './server.js';
import { isStaff } from '../core/roles.js';
import { customizeCommand } from './customize.js';
import { customizeTexts } from '../texts/en-customize.js';

const S = ui.ButtonStyle;

function userSelect(id, placeholder) {
  return { type: 1, components: [{ type: 5, custom_id: id, placeholder, min_values: 1, max_values: 1 }] };
}

export function hubCommand(interaction) {
  // ⚙️ Server settings only shows for staff (people who can manage the server).
  const staffRow =
    interaction?.guild_id && isStaff(interaction)
      ? [ui.row(ui.button({ id: 'hub:server', label: serverTexts.hubButton, emoji: '⚙️', style: S.SECONDARY }))]
      : [];
  return ui.message([
    ui.container(ui.COLORS.auracle, [
      ui.text(`${H.title}\n${H.body}`),
      ui.separator(),
      ui.row(
        ui.button({ id: 'hub:awaken', label: H.awaken, emoji: '✨', style: S.PRIMARY }),
        ui.button({ id: 'hub:card', label: H.card, emoji: '🪪', style: S.PRIMARY }),
        ui.button({ id: 'hub:customize', label: customizeTexts.hubButton, emoji: '🎨', style: S.PRIMARY }),
        ui.button({ id: 'hub:guilds', label: H.guilds, emoji: '🏰', style: S.SECONDARY }),
        ui.button({ id: 'hub:privacy', label: H.privacy, emoji: '🔒', style: S.SECONDARY }),
      ),
      ui.row(
        ui.button({ id: 'hub:updates', label: H.updates, emoji: '📜', style: S.SECONDARY }),
        ui.button({ id: 'hub:feedback', label: H.feedback, emoji: '📬', style: S.SECONDARY }),
        ui.button({ id: 'hub:help', label: H.help, emoji: '❔', style: S.SECONDARY }),
        ui.button({ id: 'hub:codex', label: codexTexts.hubButton, emoji: '📖', style: S.SECONDARY }),
        ui.button({ id: 'hub:forget', label: H.forget, emoji: '🧹', style: S.DANGER }),
      ),
      userSelect('hub:view', H.viewPlaceholder),
      userSelect('hub:compare', H.comparePlaceholder),
      ...staffRow,
    ]),
  ]);
}

function withMember(interaction) {
  const targetId = interaction.data.values?.[0];
  return { ...interaction, data: { ...interaction.data, options: [{ name: 'member', type: 6, value: targetId }] } };
}

export async function hubComponent(interaction, env, later) {
  const action = interaction.data.custom_id.split(':')[1];
  const asCommand = { ...interaction, data: { ...interaction.data, options: undefined } };

  switch (action) {
    case 'awaken':
      return awakenCommand(asCommand, env, later);
    case 'card':
      return profileCommand(asCommand, env, later);
    case 'customize':
      return customizeCommand(asCommand, env, later);
    case 'guilds':
      return guildsCommand(asCommand, env, later);
    case 'privacy':
      return privacyCommand(asCommand, env, later);
    case 'updates':
      return updatesCommand(asCommand, env, later);
    case 'feedback':
      return feedbackCommand(asCommand, env, later);
    case 'help':
      return helpCommand(asCommand, env, later);
    case 'codex':
      return codexCommand(asCommand, env, later);
    case 'forget':
      return forgetCommand(asCommand, env, later);
    case 'view':
      return profileCommand(withMember(interaction), env, later);
    case 'compare':
      return compareCommand(withMember(interaction), env, later);
    case 'server':
      return serverCommand(asCommand, env, later);
    default:
      return hubCommand(interaction);
  }
}
