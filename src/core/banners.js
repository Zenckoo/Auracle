// 🖼️ Banners: checking, storing and removing the images travelers upload.
// Files live in the R2 bucket (env.BANNERS). Every image is checked by a Workers AI vision model
// before it is shown. The model only looks at the image and answers SAFE or UNSAFE: it never creates images.

import { BANNER_BASE } from '../config.js';

const BANNER_TYPES = { 'image/png': 'png', 'image/jpeg': 'jpg', 'image/webp': 'webp', 'image/gif': 'gif' };
const BANNER_MAX_BYTES = 10 * 1024 * 1024;
const BANNER_MIN = { width: 600, height: 200 };

const MODEL = '@cf/meta/llama-3.2-11b-vision-instruct';
const CHECK =
  'You check images for a Discord community that includes teenagers (13 and older). ' +
  'Is this image safe to show to everyone as a profile banner? ' +
  'Unsafe means: nudity, sexual or suggestive content, gore or graphic violence, self-harm, hate symbols, or drugs. ' +
  'Answer with exactly one word: SAFE or UNSAFE.';

export function bannerUrl(profile) {
  return BANNER_BASE && profile?.banner ? `${BANNER_BASE}/${profile.banner}` : null;
}

// A full-width image component. spoiler: blurred until clicked (for refused images in the moderation channel).
export function bannerGallery(url, spoiler = false) {
  return { type: 12, items: [{ media: { url }, ...(spoiler ? { spoiler: true } : {}) }] };
}

// Why this attachment cannot be a banner ('type', 'big', 'small'), or null when it can.
export function bannerProblem(file) {
  if (!file || !BANNER_TYPES[(file.content_type ?? '').split(';')[0]]) return 'type';
  if (file.size > BANNER_MAX_BYTES) return 'big';
  if (!file.width || !file.height || file.width < BANNER_MIN.width || file.height < BANNER_MIN.height) return 'small';
  return null;
}

function toBase64(bytes) {
  let binary = '';
  for (let i = 0; i < bytes.length; i += 0x8000) binary += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  return btoa(binary);
}

// Asks the vision model about a small still copy of the image (Discord's media proxy makes it:
// the first frame for a GIF). Returns 'safe', 'unsafe', or 'unchecked' when the check could not run.
export async function checkBanner(env, file) {
  try {
    const sep = file.proxy_url.includes('?') ? '&' : '?';
    const res = await fetch(`${file.proxy_url}${sep}format=png&width=512`);
    if (!res.ok) return 'unchecked';
    const image = `data:image/png;base64,${toBase64(new Uint8Array(await res.arrayBuffer()))}`;
    const ask = () => env.AI.run(MODEL, { messages: [{ role: 'user', content: CHECK }], image, max_tokens: 5 });
    let out;
    try {
      out = await ask();
    } catch (err) {
      // First use: Meta's license must be accepted once, then the check runs again.
      if (!/agree|licen/i.test(String(err?.message ?? err))) throw err;
      await env.AI.run(MODEL, { prompt: 'agree' });
      out = await ask();
    }
    const answer = String(out?.response ?? '').toUpperCase();
    if (answer.includes('UNSAFE')) return 'unsafe';
    if (answer.includes('SAFE')) return 'safe';
    return 'unchecked';
  } catch {
    return 'unchecked';
  }
}

// Copies the uploaded file into the bucket. Returns its new key, or null.
export async function storeBanner(env, userId, file) {
  const res = await fetch(file.url);
  if (!res.ok) return null;
  const type = file.content_type.split(';')[0];
  const key = `${userId}/${crypto.randomUUID()}.${BANNER_TYPES[type]}`;
  await env.BANNERS.put(key, await res.arrayBuffer(), { httpMetadata: { contentType: type, cacheControl: 'public, max-age=31536000, immutable' } });
  return key;
}

export async function deleteBannerFile(env, key) {
  if (!key) return;
  try {
    await env.BANNERS.delete(key);
  } catch {
    // Already gone: nothing to do.
  }
}
