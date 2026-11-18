-- Hidden secret visible on the profile card (0 = hidden, by default).
ALTER TABLE profiles ADD COLUMN secret_public INTEGER NOT NULL DEFAULT 0;
