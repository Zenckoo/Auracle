-- 🌈 Customize > Identity: pronouns, gender, orientation (keys, comma-separated, plus optional own words).
-- Saved only after explicit consent (identity_consent_at). Private by default (identity_public = 0).
ALTER TABLE profiles ADD COLUMN identity_consent_at INTEGER;
ALTER TABLE profiles ADD COLUMN identity_public INTEGER NOT NULL DEFAULT 0;
ALTER TABLE profiles ADD COLUMN pronouns TEXT;
ALTER TABLE profiles ADD COLUMN pronouns_text TEXT;
ALTER TABLE profiles ADD COLUMN gender TEXT;
ALTER TABLE profiles ADD COLUMN gender_text TEXT;
ALTER TABLE profiles ADD COLUMN orientation TEXT;
ALTER TABLE profiles ADD COLUMN orientation_text TEXT;
