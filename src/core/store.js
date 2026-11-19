// Everything Auracle saves, in one place. Uses the D1 database (env.DB).

const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000;

export async function getTrial(env, userId) {
  const row = await env.DB.prepare('SELECT * FROM trials WHERE user_id = ?').bind(userId).first();
  if (!row) return null;

  // Unfinished trials are erased 30 days after the last answer.
  if (Date.now() - row.updated_at > THIRTY_DAYS) {
    await deleteTrial(env, userId);
    return null;
  }

  return { ...row, answers: JSON.parse(row.answers) };
}

export async function startTrial(env, userId, version = 'standard') {
  const now = Date.now();
  await env.DB.prepare(
    `INSERT OR REPLACE INTO trials (user_id, version, answers, current_index, started_at, updated_at)
     VALUES (?, ?, '[]', 0, ?, ?)`,
  )
    .bind(userId, version, now, now)
    .run();
  return { user_id: userId, version, answers: [], current_index: 0, started_at: now, updated_at: now };
}

export async function saveTrial(env, trial) {
  trial.updated_at = Date.now();
  await env.DB.prepare('UPDATE trials SET answers = ?, current_index = ?, updated_at = ? WHERE user_id = ?')
    .bind(JSON.stringify(trial.answers), trial.current_index, trial.updated_at, trial.user_id)
    .run();
}

export async function deleteTrial(env, userId) {
  await env.DB.prepare('DELETE FROM trials WHERE user_id = ?').bind(userId).run();
}

export async function getProfile(env, userId) {
  const row = await env.DB.prepare('SELECT * FROM profiles WHERE user_id = ?').bind(userId).first();
  if (!row) return null;
  return { ...row, answers: JSON.parse(row.answers), scores: JSON.parse(row.scores) };
}

// A finished trial becomes a profile (card and secret private by default), and the trial is removed.
export async function completeTrial(env, trial, scores, typeCode) {
  const now = Date.now();
  await env.DB.batch([
    env.DB.prepare(
      // A new trial resets the card to private, but keeps the traveler's guild role choice.
      `INSERT INTO profiles (user_id, version, answers, scores, type_code, class_key, is_public, secret_public, completed_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, 0, 0, ?, ?)
       ON CONFLICT(user_id) DO UPDATE SET version = excluded.version, answers = excluded.answers, scores = excluded.scores,
         type_code = excluded.type_code, class_key = excluded.class_key, is_public = 0, secret_public = 0,
         completed_at = excluded.completed_at, updated_at = excluded.updated_at`,
    ).bind(trial.user_id, trial.version, JSON.stringify(trial.answers), JSON.stringify(scores), typeCode, typeCode, now, now),
    env.DB.prepare('DELETE FROM trials WHERE user_id = ?').bind(trial.user_id),
  ]);
}

export async function setPublic(env, userId, isPublic) {
  await env.DB.prepare('UPDATE profiles SET is_public = ?, updated_at = ? WHERE user_id = ?')
    .bind(isPublic ? 1 : 0, Date.now(), userId)
    .run();
}

export async function setSecretPublic(env, userId, isShown) {
  await env.DB.prepare('UPDATE profiles SET secret_public = ?, updated_at = ? WHERE user_id = ?')
    .bind(isShown ? 1 : 0, Date.now(), userId)
    .run();
}

// 🎨 Customize: the fantasy title (a key from data/titles.js), or null for none.
export async function setTitle(env, userId, title) {
  await env.DB.prepare('UPDATE profiles SET title = ?, updated_at = ? WHERE user_id = ?')
    .bind(title, Date.now(), userId)
    .run();
}

// 🎨 Customize: the accent color (a number like 0xff6fae), or null for the guild color.
export async function setAccent(env, userId, accent) {
  await env.DB.prepare('UPDATE profiles SET accent = ?, updated_at = ? WHERE user_id = ?')
    .bind(accent, Date.now(), userId)
    .run();
}

// 🎨 Customize > 💬 About me: the sentence (null to clear), and the vibe (key or 'custom' with its text).
export async function setAbout(env, userId, about) {
  await env.DB.prepare('UPDATE profiles SET about = ?, updated_at = ? WHERE user_id = ?')
    .bind(about, Date.now(), userId)
    .run();
}

