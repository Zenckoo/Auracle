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

// ---- Nightly cleanup ----

// Erases unfinished trials after 30 days, Feedback counters after 24 hours, and ended blocks.
export async function cleanup(env) {
  const now = Date.now();
  await env.DB.batch([
    env.DB.prepare('DELETE FROM trials WHERE updated_at < ?').bind(now - THIRTY_DAYS),
    env.DB.prepare('DELETE FROM feedback_log WHERE sent_at < ?').bind(now - DAY),
    env.DB.prepare('DELETE FROM bans WHERE until <= ?').bind(now),
  ]);
}

// ---- My data (right of access and portability) ----

// Everything Auracle keeps about this traveler, in one object.
export async function exportData(env, userId) {
  const [profile, trial, servers, ban, feedback] = await Promise.all([
    env.DB.prepare('SELECT * FROM profiles WHERE user_id = ?').bind(userId).first(),
    env.DB.prepare('SELECT * FROM trials WHERE user_id = ?').bind(userId).first(),
    env.DB.prepare('SELECT guild_id, seen_at FROM members WHERE user_id = ?').bind(userId).all(),
    env.DB.prepare('SELECT * FROM bans WHERE user_id = ?').bind(userId).first(),
    env.DB.prepare('SELECT sent_at FROM feedback_log WHERE user_id = ?').bind(userId).all(),
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
    block: ban && { reason: ban.reason, from: date(ban.banned_at), until: date(ban.until) },
  };
}
