-- 🏅 Badges: earned automatically, never lost (only /forget erases them). Up to 3 shown on the card.
-- compare_count: how many comparisons were made (never with whom).
-- codex_seen: which Codex pages were opened (one bit per page), forgotten once Lorekeeper is earned.
ALTER TABLE profiles ADD COLUMN badges TEXT;
ALTER TABLE profiles ADD COLUMN badges_shown TEXT;
ALTER TABLE profiles ADD COLUMN compare_count INTEGER NOT NULL DEFAULT 0;
ALTER TABLE profiles ADD COLUMN codex_seen INTEGER;

-- Travelers already here during the public beta get 🌱 Early Traveler,
-- plus 📚 Grand Trial and 🎨 Apprentice Painter when they already earned them.
UPDATE profiles SET badges = 'early';
UPDATE profiles SET badges = badges || ',grand' WHERE version = 'grand';
UPDATE profiles SET badges = badges || ',painter'
  WHERE title IS NOT NULL OR accent IS NOT NULL OR about IS NOT NULL OR vibe IS NOT NULL
     OR games IS NOT NULL OR shows IS NOT NULL OR music IS NOT NULL OR characters IS NOT NULL OR ask_about IS NOT NULL
     OR looking_for IS NOT NULL OR dms IS NOT NULL OR timezone IS NOT NULL OR languages IS NOT NULL
     OR birth_day IS NOT NULL OR identity_consent_at IS NOT NULL;
UPDATE profiles SET badges_shown = badges;
