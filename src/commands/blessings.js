// 💌 Blessings: a short kind word left by a traveler on another traveler's card.
//   bl:open:<id>  the 💌 Bless button on someone else's card (opens the form)
//   bl:send:<id>  the form
//   bl:page       Customize > 💌 Blessings: read new blessings, accept, decline or block,
//                 choose up to 3 to show, remove one, stop receiving, unblock everyone.
// Nothing appears on a card until its owner accepts it. Auracle never sends DMs:
// new blessings are announced in /auracle and on the owner's private card.

import { ui } from '../core/ui.js';
import { blessingTexts as BL } from '../texts/en-blessings.js';
import { profileTexts } from '../texts/en-profile.js';
import { customizeTexts as C } from '../texts/en-customize.js';
import { CLASSES, GUILDS } from '../data/classes.js';
import { KIND_SOUL_GOAL } from '../data/badges.js';
import { earn } from '../core/badges.js';
import { cleanText, showText } from '../core/text.js';
import * as store from '../core/store.js';

const S = ui.ButtonStyle;
const TEXT_MAX = 100;
const NEW_SHOWN = 3; // new blessings listed at once (Discord limits the size of a message)

function userOf(interaction) {
  return interaction.member?.user ?? interaction.user;
}

function box(text) {
  return [ui.container(ui.COLORS.auracle, [ui.text(text)])];
}

function color(profile) {
  if (profile.accent != null) return profile.accent;
  return ui.COLORS[GUILDS[CLASSES[profile.type_code].guild].colorKey];
}

// The button placed on someone else's card, next to 🚩 Report.
export function blessButton(targetId) {
  return ui.button({ id: `bl:open:${targetId}`, label: BL.button, emoji: '💌', style: S.SECONDARY });
}

// Card lines for the blessings its owner chose to show.
export function blessingLines(blessings) {
  return blessings.map((b) => BL.cardLine(showText(b.text), b.author_id));
}

// Returns a text to show if this blessing cannot be sent, or null if it can.
// A blocked traveler sees the same message as "blessings closed", so they never know they were blocked.
async function refusal(env, authorId, targetId) {
  if (authorId === targetId) return BL.self;
  if (!(await store.getProfile(env, authorId))) return BL.noProfile;
  const target = await store.getProfile(env, targetId);
  if (!target || target.is_public !== 1) return BL.gone;
  if (target.blessings_off === 1 || (await store.isBlessingBlocked(env, targetId, authorId))) return BL.closed;
  if ((await store.blessingCount(env, authorId)) >= store.BLESSING_LIMIT) return BL.limit;
  return null;
}

function blessForm(targetId, value) {
  const input = {
    type: 4, custom_id: 'text', style: 2, label: BL.form.label, placeholder: BL.form.placeholder,
    min_length: 2, max_length: TEXT_MAX, required: true,
  };
  if (value) input.value = value;
  return { type: 9, data: { custom_id: `bl:send:${targetId}`, title: BL.form.title, components: [{ type: 1, components: [input] }] } };
}

function multiSelect(id, placeholder, options, max, min = 0) {
  return { type: 1, components: [{ type: 3, custom_id: id, placeholder, min_values: min, max_values: max, options }] };
}

function label(text) {
  return text.length > 100 ? `${text.slice(0, 99)}…` : text;
}

