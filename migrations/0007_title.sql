-- 🎨 Customize: the fantasy title chosen for the card (a key from src/data/titles.js), or NULL for none.
-- Kept when the traveler takes a new trial, erased with /forget.
ALTER TABLE profiles ADD COLUMN title TEXT;
