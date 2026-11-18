-- Which server a traveler used Auracle on (only the two ids), for /guilds.
CREATE TABLE IF NOT EXISTS members (
  user_id TEXT NOT NULL,
  guild_id TEXT NOT NULL,
  seen_at INTEGER NOT NULL,
  PRIMARY KEY (user_id, guild_id)
);
CREATE INDEX IF NOT EXISTS idx_members_guild ON members(guild_id);
