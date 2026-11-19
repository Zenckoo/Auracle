-- 🎨 Customize, page 🎮 Tastes & fun. Free texts of 60 characters, all optional.
-- looking_for: keys from src/data/tastes.js, separated by commas. dms: 'open', 'ask' or 'closed'.
ALTER TABLE profiles ADD COLUMN games TEXT;
ALTER TABLE profiles ADD COLUMN shows TEXT;
ALTER TABLE profiles ADD COLUMN music TEXT;
ALTER TABLE profiles ADD COLUMN characters TEXT;
ALTER TABLE profiles ADD COLUMN ask_about TEXT;
ALTER TABLE profiles ADD COLUMN looking_for TEXT;
ALTER TABLE profiles ADD COLUMN dms TEXT;
