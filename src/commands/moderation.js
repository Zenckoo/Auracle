// Moderation buttons under each 🚩 Report, in the HQ moderation channel.
// Only the IDs in config.moderatorIds can use them. Buttons are named "md:clear:<field>:<user id>".

import { ui } from '../core/ui.js';
import { config } from '../config.js';
import { moderationTexts as M } from '../texts/en-moderation.js';
import * as store from '../core/store.js';
import { deleteBannerFile } from '../core/banners.js';

const S = ui.ButtonStyle;

export function moderationRow(targetId) {
  return ui.row(
    ui.button({ id: `md:clear:about:${targetId}`, label: M.clearAbout, emoji: '🧹', style: S.DANGER }),
    ui.button({ id: `md:clear:vibe:${targetId}`, label: M.clearVibe, emoji: '🧹', style: S.DANGER }),
    ui.button({ id: `md:clear:tastes:${targetId}`, label: M.clearTastes, emoji: '🧹', style: S.DANGER }),
    ui.button({ id: `md:clear:identity:${targetId}`, label: M.clearIdentity, emoji: '🧹', style: S.DANGER }),
    ui.button({ id: `md:clear:blessings:${targetId}`, label: M.clearBlessings, emoji: '🧹', style: S.DANGER }),
  );
}

function box(text) {
  return [ui.container(ui.COLORS.wanderers, [ui.text(text)])];
}

export async function moderationComponent(interaction, env) {
  const userId = interaction.member?.user?.id ?? interaction.user?.id;
  if (!config.moderatorIds.includes(userId)) return ui.message(box(M.notAllowed));

  const [, action, field, targetId] = interaction.data.custom_id.split(':');
  if (action !== 'clear' || !(field in M.what)) return ui.message(box(M.gone));

  const profile = await store.getProfile(env, targetId);
  if (!profile) return ui.message(box(M.gone));

  if (field === 'about') await store.setAbout(env, targetId, null);
  if (field === 'vibe') await store.setVibe(env, targetId, null);
  if (field === 'tastes') await store.setTastes(env, targetId, {});
  if (field === 'identity') await store.clearIdentity(env, targetId);
  if (field === 'blessings') await store.clearAcceptedBlessings(env, targetId);
  if (field === 'banner') {
    await deleteBannerFile(env, profile.banner);
    await store.setBanner(env, targetId, null);
  }
  return ui.message(box(M.done(M.what[field], targetId)));
}
