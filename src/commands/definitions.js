// The slash commands Discord shows to members.
// contexts: [0] means the command only works inside a server.
// After changing this file, open the /register link again so Discord learns the new list.

export const commandDefinitions = [
  {
    name: 'awaken',
    description: 'Begin your trial and discover your class',
    type: 1,
    contexts: [0],
  },
  {
    name: 'profile',
    description: "View your profile card, or a traveler's with @member",
    type: 1,
    contexts: [0],
    options: [
      {
        type: 6,
        name: 'member',
        description: 'The traveler whose card you want to see',
        required: false,
      },
    ],
  },
  {
    name: 'privacy',
    description: 'Choose what you share with others',
    type: 1,
    contexts: [0],
  },
  {
    name: 'forget',
    description: 'Erase all your data',
    type: 1,
    contexts: [0],
  },
  {
    name: 'updates',
    description: "See what's new and what's coming",
    type: 1,
    contexts: [0],
  },
  {
    name: 'help',
    description: "Open the Traveler's Guide",
    type: 1,
    contexts: [0],
  },
];
