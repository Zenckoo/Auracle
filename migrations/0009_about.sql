-- 🎨 Customize, page 💬 About me: a short sentence (150 characters), and the current vibe.
-- vibe: a key from src/data/vibes.js, or 'custom' with the traveler's own words in vibe_text (40 characters).
ALTER TABLE profiles ADD COLUMN about TEXT;
ALTER TABLE profiles ADD COLUMN vibe TEXT;
ALTER TABLE profiles ADD COLUMN vibe_text TEXT;
