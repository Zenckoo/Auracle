-- Auracle database schema (Cloudflare D1, SQLite).
-- Kept here so the data can move to another host one day.

-- A trial in progress: deleted once finished, or after 30 days without an answer.
CREATE TABLE IF NOT EXISTS trials (
  user_id TEXT PRIMARY KEY,
  version TEXT NOT NULL DEFAULT 'standard',
  answers TEXT NOT NULL DEFAULT '[]',
  current_index INTEGER NOT NULL DEFAULT 0,
  started_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL
);

-- A finished trial: kept until the person uses /forget.
CREATE TABLE IF NOT EXISTS profiles (
  user_id TEXT PRIMARY KEY,
  version TEXT NOT NULL,
  answers TEXT NOT NULL,
  scores TEXT NOT NULL,
  type_code TEXT NOT NULL,
  class_key TEXT NOT NULL,
  is_public INTEGER NOT NULL DEFAULT 0,
  completed_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_trials_updated ON trials(updated_at);