export async function setVibe(env, userId, vibe, vibeText = null) {
  await env.DB.prepare('UPDATE profiles SET vibe = ?, vibe_text = ?, updated_at = ? WHERE user_id = ?')
    .bind(vibe, vibeText, Date.now(), userId)
    .run();
}

// 🎨 Customize > 🎮 Tastes & fun. fields: { games, shows, music, characters, ask_about } (null to clear).
const TASTE_COLUMNS = ['games', 'shows', 'music', 'characters', 'ask_about'];

export async function setTastes(env, userId, fields) {
  const values = TASTE_COLUMNS.map((c) => fields[c] ?? null);
  await env.DB.prepare(`UPDATE profiles SET ${TASTE_COLUMNS.map((c) => `${c} = ?`).join(', ')}, updated_at = ? WHERE user_id = ?`)
    .bind(...values, Date.now(), userId)
    .run();
}

// lookingFor: an array of keys. dms: 'open', 'ask', 'closed' or null.
export async function setLookingFor(env, userId, lookingFor) {
  await env.DB.prepare('UPDATE profiles SET looking_for = ?, updated_at = ? WHERE user_id = ?')
    .bind(lookingFor.length ? lookingFor.join(',') : null, Date.now(), userId)
    .run();
}

export async function setDms(env, userId, dms) {
  await env.DB.prepare('UPDATE profiles SET dms = ?, updated_at = ? WHERE user_id = ?')
    .bind(dms, Date.now(), userId)
    .run();
}

// 🎨 Customize > 🕰️ Practical: time zone key, language codes (array), birthday (day and month, never the year).
export async function setTimezone(env, userId, timezone) {
  await env.DB.prepare('UPDATE profiles SET timezone = ?, updated_at = ? WHERE user_id = ?')
    .bind(timezone, Date.now(), userId)
    .run();
}

export async function setLanguages(env, userId, languages) {
  await env.DB.prepare('UPDATE profiles SET languages = ?, updated_at = ? WHERE user_id = ?')
    .bind(languages.length ? languages.join(',') : null, Date.now(), userId)
    .run();
}

export async function setBirthday(env, userId, day, month) {
  await env.DB.prepare('UPDATE profiles SET birth_day = ?, birth_month = ?, updated_at = ? WHERE user_id = ?')
    .bind(day, month, Date.now(), userId)
    .run();
}

// 🎨 Customize > 🌈 Identity. Saved only after explicit consent (the date is kept as proof).
export async function setIdentityConsent(env, userId, at) {
  await env.DB.prepare('UPDATE profiles SET identity_consent_at = ?, updated_at = ? WHERE user_id = ?')
    .bind(at, Date.now(), userId)
    .run();
}

export async function setIdentityPublic(env, userId, isPublic) {
  await env.DB.prepare('UPDATE profiles SET identity_public = ?, updated_at = ? WHERE user_id = ?')
    .bind(isPublic ? 1 : 0, Date.now(), userId)
    .run();
}

// field: 'pronouns', 'gender', 'orientation' or 'origins'. keys: an array. text: own words or null.
const IDENTITY_COLUMNS = ['pronouns', 'gender', 'orientation', 'origins'];

export async function setIdentityField(env, userId, field, keys, text) {
  if (!IDENTITY_COLUMNS.includes(field)) return;
  await env.DB.prepare(`UPDATE profiles SET ${field} = ?, ${field}_text = ?, updated_at = ? WHERE user_id = ?`)
    .bind(keys.length ? keys.join(',') : null, text, Date.now(), userId)
    .run();
}

// Erases every identity answer. withdraw: also forgets the consent and makes it private again.
export async function clearIdentity(env, userId, withdraw = false) {
  const extra = withdraw ? ', identity_consent_at = NULL, identity_public = 0' : '';
  await env.DB.prepare(
    `UPDATE profiles SET ${IDENTITY_COLUMNS.map((c) => `${c} = NULL, ${c}_text = NULL`).join(', ')}${extra}, updated_at = ? WHERE user_id = ?`,
  )
    .bind(Date.now(), userId)
    .run();
}

// ---- 🏅 Badges ----

