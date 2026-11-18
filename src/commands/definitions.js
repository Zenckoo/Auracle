// The slash commands Discord shows to members.
// contexts: [0] means the command only works inside a server.
// Only 4 commands: everything else lives in the /auracle menu (buttons).
// After changing this file, open the /register link again so Discord learns the new list.

export const commandDefinitions = [
  {
    name: 'auracle',
    description: 'Open the menu (no need to type commands)',
    type: 1,
    contexts: [0],
  },
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
    name: 'forget',
    description: 'Erase all your data',
    type: 1,
    contexts: [0],
  },
];
