-- Feedback anti-spam: when each traveler sent Feedback (kept 24 hours, only to count).
CREATE TABLE IF NOT EXISTS feedback_log (
  user_id TEXT NOT NULL,
  sent_at INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_feedback_log_user ON feedback_log(user_id, sent_at);

-- Travelers blocked from Auracle (for example for spamming Feedback). Kept until the block ends.
-- Not erased by /forget, so a block cannot be escaped by erasing data.
CREATE TABLE IF NOT EXISTS bans (
  user_id TEXT PRIMARY KEY,
  reason TEXT NOT NULL,
  banned_at INTEGER NOT NULL,
  until INTEGER NOT NULL
);