// Gives a badge if the traveler has a card and does not have it yet. Returns true when it is new.
// A new badge is shown on the card right away if fewer than 3 are shown.
export async function awardBadge(env, userId, key) {
  const row = await env.DB.prepare('SELECT badges, badges_shown FROM profiles WHERE user_id = ?').bind(userId).first();
  if (!row) return false;
  const earned = (row.badges ?? '').split(',').filter(Boolean);
  if (earned.includes(key)) return false;
  const shown = (row.badges_shown ?? '').split(',').filter(Boolean);
  const nextShown = shown.length < 3 ? [...shown, key] : shown;
  await env.DB.prepare('UPDATE profiles SET badges = ?, badges_shown = ? WHERE user_id = ?')
    .bind([...earned, key].join(','), nextShown.join(',') || null, userId)
    .run();
  return true;
}

export async function setBadgesShown(env, userId, keys) {
  await env.DB.prepare('UPDATE profiles SET badges_shown = ?, updated_at = ? WHERE user_id = ?')
    .bind(keys.length ? keys.join(',') : null, Date.now(), userId)
    .run();
}

// One more comparison (only the number is kept, never with whom). Returns the new count, or null without a card.
export async function countCompare(env, userId) {
  await env.DB.prepare('UPDATE profiles SET compare_count = compare_count + 1 WHERE user_id = ?').bind(userId).run();
  const row = await env.DB.prepare('SELECT compare_count FROM profiles WHERE user_id = ?').bind(userId).first();
  return row ? row.compare_count : null;
}

// Remembers that a Codex page was opened (one bit per page). Returns the pages mask, or null when
// there is no card or Lorekeeper is already earned (then nothing is kept anymore).
export async function seeCodexPage(env, userId, index) {
  const row = await env.DB.prepare('SELECT codex_seen, badges FROM profiles WHERE user_id = ?').bind(userId).first();
  if (!row || (row.badges ?? '').split(',').includes('lorekeeper')) return null;
  const mask = (row.codex_seen ?? 0) | (1 << index);
  if (mask !== row.codex_seen) {
    await env.DB.prepare('UPDATE profiles SET codex_seen = ? WHERE user_id = ?').bind(mask, userId).run();
  }
  return mask;
}

export async function forgetCodexPages(env, userId) {
  await env.DB.prepare('UPDATE profiles SET codex_seen = NULL WHERE user_id = ?').bind(userId).run();
}

export async function deleteProfile(env, userId) {
  await env.DB.prepare('DELETE FROM profiles WHERE user_id = ?').bind(userId).run();
}

// ---------- Servers (for /guilds) ----------

// Remembers that this traveler used Auracle on this server (only the two ids).
export async function recordMember(env, userId, guildId) {
  await env.DB.prepare(
    `INSERT INTO members (user_id, guild_id, seen_at) VALUES (?, ?, ?)
     ON CONFLICT(user_id, guild_id) DO UPDATE SET seen_at = excluded.seen_at`,
  )
    .bind(userId, guildId, Date.now())
    .run();
}

export async function deleteMembers(env, userId) {
  await env.DB.prepare('DELETE FROM members WHERE user_id = ?').bind(userId).run();
}

// Types of the public cards of travelers seen on this server.
export async function publicTypesInGuild(env, guildId) {
  const { results } = await env.DB.prepare(
    `SELECT p.type_code FROM profiles p JOIN members m ON m.user_id = p.user_id
     WHERE m.guild_id = ? AND p.is_public = 1`,
  )
    .bind(guildId)
    .all();
  return results.map((r) => r.type_code);
}

// ---- Guild roles ----

export async function setWearRole(env, userId, wear) {
  await env.DB.prepare('UPDATE profiles SET wear_role = ?, updated_at = ? WHERE user_id = ?')
    .bind(wear ? 1 : 0, Date.now(), userId)
    .run();
}

export async function getServerSettings(env, guildId) {
  return env.DB.prepare('SELECT * FROM server_settings WHERE guild_id = ?').bind(guildId).first();
}

