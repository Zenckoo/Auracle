// Public settings (not secrets).

export const config = {
  // Channel on the HQ server where /feedback messages arrive.
  feedbackChannelId: '1572412877212754041',

  applicationId: '1572397022370078860',
};

// Discord permissions Auracle asks for: only Manage Roles, for its four guild roles.
export const MANAGE_ROLES = 0x10000000n;

// Invite link. With a server id, it opens straight on that server (to give back a missing permission).
export function inviteUrl(guildId) {
  let url = `https://discord.com/oauth2/authorize?client_id=${config.applicationId}&permissions=${MANAGE_ROLES}&integration_type=0&scope=bot+applications.commands`;
  if (guildId) url += `&guild_id=${guildId}&disable_guild_select=true`;
  return url;
}