async function blessingsPage(env, profile, state = {}) {
  const all = await store.blessingsFor(env, profile.user_id);
  const fresh = all.filter((b) => b.status === 'new');
  const accepted = all.filter((b) => b.status === 'accepted');
  const blocked = await store.blockedCount(env, profile.user_id);
  const on = profile.blessings_off !== 1;

  const top = state.warning ? [ui.text(state.warning), ui.separator()] : state.text ? [ui.text(state.text), ui.separator()] : [];

  const newPart = [ui.text(BL.newTitle(fresh.length))];
  if (!fresh.length) newPart.push(ui.text(BL.noNew));
  for (const b of fresh.slice(0, NEW_SHOWN)) {
    newPart.push(
      ui.text(BL.newLine(showText(b.text), b.author_id)),
      ui.row(
        ui.button({ id: `bl:ok:${b.author_id}`, label: BL.accept, emoji: '✅', style: S.SUCCESS }),
        ui.button({ id: `bl:no:${b.author_id}`, label: BL.decline, emoji: '✖️', style: S.SECONDARY }),
        ui.button({ id: `bl:block:${b.author_id}`, label: BL.block, emoji: '🚫', style: S.DANGER }),
      ),
    );
  }
  if (fresh.length > NEW_SHOWN) newPart.push(ui.text(BL.more(fresh.length - NEW_SHOWN)));

  const acceptedPart = [ui.text(BL.acceptedTitle(accepted.length))];
  if (!accepted.length) {
    acceptedPart.push(ui.text(BL.noAccepted));
  } else {
    acceptedPart.push(ui.text(accepted.map((b) => BL.acceptedLine(showText(b.text), b.author_id, b.shown === 1)).join('\n')));
    const options = (shownOnly) => accepted.map((b) => ({
      label: label(b.text), value: b.author_id, emoji: { name: '💌' }, ...(shownOnly ? { default: b.shown === 1 } : {}),
    }));
    acceptedPart.push(
      multiSelect('bl:show', BL.showPlaceholder, options(true), Math.min(store.BLESSING_SHOW, accepted.length)),
      multiSelect('bl:remove', BL.removePlaceholder, options(false), 1, 1),
    );
  }

  return [
    ui.container(color(profile), [
      ...top,
      ui.text(`${BL.title}\n${BL.intro}`),
      ui.separator(),
      ...newPart,
      ui.separator(),
      ...acceptedPart,
      ui.separator(),
      ui.text(`${BL.settingsTitle}\n${BL.status(on, blocked)}\n${BL.rules}`),
      ui.row(
        ui.button({ id: 'bl:toggle', label: on ? BL.turnOff : BL.turnOn, emoji: on ? '🔕' : '🔔', style: S.SECONDARY }),
        ui.button({ id: 'bl:unblock', label: BL.unblock, emoji: '🔓', style: S.SECONDARY, disabled: !blocked }),
        ui.button({ id: 'cz:page:main', label: C.back, emoji: '◀️', style: S.SECONDARY }),
        ui.button({ id: 'hub:card', label: C.viewCard, emoji: '🪪', style: S.SECONDARY }),
      ),
    ]),
  ];
}

export async function blessingsComponent(interaction, env) {
  const userId = userOf(interaction).id;
  const [, action, arg] = interaction.data.custom_id.split(':');

  // 💌 Bless, on someone else's card: a new private message, so the public card stays as it is.
  if (action === 'open') {
    const blocked = await refusal(env, userId, arg);
    if (blocked) return ui.message(box(blocked));
    const previous = await store.getBlessing(env, arg, userId);
    return blessForm(arg, previous?.text);
  }

  const profile = await store.getProfile(env, userId);
  if (!profile) return ui.update([ui.container(ui.COLORS.auracle, [ui.text(profileTexts.notAwakenedSelf)])]);
  const page = async (state) => ui.update(await blessingsPage(env, profile, state));

  switch (action) {
    case 'ok': {
      const blessing = await store.getBlessing(env, userId, arg);
      if (!blessing || blessing.status !== 'new') return page();
      const accepted = (await store.blessingsFor(env, userId)).filter((b) => b.status === 'accepted').length;
      if (accepted >= store.BLESSING_KEEP) return page({ warning: BL.full });
      const n = await store.acceptBlessing(env, userId, arg);
      // 🕊️ Kind Soul, for the author: they will find it in their badges.
      if (n >= KIND_SOUL_GOAL) await earn(env, arg, 'kindsoul');
      return page({ text: BL.saved });
    }
    case 'no':
      await store.removeBlessing(env, userId, arg);
      return page({ text: BL.saved });
    case 'block':
      await store.blockBlesser(env, userId, arg);
      return page({ text: BL.blocked });
    case 'show':
      await store.setBlessingsShown(env, userId, interaction.data.values ?? []);
      return page({ text: BL.saved });
    case 'remove':
      if (interaction.data.values?.[0]) await store.removeBlessing(env, userId, interaction.data.values[0]);
      return page({ text: BL.saved });
    case 'toggle': {
      const off = profile.blessings_off !== 1;
      await store.setBlessingsOff(env, userId, off);
      profile.blessings_off = off ? 1 : 0;
      return page({ text: BL.saved });
    }
    case 'unblock':
      await store.unblockAll(env, userId);
      return page({ text: BL.saved });
    default:
      return page();
  }
}

function findValue(components) {
  for (const c of components ?? []) {
    if (c.custom_id === 'text' && typeof c.value === 'string') return c.value;
    const inner = findValue(c.components ?? (c.component ? [c.component] : []));
    if (inner != null) return inner;
  }
  return null;
}

// The form: bl:send:<id>.
export async function blessingsModal(interaction, env) {
  const userId = userOf(interaction).id;
  const targetId = interaction.data.custom_id.split(':')[2];
  const blocked = await refusal(env, userId, targetId);
  if (blocked) return ui.message(box(blocked));

  const { text, error } = cleanText(findValue(interaction.data.components), TEXT_MAX);
  if (error) return ui.message(box(BL.noLinks));
  if (!text || text.length < 2) return ui.message(box(BL.empty));

  await store.saveBlessing(env, targetId, userId, text);
  return ui.message(box(BL.sent(targetId)));
}
