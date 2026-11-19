-- 🎨 Customize, page 🕰️ Practical. All optional.
-- timezone: a key from src/data/practical.js. languages: language codes separated by commas (6 at most).
-- birthday: day and month only, never the year.
ALTER TABLE profiles ADD COLUMN timezone TEXT;
ALTER TABLE profiles ADD COLUMN languages TEXT;
ALTER TABLE profiles ADD COLUMN birth_day INTEGER;
ALTER TABLE profiles ADD COLUMN birth_month INTEGER;
