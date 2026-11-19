-- Report anti-spam: when each traveler reported a card, and whose card (kept 24 hours, only to apply the limits).
CREATE TABLE IF NOT EXISTS report_log (
  user_id TEXT NOT NULL,
  target_id TEXT NOT NULL,
  sent_at INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_report_log_user ON report_log(user_id, sent_at);
