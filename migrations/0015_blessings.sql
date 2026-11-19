-- 💌 Blessings: a short kind word left by a traveler on another traveler's card.
-- status 'new' until the card owner accepts it ('accepted'); declined blessings are deleted.
-- shown = 1 when the owner shows it on their card (3 at most). One blessing per author and per card.
CREATE TABLE IF NOT EXISTS blessings (
  target_id TEXT NOT NULL,
  author_id TEXT NOT NULL,
  text TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'new',
  shown INTEGER NOT NULL DEFAULT 0,
  created_at INTEGER NOT NULL,
  PRIMARY KEY (target_id, author_id)
);
CREATE INDEX IF NOT EXISTS blessings_author ON blessings (author_id);

-- Travelers a card owner blocked: they can no longer send them blessings.
CREATE TABLE IF NOT EXISTS blessing_blocks (
  owner_id TEXT NOT NULL,
  blocked_id TEXT NOT NULL,
  PRIMARY KEY (owner_id, blocked_id)
);
CREATE INDEX IF NOT EXISTS blessing_blocks_blocked ON blessing_blocks (blocked_id);

-- Anti-spam: 5 blessings sent every 24 hours. Erased every night after 24 hours.
CREATE TABLE IF NOT EXISTS blessing_log (
  user_id TEXT NOT NULL,
  sent_at INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS blessing_log_user ON blessing_log (user_id, sent_at);

-- blessings_off = 1: this traveler does not receive blessings.
-- blessings_accepted: how many of this traveler's blessings were accepted (for 🕊️ Kind Soul, never goes down).
ALTER TABLE profiles ADD COLUMN blessings_off INTEGER NOT NULL DEFAULT 0;
ALTER TABLE profiles ADD COLUMN blessings_accepted INTEGER NOT NULL DEFAULT 0;
