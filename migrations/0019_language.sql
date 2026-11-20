-- 🌍 The language Auracle speaks on a server ('en', 'fr' or 'de'), chosen by its staff.
-- NULL = follow the server's own language on Discord (or English).
ALTER TABLE server_settings ADD COLUMN language TEXT;
