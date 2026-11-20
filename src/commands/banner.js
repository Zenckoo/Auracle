// 🖼️ Banner: Customize > 🖼️ Banner. The traveler uploads an image, shown on top of their card.
//   bn:page    the page        bn:upload  opens the upload form        bn:remove  removes the banner
//   bn:file    the upload form
// Each new banner is checked automatically (core/banners.js) and a copy goes to the HQ moderation
// channel, with a 🧹 Remove banner button (moderation after the fact, plus 🚩 Report on every card).

import { ui } from '../core/ui.js';
import { config, BANNER_BASE } from '../config.js';
import { bannerTexts as BN } from '../texts/banner.js';
import { customizeTexts as C } from '../texts/customize.js';
import { profileTexts } from '../texts/profile.js';
import { CLASSES, GUILDS } from '../data/classes.js';
import { bannerUrl, bannerGallery, bannerProblem, checkBanner, storeBanner, deleteBannerFile } from '../core/banners.js';
import { earn, announce } from '../core/badges.js';
import * as store from '../core/store.js';

const S = ui.ButtonStyle;
const LIMIT = 5;
const API = 'https://discord.com/api/v10';

function userOf(interaction) {
  return interaction.member?.user ?? interaction.user;
}

function color(profile) {
  if (profile.accent != null) return profile.accent;
  return ui.COLORS[GUILDS[CLASSES[profile.type_code].guild].colorKey];
}

export function bannerModRow(targetId) {
  return ui.row(ui.button({ id: `md:clear:banner:${targetId}`, label: BN.clearBanner, emoji: '🧹', style: S.DANGER }));
}

function bannerPage(profile, notice = null) {
  const url = bannerUrl(profile);
  return [
    ui.container(color(profile), [
      ...(notice ? [ui.text(notice), ui.separator()] : []),
      ui.text(`${BN.title}\n${BN.intro}`),
      ui.separator(),
      ui.text(BN.current),
      ...(url ? [bannerGallery(url)] : [ui.text(BN.none)]),
      ui.row(
        ui.button({ id: 'bn:upload', label: url ? BN.change : BN.upload, emoji: '📤', style: S.PRIMARY }),
        ui.button({ id: 'bn:remove', label: BN.remove, emoji: '🧹', style: S.SECONDARY, disabled: !url }),
      ),
      ui.separator(),
      ui.text(BN.rules),
      ui.row(ui.button({ id: 'cz:page:main', label: C.back, emoji: '◀️', style: S.SECONDARY }), ui.button({ id: 'hub:card', label: C.viewCard, emoji: '🪪', style: S.SECONDARY })),
    ]),
  ];
}

// The upload form: one file field (Discord "File Upload" inside a "Label").
function uploadForm() {
  return {
    type: 9,
    data: {
      custom_id: 'bn:file',
      title: BN.form.title,
      components: [
        { type: 18, label: BN.form.label, description: BN.form.description, component: { type: 19, custom_id: 'file', min_values: 1, max_values: 1, required: true } },
      ],
    },
  };
}

function noProfile() {
  return [ui.container(ui.COLORS.auracle, [ui.text(profileTexts.notAwakenedSelf)])];
}

export async function bannerComponent(interaction, env) {
  const userId = userOf(interaction).id;
  const action = interaction.data.custom_id.split(':')[1];
  const profile = await store.getProfile(env, userId);
  if (!profile) return ui.update(noProfile());
  if (!BANNER_BASE) return ui.update(bannerPage(profile, BN.notReady));

  if (action === 'upload') {
    if ((await store.bannerCount(env, userId)) >= LIMIT) return ui.update(bannerPage(profile, BN.limit));
    return uploadForm();
  }
  if (action === 'remove') {
    await deleteBannerFile(env, profile.banner);
    await store.setBanner(env, userId, null);
    profile.banner = null;
    return ui.update(bannerPage(profile, BN.removed));
  }
  return ui.update(bannerPage(profile));
}

// The file sent in the form, with its size, type and dimensions (given by Discord).
function uploadedFile(interaction) {
  const find = (components) => {
    for (const c of components ?? []) {
      if (c.custom_id === 'file' && Array.isArray(c.values)) return c.values[0];
      const inner = find(c.components ?? (c.component ? [c.component] : []));
      if (inner) return inner;
    }
    return null;
  };
  const id = find(interaction.data.components);
  return id ? interaction.data.resolved?.attachments?.[id] ?? null : null;
}

async function postToModeration(env, components) {
  await fetch(`${API}/channels/${config.reportChannelId}/messages`, {
    method: 'POST',
    headers: { 'content-type': 'application/json', authorization: `Bot ${env.DISCORD_TOKEN}` },
    body: JSON.stringify({ flags: ui.FLAGS.COMPONENTS_V2, allowed_mentions: { parse: [] }, components }),
  });
}

// Checks, stores and shows the banner, then updates the Customize message.
async function processUpload(interaction, env, profile, file) {
  const userId = profile.user_id;
  let page;
  try {
    const verdict = await checkBanner(env, file);
    if (verdict === 'unsafe') {
      await postToModeration(env, [ui.container(ui.COLORS.wanderers, [ui.text(BN.modRefused(userId)), bannerGallery(file.url, true)])]);
      page = bannerPage(profile, BN.refused);
    } else {
      const key = await storeBanner(env, userId, file);
      if (!key) {
        page = bannerPage(profile, BN.failed);
      } else {
        const old = profile.banner;
        await store.setBanner(env, userId, key);
        await deleteBannerFile(env, old);
        profile.banner = key;
        await postToModeration(env, [
          ui.container(ui.COLORS.wanderers, [
            ui.text(verdict === 'safe' ? BN.modNew(userId) : BN.modUnchecked(userId)),
            bannerGallery(bannerUrl(profile)),
            bannerModRow(userId),
          ]),
        ]);
        // 🏅 Apprentice Painter, if this is the first customization.
        page = announce({ data: { components: bannerPage(profile, BN.saved) } }, await earn(env, userId, 'painter')).data.components;
      }
    }
  } catch {
    page = bannerPage(profile, BN.failed);
  }
  await ui.editOriginal(interaction, page);
}

export async function bannerModal(interaction, env, later) {
  const userId = userOf(interaction).id;
  const profile = await store.getProfile(env, userId);
  if (!profile) return ui.update(noProfile());
  if (!BANNER_BASE) return ui.update(bannerPage(profile, BN.notReady));
  if ((await store.bannerCount(env, userId)) >= LIMIT) return ui.update(bannerPage(profile, BN.limit));

  const file = uploadedFile(interaction);
  const problem = bannerProblem(file);
  if (problem === 'type') return ui.update(bannerPage(profile, BN.badType));
  if (problem === 'big') return ui.update(bannerPage(profile, BN.tooBig));
  if (problem === 'small') return ui.update(bannerPage(profile, BN.tooSmall(file.width ?? 0, file.height ?? 0)));

  // Checking takes a few seconds: answer at once ("Checking..."), then finish just after.
  await store.logBanner(env, userId);
  later(processUpload(interaction, env, profile, file));
  return ui.update(bannerPage(profile, BN.checking));
}
