-- 🌈 Customize > Identity > Origins: country codes (comma-separated, up to 3) and optional own words.
-- Same consent and visibility as the rest of Identity.
ALTER TABLE profiles ADD COLUMN origins TEXT;
ALTER TABLE profiles ADD COLUMN origins_text TEXT;