// ids: { dreamers, scholars, guardians, wanderers } (null to forget them).
export async function saveServerRoles(env, guildId, enabled, ids = {}) {
  await env.DB.prepare(
    `INSERT INTO server_settings (guild_id, roles_enabled, role_dreamers, role_scholars, role_guardians, role_wanderers, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?)
     ON CONFLICT(guild_id) DO UPDATE SET roles_enabled = excluded.roles_enabled, role_dreamers = excluded.role_dreamers,
       role_scholars = excluded.role_scholars, role_guardians = excluded.role_guardians,
       role_wanderers = excluded.role_wanderers, updated_at = excluded.updated_at`,
  )
    .bind(guildId, enabled ? 1 : 0, ids.dreamers ?? null, ids.scholars ?? null, ids.guardians ?? null, ids.wanderers ?? null, Date.now())
    .run();
}

// Servers where this traveler used Auracle and where guild roles are on.
export async function roleServersOfUser(env, userId, limit = 10) {
  const { results } = await env.DB.prepare(
    `SELECT s.* FROM members m JOIN server_settings s ON s.guild_id = m.guild_id
     WHERE m.user_id = ? AND s.roles_enabled = 1 ORDER BY m.seen_at DESC LIMIT ?`,
  )
    .bind(userId, limit)
    .all();
  return results;
}

// Travelers of this server with a public card who wear their role, most recent first.
export async function roleWearersInGuild(env, guildId, limit) {
  const { results } = await env.DB.prepare(
    `SELECT p.user_id, p.type_code FROM profiles p JOIN members m ON m.user_id = p.user_id
     WHERE m.guild_id = ? AND p.is_public = 1 AND p.wear_role = 1 ORDER BY m.seen_at DESC LIMIT ?`,
  )
    .bind(guildId, limit)
    .all();
  return results;
}

// ---- Moderation (Feedback anti-spam) ----

const DAY = 24 * 60 * 60 * 1000;

// The active block of this traveler, or null.
export async function getBan(env, userId) {
  const row = await env.DB.prepare('SELECT * FROM bans WHERE user_id = ?').bind(userId).first();
  if (!row || row.until <= Date.now()) return null;
  return row;
}

export async function banUser(env, userId, reason, days) {
  const now = Date.now();
  await env.DB.prepare('INSERT OR REPLACE INTO bans (user_id, reason, banned_at, until) VALUES (?, ?, ?, ?)')
    .bind(userId, reason, now, now + days * DAY)
    .run();
}

// How many Feedback messages this traveler sent in the last 24 hours.
export async function feedbackCount(env, userId) {
  const row = await env.DB.prepare('SELECT COUNT(*) AS n FROM feedback_log WHERE user_id = ? AND sent_at > ?')
    .bind(userId, Date.now() - DAY)
    .first();
  return row?.n ?? 0;
}

export async function logFeedback(env, userId) {
  await env.DB.prepare('INSERT INTO feedback_log (user_id, sent_at) VALUES (?, ?)').bind(userId, Date.now()).run();
}

// ---- Reports (anti-spam: 5 reports every 24 hours, one per card) ----

export async function reportCount(env, userId) {
  const row = await env.DB.prepare('SELECT COUNT(*) AS n FROM report_log WHERE user_id = ? AND sent_at > ?')
    .bind(userId, Date.now() - DAY)
    .first();
  return row?.n ?? 0;
}

export async function reportedRecently(env, userId, targetId) {
  const row = await env.DB.prepare('SELECT 1 AS x FROM report_log WHERE user_id = ? AND target_id = ? AND sent_at > ?')
    .bind(userId, targetId, Date.now() - DAY)
    .first();
  return !!row;
}

export async function logReport(env, userId, targetId) {
  await env.DB.prepare('INSERT INTO report_log (user_id, target_id, sent_at) VALUES (?, ?, ?)').bind(userId, targetId, Date.now()).run();
}

// ---- Nightly cleanup ----

// Erases unfinished trials after 30 days, Feedback and report counters after 24 hours, and ended blocks.
export async function cleanup(env) {
  const now = Date.now();
  await env.DB.batch([
    env.DB.prepare('DELETE FROM trials WHERE updated_at < ?').bind(now - THIRTY_DAYS),
    env.DB.prepare('DELETE FROM feedback_log WHERE sent_at < ?').bind(now - DAY),
    env.DB.prepare('DELETE FROM report_log WHERE sent_at < ?').bind(now - DAY),
    env.DB.prepare('DELETE FROM bans WHERE until <= ?').bind(now),
  ]);
}

