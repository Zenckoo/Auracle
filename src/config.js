// Public settings (not secrets).

export const config = {
  // Channel on the HQ server where Feedback messages arrive.
  feedbackChannelId: '1572412877212754041',

  // Private moderation channel on the HQ server where 🚩 Reports arrive.
  reportChannelId: '1572822029713809468',

  applicationId: '1572397022370078860',

  // Discord user IDs allowed to use the moderation buttons under a 🚩 Report (only Zenckoo).
  moderatorIds: ['249869919292882944'],
};

// Auracle's website, and its legal pages (linked from the bot).
export const SITE = {
  home: 'https://auracle-site.pages.dev',
  privacy: 'https://auracle-site.pages.dev/privacy',
  terms: 'https://auracle-site.pages.dev/terms',
};

// 🖼️ Public address of the R2 bucket where banners are stored (its r2.dev link). Empty: banners are off.
export const BANNER_BASE = '';

// Discord permissions Auracle asks for: only Manage Roles, for its four guild roles.
export const MANAGE_ROLES = 0x10000000n;

// Invite link. With a server id, it opens straight on that server (to give back a missing permission).
export function inviteUrl(guildId) {
  let url = `https://discord.com/oauth2/authorize?client_id=${config.applicationId}&permissions=${MANAGE_ROLES}&integration_type=0&scope=bot+applications.commands`;
  if (guildId) url += `&guild_id=${guildId}&disable_guild_select=true`;
  return url;
}
