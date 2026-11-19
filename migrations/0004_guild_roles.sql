-- Guild roles: each server can turn them on (staff only). Auracle keeps the ids
-- of the four roles it created, so it never touches any other role.
CREATE TABLE IF NOT EXISTS server_settings (
  guild_id TEXT PRIMARY KEY,
  roles_enabled INTEGER NOT NULL DEFAULT 0,
  role_dreamers TEXT,
  role_scholars TEXT,
  role_guardians TEXT,
  role_wanderers TEXT,
  updated_at INTEGER NOT NULL
);

-- A traveler can choose not to wear their guild role (1 = wear it, by default).
ALTER TABLE profiles ADD COLUMN wear_role INTEGER NOT NULL DEFAULT 1;