// ---- My data (right of access and portability) ----

// Everything Auracle keeps about this traveler, in one object.
export async function exportData(env, userId) {
  const [profile, trial, servers, ban, feedback, reports] = await Promise.all([
    env.DB.prepare('SELECT * FROM profiles WHERE user_id = ?').bind(userId).first(),
    env.DB.prepare('SELECT * FROM trials WHERE user_id = ?').bind(userId).first(),
    env.DB.prepare('SELECT guild_id, seen_at FROM members WHERE user_id = ?').bind(userId).all(),
    env.DB.prepare('SELECT * FROM bans WHERE user_id = ?').bind(userId).first(),
    env.DB.prepare('SELECT sent_at FROM feedback_log WHERE user_id = ?').bind(userId).all(),
    env.DB.prepare('SELECT sent_at FROM report_log WHERE user_id = ?').bind(userId).all(),
  ]);
  const date = (ms) => (ms ? new Date(ms).toISOString() : null);
  const parse = (text) => {
    try { return JSON.parse(text); } catch { return text; }
  };
  return {
    discord_user_id: userId,
    exported_at: date(Date.now()),
    profile: profile && {
      trial_version: profile.version,
      answers: parse(profile.answers),
      scores: parse(profile.scores),
      type: profile.type_code,
      card_public: profile.is_public === 1,
      hidden_secret_shown: profile.secret_public === 1,
      wears_guild_role: profile.wear_role !== 0,
      fantasy_title: profile.title ?? null,
      about_me: profile.about ?? null,
      current_vibe: profile.vibe === 'custom' ? profile.vibe_text : profile.vibe ?? null,
      tastes: {
        games: profile.games ?? null,
        anime_or_series: profile.shows ?? null,
        music: profile.music ?? null,
        characters: profile.characters ?? null,
        ask_me_about: profile.ask_about ?? null,
        looking_for: profile.looking_for ? profile.looking_for.split(',') : [],
        dms: profile.dms ?? null,
      },
      practical: {
        time_zone: profile.timezone ?? null,
        languages: profile.languages ? profile.languages.split(',') : [],
        birthday: profile.birth_day && profile.birth_month ? `${String(profile.birth_day).padStart(2, '0')}/${String(profile.birth_month).padStart(2, '0')} (day/month)` : null,
      },
      identity: {
        consent_given_at: date(profile.identity_consent_at),
        shown_on_public_card: profile.identity_public === 1,
        pronouns: profile.pronouns ? profile.pronouns.split(',') : [],
        pronouns_own_words: profile.pronouns_text ?? null,
        gender: profile.gender ? profile.gender.split(',') : [],
        gender_own_words: profile.gender_text ?? null,
        orientation: profile.orientation ? profile.orientation.split(',') : [],
        orientation_own_words: profile.orientation_text ?? null,
        origins: profile.origins ? profile.origins.split(',') : [],
        origins_own_words: profile.origins_text ?? null,
      },
      badges: {
        earned: profile.badges ? profile.badges.split(',') : [],
        shown_on_card: profile.badges_shown ? profile.badges_shown.split(',') : [],
        comparisons_made: profile.compare_count ?? 0,
        codex_pages_opened: profile.codex_seen == null ? null : profile.codex_seen.toString(2).split('').filter((b) => b === '1').length,
      },
      accent_color: profile.accent == null ? null : '#' + profile.accent.toString(16).padStart(6, '0').toUpperCase(),
      completed_at: date(profile.completed_at),
      updated_at: date(profile.updated_at),
    },
    unfinished_trial: trial && {
      trial_version: trial.version,
      answers: parse(trial.answers),
      next_question: trial.current_index + 1,
      started_at: date(trial.started_at),
      last_answer_at: date(trial.updated_at),
    },
    servers: (servers.results ?? []).map((s) => ({ server_id: s.guild_id, last_used_at: date(s.seen_at) })),
    feedback_sent_last_24_hours: (feedback.results ?? []).map((f) => date(f.sent_at)),
    reports_sent_last_24_hours: (reports.results ?? []).map((r) => date(r.sent_at)),
    block: ban && { reason: ban.reason, from: date(ban.banned_at), until: date(ban.until) },
  };
}
