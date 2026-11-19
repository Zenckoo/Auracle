// English texts for 🖼️ Banner (Customize page, upload form, moderation).

export const bannerTexts = {
  page: 'Banner',
  title: '### 🖼️ Banner',
  intro: '-# An image on top of your card, like on Discord. GIFs are welcome!',
  current: '**🖼️ Your banner**',
  none: '-# No banner yet.',
  rules:
    '**📏 Rules**\n' +
    '-# PNG, JPG, WebP or GIF · at least 600 × 200 pixels · 8 MB max. Wide images look best (about 3 times wider than tall).\n' +
    '-# Every banner is checked automatically, and can be removed by moderation. Nothing shocking: no nudity, gore, hate or anything unsafe for younger travelers. Only images you have the right to use.\n' +
    '-# ✂️ Moving and cropping your banner will come with the website.',
  upload: 'Upload a banner',
  change: 'Change banner',
  remove: 'Remove',
  form: { title: 'Your banner', label: 'Your image', description: 'PNG, JPG, WebP or GIF · at least 600 × 200 pixels · 8 MB max' },
  checking: '### ⏳ Checking your banner...\n-# This takes a few seconds.',
  saved: '### ✨ Your banner is on your card!',
  removed: '### 🧹 Your banner has been removed.',
  badType: '### ⚠️ Wrong file type\nPlease send a PNG, JPG, WebP or GIF image.',
  tooBig: '### ⚠️ Too heavy\nYour image is over 8 MB. Try a smaller or shorter file.',
  tooSmall: (w, h) => `### ⚠️ Too small\nYour image is ${w} × ${h} pixels. It needs at least 600 × 200 pixels to look sharp on your card.`,
  refused: '### 🚫 Banner refused\nThis image does not look safe for everyone, so it cannot be shown on Auracle.\n-# If you think this is a mistake, send a 📬 Feedback.',
  failed: '### ⚠️ Something went wrong\nYour banner could not be saved. Please try again in a moment.',
  limit: '### ⏳ Too many uploads\nYou can upload up to 5 banners every 24 hours. Please try again later.',
  notReady: '### 🛠️ Almost ready\nBanners are being set up. Please come back soon!',

  // Moderation channel (HQ, Zenckoo only)
  modNew: (userId) => `### 🖼️ New banner\nBy <@${userId}>\n-# User ID ${userId} · Checked automatically ✅`,
  modUnchecked: (userId) => `### 🖼️ New banner (not checked)\nBy <@${userId}>\n-# User ID ${userId} · ⚠️ The automatic check could not run on this image. Please look at it.`,
  modRefused: (userId) => `### 🚫 Banner refused automatically\nBy <@${userId}>\n-# User ID ${userId} · It was never shown. The image is hidden behind a spoiler, and its link expires within a day.`,
  clearBanner: 'Remove banner',
};
