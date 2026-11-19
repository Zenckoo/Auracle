-- ♿ Accessibility mode: 1 = Auracle shows this traveler simpler messages (no decorative emojis,
-- no small text, no bars, no italics), easier to read with a screen reader.
ALTER TABLE profiles ADD COLUMN a11y INTEGER NOT NULL DEFAULT 0;
