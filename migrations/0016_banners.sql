-- 🖼️ Banner: an image (PNG, JPG, WebP or GIF) uploaded by the traveler, shown on top of their card.
-- The file itself is kept in the R2 bucket "auracle-banners"; here only its name (key) and upload date.
ALTER TABLE profiles ADD COLUMN banner TEXT;
ALTER TABLE profiles ADD COLUMN banner_at INTEGER;

-- Anti-spam: 5 banner uploads every 24 hours. Erased every night after 24 hours.
CREATE TABLE IF NOT EXISTS banner_log (
  user_id TEXT NOT NULL,
  sent_at INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS banner_log_user ON banner_log (user_id, sent_at);
