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

// A finished trial becomes a profile (private by default), and the trial is removed.
export async function completeTrial(env, trial, scores, typeCode) {
  const now = Date.now();
  await env.DB.batch([
    env.DB.prepare(
      `INSERT OR REPLACE INTO profiles (user_id, version, answers, scores, type_code, class_key, is_public, completed_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, 0, ?, ?)`,
    ).bind(trial.user_id, trial.version, JSON.stringify(trial.answers), JSON.stringify(scores), typeCode, typeCode, now, now),
    env.DB.prepare('DELETE FROM trials WHERE user_id = ?').bind(trial.user_id),
  ]);
}

export async function setPublic(env, userId, isPublic) {
  await env.DB.prepare('UPDATE profiles SET is_public = ?, updated_at = ? WHERE user_id = ?')
    .bind(isPublic ? 1 : 0, Date.now(), userId)
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
